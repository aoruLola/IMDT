# 第1章 线性方程组与矩阵

> 来源：docs/08_电子书/线性代数-同济大学数学系.md
> 科目：数学二（302） ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：542d072d2e071a92


## [课前导读]

线性方程组的求解是线性代数要研究的重要问题之一，而矩阵是求解线性方程组的核心工具。另一方面，矩阵理论在自然科学、工程技术、经济管理等领域中有着广泛的应用，是一些实际问题得以解决的基本工具。这一节我们通过线性方程组和矩阵的关系引出矩阵的定义，并给出矩阵的运算及运算性质。在正式学习矩阵之前，需要读者了解线性方程组的相关知识。

## 一、矩阵的定义

由 m 个方程 n 个未知量  $ x_{1}, x_{2}, \cdots, x_{n} $ 构成的线性（即：一次）方程组可以表示为

 $$ \begin{cases}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}=b_{1},\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}=b_{2},\\\cdots\cdots\cdots\\a_{m1}x_{1}+a_{m2}x_{2}+\cdots+a_{mn}x_{n}=b_{m}.\end{cases} $$

在线性方程组中，未知量用什么字母表示无关紧要，重要的是方程组中未知量的个数以及未知量的系数和常数项。也就是说，线性方程组（1-1）由常数  $ a_{ij}(i=1,2,\cdots,m; j=1,2,\cdots,n) $ 和  $ b_{i}(i=1,2,\cdots,m) $ 完全确定，所以可以用一个  $ m\times(n+1) $ 个数排成的 m 行 n+1 列的数表

 $$ \widetilde{\boldsymbol{A}}=\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}&b_{1}\\a_{21}&a_{22}&\cdots&a_{2n}&b_{2}\\\vdots&\vdots&\ddots&\vdots&\vdots\\a_{m1}&a_{m2}&\cdots&a_{mn}&b_{m}\end{pmatrix} $$

来表示线性方程组 $ (1-1) $. 这个数表的第 $ j(j=1,2,\cdots,n) $列表示未知量 $ x_j(j=1,2,\cdots,n) $前的系数, 第 $ i(i=1,2,\cdots,m) $行表示线性方程组 $ (1-1) $中的第 $ i(i=1,2,\cdots,m) $个方程, 这个数表 $ \widetilde{A} $反映了线性方程组 $ (1-1) $的全部信息. 反之, 任意给定一个 $ m $行 $ n+1 $列的数表, 可以通过这个数表写出一个线性方程组. 因此, 线性方程组与这样的数表之间有了一个对应关系.

定义 1  $ m \times n $ 个数  $ a_{ij} (i=1,2,\cdots,m; j=1,2,\cdots,n) $ 排成的 m 行 n 列的数表

 $$ \begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{m1}&a_{m2}&\cdots&a_{mn}\end{pmatrix} $$

称为一个  $ m \times n $ 矩阵，简记为  $ (a_{ij}) $，有时为了强调矩阵的行数和列数，也记为  $ (a_{ij})_{m \times n} $。数  $ a_{ij} $ 位于矩阵  $ (a_{ij}) $ 的第 i 行第 j 列，称为矩阵的  $ (i, j) $ 元素，其中 i 称为元素  $ a_{ij} $ 的行标，j 称为元素  $ a_{ij} $ 的列标。

一般地，常用英文大写字母  $ A $， $ B $， $ \cdots $ 或字母  $ \alpha $， $ \beta $， $ \gamma $， $ \cdots $ 表示矩阵，如  $ A = (a_{ij}) $， $ B = (b_{ij}) $， $ A_{m \times n} $， $ B_{m \times n} $ 等。

元素是实数的矩阵称为实矩阵，元素是复数的矩阵称为复矩阵。本书中的矩阵除特别指明外，都是指实矩阵。

 $ 1 \times 1 $ 的矩阵  $ A = (a) $ 就记为 A = a.

1×n 的矩阵

 $$ (a_{1},~a_{2},~\cdots,~a_{n}) $$

称为行矩阵，也称为n维行向量.

 $ n \times 1 $ 的矩阵

 $$ \begin{pmatrix}a_{1}\\a_{2}\\\vdots\\a_{n}\end{pmatrix} $$

称为列矩阵，也称为n维列向量.

所有元素都是零的  $ m \times n $ 矩阵称为零矩阵，记为  $ O_{m \times n} $，或简记为 O.

 $ n \times n $ 矩阵

 $$ \begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\end{pmatrix} $$

称为 n 阶方阵. 元素  $ a_{ii}(i=1,2,\cdots,n) $ 所在的位置称为 n 阶方阵的主对角线.

一个 n 阶方阵主对角线上方的元素全为零，即

 $$ \begin{pmatrix}a_{11}&0&\cdots&0\\a_{21}&a_{22}&\cdots&0\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\end{pmatrix}, $$

称该 n 阶方阵为下三角矩阵. 下三角矩阵的元素特点是：当 i<j 时， $ a_{ij}=0 $.

类似地，有上三角矩阵

 $$ \begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\0&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\0&0&\cdots&a_{nn}\end{pmatrix}, $$

上三角矩阵的元素特点是：当 i > j 时， $ a_{ij} = 0 $.

n 阶方阵

 $$ \begin{pmatrix}a_{1}&0&\cdots&0\\0&a_{2}&\cdots&0\\\vdots&\vdots&\ddots&\vdots\\0&0&\cdots&a_{n}\end{pmatrix} $$

称为 n 阶对角矩阵，简称对角阵，记为  $ \mathrm{diag}(a_{1}, a_{2}, \cdots, a_{n}) $.

如果 n 阶对角矩阵  $ \text{diag}(a_1, a_2, \cdots, a_n) $ 对角线上的元素全相等，即  $ a_1 = a_2 = \cdots = a_n $，则称其为数量矩阵。当  $ a_1 = a_2 = \cdots = a_n = 1 $ 时，这个数量矩阵就称为 n 阶单位矩阵，简称为单位阵，记为  $ E_n $ 或  $ E $，即

 $$ \boldsymbol{E}=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{\cdots}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{\cdots}}}&{{{0}}} \\{{{\vdots}}}&{{{\vdots}}}&{{{\ddots}}}&{{{\vdots}}} \\{{{0}}}&{{{0}}}&{{{\cdots}}}&{{{1}}}\end{pmatrix}. $$

定义 2 两个矩阵的行数相等、列数也相等，则称这两个矩阵为同型矩阵。如果两个同型矩阵  $ A=(a_{ij})_{m\times n} $ 和  $ B=(b_{ij})_{m\times n} $ 中所有对应位置的元素都相等，即  $ a_{ij}=b_{ij} $，其中 i=1,2,\cdots,m; j=1,2,\cdots,n $，则称矩阵 A 和 B 相等，记为 A=B。

### 1. 矩阵的加法

定义 3 设  $ A = (a_{ij})_{m \times n} $ 和  $ B = (b_{ij})_{m \times n} $ 是两个同型矩阵，则矩阵 A 与 B 的和记为  $ A + B $，规定

 $$ \begin{aligned}A+B&=\begin{pmatrix}a_{11}+b_{11}&a_{12}+b_{12}&\cdots&a_{1n}+b_{1n}\\a_{21}+b_{21}&a_{22}+b_{22}&\cdots&a_{2n}+b_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{m1}+b_{m1}&a_{m2}+b_{m2}&\cdots&a_{mn}+b_{mn}\end{pmatrix}.\end{aligned} $$

同型矩阵的加法就是两个矩阵对应位置上元素的加法，由此易知矩阵的加法满足如下的运算规律：设 A，B，C 是任意三个  $ m \times n $ 矩阵，则

（1）交换律： $ A + B = B + A $；

（2）结合律： $ (A+B)+C=A+(B+C) $;

(3)  $ A + O_{m \times n} = O_{m \times n} + A = A $.

对于矩阵  $  \boldsymbol{A} = (a_{ij})_{m \times n}  $，称矩阵  $  (-a_{ij})_{m \times n}  $ 为矩阵 A 的负矩阵，记为 -A。显然， $  \boldsymbol{A} + (-\boldsymbol{A}) = \boldsymbol{O}_{m \times n}  $。由此可以定义矩阵  $  \boldsymbol{A} = (a_{ij})_{m \times n}  $ 和  $  \boldsymbol{B} = (b_{ij})_{m \times n}  $ 的减法为

 $$ \boldsymbol{A}-\boldsymbol{B}=\boldsymbol{A}+(-\boldsymbol{B})=(\boldsymbol{a}_{ij}-\boldsymbol{b}_{ij})_{m\times n}. $$

### 2. 矩阵的数乘

定义 4 用一个数 k 乘矩阵  $  \boldsymbol{A} = (a_{ij})_{m \times n}  $ 的所有元素得到的矩阵  $  (ka_{ij})_{m \times n}  $ 称为矩阵的数乘，记为 kA 或者 Ak，即  $  k\boldsymbol{A} = \boldsymbol{A}k = (ka_{ij})_{m \times n}  $.

如果 k，l 是任意两个数，A，B 是任意两个  $ m \times n $ 矩阵，则矩阵的数乘运算满足：

(1)  $ k(A + B) = kA + kB $;

(2) $ (k+l)A=kA+lA $;

(3)  $ (kl)A = k(lA) = l(kA) $;

(4) 1A=A;

(5)  $ (-1)A = -A $;

(6)  $ 0A = O_{m \times n} $.

矩阵的加法和矩阵的数乘统称为矩阵的线性运算.

例1 设 $ A=\begin{pmatrix}3&0&2\\1&3&4\end{pmatrix} $， $ B=\begin{pmatrix}-1&2&1\\0&2&3\end{pmatrix} $，求 $ A+B $和2A-B.

 $$ \boldsymbol{A}+\boldsymbol{B}=\begin{pmatrix}3&0&2\\1&3&4\end{pmatrix}+\begin{pmatrix}-1&2&1\\0&2&3\end{pmatrix}=\begin{pmatrix}3-1&0+2&2+1\\1+0&3+2&4+3\end{pmatrix}=\begin{pmatrix}2&2&3\\1&5&7\end{pmatrix}; $$

 $$ \begin{aligned}2\boldsymbol{A}-\boldsymbol{B}&=2\binom{3\quad0\quad2}{1\quad3\quad4}-\binom{-1\quad2\quad1}{0\quad2\quad3}=\binom{3\times2\quad0\times2\quad2\times2}{1\times2\quad3\times2\quad4\times2}-\binom{-1\quad2\quad1}{0\quad2\quad3}\\&=\binom{6+1\quad0-2\quad4-1}{2-0\quad6-2\quad8-3}=\binom{7\quad-2\quad3}{2\quad4\quad5}.\end{aligned} $$

## 三、矩阵的乘法

定义 5 设矩阵  $ A = (a_{ij}) $ 是一个  $ m \times p $ 矩阵，矩阵  $ B = (b_{ij}) $ 是一个  $ p \times n $ 矩阵，定义矩阵 A 与 B 的乘积是一个  $ m \times n $ 矩阵  $ C = (c_{ij}) $，其中矩阵  $ C = (c_{ij}) $ 的第 i 行第 j 列元素  $ c_{ij} $ 是由矩阵 A 的第 i 行元素  $ a_{i1} $， $ a_{i2} $，…， $ a_{in} $ 与矩阵 B 的第 j 列相应元素  $ b_{1i} $， $ b_{2i} $，…， $ b_{ni} $ 乘积之和，即

 $$ c_{i j}=\sum_{k=1}^{p}a_{i k}b_{k j}=a_{i1}b_{1j}+a_{i2}b_{2j}+\cdots+a_{i p}b_{p j}. $$

必须注意：只有当第一个矩阵(左边的矩阵)的列数与第二个矩阵(右边的矩阵)的行数相等时，两个矩阵才能相乘.

例2 求矩阵 $ A=\begin{pmatrix}3&-1&1\\2&2&0\end{pmatrix} $与 $ B=\begin{pmatrix}1&-1&0\\1&1&1\\2&1&-1\end{pmatrix} $的乘积AB.

解 因为矩阵 A 是 2×3 矩阵，矩阵 B 是 3×3 矩阵，A 的列数等于 B 的行数，所以矩阵 A 与 B 可以相乘，乘积 AB 是一个 2×3 矩阵。按公式 (1-2) 有

 $$ \begin{aligned}\boldsymbol{A}\boldsymbol{B}=&\begin{pmatrix}{{{3}}}&{{{-1}}}&{{{1}}} \\{{{2}}}&{{{2}}}&{{{0}}}\end{pmatrix}\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{0}}} \\{{{1}}}&{{{1}}}&{{{1}}} \\{{{2}}}&{{{1}}}&{{{-1}}}\end{pmatrix}\\=&\begin{pmatrix}{{{3\times1+(-1)\times1+1\times2}}}&{{{3\times(-1)+(-1)\times1+1\times1}}}&{{{3\times0+(-1)\times1+1\times(-1)}}} \\{{{2\times1+2\times1+0\times2}}}&{{{2\times(-1)+2\times1+0\times1}}}&{{{2\times0+2\times1+0\times(-1)}}}\end{pmatrix}\\=&\begin{pmatrix}{{{4}}}&{{{-3}}}&{{{-2}}} \\{{{4}}}&{{{0}}}&{{{2}}}\end{pmatrix}.\end{aligned} $$

例3 求矩阵 $ A=\begin{pmatrix}-1&1\\ 2&-2\end{pmatrix} $与 $ B=\begin{pmatrix}2&1\\ -6&-3\end{pmatrix} $的乘积AB及BA.

 $$ \boldsymbol{A}\boldsymbol{B}=\begin{pmatrix}{{{-1}}}&{{{1}}} \\{{{2}}}&{{{-2}}}\end{pmatrix}\begin{pmatrix}{{{2}}}&{{{1}}} \\{{{-6}}}&{{{-3}}}\end{pmatrix}=\begin{pmatrix}{{{-8}}}&{{{-4}}} \\{{{16}}}&{{{8}}}\end{pmatrix}；\ \boldsymbol{B}\boldsymbol{A}=\begin{pmatrix}{{{2}}}&{{{1}}} \\{{{-6}}}&{{{-3}}}\end{pmatrix}\begin{pmatrix}{{{-1}}}&{{{1}}} \\{{{2}}}&{{{-2}}}\end{pmatrix}=\begin{pmatrix}{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}\end{pmatrix}. $$

在例2中，矩阵A是2×3矩阵，矩阵B是3×3矩阵，所以乘积AB有意义，而矩阵B与A却不能相乘。在例3中，虽然乘积AB与乘积BA都有意义，但是AB≠BA。在例3中还看到，尽管A≠O，B≠O，仍旧有BA=O。所以在做矩阵乘法时，我们要注意：

（1）矩阵乘法不满足交换律，即在一般情况下， $ AB \neq BA $；

（2）尽管矩阵A与B满足AB=O，但是得不出A=O或B=O的结论。但是，矩阵乘法仍满足下列运算规律（假设运算都是可行的）：

（1）结合律： $ (AB)C=A(BC) $;

（2）矩阵乘法对矩阵加法的分配律： $ A(B+C)=AB+AC $， $ (A+B)C=AC+BC $；

(3)  $ (kA)B = A(kB) = k(AB) $;

(4)  $ E_{m}A_{m\times n}=A_{m\times n}E_{n}=A_{m\times n} $;

(5)  $  \boldsymbol{O}_{m\times s}\boldsymbol{A}_{s\times n} = \boldsymbol{O}_{m\times n}  $;  $  A_{m\times s} \boldsymbol{O}_{s\times n} = \boldsymbol{O}_{m\times n}  $.

证明 这几个运算律的证明都是验证式的证明，在此我们只写出结合律的证明，而将其余证明留给读者.

设矩阵  $ A = (a_{ij}) $ 是一个  $ m \times s $ 矩阵，矩阵  $ B = (b_{ij}) $ 是一个  $ s \times p $ 矩阵，矩阵  $ C = (c_{ij}) $ 是一个  $ p \times n $ 矩阵。由矩阵乘法的定义知，矩阵  $ (A_{m \times s} B_{s \times p}) C_{p \times n} $ 与  $ A_{m \times s} (B_{s \times p} C_{p \times n}) $ 都有意义，且都是  $ m \times n $ 矩阵。由矩阵相等的定义，我们只需验证这两个矩阵在相应位置的元素相等即可。

矩阵  $ A_{m\times s}B_{s\times p} $ 中第 i 行元素为  $ \sum_{k=1}^{s}a_{ik}b_{k1} $， $ \sum_{k=1}^{s}a_{ik}b_{k2} $， $ \cdots $， $ \sum_{k=1}^{s}a_{ik}b_{kp} $，于是矩阵  $ (A_{m\times s}B_{s\times p})C_{p\times n} $ 中  $ (i,j) $ 元素为矩阵  $ A_{m\times s}B_{s\times p} $ 中第 i 行元素与矩阵  $ C_{p\times n} $ 中第 j 列对应元素  $ c_{1j} $， $ c_{2j} $， $ \cdots $， $ c_{pj} $ 乘积之和，即

 $$ \left(\sum_{k=1}^{s}a_{ik}b_{k1}\right)c_{1j}+\left(\sum_{k=1}^{s}a_{ik}b_{k2}\right)c_{2j}+\cdots+\left(\sum_{k=1}^{s}a_{ik}b_{kp}\right)c_{pj}=\sum_{t=1}^{p}\sum_{k=1}^{s}a_{ik}b_{kt}c_{tj}. $$

同理可以验证矩阵  $ A_{m\times s}(B_{s\times p}C_{p\times n}) $ 中  $ (i,j) $ 元素也是  $ \sum_{t=1}^{p}\sum_{k=1}^{s}a_{ik}b_{kt}c_{tj} $，所以矩阵乘法的结合律成立.

### 例4 设有线性方程组

 $$ \begin{cases}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}=b_{1},\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}=b_{2},\\\cdots\cdots\cdots\\a_{m1}x_{1}+a_{m2}x_{2}+\cdots+a_{mn}x_{n}=b_{m}.\end{cases} $$

矩阵  $ A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{pmatrix} $ 称为该线性方程组的系数矩阵. 令  $ \boldsymbol{x} = \begin{pmatrix} x_{1} \\ x_{2} \\ \vdots \\ x_{n} \end{pmatrix} $， $ \boldsymbol{\beta} = \begin{pmatrix} b_{1} \\ b_{2} \\ \vdots \\ b_{m} \end{pmatrix} $，

按公式(1-2)有

 $$ \begin{aligned}A\boldsymbol{x}&=\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{m1}&a_{m2}&\cdots&a_{mn}\end{pmatrix}\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix}=\begin{pmatrix}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}\\\cdots\cdots\cdots\cdots\\a_{m1}x_{1}+a_{m2}x_{2}+\cdots+a_{mn}x_{n}\end{pmatrix}.\end{aligned} $$

再根据矩阵相等的定义，该线性方程组可以用矩阵形式来表示： $ Ax=\beta $。

由于矩阵乘法满足结合律，我们可以定义方阵的方幂如下：

 $$ \boldsymbol{A}^{k}=\underbrace{\boldsymbol{A}\boldsymbol{A}\cdots\boldsymbol{A}}_{k 个 }( 这里 k 为正整数 ). $$

并且规定：对非零方阵 A，有  $ A^{0}=E $.

方阵的方幂满足以下运算规律（这里 k，l 均为非负整数）：

 $$ \boldsymbol{A}^{k}\boldsymbol{A}^{l}=\boldsymbol{A}^{k+l}\;;\quad(\boldsymbol{A}^{k})^{l}=\boldsymbol{A}^{k l}. $$

由于矩阵乘法不满足交换律，一般来讲 $ (AB)^{k} \neq A^{k} B^{k} $， $ (A + B)^{2} \neq A^{2} + 2AB + B^{2} $。只有当A与B可交换（即AB=BA）时，公式

 $$ \left(\boldsymbol{A}\boldsymbol{B}\right)^{k}=\boldsymbol{A}^{k}\boldsymbol{B}^{k},\quad\left(\boldsymbol{A}+\boldsymbol{B}\right)^{2}=\boldsymbol{A}^{2}+2\boldsymbol{A}\boldsymbol{B}+\boldsymbol{B}^{2},\quad\left(\boldsymbol{A}+\boldsymbol{B}\right)\left(\boldsymbol{A}-\boldsymbol{B}\right)=\boldsymbol{A}^{2}-\boldsymbol{B}^{2} $$

等才成立.

例5 设矩阵  $ A=\begin{pmatrix}0&1&0\\0&0&1\\0&0&0\end{pmatrix} $，求  $ A^{2} $ 和  $ A^{3} $.

解  $ A^{2}=\begin{pmatrix}0&1&0\\0&0&1\\0&0&0\end{pmatrix}\begin{pmatrix}0&1&0\\0&0&1\\0&0&0\end{pmatrix}=\begin{pmatrix}0&0&1\\0&0&0\\0&0&0\end{pmatrix} $

 $$ \boldsymbol{A}^{3}=\boldsymbol{A}^{2}\boldsymbol{A}=\begin{pmatrix}{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}\begin{pmatrix}{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}=\begin{pmatrix}{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}. $$

## 四、矩阵的转置

定义 6 设  $ m \times n $ 矩阵  $ A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{pmatrix} $，把矩阵 A 的行换成同序数的列，得到的  $ n \times m $ 矩阵称为矩阵 A 的转置矩阵，记为  $ A^{T} $，即

 $$ \boldsymbol{A}^{\mathrm{T}}=\begin{pmatrix}a_{11}&a_{21}&\cdots&a_{m1}\\a_{12}&a_{22}&\cdots&a_{m2}\\\vdots&\vdots&\ddots&\vdots\\a_{1n}&a_{2n}&\cdots&a_{nm}\end{pmatrix}. $$

矩阵的转置满足下面的运算规律（这里 k 为常数，A 与 B 为同型矩阵）：

(1)  $ (A^{\mathrm{T}})^{\mathrm{T}} = A $;

(2)  $ (A+B)^{\mathrm{T}}=A^{\mathrm{T}}+B^{\mathrm{T}} $;

(3)  $ (AB)^{\mathrm{T}} = B^{\mathrm{T}}A^{\mathrm{T}} $;

(4)  $ (kA)^{\mathrm{T}} = kA^{\mathrm{T}} $

证明 这些性质的证明仍属验证式的证明，可仿照矩阵乘法性质的证明，留给读者自己验证.

例6 设矩阵  $ A=\begin{pmatrix}2&-1&3\\1&1&1\end{pmatrix} $， $ B=\begin{pmatrix}1&-1&\\0&2&\\-1&1&\end{pmatrix} $，求  $ (\boldsymbol{A}\boldsymbol{B})^{\mathrm{T}} $.

解法一

 $$ \boldsymbol{A}\boldsymbol{B}=\begin{pmatrix}2&-1&3\\1&1&1\end{pmatrix}\begin{pmatrix}1&-1\\0&2\\-1&1\end{pmatrix}=\begin{pmatrix}-1&-1\\0&2\end{pmatrix}, $$

所以 $ (\boldsymbol{A}\boldsymbol{B})^{\mathrm{T}}=\begin{pmatrix}-1&0\\-1&2\end{pmatrix}. $

解法二

 $$ \left(\boldsymbol{A}\boldsymbol{B}\right)^{\mathrm{T}}=\boldsymbol{B}^{\mathrm{T}}\boldsymbol{A}^{\mathrm{T}}=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}} \\{{{-1}}}&{{{2}}}&{{{1}}}\end{pmatrix}\begin{pmatrix}{{{2}}}&{{{1}}} \\{{{-1}}}&{{{1}}} \\{{{3}}}&{{{1}}}\end{pmatrix}=\begin{pmatrix}{{{-1}}}&{{{0}}} \\{{{-1}}}&{{{2}}}\end{pmatrix}. $$

定义 7 n 阶方阵 A 如果满足  $ A^{T} = A $，则称 A 为对称矩阵，如果满足  $ A^{T} = -A $，则称 A 为反对称矩阵.

由定义可知，如果 $n$ 阶方阵 $\boldsymbol{A}=(a_{ij})$ 是对称矩阵，则 $a_{ij}=a_{ji}(i\neq j;\,i,\,j=1,\,2,\,\cdots,$ $n)$。如果 $n$ 阶方阵 $\boldsymbol{A}=(a_{ij})$ 是反对称矩阵，则 $a_{ij}=-a_{ji}(i\neq j;\,i,\,j=1,\,2,\,\cdots,\,n)$，且 $a_{ii}=0(i=1,\,2,\,\cdots,\,n)$。

例7 设矩阵A是 $ m \times n $矩阵，证明： $ A^{T}A $和 $ AA^{T} $都是对称矩阵.

证明 因为

 $$ \left(\boldsymbol{A}^{\mathrm{T}}\boldsymbol{A}\right)^{\mathrm{T}}=\boldsymbol{A}^{\mathrm{T}}\left(\boldsymbol{A}^{\mathrm{T}}\right)^{\mathrm{T}}=\boldsymbol{A}^{\mathrm{T}}\boldsymbol{A},\quad\left(\boldsymbol{A}\boldsymbol{A}^{\mathrm{T}}\right)^{\mathrm{T}}=\left(\boldsymbol{A}^{\mathrm{T}}\right)^{\mathrm{T}}\boldsymbol{A}^{\mathrm{T}}=\boldsymbol{A}\boldsymbol{A}^{\mathrm{T}} $$

所以  $ A^{T}A $ 和  $ AA^{T} $ 都是对称矩阵.

### 习题1-1

1. 设  $ \widetilde{A} = \begin{pmatrix} 1 & 1 & 2 & 2 & 1 \\ 2 & 1 & 3 & -1 & 3 \\ 1 & -1 & 1 & 4 & 5 \end{pmatrix} $，写出  $ \widetilde{A} $ 为增广矩阵的线性方程组.

2. 设等式 $ \begin{pmatrix}1&2\\a&b\end{pmatrix}+\begin{pmatrix}x&y\\3&4\end{pmatrix}=\begin{pmatrix}3&-4\\7&1\end{pmatrix} $成立，求  $ a, b, x, y $.

3. 设  $ A = \begin{pmatrix} 3 & -1 & 2 \\ 2 & 1 & -2 \end{pmatrix} $， $ B = \begin{pmatrix} 1 & 5 & 1 \\ -2 & -1 & 0 \end{pmatrix} $，计算

(1)  $ A+2B $, 3A-B; (2)  $ AB^{T} $ 和  $ A^{T}B $.

4. 设矩阵  $ A = \begin{pmatrix} 1 & -3 \\ 1 & 2 \end{pmatrix} $， $ B = \begin{pmatrix} 2 & 0 \\ 3 & -1 \end{pmatrix} $，求  $ (A + B)(A - B) $.

5. 设矩阵  $ A = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 2 \\ 0 & 2 & 1 \end{pmatrix} $， $ B = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 5 \\ 0 & 5 & 2 \end{pmatrix} $，求  $ A^{2} + 3A - 2B $.

6. 计算下列各题：

(1) $ \begin{pmatrix}1\\2\\3\end{pmatrix}(3,-2,1); $ (2) $ (2,3,1)\begin{pmatrix}1\\-1\\2\end{pmatrix}; $

(3) $ (x,y,z)\begin{pmatrix}1&1&-1\\1&2&1\\-1&1&0\end{pmatrix}\begin{pmatrix}x\\y\\z\end{pmatrix}; $ (4) $ \begin{pmatrix}1&1&0\\0&1&1\\0&0&1\end{pmatrix} $.

7. 设  $ A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} $，求所有与 A 可交换的矩阵.

8. 设 A 是 n 阶矩阵，证明  $ A^{T} + A $ 是对称矩阵， $ A^{T} - A $ 是反对称矩阵.

9. 设矩阵  $ A = \begin{pmatrix} \lambda_{1} & & \\ & \lambda_{2} & \\ & & \ddots & \\ && \lambda_{n} \end{pmatrix} $，求  $ A^{n} $.

### [课前导读]

当矩阵的行数和列数较高时，为了证明或计算的方便，常把矩阵分成若干小块，把每个小块当作“数”来处理，这便是矩阵的分块。这一节我们将讨论矩阵的分块方式和分块矩阵的计算。在学习这一节之前，需要读者熟练掌握矩阵的线性运算、矩阵乘法和矩阵的转置运算。

## 一、分块矩阵的概念

对于行数和列数较高的矩阵 A，运算时常用一些横线和竖线将矩阵 A 分划成若干个小矩阵，每一个小矩阵称为 A 的子块，以子块为元素的形式上的矩阵称为分块矩阵。一个矩阵的分块方式会有很多种，例如，将  $ 4 \times 5 $ 矩阵

 $$ \begin{aligned}&\boldsymbol{A}=\begin{pmatrix}a_{11}&a_{12}&a_{13}&a_{14}&a_{15}\\a_{21}&a_{22}&a_{23}&a_{24}&a_{25}\\a_{31}&a_{32}&a_{33}&a_{34}&a_{35}\\a_{41}&a_{42}&a_{43}&a_{44}&a_{45}\end{pmatrix}\end{aligned} $$

划分成如下三种形式：

(1)

 $$ \begin{aligned}\boldsymbol{A}&=\begin{pmatrix}a_{11}&a_{12}&a_{13}&a_{14}&a_{15}\\a_{21}&a_{22}&a_{23}&a_{24}&a_{25}\\a_{31}&a_{32}&a_{33}&a_{34}&a_{35}\\a_{41}&a_{42}&a_{43}&a_{44}&a_{45}\end{pmatrix}；(2)\boldsymbol{A}=\begin{pmatrix}a_{11}&a_{12}&a_{13}&a_{14}&a_{15}\\a_{21}&a_{22}&a_{23}&a_{24}&a_{25}\\a_{31}&a_{32}&a_{33}&a_{34}&a_{35}\\a_{41}&a_{42}&a_{43}&a_{44}&a_{45}\end{pmatrix}；\end{aligned} $$

(3)

 $$ \begin{aligned}\boldsymbol{A}&=\begin{pmatrix}a_{11}&a_{12}&a_{13}&a_{14}&a_{15}\\a_{21}&a_{22}&a_{23}&a_{24}&a_{25}\\a_{31}&a_{32}&a_{33}&a_{34}&a_{35}\\a_{41}&a_{42}&a_{43}&a_{44}&a_{45}\end{pmatrix}.\end{aligned} $$

按(1)的分块，我们可以记为

 $$ \boldsymbol{A}=\begin{pmatrix}\boldsymbol{A}_{11}&\boldsymbol{A}_{12}\\ \\ \boldsymbol{A}_{21}&\boldsymbol{A}_{22}\end{pmatrix}, $$

其中

 $$ \boldsymbol{A}_{11}=\begin{pmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{pmatrix},\quad\boldsymbol{A}_{12}=\begin{pmatrix}a_{13}&a_{14}&a_{15}\\a_{23}&a_{24}&a_{25}\end{pmatrix},\quad\boldsymbol{A}_{21}=\begin{pmatrix}a_{31}&a_{32}\\a_{41}&a_{42}\end{pmatrix},\quad\boldsymbol{A}_{22}=\begin{pmatrix}a_{33}&a_{34}&a_{35}\\a_{43}&a_{44}&a_{45}\end{pmatrix}. $$

按(2)的分块，我们可以记为

 $$ \begin{aligned}\boldsymbol{A}&=\begin{pmatrix}\boldsymbol{A}_{11}&\boldsymbol{A}_{12}&\boldsymbol{A}_{13}\\\boldsymbol{A}_{21}&\boldsymbol{A}_{22}&\boldsymbol{A}_{23}\\\boldsymbol{A}_{31}&\boldsymbol{A}_{32}&\boldsymbol{A}_{33}\end{pmatrix},\end{aligned} $$

其中

 $$ \boldsymbol{A}_{11}=\left(a_{11},a_{12}\right),\\\boldsymbol{A}_{12}=\left(a_{13},a_{14}\right),\\\boldsymbol{A}_{13}=a_{15}, $$

 $$ \boldsymbol{A}_{21}=\begin{pmatrix}a_{21}&a_{22}\\a_{31}&a_{32}\end{pmatrix},\quad\boldsymbol{A}_{22}=\begin{pmatrix}a_{23}&a_{24}\\a_{33}&a_{34}\end{pmatrix},\quad\boldsymbol{A}_{23}=\begin{pmatrix}a_{25}\\a_{35}\end{pmatrix}, $$

 $$ \mathbf{A}_{31}=\left(a_{41},a_{42}\right),A_{32}=\left(a_{43},a_{44}\right),A_{33}=a_{45}. $$

按(3)的分块，我们可以记为

 $$ \boldsymbol{A}=\left(\boldsymbol{A}_{11},\boldsymbol{A}_{12},\boldsymbol{A}_{13},\boldsymbol{A}_{14},\boldsymbol{A}_{15}\right), $$

其中

 $$ \begin{aligned}\boldsymbol{A}_{11}&=\begin{pmatrix}a_{11}\\a_{21}\\a_{31}\\a_{41}\end{pmatrix},\boldsymbol{A}_{12}=\begin{pmatrix}a_{12}\\a_{22}\\a_{32}\\a_{42}\end{pmatrix},\boldsymbol{A}_{13}=\begin{pmatrix}a_{13}\\a_{23}\\a_{33}\\a_{43}\end{pmatrix},\boldsymbol{A}_{14}=\begin{pmatrix}a_{14}\\a_{24}\\a_{34}\\a_{44}\end{pmatrix},\boldsymbol{A}_{15}=\begin{pmatrix}a_{15}\\a_{25}\\a_{35}\\a_{45}\end{pmatrix}.\end{aligned} $$

第三种分块方式称为矩阵的按列分块. 类似地，也有矩阵的按行分块，分块矩阵请读者写出.

对于线性方程组

 $$ \begin{cases}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}=b_{1},\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}=b_{2},\\\cdots\cdots\cdots\\a_{m1}x_{1}+a_{m2}x_{2}+\cdots+a_{mn}x_{n}=b_{m},\end{cases} $$

其系数矩阵

 $$ \boldsymbol{A}=\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{m1}&a_{m2}&\cdots&a_{mn}\end{pmatrix} $$

按列分块可写成

 $$ \boldsymbol{A}=(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\cdots,\boldsymbol{\alpha}_{n}), $$

其中， $ \alpha_{j}=\begin{pmatrix}a_{1j}\\a_{2j}\\\vdots\\a_{mj}\end{pmatrix} $表示A的第j列. 记 $ \beta=\begin{pmatrix}b_{1}\\b_{2}\\\vdots\\b_{m}\end{pmatrix} $，则该线性方程组的增广矩阵

 $$ \widetilde{\boldsymbol{A}}=\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}&b_{1}\\a_{21}&a_{22}&\cdots&a_{2n}&b_{2}\\\vdots&\vdots&\ddots&\vdots&\vdots\\a_{m1}&a_{m2}&\cdots&a_{mn}&b_{m}\end{pmatrix} $$

按分块矩阵的记法，可记为

 $$ \widetilde{A}=\left(A\mid\beta\right),\  或 \widetilde{A}=\left(A,\ \beta\right)=\left(\alpha_{1},\ \alpha_{2},\ \cdots,\ \alpha_{n},\ \beta\right). $$

## 二、分块矩阵的运算

分块矩阵的运算规则与普通矩阵的运算规则相类似，不同的计算方式，分块的原则不同，下面分情况讨论.

（1）分块矩阵加(减)运算：设A、B都是 $ m \times n $矩阵，对两个矩阵的行和列采用相同的分块方式，不妨设

 $$ \begin{aligned}\boldsymbol{A}&=\begin{pmatrix}A_{11}&A_{12}&\cdots&A_{1t}\\A_{21}&A_{22}&\cdots&A_{2t}\\\vdots&\vdots&\ddots&\vdots\\A_{s1}&A_{s2}&\cdots&A_{st}\end{pmatrix},\quad\boldsymbol{B}=\begin{pmatrix}\boldsymbol{B}_{11}&\boldsymbol{B}_{12}&\cdots&\boldsymbol{B}_{1t}\\\boldsymbol{B}_{21}&\boldsymbol{B}_{22}&\cdots&\boldsymbol{B}_{2t}\\\vdots&\vdots&\ddots&\vdots\\\boldsymbol{B}_{s1}&\boldsymbol{B}_{s2}&\cdots&\boldsymbol{B}_{st}\end{pmatrix},\end{aligned} $$

其中  $ A_{ij} $ 和  $ B_{ij} $ 的行数相同、列数相同，则有

 $$ \begin{aligned}{A\pm B}&{{}=\left(\begin{matrix}{A_{11}\pm B_{11}}&{A_{12}\pm B_{12}}&{\cdots}&{A_{1t}\pm B_{1t}}\\ {A_{21}\pm B_{21}}&{A_{22}\pm B_{22}}&{\cdots}&{A_{2t}\pm B_{2t}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {A_{s1}\pm B_{s1}}&{A_{s2}\pm B_{s2}}&{\cdots}&{A_{s t}\pm B_{s t}}\\ \end{matrix}\right).}\\ \end{aligned} $$

例1 求矩阵 $ A=\begin{pmatrix}1&0&0&0\\0&0&0&0\\2&0&0&0\\1&1&0&3\end{pmatrix} $与 $ B=\begin{pmatrix}-2&0&1&0\\0&-1&0&1\\1&1&-4&2\\2&1&3&-1\end{pmatrix} $的和 $ A+B $.

解 因为矩阵 A 与 B 都是  $ 4 \times 4 $ 的矩阵，为了方便计算，我们用矩阵的分块来求  $ A + B $。先根据矩阵 A 的特点划分矩阵 A，再根据矩阵加法的分块原则来划分矩阵 B。将矩阵 A 与 B 写成分块矩阵如下：

 $$ \boldsymbol{A}=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}} \\{{{2}}}&{{{0}}}&{{{0}}}&{{{0}}} \\{{{\hline1}}}&{{{1}}}&{{{0}}}&{{{3}}}\end{pmatrix}=\begin{pmatrix}{{{\boldsymbol{A}_{1}}}}&{{{\boldsymbol{O}}}} \\{{{\boldsymbol{A}_{2}}}}&{{{\boldsymbol{A}_{3}}}}\end{pmatrix},\quad\boldsymbol{B}=\begin{pmatrix}{{{-2}}}&{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{-1}}}&{{{0}}}&{{{1}}} \\{{{\hline1}}}&{{{1}}}&{{{-4}}}&{{{2}}} \\{{{\hline2}}}&{{{-1}}}&{{{0}}}&{{{-3}}}\end{pmatrix}=\begin{pmatrix}{{{\boldsymbol{B}_{1}}}}&{{{\boldsymbol{B}_{2}}}} \\{{{\boldsymbol{B}_{3}}}}&{{{\boldsymbol{B}_{4}}}}\end{pmatrix} $$

于是，

 $$ \boldsymbol{A}+\boldsymbol{B}=\begin{pmatrix}\boldsymbol{A}_{1}&\boldsymbol{O}\\ \boldsymbol{A}_{2}&\boldsymbol{A}_{3}\end{pmatrix}+\begin{pmatrix}\boldsymbol{B}_{1}&\boldsymbol{B}_{2}\\ \boldsymbol{B}_{3}&\boldsymbol{B}_{4}\end{pmatrix}=\begin{pmatrix}\boldsymbol{A}_{1}+\boldsymbol{B}_{1}&\boldsymbol{O}+\boldsymbol{B}_{2}\\ \boldsymbol{A}_{2}+\boldsymbol{B}_{3}&\boldsymbol{A}_{3}+\boldsymbol{B}_{4}\end{pmatrix}=\begin{pmatrix}\boldsymbol{A}_{1}+\boldsymbol{B}_{1}&\boldsymbol{B}_{2}\\ \boldsymbol{A}_{2}+\boldsymbol{B}_{3}&\boldsymbol{A}_{3}+\boldsymbol{B}_{4}\end{pmatrix}. $$

而

 $$ \boldsymbol{A}_{1}+\boldsymbol{B}_{1}=\left(\begin{aligned}1\\ 0\\ 2\end{aligned}\right)+\left(\begin{aligned}-2\\ 0\\ 1\end{aligned}\right)=\left(\begin{aligned}-1\\ 0\\ 3\end{aligned}\right),\quad\boldsymbol{A}_{2}+\boldsymbol{B}_{3}=1+2=3, $$

 $$ \boldsymbol{A}_{3}+\boldsymbol{B}_{4}=\left(1,0,3\right)+\left(-1,0,-3\right)=\left(0,0,0\right), $$

所以

 $$ \boldsymbol{A}+\boldsymbol{B}=\begin{pmatrix}{{{-1}}}&{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{-1}}}&{{{0}}}&{{{1}}} \\{{{3}}}&{{{1}}}&{{{-4}}}&{{{2}}} \\{{{\hline3}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}. $$

（2）分块矩阵的数乘运算：矩阵的分块方式没有特别规定，对任意的分块

 $$ \begin{aligned}\boldsymbol{A}&=\begin{pmatrix}\boldsymbol{A}_{11}&\boldsymbol{A}_{12}&\cdots&\boldsymbol{A}_{1t}\\\boldsymbol{A}_{21}&\boldsymbol{A}_{22}&\cdots&\boldsymbol{A}_{2t}\\\vdots&\vdots&\ddots&\vdots\\\boldsymbol{A}_{s1}&\boldsymbol{A}_{s2}&\cdots&\boldsymbol{A}_{st}\end{pmatrix},\end{aligned} $$

都有

 $$ \begin{aligned}{k\boldsymbol{A}=\left(\begin{matrix}{k\boldsymbol{A}_{11}}&{k\boldsymbol{A}_{12}}&{\cdots}&{k\boldsymbol{A}_{1t}}\\ {k\boldsymbol{A}_{21}}&{k\boldsymbol{A}_{22}}&{\cdots}&{k\boldsymbol{A}_{2t}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {k\boldsymbol{A}_{s1}}&{k\boldsymbol{A}_{s2}}&{\cdots}&{k\boldsymbol{A}_{s t}}\\ \end{matrix}\right).}\\ \end{aligned} $$

所以在矩阵的数乘运算中，对矩阵的分块可以根据矩阵本身的特点而定.

（3）分块矩阵的乘法：设A为 $ m\times s $矩阵，B为 $ s\times n $矩阵，要求矩阵A的列分块方式与矩阵B的行分块方式保持一致，而对矩阵A的行分块方式及矩阵B的列分块方式没有任何要求和限制.不妨设

 $$ \begin{aligned}\boldsymbol{A}&=\begin{pmatrix}\boldsymbol{A}_{11}&\boldsymbol{A}_{12}&\cdots&\boldsymbol{A}_{1k}\\\boldsymbol{A}_{21}&\boldsymbol{A}_{22}&\cdots&\boldsymbol{A}_{2k}\\\vdots&\vdots&\ddots&\vdots\\\boldsymbol{A}_{t1}&\boldsymbol{A}_{t2}&\cdots&\boldsymbol{A}_{tk}\end{pmatrix},\quad\boldsymbol{B}=\begin{pmatrix}\boldsymbol{B}_{11}&\boldsymbol{B}_{12}&\cdots&\boldsymbol{B}_{1u}\\\boldsymbol{B}_{21}&\boldsymbol{B}_{22}&\cdots&\boldsymbol{B}_{2u}\\\vdots&\vdots&\ddots&\vdots\\\boldsymbol{B}_{k1}&\boldsymbol{B}_{k2}&\cdots&\boldsymbol{B}_{ku}\end{pmatrix},\end{aligned} $$

其中  $ A_{i1} $， $ A_{i2} $， $ \cdots $， $ A_{ik} $ 的列数分别等于  $ B_{1j} $， $ B_{2j} $， $ \cdots $， $ B_{kj} $ 的行数，则

 $$ \begin{aligned}AB=\begin{pmatrix}C_{11}&C_{12}&\cdots&C_{1u}\\C_{21}&C_{22}&\cdots&C_{2u}\\\vdots&\vdots&\ddots&\vdots\\C_{t1}&C_{t2}&\cdots&C_{tu}\end{pmatrix},\end{aligned} $$

其中

 $$ \boldsymbol{C}_{ij}=\sum_{t=1}^{k}\boldsymbol{A}_{it}\boldsymbol{B}_{tj}=\boldsymbol{A}_{i1}\boldsymbol{B}_{1j}+\boldsymbol{A}_{i2}\boldsymbol{B}_{2j}+\cdots+\boldsymbol{A}_{ik}\boldsymbol{B}_{kj}. $$

例2 设 $ A=\begin{pmatrix}1&0&1&0\\-1&1&0&1\\-1&0&0&0\\0&-1&0&0\end{pmatrix} $， $ B=\begin{pmatrix}1&2&0&0\\-2&1&0&0\\1&0&0&-1\\0&1&-1&0\end{pmatrix} $，求AB.

解 把矩阵 A 与 B 进行如下分块：

 $$ \boldsymbol{A}=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{1}}}&{{{0}}} \\{{{-1}}}&{{{1}}}&{{{0}}}&{{{1}}} \\{{{\hline-1}}}&{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{-1}}}&{{{0}}}&{{{0}}}\end{pmatrix}=\begin{pmatrix}{{{\boldsymbol{A}_{11}}}}&{{{\boldsymbol{E}}}} \\{{{-\boldsymbol{E}}}}&{{{\boldsymbol{O}}}}\end{pmatrix},\quad\boldsymbol{B}=\begin{pmatrix}{{{1}}}&{{{2}}}&{{{0}}}&{{{0}}} \\{{{-2}}}&{{{1}}}&{{{0}}}&{{{0}}} \\{{{\hline1}}}&{{{0}}}&{{{0}}}&{{{-1}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{0}}}\end{pmatrix}=\begin{pmatrix}{{{\boldsymbol{B}_{11}}}}&{{{\boldsymbol{O}}}} \\{{{\boldsymbol{E}}}}&{{{\boldsymbol{B}_{22}}}}\end{pmatrix}. $$

 $$ \boldsymbol{A}\boldsymbol{B}=\left(\begin{matrix}{\boldsymbol{A}_{11}}&{\boldsymbol{E}}\\ {}&{}\\ {-\boldsymbol{E}}&{\boldsymbol{O}}\\ \end{matrix}\right)\left(\begin{matrix}{\boldsymbol{B}_{11}}&{\boldsymbol{O}}\\ {}&{}\\ {\boldsymbol{E}}&{\boldsymbol{B}_{22}}\\ \end{matrix}\right)=\left(\begin{matrix}{\boldsymbol{A}_{11}\boldsymbol{B}_{11}+\boldsymbol{E}^{2}}&{\boldsymbol{A}_{11}\boldsymbol{O}+\boldsymbol{E}\boldsymbol{B}_{22}}\\ {}&{}\\ {-\boldsymbol{E}\boldsymbol{B}_{11}+\boldsymbol{O}\boldsymbol{E}}&{-\boldsymbol{E}\boldsymbol{O}+\boldsymbol{O}\boldsymbol{B}_{22}}\\ \end{matrix}\right)=\left(\begin{matrix}{\boldsymbol{A}_{11}\boldsymbol{B}_{11}+\boldsymbol{E}}&{\boldsymbol{B}_{22}}\\ {}&{}\\ {-\boldsymbol{B}_{11}}&{\boldsymbol{O}}\\ \end{matrix}\right). $$

而

 $$ \boldsymbol{A}_{11}\boldsymbol{B}_{11}+\boldsymbol{E}=\begin{pmatrix}1&0\\ -1&1\end{pmatrix}\begin{pmatrix}1&2\\ -2&1\end{pmatrix}+\begin{pmatrix}1&0\\ 0&1\end{pmatrix}=\begin{pmatrix}1&2\\ -3&-1\end{pmatrix}+\begin{pmatrix}1&0\\ 0&1\end{pmatrix}=\begin{pmatrix}2&2\\ -3&0\end{pmatrix},\quad-\boldsymbol{B}_{11}=\begin{pmatrix}-1&-2\\ 2&-1\end{pmatrix}, $$

所以

 $$ \boldsymbol{A}\boldsymbol{B}=\begin{pmatrix}2&2&0&-1\\-3&0&-1&0\\\hline-1&-2&0&0\\2&-1&0&0\end{pmatrix}. $$

（4）分块矩阵的转置：设  $ A=\begin{pmatrix}A_{11}&A_{12}&\cdots&A_{1k}\\A_{21}&A_{22}&\cdots&A_{2k}\\\vdots&\vdots&\ddots&\vdots\\A_{t1}&A_{t2}&\cdots&A_{tk}\end{pmatrix} $，则  $ A^{T}=\begin{pmatrix}A_{11}^{T}&A_{21}^{T}&\cdots&A_{t1}^{T}\\A_{12}^{T}&A_{22}^{T}&\cdots&A_{t2}^{T}\\\vdots&\vdots&\ddots&\vdots\\A_{1k}^{T}&A_{2k}^{T}&\cdots&A_{tk}^{T}\end{pmatrix} $

（5）分块对角阵：设 A 是 n 阶方阵，若 A 的分块矩阵只有在主对角线上有非零子块，且这些非零子块都是方阵，而其余子块都是零矩阵，即

 $$ \boldsymbol{A}=\begin{pmatrix}\boldsymbol{A}_{1}&\boldsymbol{O}&\cdots&\boldsymbol{O}\\ \boldsymbol{O}&\boldsymbol{A}_{2}&\cdots&\boldsymbol{O}\\ \vdots&\vdots&\ddots&\vdots\\ \boldsymbol{O}&\boldsymbol{O}&\cdots&\boldsymbol{A}_{t}\end{pmatrix}, $$

其中  $ A_{i}(i=1,2,\cdots,t) $ 都是方阵，这样的分块阵称为分块对角阵.

例3 设  $ \boldsymbol{e}_{i}=(0,\cdots,0,1,0,\cdots,0)^{\mathrm{T}} $ 为第 i 个分量为 1 而其余元素全为 0 的列向量，则 n 阶单位矩阵可以分块为  $ \boldsymbol{E}_{n}=(\boldsymbol{e}_{1},\boldsymbol{e}_{2},\cdots,\boldsymbol{e}_{n}) $ 。将矩阵 A 按列分块为  $ \boldsymbol{A}=(\boldsymbol{A}_{1},\boldsymbol{A}_{2},\cdots,\boldsymbol{A}_{n}) $ ，其中  $ A_{k} $ 为矩阵 A 的第 k 个列向量，则有

 $$ (\boldsymbol{A}_{1},\boldsymbol{A}_{2},\cdots,\boldsymbol{A}_{n})=\boldsymbol{A}=\boldsymbol{A}\boldsymbol{E}=\boldsymbol{A}(\boldsymbol{e}_{1},\boldsymbol{e}_{2},\cdots,\boldsymbol{e}_{n})=(\boldsymbol{A}\boldsymbol{e}_{1},\boldsymbol{A}\boldsymbol{e}_{2},\cdots,\boldsymbol{A}\boldsymbol{e}_{n}). $$

从而有

 $$ \boldsymbol{A}\boldsymbol{e}_{k}=\boldsymbol{A}_{k}(k=1,2,\cdots,n), $$

即  $ A \boldsymbol{e}_k $ 为矩阵  $ A $ 的第  $ k $ 列. 同理,  $ \boldsymbol{e}_k^\mathrm{T} A $ 是矩阵  $ A $ 的第  $ k $ 行. 易知  $ \boldsymbol{e}_k^\mathrm{T} A \boldsymbol{e}_l = a_{kl} $ 是  $ A $ 的  $ (k, l) $ 元素.

例4 设  $ A $ 是  $ m \times n $ 矩阵，如果对任意的  $ n \times 1 $ 矩阵  $ \alpha $ 都有  $ A\alpha = O $，证明  $ A = O $。

证明 由矩阵  $ \alpha $ 的任意性，可选取  $ \alpha $ 分别等于  $ e_{i}(j=1,2,\cdots,n) $，根据例3则有

 $$ \boldsymbol{A}\boldsymbol{\alpha}=\boldsymbol{A}\boldsymbol{e}_{j}=\boldsymbol{A}_{j}=\boldsymbol{O}(j=1,2,\cdots,n). $$

所以A=0.

### 习题1-2

1. 设  $ A = \begin{pmatrix} 3 & 1 & 0 & 0 \\ 2 & 1 & 0 & 0 \\ 0 & 0 & 1 & 4 \\ 0 & 0 & 2 & 5 \end{pmatrix} $， $ B = \begin{pmatrix} -1 & 0 & 1 & 0 \\ 0 & -1 & 0 & 1 \\ 3 & 0 & 2 & 1 \\ 1 & -1 & 1 & 2 \end{pmatrix} $， $ C = \begin{pmatrix} 2 & 4 & 0 & 0 \\ 1 & 3 & 0 & 0 \\ 0 & 0 & 3 & 1 \\ 0 & 0 & 0 & 2 \end{pmatrix} $，求 AC 及  $ AB - B^{T} A $.

2. 设 A 是一个 3 阶方阵，矩阵  $ B = \begin{pmatrix} \lambda_{1} & & \\ & \lambda_{2} & \\ & & \lambda_{3} \end{pmatrix} $，利用分块矩阵的乘法求 AB.

3. 设 $n$ 阶方阵 $A = \begin{pmatrix} \boldsymbol{O} & \boldsymbol{E}_{n-1} \\ 1 & \boldsymbol{O} \end{pmatrix}$，其中 $\boldsymbol{E}_{n-1}$ 表示 $n-1$ 阶单位阵，证明：$\boldsymbol{A}^k = \begin{pmatrix} \boldsymbol{O} & \boldsymbol{E}_{n-k} \\ \boldsymbol{E}_k & \boldsymbol{O} \end{pmatrix}$ $k=1, 2, \cdots, n-1, A^n = \boldsymbol{E}_n$.

4. 设  $ A_1, A_2, \cdots, A_s $ 分别是  $ n_i $（ $ i = 1, 2, \cdots, s $）阶方阵，分块对角阵

 $ D = \begin{pmatrix} A_1 & O & \cdots & O \\ O & A_2 & \cdots & O \\ \vdots & \vdots & \ddots & \vdots \\ O & O & \cdots & A_s \end{pmatrix} $，求  $ D^k $，其中  $ k $ 是正整数.

### [课前导读]

本节通过高斯消元法解线性方程组，引入矩阵的初等行变换，并给出矩阵的初等变换、阶梯形矩阵、行最简形矩阵、矩阵等价等概念。最后，我们利用矩阵的初等行变换来求解线性方程组。在学习本节之前，需要读者回忆消元法解线性方程组的相关知识。当然，正文中会详细给出如何用消元法解线性方程组。

## 一、矩阵的初等变换

在中学时我们就学过高斯消元法解线性方程组，简单地说，就是通过方程组中方程之间的运算，把一些方程中的未知量消去，从而得到方程组的解.

下面，我们用高斯消元法来解一个线性方程组。由于线性方程组与它的增广矩阵有着对应关系，为了了解在求解过程中线性方程组的增广矩阵的变化，我们把在消元过程中出现的线性方程组的增广矩阵写在该方程组的右边。

矩阵的初等变换

例 1 求解线性方程组

 $$ \left\{\begin{aligned}2x_{1}+x_{2}&=3,\\ x_{1}-x_{2}+x_{3}&=4,\\ 2x_{1}+x_{2}-x_{3}&=-1.\end{aligned}\right. $$

解

线性方程组

 $$ \left\{\begin{aligned}2x_{1}&+x_{2}&=3,\\ x_{1}&-x_{2}+x_{3}&=4,\\ 2x_{1}&+x_{2}-x_{3}&=-1,\end{aligned}\right. $$

对应的增广矩阵

交换方程组的第一个方程和第二个方程

 $$ \begin{pmatrix}{{{2}}}&{{{1}}}&{{{0}}}&{{{3}}} \\{{{1}}}&{{{-1}}}&{{{1}}}&{{{4}}} \\{{{2}}}&{{{1}}}&{{{-1}}}&{{{-1}}}\end{pmatrix}. $$

(1)

 $$ \left\{\begin{aligned}x_{1}-x_{2}+x_{3}&=4,\\ 2x_{1}+x_{2}&=3,\\ 2x_{1}+x_{2}-x_{3}&=-1,\end{aligned}\right. $$

对应的增广矩阵正好是交换第一行和第二行

把方程组的第一个方程乘以-2加到第二个方程和第三个方程上

 $$ \begin{pmatrix}{{{1}}}&{{{-1}}}&{{{1}}}&{{{4}}} \\{{{2}}}&{{{1}}}&{{{0}}}&{{{3}}} \\{{{2}}}&{{{1}}}&{{{-1}}}&{{{-1}}}\end{pmatrix}. $$

(2)

对应的增广矩阵正好是把第一行的每个元素乘以-2分别加到第二行、第三行对应位置的元素上

 $$ \left\{\begin{aligned}x_{1}-x_{2}+&x_{3}=4,\\ 3x_{2}-2x_{3}&=-5,\\ 3x_{2}-3x_{3}&=-9,\end{aligned}\right. $$

 $$ \begin{pmatrix}{{{1}}}&{{{-1}}}&{{{1}}}&{{{4}}} \\{{{0}}}&{{{3}}}&{{{-2}}}&{{{-5}}} \\{{{0}}}&{{{3}}}&{{{-3}}}&{{{-9}}}\end{pmatrix}. $$

第二个方程乘以-1加到第三个方程上，

第三个方程乘以-1

(3)

 $$ \left\{\begin{aligned}x_{1}-x_{2}+&x_{3}=4,\\ 3x_{2}-2x_{3}&=-5,\\ x_{3}&=4,\end{aligned}\right. $$

对应的增广矩阵正好是把第二行的每个元素乘以-1加到第三行对应位置的元素上，第三行每个元素乘以-1

第三个方程乘以2加到第二个方程上，

第二个方程乘以 $ \frac{1}{3} $

 $$ \begin{pmatrix}{{{1}}}&{{{-1}}}&{{{1}}}&{{{4}}} \\{{{0}}}&{{{3}}}&{{{-2}}}&{{{-5}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{4}}}\end{pmatrix}. $$

对应的增广矩阵正好是把第三行的每个元素乘以2加到第二行对应位置的元素上，第二行每个元素乘以 $ \frac{1}{3} $

(4)

 $$ \left\{\begin{aligned}x_{1}-x_{2}+x_{3}&=4,\\ x_{2}&=1,\\ x_{3}&=4,\end{aligned}\right. $$

第三个方程乘以-1加到第一个方程上，

第二个方程乘以1加到第一个方程上

 $$ \begin{pmatrix}{{{1}}}&{{{-1}}}&{{{1}}}&{{{4}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{4}}}\end{pmatrix}. $$

对应的增广矩阵正好是把第三行的每个元素乘以-1，第二行的每个元素乘以1，都加到第一行对应位置的元素上

(5)

 $$ \left\{\begin{aligned}x_{1}&=1,\\ x_{2}&=1,\\ x_{3}&=4,\end{aligned}\right. $$

 $$ \begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{4}}}\end{pmatrix}. $$

最后一个方程组有唯一解 $ x_{1}=1 $， $ x_{2}=1 $， $ x_{3}=4 $。

在用消元法解线性方程组的过程中，我们主要用到了下列三种方程之间的变换：

（1）交换两个方程的次序；

（2）一个方程乘上一个非零数；

（3）一个方程乘上一个非零数加到另一个方程上.

这三种方程之间的变换都是可逆的，比如在例1中，交换原方程组的第一个方程和第二个方程得到方程组(1)，于是交换方程组(1)的第一个方程和第二个方程就得到原方程组；把方程组(1)的第一个方程乘以-2分别加到第二个方程和第三个方程上得到方程组(2)，则方程组(2)的第一个方程乘以2分别加到第二个方程和第三个方程上就得到方程组(1)；方程组(2)的第二个方程乘以-1加到第三个方程上，然后第三个方程乘以-1得到方程组(3)，则方程组(3)的第三个方程乘以-1，然后第二个方程乘以1加到第三个方程上就得到方程组(2)。因此，变换前的方程组与变换后的方程组是同解的。从而最后求得的方程组(5)的解就是原方程组的解，即原方程组有唯一解： $ x_1=1 $， $ x_2=1 $， $ x_3=4 $。由此可见，对矩阵实施这些变换是十分必要的，我们引入如下定义。

定义 1 下面三种变换称为矩阵的初等行变换：

（1）交换矩阵的某两行，我们用  $ r_i \leftrightarrow r_i $ 表示交换矩阵的第 i、j 两行；

（2）矩阵的某一行乘以非零数，用 $ kr_{i} $表示矩阵的第i行元素乘以非零数k；

（3）将矩阵的某一行的倍数加到另一行，用 $ r_{i}+kr_{i} $表示将矩阵第i行的k倍加到第

j行.

将上面定义中的“行”换成“列”（记号由“r”换成“c”），就得到了矩阵的初等列变换的定义.

矩阵的初等行变换和初等列变换统称为矩阵的初等变换.

显然，三种初等行(列)变换都是可逆的(简单的说，就是变换可以还原)，它们的逆变换分别为：变换  $ r_i \leftrightarrow r_j $ 的逆变换就是其本身；变换  $ k\boldsymbol{r}_i $ 的逆变换是  $ \frac{1}{k}\boldsymbol{r}_i $；变换  $ r_j + k\boldsymbol{r}_i $ 的逆变换是  $ r_j + (-k)\boldsymbol{r}_i $。

在例1中，线性方程组 $ (3) $、 $ (4) $、 $ (5) $对应的增广矩阵有一个共同特点，就是：可画一条阶梯线，线的下方全为零；每个台阶只有一行，台阶数就是非零行的行数；每一非零行的第一个非零元位于上一行第一个非零元的右侧，即

 $$ \begin{pmatrix}{{{1}}}&{{{-1}}}&{{{1}}}&{{{4}}} \\{{{0}}}&{{{3}}}&{{{-2}}}&{{{-5}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{4}}}\end{pmatrix}\mathrm{~,~}\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{1}}}&{{{4}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{4}}}\end{pmatrix}\mathrm{~,~}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{4}}}\end{pmatrix} $$

这样的矩阵，我们称为行阶梯形矩阵. 对于最后一个矩阵，它的非零行的第一个非零元全为1，并且这些“1”所在的列的其余元素全为零，这样的阶梯形矩阵，我们称为行最简形矩阵.

例2 矩阵 $ \begin{pmatrix}0&2&2&1\\0&4&0&3\\0&0&1&6\end{pmatrix} $不是行阶梯形矩阵，因为第一行第一个非零元2下方有非零元素4：

矩阵 $ \begin{pmatrix}0&1&2&1\\3&1&-1&2\\0&0&2&7\end{pmatrix} $也不是行阶梯形矩阵，因为第二行第一个非零元3不在上一行第一个非零元1的右侧；

矩阵 $ \begin{pmatrix}2&2&3&1\\0&0&0&0\\0&1&5&3\end{pmatrix} $也不是行阶梯矩阵，因为全零行（第二行）下面有非全零行（第三行）；

矩阵 $ \begin{pmatrix}1&0&0&-1&2\\0&1&0&1&3\\0&0&1&2&1\\0&0&0&0&0\end{pmatrix} $是行阶梯形矩阵，并且是行最简形矩阵.

例3 试用矩阵行的初等变换将矩阵 $ A=\begin{pmatrix}2&-3&1&-1&2\\2&-1&-1&1&2\\1&1&-2&1&4\\-1&4&-3&2&2\end{pmatrix} $先化为行阶梯形矩阵，

再进一步化为行最简形矩阵.

解

 $$ \begin{pmatrix}{{{2}}}&{{{-3}}}&{{{1}}}&{{{-1}}}&{{{2}}} \\{{{2}}}&{{{-1}}}&{{{-1}}}&{{{1}}}&{{{2}}} \\{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}}&{{{4}}} \\{{{-1}}}&{{{4}}}&{{{-3}}}&{{{2}}}&{{{2}}}\end{pmatrix}\xrightarrow{r_{1}\leftrightarrow r_{3}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}}&{{{4}}} \\{{{2}}}&{{{-1}}}&{{{-1}}}&{{{1}}}&{{{2}}} \\{{{2}}}&{{{-3}}}&{{{1}}}&{{{-1}}}&{{{2}}} \\{{{-1}}}&{{{4}}}&{{{-3}}}&{{{2}}}&{{{2}}}\end{pmatrix} $$

 $$ \xrightarrow[\\r_{4}+r_{1}]{}\begin{pmatrix}1&1&-2&1&4\\0&2&-2&2&0\\0&-5&5&-3&-6\\0&5&-5&3&6\end{pmatrix}\xrightarrow[\\frac{1}{2}r_{1}]\begin{pmatrix}1&1&-2&1&4\\0&1&-1&1&0\\0&-5&5&-3&-6\\0&0&0&0&0\end{pmatrix} $$

 $$ \xrightarrow{r_{3}+5r_{2}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}}&{{{4}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{2}}}&{{{-6}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix} $$

行阶梯形矩阵

 $$ \xrightarrow{\frac{1}{2}r_{3}}\left(\begin{matrix}{1}&{1}&{-2}&{1}&{4}\\ {0}&{1}&{-1}&{1}&{0}\\ {0}&{0}&{0}&{1}&{-3}\\ {0}&{0}&{0}&{0}&{0}\\ \end{matrix}\right)\xrightarrow[r_{1}+(-1)r_{3}]{}\left(\begin{matrix}{1}&{1}&{-2}&{0}&{7}\\ {0}&{1}&{-1}&{0}&{3}\\ {0}&{0}&{0}&{1}&{-3}\\ {0}&{0}&{0}&{0}&{0}\\ \end{matrix}\right) $$

 $$ \xrightarrow{r_{1}+(-1)r_{2}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}}&{{{0}}}&{{{4}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{0}}}&{{{3}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}}&{{{-3}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}. $$

行最简形矩阵

对于行最简形矩阵再实施初等列变换，可变成一种形状更简单的矩阵。例如，将例3中的行最简形矩阵再实施初等列变换，得

 $$ \begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}}&{{{0}}}&{{{4}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{0}}}&{{{3}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}}&{{{-3}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}\xrightarrow{\boldsymbol{c}_{3}+\boldsymbol{c}_{1}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{4}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{0}}}&{{{3}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}}&{{{-3}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}\xrightarrow{\boldsymbol{c}_{5}+(-4)\boldsymbol{c}_{1}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix} $$

 $$ \xrightarrow{c_{3}\leftrightarrow c_{4}}\begin{pmatrix}1&0&0&0&0\\0&1&0&0&0\\0&0&1&0&0\\\hline0&0&0&0&0\end{pmatrix}=\boldsymbol{F}, $$

最后一个矩阵 F 称为矩阵 A 的标准形，写成分块矩阵的形式，则有

 $$ \boldsymbol{F}=\begin{pmatrix}\boldsymbol{E}_{3}&\boldsymbol{O}\\ \\\boldsymbol{O}&\boldsymbol{O}\end{pmatrix}. $$

对于一般的矩阵，我们有下面的结论.

定理（1）任意一个  $ m \times n $ 矩阵总可以经过若干次初等行变换化为行阶梯形矩阵；

（2）任意一个  $ m \times n $ 矩阵总可以经过若干次初等行变换化为行最简形矩阵；

（3）任意一个  $ m \times n $ 矩阵总可以经过若干次初等变换（行变换和列变换）化为它

的标准形  $ F=\begin{pmatrix}E_{r}&O\\O&O\end{pmatrix}_{m\times n} $，其中 r 为行阶梯形矩阵中非零行的行数.

定义 2 若矩阵 A 经过有限次初等行 (列) 变换化为矩阵 B，则称矩阵 A 与矩阵 B 行 (列) 等价；若矩阵 A 经过有限次初等变换化为矩阵 B，则称矩阵 A 与矩阵 B 等价.

我们用  $ A^r \sim B $ 表示矩阵 A 与矩阵 B 行等价，用  $ A^c \sim B $ 表示矩阵 A 与矩阵 B 列等价，用  $ A \sim B $ 表示矩阵 A 与矩阵 B 等价.

注意：矩阵间的行(列)等价以及矩阵间的等价是一个等价关系，即满足：

（1）自反性：任意矩阵A与自身等价；

（2）对称性：若矩阵A与矩阵B等价，则矩阵B与矩阵A等价；

（3）传递性：若矩阵A与矩阵B等价，矩阵B与矩阵C等价，则矩阵A与矩阵C等价.

等价关系是数学中一个十分重要的概念. 等价的对象具有某种共性, 这在以后可以得到具体的体现.
