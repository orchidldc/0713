<div STYLE="page-break-after: always;"></div>

## Big Data HW8

LI Dacheng (12431477)

### Task 1:

> Use sklearn’s implementation of the multiplayer perceptron and compare its prediction 
accuracy with the one from an ensemble method of your choice.

---

We used cross-validation to determine the optimal parameters for the **MLP model**. The parameter grid was defined as follows:

```python
param_grid = {
    'hidden_layer_sizes': [(32, 16), (32, 16, 8)],
    'activation': ['tanh', 'relu'],
    'solver': ['adam'],
    'alpha': [0.0001, 0.0005, 0.001, 0.0015, 0.01, 0.02, 0.03, 0.04, 0.05],
    'learning_rate': ['adaptive'],
}
```

The best model found was:

**MLPRegressor**

```python
MLPRegressor(
    activation='tanh',
    alpha=0.0015,
    hidden_layer_sizes=(32, 16, 8),
    learning_rate='adaptive',
    max_iter=1000,
    random_state=42
)
```

This model converged after 260 iterations, achieving an \( R^2 \) score of 0.79 on the test set.

For comparison, we also evaluated a **Random Forest** model.

The parameter grid for the **Random Forest** model was defined as follows:

```python
param_grid = {
    'n_estimators': [100, 200],
    'max_depth': [10],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}
```

The best model obtained was:

**RandomForestRegressor**

```python
RandomForestRegressor(
    max_depth=10,
    min_samples_leaf=2,
    min_samples_split=5,
    random_state=42
)
```

This model achieved an \( R^2 \) score of 0.775 on the test set.

The **MLP model** outperformed the Random Forest model in this case.

### Task 2:

> Build your own neural network (e.g. with pytorch or keras) and repeat task 2. Detail your network architecture, and report the number of trainable parameters of your model. Plot train- and test- loss as a function of the number of epochs, and also use early-stopping callbacks to determine when to stop training.

---

My network architecture:

![alt text](images/image-139.png)

![alt text](images/image-140.png)

Based on the figure above, we observe that the training loss consistently decreases as the number of epochs increases. The early stopping mechanism halted training at epoch 104, with a patience setting of 10, indicating that validation loss stopped improving after epoch 94. This plateau in validation loss is also visible in the graph.

### Task 3:

> Building on task 2, Investigate the influence of weight regularization on your performance by plotting the test error as a function of regularization strength.

---

The regularization strengths we tested were as follows:

```python
regularization_strengths = [
    0, 0.0001, 0.00015, 0.0005, 0.01, 0.02, 
    0.03, 0.04, 0.05, 0.1, 0.5, 0.6, 0.8, 1
]
```

The graph of **Test Error vs. Regularization Strength** shows a monotonic increase in test error as the regularization strength increases. This outcome is due to the sparse selection of regularization values. By testing a finer range of values, we identify that the optimal regularization parameter is approximately 0.00015.