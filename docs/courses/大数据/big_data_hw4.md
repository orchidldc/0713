<div STYLE="page-break-after: always;"></div>

## Big Data HW4

### Task 1:

> Reserve 20% of the data for testing and use 5-fold cross-validation to determine 
hyperparameters (if any). How well are you at predicting? Put your prediction results into perspective.

---

**- data preprocessing**

- drop useless features, including `PassengerId`, `Name`, `Ticket` and `Cabin`
- map `gender` into binary variable
- fill missing values
  - `Age`: use median
  - `Embarked`: mode
- convert categorical feature `Embarked` into dummy
- use `StandardScaler` to normalize the data

**- 5-fold cross-validation (model performance)**

Classification Report:

<div class="centertable">

| Class | Precision | Recall | F1-Score | Support |
| ----- | --------- | ------ | -------- | ------- |
| 0     | 0.83      | 0.85   | 0.84     | 110     |
| 1     | 0.76      | 0.72   | 0.74     | 69      |

</div>

Confusion Matrix:

<div class="centertable">

|          | Negative | Positive |
| -------- | -------- | -------- |
| Negative | 94       | 16       |
| Positive | 19       | 50       |

</div>

**- Bootstrap**

use bootstrap to estimate the prediction error, 100 times, 300 samples each time.

the mean and standard deviation is 0.8037 $\pm$ 0.0248

**- Prediction results**

According to the prediction results, the model predict non-survivors more accurately than survivors.

### Task 2:

> Which feature is most important?

---

According to the logistic regression model, the most important feature is `sex`, which has the largest coefficient of 1.80.

### Task 3:

> Sort your features according to importance. Then, remove one feature at the time, starting from the least important one, and retrain the model until you are left with only the most important feature. Plot the ROC curves and report accuracy score as a function of remaining features.

---

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw4/hw4_task3_1.png?raw=true" width=75% alt="">
</div>

<br>
<br>
<br>

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw4/hw4_task3_2.png?raw=true" width=75% alt="">
</div>

**- ROC Curves**

- The AUC values remain quite stable from 2 to 8 features, ranging between 0.86 to 0.87.
- The performance significantly drops when only 1 feature is used, with an AUC of 0.77.
- This suggests that most of the predictive power is retained with at least 2 features, while the additional features from 3 to 8 provide marginal improvement.

**- Accuracy Score**

- The accuracy initially stays flat when reducing the number of features from 8 to 1, hovering around 0.79.
- At 5 features, the accuracy starts improving significantly and peaks when using 6 and 7 features (around 0.815).
- Interestingly, the model's performance drops slightly when using 8 features, which may indicate that the 8th feature might introduce noise or redundancy.
- The drastic drop in performance when only 1 feature is used aligns with the results from the ROC curve plot, confirming that a single feature does not capture enough information for the model.

A balance of around 6 or 7 features seems optimal for this model, based on both the ROC curves and accuracy metrics. Further removal of features could negatively impact performance, while including too many might introduce redundancy.

<div STYLE="page-break-after: always;"></div>

### Task 4:

> Repeat your fit from Task 1, but instead of minimizing the cross-entropy (or which ever metric youhad used), minimize the mean-squared error. Compare your results to those of Task 1.

---

For task 4, we apply ridge regression to predict a binary outcome (survival or non-survival). To achieve this, we use a sigmoid function to convert the ridge regression predictions into probabilities, which are then transformed into binary values (0 or 1) based on a threshold 0.5.

**- 5-fold cross-validation (model performance)**

Classification Report:

<div class="centertable">

| Class | Precision | Recall | F1-Score | Support |
| ----- | --------- | ------ | -------- | ------- |
| 0     | 0.00      | 0.00   | 0.00     | 110     |
| 1     | 0.39      | 1.00   | 0.56     | 69      |

</div>

Confusion Matrix:

<div class="centertable">

|          | Negative | Positive |
| -------- | -------- | -------- |
| Negative | 0        | 110      |
| Positive | 0        | 69       |

</div>

**- Bootstrap**

use bootstrap to estimate the prediction error, 100 times, 300 samples each time.

the mean and standard deviation is 0.4044 $\pm$ 0.0278

**- Prediction results**

The prediction results indicate that the linear model, which minimizes the mean-squared error, performs poorly and is not suitable for classification tasks.