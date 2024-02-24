import os
import json
import pickle
import numpy as np
import pandas as pd
from utils import preprocessing_growth_model_data
import statsmodels.api as sm


class GrowthModel(object):
    KWARGS_FILE_NAME = "kwargs.json"
    MODEL_FILE_NAME = "model.pkl"

    def __init__(
            self,
    ):
        self._is_fitted = False
        self._model = None
        self._freq = None
        self._offset_function = None
        self._fitted_kwargs = None

    def get_transition_matrix(self):
        if self._is_fitted:
            model_params = self._model.params.copy()  # pd.Series
            transition_matrix = np.array([[model_params["p[0->0]"], 1 - model_params["p[0->0]"]],
                                          [model_params["p[1->0]"], 1 - model_params["p[1->0]"]]])
            return transition_matrix
        else:
            raise Exception("the model has not been fitted yet.")

    def train(self, X: pd.DataFrame, k_regimes: int = 2, order: int = 3, switching_ar: bool = False,
              switching_variance: bool = True, trend: str = "n", search_rep: int = 20):

        if not isinstance(X.index, pd.DatetimeIndex):
            raise ValueError("Input X's index is not a pandas DatetimeIndex")
        else:
            self._freq = X.index.freq.name
            if self._freq == "BME":
                self._offset_function = pd.offsets.BMonthEnd
            elif self._freq == "B":
                self._offset_function = pd.offsets.BDay
            elif self._freq == "BQE":
                self._offset_function = pd.offsets.BQuarterEnd
            else:
                raise ValueError(f"{self._freq} is not supported freq")

            kwargs = {"k_regimes": k_regimes, "order": order, "switching_ar": switching_ar,
                      "switching_variance": switching_variance, "trend": trend, "search_rep": search_rep,
                      "freq": self._freq}
            self._fitted_kwargs = kwargs.copy()

            model = sm.tsa.MarkovAutoregression(
                X,
                k_regimes=k_regimes,
                order=order,
                switching_ar=switching_ar,
                switching_variance=switching_variance,
                trend=trend,
                freq=self._freq,
            ).fit(search_reps=search_rep)
            self._is_fitted = True
            self._model = model

    def get_model_summary(self):
        if self._is_fitted:
            return self._model.summay()
        else:
            raise Exception("No model fitted")

    def predict_state_duration(self):
        if self._is_fitted:
            smoothed_marginal_probabilities = self._model.smoothed_marginal_probabilities.copy()
            t_transition_matrix = self.get_transition_matrix()
            expected_durations = self._model.expected_durations  # array

            # last date's marginal prob
            t_marginal_prob = smoothed_marginal_probabilities.iloc[-1]
            t_plus_one_state_prob = np.dot(t_marginal_prob, t_transition_matrix)

            t_plus_one_state = np.argmax(t_plus_one_state_prob)
            state_duration = np.floor(expected_durations)[t_plus_one_state]

            duration_date = (
                    pd.to_datetime(smoothed_marginal_probabilities.index[-1]) + self._offset_function(
                state_duration)).date().isoformat()
            return duration_date
        else:
            raise Exception("No fitted model")

    def get_marginal_probabilities(self) -> pd.DataFrame:
        if self._is_fitted:
            marginal_probabilities_df = self._model.smoothed_marginal_probabilities.copy()

            # for Each columns
            dfs = [marginal_probabilities_df[i] for i in range(marginal_probabilities_df.shape[1])]
            smoothed_marginal_prob = pd.DataFrame(dfs).T
            return smoothed_marginal_prob
        else:
            raise Exception("No fitted model")

    def save(self, dir_path: str) -> None:
        if not self._is_fitted:
            raise Exception("No fitted model")
        if not os.path.exists(dir_path):
            os.makedirs(dir_path, exist_ok=True)

        kwargs_file_path = os.path.join(dir_path, self.KWARGS_FILE_NAME)
        model_file_path = os.path.join(dir_path, self.MODEL_FILE_NAME)

        with open(kwargs_file_path, "w") as f:
            json.dump(self._fitted_kwargs, f, indent=4)

        # 모델 저장
        with open(model_file_path, 'wb') as file:
            pickle.dump(self._model, file)

    @classmethod
    def load(cls, dir_path: str):
        kwargs_file_path = os.path.join(dir_path, cls.KWARGS_FILE_NAME)
        model_file_path = os.path.join(dir_path, cls.MODEL_FILE_NAME)

        if os.path.isfile(kwargs_file_path):
            with open(kwargs_file_path) as f:
                kwargs = json.load(f)
        else:
            raise Exception(f"{kwargs_file_path} does not exist")

        if os.path.isfile(model_file_path):
            with open(model_file_path, 'rb') as file:
                model = pickle.load(file)
        else:
            raise Exception(f"{model_file_path} does not exist")

        obj = cls()
        obj._is_fitted = True
        obj._fitted_kwargs = kwargs
        obj._model = model
        obj._freq = kwargs["freq"]
        freq_name = kwargs["freq"]
        if  freq_name == "BME":
            obj._offset_function = pd.offsets.BMonthEnd
        elif freq_name == "B":
            obj._offset_function = pd.offsets.BDay
        elif freq_name == "BQE":
            obj._offset_function = pd.offsets.BQuarterEnd
        else:
            raise ValueError(f"{freq_name} is not supported freq")

        return obj


if __name__ == "__main__":
    data = preprocessing_growth_model_data(data_path="KOREA_EXPORTS_20231024.xlsx", sector_code="11")
    model = GrowthModel()
    model.train(X=data)
    state_duration = model.predict_state_duration()
    marginal_probabilities = model.get_marginal_probabilities()
    model.save("growth_model")

    new_model = GrowthModel().load("growth_model")
    print(new_model.predict_state_duration())
