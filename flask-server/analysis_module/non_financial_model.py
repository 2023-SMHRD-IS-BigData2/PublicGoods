import os
import inspect
import json
import pickle
import pandas as pd
from sklearn.ensemble import RandomForestClassifier


class NonFinancialModel(object):
    KWARGS_FILE_NAME = "kwargs.json"
    MODEL_WEIGHT_FILE_NAME = "model.pkl"

    def __init__(
            self,
            model_name: str,
            n_estimators: int,
            criterion: str,
            max_depth: int,
    ):

        self.model_name = model_name
        self.n_estimators = n_estimators
        self.criterion = criterion
        self.max_depth = max_depth

        self._is_fitted = False

        if self.model_name == "random_forest":
            self.model = RandomForestClassifier(
                n_estimators=self.n_estimators,
                criterion=self.criterion,
                max_depth=self.max_depth
            )
        elif self.model_name == "catboost":
            pass
        elif self.model_name == "xgboost":
            pass
        else:
            raise ValueError(f"{self.model_name} Unknown model")

    def train(self, X: pd.DataFrame, y: pd.DataFrame):
        y = y.values.ravel()
        self.model.fit(X, y)
        self._is_fitted = True

    def predict(self, X: pd.DataFrame, pred_prob: bool):
        if self._is_fitted:
            if pred_prob:
                return self.model.predict_proba(X)
            else:
                return self.model.predict(X)
        else:
            raise Exception(f"Model was not fitted yet")

    def get_feature_importance(self) -> pd.DataFrame:
        if self._is_fitted:
            feature_importance_df = pd.DataFrame([
                self.model.feature_importances_, self.model.feature_names_in_]).T
            feature_importance_df.columns = ["Feature Importances", "Column Name"]
            feature_importance_df = feature_importance_df.sort_values("Feature Importances", ascending=True)
            feature_importance_df = feature_importance_df.set_index("Column Name")
            return feature_importance_df
        else:
            raise Exception(f"Model was not fitted yet")

    def save(self, dir_path: str) -> None:
        if not os.path.exists(dir_path):
            os.makedirs(dir_path, exist_ok=True)

        kwargs_file_path = os.path.join(dir_path, self.KWARGS_FILE_NAME)
        model_file_path = os.path.join(dir_path, self.MODEL_WEIGHT_FILE_NAME)

        keys = set(inspect.getfullargspec(self.__init__).args)
        kwargs = {}
        for key, val in self.__dict__.items():
            if key in keys:
                kwargs[key] = val

        with open(kwargs_file_path, "w") as f:
            json.dump(kwargs, f, indent=4)

        # 모델 저장
        with open(model_file_path, 'wb') as file:
            pickle.dump(self.model, file)

    @classmethod
    def load(cls, dir_path: str):
        kwargs_file_path = os.path.join(dir_path, cls.KWARGS_FILE_NAME)
        model_file_path = os.path.join(dir_path, cls.MODEL_WEIGHT_FILE_NAME)

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

        obj = cls(**kwargs)
        obj.model = model
        obj._is_fitted = True
        return obj

