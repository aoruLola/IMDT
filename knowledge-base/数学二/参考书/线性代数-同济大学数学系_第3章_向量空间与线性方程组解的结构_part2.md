# 习题3-3

> 来源：docs/08_电子书/线性代数-同济大学数学系.md
> 科目：数学二（302） ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：542d072d2e071a92


1. 求下列向量组的秩及一个极大无关组，并将不属于极大无关组的向量由极大无关组线性表示：

 $$ \begin{aligned}(1)\boldsymbol{\alpha}_{1}&=\begin{pmatrix}1\\ 3\\ 1\end{pmatrix},\boldsymbol{\alpha}_{2}=\begin{pmatrix}1\\ 2\\ 2\end{pmatrix},\boldsymbol{\alpha}_{3}=\begin{pmatrix}-3\\ -3\\ -9\end{pmatrix},\boldsymbol{\alpha}_{4}=\begin{pmatrix}-1\\ 4\\ -8\end{pmatrix},\boldsymbol{\alpha}_{5}=\begin{pmatrix}1\\ 5\\ -1\end{pmatrix};\end{aligned} $$

(2)

 $$ \mathbf{\alpha}_{1}=\left(\begin{matrix}{1}\\ {1}\\ {0}\\ {2}\\ \end{matrix}\right),\mathbf{\alpha}_{2}=\left(\begin{matrix}{1}\\ {-1}\\ {3}\\ {-1}\\ \end{matrix}\right),\mathbf{\alpha}_{3}=\left(\begin{matrix}{2}\\ {4}\\ {-1}\\ {5}\\ \end{matrix}\right),\mathbf{\alpha}_{4}=\left(\begin{matrix}{1}\\ {1}\\ {2}\\ {0}\\ \end{matrix}\right),\mathbf{\alpha}_{5}=\left(\begin{matrix}{2}\\ {0}\\ {3}\\ {1}\\ \end{matrix}\right). $$

2. 求下列矩阵的秩：

 $$ \begin{array}{r}{(1)\boldsymbol{A}=\left(\begin{matrix}{1}&{-1}&{0}&{-1}\\ {1}&{3}&{2}&{2}\\ {3}&{1}&{-4}&{4}\end{matrix}\right);\quad(2)\boldsymbol{B}=\left(\begin{matrix}{1}&{1}&{1}&{1}&{-1}\\ {2}&{1}&{3}&{-1}&{1}\\ {1}&{2}&{0}&{6}&{-2}\\ {4}&{3}&{5}&{-1}&{-3}\end{matrix}\right).}\end{array} $$

3. 已知  $ A $、 $ B $ 都是  $ m \times n $ 矩阵，存在  $ m $ 阶可逆矩阵  $ P $ 及  $ n $ 阶可逆矩阵  $ Q $，使得  $ PAQ = B $，证明： $ R(A) = R(B) $。

4. 从矩阵 A 中划去一行得到矩阵 B，那么  $ R(A) $ 与  $ R(B) $ 会有怎样的关系？

5. 已知向量组  $ A: \alpha_1, \alpha_2, \alpha_3, \alpha_4 $ 的秩  $ R_A = 3 $，向量组  $ B: \alpha_1, \alpha_2, \alpha_3, \alpha_5 $ 的秩  $ R_B = 4 $，证明：向量组  $ C: \alpha_1, \alpha_2, \alpha_3, \alpha_4, \alpha_5 $ 的秩  $ R_C = 4 $。

6. 设  $ \beta_1 = \alpha_2 + \alpha_3 + \cdots + \alpha_r $， $ \beta_2 = \alpha_1 + \alpha_3 + \cdots + \alpha_r $， $ \cdots $， $ \beta_r = \alpha_1 + \alpha_2 + \cdots + \alpha_{r-1} $，证明：向量组  $ \beta_1 $， $ \beta_2 $， $ \cdots $， $ \beta_r $ 与向量组  $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_r $ 的秩相等。

7. 设 A 为 n 阶矩阵  $ (n \geqslant 2) $， $ A^{*} $ 是 A 的伴随矩阵，证明：

 $$ R\left(\boldsymbol{A}^{*}\right)=\left\{\begin{aligned}&n,&R\left(\boldsymbol{A}\right)=n,\\ &1,&R\left(\boldsymbol{A}\right)=n-1,\\ &0,&R\left(\boldsymbol{A}\right)\leqslant n-2.\end{aligned}\right. $$

## [课前导读]

在第一章的第三节中，我们已经讨论了非齐次线性方程组的解与它的增广矩阵之间的关系，以及齐次线性方程组的解与它的系数矩阵之间的关系。在第四节中，我们首先利用矩阵的秩这个概念来重新表述非齐次线性方程组的解与它的增广矩阵、齐次线性方程组的解与它的系数矩阵之间的关系；然后给出线性方程组的解的结构，也就是当线性方程组有多个解时，解与解之间的关系。

## 一、线性方程组有解的判定定理

设有 n 元非齐次线性方程组

 $$ \begin{cases}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}=b_{1},\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}=b_{2},\\\cdots\cdots\cdots\\a_{m1}x_{1}+a_{m2}x_{2}+\cdots+a_{mn}x_{n}=b_{m},\end{cases} $$

将该线性方程组的系数矩阵和增广矩阵分别记为

 $$ \boldsymbol{A}=\left(\boldsymbol{\alpha}_{1},\ \boldsymbol{\alpha}_{2},\ \cdots,\ \boldsymbol{\alpha}_{n}\right),\ \widetilde{\boldsymbol{A}}=\left(\boldsymbol{\alpha}_{1},\ \boldsymbol{\alpha}_{2},\ \cdots,\ \boldsymbol{\alpha}_{n}\mid\boldsymbol{\beta}\right), $$

其中

 $$ \boldsymbol{\alpha}_{j}=\begin{pmatrix}a_{1j}\\ \vdots\\ a_{mj}\end{pmatrix}(1\leq j\leq n),\boldsymbol{\beta}=\begin{pmatrix}b_{1}\\ \vdots\\ b_{m}\end{pmatrix}. $$

对增广矩阵 $ \widetilde{A} $实施初等行变换，化为行最简形矩阵 $ \widetilde{R} $，为叙述方便，不妨设 $ \widetilde{R} $为

 $$ \widetilde{\cal R}=\left(\begin{matrix}{1}&{0}&{\cdots}&{0}&{a_{1,r+1}^{\prime}}&{\cdots}&{a_{1n}^{\prime}}&{d_{1}}\\ {0}&{1}&{\cdots}&{0}&{a_{2,r+1}^{\prime}}&{\cdots}&{a_{2n}^{\prime}}&{d_{2}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}\\ {0}&{0}&{\cdots}&{1}&{a_{r,r+1}^{\prime}}&{\cdots}&{a_{r n}^{\prime}}&{d_{r}}\\ {0}&{0}&{\cdots}&{0}&{0}&{\cdots}&{0}&{d_{r+1}}\\ {0}&{0}&{\cdots}&{0}&{0}&{\cdots}&{0}&{0}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}\\ {0}&{0}&{\cdots}&{0}&{0}&{\cdots}&{0}&{0}\\ \end{matrix}\right), $$

$\widetilde{R}$ 的前 $n$ 列就是系数矩阵的行最简形. 于是, 线性方程组 $(4-1)$ 无解的充分必要条件是 $\widetilde{R}$ 的第一个非零元出现在 $\widetilde{R}$ 的最后一列, 即 $d_{r+1} \neq 0$, 此时 $R(A) = r$, 而 $R(\widetilde{A}) = r + 1$. 而线性方程组 $(4-1)$ 一定有解的充分必要条件是 $\widetilde{R}$ 的第一个非零元不出现在 $\widetilde{R}$ 的最后一列, 即 $d_{r+1} = 0$, 此时 $R(A) = R(\widetilde{A})$. 且当 $R(A) = R(\widetilde{A}) = n$ 时, $\widetilde{R}$ 的第一个非零元的个数等于未知量的个数, 从而线性方程组 $(4-1)$ 有唯一解, 当 $R(A) = R(\widetilde{A}) = r < n$ 时, 第一个非零元的个数小于未知量的个数, 线性方程组 $(4-1)$ 有无穷多解. 因此, 利用系数矩阵和增广矩阵的秩, 我们可以将第一章第三节中命题重新叙述如下.

定理1 (1) 线性方程组(4-1)无解的充分必要条件是  $ R(A) < R(\widetilde{A}) $;

(2) 线性方程组 (4-1) 有解的充分必要条件是  $ R(A) = R(\widetilde{A}) $，且当  $ R(A) = R(\widetilde{A}) = n $ 时有唯一解，当  $ R(A) = R(\widetilde{A}) = r < n $ 时有无穷多解.

n元齐次线性方程组

 $$ \begin{cases}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}=0,\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}=0,\\\cdots\cdots\cdots\\a_{m1}x_{1}+a_{m2}x_{2}+\cdots+a_{mn}x_{n}=0,\end{cases} $$

可以看成是线性方程组 $ (4-1) $当常数 $ b_1=b_2=\cdots=b_m=0 $时的特殊情形，所以对齐次线性方程组的解与系数矩阵的秩之间的关系，我们有：

定理2 (1) 线性方程组(4-2)只有零解的充分必要条件是  $ R(A)=n $;

(2)线性方程组(4-2)有非零解的充分必要条件是 $ R(A)=r<n $.

将定理1推广到矩阵方程，做这样的推广还可以为以后的讨论带来便利.

定理 3 矩阵方程 AX = B 有解的充分必要条件是  $ R(A) = R(A, B) $.

证明 设 A 为  $ m \times n $ 矩阵，B 为  $ m \times t $ 矩阵，X 为  $ n \times t $ 矩阵. 将 X 和 B 按列分块，记为

 $$ \boldsymbol{X}=\left(\boldsymbol{x}_{1},\ \boldsymbol{x}_{2},\ \cdots,\ \boldsymbol{x}_{t}\right),\ \boldsymbol{B}=\left(\boldsymbol{\beta}_{1},\ \boldsymbol{\beta}_{2},\ \cdots,\ \boldsymbol{\beta}_{t}\right), $$

则矩阵方程 AX = B 等价于 t 个向量方程

 $$ \boldsymbol{A}\boldsymbol{x}_{j}=\boldsymbol{\beta}_{j}(j=1,2,\cdots,t). $$

又设  $ R(A)=r $，且 A 的行最简形为  $ \widetilde{A} $，则  $ \widetilde{A} $ 有 r 个非零行，且  $ \widetilde{A} $ 的后 m-r 行全为零。再对分块矩阵  $ (A, B) $ 实施初等行变换

 $$ \left(\boldsymbol{A},\boldsymbol{B}\right)=\left(\boldsymbol{A},\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\cdots,\boldsymbol{\beta}_{t}\right)\stackrel{r}{\sim}\left(\widetilde{\boldsymbol{A}},\widetilde{\boldsymbol{\beta}}_{1},\widetilde{\boldsymbol{\beta}}_{2},\cdots,\widetilde{\boldsymbol{\beta}}_{t}\right), $$

于是

 $$ \left(\boldsymbol{A},\boldsymbol{\beta}_{j}\right)\stackrel{r}{\sim}\left(\widetilde{\boldsymbol{A}},\widetilde{\boldsymbol{\beta}}_{j}\right)(j=1,2,\cdots,t). $$

因此，由定理1可得

矩阵方程  $ AX = B $ 有解  $ \Leftrightarrow A x_i = \beta_i (j = 1, 2, \cdots, t) $ 有解

$$\Leftrightarrow R(A,\,\boldsymbol{\beta}_{j})=R(A)(j=1,\,2,\,\cdots,\,t)$$

$$\Leftrightarrow \widetilde{\boldsymbol{\beta}}_{j}(j=1,\,2,\,\cdots,\,t)$$ 的后 $m-r$ 个元全为零

$$\Leftrightarrow (\widetilde{\boldsymbol{\beta}}_{1},\,\widetilde{\boldsymbol{\beta}}_{2},\,\cdots,\widetilde{\boldsymbol{\beta}}_{t})$$ 的后 $m-r$ 行全为零

$$\Leftrightarrow R(A,\,\boldsymbol{B})=r=R(A).$$

例1 已知向量组  $ A $： $ \alpha_1 = \begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix} $， $ \alpha_2 = \begin{pmatrix} -1 \\ 1 \\ 2 \end{pmatrix} $， $ \alpha_3 = \begin{pmatrix} 1 \\ 2 \\ 5 \end{pmatrix} $ 和  $ B $： $ \beta_1 = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} $， $ \beta_2 = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} $， $ \beta_3 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} $，证明：向量组  $ A $： $ \alpha_1 $， $ \alpha_2 $， $ \alpha_3 $ 和向量组  $ B $： $ \beta_1 $， $ \beta_2 $， $ \beta_3 $ 等价。

证明 令矩阵  $ A=(\alpha_{1}, \alpha_{2}, \alpha_{3}) $， $ B=(\beta_{1}, \beta_{2}, \beta_{3}) $。要证明向量组 A： $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 和向量组 B： $ \beta_{1}, \beta_{2}, \beta_{3} $ 等价，只需证明矩阵方程 AX=B 与 BY=A 均有解，也就是要证明  $ R(A)=R(A, B) $ 且  $ R(B)=R(B, A) $。而  $ R(A, B)=R(B, A) $，于是需要证明  $ R(A)=R(B)=R(A, B) $ 即可。

由

 $$ \begin{aligned}(\boldsymbol{A},\boldsymbol{B})&=(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}\mid\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{3})=\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{1}}}&{{{1}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{2}}}&{{{1}}}&{{{1}}}&{{{0}}} \\{{{-1}}}&{{{2}}}&{{{5}}}&{{{0}}}&{{{1}}}&{{{1}}}\end{pmatrix}\sim\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{1}}}&{{{1}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{2}}}&{{{1}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{4}}}&{{{0}}}&{{{0}}}&{{{2}}}\end{pmatrix}\end{aligned} $$

可知  $ R(A)=R(A,B)=3 $，另外单独计算矩阵 B 的秩得  $ R(B)=3 $，所以这两个向量组等价.

下面，我们用向量组理论依次讨论齐次线性方程组和非齐次线性方程组的解.

## 二、齐次线性方程组解的结构

将齐次线性方程组(4-2)写成

 $$ A x=\mathbf{0}, $$

其中

 $$ \boldsymbol{A}=\left(\boldsymbol{\alpha}_{1},\ \boldsymbol{\alpha}_{2},\ \cdots,\ \boldsymbol{\alpha}_{n}\right),\ \boldsymbol{\alpha}_{j}=\begin{pmatrix}a_{1j}\\ \vdots\\ a_{mj}\end{pmatrix}(1\leqslant j\leqslant n),\ \boldsymbol{x}=\begin{pmatrix}x_{1}\\ x_{2}\\ \vdots\\ x_{n}\end{pmatrix}. $$

如果  $ x_{1}=k_{1} $， $ x_{2}=k_{2} $， $ \cdots $， $ x_{n}=k_{n} $ 是方程组（4-2）的解，则向量

 $$ \boldsymbol{x}=\begin{pmatrix}k_{1}\\k_{2}\\\vdots\\k_{n}\end{pmatrix} $$

称为方程组(4-2)的解向量，也称为 Ax=0 的解. 记方程组(4-2)的解向量的全体所成的集合为 S，即

 $$ \mathrm{S}=\{\boldsymbol{\xi}\mid A\boldsymbol{\xi}=\mathbf{0}\}, $$

我们来讨论方程组 $ (4-2) $的解向量的性质，以及向量组S的秩和极大无关组.

性质1 设  $ \alpha, \beta $ 为 Ax=0 的任意的两个解，则  $ \alpha+\beta $ 仍为 Ax=0 的解.

证明 由  $ \alpha, \beta $ 均为 Ax=0 的解，有  $ A\alpha=0, A\beta=0 $，于是

 $$ \boldsymbol{A}\left(\boldsymbol{\alpha}+\boldsymbol{\beta}\right)=\boldsymbol{A}\boldsymbol{\alpha}+\boldsymbol{A}\boldsymbol{\beta}=\mathbf{0}+\mathbf{0}=\mathbf{0}, $$

所以  $ \alpha + \beta $ 仍为 Ax = 0 的解.

性质2 设  $ \alpha $ 为 Ax=0 的任意解，则对任意实数 k， $ k\alpha $ 仍为 Ax=0 的解.

证明 由  $ \alpha $ 为 Ax=0 的解，有  $ A\alpha=0 $ 。于是对于任意数 k，有

 $$ \boldsymbol{A}(k\boldsymbol{\alpha})=k(\boldsymbol{A}\boldsymbol{\alpha})=k\boldsymbol{0}=\boldsymbol{0}, $$

所以  $ k\alpha $ 仍为 Ax=0 的解.

由性质1、性质2知道，若  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{t} $ 都是齐次线性方程组 Ax=0 的解，则对于任意一组数  $ k_{1}, k_{2}, \cdots, k_{t} $，线性组合

 $$ k_{1}\boldsymbol{\alpha}_{1}+k_{2}\boldsymbol{\alpha}_{2}+\cdots+k_{t}\boldsymbol{\alpha}_{t} $$

仍为 Ax=0 的解. 因此, 在 Ax=0 有非零解的情况下, 如果向量组  $ \alpha_{1} $,  $ \alpha_{2} $,  $ \cdots $,  $ \alpha_{t} $ 是解集 S 的极大无关组, 则表达式 (4-3) 称为方程组 (4-2) 的通解.

齐次线性方程组的解集 S 的极大无关组称为齐次线性方程组的基础解系. 若 Ax=0 有非零解, 只要知道了基础解系, 就可以给出齐次线性方程组的通解. 下面的定理说明了有非零解的齐次线性方程组基础解系的存在性, 定理的证明给出了一个具体求基础解系的方法.

定理 4 设  $ m \times n $ 矩阵  $ A $ 的秩  $ R(A) = r < n $，则  $ n $ 元齐次线性方程组  $ Ax = 0 $ 一定有基础解系，并且基础解系中所含向量的个数为  $ n - r $，从而解集  $ S $ 的秩  $ R_c = n - r $。

证明 由于矩阵 A 的秩  $ R(A)=r<n $，为了书写方便，不妨设矩阵 A 的前 r 个列向量线性无关，于是 A 的行最简形矩阵具有形式：

 $$ \begin{aligned}\boldsymbol{R}&=\begin{pmatrix}1&0&\cdots&0&c_{1,r+1}&\cdots&c_{1n}\\0&1&\cdots&0&c_{2,r+1}&\cdots&c_{2n}\\\vdots&\vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\0&0&\cdots&1&c_{r,r+1}&\cdots&c_{rn}\\0&0&\cdots&0&0&\cdots&0\\\vdots&\vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\0&0&\cdots&0&0&\cdots&0\end{pmatrix},\end{aligned} $$

矩阵R对应的方程组为

 $$ \begin{cases}x_{1}+c_{1,r+1}x_{r+1}+\cdots+c_{1n}x_{n}=0,\\x_{2}+c_{2,r+1}x_{r+1}+\cdots+c_{2n}x_{n}=0,\\\cdots\cdots\cdots\\x_{r}+c_{r,r+1}x_{r+1}+\cdots+c_{rn}x_{n}=0.\end{cases} $$

将矩阵 R 的非零行的第一个非零元对应的未知量看成固定未知量，留在等号的左端，其余的未知量看成自由未知量，放在等号右端，上面的方程组写为

 $$ \begin{cases}x_{1}=-c_{1,r+1}x_{r+1}-\cdots-c_{1n}x_{n},\\x_{2}=-c_{2,r+1}x_{r+1}-\cdots-c_{2n}x_{n},\\\cdots\cdots\cdots\\x_{r}=-c_{r,r+1}x_{r+1}-\cdots-c_{rn}x_{n}.\end{cases} $$

令 $ \begin{pmatrix}x_{r+1}\\x_{r+2}\\\vdots\\x_{n}\end{pmatrix} $分别取

 $$ \underbrace{\left(\begin{array}{c}1\\ 0\\ 0\\ \vdots\\ 0\\ 0\end{array}\right)}_{ 共 n-r 个 },\quad\cdots,\quad\left(\begin{array}{c}0\\ 0\\ 0\\ \vdots\\ 0\\ 1\end{array}\right), $$

代入方程组(4-4)，相应地有

 $$ \begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{r}\end{pmatrix}=\begin{pmatrix}-c_{1,r+1}\\-c_{2,r+1}\\\vdots\\-c_{r,r+1}\end{pmatrix},\quad\begin{pmatrix}-c_{1,r+2}\\-c_{2,r+2}\\\vdots\\-c_{r,r+2}\end{pmatrix},\quad\cdots,\quad\begin{pmatrix}-c_{1n}\\-c_{2n}\\\vdots\\-c_{rn}\end{pmatrix}. $$

于是，得到 n-r 个解向量

 $$ \begin{aligned}\boldsymbol{\xi}_{1}&=\begin{pmatrix}-c_{1,r+1}\\ -c_{2,r+1}\\ \vdots\\ -c_{r,r+1}\\ 1\\ 0\\ \vdots\\ 0\end{pmatrix},\boldsymbol{\xi}_{2}=\begin{pmatrix}-c_{1,r+2}\\ -c_{2,r+2}\\ \vdots\\ -c_{r,r+2}\\ 0\\ 1\\ \vdots\\ 0\end{pmatrix},\cdots,\boldsymbol{\xi}_{n-r}=\begin{pmatrix}-c_{1n}\\ -c_{2n}\\ \vdots\\ -c_{rn}\\ 0\\ 0\\ \vdots\\ 1\end{pmatrix}.\end{aligned} $$

下面我们证明向量组  $ \xi_1, \xi_2, \cdots, \xi_{n-r} $ 就是  $ n $ 元齐次线性方程组  $ Ax=0 $ 的基础解系.

由于向量 $ \xi_{1}, \xi_{2}, \cdots, \xi_{n-r} $可看成是表达式(4-5)中的n-r个向量分别添加了r个分量

后所得到，而表达式(4-5)中的 n-r 个向量线性无关，从本章第三节定理4的证明可知，向量  $ \pmb{\xi}_{1} $， $ \pmb{\xi}_{2} $，…， $ \pmb{\xi}_{n-r} $ 也是线性无关的。因此，只需证明：齐次线性方程组的任一解向量都可由  $ \pmb{\xi}_{1} $， $ \pmb{\xi}_{2} $，…， $ \pmb{\xi}_{n-r} $ 线性表示。

假设 n 元齐次线性方程组 Ax=0 的任一解向量为

 $$ \boldsymbol{\eta}=\begin{pmatrix}k_{1}\\ k_{2}\\ \vdots\\ k_{n}\end{pmatrix}, $$

则  $ k_{1} $， $ k_{2} $，⋯， $ k_{n} $ 一定会满足方程组 (4-4)，即

 $$ \begin{cases}k_{1}=-c_{1,r+1}k_{r+1}-\cdots-c_{1n}k_{n},\\k_{2}=-c_{2,r+1}k_{r+1}-\cdots-c_{2n}k_{n},\\\cdots\cdots\cdots\\k_{r}=-c_{r,r+1}k_{r+1}-\cdots-c_{rn}k_{n}.\end{cases} $$

于是

 $$ \boldsymbol{\eta}=\left(\begin{matrix}{k_{1}}\\ {k_{2}}\\ {\vdots}\\ {k_{r}}\\ {k_{r+1}}\\ {k_{r+2}}\\ {\vdots}\\ {k_{n}}\\ \end{matrix}\right)=\left(\begin{matrix}{-c_{1,r+1}k_{r+1}-\cdots-c_{1n}k_{n}}\\ {-c_{2,r+1}k_{r+1}-\cdots-c_{2n}k_{n}}\\ {\vdots}\\ {-c_{r,r+1}k_{r+1}-\cdots-c_{r n}k_{n}}\\ {k_{r+1}}\\ {k_{r+2}}\\ {\vdots}\\ {k_{n}}\\ \end{matrix}\right)=k_{r+1}\left(\begin{matrix}{-c_{1,r+1}}\\ {-c_{2,r+1}}\\ {\vdots}\\ {-c_{r,r+1}}\\ {1}\\ {0}\\ {\vdots}\\ {0}\\ \end{matrix}\right)+k_{r+2}\left(\begin{matrix}{-c_{1,r+2}}\\ {-c_{2,r+2}}\\ {\vdots}\\ {-c_{r,r+2}}\\ {0}\\ {1}\\ {\vdots}\\ {0}\\ \end{matrix}\right)+\cdots+k_{n}\left(\begin{matrix}{-c_{1n}}\\ {-c_{2n}}\\ {\vdots}\\ {-c_{r n}}\\ {0}\\ {0}\\ {\vdots}\\ {1}\\ \end{matrix}\right). $$

亦即，任一解向量  $ \eta $ 均可由  $ \xi_{1}, \xi_{2}, \cdots, \xi_{n-r} $ 线性表示为

 $$ \pmb{\eta}=k_{r+1}\pmb{\xi}_{1}+k_{r+2}\pmb{\xi}_{2}+\cdots+k_{n}\pmb{\xi}_{n-r}. $$

所以向量组  $ \xi_{1}, \xi_{2}, \cdots, \xi_{n-r} $ 就是 n 元齐次线性方程组 Ax=0 的基础解系.

例2 求齐次线性方程组 $ \left\{\begin{aligned}&x_{1}+x_{2}+x_{3}&-2x_{5}=0,\\ &2x_{1}+2x_{2}+x_{3}+2x_{4}-3x_{5}=0,\\ &x_{1}+x_{2}+3x_{3}-4x_{4}-4x_{5}=0\end{aligned}\right. $，的基础解系.

解 对系数矩阵 A 实施初等行变换，化为行最简形矩阵 R：

 $$ \boldsymbol{A}=\begin{pmatrix}1&1&1&0&-2\\2&2&1&2&-3\\1&1&3&-4&-4\end{pmatrix}\rightarrow\begin{pmatrix}1&1&1&0&-2\\0&0&-1&2&1\\0&0&2&-4&-2\end{pmatrix}\rightarrow\begin{pmatrix}1&1&0&2&-1\\0&0&1&-2&-1\\0&0&0&0&0\end{pmatrix}=\boldsymbol{R}, $$

由于  $ R(A)=2<5 $ ，所以该齐次线性方程组有非零解. R 对应的方程组为

 $$ \left\{\begin{aligned}x_{1}+x_{2}\quad+2x_{4}-x_{5}&=0,\\ x_{3}-2x_{4}-x_{5}&=0,\end{aligned}\right. $$

行最简形矩阵 R 的第一个非零元在第 1 列和第 3 列，所以自由未知量为  $ x_{2} $， $ x_{4} $， $ x_{5} $. 将自

由未知量移至等号右端，有

 $$ \left\{\begin{aligned}x_{1}&=-x_{2}-2x_{4}+x_{5},\\ x_{3}&=2x_{4}+x_{5},\end{aligned}\right. $$

分别取

 $$ \begin{pmatrix}x_{2}\\x_{4}\\x_{5}\end{pmatrix}=\begin{pmatrix}1\\0\\0\end{pmatrix},\quad\begin{pmatrix}0\\1\\0\end{pmatrix},\quad\begin{pmatrix}0\\0\\1\end{pmatrix}, $$

代入方程组(4-6)，依次得

 $$ \begin{pmatrix}x_{1}\\ x_{3}\end{pmatrix}=\begin{pmatrix}-1\\ 0\end{pmatrix},\quad\begin{pmatrix}-2\\ 2\end{pmatrix},\quad\begin{pmatrix}1\\ 1\end{pmatrix}, $$

从而基础解系为

 $$ \boldsymbol{\xi}_{1}=\begin{pmatrix}-1\\1\\0\\0\\0\end{pmatrix},\boldsymbol{\xi}_{2}=\begin{pmatrix}-2\\0\\2\\1\\0\end{pmatrix},\boldsymbol{\xi}_{3}=\begin{pmatrix}1\\0\\1\\0\\1\end{pmatrix}. $$

原方程组的通解为

 $$ \boldsymbol{x}=k_{1}\boldsymbol{\xi}_{1}+k_{2}\boldsymbol{\xi}_{2}+k_{3}\boldsymbol{\xi}_{3}. $$

## 三、非齐次线性方程组解的结构

最后我们来讨论 n 元非齐次线性方程组(4-1)的解. 将非齐次线性方程组(4-1)写成

 $$ Ax=\boldsymbol{\beta}. $$

如果系数矩阵  $ A $ 不变，将常数项列向量  $ \beta $ 换成零向量  $ \mathbf{0} $，得到一个  $ n $ 元齐次线性方程组  $ Ax = \mathbf{0} $.

这样得到的齐次线性方程组称为非齐次线性方程组的导出组.

性质3 设  $ \xi, \eta $ 是  $ Ax = \beta $ 的任意两个解，则  $ \xi - \eta $ 是导出组 Ax = 0 的解.

证明 因为  $ \xi $， $ \eta $ 是  $ Ax = \beta $ 的任意两个解，即： $ A\xi = \beta $， $ A\eta = \beta $，所以

 $$ \begin{array}{r}{\boldsymbol{A}\left(\boldsymbol{\xi}-\boldsymbol{\eta}\right)=\boldsymbol{A}\boldsymbol{\xi}-\boldsymbol{A}\boldsymbol{\eta}=\boldsymbol{\beta}-\boldsymbol{\beta}=\mathbf{0},}\end{array} $$

即： $ \alpha-\beta $ 是导出组 Ax=0 的解.

性质4 设  $ \xi $ 是  $ Ax = \beta $ 的任意解， $ \eta $ 是导出组 Ax = 0 的任意解，则  $ \xi + \eta $ 是  $ Ax = \beta $ 的解.

证明 由题设可知， $ A\xi=\beta $， $ A\eta=0 $。于是

 $$ \boldsymbol{A}\left(\boldsymbol{\xi}+\boldsymbol{\eta}\right)=\boldsymbol{A}\boldsymbol{\xi}+\boldsymbol{A}\boldsymbol{\eta}=\boldsymbol{\beta}+\mathbf{0}=\boldsymbol{\beta}, $$

即： $ \xi + \eta $ 是  $ Ax = \beta $ 的解.

由此可见，非齐次线性方程组  $ Ax=\beta $ 的解与其导出组 Ax=0 的解之间有着密切的联系。我们有下面的定理。

定理 5 如果  $ \eta $ 是非齐次线性方程组  $ Ax=\beta $ 任意给定的一个解（通常称为特解）， $ \xi_{1} $

 $ \xi_2, \cdots, \xi_{n-r} $ 是其导出组  $ Ax=0 $ 的一个基础解系，则非齐次线性方程组  $ Ax=\beta $ 的通解可以表示为

 $$ \boldsymbol{x}=k_{1}\boldsymbol{\xi}_{1}+k_{2}\boldsymbol{\xi}_{2}+\cdots+k_{n-r}\boldsymbol{\xi}_{n-r}+\boldsymbol{\eta}. $$

式中， $ k_{1} $， $ k_{2} $， $ \cdots $， $ k_{n-r} $是任意实数.

证明 由性质4可知， $ k_1\xi_1 + k_2\xi_2 + \cdots + k_{n-r}\xi_{n-r} + \eta $ 确实是非齐次线性方程组  $ Ax = \beta $ 的解。下面我们证明  $ Ax = \beta $ 的任一解都可以写成式(4-7)的形式。

设  $ \gamma $ 是非齐次线性方程组  $ Ax=\beta $ 的任一解，则由性质 3 可知， $ \gamma-\eta $ 是导出组 Ax=0 的解，从而可由 Ax=0 的基础解系线性表示，即存在一组数  $ k_1, k_2, \cdots, k_{n-r} $，使得

 $$ \gamma-\eta=k_{1}\xi_{1}+k_{2}\xi_{2}+\cdots+k_{n-r}\xi_{n-r}, $$

因此

 $$ \boldsymbol{\gamma}=k_{1}\boldsymbol{\xi}_{1}+k_{2}\boldsymbol{\xi}_{2}+\cdots+k_{n-r}\boldsymbol{\xi}_{n-r}+\boldsymbol{\eta}. $$

推论 在非齐次线性方程组  $ Ax=\beta $ 有解的情形下，解唯一的充分必要条件是它的导出组 Ax=0 只有零解.

证明 （充分性）假设方程组  $ Ax=\beta $ 有两个不同的解，则这两个解的差就是导出组 Ax=0 的一个非零解，与导出组 Ax=0 只有零解矛盾。所以由导出组 Ax=0 只有零解，可得方程组  $ Ax=\beta $ 有唯一解。

（必要性）设非齐次线性方程组  $ Ax=\beta $ 有唯一解  $ \eta $，假设导出组 Ax=0 有非零解  $ \gamma $，则  $ \gamma+\eta $ 是方程组  $ Ax=\beta $ 的异于  $ \eta $ 的另一个解，这与方程组  $ Ax=\beta $ 有唯一解矛盾。所以导出组 Ax=0 只有零解。

例3 求非齐次线性方程组 $ \left\{\begin{aligned}x_{1}-x_{2}+2x_{3}-2x_{4}&=1,\\ x_{2}+x_{3}+2x_{4}&=-1,\\ 2x_{1}-x_{2}+5x_{3}-2x_{4}&=1,\\ x_{1}+x_{2}+4x_{3}+2x_{4}&=-1\end{aligned}\right. $ 的通解.

解 对该线性方程组的增广矩阵实施初等行变换，得

 $$ \widetilde{\boldsymbol{A}}=\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{2}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{2}}}&{{{-1}}} \\{{{2}}}&{{{-1}}}&{{{5}}}&{{{-2}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{4}}}&{{{2}}}&{{{-1}}}\end{pmatrix}\rightarrow\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{2}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{2}}}&{{{-1}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{2}}}&{{{-1}}} \\{{{0}}}&{{{2}}}&{{{2}}}&{{{4}}}&{{{-2}}}\end{pmatrix}\rightarrow\begin{pmatrix}{{{1}}}&{{{0}}}&{{{3}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{2}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}=\widetilde{\boldsymbol{R}}, $$

由于  $ R(A)=R(\widetilde{A})=2<4 $，所以该方程组有无穷多解。行最简形矩阵  $ \widetilde{R} $ 的第一个非零元在第1列和第2列，所以自由未知量为  $ x_3 $， $ x_4 $。于是有

 $$ \left\{\begin{aligned}x_{1}&=-3x_{3},\\ x_{2}&=-x_{3}-2x_{4}-1.\end{aligned}\right. $$

令 $ \begin{pmatrix}x_{3}\\x_{4}\end{pmatrix}=\begin{pmatrix}0\\0\end{pmatrix} $，代入方程组（4-8），得到 $ \begin{pmatrix}x_{1}\\x_{2}\end{pmatrix}=\begin{pmatrix}0\\-1\end{pmatrix} $，于是得原方程组的一个特解为

 $$ \boldsymbol{\eta}=\left(\begin{array}{l}{0}\\ {-1}\\ {0}\\ {0}\end{array}\right). $$

再写出方程组（4-8）的导出组

 $$ \left\{\begin{aligned}x_{1}&=-3x_{3},\\ x_{2}&=-x_{3}-2x_{4},\end{aligned}\right. $$

分别令 $ \begin{pmatrix}x_{3}\\x_{4}\end{pmatrix}=\begin{pmatrix}1\\0\end{pmatrix} $和 $ \begin{pmatrix}x_{3}\\x_{4}\end{pmatrix}=\begin{pmatrix}0\\1\end{pmatrix} $，代入方程组（4-9），得到导出组的基础解系为

 $$ \boldsymbol{\xi}_{1}=\begin{pmatrix}-3\\ -1\\ 1\\ 0\end{pmatrix},\boldsymbol{\xi}_{2}=\begin{pmatrix}0\\ -2\\ 0\\ 1\end{pmatrix}. $$

因此，原方程组的通解为

 $ x = k_1 \xi_1 + k_2 \xi_2 + \eta $,  $ k_1 $,  $ k_2 $ 为任意常数.

### 习题3-4

1. 求下列齐次线性方程组的通解（用基础解系表示）：

(1)

 $$ \left\{\begin{aligned}x_{1}-&x_{2}+2x_{3}-2x_{4}=0,\\ &x_{2}+x_{3}+2x_{4}=0,\\ 2x_{1}-x_{2}+&5x_{3}-2x_{4}=0;\end{aligned}\right. $$

 $$ \left\{\begin{aligned}x_{1}-3x_{2}+&x_{3}+x_{4}=0,\\ 2x_{1}-5x_{2}+&x_{3}+2x_{4}=0,\\ 5x_{1}-7x_{2}-3x_{3}+5x_{4}&=0.\end{aligned}\right. $$

2. 求下列非齐次线性方程组的通解（要求写出导出组的基础解系）：

 $$ \left\{\begin{aligned}x_{1}&+4x_{2}-3x_{3}+4x_{4}=-2,\\ 2x_{1}&+\quad x_{2}+\quad x_{3}+\quad x_{4}=3,\\ 3x_{1}&-2x_{2}+5x_{3}-2x_{4}=8;\end{aligned}\right. $$

 $$ \left\{\begin{aligned}x_{1}+&x_{2}-3x_{3}-x_{4}=1,\\ x_{1}+&3x_{2}-9x_{3}-7x_{4}=1,\\ 3x_{1}+&x_{2}-3x_{3}+3x_{4}=3.\end{aligned}\right. $$

3. 设  $ \eta $ 是非齐次线性方程组  $ Ax = \beta $ 的一个特解， $ \xi_1, \xi_2, \cdots, \xi_{n-r} $ 是其导出组  $ Ax = 0 $ 的一个基础解系，证明： $ \xi_1, \xi_2, \cdots, \xi_{n-r} $， $ \eta $ 线性无关.

4. 设四元非齐次线性方程组  $ Ax = \beta $ 的系数矩阵的秩  $ R(A) = 3 $， $ \eta_1 $， $ \eta_2 $， $ \eta_3 $ 是  $ Ax = \beta $ 的三个解向量，且

 $$ \boldsymbol{\eta}_{1}=\begin{pmatrix}1\\ 2\\ 3\\ 4\end{pmatrix},\quad\boldsymbol{\eta}_{2}+\boldsymbol{\eta}_{3}=\begin{pmatrix}2\\ 3\\ 4\\ 5\end{pmatrix}, $$

求 $ Ax=\beta $的通解.

5. 设  $ \eta_1 $,  $ \eta_2 $,  $ \cdots $,  $ \eta_{n-r+1} $ 是非齐次线性方程组  $ Ax = \beta $ 的  $ n-r+1 $ 个线性无关的解， $ R(A) = r $。证明： $ \eta_2 - \eta_1 $,  $ \eta_3 - \eta_1 $,  $ \cdots $,  $ \eta_{n-r+1} - \eta_1 $ 是导出组  $ Ax = 0 $ 的基础解系。

6. 设  $ \eta_1 $,  $ \eta_2 $,  $ \cdots $,  $ \eta_{n-r+1} $ 是非齐次线性方程组  $ Ax = \beta $ 的  $ n-r+1 $ 个线性无关的解， $ R(A) = r $。证明： $ Ax = \beta $ 的任一解均可表示为

 $$ \boldsymbol{x}=k_{1}\boldsymbol{\eta}_{1}+k_{2}\boldsymbol{\eta}_{2}+\cdots+k_{n-r+1}\boldsymbol{\eta}_{n-r+1}, $$

其中，常数  $ k_{1} $， $ k_{2} $， $ \cdots $， $ k_{n-r+1} $ 满足  $ k_{1}+k_{2}+\cdots+k_{n-r+1}=1 $.

7. 设矩阵  $ A $， $ B $， $ C $ 满足  $ AB = C $，证明  $ R(C) \leq \min\{R(A), R(B)\} $.

8. 设向量组  $ \beta_1, \beta_2, \cdots, \beta_s $ 可由向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_t $ 线性表示，证明  $ R(\beta_1, \beta_2, \cdots, \beta_s) \leq R(\alpha_1, \alpha_2, \cdots, \alpha_t) $.

### [课前导读]

我们知道，二元数组的全体组成的集合叫做二维空间（即平面$\mathbb{R}^2$），三元数组的全体组成的集合叫做三维空间（即空间$\mathbb{R}^3$），那么，$n$维向量的全体组成的集合$\mathbb{R}^n$该叫做什么呢？$\mathbb{R}^2$和$\mathbb{R}^3$对于数组的加法和数乘两种运算具有相同的特性，即：两个二元数组经过加法和数乘两种运算后仍旧是二元数组，两个三元数组经过加法和数乘两种运算后仍旧是三元数组。那么，$\mathbb{R}^n$对于$n$维向量的加法和数乘两种运算是否也具有这种特性呢？$\mathbb{R}^2$和$\mathbb{R}^3$中的坐标（坐标系）在$\mathbb{R}^n$中又有怎样对应的概念呢？本节我们将介绍这个$n$维向量的全体组成的集合$\mathbb{R}^n$。

## 一、向量空间及其子空间

定义1 设 $V$ 是 $n$ 维向量的集合，如果对于任意 $\alpha \in V$，$\beta \in V$，都有 $\alpha + \beta \in V$，则称 $V$ 对向量的加法封闭；如果对任意 $\alpha \in V$ 及任意 $k \in \mathbb{R}$，都有 $k \alpha \in V$，则称 $V$ 对向量的数乘封闭。

例1 集合  $ V_1 = \begin{pmatrix} 0 \\ a_2 \\ \vdots \\ a_n \end{pmatrix} $  $ a_2 $,  $ \cdots $,  $ a_n \in \mathbb{R} $  $ \Rightarrow $ 对任意  $ \alpha = \begin{pmatrix} 0 \\ a_2 \\ \vdots \\ a_n \end{pmatrix} \in V $,  $ \beta = \begin{pmatrix} 0 \\ b_2 \\ \vdots \\ b_n \end{pmatrix} \in V $, 任意  $ k \in \mathbb{R} $, 有

 $$ \mathbf{\alpha}+\mathbf{\beta}=\left(\begin{matrix}{0}\\ {a_{2}}\\ {\vdots}\\ {a_{n}}\\ \end{matrix}\right)+\left(\begin{matrix}{0}\\ {b_{2}}\\ {\vdots}\\ {b_{n}}\\ \end{matrix}\right)=\left(\begin{matrix}{0}\\ {a_{2}+b_{2}}\\ {\vdots}\\ {a_{n}+b_{n}}\\ \end{matrix}\right)\in V,k\mathbf{\alpha}=k\left(\begin{matrix}{0}\\ {a_{2}}\\ {\vdots}\\ {a_{n}}\\ \end{matrix}\right)=\left(\begin{matrix}{0}\\ {k a_{2}}\\ {\vdots}\\ {k a_{n}}\\ \end{matrix}\right)\in V, $$

所以  $ V_{1} $ 对向量的加法和数乘运算封闭.

例2 集合  $ V_2 = \begin{pmatrix} 1 \\ a_2 \\ \vdots \\ a_n \end{pmatrix} $  $ a_2 $,  $ \cdots $,  $ a_n \in \mathbb{R} $ ，对任意  $ \alpha = \begin{pmatrix} 1 \\ a_2 \\ \vdots \\ a_n \end{pmatrix} \in V $,  $ \beta = \begin{pmatrix} 1 \\ b_2 \\ \vdots \\ b_n \end{pmatrix} \in V $，任意  $ k \in \mathbb{R} $，有

 $$ \boldsymbol{\alpha}+\boldsymbol{\beta}=\left(\begin{matrix}{1}\\ {a_{2}}\\ {\vdots}\\ {a_{n}}\\ \end{matrix}\right)+\left(\begin{matrix}{1}\\ {b_{2}}\\ {\vdots}\\ {b_{n}}\\ \end{matrix}\right)=\left(\begin{matrix}{2}\\ {a_{2}+b_{2}}\\ {\vdots}\\ {a_{n}+b_{n}}\\ \end{matrix}\right)\notin V,k\boldsymbol{\alpha}=k\left(\begin{matrix}{1}\\ {a_{2}}\\ {\vdots}\\ {a_{n}}\\ \end{matrix}\right)=\left(\begin{matrix}{k}\\ {k a_{2}}\\ {\vdots}\\ {k a_{n}}\\ \end{matrix}\right)\notin V(k\neq0), $$

所以  $ V_{2} $ 对向量的加法和数乘运算均不封闭.

定义 2 设 V 是 n 维向量的集合，且 V 非空，如果 V 对向量的加法和数乘两种运算都封闭，则称集合 V 为向量空间.

由定义 1 的第二个条件可知，任何向量空间都必须含有零向量。容易验证，仅含一个零向量的集合也构成向量空间，我们称之为零向量空间。除零向量空间外，每一个向量空间都含有无限多个向量。

例如，例 1、例 2 中的集合均为非空的，因为  $ \mathbf{0} = \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{pmatrix} \in V_1 $， $ e_1 = \begin{pmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{pmatrix} \in V_2 $。 $ V_1 $ 对向量的加法和数乘运算封闭，所以  $ V_1 $ 是向量空间，但是  $ V_2 $ 对向量的加法和数乘运算均不封闭，所以  $ V_2 $ 不是向量空间。

例 3 n 维向量的全体组成的集合

 $$ \mathbb{R}^{n}=\left\{\left.\begin{pmatrix}\boldsymbol{x}_{1}\\ \boldsymbol{x}_{2}\\ \vdots\\ \boldsymbol{x}_{n}\end{pmatrix}\right|x_{1},x_{2},\cdots,x_{n}\in\mathbb{R}\right\} $$

对向量的加法和数乘运算均封闭，所以是一个向量空间.

例4 n元齐次线性方程组的解集

 $$ S=\left\{x\mid A x=\mathbf{0}\right\} $$

是一个向量空间，这是因为根据本章第四节的性质1、性质2可知，解集S对向量的加法和数乘运算封闭。这个向量空间我们称为齐次线性方程组的解空间。

例 5 n 元非齐次线性方程组的解集

 $$ S=\{x\mid Ax=\beta\} $$

不是一个向量空间，这是由于，(1)如果非齐次线性方程组无解，则解集 S 是一个空集，从而不是向量空间；(2)如果解集 S 是非空的，则对任意的  $ \eta \in S $ 以及任意常数  $ k \neq 1 $，有  $ A(k\eta) = k(A\eta) = k\beta \neq \beta $。所以非齐次线性方程组的解集不是向量空间。

例6 设  $ \alpha_1, \alpha_2, \cdots, \alpha_s \in \mathbb{R}^n $，我们将向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_s $ 所有可能的线性组合  $ k_1\alpha_1 + k_2\alpha_2 + \cdots + k_s\alpha_s $ 构成的集合记为

 $$ \mathfrak{L}(\mathbf{\alpha}_{1},\mathbf{\alpha}_{2},\cdots,\mathbf{\alpha}_{s})=\{\mathbf{\alpha}=k_{1}\mathbf{\alpha}_{1}+k_{2}\mathbf{\alpha}_{2}+\cdots+k_{s}\mathbf{\alpha}_{s}\mid k_{1},\mathbf{\alpha}_{2},\cdots,\mathbf{\alpha}_{s}\in\mathbb{R}\}, $$

容易验证， $ \mathfrak{L}(\alpha_1, \alpha_2, \cdots, \alpha_s) $ 是一个向量空间，我们称之为由向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_s $ 所张成的向量空间.

定义 3 设有向量空间  $ V_1 $ 与  $ V_2 $，如果  $ V_1 \subseteq V_2 $（即  $ V_1 $ 是  $ V_2 $ 的子集），则称向量空间  $ V_1 $

是 $ V_{2} $的子空间.

例如，例 1 中的向量空间  $ V_1 $、例 4 中的向量空间  $ S $ 均为  $ n $ 维向量空间  $ \mathbb{R}^n $ 的子空间。特别地，对于任何由  $ n $ 维向量组成的集合  $ V $，总有  $ V \subseteq \mathbb{R}^n $。所以只要  $ V $ 是向量空间，那么  $ V $ 就是  $ \mathbb{R}^n $ 的子空间。

## 二、向量空间的基、维数与坐标

定义 4 向量空间 V 中的 r 个向量  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 如果满足下列条件：

(1) $ \alpha_{1},\alpha_{2},\cdots,\alpha_{r} $ 线性无关；

(2) 向量空间 V 中任一向量都可以由  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 线性表示.

则称  $ \alpha_1, \alpha_2, \cdots, \alpha_r $ 为向量空间  $ V $ 的一个基，数  $ r $ 称为向量空间的维数，记为  $ \dim(V) = r $，并称  $ V $ 为  $ r $ 维向量空间。

向量空间 V 如果只含有一个零向量，则这个向量空间没有基，它的维数为 0.

例 7 由本章第一节的例 3 和第二节的例 1 可知，向量组

 $$ \boldsymbol{e}_{1}=\left(\begin{array}{c}1\\ 0\\ \vdots\\ 0\end{array}\right),\quad\boldsymbol{e}_{2}=\left(\begin{array}{c}0\\ 1\\ \vdots\\ 0\end{array}\right),\quad\cdots,\quad\boldsymbol{e}_{n}=\left(\begin{array}{c}0\\ 0\\ \vdots\\ 1\end{array}\right) $$

就是 $ \mathbb{R}^{n} $的一个基，因此， $ \dim(\mathbb{R}^{n})=n $。我们将 $ \mathbb{R}^{n} $称为 $ n $维向量空间。

容易验证，向量组

 $$ \boldsymbol{\alpha}_{1}=\left(\begin{array}{c}1\\ 0\\ 0\\ \vdots\\ 0\end{array}\right),\quad\boldsymbol{\alpha}_{2}=\left(\begin{array}{c}1\\ 1\\ 0\\ \vdots\\ 0\end{array}\right),\quad\boldsymbol{\alpha}_{3}=\left(\begin{array}{c}1\\ 1\\ 1\\ \vdots\\ 0\end{array}\right),\quad\cdots,\quad\boldsymbol{\alpha}_{n}=\left(\begin{array}{c}1\\ 1\\ 1\\ \vdots\\ 1\end{array}\right) $$

也是 n 维向量空间  $ R^n $ 的一个基。由此可见，向量空间的基是不唯一的，但是任意两个基等价，并且所含向量的个数相同，所以向量空间的维数的定义不依赖于基的选择。

向量空间

 $$ V_{1}=\left\{\left(\begin{aligned}&0\\ &a_{2}\\ &\vdots\\ &a_{n}\end{aligned}\right)\middle|a_{2},\cdots,a_{n}\in\mathbb{R}\right\} $$

的一个基可取为

 $$ \boldsymbol{e}_{2}=\left(\begin{array}{l}0\\ 1\\ 0\\ \vdots\\ 0\end{array}\right),\quad\boldsymbol{e}_{3}=\left(\begin{array}{l}0\\ 0\\ 1\\ \vdots\\ 0\end{array}\right),\quad\cdots,\quad\boldsymbol{e}_{n}=\left(\begin{array}{l}0\\ 0\\ 0\\ \vdots\\ 1\end{array}\right), $$

所以  $ V_{1} $ 是 n-1 维向量空间.

如果 $n$ 元齐次线性方程组 $Ax = 0$ 的系数矩阵的秩 $R(A) = r$，它的基础解系为 $\xi_1, \xi_2, \cdots, \xi_{n-r}$，则 $\xi_1, \xi_2, \cdots, \xi_{n-r}$ 就是解空间 $S$ 的基，解空间 $S$ 的维数为

 $$ \dim(S)=n-r=n-R(A). $$

将向量空间

 $$ \mathfrak{L}(\mathbf{\alpha}_{1},\mathbf{\alpha}_{2},\cdots,\mathbf{\alpha}_{s})=\{\mathbf{\alpha}=k_{1}\mathbf{\alpha}_{1}+k_{2}\mathbf{\alpha}_{2}+\cdots+k_{s}\mathbf{\alpha}_{s}\mid k_{1},\ k_{2},\ \cdots,\ k_{s}\in\mathbb{R}\} $$

看成向量组，则它与向量组  $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_s $ 等价，因此向量组  $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_s $ 的极大无关组就是向量空间  $ \mathfrak{L}(\alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_s) $ 的基，向量组  $ \alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_s $ 的秩就是向量空间  $ \mathfrak{L}(\alpha_1 $， $ \alpha_2 $， $ \cdots $， $ \alpha_s) $ 的维数.

命题1 如果  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 是向量空间 V 的一个基，则 V 中任一向量  $ \beta $ 均可以由  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 唯一线性表示.

证明 由基的定义可知，V 中任一向量  $ \beta $ 均可以由  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 线性表示. 下面证明表示式是唯一的.

设存在数  $ \lambda_{1}, \lambda_{2}, \cdots, \lambda_{r} $ 及  $ \mu_{1}, \mu_{2}, \cdots, \mu_{r} $，使得

 $$ \boldsymbol{\beta}=\lambda_{1}\boldsymbol{\alpha}_{1}+\lambda_{2}\boldsymbol{\alpha}_{2}+\cdots+\lambda_{r}\boldsymbol{\alpha}_{r} $$

以及

 $$ \boldsymbol{\beta}=\mu_{1}\boldsymbol{\alpha}_{1}+\mu_{2}\boldsymbol{\alpha}_{2}+\cdots+\mu_{r}\boldsymbol{\alpha}_{r}, $$

两式相减的

 $$ \mathbf{0}=\left(\lambda_{1}-\mu_{1}\right)\boldsymbol{\alpha}_{1}+\left(\lambda_{2}-\mu_{2}\right)\boldsymbol{\alpha}_{2}+\cdots+\left(\lambda_{r}-\mu_{r}\right)\boldsymbol{\alpha}_{r}. $$

由基 $ \alpha_{1} $， $ \alpha_{2} $， $ \cdots $， $ \alpha_{r} $线性无关可得

 $$ \lambda_{1}=\mu_{1},\ \lambda_{2}=\mu_{2},\ \cdots,\ \lambda_{r}=\mu_{r}, $$

因此向量 $ \beta $可由 $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $唯一的线性表示.

定义 5 如果  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 是向量空间 V 的一个基，则 V 中任一向量  $ \beta $ 可唯一线性表示为

 $$ \boldsymbol{\beta}=\lambda_{1}\boldsymbol{\alpha}_{1}+\lambda_{2}\boldsymbol{\alpha}_{2}+\cdots+\lambda_{r}\boldsymbol{\alpha}_{r}, $$

则称常数  $ \lambda_{1}, \lambda_{2}, \cdots, \lambda_{r} $ 为向量  $ \beta $ 在基  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 下的坐标.

取$\mathbb{R}^n$的一个基为$\boldsymbol{e}_1, \boldsymbol{e}_2, \cdots, \boldsymbol{e}_n$，则由本章第一节的例3可知，$\mathbb{R}^n$中任一向量$\boldsymbol{\alpha} = \begin{pmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{pmatrix}$在基$\boldsymbol{e}_1, \boldsymbol{e}_2, \cdots, \boldsymbol{e}_n$下的坐标就是向量$\boldsymbol{\alpha}$的$n$个分量$a_1, a_2, \cdots, a_n$。

例8 验证  $ \alpha_1 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} $， $ \alpha_2 = \begin{pmatrix} 2 \\ 1 \\ -1 \end{pmatrix} $， $ \alpha_3 = \begin{pmatrix} -1 \\ 1 \\ -3 \end{pmatrix} $ 是  $ \mathbb{R}^3 $ 的一个基，并求向量  $ \beta = \begin{pmatrix} 2 \\ -1 \\ 6 \end{pmatrix} $ 在这组基下的坐标.

解 要验证  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 是  $ \mathbb{R}^{3} $ 的一组基，只要验证  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 线性无关，也就是只

要验证（$\alpha_1$，$\alpha_2$，$\alpha_3$）$\tilde{L}$ $E$ 即可。设 $\beta$ 在这组基下的坐标为 $x_1$，$x_2$，$x_3$，即

$\left(\alpha_1, \alpha_2, \alpha_3\right)\begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \beta$，记作 $Ax = \beta$。对矩阵 $(A \mid \beta)$ 作行初等变换，若 $A$ 能变成 $E$，则 $\alpha_1$，

$\alpha_2$，$\alpha_3$ 是 $\mathbb{R}^3$ 的一组基，且当 $A$ 变成 $E$ 时，$\beta$ 变成了 $x = A^{-1}\beta$。

$(A \mid \beta) = \begin{pmatrix} 1 & 2 & -1 \\ 0 & 1 & 1 \\ 1 & -1 & -3 \end{pmatrix} \xrightarrow{-1} \begin{pmatrix} 1 & 2 & -1 \\ 0 & 1 & 1 \\ 0 & -3 & -2 \end{pmatrix} \xrightarrow{-1} \begin{pmatrix} 1 & 2 & -1 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{pmatrix} \xrightarrow{-1} \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} \xrightarrow{-2} \begin{pmatrix} 7 \\ -2 \\ 1 \end{pmatrix}$，

因为 $A = (\alpha_1$，$\alpha_2$，$\alpha_3)$ $\tilde{L}E$，所以 $\alpha_1$，$\alpha_2$，$\alpha_3$ 是 $\mathbb{R}^3$ 的一个基，且向量 $\beta = \begin{pmatrix} 2 \\ -1 \\ 6 \end{pmatrix}$ 在这组基

下的坐标为 $\begin{pmatrix} 7 \\ -2 \\ 1 \end{pmatrix}$。

## 三、基变换与坐标变换

定义 6 设  $ \alpha_1, \alpha_2, \cdots, \alpha_n $ 与  $ \beta_1, \beta_2, \cdots, \beta_n $ 是  $ n $ 维向量空间  $ V $ 的两个基，存在系数矩阵  $ P_{n \times n} $，使得

 $ \begin{pmatrix}

\beta_1, \beta_2, \cdots, \beta_n = (\alpha_1, \alpha_2, \cdots, \alpha_n) P.

\end{pmatrix} $

矩阵  $ P_{n \times n} $ 称为从基  $ \alpha_1, \alpha_2, \cdots, \alpha_n $ 到基  $ \beta_1, \beta_2, \cdots, \beta_n $ 的过渡矩阵.

显然，从基  $ \alpha_1, \alpha_2, \cdots, \alpha_n $ 到基  $ \beta_1, \beta_2, \cdots, \beta_n $ 的过渡矩阵  $ P_{n \times n} $ 是可逆矩阵.

例 9 取定  $ \mathbb{R}^3 $ 中两组基  $ \alpha_1 = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} $， $ \alpha_2 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} $， $ \alpha_3 = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} $ 和  $ \beta_1 = \begin{pmatrix} 1 \\ 1 \\ -2 \end{pmatrix} $， $ \beta_2 = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} $，

 $ \beta_3 = \begin{pmatrix} -1 \\ 2 \\ 1 \end{pmatrix} $，求从基  $ \alpha_1, \alpha_2, \alpha_3 $ 到基  $ \beta_1, \beta_2, \beta_3 $ 的过渡矩阵  $ P $.

解 记矩阵  $ A = (\alpha_1, \alpha_2, \alpha_3) $， $ B = (\beta_1, \beta_2, \beta_3) $，则从自然基  $ e_1, e_2, e_3 $ 到基  $ \alpha_1, \alpha_2, \alpha_3 $ 的过渡矩阵就是  $ A $，从基  $ e_1, e_2, e_3 $ 到基  $ \beta_1, \beta_2, \beta_3 $ 的过渡矩阵就是  $ B $.

干是有

 $$ (\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{3})=(\boldsymbol{e}_{1},\boldsymbol{e}_{2},\boldsymbol{e}_{3})\boldsymbol{B}=(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3})\boldsymbol{A}^{-1}\boldsymbol{B}. $$

记  $ P = A^{-1}B $，则矩阵 P 就是从基  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 到基  $ \beta_{1}, \beta_{2}, \beta_{3} $ 的过渡矩阵.

 $$ \left(\boldsymbol{A}\left|\boldsymbol{B}\right.\right)=\left(\begin{aligned}&\left.1\quad1\quad0\quad\right|\quad\left.1\quad1\quad-1\right.\\&\left.1\quad0\quad1\quad\right|\quad\left.1\quad2\quad2\right.\\&\left.0\quad1\quad1\quad\right|-2\quad3\quad1\end{aligned}\right)\rightarrow\left(\begin{aligned}&\left.1\quad0\quad0\quad\right|\quad\left.2\quad0\quad0\quad\right.\\&\left.0\quad1\quad0\quad\right|-1\quad1\quad-1\quad\\&\left.0\quad0\quad1\quad\right|-1\quad2\quad2\end{aligned}\right), $$

因此

 $$ \boldsymbol{P}=\boldsymbol{A}^{-1}\boldsymbol{B}=\begin{pmatrix}{{{2}}}&{{{0}}}&{{{0}}} \\{{{-1}}}&{{{1}}}&{{{-1}}} \\{{{-1}}}&{{{2}}}&{{{2}}}\end{pmatrix}. $$

设  $ \alpha_1, \alpha_2, \cdots, \alpha_n $ 与  $ \beta_1, \beta_2, \cdots, \beta_n $ 是  $ \mathbb{R}^n $ 的两个基，任一向量  $ \alpha \in \mathbb{R}^n $ 在基  $ \alpha_1, \alpha_2, \cdots, \alpha_n $ 与基  $ \beta_1, \beta_2, \cdots, \beta_n $ 下的坐标分别为  $ (x_1, x_2, \cdots, x_n)^{\mathrm{T}} $ 和  $ (y_1, y_2, \cdots, y_n)^{\mathrm{T}} $，即

 $$ \boldsymbol{\alpha}=(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\cdots,\boldsymbol{\alpha}_{n})\begin{pmatrix}x_{1}\\ x_{2}\\ \vdots\\ x_{n}\end{pmatrix},\boldsymbol{\alpha}=(\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\cdots,\boldsymbol{\beta}_{n})\begin{pmatrix}y_{1}\\ y_{2}\\ \vdots\\ y_{n}\end{pmatrix}. $$

令矩阵  $  A = (\alpha_{1}, \alpha_{2}, \cdots, \alpha_{n})  $， $  B = (\beta_{1}, \beta_{2}, \cdots, \beta_{n})  $，则有

 $$ \begin{aligned}\boldsymbol{A}\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix}&=\boldsymbol{B}\begin{pmatrix}y_{1}\\y_{2}\\\vdots\\y_{n}\end{pmatrix}.\end{aligned} $$

于是得到

 $$ \begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix}=\boldsymbol{A}^{-1}\boldsymbol{B}\begin{pmatrix}y_{1}\\y_{2}\\\vdots\\y_{n}\end{pmatrix}=\boldsymbol{P}\begin{pmatrix}y_{1}\\y_{2}\\\vdots\\y_{n}\end{pmatrix} $$

或

 $$ \begin{pmatrix}y_{1}\\y_{2}\\\vdots\\y_{n}\end{pmatrix}=\boldsymbol{B}^{-1}\boldsymbol{A}\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix}=\boldsymbol{P}^{-1}\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix}. $$

其中  $ P=A^{-1}B $ 是从基  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{n} $ 到基  $ \beta_{1}, \beta_{2}, \cdots, \beta_{n} $ 的过渡矩阵.

定义 7 式 (5-1) 称为从坐标  $ (y_{1}, y_{2}, \cdots, y_{n})^{\mathrm{T}} $ 到坐标  $ (x_{1}, x_{2}, \cdots, x_{n})^{\mathrm{T}} $ 的坐标变换公式；式 (5-2) 称为从坐标  $ (x_{1}, x_{2}, \cdots, x_{n})^{\mathrm{T}} $ 到坐标  $ (y_{1}, y_{2}, \cdots, y_{n})^{\mathrm{T}} $ 的坐标变换公式.

例10 已知向量  $ \boldsymbol{\alpha} \in \mathbb{R}^3 $ 在基  $ \boldsymbol{\alpha}_1 = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} $， $ \boldsymbol{\alpha}_2 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} $， $ \boldsymbol{\alpha}_3 = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} $ 下的坐标是  $ \begin{pmatrix} 8 \\ -2 \\ 4 \end{pmatrix} $，求  $ \boldsymbol{\alpha} $ 在基  $ \boldsymbol{\beta}_1 = \begin{pmatrix} 1 \\ 1 \\ -2 \end{pmatrix} $， $ \boldsymbol{\beta}_2 = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} $， $ \boldsymbol{\beta}_3 = \begin{pmatrix} -1 \\ 2 \\ 1 \end{pmatrix} $ 下的坐标。

解 设  $ \alpha $ 在基  $ \beta_{1}, \beta_{2}, \beta_{3} $ 下的坐标为  $ (y_{1}, y_{2}, y_{3})^{\mathrm{T}} $，由例 9 知，从基  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $

到基  $ \beta_{1}, \beta_{2}, \beta_{3} $ 的过渡矩阵为  $ \boldsymbol{P} = \begin{pmatrix} 2 & 0 & 0 \\ -1 & 1 & -1 \\ -1 & 2 & 2 \end{pmatrix} $，易求得  $ \boldsymbol{P}^{-1} = \begin{pmatrix} \frac{1}{2} & 0 & 0 \\ \frac{3}{8} & \frac{1}{2} & \frac{1}{4} \\ -\frac{1}{8} & -\frac{1}{2} & \frac{1}{4} \end{pmatrix} $，于是由

式(5-2)有

 $$ \begin{pmatrix}y_{1}\\y_{2}\\y_{3}\end{pmatrix}=\boldsymbol{P}^{-1}\begin{pmatrix}x_{1}\\x_{2}\\x_{3}\end{pmatrix}=\begin{pmatrix}\dfrac{1}{2}&0&0\\\dfrac{3}{8}&\dfrac{1}{2}&\dfrac{1}{4}\\-\dfrac{1}{8}&-\dfrac{1}{2}&\dfrac{1}{4}\end{pmatrix}\begin{pmatrix}8\\-2\\4\end{pmatrix}=\begin{pmatrix}4\\3\\1\end{pmatrix}. $$

### 习题3-5

1\. 判断下列集合对通常的向量加法和数乘运算是否构成向量空间，并说明理由：

(1)  $ V_1 = \{\mathbf{x} = (x_1, x_2, \cdots, x_n)^\mathrm{T} \mid x_1, \cdots, x_n \in \mathbb{R}\}  $ 且满足  $ x_1 + \cdots + x_n = 0 $;

(2)  $ V_2 = \{\mathbf{x} = (x_1, x_2, \cdots, x_n)^{\mathrm{T}} \mid x_1, \cdots, x_n \in \mathbb{R}\} $ 且满足  $ x_1 + \cdots + x_n = 1 $;

(3)  $ V_3 = \{\mathbf{x} = (x_1, x_2, \cdots, x_n)^{\mathrm{T}} \mid x_1, \cdots, x_n \in \mathbb{R} $ 且  $ x_1 = x_2 = \cdots = x_n\} $.

2. 设向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{s} $ 与向量组  $ \beta_{1}, \beta_{2}, \cdots, \beta_{t} $ 等价，记

 $$ \mathfrak{L}_{1}(\mathbf{\alpha}_{1},\mathbf{\alpha}_{2},\cdots,\mathbf{\alpha}_{s})=\{\mathbf{\alpha}=k_{1}\mathbf{\alpha}_{1}+k_{2}\mathbf{\alpha}_{2}+\cdots+k_{s}\mathbf{\alpha}_{s}\mid k_{1},\mathbf{\alpha}_{2},\cdots,\mathbf{\alpha}_{s}\in\mathbb{R}\}, $$

 $$ \mathfrak{L}_{2}(\pmb{\beta}_{1},\pmb{\beta}_{2},\cdots,\pmb{\beta}_{t})=\{\pmb{\beta}=k_{1}\pmb{\beta}_{1}+k_{2}\pmb{\beta}_{2}+\cdots+k_{t}\pmb{\beta}_{t}\mid k_{1},\ p_{1},\ p_{2},\ p_{3},\ p_{4}\in\mathbb{R}\}, $$

证明： $ \mathfrak{L}(\alpha_{1}, \alpha_{2}, \cdots, \alpha_{s}) = \mathfrak{L}_{2}(\beta_{1}, \beta_{2}, \cdots, \beta_{t}) $.

3. 设向量组

 $$ \boldsymbol{\alpha}_{1}=\left(\begin{aligned}1\\ 2\\ 3\\ -1\end{aligned}\right),\quad\boldsymbol{\alpha}_{2}=\left(\begin{aligned}2\\ 2\\ 2\\ -1\end{aligned}\right),\quad\boldsymbol{\alpha}_{3}=\left(\begin{aligned}2\\ 3\\ 1\\ 1\end{aligned}\right),\quad\boldsymbol{\alpha}_{4}=\left(\begin{aligned}3\\ 2\\ 1\\ -1\end{aligned}\right),\quad\boldsymbol{\alpha}_{5}=\left(\begin{aligned}-1\\ -1\\ 2\\ -2\end{aligned}\right), $$

求向量空间  $ \mathfrak{L}(\alpha_1, \alpha_2, \alpha_3, \alpha_4, \alpha_5) = |\alpha = k_1\alpha_1 + k_2\alpha_2 + k_3\alpha_3 + k_4\alpha_4 + k_5\alpha_5|k_1, k_2, k_3, k_4, k_5 \in \mathbb{R} $ 的基与维数.

4. 验证

(1)

 $$ \boldsymbol{\alpha}_{1}=\left(\begin{aligned}1\\ 0\\ 0\\ 0\end{aligned}\right),\quad\boldsymbol{\alpha}_{2}=\left(\begin{aligned}1\\ 1\\ 0\\ 0\end{aligned}\right),\quad\boldsymbol{\alpha}_{3}=\left(\begin{aligned}1\\ 1\\ 1\\ 0\end{aligned}\right),\quad\boldsymbol{\alpha}_{4}=\left(\begin{aligned}1\\ 1\\ 1\\ 1\end{aligned}\right) $$

是 $ \mathbb{R}^4 $的一个基，并求 $ \boldsymbol{\alpha}=(1,1,2,1)^{\mathrm{T}} $在这个基下的坐标.

(2)

 $$ \boldsymbol{\beta}_{1}=\begin{pmatrix}1\\ 0\\ 1\\ 1\end{pmatrix},\boldsymbol{\beta}_{2}=\begin{pmatrix}1\\ 1\\ 0\\ 1\end{pmatrix},\boldsymbol{\beta}_{3}=\begin{pmatrix}1\\ 1\\ 1\\ 0\end{pmatrix},\boldsymbol{\beta}_{4}=\begin{pmatrix}0\\ 1\\ 1\\ 1\end{pmatrix} $$

也是ℝ⁴的一个基，并求从基 α₁，α₂，α₃，α₄ 到基 β₁，β₂，β₃，β₄ 的过渡矩阵 P，以及 α=(1，1，2，1)ᵀ 在基 β₁，β₂，β₃，β₄ 下的坐标.

### 本章小结

本章小结

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>向量、向量组</td><td style='text-align: center; word-wrap: break-word;'>理解n维向量、向量组的概念以及向量组与矩阵的对应理解向量组的线性组合以及向量能由向量组线性表示的概念熟悉 向量能由向量组线性表示的判断方法理解 向量组B能由向量组A线性表示、两向量组等价的概念熟悉 向量组B能由向量组A线性表示的判断方法</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>向量组的线性相关性</td><td style='text-align: center; word-wrap: break-word;'>理解向量组线性相关、线性无关的概念熟悉 向量组线性相关、线性无关的判断方法理解 向量组线性相关性理论的一些主要结论</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>向量组的秩与矩阵的秩</td><td style='text-align: center; word-wrap: break-word;'>理解向量组的极大无关组的概念和向量组的秩的概念理解矩阵的秩的概念理解矩阵的秩与向量组的秩之间的关系熟悉 矩阵的秩的求法熟悉 向量组的极大无关组以及向量组的秩的求法</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>线性方程组解的结构</td><td style='text-align: center; word-wrap: break-word;'>熟悉 齐次线性方程组的基础解系的求法理解基础解系与系数矩阵的秩之间的关系理解 齐次线性方程组的解的结构理解 非齐次线性方程组的解的结构</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>向量空间</td><td style='text-align: center; word-wrap: break-word;'>理解向量空间的概念熟悉 向量组生成的向量空间、齐次线性方程组的解空间等向量空间的例子理解 向量空间的基、维数、向量在基下的坐标等概念熟悉 向量空间的基、维数、向量在基下的坐标的求法</td></tr></table>

#### 经济学中的线性模型

哈佛大学教授列昂·昂夫(Wassily Leontief)把美国经济分解为了500个部门，如煤炭工业、汽车工业、交通系统等。对每个部门，他写出了一个描述该部门的产出该如何分配给其他经济部门的线性方程。在1949年，Mark II（当时计算能力最强的计算机之一）还不能处理所得到的包含500个未知数、500个方程的方程组，列昂·昂夫只好把问题化为包含42个未知数、42个方程的方程组。后来，列昂·昂夫获得了1973年的诺贝尔经济学奖，他打开了研究经济数学模型的新时代的大门。1949年他在哈佛的工作标志着应用计算机分析大规模数学模型的开始。从那以后，许多其他领域中的研究者也开始应用计算机来分析数学模型。由于所涉及的数据数量庞大，这些模型通常是线性的，即它们是用线性方程组来描述的。例如石油勘探，当使用勘探船来寻找海底石油的储藏情况时，它的计算机每天要解几千个线性方程组。

## 一、填空题

1. 设  $ \alpha_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix} $， $ \alpha_2 = \begin{pmatrix} -1 \\ 1 \end{pmatrix} $ 与  $ \beta_1 = \begin{pmatrix} -1 \\ 0 \end{pmatrix} $， $ \beta_2 = \begin{pmatrix} 2 \\ 3 \end{pmatrix} $ 是  $ \mathbb{R}^2 $ 的两个基，则从基  $ \alpha_1 $， $ \alpha_2 $ 到基  $ \beta_1 $， $ \beta_2 $ 的过渡矩阵为___。

2. 已知两个向量组

 $$ \boldsymbol{\alpha}_{1}=\left(\begin{aligned}1\\ 0\\ 1\end{aligned}\right),\quad\boldsymbol{\alpha}_{2}=\left(\begin{aligned}0\\ 1\\ 1\end{aligned}\right),\quad\boldsymbol{\alpha}_{3}=\left(\begin{aligned}1\\ 1\\ 0\end{aligned}\right) 与 \boldsymbol{\beta}_{1}=\left(\begin{aligned}1\\ 1\\ 1\end{aligned}\right),\quad\boldsymbol{\beta}_{2}=\left(\begin{aligned}1\\ 2\\ 3\end{aligned}\right),\quad\boldsymbol{\beta}_{3}=\left(\begin{aligned}3\\ 4\\ a\end{aligned}\right), $$

并且向量组  $ \alpha_1 $， $ \alpha_2 $， $ \alpha_3 $ 不能由向量组  $ \beta_1 $， $ \beta_2 $， $ \beta_3 $ 线性表示，则  $ a = $ ___.

3. 设 3 阶矩阵  $ A = \begin{pmatrix} 1 & 2 & -2 \\ 2 & 1 & 2 \\ 3 & 0 & 4 \end{pmatrix} $，向量  $ \alpha = \begin{pmatrix} a \\ 1 \\ 1 \end{pmatrix} $，已知  $ A\alpha $ 与  $ \alpha $ 线性相关，则  $ a = $ ___.

4. 设  $ A = \begin{pmatrix} \lambda & 1 & 1 \\ 0 & \lambda - 1 & 0 \\ 1 & 1 & \lambda \end{pmatrix} $， $ b = \begin{pmatrix} a \\ 1 \\ 1 \end{pmatrix} $，已知线性方程组 Ax = b 存在 2 个不同的解，则  $ \lambda = $ ___； $ a = $ ___。

## 二、选择题

1. 设向量组  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 线性无关，则下列向量组线性相关的是().

A.  $ \alpha_{1}-\alpha_{2} $， $ \alpha_{2}-\alpha_{3} $， $ \alpha_{3}-\alpha_{1} $ B.  $ \alpha_{1}+\alpha_{2} $， $ \alpha_{2}+\alpha_{3} $， $ \alpha_{3}+\alpha_{1} $ C.  $ \alpha_{1}-2\alpha_{2} $， $ \alpha_{2}-2\alpha_{3} $， $ \alpha_{3}-2\alpha_{1} $ D.  $ \alpha_{1}+2\alpha_{2} $， $ \alpha_{2}+2\alpha_{3} $， $ \alpha_{3}+2\alpha_{1} $

2. 设向量组 I： $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 可由向量组 II： $ \beta_{1}, \beta_{2}, \cdots, \beta_{s} $ 线性表示，则下列选项正确的是( ).

A. 当 r < s 时，向量组Ⅱ必线性相关

B. 当  $ r \geq s $ 时，向量组Ⅱ必线性相关

C. 当 r < s 时，向量组 I 必线性相关

D. 当  $ r \geq s $ 时，向量组 I 必线性相关

3. 设 A，B 为满足 AB=0 的任意两个非零矩阵，则必有( ).

A. A 的列向量组线性相关，B 的行向量组线性相关

B. A 的列向量组线性相关，B 的列向量组线性相关

C. A 的行向量组线性相关，B 的行向量组线性相关

D. A 的行向量组线性相关，B 的列向量组线性相关

4. 设  $ \alpha_1, \alpha_2, \cdots, \alpha_s $ 均为  $ n $ 维列向量， $ A $ 是  $ m \times n $ 矩阵，下列选项正确的是（）.

A. 若  $ \alpha_1, \alpha_2, \cdots, \alpha_s $ 线性相关，则  $ A\alpha_1, A\alpha_2, \cdots, A\alpha_s $ 线性相关

B. 若  $ \alpha_1, \alpha_2, \cdots, \alpha_s $ 线性相关，则  $ A\alpha_1, A\alpha_2, \cdots, A\alpha_s $ 线性无关

C. 若  $ \alpha_1, \alpha_2, \cdots, \alpha_s $ 线性无关，则  $ A\alpha_1, A\alpha_2, \cdots, A\alpha_s $ 线性相关

D. 若  $ \alpha_1, \alpha_2, \cdots, \alpha_s $ 线性无关，则  $ A\alpha_1, A\alpha_2, \cdots, A\alpha_s $ 线性无关

5. 设  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 是三维向量空间  $ \mathbb{R}^{3} $ 的一组基，则由基  $ \alpha_{1}, \frac{1}{2}\alpha_{2}, \frac{1}{3}\alpha_{3} $ 到基  $ \alpha_{1} + $

2， $ \alpha_{2}+\alpha_{3} $， $ \alpha_{3}+\alpha_{1} $ 的过渡矩阵为（）.

A.  $ \begin{pmatrix} 1 & 0 & 1 \\ 2 & 2 & 0 \\ 0 & 3 & 3 \end{pmatrix} $ B.  $ \begin{pmatrix} 1 & 2 & 0 \\ 0 & 2 & 3 \\ 1 & 0 & 3 \end{pmatrix} $ C.  $ \begin{pmatrix} \frac{1}{2} & \frac{1}{4} & -\frac{1}{6} \\ -\frac{1}{2} & \frac{1}{4} & \frac{1}{6} \\ \frac{1}{2} & -\frac{1}{4} & \frac{1}{6} \end{pmatrix} $ D.  $ \begin{pmatrix} \frac{1}{2} & -\frac{1}{2} & \frac{1}{2} \\ \frac{1}{4} & \frac{1}{4} & -\frac{1}{4} \\ -\frac{1}{6} & \frac{1}{6} & \frac{1}{6} \end{pmatrix} $

## 三、解答题

1. 设四维向量组  $ \boldsymbol{\alpha}_{1} = (1 + a, 1, 1, 1)^{\mathrm{T}} $,  $ \boldsymbol{\alpha}_{2} = (2, 2 + a, 2, 2)^{\mathrm{T}} $,  $ \boldsymbol{\alpha}_{3} = (3, 3, 3 + a, 3)^{\mathrm{T}} $,  $ \boldsymbol{\alpha}_{4} = (4, 4, 4, 4 + a)^{\mathrm{T}} $, 问  $ a $ 为何值时,  $ \alpha_{1} $,  $ \alpha_{2} $,  $ \alpha_{3} $,  $ \alpha_{4} $ 线性相关? 当  $ \alpha_{1} $,  $ \alpha_{2} $,  $ \alpha_{3} $,  $ \alpha_{4} $ 线性相关时, 求其一个极大无关组, 并将其余向量用该极大无关组线性表示.

2. 已知 3 阶矩阵 A 的第一行是  $ (a, b, c) $，a，b，c 不全为零，矩阵  $ B = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 3 & 6 & k \end{pmatrix} (k $ 为常数），且 AB = 0，求线性方程组 Ax = 0 的通解.

3. 设  $ A = \begin{pmatrix} 1 & -1 & -1 \\ -1 & 1 & 1 \\ 0 & -4 & -2 \end{pmatrix} $， $ \xi_1 = \begin{pmatrix} -1 \\ 1 \\ -2 \end{pmatrix} $.

(1) 求满足  $ A\xi_2 = \xi_1 $， $ A^2\xi_3 = \xi_1 $ 的所有向量  $ \xi_2 $， $ \xi_3 $

(2)对(1)中的任意向量 $ \xi_{2} $， $ \xi_{3} $，证明 $ \xi_{1} $， $ \xi_{2} $， $ \xi_{3} $线性无关.

4. 已知非齐次线性方程组  $ \left\{\begin{aligned}&x_{1}+x_{2}+x_{3}+x_{4}=-1,\\&4x_{1}+3x_{2}+5x_{3}-x_{4}=-1,\\&ax_{1}+x_{2}+3x_{3}+bx_{4}=1\end{aligned}\right. $，有 3 个线性无关的解，(1) 证明方程组系数矩阵 A 的秩  $ R(A)=2 $；(2) 求 a，b 的值及方程组的通解.

5. 设 n 元线性方程组 Ax=b，其中

 $$ \begin{aligned}A&=\begin{pmatrix}2a&1&&&&\\a^{2}&2a&1&&&&\\&a^{2}&2a&1&&&\\&&\ddots&\ddots&\ddots&\\&&&a^{2}&2a&1&\\&&&&a^{2}&2a\end{pmatrix}_{n\times n},\quad\boldsymbol{x}=\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix},\quad\boldsymbol{b}=\begin{pmatrix}1\\0\\\vdots\\0\end{pmatrix}.\end{aligned} $$

(1) 证明行列式  $ \left|A\right|=(n+1)a^{n} $;

(2) 当 a 为何值时，该方程组有唯一解，并求  $ x_{1} $;

(3) 当 a 为何值时，该方程组有无穷多解，并求通解.

6. 设  $ A = (\alpha_1, \alpha_2, \alpha_3, \alpha_4) $ 是 4 阶矩阵， $ A^* $ 为  $ A $ 的伴随矩阵，若  $ (1, 0, 1, 0)^{\mathrm{T}} $ 是方程组  $ Ax = 0 $ 的一个基础解系，求  $ A^*x = 0 $ 的一个基础解系.
