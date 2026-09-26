# 第2章 方阵的行列式

> 来源：docs/08_电子书/线性代数-同济大学数学系.md
> 科目：数学二（302） ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：542d072d2e071a92


## [课前导读]

这一节我们要介绍方阵的行列式的定义，并用定义得到一些特殊行列式的值。在学习这一节之前，先回忆在中学代数学过的二元线性方程组有唯一解的讨论。对于二元线性方程组

 $$ \left\{\begin{aligned}a_{11}x_{1}+&a_{12}x_{2}=b_{1},\\ a_{21}x_{1}+&a_{22}x_{2}=b_{2},\end{aligned}\right. $$

当  $ a_{11}a_{22}-a_{12}a_{21}\neq0 $ 时，有唯一解：

 $$ x_{1}=\frac{b_{1}a_{22}-b_{2}a_{12}}{a_{11}a_{22}-a_{12}a_{21}},\ x_{2}=\frac{b_{2}a_{11}-b_{1}a_{21}}{a_{11}a_{22}-a_{12}a_{21}}. $$

## 一、排列

作为定义 n 阶行列式的预备知识，我们先来介绍一下排列及其逆序数.

### 1. 排列及其逆序数

定义1 从1，2，⋯，n中任意选取r个不同的数排成一列，称为排列.

定义 2 将 1, 2,  $ \cdots $, n 这 n 个不同的数排成一列，称为 n 阶全排列，也简称为全排列.

例如，设有1，2，3，4，5五个元素，则31是五个元素的一个排列，312是五个元素的一个排列，312也可以看成是1，2，3三个元素的一个全排列；4215是五个元素的一个排列，而42153是五个元素的一个全排列.

n 阶全排列的总数为  $ n! = n \cdot (n-1) \cdots 3 \cdot 2 \cdot 1 $。例如， $ 4! = 4 \times 3 \times 2 \times 1 = 24 $， $ 5! = 5 \times 4 \times 3 \times 2 \times 1 = 120 $。

显然， $ 12\cdots n $ 也是 n 个数的全排列，而且元素是按从小到大的自然顺序排列的，这样的排列称为标准排列。而其他的 n 阶全排列都或多或少地破坏了自然顺序，如全排列 42153 中，4 和 2、2 和 1、5 和 3 的顺序都与自然顺序相反。

定义 3 在一个排列中，如果一对数的排列顺序与自然顺序相反，即排在左边的数比排在它右边的数大，那么它们就称为一个逆序，一个排列中逆序的总数就称为这个排列的逆序数。排列  $ i_1i_2\cdots i_n $ 的逆序数记为  $ \tau(i_1i_2\cdots i_n) $。

例如，全排列 42153 中，42、41、43、21、53 都是逆序，从而 42153 的逆序数为  $ \tau(42153)=5 $.

标准排列的逆序数为0.例如， $ \tau(12345)=0 $.

### 2. 奇排列与偶排列

定义4 逆序数为偶数的排列，称为偶排列；逆序数为奇数的排列，称为奇排列.

例如， $ \tau(213)=1 $，所以213是一个奇排列；而 $ \tau(312)=2 $，所以312是一个偶排列.

定义 5 只交换排列中某两个数的位置，其他的数保持不动而得到一个新排列的变换，称为一个对换。若交换的是相邻位置的两个元素，则称该对换为相邻对换。

例如，经过2、1对换，排列42153就变成了排列41253，而且这个对换是相邻对换；经过2、5对换，排列42153就变成了排列45123，但这个对换不是相邻对换。显然，连续实施两次相同的对换，则排列就还原了。另外，排列42153的逆序数是 $ \tau(42153)=5 $，但是排列41253和45123的逆序数分别是 $ \tau(41253)=4 $和 $ \tau(45123)=6 $。可见，对换会改变排列的逆序数，进一步地，我们有下面的事实。

定理 1 对换改变排列的奇偶性.

 $ ^{*} $证明 先证相邻对换的情况. 排列

 $$ i_{1}\cdots i_{k}ab\cdots j_{1}\cdots j_{s} $$

经过a，b相邻对换变成排列

 $$ i_{1}\cdots i_{k}b a\cdots j_{1}\cdots j_{s}. $$

显然，a，b 与其他数构成的逆序在排列（1-1）和排列（1-2）中是一样的，不同的只是 a，b 的次序。当 a<b 时，ab 原来是标准序，对换后 ba 构成一个逆序，于是排列（1-2）的逆序数是排列（1-1）的逆序数增加 1；当 a>b 时，ab 原来是逆序，对换后 ba 是标准序，于是排列（1-2）的逆序数是排列（1-1）的逆序数减少 1。所以无论增加还是减少 1，相邻对换都改变了排列的奇偶性。

对于不相邻的对换，不妨假设原排列为

 $$ \cdots a i_{1}\cdots i_{s}b\cdots, $$

经过a，b对换后变为排列

 $$ \cdots b i_{1}\cdots i_{s}a\cdots, $$

这个改变过程实际上就是通过先将 a 依次与其后面相邻的元素作  $ s+1 $ 次相邻对换变为

 $$ \cdots i_{1}\cdots i_{s}b a\cdots, $$

再通过将 b 依次与前面相邻的元素作 s 次相邻对换而得到。一共进行了  $ 2s+1 $ 次相邻对换，所以改变了排列的奇偶性。

关于全排列中奇排列和偶排列的个数，我们有下面的定理（不给予证明）.

定理2 在 n 阶排列中，偶排列和奇排列各占一半，即各有 $ \frac{n!}{2} $个.

*证明 记 $P_n(S_n, T_n)$ 为所有 $n$ 阶(奇、偶)排列构成的集合，则 $P_n = S_n \cup T_n$ 且 $S_n \cap T_n = \varnothing$，于是 $|P_n| = |S_n| + |T_n|$。任意取定一个对换 $\sigma: P_n \to P_n$，显然映射 $\sigma$ 是单射且 $\sigma(S_n) \subseteq T_n$、$\sigma(T_n) \subseteq S_n$，于是有 $|S_n| \leq |T_n|$、$|T_n| \leq |S_n|$，所以 $|S_n| = |T_n| = \frac{1}{2} |P_n| = \frac{1}{2} n$！

### 1. n 阶行列式的定义

由  $ n^{2} $ 个元素  $ a_{ij}(i,j=1,2,\cdots,n) $ 排成 n 行 n 列的正方形的数表：

 $$ a_{11}\quad a_{12}\quad\cdots\quad a_{1n} $$

 $$ a_{21}\quad a_{22}\quad\cdots\quad a_{2n} $$

 $$ \vdots\quad\vdots\quad\ddots\quad\vdots $$

 $$ a_{n1}\quad a_{n2}\quad\cdots\quad a_{nn} $$

由这个数表所决定的数

 $$ \sum_{p_{1}p_{2}\cdots p_{n}}\left(-1\right)^{\tau\left(p_{1}p_{2}\cdots p_{n}\right)}a_{1p_{1}}a_{2p_{2}}\cdots a_{np_{n}} $$

称为由  $ n^{2} $ 个元素  $ a_{ij}(i,j=1,2,\cdots,n) $ 构成的 n 阶行列式，记为

 $$ D_{n}=\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\\\end{array}\right|, $$

即

 $$ D_{n}=\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\\\end{array}\right|=\displaystyle\sum_{p_{1}p_{2}\cdots p_{n}}(-1)^{\tau(p_{1}p_{2}\cdots p_{n})}a_{1p_{1}}a_{2p_{2}}\cdots a_{np_{n}}. $$

其中  $ \sum_{p_1 p_2 \cdots p_n} $ 表示对所有的 n 阶全排列  $ p_1 p_2 \cdots p_n $ 求和. 数  $ a_{ij}(i, j=1, 2, \cdots, n) $ 称为行列式的  $ (i, j) $ 元素，其中第一个下标 i 称为元素  $ a_{ij} $ 的行标，第二个下标 j 称为元素  $ a_{ij} $ 的列标.

记矩阵

 $$ \boldsymbol{A}=\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\end{pmatrix}, $$

则行列式通常也称为方阵  $ A $ 的行列式，记为  $ |A| $。有时为了表明行列式是由元素  $ a_{ij} $ 构成的，也简记为  $ |A| = \det(a_{ij}) $、 $ |a_{ij}|_{n \times n} $ 或  $ |a_{ij}|_n $。

由定义可知，n 阶行列式具有以下 3 个特点.

(1)  $ \sum_{p_1 p_2 \cdots p_n} $ 是对所有的 n 阶全排列  $ p_1 p_2 \cdots p_n $ 求和，所以展开式中共有  $ n! $ 项；

（2）每一项 $ a_{1p_{1}}a_{2p_{2}}\cdots a_{np_{n}} $是取自不同行不同列的n个元素的乘积；

（3）每一项  $ a_{1p_1}a_{2p_2}\cdots a_{np_n} $ 的行标排成一个标准排列，列标排列  $ p_1p_2\cdots p_n $ 的奇偶性决定了乘积  $ a_{1p_1}a_{2p_2}\cdots a_{np_n} $ 前的符号.

需要注意的是，1 阶行列式就是这个数本身，即  $ |a|=a $。为了避免与绝对值记号混淆，很少提及 1 阶行列式。

#### 2.2 阶行列式和3 阶行列式

当 n=2 时，由方阵  $ \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix} $ 所确定的 2 阶行列式为

 $$ \begin{vmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{vmatrix}=\sum_{p_{1}p_{2}}(-1)^{\tau(p_{1}p_{2})}a_{1p_{1}}a_{2p_{2}}=a_{11}a_{22}-a_{12}a_{21}. $$

2 阶行列式也可借助于对角线法则来记忆. 如图 2-1 所示, 元素  $ a_{11} $ 和  $ a_{22} $ 所在的位置称为行列式的主对角线(黑实线位置), 元素  $ a_{12} $ 和  $ a_{21} $ 所在的位置称为行列式的副对角线(黑虚线位置), 于是 2 阶行列式就是主对角线上元素之积减去副对角线上元素之积.

<div style="text-align: center;"><div style="text-align: center;">图2-1</div> </div>

当 n=3 时，3 阶方阵  $ A=\begin{pmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\end{pmatrix} $ 所确定的 3 阶行列式为

 $$ \begin{aligned}\left|\boldsymbol{A}\right|&=\left|\begin{matrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\\\end{matrix}\right|=\sum_{p_{1}p_{2}p_{3}}(-1)^{\tau(p_{1}p_{2}p_{3})}a_{1p_{1}}a_{2p_{2}}a_{3p_{3}}.\\&=a_{11}a_{22}a_{33}+a_{13}a_{21}a_{32}+a_{12}a_{23}a_{31}-a_{13}a_{22}a_{31}-a_{12}a_{21}a_{33}-a_{11}a_{23}a_{32}.\end{aligned} $$

对于 3 阶行列式，我们也可以按“对角线”法则展开，其展开式等于 6 项的代数和，展开的规律如图 2-2 所示，实线位置上三元素乘积前冠以正号，虚线位置上三元素乘积前冠以负号.

<div style="text-align: center;"><div style="text-align: center;">图2-2</div> </div>

注：4 阶及更高阶的行列式不再适用对角线法则.

例1 设 $ A=\begin{pmatrix}1&2&-2\\-3&3&1\\1&2&-1\end{pmatrix} $，求 $ \left|A\right| $.

解

例2 证明  $ a_{52}a_{16}a_{41}a_{64}a_{23}a_{35} $ 是6阶行列式  $ D_{6}=|a_{ij}|_{6\times6} $ 的一项，并求这项应带的符号.

证明 调换  $ a_{52}a_{16}a_{41}a_{64}a_{23}a_{35} $ 中元素的位置，使得调换后的乘积中元素的行标是标准序，即

 $$ a_{52}a_{16}a_{41}a_{64}a_{23}a_{35}=a_{16}a_{23}a_{35}a_{41}a_{52}a_{64}, $$

这时，乘积中元素的列标排列为 635124，是一个 6 阶全排列，因而  $ a_{52}a_{16}a_{41}a_{64}a_{23}a_{35} $ 是位于  $ D_6 = |a_{ij}|_{6 \times 6} $ 的不同行、不同列的 6 个元素的乘积，因此是这个 6 阶行列式的一项。由于  $ \tau(635124) = 10 $，所以这项前面带正号。

## 三、几类特殊的 n 阶行列式的值

例3 计算下三角方阵  $ A=\begin{pmatrix}a_{11}&0&\cdots&0\\a_{21}&a_{22}&\cdots&0\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\end{pmatrix} $ 的行列式  $ \left|A\right| $ (这样的行列式称为下三角方阵).

解 根据行列式定义

 $$ \left|\boldsymbol{A}\right|=\left|\begin{array}{c c c c}{a_{11}}&{0}&{\cdots}&{0}\\ {a_{21}}&{a_{22}}&{\cdots}&{0}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {a_{n1}}&{a_{n2}}&{\cdots}&{a_{n n}}\\ \end{array}\right|=\sum_{p_{1}p_{2}\cdots p_{n}}(-1)^{\tau(p_{1}p_{2}\cdots p_{n})}a_{1p_{1}}a_{2p_{2}}\cdots a_{n p_{n}}, $$

该行列式中有较多的元素为零，要使得乘积项  $ a_{1p_1} a_{2p_2} \cdots a_{np_n} $ 不等于零，元素  $ a_{1p_1} $ 只能取  $ a_{11} $；元素  $ a_{2p_2} $ 只能取  $ a_{22} $；……；元素  $ a_{np_n} $ 只能取  $ a_{nn} $，从而行列式的展开式中只有  $ a_{11} a_{22} \cdots a_{nn} $ 这一项可能不是零，其他项全为零。而  $ a_{11} a_{22} \cdots a_{nn} $ 的列标是标准排列，逆序数为零，所以  $ |A| = a_{11} a_{22} \cdots a_{nn} $。

也就是说，下三角形行列式的值等于主对角线上 n 个元素的乘积，而与主对角线下方的元素无关.

例4 计算上三角方阵  $ A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ 0 & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & a_{nn} \end{pmatrix} $ 的行列式  $ |A| $ （这样的行列式称为上三

解 类似于例3，要使得乘积项  $ a_{1p_{1}}a_{2p_{2}}\cdots a_{np_{n}} $ 不等于零，元素  $ a_{np_{n}} $ 只能取  $ a_{nn} $；元素  $ a_{n-1,p_{n-1}} $ 只能取  $ a_{n-1,n-1} $；……；元素  $ a_{1p_{1}} $ 只能取  $ a_{11} $，于是行列式的展开式中只有  $ a_{11}a_{22}\cdots a_{nn} $ 这一项可能不是零，其他项全为零。而  $ a_{11}a_{22}\cdots a_{nn} $ 的列标是标准排列，逆序数为零，所以

 $$ \left|\boldsymbol{A}\right|=\left|\begin{array}{c c c c}a_{11}&a_{12}&\cdots&a_{1n}\\ 0&a_{22}&\cdots&a_{2n}\\ \vdots&\vdots&\ddots&\vdots\\ 0&0&\cdots&a_{n n}\end{array}\right|=a_{11}a_{22}\cdots a_{n n}. $$

由此可见，无论上三角方阵还是下三角方阵，其行列式的值都等于其主对角线上 n 个元素的乘积，而与其他位置的非零元素没有关系.

由于对角矩阵

 $$ \boldsymbol{A}=\begin{pmatrix}{{{a_{11}}}}&{{{0}}}&{{{\cdots}}}&{{{0}}} \\{{{0}}}&{{{a_{22}}}}&{{{\cdots}}}&{{{0}}} \\{{{\vdots}}}&{{{\vdots}}}&{{{\ddots}}}&{{{\vdots}}} \\{{{0}}}&{{{0}}}&{{{\cdots}}}&{{{a_{nn}}}}\end{pmatrix} $$

既是上三角方阵同时也是下三角方阵，所以

 $$ \begin{aligned}\left|\begin{matrix}{{{a_{11}}}}&{{{0}}}&{{{\cdots}}}&{{{0}}} \\{{{0}}}&{{{a_{22}}}}&{{{\cdots}}}&{{{0}}} \\{{{\vdots}}}&{{{\vdots}}}&{{{\ddots}}}&{{{\vdots}}} \\{{{0}}}&{{{0}}}&{{{\cdots}}}&{{{a_{nn}}}} \\\end{matrix}\right|&=a_{11}a_{22}\cdots a_{nn}.\end{aligned} $$

对角矩阵的行列式称为对角行列式.

上三角(下三角)行列式是我们今后计算方阵的行列式的基础，在下一节讲完行列式的性质之后，我们会利用行列式的性质，将行列式的计算归结为上三角(下三角)行列式的计算.

例5 设斜下三角方阵  $ A = \begin{pmatrix} 0 & \cdots & 0 & a_{1n} \\ 0 & \cdots & a_{2,n-1} & a_{2n} \\ \vdots & \ddots & \vdots & \vdots \\ a_{n1} & \cdots & a_{n,n-1} & a_{nn} \end{pmatrix} $，证明： $ \left| A \right| = (-1)^{\frac{n(n-1)}{2}} a_{1n} a_{2,n-1} \cdots a_{n1} $.

证明 由行列式的定义

 $$ \left|\boldsymbol{A}\right|=\left|\begin{array}{c c c c}0&\cdots&0&a_{1n}\\ 0&\cdots&a_{2,n-1}&a_{2n}\\ \vdots&\ddots&\vdots&\vdots\\ a_{n1}&\cdots&a_{n,n-1}&a_{n n}\end{array}\right|=\sum_{p_{1}p_{2}\cdots p_{n}}\left(-1\right)^{\tau\left(p_{1}p_{2}\cdots p_{n}\right)}a_{1p_{1}}a_{2p_{2}}\cdots a_{n p_{n}}, $$

要使得乘积项  $ a_{1p_1}a_{2p_2}\cdots a_{np_n} $ 不等于零，元素  $ a_{1p_1} $ 只能取  $ a_{1n} $；元素  $ a_{2p_2} $ 只能取  $ a_{2,n-1} $；……；元素  $ a_{np_n} $ 只能取  $ a_{n1} $，于是行列式的展开式中只有  $ a_{1n}a_{2,n-1}\cdots a_{n1} $ 这一项可能不是零，其他项全为零。而  $ a_{1n}a_{2,n-1}\cdots a_{n1} $ 的列标排列  $ n(n-1)\cdots21 $ 的逆序数为  $ \tau(n(n-1)\cdots21)=\frac{n(n-1)}{2} $，所以  $ |A|=(-1)^{\frac{n(n-1)}{2}}a_{1n}a_{2,n-1}\cdots a_{n1} $。

易知，当 $n=4k$，$4k-1$ 时，$\tau(n(n-1)\cdots21)=\frac{n(n-1)}{2}$ 为偶数，此时 $|A|=a_{1n}a_{2,n-1}\cdots$ $a_{n1}$；当 $n=4k-2$，$4k-3$ 时，$\tau(n(n-1)\cdots21)=\frac{n(n-1)}{2}$ 为奇数，此时 $|A|=-a_{1n}a_{2,n-1}\cdots a_{n1}$.

### 习题2-1

1. 求下列全排列的逆序数：

(1)634521；(2)53142；(3)123454321；(4)135⋯(2n-1)(2n)(2n-2)⋯42.

2. 用行列式的定义计算  $ D_{5}=\left|\begin{matrix}0&0&a_{13}&0&0\\ 0&0&0&a_{24}&0\\ 0&0&0&0&a_{35}\\ a_{41}&0&0&0&0\\ 0&a_{52}&0&0&0\end{matrix}\right| $.

3. 求多项式  $ f(x)=\left|\begin{matrix}2x&1&1&2\\ 3&2&x&1\\ x&x&1&2\\ 2&1&1&3x\end{matrix}\right| $ 中  $ x^{3} $ 和  $ x^{4} $ 的系数.

4. 用对角线法则求下列3阶行列式：

(1)

 $$ \begin{vmatrix}1&2&1\\ 3&1&0\\ 2&3&2\end{vmatrix}; $$

(2)

 $$ \begin{array}{r|rrr|r|r}2&5&3&&&\\0&4&7&&&\\-2&-2&3&&&\end{array}; $$

(3)

 $$ \left|\begin{array}{l l l}{a}&{b}&{c}\\ {b}&{c}&{a}\\ {c}&{a}&{b}\end{array}\right|; $$

(4)

 $$ \begin{vmatrix}1&1&1\\ 2a&a+b&2b\\ a^{2}&ab&b^{2}\end{vmatrix}. $$

### [课前导读]

从 n 阶行列式的定义我们知道，当  $ n \geqslant 4 $ 时，利用定义来计算一般的行列式是一件非常辛苦的事情，但是上（下）三角行列式的计算却非常简单。这一节我们先介绍行列式的性质，然后利用性质将一般的行列式化为上（下）三角行列式来计算，最后给出一个利用方阵的行列式来判断方阵可逆的充分必要条件。学习这一节所需的预备知识就是行列式的定义，关于对换和奇、偶排列的一些结论以及上（下）三角行列式的计算。这些知识在本章第一节中都有介绍。

## 一、行列式的性质

定义1 将行列式  $ D_{n}=\begin{vmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{n1} & a_{n2} & \cdots & a_{nn} \end{vmatrix} $ 的各行元素换为同序

行列式的性质

号的列元素，所得到的行列式  $ D_{n}^{\mathrm{T}}=\left|\begin{array}{cccc}a_{11}&a_{21}&\cdots&a_{n1}\\a_{12}&a_{22}&\cdots&a_{n2}\\\vdots&\vdots&\ddots&\vdots\\a_{1n}&a_{2n}&\cdots&a_{nn}\end{array}\right| $ 称为行列式  $ D_{n} $ 的转置行列式.

性质1 行列式  $ D_{n} $ 与它的转置行列式  $ D_{n}^{T} $ 相等.

该性质的证明利用行列式的定义即可得证.

性质 1 说明，行列式中的行和列具有同等的地位. 因此，行列式中的有关性质凡是对行成立的，对列也成立.

性质2 互换行列式的两行（或两列），行列式变号.

证明 以交换两行的情形来证明. 根据行列式定义

 $$ \begin{aligned}&\begin{vmatrix}\\ &a_{11}&a_{12}&\cdots&a_{1n}\\&\vdots&\vdots&\ddots&\vdots\\&a_{i1}&a_{i2}&\cdots&a_{in}\\&\vdots&\vdots&\ddots&\vdots\\&a_{j1}&a_{j2}&\cdots&a_{jn}\\&\vdots&\vdots&\ddots&\vdots\\&a_{n1}&a_{n2}&\cdots&a_{nn}\\&\end{vmatrix}=\sum_{p_{1}\cdots p_{i}\cdots p_{j}\cdots p_{n}}(-1)^{\tau(p_{1}\cdots p_{i}\cdots p_{j}\cdots p_{n})}a_{1p_{1}}\cdots a_{ip_{i}}\cdots a_{jp_{j}}\cdots a_{np_{n}}\\&=\sum_{p_{1}\cdots p_{i}\cdots p_{j}\cdots p_{n}}(-1)^{\tau(p_{1}\cdots p_{i}\cdots p_{j}\cdots p_{n})}a_{1p_{1}}\cdots a_{jp_{j}}\cdots a_{ip_{i}}\cdots a_{np_{n}}\\&=-\sum_{p_{1}\cdots p_{j}\cdots p_{i}\cdots p_{n}}(-1)^{\tau(p_{1}\cdots p_{j}\cdots p_{i}\cdots p_{n})}a_{1p_{1}}\cdots a_{jp_{j}}\cdots a_{ip_{i}}\cdots a_{np_{n}}\\&=-\begin{vmatrix}\\ &a_{11}&a_{12}&\cdots&a_{1n}\\&\vdots&\vdots&\ddots&\vdots\\&a_{j1}&a_{j2}&\cdots&a_{jn}\\&\vdots&\vdots&\ddots&\vdots\\&a_{i1}&a_{j2}&\cdots&a_{jn}\\&\vdots&\vdots&\ddots&\vdots\\&a_{n1}&a_{n2}&\cdots&a_{nn}\\&\end{vmatrix}.\\ \end{aligned} $$

以  $ r_i $ 表示行列式的第  $ i $ 行，以  $ c_i $ 表示行列式的第  $ i $ 列，交换第  $ i $、 $ j $ 行记为  $ r_i \leftrightarrow r_j $，交换第  $ i $、 $ j $ 列记为  $ c_i \leftrightarrow c_j $。

推论 1 若行列式中有两行（或两列）对应元素相等，则行列式等于零.

证明 把行列式 D 中有相同元素的两行（或两列）互换，则有 D = -D，因此 D = 0.

性质3 若行列式的某一行(或列)有公因子k，则公因子k可以提到行列式记号外面；或者说，用k乘行列式的某一行(或某一列)，等于用k乘以该行列式，即

 $$ \begin{aligned}\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\\vdots&\vdots&\ddots&\vdots\\ka_{i1}&ka_{i2}&\cdots&ka_{in}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\\\end{array}\right|&=k\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\\vdots&\vdots&\ddots&\vdots\\a_{i1}&a_{i2}&\cdots&a_{in}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\\\end{array}\right|.\end{aligned} $$

证明 根据行列式定义

 $$ \begin{aligned} 左 =&\sum_{p_{1}p_{2}\cdots p_{n}}(-1)^{\tau(p_{1}p_{2}\cdots p_{n})}a_{1p_{1}}a_{2p_{2}}\cdots(ka_{ip_{i}})\cdots a_{np_{n}}\\=&k\sum_{p_{1}p_{2}\cdots p_{n}}(-1)^{\tau(p_{1}p_{2}\cdots p_{n})}a_{1p_{1}}a_{2p_{2}}\cdots a_{ip_{i}}\cdots a_{np_{n}}= 右 .\end{aligned} $$

例1

 $$ \begin{aligned}\left|\begin{matrix}{{{1}}}&{{{2}}}&{{{1}}} \\{{{2}}}&{{{4}}}&{{{6}}} \\{{{6}}}&{{{9}}}&{{{12}}}\end{matrix}\right|&=\left|\begin{matrix}{{{1}}}&{{{2}}}&{{{1}}} \\{{{1\times\underline{2}}}}&{{{2\times\underline{2}}}}&{{{3\times\underline{2}}}} \\{{{2\times\underline{3}}}}&{{{3\times\underline{3}}}}&{{{4\times\underline{3}}}}\end{matrix}\right|=2\cdot3\cdot\left|\begin{matrix}{{{1}}}&{{{2}}}&{{{1}}} \\{{{1}}}&{{{2}}}&{{{3}}} \\{{{2}}}&{{{3}}}&{{{4}}}\end{matrix}\right|=6\left|\begin{matrix}{{{1}}}&{{{2}}}&{{{1}}} \\{{{1}}}&{{{2}}}&{{{3}}} \\{{{2}}}&{{{3}}}&{{{4}}}\end{matrix}\right|.\end{aligned} $$

第 i 行(或列)乘以数 k 记作  $ kr_{i} $(或  $ kc_{i} $)，第 i 行(或列)提取公因子 k 记作  $ \frac{1}{k}r_{i} $ (或  $ \frac{1}{k}c_{i} $).

定理 1 设 A 是 n 阶方阵，则等式  $ \left|k A\right|=k^{n}\left|A\right| $ 成立.

该定理由矩阵数乘的定义和性质3立即可得.

推论2 若行列式的某一行(或某一列)元素全为零，则行列式的值为零.

推论 3 若行列式某两行（或两列）元素对应成比例，则行列式为零.

性质4 行列式的拆分定理

 $$ \begin{array}{c} \left| \begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\ \vdots&\vdots&\ddots&\vdots\\ b_{k1}+c_{k1}&b_{k2}+c_{k2}&\cdots&b_{kn}+c_{kn}\\ \vdots&\vdots&\ddots&\vdots\\ a_{n1}&a_{n2}&\cdots&a_{nn} \end{array}\right|=\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\ \vdots&\vdots&\ddots&\vdots\\ b_{k1}&b_{k2}&\cdots&b_{kn}\\ \vdots&\vdots&\ddots&\vdots\\ a_{n1}&a_{n2}&\cdots&a_{nn} \end{array}\right|+\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\ \vdots&\vdots&\ddots&\vdots\\ c_{k1}&c_{k2}&\cdots&c_{kn}\\ \vdots&\vdots&\ddots&\vdots\\ a_{n1}&a_{n2}&\cdots&a_{nn} \end{array}\right|. \end{array} $$

证明

 $$ \begin{aligned} 左边 &=\sum_{p_{1}p_{2}\cdots p_{n}}(-1)^{\tau(p_{1}p_{2}\cdots p_{n})}a_{1p_{1}}a_{2p_{2}}\cdots(b_{kp_{k}}+c_{kp_{k}})\cdots a_{np_{n}}\\&=\sum_{p_{1}p_{2}\cdots p_{n}}(-1)^{\tau(p_{1}p_{2}\cdots p_{n})}a_{1p_{1}}a_{2p_{2}}\cdots b_{kp_{k}}\cdots a_{np_{n}}+\sum_{p_{1}p_{2}\cdots p_{n}}(-1)^{\tau(p_{1}p_{2}\cdots p_{n})}a_{1p_{1}}a_{2p_{2}}\cdots c_{kp_{k}}\cdots a_{np_{n}}\\&= 右边 .\end{aligned} $$

例2

 $$ \begin{aligned}&2\quad\left|\begin{matrix}\boldsymbol{a}_{1}+b_{1}&\boldsymbol{a}_{2}+b_{2}&\boldsymbol{a}_{3}+b_{3}\\ \boldsymbol{a}_{2}+b_{2}&\boldsymbol{a}_{3}+b_{3}&\boldsymbol{a}_{1}+b_{1}\\ \boldsymbol{a}_{3}+b_{3}&\boldsymbol{a}_{1}+b_{1}&\boldsymbol{a}_{2}+b_{2}\end{matrix}\right|=\left|\begin{matrix}\boldsymbol{a}_{1}+b_{1}&\boldsymbol{a}_{2}&\boldsymbol{a}_{3}+b_{3}\\ \boldsymbol{a}_{2}+b_{2}&\boldsymbol{a}_{3}&\boldsymbol{a}_{1}+b_{1}\\ \boldsymbol{a}_{3}+b_{3}&\boldsymbol{a}_{1}&\boldsymbol{a}_{2}+b_{2}\end{matrix}\right|+\left|\begin{matrix}\boldsymbol{a}_{1}+b_{1}&\boldsymbol{b}_{2}&\boldsymbol{a}_{3}+b_{3}\\ \boldsymbol{a}_{2}+b_{2}&\boldsymbol{b}_{3}&\boldsymbol{a}_{1}+b_{1}\\ \boldsymbol{a}_{3}+b_{3}&\boldsymbol{b}_{1}&\boldsymbol{a}_{2}+b_{2}\end{matrix}\right|\\ &=\left|\begin{matrix}\boldsymbol{a}_{1}&\boldsymbol{a}_{2}&\boldsymbol{a}_{3}+b_{3}\\ \boldsymbol{a}_{2}&\boldsymbol{a}_{3}&\boldsymbol{a}_{1}+b_{1}\\ \boldsymbol{a}_{3}&\boldsymbol{a}_{1}&\boldsymbol{a}_{2}+b_{2}\end{matrix}\right|+\left|\begin{matrix}\boldsymbol{b}_{1}&\boldsymbol{a}_{2}&\boldsymbol{a}_{3}+b_{3}\\ \boldsymbol{b}_{2}&\boldsymbol{a}_{3}&\boldsymbol{a}_{1}+b_{1}\\ \boldsymbol{b}_{3}&\boldsymbol{a}_{1}&\boldsymbol{a}_{2}+b_{2}\end{matrix}\right|+\left|\begin{matrix}\boldsymbol{a}_{1}&\boldsymbol{b}_{2}&\boldsymbol{a}_{3}+b_{3}\\ \boldsymbol{a}_{2}&\boldsymbol{b}_{3}&\boldsymbol{a}_{1}+b_{1}\\ \boldsymbol{a}_{3}&\boldsymbol{b}_{1}&\boldsymbol{a}_{2}+b_{2}\end{matrix}\right|+\left|\begin{matrix}\boldsymbol{b}_{1}&\boldsymbol{b}_{2}&\boldsymbol{a}_{3}+b_{3}\\ \boldsymbol{b}_{2}&\boldsymbol{b}_{3}&\boldsymbol{a}_{1}+b_{1}\\ \boldsymbol{b}_{3}&\boldsymbol{b}_{1}&\boldsymbol{a}_{2}+b_{2}\end{matrix}\right|\\ \end{aligned} $$

 $$ \begin{aligned}=\left|\begin{matrix}a_{1}&a_{2}&a_{3}\\a_{2}&a_{3}&a_{1}\\a_{3}&a_{1}&a_{2}\\\end{matrix}\right|+\left|\begin{matrix}a_{1}&a_{2}&b_{3}\\a_{2}&a_{3}&b_{1}\\a_{3}&a_{1}&b_{2}\\\end{matrix}\right|+\left|\begin{matrix}b_{1}&a_{2}&a_{3}\\b_{2}&a_{3}&a_{1}\\b_{3}&a_{1}&a_{2}\\\end{matrix}\right|+\left|\begin{matrix}b_{1}&a_{2}&b_{3}\\b_{2}&a_{3}&b_{1}\\b_{3}&a_{1}&b_{2}\\\end{matrix}\right|+\\\left|\begin{matrix}a_{1}&b_{2}&a_{3}\\a_{2}&b_{3}&a_{1}\\a_{3}&b_{1}&a_{2}\\\end{matrix}\right|+\left|\begin{matrix}a_{1}&b_{2}&b_{3}\\a_{2}&b_{3}&b_{1}\\a_{3}&b_{1}&b_{2}\\\end{matrix}\right|+\left|\begin{matrix}b_{1}&b_{2}&a_{3}\\b_{2}&b_{3}&a_{1}\\b_{3}&b_{1}&a_{2}\\\end{matrix}\right|+\left|\begin{matrix}b_{1}&b_{2}&b_{3}\\b_{2}&b_{3}&b_{1}\\b_{3}&b_{1}&b_{2}\\\end{matrix}\right|.\end{aligned} $$

性质 5 行列式某一行(或某一列)的 k 倍加到另一行(或另一列)的对应元素上去，行列式的值不变. 即

 $$ \begin{array}{c c c c|c|c c c|c}{a_{11}}&{a_{12}}&{\cdots}&{a_{1n}}&{}&{a_{11}}&{a_{12}}&{\cdots}&{a_{1n}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}&{}&{\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {a_{i1}}&{a_{i2}}&{\cdots}&{a_{i n}}&{i}&{a_{i1}}&{a_{i2}}&{\cdots}&{a_{i n}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}&{=}&{\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {a_{j1}+k a_{i1}}&{a_{j2}+k a_{i2}}&{\cdots}&{a_{j n}+k a_{i n}}&{j}&{a_{j1}}&{a_{j2}}&{\cdots}&{a_{j n}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}&{}&{\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {a_{n1}}&{a_{n2}}&{\cdots}&{a_{n n}}&{}&{a_{n1}}&{a_{n2}}&{\cdots}&{a_{n n}}\\ \end{array}. $$

证明 对第i行进行拆分，再利用推论3，有

 $$ \begin{aligned}\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\\vdots&\vdots&\ddots&\vdots\\a_{i1}&a_{i2}&\cdots&a_{in}\\\vdots&\vdots&\ddots&\vdots\\a_{j1}+ka_{i1}&a_{j2}+ka_{i2}&\cdots&a_{jn}+ka_{in}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\\\end{array}\right|&=\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\\vdots&\vdots&\ddots&\vdots\\a_{i1}&a_{i2}&\cdots&a_{in}\\\vdots&\vdots&\ddots&\vdots\\a_{j1}&a_{j2}&\cdots&a_{jn}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\\\end{array}\right|+\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\\vdots&\vdots&\ddots&\vdots\\a_{i1}&a_{i2}&\cdots&a_{in}\\\vdots&\vdots&\ddots&\vdots\\ka_{i1}&ka_{i2}&\cdots&ka_{in}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\\\end{array}\right|\\&=\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\\vdots&\vdots&\ddots&\vdots\\a_{i1}&a_{i2}&\cdots&a_{in}\\\vdots&\vdots&\ddots&\vdots\\a_{j1}&a_{j2}&\cdots&a_{jn}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\\\end{array}\right|.\end{aligned} $$

第 i 行（或第 i 列）乘以数 k 到第 j 行（或第 j 列）上记作  $ r_{j} + kr_{i} $（或  $ c_{j} + kc_{i} $）.

对于给定的 n 阶方阵 A，在第一章中我们已经讨论了如何利用矩阵的初等行变换将方阵 A 化为阶梯形矩阵 R。因为方阵的阶梯形矩阵一定是上三角矩阵，从而  $ |R| $ 就等于其主对角线上元素之积。另外，由行列式的性质 2、性质 3 和性质 5 可以看到，方阵的三类初等变换刚好对应行列式的这三个基本性质：设 M、N 都是 n 阶方阵，

如果  $ M \xrightarrow{r_i \leftrightarrow r_j} N $，或  $ M \xrightarrow{c_i \leftrightarrow c_j} N $，则有  $ |M| \xrightarrow{r_i \leftrightarrow r_j} |N| $，或  $ |M| \xrightarrow{c_i \leftrightarrow c_j} |N| $，从而  $ |N| = -|M| $

或 $ \left|M\right|=-\left|N\right| $;

如果  $ M \xrightarrow{kr_i} N $，或  $ M \xrightarrow{kc_i} N $，则有  $ |M| \xrightarrow{kr_i} |N| $，或  $ |M| \xrightarrow{kc_i} |N| $，从而  $ |N| = k|M| $ 或  $ |M| = \frac{1}{k}|N| $；

如果  $ M \xrightarrow{r_j + k r_i} N $，或  $ M \xrightarrow{c_j + k c_i} N $，则  $ |M| \xrightarrow{r_j + k r_i} |N| $，或  $ |M| \xrightarrow{c_j + k c_i} |N| $，从而  $ |N| = |M| $.

因此，行列式  $ |A| $ 与  $ |R| $ 之间一定满足关系式  $ |A| = \lambda |R| $，其中  $ \lambda $ 是反复利用行列式性质2、性质3和性质5进行计算的过程中产生的某个非零常数。这就是行列式计算中的所谓“化三角形法”。

## 二、行列式的计算举例

例3 计算行列式  $ \left|\begin{matrix}0&2&-2&2\\ 1&3&0&4\\ -2&-11&3&-16\\ 0&-7&3&1\end{matrix}\right| $

解

 $$ \begin{aligned}&\left|\begin{matrix}{{{0}}}&{{{2}}}&{{{-2}}}&{{{2}}} \\{{{1}}}&{{{3}}}&{{{0}}}&{{{4}}} \\{{{-2}}}&{{{-11}}}&{{{3}}}&{{{-16}}} \\{{{0}}}&{{{-7}}}&{{{3}}}&{{{1}}}\end{matrix}\right|\xlongequal{r_{1}\leftrightarrow r_{2}}\left|\begin{matrix}{{{1}}}&{{{3}}}&{{{0}}}&{{{4}}} \\{{{0}}}&{{{2}}}&{{{-2}}}&{{{2}}} \\{{{-2}}}&{{{-11}}}&{{{3}}}&{{{-16}}} \\{{{0}}}&{{{-7}}}&{{{3}}}&{{{1}}}\end{matrix}\right|\xlongequal{r_{3}+2r_{1}}\left|\begin{matrix}{{{1}}}&{{{3}}}&{{{0}}}&{{{4}}} \\{{{0}}}&{{{2}}}&{{{-2}}}&{{{2}}} \\{{{0}}}&{{{-5}}}&{{{3}}}&{{{-8}}} \\{{{0}}}&{{{-7}}}&{{{3}}}&{{{1}}}\end{matrix}\right|\\&\xlongequal{\frac{1}{2}r_{2}}-2\left|\begin{matrix}{{{1}}}&{{{3}}}&{{{0}}}&{{{4}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{-5}}}&{{{3}}}&{{{-8}}} \\{{{0}}}&{{{-7}}}&{{{3}}}&{{{1}}}\end{matrix}\right|\xlongequal{r_{3}+5r_{2}}-2\left|\begin{matrix}{{{1}}}&{{{3}}}&{{{0}}}&{{{4}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{-2}}}&{{{-3}}} \\{{{0}}}&{{{0}}}&{{{-4}}}&{{{8}}}\end{matrix}\right|\xlongequal{r_{4}+(-2)r_{3}}-2\left|\begin{matrix}{{{1}}}&{{{3}}}&{{{0}}}&{{{4}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{-2}}}&{{{-3}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{14}}}\end{matrix}\right|=56.\end{aligned} $$

在计算这个行列式时，做变换  $ r_1 \leftrightarrow r_2 $， $ \frac{1}{2}r_2 $ 的目的是为了使  $ a_{11} $、 $ a_{22} $ 位置的元素变成 1，这样，在后面的计算中可以避免分数的出现.

计算行列式时，要仔细观察行列式的特点。虽然行列式的值是唯一的，但计算过程不唯一。根据行列式的特点合理利用性质，可简化计算。

例4 计算行列式  $ D=\begin{vmatrix}2&1&1&1\\1&2&1&1\\1&1&2&1\\1&1&1&2\end{vmatrix} $

解 注意到行列式的每一列元素之和都是 5，将行列式的第二、三、四行都加到第一行，得

 $$ D=\left|\begin{array}{cccc}{{{5}}}&{{{5}}}&{{{5}}}&{{{5}}} \\{{{1}}}&{{{2}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{2}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{1}}}&{{{2}}}\end{array}\right|=5\left|\begin{array}{cccc}{{{1}}}&{{{1}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{2}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{2}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{1}}}&{{{2}}}\end{array}\right|\left.\underline{\underline{r_{2}+(-1)r_{1}}}\overbrace{r_{4}+(-1)r_{1}}^{r_{2}+(-1)r_{1}}5\left|\begin{array}{cccc}{{{1}}}&{{{1}}}&{{{1}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}}\end{array}\right|=5. $$

例5 计算行列式  $ D=\begin{vmatrix}7&1&1&1\\1&4&1&1\\1&1&-2&1\\1&1&1&-5\end{vmatrix} $

解

 $$ \begin{aligned}D&=\left|\begin{matrix}{{{7}}}&{{{1}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{4}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{1}}}&{{{-5}}}\end{matrix}\right|\left|\begin{matrix}{{{r_{2}+(-1)r_{1}}}} \\{{{r_{3}+(-1)r_{1}}}} \\{{{\frac{r_{4}+(-1)r_{1}}{r_{4}+(-1)r_{1}}}}}\end{matrix}\right|\left|\begin{matrix}{{{7}}}&{{{1}}}&{{{1}}}&{{{1}}} \\{{{-6}}}&{{{3}}}&{{{0}}}&{{{0}}} \\{{{-6}}}&{{{0}}}&{{{-3}}}&{{{0}}} \\{{{-6}}}&{{{0}}}&{{{0}}}&{{{-6}}}\end{matrix}\right|\\&\quad\left|\begin{matrix}{{{c_{1}+2c_{2}}}} \\{{{\frac{c_{1}+(-2)c_{3}}{c_{1}+(-1)c_{4}}}}}\end{matrix}\right|\left|\begin{matrix}{{{6}}}&{{{1}}}&{{{1}}}&{{{1}}} \\{{{0}}}&{{{3}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{-3}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{-6}}}\end{matrix}\right|=324.\end{aligned} $$

例6 设矩阵  $ A = \begin{pmatrix} a_{11} & \cdots & a_{1k} \\ \vdots & \ddots & \vdots \\ a_{k1} & \cdots & a_{kk} \end{pmatrix} $， $ B = \begin{pmatrix} b_{11} & \cdots & b_{1t} \\ \vdots & \ddots & \vdots \\ b_{t1} & \cdots & b_{tt} \end{pmatrix} $， $ C = \begin{pmatrix} c_{11} & \cdots & c_{1t} \\ \vdots & \ddots & \vdots \\ c_{k1} & \cdots & c_{kt} \end{pmatrix} $，若矩阵  $ D = \begin{pmatrix} A & C \\ O & B \end{pmatrix} $，证明： $ |D| = |A| \cdot |B| $.

证明 对行列式  $ \left|A\right| $ 做运算  $ r_{i}+kr_{i} $，将  $ \left|A\right| $ 化为上三角行列式得

 $$ \left|\boldsymbol{A}\mid\stackrel{r_{j}+kr_{i}}{\longrightarrow}\right|\begin{array}{c c c}p_{11}&\cdots&p_{1k}\\ &\ddots&\vdots\\ &&p_{k k}\end{array}\Bigg|=p_{11}p_{22}\cdots p_{k k}. $$

对行列式  $ |B| $ 做运算  $ r_{i}+kr_{i} $，将  $ |B| $ 化为上三角行列式得

 $$ \left|\boldsymbol{B}\mid\overline{\overline{}}\right|\begin{array}{c c c}q_{11}&\cdots&q_{1t}\\&\ddots&\vdots\\&&q_{tt}\end{array}\left|=q_{11}q_{22}\cdots q_{tt}.\right. $$

对行列式  $ |D| $ 的前 k 行做与行列式  $ |A| $ 相同的运算，对行列式  $ |D| $ 的后 t 行做与行列式  $ |B| $ 相同的运算，可以将行列式  $ |D| $ 化为上三角行列式：

 $$ \left|\boldsymbol{D}\right|=\left|\begin{array}{ccccc}a_{11}&\cdots&a_{1k}&c_{11}&\cdots&c_{1t}\\\vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\a_{k1}&\cdots&a_{kk}&c_{k1}&\cdots&c_{kt}\\&&b_{11}&\cdots&b_{1t}\\&\boldsymbol{O}&\vdots&\ddots&\vdots\\&&b_{t1}&\cdots&b_{tt}\\\end{array}\right|=\left|\begin{array}{ccccc}p_{11}&\cdots&p_{1k}&d_{11}&\cdots&d_{1t}\\&\ddots&\vdots&\vdots&\ddots&\vdots\\&&p_{kk}&d_{k1}&\cdots&d_{kt}\\&&b_{11}&\cdots&b_{1t}\\&&&\boldsymbol{O}&\vdots&\ddots&\vdots\\&&&&b_{t1}&\cdots&b_{tt}\\\end{array}\right| $$

 $$ \begin{aligned}&=\begin{vmatrix}p_{11}&\cdots&p_{1k}&d_{11}&\cdots&d_{1t}\\&&\ddots&\vdots&\vdots&\ddots&\vdots\\&&&p_{kk}&d_{k1}&\cdots&d_{kt}\\&&&&q_{11}&\cdots&q_{1t}\\&&&\ddots&\vdots&\\&&&&&q_{tt}\end{vmatrix},\\ &\quad\boldsymbol{O}\\ \end{aligned} $$

因此， $ \left|D\right|=p_{11}p_{22}\cdots p_{kk}\cdot q_{11}q_{22}\cdots q_{u}=\left|A\right|\cdot\left|B\right| $.

可以类似地证明，

 $$ \left|\boldsymbol{D}\right|=\left|\begin{array}{ccccc}a_{11}&\cdots&a_{1k}&\\\vdots&\ddots&\vdots&&\boldsymbol{O}\\a_{k1}&\cdots&a_{kk}&\\c_{11}&\cdots&c_{1k}&b_{11}&\cdots&b_{1t}\\\vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\c_{t1}&\cdots&c_{tk}&b_{t1}&\cdots&b_{tt}\\\end{array}\right|=\left|\begin{array}{ccc}a_{11}&\cdots&a_{1k}\\\vdots&\ddots&\vdots\\a_{k1}&\cdots&a_{kk}\\\end{array}\right|\cdot\left|\begin{array}{ccc}b_{11}&\cdots&b_{1t}\\\vdots&\ddots&\vdots\\b_{t1}&\cdots&b_{tt}\\\end{array}\right|. $$

例7 计算行列式  $ D_{2n}=\begin{pmatrix}a&&&&b\\&\ddots&&&\ddots&\\&&a&b&&\\&&c&d&&\\&&\ddots&&&\ddots&\\c&&&&&d\end{pmatrix} $，其中未写出的元素为0.

解 把  $ D_{2n} $ 中的第 2n 行依次与第 2n-1 行、第 2n-2 行、…、第 3 行、第 2 行交换，共交换了 2n-2 次；再将第 2n 列依次与第 2n-1 列、第 2n-2 列、…、第 3 列、第 2 列交换，也共交换了 2n-2 次，得

 $$ D_{2n}=\left(-1\right)^{2n-2}\left(-1\right)^{2n-2}\left|\begin{array}{ccccc}a&b&0&\cdots&0\\c&d&0&\cdots&0\\0&0&a&&b\\\vdots&\vdots&&\ddots&&\ddots\\\vdots&\vdots&&\quad a&b&\\&&&c&d&\\&&&\ddots&\ddots&\\0&0&\underbrace{c}_{2(x-1)}&&&d\\\end{array}\right|. $$

根据例 6， $ D_{2n}=\left|\begin{array}{cc}a & b \\ c & d\end{array}\right|D_{2(n-1)}=\left(ad-bc\right)D_{2(n-1)} $。同样的做法可得  $ D_{2(n-1)}=(ad-bc) $  $ D_{2(n-2)} $，于是有

 $$ \begin{aligned}\boldsymbol{D}_{2n}=&\left(a d-b c\right)\boldsymbol{D}_{2(n-1)}=\left(a d-b c\right)^{2}\boldsymbol{D}_{2(n-2)}=\cdots=\left(a d-b c\right)^{n-1}\boldsymbol{D}_{2}\\=&\left(a d-b c\right)^{n-1}\left|\begin{array}{l l}{a}&{b}\\ {c}&{d}\end{array}\right|=\left(a d-b c\right)^{n}.\end{aligned} $$

## 三、方阵可逆的充要条件

定理2 n阶方阵A可逆的充分必要条件是 $ \left|A\right|\neq0 $

证明 根据第一章第四节的内容，n 阶方阵 A 可逆，则方阵 A 行等价于单位阵 E，即 A 可通过初等行变换化为单位阵 E。根据矩阵的初等变换与行列式性质的关系（参见例 3 之前的文字说明），一定存在一个数  $ \lambda \neq 0 $，使得  $ |A| = \lambda |E| $，而  $ |E| = 1 $，因此  $ |A| = \lambda \neq 0 $。

反之，设  $ |A| \neq 0 $。由于  $ n $ 阶方阵  $ A $ 可通过初等行变换化为行最简形矩阵  $ R $，因此存在一个数  $ \lambda \neq 0 $，使得  $ |A| = \lambda |R| $。由  $ |A| \neq 0 $ 可得  $ |R| \neq 0 $，

因此 R 中没有全零行，从而 R = E。也就是说，方阵 A 行等价于单位阵 E，所以方阵 A 可逆。

在不需要求出逆矩阵的情况下，定理2给了一个简易的判断矩阵可逆的方法.

例 8 判断下列矩阵是否可逆：

(1)

 $$ \boldsymbol{A}=\begin{pmatrix}-1&1&-1\\1&-1&-1\\-1&-1&1\end{pmatrix}; $$

(2)

 $$ \boldsymbol{B}=\begin{pmatrix}2&1&-3\\ -1&0&1\\ 1&-2&1\end{pmatrix}. $$

解 (1) 因为  $ \left|A\right|=\left|\begin{matrix}-1&1&-1\\ 1&-1&-1\\ -1&-1&1\end{matrix}\right|=\left|\begin{matrix}-1&1&-1\\ 0&0&-2\\ 0&-2&2\end{matrix}\right|=-\left|\begin{matrix}-1&1&-1\\ 0&-2&2\\ 0&0&-2\end{matrix}\right|=4\neq0 $ ，所以矩阵 A 可逆.

(2) 因为  $ \left|B\right| = \left|\begin{matrix}2&1&-3\\ -1&0&1\\ 1&-2&1\end{matrix}\right| = -\left|\begin{matrix}-1&0&1\\ 2&1&-3\\ 1&-2&1\end{matrix}\right| = -\left|\begin{matrix}-1&0&1\\ 0&1&-1\\ 0&-2&2\end{matrix}\right| = 0 $，所以矩阵  $ B $ 不可逆.

根据例6，分块矩阵 $ D=\begin{pmatrix} A & C \\ O & B \end{pmatrix} $可逆的充分必要条件是A、B均可逆。特别地，设 $ A_{1} $， $ A_{2} $， $ \cdots $， $ A_{s} $分别是 $ n_{i}(i=1,2,\cdots,s) $阶方阵，则分块对角阵 $ D=\begin{pmatrix} A_{1} & O & \cdots & O \\ O & A_{2} & \cdots & O \\ \vdots & \vdots & \ddots & \vdots \\ O & O & \cdots & A_{s} \end{pmatrix} $可逆的充分必要条件是 $ A_{i}(i=1,2,\cdots,s) $均可逆。且在 $ A_{i}(i=1,2,\cdots,s) $均可逆的条件下，由

 $$ \begin{pmatrix}A_{1}&O&\cdots&O\\O&A_{2}&\cdots&O\\\vdots&\vdots&\ddots&\vdots\\O&O&\cdots&A_{s}\\\end{pmatrix}\begin{pmatrix}A_{1}^{-1}&O&\cdots&O\\O&A_{2}^{-1}&\cdots&O\\\vdots&\vdots&\ddots&\vdots\\O&O&\cdots&A_{s}^{-1}\\\end{pmatrix}=\begin{pmatrix}A_{1}^{-1}&O&\cdots&O\\O&A_{2}^{-1}&\cdots&O\\\vdots&\vdots&\ddots&\vdots\\O&O&\cdots&A_{s}^{-1}\\\end{pmatrix}\begin{pmatrix}A_{1}&O&\cdots&O\\O&A_{2}&\cdots&O\\\vdots&\vdots&\ddots&\vdots\\O&O&\cdots&A_{s}\\\end{pmatrix}\begin{pmatrix}A_{1}&\cdots&\cdots&\cdots\\O&\cdots&\ddots&\vdots\\O&\cdots&\ddots&\vdots\\O&\cdots&\cdots&\cdots\\O&\cdots&\cdots&\cdots\\\end{pmatrix}\begin{pmatrix}E_{1}\\E_{2}\\\cdots&\ddots&\\E_{s}\\\end{pmatrix}, $$

其中  $ E_{i}(i=1,2,\cdots,s) $ 是  $ n_{i}(i=1,2,\cdots,s) $ 阶单位矩阵，可知

 $$ \boldsymbol{D}^{-1}=\begin{pmatrix}\boldsymbol{A}_{1}^{-1}&\boldsymbol{O}&\cdots&\boldsymbol{O}\\\boldsymbol{O}&\boldsymbol{A}_{2}^{-1}&\cdots&\boldsymbol{O}\\\vdots&\vdots&\ddots&\vdots\\\boldsymbol{O}&\boldsymbol{O}&\cdots&\boldsymbol{A}_{s}^{-1}\end{pmatrix}. $$

例 9 设矩阵  $ D=\begin{pmatrix} A & C \\ O & B \end{pmatrix} $，其中 A、B 分别为 m 阶、n 阶可逆阵，求  $ D^{-1} $.

解　由例6可知，若A、B均可逆，则 $ D=\begin{pmatrix} A & C \\ O & B \end{pmatrix} $一定可逆. 于是，存在矩阵 $ D^{-1}=\begin{pmatrix} X_{1} & X_{2} \\ X_{3} & X_{4} \end{pmatrix} $，使得

 $$ \begin{pmatrix}\boldsymbol{A}&\boldsymbol{C}\\\boldsymbol{O}&\boldsymbol{B}\end{pmatrix}\begin{pmatrix}\boldsymbol{X}_{1}&\boldsymbol{X}_{2}\\\boldsymbol{X}_{3}&\boldsymbol{X}_{4}\end{pmatrix}=\begin{pmatrix}\boldsymbol{E}_{1}&\boldsymbol{O}\\\boldsymbol{O}&\boldsymbol{E}_{2}\end{pmatrix},\mathrm{~ 且 }\begin{pmatrix}\boldsymbol{X}_{1}&\boldsymbol{X}_{2}\\\boldsymbol{X}_{3}&\boldsymbol{X}_{4}\end{pmatrix}\begin{pmatrix}\boldsymbol{A}&\boldsymbol{C}\\\boldsymbol{O}&\boldsymbol{B}\end{pmatrix}=\begin{pmatrix}\boldsymbol{E}_{1}&\boldsymbol{O}\\\boldsymbol{O}&\boldsymbol{E}_{2}\end{pmatrix}, $$

其中， $ X_{1} $ 是 m 阶方阵， $ X_{4} $ 是 n 阶方阵， $ X_{2} $ 是  $ m \times n $ 阶矩阵， $ X_{3} $ 是  $ n \times m $ 阶矩阵. 即

 $$ \begin{pmatrix}\boldsymbol{A}\boldsymbol{X}_{1}+\boldsymbol{C}\boldsymbol{X}_{3}&\boldsymbol{A}\boldsymbol{X}_{2}+\boldsymbol{C}\boldsymbol{X}_{4}\\\boldsymbol{O}\boldsymbol{X}_{1}+\boldsymbol{B}\boldsymbol{X}_{3}&\boldsymbol{O}\boldsymbol{X}_{2}+\boldsymbol{B}\boldsymbol{X}_{4}\end{pmatrix}=\begin{pmatrix}\boldsymbol{E}_{1}&\boldsymbol{O}\\\boldsymbol{O}&\boldsymbol{E}_{2}\end{pmatrix},\mathrm{~ 且 }\begin{pmatrix}\boldsymbol{X}_{1}\boldsymbol{A}+\boldsymbol{X}_{2}\boldsymbol{O}&\boldsymbol{X}_{1}\boldsymbol{C}+\boldsymbol{X}_{2}\boldsymbol{B}\\\boldsymbol{X}_{3}\boldsymbol{A}+\boldsymbol{X}_{4}\boldsymbol{O}&\boldsymbol{X}_{3}\boldsymbol{C}+\boldsymbol{X}_{4}\boldsymbol{B}\end{pmatrix}=\begin{pmatrix}\boldsymbol{E}_{1}&\boldsymbol{O}\\\boldsymbol{O}&\boldsymbol{E}_{2}\end{pmatrix}, $$

应用矩阵相等的概念，得到如下方程组：

 $$ \left\{\begin{aligned}AX_{1}+CX_{3}&=E_{1},\\ AX_{2}+CX_{4}&=O,\\ BX_{3}&=O,\\ BX_{4}&=E_{2}.\end{aligned}\right.,\  且 \\ \left\{\begin{aligned}X_{1}A&=E_{1},\\ X_{1}C+X_{2}B&=O,\\ X_{3}A&=O,\\ X_{3}C+X_{4}B&=E_{2}.\end{aligned}\right. $$

解第一个方程组如下(解第二个方程组可得同样的结果):

由于 $A$、$B$ 均可逆，$BX_3 = O$ 等号两端同时左乘 $B^{-1}$ 得 $B^{-1}BX_3 = B^{-1}O$，即 $X_3 = O$；$BX_4 = E_2$ 等号两端同时左乘 $B^{-1}$ 得 $B^{-1}BX_4 = B^{-1}E_2$，即 $X_4 = B^{-1}$；

将  $ X_3 = O $ 代入  $ AX_1 + CX_3 = E_1 $ 得  $ AX_1 = E_1 $，等号两端同时左乘  $ A^{-1} $ 得  $ A^{-1}AX_1 = A^{-1}E_1 $ 即  $ X_1 = A^{-1} $；

将  $ X_4 = B^{-1} $ 代入  $ AX_2 + CX_4 = O $ 得  $ AX_2 = -CB^{-1} $，等号两端同时左乘  $ A^{-1} $ 得  $ A^{-1}AX_2 = -A^{-1}CB^{-1} $，即  $ X_2 = -A^{-1}CB^{-1} $。

因此， $ D^{-1}=\begin{pmatrix}A^{-1}&-A^{-1}CB^{-1}\\O&B^{-1}\end{pmatrix}. $

定理 3 设  $ A $、 $ B $ 是两个  $ n $ 阶方阵，则  $ |AB| = |A| \cdot |B| $.

证明 （1）若  $ A=P(i,j) $，由于  $ \left|P(i,j)\right|=-|E|=-1 $，于是

 $$ \left|A B\right|=\left|P(i,j)B\right|=-\left|B\right|=\left|P(i,j)\right|\cdot\left|B\right|=\left|A\right|\cdot\left|B\right| $$

若  $ A = P(i(k)) $，由于  $ \left|P(i(k))\right| = k\left|E\right| = k $，于是

 $$ \left|A\boldsymbol{B}\right|=\left|\boldsymbol{P}(i(k))\boldsymbol{B}\right|=k\left|\boldsymbol{B}\right|=\left|\boldsymbol{P}(i(k))\right|\cdot\left|\boldsymbol{B}\right|=\left|\boldsymbol{A}\right|\cdot\left|\boldsymbol{B}\right|; $$

若  $ A = P(i(k), j) $，由于  $ \left|P(i(k), j)\right| = \left|E\right| = 1 $，于是

 $$ \left|A\boldsymbol{B}\right|=\left|\boldsymbol{P}(i(k),j)\boldsymbol{B}\right|=\left|\boldsymbol{B}\right|=\left|\boldsymbol{P}(i(k),j)\right|\cdot\left|\boldsymbol{B}\right|=\left|\boldsymbol{A}\right|\cdot\left|\boldsymbol{B}\right|. $$

因此，当  $ A $ 是初等矩阵时，有  $ |AB| = |A| \cdot |B| $.

(2) 若  $ A $ 是一般的可逆方阵，则存在若干个初等矩阵  $ P_1 $， $ P_2 $， $ \cdots $， $ P_s $，使得  $ A = P_1 \cdot P_2 \cdots P_s $。于是由(1)有

 $$ \begin{aligned}\left|\boldsymbol{A}\boldsymbol{B}\right|&=\left|\boldsymbol{P}_{1}\cdot\boldsymbol{P}_{2}\cdots\boldsymbol{P}_{s}\cdot\boldsymbol{B}\right|=\left|\boldsymbol{P}_{1}\right|\cdot\left|\boldsymbol{P}_{2}\cdots\boldsymbol{P}_{s}\cdot\boldsymbol{B}\right|=\left|\boldsymbol{P}_{1}\right|\cdot\left|\boldsymbol{P}_{2}\right|\cdot\left|\boldsymbol{P}_{3}\cdots\boldsymbol{P}_{s}\cdot\boldsymbol{B}\right|\\&=\cdots=\left|\boldsymbol{P}_{1}\right|\cdot\left|\boldsymbol{P}_{2}\right|\cdots\left|\boldsymbol{P}_{s}\right|\cdot\left|\boldsymbol{B}\right|=\left|\boldsymbol{P}_{1}\right|\cdot\left|\boldsymbol{P}_{2}\right|\cdots\left|\boldsymbol{P}_{s-2}\right|\cdot\left|\boldsymbol{P}_{s-1}\boldsymbol{P}_{s}\right|\cdot\left|\boldsymbol{B}\right|\\&=\left|\boldsymbol{P}_{1}\right|\cdot\left|\boldsymbol{P}_{2}\right|\cdots\left|\boldsymbol{P}_{s-3}\right|\mid\boldsymbol{P}_{s-2}\boldsymbol{P}_{s-1}\boldsymbol{P}_{s}\mid\cdot\left|\boldsymbol{B}\right|=\cdots=\left|\boldsymbol{P}_{1}\boldsymbol{P}_{2}\cdots\boldsymbol{P}_{s}\right|\cdot\left|\boldsymbol{B}\right|\\&=\left|\boldsymbol{A}\right|\cdot\left|\boldsymbol{B}\right|.\end{aligned} $$

(3) 若  $ A $ 不是可逆方阵，则存在若干个初等矩阵  $ P_1 $， $ P_2 $， $ \cdots $， $ P_s $，使得  $ P_s \cdots P_2 \cdot P_1 A = R $，其中  $ R $ 是  $ A $ 的行最简形矩阵，且  $ R $ 的最后一行是全零行。由于初等矩阵的逆矩阵仍旧是初等矩阵，于是

 $$ \begin{aligned}\left|\boldsymbol{A}\boldsymbol{B}\right|&=\left|\boldsymbol{P}_{1}^{-1}\boldsymbol{P}_{2}^{-1}\cdots\boldsymbol{P}_{s}^{-1}\boldsymbol{R}\boldsymbol{B}\right|=\left|\boldsymbol{P}_{1}^{-1}\right|\cdot\left|\boldsymbol{P}_{2}^{-1}\cdots\boldsymbol{P}_{s}^{-1}\boldsymbol{R}\boldsymbol{B}\right|=\left|\boldsymbol{P}_{1}^{-1}\right|\cdot\left|\boldsymbol{P}_{2}^{-1}\right|\cdot\left|\boldsymbol{P}_{3}^{-1}\cdots\boldsymbol{P}_{s}^{-1}\boldsymbol{R}\boldsymbol{B}\right|\\&=\cdots=\left|\boldsymbol{P}_{1}^{-1}\right|\cdot\left|\boldsymbol{P}_{2}^{-1}\right|\cdots\left|\boldsymbol{P}_{s}^{-1}\right|\cdot\left|\boldsymbol{R}\boldsymbol{B}\right|.\end{aligned} $$

由于 $RB$ 的最后一行也是全零行，从而 $|RB| = 0$，因此 $|AB| = 0$。另一方面，由于 $A$ 不是可逆方阵，由定理 1 可知 $|A| = 0$，于是 $|A| \cdot |B| = 0$。

因此，当  $ A $ 不是可逆方阵时， $ |AB| = |A| \cdot |B| $ 也成立.

对于 $n$ 阶方阵 $A$、$B$，一般来说 $AB \neq BA$，但总有 $|AB| = |A| \cdot |B|$.

由定理2和定理3，我们可以得到如下的推论.

推论4 设  $ A $ 是  $ n $ 阶方阵，如果存在  $ n $ 阶方阵  $ B $ 满足  $ AB = E $（或者  $ BA = E $），则  $ n $ 阶方阵  $ A $ 可逆，且  $ A^{-1} = B $。

证明 由 AB = E 及定理 3 得

 $$ \left|{1=\left|{E}\right|=\left|{A B}\right|=\left|{A}\right|\cdot\left|{B}\right|}\right|\right. $$

于是 $ |A|\neq0 $，从而由定理2知，方阵A可逆.

例 10 设 n 阶方阵 A 满足  $ A^{2}=2E $，证明矩阵 A+E 可逆，并求  $ (A+E)^{-1} $.

证明 因为

 $$ \boldsymbol{A}^{2}=2\boldsymbol{E}\Longrightarrow\boldsymbol{A}^{2}-\boldsymbol{E}=\boldsymbol{E}\Longrightarrow(\boldsymbol{A}-\boldsymbol{E})(\boldsymbol{A}+\boldsymbol{E})=\boldsymbol{E}, $$

所以由推论4可知，矩阵 $ A+E $可逆，且 $ (A+E)^{-1}=A-E $.
