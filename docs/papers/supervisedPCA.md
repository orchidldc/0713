# Test Assets and Weak Factors

<font size = 5> **Journal:**</font>

<font size = 4>

Working Paper
</font>

<font size = 5> **Authors:**</font>

<font size = 4>

* Stefano Giglio:
  
  Yale Scho ol of Management NBER and CEPR
* Dacheng Xiu:

  Booth School of Business University of Chicago
* Dake Zhang:

  Booth School of Business University of Chicago
</font>

## Abstract

Weak factors – factors to which test assets are only weakly exposed – represent an important concern in empirical asset pricing. We propose a novel methodology to address this issue, supervised-PCA (SPCA). SPCA iterates a supervised asset selection step, in which only informative test assets are selected, and a principal-component estimation step to extract factors. It can be used to estimate risk premia and diagnose factor models even when weak factors are present and not all true factors are observed. We derive SPCA’s asymptotic properties and illustrate several empirical applications of our methodology.

## Introduction

根据PCA方法，factor loading不是特征向量吗，其模长为1，所以weak factor到底是啥？

The goal of this paper is to study the role of test assets in the context of risk premia estimation and SDF recovery, in the case where some (or all) factors are weak.

Examples:

A momentum factor could be a strong factor when the test assets are momentum-sorted portfolios, but this same factor may be weak when the test assets are portfolios sorted by size or value: the latter portfolios may diversify away the exposures to the momentum factor, and therefore may be uninformative about momentum risk.

## 2. Methodology

### 2.1 Model Setup

A standard linear factor model is given by:

$$
\begin{equation}
  r_t=\beta\gamma+\beta v_t+u_t,\quad\operatorname{E}(v_t)=\operatorname{E}(u_t)=0\quad \text{and Cov}(v_t,u_t)=0 \label{1}
\end{equation}
$$

$r_t$ is the $N\times 1$ vector of test asset excess returns<br>
$\beta$ is the $N\times p$ matrix of factor exposures (**constant**)<br>
$\gamma$ is the $p\times 1$ vector of factor risk premia<br>
$v_t$ is the $p\times 1$ vector of factor innovations<br>
  * $v_t = f_t - \mu_f$<br>

$u_t$ is the $N\times 1$ vector of idiosyncratic errors<br>

asset pricing factors:

* latent
  * $v_t$ is also latent
* observable
  * $v_t$ is not directly observable because $\mu_f$ is unknown

---

some notations:

$a \lesssim b$: $a \leq Kb$ for some constant $K > 0$

$a\asymp b$: $a \lesssim b$ and $b \lesssim a$

---

Assumptions:

---

The strength of factors: test assets’ exposures to the factors ($\beta$), as opposed to a property of the factors themselves (vt).

We define the presence of weak factors the case in which some of those eigenvalues, $\lambda_i(\beta^{\top}\beta)$, grow at a slower rate than N.

in this case, while the number of test assets N is large, many test assets have small or zero exposures to some or all of the factors, making those factors weak.

We develop our discussion of weak factors in the context of two standard asset pricing exercises: the estimation of risk premia for observable factors, and the recovery of the stochastic discount factor (SDF). In this model, an SDF can be defined in terms of asset pricing factors $v_t$ as:

$$
m_t=1-\gamma^\intercal \Sigma_v^{-1}v_t \tag{2}
$$

where $ \Sigma_v^{-1}$ is the covariance matrix of factor innovations

It also makes sense to consider the SDF represented in terms of the set of tradable test asset returns:

$$
\widetilde m_t=1-b^\intercal(r_t-\mathrm{E}(r_t)) \tag{3}
$$

**The relationship between the two SDFs depends on the degree of completeness of markets.**

As will be shown later, these two forms of the SDF are asymptotically equivalent in the asymptotic scheme we consider, with the number of assets N going to infinity, so that there is no ambiguity with respect to which estimand we consider.

---

we assume $g_t$ and $v_t$ are just (potentially) correlated:

$$
g_t=\xi+\eta v_t+z_t \tag{4}
$$

$g_t$ is a $d\times 1$ vector of observable factors<br>
$\xi = E(g_t)$<br>
$\eta$ is a $d\times p$ matrix<br>
$z_t$ is a $q\times 1$ is measurement error orthogonal to $v_t$

**The risk premia of the d factors $g_t$ are $\eta \gamma$, core of this paper**

### 2.2 Estimating Risk Premia when Factors are Weak

#### 2.2.1 Inconsistency of Existing Estimators

In this section we revisit a number of existing estimation procedures, and show that they are inconsistent in the presence of weak factors, using a simple model with a single weak factor.

#### 2.2.2 Our Solution: Supervised-PCA (SPCA) and Test Asset Selection

The solution we propose in this paper is to screen test assets and only keep those that have nontrivial exposure to the factor of interest $g_t$.

**Then, if the factor is strong within this smaller set of test assets, it is possible to apply PCA or any of the above procedures to recover its risk premium.**

Our proposal is to remove those low-exposure assets entirely, focusing the estimation on a set of assets whose exposures are large and dominate their estimation error.

### 2.2.3 SPCA in the General Case: Selection and Projection

In this section, we show how to generalize SPCA to the case where multiple factors of distinct strength are present.

a general necessary condition for the consistency of PCA in a multi-factor model is that:

$$
N/(\lambda_{\min}(\beta^\intercal\beta)T)\to 0 \tag{6}
$$

只要满足(6)，PCA就是consistent的，但是有一些特例：都是强因子，但却无法满足(6)

it means that even the weakest one among all p factors in (1) is sufficiently strong that it can be recovered by PCA.

We thereby define weak factors as those for which test asset exposures fail condition (6).

However, in the multi-factor case, it can also happen that **all factors are individually strong, and condition (6) still fails because the factors’ exposures are highly correlated**.

Example: a two-factor model

$$
\left. \beta = \left[
  \begin{array}{c|c}
    \beta_{11}&\beta_{12}\\
    \hline\\
    \beta_{21}&\beta_{22}\\
    \\
  \end{array}
  \right
.\right]
$$

$\beta_{11}$ and $\beta_{22}$ are $N_0\times 1$ vectors<br>
$\beta_{12}$ and $\beta_{21}$ are $(N-N_0)\times 1$ vectors<br>
$N_0$ is small relative to N.

suppose $\beta_{21} = \beta_{22}$

---

Example: screen can eliminate too many assets, making a strong factor model become weak or rank-deficient.

$$
\left.\beta=\left[
  \begin{array}{c|c}
    \beta_{11}&\beta_{11}\\
    \\
    \hline
    0&\beta_{22}\\
    \\
  \end{array}
\right.\right]
$$

where $\beta_{11}$ and $\beta_{22}$ are $N/2\times 1$ non-zero vectors satisfying $\|\beta_{11}\|\asymp\|\beta_{22}\|\asymp\sqrt{N}$

---