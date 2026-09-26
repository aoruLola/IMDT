# 第4章 相似矩阵及二次型

> 来源：docs/08_电子书/线性代数-同济大学数学系.md
> 科目：数学二（302） ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：542d072d2e071a92


## [课前导读]

二维和三维空间中的向量有长度、夹角等概念，但是空间 $ \mathbb{R}^n $中的向量却没有这些概念。本节我们先将二维和三维向量的数量积（又称内积）推广到 $ \mathbb{R}^n $中来，再借助于 $ \mathbb{R}^n $中向量的内积来定义 $ \mathbb{R}^n $中向量的长度、夹角等概念。

## 一、向量的内积、长度

定义1 设有 n 维向量  $ x=\begin{pmatrix}x_{1}\\ x_{2}\\ \vdots\\ x_{n}\end{pmatrix} $， $ y=\begin{pmatrix}y_{1}\\ y_{2}\\ \vdots\\ y_{n}\end{pmatrix} $，令

 $$ [\boldsymbol{x},\quad\boldsymbol{y}]={\boldsymbol{x}}^{\mathrm{T}}\boldsymbol{y}=x_{1}y_{1}+x_{2}y_{2}+\cdots+x_{n}y_{n}, $$

称 $ [x, y] $为向量x与y的内积.

可见，n维向量的内积是二维、三维向量的数量积的一种推广，其结果是一个实数.由内积的定义可得如下性质(其中x，y与z都是n维列向量， $ \lambda $为实数)：

(1)  $ [x, y] = [y, x] $;

(2)  $ [\lambda x, y] = \lambda [x, y] = [x, \lambda y] $;

(3)  $ [x+y, z] = [x, z] + [y, z] $;

(4)  $ [x, x] \geq 0 $，当且仅当  $ x = 0 $ 时， $ [x, x] = 0 $.

利用这些性质，还可以证明著名的柯西-施瓦茨(Cauchy-Schwarz)不等式(简称施瓦茨不等式)(这里不证)

 $$ [x,y]^{2}{\leqslant}[x,x][y,y]. $$

利用内积概念，可以定义 n 维向量的长度和夹角.

定义2 设有 n 维向量  $ x=\begin{pmatrix}x_{1}\\ x_{2}\\ \vdots\\ x_{n}\end{pmatrix} $，令

 $$ \parallel\boldsymbol{x}\parallel=\sqrt{\left[\begin{array}{l l}\boldsymbol{x},&\boldsymbol{x}\end{array}\right]}=\sqrt{x_{1}^{2}+x_{2}^{2}+\cdots+x_{n}^{2}}, $$

称  $ \|x\| $ 为向量 x 的长度（或范数）.

向量的长度具有下述性质.

(1)非负性：当 $ x\neq0 $时， $ \|x\|>0 $；当 $ x=0 $时， $ \|x\|=0 $。

(2) 齐次性： $ \|\lambda x\| = |\lambda| \cdot \|x\| $.

(3)三角不等式： $ \|x+y\| \leq \|x\| + \|y\| $.

证明 （1）与(2)是显然的，下面证明(3). 因为

 $$ \left\| \mathbf{x}+\mathbf{y} \right\|^{2}=\left[ \mathbf{x} + \mathbf{y} , \mathbf{x} + \mathbf{y} \right] = \left[ \mathbf{x} , \mathbf{x} \right] + 2 \left[ \mathbf{x} , \mathbf{y} \right] + \left[ \mathbf{y} , \mathbf{y} \right], $$

根据施瓦茨不等式有

 $$ [x,y]\leqslant\sqrt{\left[x,x\right]\left[y,y\right]}, $$

从而

 $$ \left\| \mathbf{x}+\mathbf{y} \right\| \left\| ^{2} \leqslant \left[ \mathbf{x},\mathbf{x} \right]+2\sqrt{[ \mathbf{x},\mathbf{x} ] \left[ \mathbf{y},\mathbf{y} \right] }+\left[ \mathbf{y},\mathbf{y} \right]=\left\| \mathbf{x} \right\| \left\| ^{2}+2 \right\| \left\| \mathbf{x} \right\| \left\| \mathbf{y} \right\|+ \left\| \mathbf{y} \right\|^{2} $$

 $$ =\left(\begin{array}{c}{\parallel\boldsymbol{x}\parallel+\parallel\boldsymbol{y}\parallel}\end{array}\right)^{2}, $$

即

 $$ \left\| \mathbf{x}+\mathbf{y} \right\|\leqslant \left\| \mathbf{x} \right\|+ \left\| \mathbf{y} \right\|. $$

当  $ \|x\| = 1 $ 时，称  $ x $ 为单位向量。如果  $ \alpha \neq 0 $，取  $ \beta = \frac{\alpha}{\|\alpha\|} $，则  $ \beta $ 是一个单位向量。由向量  $ \alpha $ 得到单位向量  $ \beta $ 的过程称为把向量  $ \alpha $ 单位化。

定义 3 当  $ x \neq 0 $,  $ y \neq 0 $ 时,

 $$ \theta=\arccos\frac{\left[\boldsymbol{x},\boldsymbol{y}\right]}{\left\|\boldsymbol{x}\right\|\left\|\boldsymbol{y}\right\|} $$

称为 n 维向量 x 与 y 的夹角.

根据施瓦茨不等式有

 $$ [x,y]\leqslant\left\|x\right\|\cdot\left\|y\right\|, $$

故

 $$ \frac{\left\lbrack x,y\right\rbrack}{\left\|x\right\|\cdot\left\|y\right\|}\leqslant1( 当 \left\|x\right\|\cdot\left\|y\right\|\neq0 时 ), $$

所以定义3是合理的.

当 $ [x, y]=0 $时，称向量x与y正交.显然，若x=0，则x与任何向量都正交.

## 二、正交向量组

定义4 由一组两两正交的非零向量组成的向量组，称为正交向量组.

例如，向量组

 $$ \begin{pmatrix}1\\0\\0\end{pmatrix},\quad\begin{pmatrix}0\\2\\0\end{pmatrix},\quad\begin{pmatrix}0\\0\\3\end{pmatrix} $$

与向量组

 $$ \begin{pmatrix}1\\0\\0\\0\end{pmatrix},\begin{pmatrix}0\\1\\0\\0\end{pmatrix},\begin{pmatrix}0\\0\\\frac{\sqrt{2}}{2}\\-\frac{\sqrt{2}}{2}\end{pmatrix},\begin{pmatrix}0\\0\\\frac{\sqrt{2}}{2}\\\frac{\sqrt{2}}{2}\end{pmatrix} $$

都是正交向量组.

下面讨论正交向量组的性质.

定理 1 若 n 维向量组  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 是一个正交向量组，则  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 线性无关.

证明 设有常数  $ \lambda_{1}, \lambda_{2}, \cdots, \lambda_{m} $，使

 $$ \lambda_{1}\boldsymbol{\alpha}_{1}+\lambda_{2}\boldsymbol{\alpha}_{2}+\cdots+\lambda_{m}\boldsymbol{\alpha}_{m}=\boldsymbol{0}, $$

用  $ \alpha_i^T $ ( $ i=1,2,\cdots,m $) 左乘上式两端，当  $ j\neq i $ 时， $ \alpha_i^T \alpha_j=0 $，故得

 $$ \lambda_{i}\boldsymbol{\alpha}_{i}^{\mathrm{T}}\boldsymbol{\alpha}_{i}=0(i=1,2,\cdots,m). $$

因  $ \alpha_i \ne \boldsymbol{0} (i=1, 2, \cdots, m) $，故  $ \alpha_i^T \alpha_i \ne 0 $，从而必有  $ \lambda_i = 0 (i=1, 2, \cdots, m) $，于是向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_m $ 线性无关。

例 1 已知 3 维空间  $ R^{3} $ 中的两个向量

 $$ \boldsymbol{\alpha}_{1}=\left(\begin{aligned}1\\ -1\\ -1\end{aligned}\right),\quad\boldsymbol{\alpha}_{2}=\left(\begin{aligned}1\\ 2\\ -1\end{aligned}\right) $$

正交，试求一个非零向量  $ \alpha_{3} $，使  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 两两正交.

解 记

 $$ \boldsymbol{A}=\begin{pmatrix}\boldsymbol{\alpha}_{1}^{\mathrm{T}}\\\boldsymbol{\alpha}_{2}^{\mathrm{T}}\end{pmatrix}=\begin{pmatrix}1&-1&-1\\1&2&-1\end{pmatrix}, $$

 $ \alpha_{3} $ 应满足齐次线性方程组 Ax=0，即

 $$ \begin{pmatrix}1&-1&-1\\1&2&-1\end{pmatrix}\begin{pmatrix}x_{1}\\x_{2}\\x_{3}\end{pmatrix}=\begin{pmatrix}0\\0\end{pmatrix}, $$

对系数矩阵 A 实施初等行变换，有

 $$ \boldsymbol{A}=\begin{pmatrix}1&-1&-1\\1&2&-1\end{pmatrix}\longrightarrow\begin{pmatrix}1&-1&-1\\0&3&0\end{pmatrix}\longrightarrow\begin{pmatrix}1&0&-1\\0&1&0\end{pmatrix}, $$

得 $ \left\{\begin{aligned}x_{1}&=x_{3}\\ x_{2}&=0\end{aligned}\right. $，从而有基础解系 $ \begin{pmatrix}1\\ 0\\ 1\end{pmatrix} $. 取 $ \alpha_{3}=\begin{pmatrix}1\\ 0\\ 1\end{pmatrix} $，则 $ \alpha_{3} $为所求.

定义 5 设 $n$ 维向量组 $\boldsymbol{\xi}_1, \boldsymbol{\xi}_2, \cdots, \boldsymbol{\xi}_r$ 是向量空间 $V(V \subseteq \mathbb{R}^n)$ 的一个基，如果 $\boldsymbol{\xi}_1, \boldsymbol{\xi}_2, \cdots, \boldsymbol{\xi}_r$ 两两正交，且都是单位向量，则称 $\boldsymbol{\xi}_1, \boldsymbol{\xi}_2, \cdots, \boldsymbol{\xi}_r$ 是 $V$ 的一个规范正交基。

例如，n 维单位坐标向量  $  \boldsymbol{e}_1  $， $  \boldsymbol{e}_2  $，…， $  \boldsymbol{e}_n  $ 是  $  \mathbb{R}^n  $ 的一个规范正交基。向量组

 $$ \boldsymbol{\xi}_{1}=\left(\frac{2}{3}\atop\frac{1}{3}\atop\frac{2}{3}\right),\quad\boldsymbol{\xi}_{2}=\left(\begin{aligned}&-\frac{2}{3}\atop2\\\frac{3}{3}\\\frac{1}{3}\end{aligned}\right),\quad\boldsymbol{\xi}_{3}=\left(\begin{aligned}&\frac{1}{3}\\\frac{2}{3}\\\frac{2}{3}\end{aligned}\right) $$

也是 $ \mathbb{R}^3 $的一个规范正交基.

若  $ \xi_{1}, \xi_{2}, \cdots, \xi_{r} $ 是 V 的一个规范正交基，那么 V 中任一向量  $ \beta $ 都能由  $ \xi_{1}, \xi_{2}, \cdots, \xi_{r} $

 $ \xi_{r} $ 线性表示，设表示式为

 $$ \boldsymbol{\beta}=\lambda\boldsymbol{\xi}_{1}+\lambda_{2}\boldsymbol{\xi}_{2}+\cdots+\lambda_{r}\boldsymbol{\xi}_{r}, $$

用  $ \xi_{i}^{\mathrm{T}}(i=1,\cdots,r) $ 左乘上式，有

 $$ \boldsymbol{\xi}_{i}^{\mathrm{T}}\boldsymbol{\beta}=\lambda_{i}\boldsymbol{\xi}_{i}^{\mathrm{T}}\boldsymbol{\xi}_{i}=\lambda_{i}(i=1,\cdots,r), $$

即

 $$ \lambda_{i}=\boldsymbol{\xi}_{i}^{\mathrm{T}}\boldsymbol{\beta}=\left[\boldsymbol{\xi}_{i},\boldsymbol{\beta}\right](i=1,\cdots,r). $$

由此可见，利用这个公式能方便地求得系数  $ \lambda_{i}(i=1,\cdots,r) $，也就是向量在规范正交基中的坐标。因此，我们在给向量空间取基时常常取规范正交基。

那么，如何从向量空间 V 的一个基出发，找到 V 的一个规范正交基呢？下面，我们就来讨论这个问题.

## 三、施密特正交化过程

设  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 是向量空间 V 的一个基，从基  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 出发，找一组两两正交的单位向量  $ \xi_{1}, \xi_{2}, \cdots, \xi_{r} $，使  $ \xi_{1}, \xi_{2}, \cdots, \xi_{r} $ 与  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 等价，这个过程称为把基  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 规范正交化。具体步骤如下。

第一步，将基  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 正交化。即取

 $$ \boldsymbol{\beta}_{1}=\boldsymbol{\alpha}_{1} $$

 $$ \boldsymbol{\beta}_{2}=\boldsymbol{\alpha}_{2}-\frac{\left[\boldsymbol{\beta}_{1},\boldsymbol{\alpha}_{2}\right]}{\left[\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{1}\right]}\boldsymbol{\beta}_{1}, $$

 $$ \boldsymbol{\beta}_{3}=\boldsymbol{\alpha}_{3}-\frac{\left[\boldsymbol{\beta}_{1},\boldsymbol{\alpha}_{3}\right]}{\left[\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{1}\right]}\boldsymbol{\beta}_{1}-\frac{\left[\boldsymbol{\beta}_{2},\boldsymbol{\alpha}_{3}\right]}{\left[\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{2}\right]}\boldsymbol{\beta}_{2}, $$

 $$ \boldsymbol{\beta}_{r}=\boldsymbol{\alpha}_{r}-\frac{\left[\boldsymbol{\beta}_{1},\boldsymbol{\alpha}_{r}\right]}{\left[\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{1}\right]}\boldsymbol{\beta}_{1}-\frac{\left[\boldsymbol{\beta}_{2},\boldsymbol{\alpha}_{r}\right]}{\left[\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{2}\right]}\boldsymbol{\beta}_{2}-\cdots-\frac{\left[\boldsymbol{\beta}_{r-1},\boldsymbol{\alpha}_{r}\right]}{\left[\boldsymbol{\beta}_{r-1},\boldsymbol{\beta}_{r-1}\right]}\boldsymbol{\beta}_{r-1}. $$

容易验证  $ \beta_{1}, \beta_{2}, \cdots, \beta_{r} $ 两两正交（验证的过程请读者完成），且  $ \beta_{1}, \beta_{2}, \cdots, \beta_{r} $ 与  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{r} $ 等价.

从线性无关向量组  $ \alpha_1 $,  $ \alpha_2 $,  $ \cdots $,  $ \alpha_r $ 导出正交向量组  $ \beta_1 $,  $ \beta_2 $,  $ \cdots $,  $ \beta_r $ 的过程，称为施密特 (Schmidt) 正交化过程。我们不仅可以证明  $ \beta_1 $,  $ \beta_2 $,  $ \cdots $,  $ \beta_r $ 与  $ \alpha_1 $,  $ \alpha_2 $,  $ \cdots $,  $ \alpha_r $ 等价，还可以证明对任何  $ k $ ( $ 1 \leq k \leq r $)，向量组  $ \beta_1 $,  $ \beta_2 $,  $ \cdots $,  $ \beta_k $ 与  $ \alpha_1 $,  $ \alpha_1 $,  $ \cdots $,  $ \alpha_k $ 等价。

第二步，将 $ \beta_{1},\beta_{2},\cdots,\beta_{r} $单位化，得到

 $$ \boldsymbol{\xi}_{1}=\frac{1}{\left\|\boldsymbol{\beta}_{1}\right\|}\boldsymbol{\beta}_{1},\boldsymbol{\xi}_{2}=\frac{1}{\left\|\boldsymbol{\beta}_{2}\right\|}\boldsymbol{\beta}_{2},\cdots,\boldsymbol{\xi}_{r}=\frac{1}{\left\|\boldsymbol{\beta}_{r}\right\|}\boldsymbol{\beta}_{r}. $$

于是， $ \xi_{1},\xi_{2},\cdots,\xi_{r} $ 就是 V 的一个规范正交基.

例2 设  $ \alpha_1 = \begin{pmatrix} 1 \\ 1 \\ -1 \end{pmatrix} $， $ \alpha_2 = \begin{pmatrix} 0 \\ 4 \\ 1 \end{pmatrix} $， $ \alpha_3 = \begin{pmatrix} -2 \\ 1 \\ 1 \end{pmatrix} $ 是  $ \mathbb{R}^3 $ 的一个基，求一个与  $ \alpha_1 $， $ \alpha_2 $， $ \alpha_3 $ 等价的规范正交基.

解取

 $$ \boldsymbol{\beta}_{1}=\boldsymbol{\alpha}_{1}=\left(\begin{aligned}1\\ 1\\ -1\end{aligned}\right), $$

 $$ \boldsymbol{\beta}_{2}=\boldsymbol{\alpha}_{2}-\frac{\left[\boldsymbol{\beta}_{1},\boldsymbol{\alpha}_{2}\right]}{\left[\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{1}\right]}\boldsymbol{\beta}_{1}=\left(\begin{aligned}&0\\ &4\\ &1\end{aligned}\right)-\frac{3}{3}\left(\begin{aligned}&1\\ &1\\ &-1\end{aligned}\right)=\left(\begin{aligned}&-1\\ &3\\ &2\end{aligned}\right), $$

 $$ \boldsymbol{\beta}_{3}=\boldsymbol{\alpha}_{3}-\frac{\left[\boldsymbol{\beta}_{1},\boldsymbol{\alpha}_{3}\right]}{\left[\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{1}\right]}\boldsymbol{\beta}_{1}-\frac{\left[\boldsymbol{\beta}_{2},\boldsymbol{\alpha}_{3}\right]}{\left[\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{2}\right]}\boldsymbol{\beta}_{2}=\begin{pmatrix}-2\\ 1\\ 1\end{pmatrix}-\frac{-2}{3}\begin{pmatrix}1\\ 1\\ -1\end{pmatrix}-\frac{7}{14}\begin{pmatrix}-1\\ 3\\ 2\end{pmatrix}=\begin{pmatrix}-\frac{5}{6}\\ \frac{1}{6}\\ -\frac{2}{3}\end{pmatrix}, $$

再将 $ \beta_{1},\beta_{2},\beta_{3} $单位化，得到

 $$ \boldsymbol{\xi}_{1}=\frac{1}{\|\boldsymbol{\beta}_{1}\|}\boldsymbol{\beta}_{1}=\frac{1}{\sqrt{3}}\begin{pmatrix}1\\ 1\\ -1\end{pmatrix},\boldsymbol{\xi}_{2}=\frac{1}{\|\boldsymbol{\beta}_{2}\|}\boldsymbol{\beta}_{2}=\frac{1}{\sqrt{14}}\begin{pmatrix}-1\\ 3\\ 2\end{pmatrix},\boldsymbol{\xi}_{3}=\frac{1}{\|\boldsymbol{\beta}_{3}\|}\boldsymbol{\beta}_{3}=\frac{1}{\sqrt{42}}\begin{pmatrix}-5\\ 1\\ -4\end{pmatrix}, $$

 $ \xi_{1}, \xi_{2}, \xi_{3} $ 即为所求.

例3 已知  $ \alpha_{1}=\begin{pmatrix}1\\-1\\1\end{pmatrix} $，求一组非零向量  $ \alpha_{2} $， $ \alpha_{3} $，使  $ \alpha_{1} $， $ \alpha_{2} $， $ \alpha_{3} $ 两两正交.

解  $ \alpha_{2}, \alpha_{3} $ 应满足方程  $ \alpha_{1}^{T}x=0 $，即

 $$ x_{1}-x_{2}+x_{3}=0. $$

它的基础解系为

 $$ \boldsymbol{\xi}_{1}=\begin{pmatrix}1\\ 1\\ 0\end{pmatrix},\boldsymbol{\xi}_{2}=\begin{pmatrix}1\\ 0\\ -1\end{pmatrix}. $$

令

 $$ \boldsymbol{\alpha}_{2}=\boldsymbol{\xi}_{1}=\left(\begin{aligned}1\\1\\0\end{aligned}\right),\quad\boldsymbol{\alpha}_{3}=\boldsymbol{\xi}_{2}-\frac{\left[\boldsymbol{\alpha}_{2},\quad\boldsymbol{\xi}_{2}\right]}{\left[\boldsymbol{\alpha}_{2},\quad\boldsymbol{\alpha}_{2}\right]}\boldsymbol{\alpha}_{2}=\left(\begin{aligned}1\\0\\-1\end{aligned}\right)-\frac{1}{2}\left(\begin{aligned}1\\1\\0\end{aligned}\right)=\frac{1}{2}\left(\begin{aligned}1\\-1\\-2\end{aligned}\right), $$

则  $ \alpha_{1}, \alpha_{2}, \alpha_{3} $ 两两正交.

## 四、正交矩阵

定义 6 如果 n 阶矩阵 A 满足

 $$ \boldsymbol{A}^{\mathrm{T}}\boldsymbol{A}=\boldsymbol{E}( 即 \boldsymbol{A}^{-1}=\boldsymbol{A}^{\mathrm{T}}), $$

那么称 A 为正交矩阵，简称正交阵.

关于正交矩阵，我们有下面的结论.

定理2 设矩阵A是n阶方阵，则下列结论等价：

(1) A 是 n 阶正交阵；

(2) A 的列向量组是  $ R^n $ 的一个规范正交基；

(3)A 的行向量组是 $ R^{n} $的一个规范正交基.

证明（1） $ \Leftrightarrow(2) $:

将矩阵  $ A $ 按列分块  $ A = (\alpha_1, \alpha_2, \cdots, \alpha_n) $，如果  $ A $ 是  $ n $ 阶正交阵，则公式  $ A^T A = E $ 可表示为

 $$ \begin{pmatrix}{{{\boldsymbol{\alpha}_{1}^{\mathrm{T}}}}} \\{{{\boldsymbol{\alpha}_{2}^{\mathrm{T}}}}} \\{{{\vdots}}} \\{{{\boldsymbol{\alpha}_{n}^{\mathrm{T}}}}}\end{pmatrix}(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\cdots,\boldsymbol{\alpha}_{n})=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{\cdots}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{\cdots}}}&{{{0}}} \\{{{\vdots}}}&{{{\vdots}}}&{{{\ddots}}}&{{{\vdots}}} \\{{{0}}}&{{{0}}}&{{{\cdots}}}&{{{1}}}\end{pmatrix}, $$

亦即

 $$ \boldsymbol{\alpha}_{i}^{\mathrm{T}}\boldsymbol{\alpha}_{j}=\boldsymbol{\delta}_{ij}=\left\{\begin{aligned}&1,&& 当 i=j,\\ &0,&& 当 i\neq j,\end{aligned}\right.\quad(i,\ j=1,\ 2,\ \cdots,\ n) $$

这说明 A 的列向量都是 n 维单位向量，且两两正交，从而是  $ R^{n} $ 的一个规范正交基.

(1)⇔(3)：因为 $ A^{T}A=E $与 $ AA^{T}=E $等价，所以将矩阵A按行分块

 $$ \boldsymbol{A}=\begin{pmatrix}\boldsymbol{\beta}_{1}^{\mathrm{T}}\\\boldsymbol{\beta}_{2}^{\mathrm{T}}\\\vdots\\\boldsymbol{\beta}_{n}^{\mathrm{T}}\end{pmatrix}, $$

于是公式  $ AA^{T}=E $ 可表示为

 $$ \boldsymbol{A}\boldsymbol{A}^{\mathrm{T}}=\left(\begin{aligned}\boldsymbol{\beta}_{1}^{\mathrm{T}}\\ \boldsymbol{\beta}_{2}^{\mathrm{T}}\\ \vdots\\ \boldsymbol{\beta}_{n}^{\mathrm{T}}\end{aligned}\right)\left(\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\cdots,\boldsymbol{\beta}_{n}\right)=\left(\begin{array}{c c c c}{1}&{0}&{\cdots}&{0}\\ {0}&{1}&{\cdots}&{0}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {0}&{0}&{\cdots}&{1}\end{array}\right), $$

所以

 $$ \boldsymbol{\beta}_{i}^{\mathrm{T}}\boldsymbol{\beta}_{j}=\boldsymbol{\delta}_{i j}=\left\{\begin{aligned}&1,&& 当 i=j,\\ &0,&& 当 i\neq j,\end{aligned}\right.\left(i,\;j=1,\;2,\;\cdots,\;n\right) $$

即：A 的行向量也都是 n 维单位向量，且两两正交，从而是  $ R^n $ 的一个规范正交基。

例4 验证矩阵

 $$ \boldsymbol{P}=\begin{pmatrix}\frac{1}{2}&-\frac{1}{2}&-\frac{1}{2}&\frac{1}{2}\\-\frac{1}{2}&-\frac{1}{2}&\frac{1}{2}&\frac{1}{2}\\-\frac{1}{2}&\frac{1}{2}&-\frac{1}{2}&\frac{1}{2}\\\frac{1}{2}&\frac{1}{2}&\frac{1}{2}&\frac{1}{2}\end{pmatrix} $$

是正交阵.

证明　容易验证 P 的每个列向量都是单位向量，且两两正交，所以 P 是正交阵.

从正交阵的定义容易证明（证明留作习题），正交矩阵具有如下性质：

(1) 若  $ A $ 为正交阵，则  $ A^{-1} = A^T $ 也是正交阵，且  $ |A| = 1 $ 或 -1；

(2) 若 A 和 B 都是正交阵，则 AB 也是正交阵.

定义 7 若 P 为正交矩阵，则线性变换 y = P x 称为正交变换.

设 y=Px 为正交变换，则有

 $$ \parallel\boldsymbol{y}\parallel=\sqrt{\boldsymbol{y}^{\mathrm{T}}\boldsymbol{y}}=\sqrt{\boldsymbol{x}^{\mathrm{T}}\boldsymbol{P}^{\mathrm{T}}\boldsymbol{P}\boldsymbol{x}}=\sqrt{\boldsymbol{x}^{\mathrm{T}}\boldsymbol{x}}=\parallel\boldsymbol{x}\parallel. $$

因此正交变换保持向量的长度不变，这是正交变换的优良特性.

### 习题4-1

1. 设  $ \alpha = \begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix} $， $ \beta = \begin{pmatrix} -4 \\ 2 \\ 2 \end{pmatrix} $，求向量  $ \gamma $，使得  $ \gamma $ 与  $ \alpha $ 和  $ \beta $ 均正交.

2. 试用施密特法把下列向量组正交化：

 $$ \begin{array}{r}{(1)\boldsymbol{\alpha}_{1}=\left(\begin{matrix}{1}\\ {1}\\ {2}\\ \end{matrix}\right),\quad\boldsymbol{\alpha}_{2}=\left(\begin{matrix}{1}\\ {2}\\ {3}\\ \end{matrix}\right),\quad\boldsymbol{\alpha}_{3}=\left(\begin{matrix}{-1}\\ {3}\\ {5}\\ \end{matrix}\right);\quad(2)\boldsymbol{\alpha}_{1}=\left(\begin{matrix}{1}\\ {-1}\\ {0}\\ {0}\\ \end{matrix}\right),\quad\boldsymbol{\alpha}_{2}=\left(\begin{matrix}{1}\\ {0}\\ {-1}\\ {0}\\ \end{matrix}\right),\quad\boldsymbol{\alpha}_{3}=\left(\begin{matrix}{-1}\\ {0}\\ {0}\\ {1}\\ \end{matrix}\right).}\end{array} $$

3. 下列矩阵是不是正交矩阵？并说明理由.

 $$ \begin{pmatrix}\displaystyle\frac{1}{2}&-\frac{1}{2}&\frac{1}{3}\\-\frac{1}{2}&\frac{1}{3}&\frac{1}{2}\\\displaystyle\frac{1}{3}&\frac{1}{2}&-\frac{1}{2}\end{pmatrix}; $$

 $$ \begin{pmatrix}\displaystyle\frac{1}{9}&-\frac{8}{9}&-\frac{4}{9}\\-\frac{8}{9}&\frac{1}{9}&-\frac{4}{9}\\-\frac{4}{9}&-\frac{4}{9}&\frac{7}{9}\end{pmatrix}. $$

4. 若  $ A $ 为正交阵，证明  $ A^{-1} = A^T $ 也是正交阵，且  $ |A| = 1 $ 或 -1.

5. 设 A, B 都是正交阵，证明 AB 也是正交阵.

6. 设 x 为 n 维列向量， $ x^{T}x=1 $，令  $ H=E-2xx^{T} $，证明 H 是对称的正交阵.

### [课前导读]

工程技术中的一些问题，如振动问题和稳定性问题，常可归结为求一个方阵的特征值和特征向量的问题。数学中诸如方阵的对角化及解微分方程组等问题，也都要用到特征值的理论。本节我们就来介绍方阵的特征值理论。

## 一、方阵的特征值与特征向量的概念及其求法

定义 设 A 是 n 阶矩阵，如果数  $ \lambda $ 和 n 维非零列向量  $ \alpha $ 使关系式

 $$ A\alpha=\lambda\alpha $$

成立，那么数  $ \lambda $ 称为矩阵 A 的特征值，非零向量  $ \alpha $ 称为 A 的对应于特征值  $ \lambda $ 的特征向量.

概念及其求法

例如，矩阵  $ A = \begin{pmatrix} -1 & 2 & 0 \\ 0 & 3 & 0 \\ 2 & 1 & -1 \end{pmatrix} $， $ \alpha = \begin{pmatrix} 1 \\ 2 \\ 1 \end{pmatrix} $，则有

 $$ \boldsymbol{A}\boldsymbol{\alpha}=\begin{pmatrix}{{{-1}}}&{{{2}}}&{{{0}}} \\{{{0}}}&{{{3}}}&{{{0}}} \\{{{2}}}&{{{1}}}&{{{-1}}}\end{pmatrix}\begin{pmatrix}{{{1}}} \\{{{2}}} \\{{{1}}}\end{pmatrix}=\begin{pmatrix}{{{3}}} \\{{{6}}} \\{{{3}}}\end{pmatrix}=3\begin{pmatrix}{{{1}}} \\{{{2}}} \\{{{1}}}\end{pmatrix}, $$

所以数3是矩阵A的特征值， $ \alpha $是A的对应于特征值3的特征向量.

一个任意给定的 n 阶矩阵 A 会有多少个特征值？对应的特征向量又该如何求呢？为了回答这些问题，我们先假设矩阵 A 有特征值  $ \lambda $，对应于特征值  $ \lambda $ 的特征向量为  $ \alpha $，则  $ \lambda $ 与  $ \alpha $ 满足式(2-1). 将式(2-1)改写成

 $$ (A-\lambda E)\alpha=0, $$

可见， $ \alpha $ 是 n 个未知数 n 个方程的齐次线性方程组  $ (A - \lambda E)x = 0 $ 的非零解。而方程组有非零解的充分必要条件是系数行列式等于零，即

 $$ \left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|=0. $$

记

 $$ f(\lambda)=\left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|=\left|\begin{array}{c c c c}a_{11}-\lambda&a_{12}&\cdots&a_{1n}\\ a_{21}&a_{22}-\lambda&\cdots&a_{2n}\\ \vdots&\vdots&\ddots&\vdots\\ a_{11}&a_{12}&\cdots&a_{n n}-\lambda\end{array}\right|, $$

则 $ f(\lambda) $是 $ \lambda $的n次多项式，称为矩阵A的特征多项式。从而公式 $ |A-\lambda E|=0 $可以写成 $ f(\lambda)=0 $，这是以 $ \lambda $为未知数的一元n次方程，称为A的特征方程，而A的特征值就是特征方程的根。我们知道，一元n次方程在复数范围内恒有n个根（重根按重数计算）。因此，n阶矩阵A在复数范围内有n个特征值，通过解矩阵A的特征方程就可以得到这n个特征值。

设  $ \lambda = \lambda_{i} $ 为矩阵 A 的一个特征值，则由方程

 $$ \left(\boldsymbol{A}-\lambda_{i}\boldsymbol{E}\right)x=0 $$

可求得非零解  $ x = \alpha_i $，那么  $ \alpha_i $ 便是  $ A $ 的对应于特征值  $ \lambda_i $ 的特征向量。（若  $ \lambda_i $ 为实数，则  $ \alpha_i $ 可取实向量；若  $ \lambda_i $ 为复数，则  $ \alpha_i $ 可取复向量。）

例1 求矩阵

 $$ \boldsymbol{A}=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{2}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{3}}}\end{pmatrix} $$

的特征值和特征向量.

解 矩阵 A 的特征多项式为

 $$ \left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|=\left|\begin{array}{c c c}{1-\lambda}&{0}&{0}\\ {0}&{2-\lambda}&{0}\\ {0}&{0}&{3-\lambda}\end{array}\right|=\left(1-\lambda\right)\left(2-\lambda\right)\left(3-\lambda\right), $$

所以 A 的全部特征值为  $ \lambda_{1}=1 $， $ \lambda_{2}=2 $， $ \lambda_{3}=3 $。

当 $ \lambda_{1}=1 $时，解方程 $ (A-E)x=0 $，由

 $$ \boldsymbol{A}-\boldsymbol{E}=\begin{pmatrix}0&0&0\\0&1&0\\0&0&2\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}0&1&0\\0&0&1\\0&0&0\end{pmatrix}, $$

得基础解系

 $$ \boldsymbol{\alpha}_{1}=\begin{pmatrix}1\\ 0\\ 0\end{pmatrix}, $$

于是  $ k\alpha_{1}(k\neq0) $ 是对应于特征值  $ \lambda_{1}=1 $ 的全部特征向量.

当 $ \lambda_{2}=2 $时，解方程 $ (A-2E)x=0 $，由

 $$ \boldsymbol{A}-2\boldsymbol{E}=\begin{pmatrix}{{{-1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}}\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}, $$

得基础解系

 $$ \boldsymbol{\alpha}_{2}=\begin{pmatrix}0\\ 1\\ 0\end{pmatrix}, $$

于是  $ k\alpha_{2}(k\neq0) $ 是对应于特征值  $ \lambda_{2}=2 $ 的全部特征向量.

当  $ \lambda_{3}=3 $ 时，解方程  $ (\boldsymbol{A}-3\boldsymbol{E})\boldsymbol{x}=0 $，由

 $$ \boldsymbol{A}-\boldsymbol{3}\boldsymbol{E}=\begin{pmatrix}{{{-2}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{-1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}, $$

得基础解系

 $$ \boldsymbol{\alpha}_{3}=\begin{pmatrix}0\\ 0\\ 1\end{pmatrix}, $$

于是  $ k\alpha_{3}(k\neq0) $ 是对应于特征值  $ \lambda_{3}=3 $ 的全部特征向量.

由例 1 可知，对角矩阵的全部特征值就是它的对角线上的元素.

例2 求矩阵

 $$ \boldsymbol{B}=\begin{pmatrix}{{{-1}}}&{{{2}}}&{{{0}}} \\{{{0}}}&{{{3}}}&{{{0}}} \\{{{2}}}&{{{1}}}&{{{-1}}}\end{pmatrix} $$

的特征值和特征向量.

解 B 的特征多项式为

 $$ \left|\boldsymbol{B}-\lambda\boldsymbol{E}\right|=\left|\begin{array}{c c c}{{{-1-\lambda}}}&{{{2}}}&{{{0}}} \\{{{0}}}&{{{3-\lambda}}}&{{{0}}} \\{{{2}}}&{{{1}}}&{{{-1-\lambda}}}\end{array}\right|=\left(1+\lambda\right)^{2}\left(3-\lambda\right), $$

所以 B 的全部特征值为  $ \lambda_{1}=\lambda_{2}=-1 $， $ \lambda_{3}=3 $。

当  $ \lambda_{1}=\lambda_{2}=-1 $ 时，解方程  $ (\boldsymbol{B}+\boldsymbol{E})\boldsymbol{x}=0 $。由

 $$ \boldsymbol{B}+\boldsymbol{E}=\begin{pmatrix}{{{0}}}&{{{2}}}&{{{0}}} \\{{{0}}}&{{{4}}}&{{{0}}} \\{{{2}}}&{{{1}}}&{{{0}}}\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix} $$

得基础解系

 $$ \boldsymbol{\alpha}_{1}=\begin{pmatrix}0\\ 0\\ 1\end{pmatrix}, $$

从而  $ \alpha_1 $ 就是对应于  $ \lambda_1 = \lambda_2 = -1 $ 的特征向量，并且对应于  $ \lambda_1 = \lambda_2 = -1 $ 的全部特征向量为  $ k\alpha_1 $（常数  $ k \neq 0 $）。

当 $ \lambda_{3}=3 $时，解方程 $ (B-3E)x=0 $。由

 $$ \boldsymbol{B}-3\boldsymbol{E}=\begin{pmatrix}{{{-4}}}&{{{2}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}} \\{{{2}}}&{{{1}}}&{{{-4}}}\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}} \\{{{0}}}&{{{1}}}&{{{-2}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix} $$

得基础解系

 $$ \boldsymbol{\alpha}_{2}=\begin{pmatrix}1\\ 2\\ 1\end{pmatrix}, $$

从而  $ \alpha_{2} $ 就是对应于  $ \lambda_{3}=3 $ 的特征向量，并且对应于  $ \lambda_{3}=3 $ 的全部特征向量为  $ k\alpha_{2} $ (常数  $ k\neq0 $)

例3 求矩阵

 $$ \boldsymbol{C}=\begin{pmatrix}{{{1}}}&{{{0}}}&{{{2}}} \\{{{0}}}&{{{3}}}&{{{0}}} \\{{{2}}}&{{{0}}}&{{{1}}}\end{pmatrix} $$

的特征值和特征向量.

解 矩阵 C 的特征多项式为

 $$ \left|\boldsymbol{C}-\lambda\boldsymbol{E}\right|=\left|\begin{array}{c c c}{1-\lambda}&{0}&{2}\\ {0}&{3-\lambda}&{0}\\ {2}&{0}&{1-\lambda}\end{array}\right|=(1-\lambda)^{2}(3-\lambda)-4(3-\lambda)=-(\lambda-3)^{2}(\lambda+1), $$

所以 C 的全部特征值为  $ \lambda_{1}=\lambda_{2}=3 $， $ \lambda_{3}=-1 $。

当  $ \lambda_{1}=\lambda_{2}=3 $ 时，解方程  $ (C-3E)x=0 $，由

 $$ \boldsymbol{C}-3\boldsymbol{E}=\begin{pmatrix}{{{-2}}}&{{{0}}}&{{{2}}} \\{{{0}}}&{{{0}}}&{{{0}}} \\{{{2}}}&{{{0}}}&{{{-2}}}\end{pmatrix}\overset{\sim}{\boldsymbol{\varepsilon}}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix} $$

得基础解系

 $$ \boldsymbol{\alpha}_{1}=\left(\begin{aligned}0\\ 1\\ 0\end{aligned}\right),\quad\boldsymbol{\alpha}_{2}=\left(\begin{aligned}1\\ 0\\ 1\end{aligned}\right), $$

从而  $ \alpha_{1} $、 $ \alpha_{2} $ 就是对应于  $ \lambda_{1}=\lambda_{2}=3 $ 的两个线性无关的特征向量，并且对应于  $ \lambda_{1}=\lambda_{2}=3 $ 的全部特征向量为  $ k_{1}\alpha_{1}+k_{2}\alpha_{2}(k_{1} $、 $ k_{2} $ 不同时为零)（见下文性质3）.

当  $ \lambda_{3} = -1 $ 时，解方程  $ (C + E)x = 0 $，由

 $$ \left(\boldsymbol{C}+\boldsymbol{E}\right)=\begin{pmatrix}{{{2}}}&{{{0}}}&{{{2}}} \\{{{0}}}&{{{4}}}&{{{0}}} \\{{{2}}}&{{{0}}}&{{{2}}}\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix}, $$

得基础解系

 $$ \boldsymbol{\alpha}_{3}=\left(\begin{aligned}1\\ 0\\ -1\end{aligned}\right), $$

从而  $ \alpha_{3} $ 就是对应于  $ \lambda_{3}=-1 $ 的特征向量，并且对应于  $ \lambda_{3}=-1 $ 的全部特征向量为  $ k\alpha_{3}(k\neq0) $.

## 二、方阵的特征值与特征向量的性质

性质1 设 n 阶矩阵  $ A=(a_{ij}) $ 的特征值为  $ \lambda_{1}, \lambda_{2}, \cdots, \lambda_{n} $，则

(1)  $ \lambda_{1} + \lambda_{2} + \cdots + \lambda_{n} = a_{11} + a_{22} + \cdots + a_{nn} $;

(2)  $ \lambda_1 \lambda_2 \cdots \lambda_n = |A| $.

性质

证明 由于矩阵的特征值就是其特征方程的根，从而

 $$ \begin{aligned}f(\lambda)&=\left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|=\left|\begin{array}{cccc}a_{11}-\lambda&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}-\lambda&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{11}&a_{12}&\cdots&a_{nn}-\lambda\\\end{array}\right|\\&=(\lambda_{1}-\lambda)\left(\lambda_{2}-\lambda\right)\cdots(\lambda_{n}-\lambda).\end{aligned} $$

在上式中取 $ \lambda=0 $，有

 $$ f(0)=\left|A\right|=\lambda_{1}\lambda_{2}\cdots\lambda_{n}. $$

由

 $$ \left(\lambda_{1}-\lambda\right)\left(\lambda_{2}-\lambda\right)\cdots\left(\lambda_{n}-\lambda\right)=0 $$

可得  $ \lambda^{n-1} $ 前的系数是  $ -\left(\lambda_{1}+\lambda_{2}+\cdots+\lambda_{n}\right) $，而由 n 阶行列式的计算可知

 $$ f(\lambda)=\left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|=\left|\begin{array}{cccc}a_{11}-\lambda&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}-\lambda&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{11}&a_{12}&\cdots&a_{nn}-\lambda\end{array}\right| $$

的展开式中含  $ \lambda^{n-1} $ 的项只能出现在其主对角线元素的乘积  $ (a_{11}-\lambda)(a_{22}-\lambda)\cdots(a_{nn}-\lambda) $ 中，并且  $ \lambda^{n-1} $ 前的系数是  $ -(a_{11}+a_{22}+\cdots+a_{nn}) $，因此有  $ \lambda_1+\lambda_2+\cdots+\lambda_n=a_{11}+a_{22}+\cdots+a_{nn} $.

由此可见，n阶方阵A可逆的充分必要条件是A的特征值全不为零.

性质2 若  $ \lambda $ 是方阵 A 的特征值， $ \alpha $ 为对应于特征值  $ \lambda $ 的特征向量，则

(1) $ \lambda^{k} $ 是方阵 $ A^{k} $ 的特征值(k为非负整数)，对应于特征值 $ \lambda^{k} $ 的特征向量是 $ \alpha $;

(2) $ k\lambda $ 是方阵 kA 的特征值(k 为任意常数)，对应于特征值  $ k\lambda $ 的特征向量是  $ \alpha $;

(3) 当 A 可逆时， $ \lambda^{-1} $ 是方阵  $ A^{-1} $ 的特征值，对应于特征值  $ \lambda^{-1} $ 的特征向量是  $ \alpha $;

(4) 若矩阵  $ A $ 的多项式是  $ \boldsymbol{\varphi}(A) = a_m A^m + \cdots + a_1 A + a_0 E $，则方阵  $ \boldsymbol{\varphi}(A) $ 的特征值是  $ \boldsymbol{\varphi}(\lambda) $（其中  $ \boldsymbol{\varphi}(\lambda) = a_m \lambda^m + \cdots + a_1 \lambda + a_0 $ 是关于  $ \lambda $ 的多项式），对应于特征值  $ \boldsymbol{\varphi}(\lambda) $ 的特征向量是  $ \boldsymbol{\alpha} $。

证明 因  $ \lambda $ 是方阵 A 的特征值， $ \alpha $ 为对应于特征值  $ \lambda $ 的特征向量，故有  $ A\alpha = \lambda\alpha $。于是

(1)  $ A^k\boldsymbol{\alpha} = A^{k-1}(A\boldsymbol{\alpha}) = A^{k-1}(\lambda\boldsymbol{\alpha}) = \lambda(A^{k-1}\boldsymbol{\alpha}) = \lambda A^{k-2}(A\boldsymbol{\alpha}) = \lambda^2 A^{k-2}\boldsymbol{\alpha} = \cdots = \lambda^k\boldsymbol{\alpha} $

所以  $ \lambda^{k} $ 是方阵  $ A^{k} $ 的特征值，对应于特征值  $ \lambda^{k} $ 的特征向量是  $ \alpha $;

(2)  $ (k\mathbf{A})\boldsymbol{\alpha}=k(\mathbf{A}\boldsymbol{\alpha})=k(\lambda\boldsymbol{\alpha})=(k\lambda)\boldsymbol{\alpha} $,

所以  $ k\lambda $ 是方阵 kA 的特征值，对应于特征值  $ k\lambda $ 的特征向量是  $ \alpha $;

(3) 当 A 可逆时，特征值均不为零，于是

 $$ \boldsymbol{A}^{-1}\boldsymbol{A}=\boldsymbol{E}\Rightarrow\boldsymbol{A}^{-1}\left(\boldsymbol{A}\boldsymbol{\alpha}\right)=\boldsymbol{E}\boldsymbol{\alpha}\Rightarrow\lambda\boldsymbol{A}^{-1}\boldsymbol{\alpha}=\boldsymbol{\alpha}\Rightarrow\boldsymbol{A}^{-1}\boldsymbol{\alpha}=\lambda^{-1}\boldsymbol{\alpha}, $$

 $$ \lambda^{-1} $$

 $$ \boldsymbol{A}^{-1} $$

 $$ \lambda^{-1} $$

 $$ \alpha $$

(4)由(1)可知，

 $$ \begin{align*}\boldsymbol{\varphi}(\boldsymbol{A})\boldsymbol{\alpha}=&\left(a_{m}\boldsymbol{A}^{m}+\cdots+a_{1}\boldsymbol{A}+a_{0}\boldsymbol{E}\right)\boldsymbol{\alpha}=a_{m}\boldsymbol{A}^{m}\boldsymbol{\alpha}+\cdots+a_{1}\boldsymbol{A}\boldsymbol{\alpha}+a_{0}\boldsymbol{E}\boldsymbol{\alpha}\\=&a_{m}\boldsymbol{\lambda}^{m}\boldsymbol{\alpha}+\cdots+a_{1}\boldsymbol{\lambda}\boldsymbol{\alpha}+a_{0}\boldsymbol{\alpha}=\left(a_{m}\boldsymbol{\lambda}^{m}+\cdots+a_{1}\boldsymbol{\lambda}+a_{0}\right)\boldsymbol{\alpha}=\boldsymbol{\varphi}\left(\boldsymbol{\lambda}\right)\boldsymbol{\alpha},\end{align*} $$

所以方阵  $ \varphi(A) $ 的特征值是  $ \varphi(\lambda) $，对应于特征值  $ \varphi(\lambda) $ 的特征向量是  $ \alpha $.

例4 设3阶矩阵的特征值为1，2，3，求 $ 2A^{*}-3A+2E $的特征值.

解 因 A 的特征值全不为 0，知 A 可逆，故  $ A^{*}=|A|A^{-1} $. 而  $ \left|A\right|=\lambda_{1}\lambda_{2}\lambda_{3}=6 $，记

 $$ \varphi(A)=A^{*}-3A+2E=6A^{-1}-3A+2E, $$

这里， $ \varphi(A) $ 虽不是矩阵多项式，但也具有矩阵多项式的特性，从而可利用性质2(4)来计算 $ \varphi(A) $的特征值.由

 $$ \varphi\left(\lambda\right)=6\lambda^{-1}-3\lambda+2 $$

得  $ \varphi(A) $ 的特征值为

 $$ \varphi\left(1\right)=6-3+2=5,\ \varphi\left(2\right)=\frac{6}{2}-3\times2+2=-1,\ \varphi\left(3\right)=\frac{6}{3}-3\times3+2=-5. $$

性质3 如果  $ \alpha_{1} $ 与  $ \alpha_{2} $ 是方阵A的同一特征值 $ \lambda $ 所对应的特征向量，则  $ k_{1}\alpha_{1}+k_{2}\alpha_{2} $ ( $ k_{1} $、 $ k_{2} $ 不同时为零)也是特征值 $ \lambda $ 所对应的特征向量.

证明 由  $ A\alpha_{1}=\lambda\alpha_{1} $， $ A\alpha_{2}=\lambda\alpha_{2} $ 得

 $ A(k_1\boldsymbol{\alpha}_1+k_2\boldsymbol{\alpha}_2)=\boldsymbol{A}(k_1\boldsymbol{\alpha}_1)+\boldsymbol{A}(k_2\boldsymbol{\alpha}_2)=k_1(\boldsymbol{A}\boldsymbol{\alpha}_1)+k_2(\boldsymbol{A}\boldsymbol{\alpha}_2)=k_1\lambda\boldsymbol{\alpha}_1+k_2\lambda\boldsymbol{\alpha}_2=\lambda(k_1\boldsymbol{\alpha}_1+k_2\boldsymbol{\alpha}_2) $，所以  $ k_1\boldsymbol{\alpha}_1+k_2\boldsymbol{\alpha}_2(k_1,k_2 $ 不同时为零）也是特征值  $ \lambda $ 所对应的特征向量.

性质4 设  $ \lambda_{1}, \lambda_{2}, \cdots, \lambda_{m} $ 是方阵A的m个互不相同的特征值， $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 是依次与之对应的特征向量，则 $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{m} $ 线性无关.

证明 用数学归纳法.

当 m=1 时，因特征向量  $ \alpha_{1}\neq0 $ ，故只含一个向量的向量组  $ \alpha_{1} $ 线性无关.

假设当 m=k-1 时结论成立，要证当 m=k 时结论也成，即假设向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_{k-1} $ 线性无关，要证向量组  $ \alpha_1, \alpha_2, \cdots, \alpha_k $ 线性无关. 为此，令

 $$ x_{1}\boldsymbol{\alpha}_{1}+x_{2}\boldsymbol{\alpha}_{2}+\cdots+x_{k-1}\boldsymbol{\alpha}_{k-1}+x_{k}\boldsymbol{\alpha}_{k}=0, $$

用A左乘上式得

 $$ x_{1}A\boldsymbol{\alpha}_{1}+x_{2}A\boldsymbol{\alpha}_{2}+\cdots+x_{k-1}A\boldsymbol{\alpha}_{k-1}+x_{k}A\boldsymbol{\alpha}_{k}=0, $$

即

 $$ x_{1}\lambda_{1}\boldsymbol{\alpha}_{1}+x_{2}\lambda_{2}\boldsymbol{\alpha}_{2}+\cdots+x_{k-1}\lambda_{k-1}\boldsymbol{\alpha}_{k-1}+x_{k}\lambda_{k}\boldsymbol{\alpha}_{k}=0. $$

式(2-3)减去式(2-2)的 $ \lambda_{k} $倍，得

 $$ x_{1}\left(\lambda_{1}-\lambda_{k}\right)\boldsymbol{\alpha}_{1}+x_{2}\left(\lambda_{2}-\lambda_{k}\right)\boldsymbol{\alpha}_{2}+\cdots+x_{k-1}\left(\lambda_{k-1}-\lambda_{k}\right)\boldsymbol{\alpha}_{k-1}=0, $$

按归纳法假设  $ \alpha_1 $,  $ \alpha_2 $,  $ \cdots $,  $ \alpha_{k-1} $ 线性无关，故  $ x_i(\lambda_i - \lambda_k) = 0 $ ( $ i = 1, 2, \cdots, k-1 $)。而  $ \lambda_i - \lambda_k \ne 0 $ ( $ i = 1, 2, \cdots, k-1 $)，于是得  $ x_i = 0 $ ( $ i = 1, 2, \cdots, k-1 $)，代入式 (2-2) 得  $ x_k \alpha_k = 0 $。而  $ \alpha_k \ne 0 $。所以  $ x_k = 0 $。因此向量组  $ \alpha_1 $,  $ \alpha_2 $,  $ \cdots $,  $ \alpha_{\omega} $ 线性无关。

性质5 设  $ \lambda_{1} $ 和  $ \lambda_{2} $ 是矩阵A 的两个不同的特征值， $ \alpha_{1} $， $ \alpha_{2} $，…， $ \alpha_{s} $ 和  $ \beta_{1} $， $ \beta_{2} $，…， $ \beta_{t} $ 是分别对应于  $ \lambda_{1} $ 和  $ \lambda_{2} $ 的线性无关的特征向量，则  $ \alpha_{1} $， $ \alpha_{2} $，…， $ \alpha_{s} $， $ \beta_{1} $， $ \beta_{2} $，…， $ \beta_{t} $ 线性无关。（证明留作习题）

例 5 设  $ \lambda_{1} $ 和  $ \lambda_{2} $ 是矩阵 A 的两个不同的特征值，对应的特征向量依次为  $ \alpha_{1} $ 和  $ \alpha_{2} $，证明  $ \alpha_{1}+\alpha_{2} $ 不是 A 的特征向量.

证明 按题设，有  $ A\alpha_1 = \lambda_1\alpha_1 $， $ A\alpha_2 = \lambda_2\alpha_2 $，假设  $ \alpha_1 + \alpha_2 $ 是  $ A $ 的特征向量，则应该存在数  $ \lambda $，使

 $$ A\left(\alpha_{1}+\alpha_{2}\right)=\lambda\left(\alpha_{1}+\alpha_{2}\right) $$

另一方面，

 $$ \boldsymbol{A}\left(\boldsymbol{\alpha}_{1}+\boldsymbol{\alpha}_{2}\right)=\lambda_{1}\boldsymbol{\alpha}_{1}+\lambda_{2}\boldsymbol{\alpha}_{2}. $$

于是

 $$ \lambda\left(\alpha_{1}+\alpha_{2}\right)=\lambda_{1}\alpha_{1}+\lambda_{2}\alpha_{2}, $$

即

 $$ \left(\lambda_{1}-\lambda\right)\boldsymbol{\alpha}_{1}+\left(\lambda_{2}-\lambda\right)\boldsymbol{\alpha}_{2}=0. $$

因  $ \lambda_1 \ne \lambda_2 $，所以  $ \alpha_1 $ 和  $ \alpha_2 $ 线性无关，从而由上式得  $ \lambda_1 - \lambda = \lambda_2 - \lambda = 0 $，即  $ \lambda_1 = \lambda_2 $，与题设矛盾。因此  $ \alpha_1 + \alpha_2 $ 不是  $ A $ 的特征向量。

### 习题4-2

1. 求下列矩阵的特征值和特征向量：

(1)

 $$ \begin{pmatrix}{{{0}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{0}}}&{{{1}}} \\{{{1}}}&{{{1}}}&{{{0}}}\end{pmatrix}; $$

(2)

 $$ \begin{pmatrix}{{{2}}}&{{{-1}}}&{{{1}}} \\{{{0}}}&{{{1}}}&{{{1}}} \\{{{-1}}}&{{{1}}}&{{{1}}}\end{pmatrix}; $$

(3)

 $$ \begin{pmatrix}{{{1}}}&{{{2}}}&{{{4}}}&{{{1}}} \\{{{0}}}&{{{2}}}&{{{0}}}&{{{7}}} \\{{{0}}}&{{{0}}}&{{{3}}}&{{{4}}} \\{{{0}}}&{{{0}}}&{{{0}}}&{{{2}}}\end{pmatrix}. $$

2. 设 A 为 n 阶矩阵，证明  $ A^{T} $ 与 A 的特征值相同.

3. 设  $ A^{2}-4A+3E=O $，证明 A 的特征值只能取 1 或 3.

4. 设 3 阶矩阵 A 的特征值为 -1, 1, -2，求  $ \left|(2A)^{*}+3A-2E\right| $.

5. 设 3 阶矩阵  $ A $ 满足  $ |A| = 0 $， $ |A + 2E| = 0 $， $ |A - E| = 0 $，求  $ |A + E| $。

6. 设  $ \lambda \neq 0 $ 是 m 阶矩阵  $ A_{m \times n} B_{n \times m} $ 的特征值，证明  $ \lambda $ 也是 n 阶矩阵 BA 的特征值.

7. 设 3 阶实对称矩阵 A 满足  $ R(A) = 2 $ 且  $ A^{2} = A $，求 A 的特征值.

8. 证明性质5：设  $ \lambda_{1} $ 和  $ \lambda_{2} $ 是矩阵 A 的两个不同的特征值， $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{s} $ 和  $ \beta_{1}, \beta_{2}, \cdots, \beta_{t} $ 是分别对应于  $ \lambda_{1} $ 和  $ \lambda_{2} $ 的线性无关的特征向量，则  $ \alpha_{1}, \alpha_{2}, \cdots, \alpha_{s}, \beta_{1}, \beta_{2}, \cdots, \beta_{t} $ 线性无关.

## 第三节 相似矩阵

[课前导读]

本节我们介绍矩阵相似的概念和性质，并给出矩阵与对角阵相似的充分必要条件.

## 一、方阵相似的定义和性质

我们给出相似矩阵的定义如下.

定义 设 A, B 都是 n 阶矩阵，若有可逆矩阵 P，使

 $$ \boldsymbol{P}^{-1}\boldsymbol{A}\boldsymbol{P}=\boldsymbol{B}, $$

则称 B 是 A 的相似矩阵，或者说矩阵 A 与 B 相似. 对 A 进行运算  $ P^{-1}AP $ 称为对 A 进行相似变换，可逆矩阵 P 称为把 A 变成 B 的相似变换矩阵.

定理 1 若 n 阶矩阵 A 与 B 相似，则 A 与 B 有相同的特征多项式，从而 A 与 B 有相同的特征值.

证明 因 A 与 B 相似，即有可逆矩阵 P，使  $ P^{-1}AP=B $ ，故

 $$ \left|\boldsymbol{B}-\lambda\boldsymbol{E}\right|=\left|\boldsymbol{P}^{-1}\boldsymbol{A}\boldsymbol{P}-\boldsymbol{P}^{-1}\left(\lambda\boldsymbol{E}\right)\boldsymbol{P}\right|=\left|\boldsymbol{P}^{-1}\left(\boldsymbol{A}-\lambda\boldsymbol{E}\right)\boldsymbol{P}\right|=\left|\boldsymbol{P}^{-1}\right|\cdot\left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|\cdot\left|\boldsymbol{P}\right|=\left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|. $$

推论 若 n 阶矩阵 A 与对角阵

 $$ \boldsymbol{A}=\begin{pmatrix}\lambda_{1}&&&\\&\lambda_{2}&&\\&&\ddots&\\&&&\lambda_{n}\end{pmatrix} $$

相似，则  $ \lambda_{1}, \lambda_{2}, \cdots, \lambda_{n} $ 即是 A 的 n 个特征值.

若 n 阶矩阵 A 与 B 相似，即  $ P^{-1}AP=B $，则  $ A^{k}=(PBP^{-1})^{k}=PB^{k}P^{-1} $，并且 A 的多项式

 $$ \begin{aligned}\varphi(\boldsymbol{A})&=a_{m}\boldsymbol{A}^{m}+\cdots+a_{1}\boldsymbol{A}+a_{0}\boldsymbol{E}=a_{m}(\boldsymbol{P}\boldsymbol{B}\boldsymbol{P}^{-1})^{m}+\cdots+a_{1}(\boldsymbol{P}\boldsymbol{B}\boldsymbol{P}^{-1})+a_{0}\boldsymbol{E}\\&=a_{m}(\boldsymbol{P}\boldsymbol{B}^{m}\boldsymbol{P}^{-1})+\cdots+a_{1}(\boldsymbol{P}\boldsymbol{B}\boldsymbol{P}^{-1})+a_{0}\boldsymbol{E}\\&=\boldsymbol{P}\left(a_{m}\boldsymbol{B}^{m}\right)\boldsymbol{P}^{-1}+\cdots+\boldsymbol{P}\left(a_{1}\boldsymbol{B}\right)\boldsymbol{P}^{-1}+\boldsymbol{P}\left(a_{0}\boldsymbol{E}\right)\boldsymbol{P}^{-1}\\&=\boldsymbol{P}\left(a_{m}\boldsymbol{B}^{m}+\cdots+a_{1}\boldsymbol{B}+a_{0}\boldsymbol{E}\right)\boldsymbol{P}^{-1}=\boldsymbol{P}\varphi(\boldsymbol{B})\boldsymbol{P}^{-1}.\end{aligned} $$

特别地，若有可逆矩阵 P，使  $ P^{-1}AP = A $ 为对角阵，则

 $$ \boldsymbol{A}^{k}=\boldsymbol{P}\boldsymbol{\Lambda}^{k}\boldsymbol{P}^{-1},\boldsymbol{\varphi}(\boldsymbol{A})=\boldsymbol{P}\boldsymbol{\varphi}(\boldsymbol{\Lambda})\boldsymbol{P}^{-1}. $$

而对于对角阵  $ \Lambda = \mathrm{diag}(\lambda_1, \lambda_2, \cdots, \lambda_n) $，有

 $$ \boldsymbol{\Lambda}^{k}=\left(\begin{matrix}{\lambda_{1}^{k}}&{}&{}&{}\\ {}&{\lambda_{2}^{k}}&{}&{}\\ {}&{}&{\ddots}&{}\\ {}&{}&{}&{\lambda_{n}^{k}}\\ \end{matrix}\right),\quad\boldsymbol{\varphi}(\boldsymbol{\Lambda})=\left(\begin{matrix}{\varphi(\lambda_{1})}&{}&{}&{}\\ {}&{\varphi(\lambda_{2})}&{}&{}\\ {}&{}&{\ddots}&{}\\ {}&{}&{}&{\varphi(\lambda_{n})}\\ \end{matrix}\right), $$

由此可方便地计算 A 的高次幂  $ A^{k} $ 及 A 的多项式  $ \varphi(A) $.

有一个很有趣的结论：设 $ f(\lambda) $是矩阵A的特征多项式，则

 $$ f(A)=0. $$

这个结论的证明比较困难，但若 A 与对角阵相似，则容易证明此结论。这是因为：若 A 与对角阵相似，即有可逆矩阵 P，使  $ P^{-1}AP = \Lambda = \mathrm{diag}(\lambda_1, \lambda_2, \cdots, \lambda_n) $，其中  $ \lambda_i $ 为 A 的特征值，有  $ f(\lambda_i) = 0 $。于是由上面的讨论可得

 $$ f(A)=P f(\varLambda)P^{-1}=P\left(\begin{matrix}{f(\lambda_{1})}&{}&{}&{}\\ {}&{f(\lambda_{2})}&{}&{}\\ {}&{}&{\ddots}&{}\\ {}&{}&{}&{f(\lambda_{n})}\\ \end{matrix}\right)P^{-1}=P O P^{-1}=O. $$

## 二、方阵的相似对角化

对于 n 阶矩阵 A，寻求相似变换矩阵 P，使得  $ \Lambda = P^{-1}AP $ 为对角阵，称为把矩阵 A 相似对角化。下面我们要讨论的主要问题是：如果 n 阶矩阵 A 可相似对角化，相似变换矩阵 P 如何找？

假设 n 阶矩阵 A 可相似对角化，即已经找到了可逆矩阵 P，使得  $ P^{-1}AP=A $ 为对角阵，我们来讨论矩阵 P 应满足什么条件.

方阵的相似对角化

把矩阵P列分块为

 $$ \boldsymbol{P}=\left(\boldsymbol{p}_{1},\ \boldsymbol{p}_{2},\ \cdots,\ \boldsymbol{p}_{n}\right), $$

由  $ P^{-1}AP=\Lambda $，得 AP=PA，即

 $$ \boldsymbol{A}(\boldsymbol{p}_{1},\boldsymbol{p}_{2},\cdots,\boldsymbol{p}_{n})=(\boldsymbol{p}_{1},\boldsymbol{p}_{2},\cdots,\boldsymbol{p}_{n})\begin{pmatrix}\lambda_{1}&&&\\&\lambda_{2}&&\\&&\ddots&\\&&&\lambda_{n}\end{pmatrix}=(\lambda_{1}\boldsymbol{p}_{1},\lambda_{2}\boldsymbol{p}_{2},\cdots,\lambda_{n}\boldsymbol{p}_{n}), $$

 $$ \boldsymbol{A}\boldsymbol{p}_{i}=\lambda_{i}\boldsymbol{p}_{i}(i=1,2,\cdots,n). $$

于是有

可见  $ \lambda_{i} $ 为 A 的特征值，而 P 的列向量  $ p_{i} $ 就是 A 对应于特征值  $ \lambda_{i} $ 的特征向量.

反之，如果 n 阶矩阵 A 恰好有 n 个特征向量（例如第二节例 1 和例 3），则这 n 个特征向量即可构成矩阵 P，使得 AP = PA。并且由第二节性质 4 和性质 5 可知，这 n 个特征向量必定是线性无关的，从而 P 可逆，因此有  $ P^{-1}AP = \Lambda $。

由上面的讨论即有下列定理.

定理2 n阶矩阵A与对角阵相似（即A能对角化）的充分必要条件是A有n个线性无

关的特征向量.

由定理2及第二节的性质4可得下列推论.

推论 如果 n 阶矩阵 A 的 n 个特征值互不相等，则 A 与对角阵相似.

当矩阵的特征方程有重根时，就不一定有 n 个线性无关的特征向量，从而不一定能对角化。例如在第二节中，例 2 中矩阵 B 的特征方程有重根，但是找不到 3 个线性无关的特征向量，因此例 2 中矩阵 B 不能对角化；而例 3 中矩阵 C 的特征方程也有重根，但能找到 3 个线性无关的特征向量，因此例 3 中矩阵 C 能对角化。

例1 设

 $$ \boldsymbol{A}=\begin{pmatrix}{{{0}}}&{{{0}}}&{{{1}}} \\{{{x}}}&{{{1}}}&{{{y}}} \\{{{1}}}&{{{0}}}&{{{0}}}\end{pmatrix} $$

有3个线性无关的特征向量，求x与y应满足的条件.

解 因为矩阵 A 是 3 阶矩阵，又有 3 个线性无关的特征向量，所以 A 可以相似对角化。由

 $$ \left|\boldsymbol{A}-\lambda\boldsymbol{E}\right|=\left|\begin{array}{c c c}{-\lambda}&{0}&{1}\\ {x}&{1-\lambda}&{y}\\ {1}&{0}&{-\lambda}\end{array}\right|=\left(1-\lambda\right)\left|\begin{array}{c c}{-\lambda}&{1}\\ {1}&{-\lambda}\end{array}\right|=-(\lambda-1)^{2}(\lambda+1), $$

得到 A 的特征值为  $ \lambda_{1}=\lambda_{2}=1 $， $ \lambda_{3}=-1 $。

对应单根  $ \lambda_{3} = -1 $，可求得线性无关的特征向量恰好有 1 个，故对应重根  $ \lambda_{1} = \lambda_{2} = 1 $ 应有 2 个线性无关的特征向量，即方程  $ (A - E)x = 0 $ 有 2 个线性无关的解，亦即系数矩阵  $ A - E $ 的秩  $ R(A - E) = 1 $.

由

 $$ \boldsymbol{A}-\boldsymbol{E}=\begin{pmatrix}{{{-1}}}&{{{0}}}&{{{1}}} \\{{{x}}}&{{{0}}}&{{{y}}} \\{{{1}}}&{{{0}}}&{{{-1}}}\end{pmatrix}\overset{r}{\sim}\begin{pmatrix}{{{1}}}&{{{0}}}&{{{-1}}} \\{{{0}}}&{{{0}}}&{{{x+y}}} \\{{{0}}}&{{{0}}}&{{{0}}}\end{pmatrix} $$

可知，要使系数矩阵 A-E 的秩  $ R(A-E)=1 $，必须  $ x+y=0 $。
