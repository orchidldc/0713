<div STYLE="page-break-after: always;"></div>

## Big Data HW6

LI Dacheng (12431477)

**- data preprocessing**

- drop useless features, including `PassengerId`, `Name`, `Ticket` and `Cabin`
- map `gender` into binary variable
- fill missing values
  - `Age`: use median
  - `Embarked`: mode
- convert categorical feature `Embarked` into dummy
- use `StandardScaler` to normalize the data

### Task 1:

> Train a random forest to predict survivors in the Titanic dataset. Report your test results in an intuitive manner.

---

| Precision       | Recall          | F1-Score        | Accuracy        |
| --------------- | --------------- | --------------- | --------------- |
| 0.74 $\pm$ 0.08 | 0.72 $\pm$ 0.07 | 0.79 $\pm$ 0.05 | 0.85 $\pm$ 0.04 |

The model's fitting performance appears to be strong, as the survival rate in the test set is 41%.

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw6/ConfusionMatrix.png?raw=true" width=75% alt="">
</div>

### Task 2:

> Use the trained random forest to obtain a list of feature importances. Compare them to the feature importances that you have obtained from a logistic regression.

---

According to random forest, feature importances are as follows:

<div class="centertable">

|      | Feature    | Importance |
| ---: | :--------- | ---------: |
|    1 | Sex        |   0.361127 |
|    5 | Fare       |   0.225844 |
|    2 | Age        |    0.18096 |
|    0 | Pclass     |   0.109599 |
|    3 | SibSp      |  0.0490807 |
|    4 | Parch      |  0.0412397 |
|    7 | Embarked_S |  0.0235482 |
|    6 | Embarked_Q | 0.00860142 |

</div>

The features ranked by their importance in logistic regression, in descending order, are: 

['Sex', 'Pclass', 'Embarked_S', 'SibSp', 'Age', 'Parch', 'Embarked_Q', 'Fare'].

By comparsion, 'Sex' remains the most important feature, although the importance of other features has shifted.

### Task 3:

> Same as Task 1 but for a gradient boost method.

---

| Precision       | Recall          | F1-Score        | Accuracy        |
| --------------- | --------------- | --------------- | --------------- |
| 0.67 $\pm$ 0.08 | 0.71 $\pm$ 0.10 | 0.79 $\pm$ 0.05 | 0.82 $\pm$ 0.07 |

The survival rate in the test set is 40%, slightly weaker than the random forest model.

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw6/Task3.png?raw=true" width=75% alt="">
</div>

### Task 4:

> Compare accuracy on both train- and test dataset for the random forest, gradient boost and logistic regression. Which method has best performance on the test data? Which method tends to overfit most on the training data?

---

**- Random Forest:**

|          | TRAIN SET      | TEST SET       |
| -------- | -------------- | -------------- |
| Accuracy | 0.90 $\pm$ 0.02 | 0.89 $\pm$ 0.05 |

**- Gradient Boosting:**

|          | TRAIN SET      | TEST SET       |
| -------- | -------------- | -------------- |
| Accuracy | 0.93 $\pm$ 0.02 | 0.93 $\pm$ 0.03 |

**- Logistic Regression:**

|          | TRAIN SET      | TEST SET       |
| -------- | -------------- | -------------- |
| Accuracy | 0.81 $\pm$ 0.01 | 0.84 $\pm$ 0.05 |

Gradient boosting has the best performance on the test data, while logistic regression tends to overfit most on the training data.