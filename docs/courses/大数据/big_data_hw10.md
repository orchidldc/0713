<div STYLE="page-break-after: always;"></div>

## Big Data HW10

LI Dacheng (12431477)

### Task 1:

> Analyze the SHAP values via summary plot and compare them with the regression coefficients of a linear regression. The regression coefficients of which features roughly agree with the trend of the Shapley values and which ones are significantly different?

---

We run a linear regression model on the california housing dataset and compare the regression coefficients with the SHAP values. The SHAP values are calculated using the `shap` library, and the regression coefficients are obtained from the linear regression model. We then plot the SHAP summary plot and compare it with the regression coefficients.

The SHAP summary plot:

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw10/task1.png?raw=true" width=75% alt="">
</div>

Comparison of SHAP values and regression coefficients:

<div class="centertable">

|      |  Feature   | Regression Coefficient | Mean abs SHAP Value |
| ---: | :--------: | :--------------------: | :-----------------: |
|    6 |  Latitude  |        -0.8969         |       0.8238        |
|    7 | Longitude  |        -0.8698         |       0.7834        |
|    0 |   MedInc   |         0.8544         |       0.6116        |
|    2 |  AveRooms  |        -0.2944         |       0.1377        |
|    1 |  HouseAge  |         0.1225         |       0.1027        |
|    3 | AveBedrms  |         0.3393         |       0.0846        |
|    5 |  AveOccup  |        -0.0408         |       0.0021        |
|    4 | Population |        -0.0023         |       0.0016        |

</div>

1. **Features with High Agreement**
   - **Latitude** and **Longitude**: The SHAP values for `Latitude` and `Longitude` show a high mean SHAP value with negative impacts (most SHAP values are on the negative side). The regression coefficients are also negative, with values of -0.8969 and -0.8698, respectively.
   - **MedInc** (Median Income): The SHAP plot shows high positive SHAP values for `MedInc`, indicating that higher median income has a positive impact on housing prices. The regression coefficient (0.8543) is also strongly positive.
   - **AveRooms** (Average Rooms): Both SHAP values and the regression coefficient indicate a negative impact. This suggests that a higher average number of rooms correlates with lower predicted housing prices, possibly reflecting lower-density housing areas.

2. **Features with Significant Discrepancies**
   - **AveBedrms** (Average Bedrooms per Household):
     - `AveBedrms` has a relatively high regression coefficient (0.3393), suggesting a notable positive impact on the predictions.
     - However, the mean absolute SHAP value is quite low (0.0846), indicating that `AveBedrms` does not contribute strongly to the model's predictions according to SHAP values.
     - **Interpretation**: This discrepancy suggests that `AveBedrms` might have a linear relationship in the model due to its high coefficient, but its actual contribution to individual predictions is low. SHAP values capture the feature's overall importance across samples, suggesting that `AveBedrms` may not be as consistently impactful as the regression coefficient implies.

### Task 2:

> Can you see some non-linear effects among some features via SHAP values (e.g. via interaction plots). Elaborate and rationalize your finding.

---

We examine all feature combinations ($\frac{8 \times 7}{2} = 28$) using SHAP dependence plots to identify non-linear effects among features. We did not find any non-linear effects.

Two specific dependence plots are shown below:

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw10/task2_1.png?raw=true" width=75% alt="">

<br>
<br>
<br>

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw10/task2_2.png?raw=true" width=75% alt="">
</div>

**- Latitude with Interaction on Longitude**

   - **Linear Relationship**: The SHAP values for `Latitude` show a linear downward trend, indicating that as `Latitude` increases, the impact on the prediction decreases linearly. This implies that `Latitude` has a negative influence on the model’s predictions.
   - **Interaction with Longitude**: The color represents `Longitude`. The SHAP values for Latitude appear to vary systematically with Longitude:
     - When Longitude is higher (red points), the SHAP values for Latitude are generally less negative at any given Latitude level.
     - When Longitude is lower (blue points), the SHAP values for Latitude tend to be more negative.
   - This interaction reflect geographic patterns.

**- HouseAge with Interaction on Longitude**

   - **Linear Relationship**: The SHAP values for `HouseAge` exhibit a clear linear trend, increasing steadily with the value of `HouseAge`.
   - **Interaction with Longitude**: The color bar represents `Longitude`, where red indicates higher `Longitude` values and blue indicates lower ones. However, as `HouseAge` increases, the SHAP values do not vary significantly with changes in `Longitude`. This suggests that the impact of `HouseAge` on the model output is consistent across different `Longitude` values, with no interaction effect between these two features.

### Task 3:

> Use PCA to extract feature importances and compare them with the feature importances you can get from the SHAP values. Do they coincide?

---

1. Before doing PCA, we need to standardize the data, this step is necessary because PCA is sensitive to the scale of the data.

```python
X_standardized = (X - X.mean(axis=0)) / X.std(axis=0)
```

2. Observe the explained variance ratio of each principal component:

array([**0.2534, 0.2352**, 0.1589, 0.1289, 0.1254, 0.0824, 0.0102, 0.0057])

The first two principal components explain around 49% of the variance, they both important. So we use the first two PCs to derive the feature importances.

<div class="centertable">

|    | Feature    |   PCA Importance |
|---:|:-----------|-----------------:|
|  2 | AveRooms   |           0.9858 |
|  7 | Longitude  |           0.9594 |
|  6 | Latitude   |           0.9424 |
|  3 | AveBedrms  |           0.9018 |
|  0 | MedInc     |           0.3073 |
|  4 | Population |           0.2724 |
|  1 | HouseAge   |           0.2681 |
|  5 | AveOccup   |           0.0173 |

</div>

3. Calculate mean absolute SHAP values for each feature to represent feature importance:

<br>

<div class="centertable">

|    | Feature    |   Mean SHAP Value |
|---:|:-----------|------------------:|
|  6 | Latitude   |            0.8238 |
|  7 | Longitude  |            0.7834 |
|  0 | MedInc     |            0.6116 |
|  2 | AveRooms   |            0.1377 |
|  1 | HouseAge   |            0.1027 |
|  3 | AveBedrms  |            0.0846 |
|  5 | AveOccup   |            0.0021 |
|  4 | Population |            0.0016 |

</div>

4. Merge the two tables, normalize the values to have a sum of 1:

<br>

<div class="centertable">

|    | Feature    |   PCA Importance |   Mean SHAP Value |
|---:|:-----------|-----------------:|------------------:|
|  0 | AveRooms   |           0.2118 |            0.054  |
|  1 | Longitude  |           0.2061 |            0.3075 |
|  2 | Latitude   |           0.2025 |            0.3234 |
|  3 | AveBedrms  |           0.1938 |            0.0332 |
|  4 | MedInc     |           0.066  |            0.2401 |
|  5 | Population |           0.0585 |            0.0006 |
|  6 | HouseAge   |           0.0576 |            0.0403 |
|  7 | AveOccup   |           0.0037 |            0.0008 |

</div>

**- Analysis and Comparison**

- **PCA Importance**: The top features according to PCA are `AveRooms`, `Longitude`, `Latitude`, and `AveBedrms`, which together explain most of the variance in the dataset. These features have the highest contributions to the first 2 PCs, suggesting that they capture the primary sources of variance in the data.
- **SHAP Importance**: According to SHAP values, `Latitude`, `Longitude`, and `MedInc` are the most important features, as they have the highest mean SHAP values, indicating their strong influence on the model’s predictions.

- **PCA vs. SHAP**: PCA and SHAP offer different perspectives on feature importance. PCA ranks features based on their contribution to explaining variance in the data, while SHAP ranks them based on their contribution to the model’s predictions.
- **Complementary Perspectives**: Together, PCA and SHAP provide a more comprehensive view. PCA helps identify features that describe the structure of the data, while SHAP highlights features that are critical for accurate predictions. For housing prices, location (`Latitude`, `Longitude`) and income (`MedInc`) are crucial predictors, while room-related features like `AveRooms` explain data variance but are less predictive of housing prices directly.

<div STYLE="page-break-after: always;"></div>

## Appendix: Code Implementation

```python {.line-numbers}
    import warnings

    from sklearn.decomposition import PCA

    warnings.filterwarnings("ignore")
    import numpy as np
    import pandas as pd
    import shap
    from sklearn.datasets import fetch_california_housing
    from sklearn.linear_model import LinearRegression
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import StandardScaler

    data = fetch_california_housing()
    X, y = data.data, data.target
    feature_names = data.feature_names

    # data preprocessing
    X_train, X_test, y_train, y_test = train_test_split(X,
                                                        y,
                                                        test_size=0.2,
                                                        random_state=42)
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
```

### Task 1

```python {.line-numbers}
    # linear regression
    model = LinearRegression()
    model.fit(X_train, y_train)

    # get results
    coefficients = model.coef_
    coef_df = pd.DataFrame({
        'Feature': feature_names,
        'Regression Coefficient': coefficients
    })

    # SHAP
    explainer = shap.Explainer(model, X_train)
    shap_values = explainer(X_test)

    shap.summary_plot(shap_values, X_test, feature_names=feature_names)
    mean_shap_values = np.abs(shap_values.values).mean(axis=0)
    shap_df = pd.DataFrame({
        'Feature': feature_names,
        'Mean SHAP Value': mean_shap_values
    })

    comparison_df = pd.merge(coef_df, shap_df, on='Feature')
    comparison_df.sort_values(by='Mean SHAP Value', ascending=False, inplace=True)
    comparison_df.round(4)
```

### Task 2

```python {.line-numbers}
    # import itertools
    # for feature_1, feature_2 in itertools.combinations(feature_names, 2):
    #     shap.dependence_plot(feature_1, shap_values.values, X_test, feature_names=feature_names, interaction_index=feature_2)
    # Dependence plot between 'MedInc' (Median Income) and 'HouseAge'
    shap.dependence_plot('HouseAge',
                        shap_values.values,
                        X_test,
                        feature_names=feature_names,
                        interaction_index='Longitude')

    # Dependence plot between 'Latitude' and 'Longitude'
    shap.dependence_plot('Latitude',
                        shap_values.values,
                        X_test,
                        feature_names=feature_names,
                        interaction_index='Longitude')
```

### Task 3

```python {.line-numbers}
    X_standardized = (X - X.mean(axis=0)) / X.std(axis=0)
    pca = PCA(n_components=len(feature_names))
    pca.fit(X_standardized)
    np.round(pca.explained_variance_ratio_, 4)

    # Get feature importances based on PCA
    # Absolute values of the first two principal components' loadings
    pca_feature_importance = np.abs(pca.components_[0]) + np.abs(
        pca.components_[1])
    pca_importance_df = pd.DataFrame({
        'Feature': feature_names,
        'PCA Importance': pca_feature_importance
    }).sort_values(by='PCA Importance', ascending=False)

    # Display PCA-based feature importance
    print("PCA-based feature importance:")
    pca_importance_df.round(4)

    # Calculate mean absolute SHAP values for each feature to represent feature importance
    mean_shap_values = np.abs(shap_values.values).mean(axis=0)
    shap_importance_df = pd.DataFrame({
        'Feature': feature_names,
        'Mean SHAP Value': mean_shap_values
    }).sort_values(by='Mean SHAP Value', ascending=False)

    # Display SHAP-based feature importance
    print("\nSHAP-based feature importance:")
    shap_importance_df.round(4)

    # Merge PCA and SHAP importance dataframes for comparison
    comparison_df = pd.merge(pca_importance_df, shap_importance_df, on='Feature')
    comparison_df = comparison_df.sort_values(by='PCA Importance', ascending=False)
    print("\nComparison of PCA-based and SHAP-based feature importance:")
    comparison_df.iloc[:, 1:] /= comparison_df.iloc[:, 1:].sum(axis=0)
    comparison_df
```