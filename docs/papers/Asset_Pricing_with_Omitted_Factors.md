# Asset pricing with omitted factors

<font size = 5> **Journal:**</font>

<font size = 4>

Journal of Political Economy
</font>

<font size = 5> **Authors:**</font>

<font size = 4>

* Stefano Giglio:
  
  Yale Scho ol of Management NBER and CEPR
* Dacheng Xiu:

  Booth School of Business University of Chicago
</font>

## Abstract

Standard estimators of risk premia in linear asset pricing models are biased if some priced factors are omitted. We propose **a three-pass method to estimate the risk premium** of an **observable factor**, which is valid even when not all factors in the model are specified or observed. The risk premium of the observable factor can be identified regardless of the rotation of the other control factors if together they span the true factor space. Our approach uses principal components of test asset returns to recover the factor space and additional regressions to obtain the risk premium of the observed factor.

## Introduction

One of the central predictions of asset pricing models is that some risk factors—for example, intermediary capital or aggregate liquidity—should command a risk premium: investors should be compensated for their exposure to those factors, holding constant their exposure to all other sources of risk.

---

tradable factors vs nontradable factors:

tradable factors:

itself a portfolio: the risk premia can be directly computed as the average excess return of the factor

Examples: market portfolio, SMB, HML, momentum

nontradable factors:

risks that are not themselves portfolios, like consumption, inflation, liquidity

traditional methods:

- two-pass crosssectional regressions, like Fama-MacBeth regressions
- mimicking portfolio projections

they are all affected by one common potential issue: **omitted variable bias**

## II. Biases in Standard Risk Premia Estimators

For illustration purposes, we show results in a simple two-factor model, but all the results easily extend to more general specifications.

Assumption:

- $v_t=(v_{1t},v_{2t})^\intercal$ is a vector of two potentially correlated factors.
- both have been demeaned, $v_{1t}$ and $v_{2t}$ are factor innovations

$$
r_t=\beta\gamma+\beta v_t+u_t
$$

$\beta=(\beta_1;\beta_2)$ is a matrix of risk exposures<br>
$\gamma=(\gamma_1,\gamma_2)^\intercal$ is the vector of risk premia for the two factors

$g_t$ is a proxy for the first factor $v_{1t}$, its risk premium is $\gamma_1$

---

Two pass regressions estimate the factor risk premia as follows:

- First, time series regressions of each test asset's excess return onto the factors estimate the assets' risk exposures $\beta_1$ and $\beta_2$
- Second, a cross-sectional regression of average returns onto the estimated $\beta_1$ and $\beta_2$ yields the risk premia estimates of $\gamma_{1}$ and $\gamma_{2}.$

The mimicking-portfolio approach instead estimates the risk premium of $g_t$ by projecting that factor onto a set of tradable asset returns, therefore constructing a tradable portfolio that is maximally correlated with $g_t$ (which is why it is also referred to as the maximally correlated mimicking portfolio). The risk premium of $g_t$ is then estimated as the average excess return of its mimicking portfolio.

### A. Omitted Variable Bias

A two-pass cross-sectional regression that omits $v_{2t}$:

- Time series step, yields a biased estimate of $\beta_1$: 
  - if $v_{2t}$ is correlated with $v_{1t}$ (omitted variable bias problem).(如果不相关，β可能不受影响，截距会受影响)
  - The magnitude of this bias depends on the time series correlation of the factors.
- Cross-sectional step, a second omitted variable bias: 
  - average returns should regress on the entire matrix of risk exposures, $\beta$, but only part of it $(\hat{\beta}_1)$ is used.

Eventually, both biases (omission of $v_{2t}$ in the first step and omission of $\beta_2$ in the second step) affect the estimated risk premium for $g_t$ using the two-pass regression approach.

---

In the mimicking-portfolio estimator, a related omitted variable bias can instead arise from the omission of assets onto which $g_t$ is projected.

Consider the projection of $g_t=v_{1t}$ onto the excess returns of a chosen set of test assets, $\check{r}_t$ ($r_t$ 是全集，$\check{r}_t$ 是子集)

This projection yields coefficients $w^g = Var(\check{r}_t) ^{-1} Cov(\check{r} _t, g_t)$

These are the weights of the mimicking portfolio for $g_t$, whose excess return is then $r_t^g=(w^g)^\intercal\check{r}_t$

Therefore, we get the expected excess return of the mimicking portfolio as $\gamma_g^\mathrm{MP}=$ $(w^g)^{\top} E(\check{r}_t)$

Since the test assets $\check{r}_t$ follow the same pricing model as the universe $r_t$ we can write:

$$
\check{r}_t=\check{\beta}\gamma+\check{\beta}v_t+\check{u}_t
$$

Substituting, we can write the formula for the mimicking-portfolio estimator of the risk premium of the first factor as:

$$
\gamma_\mathrm{g}^\mathrm{MP}=\{(\check{\beta}\Sigma^v\check{\beta}^{\top} + \check{\Sigma}^u)^{-1}(\check{\beta}\Sigma^ve_1)\}^\intercal\check{\beta}\gamma
$$

---

$Var(\check{r}_t) = (\check{\beta}\Sigma^v\check{\beta}^{\top} + \check{\Sigma}^u)$

$Cov(\check{r} _t, g_t) = \check{\beta}\Sigma^ve_1$

---

where $e_{1}$ is a column vector $(1,0)^\top$

$\Sigma^v$ is the covariance matrix of the factors

$\Sigma^{u}$ is the covariance matrix of the idiosyncratic risk

The formula above shows that, in general, not all choices of the assets on which to project $g_t$ will result in a consistent estimator of $\gamma_\mathrm{l}$; that is, it is not guaranteed that:

$$
\gamma_g^\mathrm{MP}=\gamma_1
$$

There is one case in which these two population quantities are identical:

- if the assets are chosen to be $p$ portfolios that $(1)$ are well diversified (so that $\check{\Sigma}^u\approx 0$) 
- $(2) $ fully span the true factors $v_t$, so that $\check{\beta}$ is invertible and $v_t=\check{\beta}^{-1}\check{r}_t;$ 

if both conditions hold, we indeed have $\gamma_g^\mathrm{MP}=\gamma_1$

---

In particular, the mimicking portfolio estimator will be biased if the set of assets used in the projection omits some portfolios that help span all risk factors in $v_t$.

Example:

Malloy, Moskowitz, and Vissing-Jorgensen (2009) project consumption growth onto four portfolios sorted by size and book to market.

But naturally there are other risks in the economy in addition to size and value that may be correlated to consumption growth and that may not be captured by those four portfolios.

In that case, the estimator may be affected by omitted variable bias.

### B. Measurement Error Bias

