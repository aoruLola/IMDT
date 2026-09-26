# 习题4-3

> 来源：docs/08_电子书/线性代数-同济大学数学系.md
> 科目：数学二（302） ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：542d072d2e071a92


1. 若 n 阶矩阵 A 与 B 相似，证明  $ R(A) = R(B) $ 且  $ |A| = |B| $.

2. 设 A, B 都是 n 阶矩阵，且 A 可逆，证明 AB 与 BA 相似.

3. 设矩阵  $ A = \begin{pmatrix} 1 & 0 & 0 & 0 \\ a & 1 & 0 & 0 \\ 2 & b & 2 & 0 \\ 2 & 3 & c & 2 \end{pmatrix} $，问 a, b, c 取何值时，矩阵 A 可相似对角化.

4. 已知  $ p = \begin{pmatrix} 1 \\ 1 \\ -1 \end{pmatrix} $ 是矩阵  $ A = \begin{pmatrix} 2 & -1 & 2 \\ 5 & a & 3 \\ -1 & b & -2 \end{pmatrix} $ 的一个特征向量.

(1) 求参数 a, b 及特征向量 p 所对应的特征值；

(2) A 能不能相似对角化？并说明理由.

5. 设  $ A = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 1 & 1 \end{pmatrix} $，求  $ A^{100} $.

6. 设 3 阶矩阵 A 的特征值为  $ \lambda_{1}=2 $， $ \lambda_{2}=-2 $， $ \lambda_{3}=1 $，对应的特征向量依次为  $ p_{1}=\begin{pmatrix}0\\1\\1\end{pmatrix} $， $ p_{2}=\begin{pmatrix}1\\1\\1\end{pmatrix} $， $ p_{3}=\begin{pmatrix}1\\1\\0\end{pmatrix} $，求矩阵 A.

7. 若 n 阶非零方阵 A 满足  $ A^{k}=O $ (k 为正整数)，证明 A 不与对角阵相似.

8. 如果矩阵 A 与 B 相似，C 与 D 相似，证明  $ \begin{pmatrix} A & 0 \\ 0 & C \end{pmatrix} $ 与  $ \begin{pmatrix} B & 0 \\ 0 & D \end{pmatrix} $ 相似.

## [课前导读]

根据第三节内容我们知道，要判断一个n阶矩阵A是否可对角化，关键在于判断这个矩阵是否有n个线性无关的特征向量。但这不是一件容易的事情，我们对此不进行一般性的讨论，而仅讨论当A是实对称矩阵的情形。这是因为，关于实对称矩阵的对角化问题有确定的结果：实对称矩阵总是可以对角化的。下面我们就来具体讨论实对称矩阵的对角化。

## 一、实对称矩阵的特征值和特征向量的性质

性质 1 实对称矩阵的特征值为实数.

证明 先介绍一个记号. 设复数矩阵  $  \boldsymbol{X} = (x_{ij})  $，复数  $ x_{ij} $ 的共轭复数为  $ \overline{x}_{ij} $，记  $ \overline{\boldsymbol{X}} = (\overline{x}_{ij}) $，则矩阵  $ \overline{\boldsymbol{X}} $ 称为矩阵 X 的共轭矩阵.

设复数  $ \lambda $ 为对称阵  $ A $ 的特征值，复向量  $ \boldsymbol{x} = (x_1, x_2, \cdots, x_n)^{\mathrm{T}} $ 为对应的特征向量，即  $ A\boldsymbol{x} = \lambda\boldsymbol{x} $。用  $ \overline{\lambda} $ 表示  $ \lambda $ 的共轭复数， $ \overline{\boldsymbol{x}} = (\overline{x}_1, \overline{x}_2, \cdots, \overline{x}_n)^{\mathrm{T}} $ 表示  $ \boldsymbol{x} $ 的共轭复向量，而  $ A $ 为实对称矩阵，有  $ \overline{A} = A $ 及  $ A^{\mathrm{T}} = A $，于是

 $$ \overline{\boldsymbol{x}}^{\mathrm{T}}\boldsymbol{A}\boldsymbol{x}=\overline{\boldsymbol{x}}^{\mathrm{T}}(\boldsymbol{A}\boldsymbol{x})=\overline{\boldsymbol{x}}^{\mathrm{T}}(\lambda\boldsymbol{x})=\lambda\overline{\boldsymbol{x}}^{\mathrm{T}}\boldsymbol{x}, $$

且

 $$ \overline{\boldsymbol{x}}^{\mathrm{T}}\boldsymbol{A}\boldsymbol{x}=\left(\overline{\boldsymbol{x}}^{\mathrm{T}}\boldsymbol{A}^{\mathrm{T}}\right)\boldsymbol{x}=\left(\boldsymbol{A}\ \overline{\boldsymbol{x}}\right)^{\mathrm{T}}\boldsymbol{x}=\left(\overline{\boldsymbol{A}}\overline{\boldsymbol{x}}\right)^{\mathrm{T}}\boldsymbol{x}=\left(\overline{\boldsymbol{A}}\overline{\boldsymbol{x}}\right)^{\mathrm{T}}\boldsymbol{x}=\left(\overline{\lambda}\overline{\boldsymbol{x}}\right)^{\mathrm{T}}\boldsymbol{x}=\overline{\lambda}\overline{\boldsymbol{x}}^{\mathrm{T}}\boldsymbol{x}, $$

两式相减，得

 $$ (\overline{\lambda}-\lambda)\overline{x}^{\mathrm{T}}\boldsymbol{x}=0. $$

由 $ x\neq0 $可知

 $$ \overline{\boldsymbol{x}}^{\mathrm{T}}\boldsymbol{x}=\sum_{i=1}^{n}\overline{\boldsymbol{x}}_{i}\boldsymbol{x}_{i}=\sum_{i=1}^{n}\mid\boldsymbol{x}\mid^{2}\neq0, $$

故  $ \overline{\lambda}-\lambda=0 $，即  $ \lambda=\overline{\lambda} $，这就说明  $ \lambda $ 为实数.

显然，当特征值  $ \lambda_{i} $ 为实数时，齐次线性方程组

 $$ \left(\boldsymbol{A}-\lambda_{i}\boldsymbol{E}\right)\boldsymbol{x}=\boldsymbol{0} $$

是实系数方程组，由  $ |A - \lambda_i E| = 0 $ 知必有实的基础解系，所以对应的特征向量可以取实向量.

性质2 设  $ \lambda_{1}, \lambda_{2} $ 是对称阵A 的两个特征值， $ p_{1}, p_{2} $ 是对应的两个特征向量. 若  $ \lambda_{1} \neq \lambda_{2} $，则  $ p_{1} $ 与  $ p_{2} $ 正交.

证明 已知  $ Ap_{1} = \lambda_{1}p_{1} $， $ Ap_{2} = \lambda_{2}p_{2} $， $ \lambda_{1} \neq \lambda_{2} $，且 A 对称，于是

 $ \lambda_{1}\boldsymbol{p}_{1}^{\mathrm{T}}\boldsymbol{p}_{2}=(\lambda_{1}\boldsymbol{p}_{1}^{\mathrm{T}})\boldsymbol{p}_{2}=(\lambda_{1}\boldsymbol{p}_{1})^{\mathrm{T}}\boldsymbol{p}_{2}=(\boldsymbol{A}\boldsymbol{p}_{1})^{\mathrm{T}}\boldsymbol{p}_{2}=\boldsymbol{p}_{1}^{\mathrm{T}}\boldsymbol{A}^{\mathrm{T}}\boldsymbol{p}_{2}=\boldsymbol{p}_{1}^{\mathrm{T}}(\boldsymbol{A}\boldsymbol{p}_{2})=\boldsymbol{p}_{1}^{\mathrm{T}}(\lambda_{2}\boldsymbol{p}_{2})=\lambda_{2}\boldsymbol{p}_{1}^{\mathrm{T}}\boldsymbol{p}_{2} $，即

 $$ (\lambda_{1}-\lambda_{2})\boldsymbol{p}_{1}^{\mathrm{T}}\boldsymbol{p}_{2}=0. $$

但  $ \lambda_1 \ne \lambda_2 $，故  $ \boldsymbol{p}_1^\mathrm{T} \boldsymbol{p}_2 = 0 $，即  $ \boldsymbol{p}_1 $ 与  $ \boldsymbol{p}_2 $ 正交。

## 二、实对称矩阵的相似对角化

定理 n 阶实对称阵 A 必定正交相似于实对角阵  $ \Lambda $，即存在正交阵 P，使  $ P^{-1}AP = P^{T}AP = \Lambda $，其中  $ \Lambda $ 的对角线上的元素是 A 的 n 个特征值.

此定理不予证明.

推论 设 A 为 n 阶实对称阵， $ \lambda $ 是 A 的特征方程的 k 重根，则矩阵  $ A - \lambda E $ 的秩  $ R(A - \lambda E) = n - k $，从而对应特征值  $ \lambda $ 有 k 个线性无关的特征向量.

证明 按定理知对称阵  $ A $ 与对角阵  $ A = \text{diag}(\lambda_1, \lambda_2, \cdots, \lambda_n) $ 相似，从而  $ A - \lambda E $ 与  $ A - \lambda E = \text{diag}(\lambda_1 - \lambda, \lambda_2 - \lambda, \cdots, \lambda_n - \lambda) $ 相似。当  $ \lambda $ 是  $ A $ 的  $ k $ 重特征根时， $ \lambda_1, \lambda_2, \cdots, \lambda_n $ 这  $ n $ 个特征值中有  $ k $ 个等于  $ \lambda $，有  $ n - k $ 个不等于  $ \lambda $，从而对角阵  $ A - \lambda E $ 的对角元恰有  $ k $ 个等 0，有  $ n - k $ 个不等于 0，因此  $ R(A - \lambda E) = n - k $。由习题 3-3 的第 3 题知， $ R(A - \lambda E) = R(A - \lambda E) = n - k $。

依据定理及其推论，有如下将对称阵A对角化的步骤：

(1) 求出  $ A $ 的全部互不相等的特征值  $ \lambda_1 $， $ \lambda_2 $， $ \cdots $， $ \lambda_s $，它们的重数依次为  $ k_1 $， $ k_2 $， $ \cdots $， $ k_s $ ( $ k_1 + k_2 + \cdots + k_s = n $)；

(2)对于每个  $ k_i $ 重特征值  $ \lambda_i $，求方程  $ (A - \lambda_i E)x = 0 $ 的基础解系，得  $ k_i $ 个线性无关的特征向量，再把它们正交化、单位化，得  $ k_i $ 个两两正交的单位特征向量。因  $ k_1 + k_2 + \cdots + k_s = n $，故总共可得  $ n $ 个两两正交的单位特征向量；

(3) 把这 n 个两两正交的单位特征向量构成正交阵 P，便有  $ P^{-1}AP = P^{T}AP = \Lambda $。注意  $ \Lambda $ 中对角元的排列次序应与 P 中列向量的排列次序相对应。

例1 设矩阵 $ A=\begin{pmatrix}1&0&2\\0&-1&0\\3&0&2\end{pmatrix} $，求正交阵P，使得 $ P^{-1}AP=P^{T}AP $为对角阵.

解由

 $$ \left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|=\left|\begin{array}{c c c}{1-\lambda}&{0}&{2}\\ {0}&{-1-\lambda}&{0}\\ {3}&{0}&{2-\lambda}\end{array}\right|=-(\lambda-4)(\lambda+1)^{2}=0 $$

得特征值为  $ \lambda_{1}=4 $， $ \lambda_{2}=\lambda_{3}=-1 $。

对特征值  $ \lambda_{1}=4 $，解齐次线性方程组  $ (A-4E)x=0 $，由

 $$ \boldsymbol{A}-4\boldsymbol{E}=\begin{pmatrix}{{{-3}}}&{{{0}}}&{{{2}}} \\{{{0}}}&{{{-5}}}&{{{0}}} \\{{{3}}}&{{{0}}}&{{{-2}}}\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-\frac{2}{3}}}} \\{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}, $$

取特征向量为  $ \alpha_1 = \begin{pmatrix} 2 \\ 0 \\ 3 \end{pmatrix} $，单位化，得  $ \eta_1 = \frac{1}{\|\alpha_1\|}\alpha_1 = \begin{pmatrix} \frac{2}{\sqrt{13}} \\ 0 \\ \frac{3}{\sqrt{13}} \end{pmatrix} $.

对特征值  $ \lambda_{2}=\lambda_{3}=-1 $，解齐次线性方程组  $ (A+E)x=0 $，由

 $$ \boldsymbol{A}+\boldsymbol{E}=\begin{pmatrix}{{{2}}}&{{{0}}}&{{{2}}} \\{{{0}}}&{{{0}}}&{{{0}}} \\{{{3}}}&{{{0}}}&{{{3}}}\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}, $$

取特征向量为  $ \alpha_2 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} $， $ \alpha_3 = \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix} $。由于  $ \alpha_2 $ 与  $ \alpha_3 $ 已经正交，所以只需将这两个向量单位化，得

 $$ \boldsymbol{\eta}_{2}=\boldsymbol{\alpha}_{2}=\left(\begin{aligned}0\\ 1\\ 0\end{aligned}\right),\quad\boldsymbol{\eta}_{3}=\frac{1}{\|\boldsymbol{\alpha}_{3}\|}\boldsymbol{\alpha}_{3}=\left(\begin{aligned}-\frac{\sqrt{2}}{2}\\ 0\\ \frac{\sqrt{2}}{2}\end{aligned}\right). $$

令矩阵  $ P=(\boldsymbol{\eta}_{1}, \boldsymbol{\eta}_{2}, \boldsymbol{\eta}_{3})=\begin{pmatrix} \frac{2}{\sqrt{13}} & 0 & -\frac{\sqrt{2}}{2} \\ 0 & 1 & 0 \\ \frac{3}{\sqrt{13}} & 0 & \frac{\sqrt{2}}{2} \end{pmatrix} $，则  $ P^{-1}AP=P^{T}AP=\begin{pmatrix} 4 & & \\ & -1 & \\ & & -1 \end{pmatrix} $.

例2 设 $ A=\begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix} $，求 $ A^{10} $.

解 因为 A 是实对称阵，从而可求一个正交阵 P，使得  $ P^{-1}AP = \Lambda = \begin{pmatrix} \lambda_{1} & & \\ & \lambda_{2} & \\ & & \lambda_{3} \end{pmatrix} $.

其中  $ \lambda_{1} $， $ \lambda_{2} $， $ \lambda_{3} $ 是 A 的全部特征值. 于是

 $$ \boldsymbol{A}^{10}=\left(\boldsymbol{P}\boldsymbol{\Lambda}\boldsymbol{P}^{-1}\right)^{10}=\boldsymbol{P}\boldsymbol{\Lambda}^{10}\boldsymbol{P}^{-1}=\boldsymbol{P}\boldsymbol{\Lambda}^{10}\boldsymbol{P}^{\mathrm{T}} $$

由

 $$ \left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|=\left|\begin{array}{c c c}{2-\lambda}&{1}&{1}\\ {1}&{2-\lambda}&{1}\\ {1}&{1}&{2-\lambda}\end{array}\right|=-(\lambda-4)(\lambda-1)^{2}=0 $$

得特征值为  $ \lambda_{1}=4 $， $ \lambda_{2}=\lambda_{3}=1 $。

对特征值  $ \lambda_{1}=4 $ ，解齐次线性方程组  $ (A-4E)x=0 $ ，由

 $$ \boldsymbol{A}-4\boldsymbol{E}=\begin{pmatrix}{{{-2}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{-2}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{-2}}}\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}} \\{{{0}}}&{{{1}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}, $$

取特征向量为  $ \alpha_{1}=\begin{pmatrix}1\\ 1\\ 1\end{pmatrix} $，单位化，得  $ p_{1}=\frac{1}{\|\alpha_{1}\|}\alpha_{1}=\begin{pmatrix}\frac{\sqrt{3}}{3}\\ \frac{\sqrt{3}}{3}\\ \frac{\sqrt{3}}{3}\end{pmatrix} $.

对特征值  $ \lambda_{2}=\lambda_{3}=1 $，解齐次线性方程组  $ (A-E)x=0 $，由

 $$ \boldsymbol{A}-\boldsymbol{E}=\begin{pmatrix}{{{1}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{1}}}\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}{{{1}}}&{{{1}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}, $$

取特征向量为  $ \alpha_{2}=\begin{pmatrix}-1\\1\\0\end{pmatrix} $， $ \alpha_{3}=\begin{pmatrix}-1\\0\\1\end{pmatrix} $.

先将  $ \alpha_{2} $ 与  $ \alpha_{3} $ 正交化，令

 $$ \boldsymbol{\beta}_{2}=\boldsymbol{\alpha}_{2}=\left(\begin{aligned}&-1\\&1\\&0\end{aligned}\right),\boldsymbol{\beta}_{3}=\boldsymbol{\alpha}_{3}-\frac{(\boldsymbol{\alpha}_{3},\boldsymbol{\beta}_{2})}{(\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{2})}\boldsymbol{\beta}_{2}=\left(\begin{aligned}&-1\\&0\\&1\end{aligned}\right)-\frac{1}{2}\left(\begin{aligned}&-1\\&1\\&0\end{aligned}\right)=\frac{1}{2}\left(\begin{aligned}&-1\\&-1\\&2\end{aligned}\right), $$

再将 $ \beta_{2},\beta_{3} $单位化，得

 $$ \boldsymbol{p}_{2}=\frac{1}{\|\boldsymbol{\beta}_{2}\|}\boldsymbol{\beta}_{2}=\begin{pmatrix}-\frac{\sqrt{2}}{2}\\ \frac{\sqrt{2}}{2}\\ 0\end{pmatrix},\quad\boldsymbol{p}_{3}=\frac{1}{\|\boldsymbol{\beta}_{3}\|}\boldsymbol{\beta}_{3}=\begin{pmatrix}-\frac{\sqrt{6}}{6}\\ -\frac{\sqrt{6}}{6}\\ \frac{\sqrt{6}}{3}\end{pmatrix}. $$

令矩阵  $ \boldsymbol{P}=(\boldsymbol{p}_{1},\boldsymbol{p}_{2},\boldsymbol{p}_{3})=\begin{pmatrix}\frac{\sqrt{3}}{3}&-\frac{\sqrt{2}}{2}&-\frac{\sqrt{6}}{6}\\\frac{\sqrt{3}}{3}&\frac{\sqrt{2}}{2}&-\frac{\sqrt{6}}{6}\\\frac{\sqrt{3}}{3}&0&\frac{\sqrt{6}}{3}\end{pmatrix} $，则 P 为所求正交阵，且  $ \Lambda=\begin{pmatrix}4&&\\ &1&\\ &&1\end{pmatrix} $，

从而

 $$ \boldsymbol{A}^{10}=\boldsymbol{P}\begin{pmatrix}4&&\\&1&\\&&1\end{pmatrix}^{10}\boldsymbol{P}^{\mathrm{T}}=\boldsymbol{P}\begin{pmatrix}4^{10}&&\\&1&\\&&1\end{pmatrix}\boldsymbol{P}^{\mathrm{T}}=\frac{1}{3}\begin{pmatrix}4^{10}+2&4^{10}-1&4^{10}-1\\4^{10}-1&4^{10}+2&4^{10}-1\\4^{10}-1&4^{10}-1&4^{10}+2\end{pmatrix}. $$

### 习题4-4

1. 试求正交阵 P，将下列对称阵化为对角阵：

(1)

 $$ \begin{pmatrix}{{{1}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{2}}}&{{{0}}} \\{{{1}}}&{{{0}}}&{{{2}}}\end{pmatrix}; $$

(2)

 $$ \begin{pmatrix}2&2&-2\\2&5&-4\\-2&-4&5\end{pmatrix}. $$

2. 设  $ A = \begin{pmatrix} 2 & 1 & 2 \\ 1 & 2 & 2 \\ 2 & 2 & 1 \end{pmatrix} $，求  $ \varphi(A) = A^{10} - 6A^{9} + 5A^{8} $.

3. 设 3 阶实对称矩阵 A 的特征值为  $ \lambda_{1}=3 $， $ \lambda_{2}=-3 $， $ \lambda_{3}=0 $，对应  $ \lambda_{1} $， $ \lambda_{2} $ 的特征向量依次为  $ p_{1}=\begin{pmatrix}1\\2\\2\end{pmatrix} $， $ p_{2}=\begin{pmatrix}2\\1\\-2\end{pmatrix} $，求矩阵 A.

4. 设矩阵  $ A = \begin{pmatrix} 0 & -1 & 4 \\ -1 & 3 & a \\ 4 & a & 0 \end{pmatrix} $，正交矩阵 P 使得  $ P^{T} A P $ 为对角阵，如果 P 的第一列为  $ \left(\frac{1}{\sqrt{6}}, \frac{2}{\sqrt{6}}, \frac{1}{\sqrt{6}}\right)^{\mathrm{T}} $，求 a，p.

5. 设3阶实对称矩阵A的秩 $ R(A)=2 $，且

 $$ \boldsymbol{A}\begin{pmatrix}1&1\\ 0&0\\ -1&1\end{pmatrix}=\begin{pmatrix}-1&1\\ 0&0\\ 1&1\end{pmatrix}, $$

(1) 求 A 的所有特征值与特征向量；(2) 求矩阵 A.

6. 设  $ \boldsymbol{x}=(x_1, x_2, \cdots, x_n)^{\mathrm{T}} $， $ x_1 \neq 0 $， $ \boldsymbol{A} = \boldsymbol{x}\boldsymbol{x}^{\mathrm{T}} $

(1) 证明  $ \lambda = 0 $ 是矩阵 A 的 n-1 重特征值；

(2) 求 A 的非零特征值及 n 个线性无关的特征向量.

## 第五节 二次型及其标准形

[课前导读]

已知平面 $ \mathbb{R}^{2} $上一条曲线的方程为 $ 3x^{2}+3y^{2}+4xy=1 $，为了求曲线上到原点的距离最长和

最短的点，可以先选择适当的坐标旋转变换

 $$ \left\{\begin{aligned}x&=x^{\prime}\cos\theta-y^{\prime}\sin\theta,\\ y&=x^{\prime}\sin\theta+y^{\prime}\cos\theta,\end{aligned}\right.\quad\theta=\frac{\pi}{4}, $$

 $$ \left\{\begin{aligned}x=&\frac{\sqrt{2}}{2}x^{^{\prime}}-\frac{\sqrt{2}}{2}y^{^{\prime}},\\ y=&\frac{\sqrt{2}}{2}x^{^{\prime}}+\frac{\sqrt{2}}{2}y^{^{\prime}},\end{aligned}\right. $$

即

将曲线方程化为标准方程： $ x'^2 + 5y'^2 = 1 $。显然，这是一条椭圆曲线，从而曲线上到原点的距离最长和最短的点分别可取 $ (\pm1, 0) $和 $ \left(0, \pm\frac{1}{\sqrt{5}}\right) $。

从代数学的观点来看，上述化曲线的一般方程为标准方程的过程，就是通过变量间非退化的线性替换把一个二次齐次多项式化简为只含有平方项的过程。这样的问题在许多实际问题或理论问题中常常会遇到。本节对含n个变量的二次齐次多项式进行一般的讨论，研究如何利用变量间非退化的线性替换将二次齐次多项式化简为只含有平方项的二次多项式。

## 一、二次型及其标准形的定义

定义 1 含有 n 个变量  $ x_{1}, x_{2}, \cdots, x_{n} $ 的二次齐次多项式

 $$ \begin{aligned}f(x_{1},x_{2},\cdots,x_{n})&=a_{11}x_{1}^{2}+2a_{12}x_{1}x_{2}+2a_{13}x_{1}x_{3}+\cdots+2a_{1,n-1}x_{1}x_{n-1}+2a_{1n}x_{1}x_{n}+\\&\quad a_{22}x_{2}^{2}\quad+2a_{23}x_{2}x_{3}+\cdots+2a_{2,n-1}x_{1}x_{n-1}+2a_{2n}x_{2}x_{n}+\\&\quad\cdots+\\&\quad a_{n-1,n-1}x_{n-1}^{2}+2a_{n-1,n}x_{n-1}x_{n}+\\&\quad a\quad x^{2}\end{aligned} $$

称为二次型. 如果所有系数  $ a_{ij}(1 \leq i, j \leq n) $ 均为实数, 则称二次型为实二次型. 特别地, 如果 n 元二次型  $ f(x_1, x_2, \cdots, x_n) $ 只含有平方项, 即

 $$ f(x_{1},x_{2},\cdots,x_{n})=k_{1}x_{1}^{2}+k_{2}x_{2}^{2}+\cdots+k_{n}x_{n}^{2}, $$

称这样的二次型为二次型的标准形. 如果标准形的系数  $ k_{1} $,  $ k_{2} $,  $ \cdots $,  $ k_{n} $ 只在 1, -1, 0 三个数中取值, 也就是

 $$ f(x_{1},x_{2},\cdots,x_{n})=x_{1}^{2}+\cdots+x_{p}^{2}-x_{p+1}^{2}-\cdots-x_{r}^{2}, $$

就称其为二次型的规范形.

在式(5-1)中，对 $j>i$ 取 $a_{ji}=a_{ij}$，则 $2a_{ij}x_i x_j=a_{ij}x_i x_j+a_{ji}x_j x_i$，于是式(5-1)可写成

 $$ \begin{aligned}f(x_{1},x_{2},\cdots,x_{n})&=a_{11}x_{1}^{2}+a_{12}x_{1}x_{2}+\cdots+a_{1n}x_{1}x_{n}+\\&\quad a_{21}x_{2}x_{1}+a_{22}x_{2}^{2}+a_{23}x_{2}x_{3}+\cdots+a_{2n}x_{2}x_{n}+\\&\quad \cdots+\\&\quad a_{n1}x_{n}x_{1}+a_{n2}x_{n}x_{2}+\cdots+a_{nn}x_{n}^{2}\\&=\sum_{i,j=1}^{n}a_{ij}x_{i}x_{j}.\end{aligned} $$

利用矩阵，二次型式(5-2)可以表示为

 $$ \begin{aligned}f=&x_{1}(a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n})+x_{2}(a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n})+\cdots+x_{n}(a_{n1}x_{1}+a_{n2}x_{2}+\cdots+a_{nn}x_{n})\\=&(x_{1},x_{2},\cdots,x_{n})\begin{pmatrix}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}\\\cdots\cdots\cdots\\a_{n1}x_{1}+a_{n2}x_{2}+\cdots+a_{nn}x_{n}\end{pmatrix}\\=&(x_{1},x_{2},\cdots,x_{n})\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\end{pmatrix}\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix}.\end{aligned} $$

记

 $$ \begin{aligned}\boldsymbol{A}&=\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\end{pmatrix},\quad\boldsymbol{x}=\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix},\end{aligned} $$

则二次型可记作

 $$ f(x)=\boldsymbol{x}^{\mathrm{T}}\boldsymbol{A}\boldsymbol{x}, $$

其中A为对称阵.

例如，二次型  $ f=x_{1}^{2}-3x_{3}^{2}-4x_{1}x_{2}+x_{2}x_{3} $ 用矩阵记号写出来，就是

 $$ f(x_{1},x_{2},x_{3})=(x_{1},x_{2},x_{3})\begin{pmatrix}1&-2&0\\-2&0&\frac{1}{2}\\0&\frac{1}{2}&-3\end{pmatrix}\begin{pmatrix}x_{1}\\x_{2}\\x_{3}\end{pmatrix}. $$

任给一个二次型，就唯一地确定一个对称阵；反之，任给一个对称阵，也可唯一地确定一个二次型。这样，二次型与对称阵之间存在一一对应的关系。因此，我们把对称阵  $ A $ 叫做二次型  $ f(x) = \boldsymbol{x}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x} $ 的矩阵，也把  $ f(x) = \boldsymbol{x}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x} $ 叫做对称阵  $ A $ 的二次型。对称阵  $ A $ 的秩就叫做二次型  $ f(x) = \boldsymbol{x}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x} $ 的秩。显然，标准形的矩阵是对角阵。

## 二、用正交变换化二次型为标准形

对于二次型，我们讨论的主要问题是：寻求可逆的线性变换

 $$ \begin{cases}x_{1}=c_{11}y_{1}+c_{12}y_{2}+\cdots+c_{1n}y_{n},\\x_{2}=c_{21}y_{1}+c_{22}y_{2}+\cdots+c_{2n}y_{n},\\\cdots\cdots\cdots\\x_{n}=c_{n1}y_{1}+c_{n2}y_{2}+\cdots+c_{nn}y_{n},\end{cases} $$

其中  $ c_{ij}(1 \leq i, j \leq n) $ 均为实数，将二次型  $ f(x) = \boldsymbol{x}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x} $ 化为标准形.

记  $  \boldsymbol{C} = (c_{ij})  $， $  \boldsymbol{y} = \begin{pmatrix} y_1 \\ y_2 \\ \vdots \\ y_n \end{pmatrix}  $，把可逆变换式 (5-3) 记作

 $$ x=C y, $$

代入 $ f(x)=x^{\mathrm{T}}Ax $，有

 $$ f(x)=\boldsymbol{x}^{\mathrm{T}}\boldsymbol{A}\boldsymbol{x}=(\boldsymbol{C}\boldsymbol{y})^{\mathrm{T}}\boldsymbol{A}\boldsymbol{C}\boldsymbol{y}=\boldsymbol{y}^{\mathrm{T}}(\boldsymbol{C}^{\mathrm{T}}\boldsymbol{A}\boldsymbol{C})\boldsymbol{y}=\boldsymbol{y}^{\mathrm{T}}\boldsymbol{B}\boldsymbol{y}=g(y). $$

如果二次型  $ g(y)=y^{\mathrm{T}}By $ 是标准形，则矩阵  $ B=C^{T}AC $ 是对角阵.

定义 2 设 A 和 B 是 n 阶矩阵，若有可逆矩阵 C，使  $ B = C^{T} A C $，则称矩阵 A 与 B 合同.

显然，矩阵间的合同关系是一个等价关系，满足

(1) 反身性：每一个方阵都与它自身合同。这是因为  $ A = E^{T} A E $。

(2) 对称性：如果  $ A $ 与  $ B $ 合同，则  $ B $ 与  $ A $ 也合同。这是因为由  $ B = C^T A C $ 及矩阵  $ C $ 可逆可得  $ A = P^T B P $，其中  $ P = C^{-1} $。

(3)传递性：如果  $ A $ 与  $ B $ 合同， $ B $ 与  $ C $ 合同，则  $ A $ 与  $ C $ 也合同。这是因为由  $ B = P^T A P $ 及  $ C = Q^T B Q $ 可得  $ C = (P Q)^{\mathrm{T}} A (P Q) $。

容易证明，若  $ A $ 为对称阵，则  $ B = C^T A C $ 也为对称阵，且  $ R(B) = R(A) $（证明留给读者作为练习）。由此可知，经可逆变换  $ x = C y $ 后，二次型  $ f(x) = x^T A x $ 的矩阵由  $ A $ 变为与  $ A $ 合同的矩阵  $ C^T A C $，且二次型的秩不变。

要使二次型  $ f(x) = \boldsymbol{x}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x} $ 经可逆变换  $ \boldsymbol{x} = \boldsymbol{C} \boldsymbol{y} $ 变成标准形，就是要使矩阵  $ B = C^{T} A C $ 是对角阵。因此，我们的主要问题就转化为：对于对称阵  $ A $，寻求可逆矩阵  $ C $，使  $ C^{T} A C $ 为对角阵。这个问题称为把对称矩阵合同对角化。

由第四节的定理可知，任给对称阵  $ A $，总有正交阵  $ P $，使  $ P^{-1}AP = P^{T}AP = \Lambda $。把此结论应用于二次型，即有下列定理

定理 任给二次型  $ f = \sum_{i, j=1}^{n} a_{ij} x_i x_j (a_{ij} = a_{ji}) $，总有正交变换 x = Py，使 f 化为标准形

 $$ f=\lambda_{1}y_{1}^{2}+\lambda_{2}y_{2}^{2}+\cdots+\lambda_{n}y_{n}^{2}, $$

其中  $ \lambda_{1}, \lambda_{2}, \cdots, \lambda_{n} $ 是 f 的矩阵  $ \boldsymbol{A} = (a_{ij}) $ 的特征值.

推论 任给 n 元二次型  $ f(x) = \boldsymbol{x}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x}\left(\boldsymbol{A}^{\mathrm{T}} = \boldsymbol{A}\right) $，总有可逆变换 x = Cz，使  $ f(Cz) $ 为规范形.

证明 按定理，有

 $$ f(\boldsymbol{P}\boldsymbol{y})=\boldsymbol{y}^{\mathrm{T}}\boldsymbol{A}\boldsymbol{y}=\lambda_{1}y_{1}^{2}+\lambda_{2}y_{2}^{2}+\cdots+\lambda_{n}y_{n}^{2}, $$

设二次型 $ f $的秩为 $ r $，则特征值中恰有 $ r $个不为0，不妨设 $ \lambda_1\ne0 $， $ \lambda_2\ne0 $， $ \cdots $， $ \lambda_r\ne0 $， $ \lambda_{r+1}=\cdots=\lambda_n=0 $，令

 $$ \boldsymbol{K}=\begin{pmatrix}k_{1}&&&\\ &k_{2}&&\\ &&\ddots&\\ &&&k_{n}\end{pmatrix},\  其中 \ k_{i}=\left\{\begin{aligned}&\frac{1}{\sqrt{\left|\lambda_{i}\right|}},&&i\leq r,\\ &1,&&i>r,\end{aligned}\right. $$

则 K 可逆，变换 y = Kz 把  $ f(Py) $ 化为

 $$ f(\boldsymbol{P}\boldsymbol{K}\boldsymbol{z})=(\boldsymbol{K}\boldsymbol{z})^{\mathrm{T}}\boldsymbol{\Lambda}(\boldsymbol{K}\boldsymbol{z})=\boldsymbol{z}^{\mathrm{T}}(\boldsymbol{K}^{\mathrm{T}}\boldsymbol{\Lambda}\boldsymbol{K})\boldsymbol{z}, $$

而

 $$ \boldsymbol{K}^{\mathrm{T}}\boldsymbol{A}\boldsymbol{K}=\mathrm{d i a g}\left(\frac{\lambda_{1}}{\left|\lambda_{1}\right|},\frac{\lambda_{2}}{\left|\lambda_{2}\right|},\cdots,\frac{\lambda_{r}}{\left|\lambda_{r}\right|},0,\cdots,0\right), $$

记 C=PK，即知可逆变换 x=Cz 把 f 化成规范形

 $$ f(\mathbf{C}\mathbf{z})=\frac{\lambda_{1}}{\left|\lambda_{1}\right|}z_{1}^{2}+\frac{\lambda_{2}}{\left|\lambda_{2}\right|}z_{2}^{2}+\cdots+\frac{\lambda_{r}}{\left|\lambda_{r}\right|}z_{r}^{2}. $$

例 1 求一个正交变换 x = Py，把二次型

 $$ f=2x_{1}^{2}+2x_{2}^{2}+2x_{3}^{2}+2x_{1}x_{2}+2x_{1}x_{3}+2x_{2}x_{3} $$

化为标准形.

解 二次型的矩阵为

 $$ \boldsymbol{A}=\begin{pmatrix}{{{2}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{2}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{2}}}\end{pmatrix}, $$

这与第四节例2所给的矩阵相同，按照例2的结果，有正交阵

 $$ \begin{array}{r l}{\mathbf{P}=\left(\begin{matrix}{\displaystyle\frac{\sqrt{3}}{3}}&{\displaystyle-\frac{\sqrt{2}}{2}}&{\displaystyle-\frac{\sqrt{6}}{6}}\\ {\displaystyle\frac{\sqrt{3}}{3}}&{\displaystyle\frac{\sqrt{2}}{2}}&{\displaystyle-\frac{\sqrt{6}}{6}}\\ {\displaystyle\frac{\sqrt{3}}{3}}&{0}&{\displaystyle\frac{\sqrt{6}}{3}}\end{matrix}\right),}\end{array} $$

使

 $$ \boldsymbol{P}^{\mathrm{T}}\boldsymbol{A}\boldsymbol{P}=\boldsymbol{\Lambda}=\begin{pmatrix}4&&\\ &1&\\ &&1\end{pmatrix}, $$

于是有正交变换

 $$ \begin{pmatrix}x_{1}\\x_{2}\\x_{3}\end{pmatrix}=\begin{pmatrix}\dfrac{\sqrt{3}}{3}&-\dfrac{\sqrt{2}}{2}&-\dfrac{\sqrt{6}}{6}\\\dfrac{\sqrt{3}}{3}&\dfrac{\sqrt{2}}{2}&-\dfrac{\sqrt{6}}{6}\\\dfrac{\sqrt{3}}{3}&0&\dfrac{\sqrt{6}}{3}\end{pmatrix}\begin{pmatrix}y_{1}\\y_{2}\\y_{3}\end{pmatrix}. $$

把二次型 f 化成标准形

 $$ f=4y_{1}^{2}+y_{2}^{2}+y_{3}^{2}. $$

如果要把二次型f化成规范形，只需令

 $$ \left\{\begin{aligned}y_{1}=&\frac{1}{2}z_{1},\\ y_{2}=&z_{2},\\ y_{3}=&z_{3},\end{aligned}\right. $$

即得f的规范形

 $$ f=z_{1}^{2}+z_{2}^{2}+z_{3}^{2}. $$

## 三、用配方法化二次型为标准形

用正交变换化二次型成标准形，具有保持几何形状不变的优点。而对于研究二次型的正定性来说，还可以不用正交变换，只用可逆的线性变换 x = Py 把二次型化成标准形。下面举例来说明求可逆变换 x = Py 中矩阵 P 的具体方法，这种方法称为配方法。

例2 化二次型

 $$ f=x_{1}^{2}+2x_{2}^{2}+5x_{3}^{2}+2x_{1}x_{2}+2x_{1}x_{3}+6x_{2}x_{3} $$

成标准形，并求所用的变换矩阵.

解 由于 f 中含变量  $ x_{1} $ 的平方项，故把含  $ x_{1} $ 的项归并起来，配方可得

 $$ \begin{aligned}f=&x_{1}^{2}+2x_{1}x_{2}+2x_{1}x_{3}+2x_{2}^{2}+5x_{3}^{2}+6x_{2}x_{3}\\=&\left(x_{1}+x_{2}+x_{3}\right)^{2}-x_{2}^{2}-x_{3}^{2}-2x_{2}x_{3}+2x_{2}^{2}+5x_{3}^{2}+6x_{2}x_{3}\\=&\left(x_{1}+x_{2}+x_{3}\right)^{2}+x_{2}^{2}+4x_{3}^{2}+4x_{2}x_{3}，\end{aligned} $$

上式右端除第一项外已不再含  $ x_{1} $ 。继续配方可得

 $$ f=\left(x_{1}+x_{2}+x_{3}\right)^{2}+\left(x_{2}+2x_{3}\right)^{2}. $$

令

 $$ \left\{\begin{aligned}y_{1}&=x_{1}+x_{2}+x_{3},\\ y_{2}&=\quad x_{2}+2x_{3},\\ y_{3}&=\quad x_{3},\end{aligned}\right. $$

即

 $$ \left\{\begin{aligned}x_{1}&=y_{1}-y_{2}+y_{3},\\ x_{2}&=\quad y_{2}-2y_{3},\\ x_{3}&=\quad y_{3},\end{aligned}\right. $$

就把f化成标准形(规范形) $ f=y_{1}^{2}+y_{2}^{2} $，所用变换矩阵为

 $$ \boldsymbol{C}=\begin{pmatrix}{{{1}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{-2}}} \\{{{0}}}&{{{0}}}&{{{1}}}\end{pmatrix}(\left|\boldsymbol{C}\right|=1\neq0). $$

例3 化二次型

 $$ f=2x_{1}x_{2}+4x_{1}x_{3}-6x_{2}x_{3} $$

成规范形，并求所用的变换矩阵.

解 在 f 中不含平方项. 由于含有  $ x_{1}, x_{2} $ 乘积项, 故令

 $$ \left\{\begin{aligned}x_{1}&=y_{1}+y_{2},\\ x_{2}&=y_{1}-y_{2},\\ x_{3}&=y_{3},\end{aligned}\right. 即 \left(\begin{aligned}x_{1}\\ x_{2}\\ x_{3}\end{aligned}\right)=\left(\begin{aligned}1&\quad1&\quad0\\ 1&\quad-1&\quad0\\ 0&\quad0&\quad1\end{aligned}\right)\left(\begin{aligned}y_{1}\\ y_{2}\\ y_{3}\end{aligned}\right), $$

代入可得

 $$ f=2y_{1}^{2}-2y_{2}^{2}-2y_{1}y_{3}+10y_{2}y_{3}. $$

再配方，得

 $$ f=2\left(y_{1}-\frac{1}{2}y_{3}\right)^{2}-2\left(y_{2}-\frac{5}{2}y_{3}\right)^{2}+12y_{3}^{2}. $$

令

 $$ \left\{\begin{aligned}z_{1}&=y_{1}-\frac{1}{2}y_{3},\\ z_{2}&=y_{2}-\frac{5}{2}y_{3},\\ z_{3}&=y_{3},\end{aligned}\right. $$

于是

 $$ \left\{\begin{aligned}y_{1}&=z_{1}+\frac{1}{2}z_{3},\\ y_{2}&=z_{2}+\frac{5}{2}z_{3},\\ y_{3}&=z_{3},\end{aligned}\right. 即 \left(\begin{aligned}y_{1}\\ y_{2}\\ y_{3}\end{aligned}\right)=\left(\begin{aligned}1&\quad0&\frac{1}{2}\\ 0&\quad1&\frac{5}{2}\\ 0&\quad0&1\end{aligned}\right)\left(\begin{aligned}z_{1}\\ z_{2}\\ z_{3}\end{aligned}\right), $$

于是，二次型化为标准形

 $$ f=2z_{1}^{2}-2z_{2}^{2}+12z_{3}^{2}. $$

再令

 $$ \left\{\begin{aligned}w_{1}&=\sqrt{2}z_{1},\\ w_{2}&=\sqrt{2}z_{2},\\ w_{3}&=\sqrt{12}z_{3},\end{aligned}\quad 即 \left(\begin{aligned}z_{1}\\ z_{2}\\ z_{3}\end{aligned}\right)=\left(\begin{aligned}\frac{1}{\sqrt{2}}&\quad0\\ 0&\quad\frac{1}{\sqrt{2}}\\ 0&\quad0\end{aligned}\right.\frac{1}{\sqrt{12}}\right)\left(\begin{aligned}w_{1}\\ w_{2}\\ w_{3}\end{aligned}\right), $$

就把二次型化为了规范形

 $$ f=w_{1}^{2}-w_{2}^{2}+w_{3}^{2}, $$

所用变换矩阵为

 $$ \boldsymbol{C}=\begin{pmatrix}1&1&0\\1&-1&0\\0&0&1\end{pmatrix}\begin{pmatrix}1&0&\frac{1}{2}\\0&1&\frac{5}{2}\\0&0&1\end{pmatrix}\begin{pmatrix}\frac{1}{\sqrt{2}}&0&\\0&\frac{1}{\sqrt{2}}&\\0&0&\frac{1}{\sqrt{12}}\end{pmatrix}=\begin{pmatrix}\frac{1}{\sqrt{2}}&\frac{1}{\sqrt{2}}&\frac{3}{\sqrt{12}}\\\frac{1}{\sqrt{2}}&-\frac{1}{\sqrt{2}}&-\frac{2}{\sqrt{12}}\\0&0&\frac{1}{\sqrt{12}}\end{pmatrix}\left(\mid\boldsymbol{C}\mid=-\frac{1}{\sqrt{12}}\neq0\right). $$

一般的，任何二次型都可用上面两例的方法找到可逆变换，把二次型化成标准形（或规范形）.

### 习题4-5

1. 试用矩阵记号表示下列二次型：

(1)

 $$ f=2x_{1}^{2}-2x_{2}^{2}+x_{3}^{2}-4x_{1}x_{2}+4x_{1}x_{3}+6x_{2}x_{3}； $$

(2)  $ f = -x^{2} + 2y^{2} - 3z^{2} + 2xy - 6xz - 4yz $;

(3)  $ f = x_{1}^{2} - 3x_{3}^{2} - 2x_{1}x_{2} + 6x_{2}x_{3} $

2. 求一个正交变换化下列二次型成标准形：

(1) $ f=2x_{1}^{2}+2x_{2}^{2}+2x_{3}^{2}-2x_{2}x_{3} $;

(2) $ f=2x_{1}x_{2}+2x_{2}x_{1}+2x_{2}x_{3} $;

(3) $ f=2x_{1}^{2}+5x_{2}^{2}+5x_{3}^{2}+4x_{1}x_{2}-4x_{1}x_{3}-8x_{2}x_{3} $

3. 证明：二次型  $ f = x^{T}Ax $ 在  $ \|x\| = 1 $ 时的最大值为矩阵 A 的最大特征值.

4. 用配方法化下列二次型成规范形，并写出所用的变换矩阵：

(1) $ f(x_{1}, \quad x_{2}, \quad x_{3})=x_{1}^{2}+2x_{1}x_{2}-2x_{2}x_{3}; $

(2) $ f(x_{1}, x_{2}, x_{3})=2x_{1}^{2}+x_{2}^{2}+4x_{3}^{2}+2x_{1}x_{2}-2x_{2}x_{3}. $

5. 已知二次型  $ f=4x_{1}^{2}+\left(2+\frac{a}{2}\right)x_{2}^{2}+\left(2+\frac{a}{2}\right)x_{3}^{2}+(4-a)x_{2}x_{3} $

(1) 求它所对应的矩阵 A 及其秩  $ R(A) $;

(2) 当  $ R(A)=2 $ 时求正交变换 x=Qy，使得二次型可化为标准形.

### [课前导读]

一个实二次型  $ f = x^{T}Ax $ 总可以经过可逆的变量替换化为标准形，但是标准形并不是唯一确定的。例如第五节例3中的二次型

 $$ f=2x_{1}x_{2}+4x_{1}x_{3}-6x_{2}x_{3}, $$

如果令

 $$ \begin{pmatrix}x_{1}\\x_{2}\\x_{3}\end{pmatrix}=\begin{pmatrix}1&0&0\\\displaystyle\frac{2}{3}&1&1\\\displaystyle\frac{1}{3}&1&-1\end{pmatrix}\begin{pmatrix}y_{1}\\y_{2}\\y_{3}\end{pmatrix}~, $$

则有标准形  $ f=\frac{4}{3}y_{1}^{2}-6y_{2}^{2}+6y_{3}^{2} $. 与第五节例3中得到的标准形作比较我们发现，虽然用不同的可逆变量替换，二次型的标准形不同，但在不同的标准形中，正系数的个数相同，负系数的个数也相同. 这并不是偶然现象，这一节我们将对此作一般的讨论.

## 一、惯性定理

定理 1 设有二次型  $ f = x^{T} A x $，它的秩为 r，有两个可逆变换

 $$ x=C y 及 x=P z $$

使

 $$ f=k_{1}y_{1}^{2}+k_{2}y_{2}^{2}+\cdots+k_{r}y_{r}^{2}(k_{i}\neq0), $$

及

 $$ f=\lambda_{1}z_{1}^{2}+\lambda_{2}z_{2}^{2}+\cdots+\lambda_{r}z_{r}^{2}(k_{i}\neq0), $$

则  $ k_{1}, \cdots, k_{r} $ 中正数的个数与  $ \lambda_{1}, \cdots, \lambda_{r} $ 中正数的个数相等.

这个定理称为惯性定理，这里不予证明.

## 二、正定二次型与正定阵

二次型的标准形中正系数的个数称为二次型的正惯性指数，负系数的个数称为二次型的负惯性指数。若二次型f的正惯性指数为p，秩为r，则f的规范形便可确定为

 $$ f=y_{1}^{2}+\cdots+y_{p}^{2}-y_{p+1}^{2}-\cdots-y_{r}^{2}. $$

科学技术上用得较多的二次型是正惯性指数为 n 或者负惯性指数为 n 的 n 元二次型，我们有下述定义.

定义 设有二次型  $ f = \boldsymbol{x}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x} $，如果对于任何  $ x \neq 0 $，都有  $ f(x) > 0 $（显然  $ f(0) = 0 $），则称二次型  $ f $ 为正定二次型，并称对称阵  $ A $ 是正定的；如果对任何  $ x \neq 0 $ 都有  $ f(x) < 0 $，则称二次型  $ f $ 为负定二次型，并称对称阵  $ A $ 是负定的。

定理2 n元二次型 $ f=x^{T}Ax $为正定的充分必要条件是它的正惯性指数等于n，即它的规范形的n个系数全为1.

证明 设可逆变换 x = C y 使

 $$ f(\boldsymbol{x})=f(\mathbf{C}\boldsymbol{y})=\sum_{i=1}^{n}k_{i} y_{i}^{2}. $$

先证充分性. 设  $ k_i > 0 $ ( $ i = 1, 2, \cdots, n $), 任给  $ x \ne 0 $, 则  $ y = C^{-1} x \ne 0 $, 故

 $$ f(\boldsymbol{x})=\sum_{i=1}^{n}k_{i}y_{i}^{2}>0. $$

再证必要性. 用反证法. 假设有  $ k_i \leq 0 $, 则当  $ \mathbf{y} = \mathbf{e}_s $ (单位坐标向量) 时,  $ f(C\mathbf{e}_s) = k_s \leq 0 $. 显然  $ C\mathbf{e}_s \neq 0 $, 这与  $ f $ 为正定相矛盾. 这就证明了  $ k_i > 0 $ ( $ i = 1, 2, \cdots, n $).

由定理2立即可以得到下面两个推论.

推论1 对称阵A为正定的充分必要条件是：A与单位矩阵E合同.

推论2 对称阵A为正定的充分必要条件是：A 的特征值全为正.

定理 3 对称阵 A 为正定的充分必要条件是：A 的各阶顺序主子式都为正，即

 $$ a_{11}>0,\quad\left|\begin{matrix}a_{11}&a_{12}\\ a_{21}&a_{22}\end{matrix}\right|>0,\quad\cdots,\quad\left|\begin{matrix}a_{11}&\cdots&a_{1n}\\ \vdots&\ddots&\vdots\\ a_{n1}&\cdots&a_{nn}\end{matrix}\right|>0, $$

对称阵为负定的充分必要条件是：奇数阶顺序主子式为负，偶数阶顺序主子式为正，即

 $$ \left(-1\right)^{r}\left|\begin{matrix}a_{11}&\cdots&a_{1r}\\ \vdots&\ddots&\vdots\\ a_{r1}&\cdots&a_{rr}\end{matrix}\right|>0\left(r=1,2,\cdots,n\right). $$

这个定理称为赫尔维茨定理. 这里不予证明.

例1 判别二次型  $ f(x_{1}, x_{2}, x_{3}) = -2x_{1}^{2} - 6x_{2}^{2} - 4x_{3}^{2} + 2x_{1}x_{2} + 2x_{1}x_{3} $ 的正定性.

解 此二次型的矩阵为

 $$ \boldsymbol{A}=\begin{pmatrix}{{{-2}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{-6}}}&{{{0}}} \\{{{1}}}&{{{0}}}&{{{-4}}}\end{pmatrix}, $$

它的各阶顺序主子式为

 $$ a_{11}=-2<0，\left|\begin{matrix}{{{-2}}}&{{{1}}} \\{{{1}}}&{{{-6}}}\end{matrix}\right|=11>0，\left|\begin{matrix}{{{-2}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{-6}}}&{{{0}}} \\{{{1}}}&{{{0}}}&{{{-4}}}\end{matrix}\right|=-38<0， $$

所以，该二次型是负定的.

例2 设A为正定矩阵，证明 $ A^{-1} $也是正定矩阵.

证明 因为 A 正定，所以  $ A^{T} = A $，从而

 $$ \left(\boldsymbol{A}^{-1}\right)^{\mathrm{T}}=\left(\boldsymbol{A}^{\mathrm{T}}\right)^{-1}=\boldsymbol{A}^{-1}, $$

即  $ A^{-1} $ 为实对称矩阵.

又由于 A 正定，存在可逆阵 P，使得  $ P^{T}AP=E $。等式两端求逆，得到

 $$ \boldsymbol{P}^{-1}\boldsymbol{A}^{-1}(\boldsymbol{P}^{\mathrm{T}})^{-1}=\boldsymbol{E}. $$

令 $ (\boldsymbol{P}^{\mathrm{T}})^{-1}=\boldsymbol{Q} $，则Q为可逆矩阵，且满足

 $$ \boldsymbol{Q}^{\mathrm{T}}\boldsymbol{A}^{-1}\boldsymbol{Q}=\boldsymbol{E}, $$

所以 $ A^{-1} $也是正定矩阵.

### 习题4-6

1. 设  $ f=x_{1}^{2}+x_{2}^{2}+2x_{3}^{2}+2ax_{1}x_{2}+2x_{1}x_{3}+2x_{2}x_{3} $ 为正定二次型，求 a.

2. 判定下列二次型的正定性：

(1) $ f=-2x_{1}^{2}-6x_{2}^{2}-4x_{3}^{2}+2x_{1}x_{2}+2x_{1}x_{3} $;

(2)  $ f = 5x_{1}^{2} + x_{2}^{2} + 5x_{3}^{2} + 4x_{1}x_{2} - 8x_{1}x_{3} - 4x_{2}x_{3} $;

(3) $ f(x_{1}, \quad x_{2}, \quad x_{3}) = 2x_{1}^{2} + 3x_{2}^{2} + 3x_{3}^{2} + 4x_{2}x_{3} $

3. 已知 A 为 n 阶正定阵，D 为 n 阶对角阵且对角元全非负，证明  $ A + D $ 也为正定阵.

4. 证明对称阵 A 为正定的充分必要条件是存在可逆矩阵 U，使  $ A = U^{T}U $，即 A 与单位阵 E 合同.

5. 已知 C 是 n 阶可逆阵，A 是 n 阶正定矩阵，证明  $ CAC^{T} $ 也是正定矩阵.

6. 设 A 是 n 阶正定矩阵，常数 k > 0，证明 kA 也是正定矩阵.

7. 设 A 是 n 阶正定矩阵， $ A^{*} $ 是 A 的伴随矩阵，证明  $ A^{*} $ 也是正定矩阵.

8. 设  $ A $、 $ B $ 分别为  $ m $、 $ n $ 阶正定矩阵，试判定分块矩阵  $ C = \begin{pmatrix} A & O \\ O & B \end{pmatrix} $ 是否为正定矩阵.

### 本章小结

本章小结

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>向量的内积、长度及正交性</td><td style='text-align: center; word-wrap: break-word;'>了解向量的内积、长度、正交、标准正交基、正交矩阵等概念掌握施密特正交化方法</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>方阵的特征值与特征向量</td><td style='text-align: center; word-wrap: break-word;'>理解方阵的特征值与特征向量的概念理解方阵的特征值与特征向量的性质掌握方阵的特征值与特征向量的求法</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>相似矩阵</td><td style='text-align: center; word-wrap: break-word;'>理解相似矩阵的概念和性质理解矩阵可相似对角化的充分必要条件</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>实对称矩阵的相似对角化</td><td style='text-align: center; word-wrap: break-word;'>了解实对称矩阵的特征值与特征向量的性质掌握利用正交矩阵将实对称矩阵化为对角阵的方法</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>二次型及其标准形</td><td style='text-align: center; word-wrap: break-word;'>熟悉二次型及其矩阵表示、二次型的秩掌握用正交变换化二次型为标准形的方法会用配方法化二次型为规范形</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>正定二次型与正定阵</td><td style='text-align: center; word-wrap: break-word;'>会用惯性定理会用二次型的正定性及其判别法</td></tr></table>

#### Fibonacci 数列的通项

1202 年，Fibonacci 在一本书中提出一个问题：如果一对兔子出生一个月后开始繁殖，每个月生出一对后代，现有一对新生兔子，假定兔子只繁殖没有死亡，问第 k 月月初会有多少对兔子？

以“对”为单位，每月兔子的“对”数构成一个数列，这便是著名的 Fibonacci 数列  $ \{F_k\} $：0, 1, 1, 2, 3, 5,  $ \cdots $,  $ F_k $,  $ \cdots $，满足条件  $ F_0 = 0 $,  $ F_1 = 1 $,  $ F_{k+2} = F_{k+1} + F_k $ ( $ k = 0, 1, 2, \cdots $)。下面，我们借助于矩阵的特征值与特征向量来求 Fibonacci 数列的通项  $ F_k $。

由 Fibonacci 数列满足的条件，我们给出这样一个关系式

 $$ \left\{\begin{aligned}F_{k+2}&=F_{k+1}+F_{k},\\ F_{k+1}&=F_{k+1},\end{aligned}\right.\quad k=0,\quad1,\quad2,\quad\cdots. $$

令

 $$ \boldsymbol{A}=\begin{pmatrix}{{{1}}}&{{{1}}} \\{{{1}}}&{{{0}}}\end{pmatrix},\quad\boldsymbol{\alpha}_{k}=\begin{pmatrix}{{{F_{k+1}}}} \\{{{F_{k}}}}\end{pmatrix}(k=1,2,3,\cdots),\quad\boldsymbol{\alpha}_{0}=\begin{pmatrix}{{{F_{1}}}} \\{{{F_{0}}}}\end{pmatrix}=\begin{pmatrix}{{{1}}} \\{{{0}}}\end{pmatrix}, $$

则上述关系可写成矩阵形式  $ \alpha_{k+1}=A\alpha_{k},\ k=1,2,3,\cdots $

由上式递推可得

 $$ \boldsymbol{\alpha}_{k}=\boldsymbol{A}^{k}\boldsymbol{\alpha}_{0},\ k=1,2,3,\cdots. $$

于是求 Fibonacci 数列的通项  $ F_{k} $ 的问题就归结为求  $ A^{k} $ 的问题。由

 $$ \left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|=\left|\begin{array}{c c}{1-\lambda}&{1}\\ {1}&{-\lambda}\end{array}\right|=\lambda^{2}-\lambda-1=0 $$

得矩阵A的特征值为

 $$ \lambda_{1}=\frac{1+\sqrt{5}}{2},\lambda_{2}=\frac{1-\sqrt{5}}{2}, $$

对应的特征向量分别为

 $$ \boldsymbol{\xi}_{1}=\begin{pmatrix}\lambda_{1}\\ 1\end{pmatrix},\boldsymbol{\xi}_{2}=\begin{pmatrix}\lambda_{2}\\ 1\end{pmatrix}. $$

令  $ P=(\xi_1 \quad \xi_2) = \begin{pmatrix} \lambda_1 & \lambda_2 \\ 1 & 1 \end{pmatrix} $，则有  $ P^{-1}AP = \Lambda $，其中

 $$ \boldsymbol{A}=\begin{pmatrix}\lambda_{1}&\boldsymbol{0}\\ \boldsymbol{0}&\lambda_{2}\end{pmatrix},\quad\boldsymbol{P}^{-1}=\frac{1}{\lambda_{1}-\lambda_{2}}\begin{pmatrix}1&-\lambda_{2}\\ -1&\lambda_{1}\end{pmatrix}. $$

从而有

 $$ \boldsymbol{A}^{k}=\boldsymbol{P}\boldsymbol{\Lambda}^{k}\boldsymbol{P}^{-1}=\frac{1}{\lambda_{1}-\lambda_{2}}\begin{pmatrix}{{{\lambda_{1}}}}&{{{\lambda_{2}}}} \\{{{1}}}&{{{1}}}\end{pmatrix}\begin{pmatrix}{{{\lambda_{1}^{k}}}}&{{{0}}} \\{{{0}}}&{{{\lambda_{2}^{k}}}}\end{pmatrix}\begin{pmatrix}{{{1}}}&{{{-\lambda_{2}}}} \\{{{-1}}}&{{{\lambda_{1}}}}\end{pmatrix}=\frac{1}{\lambda_{1}-\lambda_{2}}\begin{pmatrix}{{{\lambda_{1}^{k+1}-\lambda_{2}^{k+1}}}}&{{{\lambda_{1}\lambda_{2}^{k+1}-\lambda_{2}\lambda_{1}^{k+1}}}} \\{{{\lambda_{1}^{k}-\lambda_{2}^{k}}}}&{{{\lambda_{1}\lambda_{2}^{k}-\lambda_{2}\lambda_{1}^{k}}}}\end{pmatrix}. $$

于是由

 $$ \begin{pmatrix}F_{_{k+1}}\\F_{_{k}}\end{pmatrix}=\alpha_{_{k}}=A^{_{k}}\alpha_{_{0}}=\frac{1}{\lambda_{_{1}}-\lambda_{_{2}}}\begin{pmatrix}\lambda_{_{1}}^{^{k+1}}-\lambda_{_{2}}^{^{k+1}}&\lambda_{_{1}}\lambda_{_{2}}^{^{k+1}}-\lambda_{_{2}}\lambda_{_{1}}^{^{k+1}}\\\lambda_{_{1}}^{^{k}}-\lambda_{_{2}}^{^{k}}&\lambda_{_{1}}\lambda_{_{2}}^{^{k}}-\lambda_{_{2}}\lambda_{_{1}}^{^{k}}\end{pmatrix}\begin{pmatrix}1\\0\end{pmatrix}=\frac{1}{\lambda_{_{1}}-\lambda_{_{2}}}\begin{pmatrix}\lambda_{_{1}}^{^{k+1}}-\lambda_{_{2}}^{^{k+1}}\\\lambda_{_{1}}^{^{k}}-\lambda_{_{2}}^{^{k}}\end{pmatrix} $$

得 Fibonacci 数列的通项为

 $$ F_{k}=\frac{1}{\lambda_{1}-\lambda_{2}}\left[\lambda_{1}^{k}-\lambda_{2}^{k}\right]=\frac{1}{\sqrt{5}}\left[\left(\frac{1+\sqrt{5}}{2}\right)^{k}-\left(\frac{1-\sqrt{5}}{2}\right)^{k}\right]. $$

## 一、填空题

1. 如果矩阵  $ A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & x & 6 \\ 3 & 6 & x \end{pmatrix} $ 正定，则 x 的取值范围是 ___.

2. 已知  $ f = a(x_1^2 + x_2^2 + x_3^2) + 4x_1x_2 + 4x_1x_3 + 4x_2x_3 $ 经正交变换 X = PY 可化成标准形  $ f = 6Y_1^2 $ 则  $ a = $ ___。

3. 已知实二次型  $ f(x_1, x_2, x_3) = \boldsymbol{x}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x} $ 经正交变换  $ X = P Y $ 可化为标准形  $ -y_1^2 - y_2^2 + 2 y_3^2 $。则矩阵  $ A^3 - 3A =  $ ___。

4. 已知3阶矩阵A的特征值为1, 2, 3，则 $ |A^{3}-5A^{2}+7A|= $ ___.

5. 设 3 阶矩阵  $ A $ 的特征值为 2, 3,  $ \lambda $. 若行列式  $ |2A| = -48 $, 则  $ \lambda = $ ___.

## 二、选择题

1. 设  $ \lambda_{1}, \lambda_{2} $ 是矩阵 A 的两个不同的特征值，对应的特征向量分别为  $ \alpha_{1}, \alpha_{2} $，则  $ \alpha_{1}, A(\alpha_{1}+\alpha_{2}) $ 线性无关的充分必要条件是().

A.  $ \lambda_{1}\neq0 $ B.  $ \lambda_{2}\neq0 $ C.  $ \lambda_{1}=0 $ D.  $ \lambda_{2}=0 $

2. 设  $ \lambda=2 $ 是可逆矩阵 A 的一个特征值，则矩阵  $ \left(\frac{1}{3}A^{2}\right)^{-1} $ 有一个特征值等于( ).

A.  $ \frac{4}{3} $ B.  $ \frac{3}{4} $ C.  $ \frac{1}{2} $ D.  $ \frac{1}{4} $

3. 矩阵 $ \begin{pmatrix}1&a&1\\a&b&a\\1&a&1\end{pmatrix} $与 $ \begin{pmatrix}2&0&0\\0&b&0\\0&0&0\end{pmatrix} $相似的充分必要条件是().

A. a=0, b=2 B. a=0, b 为任意常数 C. a=2, b=0 D. a=2, b 为任意常数

4. 设 A 为 4 阶实对称矩阵， $ A^{2}+A=0 $，若 A 的秩为 3，则 A 相似于（）.

A.  $ \begin{bmatrix}1&&&\\ &1&&\\ &&1&\\ &&&0\end{bmatrix} $ B.  $ \begin{bmatrix}1&&&\\ &1&&\\ &&-1&\\ &&&0\end{bmatrix} $ C.  $ \begin{bmatrix}1&&&\\ &-1&&\\ &&-1&\\ &&&0\end{bmatrix} $ D.  $ \begin{bmatrix}-1&&&\\ &-1&&\\ &&-1&\\ &&&0\end{bmatrix} $

5. 设矩阵  $ A = \begin{bmatrix} 2 & -1 & -1 \\ -1 & 2 & -1 \\ -1 & -1 & 2 \end{bmatrix} $， $ B = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{bmatrix} $，则  $ A $ 与  $ B $（）.

A. 合同，且相似

B. 合同，但不相似

C. 不合同，但相似

D. 既不合同，也不相似

## 三、解答题

1. 设 $n$ 阶矩阵 $\boldsymbol{A}, \boldsymbol{B}$ 满足 $R(\boldsymbol{A}) + R(\boldsymbol{B}) < n$，证明 $\boldsymbol{A}$ 与 $\boldsymbol{B}$ 有公共的特征值，有公共的特征向量。

2. 设  $ A $ 为正交阵，且  $ |A| = -1 $，证明  $ \lambda = -1 $ 是  $ A $ 的特征值.

3. 设  $ A $、 $ B $ 为两个  $ n $ 阶矩阵，且  $ A $ 的  $ n $ 个特征值两两互异，如果  $ A $ 的特征向量恒为  $ B $ 的特征向量，证明： $ AB = BA $.

4. 设 n 阶方阵 A 可逆，且与 n 阶方阵 B 相似， $ A^{*} $、 $ B^{*} $ 分别是矩阵 A 与矩阵 B 的伴随矩阵，证明  $ A^{*} $ 与  $ B^{*} $ 相似.

5. 设矩阵  $ A = \begin{pmatrix} 1 & -1 & 1 \\ x & 4 & y \\ -3 & -3 & 5 \end{pmatrix} $，已知 A 有 3 个线性无关的特征向量， $ \lambda = 2 $ 是 A 的二重特征值，试求一个可逆阵 P，使  $ P^{-1}AP $ 为对角阵.

6. 已知实二次型  $ f(x_1, x_2, x_3) = \boldsymbol{x}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x} $ 经正交变换  $ X = P Y $ 化为标准形  $ f(y_1, y_2, y_3) = -y_1^2 - y_2^2 + 2y_3^2 $，其中  $ X = (x_1, x_2, x_3)^{\mathrm{T}} $， $ A $ 为实对称矩阵，相应于特征值 2 的特征向量为  $ \boldsymbol{\alpha} = (1, 1, -1)^{\mathrm{T}} $，求矩阵  $ A $ 及所用的正交变换  $ x = P y $。

7. 求一个正交变换 $ \begin{pmatrix} x \\ y \\ z \end{pmatrix} = P \begin{pmatrix} u \\ v \\ w \end{pmatrix} $，将二次曲面方程 $ x^2 + 3y^2 + z^2 + 2xy + 2xz + 2yz = 4 $化为标准形方程，并问该二次曲面是什么类型的曲面.
