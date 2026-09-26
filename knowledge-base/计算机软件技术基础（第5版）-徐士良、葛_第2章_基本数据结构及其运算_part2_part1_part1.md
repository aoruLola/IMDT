# 1. 稀疏矩阵的三列二维数组表示

> 来源：docs/08_电子书/计算机软件技术基础（第5版）-徐士良、葛兵.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：d53505b4754eaf37


为了使稀疏矩阵经过压缩存储后，还能够方便地访问其中的每一个非零元素（而访问不到的自然就是零元素），在存储每一个非零元素时，不仅要存储该非零元素的值，还必须指出该非零元素在稀疏矩阵中的位置（该非零元素所在的行号和列号）。这就是说，在压缩存储的形式中，每一个非零元素应包括以下三个信息：

（1）非零元素所在的行号 i；

（2）非零元素所在的列号 j：

（3）非零元素的值 V。

即每一个非零元素可以用三元组表示为

 $$ (i,j,V) $$

例如，上述稀疏矩阵 A 中的 8 个非零元素可以用以下 8 个三元组表示（以行为主的顺序排列）：

(6,4,2)

(6,6,3)

（7,3,5）

显然，上述稀疏矩阵 A 可以唯一地由这 8 个三元组表示。但是，这 8 个三元组不仅能表示上述这个稀疏矩阵 A，还可以表示其他的稀疏矩阵。例如，如果在上述稀疏矩阵 A 的最后一行后面添加元素全为 0 的若干行，或者在最后一列的后面添加元素全为 0 的若干列，从而得到另外的稀疏矩阵（它的总行数或总列数与 A 不同）。显然，这样的稀疏矩阵也能用以上的 8 个三元组表示。

为了表示的唯一性，除了每一个非零元素用一个三元组表示外，在所有表示非零元素的三元组之前再添加一组信息：

 $ (I,J,t) $

其中，I 表示稀疏矩阵的总行数，J 表示稀疏矩阵的总列数，t 表示稀疏矩阵中非零元素的个数。这样，上述的稀疏矩阵 A 可以用以下 9 个三元组表示：

(7,8,8)

(1,3,3)

(1,8,1)

(3,1,9)

（4,5,7）

（5,7,6）

（6,4,2）

(6,6,3)

(7,3,5)

其中，第一个三元组表示稀疏矩阵的总体信息（总行数、总列数、非零元素个数），其后的8个三元组依次（以行为主排列）表示稀疏矩阵中每一个非零元素的信息（所在的行号、列号以及非零元素值）。

一般来说，具有t个非零元素的稀疏矩阵可以用 $ t+1 $个三元组表示，其中，第一个三元组用以表示稀疏矩阵的总体信息，其后的各三元组依次表示各非零元素，且按以行为主的顺序排列。为了使各三元组的结构更紧凑，通常将这些三元组组织成三列二维表格的形式，一般又表示成三列二维数组的形式，并简称为三列二维数组。例如，上述稀疏矩阵A可以用如图2.36(a)所示的三列二维表格表示，图2.36(b)为三列二维数组的形式。特别要注意，稀疏矩阵的三列二维数组表示不同于一般程序设计语言中的二维数组，在稀疏矩阵的三列二维数组表示中，前两列中的数据是整型，表示行数、行号与列数、列号，而第3列中的数据（除第一行外）与矩阵元素的数据类型相同。

由上所述，具有 t 个非零元素的稀疏矩阵，其对应的三列二维数组为  $ t+1 $ 行、3 列，共有  $ 3(t+1) $ 个元素。

为了访问稀疏矩阵 A 中第 i 行、第 j 列的元素  $ a_{ij} $，可以从对应的三列二维数组 B 的第 2 行开始，寻找第 1 列值为 i 且第 2 列值为 j 的行号，设为 k，即  $ B(k,1)=i, B(k,2)=j $，则该行第 3 列值即为稀疏矩阵 A 中第 i 行、第 j 列的元素  $ a_{ij} $，即  $ B(k,3)=a_{ij} $。如果在三列二维数组 B 中找不到第 1 列值为 i 且第 2 列值为 j 的行，则表示要访问的元素  $ a_{ij}=0 $。

<div style="text-align: center;"><div style="text-align: center;">(a) 稀疏矩阵的三列二维表格</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 稀疏矩阵的三列二维数组</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.36 稀疏矩阵的表示例</div> </div>

上述过程表明，为了访问稀疏矩阵A中的某个元素，在最坏的情况下，需要扫描三列二维数组B中的所有行。由于稀疏矩阵中绝大部分是零元素，出现这种最坏情况的机会是很多的。为了便于在三列二维数组B中访问稀疏矩阵A中的各元素，通常还附设两个长度与稀疏矩阵A的行数相同的向量POS与NUM。其中，POS(k)表示稀疏矩阵A中第k行的第一个非零元素（如果有的话）在三列二维数组B中的行号；NUM(k)表示稀疏矩阵A中第k行中非零元素的个数。显然，这两个向量之间存在以下关系：

 $$ \begin{aligned}&POS(1)=2\\&POS(k)=POS(k-1)+NUM(k-1),2\leqslant k\leqslant m\\ \end{aligned} $$

其中，m 为稀疏矩阵的行数。例如，上述稀疏矩阵 A 对应的 POS 与 NUM 向量如图 2.37 所示。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>k</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>POS(k)</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>9</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>NUM(k)</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 2.37 POS 与 NUM 向量例</div> </div>

在下面的叙述中，为了表示清晰，将表示稀疏矩阵总体信息（总行数、总列数、非零元素个数）的三元组独立存放，而不放在三列二维数组 B 中，即三列二维数组 B 中的每一行都是非零元素的信息。

稀疏矩阵A的三列二维数组B中每一行的结构用C++描述如下：

//定义结点类型
template<class T>
struct B
{
 int i;
 int j;
 T v;
};

特别要注意，在 C++ 中，数组的下标是从 0 开始的（包括稀疏矩阵以及对应的三列二维数组）。因此，在 C++ 中，上述稀疏矩阵 A 所对应的三列二维数组 B 如图 2.38 所示，对应的 POS 与 NUM 向量如图 2.39 所示。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>9</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>7</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>5</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">(a) 稀疏矩阵的三列二维表格</div> </div>

 $$ \boldsymbol{B}=\left[\begin{array}{llll}0&2&3&\\0&7&1&\\2&0&9&\\3&4&7&\\4&6&6&\\5&3&2&\\5&5&3&\\6&2&5&\end{array}\right] $$

<div style="text-align: center;"><div style="text-align: center;">(b) 稀疏矩阵的三列二维数组</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.38 C++ 中稀疏矩阵的表示例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>k</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>POS(k)</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>7</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>NUM(k)</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 2.39 C++ 中 POS 与 NUM 向量示例</div> </div>

下面具体讨论用三列二维数组表示稀疏矩阵的如下操作：

· 三列二维数组的生成；

用三列二维数组表示后的稀疏矩阵的输出；

用三列二维数组表示后的稀疏矩阵的转置；

用三列二维数组表示后的稀疏矩阵的相加；

用三列二维数组表示后的稀疏矩阵的相乘。

首先定义一个用三列二维数组表示的稀疏矩阵类如下：

//X Array.h
#include<iostream>
#include<iomanip>
using namespace std;
//定义结点类型
template<class T>
struct B
{
 int i;
 int j;
 T v;
};
//非零元素所在的行号
//非零元素所在的列号
//非零元素值

//三列二维数组表示的稀疏矩阵类
template<class T>
class X_Array
{
 private:
 int mm;
 int nn;
 int tt;
}

//类模板，T为虚拟类型

//数据成员
//稀疏矩阵行数
//稀疏矩阵列数
//稀疏矩阵中非零元素个数

B<T> * bb;
int * pos;
int * num;
public:
 void in_X_Array();
 void cp_X_Array(int, int, int, B<T>[]);
 void th_X_Array(int, int, T[]);
 void prt_X_Array();
 X_Array tran_X_Array();
 X_Array operator + (X_Array &);
 X_Array operator * (X_Array &);
};
//三列二维数组空间
//某行第一个非零元素在 b 中的下标
//某行非零元素的个数
//成员函数
//以三元组形式键盘输入稀疏矩阵非零元素
//复制三元组数组
//由一般稀疏矩阵转换
//按行输出稀疏矩阵
//稀疏矩阵转置
//稀疏矩阵相加
//稀疏矩阵相乘

下面具体讨论各种操作（各成员函数的实现）。

## 1）在稀疏矩阵类中生成三列二维数组

在稀疏矩阵类中生成三列二维数组主要是由一般的稀疏矩阵生成一个结构体类型（以三元组为元素）B的数组，其操作的大概过程如下：

首先根据稀疏矩阵中非零元素的个数动态申请一个结构体类型 B 的数组存储空间；然后以行为主将每一个非零元素的行、列、元素值依次填入数组的元素；最后根据三列二维数组构造 POS 和 NUM 向量。

在稀疏矩阵类中生成三列二维数组有以下三种途径。

（1）以三元组形式从键盘输入稀疏矩阵中各非零元素。

从键盘输入稀疏矩阵以及各非零元素信息的格式如下。

首先输入稀疏矩阵的信息，其格式为

行数<空格>列数<空格>非零元素个数<回车>
然后输入各非零元素信息，其格式为
行号<空格>列号<空格>非零元素值<回车>

其成员函数如下：

//以三元组形式从键盘输入稀疏矩阵非零元素
template<class T> {
 void X_Array<T>::in_X_Array() {
 int k, m, n;
 cout << "输入行数 列数 非零元素个数";
 cin >> mm >> nn >> tt;
 bb = new B < T > [tt]; {
 //申请三列二维数组空间
 cout << "输入行号 列号 非零元素值: <<endl;
 for (k=0; k<tt; k++) {
 //输入三元组
 { cin >> m >> n >> bb[k].v;
 bb[k].i = m - 1; bb[k].j = n - 1;
 }
 pos = new int[mm]; {
 //申请 POS 向量空间
 num = new int[mm]; {
 //申请 NUM 向量空间
 for (k=0; k<mm; k++) {
 //NUM 向量初始化
 num[k] = 0;

for (k=0; k<tt; k++)
 num[bb[k].i]=num[bb[k].i]+1;
pos[0]=0;
for (k=1; k<mm; k++)
 pos[k]=pos[k-1]+num[k-1];
return;

（2）将存有稀疏矩阵非零元素信息的三列二维数组复制到稀疏矩阵类中。其成员函数如下：

//复制三元组数组
template<class T>
void X_Array<T>::cp_X_Array(int m, int n, int t, B<T>b[])
{
 int k;
 mm=m; nn=n; tt=t;
 bb=new B<T>[tt];
 for (k=0; k<t; k++)
 {
 bb[k].i=b[k].i-1;
 pos=new int[mm];
 num=new int[mm];
 for (k=0; k<mm; k++)
 num[k]=0;
 for (k=0; k<tt; k++)
 num[bb[k].i]=num[bb[k].i]+1;
 pos[0]=0;
 for (k=1; k<mm; k++)
 pos[k]=pos[k-1]+num[k-1];
 return;
 }

（3）直接将原始的稀疏矩阵用三列二维数组表示。

在这种方法中，首先要统计该稀疏矩阵中非零元素的个数；然后申请三列二维数组存储空间；最后以行为主扫描稀疏矩阵，依次将各非零元素的信息填入三列二维数组。

其成员函数如下：

//由一般稀疏矩阵转换
template<class T> {
 void X_Array<T>::th_X_Array(int m, int n, T a[])
 {
 int k, t=0, p, q;
 T d;
 for (k=0; k<m*n; k++)
 if (a[k]!=0) t=t+1;
 mm=m; nn=n; tt=t;
 bb=new B<T>[tt];
 k=0;
 for (p=0; p<m; p++)
 for (q=0; q<n; q++)
 {
 d=a[p*n+q];
 if (d!=0)
 {
 bb[k].i=p; bb[k].j=q; bb[k].v=d;
 }
 }
 }
}
//函数模板，T为虚拟类型

//统计非零元素个数

k = k + 1;
}
}
}
pos = new int[mm];
num = new int[mm];
for (k = 0; k < mm; k++)
 num[k] = 0;
for (k = 0; k < tt; k++)
 num[bb[k].i] = num[bb[k].i] + 1;
pos[0] = 0;
for (k = 1; k < mm; k++)
 pos[k] = pos[k - 1] + num[k - 1];
return;
}
//申请POS向量空间
//申请NUM向量空间
//NUM向量初始化
//构造NUM向量
//构造POS向量
}

### 2）用三列二维数组表示后的稀疏矩阵的输出

根据给定的三列二维数组，按行判断稀疏矩阵中的每一个元素。如果该元素在三列二维数组中存在，则是非零元素，输出该非零元素值；否则输出0。

其成员函数如下：

//按行输出稀疏矩阵
template<class T>
void X_Array<T>::prt_X_Array()
{
 int k, kk, p;
 for (k=0; k<mm; k++)
 {
 p=pos[k];
 for (kk=0; kk<nn; kk++)
 if ((bb[p].i==k) && (bb[p].j==kk))
 {
 cout<<setw(8)<<bb[p].v;
 p=p+1;
 }
 }
 else cout<<setw(8)<<0;
 cout<<endl;
 }
 return;
}

#### 3）用三列二维数组表示后的稀疏矩阵的转置

m 行 n 列矩阵 A 的转置矩阵为 n 行 m 列矩阵  $ A^{T} $ 。例如：

 $$ \boldsymbol{A}=\begin{bmatrix}15&0&0&22&0&-15&0\\ 0&11&0&0&0&0&3\\ 0&0&0&-6&0&0&0\\ 0&0&0&0&0&0&0\\ 91&0&0&0&0&0&0\\ 0&0&28&0&0&0&0 \end{bmatrix} $$

的转置矩阵为

 $$ \boldsymbol{A}^{\mathrm{T}}=\left[\begin{aligned}15&\quad0&\quad0&\quad0&\quad91&\quad0\\0&\quad11&\quad0&\quad0&\quad0&\quad0\\0&\quad0&\quad0&\quad0&\quad0&\quad28\\22&\quad0&\quad-6&\quad0&\quad0&\quad0\\0&\quad0&\quad0&\quad0&\quad0&\quad0\\-15&\quad0&\quad0&\quad0&\quad0&\quad0\\0&\quad3&\quad0&\quad0&\quad0&\quad0\end{aligned}\right] $$

如果矩阵 A 与  $ A^{T} $ 分别用三列二维数组 A1 与 AT1 表示，则有

 $$ \mathrm{A}1=\begin{bmatrix}6&7&8\\ 1&1&15\\ 1&4&22\\ 1&6&-15\\ 2&2&11\\ 2&7&3\\ 3&4&-6\\ 5&1&91\\ 6&3&28\end{bmatrix},\quad\mathrm{A T}1=\begin{bmatrix}7&6&8\\ 1&1&15\\ 1&5&91\\ 2&2&11\\ 3&6&28\\ 4&1&22\\ 4&3&-6\\ 6&1&-15\\ 7&2&3\end{bmatrix} $$

由上述例子可以看出，当稀疏矩阵用三列二维数组表示时，其转置矩阵的三列二维数组可以通过交换原稀疏矩阵的三列二维数组中的第1列与第2列，然后对它进行适当的排序得到。在实际进行转置运算时，可以按如下方法进行：

按稀疏矩阵A中的列序在三列二维数组A1中扫描每一列中的所有非零元素，并将这些非零元素的信息依次存放在三列二维数组AT1中。由于矩阵A中的非零元素在A1中是以行序存放的，因此，最后得到的AT1恰好是转置矩阵AT的三列二维数组表示。

其成员函数如下：

//稀疏矩阵转置
template<class T>
X_Array<T>X_Array<T>::tran_X_Array()
{ X_Array<T>at;
int k, p, q;
at.mm=nn; at.nn=mm; at.tt=tt; //转置矩阵行、列数及非零元素个数
at.bb=new B<T>[tt]; //申请转置矩阵三列二维数组空间
k=0;
for (p=0; p<nn; p++)
{
for (q=0; q<tt; q++)
{ if (bb[q].j==p) //将非零元素信息依次存放到转置矩阵的三列二维数组中
{ at.bb[k].i=bb[q].j;
at.bb[k].j=bb[q].i;
at.bb[k].v=bb[q].v;
k=k+1;
}
}
at.pos=new int[at.mm]; //申请POS向量空间

at.num=new int[at.mm]; //申请NUM向量空间
for (k=0; k<at.mm; k++) //NUM向量初始化
at.num[k]=0;
for (k=0; k<at.tt; k++) //构造转置矩阵的NUM向量
at.num[at.bb[k].i]=at.num[at.bb[k].i]+1;
at.pos[0]=0;
for (k=1; k<at.mm; k++) //构造转置矩阵的POS向量
at.pos[k]=at.pos[k-1]+at.num[k-1];
return(at); //返回转置矩阵
}

从上述算法中可以看出，为了找出矩阵 A 中第 m 列的所有非零元素，必须将三列二维数组 A1 从头到尾扫描一遍。为了避免反复扫描 A1，还可以按三列二维数组 A1 中行的顺序进行转换，但转换后的元素不连续存放。如果能预先确定矩阵 A 中每一列（转置矩阵  $ A^{T} $ 中每一行）的每一个非零元素在三列二维数组 AT1 中应有的位置，则在对数组 A1 中的元素进行逐行转换后，便可直接放到数组 AT1 中应有的位置上去。为了确定这个应有的位置，只要先求得矩阵 A 中每一列的非零元素个数即可，其算法留给读者自行描述。

##### 4）用三列二维数组表示后的稀疏矩阵的相加

设 mc 行 nc 列稀疏矩阵 C 有 tc 个非零元素，且已经用三列二维数组表示；mb 行 nb 列稀疏矩阵 B 有 tb 个非零元素，且也已经用三列二维数组表示。求和矩阵  $ A = C + B $（用三列二维数组表示）的步骤如下：

（1）先判断两个矩阵相加的合理性。如果两个矩阵的行数不相等或列数不相等，则两个矩阵不能相加。

（2）由于事先不知道和矩阵中非零元素的个数，因此先假设和矩阵A中非零元素个数为矩阵C和矩阵B中非零元素个数之和，临时申请一个三列二维数组空间A。

（3）按行同时扫描三列二维数组表示的稀疏矩阵 C 和三列二维数组表示的稀疏矩阵 B。

即对于行号相同的两个矩阵中的非零元素如下处理：

如果列号也相同，则值相加。如果相加后值非零，则将相加结果（包括行号和列号）依次存放到临时申请的三列二维数组空间A中。如果列号不同，则将列号小的那个非零元素信息依次复制到临时申请的三列二维数组空间A中。在这个过程中，当一个矩阵中本行的所有非零元素都处理完后（进入了下一行），则将另一个矩阵中的剩余非零元素的信息也都依次复制到临时申请的三列二维数组空间A中。

（4）经过上述步骤后，已经统计到和矩阵中非零元素的个数，此时正式申请一个三列二维数组空间，用于存放和矩阵中的所有非零元素的信息。将存放在临时申请的三列二维数组空间中的信息复制到正式申请的三列二维数组空间中，最后释放临时申请的三列二维数组空间。

（5）构造用三列二维数组表示的和矩阵的 POS 向量和 NUM 向量。

其成员函数如下：

//稀疏矩阵相加
template<class T> {
//函数模板，T为虚拟类型
X_Array<T>X_Array<T>::operator + (X_Array<T>&b)

X_Array<T>c;
//定义和矩阵对象
B<T>*a;
T d;
int m, n, k, p;
if ((mm!=b.mm)||(nn!=b.nn))  cout<<"不能相加!"<<endl;
else
{ a=new B<T>[tt+b.tt];  //临时申请一个三列二维数组空间
p=0;
for (k=0; k<mm; k++)  //逐行处理
{ m=pos[k]; n=b.pos[k];
while ((bb[m].i==k) && (b.bb[n].i==k))  //行号相同
{ if (bb[m].j==b.bb[n].j)  //列号相同则相加
{ d=bb[m].v+b.bb[n].v;
if (d!=0)  //相加后非零
{ a[p].i=k; a[p].j=bb[m].j;
a[p].v=d; p=p+1;
}
m=m+1; n=n+1;
}
else if (bb[m].j<b.bb[n].j)  //列号不同则复制列号小的一项
{ a[p].i=k; a[p].j=bb[m].j;
a[p].v=bb[m].v; p=p+1;
m=m+1;
}
else
{ a[p].i=k; a[p].j=b.bb[n].j;
a[p].v=b.bb[n].v; p=p+1;
n=n+1;
}
while (bb[m].i==k)  //复制矩阵中本行剩余的非零元素
{ a[p].i=k; a[p].j=bb[m].j;
a[p].v=bb[m].v; p=p+1;
m=m+1;
}
while (b.bb[n].i==k)  //复制另一矩阵中本行剩余非零元素
{ a[p].i=k; a[p].j=b.bb[n].j;
a[p].v=b.bb[n].v; p=p+1;
n=n+1;
}
c.mm=mm; c.nn=nn; c.tt=p;
c.bb=new B<T>[p];  //申请一个三列二维数组空间
for (k=0; k<p; k++)  //复制临时三列二维数组空间中的元素
{ c.bb[k].i=a[k].i;
c.bb[k].j=a[k].j;
c.bb[k].v=a[k].v;
}
Delete[] a;  //释放临时三列二维数组空间
c.pos=new int[c.mm];  //申请POS向量空间
c.num=new int[c.mm];  //申请NUM向量空间
for (k=0; k<c.mm; k++)  //NUM向量初始化
c.num[k]=0;

for (k=0; k<c.tt; k++)
 c.num[c.bb[k].i]=c.num[c.bb[k].i]+1;
c.pos[0]=0;
for (k=1; k<c.mm; k++)
 c.pos[k]=c.pos[k-1]+c.num[k-1];
}
return(c);
//构造 NUM 向量
//构造 POS 向量
//返回相加结果

##### 5）用三列二维数组表示后的稀疏矩阵的相乘

设 ma 行 na 列稀疏矩阵 A 有 ta 个非零元素，且已经用三列二维数组表示；mb 行 nb 列稀疏矩阵 B 有 tb 个非零元素，且已经用三列二维数组表示。求乘积矩阵 C=AB（用三列二维数组表示）的步骤如下：

（1）先判断两个矩阵相乘的合理性。如果左矩阵的列数与右矩阵的行数不相等，则两个矩阵不能相乘。

（2）由于事先不知道乘积矩阵中非零元素的个数，因此先假设乘积矩阵为一般的稀疏矩阵，临时申请一个  $ ma \times nb $ 的存储空间存放乘积矩阵的所有元素（包括零元素）。

（3）依次扫描左矩阵（三列二维数组）中的每一个非零元素，根据当前非零元素的列值以及向量POS与NUM，在右矩阵（三列二维数组）中寻找所有行值与之相等的非零元素，然后将其中的每一对非零元素进行相乘，并将结果累加到乘积矩阵的相应元素中。

（4）将乘积矩阵（稀疏矩阵）转换成用三列二维数组表示，最后释放乘积矩阵的临时空间。

其成员函数如下：

//稀疏矩阵相乘
template<class T> {
 X_Array<T>X_Array<T>::operator * (X_Array &b)
 { X_Array<T>cc;
 int k, m, n, p, t;
 T *c;
 if (nn != b.mm)
 cout << "两矩阵无法相乘!" <<endl;
 else
 { c = new T[mm * b.nn];
 k = 0;
 for (m = 0; m < mm; m++)
 for (n = 0; n < b.nn; n++)
 { c[k] = 0; k = k + 1; }
 for (m = 0; m < tt; m++)
 { k = bb[m].j;
 n = b.pos[k];
 t = b.pos[k] + b.num[k];
 while (n != t)
 { p = bb[m].i * b.nn + b.bb[n].j; // 在乘积矩阵中的位置
 c[p] = c[p] + bb[m].v * b.bb[n].v; // 累加非零元素的乘积
 n = n + 1;
 }
 }

cc.th_X_Array(mm, b.nn, c); //由一般稀疏矩阵转换成用三列二维数组表示
delete[] c; //释放乘积矩阵的临时空间
}
return(cc); //返回用三列二维数组表示的乘积矩阵
}

下列主函数依次实现以下操作：
定义稀疏矩阵类对象，矩阵元素为双精度型。
复制三元组数组 a 生成稀疏矩阵类对象 x，然后输出稀疏矩阵 x。
求稀疏矩阵 x 的转置矩阵 xt，然后输出稀疏矩阵 xt。
以三元组形式从键盘输入稀疏矩阵 y 的非零元素，然后输出稀疏矩阵 y。
求  $ z = x + y $，然后输出稀疏矩阵 z。
求  $ c = x \times xt $，然后输出稀疏矩阵 c。

//ch2_20.cpp
#include "X_Array.h"
int main()
{
 B<double>a[8]={{1,3,3.0},{1,8,1.0},{3,1,9.0},{4,5,7.0},
 {5,7,6.0},{6,4,2.0},{6,6,3.0},{7,3,5.0}};
 X_Array<double>x, y, z, xt, c;
 //定义稀疏矩阵类对象，矩阵元素为双精度型
 x.cp_X_Array(7, 8, 8, a); //复制三元组数组生成稀疏矩阵类对象 x
 cout<<"输出稀疏矩阵 x:" <<endl;
 x.prt_X_Array();
 xt=x.tran_X_Array(); //稀疏矩阵转置
 cout<<"输出稀疏矩阵 x 的转置 xt:" <<endl;
 xt.prt_X_Array();
 y.in_X_Array(); //以三元组形式从键盘输入稀疏矩阵非零元素
 cout<<"输出稀疏矩阵 y:" <<endl;
 y.prt_X_Array();
 z=x+y; //稀疏矩阵相加
 cout<<"输出稀疏矩阵 z=x+y:" <<endl;
 z.prt_X_Array();
 c=x*xt; //稀疏矩阵相乘
 cout<<"输出 c=x*xt:"<<endl;
 c.prt_X_Array();
 return 0;
}

上述程序的运行结果如下（带有下画线的为键盘输入）：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="8">输出稀疏矩阵 x:</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td colspan="8">输出稀疏矩阵 x的转置xt:</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>输入行数</td><td style='text-align: center; word-wrap: break-word;'>列数</td><td colspan="5">非零元素个数：7 8 2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>输入行号</td><td style='text-align: center; word-wrap: break-word;'>列号</td><td colspan="5">非零元素值：</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2 4 5</td><td style='text-align: center; word-wrap: break-word;'></td><td colspan="5"></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>5 7 8</td><td style='text-align: center; word-wrap: break-word;'></td><td colspan="5"></td></tr><tr><td colspan="7">输出稀疏矩阵 y：</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

## 2. 稀疏矩阵的线性链表表示

由前面的叙述可以看出，用三列二维数组表示稀疏矩阵后，如果稀疏矩阵的运算结果中非零元素的个数不发生变化（如矩阵转置），则运算结果可直接采用三列二维数组表示的形式；如果运算结果中非零元素的个数发生了变化（如矩阵相乘），则运算结果只能用一般的稀疏矩阵表示，如有必要，则再用三列二维数组表示，这是因为在用三列二维数组表示稀疏矩阵时，必须事先知道非零元素的个数，以便申请三列二维数组存储空间。

实际上，表示稀疏矩阵中各非零元素信息的三元组还可以组织成线性链表的形式。这样，当产生新的非零元素时，可以直接申请一个存放三元组的结点，然后顺序链接到线性链表中。同样，如果通过运算，原来的非零元素变成了零元素，则可以从线性链表中删除这个结点。显然，将表示稀疏矩阵中各非零元素信息的三元组组织成线性链表，可以更方便地进行稀疏矩阵的运算。

需要特别指出的是，在用三元组链表表示稀疏矩阵后，不必生成 POS 向量和 NUM 向量。

下面具体讨论用三元组链表表示稀疏矩阵的操作，包括：

三元组链表的生成；

用三元组链表表示后的稀疏矩阵的输出；

用三元组链表表示后的稀疏矩阵的转置；

用三元组链表表示后的稀疏矩阵的相加。

首先定义一个用三元组链表表示的稀疏矩阵类如下：

//XL_Array.h
#include<iostream>
#include<iomanip>
using namespace std;
//定义三元组链表结点类型
template<class T>
struct B
{
 int i;
 int j;
 T v;
 B<T> * next;
};
//非零元素所在的行号
//非零元素所在的列号
//非零元素值
//指向下一个结点的指针域

//三元组链表表示的稀疏矩阵类
template<class T>
class XL_Array
{
 private:
 int mm;
 int nn;
 int tt;
 B<T> * head;
 public:
 XL_Array() {
 head = NULL;
 return;
 }
 void in_XL_Array();
 void th_XL_Array(int, int, T[]);
 void prt_XL_Array();
 XL_Array tran_XL_Array();
 XL_Array operator + (XL_Array(&); //稀疏矩阵转置
 //稀疏矩阵相加
 }
}

下面具体讨论各种操作（各成员函数的实现）。

1）在稀疏矩阵类中生成三元组链表

在稀疏矩阵类中生成三元组链表的大概操作过程如下：

对于稀疏矩阵中每一个非零元素（以行为主）申请一个结点，然后将每一个非零元素的行、列、元素值依次填入该结点的数据域，最后将该结点链接到链表的链尾。

在稀疏矩阵类中生成三元组链表有以下两种途径。

（1）以三元组形式从键盘输入稀疏矩阵中各非零元素。

从键盘输入稀疏矩阵以及各非零元素信息的格式如下。

首先输入稀疏矩阵的信息，其格式为

行数<空格>列数<空格>非零元素个数<回车>

然后输入各非零元素信息，其格式为

行号<空格>列号<空格>非零元素值<回车>...

其成员函数如下：

//以三元组形式从键盘输入稀疏矩阵非零元素
template<class T>
void XL_Array<T>::in_XL_Array()
{
 int k, m, n;
 T d;
 B<T>*p, *q;
 cout<<"输入行数 列数 非零元素个数：";
 cin >> mm >> nn >> tt;
 q=NULL;
 cout<<"输入行号 列号 非零元素值："<endl;
 for (k=0; k<tt; k++)
{
 cin >> m >> n >> d;
 p=new B<T>;
 //申请一个三元组结点
 p->i=m-1; p->j=n-1; p->v=d; p->next=NULL;
 if (head==NULL) head=p;
 else q->next=p;
 q=p;
 }
 return;
}

（2）直接将原始的稀疏矩阵用三列二维数组表示。

在这种方法中，只需以行为主扫描稀疏矩阵，对于稀疏矩阵中每一个非零元素（以行为主）申请一个结点；然后将每一个非零元素的行、列、元素值依次填入该结点的数据域；最后将该结点链接到链表的链尾。

其成员函数如下：

//由一般稀疏矩阵转换
template<class T>
void XL_Array<T>::th_XL_Array(int m, int n, T a[])
{
 int t=0, p, q;
 B<T>*s, *k;
 T d;
 mm=m; nn=n;
 k=NULL;
 for (p=0; p<m; p++)
 for (q=0; q<n; q++)
 {
 d=a[p*n+q];
 if (d!=0)
 {
 s=new B<T>;
 s->i=p; s->j=q; s->v=d;
 s->next=NULL;
 if (head==NULL) head=s;
 else k->next=s;
 k=s;
 t=t+1;
 }
 }
}
//函数模板，T为虚拟类型

//申请一个三元组结点

}
tt=t;
return;
}

### 2）用三元组链表表示后的稀疏矩阵的输出

按行判断稀疏矩阵中的每一个元素，如果在三元组链表有，则是非零元素，输出该非零元素值，否则输出0。

其成员函数如下：

//按行输出稀疏矩阵
template<class T>
void XL_Array<T>::prt_XL_Array()
{
 int k, kk;
 B<T> * p;
 p=head;
 for (k=0; k<mm; k++)
 {
 for (kk=0; kk<nn; kk++)
 {
 if (p!=NULL)
 {
 if ((p->i==k) && (p->j==kk))
 {
 cout<<setw(8)<<p->v;
 p=p->next;
 }
 }
 else cout<<setw(8)<<0;
 }
 else cout<<setw(8)<<0;
 }
 cout<<endl;
}
//函数模板，T为虚拟类型
//按行输出
//输出一行
//输出非零元素
//输出0
//输出0
return;
}

#### 3）用三元组链表表示后的稀疏矩阵的转置

按稀疏矩阵中的列序在三元组链表中扫描每一列中的所有非零元素，并将这些非零元素的信息依次链接到转置矩阵的三元组链表中。由于原矩阵中的非零元素在三元组链表中是以行序链接的，因此，最后得到的恰好是转置矩阵的三元组链表。

其成员函数如下：

//稀疏矩阵转置
template<class T>
 XL_Array<T>XL_Array<T>::tran_XL_Array()
{ XL_Array<T>at;
 int p;
 B<T>*s, *k, *q;
 at.mm=nn; at.nn=mm; at.tt=tt;
 k=NULL;
 for (p=0; p<nn; p++)
 for (q=head; q!=NULL; q=q->next)
 { if (q->j==p)
 { s=new B<T>;
 s->i=q->j;
 s->j=q->i;
 }}
//函数模板，T为虚拟类型
//定义转置矩阵对象
//转置矩阵行、列数及非零元素个数

s->v=q->v;
s->next=NULL;
if (k==NULL) at.head=s;
else k->next=s;
k=s;
}
}
return(at); //返回转置矩阵
}
