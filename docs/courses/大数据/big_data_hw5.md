<div STYLE="page-break-after: always;"></div>

## Big Data HW5

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

> Derive mathematically the number of features that you have if you start from $k$ base features and polynomially expand them to $n$-th order.

---

the number of features after expanding $k$ base features to a polynomial of order $n$ is: $\binom{k + n}{n} = \frac{(k + n)!}{k! n!}$

in our case, $k=8$

- when $n=2$, the total number of features is $\binom{8 + 2}{2} = 45$
- when $n=3$, the total number of features is $\binom{8 + 3}{3} = 165$
- when $n=4$, the total number of features is $\binom{8 + 4}{4} = 495$
- when $n=5$, the total number of features is $\binom{8 + 5}{5} = 1287$

When $k=8$ and $n=5$, the number of features exceeds the amount of data (891)

<div style="page-break-after:always;"></div>

### Task 2:

> Use again an 80%-20% train-test split to assess the accuracy of predicting survivors of the Titanic disaster. Simultaneously tune the polynomial order and the regularization strength hyperparameters via k-fold cross-validation.

---

According to k-fold cross-validation, the optimal polynomial degree is 2. The model's performance is as follows:

**- Classification Report:**

<div class="centertable">

| Class | Precision | Recall | F1-Score | Support |
| ----- | --------- | ------ | -------- | ------- |
| 0     | 0.81      | 0.89   | 0.85     | 105     |
| 1     | 0.81      | 0.70   | 0.75     | 74      |

</div>

**- Confusion Matrix:**

<div class="centertable">

|          | Negative | Positive |
| -------- | -------- | -------- |
| Negative | 93       | 12       |
| Positive | 22       | 52       |

</div>

**- Bootstrap**

use bootstrap to estimate the prediction error, 100 times, 300 samples each time.

the mean and standard deviation is 0.81 $\pm$ 0.02

**- Prediction results**

According to the prediction results, the test set's survival rate is 41%, indicating that the model's fitting performance is satisfactory.

### Task 3:

> Assess the feature importance of higher order features. Can you find relatively important features at second order or higher? If so, provide intuition for how these combined features can be interpreted.

---

- **Pclass × SibSp (Coefficient -2.01):**

The negative coefficient suggests that the interaction between passenger class and the number of siblings or spouses negatively affected survival chances. Passengers in lower classes, especially those traveling with more family members, had a significantly lower likelihood of surviving. This could be because lower-class passengers were positioned farther from lifeboats, and moving as a group made quick evacuation difficult, reducing their chances of survival.

- **Pclass × Sex (Coefficient -1.89):**

This negative coefficient reflects that the combination of class and gender had an adverse effect on survival, particularly for men in lower classes. Historical "women and children first" policies favored women, especially those in first class, while men in third class were at a distinct disadvantage. This interaction highlights that being male in a lower class significantly reduced survival chances.

- **Sex × Age (Coefficient 1.53):**

The positive coefficient indicates that the interaction between sex and age had a favorable impact on survival, particularly for younger women. The "women and children first" policy prioritized young women, boosting their survival chances, while older men were less likely to survive. This positive interaction captures the benefit younger women experienced during rescue efforts.