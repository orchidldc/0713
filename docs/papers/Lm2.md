# New Entropy Restrictions and the Quest for Better-Specified Asset-Pricing Model

<font size = 5> **Journal:**</font>

<font size = 4>

Journal of Financial and Quantitative Analysis (2020.5)
</font>

<font size = 5> **Authors:**</font>

<font size = 4>

* Gurdip Bakshi:
  
  Temple University Fox School of Business
* Fousseni Chabi-Yo:
  
  University of Massachusetts–Amherst Isenberg School of Management
</font>

## Abstract

This article proposes the entropy of $m^2$ ($m$ is the stochastic discount factor) as a metric <mark>to evaluate asset-pricing models</mark>. We develop a bound on the entropy of $m^2$ when $m$ correctly prices a finite number of returns and consider models that pass the lower bound on $m$, yet fail the lower bound on $m^2$. Interpreting our results, we elaborate on the distinction between the entropy of $m^2$ versus the entropy of $m$. We further show that the entropy of $m^2$ represents an upper bound on the expected excess (log) return of the security with the payoff of $m$.

总结摘要：

- 文章提出的 $L(m^2)$ 同 $L(m)$ 一样，可用来评估资产定价模型；
- 资产定价模型得到的 $m$，可能达到了 $L(m)$ 的下界，但是没有达到 $L(m^2)$ 的下界；从这个角度来看，$L(m^2)$ 是更严格的 bound；
- $L(m^2)$ 代表了 $m$ 的期望超额 log 收益的上界。

## I. Introduction

这部分比较重要的几句陈述：

> <p id="p1">The novelty of our article is to show that the entropy of $m^2$ can be employed as a statistic to reject some models that pass the lower bound on the entropy of $m$.</p>

> <p id="p1"> The lower bound on the entropy of $m$ can be derived from a vector of traded asset returns, and the proposed bound is distinct from others, with no analytical analogs.</p>

## II. Entropy of $m^2$

SDF 定价无风险资产：

$$
\begin{equation}\label{(1)}
    \mathbb{E}_t[m_{t,t+1}\times1]\equiv q_t=\frac1{R_{t+1,f}} \tag{1}
\end{equation}
$$

### A. The Role of Entropy $L(m)$ in Testing Asset-Pricing Models

这部分回顾 $L(m)$ 的定义，且提供了和 source of entropy 一文不同的表现形式。$L(m)$ 的定义如下：

$$
\begin{equation}\label{(2)}
  \begin{aligned}
    L[m]\quad\equiv &\quad\log(\mathbb{E}[m])-\mathbb{E}[\log(m)]\\
    =& \quad \log(\mathbb{E}[e^{log(m)}])-\mathbb{E}[\log(m)]\\
  \end{aligned}\tag{2}
\end{equation}
$$

把 $\log(m)$ 看作随机变量 $x$，于是可以将 $\exp(n\log(m))$ 在 $\mathbb{E}[n\log(m)]$ 处泰勒展开：

原函数为 $f(x) = e^{nx}$，于是 $f^{(k)}(x) = n^k e^{nx} = n^k f(x)$，

泰勒展开公式:

$$
f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x-a)^n + R_n(x)
$$

将 $a$ 替换为 $\mathbb{E}[n\log(m)]$，$x$ 替换为 $\log(m)$，得到：

$$
\begin{equation}\label{(4)}
  \begin{align*}
    \exp(\log(m^n)) &= e^{n\mathbb{E}[\log(m)]} \left(1 + n(\log(m) - \mathbb{E}[\log(m)]) \right.\\
    &\quad + \frac{n^2}{2!}(\log(m) - \mathbb{E}[\log(m)])^2 \\
    &\quad + \frac{n^3}{3!}(\log(m) - \mathbb{E}[\log(m)])^3 \\
    &\quad \left. + \frac{n^4}{4!}(\log(m) - \mathbb{E}[\log(m)])^4 + \cdots \right)
  \end{align*}\tag{4}
\end{equation}
$$

两边先取期望：

$$
\begin{align*}
  \mathbb{E} (m^n) &= e^{n\mathbb{E}[\log(m)]} \mathbb{E}\left(1 + n(\log(m) - \mathbb{E}[\log(m)]) \right.\\
  &\quad + \frac{n^2}{2!}(\log(m) - \mathbb{E}[\log(m)])^2 \\
  &\quad + \frac{n^3}{3!}(\log(m) - \mathbb{E}[\log(m)])^3 \\
  &\quad \left. + \frac{n^4}{4!}(\log(m) - \mathbb{E}[\log(m)])^4 + \cdots \right)
\end{align*}
$$

再取 $log$：

$$
\begin{align*}
  log [\mathbb{E} (m^n)] &= \mathbb{E}[\log(m)^n] + log \mathbb{E}\left(1 + n(\log(m) - \mathbb{E}[\log(m)]) \right.\\
  &\quad + \frac{n^2}{2!}(\log(m) - \mathbb{E}[\log(m)])^2 \\
  &\quad + \frac{n^3}{3!}(\log(m) - \mathbb{E}[\log(m)])^3 \\
  &\quad \left. + \frac{n^4}{4!}(\log(m) - \mathbb{E}[\log(m)])^4 + \cdots \right)
\end{align*}
$$

<div STYLE="page-break-after: always;"></div>

<div style="border:2px solid #0086b5;padding:10px;width:100%;">

如果令 $n=1$，则会出现熵的形式：$log E(m) - E[\log(m)]$，于是 $L(m)$ 可以写为：

$$
\begin{equation}\label{(5)}
  \begin{aligned}
    L[m]&=\log\left(1+\sum_{j=2}^\infty\frac{\mu_{\log(m)}^{[j]}}{j!}\right), \\
    \\
    &\quad \mathrm{where~}\mu_{\log(m)}^{[j]}\equiv\mathbb{E}[(\log(m)-\mathbb{E}[\log(m)])^j]
  \end{aligned} \tag{5}
\end{equation}
$$

同样可以定义 $L(m^n)$：

$$
\begin{equation}\label{(6)}
  \begin{aligned}
    L[m^n]&=\log(\mathbb{E}[m^n])-\mathbb{E}[\log(m^n)]\\
    &=\log\left(1+\sum_{j=2}^\infty\frac{n^j \cdot \mu_{\log(m)}^{[j]}}{j!}\right),\\
    \\
    &\quad \mathrm{where~}\mu_{\log(m)}^{[j]}\equiv\mathbb{E}[(\log(m)-\mathbb{E}[\log(m)])^j]
  \end{aligned}\tag{6}
\end{equation}
$$

根据 $\ref{(5)}$ 式，$L(m)$ 可以理解为 $log (m)$ 各阶中心矩的和；根据 $\ref{(6)}$ 式，$L(m^n)$ 也可以理解为 $log(m)$ 的各阶中心矩的和，区别在于 $L(m)$ 的各阶中心矩的系数是 $1/j!$，而 $L(m^n)$ 的各阶中心矩的系数是 $n^j/j!$。**直观理解为 $L(m^n)$ 中高阶矩的权重更大**。

</div>

假设随机变量 $x$ 服从正态分布，其 $j$ 阶中心矩为：

$$
E [(x - E(x))^j ] = \begin{cases}
  0, & j\mathrm{~is~odd}\\
  (j-1)!!\sigma^j, & j\mathrm{~is~even}
\end{cases}
$$

当 $log(m)$ 是正态分布时，

$$
\mu_{\log(m)}^{[j]} = \begin{cases}
  0, & j\mathrm{~is~odd}\\
  (j-1)!!\sigma^j, & j\mathrm{~is~even}
\end{cases}
$$

于是 $L(m) = \cfrac{1}{2}\; Var[\log(m)]$

<details class="details2">
<summary>proof:</summary>

$$
\begin{aligned}
  L[m]&=\log\left(1+\sum_{j=2,\; j \in even}^\infty\frac{(j-1)!!\sigma^j}{j!}\right) \\
  &=\log\left(1+\sum_{k=1}^\infty\frac{(2k-1)!! \sigma^{2k}}{(2k)!}\right) \\
  &=\log\left(1+\sum_{k=1}^\infty\frac{\sigma^{2k}}{2^k k!}\right) \\
  &=\log\left(1+\sum_{k=1}^\infty\frac{(\sigma^2/2)^k}{k!}\right) \\
  &=\log\left(e^{\sigma^2/2}\right) \\
  &=\frac{\sigma^2}{2}\\
  {}\\
  &= \frac{1}{2}Var[\log(m)]
\end{aligned}
$$

</details>

在 $\log(m)$ 是正态分布的情况下，$L(m)$ 可以理解为 $log(m)$ 的方差的一半。

> [!TIP|label:Tip]
> shrinking 的惩罚项 (ridge) 是 $var[m]$；<br>
> 若 $\log(m) \sim N(\mu, \sigma^2)$，则熵的惩罚项是 $\frac{1}{2}var[\log(m)]$。

### B. Rationale for Studying the Entropy $L[m^2]$ and the Bound on $L[m^2]$

根据 $\ref{(6)}$ 式，当 $n=2$ 时，定义 $L[m^2]$：

$$
\begin{equation}\label{(7)}
  L[m^2]\quad\equiv\quad\log(\mathbb{E}[m^2])-\mathbb{E}[\log(m^2)] \tag{7}
\end{equation}
$$

$L[m^2]$ 还可以写为：

$$
\begin{equation}\label{(9)}
  L[m^2] \; =\; \log\left(1+\frac{2^2}{2!}\mu_{\log(m)}^{[2]}+\frac{2^3}{3!}\mu_{\log(m)}^{[3]}+\frac{2^4}{4!}\mu_{\log(m)}^{[4]}+\cdots\right) \tag{9}
\end{equation}
$$

**通过和 $\ref{(5)}$ 式对比，可以发现 $L[m^2]$ 和 $L[m]$ 的区别：$L[m^2]$ 中高阶矩的系数是 $2^j/j!$，而 $L[m]$ 中高阶矩的系数是 $1/j!$，说明 $L[m^2]$ 中的高阶矩的权重更大。**

如果同样假设 $log(m)$ 是正态分布，类比前面的推导，$L[m^2]$ 可以写为：

$$
L[m^2] = 2Var[\log(m)] = 4L[m]
$$

上面是理想情况下 ($log(m)$ 是正态分布) $L[m^2]$ 和 $L[m]$ 的关系。但是在实际情况下，$L[m^2]$ 和 $L[m]$ 之间的关系可能会有所不同：

在假定 $m$ 严格为正的情况下，$\ref{(7)}$ 式第二项 $\mathbb{E}[\log(m^2)] = 2\mathbb{E}[\log(m)]$，而 $L[m]$ 的第二项是 $\mathbb{E}[\log(m)]$，于是用 $L[m^2]$ 减去 $2L[m]$，得到：

$$
\begin{aligned}
  L[m^2]-2L[m]&=\log(\mathbb{E}[m^2])-\mathbb{E}[\log(m^2)]-2\left(\log(\mathbb{E}[m])-\mathbb{E}[\log(m)]\right)\\
  &=\log(\mathbb{E}[m^2]) - log \left((\mathbb{E}[m])^2\right) \\
  &=\log\left(\frac{\mathbb{E}[m^2]}{(\mathbb{E}[m])^2} - 1 + 1 \right)\\
  &=\log\left(1+\frac{var[m]}{(\mathbb{E}[m])^2}\right)
\end{aligned}
$$

$$
\begin{equation}\label{(10)}
    L[m^2]=2L[m] + \log\left(1+\frac{var[m]}{(\mathbb{E}[m])^2}\right) \tag{10}
\end{equation}
$$

对 $\ref{(10)}$ 式的解释：

- Hansen and Jagannathan (1991) 计算了当 $m$ 正确定价了有限数量的资产时，$\sigma[m]$ 的下界，即 $\frac{E[m] E[R]}{\sigma[R]}$；
- 当 $m$ 正确定价了有限数量的资产时，$L[m]$ 的其实是不确定的，因为 $L[m]$ 通过 `log excess return` 来计算，而用于计算的 `test assets` 是有限的，但 $L[m]$ 是大于等于任意资产的 `log excess return` 的；
- **因为上述两个 lower bound 都并不严格正确，如果使用 $\ref{(10)}$ 式右边两项来估计 $L[m^2]$ 的下界，那么这个下界也是不严格正确的**

---

文章接下来提出一个理论上的 $L[m^2]$ 的下界，这个下界可以通过一组 `tradeable asset returns` 计算得到：

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/reports_/20240513/Lm2.png?raw=true" width="95%" alt="">
</div>

可以看到这个下界还是很复杂的。

### C. Economic Interpretations of $L[m^2]$

接下来探讨 $L[m^2]$ 的经济学含义：$m$ 的期望超额 log 收益的上界：

$$
\begin{equation}\label{(18)}
  L[m^2]\quad\geq\quad\underbrace{\mathbb{E}[\log(R_{t+1,f})-\log(1+r_{t,t+1}^{\mathrm{SDF}})]}_{\text{Expected excess (log) return of SDF security}}\geq0 \tag{18}
\end{equation}
$$

下面来证明 $\ref{(18)}$ 式：

假设存在 payoff 为 $m$ 的资产，其收益率为：

$$
\begin{equation}\label{(17)}
  r_{t,t+1}^\mathrm{SDF}\quad\equiv\quad\frac{m_{t,t+1}}{\mathbb{E}_t[m_{t,t+1}^2]}-1 \tag{17}
\end{equation}
$$

对这个资产的收益取 log：

$$
\begin{aligned}
  \log(1+r_{t,t+1}^{\mathrm{SDF}})\quad &=\quad\log(m_{t,t+1})-\log(\mathbb{E}_t[m_{t,t+1}^2])\\
  &=\quad\log(m_{t,t+1})-\log(\mathbb{E}_t[m_{t,t+1}^2])+\log(m_{t,t+1}^2)-2\log(m_{t,t+1})
\end{aligned}
$$

将 $\log(m_{t,t+1})$ 移到左边并取期望：

$$
\mathbb{E}_{t}[\log(1+r_{t,t+1}^{\mathrm{SDF}})]+\mathbb{E}_{t}[\log(m_{t,t+1})]\quad=\quad\overbrace{\mathbb{E}_{t}[\log(m_{t,t+1}^{2})]-\log(\mathbb{E}_{t}[m_{t,t+1}^{2}])}^{-L_{t}[m_{t,t+1}^{2}]\text{ from \ref{(7)}}}
$$

两边交换位置，并都加上 $\log(\mathbb{E}_t [m_{t,t+1}])$：

<div style="border:2px solid #0086b5;padding:10px;width:100%;">

$$
\begin{aligned}
L_{t}[m_{t,t+1}^{2}]+\log(\mathbb{E}_{t}[m_{t,t+1}])& =\quad-\mathbb{E}_{t}[\log(1+r_{t,t+1}^{\mathrm{SDF}})]  \\
&\quad +\underbrace{\log(\mathbb{E}_t[m_{t,t+1}])-\mathbb{E}_t[\log(m_{t,t+1})]}_{L_t[m_{t,t+1}]\geq0} \\
\\
&\geq\quad-\mathbb{E}_{t}[\log(1+r_{t,t+1}^{\mathrm{SDF}})]
\end{aligned}
$$

这里等式的部分将 $\log(\mathbb{E}_t [m_{t,t+1}])$ 替换为 $- \log R_{t+1,f}$，得到：

$$
L_{t}[m_{t,t+1}^{2}] - L_{t}[m_{t,t+1}] = \log R_{t+1,f} - \mathbb{E}_{t}[\log(1+r_{t,t+1}^{\mathrm{SDF}})]
$$

此时等式右边和 $\ref{(18)}$ 式中间部分有点像，但这里是 `conditional` 的，而 $\ref{(18)}$ 式是 `unconditional` 的。

这个式子表明 $L_{t}[m_{t,t+1}^{2}]$ 和 $L_{t}[m_{t,t+1}]$ 的差值是 $R_{t+1,f}$ 的 log 和 $r_{t,t+1}^{\mathrm{SDF}}$ 的 log 期望之间的差值。
</div>

再来看不等式的部分：

$$
\begin{aligned}
  L_t[m_{t,t+1}^2]\quad &\geq \quad-\mathbb{E}_t[\log(1+r_{t,t+1}^\mathrm{SDF})]-\log(\mathbb{E}_t[m_{t,t+1}])\\
  &=\quad\log(R_{t+1,f})-\mathbb{E}_t[\log(1+r_{t,t+1}^\mathrm{SDF})]\\
\end{aligned}
$$

现在的不等式是 `conditional` 的。下面证明在 `unconditional` 时的性质：

对上式两边取期望：

$$
\mathbb{E}[L_t[m_{t,t+1}^2]]\quad\geq\quad\mathbb{E}[\log(R_{t+1,f})]-\mathbb{E}[\log(1+r_{t,t+1}^\mathrm{SDF})]
$$

有如下引理：

$$
\begin{aligned}
\mathbb{E}[L_{t}[m_{t,t+1}^{2}]]\quad&\leq\quad L[m_{t,t+1}^2]\quad\mathrm{because}\\
L[u^2]\quad &=\quad\mathbb{E}[L_t[u^2]]+L[\mathbb{E}_t[u^2]]\text{ for any random variable }u
\end{aligned}
$$

于是：

<div style="border:2px solid #0086b5;padding:10px;width:100%;">

$$
L[m_{t,t+1}^2]\quad\geq\quad\mathbb{E}[\log(R_{t+1,f})]-\mathbb{E}[\log(1+r_{t,t+1}^\mathrm{SDF})]
$$
</div>

此外，$r_{t,t+1}^\mathrm{SDF}$ 还具有如下性质：

<div style="border:2px solid #0086b5;padding:10px;width:100%;border-radius:50%">

$$
\begin{equation}\label{(18-1)}
  \mathbb{E}_t[1+r_{t,t+1}^\mathrm{SDF}]\; =\; \frac{\mathbb{E}_t[m_{t,t+1}]}{\mathbb{E}_t[m_{t,t+1}^2]}\leq\frac{\mathbb{E}_t[m_{t,t+1}]}{(\mathbb{E}_t[m_{t,t+1}])^2}=\frac1{\mathbb{E}_t[m_{t,t+1}]}=R_{t+1,f} \tag{18-1}
\end{equation}
$$

</div>

不等式这里是因为 $var_{t}[m_{t,t+1}] = \mathbb{E}_t[m_{t,t+1}^2] - (\mathbb{E}_t[m_{t,t+1}])^2 \geq 0$，所以 $\mathbb{E}_t[m_{t,t+1}^2] \geq (\mathbb{E}_t[m_{t,t+1}])^2$

于是：

$$
\log(E_t[1+r_{t,t+1}^\mathrm{SDF}])\leq\log(R_{t+1,f})
$$

根据 Jensen 不等式：

$$
\mathbb{E}_t[\log(1+r_{t,t+1}^\mathrm{SDF})]\quad\leq\quad\log(\mathbb{E}_t[1+r_{t,t+1}^\mathrm{SDF}])\quad\leq\quad\log(R_{t+1,f})
$$

因此：

$$
\log(R_{t+1,f}) \geq \mathbb{E}_t[\log(1+r_{t,t+1}^\mathrm{SDF})]
$$

两边取期望：

<div style="border:2px solid #0086b5;padding:10px;width:100%;">

$$
\mathbb{E}[\log(R_{t+1,f})] \geq \mathbb{E}[\log(1+r_{t,t+1}^\mathrm{SDF})]
$$
</div>

根据上面两个方框里的不等式，可以得到 $\ref{(18)}$ 式：

$$
\begin{equation}\label{(18)}
  L[m^2]\quad\geq\quad\underbrace{\mathbb{E}[\log(R_{t+1,f})-\log(1+r_{t,t+1}^{\mathrm{SDF}})]}_{\text{Expected excess (log) return of SDF security}}\geq0 \tag{18}
\end{equation}
$$

其中 $L[m^2]$ 的计算需要用到 $m$，$r_{t,t+1}^{\mathrm{SDF}}$ 的计算也需要用到 $m$，文章提出了一种形式的 $m$ 使得上界被满足，也即 $L[m^2] = \mathbb{E}[\log(R_{t+1,f})-\log(1+r_{t,t+1}^{\mathrm{SDF}})]$：

$$
\begin{equation}\label{(19)}
  m_{t,t+1}^\bullet\quad=\quad\frac\psi{(\mathbf{a}^{\prime}\mathbf{R}_{t,t+1})^\nu} \tag{19}
\end{equation}
$$

但这个 $m_{t,t+1}^\bullet$ 应该不是很重要，我们重点关注的是 $L[m^2]$ 满足的不等式性质。

---

$\ref{(18)}$ 是 $L[m^2]$ 的 `unconditional` 形式，表明在一段时间内的 $m$ 的期望超额 log 收益都小于等于 $L[m^2]$。

$\ref{(18-1)}$ 表明 payoff 为 $m$ 的资产的期望收益率小于等于无风险资产的收益率 (1 + $r_{t+1,f}$)。也即 $\mathbb{E}_t[r_{t,t+1}^\mathrm{SDF}] \leq R_{t+1,f}$。

这是一个重要的结论，因为 payoff 为 $m$ 的资产是一个风险资产，理论上风险资产的收益率应该大于无风险资产的收益率，其期望收益率也应该大于无风险资产的收益率。而我们可以严格证明 $r_{t,t+1}^\mathrm{SDF}$ 的期望收益率小于等于无风险资产的收益率。

## III. Revealing the Value Added of $L[m^2]$ over $L[m]$

实证部分，后续更新

## IV. KEY TAKEAWAYS

<br>
<br>
<br>

<div class="container_k">
  <div class="key-takeaways" style="margin-top: -26px;">
    <h3>KEY TAKEAWAYS</h3>
    <ul>
      <li>$L[m^2]$ 可以用来评估资产定价模型；</li>
      <li>$L[m^2]$ 主要应用在 $\log(m)$ 不是正态分布的情况下，正态分布属于特殊情况；</li>
      <li>$L[m^2]$ 是比 $L[m]$ 更严格的一个下界；资产定价模型可能在满足 $L[m]$ lower bound 的情况下，不满足 $L[m^2]$ lower bound</li>
      <li>不论是 $var[m]$、$L[m]$ 还是 $L[m^2]$，我们关注的都是 bound 本身，而不是其精确的下界</li>
    </ul>
  </div>
  <div class="right-border"></div>
  <div class="bottom-border"></div>
</div>

## References

1. **Hansen, L., & Jagannathan, R. (1991)**. “Implications of Security Market Data for Dynamic Economies.” *Journal of Political Economy*, 99, 225–261.

2. **Backus, D., Chernov, M., & Zin, S. (2014)**. "Sources of entropy in representative agent models." *The Journal of Finance*, 69(1), 51-99.

3. **Bakshi, G., & Chabi-Yo, F. (2019)**. "New entropy restrictions and the quest for better-specified asset-pricing models." *Journal of Financial and Quantitative Analysis*, 54(6), 2517-2541.