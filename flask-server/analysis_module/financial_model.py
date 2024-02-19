import os
import inspect
import json
import pickle
import pandas as pd
from typing import List
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline


class FinancialModel(object):
    KWARGS_FILE_NAME = "kwargs.json"
    PIPELINE_FILE_NAME = "pipeline.pkl"

    def __init__(
            self,
            model_name: str,
            n_estimators: int,
            criterion: str,
            max_depth: int,
            categorical_features: List[int],
    ):

        self.model_name = model_name
        self.n_estimators = n_estimators
        self.criterion = criterion
        self.max_depth = max_depth
        self.categorical_features = categorical_features

        self._is_fitted = False

        one_hot_encoder = OneHotEncoder()
        preprocessor = ColumnTransformer(
            transformers=[
                ('cat', one_hot_encoder, categorical_features)
            ],
            remainder='passthrough'
        )

        if self.model_name == "random_forest":
            rfc = RandomForestClassifier(n_estimators=self.n_estimators,
                                         criterion=self.criterion,
                                         max_depth=self.max_depth)
            self.pipeline = Pipeline(
                steps=[('preprocessor', preprocessor),
                       ('classifier', rfc)])

        elif self.model_name == "catboost":
            pass
        elif self.model_name == "xgboost":
            pass
        else:
            raise ValueError(f"{self.model_name} Unknown model")

    def train(self, X: pd.DataFrame, y: pd.DataFrame):
        y = y.values.ravel()
        self.pipeline.fit(X, y)
        self._is_fitted = True

    def predict(self, X: pd.DataFrame, pred_prob: bool):
        if self._is_fitted:
            if pred_prob:
                return self.pipeline.predict_proba(X)
            else:
                return self.pipeline.predict(X)
        else:
            raise Exception(f"Model was not fitted yet")

    def get_feature_importance(self) -> pd.DataFrame:
        if self._is_fitted:
            # classifier 체크를 해야 할 수도 있음
            random_forest_model = self.pipeline.named_steps['classifier']

            feature_importance_df = pd.DataFrame([
                random_forest_model.feature_importances_, random_forest_model.feature_names_in_]).T
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
        pipeline_file_path = os.path.join(dir_path, self.PIPELINE_FILE_NAME)

        keys = set(inspect.getfullargspec(self.__init__).args)
        kwargs = {}
        for key, val in self.__dict__.items():
            if key in keys:
                kwargs[key] = val

        with open(kwargs_file_path, "w") as f:
            json.dump(kwargs, f, indent=4)

        # 모델 저장
        with open(pipeline_file_path, 'wb') as file:
            pickle.dump(self.pipeline, file)

    @classmethod
    def load(cls, dir_path: str):
        kwargs_file_path = os.path.join(dir_path, cls.KWARGS_FILE_NAME)
        pipeline_file_path = os.path.join(dir_path, cls.PIPELINE_FILE_NAME)

        if os.path.isfile(kwargs_file_path):
            with open(kwargs_file_path) as f:
                kwargs = json.load(f)
        else:
            raise Exception(f"{kwargs_file_path} does not exist")

        if os.path.isfile(pipeline_file_path):
            with open(pipeline_file_path, 'rb') as file:
                pipeline = pickle.load(file)
        else:
            raise Exception(f"{pipeline_file_path} does not exist")

        obj = cls(**kwargs)
        obj.pipeline = pipeline
        obj._is_fitted = True
        return obj
