# Stochastic Neighbor Embedding

Hinton, Geoffrey E., and Sam Roweis. "Stochastic neighbor embedding." Advances in neural information processing systems 15 (2002).

<font size = 5> **Journal:**</font>

<font size = 4>

Advances in neural information processing systems (2002)
</font>

<font size = 5> **Authors:**</font>

<font size = 4>

* Geoffrey Hinton:
  
  Emeritus Prof. Computer Science, University of Toronto
* Sam Roweis:
  
  Department of Computer Science, University of Toronto
</font>

## Abstract

We describe aprobabilistic approach to the task of placing objects, described by high-dimensional vectors or by pairwise dissimilarities, in a low-dimensional space in away that preserves neighbor identities. A Gaussian is centered on each object in the high-dimensional space and the densities under this Gaussian (or the given dissimilarities) are used to define aprobability distribution over all the potential neighbors of the object. The aim of the embedding is to approximate this distribution as well as possible when the same operation is performed on the low-dimensional “images” of the objects. A natural cost function is a sum of Kullback-Leibler divergences, one per object, which leads to a simple gradient for adjusting the positions of the low-dimensional images. Unlike other dimensionality reduction methods, this probabilistic framework makes it easy to represent each object by a mixture of widely separated low-dimensional images. This allows ambiguous objects, like the document count vector for the word “bank”, to have versions close to the images of both “river” and “finance” without forcing the images of outdoor concepts to be located close to those of corporate concepts.

## Introduction

## The basic SNE algorithm

对于每个 object $i$ 以及其 potential neighbor $j$，我们定义一个 probability $p_{ij}$，表示 object $i$ 选择 object $j$ 作为其 neighbor 的概率：

$$
\begin{equation}\label{(1)}
p_{ij}=\frac{\exp(-d_{ij}^2)}{\sum_{k\neq i}\exp(-d_{ik}^2)} \tag{1}
\end{equation}
$$

其中 $d_{ij}$ 是 object $i$ 和 object $j$ 之间的差异 (dissimilarity)。其计算方式是两个高维空间点 $x_i$ 和 $x_j$ 之间的欧氏距离：

$$
\begin{equation}\label{(2)}
    d_{ij}^2=\frac{||\mathbf{x}_i-\mathbf{x}_j||^2}{2\sigma_i^2} \tag{2}
\end{equation}
$$

在低维空间，我们同样使用 Gaussian neighborhood 来定义 probability $q_{ij}$：

$$
\begin{equation}\label{(3)}
    q_{ij}=\frac{\exp(-||\mathbf{y}_i-\mathbf{y}_j||^2)}{\sum_{k\neq i}\exp(-||\mathbf{y}_i-\mathbf{y}_k||^2)} \tag{3}
\end{equation}
$$

目标是使得两个分布尽可能接近。我们使用 Kullback-Leibler divergence 来衡量两个分布之间的差异：

$$
\begin{equation}\label{(4)}
    C=\sum_i\sum_jp_{ij}\log\frac{p_{ij}}{q_{ij}}=\sum_iKL(P_i||Q_i) \tag{4}
\end{equation}
$$