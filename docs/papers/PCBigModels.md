# Portfolio Choices with Many Big Models

<font size = 5> **Journal:**</font>

<font size = 4>

Management Science (2021.4)
</font>

<font size = 5> **Authors:**</font>

<font size = 4>

* Evan W. Anderson:
  
  Northern Illinois University
* Ai-Ru (Meg) Cheng:
  
  Northern Illinois University
</font>

## Abstract

This paper proposes a Bayesian-averaging heterogeneous vector autoregressive portfolio choice strategy with many big models that outperforms existing methods out-of-sample on numerous daily, weekly, and monthly datasets. The strategy assumes that excess returns are approximately determined by a time-varying regression with a large number of explanatory variables that are the sample means of past returns. Investors consider the possibility that every period there is a regime change by keeping track of many models, but doubt that any specification is able to perfectly predict the distribution of future returns, and compute portfolio choices that are robust to model misspecification.

---

DeMiguel et al. (2009) 以及其他相关研究发现，实际投资中使用 1/N 策略往往比其他复杂策略效果更好。Markowitz 也曾提到过 1/N 策略：

> I should have computed the historical co-variances of the asset classes and drawn an efficient frontier. Instead, I visualized my grief if the stock market went way up and I wasn’t in it——if it went way down and I was completely in it. My intention was to minimize my future regret. So I split my contributions 50/50 between bonds and equities.

背景：

- 基于 mean-variance 的策略表现很差主要是因为难以正确估计 $\mu$ 和 $\Sigma$
- 资产收益率的分布可能会随时间变化，历史数据难以准确预测未来收益率的分布

**似乎模型越复杂，样本内越容易过拟合，样本外效果越差。本文的出发点之一是应对这种挑战：提出一种复杂且样本外表现更好的投资策略。**

本文的一些关键点：

> The coefficients and covariances in the vector autoregression shift when regimes change and are constant within a regime.

> We consider examples with <font color=red>1,000</font> models, where each model has over <font color=red>12,000</font> estimated parameters, and we show that BA-HVAR portfolio choices achieve higher certainty equivalents and Sharpe ratios than many other strategies, out-of-sample on <font color=red>20</font> daily, weekly, and monthly data sets.

## 1. Overview

BA-HVAR 模型的基本假设是：

$$
\begin{equation}\label{(1)}
  \mathbf{r}_t=B_t^{\prime}\mathbf{x}_{t-1}+\mathbf{\epsilon_t} \tag{1}  
\end{equation}
$$

其中：

- $\mathbf{r}_t$ 是 $n \times 1$ 的收益率向量
- $B_t$ 是时变的系数矩阵，维度为 $k \times n$
- $\mathbf{x}_{t-1}$ 是 $k \times 1$ 的 <b>解释变量</b> 向量
- $\mathbf{\epsilon_t}$ 是 $n \times 1$ 的残差向量，服从多元正态分布，协方差矩阵为 $\Sigma_t$

**解释变量**受 HAR 模型启发，是过去收益率的平均值，包括过去一天、一周、一个月、一年和十年的平均超额收益率。

> [!TIP|label:TIP]
> Corsi (2009)’s heterogeneous autoregressive model (HAR) 主要使用历史波动率预测未来波动率，作者借鉴了这个思路，使用过去收益率的平均值来预测未来收益率。<br>
> 
> HAR 模型的核心思想是，金融市场的波动率并非单一的平稳过程，而是具有多个时间尺度的动态特征，也即市场波动率的变化是异质的，**不同时间跨度的波动率对于未来波动率的预测能力不同**。为了捕捉这种异质性，HAR 模型引入了不同时间跨度的历史波动率作为解释变量，用于预测未来波动率：
> - 日波动率：当天的波动率 $\text{volatility}_{t}$
> - 周波动率：过去 5 天的波动率 $\text{volatility}_{t-5}$
> - 月波动率：过去 20 天的波动率 $\text{volatility}_{t-20}$
>
> HAR 模型的核心方程如下：
>
> $$\text{volatility}_{t+1} = \alpha + \beta_1 \cdot \text{volatility}_{t} + \beta_2 \cdot \text{volatility}_{t-5} + \beta_3 \cdot \text{volatility}_{t-20} + \epsilon_t$$

## 2. An Approximation of the World

这部分讨论了 BA-HVAR 模型的细节，主要是对 $\ref{(1)}$ 式中 $B_t$ 和 $\mathbf{x}_{t-1}$ 的估计，并做出了一些假设：

<span id="jump1">

**Assumption 1.** The vector $\mathbf{r}_t$ is conditionally normal with mean $B_t^{\prime}\mathbf{x}_{t-1}$ and variance-covariance matrix $\Sigma_t$:

$$
\mathbf{r}_t|\mathbf{x}_{t-1},B_t,\Sigma_t\sim\mathcal{N}(B_t^{\prime}\mathbf{x}_{t-1},\Sigma_t)
$$

$t-1$ 时刻，$\mathbf{x}_{t-1}$ 已知，$B_t$ 和 $\Sigma_t$ 是未知的
</span>

**Assumption 2.** $\mathbf{x}_{t-1}$ 由一个常数和过去的超额收益率的样本均值组成：

$$
\mathbf{x}_{t-1}=\begin{bmatrix}1&&\overline{E}_{s=t-d_2}^{t-1}(\mathbf{r}_s)'&&\overline{E}_{s=t-d_3}^{t-1}(\mathbf{r}_s)'&&...&&\overline{E}_{s=t-d_\ell}^{t-1}(\mathbf{r}_s)'\end{bmatrix}'
$$

其中 $\overline{E}_{s=t-a}^{t-1}(\mathbf{r}_s)=\frac{1}{a}\sum_{s=t-a}^{t-1}\mathbf{r}_s$ 是过去 $a$ 期 ($t-a$ 到 $t-1$) 的超额收益率的样本均值。

这里是使用了过去 $(\ell-1)$ 个窗口的信息，因此 $\mathbf{x}_{t-1}$ 中元素的个数为 $(\ell-1) \times n + 1$。

<span id="jump3">

**Assumption 3.** 这部分考虑了 **regime change** 的可能性，每期都有概率 $\pi_t$ 可能发生 regime change，如果不发生，系数矩阵 $B_t$ 和方差协方差矩阵 $\Sigma_t$ 则会保持不变，即 $B_t=B_{t-1}， \Sigma_t=\Sigma_{t-1}$；若发生，$B_t$ 和 $\Sigma_t$ 会服从 normal-inverse-Wishart 分布，**并从分布中抽样得到**：

$$
\begin{align}
\Sigma_t &\sim \mathcal{I}W(\Lambda,\nu) \tag{1a} \\
\text{vec}(B_t) | \Sigma_t &\sim \mathcal{N}\big( \text{vec}(\overline{B}), \Sigma_t \otimes \Phi \big) \tag{1b}
\end{align}
$$
</span>

因为 $\Sigma_t \sim IW$ 分布，所以 $\mathbf{E} (\Sigma_t)=\frac{\Lambda}{\nu-n-1}$，其中 $\nu$ 是自由度，文章假设 $\nu=n+2$。

可见，如果发生 regime change，需要先抽样得到 $\Sigma_t$，然后再根据 $\Sigma_t$ 抽样得到 $B_t$。第一步需要用到 $\Lambda$；第二步需要用到 $vec(\overline{B})$ 和 $\Phi$；这三个参数的估计在下一部分会有详细介绍。

## 3. A Typical Model

这部分介绍向量异质自回归模型 (BA-HVAR) 的工作原理

假设 $m$ 是任何一个关于收益率的模型 (BA-HVAR)，其中：

- $c=c(m)$: regime change 的时间
- $i=i(m)$: 超参数

模型 $m$ 在 $c-1$ 时刻诞生，并假设在 $c-1$ 到 $c$ 期间会发生 regime change，此后不会再发生 regime change。因此，模型 $m$ 的参数 $B_t$ 和 $\Sigma_t$ 在 $c$ 之后不会发生变化：

**Assumption 5.** In model $m$, $\mathbf{r}_t$ is conditionally normal with mean $B_c^{\prime}\mathbf{x}_{t-1}$ and covariance matrix $\Sigma_c$:

$$
\mathbf{r}_t|\mathbf{x}_{t-1},B_c,\Sigma_c\sim\mathcal{N}(B_c'\mathbf{x}_{t-1},\Sigma_c)
$$

for $t \geq c$.

这个假设和 [Assumption 1](#jump1) 类似，都是假设收益率服从正态分布，不同的是这里假设在时间 $c$ 之后不会出现 regime change，因此 $B_t=B_c,\; \Sigma_t=\Sigma_c$

### 3.1 Initial Beliefs

这部分说明模型 $m$ 的初始 beliefs，模型 $m$ 假设在 $c-1$ 到 $c$ 期间会发生 regime change，根据 [Assumption 3](#jump3)，$\Sigma_c$ 和 $vec(B_c)$ 服从 NIW 分布：

$$
\begin{align}
\Sigma_c &\sim \mathcal{I}W(\Lambda,\nu) \tag{3a} \\
\text{vec}(B_c) | \Sigma_c &\sim \mathcal{N}\big( \text{vec}(\overline{B}), \Sigma_c \otimes \Phi \big) \tag{3b}
\end{align}
$$

这里需要估计 $\Lambda$, $\overline{B}$ 和 $\Phi$，假设 6-8 是对这些参数的估计：

**Assumption 6.** 模型 $m$ 通过如下方式估计 $\bar{B}$:

$$
\overline{B}_{m,c-1}=\begin{bmatrix}\bar{\mu}_{c-1}\mathbf{1}'\\O\end{bmatrix}
$$

其中 $O$ 是一个 $(k-1)\times n$ 的全 0 矩阵，$\bar{\mu}_{c-1}\mathbf{1}'$ 是一个 $N \times 1$ 的向量，每个元素都等于过去所有股票 (股票面板) 的均值：

$$
\bar{\mu}_{c-1}=\frac{1}{n(c-a)}\sum_{j=1}^{n}\sum_{s=a}^{c-1}\mathbf{r}_{s}(j)
$$

**这一假设认为每只股票收益率的初始 beliefs 都等于过去所有股票的均值**

**Assumption 7.** 模型 $m$ 通过如下方式估计 $\Lambda$:

$$
\Lambda_{m,c-1}=\bar{\sigma}_{c-1}^2I_n
$$

$\bar{\sigma}_{c-1}^2 I_n$ 是一个 $N \times N$ 的对角矩阵，其中：

$$
\bar{\sigma}_{c-1}^2=\frac{1}{n(c-a)-1}\sum_{j=1}^{n}\sum_{s=a}^{c-1}[\mathbf{r}_{s}(j)-\bar{\mu}_{c-1}]^2
$$

这一假设认为 $\Sigma_c$ (严格来说是 $\Sigma_c$ 的期望) 的初始 beliefs 满足如下性质：

- 每只股票的方差都等于过去所有股票的方差
- 不同股票之间的协方差为 0

**Assumption 8.** 模型 $m$ 通过如下方式估计 $\Phi$:

$$
\begin{equation}\label{(6)}
  \Phi_{m,c-1}=\begin{bmatrix}\alpha_i&\mathbf{0}'\\\mathbf{0}&\beta_iI_{k-1}\end{bmatrix} \tag{6}
\end{equation}
$$

$\alpha_i$ 和 $\beta_i$ 是超参数，因为 $B_c$ 的第一列实际上表示的是 $\ref{(1)}$ 式中截距项的系数，所以让 $\Phi_{m,c-1}$ 的第一个元素 $\alpha_i$ 为一个单独的超参数，而其他元素都为 $\beta_i$。

$\alpha_i$ 的值要比 $\beta_i$ 小很多，因为作者认为他们对截距项的系数更确定，而对不同时间段内股票收益率均值的系数不太确定。

---

根据假设 6-8，结合前面提到的关于 $\Sigma_c$ 和 $vec(B_c)$ 的分布假设，在 $c-1$ 时刻，我们有关于 $\Sigma_c$ 和 $vec(B_c)$ 的概率分布，也即模型 $m$ 的初始 beliefs：

$$
\begin{align}
  P(\Sigma_{c}|\mathcal{F}_{c-1})&=\mathcal{IW}(\Lambda_{m,c-1},\nu_{m,c-1}) \tag{7a}\\
  P[vec(B_{c})|\mathcal{F}_{c-1},\Sigma_{c}]&=\mathcal{N}(vec(\overline{B}_{m,c-1}),\Sigma_{c}\otimes\Phi_{m,c-1}) \tag{7b}
\end{align}
$$

这一小节的结尾，作者简要说明了这样设置 beliefs 的原因，并说明通过观测实际数据更新后验可以得到更准确的参数估计。

### 3.2 Updating Parameters

更新前 $B_c$ 和 $\Sigma_c$ 服从 normal-inverse-Wishart 分布：

$$
\begin{align}
  P(\Sigma_{c}|\mathcal{F}_{t-1})&=\mathcal{I}W(\Lambda_{m,t-1},\nu_{m,t-1}), \tag{8a} \\
  P[vec(B_{c})|\mathcal{F}_{t-1},\Sigma_{c}]&=\mathcal{N}\big(vec\big(\overline{B}_{m,t-1}\big),\Sigma_{c}\otimes\Phi_{m,t-1}\big), \tag{8b}
\end{align}
$$

每一期当收益率数据被观测后，投资者使用贝叶斯方法更新参数：

$$
\begin{align}
  P(\Sigma_{c}|\mathcal{F}_{t})&=\mathcal{I}W(\Lambda_{m,t},\nu_{m,t}), \tag{9a} \\
  P[vec(B_{c})|\mathcal{F}_{t},\Sigma_{c}]&=\mathcal{N}\big(vec\big(\overline{B}_{m,t}\big),\Sigma_{c}\otimes\Phi_{m,t}\big), \tag{9b}
\end{align}
$$

其中相同符号表示的变量，在不同期的值都有数学上的联系：

$$
\begin{align}
  \Lambda_{m,t} &= \Lambda_{m,t-1} + \left( \frac{1}{1 + \mathbf{x}'_{t-1} \Phi_{m,t-1} \mathbf{x}_{t-1}} \right) \mathbf{e}_{m,t} \mathbf{e}'_{m,t}, \tag{10a} \\
  v_{m,t} &= v_{m,t-1} + 1, \tag{10b} \\
  \Phi_{m,t} &= \left( \Phi_{m,t-1} \mathbf{x}_{t-1} \mathbf{x}'_{t-1} \Phi_{m,t-1} + I_k \right)^{-1} \Phi_{m,t-1}, \tag{10c} \\
  \mathbf{B}_{m,t} &= \Phi_{m,t} \mathbf{x}_{t-1} \mathbf{I}'_{t} + \left( \Phi_{m,t-1} \mathbf{x}_{t-1} \mathbf{x}'_{t-1} \Phi_{m,t-1} + I_k \right)^{-1} \mathbf{B}_{m,t-1}. \tag{10d}
\end{align}
$$

其中：$\mathbf{e}_{m,t} = \mathbf{r}_t - \mathbf{\overline{B}}_{m,t-1}^{\top}\; \mathbf{x}_{t-1}$，是预测误差

## 4. All Models

假设每一期有 $h$ 个新模型诞生，根据第三部分的分析，每个模型都假设 $c-1$ 到 $c$ 期间会发生 regime change，因此都会有一个初始的 beliefs，不同之处是每个模型的超参数 $i$ 不同，也即 $\Phi_{m,c-1}$ 不同。因为 $\alpha_i$ 和 $\beta_i$ 都有三种取值，所以每个模型有 9 种可能的 $\Phi_{m,c-1}$，即 $h=9$。

### 4.1. Updating Model Probabilities

在 $t$ 期观测到收益率数据 $r_t$ 后，每个模型的概率更新为：

$$
\begin{equation}\label{(11a)}
  P_t(m|\mathcal{F}_t)=\frac{P(\mathbf{r}_t|m,\mathcal{F}_{t-1})P_t(m|\mathcal{F}_{t-1})}{\sum_{m\in\mathcal{M}_t}P(\mathbf{r}_t|m,\mathcal{F}_{t-1})P_t(m|\mathcal{F}_{t-1})} \tag{11a}
\end{equation}
$$

其中 $P(\mathbf{r}_t|m,\mathcal{F}_{t-1})$ 是模型 $m$ 在 $t$ 期观测到收益率数据 $r_t$ 后的似然函数：

$$
\begin{equation}
P(r_{t} | m, \mathcal{F}_{t-1})
= \frac{\Gamma_{n} (v_{m,t} / 2) | \Lambda_{m,t-1} |^{v_{m,t-1} / 2}}{\Gamma_{n} (v_{m,t-1} / 2) | \Lambda_{m,t} |^{v_{m,t} / 2} \left[ \pi (1 + \mathbf{x}'_{t-1} \Phi_{m,t-1} \mathbf{x}_{t-1}) \right]^{n / 2}} \tag{11b}
\end{equation}
$$

### 4.2. Removing Poorly Performing Models

为了能够简化模型，避免过于复杂，每一期当新模型诞生后，需要去除 $h$ 个表现很差的模型。

规则：

- 如果一个模型表现很差，且存在时间超过 $M/(2h)$，这个模型将会被去除
- 如果一个模型表现很差，但存在时间少于 $M/(2h)$，可能该模型 not fully developed，这个时候保留该模型

假设 $\mathcal{P}_t$ 是将被移除的模型集合：

$$
\hat{P}_t(m|\mathcal{F}_t)=
\begin{cases}
0&\quad\mathrm{if~}m\in\mathcal{P}_t\\
\left(\frac{1}{s_t}\right)P_t(m|\mathcal{F}_t)&\quad\mathrm{if~}m\notin\mathcal{P}_t
&\end{cases}
$$

其中 $s_t=\sum_{m\in\mathcal{M}_t\text{ such that }m\notin\mathcal{P}_t}P_t(m|\mathcal{F}_t)$，通过归一化使剩下的模型概率和为 1。

### 4.3. Regime Changes and the Probability of New Models

这部分讨论如何在加入了新模型后为所有模型分配概率。

$$
\omega_{i,t}=\sum_{m\in\mathcal{M}_t\text{such that}i(m)=i}\hat{P}_t(m|\mathcal{F}_t)
$$

上式表示超参数为类型 $i$ 的模型的概率总和，假设超参数也是类型 $i$ 的新模型的概率为 $\pi_{t+1}\bar{\omega}_{i,t}$：

$$
\bar{\omega}_{i,t}=\frac{\bar{\omega}}{h}+(1-\bar{\omega})\omega_{i,t}
$$

其中 $\bar{\omega} = 0.1$，表示新模型的概率的加权得到的：**10% 来自假设每个新模型概率相同 (均匀分布)，90% 来自超参数为类型 $i$ 的模型的概率总和。**

当新模型诞生后，每个模型正确的概率为：

$$
\begin{aligned}&P_{t+1}(m|\mathcal{F}_{t})=
  \begin{cases}\pi_{t+1}\bar{\omega}_{i,t}&\text{if }c(m)=t+1\text{ and }i(m)=i\\
  (1-\pi_{t+1})\hat{P}_t(m|\mathcal{F}_t)&\text{if }c(m)<t+1
  \end{cases}
\end{aligned}
$$

接下来看看如何估计 regime change 的概率：

$$
\begin{equation}\label{(12)}
  \pi_{t+1}=\sum_{m\in\mathcal{M}_t}\left(\frac{1}{t-c(m)+2}\right)\hat{P}_t(m|\mathcal{F}_t),\quad t\geq1 \tag{12}
\end{equation}
$$

其中 $t-c(m)+2$ 是模型 $m$ 在 $t+1$ 时刻的 “年龄”

---

下面用思维导图的方式总结本文更新模型参数和模型概率的过程：

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/reports_/20241115/port_choice_big.png?raw=true" width=75% alt="">
</div>

## 5. Predicted Returns

这部分讨论 predictive distribution 和 reference distribution

### 5.1. Predicted Distribution

对于单个贝叶斯向量自回归模型 $m$，prdicted return 服从 multivariate t 分布：

$$
\begin{equation}\label{(14a)}
  P(\mathbf{r}_{t+1}|m,\mathcal{F}_{t})=\mathcal{T}\left[\mu_{t+1|m,t'}\left(\frac{\nu_{m,t}-n-1}{\nu_{m,t}-n+1}\right)\times V_{t+1|m,t},\; \nu_{m,t}-n+1\right] \tag{14a}
\end{equation}
$$

这一分布考虑模型在估计 $B_c$ 时的不确定性。加权后资产收益率的预测分布为：

$$
P(\mathbf{r}_{t+1}|\mathcal{F}_{t})=\sum_{m\in\mathcal{M}_{t+1}}P(\mathbf{r}_{t+1}|m,\mathcal{F}_{t})P_{t+1}(m|\mathcal{F}_{t})
$$

其中 $P_{t+1}(m|\mathcal{F}_{t})$ 是 $t$ 时刻模型 $m$ 的概率

### 5.2. Reference Distribution

在之后的部分中，假设投资者不考虑 $B_t, \Sigma_t$ 的参数不确定性 (parameter uncertainty)，因此 predicted return 服从多元正态分布：

$$
\begin{equation}
  \bar{P}(\mathbf{r}_{t+1}|\mathcal{F}_t)=\mathcal{N}\left(\mu_{t+1|m,t},\Sigma_{t+1|m,t}\right) \tag{15a}
\end{equation}
$$

用 reference distribution (multivariate normal) 代替 predicted distribution (multivariate t) 有如下几个原因：

1. 虽然用 normal-inverse Wishart 分布估计参数，但投资者可能不完全相信，因为金融数据往往呈现厚尾的特性
2. Multivariate t 分布下，robust meanvariance 问题没有 interesting 解
3. Robust mean-variance problem 已经考虑了收益率分布的不确定性，无需再通过 t 分布来考虑 $B_t, \Sigma_t$ 的不确定性
4. 若考虑 parameter uncertainty，计算很费时
5. 即使考虑 parameter uncertainty，和不考虑得到的组合也非常接近

## 6. Portfolio Choices

这部分和第一篇文章的第五部分相同，介绍了 nonrobust mean-variance portfolio choices 和 robust mean-variance portfolio choices。

不同的是，这里 robust 问题中， “最佳近似估计” 和替代分布的相似度惩罚系数是**时变的**，也就意味着投资者每一期都要调整对于 “最佳近似估计” 的自信程度 (惩罚系数为 $\frac{1}{\theta_t}$)。

**6.3. Optimal Model Uncertainty Aversion**

这部分探究如何选择最优的惩罚系数，也即 uncertainty aversion parameter $\theta_t$

给定一个 10 个元素的集合，在这个集合中选取：

$$
\Theta=\left\{0,\frac1{16},\frac18,\frac14,\frac12,1,2,4,8,16\right\}
$$

> Let $b > 1$ be a fixed date. At each date $t \gg b$, robust investors choose the model uncertainty aversion parameter that maximizes the previous in-sample robust certainty equivalent:

$$
\begin{equation}\label{(22)}
  \theta_t=\underset{\theta\in\Theta}{\operatorname*{argmax}}\left\{-\left(\frac1{\bar{\theta}}\right)\log\bar{E}_{s=b}^t \; \exp\left[-\bar{\theta}r_{p,s,\theta}+\left(\frac{\gamma\bar{\theta}}2\right)z_{p,s,\theta}{}^2\right]\right\} \tag{22}  
\end{equation}
$$

## 7. Out-of-Sample Performance

用于对比的模型：

<div class="centertable">

| 模型 | 描述 |
| --- | --- |
| 1/N | 等权配置所有风险资产 |
| market methods | 全部配置在 value-weighted market portfolio |
| first-order Bayesian vector autoregressive (BA-VAR) model | DeMiguel et al. (2014) 提出的贝叶斯一阶向量自回归模型 |
| Bayesian-averaging | 上一篇文章他们自己提出的模型 |
| rolling | 使用固定长度窗口估计 $\mu$ 和 $\Sigma$ |
| historical | 使用所有历史数据估计 $\mu$ 和 $\Sigma$ |
| Jorion | Jorion (1986) 方法 |
| Kan-Zhou methods | Kan and Zhou (2007) 方法 |

</div>

一开始讨论了 certainty equivalent 的计算方法，有多种版本，最终选择了两种：perceived certainty equivalents & standard certainty equivalents，结果是 robust BA-HVAR 模型在大多数情况下表现最好。

Sharpe ratio 也同样在大多数数据集上表现最好。

<div STYLE="page-break-after: always;"></div>

## 8. Regimes

这部分讨论 BA-HVAR 模型检测到的 regime，并讨论事后的 regime beliefs

### 8.1. Most Likely Regimes Since 1973

这部分通过分析历史数据，确定自 1973 年以来美国市场上最可能的 regime change 时期，特别关注重大事件如 1973 年经济危机、1987 年黑色星期一、2000 年左右互联网泡沫以及 2008 年金融危机，关注这些 regime change 的起止日期及其对市场回报的影响。

### 8.2. Number of Regimes

BA (Anderson and Cheng 2016) 方法检测到的 regime change 数量远多于 BA-HVAR 方法。作者认为可能有两个原因：

- BA 方法中的每个模型都过于简单，假设平均回报率是恒定的，而 BA-HVAR 模型允许平均回报率随近期回报率线性变化。
- BA 方法中的“共享先验”旧模型会将大量概率转移给新模型，使得投资者常常相信存在新的体制变更。

## 9. Predictions

这部分讨论 robust BA-HVAR 模型为什么有更好的预测能力，整体上还是根据实证结果来讨论的。9.4 部分则真正从理论上讨论了为什么 robust BA-HVAR 模型更好。

### 9.2. Likelihood of Returns

这部分展示了 robust BA-HVAR 模型在不同频率数据集下对于 return 的似然好于其他模型

### 9.4. Discussion

所有方法的 nonrobust 版本都是基于 "best deals"，但 "best deals" 往往只存在于估计中，并且有可能有极端值的权重。而 robust 方法对这些 "best deals" 持悲观态度，通过调整均值和方差的估计，获得了更好的结果。

> Optimal robust portfolios, by taking a pessimistic view of the world, assume that any good deal is too good to be true, and endogenously downwardly adjust mean returns and alter correlations.

## Reference

1. **Anderson, E. W., & Cheng, A.-R. (2016)**. "Robust Bayesian portfolio choices." *The Review of Financial Studies*, 29(5), 1330-1375. [Oxford Academic](https://doi.org/10.1093/rfs/hhw001).

2. **Anderson, E. W., & Cheng, A.-R. (2022)**. "Portfolio choices with many big models." *Management Science*, 68(1), 690-715. [Management Science](https://doi.org/10.1287/mnsc.2020.3876).

3. **Corsi, F. (2009)**. "A simple approximate long-memory model of realized volatility." *Journal of Financial Econometrics*, 7(2), 174-196. [Journal of Financial Econometrics](https://doi.org/10.1093/jjfinec/nbp001).