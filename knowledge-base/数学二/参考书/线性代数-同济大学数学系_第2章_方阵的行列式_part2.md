# 习题2-2

> 来源：docs/08_电子书/线性代数-同济大学数学系.md
> 科目：数学二（302） ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：542d072d2e071a92


1. 求下列行列式：

(1)

 $$ \left|\begin{array}{ccc}1&2&1\\2&1&-1\\3&4&2\end{array}\right|; $$

(2)

 $$ \begin{vmatrix}2&1&4&3\\4&2&3&11\\3&0&9&2\\1&-1&-1&4\end{vmatrix}; $$

(3)

 $$ \left|\begin{array}{l l l l}{a}&{b}&{b}&{b}\\ {a}&{a}&{b}&{b}\\ {a}&{b}&{a}&{b}\\ {b}&{b}&{b}&{a}\end{array}\right|; $$

(4)

 $$ D_{n}=\left|\begin{array}{ccccc}{{{2}}}&{{{a}}}&{{{a}}}&{{{\cdots}}}&{{{a}}} \\{{{a}}}&{{{2}}}&{{{a}}}&{{{\cdots}}}&{{{a}}} \\{{{a}}}&{{{a}}}&{{{2}}}&{{{\cdots}}}&{{{a}}} \\{{{\vdots}}}&{{{\vdots}}}&{{{\vdots}}}&{{{\ddots}}}&{{{\vdots}}} \\{{{a}}}&{{{a}}}&{{{a}}}&{{{\cdots}}}&{{{2}}}\end{array}\right|;\quad(5)\left|\begin{array}{ccccc}{{{1+a}}}&{{{1}}}&{{{1}}}&{{{\cdots}}}&{{{1}}} \\{{{2}}}&{{{2+a}}}&{{{2}}}&{{{\cdots}}}&{{{2}}} \\{{{3}}}&{{{3}}}&{{{3+a}}}&{{{\cdots}}}&{{{3}}} \\{{{\vdots}}}&{{{\vdots}}}&{{{\vdots}}}&{{{\ddots}}}&{{{\vdots}}} \\{{{n}}}&{{{n}}}&{{{n}}}&{{{\cdots}}}&{{{n+a}}}\end{array}\right|. $$

2. 利用行列式的性质证明下列等式成立：

(1)

 $$ \begin{aligned}\left|\begin{matrix}a^{2}&\left(a+1\right)^{2}&\left(a+2\right)^{2}\\ b^{2}&\left(b+1\right)^{2}&\left(b+2\right)^{2}\\ c^{2}&\left(c+1\right)^{2}&\left(c+2\right)^{2}\end{matrix}\right|&=4(a-b)(a-c)(b-c)\;;\end{aligned} $$

(2)

 $$ \begin{aligned}\left|\begin{matrix}{{{a_{1}}}}&{{{1}}}&{{{1}}}&{{{\cdots}}}&{{{1}}} \\{{{1}}}&{{{a_{2}}}}&{{{0}}}&{{{\cdots}}}&{{{0}}} \\{{{1}}}&{{{0}}}&{{{a_{3}}}}&{{{\cdots}}}&{{{0}}} \\{{{\vdots}}}&{{{\vdots}}}&{{{\vdots}}}&{{{\ddots}}}&{{{\vdots}}} \\{{{1}}}&{{{0}}}&{{{0}}}&{{{\cdots}}}&{{{a_{n}}}} \\\end{matrix}\right|&=a_{2}a_{3}\cdots a_{n}\left(a_{1}-\sum_{i=2}^{n}\frac{1}{a_{i}}\right),\quad 其中 a_{2}a_{3}\cdots a_{n}\neq0；\end{aligned} $$

(3)

 $$ \begin{aligned}\left|\begin{matrix}a_{1}-b_{1}&a_{1}-b_{2}&\cdots&a_{1}-b_{n}\\a_{2}-b_{1}&a_{2}-b_{2}&\cdots&a_{2}-b_{n}\\\vdots&\vdots&\ddots&\vdots\\a_{n}-b_{1}&a_{n}-b_{2}&\cdots&a_{n}-b_{n}\\\end{matrix}\right|&=0.\end{aligned} $$

3. 设  $ A $、 $ B $ 是 3 阶方阵，且  $ |A| = 4 $， $ |B| = 3 $，求  $ \left|3A^{\mathrm{T}}B^{2}\right| $。

4. 设  $ A $、 $ B $ 分别是  $ m $ 阶、 $ n $ 阶可逆阵，证明分块矩阵  $ M=\begin{pmatrix} O & A \\ B & O \end{pmatrix} $、 $ D=\begin{pmatrix} A & O \\ C & B \end{pmatrix} $、 $ N=\begin{pmatrix} O & A \\ B & C \end{pmatrix} $ 均可逆，并求  $ M^{-1} $、 $ D^{-1} $、 $ N^{-1} $.

5. 设 n 阶方阵 A 满足  $ A^{2}-A-2E=0 $，证明矩阵 A 和  $ A+2E $ 均可逆，并求  $ A^{-1} $ 和  $ (\boldsymbol{A}+2\boldsymbol{E})^{-1} $.

## 第三节 行列式按行(列)展开

[课前导读]

将3阶行列式

 $$ \left|\boldsymbol{A}\right|=\left|\begin{array}{l l l}a_{11}&a_{12}&a_{13}\\ a_{21}&a_{22}&a_{23}\\ a_{31}&a_{32}&a_{33}\end{array}\right|=a_{11}a_{22}a_{33}+a_{13}a_{21}a_{32}+a_{12}a_{23}a_{31}-a_{13}a_{22}a_{31}-a_{12}a_{21}a_{33}-a_{11}a_{23}a_{32} $$

的结果进行改写，得到

 $$ \left|\boldsymbol{A}\right|=a_{11}(a_{22}a_{33}-a_{23}a_{32})-a_{12}(a_{21}a_{33}-a_{23}a_{31})+a_{13}(a_{21}a_{32}-a_{22}a_{31}) $$

 $$ =a_{11}\left|\begin{array}{l l}a_{22}&a_{23}\\ a_{32}&a_{33}\end{array}\right|-a_{12}\left|\begin{array}{l l}a_{21}&a_{23}\\ a_{31}&a_{33}\end{array}\right|+a_{13}\left|\begin{array}{l l}a_{21}&a_{22}\\ a_{31}&a_{32}\end{array}\right|. $$

由此可见，3 阶行列式可由2 阶行列式的代数和来表示。那么，n 阶行列式与 n-1 阶行列式是否也有类似的关系呢？这一节我们就来讨论这个问题。

## 一、余子式与代数余子式

设  $ |A| $ 是 n 阶方阵  $ A = (a_{ij})_{n \times n} $ 的行列式。对任意的  $ 1 \leq i, j \leq n $，在  $ |A| $ 中划去第 i 行和第 j 列后剩下的 n-1 阶行列式称为  $ (i, j) $ 元素  $ a_{ij} $ 的余子式，记为  $ M_{ij} $；记

 $$ A_{i j}=\left(-1\right)^{i+j}M_{i j}, $$

 $ A_{ij} $称为 $ (i, j) $元素 $ a_{ij} $的代数余子式. 这里，我们强调 $ (i, j) $位置的余子式和代数余子式，是由于它们与 $ |A| $的（被划去的）第i行和第j列的元素没有关系.

例如，设矩阵

 $$ \boldsymbol{A}=\begin{pmatrix}{{{4}}}&{{{2}}}&{{{1}}}&{{{3}}} \\{{{2}}}&{{{-1}}}&{{{3}}}&{{{0}}} \\{{{-2}}}&{{{3}}}&{{{2}}}&{{{1}}} \\{{{1}}}&{{{-1}}}&{{{0}}}&{{{-3}}}\end{pmatrix}, $$

则  $ \left|A\right| $ 的 (3, 2) 元素的余子式和代数余子式分别为

 $$ \begin{array}{l}{M_{32}=\left|\begin{array}{c c c}{4}&{1}&{3}\\ {2}&{3}&{0}\\ {1}&{0}&{-3}\end{array}\right|},\quad A_{32}=\left(-1\right)^{3+2}M_{32}=-M_{32};\\ \end{array} $$

 $ |A| $ 的 (1, 3) 元素的余子式和代数余子式分别为

 $$ \begin{array}{c|c c c|c}{M_{13}=\left|\begin{array}{c c c}{2}&{-1}&{0}\\ {-2}&{3}&{1}\\ {1}&{-1}&{-3}\end{array}\right|,}&{A_{13}=(-1)^{1+3}M_{13}=M_{13}.}&{}\\ \end{array} $$

## 二、行列式按行（列）展开

定理 设行列式

 $$ \left|\boldsymbol{A}\right|=\left|\begin{array}{cccc}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\\\end{array}\right|, $$

行列式按行（列）展开

则有

 $$ \left|\boldsymbol{A}\right|=a_{i1}A_{i1}+a_{i2}A_{i2}+\cdots+a_{in}A_{in}=\sum_{k=1}^{n}a_{ik}A_{ik}(i=1,2,\cdots,n) $$

和

 $$ \left|\boldsymbol{A}\right|=a_{1j}A_{1j}+a_{2j}A_{2j}+\cdots+a_{nj}A_{nj}=\sum_{k=1}^{n}a_{kj}A_{kj}(j=1,2,\cdots,n). $$

式(3-1)和式(3-2)分别称为  $ \left| A \right| $ 按第 i 行展开的展开式及按第 j 列展开的展开式.

 $ ^{*} $证明 式(3-2)可由结论  $ \left|A^{\mathrm{T}}\right|=\left|A\right| $ 及式(3-1)得到，所以我们只证明式(3-1).

(1) 先考虑一个特殊情况. 设

 $$ \left|\boldsymbol{A}\right|=\left|\begin{array}{c c c c}a_{11}&0&\cdots&0\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{n n}\end{array}\right|, $$

则由本章第二节例6得

 $$ \left|\boldsymbol{A}\right|=\left|\begin{array}{c c c c}{a_{11}}&{0}&{\cdots}&{0}\\ {\overbrace{a_{21}}^{}*}&{a_{22}}&{\cdots}&{a_{2n}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {a_{n1}}&{a_{n2}}&{\cdots}&{a_{n n}}\\ \end{array}\right|=a_{11}\left|\begin{array}{c c c}{a_{22}}&{\cdots}&{a_{2n}}\\ {\vdots}&{\ddots}&{\vdots}\\ {a_{n2}}&{\cdots}&{a_{n n}}\\ \end{array}\right|=a_{11}M_{11}, $$

而

 $$ \boldsymbol{A}_{11}=\left(-1\right)^{1+1}\boldsymbol{M}_{11}=\boldsymbol{M}_{11}, $$

于是

 $$ \left|\boldsymbol{A}\right|=a_{11}A_{11}. $$

(2) 再考虑如下形式的行列式

 $$ \left|\boldsymbol{A}\right|=\left|\begin{array}{c c c c c}a_{11}&\cdots&a_{1j}&\cdots&a_{1n}\\\vdots&\ddots&\vdots&\ddots&\vdots\\a_{i-1,1}&\cdots&a_{i-1,j}&\cdots&a_{i-1,n}\\0&\cdots&a_{i j}&\cdots&0\\a_{i+1,1}&\cdots&a_{i+1,j}&\cdots&a_{i+1,n}\\\vdots&\ddots&\vdots&\ddots&\vdots\\a_{n1}&\cdots&a_{n j}&\cdots&a_{n n}\\\end{array}\right|. $$

将行列式  $ |A| $ 的第 i 行依次与第 i-1 行，第 i-2 行，…，第 2 行，第 1 行交换，使第 i 行换到第 1 行，这样共交换了 i-1 次。然后，再将所得行列式的第 j 列依次与第 j-1 列，第 j-2 列，…，第 2 列，第 1 列交换，使第 j 列换到第 1 列，这样共换了 j-1 次。此时，有

 $$ \left|\boldsymbol{A}\right|=(-1)^{i-1}(-1)^{j-1}\left|\begin{array}{ccccccc}a_{ij}&0&\cdots&0&0&\cdots&0\\a_{1j}&a_{11}&\cdots&a_{1,j-1}&a_{1,j+1}&\cdots&a_{1n}\\\vdots&\vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\a_{i-1,j}&a_{i-1,1}&\cdots&a_{i-1,j-1}&a_{i-1,j+1}&\cdots&a_{i-1,n}\\a_{i+1,j}&a_{i+1,1}&\cdots&a_{i+1,j-1}&a_{i+1,j+1}&\cdots&a_{i+1,n}\\\vdots&\vdots&\ddots&\vdots&\vdots&\ddots&\vdots\\a_{nj}&a_{n1}&\cdots&a_{n,j-1}&a_{n,j+1}&\cdots&a_{nn}\\\end{array}\right|. $$

等式右端的行列式是形如式(3-3)的行列式，由(1)有

 $$ \left|\boldsymbol{A}\right|=\left(-1\right)^{i-1}\left(-1\right)^{j-1}a_{i j}M_{i j}=\left(-1\right)^{i+j}a_{i j}M_{i j}=a_{i j}A_{i j}. $$

(3)对任意的n阶方阵A，它的第i行( $ a_{i1} $， $ a_{i2} $， $ \cdots $， $ a_{in} $)可以写成

 $$ (a_{i1},a_{i2},\cdots,a_{in})=(a_{i1}+0+\cdots+0,0+a_{i2}+0+\cdots+0,\cdots,0+\cdots+0+a_{in}), $$

于是由行列式的拆分(性质4)可知

 $$ \left|\textbf{A}\right|=\left|\textbf{D}_{i1}\right|+\left|\textbf{D}_{i2}\right|+\cdots+\left|\textbf{D}_{i n}\right|, $$

其中， $ |D_{ij}|(j=1,2,\cdots,n) $ 是形如式(3-4)中的行列式，即第  $ i $ 行中只有  $ (i,j) $ 元素  $ a_{ij} \neq 0 $，而其余位置上的元素均为零。因此由式(3-5)可得

 $$ \left|\boldsymbol{A}\right|=a_{i1}A_{i1}+a_{i2}A_{i2}+\cdots+a_{in}A_{in}=\sum_{k=1}^{n}a_{ik}A_{ik}(i=1,2,\cdots,n). $$

定理给出的行列式按一行(列)展开法，将 n 阶行列式的计算问题转化为较低阶数的行列式的计算. 这就是行列式的“降阶”.

例1 计算行列式  $ \left|\begin{matrix}3&-1&1&-1\\ 1&4&2&2\\ 0&3&0&0\\ 0&-3&1&2\end{matrix}\right| $.

解

 $$ \left|\begin{matrix}{{{3}}}&{{{-1}}}&{{{1}}}&{{{-1}}} \\{{{1}}}&{{{4}}}&{{{2}}}&{{{2}}} \\{{{0}}}&{{{3}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{-3}}}&{{{1}}}&{{{2}}}\end{matrix}\right|\xlongequal[ 列展开 ]{ 按第一 }3\times(-1)^{1+1}\left|\begin{matrix}{{{4}}}&{{{2}}}&{{{2}}} \\{{{3}}}&{{{0}}}&{{{0}}} \\{{{-3}}}&{{{1}}}&{{{2}}}\end{matrix}\right|+1\times(-1)^{2+1}\left|\begin{matrix}{{{-1}}}&{{{1}}}&{{{-1}}} \\{{{3}}}&{{{0}}}&{{{0}}} \\{{{-3}}}&{{{1}}}&{{{2}}}\end{matrix}\right|( 每个行 $$

列式均按第二行展开）

 $$ =3\times3\times(-1)^{2+1}\left|\begin{matrix}2&2\\ 1&2\end{matrix}\right|+(-1)\times3\times(-1)^{2+1}\left|\begin{matrix}1&-1\\ 1&2\end{matrix}\right|=-9. $$

若将所给行列式直接按第三行展开，则有

 $$ \left|\begin{matrix}{{{3}}}&{{{-1}}}&{{{1}}}&{{{-1}}} \\{{{1}}}&{{{4}}}&{{{2}}}&{{{2}}} \\{{{0}}}&{{{3}}}&{{{0}}}&{{{0}}} \\{{{0}}}&{{{-3}}}&{{{1}}}&{{{2}}}\end{matrix}\right|\xlongequal[ 行展开 ]{ 按第三 }3\times(-1)^{3+2}\left|\begin{matrix}{{{3}}}&{{{1}}}&{{{-1}}} \\{{{1}}}&{{{2}}}&{{{2}}} \\{{{0}}}&{{{1}}}&{{{2}}}\end{matrix}\right|\xlongequal{c_{3}+(-2)c_{2}}(-3)\left|\begin{matrix}{{{3}}}&{{{1}}}&{{{-3}}} \\{{{1}}}&{{{2}}}&{{{-2}}} \\{{{0}}}&{{{1}}}&{{{0}}}\end{matrix}\right| $$

 $$ \xlongequal[ 行展开 ]{ 按第三}(-3)\times1\times(-1)^{3+2}\left|\begin{matrix}3&-3\\ 1&-2\end{matrix}\right|=-9. $$

从上面的计算可以看出，行列式中某一行(列)的元素“0”越多，按这一行(列)展开就越方便。如果“0”较少，还可以先利用行列式的性质，将行列式的某行(列)除一个元素外全变为“0”，再按这一行(列)展开。

例2 计算行列式  $ \left|\begin{matrix}1&-1&1&-1\\ 2&0&1&1\\ 1&-5&3&3\\ -5&1&1&2\end{matrix}\right| $.

解

 $$ \begin{aligned}&\left|\begin{array}{cccc}{{{1}}}&{{{-1}}}&{{{1}}}&{{{-1}}} \\{{{2}}}&{{{0}}}&{{{1}}}&{{{1}}} \\{{{1}}}&{{{-5}}}&{{{3}}}&{{{3}}} \\{{{-5}}}&{{{1}}}&{{{1}}}&{{{2}}}\end{array}\right|\xlongequal{c_{2}+c_{1}}\left|\begin{array}{cccc}{{{1}}}&{{{0}}}&{{{0}}}&{{{0}}} \\{{{2}}}&{{{2}}}&{{{-1}}}&{{{3}}} \\{{{1}}}&{{{-4}}}&{{{2}}}&{{{4}}} \\{{{-5}}}&{{{-4}}}&{{{6}}}&{{{-3}}}\end{array}\right|\xlongequal{ 按第一 }\mathbb{1}\times(-1)^{1+1}\left|\begin{array}{ccc}{{{2}}}&{{{-1}}}&{{{3}}} \\{{{-4}}}&{{{2}}}&{{{4}}} \\{{{-4}}}&{{{6}}}&{{{-3}}}\end{array}\right|\\&\xlongequal{r_{2}+2r_{1}}\left|\begin{array}{ccc}{{{2}}}&{{{-1}}}&{{{3}}} \\{{{0}}}&{{{0}}}&{{{10}}} \\{{{0}}}&{{{4}}}&{{{3}}}\end{array}\right|\xlongequal{ 按第一 }2\times(-1)^{1+1}\left|\begin{array}{cc}{{{0}}}&{{{10}}} \\{{{4}}}&{{{3}}}\end{array}\right|=-80.\end{aligned} $$

例3 证明范德蒙德(Vandermonde)行列式

 $$ \mid\boldsymbol{V}_{n}\mid=\left|\begin{array}{c c c c}{1}&{1}&{\cdots}&{1}\\ {x_{1}}&{x_{2}}&{\cdots}&{x_{n}}\\ {x_{1}^{2}}&{x_{2}^{2}}&{\cdots}&{x_{n}^{2}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {x_{1}^{n-1}}&{x_{2}^{n-1}}&{\cdots}&{x_{n}^{n-1}}\end{array}\right|=\prod_{1\leq i<j\leq n}(x_{j}-x_{i}). $$

其中记号“ $ \Pi $”表示连乘积.

证明 用数学归纳法证明. 因为

 $$ \left|\boldsymbol{V}_{2}\right|=\left|\begin{array}{c c}{1}&{1}\\ {}&{}\\ {x_{1}}&{x_{2}}\\ \end{array}\right|=x_{2}-x_{1}=\prod_{1\leq i<j\leq2}\left(x_{j}-x_{i}\right), $$

所以 n=2 时式(3-6)成立. 现在假设式(3-6)对于 n-1 阶范德蒙德行列式成立, 下面证明式(3-6)对 n 阶范德蒙德行列式也成立.

对 n 阶范德蒙德行列式  $ \left|V_{n}\right| $ 做如下计算：第 n 行减去第 n-1 行的  $ x_{1} $ 倍，第 n-1 行减去第 n-2 行的  $ x_{1} $ 倍，…，第 2 行减去第 1 行的  $ x_{1} $ 倍，得

 $$ \begin{aligned}\left|V_{n}\right|&=\left|\begin{array}{cccc}1&1&1&\cdots&1\\0&x_{2}-x_{1}&x_{3}-x_{1}&\cdots&x_{n}-x_{1}\\0&x_{2}(x_{2}-x_{1})&x_{3}(x_{3}-x_{1})&\cdots&x_{n}(x_{n}-x_{1})\\\vdots&\vdots&\vdots&\ddots&\vdots\\0&x_{2}^{n-2}(x_{2}-x_{1})&x_{3}^{n-2}(x_{3}-x_{1})&\cdots&x_{n}^{n-2}(x_{n}-x_{1})\end{array}\right|\\&\xlongequal{ 按第一  列展开 }\left|\begin{array}{cccc}x_{2}-x_{1}&x_{3}-x_{1}&\cdots&x_{n}-x_{1}\\x_{2}(x_{2}-x_{1})&x_{3}(x_{3}-x_{1})&\cdots&x_{n}(x_{n}-x_{1})\\\vdots&\vdots&\ddots&\vdots\\x_{2}^{n-2}(x_{2}-x_{1})&x_{3}^{n-2}(x_{3}-x_{1})&&x_{n}^{n-2}(x_{n}-x_{1})\end{array}\right|,\end{aligned} $$

再提取各列的公因子 $ (x_{i}-x_{1}) $，有

 $$ \left|\boldsymbol{V}_{n}\right|=\left(x_{2}-x_{1}\right)\left(x_{3}-x_{1}\right)\cdots\left(x_{n}-x_{1}\right)\left|\begin{array}{c c c c}{1}&{1}&{\cdots}&{1}\\ {x_{2}}&{x_{3}}&{\cdots}&{x_{n}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {x_{2}^{n-2}}&{x_{3}^{n-2}}&{\cdots}&{x_{n}^{n-2}}\\ \end{array}\right|. $$

上式右端就是 n-1 阶范德蒙德行列式，按归纳法假设，有

 $$ \left|\begin{matrix}{1}&{1}&{\cdots}&{1}\\ {x_{2}}&{x_{3}}&{\cdots}&{x_{n}}\\ {\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {x_{2}^{n-2}}&{x_{3}^{n-2}}&{\cdots}&{x_{n}^{n-2}}\\ \end{matrix}\right|=\prod_{2\leqslant i<j\leqslant n}\left(x_{j}-x_{i}\right), $$

因此

 $$ \mid\boldsymbol{V}_{n}\mid=\left(x_{2}-x_{1}\right)\left(x_{3}-x_{1}\right)\cdots\left(x_{n}-x_{1}\right)\prod_{2\leq i<j\leq n}\left(x_{j}-x_{i}\right)=\prod_{1\leq i<j\leq n}\left(x_{j}-x_{i}\right). $$

由定理，我们可得到下面的重要推论.

推论 设  $ A_{ii}(i,j=1,2,\cdots,n) $ 是行列式  $ \left|A\right| $ 中元素  $ a_{ii} $ 的代数余子式，则

 $$ a_{i1}A_{j1}+a_{i2}A_{j2}+\cdots+a_{in}A_{jn}=0,\ i\neq j $$

或

 $$ a_{1i}A_{1j}+a_{2i}A_{2j}+\cdots+a_{ni}A_{nj}=0,\ i\neq j. $$

证明 因为  $ |A^{\mathrm{T}}|=|A| $，所以只要证明式(3-7)即可.

将 $ |A| $按第j行展开，有

 $$ \left|\boldsymbol{A}\right|=\left|\begin{array}{c c c}a_{11}&\cdots&a_{1n}\\\vdots&\ddots&\vdots\\a_{i1}&\cdots&a_{i n}\\\vdots&\ddots&\vdots\\a_{j1}&\cdots&a_{j n}\\\vdots&\ddots&\vdots\\a_{n1}&\cdots&a_{n n}\\\end{array}\right|=a_{j1}A_{j1}+a_{j2}A_{j2}+\cdots+a_{j n}A_{j n}, $$

把上式中  $ a_{j1} $， $ a_{j2} $， $ \cdots $， $ a_{jn} $ 换成  $ a_{i1} $， $ a_{i2} $， $ \cdots $， $ a_{in} $，可得

 $$ a_{i1}A_{j1}+a_{i2}A_{j2}+\cdots+a_{in}A_{jn}=\begin{vmatrix}a_{11}&\cdots&a_{1n}\\ \vdots&\ddots&\vdots\\ a_{i1}&\cdots&a_{in}\\ \vdots&\ddots&\vdots\\ a_{i1}&\cdots&a_{in}\\ \vdots&\ddots&\vdots\\ a_{n1}&\cdots&a_{nn}\end{vmatrix}. $$

当  $ i \neq j $ 时，上式右端行列式中有两行元素对应相等，故行列式等于零，即

 $$ a_{i1}A_{j1}+a_{i2}A_{j2}+\cdots+a_{in}A_{jn}=0\left(i\neq j\right). $$

综合定理与推论，有如下关于代数余子式的重要性质：

 $$ \sum_{k=1}^{n}a_{ik}A_{jk}=\left|\boldsymbol{A}\right|\delta_{ij}=\left\{\begin{array}{cc}\left|\boldsymbol{A}\right|,&i=j\\ 0,&i\neq j.\end{array}\right. $$

或

 $$ \sum_{k=1}^{n}a_{ki}A_{kj}=\left|\boldsymbol{A}\right|\delta_{ij}=\left\{\begin{array}{cc}\left|\boldsymbol{A}\right|,&i=j\\ 0,&i\neq j.\end{array}\right. $$

其中  $ \delta_{ij}=\left\{\begin{array}{ll}1,&i=j\\0,&i\neq j.\end{array}\right. $ 是克罗内克 (Kronecker) 符号.

### 习题2-3

1. 设函数  $ f(x)=\left|\begin{matrix}1&x&x^{2}&x^{3}\\ 1&a&a^{2}&a^{3}\\ 1&b&b^{2}&b^{3}\\ 1&c&c^{2}&c^{3}\end{matrix}\right| $，求方程  $ f(x)=0 $ 的根.

2. 求下列行列式：

(1)

 $$ \left|\begin{array}{c c c c}{2}&{2}&{2}&{2}\\ {0}&{-3}&{0}&{0}\\ {1}&{0}&{-1}&{1}\\ {3}&{2}&{0}&{4}\end{array}\right|; $$

(2)

 $$ \begin{aligned}\left|\begin{matrix}1&-1&1&-1\\1&-1&2&1\\2&1&-1&1\\0&1&1&2\end{matrix}\right|\end{aligned}； $$

(3)

 $$ \left|\begin{array}{c c c c}{x}&{1}&{0}&{0}\\ {0}&{x}&{1}&{0}\\ {0}&{0}&{x}&{1}\\ {a_{0}}&{a_{1}}&{a_{2}}&{a_{3}}\\ \end{array}\right|; $$

(4)

 $$ \left|\begin{array}{c c c c}{1}&{-1}&{1}&{x-1}\\ {1}&{-1}&{x+1}&{-1}\\ {1}&{x-1}&{1}&{-1}\\ {x+1}&{-1}&{1}&{-1}\end{array}\right|. $$

3. 计算下列 n 阶行列式：

(1)

 $$ \left|\begin{array}{c c c c c c}{x}&{y}&{0}&{0}&{\cdots}&{0}&{0}\\ {0}&{x}&{y}&{0}&{\cdots}&{0}&{0}\\ {0}&{0}&{x}&{y}&{\cdots}&{0}&{0}\\ {\vdots}&{\vdots}&{\vdots}&{\vdots}&{\vdots}&{\vdots}&{\vdots}\\ {0}&{0}&{0}&{0}&{\cdots}&{x}&{y}\\ {y}&{0}&{0}&{0}&{\cdots}&{0}&{x}\end{array}\right|; $$

(2)

 $$ \left|\begin{array}{c c c c c}{a}&{b}&{b}&{\cdots}&{b}\\ {b}&{a}&{b}&{\cdots}&{b}\\ {b}&{b}&{a}&{\cdots}&{b}\\ {\vdots}&{\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {b}&{b}&{b}&{\cdots}&{a}\end{array}\right|; $$

(3)

 $$ \left|\begin{array}{c c c c c}a_{1}+b&a_{2}&a_{3}&\cdots&a_{n}\\a_{1}&a_{2}+b&a_{3}&\cdots&a_{n}\\a_{1}&a_{2}&a_{3}+b&\cdots&a_{n}\\\vdots&\vdots&\vdots&\ddots&\vdots\\a_{1}&a_{2}&a_{3}&\cdots&a_{n}+b\\\end{array}\right|; $$

(4)

 $$ \left|\begin{array}{c c c c c}{x+1}&{x}&{x}&{\cdots}&{x}\\ {x}&{x+2}&{x}&{\cdots}&{x}\\ {x}&{x}&{x+3}&{\cdots}&{x}\\ {\vdots}&{\vdots}&{\vdots}&{\ddots}&{\vdots}\\ {x}&{x}&{x}&{\cdots}&{x+n}\end{array}\right|; $$

(5)

 $$ \left|\begin{array}{c c c c c c}{0}&{1}&{1}&{\cdots}&{1}&{1}\\ {1}&{0}&{1}&{\cdots}&{1}&{1}\\ {1}&{1}&{0}&{\cdots}&{1}&{1}\\ {\vdots}&{\vdots}&{\vdots}&{\ddots}&{\vdots}&{\vdots}\\ {1}&{1}&{1}&{\cdots}&{0}&{1}\\ {1}&{1}&{1}&{\cdots}&{1}&{0}\\ \end{array}\right|; $$

(6)

 $$ \begin{aligned}\left|\begin{matrix}1&2&3&\cdots&n\\ -1&0&3&\cdots&n\\ -1&-2&0&\cdots&n\\ \vdots&\vdots&\vdots&\ddots&\vdots\\ -1&-2&-3&\cdots&0\end{matrix}\right|.\end{aligned} $$

### [课前导读]

这一节我们先给出矩阵的伴随矩阵的概念，然后再利用伴随矩阵，给出在矩阵可逆时求逆矩阵的公式。最后，我们给出利用行列式解线性方程组的克莱默法则。在学习本节前，需要读者熟练矩阵与矩阵的乘法运算，以及利用方阵的行列式判断方阵是否可逆（即： $ n $ 阶方阵  $ A $ 可逆的充分必要条件是  $ |A| \neq 0 $）。

## 一、伴随矩阵与矩阵的求逆公式

定义 设  $ A=(a_{ij}) $ 是 n 阶方阵， $ A_{ij} $ 是  $ \left|A\right| $ 的  $ (i,j) $ 元素  $ a_{ij} $ 的代数余子式，则矩阵

 $$ \boldsymbol{A}^{*}=\begin{pmatrix}A_{11}&A_{21}&\cdots&A_{n1}\\A_{12}&A_{22}&\cdots&A_{n2}\\\vdots&\vdots&\ddots&\vdots\\A_{1n}&A_{2n}&\cdots&A_{nn}\end{pmatrix} $$

称为矩阵A的伴随矩阵.

引理 设方阵  $ A^{*} $ 是 n 阶方阵 A 的伴随矩阵，则必有

 $$ \boldsymbol{A}\boldsymbol{A}^{*}=\boldsymbol{A}^{*}\boldsymbol{A}=\begin{pmatrix}\left|\boldsymbol{A}\right|&&&\\&\left|\boldsymbol{A}\right|&&\\&&\ddots&\\&&&\left|\boldsymbol{A}\right|\end{pmatrix}=\left|\boldsymbol{A}\right|\boldsymbol{E}. $$

证明 由矩阵乘法及行列式按行(列)展开定理可知，乘积矩阵  $ AA^{*} $ 的第 i 行第 j 列元素为

 $$ a_{i1}A_{j1}+a_{i2}A_{j2}+\cdots+a_{in}A_{jn}=\delta_{ij}\mid\boldsymbol{A}\mid. $$

即  $ AA^* = |A|E $。类似可得， $ A^*A = |A|E $。

定理 1 如果 $n$ 阶方阵 $A$ 可逆，则有求逆公式 $A^{-1}=\frac{1}{|A|}A^{*}$。

证明 由本章第二节定理1可知，如果 n 阶方阵 A 可逆，则有  $ |A| \neq 0 $ 。于是在公式

 $$ \boldsymbol{A}\boldsymbol{A}^{*}=\boldsymbol{A}^{*}\boldsymbol{A}=|\boldsymbol{A}|\boldsymbol{E} $$

两端同除以 $ |A| $得

 $$ \boldsymbol{A}\left(\frac{1}{\left|\boldsymbol{A}\right|}\boldsymbol{A}^{*}\right)=\left(\frac{1}{\left|\boldsymbol{A}\right|}\boldsymbol{A}^{*}\right)\boldsymbol{A}=\boldsymbol{E}. $$

因此有  $ A^{-1}=\frac{1}{\left|A\right|}A^{*} $

例1 设2阶矩阵 $ A=\begin{pmatrix}a&b\\c&d\end{pmatrix} $，因为 $ |A|=\begin{vmatrix}a&b\\c&d\end{vmatrix}=ad-bc $，所以当 $ ad-bc\neq0 $时，矩阵

A 可逆. 且由于 A 的伴随矩阵  $ A^* = \begin{pmatrix} d & -b \\ -c & a \end{pmatrix} $，所以  $ A^{-1} = \frac{1}{|A|}A^* = \frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix} $.

例2 判断矩阵 $ A=\begin{pmatrix}1&2&3\\2&3&1\\3&1&2\end{pmatrix} $是否可逆，若可逆，用求逆公式求逆矩阵.

解 因为  $ \left|A\right| = -18 \neq 0 $，所以 A 可逆，且

 $$ A_{11}=(-1)^{1+1}\left|\begin{matrix}{{{3}}}&{{{1}}} \\{{{1}}}&{{{2}}}\end{matrix}\right|=5,A_{12}=(-1)^{1+2}\left|\begin{matrix}{{{2}}}&{{{1}}} \\{{{3}}}&{{{2}}}\end{matrix}\right|=-1,A_{13}=(-1)^{1+3}\left|\begin{matrix}{{{2}}}&{{{3}}} \\{{{3}}}&{{{1}}}\end{matrix}\right|=-7, $$

 $$ A_{21}=(-1)^{2+1}\left|\begin{matrix}{2}&{3}\\ {1}&{2}\\ \end{matrix}\right|=-1,A_{22}=(-1)^{2+2}\left|\begin{matrix}{1}&{3}\\ {3}&{2}\\ \end{matrix}\right|=-7,A_{23}=(-1)^{2+3}\left|\begin{matrix}{1}&{2}\\ {3}&{1}\\ \end{matrix}\right|=5, $$

 $$ A_{31}=\left(-1\right)^{3+1}\left|\begin{matrix}{{{2}}}&{{{3}}} \\{{{3}}}&{{{1}}}\end{matrix}\right|=-7,\ A_{32}=\left(-1\right)^{3+2}\left|\begin{matrix}{{{1}}}&{{{3}}} \\{{{2}}}&{{{1}}}\end{matrix}\right|=5,\ A_{33}=\left(-1\right)^{3+3}\left|\begin{matrix}{{{1}}}&{{{2}}} \\{{{2}}}&{{{3}}}\end{matrix}\right|=-1, $$

于是A的伴随矩阵为

 $$ \boldsymbol{A}^{*}=\begin{pmatrix}5&-1&-7\\-1&-7&5\\-7&5&-1\end{pmatrix}, $$

A 的逆矩阵为

 $$ \boldsymbol{A}^{-1}=\frac{1}{\left|\boldsymbol{A}\right|}\boldsymbol{A}^{*}=\frac{1}{-18}\begin{pmatrix}5&-1&-7\\ -1&-7&5\\ -7&5&-1\end{pmatrix}=\begin{pmatrix}-\frac{5}{18}&\frac{1}{18}&\frac{7}{18}\\ \frac{1}{18}&\frac{7}{18}&-\frac{5}{18}\\ \frac{7}{18}&-\frac{5}{18}&\frac{1}{18}\end{pmatrix}. $$

从例2可以看出，当方阵的阶数  $ n \geq 3 $ 时，用公式法求逆矩阵比较烦琐，需要求  $ n^2 $ 个  $ n-1 $ 阶行列式  $ A_{ij} = (-1)^{i+j} M_{ij} $。在这种情况下，我们一般是用矩阵的初等行变换来求矩阵的逆矩阵。然而，求逆公式  $ A^{-1} = \frac{1}{|A|} A^* $ 适用于理论证明。例如，借助于求逆公式可以得到解线性方程组的克莱默法则。

## 二、克莱默法则

设有一个含有 n 个未知数  $ x_{1}, x_{2}, \cdots, x_{n} $，n 个线性方程的方程组

 $$ \begin{cases}a_{11}x_{1}+a_{12}x_{2}+\cdots+a_{1n}x_{n}=b_{1},\\a_{21}x_{1}+a_{22}x_{2}+\cdots+a_{2n}x_{n}=b_{2},\\\cdots\cdots\cdots\\a_{n1}x_{1}+a_{n2}x_{2}+\cdots+a_{nn}x_{n}=b_{n},\end{cases} $$

借助于矩阵乘法，该线性方程组可以写成  $ Ax=\beta $，其中

 $$ \begin{aligned}\boldsymbol{A}&=\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\end{pmatrix},\boldsymbol{x}=\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix},\boldsymbol{\beta}=\begin{pmatrix}b_{1}\\b_{2}\\\vdots\\b_{n}\end{pmatrix}.\end{aligned} $$

定理2 （Cramer(克莱默)法则)：如果线性方程组  $ Ax=\beta $ 的系数行列式不等于零，即  $ |A|\neq0 $，则方程组有唯一解

 $$ x_{1}=\frac{D_{1}}{\left|\boldsymbol{A}\right|},\ x_{2}=\frac{D_{2}}{\left|\boldsymbol{A}\right|},\ \cdots,\ x_{n}=\frac{D_{n}}{\left|\boldsymbol{A}\right|}, $$

其中， $ D_{j}(j=1,2,\cdots,n) $ 是把系数行列式的第 j 列元素用  $ \beta $ 的元素代替后得到的行列式.

证明 因为  $ |A| \neq 0 $，所以  $ A^{-1} $ 存在。令  $ x = A^{-1} \beta $，则有  $ Ax = A (A^{-1} \beta) = \beta $，即  $ x = A^{-1} \beta $ 是线性方程组的解，且由  $ A^{-1} $ 的唯一性可知，线性方程组的解是唯一的。由求逆公式  $ A^{-1} = \frac{1}{|A|} A^* $ 可得

 $$ \boldsymbol{x}=\boldsymbol{A}^{-1}\boldsymbol{\beta}=\frac{1}{\left|\boldsymbol{A}\right|}\boldsymbol{A}^{*}\boldsymbol{\beta}, $$

即

 $$ \boldsymbol{x}=\begin{pmatrix}x_{1}\\x_{2}\\\vdots\\x_{n}\end{pmatrix}=\frac{1}{|\boldsymbol{A}|}\begin{pmatrix}A_{11}&A_{21}&\cdots&A_{n1}\\A_{12}&A_{22}&\cdots&A_{n2}\\\vdots&\vdots&\ddots&\vdots\\A_{1n}&A_{2n}&\cdots&A_{nn}\end{pmatrix}\begin{pmatrix}b_{1}\\b_{2}\\\vdots\\b_{n}\end{pmatrix}=\frac{1}{|\boldsymbol{A}|}\begin{pmatrix}\displaystyle\sum_{k=1}^{n}b_{k}A_{k1}\\\displaystyle\sum_{k=1}^{n}b_{k}A_{k2}\\\vdots\\\displaystyle\sum_{k=1}^{n}b_{k}A_{kn}\end{pmatrix}. $$

于是  $ x_j = \frac{1}{|A|} \sum_{k=1}^{n} b_k A_{kj} = \frac{1}{|A|} (b_1 A_{1j} + b_2 A_{2j} + \cdots + b_n A_{nj}) (j=1, 2, \cdots, n) $. 而将  $ D_j $ 按第  $ j $ 列展开，有

 $$ D_{j}=\begin{vmatrix}a_{11}&\cdots&a_{1,j-1}&b_{1}&a_{1,j+1}&\cdots&a_{1n}\\a_{21}&\cdots&a_{2,j-1}&b_{2}&a_{2,j+1}&\cdots&a_{2n}\\\vdots&\ddots&\vdots&\vdots&\vdots&\ddots&\vdots\\a_{n1}&\cdots&a_{n,j-1}&b_{n}&a_{n,j+1}&\cdots&a_{nn}\end{vmatrix}=b_{1}A_{1j}+b_{2}A_{2j}+\cdots+b_{n}A_{nj}(j=1,2,\cdots,n), $$

所以  $ x_j = \frac{D_j}{|A|} $ ( $ j = 1, 2, \cdots, n $).

例3 用克莱默法则求解线性方程组 $ \left\{\begin{aligned}x_{1}-x_{2}-x_{3}&=-1,\\-2x_{1}+2x_{2}+x_{3}&=1,\\2x_{1}-x_{2}+3x_{3}&=1.\end{aligned}\right. $

 $$ \left|\boldsymbol{A}\right|=\left|\begin{array}{c c c}{1}&{-1}&{-1}\\ {-2}&{2}&{1}\\ {2}&{-1}&{3}\end{array}\right|=\left|\begin{array}{c c c}{1}&{-1}&{-1}\\ {0}&{0}&{-1}\\ {0}&{1}&{5}\end{array}\right|=-\left|\begin{array}{c c c}{1}&{-1}&{-1}\\ {0}&{1}&{5}\\ {0}&{0}&{-1}\end{array}\right|=1\neq0, $$

 $$ D_{1}=\left|\begin{array}{c c c}{{{-1}}}&{{{-1}}}&{{{-1}}} \\{{{1}}}&{{{2}}}&{{{1}}} \\{{{1}}}&{{{-1}}}&{{{3}}}\end{array}\right|=\left|\begin{array}{c c c}{{{-1}}}&{{{-1}}}&{{{-1}}} \\{{{0}}}&{{{1}}}&{{{0}}} \\{{{0}}}&{{{0}}}&{{{2}}}\end{array}\right|=-2, $$

 $$ D_{2}=\left|\begin{matrix}1&-1&-1\\ -2&1&1\\ 2&1&3\end{matrix}\right|=\left|\begin{matrix}1&-1&-1\\ 0&-1&-1\\ 0&0&2\end{matrix}\right|=-2, $$

 $$ D_{3}=\left|\begin{matrix}1&-1&-1\\ -2&2&1\\ 2&-1&1\end{matrix}\right|=\left|\begin{matrix}1&-1&-1\\ 0&0&-1\\ 0&1&3\end{matrix}\right|=1, $$

因此

 $$ x_{1}=\frac{D_{1}}{\left|\boldsymbol{A}\right|}=-2,\ x_{2}=\frac{D_{2}}{\left|\boldsymbol{A}\right|}=-2,\ x_{3}=\frac{D_{3}}{\left|\boldsymbol{A}\right|}=1. $$

需要说明的是，虽然在线性方程组有唯一解时，克莱默法则给出了具体的求解公式，但是由于较大的计算量（对于 n 个变量 n 个线性方程的方程组，要计算  $ n+1 $ 个 n 阶行列式），我们在真正求解线性方程组的时候，很少用克莱默法则，而是采取对线性方程组的增广矩阵施行初等行变换的方法解线性方程组。但是从克莱默法则，我们可以得到与线性方程组的解有关的一些重要结论。

定理 3 如果线性方程组  $ Ax=\beta $ 的系数行列式不等于零，即  $ |A|\neq0 $，则方程组一定有解，且解是唯一的.

该定理的逆否定定理为定理4.

定理 4 如果线性方程组  $ Ax=\beta $ 无解或有无穷多解，则它的系数行列式必等于零，即  $ |A|=0 $.

将定理3和定理4应用到齐次线性方程组Ax=0，则有如下的结论.

定理 5 如果齐次线性方程组 Ax=0 的系数行列式不等于零，即 |A|≠0，则它只有零解

 $$ x_{1}=x_{2}=\cdots=x_{n}=0. $$

定理 6 如果齐次线性方程组 Ax = 0 有非零解，则它的系数行列式必等于零，即 |A| = 0.

例4 问  $ \lambda $ 取何值时，下面的齐次线性方程组有非零解？

 $$ \left\{\begin{aligned}&\lambda x_{1}+&x_{2}+&3x_{3}=0,\\ &\quad x_{1}+(\lambda-1)x_{2}+&x_{3}&=0,\\ &x_{1}+&x_{2}+&(\lambda-1)x_{3}&=0.\end{aligned}\right. $$

解 由定理 6 可知，若所给齐次线性方程组有非零解，则它的系数行列式  $ \left| A \right| = 0 $。即

 $$ \begin{aligned}\left|\boldsymbol{A}\right|&=\left|\begin{matrix}\lambda&1&3\\1&\lambda-1&1\\1&1&\lambda-1\end{matrix}\right|=\left|\begin{matrix}\lambda&1&3\\1&\lambda-1&1\\0&2-\lambda&\lambda-2\end{matrix}\right|=\left|\begin{matrix}\lambda&1&4\\1&\lambda-1&\lambda\\0&2-\lambda&0\end{matrix}\right|\\&=\left(2-\lambda\right)\left(-1\right)^{3+2}\left|\begin{matrix}\lambda&4\\1&\lambda\end{matrix}\right|=\left(\lambda-2\right)^{2}\left(\lambda+2\right)=0.\end{aligned} $$

所以当  $ \lambda = -2 $ 或  $ \lambda = 2 $ 时，该齐次线性方程组有非零解.

### 习题2-4

1. 用克莱默法则求解下列线性方程组：

 $$ \left\{\begin{aligned}x_{1}-2x_{2}+2x_{3}=&-1,\\ -2x_{1}+3x_{2}+4x_{3}=&2,\\ 2x_{1}-4x_{2}+3x_{3}=&1;\end{aligned}\right. $$

 $$ \left\{\begin{aligned}x_{1}-2x_{2}+&x_{3}=-2,\\ x_{1}+&x_{2}-2x_{3}=4,\\ -2x_{1}+&x_{2}+2x_{3}=1.\end{aligned}\right. $$

2. 已知二次曲线  $ f(x)=a+bx+cx^{2} $ 在点 x=1、x=2、x=3 处的值为  $ f(1)=2 $、 $ f(2)=3 $、 $ f(3)=-2 $，试确定这条二次曲线.

3. 用求逆公式求矩阵  $ A = \begin{pmatrix} 1 & -1 & 1 \\ 1 & 1 & 0 \\ 2 & 1 & 1 \end{pmatrix} $ 的逆矩阵.

4. 问  $ \lambda $ 为何值时，线性方程组

 $$ \left\{\begin{aligned}x_{1}-&x_{2}+2x_{3}=-4,\\ x_{1}+&x_{2}+\lambda x_{3}=4,\\ -x_{1}+&\lambda x_{2}+x_{3}=\lambda^{2}\end{aligned}\right. $$

有唯一解？无解？无穷多解？有无穷多解时，求其解.

5. 设 n 阶矩阵 A 的伴随矩阵为  $ A^{*} $，证明：

(1) 若  $ \left|A\right|=0 $，则  $ \left|A^{*}\right|=0 $；

(2) $ \left|A^{*}\right|=\left|A\right|^{n-1}. $

6. 设 n 阶矩阵 A 的伴随矩阵为  $ A^{*} $，若矩阵 A 可逆，证明  $ A^{*} $ 也可逆，并求  $ (A^{*})^{-1} $.

### 本章小结

本章小结

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>n 阶行列式的定义</td><td style='text-align: center; word-wrap: break-word;'>理解 n 阶行列式的定义，熟悉一些特殊行列式的值\n会用 对角线法则计算2阶、3阶行列式</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>n 阶行列式的性质</td><td style='text-align: center; word-wrap: break-word;'>理解 n 阶行列式的性质，会利用 n 阶行列式的性质计算简单的 n 阶行列式\n理解 利用行列式判断方阵可逆的充分必要条件</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>行列式按行(列)展开</td><td style='text-align: center; word-wrap: break-word;'>理解 余子式、代数余子式的概念和性质\n理解 行列式按行(列)展开的法则\n会用 n 阶行列式的性质及行列式按行(列)展开的法则计算简单的 n 阶行列式</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>矩阵求逆公式与克莱默法则</td><td style='text-align: center; word-wrap: break-word;'>理解 伴随矩阵的概念和性质\n熟悉 矩阵的求逆公式，会用伴随矩阵求逆矩阵\n理解 克莱默法则</td></tr></table>

#### 行列式的发展

行列式出现于对线性方程组的求解过程，坐标变换、多重积分中的变量替换、二次型化为标准型等问题也都有行列式应用的身影。

行列式这个词是 Cauchy 在他的一篇论文中明确提出的. 在这篇论文中, Cauchy 把行列式的元素排成方阵, 并采用双重下标来标记元素在行列式中的位置. 例如, 一个 3 阶的行列式写成 (两条竖线是在 1841 年引进的)

 $$ \begin{array}{ccc}a_{11}&a_{12}&a_{13}\\&&\\a_{21}&a_{22}&a_{23}\\&&\\a_{31}&a_{32}&a_{33}\end{array}. $$

也是在这篇论文中，Cauchy 给出了行列式的第一个系统的、几乎是近代的处理，主要结果之一是行列式的乘法定理. 在这之前，Lagrange 已经对 3 阶行列式给出了这个定理，但由于他的行列式的行是一个四面体的顶点的坐标，所以他的定理没有一般化. Cauchy 给出的乘法定理(用现代记号表达)为

 $$ \mid a_{ij}\mid\mid b_{ij}\mid=\mid c_{ij}\mid. $$

这里  $ \left|a_{ij}\right| $ 和  $ \left|b_{ij}\right| $ 代表 n 阶行列式，而  $ c_{ij} = \sum_{k} a_{ik} b_{kj} $，就是说，在乘积的第 i 行第 j 列的项是  $ \left|a_{ij}\right| $ 的第 i 行和  $ \left|b_{ij}\right| $ 的第 j 列的对应元素的乘积之和。这个定理在 1812 年曾由 Jacques P. M. Binet 叙述过但没有得到令人满意的证明。

Heinrich F. Scherk 于 1825 年在他的数学论文中给出了行列式的几个新的性质. 他建立了只有一行(或列)不同的两个行列式相加的规则和一个常数乘行列式的规则. 另外, 他还叙述了当一个方阵的某一行是另两行或几行的线性组合时, 其行列式为零, 以及三角行列式(主对角线以上或以下的所有元素是零)的值是主对角线上的元.

## 一、填空题

1. 排列 35214 与 41253 的逆序数之和为 ___.

2.  $ \begin{vmatrix} a & b & c \\ a & a+b & a+b+c \\ a & 2a+b & 3a+2b+c \end{vmatrix} =  $ ___.

3. 设行列式  $ D = \begin{vmatrix} 1 & 2 & 2 & 3 \\ 1 & 2 & -4 & -1 \\ 0 & 3 & -1 & 2 \\ -2 & 1 & -3 & 1 \end{vmatrix} $，则  $ -A_{12} - A_{22} + A_{32} + 3A_{42} = $ ___.

4.5 阶行列式  $ D=\begin{vmatrix}1-a&a&0&0&0\\-1&1-a&a&0&0\\0&-1&1-a&a&0\\0&0&-1&1-a&a\\0&0&0&-1&1-a\end{vmatrix}= $ ___.

5. 设矩阵  $ A = \begin{pmatrix} 3 & 2 \\ 1 & 3 \end{pmatrix} $，E 为 2 阶单位矩阵，矩阵 B 满足  $ BA = B + 2E $，则  $ |B| = $ ___.

## 二、选择题

1.4 阶行列式  $ \begin{vmatrix} a_{1} & 0 & 0 & b_{1} \\ 0 & a_{2} & b_{2} & 0 \\ 0 & b_{3} & a_{3} & 0 \\ b_{4} & 0 & 0 & a_{4} \end{vmatrix} $ 的值等于( ).

A.  $ a_{1}a_{2}a_{3}a_{4}-b_{1}b_{2}b_{3}b_{4} $ B.  $ a_{1}a_{2}a_{3}a_{4}+b_{1}b_{2}b_{3}b_{4} $ C.  $ (a_{1}a_{2}-b_{1}b_{2})(a_{3}a_{4}-b_{3}b_{4}) $ D.  $ (a_{2}a_{3}-b_{2}b_{3})(a_{1}a_{4}-b_{1}b_{4}) $

2. 若  $ \alpha_{1}, \alpha_{2}, \alpha_{3}, \beta_{1}, \beta_{2} $ 都是 4 维列向量，且 4 阶行列式  $ \left|\alpha_{1}, \alpha_{2}, \alpha_{3}, \beta_{1}\right| = m $， $ \left|\alpha_{1}, \alpha_{2}, \beta_{2}, \alpha_{3}\right| = n $，则 4 阶行列式  $ \left|\alpha_{3}, \alpha_{2}, \alpha_{1}, \beta_{1} + \beta_{2}\right| = (\quad) $.

A. m-n B. n-m C.  $ m+n $ D.  $ -(m+n) $

3. 设  $ A $、 $ B $ 均为  $ n $ 阶方阵，且  $ |A| = \frac{1}{2} $， $ |B| = -2 $，则  $ |2A^* B^{-1}| = (\ ) $.

A. 1

B.  $ -1 $

C. 2

D.  $ \frac{1}{2} $

4. 设  $ A $、 $ B $ 为 3 阶方阵，且  $ |A| = 3 $， $ |B| = 2 $， $ |A^{-1} + B| = 2 $，则  $ |A + B^{-1}| = (\ ) $.

A. 2 B. -2 C. 3 D. -3

5. 设  $ \alpha_1, \alpha_2, \alpha_3 $ 都是 3 维列向量，记矩阵  $ A = (\alpha_1, \alpha_2, \alpha_3) $， $ B = (\alpha_1 + \alpha_2 + \alpha_3, \alpha_1 + 2\alpha_2 + 4\alpha_3, \alpha_1 + 3\alpha_2 + 9\alpha_3) $，如果  $ |A| = 1 $，则  $ |B| = (\ ) $.

A. 2 B. -2 C.  $ \frac{1}{2} $ D.  $ -\frac{1}{2} $

## 三、解答题

1. 设  $ \alpha = \begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix} $，矩阵  $ A = \alpha \alpha^{T} $，n 为正整数，求行列式  $ |\alpha E - A^{n}| $ 的值.

2. 设  $ A $ 为  $ n $ 阶非零矩阵， $ A^* $ 是  $ A $ 的伴随矩阵， $ A^\mathrm{T} $ 是  $ A $ 的转置矩阵，当  $ A^* = A^\mathrm{T} $ 时，证明  $ |A| \ne 0 $。

3. 设  $ A $、 $ B $ 为 2 阶方阵， $ A^* $、 $ B^* $ 分别是  $ A $、 $ B $ 的伴随矩阵，若  $ |A| = 3 $， $ |B| = 2 $，求分块矩阵  $ \begin{pmatrix} O & A \\ B & O \end{pmatrix} $ 的伴随矩阵.

4. 设  $ A $、 $ B $、 $ A+B $、 $ A^{-1}+B^{-1} $ 均为 n 阶可逆矩阵，求  $ (A^{-1}+B^{-1})^{-1} $.

5. 已知  $ A = \begin{pmatrix} 1 & 1 & -1 \\ -1 & 1 & 1 \\ 1 & -1 & 1 \end{pmatrix} $，矩阵  $ X $ 满足  $ A^* X = A^{-1} + 2X $，其中  $ A^* $ 是  $ A $ 的伴随矩阵，求矩阵  $ X $。

6. 当  $ \lambda $ 取何值时，线性方程组

 $$ \left\{\begin{aligned}\lambda x_{1}+&x_{2}+x_{3}=\lambda-3,\\ x_{1}+\lambda x_{2}+&x_{3}=-2,\\ x_{1}+&x_{2}+\lambda x_{3}=-2\end{aligned}\right. $$

无解？有唯一解？有无穷多解？在方程组有无穷多解时求其解.
