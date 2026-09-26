# 6. 投影运算（projection）

> 来源：docs/08_电子书/计算机软件技术基础（第5版）-徐士良、葛兵.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：d53505b4754eaf37


投影运算是在给定关系的某些 $ \underset{\cdot}{域} $上进行的运算。通过投影运算可以从一个关系中选择出所需要的属性成分，并且按要求排列成一个新的关系，而新关系的各个属性值来自原关系中相应的属性值。因此，经过投影运算后，会取消某些列，而且有可能出现一些重复元组。由于在一个关系中的任意两个元组在各分量上不能完全相同，根据关系的基本要求，必须删除重复元组，最后形成一个新的关系，并给予新的名字。

给定关系 R 在其域列 SN 和 C 上的投影用公式表示为

 $$ R\left[SN,C\right] 或 \pi_{SN.C}(R) $$

例 5.6 设关系 R 如图 5.16 所示。关系 R 在域  $ S^{\#} $、SN 和 MAR 上的投影是一个新的关系，如果新的关系取名为 SNM，则其运算公式为

 $$  SN M=R\left[S\#,SN,MAR\right] $$

或

 $$  SNM=\pi_{S\#\text{,SN,MAR}}(R) $$

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="6">R</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>班级CLA</td><td style='text-align: center; word-wrap: break-word;'>学号S#</td><td style='text-align: center; word-wrap: break-word;'>姓名SN</td><td style='text-align: center; word-wrap: break-word;'>所属系SD</td><td style='text-align: center; word-wrap: break-word;'>年龄SA</td><td style='text-align: center; word-wrap: break-word;'>成绩MAR</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ W_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ S_{1} $</td><td style='text-align: center; word-wrap: break-word;'>MA</td><td style='text-align: center; word-wrap: break-word;'>PHSY</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>92</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ W_{4} $</td><td style='text-align: center; word-wrap: break-word;'>$ S_{2} $</td><td style='text-align: center; word-wrap: break-word;'>ZHU</td><td style='text-align: center; word-wrap: break-word;'>MATH</td><td style='text-align: center; word-wrap: break-word;'>20</td><td style='text-align: center; word-wrap: break-word;'>87</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ W_{2} $</td><td style='text-align: center; word-wrap: break-word;'>$ S_{5} $</td><td style='text-align: center; word-wrap: break-word;'>HU</td><td style='text-align: center; word-wrap: break-word;'>ELE</td><td style='text-align: center; word-wrap: break-word;'>20</td><td style='text-align: center; word-wrap: break-word;'>83</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ W_{3} $</td><td style='text-align: center; word-wrap: break-word;'>$ S_{6} $</td><td style='text-align: center; word-wrap: break-word;'>QI</td><td style='text-align: center; word-wrap: break-word;'>COM</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>91</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ W_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ S_{3} $</td><td style='text-align: center; word-wrap: break-word;'>ZHOU</td><td style='text-align: center; word-wrap: break-word;'>ELE</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>95</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图5.16 关系 R</div> </div>

运算结果如图5.17所示。

从这个例子可以看出，投影运算是在关系的列的方向上进行选择。当需要取出表中某

些列的值时，用投影运算是很方便的。

## 7. 联接运算（join）

联接运算是对两个关系进行的运算，其意义是从两个关系的笛卡儿积中选出满足给定属性中一定条件的那些元组。

设 m 元关系 R 和 n 元关系 S，则 R 和 S 两个关系的联接运算用公式表示为

 $$ \boldsymbol{R}\mid\times\mid\boldsymbol{S}_{[i]\theta[j]} $$

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="3">SNM</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S $ ^{#} $</td><td style='text-align: center; word-wrap: break-word;'>SN</td><td style='text-align: center; word-wrap: break-word;'>MAR</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{{1}} $</td><td style='text-align: center; word-wrap: break-word;'>MA</td><td style='text-align: center; word-wrap: break-word;'>92</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{{2}} $</td><td style='text-align: center; word-wrap: break-word;'>ZHU</td><td style='text-align: center; word-wrap: break-word;'>87</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{{5}} $</td><td style='text-align: center; word-wrap: break-word;'>HU</td><td style='text-align: center; word-wrap: break-word;'>83</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{{6}} $</td><td style='text-align: center; word-wrap: break-word;'>QI</td><td style='text-align: center; word-wrap: break-word;'>91</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{{3}} $</td><td style='text-align: center; word-wrap: break-word;'>ZHOU</td><td style='text-align: center; word-wrap: break-word;'>95</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 5.17 关系 SNM = R[S#, SN, MAR]</div> </div>

运算的结果为  $ m+n $ 元关系。其中， $ |\times| $ 是联接运算符； $ \theta $ 为算术比较符； $ [i] $ 与  $ [j] $ 分别表示关系  $ R $ 中第  $ i $ 个属性的属性名和关系  $ S $ 中第  $ j $ 个属性的属性名，它们之间应具有可比性。这个式子的意思是：在关系  $ R $ 和关系  $ S $ 的笛卡儿积中，找出关系  $ R $ 的第  $ i $ 个属性和关系  $ S $ 的第  $ i $ 个属性之间满足  $ \theta $ 关系的所有元组。比较符  $ \theta $ 有以下三种情况：

当 $ \theta $为=时，称为等值联接；

当 $ \theta $为<时，称为小于联接；

当 $ \theta $为>时，称为大于联接。

联接运算的上述公式还可以表示为

 $$ R[f]S=\{r\mathrm{\hat{~s~}}|\textup{r}\in\mathrm{R}\quad\mathrm{ 且 }\quad\mathrm{s}\in\mathrm{S}\quad\mathrm{ 且 }\quad\mathrm{f}(\mathrm{r},\mathrm{s})\mathrm{ 为真 }\} $$

其中，f 为布尔函数（联接条件），其取值为真或假； $ r^{s} $ 是关系 R 和关系 S 的笛卡儿积中的任一元组。

例 5.7 设关系 R 和 S 如图 5.18 所示，则联接运算  $ R \big| \times \big| S $ 的结果如图 5.19 所示。其中，联接运算的条件是  $ [3] = [1] $， $ [3] $ 和  $ [1] $ 分别表示关系 R 中的第 3 个属性和关系 S 中的第 1 个属性。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="4">R</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>销往城市</td><td style='text-align: center; word-wrap: break-word;'>销售员</td><td style='text-align: center; word-wrap: break-word;'>产品号</td><td style='text-align: center; word-wrap: break-word;'>销售量</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{1} $</td><td style='text-align: center; word-wrap: break-word;'>2000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{2} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{2} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{2} $</td><td style='text-align: center; word-wrap: break-word;'>2500</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{3} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{3} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{3} $</td><td style='text-align: center; word-wrap: break-word;'>1500</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{4} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{4} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{4} $</td><td style='text-align: center; word-wrap: break-word;'>3000</td></tr></table>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>产品号</td><td style='text-align: center; word-wrap: break-word;'>生产量</td><td style='text-align: center; word-wrap: break-word;'>订购数</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ D_{1} $</td><td style='text-align: center; word-wrap: break-word;'>3700</td><td style='text-align: center; word-wrap: break-word;'>3000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ D_{2} $</td><td style='text-align: center; word-wrap: break-word;'>5500</td><td style='text-align: center; word-wrap: break-word;'>5000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ D_{3} $</td><td style='text-align: center; word-wrap: break-word;'>4000</td><td style='text-align: center; word-wrap: break-word;'>3500</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">(a) 关系 R</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）关系 S</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.18 关系 R 和关系 S</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>销往城市</td><td style='text-align: center; word-wrap: break-word;'>销售员</td><td style='text-align: center; word-wrap: break-word;'>产品号</td><td style='text-align: center; word-wrap: break-word;'>销售量</td><td style='text-align: center; word-wrap: break-word;'>产品号</td><td style='text-align: center; word-wrap: break-word;'>生产量</td><td style='text-align: center; word-wrap: break-word;'>订购数</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{1} $</td><td style='text-align: center; word-wrap: break-word;'>2000</td><td style='text-align: center; word-wrap: break-word;'>$ D_{1} $</td><td style='text-align: center; word-wrap: break-word;'>3700</td><td style='text-align: center; word-wrap: break-word;'>3000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{2} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{2} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{2} $</td><td style='text-align: center; word-wrap: break-word;'>2500</td><td style='text-align: center; word-wrap: break-word;'>$ D_{2} $</td><td style='text-align: center; word-wrap: break-word;'>5500</td><td style='text-align: center; word-wrap: break-word;'>5000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{3} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{3} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{3} $</td><td style='text-align: center; word-wrap: break-word;'>1500</td><td style='text-align: center; word-wrap: break-word;'>$ D_{3} $</td><td style='text-align: center; word-wrap: break-word;'>3700</td><td style='text-align: center; word-wrap: break-word;'>3000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{4} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{4} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{4} $</td><td style='text-align: center; word-wrap: break-word;'>3000</td><td style='text-align: center; word-wrap: break-word;'>$ D_{4} $</td><td style='text-align: center; word-wrap: break-word;'>5500</td><td style='text-align: center; word-wrap: break-word;'>5000</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 5.19 关系 R 和关系 S 联接运算  $ R \mid \times \mid S $ 后的结果 [3] = [1]</div> </div>

## 8. 自然联接运算（natural join）

自然联接运算是对两个具有公共属性的关系所进行的运算。设关系 R 和关系 S 具有公共的属性，则关系 R 和关系 S 的自然联接的结果，是从它们的笛卡儿积  $ R \times S $ 中选出公共属性值相等的那些元组。具体地说，如果关系 R 和关系 S 具有相同的属性名  $ A_1, A_2, \cdots, A_k $，则它们的自然联接是从笛卡儿积  $ R \times S $ 中选出  $ R \cdot A_1 = S \cdot A_1 \wedge R \cdot A_2 = S \cdot A_2 \wedge \cdots \wedge R \cdot A_k = S \cdot A_k $ 的所有元组，并去掉重复属性的元组集合，记为

 $$ R\mid\times\mid S $$

其中， $ R \cdot A_{1}, R \cdot A_{2}, \cdots, R \cdot A_{k} $ 表示  $ R \times S $ 中对应于关系 R 中的属性  $ A_{1}, A_{2}, \cdots, A_{k} $ 的属性名；同样， $ S \cdot A_{1}, S \cdot A_{2}, \cdots, S \cdot A_{k} $ 表示  $ R \times S $ 中对应于关系 S 中的属性  $ A_{1}, A_{2}, \cdots, A_{k} $ 的属性名。在此只是为了区分 R 和 S 两个关系中的公共属性而采用的一种标记。

如果用  $ j_{1}, j_{2}, \cdots, j_{m} $ 来表示  $ R \times S $ 中除去  $ S \cdot A_{1}, S \cdot A_{2}, \cdots, S \cdot A_{k} $ 以后按顺序列出的所有其他分量的序号，则根据自然联接的定义，可以用选择运算和投影运算来表示自然联接：

 $$ \boldsymbol{R}\mid\times\mid\boldsymbol{S}=\boldsymbol{\pi}_{j1,j2,\cdots,j m}(\boldsymbol{\sigma}_{R\bullet A_{1}=S\bullet A_{1}\land R\bullet A_{2}=S\bullet A_{2}\land\cdots\land R\bullet A_{k}=S\bullet A_{k}}(\boldsymbol{R}\times\boldsymbol{S})) $$

上式表明，自然联接运算分以下三步进行：

（1）计算笛卡儿积 $ R\times S $;

（2）选出同时满足 $ R\cdot A_{i}=S\cdot A_{i}(A_{i} $为R和S的公共属性)的所有元组；

（3）去掉重复属性。

例如，对图5.18所示的两个关系R和S作自然联接 $ R\mid\times\mid S $的结果如图5.20所示。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>销往城市</td><td style='text-align: center; word-wrap: break-word;'>销售员</td><td style='text-align: center; word-wrap: break-word;'>产品号</td><td style='text-align: center; word-wrap: break-word;'>销售量</td><td style='text-align: center; word-wrap: break-word;'>生产量</td><td style='text-align: center; word-wrap: break-word;'>订购数</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{1} $</td><td style='text-align: center; word-wrap: break-word;'>2000</td><td style='text-align: center; word-wrap: break-word;'>3700</td><td style='text-align: center; word-wrap: break-word;'>3000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{2} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{2} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{2} $</td><td style='text-align: center; word-wrap: break-word;'>2500</td><td style='text-align: center; word-wrap: break-word;'>5500</td><td style='text-align: center; word-wrap: break-word;'>5000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{3} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{3} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{3} $</td><td style='text-align: center; word-wrap: break-word;'>1500</td><td style='text-align: center; word-wrap: break-word;'>3700</td><td style='text-align: center; word-wrap: break-word;'>3000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ C_{4} $</td><td style='text-align: center; word-wrap: break-word;'>$ M_{4} $</td><td style='text-align: center; word-wrap: break-word;'>$ D_{4} $</td><td style='text-align: center; word-wrap: break-word;'>3000</td><td style='text-align: center; word-wrap: break-word;'>5500</td><td style='text-align: center; word-wrap: break-word;'>5000</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 5.20 关系 R 和关系 S 自然联接运算  $ R \mid \times $ | S 后的结果</div> </div>

自然联接是组合关系的有效方法，利用投影、选择和自然联接可以任意地分割和组合关系，这正是关系模型的数据操纵语言具有各种优点的根本原因。

特别需要说明的是，两个关系的联接运算和自然联接运算虽然都是并表运算，但它们是有区别的，特别是联接运算中的等值联接与自然联接是不同的。等值联接要求相等的分量不一定是公共属性，它只要求一个分量相等即可；而自然联接则要求相等的分量必须是公共

属性，而且公共属性的个数可以多于一个。此外，等值联接后不把重复的属性去掉，而自然联接则要将重复的属性去掉。

由上所述，利用关系代数运算可以方便地对一个或多个关系进行各种拆分和组装。在关系数据库中，正是通过这些运算对数据库中的数据进行各种操作。下面举例说明。

例 5.8 设有一个关系 R 如图 5.21 所示，现要找出平均成绩 (AVER) 在 85 分以上的学生姓名和学号。

根据题目要求，可以先通过选择运算把  $ AVER \geq 85 $ 的所有元组挑选出来，然后在学号（S#）和学生姓名（SN）两个域上投影，即可得到所需的结果，即

 $$ P=\pi_{S\#,SN}(\sigma_{AVER\geq85}(R))=\{(\mathrm{S}_{1},\mathrm{MA}),(\mathrm{S}_{3},\mathrm{FAN}),(\mathrm{S}_{4},\mathrm{WANG})\} $$

最后的结果如图 5.22 所示。

<div style="text-align: center;"><div style="text-align: center;">图 5.21 关系 R</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.22 关系 P</div> </div>

例 5.9 设有关系 T 和 P 如图 5.23(a) 和 (b) 所示，现要找出讲授课程 G1 的教师姓名、所在系及其职称。

先对关系 T 和 P 作自然联接，其结果如图 5.24(a) 所示；然后对自然联接后的结果作选择与投影运算，其结果如图 5.24(b) 所示，即

 $$ \mathrm{TP}=\pi_{\mathrm{TN},\mathrm{TD},\mathrm{T}}(\sigma_{\mathrm{TG}=\mathrm{G}1}(T\mid\times\mid P)) $$

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="5">T</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>教师姓名\nTN</td><td style='text-align: center; word-wrap: break-word;'>所属系\nTD</td><td style='text-align: center; word-wrap: break-word;'>年龄\nTA</td><td style='text-align: center; word-wrap: break-word;'>性别\nTS</td><td style='text-align: center; word-wrap: break-word;'>职称\nT</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LI</td><td style='text-align: center; word-wrap: break-word;'>PHSY</td><td style='text-align: center; word-wrap: break-word;'>51</td><td style='text-align: center; word-wrap: break-word;'>男</td><td style='text-align: center; word-wrap: break-word;'>副教授</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>WU</td><td style='text-align: center; word-wrap: break-word;'>CHEN</td><td style='text-align: center; word-wrap: break-word;'>42</td><td style='text-align: center; word-wrap: break-word;'>男</td><td style='text-align: center; word-wrap: break-word;'>讲师</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>HE</td><td style='text-align: center; word-wrap: break-word;'>COM</td><td style='text-align: center; word-wrap: break-word;'>54</td><td style='text-align: center; word-wrap: break-word;'>男</td><td style='text-align: center; word-wrap: break-word;'>副教授</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LU</td><td style='text-align: center; word-wrap: break-word;'>ELE</td><td style='text-align: center; word-wrap: break-word;'>35</td><td style='text-align: center; word-wrap: break-word;'>男</td><td style='text-align: center; word-wrap: break-word;'>讲师</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">(a) 关系 T</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="2">P</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>教师姓名</td><td style='text-align: center; word-wrap: break-word;'>所任课程</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>TN</td><td style='text-align: center; word-wrap: break-word;'>TG</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LI</td><td style='text-align: center; word-wrap: break-word;'>$ G_{1} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LU</td><td style='text-align: center; word-wrap: break-word;'>$ G_{2} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>HE</td><td style='text-align: center; word-wrap: break-word;'>$ G_{3} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>WU</td><td style='text-align: center; word-wrap: break-word;'>$ G_{4} $</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 5.23 关系 T 和关系 P</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 关系P</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>教师姓名\nTN</td><td style='text-align: center; word-wrap: break-word;'>所属系\nTD</td><td style='text-align: center; word-wrap: break-word;'>年龄\nTA</td><td style='text-align: center; word-wrap: break-word;'>性别\nTS</td><td style='text-align: center; word-wrap: break-word;'>职称\nT</td><td style='text-align: center; word-wrap: break-word;'>所任课程\nTG</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LI</td><td style='text-align: center; word-wrap: break-word;'>PHSY</td><td style='text-align: center; word-wrap: break-word;'>51</td><td style='text-align: center; word-wrap: break-word;'>男</td><td style='text-align: center; word-wrap: break-word;'>副教授</td><td style='text-align: center; word-wrap: break-word;'>$ G_{1} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>WU</td><td style='text-align: center; word-wrap: break-word;'>CHEN</td><td style='text-align: center; word-wrap: break-word;'>42</td><td style='text-align: center; word-wrap: break-word;'>男</td><td style='text-align: center; word-wrap: break-word;'>讲师</td><td style='text-align: center; word-wrap: break-word;'>$ G_{4} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>HE</td><td style='text-align: center; word-wrap: break-word;'>COM</td><td style='text-align: center; word-wrap: break-word;'>54</td><td style='text-align: center; word-wrap: break-word;'>男</td><td style='text-align: center; word-wrap: break-word;'>副教授</td><td style='text-align: center; word-wrap: break-word;'>$ G_{3} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LU</td><td style='text-align: center; word-wrap: break-word;'>ELE</td><td style='text-align: center; word-wrap: break-word;'>35</td><td style='text-align: center; word-wrap: break-word;'>男</td><td style='text-align: center; word-wrap: break-word;'>讲师</td><td style='text-align: center; word-wrap: break-word;'>$ G_{2} $</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">(a)  $ T \mid \times |P $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.24 T | × | P 与关系 TP</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="3">TP</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>教师姓名 TN</td><td style='text-align: center; word-wrap: break-word;'>所属系 TD</td><td style='text-align: center; word-wrap: break-word;'>职称 T</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LI</td><td style='text-align: center; word-wrap: break-word;'>PHSY</td><td style='text-align: center; word-wrap: break-word;'>副教授</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">(b) 关系 TP</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图5.24 （续）</div> </div>

例 5.10 设有一关系 W，现要在关系 W 中存入一个元组  $ (a, b, c, d, e, f, g) $。

对于这个操作可以用以下运算来实现：

 $$ W\cup(a,b,c,d,e,f,g)GIVING W $$

其中，GIVING 表示经过并运算后的结果赋予 W，对于每一种具体的语言可以有不同的表示方法。

从以上几个例子可以看出，关系代数作为一种语言是非常简便和清晰的，它集定义、查询、更新和控制为一体，而其核心是查询，因此又称为查询语言。

### 5.3.1 数据库设计的基本概念

数据库设计是指在已有数据库管理系统的基础上建立数据库的过程。数据库设计在数据库系统开发中占有非常重要的地位，数据库设计的好坏直接影响了整个系统的效率。

如果说学会使用一个数据库比较容易，那么要设计一个数据库就不是一件轻而易举的事情，而是一个比较复杂的过程。数据库设计的过程本质上是将数据库系统与实际的应用对象紧密地结合起来，构成一个有机整体的过程。因此，数据库设计者要了解和掌握数据库系统和实际应用对象这两方面的知识，不仅要懂得计算机和数据库，还要知道相应的业务工作，并具有一定的实际经验。由此可见，数据库设计所涉及的面很宽，对设计者的要求比较高，是一项比较复杂、难度比较大的工作。

一般来说，数据库的设计过程要经历三个大的阶段，即可行性分析与研究阶段、系统设计阶段、设计实施与系统运行阶段。

可行性分析与研究阶段是整个设计过程的前期工作。在这个阶段中，主要是对已有的计算机系统（包括数据库管理系统）和实际应用两方面做尽可能详细的调查，对数据库设计中的问题，建成以后的性能、效益以及为此所需要的投资等进行分析和研究，从而作出可行性报告。

系统设计阶段是系统的具体设计过程。在这个阶段中，主要包括概念设计、逻辑结构设计、物理结构设计这三个步骤。这三个不同层次上的设计过程是把实体以及相互之间的联系转换为“数据”并落实于计算机中的过程。数据库设计中的主要技术工作在这个阶段中完成。

设计实施与系统运行阶段是对系统的正确性进行验证和总调试，并且正式启动系统运行的阶段。在这个阶段中，还要为系统的日后运行与维护做好准备，即整理出详细的资料，

编制说明书以及人员培训等。这一阶段是一个完善系统设计、提供系统性能指标的过程，其中还包括编制数据字典这一工作。

数据库的整个设计过程是使系统性能不断提高和完善的过程。为了达到满意的效果，往往需要反复调整和修改。因此，数据库设计的整个过程是一个循环的过程，循环的终止条件是对性能指标测试与系统评价满意。

#### 5.3.2 数据库设计的过程

上一节简单说明了数据库设计的主要阶段，但具体的实施方法可以有所不同。本节将根据基本的设计方法来说明数据库设计的具体过程，并且对几个主要步骤重点讨论。

## 1. 需求分析

需求分析是整个数据库设计过程中最重要的一步，它是全部设计工作的基础。在需求分析这一步中的工作做得越细，整个设计工作也就会越顺利。

需求分析的目的是了解用户要求，对现实世界中的处理对象进行调查、分析，制定出数据库设计的具体目标。为此要进行深入细致的调查，调查的内容主要包括以下几方面。

（1）了解组织机构。组织机构情况的调查是分析信息流程的基础，它对掌握数据的规律决定数据的组织形式有着重要的作用。

（2）了解具体的业务现状，即了解各部门的业务活动情况。通过这项调查，可以知道现行业务中信息的种类、信息的流程、信息的处理方式以及各种业务的工作过程。这实际上是对数据的产生过程、数据之间的联系以及数据的处理方式和用途的详细了解过程，这也是调查的重点。

（3）了解外部要求。例如，响应时间的要求、数据安全性、完整性的要求等。

（4）了解长远规划中的应用范围和要求。一个数据库的建立，特别是大型数据库的建立，往往要投入大量的人力和物力。如果不充分考虑长远的发展需要，那么所建立的数据库可能暂时满足了用户的应用需要，但随着形势的发展，当用户提出新的应用要求时，原有的系统就不能适应需要，从而导致系统失效，造成很大的浪费。因此，在设计数据库时，要充分考虑今后发展的需要，要留有余地，充分考虑系统的可修改和可扩充性。

经过这些调查以后，掌握了必要的数据和资料，对数据的基本规律和用户的要求也会非常清楚。在此基础上，结合对已有系统的分析结果，要确定系统的范围以及它与外部环境之间的相互关系，即确定哪些功能由计算机完成或将来准备让计算机完成，哪些功能由人工完成。这也就是确定系统的边界，提出系统的功能。

需求分析是可行性分析阶段的主要工作。当然，作为可行性的分析，还应该对已有的条件进行分析。例如，已有的或将要购进的计算机系统的配置、性能指标是什么样的？数据库管理系统的功能如何？这些都应该很清楚。同时对系统设计的约束条件也要作出分析，如人力、财力、物力的条件以及时间上的要求等。综合“条件”和“需求”两方面，可以做出可行性报告，给出系统设计的目标、计划和比较具体的设计方案，为下一阶段的具体设计打下基础。

## 2. 概念结构设计

概念结构设计是系统结构设计的第一步，它是在需求分析的基础上对客观世界所做的抽象，它独立于数据库的逻辑结构，也独立于具体的数据库管理系统。概念模型是对实际应

用对象形象而又具体的描述，因此，也可以把概念模型设计看成逻辑设计的开始。

概念模型有以下几个主要特点：

（1）能充分反映实际应用中的实体及其相互之间的联系，是现实世界的一个真实模型。

（2）由于概念模型独立于具体的计算机系统和具体的数据库管理系统，因此便于用户理解，有利于用户积极参与设计工作。

（3）概念模型容易修改。当问题有变化时，反映实际问题的概念模型可以很方便地扩充和修改。

（4）便于向各种模型转换。由于概念模型不依赖于具体的数据库管理系统，因此容易向关系模型、网状模型和层次模型等各种模型转换。

概念结构设计要借助于某种方便又直观的描述工具，E-R（实体-联系，Entity-Relationship）图是设计概念模型的有力工具。在E-R图中，用三种图框分别表示实体、属性和实体之间的联系，其规定如下：

用矩形框表示实体，框内标明实体名；

用椭圆状框表示实体的属性，框内标明属性名；

用菱形框表示实体间的联系，框内标明联系名；

实体与其属性之间以无向边联接，菱形框与相关实体之间也用无向边联接，并在无向边旁标明联系的类型。

用 E-R 图可以简单明了地描述实体及其相互之间的联系。例如，班长实体集和班级实体集之间是一对一的联系，校长实体集和教师实体集之间是一对多的联系，学生实体集和课程实体集之间是多对多的联系，可以用图 5.25 所示的 E-R 图表示这些实体的联系。

<div style="text-align: center;"><div style="text-align: center;">(a) 一对一的联系</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 一对多的联系</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 多对多的联系</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.25 描述实体集联系的 E-R 图</div> </div>

用 E-R 图还可以方便地描述多个实体集之间的联系和一个实体集内部实体之间的联系。例如，课程实体集和教师实体集之间是多对多的联系，课程实体集和学生实体集之间是多对多的联系。因此，这三个实体集的实体之间的联系可用图 5.26 所示的 E-R 图来表示。而在教师实体集中，在“科研”联系上存在多对多的联系，因为一个课题组长领导若干个组员，而一个教师可能参与几个课题的研究工作，这种联系可以用图 5.27 所示的 E-R 图来描述。

<div style="text-align: center;"><div style="text-align: center;">图 5.26 多个实体集联系的 E-R 图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.27 同一个实体集内实体联系的 E-R 图</div> </div>

图 5.28 是教师实体属性的 E-R 图。图 5.29 是材料实体集和购买材料的合同实体集之间联系“M-O”属性的 E-R 图。

<div style="text-align: center;"><div style="text-align: center;">图 5.28 教师实体属性的 E-R 图</div> </div>

利用 E-R 图可以很方便地进行概念结构设计。概念结构设计是对实体的抽象过程，这

个过程一般分三步来完成：首先根据各个局部应用设计出分E-R图；然后综合各分E-R图得到初步的E-R图，在综合过程中主要是消除冲突；最后对初步的E-R图消去冗余，得到基本E-R图。下面分别说明这三个步骤。

（1）建立分 E-R 图。建立分 E-R 图的主要工作是对需求分析阶段收集到的数据进行分类、组织、划分实体和属性，确定实体之间的联系。实体和属性之间在形式上并没有可以截然划分的界限，而常常

<div style="text-align: center;"><div style="text-align: center;">图 5.29 实体集之间联系属性的 E-R 图</div> </div>

是现实对它们的存在所作的大概的自然划分。这种划分随应用环境的不同而不同，在给定的应用环境下，划分实体和属性的原则是：

① 属性与其所描述的实体之间的联系只能是一对多的；

② 属性本身不能再具有需要描述的性质或与其他事物具有联系。

根据以上原则划分属性时，能作为属性的应尽量作为属性而不划分为实体，以简化E-R图。

例 5.11 在一个简单的教学管理系统中，主要的实体型是学生、教师、课程、课外科技小组，在这些实体型之间有以下几种联系：

“课程-学生”联系，记为“C-S”联系，这是多对多的联系；

“课程-教师”联系，记为“C-T”联系，这也是多对多的联系；

“学生-科技小组”联系，记为“S-R”联系，这也是多对多的联系；

“教师-科技小组”联系，记为“T-R”联系，这是一对一的联系。

根据以上分析，可以得到相应的表示这四个联系的联系图，同时确定每个实体的属性，这样就可以得到四个简单的分E-R图，如图5.30所示。

在这个例子中，举出的只是最简单的情况。当实际问题比较复杂时，要选择合适的层次来建立分 E-R 图。

<div style="text-align: center;"><div style="text-align: center;">(c)</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(d)</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.30 简单的分 E-R 图</div> </div>

（2）设计初步 E-R 图。建立了各分 E-R 图以后，要对它们进行综合，即把各分 E-R 图连接在一起。这一步的主要工作是找出各分 E-R 图之间的联系，而在确定各分 E-R 图的联系时，可能会遇到相互之间不一致的问题，称为冲突。这是因为分 E-R 图是实际应用问题的抽象，不同的应用通常由不同的设计人员进行概念结构的设计，因此，分 E-R 图之间的冲突往往是不可避免的。冲突可能出现在以下几方面：

① 属性域冲突。即同一个属性在不同的分 E-R 图中其值的类型、取值范围等不一致或者是属性取值单位不同，这需要各部门之间协商使之统一。

② 命名冲突。即属性名、实体名、联系名之间有同名异义或异名同义的问题存在，这显然也是不允许的，需要讨论协商解决。

③结构冲突。这主要表现在同一对象在不同的应用中有不同的抽象。例如，同一对象在不同的分E-R图中有实体和属性两种不同的抽象。又如，同一实体在不同的分E-R图中有不同的属性组成，如属性个数不同、属性次序不一致等。还如，相同的实体之间的联系，在

不同的分 E-R 图中其类型可能不一样，如在一个分 E-R 图中是一对多的联系，而在另一个分 E-R 图中是多对多的联系。

在综合各分 E-R 图时，必须要解决上述各类冲突，从而得到一个集中了各用户的信息要求，为所有用户共同理解和接受的初步的总体模型，即初步的 E-R 图。

（3）设计基本 E-R 图。初步的 E-R 图综合了系统中各用户对信息的要求，但它可能存在冗余的数据和联系。也就是说，在初步的 E-R 图中可能存在这样的数据和联系，它们分别可以由基本数据和基本联系导出。冗余的数据和联系的存在会破坏数据库的完整性，增加数据库管理的困难，因此需要加以消除。初步 E-R 图在消除了冗余以后，称为基本 E-R 图。

例 5.12 一个百货商店的管理系统可以从营业和采购两方面来考虑，其初步 E-R 图如图 5.31 所示。从图 5.31 可以看出，职工和商品之间的“销售”联系是冗余的联系，因为职工和商品之间的联系完全可以通过职工和商品部的联系以及商品部和商品的联系反映出来，因此应该消除这个联系。消除这个冗余以后就得到了基本 E-R 图，如图 5.32 所示。

<div style="text-align: center;"><div style="text-align: center;">图 5.31 商店管理的初步 E-R 图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.32 商店管理的基本 E-R 图</div> </div>

设计得到的基本 E-R 图应正确无误地反映所有用户的要求，因此，设计出基本 E-R 图后，要与用户一起反复讨论并修改，直到满足用户与设计要求后再进入下一步的设计。

## 3. 逻辑结构设计

为了建立用户所要求的数据库，必须把概念结构转换为某个具体的数据库管理系统所支持的数据模型，这就是逻辑结构设计所要完成的任务。

在已给定数据库管理系统的情况下，数据库的逻辑设计可以分两步来进行：将概念模型转换成一般的数据模型；将一般的数据模型转换为特定的数据库管理系统所支持的数据模型。

下面以转换成关系数据模型为例来说明转换的规则和方法。

把概念模型转换成关系数据模型就是把 E-R 图转换成一组关系模式，它需要完成以下几项工作：

· 确定整个数据库由哪些关系模式组成，即确定有哪些“表”组成。

确定每个关系模式由哪些属性组成，即确定每个“表”中的字段。

确定每个关系模式中的关键字属性。

根据这些目标，可以采取以下两个规则来完成从概念模型到关系数据模型的转换。

（1）每一个实体型转换为一个关系模式。首先，以实体名为关系名，以实体的属性为关系的属性；然后确定关键字属性，这可以通过写出相应实体的属性间的函数依赖关系来找出。例如，在例5.12的商店管理系统中，实体职工可以转换成一个职工关系，如图5.33所

示。根据函数依赖关系，确定属性“工作证号”作为关键字。

<div style="text-align: center;"><div style="text-align: center;">图 5.33 实体职工转换为关系</div> </div>

（2）每个联系分别转换为关系模式。不同型实体之间的联系转换成一个以联系名为关系名的关系模式，该关系的属性由相关实体所对应的关系模式的主关键字以及联系本身的属性所组成。例如，在例5.12的商店管理系统中，生产厂和商品之间的联系“工厂-商品”可以转换成模式“FACO”：

 $$ \mathrm{FACO}(\mathrm{FAN},\mathrm{CO}\neq,\mathrm{FAQTY},\mathrm{FAPR}) $$

其中，FAN（生产厂名）是关系“生产厂”的主关键字，CO#（商品代号）是关系“商品”的主关键字，FAQTY（相应厂提供相应商品的数量）和FAPR（相应厂提供相应商品的价格）是“工厂-商品”这个联系的属性。

同型实体之间的联系转换成一个以联系名为关系名、以实体及其子集的主关键字和以联系的属性为属性的关系模式。

## 4. 物理结构设计

完成数据库的逻辑结构设计以后，还要进行物理结构的设计。物理结构设计的任务就是为逻辑结构设计阶段所得到的逻辑数据模型选择一个最适合应用环境的物理结构。

物理结构的设计依赖于具体的计算机系统，它是一个反复进行的过程。首先要针对具体的数据库管理系统和设备的特性，确定实现所设计的逻辑数据模型必须采取的存储结构和存取方法；然后对该存储模式进行性能评价，若评价结果满足原设计要求，则进入设计实施阶段，否则就要修改设计，经过多次反复，直到取得满意的结果为止。

下面简单介绍物理结构设计的内容和要求。

（1）物理结构设计的准备工作。为了有效地进行物理结构设计，设计人员必须对特定的数据库管理系统和设备特性有充分的了解。

① 要充分了解和掌握所用的数据库管理系统的性能和特点，包括数据库管理系统的功能，提供的物理环境、存储结构、存取方法和可利用的工具等，同时对它们的优缺点要心中有数。通常，数据库管理系统提供了一种以上的存储结构和存取方法，只有对它们的特点、适用范围等有充分的了解，才有可能针对用户的应用要求选择最合适的存储结构和存取方法。

②要十分熟悉存放数据的外存设备的特性。例如，要清楚地知道物理存储区的划分原则、物理块的大小、设备的 I/O 特性等。

③要了解并熟悉应用要求。掌握系统中各个应用之间的关系，分清主次，对不同应用按照对组织的重要程度和使用方式进行分类。了解各个应用的处理频率和响应时间要求，

对时间和空间效率的平衡是非常重要的。在物理结构设计中，要考虑数据的存取和数据的处理两方面，必须要处理时间和空间的矛盾，充分了解和掌握各种应用的情况，以便做出最优处理。

### （2）物理结构设计的内容。

① 确定数据的存储结构。在确定数据的存储结构时，主要是在存取时间、存储空间的利用率和结构维护三方面进行折中考虑。通常，数据库管理系统提供了多种存储结构，因此，设计者可以根据各个应用的特点和要求从所提供的存储结构中进行选择。

② 选择存取路径。数据库的根本特性是数据的共享，因此，对同一数据存储要提供多种存取路径。存取路径直接影响数据存取的效率。在进行物理结构设计时要确定建立哪些路径，而路径的选择主要是考虑索引的选择和文件之间的联系这两个问题。例如，要对建立多少个索引、在哪些数据上建立索引、文件之间的联系如何实现等作出选择。选择的原则是既有较高的检索效率，又使花费的代价最小。

③ 确定数据存放的位置。数据的存放位置对系统性能也有直接影响。为了提高系统的效率，要根据应用情况对数据进行分组，按存取频率和存取速度的不同，分别存放在不同的存储设备上，以满足存取要求。同时，对一个文件内的数据也可以进行“分解”，根据各数据存取频率的不同，可以对文件进行“垂直分解”，把经常存取的数据放在一起，可以提高存取效率。根据各记录存取频率的不同，可以对文件进行“水平分解”，把经常使用的记录或要顺序存取的记录分为一组，并存放在一起，这样可以提高系统的存取效率。

④ 确定存储分配。根据应用和数据库管理系统所提供的存储分配参数，确定块大小、缓冲区的大小和个数、溢出空间的大小等，以便使存取时间和存储空间的分配尽量达到最优。

## 1. 数据字典的作用

数据库系统是一个复杂的系统，它通过数据库管理系统对数据库中的数据实现统一的管理和控制，以保证数据的共享、最小冗余度和数据的正确性等。为了达到这些目的，系统中除了数据库以外，还必须有许多用来保证数据库管理系统对数据进行控制和管理的非数据信息，这些信息对数据库中的数据及其相互关系进行了全面的描述，它们不仅是数据库管理系统对数据库进行控制管理的依据，而且也是数据库设计和系统分析的工具，因此，它们是至关重要的，通常把这些信息集中放在一个专门的地方，这就是数据字典。

数据字典是数据库的信息系统，是由关于数据库中数据描述信息组成的库，也称为描述数据库。数据字典的编制过程贯穿于数据库设计的各个阶段，从收集信息开始即着手编制，随着设计工作的展开，数据字典也逐步形成。

数据字典主要有以下几方面的作用：

（1）对数据进行标准化管理。数据字典集中了设计数据库时所收集的全部信息，如实体、属性、实体联系、各种处理要求、用户名等。这不仅为管理和收集这些数据提供了方法和手段，而且使这些数据的名称、个数和含义统一，避免混淆。也就是说，系统中的数据是标准化的。

（2）使收集的信息文本化。数据字典对所收集的有关数据描述的信息进行统一管理。

因此，如同数据库中的数据一样，可以方便地对这些信息进行各种操作，如查询、插入、删除和修改等。

（3）为数据库设计和系统分析提供了有力的工具。在数据库设计的各阶段以及在调试过程中，设计者必须保证原始信息与数据的准确性。而数据字典中存放的与数据库系统有关的各种信息和原始资料，正是为数据库中数据及其相互关系的准确性提供了依据。

（4）为数据库管理系统对数据库的存取控制和管理提供条件。数据库管理系统对所有的数据库存取请求都要进行检查，如检查用户标识、口令、模式等。对存取请求采取什么样的控制取决于检查的结果。也就是说，数据库管理系统对数据库的控制和管理是以数据字典为依据的。如果没有数据字典或数据字典被破坏了，数据库管理系统对数据库的控制和管理也就失去了条件。

（5）为数据库的维护和扩充提供依据。数据库管理员可以通过查阅数据字典及时了解数据库的动态，掌握系统性能、空间使用情况和各种统计信息，以便及时维护、修改和扩充数据库。

由此可见，数据字典的作用是十分明显的，数据字典和数据库管理系统是数据库管理中的两个主要工具。

## 2. 数据字典的内容

数据字典的内容，即数据字典中所包括的信息，虽然各个不同的数据库系统有所不同，但一般来说，凡是关于数据描述的信息都可以放入数据字典。例如，在数据库设计的第一阶段所收集的所有信息，如实体、属性、实体联系、事务处理要求、用户标识、口令等都可以存入数据字典中；还有逻辑设计的结果、物理结构设计的输出信息，如模式、子模式、物理模式的描述等也都是数据字典的内容；还有数据空间的总数、各种数据的使用、修改情况也记录在数据字典中。

一般来说，数据字典主要有以下几方面的描述与说明：

（1）描述数据库系统的所有对象，如实体、属性、记录型、数据项、用户标识、口令、物理文件名及其位置、文件组织形式等。

（2）描述数据库中各种对象之间的联系。如用户使用的子模式、记录分配的区域和所在的物理设备等描述。

（3）记录所有对象在不同场合、不同视图中的名称对照。

（4）描述模式、子模式和物理模式，包括这些模式的修改情况记录。

数据字典的具体内容和组织方式，在不同的系统和不同的应用中可以视具体需要而不同。不断开发数据字典的功能，充分发挥数据字典这个工具在数据库管理中的作用，也是数据库设计与应用的重要内容之一。

### 习题

5.1 数据管理技术的发展经历了哪几个阶段？各个阶段与计算机技术的发展有何关系？

5.2 数据库技术的主要特点是什么？它与传统的文件系统有何本质的区别？

5.3 数据的逻辑独立性的含义是什么？数据的物理独立性的含义是什么？

5.4 举例说明实体集之间一对一、一对多、多对多的联系。

5.5 关系模型与格式化模型比较有哪些主要优点？

5.6 在关系模型中，一个关系是一张二维表，任意一个二维表是否就是一个关系？为什么？

5.7 设有一关系 S 如图 5.34 所示。分别写出符合下列要求的关系运算式和运算结果。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>S号学 S#</td><td style='text-align: center; word-wrap: break-word;'>姓名 SN</td><td style='text-align: center; word-wrap: break-word;'>数学 MT</td><td style='text-align: center; word-wrap: break-word;'>物理 PH</td><td style='text-align: center; word-wrap: break-word;'>外语 FL</td><td style='text-align: center; word-wrap: break-word;'>总分 TA</td><td style='text-align: center; word-wrap: break-word;'>平均分 ME</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S1</td><td style='text-align: center; word-wrap: break-word;'>A</td><td style='text-align: center; word-wrap: break-word;'>95</td><td style='text-align: center; word-wrap: break-word;'>90</td><td style='text-align: center; word-wrap: break-word;'>91</td><td style='text-align: center; word-wrap: break-word;'>276</td><td style='text-align: center; word-wrap: break-word;'>92</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S2</td><td style='text-align: center; word-wrap: break-word;'>B</td><td style='text-align: center; word-wrap: break-word;'>90</td><td style='text-align: center; word-wrap: break-word;'>84</td><td style='text-align: center; word-wrap: break-word;'>87</td><td style='text-align: center; word-wrap: break-word;'>261</td><td style='text-align: center; word-wrap: break-word;'>87</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S3</td><td style='text-align: center; word-wrap: break-word;'>C</td><td style='text-align: center; word-wrap: break-word;'>85</td><td style='text-align: center; word-wrap: break-word;'>91</td><td style='text-align: center; word-wrap: break-word;'>70</td><td style='text-align: center; word-wrap: break-word;'>246</td><td style='text-align: center; word-wrap: break-word;'>82</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S4</td><td style='text-align: center; word-wrap: break-word;'>D</td><td style='text-align: center; word-wrap: break-word;'>91</td><td style='text-align: center; word-wrap: break-word;'>92</td><td style='text-align: center; word-wrap: break-word;'>90</td><td style='text-align: center; word-wrap: break-word;'>273</td><td style='text-align: center; word-wrap: break-word;'>91</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S5</td><td style='text-align: center; word-wrap: break-word;'>E</td><td style='text-align: center; word-wrap: break-word;'>82</td><td style='text-align: center; word-wrap: break-word;'>87</td><td style='text-align: center; word-wrap: break-word;'>86</td><td style='text-align: center; word-wrap: break-word;'>255</td><td style='text-align: center; word-wrap: break-word;'>85</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S6</td><td style='text-align: center; word-wrap: break-word;'>F</td><td style='text-align: center; word-wrap: break-word;'>80</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>87</td><td style='text-align: center; word-wrap: break-word;'>243</td><td style='text-align: center; word-wrap: break-word;'>81</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 5.34 关系 S</div> </div>

（1）找出平均分在85分（包含85分）以上的所有记录。

（2）列出总分在270分（包含270分）以上的学生的学号、姓名、总分和平均分。

5.8 数据库设计过程包括哪几个阶段？各阶段的主要工作是什么？

5.9 什么是 E-R 图？利用 E-R 图进行数据库概念结构设计分为哪几步？

5.10 数据库的逻辑结构设计主要完成什么任务？把概念模型转换为关系模型时需要做哪些工作？

5.11 假设一个图书出版社的行政组织可以分为编辑、出版、发行三部分，包括若干个编辑室、几个录入排版组、几个定点印刷厂、若干图书发行员和几个图书仓库。其中，每个编辑室有若干名编辑，他们负责组稿、编辑加工、发稿，且每人有规定的任务量。每个录入排版组有若干名职工，他们负责书稿的录入与排版工作，书稿排版有时间要求，每个人的录入排版有数量（字数）和质量要求。若干名发行员负责图书的征订和发行工作，每人有规定的任务。几个定点印刷厂负责图书的印刷。一个厂可承印多种图书，但同一种图书不会在几个印刷厂印刷。若干个仓库存放未销售出去的图书。一个仓库能存放多种图书，但同一种图书不能放在几个仓库中。根据以上信息，设计一个出版社管理系统的概念模型。要求画出分 E-R 图、初步 E-R 图和基本 E-R 图。

5.12 什么是数据字典？它在数据库中的作用是什么？
