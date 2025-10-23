<div STYLE="page-break-after: always;"></div>

## Big Data HW2

### Task 1:

> Assume $\alpha$ and $\beta$ are known, and set $\sigma$ to a reasonable value (not too much noise, but also not too little, report your choice). For fixed $N$, plot the shape of the least squares objective function as a function of $\gamma$ (which is assumed unknown). How does the shape change as you increase $N$?

---

**Choice of $\sigma$:**

When choosing $\sigma$, we need to balance the noise level so that it is neither too large nor too small. According to the model, the student's minimum score is 7 and the maximum score is 232.9, the total change of the model signal is about 225.9.

To make the noise level moderate, we can set the standard deviation of the noise $\sigma$ to about 10% of the signal change range. Therefore $\sigma = 225.9 \times 10\% \approx 22.6$, so we set $\sigma = 20$ as a reasonable approximate value. This choice ensures that the effect of noise is significant enough to reflect the random fluctuations in the actual data, but not so large as to overwhelm the model signal.

**Shape of the least squares objective function as a function of $\gamma$:**

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw2/least_square_objective.png?raw=true" width=77% alt="">
</div>

As shown in the figure,

- No matter how large $N$ is, 
  - The shape of the least squares objective function as a function of $\gamma$ is a parabola.
  - The minimum value of the objective function is around $\gamma = 0.7$, which is the true value of $\gamma$.
- As $N$ increases, the parabola becomes steeper, the least squares objective becomes larger, and the function becomes more sensitive to the value of $\gamma$.

### Task 2:

> Fit $\gamma$ with least squares and an optimization algorithm of your choice. Report the fitted value and how many steps it takes for the algorithm to converge.

---

We choose `minimize` function from `scipy.optimize` to fit $\gamma$ with least squares. The initial value of $\gamma$ is set to 0.5. The optimization algorithm is L-BFGS-B.

The fitted value of $\gamma$ is **0.70021278**, which is very close to the true value of $\gamma = 0.7$. The algorithm converges in **18** steps.

<div STYLE="page-break-after: always;"></div>

### Task 3:

> Test the dependency of Task 2 on the starting value for $\gamma$. Concretely, plot the starting value along the x-axis and the number of steps needed for convergence (if it does converge) along the y-axis.

---

We set the range of the starting value of $\gamma$ to be from 0 to 3, and divide it into 100 intervals. For each starting value, we fit $\gamma$ with least squares and record the number of steps needed for convergence.

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw2/convergence_dependency.png?raw=true" width=88% alt="">
</div>

As shown in the figure,

- The number of steps needed for convergence is sensitive to the starting value of $\gamma$.
- When the starting value is close to the true value of $\gamma = 0.7$, the number of steps needed for convergence is small (except for the case of $\gamma \approx 0.85$).
- When the starting value is far from the true value, the number of steps needed for convergence is large.

<div STYLE="page-break-after: always;"></div>

### Task 4:

> Assume neither $\alpha$, $\beta$, nor $\sigma$ are known and fit all three parameters for fixed $N=1000$. Report the fitted values. Plot the data, the fitted curve and ground-truth curve (like the blue curve on the right, but once with fitted and once with ground-truth parameters).

---

<div class="centertable">

| Parameter            | Value   | Truth value |
| :------------------- | ------- | ----------- |
| Fitted alpha         | 1.63467 | 7           |
| Fitted beta          | 12.3226 | 9           |
| Fitted gamma         | 0.70186 | 0.7         |
| Number of iterations | 148     | -           |

</div>

<br>

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw2/Task4.png?raw=true" width=88% alt="">
</div>

Comparing the fitted curve with the ground-truth curve, we can see that the fitted curve is very close to the ground-truth curve. However, the fitted value of $\alpha$ and $\beta$ are not very close to the true value.

<div STYLE="page-break-after: always;"></div>

## Appendix: Code Implementation

```python {.line-numbers}
    import numpy as np
    import matplotlib.pyplot as plt
    from typing import Union
```

### Task 1

```python {.line-numbers}
    # Basic parameters for the regression model
    alpha = 7
    beta = 9
    gamma = 0.7
    sigma = 20

    # Different sample sizes
    N = [100, 1000, 2000, 5000, 10000, 20000]

    # Function to generate data
    def generate_data(n, alpha, beta, gamma, sigma):
        hours = np.random.uniform(0, 100, n)
        epsilon = np.random.normal(0, 1, n)
        scores = alpha + beta * (hours**gamma) + sigma * epsilon
        return hours, scores

    # Least squares objective function
    def least_squares_objective(initials: Union[np.float64, np.ndarray],
                                hours: list, scores: list) -> float:
        if isinstance(initials, np.float64) or len(initials) == 1:
            global alpha, beta
            gamma = initials
        elif len(initials) == 3:
            alpha, beta, gamma = initials
        else:
            raise ValueError(
                'Initials must be a numpy ndarray list of length 1 or 3')

        return np.sum((scores - (alpha + beta * (hours**gamma)))**2)
```

```python {.line-numbers}
    # Predefine range of gamma values
    Gamma = np.linspace(0, 1, 1000)

    # Plot least square objective for different sample sizes
    np.random.seed(0)
    for n in N:
        Hour_list, Score_list = generate_data(n, alpha, beta, gamma, sigma)
        objectives = [least_squares_objective(g, Hour_list, Score_list) for g in Gamma]
        plt.plot(Gamma, objectives, label=f'N = {n}')

    # Plot settings
    plt.xlabel('Gamma')
    plt.ylabel('Least square objective')
    plt.title('Least square objective vs Gamma')
    plt.legend()
    plt.savefig('least_square_objective.png')
    plt.show()
```

### Task 2

```python {.line-numbers}
    from scipy.optimize import minimize

    def optimize_gamma(Hour_list, Score_list, initials: Union[float, list]):
        result = minimize(
            least_squares_objective,
            x0=initials,
            args=(Hour_list, Score_list),
            method='L-BFGS-B',
            options={'disp': False}
        )
        
        if result.success:
            return result.x, result.nfev
        else:
            return None, np.inf

    Hour_list_10000, Score_list_10000 = generate_data(10000, alpha, beta, gamma, sigma)
    fitted_gamma, iterations = optimize_gamma(Hour_list_10000, Score_list_10000, 0.5)

    print(f"the fitted gamma: {fitted_gamma}")
    print(f"steps to reach iterations: {iterations}")
```

### Task 3

```python {.line-numbers}
    initial_gammas = np.linspace(0, 3, 100)
    iterations = []

    for initial_gamma in initial_gammas:
        _, steps = optimize_gamma(Hour_list_10000, Score_list_10000, initial_gamma)
        iterations.append(steps)

    plt.plot(initial_gammas, iterations)
    plt.xlabel('Initial gamma')
    plt.ylabel('Number of iterations for convergence')
    plt.title('Convergence dependency on initial gamma')
    plt.grid(True)
    plt.savefig('convergence_dependency.png')
    plt.show()
```

### Task 4

```python {.line-numbers}
    Hour_list_1000, Score_list_1000 = generate_data(1000, alpha, beta, gamma, sigma)
    initial_param = [1.0, 1.0, 1.0]
    fitted_param, iterations = optimize_gamma(Hour_list_1000, Score_list_1000, initial_param)

    fitted_alpha, fitted_beta, fitted_gamma = fitted_param

    print('Fitted alpha: ', fitted_alpha)
    print('Fitted beta: ', fitted_beta)
    print('Fitted gamma: ', fitted_gamma)
    print(f"Number of iterations: {iterations}")
```

```python {.line-numbers}
    hours_sorted = np.sort(Hour_list_1000)
    true_curve = alpha + beta * (hours_sorted ** gamma)
    fitted_curve = fitted_alpha + fitted_beta * (hours_sorted ** fitted_gamma)

    plt.scatter(Hour_list_1000, 
                Score_list_1000, 
                color='red', 
                alpha=0.5, 
                label='score per student')
    plt.plot(hours_sorted, true_curve, color='blue', label='ground truth')
    plt.plot(hours_sorted, fitted_curve, color='black', linestyle='--', label='fitted curve')
    plt.xlabel('hours studied')
    plt.ylabel('test score')
    plt.legend()
    plt.title('True vs Fitted curve')
    plt.savefig('Task4.png')
    plt.show()
```