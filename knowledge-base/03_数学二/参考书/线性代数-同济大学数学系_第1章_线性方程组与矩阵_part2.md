# 二、求解线性方程组

> 来源：docs/08_电子书/线性代数-同济大学数学系.md
> 科目：数学二（302） ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：542d072d2e071a92


对于 n 元线性方程组

 $$ \begin{cases}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}=b_{1},\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}=b_{2},\\\cdots\cdots\cdots\\a_{m1}x_{1}+a_{m2}x_{2}+\cdots+a_{mn}x_{n}=b_{m}.\end{cases} $$

如果  $ b_{i}(i=1,2,\cdots,m) $ 不全为零，那么这个线性方程组称为 n 元非齐次线性方程组，如例 1 中的方程组就是 3 元非齐次线性方程组。如果  $ b_{1}=b_{2}=\cdots=b_{m}=0 $，即形如

 $$ \begin{cases}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}=0,\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}=0,\\\cdots\cdots\cdots\\a_{m1}x_{1}+a_{m2}x_{2}+\cdots+a_{mn}x_{n}=0.\end{cases} $$

的线性方程组称为 n 元齐次线性方程组. 显然, 齐次线性方程组一定有解  $ x_{1}=x_{2}=\cdots=x_{n}=0 $, 这个解称为齐次线性方程组的零解. 如果齐次线性方程组有唯一解, 则这个唯一解必定是零解. 当齐次线性方程组有无穷多解时, 我们称齐次线性方程组有非零解. 下面, 我们用矩阵的初等行变换来求解线性方程组.

消元法解线性方程组的过程就是对线性方程组的增广矩阵做初等行变换，将原方程组的增广矩阵先化为行阶梯形矩阵，然后再化为行最简形矩阵的过程。而增广矩阵的行最简形矩阵所对应的线性方程组与原线性方程组是同解的。因此，解 n 元非齐次线性方程组的具体步骤如下：

（1）写出线性方程组(3-1)的增广矩阵 $ \widetilde{A} $;

（2）对 $ \tilde{A} $实施初等行变换，化为行最简形矩阵 $ \tilde{R} $;

（3）写出以 $ R $为增广矩阵的线性方程组；

（4）以第一个非零元为系数的未知量作为固定未知量，留在等号的左边，其余的未知量作为自由未知量，移到等号右边，并令自由未知量为任意常数，从而求得线性方程组的解.

例4 解方程组 $ \left\{\begin{aligned}x_{1}-x_{2}+2x_{3}-2x_{4}&=1,\\ x_{2}+x_{3}+2x_{4}&=-1,\\ 2x_{1}-x_{2}+5x_{3}-2x_{4}&=1,\\ x_{1}-x_{2}&=-4x_{4}=3.\end{aligned}\right. $

解 对该线性方程组的增广矩阵实施初等行变换，得

 $$ \begin{aligned}\widetilde{\boldsymbol{A}}&=\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{2}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{2}}}&{{{-1}}} \\{{{2}}}&{{{-1}}}&{{{5}}}&{{{-2}}}&{{{1}}} \\{{{1}}}&{{{-1}}}&{{{0}}}&{{{-4}}}&{{{3}}}\end{pmatrix}\xrightarrow{\boldsymbol{r}_{3}+(-2)\boldsymbol{r}_{1}}\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{2}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{2}}}&{{{-1}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{2}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{-2}}}&{{{-2}}}&{{{2}}}\end{pmatrix}\end{aligned} $$

 $$ \xrightarrow[-\frac{1}{2}]\left(r_{3}+(-1)r_{2}\right)\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{2}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{2}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}}\end{pmatrix}\xrightarrow{r_{3}\leftrightarrow r_{4}}\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{2}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{2}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix} $$

 $$ \begin{aligned}\xrightarrow{\boldsymbol{r}_{2}+(-1)\boldsymbol{r}_{3}}\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{0}}}&{{{-4}}}&{{{3}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}\xrightarrow{\boldsymbol{r}_{1}+\boldsymbol{r}_{2}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}}&{{{-3}}}&{{{3}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix},\end{aligned} $$

从而原方程组等价于 $ \left\{\begin{aligned}x_{1}&=-3x_{4}=3,\\ x_{2}&+x_{4}=0,\\ x_{3}+x_{4}&=-1,\\ 0&=0.\end{aligned}\right. $，令 $ x_{4}=c $，移项，得原方程组的解为： $ \left\{\begin{aligned}x_{1}&=3+3c,\\ x_{2}&=-c,\\ x_{3}&=-1-c,\\ x_{4}&=c,\end{aligned}\right. $其

中 c 为任意常数.

例5 解方程组 $ \left\{\begin{aligned}x_{1}+x_{2}-2x_{3}&=1,\\ 3x_{1}+8x_{2}+x_{3}&=-2,\\ 7x_{1}+2x_{2}-21x_{3}&=13.\end{aligned}\right. $

解 对该线性方程组的增广矩阵实施初等行变换，得

 $$ \widetilde{\mathbf{A}}=\left(\begin{matrix}{1}&{1}&{-2}&{1}\\ {3}&{8}&{1}&{-2}\\ {7}&{2}&{-21}&{13}\\ \end{matrix}\right)\xrightarrow[r_{3}+(-7)r_{1}]{r_{2}+(-3)r_{1}}\left(\begin{matrix}{1}&{1}&{-2}&{1}\\ {0}&{5}&{7}&{-5}\\ {0}&{-5}&{-7}&{6}\\ \end{matrix}\right)\xrightarrow{\mathbf{r}_{3}+\mathbf{r}_{2}}\left(\begin{matrix}{1}&{1}&{-2}&{1}\\ {0}&{5}&{7}&{-5}\\ {0}&{0}&{0}&{1}\\ \end{matrix}\right), $$

从而原方程组等价于 $ \left\{\begin{aligned}x_{1}+x_{2}-2x_{3}&=1,\\ 5x_{2}+7x_{3}&=-5,\\ 0&=1.\end{aligned}\right. $，最后一个方程为矛盾方程，所以原方程组无解.

从例1、例4、例5可以看出，若线性方程组(3-1)的增广矩阵为 $ \widetilde{A} $， $ \widetilde{R} $为 $ \widetilde{A} $的行最简形，则关于线性方程组(3-1)的解，我们有以下命题：

命题 （1）线性方程组(3-1)有解的充分必要条件是第一个非零元不出现在  $ \widetilde{R} $ 的最后一列；

(2) 线性方程组(3-1)有唯一解的充分必要条件是第一个非零元不出现在  $ \widetilde{R} $ 的最后一列，且第一个非零元的个数等于未知量的个数；

（3）线性方程组(3-1)有无穷多解的充分必要条件是第一个非零元不出现在 $ \widetilde{R} $的最后一列，且第一个非零元的个数小于未知量的个数.

证明 只需证明条件的充分性，因为(1)、(2)、(3)的必要性可分别由(2)、(3)，(1)、(3)和(1)、(2)的充分性利用反证法得到. 对线性方程组(3-1)的增广矩阵 $ \widetilde{A} $实施初等行变换，化为行最简形矩阵 $ \widetilde{R} $，为了书写方便，不妨设 $ \widetilde{R} $为

 $$ \widetilde{\mathbf{R}}=\left(\begin{matrix}{1}&{0}&{\cdots}&{0}&{c_{11}}&{\cdots}&{c_{1,n-r}}&{d_{1}}\\ {0}&{1}&{\cdots}&{0}&{c_{21}}&{\cdots}&{c_{2,n-r}}&{d_{2}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}\\ {0}&{0}&{\cdots}&{1}&{c_{r1}}&{\cdots}&{c_{r,n-r}}&{d_{r}}\\ {0}&{0}&{\cdots}&{0}&{0}&{\cdots}&{0}&{d_{r+1}}\\ {0}&{0}&{\cdots}&{0}&{0}&{\cdots}&{0}&{0}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}\\ {0}&{0}&{\cdots}&{0}&{0}&{\cdots}&{0}&{0}\\ \end{matrix}\right). $$

（1）如果首先出现在最后一列，即  $ d_{r+1}=1 $，于是  $ \widetilde{R} $ 的第 r 行对应矛盾方程 0=1，从而线性方程组 (3-1) 无解.

（2）当 $ d_{r+1}=0 $（或 $ d_{r+1} $不出现），且首元的个数等于未知量的个数时， $ \widetilde{R} $变为

 $$ \widetilde{\cal R}=\left(\begin{matrix}{1}&{0}&{0}&{\cdots}&{0}&{d_{1}}\\ {\vdots}&{\vdots}&{\vdots}&{\cdots}&{\vdots}&{\vdots}\\ {0}&{0}&{0}&{\cdots}&{1}&{d_{n}}\\ {0}&{0}&{0}&{\cdots}&{0}&{0}\\ {\vdots}&{\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}\\ {0}&{0}&{0}&{\cdots}&{0}&{0}\\ \end{matrix}\right), $$

 $ \tilde{R} $ 对应的方程组为

 $$ \begin{cases}x_{1}=d_{1},\\x_{2}=d_{2},\\\cdots\cdots\cdots\cdots\\x_{n}=d_{n}.\end{cases} $$

从而线性方程组 $ (3-1) $有唯一解.

（3）当 $ d_{r+1}=0 $（或 $ d_{r+1} $不出现），且第一个非零元的个数小于未知量的个数时， $ \widetilde{R} $变为

 $$ \widetilde{\cal R}=\left(\begin{matrix}{1}&{0}&{\cdots}&{0}&{c_{11}}&{\cdots}&{c_{1,n-r}}&{d_{1}}\\ {0}&{1}&{\cdots}&{0}&{c_{21}}&{\cdots}&{c_{2,n-r}}&{d_{2}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}\\ {0}&{0}&{\cdots}&{1}&{c_{r1}}&{\cdots}&{c_{r,n-r}}&{d_{r}}\\ {0}&{0}&{\cdots}&{0}&{0}&{\cdots}&{0}&{0}\\ {0}&{0}&{\cdots}&{0}&{0}&{\cdots}&{0}&{0}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}\\ {0}&{0}&{\cdots}&{0}&{0}&{\cdots}&{0}&{0}\\ \end{matrix}\right), $$

 $ \tilde{R} $ 对应的方程组为

 $$ \begin{cases}x_{1}=-c_{11}x_{r+1}-c_{12}x_{r+2}-c_{1,n-r}x_{n}+d_{1},\\x_{2}=-c_{21}x_{r+1}-c_{22}x_{r+2}-c_{2,n-r}x_{n}+d_{2},\\\cdots\cdots\cdots\\x_{r}=-c_{r1}x_{r+1}-c_{r2}x_{r+2}-c_{r,n-r}x_{n}+d_{r}.\end{cases} $$

令自由未知数  $ x_{r+1}=k_1 $， $ x_{r+2}=k_2 $， $ \cdots $， $ x_n=k_{n-r} $，即得线性方程组（3-1）的含有 n-r 个参数的解

 $$ \left\{\begin{aligned}x_{1}&=-c_{11}k_{1}-c_{12}k_{2}-c_{1,n-r}k_{n-r}+d_{1},\\ x_{2}&=-c_{21}k_{1}-c_{22}k_{2}-c_{2,n-r}k_{n-r}+d_{2},\\ &\cdots\cdots\cdots\cdots\\ x_{r}&=-c_{r1}k_{1}-c_{r2}k_{2}-c_{r,n-r}k_{n-r}+d_{r},\\ x_{r+1}&=k_{1},\\ x_{r+2}&=k_{2},\\ &\cdots\cdots\cdots\cdots\\ x_{n}&=k_{n-r}.\end{aligned}\right. $$

从而线性方程组 $ (3-1) $有无穷多解.

对于 n 元齐次线性方程组（3-2），由于等号右端的常数项全为零，所以只需对方程组的系数矩阵实施初等行变换即可.

例6 解线性方程组 $ \left\{\begin{aligned}3x_{1}+2x_{2}+5x_{3}&=0,\\ 3x_{1}-2x_{2}+6x_{3}&=0,\\ 2x_{1}&+5x_{3}=0.\end{aligned}\right. $

解 对该线性方程组的系数矩阵实施初等行变换，得

 $$ \begin{pmatrix}{{{3}}}&{{{2}}}&{{{5}}} \\{{{3}}}&{{{-2}}}&{{{6}}} \\{{{2}}}&{{{0}}}&{{{5}}}\end{pmatrix}\xrightarrow{r_{1}\leftrightarrow r_{3}}\begin{pmatrix}{{{2}}}&{{{0}}}&{{{5}}} \\{{{3}}}&{{{-2}}}&{{{6}}} \\{{{3}}}&{{{2}}}&{{{5}}}\end{pmatrix}\xrightarrow{\frac{1}{2}r_{1}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{\frac{5}{2}}}} \\{{{3}}}&{{{-2}}}&{{{6}}} \\{{{0}}}&{{{4}}}&{{{-1}}}\end{pmatrix}\xrightarrow{r_{2}+(-3)r_{1}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{\frac{5}{2}}}} \\{{{0}}}&{{{-2}}}&{{{-\frac{3}{2}}}} \\{{{0}}}&{{{4}}}&{{{-1}}}\end{pmatrix} $$

 $$ \begin{aligned}\xrightarrow{r_{3}+2r_{2}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{\frac{5}{2}}}} \\{{{0}}}&{{{-2}}}&{{{-\frac{3}{2}}}} \\{{{0}}}&{{{0}}}&{{{-4}}}\end{pmatrix}\xrightarrow{r_{2}+\left(-\frac{3}{8}\right)r_{3}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{-2}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{-4}}}\end{pmatrix}\xrightarrow{\left(-\frac{1}{2}\right)r_{2}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}}\end{pmatrix},\end{aligned} $$

所以该线性方程组只有零解.

例7 解方程组 $ \left\{\begin{aligned}x_{1}+x_{2}-2x_{3}+x_{4}&=0,\\ 2x_{1}-x_{2}-x_{3}+x_{4}&=0,\\ 3x_{1}+6x_{2}-9x_{3}+7x_{4}&=0,\\ 4x_{1}-6x_{2}+2x_{3}-2x_{4}&=0.\end{aligned}\right. $

解 对该线性方程组的系数矩阵实施初等行变换，得

 $$ \begin{pmatrix}{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}} \\{{{2}}}&{{{-1}}}&{{{-1}}}&{{{1}}} \\{{{3}}}&{{{6}}}&{{{-9}}}&{{{7}}} \\{{{4}}}&{{{-6}}}&{{{2}}}&{{{-2}}}\end{pmatrix}\xrightarrow{\begin{pmatrix}{{{\boldsymbol{r}_{2}+(-2)\boldsymbol{r}_{1}}}} \\{{{\boldsymbol{r}_{3}+(-3)\boldsymbol{r}_{1}}}} \\{{{\boldsymbol{r}_{4}+(-4)\boldsymbol{r}_{1}}}}\end{pmatrix}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{-3}}}&{{{3}}}&{{{-1}}} \\{{{0}}}&{{{3}}}&{{{-3}}}&{{{4}}} \\{{{0}}}&{{{-10}}}&{{{10}}}&{{{-6}}}\end{pmatrix}\xrightarrow{\boldsymbol{r}_{3}+\boldsymbol{r}_{2}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{-3}}}&{{{3}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{3}}} \\{{{0}}}&{{{-10}}}&{{{10}}}&{{{-6}}}\end{pmatrix} $$

 $$ \xrightarrow[\frac{1}{3}\boldsymbol{r}_{3}]{r_{4}+2\boldsymbol{r}_{3}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{-3}}}&{{{3}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{-10}}}&{{{10}}}&{{{0}}}\end{pmatrix}\xrightarrow{\left(-\frac{1}{10}\right)\boldsymbol{r}_{4}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{-3}}}&{{{3}}}&{{{-1}}}\end{pmatrix}\xrightarrow{\boldsymbol{r}_{4}+3\boldsymbol{r}_{2}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{-1}}}\end{pmatrix} $$

 $$ \xrightarrow[r_{1}+(-1)r_{3}]{r_{4}+r_{3}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{-2}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}\xrightarrow{r_{1}+(-1)r_{2}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{-1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}. $$

从而原方程组等价于 $ \left\{\begin{aligned}x_{1}-x_{3}&=0,\\ x_{2}-x_{3}&=0,\\ x_{4}&=0.\end{aligned}\right. $，令 $ x_{3}=c $，移项，得原方程组的解为： $ \left\{\begin{aligned}x_{1}&=c,\\ x_{2}&=c,\\ x_{3}&=c,\\ x_{4}&=0,\end{aligned}\right. $其中c为

任意常数.

## 习题1-3

1. 用初等行变换将下列矩阵化为行最简形矩阵：

(1)

 $$ \begin{pmatrix}{{{2}}}&{{{2}}}&{{{0}}}&{{{2}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}} \\{{{1}}}&{{{2}}}&{{{1}}}&{{{0}}} \\{{{2}}}&{{{5}}}&{{{3}}}&{{{-1}}}\end{pmatrix}; $$

(2)

 $$ \begin{pmatrix}0&1&1&-1\\0&2&-3&1\\0&4&-7&-1\\0&3&-4&3\end{pmatrix}; $$

(3)

 $$ \begin{pmatrix}{{{3}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{-1}}}&{{{3}}} \\{{{0}}}&{{{2}}}&{{{-4}}} \\{{{2}}}&{{{-1}}}&{{{4}}}\end{pmatrix}. $$

2. 解下列齐次线性方程组：

(1)

 $$ \left\{\begin{aligned}x_{1}+&x_{2}-x_{3}=0,\\ 3x_{1}+&x_{2}+4x_{3}=0,\\ &x_{1}-2x_{2}+3x_{3}=0;\end{aligned}\right. $$

(2)

 $$ \left\{\begin{aligned}x_{1}-5x_{2}+2x_{3}-3x_{4}&=0,\\ 2x_{1}+4x_{2}+2x_{3}+x_{4}&=0,\\ 5x_{1}+3x_{2}+6x_{3}-x_{4}&=0;\end{aligned}\right. $$

(3)

 $$ \left\{\begin{aligned}x_{1}&+2x_{2}+3x_{3}+&x_{4}&=0,\\ 2x_{1}&+4x_{2}&-x_{4}&=0,\\ x_{1}&+2x_{2}-9x_{3}-5x_{4}&=0,\\ -x_{1}&-2x_{2}+3x_{3}+2x_{4}&=0.\end{aligned}\right. $$

3. 解下列非齐次线性方程组：

(1)

 $$ \left\{\begin{aligned}x_{1}&-2x_{2}+4x_{3}=-5,\\ 2x_{1}&+3x_{2}+x_{3}=4,\\ 3x_{1}&+8x_{2}-2x_{3}=13;\end{aligned}\right. $$

(2)

 $$ \left\{\begin{aligned}&2x_{1}+3x_{2}&-x_{4}=0,\\ &3x_{1}+x_{2}+5x_{3}-4x_{4}=2,\\ &\quad7x_{2}-10x_{3}+5x_{4}=-4,\\ &3x_{1}-6x_{2}+15x_{3}-9x_{4}=1；\end{aligned}\right. $$

(3)

 $$ \left\{\begin{aligned}x_{1}+2x_{2}-x_{3}&=0,\\ 3x_{1}-2x_{2}+x_{3}&=4,\\ x_{1}-x_{2}-x_{3}&=6;\end{aligned}\right. $$

(4)

 $$ \left\{\begin{aligned}x_{1}-x_{2}+&2x_{3}-x_{4}=1,\\ 2x_{1}-2x_{2}+&\quad x_{3}\quad=1,\\ x_{1}+&\quad x_{2}-2x_{3}-x_{4}=-1,\\ x_{1}-&\quad x_{2}+x_{3}+x_{4}=2.\end{aligned}\right. $$

4. 设有齐次线性方程组  $ \left\{\begin{aligned}x_{1}+x_{2}+\lambda x_{3}&=0,\\ x_{1}+\lambda x_{2}+x_{3}&=0,\\ \lambda x_{1}+x_{2}+x_{3}&=0,\end{aligned}\right. $，当  $ \lambda $ 取何值时该方程组只有零解？当  $ \lambda $ 取何值时该方程组有非零解？并在有非零解时求出全部解.

5. 设有非齐次线性方程组  $ \left\{\begin{aligned}x_{1}+x_{2}-2x_{3}+3x_{4}&=0,\\ 2x_{1}+x_{2}-6x_{3}+4x_{4}&=-1,\\ 3x_{1}+2x_{2}+px_{3}+7x_{4}&=-1,\\ x_{1}-x_{2}-6x_{3}-x_{4}&=t,\end{aligned}\right. $ 讨论 p，t 的取值对该方程组解的影响，并在有无穷多解时求其解.

### [课前导读]

我们知道，在实数的运算中有逆的概念，即如果 ab=ba=1，则有 b=a^{-1} 和 a=b^{-1}。本节我们也在矩阵的运算中引入类似的概念，即方阵的逆，并给出逆矩阵的性质和求法。在学习本节前，需要读者熟悉矩阵的初等变换。

### 1. 逆矩阵的定义

定义 1 设 A 为 n 阶方阵，如果存在 n 阶方阵 B 使得

 $$ \boldsymbol{A}\boldsymbol{B}=\boldsymbol{B}\boldsymbol{A}=\boldsymbol{E} $$

其中，E 为 n 阶单位方阵，则称矩阵 A 是可逆的，矩阵 B 称为 A 的逆矩阵；否则称 A 是不可逆的.

如果矩阵A可逆，则A的逆矩阵一定是唯一的. 这是因为，若矩阵B、C都满足

 $$ \boldsymbol{A}\boldsymbol{B}=\boldsymbol{B}\boldsymbol{A}=\boldsymbol{E}, Ⅲ \boldsymbol{A}\boldsymbol{C}=\boldsymbol{C}\boldsymbol{A}=\boldsymbol{E}, $$

由于矩阵乘法满足结合律，于是

 $$ \boldsymbol{C}=\boldsymbol{C}\boldsymbol{E}=\boldsymbol{C}\left(\boldsymbol{A}\boldsymbol{B}\right)=\left(\boldsymbol{C}\boldsymbol{A}\right)\boldsymbol{B}=\boldsymbol{E}\boldsymbol{B}=\boldsymbol{B}. $$

所以 A 的逆矩阵一定是唯一的. A 的逆矩阵记为  $ A^{-1} $

### 2. 逆矩阵的性质

（1）若A可逆，则 $ A^{-1} $也可逆，并且 $ (\boldsymbol{A}^{-1})^{-1}=\boldsymbol{A} $;

（2）若矩阵  $ A_1 $， $ A_2 $，⋯， $ A_s $ 都可逆，则它们的乘积  $ A_1A_2\cdots A_s $ 也可逆，并且  $ (A_1A_2\cdots A_s)^{-1}=A_s^{-1}\cdots A_2^{-1}A_1^{-1} $；

（3）若A可逆，则 $ A^{T} $也可逆，并且 $ (A^{T})^{-1}=(A^{-1})^{\mathrm{T}} $;

（4）若 A 可逆并且数  $ k \neq 0 $，则 kA 也可逆，并且  $ (kA)^{-1} = k^{-1}A^{-1} $

证明 我们用逆矩阵的定义验证性质(3)，其余性质留给读者自己验证.

由 $A$ 可逆推出 $A^{-1}$ 存在，且 $AA^{-1} = A^{-1}A = E$，于是有 $(AA^{-1})^{\mathrm{T}} = (A^{-1}A)^{\mathrm{T}} = E^{\mathrm{T}}$。由矩阵转置的运算规律得

 $$ \left(\boldsymbol{A}^{-1}\right)^{\mathrm{T}}\boldsymbol{A}^{\mathrm{T}}=\boldsymbol{A}^{\mathrm{T}}\left(\boldsymbol{A}^{-1}\right)^{\mathrm{T}}=\boldsymbol{E}. $$

所以 $ (\boldsymbol{A}^{\mathrm{T}})^{-1}=(\boldsymbol{A}^{-1})^{\mathrm{T}} $

例1 若矩阵A有全零行（全零列），那么矩阵A一定不可逆.

证明 假设矩阵 A 的第 i 行是全零行，则对任何一个矩阵 B，矩阵 AB 的第 i 行总是全为零，从而不存在矩阵 B 使得 AB = BA = E，所以矩阵 A 不可逆. 类似可证，若矩阵 A 有全零列，那么矩阵 A 一定不可逆.

例2 设  $ A^{k}=O(k $ 为正整数 $，证明： $ (E-A)^{-1}=E+A+A^{2}+\cdots+A^{k-1} $

证明 因为  $ A^{k}=O $，于是

 $$ \begin{aligned}\left(\boldsymbol{E}-\boldsymbol{A}\right)\left(\boldsymbol{E}+\boldsymbol{A}+\boldsymbol{A}^{2}+\cdots+\boldsymbol{A}^{k-1}\right)&=\boldsymbol{E}\left(\boldsymbol{E}+\boldsymbol{A}+\boldsymbol{A}^{2}+\cdots+\boldsymbol{A}^{k-1}\right)-\boldsymbol{A}\left(\boldsymbol{E}+\boldsymbol{A}+\boldsymbol{A}^{2}+\cdots+\boldsymbol{A}^{k-1}\right)\\&=\boldsymbol{E}+\boldsymbol{A}+\boldsymbol{A}^{2}+\cdots+\boldsymbol{A}^{k-1}-\boldsymbol{A}-\boldsymbol{A}^{2}-\cdots-\boldsymbol{A}^{k-1}-\boldsymbol{A}^{k}\\&=\boldsymbol{E}-\boldsymbol{A}^{k}=\boldsymbol{E},\end{aligned} $$

 $$ \begin{align*}\left(\boldsymbol{E}+\boldsymbol{A}+\boldsymbol{A}^{2}+\cdots+\boldsymbol{A}^{k-1}\right)\left(\boldsymbol{E}-\boldsymbol{A}\right)&=\left(\boldsymbol{E}+\boldsymbol{A}+\boldsymbol{A}^{2}+\cdots+\boldsymbol{A}^{k-1}\right)\boldsymbol{E}-\left(\boldsymbol{E}+\boldsymbol{A}+\boldsymbol{A}^{2}+\cdots+\boldsymbol{A}^{k-1}\right)\boldsymbol{A}\\&=\boldsymbol{E}+\boldsymbol{A}+\boldsymbol{A}^{2}+\cdots+\boldsymbol{A}^{k-1}-\boldsymbol{A}-\boldsymbol{A}^{2}-\cdots-\boldsymbol{A}^{k-1}-\boldsymbol{A}^{k}\\&=\boldsymbol{E}-\boldsymbol{A}^{k}=\boldsymbol{E}.\end{align*} $$

所以 $E-A$ 可逆，且 $(E-A)^{-1}=E+A+A^{2}+\cdots+A^{k-1}$。

下面我们介绍几类最基本的可逆矩阵.

## 二、初等矩阵

定义 2 对 n 阶单位矩阵 E 实施一次初等变换得到的矩阵称为 n 阶初等矩阵.

由于初等变换有三种，对 n 阶单位矩阵 E 实施一次初等变换得到的初等矩阵也有三类.

（1）交换单位阵 E 的第 i 行和第 j 行，或交换 E 的第 i 列和第 j 列，得到的初等矩阵记为  $ E(i, j) $，即

初等矩阵

 $$ \boldsymbol{E}(i,j)=\begin{pmatrix}1&&&&&\\&\ddots&&&&\\&&0&&1&\\&&&\ddots&&\\&&1&&0&\\&&&&&\ddots&\\&&&&&&1\end{pmatrix} 第 i 行 .\\ 第 j 行 $$

（2）用非零的数 k 乘单位阵 E 的第 i 行或第 i 列得到的初等矩阵记为  $ E(i(k)) $，即

 $$ \boldsymbol{E}(i(k))=\begin{pmatrix}1&&&&&\\&\ddots&&&&\\&&1&&&\\&&&k&&\\&&&&1&\\&&&&&\ddots&\\&&&&&&1\end{pmatrix} 第 i 行． $$

（3）将单位阵 E 的第 i 行乘以 k 加到第 j 行（或将单位阵 E 的第 j 列乘以 k 加到第 i 列）得到的矩阵记为  $ E(i(k), j) $，即

 $$ \boldsymbol{E}(i(k),j)=\begin{pmatrix}1&&&&&\\&\ddots&&&&\\&&1&&0&\\&&&\ddots&&\\&&k&&1&\\&&&&&\ddots&\\&&&&&&1\end{pmatrix} 第 i 行 \\ 第 j 行 $$

关于初等变换与初等矩阵的关系，我们有下面的结论.

命题 1 初等矩阵都是可逆的，并且初等矩阵的逆矩阵仍为同一类型的初等矩阵，即

 $$ \boldsymbol{E}\mathbf{\Phi}(i,j)^{-1}=\boldsymbol{E}(i,j),\mathbf{\Phi}\boldsymbol{E}\mathbf{\Phi}(i(k))^{-1}=\boldsymbol{E}\left(i\left(\frac{1}{k}\right)\right),\mathbf{\Phi}\boldsymbol{E}\mathbf{\Phi}(i(k),j)^{-1}=\boldsymbol{E}(i(-k),j). $$

证明 直接计算得：

 $$ \boldsymbol{E}(i,j)\boldsymbol{E}(i,j)=\boldsymbol{E},\ \boldsymbol{E}(i(k))\boldsymbol{E}\Biggl(i\Biggl(\frac{1}{k}\Biggr)\Biggr)=\boldsymbol{E}\Biggl(i\Biggl(\frac{1}{k}\Biggr)\Biggr)\boldsymbol{E}(i(k))=\boldsymbol{E}, $$

 $$ \boldsymbol{E}(i(k),j)\boldsymbol{E}(i(-k),j)=\boldsymbol{E}(i(-k),j)\boldsymbol{E}(i(k),j)=\boldsymbol{E}. $$

所以

 $$ \boldsymbol{E}(i,j)^{-1}=\boldsymbol{E}(i,j),\ \boldsymbol{E}(i(k))^{-1}=\boldsymbol{E}\left(i\left(\frac{1}{k}\right)\right),\ \boldsymbol{E}(i(k),j)^{-1}=\boldsymbol{E}(i(-k),j). $$

命题2 设A是一个 $ m\times n $矩阵，对A施行一次初等行变换，相当于在A的左边乘以相应的m阶初等矩阵；对A施行一次初等列变换，相当于在A的右边乘以相应的n阶初等矩阵.

证明 只需理解初等变换的意义，然后用矩阵乘法直接验证即可，具体验证留给读者.

例3 设 $ A=(a_{ij}) $是一个3阶方阵，试求一个3阶可逆矩阵P，使得

 $$ \begin{aligned}PA=\begin{pmatrix}a_{11}&a_{12}&a_{13}\\a_{31}+ka_{11}&a_{32}+ka_{12}&a_{33}+ka_{13}\\a_{21}&a_{22}&a_{23}\end{pmatrix}.\end{aligned} $$

解 矩阵 PA 可看成是先交换矩阵 A 的第 2 行和第 3 行得到矩阵 B，再将矩阵 B 的第 1 行乘以数 k 加到第 2 行得到的. 根据命题 2，这相当于先后用初等矩阵  $ E(2, 3) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & 1 & 0 \end{pmatrix} $、 $ E(1(k), 2) = \begin{pmatrix} 1 & 0 & 0 \\ k & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} $ 左乘矩阵 A，即

 $$ \boldsymbol{P}\boldsymbol{A}=\boldsymbol{E}(1(k),2)\boldsymbol{E}(2,3)\boldsymbol{A}, $$

所以

 $$ \boldsymbol{P}=\boldsymbol{E}(1(k),2)\boldsymbol{E}(2,3)=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{k}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}}\end{pmatrix}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{0}}}\end{pmatrix}=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{k}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{0}}}\end{pmatrix}. $$

另外，矩阵 PA 也可看成是先将矩阵 A 的第 1 行乘以数 k 加到第 3 行得到矩阵 B，再交换矩阵 B 的第 2 行和第 3 行得到的，即

 $$ \boldsymbol{P}\boldsymbol{A}=\boldsymbol{E}(2,3)\boldsymbol{E}(1(k),3)\boldsymbol{A}, $$

所以

 $$ \boldsymbol{P}=\boldsymbol{E}(2,3)\boldsymbol{E}(1(k),3)=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{0}}}\end{pmatrix}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{0}}} \\{{{k}}}&{{{0}}}&{{{1}}}\end{pmatrix}=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{k}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{0}}}\end{pmatrix}. $$

## 三、初等矩阵与逆矩阵的应用

首先，我们利用初等矩阵和初等变换给出一个方阵可逆的判别条件.

定理1 下面命题互相等价：

（1）n阶方阵A可逆；

（2）方阵A行等价于n阶单位矩阵E；

初等行变换的应用

（3）方阵A可表示为一些初等方阵的乘积.

证明 为了证明的方便，我们采取(1) $ \Rightarrow(2)\Rightarrow(3)\Rightarrow(1) $的方式来证明.

(1) $\Rightarrow$ (2)：由本章第三节的定理 1 可知，方阵 $A$ 经过若干次初等行变换可化为行最简形矩阵 $R$。再由命题 1 可知，这相当于存在若干个初等矩阵 $P_1$，$P_2$，$\cdots$，$P_s$，使得 $P_s \cdots P_2P_1A = R$。由于初等矩阵都可逆，若 $A$ 可逆，则根据逆矩阵的性质知 $P_s \cdots P_2P_1A = R$ 可逆，从而行最简形矩阵 $R$ 没有全零行，这迫使 $R = E$，即 $P_s \cdots P_2P_1A = E$，所以方阵 $A$ 行等价于 $n$ 阶单位矩阵 $E$。

(2)  $ \Rightarrow $ (3)：若方阵  $ A $ 行等价于  $ n $ 阶单位矩阵  $ E $，则存在若干个初等矩阵  $ P_1 $， $ P_2 $， $ \cdots $， $ P_s $，使得  $ P_s \cdots P_2 P_1 A = E $。由于初等矩阵都可逆且其逆矩阵仍为初等矩阵，记  $ P_1 $， $ P_2 $， $ \cdots $， $ P_s $ 的逆矩阵分别为  $ P_1^{-1} $， $ P_2^{-1} $， $ \cdots $， $ P_s^{-1} $，于是

 $$ \boldsymbol{P}_{1}^{-1}\boldsymbol{P}_{2}^{-1}\cdots\boldsymbol{P}_{s}^{-1}(\boldsymbol{P}_{s}\cdots\boldsymbol{P}_{2}\boldsymbol{P}_{1}\boldsymbol{A})=\boldsymbol{P}_{1}^{-1}\boldsymbol{P}_{2}^{-1}\cdots\boldsymbol{P}_{s}^{-1}\boldsymbol{E}, $$

即  $ A = P_1^{-1} P_2^{-1} \cdots P_s^{-1} $。也就是说，A 可表示为初等方阵  $ P_1^{-1} $， $ P_2^{-1} $， $ \cdots $， $ P_s^{-1} $ 的乘积。

(3)  $ \Rightarrow $ (1)：设方阵  $ A = P_1 P_2 \cdots P_s $，其中  $ P_1, P_2, \cdots, P_s $ 均为初等矩阵，由于初等矩阵均可逆，于是它们的乘积  $ A = P_1 P_2 \cdots P_s $ 也可逆.

由定理 1 的证明可知，若 n 阶方阵 A 可逆，则存在一个可逆阵  $ P = P_s \cdots P_2 P_1 $，使得 PA = E，于是

 $$ \boldsymbol{A}^{-1}=(\boldsymbol{P}_{1}^{-1}\boldsymbol{P}_{2}^{-1}\cdots\boldsymbol{P}_{s}^{-1})^{-1}=\boldsymbol{P}_{s}\cdots\boldsymbol{P}_{2}\boldsymbol{P}_{1}=\boldsymbol{P}. $$

构造一个分块矩阵 $ (\boldsymbol{A}|\boldsymbol{E}) $，做分块矩阵的乘法：

 $$ \boldsymbol{P}(\boldsymbol{A}\mid\boldsymbol{E})=(\boldsymbol{P}\boldsymbol{A}\mid\boldsymbol{P}\boldsymbol{E})=(\boldsymbol{E}\mid\boldsymbol{P})=(\boldsymbol{E}\mid\boldsymbol{A}^{-1}). $$

上式等价于对分块矩阵( $ A \mid E $)实施了若干次初等行变换，当A变成E时，E就变成了 $ A^{-1} $.所以，定理1给出了判别矩阵A是否可逆，并在可逆时求 $ A^{-1} $的一种方法：

（1）首先构造分块矩阵 $ (\boldsymbol{A}|\boldsymbol{E}) $;

（2）对矩阵 $ (\boldsymbol{A}|\boldsymbol{E}) $实施初等行变换，将 $ (\boldsymbol{A}|\boldsymbol{E}) $化为行最简形矩阵；

（3）如果A不能行等价于E，则矩阵A不可逆；若A能行等价于E，则A可逆，且E就行等价于 $ A^{-1} $.

例 4 判断下列矩阵是否可逆，若可逆则求其逆矩阵.

(1)

 $$ \begin{pmatrix}1&1&-2\\2&-1&-1\\3&6&-9\end{pmatrix}; $$

(2)

 $$ \begin{pmatrix}1&1&1\\1&2&3\\1&3&6\end{pmatrix}. $$

解 (1)  $ \begin{pmatrix}1&1&-2\\2&-1&-1\\3&6&-9\end{pmatrix}\begin{array}{l}1&0&0\\0&1&0\\0&0&1\end{array}\xrightarrow{\boldsymbol{r}_{2}+(-2)\boldsymbol{r}_{1}}\begin{pmatrix}1&1&-2\\0&-3&3\\0&3&-3\end{pmatrix}\begin{pmatrix}1&0&0\\-2&1&0\\-3&0&1\end{pmatrix}\xrightarrow{\boldsymbol{r}_{3}+\boldsymbol{r}_{2}} $

 $ \begin{pmatrix}1&1&-2\\0&-3&3\\0&0&0\end{pmatrix}\begin{array}{l}1&0&0\\-2&1&0\\-5&1&1\end{array} $,

由于阶梯阵 $ \begin{pmatrix}1&1&-2\\0&-3&3\\0&0&0\end{pmatrix} $最后一行全为零，所以矩阵 $ \begin{pmatrix}1&1&-2\\2&-1&-1\\3&6&-9\end{pmatrix} $不可逆.

(2)

 $$ \begin{pmatrix}{{{1}}}&{{{1}}}&{{{1}}}&{{{1}}}&{{{0}}}&{{{0}}} \\{{{1}}}&{{{2}}}&{{{3}}}&{{{0}}}&{{{1}}}&{{{0}}} \\{{{1}}}&{{{3}}}&{{{6}}}&{{{0}}}&{{{0}}}&{{{1}}}\end{pmatrix}\xrightarrow{r_{2}+(-1)r_{1}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{1}}}&{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{2}}}&{{{-1}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{2}}}&{{{5}}}&{{{-1}}}&{{{0}}}&{{{1}}}\end{pmatrix}\xrightarrow{r_{3}+(-2)r_{2}} $$

 $$ \begin{pmatrix}{{{1}}}&{{{1}}}&{{{1}}}&{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{2}}}&{{{-1}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}}\end{pmatrix}\xrightarrow{r_{2}+(-2)r_{3}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{0}}}&{{{0}}}&{{{2}}}&{{{-1}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{-3}}}&{{{5}}}&{{{-2}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}}\end{pmatrix}\xrightarrow{r_{1}+(-1)r_{2}} $$

 $$ \begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}}&{{{3}}}&{{{-3}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{-3}}}&{{{5}}}&{{{-2}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}}\end{pmatrix}, $$

所以矩阵 $ \begin{pmatrix}1&1&1\\1&2&3\\1&3&6\end{pmatrix} $可逆，并且

 $$ \begin{pmatrix}{{{1}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{2}}}&{{{3}}} \\{{{1}}}&{{{3}}}&{{{6}}}\end{pmatrix}^{-1}=\begin{pmatrix}{{{3}}}&{{{-3}}}&{{{1}}} \\{{{-3}}}&{{{5}}}&{{{-2}}} \\{{{1}}}&{{{-2}}}&{{{1}}}\end{pmatrix}. $$

利用逆矩阵还可以求解矩阵方程 AX=B、XA=B 和 AXB=C.

若矩阵A可逆，则有

 $$ \boldsymbol{A}^{-1}(\boldsymbol{A}\boldsymbol{X})=\boldsymbol{A}^{-1}\boldsymbol{B}\Rightarrow(\boldsymbol{A}^{-1}\boldsymbol{A})\boldsymbol{X}=\boldsymbol{A}^{-1}\boldsymbol{B}\Rightarrow\boldsymbol{X}=\boldsymbol{A}^{-1}\boldsymbol{B}, $$

 $$ (\boldsymbol{X}\boldsymbol{A})\boldsymbol{A}^{-1}=\boldsymbol{B}\boldsymbol{A}^{-1}\Rightarrow\boldsymbol{X}(\boldsymbol{A}\boldsymbol{A}^{-1})=\boldsymbol{B}\boldsymbol{A}^{-1}\Rightarrow\boldsymbol{X}=\boldsymbol{B}\boldsymbol{A}^{-1}. $$

若矩阵A、B可逆均可逆，则有

 $$ \boldsymbol{A}^{-1}(\boldsymbol{A}\boldsymbol{X}\boldsymbol{B})\boldsymbol{B}^{-1}=\boldsymbol{A}^{-1}\boldsymbol{C}\boldsymbol{B}^{-1}\Rightarrow(\boldsymbol{A}^{-1}\boldsymbol{A})\boldsymbol{X}(\boldsymbol{B}\boldsymbol{B}^{-1})=\boldsymbol{A}^{-1}\boldsymbol{C}\boldsymbol{B}^{-1}\Rightarrow\boldsymbol{X}=\boldsymbol{A}^{-1}\boldsymbol{C}\boldsymbol{B}^{-1}. $$

值得注意的是，由于矩阵乘法不满足交换律，在解矩阵方程时必须分清楚逆矩阵是“左乘”还是“右乘”.

解矩阵方程也可以用初等行变换的方法. 对于方程 AX=B, 构造分块矩阵(A∣B), 并对(A∣B)实施初等行变换化为行最简形矩阵. 如果 A 变为 E, 则说明 A 可逆, 这时 B 就变成了 X=A^{-1}B.

例 5 解下列矩阵方程：

(1)

 $$ \begin{pmatrix}{{{-1}}}&{{{4}}} \\{{{-2}}}&{{{7}}}\end{pmatrix}\boldsymbol{X}=\begin{pmatrix}{{{2}}}&{{{-1}}}&{{{3}}} \\{{{1}}}&{{{0}}}&{{{-2}}}\end{pmatrix}; $$

 $$ \boldsymbol{X}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-2}}} \\{{{0}}}&{{{-2}}}&{{{1}}} \\{{{-2}}}&{{{-1}}}&{{{5}}}\end{pmatrix}=\begin{pmatrix}{{{-1}}}&{{{1}}}&{{{0}}} \\{{{1}}}&{{{2}}}&{{{-1}}}\end{pmatrix}; $$

(3) $ \begin{pmatrix}1&1\\-1&-2\end{pmatrix}X\begin{pmatrix}-1&1&0\\0&1&-1\\1&0&-2\end{pmatrix}=\begin{pmatrix}1&-1&0\\-1&0&1\end{pmatrix}. $

解 (1)  $ \begin{pmatrix}-1&4\\-2&7\end{pmatrix}\begin{array}{r}2&-1\\1&0\end{array} $  $ \xrightarrow{r_{2}+(-2)r_{1}}\begin{pmatrix}1&-4\\0&-1\end{pmatrix}\begin{array}{r}-2&1&-3\\-3&2&-8\end{pmatrix}\xrightarrow{r_{1}+(-4)r_{2}}  $ \begin{pmatrix}1&0\\0&1\end{pmatrix} $ 10  $ -7&-2&8 $

所以  $ X=\begin{pmatrix}10&-7&29\\3&-2&8\end{pmatrix} $

（2）对于方程 XA=B，可以先用初等行变换求解方程  $ A^{T}X^{T}=B^{T} $，再转置求出 X.

 $$ \begin{aligned}(\boldsymbol{A}^{\mathrm{T}}\mid\boldsymbol{B}^{\mathrm{T}})&=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-2}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{-2}}}&{{{-1}}}&{{{1}}}&{{{2}}} \\{{{-2}}}&{{{1}}}&{{{5}}}&{{{0}}}&{{{-1}}}\end{pmatrix}\xrightarrow{r_{3}+2r_{1}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-2}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{-2}}}&{{{-1}}}&{{{1}}}&{{{2}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}}\end{pmatrix}\\&\xrightarrow{r_{2}+2r_{3}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-2}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{-3}}}&{{{4}}}\end{pmatrix}\xrightarrow{r_{2}+(-1)r_{3}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}}&{{{-7}}}&{{{9}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{1}}}&{{{-3}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{-3}}}&{{{4}}}\end{pmatrix},\end{aligned} $$

所以  $ X^{\mathrm{T}} = \begin{pmatrix} -7 & 9 \\ 1 & -3 \\ -3 & 4 \end{pmatrix} $，从而  $ X = \begin{pmatrix} -7 & 1 & -3 \\ 9 & -3 & 4 \end{pmatrix} $.

（3）此题是  $ AXB = C $ 类型的方程．令  $ XB = Y $ ，先用初等行变换求解方程  $ AY = C $ ，然后用初等行变换求解方程  $ B^{T}X^{T} = Y^{T} $ ，最后转置求出 X. 由于

 $$ \left(\boldsymbol{A}\mid\boldsymbol{C}\right)=\begin{pmatrix}{{{1}}}&{{{1}}}&{{{1}}}&{{{-1}}}&{{{0}}} \\{{{-1}}}&{{{-2}}}&{{{-1}}}&{{{0}}}&{{{1}}}\end{pmatrix}\xrightarrow{r_{2}+r_{1}}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{1}}}&{{{-1}}}&{{{0}}} \\{{{0}}}&{{{-1}}}&{{{0}}}&{{{-1}}}&{{{1}}}\end{pmatrix}\xrightarrow{r_{1}+r_{2}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{1}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{1}}}&{{{-1}}}\end{pmatrix}, $$

于是得  $ Y=\begin{pmatrix}1&-2&1\\0&1&-1\end{pmatrix} $

 $$ \begin{aligned}(\boldsymbol{B}^{\mathrm{T}}\mid\boldsymbol{Y}^{\mathrm{T}})&=\begin{pmatrix}{{{-1}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{0}}} \\{{{1}}}&{{{1}}}&{{{0}}}&{{{-2}}}&{{{1}}} \\{{{0}}}&{{{-1}}}&{{{-2}}}&{{{1}}}&{{{-1}}}\end{pmatrix}\xrightarrow{r_{2}+r_{1}}\begin{pmatrix}{{{-1}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{-1}}}&{{{-2}}}&{{{1}}}&{{{-1}}}\end{pmatrix}\\&\xrightarrow[(-1)r_{3}]{r_{3}+r_{2}}\begin{pmatrix}{{{-1}}}&{{{0}}}&{{{1}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{1}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{0}}}&{{{0}}}\end{pmatrix}\xrightarrow[r_{2}+(-1)r_{3}]{r_{1}+(-1)r_{3}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}}&{{{-1}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{0}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{1}}}&{{{0}}}&{{{0}}}\end{pmatrix}\end{aligned} $$

可知  $ X^{\mathrm{T}}=\begin{pmatrix}-1&0\\ -1&1\\ 0&0\end{pmatrix} $，从而  $ X=\begin{pmatrix}-1&-1&0\\ 0&1&0\end{pmatrix} $.

根据第三节定理1，任何一个  $ m \times n $ 矩阵 A 通过若干次初等行变换都可化为行最简形矩阵；再通过若干次初等列变换，可以把该行最简形矩阵化为标准形  $ F = \begin{pmatrix} E_r & O \\ O & O \end{pmatrix}_{m \times n} $。用初等矩阵的语言，上述结论可以重新叙述为定理2。

定理2 对于任意  $ m \times n $ 矩阵 A，均存在一个 m 阶可逆方阵 P 和一个 n 可逆方阵 Q，使得 PAQ 为标准形.

### 习题1-4

1. 设 A 是 3 阶方阵，交换 A 的第 1 列和第 3 列得到矩阵 B，再把 B 的第 1 列乘以非零数 k 加到 B 的第 2 列得到矩阵 C，求满足 AQ = C 的可逆方阵 Q.

2. 设  $ A = \begin{pmatrix} 5 & -2 \\ 3 & 0 \end{pmatrix} $， $ P = \begin{pmatrix} 1 & 2 \\ 1 & 3 \end{pmatrix} $ :

（1）求 $ P^{-1} $；（2）计算 $ P^{-1}AP $；（3）计算 $ A^{10} $

3. 求下列矩阵的逆矩阵：

(1)

 $$ \begin{pmatrix}1&1&-1\\1&-1&1\\-1&1&1\end{pmatrix}; $$

(2)

 $$ \begin{pmatrix}{{{2}}}&{{{2}}}&{{{1}}} \\{{{3}}}&{{{4}}}&{{{3}}} \\{{{1}}}&{{{2}}}&{{{3}}}\end{pmatrix}; $$

(3)

 $$ \begin{pmatrix}{{{1}}}&{{{-1}}}&{{{0}}} \\{{{-1}}}&{{{2}}}&{{{1}}} \\{{{2}}}&{{{2}}}&{{{3}}}\end{pmatrix}; $$

(4)

 $$ \begin{pmatrix}{{{1}}}&{{{3}}}&{{{1}}}&{{{6}}} \\{{{2}}}&{{{1}}}&{{{0}}}&{{{0}}} \\{{{3}}}&{{{2}}}&{{{0}}}&{{{0}}} \\{{{5}}}&{{{7}}}&{{{1}}}&{{{8}}}\end{pmatrix}. $$

4. 解下列矩阵方程：

(1)

 $$ \begin{pmatrix}1&1&-1\\2&5&-4\\2&4&-5\end{pmatrix}\boldsymbol{X}=\begin{pmatrix}0&3\\4&8\\1&9\end{pmatrix}; $$

(2)

 $$ \boldsymbol{X}\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{1}}} \\{{{2}}}&{{{1}}}&{{{0}}} \\{{{2}}}&{{{1}}}&{{{-1}}}\end{pmatrix}=\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{3}}} \\{{{2}}}&{{{1}}}&{{{4}}}\end{pmatrix}; $$

(3)

 $$ \begin{pmatrix}{{{-1}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{-1}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{-1}}}\end{pmatrix}\boldsymbol{X}\begin{pmatrix}{{{2}}}&{{{1}}} \\{{{5}}}&{{{3}}}\end{pmatrix}=\begin{pmatrix}{{{1}}}&{{{2}}} \\{{{1}}}&{{{0}}} \\{{{-1}}}&{{{2}}}\end{pmatrix}. $$

### 本章小结

本章小结

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>矩阵的概念及运算</td><td style='text-align: center; word-wrap: break-word;'>理解 矩阵的概念，熟悉零矩阵、单位矩阵、对角矩阵、上(下)三角矩阵、对称矩阵、反对称矩阵等特殊的矩阵\n熟练掌握矩阵的线性运算(即：矩阵的加法和数乘)、矩阵与矩阵的乘法、矩阵的转置以及它们的运算规律</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>分块矩阵</td><td style='text-align: center; word-wrap: break-word;'>了解 矩阵分块及其运算规律\n熟悉 矩阵的按行分块和按列分块</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>线性方程组与矩阵的初等变换</td><td style='text-align: center; word-wrap: break-word;'>理解 矩阵的初等变换的概念\n熟练掌握用矩阵的初等行变换把矩阵化为阶梯形矩阵和行最简形矩阵的方法\n理解 矩阵等价的概念\n熟练掌握用矩阵的初等行变换求解线性方程组的方法\n理解 线性方程组无解、有唯一解、有无穷多解的充分必要条件</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>初等矩阵与矩阵的逆矩阵</td><td style='text-align: center; word-wrap: break-word;'>理解 初等矩阵的概念\n理解 初等矩阵的作用\n理解 矩阵可逆的概念、性质和充分必要条件\n熟练掌握用矩阵的初等行变换判断矩阵是否可逆以及求逆矩阵的方法</td></tr></table>

#### 矩阵的来源

行列式的研究开始于18世纪中叶之前，大约比形成独立体系的矩阵理论早160年。多年以来，行列式主要出现在线性方程组的讨论中。从行列式的定义我们知道，行列式包括一个数字方阵，通常总是涉及这个方阵的值，也就是由行列式的定义所给出的值。然而在很多的问题中，不管行列式的值是否与该问题有关，方阵本身都可以供研究和使用。这让人们认识到，方阵本身应该有与行列式无关的特性。方阵也称为矩阵。矩阵这个词是Sylvester首先使用的，当时，他实际上是希望引用矩形数表，但又不能再用行列式这个词，因此，他使用了矩阵这一说法。数学家Cayley也曾经过过，他不是通过四元素而获得矩阵概念的，矩阵的概念或是直接从行列式的概念而来，或是为了便于表达一个方程组

 $$ \left\{\begin{aligned}x^{\prime}&=a x+b y,\\ y^{\prime}&=c x+d y\end{aligned}\right. $$

而来，易见，通过引进矩阵

 $$ \begin{pmatrix}{{{a}}}&{{{b}}} \\{{{c}}}&{{{d}}}\end{pmatrix} $$

可以表达上述方程组的主要信息. 由此可知, 矩阵是在行列式的发展中建立起来的, 在矩阵引进的时候它的基本性质就已经比较清楚了.

## 一、填空题

1. 设  $ A $、 $ B $ 都是  $ n $ 阶方阵，則等式  $ (A+B)(A-B)=A^2-B^2 $ 成立的充分必要条件是___。

2. 设矩阵  $ \alpha = \begin{pmatrix} 2 \\ 2 \end{pmatrix} $， $ \beta = \begin{pmatrix} 2 \\ 3 \end{pmatrix} $， $ E $ 是 2 阶单位矩阵，则  $ \alpha \beta^{T} - E = $ ___.

3. 设矩阵  $ \alpha = \begin{pmatrix} 1 \\ 2 \\ 1 \end{pmatrix} $， $ \beta = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} $，矩阵  $ A = \alpha \beta^{\mathrm{T}} $，则  $ A^{8} = $ ___.

4. 设矩阵  $ A = \begin{pmatrix} 4 & 0 & 0 \\ 1 & 3 & 0 \\ 0 & 0 & 4 \end{pmatrix} $，则  $  (A - 2E)^{-1} =  $ ___.

5. 当可逆阵 P = ___ 时，等式  $ P \begin{pmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{pmatrix} =  $

 $ \begin{pmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} - 2a_{31} & a_{22} - 2a_{32} & a_{23} - 2a_{33} \\ a_{31} & a_{32} & a_{33} \end{pmatrix} $ 成立.

## 二、选择题

1. 以下结论或等式正确的是( ).

A. 若  $ AB = AC $，且  $ A \neq O $，则 B = C

B. 若  $ A \neq O, B \neq O $，则  $ AB \neq O $

C. 若 A, B 均为零矩阵，则有 A = B

D. 对角矩阵是对称矩阵

2. 设  $ A $,  $ B $ 为同阶可逆矩阵，且  $ A $ 是对称矩阵，则下列等式不成立的是（ ）。

A.  $ (A^\mathrm{T}B)^{-1} = B^{-1}A^{-1} $

B.  $ (AB)^\mathrm{T} = B^\mathrm{T}A $

C.  $ (AB^\mathrm{T})^{-1} = (B^{-1})^\mathrm{T}A^{-1} $

D.  $ (AB^\mathrm{T})^{-1} = A^{-1}(B^{-1})^\mathrm{T} $

3. 设 A 为 3×4 矩阵，B 为 4×3 矩阵，则下列运算中可以进行的是( ).

A.  $ A + B $ B. AB C.  $ A^{T} B $ D.  $ AB^{T} $

4. 设线性方程组的增广矩阵为  $ \widetilde{A} = \begin{pmatrix} 1 & \lambda & 1 \\ -2 & 1 & 0 \end{pmatrix} $，若线性方程组无解，则  $ \lambda $ 的取值是().

A. 2 B. -2 C.  $ \frac{1}{2} $ D.  $ -\frac{1}{2} $

5. 设非零阵 A 满足等式  $ A^{3}=O $，则下列说法正确的是( ).

A. 矩阵  $ A + E $ 与 A - E 均可逆

B. 矩阵  $ A + E $ 可逆，矩阵 A - E 不可逆

C. 矩阵 $ A+E $不可逆，矩阵A-E可逆

D. 矩阵  $ A + E $ 与 A - E 均不可逆

## 三、解答题

1. 解矩阵方程  $ \begin{pmatrix} \frac{1}{2} & 0 & 0 \\ 0 & \frac{1}{3} & 0 \\ 0 & 0 & \frac{1}{3} \end{pmatrix} X \begin{pmatrix} 1 & -1 & 1 \\ 1 & 1 & -1 \\ -1 & 1 & 1 \end{pmatrix} = \begin{pmatrix} \frac{1}{2} & 1 & -1 \\ 2 & \frac{1}{3} & 1 \\ -1 & -1 & \frac{1}{3} \end{pmatrix} $.

2. 当  $ \lambda $ 为何值时，线性方程组  $ \left\{\begin{aligned}&(1+\lambda)x_1+x_2+x_3=0,\\&x_1+(1+\lambda)x_2+x_3=0,\\&x_1+x_2+(1+\lambda)x_3=0\end{aligned}\right. $ 有零解、非零解？在有非零解的情况下，求出该线性方程组的解.

3. 设  $ A = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 2 & 0 \\ 1 & 0 & 1 \end{pmatrix} $，且  $ n \geqslant 2 $ 为正整数，求  $ A^n - 2A^{n-1} $.

## 四、证明题

设  $ A $ 是  $ n $ 阶方阵，其中的元素均为 1，证明： $ (E-A)^{-1}=E-\frac{1}{n-1}A $。
