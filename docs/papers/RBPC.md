# Robust Bayesian Portfolio Choices

<font size = 5> **Journal:**</font>

<font size = 4>

Review of Finanical Studies (2016.1)
</font>

<font size = 5> **Authors:**</font>

<font size = 4>

* Evan W. Anderson:
  
  Northern Illinois University
* Ai-Ru (Meg) Cheng:
  
  Northern Illinois University
</font>

## Abstract

We propose a Bayesian-averaging portfolio choice strategy with excellent out-of-sample performance. Every period a new model is born that assumes means and covariances are constant over time. Each period we estimate model parameters, update model probabilities, and compute robust portfolio choices by taking into account model uncertainty, parameter uncertainty, and non-stationarity. The portfolio choices achieve higher out-of-sample Sharpe ratios and certainty equivalents than rolling window schemes, the 1/N approach, and other leading strategies do on a majority of 24 datasets.

- new model：每一期都有一个新模型诞生
- constant means and covariances over time：假设每个模型的 $\mu$ 和 $\Sigma$ 在模型周期内恒定
- update model probabilities：每一期更新模型概率
- robust vs nonrobust：文章基于贝叶斯框架，提出了 robust portfolio choices，以及 nonrobust portfolio choices
  - nonrobust portfolio choices 依然基于 Markowitz mean-variance 框架，只是 $\mu$ 和 $\Sigma$ 的估计更精确
  - robust portfolio choices 则是对 Markowitz mean-variance 框架的改进
- model uncertainty, parameter uncertainty, and non-stationarity：考虑模型不确定性、参数不确定性和非平稳性
- Sharpe ratios and certainty equivalents：衡量投资组合表现的指标

## 1. Overview

假设现在是 $t-1$ 时刻，于是有 $t-1$ 个模型，第 $m$ 个模型的时间跨度为 $[m, t-1]$。投资者并不确定哪个模型是正确的，作者假设至少有一个模型是正确的。

更新概率和参数：

- 到 $t$ 时刻，新增一个模型，那么每个模型的概率都要更新；
- 每个模型对应的参数也要更新，也即 $t$ 时刻新的信息 $R_t$ 会用于更新参数

第三部分会详细讲述。

文章有个时间线的表格，还是挺清晰的：

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/reports_/20240603/timeline.png?raw=true" width=90% alt="">
</div>

<div STYLE="page-break-after: always;"></div>

## 2. Models

假设：

- 对于每个模型，其收益率服从多元正态分布：$R_t \sim N(\mu_m, \Sigma_m)$
- $\mu$ 和 $\Sigma$ 服从 normal-inverse-Wishart 分布：$\mu, \Sigma \sim \mathcal{N}\mathcal{IW}(\mu_{m,t-1}, \kappa_{m,t-1}, \Lambda_{m,t-1}, \nu_{m,t-1})$

normal-inverse-Wishart 分布的好处在于：

- 其后验分布仍然是 normal-inverse-Wishart 分布
- 后验参数和先验参数有等式关系，可以方便地更新后验参数，不需要积分或者数值方法

## 3. Updating Models and Probabilities

**3.1 Updating model probabilities when a new model is born**

$t$ 时刻，新增一个模型，但是 $t$ 时刻的信息 ($R_t$) 尚未观测到。这个时候也需要更新每个模型的概率，由于多了一个模型，前面 $t-1$ 个模型的概率会有所减小，用以分配给新模型。

文章具体讨论了几种概率的更新方式，实证部分应用的是 Sharing prior ($\alpha = 1$) 和 Power prior

**3.2 Updating parameters when new information arrives**

当 $t$ 时刻的信息 $R_t$ 观测到之后，每个模型的参数 $\mu$ 和 $\Sigma$ 基于贝叶斯框架更新

**3.3 Updating model probabilities when new information arrives**

$t$ 时刻的信息 $R_t$ 观测到之后，每个模型的概率会再次更新，这次更新是基于 $R_t$ 的信息，更新的方式也是基于贝叶斯框架：

$$
P_t(m|\mathcal{F}_t) = \frac{L(R_t|m, \mathcal{F}_{t-1}) P_t(m|\mathcal{F}_{t-1})}{\sum_{m \in M_t} L(R_t|m, \mathcal{F}_{t-1}) P_t(m|\mathcal{F}_{t-1})}
$$

其中：

- \( P_t(m|\mathcal{F}_t) \) 是 $t$ 时刻模型 $m$ 的后验概率
- $L(R_t|m, \mathcal{F}_{t-1})$ 是基于模型 \( m \) 和 $t$ 之前的信息 $\mathcal{F}_{t-1}$ 计算的关于 \( R_t \) 的似然函数
- \( P_t(m|\mathcal{F}_{t-1}) \) 是在时间 \( t-1 \) 条件下模型 \( m \) 的先验概率
- \( \sum_{m \in M_t} L(R_t|m, \mathcal{F}_{t-1}) P_t(m|\mathcal{F}_{t-1}) \) 是所有可能模型的似然函数和先验概率的加权和，这样保证所有模型的后验概率和为 1

---

我画了一个逻辑导图来概括这部分：

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/reports_/20240621/robust_bayesian.png?raw=true" width=88% alt="">
</div>

<br>
<br>
<br>

## 4. Nonrobust Portfolio Choices

这部分基于 mean-variance 分析框架，给出了在 Bayesian 框架下关于 $\mu$ 和 $\Sigma$ 的更准确估计，但最优投资组合权重仍基于 mean-variance ($\Sigma^{-1} \mu$)

$$
\begin{equation}\label{(10)}
  \hat{\mu}_t = E(R_{t+1}|\mathcal{F}_t) = \sum_{m \in M_t} \mu_{m,t} P_t(m|\mathcal{F}_t) \tag{10}
\end{equation}
$$

$$
\begin{equation}\label{(11)}
  \hat{\Sigma}_t = V(R_{t+1}|\mathcal{F}_t) = \sum_{m \in M_t} \left( \Sigma_{m,t} + \mu_{m,t}\mu_{m,t}' \right) P_t(m|\mathcal{F}_t) - \hat{\mu}_t \hat{\mu}_t' \tag{11}
\end{equation}
$$

## 5. Robust Portfolio Choices

Markowitz mean-variance 框架下，最大化效用的积分形式为：

$$
\begin{equation}\label{(14)}
  \int \left[ \phi_t' \hat{\mu}_t + \phi_t' z_{t+1} + R_{f,t+1} - \frac{\theta}{2} \left( \phi_t' z_{t+1} \right)^2 \right] f(z_{t+1} | \mathcal{F}_t) dz_{t+1} \tag{14}
\end{equation}
$$

第四部分的 nonrobust portfolio choices 本质上也是以此积分形式最大化效用，只是 $\hat{\mu}_t$ 和 $\hat{\Sigma}_t$ 的估计不同。

而 robust investors 会考虑模型非稳定性，对未来有很强的不确定性，他们担心对资产收益率的估计是错误的，具体表现在**他们认为 $f(z_{t+1} | \mathcal{F}_t)$ 可能是错误的估计**，其中 $z_{t+1} = R_{t+1} - \hat{\mu}_t$，表示 $R_{t+1}$ 对其 conditional mean $\hat{\mu}_t$ 的偏离程度。<u>投资者希望：即使 $f(z_{t+1} | \mathcal{F}_t)$ 的估计可能不准确，但仍然得到表现好的资产配置 (权重)</u>

这部分将 robust investors 的担忧考虑进来，效用函数不再是原来的 mean variance 分析框架，而是在此基础上的改进：

$$
\begin{equation}\label{(15)}
  \begin{align}
    &\max_{\phi_t} \min_{Q_t} \int Q_t(z_{t+1}) \left[ \phi_t'(\hat{\mu}_t + z_{t+1}) + R_{f,t+1} - \frac{\theta}{2} \left( \phi_t' z_{t+1} \right)^2 \right] f(z_{t+1}|\mathcal{F}_t) dz_{t+1} \nonumber \\
    &\qquad \qquad + \frac{1}{\tau} \int Q_t(z_{t+1}) \log Q_t(z_{t+1}) f(z_{t+1}|\mathcal{F}_t) dz_{t+1} \nonumber
  \end{align}\tag{15}
\end{equation}
$$

subject to the constraint:

$$
\begin{equation}\label{(16)}
  \int Q_t(z_{t+1}) f(z_{t+1}|\mathcal{F}_t) dz_{t+1} = 1 \tag{16}
\end{equation}
$$

其中：

- $Q_t$ 是影响投资者感知资产收益率分布的函数
- $f(z_{t+1}|\mathcal{F}_t)$ 是 $z_{t+1}$ 的分布的最佳近似估计 (只是最佳近似，不是最佳)
- 而 $Q_t(z_{t+1})f(z_{t+1}|\mathcal{F}_t)$ 是 $z_{t+1}$ 的一个替代分布，投资者依据此分布来最大化效用函数

可以看到，$\ref{(15)}$ 式内层的目标函数最小化，变量是 $Q_t$，此时最小化的目标主要是相对熵：替代分布 $Q_t$ 和 “最佳近似分布” $f(z_{t+1}|\mathcal{F}_t)$ 之间的差异。这个差异越小，说明替代分布越接近 “最佳近似分布”。也就是说，**投资者认为替代分布更准确，但是替代分布和 “最佳近似分布” 也不能偏离太多**。

外层函数，在确定了 $Q_t$ 之后，通过 $\phi_t$ 最大化效用，此时只有 $\ref{(15)}$ 式第一部分参与优化，即最大化替代分布概率密度下的效用。

接下来是讨论 $Q_t$ 的具体形式，以及如何求解 $\ref{(15)}$ 式。

## 6. Alternative Portfolio Rules

这部分介绍了其他的投资组合模型，用于对比。

- Rolling expectations
- Historical expectations
- 1/N
- Market
- The minimum variance strategy
- Jorion’s Bayes-Stein procedure
- Kan and Zhou’s three-fund rule

并考虑这些模型的 robust 版本、卖空限制等。

## 7. Out-of-Sample Performance

数据：

- 24 datasets：CRSP and Kenneth French’s data library
- simulated i.i.d. data and simulated data with regime changes.

1. Sharpe ratio：

没有卖空限制的情况下，

- robust portfolio choices 的 Sharpe ratio 在 24 个数据集中有 12 个是最高的
- nonrobust portfolio choices 的 Sharpe ratio 在 24 个数据集中有 9 个是最高的

有卖空限制的情况下，

- robust portfolio choices 的 Sharpe ratio 在 24 个数据集中有 19 个是最高的
- 此时 nonrobust portfolio choices 的 Sharpe ratio 没有最高的

---

2. Certainly equivalent：

> The certainty equivalent is the constant risk-free rate that gives agents the same utility out-of-sample as their optimal choices.

certainty equivalent 定义为：在样本外，给定一个固定的无风险利率，使得投资者在样本外的效用和他们的最优选择的效用相同。

而文章给的公式是：

$$
\begin{equation}\label{(28)}
  \bar{E}(R_{pt+1}) + \bar{E}(R_{ft+1}) - \frac{\theta}{2} \bar{V}(R_{pt+1}) \tag{28}
\end{equation}
$$

我一开始的理解是：风险投资组合的效用和 risk-free rate 的效用之差，这个数应该是正数，说明风险投资组合的效用应该高于 risk-free rate 的效用，那么投资在风险投资组合上是合理的。但是后来发现 $\bar{E}(R_{ft+1})$ 的符号是正的，那么 $\ref{(28)}$ 式想表达的意思应该是：

结合风险投资组合 (excess return) 和 risk-free rate，并经过风险调整，得到一个样本外的效用值。样本外有一个**假定的 risk-free rate**，这个 risk-free rate 也有同样的效用值。

一来如果 $\ref{(28)}$ 式的值越大，说明和投资组合效用等价的 `risk-free rate` 越高，那么投资组合就越好；二来如果 $\ref{(28)}$ 式中加入了实际的 risk-free rate，这样才能对比假想的 risk-free rate 的效用，否则 $\ref{(28)}$ 式就是用 excess return 和 risk-free rate 的效用比较，这样就没有意义了。

无卖空限制的情况下，

- robust portfolio choices 的 certainty equivalent 在 24 个数据集中有 20 个是最高的
- 此时 nonrobust portfolio choices 的 certainty equivalent 没有最高的

有卖空限制的情况下，

- robust portfolio choices 和 nonrobust portfolio choices 的 certainty equivalent 有 22 个数据集是非常接近的
- robust portfolio choices 的 certainty equivalent 在 24 个数据集中有 14 个是最高的
- nonrobust portfolio choices 的 certainty equivalent 在 24 个数据集中有 5 个是最高的

<div STYLE="page-break-after: always;"></div>

## 8. Uncertainty and Prior Selection

有两个设定会影响模型的表现：更新模型概率时先验的选择，以及 model uncertainty aversion level。这部分探讨了如何选择先验和 model uncertainty aversion level，更多的是基于实证结果的讨论。

## 9. Reasonable Uncertainty

> This section investigates if a model uncertainty aversion parameter of four, in the robust BA algorithm, yields a plausible alternative specification that is not too far from the approximating specification.

这部分检验第五部分提出 robust 版本 (robust 投资者担心 $f(z_{t+1} | \mathcal{F}_t)$ 可能是错误的估计) 的合理性，并以实证部分选取的 uncertainty aversion parameter (值为 4) 为检验基础。

结论是替代估计和 “最佳近似估计” 有一定程度的不同，证明了这种担心的合理性。

## Reference

1. **Anderson, E. W., & Cheng, A.-R. (2016)**. "Robust Bayesian portfolio choices." *The Review of Financial Studies*, 29(5), 1330-1375. [Oxford Academic](https://doi.org/10.1093/rfs/hhw001).