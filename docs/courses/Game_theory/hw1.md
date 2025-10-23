### Problem 1

In the following normal-form game, what strategies survive iterated elimination of strictly dominated strategies? What are the pure-strategy Nash equilibria?

|   | L   | C   | R   |
|:---:|:-----:|:-----:|:-----:|
| T | 2,0 | 1,1 | 4,2 |
| M | 3,4 | 1,2 | 2,3 |
| B | 1,3 | 0,2 | 3,0 |

<font size=5 font color= '#0086B5'>Answers:</font>

<div align='center'>

<img src="https://github.com/ligang19999/images/blob/main/game_theory/hw1_1.jpg?raw=true" width="60%" alt="">
</div>

Through iterated elimination, we can eliminate the third strategy for the row player (B), then second strategy for the column player (C)

remaining strategies are:

|     | L   | R   |
|:-----:|:-----:|:-----:|
| T   | 2,0 | 4,2 |
| M   | 3,4 | 2,3 |

Pure strategy Nash equilibria are: (M, L) and (T, R)

<div STYLE="page-break-after: always;"></div>

### Problem 2

Players 1 and 2 are bargaining over how to split one dollar. Both players simultaneously name shares they would like to have, $s_1$ and $s_2$, where $0 \leq s_1, s_2 \leq 1$. If $s_1 + s_2 \leq 1$, then the players receive the shares they named; if $s_1 + s_2 > 1$ then both players receive zero. What are the pure-strategy Nash equilibria of this game?

<font size=5 font color= '#0086B5'>Answers:</font>

Any pair \((s_1, s_2)\) such that \(s_1 + s_2 = 1\) and \(0 \leq s_1, s_2 \leq 1\) can be considered a pure-strategy Nash equilibrium.

In this case, both players receive their named shares, also **a best response** to the other player's strategy.

If one player tries to ask for more than their current share, it would lead to both players receiving nothing, which is a worse outcome for the deviating player.

### Problem 3

Suppose there are n firms in the Cournot oligopoly model. Let \( q_i \) denote the quantity produced by firm $i$, and let \( Q = q_1 + \ldots + q_n \) denote the aggregate quantity on the market. Let $P$ denote the market-clearing price and assume that inverse demand is given by \( P(Q) = a - Q \) (assuming \( Q < a \), else \( P = 0 \)). Assume that the total cost of firm i from producing quantity \( q_i \) is \( C_i(q_i) = c q_i \). That is, there are no fixed costs and the marginal cost is constant at \( c \), where we assume \( c < a \). Following Cournot, suppose that the firms choose their quantities simultaneously. What is the Nash equilibrium? What happens as \( n \) approaches infinity?

<font size=5 font color= '#0086B5'>Answers:</font>

Assume the quantity pair $(q_1^*, q_2^*, \cdots, q_n^*)$ is a Nash equilibrium.

For firm $i$, $q_i^*$ solves:

$$
\max_{q_i}\pi_i(q_1, \cdots, q_n)=[a-(q_1 + \cdots + q_n^*)-c]q_i
$$

The first-order condition is:

$$
q_i^* = \cfrac{a-c - \sum_{j \not ={i}} q_j^*}{2} \tag{1}
$$

$$
q_i^* = a - c -Q^* \tag{2}
$$

$$
\sum q_i^* = Q^* = n(a - c -Q^*) \rightarrow Q^* = \cfrac{n(a-c)}{n+1}
$$

Take $Q^*$ into (2), $q_i^* = \cfrac{a-c}{n+1}$

When $n \to +\infty,\; q_i^* \to 0$

### Problem 4

In the class, we analyzed the Bertrand duopoly model with differentiated products. The case of homogeneous products yields a stark conclusion. Because the two firm’s products are homogeneous, consumers buy the product with a lower price. Specifically, the quantity that consumers demand from firm $i$ is

$$
q_i =
\begin{cases}
    a - p_i & \text{if}\quad p_i < p_j \\
    0 & \text{if}\quad p_i > p_j \\
    (a - p_i)/2 & \text{if}\quad p_i = p_j
\end{cases}
$$

Suppose that there are no fixed costs and that marginal costs are constant at $c$, where $c < a$. Suppose also that the firms choose prices simultaneously. Find the Nash equilibrium of the game. Show the best responses of the two firms in a figure and illustrate your result.

<font size=5 font color= '#0086B5'>Answers:</font>

The price pair $(p_1^*, p_2^*)$ is a Nash equilibrium if, for each firm $i$, $p_i^*$ solves:

$$
\max_{p_i}\pi_i(p_i,p_j^*):=(p_i-c)q_i = 
\begin{cases}
    (p_i-c)(a - p_i) & \text{if}\quad p_i < p_j^* \\
    0& \text{if}\quad p_i > p_j^* \\
    \cfrac{(p_i-c)(a - p_i)}{2} & \text{if}\quad p_i = p_j^*
\end{cases}
$$

The first-order condition for firm i’s optimization problem yields:

$$
p_i = 
\begin{cases}
    \cfrac{a+c}{2} & \text{if}\quad p_i \leqslant p_j^* \\
    0 & \text{if}\quad p_i > p_j^*
\end{cases}
$$

The Nash equilibrium of the game is $p_1^* =  p_2^* = \cfrac{a+c}{2}$

Graphical interpretation:

<div align='center'>

<img src="https://github.com/ligang19999/images/blob/main/game_theory/hw1_4.png?raw=true" width="60%" alt="">
</div>

<div STYLE="page-break-after: always;"></div>

### Problem 5

Find the mixed-strategy Nash equilibrium of the following normal-form game.

|   | L  | R  |
|:---:|:----:|:----:|
| T | 2,1| 0,2|
| B | 1,2| 3,0|

<font size=5 font color= '#0086B5'>Answers:</font>

设 player 1 的策略为 {T, B}，其选择 T 的概率为 $r$，选择 B 的概率为 $1-r$；

设 player 2 的策略为 {L, R}，其选择 L 的概率为 $q$，选择 R 的概率为 $1-q$；

player 1 的期望收益为：

$$
\begin{aligned}
    U_1(T) &= 2q + 0(1-q) \\
    U_1(B) &= 1q + 3(1-q)
\end{aligned}
$$

令 $U_1(T) > U_1(B)$，得到 $q > \frac{3}{4}$

于是，

$$
r =
\begin{cases}
    1 & \text{if}\quad q \in (\frac{3}{4}, 1] \\
    [0, 1] & \text{if}\quad q = \frac{3}{4} \\
    0 & \text{if}\quad q \in [0, \frac{3}{4}]
\end{cases}
$$

同理，player 2 的期望收益为：

$$
\begin{aligned}
    U_2(L) &= r + 2(1-r) \\
    U_2(R) &= 2r + 0(1-r)
\end{aligned}
$$

令 $U_2(L) > U_2(R)$，得到 $r < \frac{2}{3}$

于是，

$$
q =
\begin{cases}
    1 & \text{if}\quad r \in [0, \frac{2}{3}) \\
    [0, 1] & \text{if}\quad r = \frac{2}{3} \\
    0 & \text{if}\quad r \in (\frac{2}{3}, 1]
\end{cases}
$$

于是，mixed-strategy Nash equilibrium 为：

$$
\begin{aligned}
    p(T) = r = \frac{2}{3} \\
    {}\\
    p(L) = q = \frac{3}{4}
\end{aligned}
$$

The mixed strategy Nash equilibrium can be visualized by the graph:

<div align='center'>

<img src="https://github.com/ligang19999/images/blob/main/game_theory/hw1_5.png?raw=true" width="60%" alt="">
</div>