<div STYLE="page-break-after: always;"></div>

## Big Data HW7

LI Dacheng (12431477)

### Task 1:

> Identify one hyper-parameter that you deem relevant to avoid overfit. Explain, in words, why you think that parameter is relevant for overfitting. Set all other parameters to reasonable choices (either by hand, or via k-fold cross-validation)

---

In a Random Forest model, I consider the parameter **n_estimators** to be particularly significant in preventing overfitting. This hyperparameter determines the number of decision trees constructed within the forest. The count of trees directly influences the model’s capability to generalize and its overall performance. While increasing the number of trees can enhance the model's accuracy, excessively high values for **n_estimators** may lead to overfitting.

Several reasons support this assertion:

- A higher number of trees means increased model complexity, as each individual tree can identify unique patterns within the data.
- Even though adding more trees typically decreases model variance, it can also contribute to the model capturing noise and anomalies from the training dataset, resulting in overfitting.

To fine-tune other hyperparameters, 5-fold cross-validation was utilized. The optimal parameters obtained were:

**Optimal Parameters:**

{'min_samples_leaf': 2, 'min_samples_split': 5, 'n_estimators': 100 }

<div style="page-break-after:always;"></div>

### Task 2:

> Plot along the x-axis your selected hyper-parameter and along the y-axis the error for  both training and test data. By visual inspection, determine the optimal value for the  hyperparameter.

---

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw7/task2.png?raw=true" width=75% alt="">
</div>

By observing the plot, it is evident that the optimal value for the hyperparameter **n_estimators** is approximately 18.

### Task 3:

> Repeat Task 1 & 2 with a gradient boost method and use the learning rate as your selected hyperparameter.

---

In Gradient Boosting, the **learning rate** serves as a crucial hyperparameter that regulates how much influence each newly added tree has on the final model.

When the learning rate is higher, the contribution of each additional tree becomes more significant compared to situations with lower learning rates.

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw7/task3.png?raw=true" width=75% alt="">
</div>

By observing the plot, it is evident that the optimal value for the hyperparameter **learning_rate** is approximately 0.1.