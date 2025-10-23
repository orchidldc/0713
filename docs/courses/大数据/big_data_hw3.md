<div STYLE="page-break-after: always;"></div>

## Big Data HW3

### Task 1:

> Train a linear regression model with Ridge regularization to predict the median house value on 20% of the data which you reserve for testing. Use 5-fold cross-validation to determine the best regularization value. How well are you at predicting? Put your prediction results into perspective.

---

**- Normalize data**

use `StandardScaler` to normalize the data.

**- Ridge regression**

determine the best regularization parameter $\alpha$ from 1000 values in the range of $10^{-6}$ to $10^6$ using 5-fold cross-validation.

the best $\alpha$ is **28.8**.

**- Bootstrap**

use bootstrap to estimate the prediction error, 100 times, 3000 samples each time.

the mean $R^2$ is **0.585**.

**- Prediction results**

In my perspective, the prediction results are not very good, the $R^2$ is only 0.58, which means that the model can only explain 58% of the variance in the data.

### Task 2:

> Which feature is most important?

---

According to the Ridge regression model, the most important feature is `Latitude`, which has the largest coefficient of 0.89.

### Task 3:

> Repeat Task 1 but with Lasso-instead of Ridge-regularization. Which one works 
better?

---

**Lasso regression**

determine the best regularization parameter $\alpha$ from 1000 values in the range of $10^{-6}$ to $10^6$ using 5-fold cross-validation.

the best $\alpha$ is **2.37 x $10^{-3}$**.

**- Bootstrap**

use bootstrap to estimate the prediction error, 100 times, 3000 samples each time.

the mean $R^2$ is **0.576**.

**- Comparison**

The Lasso regression model works slightly worse than the Ridge regression model, they have similar $R^2$ values.

### Task 4:

> Repeat Task 1 but instead of fixing the regularization strength via cross-validation, you fix it ex ante. Plot along the x axis different choice of regularization strength and along the y axis some metric to measure your out of sample prediction. Pick a reasonable range of regularization values, preferably log scaled.

---

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw3/R2_vs_alpha.png?raw=true" width=88% alt="">
</div>

**- Initial Region (Small \(\alpha\)):**

For very small values of $\alpha$ (close to $10^{-5}$), the $R^2$ score remains relatively constant and high (around 0.6). This indicates that the model performs well in this region, suggesting that little regularization is being applied. In this case, the model is likely close to ordinary least squares (OLS), where no penalty is applied for the coefficients' size.

**- Intermediate Region:**

As $\alpha$ increases (from approximately $10^{-3}$ to $10^1$), the model still maintains high $R^2$ values. However, after a certain point, the $R^2$ score begins to gradually decline. This suggests that the increasing regularization strength is starting to have an impact, reducing the model's flexibility and leading to a slight reduction in performance.

**- Large \(\alpha\) Values:**

For very large $\alpha$ values (from $10^3$ to $10^5$), there is a noticeable drop in the $R^2$ score. This indicates that excessive regularization leads to underfitting, where the model becomes too constrained and fails to capture the underlying patterns in the data. The regularization term dominates, shrinking the coefficients towards zero, thus negatively impacting prediction accuracy.

---

The plot demonstrates the trade-off between bias and variance in ridge regression. When $\alpha$ is too small, the model may overfit, whereas when $\alpha$ is too large, the model may underfit. The optimal range of $\alpha$ lies somewhere between these extremes, where the model maintains a good balance of flexibility and generalization ability.