# 第3章 向量空间与线性方程组解的结构

> 来源：docs/08_电子书/线性代数-同济大学数学系.md
> 科目：数学二（302） ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：542d072d2e071a92


## [课前导读]

引入了空间直角坐标系后，空间中的任一点 P 可用一个三元数组  $ (x, y, z) $ 来表示，空间中的向量  $ \overrightarrow{OP} $ 也可写成  $ \overrightarrow{OP} = (x, y, z) $。于是，对空间几何图形的性质的研究就可以转化为对三元数组  $ (x, y, z) $ 的研究。对三元数组  $ (x, y, z) $ 做推广，我们将讨论 n 元数组，以及 n 元数组的集合，也就是本节所说的 n 维向量以及向量组。

### 1. n 维向量的概念

定义 1 由 n 个数  $ a_{1}, a_{2}, \cdots, a_{n} $ 组成的有序数组称为 n 维向量. 若 n 维向量写成

 $$ \begin{pmatrix}a_{1}\\a_{2}\\\vdots\\a_{n}\end{pmatrix} $$

的形式，称为 n 维列向量；若 n 维向量写成

 $$ (a_{1},~a_{2},~\cdots,~a_{n}) $$

的形式，称为 n 维行向量. 这 n 个数称为该向量的 n 个分量，其中  $ a_{i} $ 称为第 i 个分量.

从 n 维向量的定义可见，n 维列向量就是一个  $ n \times 1 $ 的列矩阵，n 维行向量就是一个  $ 1 \times n $ 的行矩阵。行向量可以看成是列向量的转置，因此我们常用  $ \alpha, \beta, \gamma $ 来表示 n 维列向量，而用  $ \alpha^{T}, \beta^{T}, \gamma^{T} $ 来表示 n 维行向量。除了特别说明外，我们以后都只对列向量进行讨论。

当  $ a_{1} $,  $ a_{2} $,  $ \cdots $,  $ a_{n} $ 是复数时，n 维向量称为 n 维复向量，当  $ a_{1} $,  $ a_{2} $,  $ \cdots $,  $ a_{n} $ 是实数时，n 维向量称为 n 维实向量，本书所讨论的向量都是实向量.

分量都是零的向量称为零向量，记为  $ \mathbf{0} $，即  $ \mathbf{0} = \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{pmatrix} $ 或  $ \mathbf{0} = (0, 0, \cdots, 0) $.

向量 $ \begin{pmatrix}-a_{1}\\-a_{2}\\\vdots\\-a_{n}\end{pmatrix} $称为向量 $ \alpha=\begin{pmatrix}a_{1}\\a_{2}\\\vdots\\a_{n}\end{pmatrix} $的负向量，记为-α.

### 2. 向量的运算

由于向量可看成行矩阵或列矩阵，因此我们可用矩阵的运算来定义向量的运算.

设  $ \alpha = \begin{pmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{pmatrix} $， $ \beta = \begin{pmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{pmatrix} $， $ k \in \mathbb{R} $，则有

(1)  $ \alpha + \beta = \begin{pmatrix} a_{1} + b_{1} \\ a_{2} + b_{2} \\ \vdots \\ a_{n} + b_{n} \end{pmatrix} $; (2)  $ k\alpha = \begin{pmatrix} ka_{1} \\ ka_{2} \\ \vdots \\ ka_{n} \end{pmatrix} $; (我们称这两种运算为向量的线性运算)

(3)

 $$ \boldsymbol{\alpha}^{\mathrm{T}}\boldsymbol{\beta}=(\boldsymbol{a}_{1},\quad\boldsymbol{a}_{2},\quad\cdots,\quad\boldsymbol{a}_{n})\left(\begin{array}{c}\boldsymbol{b}_{1}\\ \boldsymbol{b}_{2}\\ \vdots\\ \boldsymbol{b}_{n}\end{array}\right)=\boldsymbol{a}_{1}\boldsymbol{b}_{1}+\boldsymbol{a}_{2}\boldsymbol{b}_{2}+\cdots+\boldsymbol{a}_{n}\boldsymbol{b}_{n}； $$

 $$ \boldsymbol{\alpha}\boldsymbol{\beta}^{\mathrm{T}}=\left(\begin{aligned}a_{1}\\ a_{2}\\ \vdots\\ a_{n}\end{aligned}\right)\left(\begin{array}{l l l l}b_{1},b_{2},\cdots,b_{n}\end{array}\right)=\left(\begin{aligned}a_{1}b_{1}&a_{1}b_{2}&\cdots&a_{1}b_{n}\\ a_{2}b_{1}&a_{2}b_{2}&\cdots&a_{2}b_{n}\\ \vdots&\vdots&\ddots&\vdots\\ a_{n}b_{1}&a_{n}b_{2}&\cdots&a_{n}b_{n}\end{aligned}\right). $$

例1 将线性方程组

 $$ \begin{cases}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}=b_{1},\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}=b_{2},\\\cdots\cdots\cdots\\a_{m1}x_{1}+a_{m2}x_{2}+\cdots+a_{mn}x_{n}=b_{m}\end{cases} $$

中第 i 个未知量  $ x_{i} $ 的系数写成一个 m 维列向量

 $$ \boldsymbol{\alpha}_{i}=\begin{pmatrix}a_{1i}\\a_{2i}\\\vdots\\a_{mi}\end{pmatrix}\left(i=1,2,\cdots,n\right), $$

而该方程组的常数也写成一个 m 维列向量

 $$ \boldsymbol{\beta}=\begin{pmatrix}b_{1}\\ b_{2}\\ \vdots\\ b_{m}\end{pmatrix}, $$

则该方程组也可用以下向量的形式来表达

 $$ x_{1}\boldsymbol{\alpha}_{1}+x_{2}\boldsymbol{\alpha}_{2}+\cdots+x_{n}\boldsymbol{\alpha}_{n}=\boldsymbol{\beta}. $$

线性方程组的这种表示方式在今后讨论线性方程组的解时会带来很大的方便.

## 二、向量组及其线性组合

定义2 由若干个维数相同的向量构成的集合，称为向量组.

例如，例 1 中未知量的系数构成的 m 维列向量  $ \alpha_{i}=\begin{pmatrix}a_{1i}\\a_{2i}\\\vdots\\a_{mi}\end{pmatrix}(i=1,2,\cdots,n) $ 的全体构成一个向量组.

例2 设矩阵  $ A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{pmatrix} $，对矩阵 A 分块如下

 $$ \begin{aligned}\boldsymbol{A}&=\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{m1}&a_{m2}&\cdots&a_{mn}\end{pmatrix}=(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\cdots,\boldsymbol{\alpha}_{n})=\begin{pmatrix}\boldsymbol{\beta}_{1}^{\mathrm{T}}\\\boldsymbol{\beta}_{2}^{\mathrm{T}}\\\vdots\\\boldsymbol{\beta}_{m}^{\mathrm{T}}\end{pmatrix},\end{aligned} $$

其中

 $$ \boldsymbol{\alpha}_{j}=\begin{pmatrix}a_{1j}\\a_{2j}\\\vdots\\a_{mj}\end{pmatrix}(j=1,2,\cdots,n),\boldsymbol{\beta}_{i}^{\mathrm{T}}=(\boldsymbol{a}_{i1},\boldsymbol{a}_{i2},\cdots,\boldsymbol{a}_{in})(i=1,2,\cdots,m). $$

则 m 维向量组  $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_n $ 称为矩阵 A 的列向量组， $ n $ 维向量组  $ \beta_1^T $， $ \beta_2^T $， $ \cdots $， $ \beta_m^T $ 称为矩阵 A 的行向量组。

反之，给定一个 $m$ 维向量组 $\boldsymbol{\alpha}_1, \boldsymbol{\alpha}_2, \cdots, \boldsymbol{\alpha}_n$，则得到一个以 $\boldsymbol{\alpha}_1, \boldsymbol{\alpha}_2, \cdots, \boldsymbol{\alpha}_n$ 为列的 $m \times n$ 矩阵 $A = (\boldsymbol{\alpha}_1, \boldsymbol{\alpha}_2, \cdots, \boldsymbol{\alpha}_n)$；给定一个 $n$ 维向量组 $\boldsymbol{\beta}_1^\mathrm{T}, \boldsymbol{\beta}_2^\mathrm{T}, \cdots, \boldsymbol{\beta}_m^\mathrm{T}$，则得到一个以 $\boldsymbol{\beta}_1^\mathrm{T}, \boldsymbol{\beta}_2^\mathrm{T}, \cdots, \boldsymbol{\beta}_m^\mathrm{T}$ 为行的 $m \times n$ 矩阵 $A = \begin{pmatrix} \boldsymbol{\beta}_1^\mathrm{T} \\ \boldsymbol{\beta}_2^\mathrm{T} \\ \vdots \\ \boldsymbol{\beta}^\mathrm{T} \end{pmatrix}$。

由例2可知，一个向量组总可与一个矩阵建立一一对应关系.

定义 3 给定 n 维向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{n} $，对于任意一组数  $ k_{1}, k_{2}, \cdots, k_{n} $，表达式  $ k_{1}\alpha_{1}+k_{2}\alpha_{2}+\cdots+k_{n}\alpha_{n} $

称为该向量组的一个线性组合.

定义 4 给定 n 维向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{n} $ 和一个 n 维向量  $ \beta $，如果存在一组数  $ k_{1} $

 $ k_{2}, \cdots, k_{n} $，使得

 $$ \boldsymbol{\beta}=k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots+k_{n}\boldsymbol{\alpha}_{n}, $$

则称向量  $ \beta $ 可由向量组  $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_n $ 线性表示，或者说向量  $ \beta $ 是向量组  $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_n $ 的一个线性组合.

例如，给定向量组  $ \alpha_1 $， $ \alpha_2 $， $ \alpha_3 $，则向量  $ 2\alpha_1 - \alpha_2 + \sqrt{3}\alpha_3 $， $ \alpha_1 + 0\alpha_2 + 0\alpha_3 (= \alpha_1) $， $ 0\alpha_1 + \alpha_2 + 0\alpha_3 (= \alpha_2) $， $ 0\alpha_1 + 0\alpha_2 + \alpha_3 (= \alpha_3) $， $ 0\alpha_1 + 0\alpha_2 + 0\alpha_3 (= 0) $ 都是向量组  $ \alpha_1 $， $ \alpha_2 $， $ \alpha_3 $ 的线性组合.

由此可见，一个向量组可以线性表示这个向量组中的每一个向量，零向量是任意一个向量组的线性组合。

例3 设向量组  $ e_1 = \begin{pmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{pmatrix} $， $ e_2 = \begin{pmatrix} 0 \\ 1 \\ \vdots \\ 0 \end{pmatrix} $， $ \cdots $， $ e_n = \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 1 \end{pmatrix} $，则由向量的线性运算，任一向量  $ \alpha = \begin{pmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{pmatrix} $ 都可由  $ e_1 $， $ e_2 $， $ \cdots $， $ e_n $ 线性表示，即

 $$ \boldsymbol{\alpha}=\begin{pmatrix}a_{1}\\a_{2}\\\vdots\\a_{n}\end{pmatrix}=a_{1}\begin{pmatrix}1\\0\\\vdots\\0\end{pmatrix}+a_{2}\begin{pmatrix}0\\1\\\vdots\\0\end{pmatrix}+\cdots+a_{n}\begin{pmatrix}0\\0\\\vdots\\1\end{pmatrix}=a_{1}\boldsymbol{e}_{1}+a_{2}\boldsymbol{e}_{2}+\cdots+a_{n}\boldsymbol{e}_{n}. $$

对于任意给定的 $n$ 维向量组 $\alpha_1, \alpha_2, \cdots, \alpha_n$ 和 $n$ 维向量 $\beta$，如何判断向量 $\beta$ 是否可由向量组 $\alpha_1, \alpha_2, \cdots, \alpha_n$ 线性表示呢？

从定义 4 可以看到，如果向量  $ \beta $ 可由向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{n} $ 线性表示，则存在一组数  $ k_{1}, k_{2}, \cdots, k_{n} $，使得

 $$ k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots+k_{n}\boldsymbol{\alpha}_{n}=\boldsymbol{\beta}, $$

这表明线性方程组

 $$ x_{1}\boldsymbol{\alpha}_{1}+x_{2}\boldsymbol{\alpha}_{2}+\cdots+x_{n}\boldsymbol{\alpha}_{n}=\boldsymbol{\beta} $$

有解

 $$ \begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix}=\begin{pmatrix}k_{1}\\k_{2}\\\vdots\\k_{n}\end{pmatrix}. $$

反之，如果线性方程组

 $$ x_{1}\boldsymbol{\alpha}_{1}+x_{2}\boldsymbol{\alpha}_{2}+\cdots+x_{n}\boldsymbol{\alpha}_{n}=\boldsymbol{\beta} $$

有解

 $$ \begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix}=\begin{pmatrix}k_{1}\\k_{2}\\\vdots\\k_{n}\end{pmatrix}, $$

即

 $$ k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots+k_{n}\boldsymbol{\alpha}_{n}=\boldsymbol{\beta}, $$

从而向量 $ \beta $可由向量组 $ \alpha_{1},\alpha_{2},\cdots,\alpha_{n} $线性表示.

因此，向量 $ \beta $是否可由向量组 $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_n $线性表示归结于线性方程组 $ x_1\alpha_1+x_2\alpha_2+\cdots+x_n\alpha_n=\beta $是否有解。若向量 $ \beta $可由向量组 $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_n $线性表示，则表示式是否唯一由线性方程组是否有唯一解来决定。总结上面的讨论，我们得到如下定理。

定理1 向量 $ \beta $可由向量组 $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{n} $（唯一）线性表示的充分必要条件是线性方程组 $ x_{1}\alpha_{1}+x_{2}\alpha_{2}+\cdots+x_{n}\alpha_{n}=\beta $有（唯一）解.

例4 设有向量  $ \alpha = \begin{pmatrix} 5 \\ 3 \\ -6 \end{pmatrix} $ 及向量组  $ \beta_1 = \begin{pmatrix} 1 \\ 1 \\ -1 \end{pmatrix} $， $ \beta_2 = \begin{pmatrix} 0 \\ 2 \\ 1 \end{pmatrix} $， $ \beta_3 = \begin{pmatrix} -1 \\ 1 \\ 2 \end{pmatrix} $，试问  $ \alpha $ 能否由  $ \beta_1 $， $ \beta_2 $， $ \beta_3 $ 线性表示.

解 根据定理 1，设  $ x_1\beta_1 + x_2\beta_2 + x_3\beta_3 = \alpha $，由

 $$ \begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}}&{{{5}}} \\{{{1}}}&{{{2}}}&{{{1}}}&{{{3}}} \\{{{-1}}}&{{{1}}}&{{{2}}}&{{{-6}}}\end{pmatrix}\xrightarrow[r_{3}+r_{1}]{r_{2}+(-1)r_{1}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}}&{{{5}}} \\{{{0}}}&{{{2}}}&{{{2}}}&{{{-2}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}}\end{pmatrix}\xrightarrow[r_{3}+(-1)r_{2}]{}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}}&{{{5}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}, $$

可知方程组有无穷多解\left\{\begin{aligned}x_{1}&=5+c,\\ x_{2}&=-1-c,\\ x_{3}&=c,\end{aligned}\right. 其中 c 为任意常数. 因此 \alpha 能由 \beta_{1}, \beta_{2}, \beta_{3} 线性表示,

但表示式不唯一： $ \boldsymbol{\alpha}=(5+c)\boldsymbol{\beta}_{1}+(-1-c)\boldsymbol{\beta}_{2}+c\boldsymbol{\beta}_{3} $，其中c为任意常数.

例5 设向量组  $ \alpha_1 = \begin{pmatrix} 1 \\ 0 \\ -2 \end{pmatrix} $， $ \alpha_2 = \begin{pmatrix} 2 \\ 1 \\ -5 \end{pmatrix} $， $ \alpha_3 = \begin{pmatrix} -3 \\ 2 \\ 4 \end{pmatrix} $，而  $ \beta = \begin{pmatrix} 5 \\ 4 \\ -7 \end{pmatrix} $，问：向量 $ \beta $能否由向量组 $ \alpha_1 $， $ \alpha_2 $， $ \alpha_3 $线性表示？若可以，求出线性表达式。

解 设  $ x_1\alpha_1 + x_2\alpha_2 + x_3\alpha_3 = \beta $，由

 $$ \left(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3},\boldsymbol{\beta}\right)=\begin{pmatrix}1&2&-3&\left|\begin{array}{l}5\\0&1&2&4\\-2&-5&4&-7\end{array}\right|\end{pmatrix}\rightarrow\begin{pmatrix}1&2&-3&\left|\begin{array}{l}5\\0&1&2&4\\0&-1&-2&3\end{array}\right|\rightarrow\begin{pmatrix}1&2&-3&\left|\begin{array}{l}5\\0&1&2&4\\0&0&0&7\end{array}\right|\end{pmatrix} $$

可知，线性方程组无解，所以向量 $ \beta $不能由向量组 $ \alpha_{1},\alpha_{2},\alpha_{3} $线性表示.

## 三、向量组的等价

定义 5 设  $ A: \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 是 m 个 n 维向量组成的向量组，而  $ B: \beta_{1}, \beta_{2}, \cdots, \beta_{m} $

 $ \beta_{s} $ 是 s 个 n 维向量组成的向量组. 如果向量组 B 中每一个向量  $ \beta_{j}(j=1,2,\cdots,s) $ 均可由向量组 A:  $ \alpha_{1},\alpha_{2},\cdots,\alpha_{m} $ 线性表示, 则称向量组 B:  $ \beta_{1},\beta_{2},\cdots,\beta_{s} $ 可由向量组 A:  $ \alpha_{1},\alpha_{2},\cdots,\alpha_{m} $ 线性表示. 如果向量组 A 与向量组 B 可以相互线性表示, 则称向量组 A 与向量组 B 等价.

根据定义 5，若向量组  $ B: \beta_1, \beta_2, \cdots, \beta_s $ 可由向量组  $ A: \alpha_1, \alpha_2, \cdots, \alpha_m $ 线性表示，则对向量组  $ B $ 中每一个向量  $ \beta_j (j=1, 2, \cdots, s) $，存在一组数  $ k_{1j}, k_{2j}, \cdots, k_{mj} $，使得

 $$ \boldsymbol{\beta}_{j}=k_{1j}\boldsymbol{\alpha}_{1}+k_{2j}\boldsymbol{\alpha}_{2}+\cdots+k_{m j}\boldsymbol{\alpha}_{m}=(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\cdots,\boldsymbol{\alpha}_{m})\begin{pmatrix}k_{1j}\\ k_{2j}\\ \vdots\\ k_{m j}\end{pmatrix}(j=1,2,\cdots,s). $$

以向量 $ \begin{pmatrix} k_{1j} \\ k_{2j} \\ \vdots \\ k_{mj} \end{pmatrix} $为列，得到一个 $ m\times s $矩阵

 $$ \begin{aligned}\boldsymbol{K}_{m\times s}&=\begin{pmatrix}k_{11}&k_{12}&\cdots&k_{1s}\\k_{21}&k_{22}&\cdots&k_{2s}\\\vdots&\vdots&\ddots&\vdots\\k_{m1}&k_{m2}&\cdots&k_{ms}\end{pmatrix},\end{aligned} $$

矩阵  $ K_{m\times s} $ 称为这一线性表示的系数矩阵. 令矩阵  $ A=(\alpha_1, \alpha_2, \cdots, \alpha_m) $,  $ B=(\beta_1, \beta_2, \cdots, \beta_s) $, 则有

 $$ \boldsymbol{B}=\boldsymbol{A}\boldsymbol{K}_{m\times s}. $$

也就是说，若向量组  $ B: \beta_1, \beta_2, \cdots, \beta_s $ 可由向量组  $ A: \alpha_1, \alpha_2, \cdots, \alpha_m $ 线性表示，则矩阵方程

 $$ A X=B $$

有解  $ X = K_{m \times s} $.

若向量组 A 与向量组 B 等价，则存在系数矩阵  $ K_{m \times s} $ 与  $ M_{s \times m} $，使得

 $$ \boldsymbol{B}=\boldsymbol{A}\boldsymbol{K}_{m\times s},\boldsymbol{B}\boldsymbol{M}_{s\times m}=\boldsymbol{A} $$

同时成立. 亦即矩阵方程

 $$ \boldsymbol{A}\boldsymbol{X}=\boldsymbol{B} 与 \boldsymbol{B}\boldsymbol{Y}=\boldsymbol{A} $$

同时有解  $ X = K_{m \times s} $， $ Y = M_{s \times m} $。

综上所述，我们有如下定理.

定理2 设向量组A和向量组B如上所述. 令矩阵 $ A=(\alpha_1, \alpha_2, \cdots, \alpha_m) $， $ B=(\beta_1, \beta_2, \cdots, \beta_s) $，则向量组B可由向量组A线性表示的充分必要条件是矩阵方程

 $$ A X=B $$

有解. 向量组 A 与向量组 B 等价的充分必要条件是矩阵方程

 $$ \boldsymbol{A}\boldsymbol{X}=\boldsymbol{B} 与 \boldsymbol{B}\boldsymbol{Y}=\boldsymbol{A} $$

同时有解.

例6 已知向量组  $ A: \alpha_{1} = \begin{pmatrix} 1 \\ 1 \\ -1 \end{pmatrix} $， $ \alpha_{2} = \begin{pmatrix} -2 \\ 0 \\ 1 \end{pmatrix} $ 和  $ B: \beta_{1} = \begin{pmatrix} 3 \\ 1 \\ -2 \end{pmatrix} $， $ \beta_{2} = \begin{pmatrix} -3 \\ 1 \\ 1 \end{pmatrix} $， $ \beta_{3} = \begin{pmatrix} -1 \\ 1 \\ 0 \end{pmatrix} $.

证明：向量组  $ B: \beta_{1}, \beta_{2}, \beta_{3} $ 可由向量组 A:  $ \alpha_{1} $， $ \alpha_{2} $ 线性表示.

证明 根据定理2，令矩阵 $ A=(\alpha_1, \alpha_2) $， $ B=(\beta_1, \beta_2, \beta_3) $，向量组B可由向量组A线性表示的充分必要条件是矩阵方程AX=B有解。而该矩阵方程有解又等价于三个方程组 $ Ax=\beta_j(j=1,2,3) $均有解。对增广矩阵实施初等行变换，有

 $$ \left(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2}\left|\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{3}\right.\right)=\begin{pmatrix}{{{1}}}&{{{-2}}} \\{{{1}}}&{{{0}}} \\{{{-1}}}&{{{1}}}\end{pmatrix}\begin{array}{c c c}{{{3}}}&{{{-3}}}&{{{-1}}} \\{{{1}}}&{{{1}}}&{{{1}}} \\{{{-2}}}&{{{1}}}&{{{0}}}\end{array}\sim\begin{pmatrix}{{{1}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{2}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}, $$

可见，三个方程组  $ Ax = \beta_j (j=1, 2, 3) $ 的解分别为  $ \begin{pmatrix} 1 \\ -1 \end{pmatrix} $， $ \begin{pmatrix} 1 \\ 2 \end{pmatrix} $， $ \begin{pmatrix} 1 \\ 1 \end{pmatrix} $。

于是有  $ X=\begin{pmatrix}1&1&1\\-1&2&1\end{pmatrix} $，使得 AX=B。因此向量组 B 可由向量组 A 线性表示。

例7 已知向量组  $ A $： $ \alpha_1 = \begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix} $， $ \alpha_2 = \begin{pmatrix} -1 \\ 1 \\ 2 \end{pmatrix} $， $ \alpha_3 = \begin{pmatrix} 1 \\ 2 \\ 5 \end{pmatrix} $ 和  $ B $： $ \beta_1 = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} $， $ \beta_2 = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} $， $ \beta_3 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} $，证明：向量组  $ A $： $ \alpha_1 $， $ \alpha_2 $， $ \alpha_3 $ 和向量组  $ B $： $ \beta_1 $， $ \beta_2 $， $ \beta_3 $ 等价。

证明 令矩阵  $ A=(\alpha_{1}, \alpha_{2}, \alpha_{3}) $， $ B=(\beta_{1}, \beta_{2}, \beta_{3}) $，设 BX=A。由

 $$ \left(\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{3}\mid\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}\right)=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{0}}}&{{{0}}}&{{{1}}}&{{{2}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}}&{{{2}}}&{{{5}}}\end{pmatrix}\sim\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}}&{{{1}}}&{{{-1}}}&{{{-1}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{-1}}}&{{{2}}}&{{{3}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{0}}}&{{{0}}}&{{{2}}}\end{pmatrix}, $$

可知，矩阵方程  $ BX = A $ 有解  $ X = \begin{pmatrix} 1 & -1 & -1 \\ -1 & 2 & 3 \\ 0 & 0 & 2 \end{pmatrix} $，因此，向量组 A 能由向量组 B 线性表示.

另一方面，由于

 $$ \begin{aligned}\left|\begin{array}{ccc}{{{1}}}&{{{-1}}}&{{{-1}}} \\{{{-1}}}&{{{2}}}&{{{3}}} \\{{{0}}}&{{{0}}}&{{{2}}} \\\end{array}\right|&=\left|\begin{array}{ccc}{{{1}}}&{{{-1}}}&{{{-1}}} \\{{{0}}}&{{{1}}}&{{{2}}} \\{{{0}}}&{{{0}}}&{{{2}}} \\\end{array}\right|=2\neq0,\end{aligned} $$

所以矩阵 $ \begin{pmatrix}1&-1&-1\\-1&2&3\\0&0&2\end{pmatrix} $可逆，于是有 $ A\begin{pmatrix}1&-1&-1\\-1&2&3\\0&0&2\end{pmatrix}^{-1}=B $，即向量组B能由向量组A线性表示，所以这两个向量组等价.

例 7 是通过解矩阵方程的方法来判断向量组是否等价，这种方法较麻烦。引入了矩阵的秩的概念之后，利用矩阵的秩来判断向量组是否等价会更简单，具体方法见本章第四节的例 1.

### 习题3-1

1. 设  $ \alpha = \begin{pmatrix} 2 \\ 1 \\ 3 \end{pmatrix} $,  $ \beta = \begin{pmatrix} 3 \\ 5 \\ 7 \end{pmatrix} $,  $ \gamma = \begin{pmatrix} -2 \\ 4 \\ 1 \end{pmatrix} $, 求  $ 2\alpha - \beta $,  $ \alpha - \beta + 2\gamma $.

2. 设  $ \alpha = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} $， $ \beta_1 = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} $， $ \beta_2 = \begin{pmatrix} 0 \\ 1 \\ -1 \end{pmatrix} $， $ \beta_3 = \begin{pmatrix} 1 \\ -1 \\ 0 \end{pmatrix} $，问：向量  $ \alpha $ 能否由向量组  $ \beta_1 $， $ \beta_2 $， $ \beta_3 $ 线性表示？

3. 设  $ \begin{cases} \boldsymbol{\beta}_{1} = \boldsymbol{\alpha}_{2} + \boldsymbol{\alpha}_{3} + \cdots + \boldsymbol{\alpha}_{n}, \\ \boldsymbol{\beta}_{2} = \boldsymbol{\alpha}_{1} + \boldsymbol{\alpha}_{3} + \cdots + \boldsymbol{\alpha}_{n}, \\ \cdots \cdots \cdots \\ \boldsymbol{\beta}_{n} = \boldsymbol{\alpha}_{1} + \boldsymbol{\alpha}_{2} + \cdots + \boldsymbol{\alpha}_{n-1}. \end{cases} $ 证明向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{n} $ 与向量组  $ \beta_{1}, \beta_{2}, \cdots, \beta_{n} $ 等价.

4. 设有向量组  $ A: \alpha_1 = \begin{pmatrix} 1 \\ 1 \\ a \end{pmatrix} $， $ \alpha_2 = \begin{pmatrix} 1 \\ a \\ 1 \end{pmatrix} $， $ \alpha_3 = \begin{pmatrix} a \\ 1 \\ 1 \end{pmatrix} $ 和  $ B: \beta_1 = \begin{pmatrix} 1 \\ 1 \\ a \end{pmatrix} $， $ \beta_2 = \begin{pmatrix} -2 \\ a \\ 4 \end{pmatrix} $， $ \beta_3 = \begin{pmatrix} -2 \\ a \\ a \end{pmatrix} $，确定常数 a，使得向量组 A 能由向量组 B 线性表示，但是向量组 B 不能由向量组 A 线性表示.

5. 证明向量组的等价具有传递性，即：若向量组A与向量组B等价，向量组B与向量组C等价，则向量组A与向量组C等价.

## 第二节 向量组的线性相关性

[课前导读]

在线性方程组

 $$ \left\{\begin{aligned}x_{1}+&x_{2}-2x_{3}=2,\\ 2x_{1}-&x_{2}+3x_{3}=3,\\ x_{1}-2x_{2}+&5x_{3}=1\end{aligned}\right. $$

中，用第二个方程减去第一个方程，就得到第三个方程。所以第三个方程是一个多余方程，是否有这个方程并不影响原线性方程组的解，也就是说原方程组与线性方程组

 $$ \left\{\begin{aligned}x_{1}+x_{2}-2x_{3}&=2,\\ 2x_{1}-x_{2}+3x_{3}&=3\end{aligned}\right. $$

是同解线性方程组. 那么，怎样判断线性方程组中是否有多余方程呢？若有多余方程，怎样判断哪些方程是多余的呢？其实，这些问题的答案就在于我们这一节要讲的内容：向量组的线性相关性.

## 一、向量组的线性相关与线性无关

定义 设有 m 个 n 维向量构成的向量组  $ \alpha_{1} $， $ \alpha_{2} $， $ \cdots $， $ \alpha_{m} $，如果存在一组不全为零的数  $ k_{1} $， $ k_{2} $， $ \cdots $， $ k_{m} $，使得

 $$ k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots+k_{m}\boldsymbol{\alpha}_{m}=\boldsymbol{0}, $$

向量组的线性相关性

则称向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_m $ 线性相关；若当且仅当  $ k_1 = k_2 = \cdots = k_m = 0 $ 时，才有  $ k_1 \alpha_1 + k_2 \alpha_2 + \cdots + k_m \alpha_m = 0 $，则称向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_m $ 线性无关。

例1 对于向量组  $ \alpha_{1}=\begin{pmatrix}1\\ 1\\ 1\end{pmatrix} $， $ \alpha_{2}=\begin{pmatrix}2\\ 2\\ 2\end{pmatrix} $， $ \alpha_{3}=\begin{pmatrix}3\\ 5\\ 7\end{pmatrix} $，存在一组不全为零的数2，-1，0，使得

 $$ 2\boldsymbol{\alpha}_{1}-\boldsymbol{\alpha}_{2}+0\boldsymbol{\alpha}_{3}=2\begin{pmatrix}1\\ 1\\ 1\end{pmatrix}-\begin{pmatrix}2\\ 2\\ 2\end{pmatrix}+0\cdot\begin{pmatrix}3\\ 5\\ 7\end{pmatrix}=\mathbf{0}, $$

所以向量组  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 线性相关. 而对于向量组  $ \boldsymbol{e}_{1}=\left(\begin{array}{c}1\\0\\\vdots\\0\end{array}\right) $,  $ \boldsymbol{e}_{2}=\left(\begin{array}{c}0\\1\\\vdots\\0\end{array}\right) $,  $ \cdots $,  $ \boldsymbol{e}_{n}=\left(\begin{array}{c}0\\0\\\vdots\\1\end{array}\right) $, 对任意一组数  $ k_{1}, k_{2}, \cdots, k_{n} $，有

 $$ k_{1}\boldsymbol{e}_{1}+k_{2}\boldsymbol{e}_{2}+\cdots+k_{n}\boldsymbol{e}_{n}=k_{1}\begin{pmatrix}1\\ 0\\ \vdots\\ 0\end{pmatrix}+k_{2}\begin{pmatrix}0\\ 1\\ \vdots\\ 0\end{pmatrix}+\cdots+k_{n}\begin{pmatrix}0\\ 0\\ \vdots\\ 1\end{pmatrix}=\begin{pmatrix}k_{1}\\ k_{2}\\ \vdots\\ k_{n}\end{pmatrix}, $$

显然，当且仅当  $ k_1 = k_2 = \cdots = k_n = 0 $ 时，才有  $ k_1e_1 + k_2e_2 + \cdots + k_ne_n = 0 $，所以向量组  $ e_1, e_2, \cdots, e_n $ 线性无关。

特别地，当向量组只含有一个向量  $ \alpha $ 时，若  $ \alpha \neq 0 $，则只有当 k = 0 时才有  $ k\alpha = 0 $，所以  $ \alpha $ 线性无关；若  $ \alpha = 0 $，则对任意非零常数 k，都有  $ k\alpha = 0 $，所以  $ \alpha $ 线性相关。

例2 证明：任一含有零向量的向量组必定线性相关.

证明 设向量组  $ A: \mathbf{0}, \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 是任一含有零向量的 n 维向量组，于是对任意非零常数 k，都有

 $$ k\mathbf{0}+0\cdot\boldsymbol{\alpha}_{1}+0\cdot\boldsymbol{\alpha}_{2}+\cdots+0\cdot\boldsymbol{\alpha}_{m}=\mathbf{0}, $$

所以向量组 A：0， $ \alpha_{1} $， $ \alpha_{2} $，⋯， $ \alpha_{m} $ 线性相关.

例3 设有向量组  $ \alpha_{1}=\begin{pmatrix}1\\ 2\\ 1\end{pmatrix} $， $ \alpha_{2}=\begin{pmatrix}2\\ 1\\ -1\end{pmatrix} $， $ \alpha_{3}=\begin{pmatrix}1\\ 3\\ 2\end{pmatrix} $，判断向量组  $ \alpha_{1} $， $ \alpha_{2} $， $ \alpha_{3} $ 的线性相

关性.

解 按照向量组线性相关和线性无关的定义，我们只需验证使得等式  $ k_1\alpha_1 + k_2\alpha_2 + k_3\alpha_3 = 0 $ 成立的一组数  $ k_1 $， $ k_2 $， $ k_3 $ 是不全为零还是全为零.

将等式  $ k_1\alpha_1 + k_2\alpha_2 + k_3\alpha_3 = 0 $ 改写为

 $$ \left(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}\right)\begin{pmatrix}k_{1}\\ k_{2}\\ k_{3}\end{pmatrix}=\mathbf{0},\mathrm{~ 即 }\begin{pmatrix}1&2&1\\ 2&1&3\\ 1&-1&2\end{pmatrix}\begin{pmatrix}k_{1}\\ k_{2}\\ k_{3}\end{pmatrix}=\mathbf{0}, $$

于是，问题转化为齐次线性方程组

 $$ \begin{pmatrix}1&2&1\\2&1&3\\1&-1&2\end{pmatrix}\begin{pmatrix}x_{1}\\x_{2}\\x_{3}\end{pmatrix}=\mathbf{0} $$

是有非零解，还是只有零解。如果只有零解，则  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 线性无关，若有非零解，则  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 线性相关。由于系数行列式

 $$ \begin{aligned}\left|\begin{matrix}{{{1}}}&{{{2}}}&{{{1}}} \\{{{2}}}&{{{1}}}&{{{3}}} \\{{{1}}}&{{{-1}}}&{{{2}}}\end{matrix}\right|&=\left|\begin{matrix}{{{1}}}&{{{2}}}&{{{1}}} \\{{{2}}}&{{{1}}}&{{{3}}} \\{{{2}}}&{{{1}}}&{{{3}}}\end{matrix}\right|=0,\end{aligned} $$

所以方程组有非零解，任取一组非零解 $ \begin{pmatrix} k_1 \\ k_2 \\ k_3 \end{pmatrix} \neq \mathbf{0} $，都有  $ k_1 \alpha_1 + k_2 \alpha_2 + k_3 \alpha_3 = \mathbf{0} $，所以  $ \alpha_1, \alpha_2, \alpha_3 $ 线性相关.

例4 已知向量组  $ \alpha_{1} $， $ \alpha_{2} $， $ \alpha_{3} $ 线性无关， $ \beta_{1}=\alpha_{1}+\alpha_{2} $， $ \beta_{2}=\alpha_{2}+\alpha_{3} $， $ \beta_{3}=\alpha_{3}+\alpha_{1} $，试证明：向量组  $ \beta_{1} $， $ \beta_{2} $， $ \beta_{3} $ 也线性无关.

证明 设有一组数  $ k_1 $， $ k_2 $， $ k_3 $ 使得  $ k_1\beta_1 + k_2\beta_2 + k_3\beta_3 = 0 $，将  $ \beta_1 = \alpha_1 + \alpha_2 $， $ \beta_2 = \alpha_2 + \alpha_3 $， $ \beta_3 = \alpha_3 + \alpha_1 $ 代入并整理得

 $$ \left(k_{1}+k_{3}\right)\boldsymbol{\alpha}_{1}+\left(k_{1}+k_{2}\right)\boldsymbol{\alpha}_{2}+\left(k_{2}+k_{3}\right)\boldsymbol{\alpha}_{3}=\mathbf{0}. $$

已知  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 线性无关，所以上式成立当且仅当

 $$ \begin{cases}k_{1}+k_{3}=0,\\k_{1}+k_{2}=0,\\k_{2}+k_{3}=0,\end{cases} $$

此齐次线性方程组的系数行列式  $ \begin{vmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{vmatrix} = 2 \neq 0 $，所以只有零解  $ k_1 = k_2 = k_3 = 0 $，因此  $ \beta_1 $， $ \beta_2 $， $ \beta_3 $ 也线性无关。

总结例3、例4的解题过程，我们知道，向量组的线性相关性的判断可以转化为对齐次线性方程组的解的判断.

定理 1 m 个 n 维向量构成的向量组  $ \alpha_{1} $， $ \alpha_{2} $，…， $ \alpha_{m} $ 线性相关的充分必要条件是齐次线性方程组

 $$ k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots+k_{m}\boldsymbol{\alpha}_{m}=\boldsymbol{0} $$

有非零解；线性无关的充分必要条件是上述齐次线性方程组只有零解  $ k_{1}=k_{2}=\cdots=k_{m}=0 $.

已知齐次线性方程组  $ x_1\boldsymbol{\alpha}_1+x_1\boldsymbol{\alpha}_2+\cdots+x_1\boldsymbol{\alpha}_m=0 $，将系数矩阵  $ \boldsymbol{A}=(\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2,\cdots,\boldsymbol{\alpha}_m) $ 实施初等行变换化为矩阵  $ \boldsymbol{B}=(\boldsymbol{\beta}_1,\boldsymbol{\beta}_2,\cdots,\boldsymbol{\beta}_m) $，则以矩阵  $ \boldsymbol{B} $ 为系数矩阵的齐次线性方程组  $ x_1\boldsymbol{\beta}_1+x_2\boldsymbol{\beta}_2+\cdots+x_m\boldsymbol{\beta}_m=0 $ 与齐次线性方程组  $ x_1\boldsymbol{\alpha}_1+x_1\boldsymbol{\alpha}_2+\cdots+x_1\boldsymbol{\alpha}_m=0 $ 是同解线性方程组，从而向量组  $ \boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2,\cdots,\boldsymbol{\alpha}_m $ 与向量组  $ \boldsymbol{\beta}_1,\boldsymbol{\beta}_2,\cdots,\boldsymbol{\beta}_m $ 具有相同的线性相关性。也就是说，若矩阵  $ \boldsymbol{A}\boldsymbol{\varkappa}\boldsymbol{B} $，则矩阵  $ \boldsymbol{A} $ 的列向量组与矩阵  $ \boldsymbol{B} $ 的列向量组有相同的线性相关性。相应地，若矩阵  $ \boldsymbol{A}\boldsymbol{\varkappa}\boldsymbol{B} $，则矩阵  $ \boldsymbol{A} $ 的行向量组与矩阵  $ \boldsymbol{B} $ 的行向量组有相同的线性相关性。

## 二、向量组线性相关性的一些重要结论

定理 2 向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_m (m \geq 2) $ 线性相关的充分必要条件是存在某一个向量  $ \alpha_j (1 \leq j \leq m) $ 可由其余向量线性表示.

证明 充分性：若存在某一个向量  $ \alpha_j (1 \leq j \leq m) $ 可由其余向量线性表示，即存在一组数  $ k_1, \cdots, k_{j-1}, k_{j+1}, \cdots, k_m $，使得

 $$ \boldsymbol{\alpha}_{j}=k_{1}\boldsymbol{\alpha}_{1}+\cdots+k_{j-1}\boldsymbol{\alpha}_{j-1}+k_{j+1}\boldsymbol{\alpha}_{j+1}+\cdots+k_{m}\boldsymbol{\alpha}_{m}, $$

移项得

 $$ k_{1}\boldsymbol{\alpha}_{1}+\cdots+k_{j-1}\boldsymbol{\alpha}_{j-1}+\boldsymbol{\alpha}_{j}+k_{j+1}\boldsymbol{\alpha}_{j+1}+\cdots+k_{m}\boldsymbol{\alpha}_{m}=\boldsymbol{0}. $$

显然这组数  $ k_1, \cdots, k_{j-1}, 1, k_{j+1}, \cdots, k_m $ 不全为零，所以向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_m (m \geq 2) $ 线性相关.

必要性：如果向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} (m \geqslant 2) $ 线性相关，则存在一组不全为零的数  $ k_{1}, k_{2}, \cdots, k_{m} $，使得

 $$ k_{1}\pmb{\alpha}_{1}{\mathbf{+}}k_{2}\pmb{\alpha}_{2}{\mathbf{+}}\cdots{\mathbf{+}}k_{m}\pmb{\alpha}_{m}=\mathbf{0}. $$

在  $ k_{1} $， $ k_{2} $， $ \cdots $， $ k_{n} $ 中必存在某个数不为零，不妨设  $ k_{j} \neq 0 $，则对上式移项得

 $$ k_{j}\boldsymbol{\alpha}_{j}=k_{1}\boldsymbol{\alpha}_{1}+\cdots+k_{j-1}\boldsymbol{\alpha}_{j-1}+k_{j+1}\boldsymbol{\alpha}_{j+1}+\cdots+k_{m}\boldsymbol{\alpha}_{m}, $$

从而有

 $$ \boldsymbol{\alpha}_{j}=\frac{k_{1}}{k_{j}}\boldsymbol{\alpha}_{1}+\cdots+\frac{k_{j-1}}{k_{j}}\boldsymbol{\alpha}_{j-1}+\frac{k_{j+1}}{k_{j}}\boldsymbol{\alpha}_{j+1}+\cdots+\frac{k_{m}}{k_{j}}\boldsymbol{\alpha}_{m}, $$

即  $ \alpha_{i} $ 可由其余向量线性表示.

将定理2应用到由两个向量构成的向量组上，就得到如下应用比较方便的推论.

推论1 两个向量  $ \alpha_{1}, \alpha_{2} $ 线性相关的充分必要条件是它们的分量对应成比例.

例5 设  $ \alpha_{1}=\begin{pmatrix}1\\2\\3\end{pmatrix} $， $ \alpha_{2}=\begin{pmatrix}3\\6\\9\end{pmatrix} $， $ \alpha_{3}=\begin{pmatrix}3\\4\\7\end{pmatrix} $，则  $ \alpha_{2}=3\alpha_{1} $，因此  $ \alpha_{1} $， $ \alpha_{2} $ 线性相关。而  $ \alpha_{3} $ 与  $ \alpha_{1} $ 的分量不对应成比例， $ \alpha_{3} $ 与  $ \alpha_{2} $ 的分量也不对应成比例，从而  $ \alpha_{1} $， $ \alpha_{3} $ 线性无关， $ \alpha_{2} $， $ \alpha_{3} $ 也线性无关。

将线性方程组  $ A_{m \times n}x = \beta $ 的增广矩阵  $ \widetilde{A} = (A \mid \beta) $ 按行分块，记为

 $$ \widetilde{A}=\left(\begin{matrix}{\boldsymbol{\beta}_{1}^{\mathrm{T}}}\\ {\boldsymbol{\beta}_{2}^{\mathrm{T}}}\\ {\vdots}\\ {\boldsymbol{\beta}_{m}^{\mathrm{T}}}\\ \end{matrix}\right), $$

当行向量组  $ \boldsymbol{\beta}_{1}^{\mathrm{T}}, \boldsymbol{\beta}_{2}^{\mathrm{T}}, \cdots, \boldsymbol{\beta}_{m}^{\mathrm{T}} $ 线性相关时，方程组有多余的方程，并且由定理 2 可知，若  $ \boldsymbol{\beta}_{j}^{\mathrm{T}} $ 可由其余向量线性表示，则  $ \boldsymbol{\beta}_{j}^{\mathrm{T}} $ 所对应的第 j 个方程就是多余方程.

给定一个向量组后，从这个向量组中抽取一部分向量构成一个新的向量组，这个新的向量组称为原向量组的部分组。设有 $n$ 维向量组 $A: \alpha_1, \alpha_2, \cdots, \alpha_m$，为了书写方便，不妨设其部分组记为 $B: \alpha_1, \alpha_2, \cdots, \alpha_r (1 \leq r < m)$，对于向量组 $A$ 与其部分组 $B$ 的线性相关性，我们有下面的定理。

推论2 若部分组B线性相关，则向量组A也线性相关.

证明 若部分组 B 线性相关，则存在一组不全为零的数  $ k_{1}, k_{2}, \cdots, k_{r} $，使得

 $$ k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots k_{r}\boldsymbol{\alpha}_{r}=\boldsymbol{0}. $$

于是有

 $$ k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots k_{r}\boldsymbol{\alpha}_{r}+0\cdot\boldsymbol{\alpha}_{r+1}+0\cdot\boldsymbol{\alpha}_{r+2}+\cdots+0\cdot\boldsymbol{\alpha}_{m}=\mathbf{0}, $$

显然， $ k_{1} $， $ k_{2} $，⋯， $ k_{r} $，0，⋯，0也是一组不全为零的数，因此向量组A也线性相关.

推论2可以说成：部分相关，则整体相关.

推论 3 若向量组 A 线性无关，则其部分组 B 也线性无关.

证明 反证法：若部分组 B 线性相关，则由推论 2 知，向量组 A 线性相关，与已知条件矛盾。所以部分组 B 也线性无关。

推论 3 也可说成：整体无关，则部分必无关.

推论4 设  $ A: \alpha_1, \alpha_2, \cdots, \alpha_m $ 是  $ m $ 个  $ n $ 维向量组成的向量组，当  $ n < m $ 时该向量组一定线性相关。特别地， $ n+1 $ 个  $ n $ 维向量一定线性相关。

证明 记矩阵  $ A = (\alpha_1, \alpha_2, \cdots, \alpha_m) $，当  $ n < m $ 时，齐次线性方程组 AX = 0 中方程的个数小于未知量的个数，因此一定有非零解，所以向量组 A 线性相关.

定理 3 设向量组  $ A: \alpha_1, \alpha_2, \cdots, \alpha_m $ 线性无关，而向量组  $ A': \alpha_1, \alpha_2, \cdots, \alpha_m, \beta $ 线性相关，则向量  $ \beta $ 一定能由向量组  $ A: \alpha_1, \alpha_2, \cdots, \alpha_m $ 线性表示，且表示式是唯一的.

证明 因为向量组  $ A':\alpha_1,\alpha_2,\cdots,\alpha_m,\beta $ 线性相关，所以存在一组不全为零的数  $ k_1,k_2,\cdots,k_m,k $ ，使得

 $$ k_{1}\pmb{\alpha}_{1}+k_{2}\pmb{\alpha}_{2}+\cdots+k_{m}\pmb{\alpha}_{m}+k\pmb{\beta}=\pmb{0}. $$

我们断言，在上式中一定有  $ k \neq 0 $。这是因为，如果 k = 0，则  $ k_1, k_2, \cdots, k_m $ 不全为零，且式 (2-1) 变为

 $$ k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots+k_{m}\boldsymbol{\alpha}_{m}=\boldsymbol{0}, $$

于是向量组  $ A: \alpha_1, \alpha_2, \cdots, \alpha_m $ 线性相关，这与已知条件矛盾，所以  $ k \neq 0 $。此时，将式 (2-1) 变形得

 $$ \boldsymbol{\beta}=-\frac{k_{1}}{k}\boldsymbol{\alpha}_{1}-\frac{k_{2}}{k}\boldsymbol{\alpha}_{2}-\cdots-\frac{k_{m}}{k}\boldsymbol{\alpha}_{m}, $$

所以向量 $ \beta $一定能由向量组 $ A:\alpha_{1},\alpha_{2},\cdots,\alpha_{m} $线性表示.下面证明表示式是唯一的.

假设存在两组数  $ \lambda_{1}, \lambda_{2}, \cdots, \lambda_{m} $ 与  $ \mu_{1}, \mu_{2}, \cdots, \mu_{m} $，都满足

 $$ \boldsymbol{\beta}=\lambda_{1}\boldsymbol{\alpha}_{1}+\lambda_{2}\boldsymbol{\alpha}_{2}+\cdots+\lambda_{m}\boldsymbol{\alpha}_{m},\boldsymbol{\beta}=\mu_{1}\boldsymbol{\alpha}_{1}+\mu_{2}\boldsymbol{\alpha}_{2}+\cdots+\mu_{m}\boldsymbol{\alpha}_{m}, $$

将两式相减，得

 $$ \mathbf{0}=\left(\lambda_{1}-\mu_{1}\right)\boldsymbol{\alpha}_{1}+\left(\lambda_{2}-\mu_{2}\right)\boldsymbol{\alpha}_{2}+\cdots+\left(\lambda_{m}-\mu_{m}\right)\boldsymbol{\alpha}_{m}, $$

但是向量组  $ A: \alpha_1, \alpha_2, \cdots, \alpha_m $ 线性无关，所以  $ \lambda_1 - \mu_1 = 0 $， $ \lambda_2 - \mu_2 = 0 $， $ \cdots $， $ \lambda_m - \mu_m = 0 $，即  $ \lambda_1 = \mu_1 $， $ \lambda_2 = \mu_2 $， $ \cdots $， $ \lambda_m = \mu_m $，因此表示式是唯一的。

例6 已知向量组  $ \alpha_{1} $， $ \alpha_{2} $， $ \alpha_{3} $ 线性无关，向量组  $ \alpha_{2} $， $ \alpha_{3} $， $ \alpha_{4} $ 线性相关，证明：向量  $ \alpha_{4} $ 可由向量组  $ \alpha_{1} $， $ \alpha_{2} $， $ \alpha_{3} $ 线性表示.

证明 因为向量组  $ \alpha_{1} $， $ \alpha_{2} $， $ \alpha_{3} $ 线性无关，于是由推论 3 知，部分组  $ \alpha_{2} $， $ \alpha_{3} $ 也线性无关。而向量组  $ \alpha_{2} $， $ \alpha_{3} $， $ \alpha_{4} $ 线性相关，于是由定理 3 知，向量  $ \alpha_{4} $ 可由向量组  $ \alpha_{2} $， $ \alpha_{3} $ 线性表示，即存在一组数  $ k_{2} $， $ k_{3} $，使

 $$ \boldsymbol{\alpha}_{4}=k_{2}\boldsymbol{\alpha}_{2}+k_{3}\boldsymbol{\alpha}_{3}, $$

从而有

 $$ \boldsymbol{\alpha}_{4}=0\cdot\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+k_{3}\boldsymbol{\alpha}_{3}, $$

即：向量  $ \alpha_{4} $ 可由向量组  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 线性表示.

定理4 设有两个n维向量组

 $$ A\colon\alpha_{1},\alpha_{2},\cdots,\alpha_{s};B\colon\beta_{1},\beta_{2},\cdots,\beta_{t}, $$

如果向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_s $ 可由向量组  $ \beta_1, \beta_2, \cdots, \beta_t $ 线性表示，并且  $ s > t $，则向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_s $ 线性相关.

证明 要证明  $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_s $ 线性相关，只需证明方程组  $ x_1\alpha_1 + x_2\alpha_2 + \cdots + x_s\alpha_s = 0 $ 有非零解即可。因为向量组  $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_s $ 可由向量组  $ \beta_1 $， $ \beta_2 $， $ \cdots $， $ \beta_t $ 线性表示，所以存在一个矩阵  $ K_{t\times s} $，使得

 $$ \left(\alpha_{1},\alpha_{2},\cdots,\alpha_{s}\right)=\left(\beta_{1},\beta_{2},\cdots,\beta_{t}\right)K_{t\times s}. $$

于是方程组  $ x_1\alpha_1 + x_2\alpha_2 + \cdots + x_s\alpha_s = 0 $ 等价于

 $$ x_{1}\boldsymbol{\alpha}_{1}+x_{2}\boldsymbol{\alpha}_{2}+\cdots+x_{s}\boldsymbol{\alpha}_{s}=\left(\boldsymbol{\alpha}_{1},\ \boldsymbol{\alpha}_{2},\ \cdots,\ \boldsymbol{\alpha}_{s}\right)\begin{pmatrix}x_{1}\\ x_{2}\\ \vdots\\ x_{s}\end{pmatrix}=\left(\boldsymbol{\beta}_{1},\ \boldsymbol{\beta}_{2},\ \cdots,\ \boldsymbol{\beta}_{t}\right)\boldsymbol{K}_{t\times s}\begin{pmatrix}x_{1}\\ x_{2}\\ \vdots\\ x_{s}\end{pmatrix}=\mathbf{0}. $$

注意到，齐次线性方程组  $ K_{t\times s}\begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_s \end{pmatrix} = \mathbf{0} $ 中方程的个数 t 小于未知量的个数 s，从而必有

非零解，即一定存在一组不全为零的数  $ k_{1} $， $ k_{2} $， $ \cdots $， $ k_{s} $，使得  $ K_{t\times s}\begin{pmatrix} k_{1} \\ k_{2} \\ \vdots \\ k_{s} \end{pmatrix} = \mathbf{0} $。因此

 $$ \left(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\cdots,\boldsymbol{\alpha}_{s}\right)\begin{pmatrix}k_{1}\\ k_{2}\\ \vdots\\ k_{s}\end{pmatrix}=\left(\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\cdots,\boldsymbol{\beta}_{t}\right)\boldsymbol{K}_{t\times s}\begin{pmatrix}k_{1}\\ k_{2}\\ \vdots\\ k_{s}\end{pmatrix}=\left(\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\cdots,\boldsymbol{\beta}_{t}\right)\begin{pmatrix}0\\ 0\\ \vdots\\ 0\end{pmatrix}=\mathbf{0}. $$

即方程组  $ x_1\alpha_1 + x_2\alpha_2 + \cdots + x_s\alpha_s = 0 $ 有非零解  $ k_1, k_2, \cdots, k_s $，从而  $ \alpha_1, \alpha_2, \cdots, \alpha_s $ 线性相关。

推论5 如果向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{s} $ 可由向量组  $ \beta_{1}, \beta_{2}, \cdots, \beta_{t} $ 线性表示，并且向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{s} $ 线性无关，则  $ s \leq t $.

推论6 如果向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{s} $ 与向量组  $ \beta_{1}, \beta_{2}, \cdots, \beta_{t} $ 均线性无关，并且这两个向量组等价，则 s = t.

### 习题3-2

1\. 判断下列命题是否正确，正确的给予证明，错误的给出反例.

(1) 若非零向量  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 中任一个向量均不能由其余向量线性表示，则向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 线性无关；

(2) 若向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 线性相关，则向量  $ \alpha_{1} $ 可由其余向量  $ \alpha_{2}, \cdots, \alpha_{m} $ 线性表示；

(3) 若向量组  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 线性无关，向量  $ \beta_{1} $ 可由  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 线性表示，向量  $ \beta_{2} $ 不能由  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 线性表示，则向量组  $ \alpha_{1}, \alpha_{2}, \alpha_{3}, \beta_{1} + \beta_{2} $ 也线性无关；

(4) 如果有不全为零的数  $ k_{1}, k_{2}, \cdots, k_{m} $，使得

 $$ k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots+k_{m}\boldsymbol{\alpha}_{m}+k_{1}\boldsymbol{\beta}_{1}+k_{2}\boldsymbol{\beta}_{2}+\cdots+k_{m}\boldsymbol{\beta}_{m}=\mathbf{0} $$

成立，则  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 线性相关， $ \beta_{1}, \beta_{2}, \cdots, \beta_{m} $ 也线性相关；

(5)若向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 线性相关，向量组  $ \beta_{1}, \beta_{2}, \cdots, \beta_{m} $ 也线性相关，则存在不全为零的数  $ k_{1}, k_{2}, \cdots, k_{m} $，使得

 $$ k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots+k_{m}\boldsymbol{\alpha}_{m}=\mathbf{0} 与 k_{1}\boldsymbol{\beta}_{1}+k_{2}\boldsymbol{\beta}_{2}+\cdots+k_{m}\boldsymbol{\beta}_{m}=\mathbf{0} $$

同时成立：

(6) 若向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 线性无关，向量组  $ \beta_{1}, \beta_{2}, \cdots, \beta_{m} $ 线性无关，则向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m}, \beta_{1}, \beta_{2}, \cdots, \beta_{m} $ 也是线性无关的.

2. 判断下列向量组是线性相关还是线性无关.

 $$ (1)\boldsymbol{\alpha}_{1}=\left(\begin{matrix}1\\1\\0\end{matrix}\right),\boldsymbol{\alpha}_{2}=\left(\begin{matrix}2\\0\\1\end{matrix}\right),\boldsymbol{\alpha}_{3}=\left(\begin{matrix}0\\1\\3\end{matrix}\right);\quad(2)\boldsymbol{\beta}_{1}=\left(\begin{matrix}2\\-1\\3\end{matrix}\right),\boldsymbol{\beta}_{2}=\left(\begin{matrix}3\\6\\5\end{matrix}\right),\boldsymbol{\beta}_{3}=\left(\begin{matrix}6\\12\\10\end{matrix}\right); $$

(3)

 $$ 3)\boldsymbol{\gamma}_{1}=\begin{pmatrix}3\\ -2\\ 5\end{pmatrix},\quad\boldsymbol{\gamma}_{2}=\begin{pmatrix}6\\ 4\\ 7\end{pmatrix},\quad\boldsymbol{\gamma}_{3}=\begin{pmatrix}9\\ 11\\ 12\end{pmatrix},\quad\boldsymbol{\gamma}_{4}=\begin{pmatrix}7\\ 5\\ 1\end{pmatrix}. $$

3. 设  $ \beta_{1}=\alpha_{1}+\alpha_{2} $， $ \beta_{2}=\alpha_{2}+\alpha_{3} $， $ \beta_{3}=\alpha_{3}+\alpha_{4} $， $ \beta_{4}=\alpha_{4}+\alpha_{1} $，证明向量组  $ \beta_{1} $， $ \beta_{2} $， $ \beta_{3} $， $ \beta_{4} $

是线性相关的.

### 4. 已知向量组

 $$ \boldsymbol{\alpha}_{1}=\left(\begin{aligned}1\\ -1\\ 1\end{aligned}\right),\quad\boldsymbol{\alpha}_{2}=\left(\begin{aligned}a\\ 2\\ 1\end{aligned}\right),\quad\boldsymbol{\alpha}_{3}=\left(\begin{aligned}2\\ a\\ 0\end{aligned}\right), $$

当 a 取何值时，向量组  $ \alpha_{1} $， $ \alpha_{2} $， $ \alpha_{3} $ 线性相关？当 a 取何值时，向量组  $ \alpha_{1} $， $ \alpha_{2} $， $ \alpha_{3} $ 线性无关？

5. 已知向量组  $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_m $ ( $ m \geq 2 $) 线性无关， $ \beta_1 = \alpha_1 + \alpha_2 $， $ \beta_2 = \alpha_2 + \alpha_3 $， $ \cdots $， $ \beta_{m-1} = \alpha_{m-1} + \alpha_m $， $ \beta_m = \alpha_m + \alpha_1 $，讨论向量组  $ \beta_1 $， $ \beta_2 $， $ \cdots $， $ \beta_m $ 的线性相关性。

6. 设  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{n} $ 是一组 n 维向量，证明：它们线性无关的充分必要条件是任意一个 n 维向量都可以由它们线性表示.

### [课前导读]

我们知道，线性方程组与它的增广矩阵有一一对应的关系，增广矩阵的每一行都对应着一个方程。通过上节的学习我们还看到，当增广矩阵的行向量组线性相关时，这个线性方程组有多余方程，删去多余方程并不影响线性方程组的解。那么，一个线性方程组中到底会有多少个多余方程呢？多余方程的个数由什么来确定？这些问题涉及我们这一节要讨论的内容：向量组的秩、矩阵的秩和向量组的极大无关组。

## 一、向量组秩的概念

定义 1 设 A 是一个 n 维向量组（它可以包含无限多个向量），如果在 A 中取出 r 个向量  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 满足条件：

(1) 向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 线性无关;

向量组的秩的概念

(2)对于A中任意的向量 $ \beta $，向量组 $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_r $， $ \beta $线性相关.

则称向量组 $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_r $为向量组A的一个极大线性无关组，简称极大无关组.

由极大无关组的定义可知，向量组 A 中任一向量都可由它的极大无关组线性表示. 反之，极大无关组作为向量组 A 的部分组，一定可由向量组 A 线性表示，因而向量组 A 与它自身的极大无关组总是等价的. 向量组 A 中所含向量的个数有可能是无限多个，但是它的极大无关组所含向量的个数不会超过向量的维数，从而一定是有限的. 用向量组的极大无关组来代替向量组，会给我们的讨论带来极大的方便.

例1 n维单位坐标向量组  $ E: e_1 = \begin{pmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{pmatrix} $， $ e_2 = \begin{pmatrix} 0 \\ 1 \\ \vdots \\ 0 \end{pmatrix} $， $ \cdots $， $ e_n = \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 1 \end{pmatrix} $ 线性无关，所以该向量组的极大无关组就是它本身.

例2 设向量组  $ A: \alpha_1 = \begin{pmatrix} 2 \\ 2 \\ 3 \end{pmatrix} $， $ \alpha_2 = \begin{pmatrix} 1 \\ 5 \\ 2 \end{pmatrix} $， $ \alpha_3 = \begin{pmatrix} 4 \\ 12 \\ 7 \end{pmatrix} $，向量  $ \alpha_1 $ 与  $ \alpha_2 $ 的分量不对应成比例，所以  $ \alpha_1 $， $ \alpha_2 $ 线性无关。另外，由于  $ \alpha_3 = \alpha_1 + 2\alpha_2 $，所以向量组  $ \alpha_1 $， $ \alpha_2 $， $ \alpha_3 $ 线性相关。因此，向量组  $ \alpha_1 $， $ \alpha_2 $ 是向量组  $ \alpha_1 $， $ \alpha_2 $， $ \alpha_3 $ 的极大无关组。

由类似的讨论可知，向量组  $ \alpha_{2} $， $ \alpha_{3} $，向量组  $ \alpha_{1} $， $ \alpha_{3} $ 都可作为向量组  $ \alpha_{1} $， $ \alpha_{2} $， $ \alpha_{3} $ 的极大无关组。也就是说，一个向量组的极大无关组并不是唯一的。但由定义可以看出，向量组 A 与其任意一个极大无关组是相互等价的，由向量组等价的传递性可知，向量组 A 的任意两个极大无关组相互等价，根据第二节推论 6，向量组 A 的每一个极大无关组所含向量的个数总是相等的。于是，我们引入如下定义。

定义 2 向量组 A 的任意一个极大无关组所含向量的个数，称为这个向量组的秩，记为  $ R_{A} $.

例如，例 1 中的向量组的秩  $ R_{E}=n $，例 2 中的向量组的秩  $ R_{A}=2 $。

如果一个向量组只含有零向量，则它没有极大无关组，此时我们规定它的秩为零.

定理 1 等价的向量组有相同的秩.

证明 因为每个向量组都与它的极大无关组等价，根据向量组等价的传递性，任意两个等价的向量组的极大无关组也等价. 于是由第二节的推论6可知，等价的向量组有相同的秩.

例3 证明：一个向量组线性无关的充分必要条件是它的秩等于它所含向量的个数.

证明 如果一个向量组本身线性无关，则这个向量组的极大无关组就是它自身，于是它的秩等于它所含向量的个数；若一个向量组的秩等于它所含向量的个数，则这个向量组显然是线性无关的.

例4 证明：任一 n 维向量组 A 的秩  $ R_{A} \leqslant n $.

证明 由第二节推论4可知， $ n+1 $ 个  $ n $ 维向量必定线性相关，所以  $ n $ 维向量组  $ A $ 的极大无关组中所含向量个数不能超过  $ n $ 个，即  $ R_A \leq n $。

## 二、矩阵秩的概念

通过第一章的学习我们知道，任一矩阵都可以通过初等行变换化为阶梯形矩阵。虽然阶梯形矩阵的形式不唯一，但是所有阶梯形矩阵中所含的非零行的行数都相等。这个非零行的行数是由矩阵本身的特性所确定的，矩阵的这个特性，我们称为矩阵的秩。具体定义如下。

矩阵的秩的概念

定义 3 在  $ m \times n $ 矩阵 A 中，任取 k 行与 k 列 ( $ k \leq m $,  $ k \leq n $)，位于这些行列交叉处的  $ k^{2} $ 个元素，不改变它们在 A 中所处的位置次序而得的 k 阶行列式，称为矩阵 A 的 k 阶子式.

 $ m \times n $ 矩阵 A 中的 k 阶子式共有  $ C_{m}^{k} \cdot C_{n}^{k} $ 个.

定义 4 设在矩阵 A 中有一个不等于 0 的 r 阶子式 D，且所有  $ r+1 $ 阶子式（如果存在的话）全等于 0，那么 D 称为矩阵 A 的最高阶非零子式，数 r 称为矩阵 A 的秩，记作 R(A). 并规定，零矩阵的秩等于 0.

由行列式按行(列)展开的性质可知，若 A 的所有  $ r+1 $ 阶子式全等于零，则所有高于  $ r+1 $ 阶的子式也全为 0，因此，r 阶非零子式 D 被称为最高阶非零子式，而矩阵 A 的秩  $ R(A) $ 就是非零子式的最高阶数。由此可得，若矩阵 A 中有某个 k 阶子式不为 0，则  $ R(A) \geq k $；若矩阵 A 中所有 k 阶子式全为 0，则  $ R(A) < k $。

对于 $n$ 阶矩阵 $A$，因为 $A$ 的 $n$ 阶子式只有一个 $|A|$，所以，当 $|A| \neq 0$ 时，$R(A) = n$，当 $|A| = 0$ 时，$R(A) < n$。从而可逆矩阵的秩等于它的阶数，而不可逆矩阵的秩小于它的阶数。因此，可逆矩阵又称为满秩矩阵，不可逆矩阵又称为降秩矩阵。

例5 证明：矩阵A的秩与它的转置矩阵 $ A^{T} $的秩相等.

证明 由于矩阵  $ A^{\mathrm{T}} $ 的子式都是矩阵 A 的子式的转置，根据行列式与其转置行列式相等这一性质，得到  $ R(A)=R(A^{\mathrm{T}}) $.

例6 求矩阵 $ A=\begin{pmatrix}1&1&2&3\\-1&2&0&1\\0&3&2&4\end{pmatrix} $的秩.

解 矩阵 A 没有 4 阶子式，它的所有 3 阶子式为

 $$ \begin{aligned}\left|\begin{matrix}{{{1}}}&{{{1}}}&{{{2}}} \\{{{-1}}}&{{{2}}}&{{{0}}} \\{{{0}}}&{{{3}}}&{{{2}}}\end{matrix}\right|&=0,\quad\left|\begin{matrix}{{{1}}}&{{{1}}}&{{{3}}} \\{{{-1}}}&{{{2}}}&{{{1}}} \\{{{0}}}&{{{3}}}&{{{4}}}\end{matrix}\right|=0,\quad\left|\begin{matrix}{{{1}}}&{{{2}}}&{{{3}}} \\{{{-1}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{2}}}&{{{4}}}\end{matrix}\right|=0,\quad\left|\begin{matrix}{{{1}}}&{{{2}}}&{{{3}}} \\{{{2}}}&{{{0}}}&{{{1}}} \\{{{3}}}&{{{2}}}&{{{4}}}\end{matrix}\right|=0,\end{aligned} $$

而 A 中有一个非零的 2 阶子式  $ \begin{vmatrix}1 & 1 \\ -1 & 2\end{vmatrix} = 3 \neq 0 $，所以 A 的秩  $ R(A) = 2 $。

例7 求矩阵 $ B=\begin{pmatrix}2&-3&4&4&5\\0&-2&1&-1&3\\0&0&0&0&4\\0&0&0&0&0\end{pmatrix} $的秩.

解 矩阵 B 是一个行阶梯形矩阵，非零行的行数为 3，从而 B 的所有 4 阶子式全为 0. 而 B 中存在一个 3 阶非零子式

 $$ \begin{vmatrix}{{{2}}}&{{{-3}}}&{{{5}}} \\{{{0}}}&{{{-2}}}&{{{3}}} \\{{{0}}}&{{{0}}}&{{{4}}}\end{vmatrix}=-16\neq0, $$

于是 $ R(\boldsymbol{B})=3 $.

## 三、矩阵秩的求法

对一般的矩阵而言，当矩阵的行数与列数较高时，按定义求秩是一件很麻烦的事情。但是从例7可以看到，按定义求阶梯形矩阵的秩则比较简单。并且阶梯形矩阵的秩刚好等于它的阶梯数，也可以通过数阶梯数来给出矩阵的秩。而我们在第一章曾指出，任何矩阵都可以通过初等行变换化为阶梯形矩阵。如果初等行变换不改变矩阵秩的话，我们就找到了一个求矩阵秩的好方法。事实上，确实有这样的结论。

定理2 矩阵的初等行变换不改变矩阵的秩，即若  $ A \sim B $，则  $ R(A) = R(B) $

 $ ^{*} $证明 先证明矩阵A通过一次初等行变换变为矩阵B，有 $ R(A)=R(B) $.

设矩阵 A 的秩为 r，D 是矩阵 A 中的 r 阶非零子式，矩阵 B 的秩为 t.

(1) 若  $ A \xrightarrow{r_i} B $，则在 B 中总能找到与 D 相对应的 r 阶子式  $ D_1 $， $ D_1 = D $ 或  $ D_1 = -D $，因此  $ D_1 \neq 0 $，从而  $ t \geq r $。另一方面，若矩阵 A 通过一次初等行变换变为矩阵 B，则矩阵 B 通过一次初等行变换变为矩阵 A，同样的讨论可知  $ r \geq t $，所以  $ R(A) = r = t = R(B) $。

(2) 若  $ A \xrightarrow{kr_i} B $，则在 B 中总能找到与 D 相对应的 r 阶子式  $ D_1 $， $ D_1 = D $ 或  $ D_1 = kD $，因此  $ D_1 \neq 0 $，从而  $ t \geq r $。与 (1) 同样的讨论可知  $ R(A) = R(B) $。

(3) 若  $ A \xrightarrow{r_i + k r_j} B $，分两种情形讨论：

①如果非零子式 D 不包含 A 中的第 i 行，则在 B 中能找到 r 阶子式  $ D_{1} $，使得  $ D_{1}=D $.

②如果非零子式 D 包含 A 中的第 i 行，则在 B 中能找到与 D 相对应的 r 阶子式  $ D_{1} $，且  $ D_{1} $ 的第 i 行是两个数之和的形式，按照行列式的拆分性质， $ D_{1} $ 可以写成两个行列式之和，即

 $$ D_{1}=\left|\begin{array}{c c c}\vdots&\ddots&\vdots\\a_{i p_{1}}+k a_{j p_{1}}&\cdots&a_{i p_{r}}+k a_{j p_{r}}\\\vdots&\ddots&\vdots\end{array}\right|=\left|\begin{array}{c c c}\vdots&\ddots&\vdots\\a_{i p_{1}}&\cdots&a_{i p_{r}}\\\vdots&\ddots&\vdots\end{array}\right|+k\left|\begin{array}{c c c}\vdots&\ddots&\vdots\\a_{j p_{1}}&\cdots&a_{j p_{r}}\\\vdots&\ddots&\vdots\end{array}\right|=D+k D_{2}, $$

如果非零子式 $D$ 包含 $A$ 中的第 $j$ 行，则 $D_2 = 0$，$D_1 = D \neq 0$。如果非零子式 $D$ 不包含 $A$ 中的第 $j$ 行，则 $D_2$ 也是 $\mathcal{B}$ 中的 $r$ 阶子式，并且由 $D_1 - kD_2 = D \neq 0$ 知 $D_1$ 与 $D_2$ 不同时为零，所以在 $\mathcal{B}$ 中定能找到非零的 $r$ 阶子式，从而 $t \geq r$。另一方面，由 $\mathcal{B} \xrightarrow{r_i - kr_j} \mathcal{A}$ 以及同样的讨论可知 $r \geq t$，所以 $R(\mathcal{A}) = r = t = R(\mathcal{B})$。

经过一次初等行变换不改变矩阵的秩，则经过有限次初等行变换也不改变矩阵的秩.

对矩阵  $ A $ 实施初等列变换变为矩阵  $ B $，相当于对矩阵  $ A^T $ 实施初等行变换变为矩阵  $ B^T $，又由例 5 知  $ R(A) = R(A^T) $， $ R(B) = R(B^T) $，所以对矩阵  $ A $ 实施初等列变换变为矩阵  $ B $，仍旧有  $ R(A) = R(B) $。于是，定理 2 可以进一步地叙述如下。

定理 3 矩阵的初等变换不改变矩阵的秩，即若  $ A \sim B $，则  $ R(A) = R(B) $.

例8 求矩阵 $ A=\begin{pmatrix}3&0&-2&-1&3\\1&-1&3&2&0\\1&0&1&-1&1\\2&-2&1&6&0\end{pmatrix} $的秩.

解

 $$ \begin{aligned}\boldsymbol{A}&=\begin{pmatrix}{{{3}}}&{{{0}}}&{{{-2}}}&{{{-1}}}&{{{3}}} \\{{{1}}}&{{{-1}}}&{{{3}}}&{{{2}}}&{{{0}}} \\{{{1}}}&{{{0}}}&{{{1}}}&{{{-1}}}&{{{1}}} \\{{{2}}}&{{{-2}}}&{{{1}}}&{{{6}}}&{{{0}}}\end{pmatrix}\rightarrow\begin{pmatrix}{{{1}}}&{{{0}}}&{{{1}}}&{{{-1}}}&{{{1}}} \\{{{1}}}&{{{-1}}}&{{{3}}}&{{{2}}}&{{{0}}} \\{{{3}}}&{{{0}}}&{{{-2}}}&{{{-1}}}&{{{3}}} \\{{{2}}}&{{{-2}}}&{{{1}}}&{{{6}}}&{{{0}}}\end{pmatrix}\rightarrow\begin{pmatrix}{{{1}}}&{{{0}}}&{{{1}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{-1}}}&{{{2}}}&{{{3}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{-5}}}&{{{2}}}&{{{0}}} \\{{{0}}}&{{{-2}}}&{{{-1}}}&{{{8}}}&{{{-2}}}\end{pmatrix}\\&\rightarrow\begin{pmatrix}{{{1}}}&{{{0}}}&{{{1}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{-1}}}&{{{2}}}&{{{3}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{-5}}}&{{{2}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix},\end{aligned} $$

所以A的秩 $ R(A)=3 $.

## 四、向量组的秩与矩阵的秩的关系

本章第一节的例2告诉我们，一个 $ m\times n $矩阵

 $$ \boldsymbol{A}=\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{m1}&a_{m2}&\cdots&a_{mn}\end{pmatrix}=(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\cdots,\boldsymbol{\alpha}_{n})=\begin{pmatrix}\boldsymbol{\beta}_{1}^{\mathrm{T}}\\\boldsymbol{\beta}_{2}^{\mathrm{T}}\\\vdots\\\boldsymbol{\beta}_{m}^{\mathrm{T}}\end{pmatrix} $$

对应着两个向量组，一个是行向量组  $ \beta_{1}^{T} $， $ \beta_{2}^{T} $，…， $ \beta_{m}^{T} $，一个是列向量组  $ \alpha_{1} $， $ \alpha_{2} $，…， $ \alpha_{n} $。那么，行向量组的秩、列向量组的秩以及矩阵的秩三者之间有什么关系呢？下面的定理给了我们答案。

定理4 矩阵的行向量组的秩与它的列向量组的秩相等，都等于矩阵的秩.

证明 设矩阵由式(3-1)给出，矩阵A的行向量组的秩记为 $ R_{row} $，矩阵A的列向量组的秩记为 $ R_{col} $，我们先证明 $ R_{col}=R(A) $.

设  $ R(A)=r $，则矩阵 A 中存在一个 r 阶子式不为零，而所有阶数大于 r 的子式全为零。不妨设矩阵 A 的前 r 行、r 列构成的 r 阶子式是非零子式，即

 $$ D_{r}=\begin{vmatrix}a_{11}&\cdots&a_{1r}\\ \vdots&\ddots&\vdots\\ a_{r1}&\cdots&a_{rr}\end{vmatrix}\neq0. $$

下面我们证明矩阵 A 的前 r 个列向量就是矩阵 A 的列向量组的一个极大无关组，从而有  $ R_{col}=R(A) $.

由

 $$ \begin{vmatrix}a_{11}&\cdots&a_{1r}\\ \vdots&\ddots&\vdots\\ a_{r1}&\cdots&a_{rr}\end{vmatrix}\neq0 $$

知齐次线性方程组

 $$ \begin{pmatrix}a_{11}&\cdots&a_{1r}\\\vdots&\ddots&\vdots\\a_{r1}&\cdots&a_{rr}\end{pmatrix}\begin{pmatrix}x_{1}\\\vdots\\x_{r}\end{pmatrix}=\mathbf{0} $$

只有零解，因而向量组  $ \alpha_{j}'=\begin{pmatrix}a_{1j}\\ \vdots\\ a_{rj}\end{pmatrix}(j=1,2,\cdots,r) $ 线性无关. 又因为齐次线性方程组

 $$ \begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1r}\\\vdots&\vdots&\ddots&\vdots\\a_{r1}&a_{r2}&\cdots&a_{rr}\\a_{r+1,1}&a_{r+1,2}&\cdots&a_{r+1,r}\\\vdots&\vdots&\ddots&\vdots\\a_{m1}&a_{m2}&\cdots&a_{mr}\end{pmatrix}\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{r}\end{pmatrix}=\mathbf{0} $$

的解一定是方程组(3-2)的解，由方程组(3-2)只有零解可知，齐次线性方程组(3-3)一定也只有零解，所以，由向量组  $ \alpha_j' = \begin{pmatrix} a_{1j} \\ \vdots \\ a_{rj} \end{pmatrix} (j=1, 2, \cdots, r) $ 的每个向量填加若干分量所得的向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_r $ 也线性无关.

接下来证明矩阵 A 的每一个列向量  $ \alpha_{k}(k=1,2,\cdots,n) $ 均可由  $ \alpha_{1},\alpha_{2},\cdots,\alpha_{r} $ 线性表示.

当  $ 1 \leqslant k \leqslant r $ 时，显然  $ \alpha_{k} $ 可由  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 线性表示。当  $ r+1 \leqslant k \leqslant n $ 时，构造矩阵

 $$ \boldsymbol{A}^{\prime}=(\boldsymbol{\alpha}_{1},\cdots,\boldsymbol{\alpha}_{r},\boldsymbol{\alpha}_{k})=\begin{pmatrix}a_{11}&\cdots&a_{1r}&a_{1k}\\a_{21}&\cdots&a_{2r}&a_{2k}\\\vdots&\ddots&\vdots&\vdots\\a_{m1}&\cdots&a_{mr}&a_{mk}\end{pmatrix}, $$

显然， $ A' $ 中的所有子式均是 A 中的子式。从而  $ A' $ 中存在一个不为零的 r 阶子式  $ D_r $，所有  $ r+1 $ 阶子式均为零，因此  $ R(A') = r $。考虑齐次线性方程组

 $$ \begin{pmatrix}a_{11}&\cdots&a_{1r}&a_{1k}\\a_{21}&\cdots&a_{2r}&a_{2k}\\\vdots&\ddots&\vdots&\vdots\\a_{m1}&\cdots&a_{mr}&a_{mk}\end{pmatrix}\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{r+1}\end{pmatrix}=\mathbf{0}, $$

对系数矩阵  $ A' $ 实施初等行变换化为简化阶梯形矩阵 R，则 R 中第一个非零元的个数是 r，小于未知量的个数  $ r+1 $。根据第一章第三节中关于线性方程组的讨论可知，齐次线性方程组 (3-4) 一定有非零解，从而向量组  $ \alpha_{1}, \cdots, \alpha_{r}, \alpha_{k} $ 线性相关，由第二节的定理 3 得  $ \alpha_{k} $ 可由  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 线性表示。

由以上的讨论可知，向量组  $ \alpha_1, \cdots, \alpha_r $ 就是矩阵  $ A $ 的列向量组的一个极大无关组，从而有  $ R_{col} = r = R(A) $。由于矩阵  $ A $ 的行向量组是矩阵  $ A^T $ 的列向量组，所以有  $ R_{row} = R(A^T) = R(A) $。

定理4给出了一个求向量组的秩的方法：以所给的向量组  $ \alpha_{1} $， $ \alpha_{2} $，…， $ \alpha_{n} $ 为列构造矩阵  $ A=(\alpha_{1} $， $ \alpha_{2} $，…， $ \alpha_{n}) $，对矩阵A实施初等行变换化为阶梯形矩阵B，则根据矩阵B的阶梯数给出矩阵A的秩，从而给出向量组  $ \alpha_{1} $， $ \alpha_{2} $，…， $ \alpha_{n} $ 的秩. 若进一步将矩阵B化为行最简形矩阵

 $$ \boldsymbol{R}=\left(\boldsymbol{\beta}_{1},\ \boldsymbol{\beta}_{2},\ \cdots,\ \boldsymbol{\beta}_{n}\right), $$

则向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{n} $ 与向量组  $ \beta_{1}, \beta_{2}, \cdots, \beta_{n} $ 有相同的线性相关性，从而可以根据向量组  $ \beta_{1}, \beta_{2}, \cdots, \beta_{n} $ 的极大无关组给出向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{n} $ 的极大无关组，并给出不属于极大无关组的向量由极大无关组线性表示的表示式。我们以例题来说明具体的求解过程。

### 例 9 求向量组

 $$ \boldsymbol{\alpha}_{1}=\left(\begin{aligned}1\\ 2\\ 3\\ 0\end{aligned}\right),\quad\boldsymbol{\alpha}_{2}=\left(\begin{aligned}-1\\ -1\\ -3\\ 1\end{aligned}\right),\quad\boldsymbol{\alpha}_{3}=\left(\begin{aligned}5\\ 0\\ 15\\ -10\end{aligned}\right),\quad\boldsymbol{\alpha}_{4}=\left(\begin{aligned}-2\\ 1\\ -6\\ 5\end{aligned}\right),\quad\boldsymbol{\alpha}_{5}=\left(\begin{aligned}2\\ 0\\ 5\\ -4\end{aligned}\right) $$

的秩和一个极大无关组，并把不属于极大无关组的向量用极大无关组线性表示.

解 令矩阵  $ A=(\alpha_{1}, \alpha_{2}, \alpha_{3}, \alpha_{4}, \alpha_{5}) $，对矩阵 A 实施初等行变换化为行最简形矩阵 R

 $$ \begin{aligned}\boldsymbol{A}=(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3},\boldsymbol{\alpha}_{4},\boldsymbol{\alpha}_{5})&=\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{5}}}&{{{-2}}}&{{{2}}} \\{{{2}}}&{{{-1}}}&{{{0}}}&{{{1}}}&{{{0}}} \\{{{3}}}&{{{-3}}}&{{{15}}}&{{{-6}}}&{{{5}}} \\{{{0}}}&{{{1}}}&{{{-10}}}&{{{5}}}&{{{-4}}}\end{pmatrix}\rightarrow\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{5}}}&{{{-2}}}&{{{2}}} \\{{{0}}}&{{{1}}}&{{{-10}}}&{{{5}}}&{{{-4}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{-1}}} \\{{{0}}}&{{{1}}}&{{{-10}}}&{{{5}}}&{{{-4}}}\end{pmatrix}\\&\rightarrow\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-5}}}&{{{3}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{-10}}}&{{{5}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}=(\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{3},\boldsymbol{\beta}_{4},\boldsymbol{\beta}_{5})=\boldsymbol{R},\end{aligned} $$

由  $ R(R)=3 $ 可知  $ R(A)=3 $. R 中的 3 阶非零子式为  $ \begin{vmatrix}1&0&0\\0&1&0\\0&0&1\end{vmatrix}=1\neq0 $，所以  $ \beta_{1},\beta_{2},\beta_{5} $ 是

R 的列向量组的极大无关组，且

 $$ \boldsymbol{\beta}_{3}=-5\boldsymbol{\beta}_{1}-10\boldsymbol{\beta}_{2}+0\cdot\boldsymbol{\beta}_{5},\\\boldsymbol{\beta}_{4}=3\boldsymbol{\beta}_{1}+5\boldsymbol{\beta}_{2}+0\cdot\boldsymbol{\beta}_{5}. $$

由于向量组  $ \alpha_{1}, \alpha_{2}, \alpha_{3}, \alpha_{4}, \alpha_{5} $ 与向量组  $ \beta_{1}, \beta_{2}, \beta_{3}, \beta_{4}, \beta_{5} $ 有相同的线性相关性，所以  $ \alpha_{1}, \alpha_{2}, \alpha_{5} $ 是向量组  $ \alpha_{1}, \alpha_{2}, \alpha_{3}, \alpha_{4}, \alpha_{5} $ 的极大无关组，且有

 $$ \boldsymbol{\alpha}_{3}=-5\boldsymbol{\alpha}_{1}-10\boldsymbol{\alpha}_{2}+0\cdot\boldsymbol{\alpha}_{5},\boldsymbol{\alpha}_{4}=3\boldsymbol{\alpha}_{1}+5\boldsymbol{\alpha}_{2}+0\cdot\boldsymbol{\alpha}_{5}. $$

从这一节的讨论可知，若  $ m $ 个方程  $ n $ 个未知量的线性方程组  $ A_{m \times n} x = \beta $ 的增广矩阵的秩  $ R(\widetilde{A}) < m $，则增广矩阵的行向量组线性相关，此时线性方程组就有多余方程。将增广矩阵的行向量组的极大无关组找到后，不属于极大无关组的行向量所对应的方程就是多余方程。
