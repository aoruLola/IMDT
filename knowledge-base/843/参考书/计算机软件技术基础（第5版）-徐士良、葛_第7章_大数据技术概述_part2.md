# 7.3.3 逐步回归分析

> 来源：docs/08_电子书/计算机软件技术基础（第5版）-徐士良、葛兵.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：d53505b4754eaf37


逐步回归分析的基本思想是：对多元线性回归进行因子筛选，最后给出一定显著性水平下各因子均为显著的回归方程中的诸回归系数、偏回归平方和、估计的标准偏差、复相关系数以及F-检验值、各回归系数的标准偏差、因变量条件期望值的估计值与残差。

设 n 个自变量为  $ x_{j}(j=0,1,\cdots,n-1) $，因变量为 y。有 k 个观测点为

 $$ (x_{i0},x_{i1},\cdots,x_{i,n-1},y_{i}),\quad i=0,1,\cdots,k-1 $$

根据最小二乘原理，y 的估计值为

 $$ \hat{y}=b_{i_{0}}x_{i_{0}}+b_{i_{1}}x_{i_{1}}+\cdots+b_{i_{l}}x_{i_{l}}+b_{n} $$

其中， $ 0 \leqslant i_{0} < i_{1} < \cdots < i_{l} \leqslant n - 1 $，且各  $ x_{it} (t = 0, 1, \cdots, l) $ 是从 n 个自变量  $ x_{j} (j = 0, 1, \cdots, n-1) $ 中按一定显著性水平筛选出的统计检验为显著的因子，其筛选过程如下。

（1）首先作出 $  (n+1) \times (n+1)  $的规格化的系数初始相关阵

 $$ \begin{aligned}&\boldsymbol{R}=\begin{bmatrix}\\ &r_{00}&r_{01}&\cdots&r_{0,n-1}&r_{0y}\\&r_{10}&r_{11}&\cdots&r_{1,n-1}&r_{1y}\\&\vdots&\vdots&&\vdots&\vdots\\&r_{n-1,0}&r_{n-1,1}&\cdots&r_{n-1,n-1}&r_{n-1,y}\\&r_{y0}&r_{y1}&\cdots&r_{y,n-1}&r_{yy}\\ &\end{bmatrix}\\ \end{aligned} $$

矩阵中各元素为

 $$ r_{ij}=\frac{d_{ij}}{d_{i}d_{j}}=\frac{\sum\limits_{l=0}^{k-1}(x_{li}-\bar{x}_{i})(x_{lj}-\bar{x}_{j})}{\sqrt{\sum\limits_{l=0}^{k-1}(x_{li}-\bar{x}_{i})^{2}}}\bullet\sqrt{\sum\limits_{l=0}^{k-1}(x_{lj}-\bar{x}_{j})^{2}},\quad i,j=0,1,\cdots,n-1,n $$

其中，下标与 n 对应的是因变量 y。式中

 $$ \bar{x}_{i}=\frac{1}{k}\sum_{l=0}^{k-1}x_{li},\quad i=0,1,\cdots,n-1,n $$

（2）计算偏回归平方和 $ V_{i}=\frac{r_{iy}r_{yi}}{r_{ii}},i=0,1,\cdots,n-1 $

（3）若 $ V_{i}<0 $，则对应的 $ x_{i} $为已被选入回归方程的因子。

从所有  $ V_{i}<0 $ 的  $ V_{i} $ 中选出  $ V_{\min}=\min|V_{i}| $，其对应的因子为  $ x_{\min} $。然后检验因子  $ x_{\min} $ 的显著性。若

 $$ \frac{\varphi V_{\min}}{r_{yy}}<F_{2} $$

则剔除因子  $ x_{min} $，并对系数相关阵 R 进行该因子的消元变换。转(2)。

（4）若 $ V_{i}>0 $，则对应的 $ x_{i} $为尚待选入回归方程的因子。

从所有  $ V_{i} > 0 $ 的  $ V_{i} $ 中选出  $ V_{max} = \max |V_{i}| $，其对应的因子为  $ x_{max} $。然后检验因子  $ x_{max} $ 的显著性。若

 $$ \frac{(\varphi-1)V_{\max}}{r_{yy}-V_{\max}}\geqslant F_{1} $$

则因子  $ x_{max} $ 应选入，并对系数相关阵 R 进行该因子的消元变换。转(2)。

上述过程一直进行到无因子可剔可选为止。

在以上步骤中， $ \varphi $ 为相应的残差平方和的自由度。 $ F_{1} $ 与  $ F_{2} $ 均是 F-分布值，它们取决于观测点数、已选入的因子数以及取舍显著性水平  $ \alpha $。通常取  $ F_{1} > F_{2} $。当选入单个因子的显著性水平取为  $ \alpha $ 时，可以从 F-分布表中取 m=1，观测点数为 n 时的  $ F_{\alpha} $ 为  $ F_{2} $，而取 m=1，观测点数为 n-1 时的  $ F_{\alpha} $ 为  $ F_{1} $。

当要剔除或选入某个因子  $ x_{1} $ 时，均需对系数相关阵 R 进行消元变换，其算法如下：

 $$ r_{ij}=r_{ij}-\frac{r_{ij}}{r_{il}}r_{il},\quad i,j=0,1,\cdots,n;i,j\neq l $$

 $$ r_{ij}=\frac{r_{ij}}{r_{il}},\quad j=0,1,\cdots,n;j\neq l $$

 $$ r_{i l}=-\frac{r_{i l}}{r_{l l}},\quad i=0,1,\cdots,n;i\neq l $$

 $$ r_{u}=\frac{1}{r_{u}} $$

当筛选结束时，就可得出规格化回归方程的各回归系数  $ b_{0}, b_{1}, \cdots, b_{n} $，其中值为0的系数表示对应的自变量可剔除。

回归模型的各有关值由下列各式计算。

（1）选入回归方程的各因子的回归系数：

 $$ b_{i}=\frac{d_{y}}{d_{i}}r_{iy},\quad i=0,1,\cdots,n-1 $$

（2）回归方程的常数项：

 $$ b_{n}=\bar{y}-\sum_{i=0}^{n-1}b_{i}\bar{x}_{i} $$

（3）各因子的偏回归平方和：

 $$ V_{i}=\frac{r_{iy}r_{yi}}{r_{ii}},\quad i=0,1,\cdots,n-1 $$

（4）估计的标准偏差：

 $$ s=d_{y}\sqrt{\frac{r_{yy}}{\varphi}} $$

（5）各回归系数的标准偏差：

 $$ s_{i}=\frac{s\sqrt{r_{ii}}}{d_{i}},\quad i=0,1,\cdots,n-1 $$

（6）复相关系数：

 $$ C=\sqrt{1-r_{yy}} $$

（7）F-检验值：

 $$ F=\frac{\varphi(1-r_{yy})}{(k-\varphi-1)r_{yy}} $$

（8）残差平方和：

 $$ q=d_{y}^{2}r_{yy} $$

（9）因变量条件期望值的估计值：

 $ e_i = b_n + \sum_{j=0}^{n-1} b_j x_{ij}, \quad i = 0,1,\cdots,k-1 $

（10）残差：

 $$ \delta_{i}=y_{i}-e_{i},i=0,1,\cdots,k-1 $$

算法的 C++ 描述如下：

//逐步回归分析.cpp
#include <iostream>
#include <cmath>
#include <fstream>
#include <iomanip>
using namespace std;
class GRAD
{
 private:
 int n;
 int k;
 double *x;
 double f1;
 double f2;
 double *xx;
 double *b;
 double *v;
 double *s;
 double c;
 double f;
 double *ye;
 double *yr;
 double *r;

 public:
 GRAD()
 {
 {f1=0; f2=0; c=0; f=0;}
 }
 void grad_reg();
 void arrayint(double ,double,int,int,double *) ;
 void datainput(char *) ;
 void dataoutput(char *) ;
 ~GRAD()
 {
 {delete[] x; delete[] xx; delete[] b; delete[] v; delete[] s;
 delete[] ye; delete[] yr; delete[] r; }
 };

 //逐步回归分析

 //从数组读入数据
 //从文件读入数据
 //输出结果
 //析构函数

}

int i,j,ii,m,imi,imx,l,it;
double z,phi,sd,vmi,vmx,q,fmi,fmx,eps=1.0e-30;
m=n+1; q=0.0;
for (j=0; j<=n; j++)
{
 z=0.0;

for (i=0; i<=k-1; i++) z=z+x[i*m+j]/k;
xx[j]=z;
}
for (i=0; i<=n; i++)
for (j=0; j<=i; j++)
{
 z=0.0;
 for (ii=0; ii<=k-1; ii++)
 z=z+(x[ii*m+j]-xx[i])*(x[ii*m+j]-xx[j])
 r[i*m+j]=z;
}
for (i=0; i<=n; i++) ye[i]=sqrt(r[i*m+i]);
for (i=0; i<=n; i++)
for (j=0; j<=i; j++)
{
 r[i*m+j]=r[i*m+j]/(ye[i]*ye[j]);
 r[j*m+i]=r[i*m+j];
}
phi=k-1.0;
sd=ye[n]/sqrt(k-1.0);
it=1;
while (it==1)
{
 it=0;
 vmi=1.0e+35; vmx=0.0;
 imi=-1; imx=-1;
 for (i=0; i<=n; i++)
 {
 v[i]=0.0; b[i]=0.0; s[i]=0.0;
 for (i=0; i<=n-1; i++)
 if (r[i*m+i]>=eps)
 {
 v[i]=r[i*m+n]*r[n*m+i]/r[i*m+i];
 if (v[i]>=0.0)
 {
 if (v[i]>vmx) { vmx=v[i]; imx=i; }
 else
 b[i]=r[i*m+n]*ye[n]/ye[i];
 s[i]=sqrt(r[i*m+i])*sd/ye[i];
 if (fabs(v[i])<vmi)
 { vmi=fabs(v[i]); imi=i; }
 }
 }
 if (phi!=n-1.0)
 {
 z=0.0;
 for (i=0; i<=n-1; i++) z=z+b[i]*xx[i];
 b[n]=xx[n]-z; s[n]=sd; v[n]=q;
 }
 else { b[n]=xx[n]; s[n]=sd; }
 fmi=vmi*phi/r[n*m+n];
 fmx=(phi-1.0)*vmx/(r[n*m+n]-vmx);

if ((fmi<f2) || (fmx>=f1))
{
 if (fmi<f2) { phi=phi+1.0; l=imi;}
 else { phi=phi-1.0; l=imx;}
 for (i=0; i<=n; i++)
 if (i!=1)
 for (j=0; j<=n; j++)
 if (j!=1)
 r[i*m+j]=r[i*m+j]-(r[1*m+j]/r[1*m+1])*r[i*m+1];
 for (j=0; j<=n; j++)
 if (j!=1) r[1*m+j]=r[1*m+j]/r[1*m+1];
 for (i=0; i<=n; i++)
 if (i!=1) r[i*m+1]=-r[i*m+1]/r[1*m+1];
 r[1*m+1]=1.0/r[1*m+1];
 q=r[n*m+n]*ye[n]*ye[n];
 sd=sqrt(r[n*m+n]/phi)*ye[n];
 c=sqrt(1.0-r[n*m+n]);
 f=(phi*(1.0-r[n*m+n]))/(k-phi-1.0)*r[n*m+n]);
 it=1;
}
}
for (i=0; i<=k-1; i++)
{
 z=0.0;
 for (j=0; j<=n-1; j++) z=z+b[j]*x[i*m+j];
 ye[i]=b[n]+z; yr[i]=x[i*m+n]-ye[i];
}
return;
}
//从数组读入数据
//ff1
//ff2
//nn
//kk
//xxx[]
//
void GRAD::arrayint(double ff1, double ff2, int nn, int kk, double *xxx)
{
 int i, j, m;
 f1=ff1; f2=ff2;
 n=nn; k=kk;
 x=new double[k*(n+1)]; //动态分配内存
 xx=new double[n+1];
 b=new double[n+1];
 v=new double[n+1];
 s=new double[n+1];
 ye=new double[k];
 yr=new double[k];
 r=new double[(n+1)*(n+1)];
 m=0;
 for (i=0; i<k; i++) //数据从数组读入
}

for (j=0; j<n; j++)
{ x[m]=xxx[m]; m=m+1; }
x[m]=xxx[m]; m=m+1;
}
return ;
}

//从文件读入数据
//c
数据文件名
void GRAD::dataintput(char *c1)
{
int i,j,m;
ifstream fin(c1);
fin >> f1; fin >> f2;
fin >> n; fin >> k;
x=new double[k * (n+1)]; //动态分配内存
xx=new double[n+1];
b=new double[n+1];
v=new double[n+1];
s=new double[n+1];
ye=new double[k];
yr=new double[k];
r=new double[(n+1) * (n+1)];
m=0;
for(i=0; i<k; i++) //从文件读入数据
{
for(j=0; j<n; j++)
{
 fin >> x[m]; m=m+1; }
 fin >> x[m]; m=m+1;
}
fin.close(); //数据读入结束
return ;
}

//结果输出
//c
结果文件名
void GRAD::dataoutput(char *c1) //结果输出
{
 int i,j;
 ofstream fout(c1);
 fout <<"f1=" <<f1 <<"f2=" <<f2 <<endl;
 fout <<"观测值: " <<endl;
 for (i=0; i<=k-1; i++)
{
 for (j=0; j<=n-1; j++)
 fout <<"x("<<j<<")="<<setw(5) <<x[i * (n+1)+j];
 fout <<"y("<<i<<")="<<x[i * (n+1)+n] <<endl;
}

fout <<"平均值：" <<end1;
for (i=0; i<=n-1; i++)
fout <<"x("<<i<<")="<<xx[i];
fout <<"y=" <<xx[n] <<end1;
fout <<"回归系数：" <<end1;
for (i=0; i<=n; i++)
cout <<"b("<<i<<")="<<b[i] <<end1;
fout <<"各因子的偏回归平方和" <<end1;
for (i=0; i<=n-1; i++)
fout <<"v("<<i<<")="<<v[i] <<end1;
fout <<"残差平方和=" <<v[4] <<end1;
cout <<"各因子回归系数的标准偏差：" <<end1;
for (i=0; i<=n-1; i++)
fout <<"s("<<i<<")="<<s[i] <<end1;
fout <<"估计的标准偏差=" <<s[n] <<end1;
fout <<"复相关系数c=" <<c<<end1;
fout <<"F-检验值f=" <<f<<end1;
fout <<"因变量条件期望值的估计值以及观测值的残差：" <<end1;
for (i=0; i<=12; i++)
fout <<"ye("<<i<<")="<<ye[i]
<<" yr("<<i<<")="<<yr[i] <<end1;
fout <<"系数相关矩阵：" <<end1;
for (i=0; i<=n; i++)
{
for (j=0; j<=n; j++)
fout <<setw(11) <<r[i*(n+1)+j];
fout <<end1;
}
fout <<end1;
fout.close();
//同时在屏幕输出
cout <<"f1=" <<f1<<"f2=" <<f2<<end1;
cout <<"观测值：" <<end1;
for (i=0; i<=k-1; i++)
{
for (j=0; j<=n-1; j++)
cout <<"x("<<j<<")="<<setw(5) <<x[i*(n+1)+j];
cout <<"y("<<i<<")="<<x[i*(n+1)+n] <<end1;
}
cout <<"平均值：" <<end1;
for (i=0; i<=n-1; i++)
cout <<"x("<<i<<")="<<xx[i];
cout <<"y=" <<xx[n] <<end1;
cout <<"回归系数：" <<end1;
for (i=0; i<=n; i++)
cout <<"b("<<i<<")="<<b[i] <<end1;
cout <<"各因子的偏回归平方和" <<end1;
for (i=0; i<=n-1; i++)
cout <<"v("<<i<<")="<<v[i] <<end1;
cout <<"残差平方和=" <<v[n] <<end1;
cout <<"各因子回归系数的标准偏差：" <<end1;
for (i=0; i<=n-1; i++)
cout <<"s("<<i<<")="<<s[i] <<end1;
cout <<"估计的标准偏差=" <<s[n] <<end1;
cout <<"复相关系数c=" <<c<<end1;
cout <<"F-检验值f=" <<f<<end1;
cout <<"因变量条件期望值的估计值以及观测值的残差：" <<end1;
for (i=0; i<=k-1; i++)
cout <<"ye("<<i<<")="<<ye[i]
<<" yr("<<i<<")="<<yr[i] <<end1;
cout <<"系数相关矩阵：" <<end1;
for (i=0; i<=n; i++)
{

for (j=0; j<=n; j++) cout <<setw(11) <<r[1 * (n+1)+j];
cout <<endl;
}
cout <<endl;
return ;
}
在用文件读入数据时，数据在文件中的顺序为：
<f1><△><f2><△>
<m><△><n><△>
<x_{00}><△><x_{01}><△><x_{02}><△>…<x_{0,m-1}><△><y_{0}><△>
<x_{10}><△><x_{11}><△><x_{12}><△>…<x_{1,m-1}><△><y_{1}><△>
...
<x_{n-1,0}><△><x_{n-1,1}><△><x_{n-1,2}><△>…<x_{n-1,m-1}><△><y_{n-1}><回车换行>

其中， $ \triangle $表示空格或回车换行。即文件中的数据依次为：F-分布值  $ f_{1} $，F-分布值  $ f_{2} $，自变量个数 m，观测数据组数 n，n 组自变量 x 与因变量 y 的值，且每两个值之间用一个空格或回车换行分开，最后以回车换行结束。

例 7.4 设 4 个自变量为  $ x_{0}, x_{1}, x_{2}, x_{3} $，因变量为 y，13 个观测点值如下。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>k</td><td style='text-align: center; word-wrap: break-word;'>$ x_0 $</td><td style='text-align: center; word-wrap: break-word;'>$ x_1 $</td><td style='text-align: center; word-wrap: break-word;'>$ x_2 $</td><td style='text-align: center; word-wrap: break-word;'>$ x_3 $</td><td style='text-align: center; word-wrap: break-word;'>y</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>7.0</td><td style='text-align: center; word-wrap: break-word;'>26.0</td><td style='text-align: center; word-wrap: break-word;'>6.0</td><td style='text-align: center; word-wrap: break-word;'>60.0</td><td style='text-align: center; word-wrap: break-word;'>78.5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1.0</td><td style='text-align: center; word-wrap: break-word;'>29.0</td><td style='text-align: center; word-wrap: break-word;'>15.0</td><td style='text-align: center; word-wrap: break-word;'>52.0</td><td style='text-align: center; word-wrap: break-word;'>74.3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>11.0</td><td style='text-align: center; word-wrap: break-word;'>56.0</td><td style='text-align: center; word-wrap: break-word;'>8.0</td><td style='text-align: center; word-wrap: break-word;'>20.0</td><td style='text-align: center; word-wrap: break-word;'>104.3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>11.0</td><td style='text-align: center; word-wrap: break-word;'>31.0</td><td style='text-align: center; word-wrap: break-word;'>8.0</td><td style='text-align: center; word-wrap: break-word;'>47.0</td><td style='text-align: center; word-wrap: break-word;'>87.6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>7.0</td><td style='text-align: center; word-wrap: break-word;'>52.0</td><td style='text-align: center; word-wrap: break-word;'>6.0</td><td style='text-align: center; word-wrap: break-word;'>33.0</td><td style='text-align: center; word-wrap: break-word;'>95.9</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>11.0</td><td style='text-align: center; word-wrap: break-word;'>55.0</td><td style='text-align: center; word-wrap: break-word;'>9.0</td><td style='text-align: center; word-wrap: break-word;'>22.0</td><td style='text-align: center; word-wrap: break-word;'>109.2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>3.0</td><td style='text-align: center; word-wrap: break-word;'>71.0</td><td style='text-align: center; word-wrap: break-word;'>17.0</td><td style='text-align: center; word-wrap: break-word;'>6.0</td><td style='text-align: center; word-wrap: break-word;'>102.7</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>1.0</td><td style='text-align: center; word-wrap: break-word;'>31.0</td><td style='text-align: center; word-wrap: break-word;'>22.0</td><td style='text-align: center; word-wrap: break-word;'>44.0</td><td style='text-align: center; word-wrap: break-word;'>72.5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>2.0</td><td style='text-align: center; word-wrap: break-word;'>54.0</td><td style='text-align: center; word-wrap: break-word;'>18.0</td><td style='text-align: center; word-wrap: break-word;'>22.0</td><td style='text-align: center; word-wrap: break-word;'>93.1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>21.0</td><td style='text-align: center; word-wrap: break-word;'>47.0</td><td style='text-align: center; word-wrap: break-word;'>4.0</td><td style='text-align: center; word-wrap: break-word;'>26.0</td><td style='text-align: center; word-wrap: break-word;'>115.9</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>1.0</td><td style='text-align: center; word-wrap: break-word;'>40.0</td><td style='text-align: center; word-wrap: break-word;'>23.0</td><td style='text-align: center; word-wrap: break-word;'>34.0</td><td style='text-align: center; word-wrap: break-word;'>83.8</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>11.0</td><td style='text-align: center; word-wrap: break-word;'>66.0</td><td style='text-align: center; word-wrap: break-word;'>9.0</td><td style='text-align: center; word-wrap: break-word;'>12.0</td><td style='text-align: center; word-wrap: break-word;'>113.3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>10.0</td><td style='text-align: center; word-wrap: break-word;'>68.0</td><td style='text-align: center; word-wrap: break-word;'>8.0</td><td style='text-align: center; word-wrap: break-word;'>12.0</td><td style='text-align: center; word-wrap: break-word;'>109.4</td></tr></table>

对于不同的  $ F_{1} $ 与  $ F_{2} $ 值进行逐步回归分析。

当取 $ \alpha=0.05 $时，查F-分布表得 $ F_{1}=4.75,F_{2}=4.67 $

数据文件 grad_regl.in 的内容如下：

4.75 4.67
4 13
7 26 6 60 78.5
1 29 15 52 74.3
11 56 8 20 104.3
11 31 8 47 87.6

7 52 6 33 95.9
11 55 9 22 109.2
3 71 17 6 102.7
1 31 22 44 72.5
2 54 18 22 93.1
21 47 4 26 115.9
1 40 23 34 83.8
11 66 9 12 113.3
10 68 8 12 109.4

主函数程序如下：

//逐步回归分析例1
#include <iostream>
#include <cmath>
#include <fstream>
#include <iomanip>
// #include "逐步回归分析.cpp"
using namespace std;
int main()
{
 char *c1, *c2;
 GRAD h;
 c1="grad_reg1.in";
 c2="grad_reg1.out";
 h.dataintput(c1);
 h.grad_reg();
 h.dataoutput(c2);
 return 0;
}

运行结果存放在文件 grad_regl.out 中，其内容如下：

f1=4.75 f2=4.67
观测值：
x(0)= 7 x(1)= 26 x(2)= 6 x(3)= 60 y(0)=78.5
x(0)= 1 x(1)= 29 x(2)= 15 x(3)= 52 y(1)=74.3
x(0)= 11 x(1)= 56 x(2)= 8 x(3)= 20 y(2)=104.3
x(0)= 11 x(1)= 31 x(2)= 8 x(3)= 47 y(3)=87.6
x(0)= 7 x(1)= 52 x(2)= 6 x(3)= 33 y(4)=95.9
x(0)= 11 x(1)= 55 x(2)= 9 x(3)= 22 y(5)=109.2
x(0)= 3 x(1)= 71 x(2)= 17 x(3)= 6 y(6)=102.7
x(0)= 1 x(1)= 31 x(2)= 22 x(3)= 44 y(7)=72.5
x(0)= 2 x(1)= 54 x(2)= 18 x(3)= 22 y(8)=93.1
x(0)= 21 x(1)= 47 x(2)= 4 x(3)= 26 y(9)=115.9
x(0)= 1 x(1)= 40 x(2)= 23 x(3)= 34 y(10)=83.8
x(0)= 11 x(1)= 66 x(2)= 9 x(3)= 12 y(11)=113.3
x(0)= 10 x(1)= 68 x(2)= 8 x(3)= 12 y(12)=109.4
平均值：
x(0)=7.46154 x(1)=48.1538 x(2)=11.7692 x(3)=30 y=95.42

回归系数如下：

各因子的偏回归平方和

v(0) = -0.31241

v(1) = -0.44473

v(2) = 0.0036063

v(3) = 0.00365708

残差平方和 = 57.9045

s(0) = 0.121301

s(1) = 0.0458547

s(2) = 0

s(3) = 0

估计的标准偏差 = 2.40634

复相关系数 c = 0.989282

F-检验值 f = 229.504

因变量条件期望值的估计值以及观测值的残差如下：

ye(0)=80.074 yr(0)=-1.574
ye(1)=73.2509 yr(1)=1.04908
ye(2)=105.815 yr(2)=-1.51474
ye(3)=89.2585 yr(3)=-1.65848
ye(4)=97.2925 yr(4)=-1.39251
ye(5)=105.152 yr(5)=4.04751
ye(6)=104.002 yr(6)=-1.30205
ye(7)=74.5754 yr(7)=-2.07542
ye(8)=91.2755 yr(8)=1.82451
ye(9)=114.538 yr(9)=1.36246
ye(10)=80.5357 yr(10)=3.26433
ye(11)=112.437 yr(11)=0.862756
ye(12)=112.293 yr(12)=-2.89344

## 系数相关阵如下：

1.05513 -0.241181 -0.835985 -0.0243182 0.574137
-0.241181 1.05513 0.0518466 -0.967396 0.685017
0.835985 -0.0518466 0.318256 -0.125207 0.0338781
0.0243182 0.967396 -0.125207 0.0527981 -0.0138956
-0.574137 -0.685017 0.0338781 -0.0138956 0.0213216

当取 $ \alpha=0.25 $时，查F-分布表得 $ F_{1}=1.46,F_{2}=1.45 $。

如果此时在主函数中用数组读入数据，则主函数程序如下：

//逐步回归分析例2
#include <iostream>
#include <cmath>
#include <fstream>
#include <iomanip>
#include "逐步回归分析.cpp"
using namespace std;
int main()
{
double x[13][5]={
{7.0,26.0,6.0,60.0,78.5},

{1.0,29.0,15.0,52.0,74.3},
{11.0,56.0,8.0,20.0,104.3},
{11.0,31.0,8.0,47.0,87.6},
{7.0,52.0,6.0,33.0,95.9},
{11.0,55.0,9.0,22.0,109.2},
{3.0,71.0,17.0,6.0,102.7},
{1.0,31.0,22.0,44.0,72.5},
{2.0,54.0,18.0,22.0,93.1},
{21.0,47.0,4.0,26.0,115.9},
{1.0,40.0,23.0,34.0,83.8},
{11.0,66.0,9.0,12.0,113.3},
{10.0,68.0,8.0,12.0,109.4}};
char * c2;
GRAD h;
c2="grad_reg2.out"; //结果文件名
h.arrayint(1.46,1.45,4,13, &x[0][0]); //从数组读入数据
h.grad_reg(); //逐步回归分析
h.dataoutput(c2); //结果输出
return 0;
}

运行结果存放在文件 grad_reg2.out 中，其内容如下：

f1 = 1.46  f2 = 1.45
观测值：
x(0) = 7  x(1) = 26  x(2) = 6  x(3) = 60  y(0) = 78.5
x(0) = 1  x(1) = 29  x(2) = 15  x(3) = 52  y(1) = 74.3
x(0) = 11  x(1) = 56  x(2) = 8  x(3) = 20  y(2) = 104.3
x(0) = 11  x(1) = 31  x(2) = 8  x(3) = 47  y(3) = 87.6
x(0) = 7  x(1) = 52  x(2) = 6  x(3) = 33  y(4) = 95.9
x(0) = 11  x(1) = 55  x(2) = 9  x(3) = 22  y(5) = 109.2
x(0) = 3  x(1) = 71  x(2) = 17  x(3) = 6  y(6) = 102.7
x(0) = 1  x(1) = 31  x(2) = 22  x(3) = 44  y(7) = 72.5
x(0) = 2  x(1) = 54  x(2) = 18  x(3) = 22  y(8) = 93.1
x(0) = 21  x(1) = 47  x(2) = 4  x(3) = 26  y(9) = 115.9
x(0) = 1  x(1) = 40  x(2) = 23  x(3) = 34  y(10) = 83.8
x(0) = 11  x(1) = 66  x(2) = 9  x(3) = 12  y(11) = 113.3
x(0) = 10  x(1) = 68  x(2) = 8  x(3) = 12  y(12) = 109.4
平均值：
x(0) = 7.46154  x(1) = 48.1538  x(2) = 11.7692  x(3) = 30  y = 95.4231
回归系数：
各因子的偏回归平方和
v(0) = -0.302275
v(1) = -0.0098644
v(2) = 4.01692e-005
v(3) = -0.00365708
残差平方和 = 47.9727
s(0) = 0.116998
s(1) = 0.18561
s(2) = 0
s(3) = 0.173288
估计的标准偏差 = 2.30874

复相关系数 c=0.991128
F-检验值 f=166.832
因变量条件期望值的估计值以及观测值的残差：
ye(0)=78.4383 yr(0)=0.0616864
ye(1)=72.8673 yr(1)=1.43266
ye(2)=106.191 yr(2)=-1.89097
ye(3)=89.4016 yr(3)=-1.80164
ye(4)=95.6438 yr(4)=0.256247
ye(5)=105.302 yr(5)=3.89822
ye(6)=104.129 yr(6)=-1.42867
ye(7)=75.5919 yr(7)=-3.09188
ye(8)=91.8182 yr(8)=1.28177
ye(9)=115.546 yr(9)=0.353883
ye(10)=81.7023 yr(10)=2.09773
ye(11)=112.244 yr(11)=1.05561
ye(12)=111.625 yr(12)=-2.22467
系数相关矩阵：
1.06633 0.20439 -0.893654 0.460588 0.567737
0.20439 18.7803 -2.24227 18.3226 0.430414
0.893654 2.24227 0.0213363 2.37143 0.000925778
0.460588 18.3226 -2.37143 18.9401 -0.263183
-0.567737 -0.430414 0.000925778 0.263183 0.0176645

## 1. 一元线性回归分析

设随机变量 y 随自变量 x 变化。给定 n 组观测数据  $ (x_{k}, y_{k}) $ (k=0,1, $ \cdots $,n-1)，用直线  $ y=ax+b $ 作回归分析。其中 a,b 为回归系数。

为确定回归系数 a 与 b，通常采用最小二乘法，即要使

 $$ Q=\sum_{i=0}^{n-1}[y_{i}-(ax_{i}+b)]^{2} $$

达到最小，根据极值原理，a 与 b 应满足

 $$ \begin{cases}\dfrac{\partial Q}{\partial a}=2\displaystyle\sum_{i=0}^{n-1}[y_{i}-(ax_{i}+b)](-x_{i})=0\\\dfrac{\partial Q}{\partial b}=2\displaystyle\sum_{i=0}^{n-1}[y_{i}-(ax_{i}+b)](-1)=0\end{cases} $$

求解得到

 $$ \left\{\begin{aligned}a&=\frac{\displaystyle\sum_{i=0}^{n-1}(x_{i}-\bar{x})(y_{i}-\bar{y})}{\displaystyle\sum_{i=0}^{n-1}(x_{i}-\bar{x})^{2}}\\ b&=\bar{y}-a\bar{x}\end{aligned}\right. $$

其中，

 $$ \bar{x}=\sum_{i=0}^{n-1}x_{i}/n,\quad\bar{y}=\sum_{i=0}^{n-1}y_{i}/n $$

最后可以计算出以下几个量。

（1）偏差平方和

 $$ q=\sum_{i=0}^{n-1}\left[y_{i}-(ax_{i}+b)\right]^{2} $$

（2）平均标准偏差

 $$ s=\sqrt{\frac{q}{n}} $$

（3）回归平方和

 $$ p=\sum_{i=0}^{n-1}\left[(ax_{i}+b)-\overline{y}\right]^{2} $$

（4）最大偏差

 $$ u\max=\max_{0\leqslant i\leqslant n-1}|y_{i}-(ax_{i}+b)| $$

（5）最小偏差

 $$ u\min=\min_{0\leq i\leq n-1}\mid y_{i}-(ax_{i}+b) $$

（6）偏差平均值

 $$ u=\frac{1}{n}\sum_{i=0}^{n-1}\mid y_{i}-(ax_{i}+b)\mid $$

一元线性回归分析包含在一般的线性回归分析中，只要自变量个数取 m=1 即可。

2. 半对数数据相关

设给定 n 个数据点  $ (x_{i}, y_{i}) $ (i=0,1, $ \cdots $,n-1)，且  $ y_{i}>0 $，用函数

 $$ y=bt^{ax},t>0 $$

进行拟合，又称为指数拟合。为了求拟合参数a与b，两边取对数，即

 $$ \log_{t}y=\log_{t}b+ax $$

令

 $$ \tilde{y}=\tilde{a}\tilde{x}+\tilde{b} $$

其中，

 $$ \widetilde{y}=\log_{t}y,\quad\widetilde{a}=a,\quad\widetilde{x}=x,\quad\widetilde{b}=\log_{t}b $$

此时，问题就化为对 n 个数据点  $ (\widetilde{x}_{i},\widetilde{y}_{i}) $ 作线性拟合。求出  $ \widetilde{a} $ 与  $ \widetilde{b} $ 后，就可以得到

 $$ a=\widetilde{a},\quad b=t^{\widetilde{b}} $$

算法的 C++ 描述如下：

#include <iostream>
#include <cmath>
#include <fstream>
using namespace std;
class INDEXF
{
 private:
 int n;
 double *x, *y;
 double a, b;
}

//数据点数

//数据点值

//回归一次项系数与常数项

double t; //指数函数底
double q; //偏差平方和
double s; //平均标准偏差
double umax; //最大偏差
double umin; //最小偏差
double u; //偏差平均值
public:
 INDEXF() //函数声明
 {a=0; b=0; q=0; s=0; t=0; u=0; umax=0; umin=0;}
 void log1(); //半对数数据相关
 void arrayint(double, int, double *, double *); //从数组读入数据
 void datainput(char *); //从文件读入数据
 void dataoutput(char *); //结果输出
 ~INDEXF() {delete[] x; delete[] y;} //析构函数
};

### //半对数数据相关

%对数数据相关
void INDEXF::log1()
{
 int i;
 double xx, yy, dx, dxy, p;
 xx=0.0; yy=0.0;
 for (i=0; i<=n-1; i++)
 {
 xx=xx+x[i]/n;
 yy=yy+log(y[i])/log(t)/n;
 }
 dx=0.0; dxy=0.0;
 for (i=0; i<=n-1; i++)
 {
 p=x[i]-xx; dx=dx+p*p;
 dxy=dxy+p*(log(y[i])/log(t)-yy);
 }
 a=dxy/dx; b=yy-a*xx;
 b=b*log(t); b=exp(b);
 umin=1.0e+30;
 for (i=0; i<=n-1; i++)
 {
 s=a*x[i]*log(t); s=b*exp(s);
 q=q+(y[i]-s)*(y[i]-s);
 dx=fabs(y[i]-s);
 if (dx>umax) umax=dx;
 if (dx<umin) umin=dx;
 u=u+dx/n;
 }
 s=sqrt(q/n);
 return;
}
//从数组读入数据
//tt
//nn
//xx[], yy[]
void INDEXF::arrayint(double tt, int nn, double xx[], double yy[])

int i;
n=nn; t=tt;
x=new double[n];
y=new double[n];
for(i=0; i<n; i++) x[i]=xx[i]; //从数组读入数据
for(i=0; i<n; i++) y[i]=yy[i];
return ;

//从文件读入数据
//c
void INDEXF::dataintput(char *c)
{
 int i;
 ifstream fin(c);
 fin >> t; fin >> n;
 x=new double[n]; //动态分配内存
 y=new double[n]; //动态分配内存
 for(i=0; i<n; i++) fin >> x[i]; //从文件读入数据
 for(i=0; i<n; i++) fin >> y[i]; //数据读入结束
 return ;
}

//结果输出
//c
void INDEXF::dataoutput(char *c)
{
 ofstream fout(c);
 fout << "回归系数 : " <<endl;
 fout << "a =" <<a <<"b=" <<b <<endl;
 fout << "偏差平方和 q=" <<q <<endl;
 fout << "平均标准偏差 s=" <<s <<endl;
 fout << "最大偏差 umax=" <<umax <<endl;
 fout << "最小偏差 umin=" <<umin <<endl;
 fout << "偏差平均值 u=" <<u <<endl;
 fout.close();

 //结果同时显示输出
 cout << "拟合系数 :" <<endl;
 cout << "a=" <<a <<"b=" <<b <<endl;
 cout << "偏差平方和 q=" <<q <<endl;
 cout << "平均标准偏差 s=" <<s <<endl;
 cout << "最大偏差 umax=" <<umax <<endl;
 cout << "最小偏差 umin=" <<umin <<endl;
 cout << "偏差平均值 u=" <<u <<endl;
 return ;
}

在从文件读入数据时，数据在文件中的顺序如下：

<t><△><n><△>
<x₀><△><x₁><△><x₂><△>⋯<xₙ₋₁><△>
<y₀><△><y₁><△><y₂><△>⋯<yₙ₋₁><回车换行>

其中， $ \triangle $表示空格或回车换行。即文件中的数据依次为：指数t，数据个数n，n个自变量x

与因变量 y 的值，且每两个值之间用一个空格或回车换行分开，最后以回车换行结束。

例 7.5 给定 11 个数据点如下：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1.4</td><td style='text-align: center; word-wrap: break-word;'>1.5</td><td style='text-align: center; word-wrap: break-word;'>1.6</td><td style='text-align: center; word-wrap: break-word;'>1.8</td><td style='text-align: center; word-wrap: break-word;'>1.9</td><td style='text-align: center; word-wrap: break-word;'>2.1</td><td style='text-align: center; word-wrap: break-word;'>2.3</td><td style='text-align: center; word-wrap: break-word;'>2.4</td><td style='text-align: center; word-wrap: break-word;'>2.5</td><td style='text-align: center; word-wrap: break-word;'>2.8</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>y</td><td style='text-align: center; word-wrap: break-word;'>18</td><td style='text-align: center; word-wrap: break-word;'>43</td><td style='text-align: center; word-wrap: break-word;'>54</td><td style='text-align: center; word-wrap: break-word;'>67</td><td style='text-align: center; word-wrap: break-word;'>104</td><td style='text-align: center; word-wrap: break-word;'>130</td><td style='text-align: center; word-wrap: break-word;'>201</td><td style='text-align: center; word-wrap: break-word;'>313</td><td style='text-align: center; word-wrap: break-word;'>390</td><td style='text-align: center; word-wrap: break-word;'>486</td><td style='text-align: center; word-wrap: break-word;'>939</td></tr></table>

用函数  $ y = b \cdot 3^{ax} $ 进行拟合，并求偏差平方和 q、平均标准偏差 s、最大偏差  $ u_{max} $、最小偏差  $ u_{min} $、偏差平均值 u。

数据文件 log1.in 中的内容如下：

3 11
1 1.4 1.5 1.6 1.8 1.9 2.1 2.3 2.4 2.5 2.8
18 43 54 67 104 130 201 313 390 486 939

主函数程序如下：

//半对数数据相关例1
#include <iostream>
#include <cmath>
#include <fstream>
#include "半对数数据相关.cpp"
using namespace std;
int main()
{
 INDEXF h;
 char *c1, *c2;
 c1="log1.in"; //数据文件名
 c2="log1.out"; //结果文件名
 h.dataintput(c1); //从数据文件读入数据
 h.log1(); //指数拟合
 h.dataoutput(c2); //结果输出
 return 0;
}

运行结果存放在文件 log1.out 中，其内容如下：

回归系数：
a=2.00146 b=1.98987
偏差平方和 q=0.828678
平均标准偏差 s=0.274471
最大偏差 umax=0.516434
最小偏差 umin=0.0197145
偏差平均值 u=0.22899

如果要求数据由数组提供，则主函数程序修改如下：

//半对数数据相关例2
#include <iostream>
#include <cmath>

#include <fstream>
#include "半对数数据相关.cpp"
using namespace std;
int main()
{
 int n;
 char *c2;
 INDEXF h;
 double t;
 double x[11]={1, 1.4, 1.5, 1.6, 1.8, 1.9, 2.1, 2.3, 2.4, 2.5, 2.8};
 double y[12]={18, 43, 54, 67, 104, 130, 201, 313, 390, 486, 939};
 t=3.0; n=11;
 c2="log2.out"; //结果文件名
 h.arrayint(t,n,x,y); //从数组读入数据
 h.log1(); //指数拟合
 h.dataoutput(c2); //结果输出
 return 0;
}

运行结果存放在文件 log2.out 中，其内容与文件 log1.out 相同。

3. 对数数据相关

设给定 n 个数据点  $ (x_{k}, y_{k}) $ (k=0,1, $ \cdots $,n-1)，且  $ x_{k}, y_{k} > 0 $，用函数

 $$ y=b x^{a},\quad x,y>0 $$

进行拟合，又称为幂函数拟合。为了求拟合参数a与b，两边取对数，即

 $$ \ln y=\ln b+a\ln x $$

令

 $$ \tilde{y}=\tilde{a}\tilde{x}+\tilde{b} $$

其中，

 $$ \tilde{y}=\ln y,\tilde{a}=a,\quad\tilde{x}=\ln x,\quad\tilde{b}=\ln b $$

此时，问题就化为对 n 个数据点  $ (\tilde{x}_{i}) $ 作线性拟合。求出  $ \tilde{a} $ 与  $ \tilde{b} $ 后，就可以得到

 $$ a=\widetilde{a},\quad b=e^{\widetilde{b}} $$

算法的 C++ 描述如下：

//对数数据相关.cpp
#include <iostream>
#include <cmath>
#include <fstream>
using namespace std;
class POWERF
{
 private:
 int n;
 double *x, *y;
 double a, b;
 double q;
 double s;
 double umax;
 }

//数据点数
//数据点值
//回归一次项系数与常数项
//偏差平方和
//平均标准偏差
//最大偏差

double umin; //最小偏差
double u; //偏差平均值
public:
POWERF() //构造函数
{a=0; b=0; q=0; s=0; u=0; umax=0; umin=0;}
void power_fun(); //幂函数拟合
void arrayint(int, double *，double *); //从数组读入数据
void dataintput(char *); //从文件读入数据
void dataoutput(char *); //输出结果
~POWERF() {delete[] x; delete[] y;} //析构函数

//幂函数拟合
void POWERF::power_fun()
{
int i;
double xx, yy, dx, dxy;
xx=0.0; yy=0.0;
for (i=0; i<=n-1; i++)
{
xx=xx+log(x[i])/n;
yy=yy+log(y[i])/n;
}
dx=0.0; dxy=0.0;
for (i=0; i<=n-1; i++)
{
q=log(x[i])-xx; dx=dx+q*q;
dxy=dxy+q*(log(y[i])-yy);
}
a=dxy/dx; b=yy-a*xx;
b=exp(b);
umin=1.0e+30;
for (i=0; i<=n-1; i++)
{
s=a*log(x[i]); s=b*exp(s);
q=q+(y[i]-s)*(y[i]-s);
dx=fabs(y[i]-s);
if (dx>umax) umax=dx;
if (dx<umin) umin=dx;
u=u+dx/n;
}
s=sqrt(q/n);
return;
}

//从数组读入数据
//nn 数据点数
//xx[], yy[] 数据点值
void POWERF::arrayint(int nn, double xx[], double yy[])
{
int i;
n=nn;

x = new double[n]; //动态分配内存
y = new double[n];
for (i = 0; i < n; i++) x[i] = xx[i]; //从数组读入数据
for (i = 0; i < n; i++) y[i] = yy[i];
return ;

//从文件读入数据
//c
void POWERF::dataintput(char * c)
{
 int i;
 if stream fin(c);
 fin >> n;
 x = new double[n]; //动态分配内存
 y = new double[n];
 for (i = 0; i < n; i++) fin >> x[i]; //从文件读入数据
 for (i = 0; i < n; i++) fin >> y[i]; //数据读入结束
 return ;
}

//结果输出
//c
void POWERF::dataoutput(char * c)
{
 ofstream fout(c);
 fout << "回归系数：" << endl;
 fout << "a =" << a << "b=" << b << endl;
 fout << "偏差平方和 q=" << q << endl;
 fout << "平均标准偏差 s=" << s << endl;
 fout << "最大偏差 umax=" << umax << endl;
 fout << "最小偏差 umin=" << umin << endl;
 fout << "偏差平均值 u=" << u << endl;
 fout.close();

 //结果同时显示输出
 cout << "拟合系数：" << endl;
 cout << "a =" << a << "b=" << b << endl;
 cout << "偏差平方和 q=" << q << endl;
 cout << "平均标准偏差 s=" << s << endl;
 cout << "最大偏差 umax=" << umax << endl;
 cout << "最小偏差 umin=" << umin << endl;
 cout << "偏差平均值 u=" << u << endl;
 return ;
}

在从文件读入数据时，数据在文件中的顺序如下：

<n><△>
<x₀><△><x₁><△><x₂><△>……<xₙ₋₁><△>
<y₀><△><y₁><△><y₂><△>……<yₙ₋₁><回车换行>

其中， $ \triangle $表示空格或回车换行。即文件中的数据依次为：数据个数 n，n 个自变量 x 与因变量 y 的值，且每两个值之间用一个空格或回车换行分开，最后以回车换行结束。

<div style="text-align: center;"><div style="text-align: center;">例 7.6 给定 11 个数据点如下。</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1.4</td><td style='text-align: center; word-wrap: break-word;'>1.5</td><td style='text-align: center; word-wrap: break-word;'>1.6</td><td style='text-align: center; word-wrap: break-word;'>1.8</td><td style='text-align: center; word-wrap: break-word;'>1.9</td><td style='text-align: center; word-wrap: break-word;'>2.1</td><td style='text-align: center; word-wrap: break-word;'>2.3</td><td style='text-align: center; word-wrap: break-word;'>2.4</td><td style='text-align: center; word-wrap: break-word;'>2.5</td><td style='text-align: center; word-wrap: break-word;'>2.8</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>y</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>17</td><td style='text-align: center; word-wrap: break-word;'>20</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>36</td><td style='text-align: center; word-wrap: break-word;'>41</td><td style='text-align: center; word-wrap: break-word;'>46</td><td style='text-align: center; word-wrap: break-word;'>65</td></tr></table>

用函数  $ y = b * x^a $ 进行拟合，并求偏差平方和  $ q $、平均标准偏差  $ s $、最大偏差  $ u_{max} $、最小偏差  $ u_{min} $、偏差平均值  $ u $。

数据文件 power1.in 中的内容如下：

11
1 1.4 1.5 1.6 1.8 1.9 2.1 2.3 2.4 2.5 2.8
3 8 10 12 17 20 27 36 41 46 65

主函数程序如下：

//对数数据相关例1
#include <iostream>
#include <cmath>
#include <fstream>
#include "对数数据相关.cpp"
using namespace std;
int main()
{
 POWERF h;
 char * c1, * c2;
 c1="power1.in"; //数据文件名
 c2="power1.out"; //结果文件名
 h.dataintput(c1); //从数据文件读入数据
 h.power_fun(); //幂函数拟合
 h.dataoutput(c2); //结果输出
 return 0;
}

运行结果存放在文件 power1.out 中，其内容如下：

回归系数：
a=2.99418 b=2.95455
偏差平方和 q=1.02077
平均标准偏差 s=0.304626
最大偏差 umax=0.529013
最小偏差 umin=0.0454549
偏差平均值 u=0.187522

如果要求数据由数组提供，则主函数程序修改如下：

//对数数据相关例2
#include <iostream>
#include <cmath>
#include <fstream>

#include "对数数据相关.cpp"
using namespace std;
main()
{
 double x[11]={1,1,4,1,5,1,6,1,8,1,9,2,1,2,3,2,4,2,5,2,8};
 double y[11]={3,8,10,12,17,20,27,36,41,46,65};
 POWERF h;
 char *c2;
 c2="power2.out"; //结果文件名
 h.arrayint(11, x, y); //从数组读入数据
 h.power_fun(); //幂函数拟合
 h.dataoutput(c2); //结果输出
 return 0;
}

运行结果存放在文件 power2.out 中，其结果与文件 power1.out 的内容相同。

### 7.4 大数据查询

大数据查询指的是使用大数据处理技术对海量数据进行搜索和分析的过程。大数据查询的目的通常是获取有价值的信息，并运用这些信息改善决策或做出预测。随着时代的进步，大数据技术已经步入了成熟期，越来越多的企业选择通过大数据查询洞悉行业发展的需求、现状以及前景，从中找到一丝行业发展的规律，从而规避行业发展的风险。

大数据查询平台有着不同的类别，下面是一些主要的类别。

## 1. 行业分析报告

这类查询平台专注于移动互联网、智能手机、平板电脑和电子商务等产业的研究，利用先进的信息技术，通过深入和广泛研究政府政策、企业经营、资本运作和消费者行为，为网络新经济行业用户提供市场资讯、决策依据、投资策略、市场调研和战略咨询服务等专业的市场调研项目。

## 2. 实时热点数据

这类查询平台通常应用于新闻事件、娱乐事件等资讯类平台，以排行榜的形式向用户展现，而后台的数据支撑则是借助大数据查询实现的。此外，企业可以通过对热点关键词的把握，在一定程度上保证舆情的走向，避免一些不法分子利用网络热度达成相应的目的。

## 3. 用户行为数据

这类查询平台以网民行为数据为基础，了解用户的消费需求、喜好、关键词搜索趋势、监测舆情动向、定位受众特征等，通过可视化表达使相关数据内容更清晰，并且用户在网络平台上留下的一切痕迹都会被搜集，然后对其进行统计、整理、分析，并给出相应的趋势走向。

## 4. 商品交易分析

这类查询平台主要服务于电商等产生交易行为的行业，通过对浏览量、每天浏览的人次、每天新增供求产品数、新增公司数和产品数等方面的动态图表呈现，了解市场发展的综合趋势，例如某个地区的某个产品销量好、某个地区的供应商供应的产品更受欢迎等。

## 5. 经济数据分析

这类查询平台包括财经、股票、基金、期货、债券、外汇、银行、保险等诸多金融资讯与财经信息，多方位覆盖了各财经领域，每日更新上万条数据及资讯，为用户提供便利的查询，让用户能快速获取财经及理财资讯。

## 6. 广告、新媒体监测

随着新媒体广告的崛起，大数据查询平台自然拥有其数据监测的类别，从而可以清晰地浏览到广告效果。数据包含粉丝群体偏好、评论互动数量、浏览量等，在帮助自媒体个人运营账号的同时方便企业投放广告，选择合适的合作对象，更好地处理数据内容，调整运营策略与方案。

目前，大数据查询可以通过多种方式进行。例如，微信用户可以通过微信的“大数据信用查询”进行查询；又如，网贷平台查询可以提供信用报告的服务，用户只需输入个人信息即可查询名下的贷款机构、还款记录以及欠款情况等信息；还例如，用户可以携带本人有效身份证件到中国人民银行柜台查询个人信用报告；等等。

大数据查询的内容有很多。例如，通过大数据信用报告可以查询大数据信用评分、是否进入网贷黑名单、网贷申请记录等。

总之，大数据查询是一种重要的金融风控工具，可以帮助金融机构更好地了解客户的状况和风险水平，从而做出更明智的决策。

### 习题

7.1 什么叫数据？什么叫大数据？

7.2 大数据分哪几种类型？大数据的特点有哪些？

7.3 大数据的技术架构有哪几层？

7.4 大数据的主要作用有哪些？

7.5 大数据处理流程主要分哪几步？

7.6 数据采集有哪些基本方法？

7.7 数据预处理包括哪几方面？

7.8 设直方图中起始区间的值为 91，区间个数为 10，区间长度为 2。将此 3 个数以及 500 个均值为 2.25 的正态分布随机数均存放在文件 ch7_8.in 中，然后计算它们的算术平均值、方差、标准差、各区间上按高斯分布所应有的近似理论点数以及实际点数。将计算结果与直方图分别存放在文件 ch7_8_1.out 和 ch7_8_2.out 中。

7.9 给定数据点如下。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>0.5</td><td style='text-align: center; word-wrap: break-word;'>1.0</td><td style='text-align: center; word-wrap: break-word;'>1.5</td><td style='text-align: center; word-wrap: break-word;'>2.0</td><td style='text-align: center; word-wrap: break-word;'>2.5</td><td style='text-align: center; word-wrap: break-word;'>3.0</td><td style='text-align: center; word-wrap: break-word;'>3.5</td><td style='text-align: center; word-wrap: break-word;'>4.0</td><td style='text-align: center; word-wrap: break-word;'>4.5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>y</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>15</td><td style='text-align: center; word-wrap: break-word;'>18</td><td style='text-align: center; word-wrap: break-word;'>20</td><td style='text-align: center; word-wrap: break-word;'>23</td><td style='text-align: center; word-wrap: break-word;'>25</td></tr></table>

分别用

(1)  $ y = ax + b $; (2)  $ y = b \times 3^{ax} $; (3)  $ y = b \times x^{a} $

进行拟合，并进行比较。

7.10 给定数据点如下：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>0.5</td><td style='text-align: center; word-wrap: break-word;'>1.0</td><td style='text-align: center; word-wrap: break-word;'>1.5</td><td style='text-align: center; word-wrap: break-word;'>2.0</td><td style='text-align: center; word-wrap: break-word;'>2.5</td><td style='text-align: center; word-wrap: break-word;'>3.0</td><td style='text-align: center; word-wrap: break-word;'>3.5</td><td style='text-align: center; word-wrap: break-word;'>4.0</td><td style='text-align: center; word-wrap: break-word;'>4.5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>y</td><td style='text-align: center; word-wrap: break-word;'>2.71</td><td style='text-align: center; word-wrap: break-word;'>3.67</td><td style='text-align: center; word-wrap: break-word;'>4.98</td><td style='text-align: center; word-wrap: break-word;'>6.75</td><td style='text-align: center; word-wrap: break-word;'>9.14</td><td style='text-align: center; word-wrap: break-word;'>12.4</td><td style='text-align: center; word-wrap: break-word;'>16.8</td><td style='text-align: center; word-wrap: break-word;'>22.7</td><td style='text-align: center; word-wrap: break-word;'>30.8</td></tr></table>

分别用

 $$ y=ax+b\quad;(2)y=b\ast3^{ax}\quad;(3)y=b\ast x^{a} $$

进行拟合，并进行比较。

7.11 给定数据点如下：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>0.5</td><td style='text-align: center; word-wrap: break-word;'>1.0</td><td style='text-align: center; word-wrap: break-word;'>1.5</td><td style='text-align: center; word-wrap: break-word;'>2.0</td><td style='text-align: center; word-wrap: break-word;'>2.5</td><td style='text-align: center; word-wrap: break-word;'>3.0</td><td style='text-align: center; word-wrap: break-word;'>3.5</td><td style='text-align: center; word-wrap: break-word;'>4.0</td><td style='text-align: center; word-wrap: break-word;'>4.5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>y</td><td style='text-align: center; word-wrap: break-word;'>0.2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>6.7</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>31</td><td style='text-align: center; word-wrap: break-word;'>54</td><td style='text-align: center; word-wrap: break-word;'>85</td><td style='text-align: center; word-wrap: break-word;'>128</td><td style='text-align: center; word-wrap: break-word;'>182</td></tr></table>

分别用

 $$ y=ax+b\quad;(2)y=b\ast3^{ax}\quad;(3)y=b\ast x^{a} $$

进行拟合，并进行比较。

7.12 给定 5 个自变量的 10 组数据如下：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>k</td><td style='text-align: center; word-wrap: break-word;'>$ x_{0k} $</td><td style='text-align: center; word-wrap: break-word;'>$ x_{1k} $</td><td style='text-align: center; word-wrap: break-word;'>$ x_{2k} $</td><td style='text-align: center; word-wrap: break-word;'>$ x_{3k} $</td><td style='text-align: center; word-wrap: break-word;'>$ x_{4k} $</td><td style='text-align: center; word-wrap: break-word;'>$ y_{k} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>-28</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>-2</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>-6</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>45</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>-9</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>124</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>-2</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>-66</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>-8</td><td style='text-align: center; word-wrap: break-word;'>108</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>-8</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>-3</td><td style='text-align: center; word-wrap: break-word;'>-5</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>-54</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>-9</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>104</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>-3</td><td style='text-align: center; word-wrap: break-word;'>39</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>-4</td><td style='text-align: center; word-wrap: break-word;'>-6</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>-1</td></tr></table>

请作线性拟合。
