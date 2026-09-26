# 2. 决策边界为三次

> 来源：docs/08_电子书/计算机软件技术基础（第5版）-徐士良、葛兵.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：d53505b4754eaf37


除了在样本中增加自变量的平方值这个特征外，还可以在样本中同时增加自变量的三次方这个特征，使决策边界为非线性，即可以设

 $$ z=w_{0}+w_{1}x_{1}+w_{2}x_{1}^{2}+w_{3}x_{1}^{3}+\cdots+w_{3m-2}x_{m}+w_{3m-1}x_{m}^{2}+w_{3m}x_{m}^{3} $$

其分类边界是三次曲线（面等）。

下面是同时增加自变量二次方与三次方后的逻辑回归算法，由于一般就做到三次，因此，称三次逻辑回归为非线性逻辑回归算法（再次说明，逻辑回归本质上是线性的，所谓三次逻辑回归是指在样本中增加了自变量的三次项，使决策边界实际是三次的了）。

下面是算法的 C++ 描述：

//非线性逻辑回归.cpp
#include <iostream>
#include <iomanip>
#include <cmath>
#include <fstream>
using namespace std;
class LOGIC3
{
 private:
 int m;
 int n;
 double *w;
 double *x;
 double *y;

 public: //函数声明
 LOGIC3() { }

 void dataintput(char *);
 void dataoutput(char *);
 void logic3_reg();
 ~LOGIC3()
 {
 {delete[] w; delete[] x; delete[] y; }
 };

 //非线性逻辑回归
 void LOGIC3::logic3_reg()
 {
 int i, j, k;
 double z, alpha, *e;
 e = new double[n];
 for (i = 0; i <= 3 * m; i++) w[i] = 0.0; //初始化
 alpha = 0.01 / n;
 k = 0;
 while (k < 10)
 {
 for (i = 0; i < n; i++)
 {
 z = w[0];
 for (j = 1; j <= 3 * m; j++) z = z + w[j] * x[(j - 1) * n + i];
 e[i] = 1.0 / (1.0 + exp(-z)) - y[i];
 }
 z = 0.0;
 for (i = 0; i < n; i++) z = z + e[i];
 w[0] = w[0] - alpha * z;
 for (j = 1; j <= 3 * m; j++)
 {
 //计算w
 z = 0.0;
 for (i = 0; i < n; i++) z = z + x[(j - 1) * n + i] * e[i];
 w[j] = w[j] - alpha * z;
 }
 }
}

}
k=k+1;

delete[] e;
return;

//从文件读入数据
//c
void LOGIC3::dataintput(char *c)
{
int i, j;
ifstream fin(c);
fin >> m;
fin >> n;
x=new double[3*m*n]; //动态分配内存
y=new double[n];
w=new double[3*m+1];
//数据从文件读入
for(j=0; j<m; j++)
for(i=0; i<n; i++)
{
 fin >> x[j*3*n+i]; //x
 x[(3*j+1)*n+i]=x[j*3*n+i] * x[j*3*n+i]; //x^2
 x[(3*j+2)*n+i]=x[j*3*n+i] * x[j*3*n+i] * x[j*3*n+i]; //x^3
}
for(i=0; i<n; i++) fin >> y[i];
fin.close(); //数据读入结束
return ;
}

//结果输出到文件
//c
void LOGIC3::dataoutput(char *c)
{
int i, j, k;
double z;
ofstream fout(c);
fout <<"回归系数 w: "<<endl;
for(i=0; i<=3*m; i++)
fout <<"w("<<i<<")="<<w[i]<<endl;
fout <<"(1)样本数据特征 (2)原函数值(3)模拟函数值"<<endl;
for(i=0; i<n; i++)
{
 fout <<"("<<setw(7)<<x[i];
 for(j=1; j<3*m; j=j+1) fout <<","<<setw(7)<<x[j*n+i];
 fout <<")";
 fout <<setw(13) <<y[i];
 z=w[0];
 for(k=1; k<=3*m; k++) z=z+w[k] * x[(k-1)*n+i];
 fout <<setw(13) <<int(1.0/(1.0+exp(-z))+0.5) <<endl;
}
fout.close();

结果文件名

//同时显示
cout << "回归系数 w: " <<endl;
for(i=0; i<=3*m; i++)
cout << "w(" <<i <<")=" <<w[i] <<endl;
cout <<"(1)样本数据特征(2)原函数值(3)模拟函数值" <<endl;
for(i=0; i<n; i++)
{
 cout <<(" <<setw(7) <<x[i];
 for(j=1; j<3*m; j=j+1)cout <<", " <<setw(7) <<x[j*n+i];
 cout <<")";
 cout <<setw(13) <<y[i];
 z=w[0];
 for(k=1; k<=3*m; k++) z=z+w[k]*x[(k-1)*n+i];
 .cout <<setw(13) <<int(1.0/(1.0+exp(-z))+0.5) <<endl;
}
return ;
}

在由文件提供样本数据时，数据在文件中的顺序如下。

<m><△><n><△>
<x_{00}><△><x_{01}><△><x_{02}><△>…<x_{0,n-1}><△>
<x_{10}><△><x_{11}><△><x_{12}><△>…<x_{1,n-1}><△>
...
<x_{m0}><△><x_{m1}><△><x_{m2}><△>…<x_{m,n-1}><△>
<y_{0}><△><y_{1}><△><y_{2}><△>…<y_{n-1}><回车换行>

其中， $ \triangle $表示空格或回车换行。即文件中的数据依次为：自变量个数 m，样本数据组数 n，n 组自变量的值，最后是 n 个因变量 y 的值，且每两个值之间用一个空格或回车换行分开，最后以回车换行结束。特别要指出的是，输入的 m 是实际的自变量个数，而新增加的 m 个特征（自变量的三次方），其个数在算法中将自动加上。

同样，非线性逻辑回归不仅可以对样本数据进行0/1分类，还可以在对样本数据回归分析的基础上，利用回归系数预测新数据点的取值。

例 8.3 用与例 8.2 中相同的数据文件 logic2.in（33 个样本点的数据以及相对应的函数值），通过非线性逻辑回归分析，对给出的 33 个样本数据点进行模拟分类。其中，文件 logic2.in 中的内容如下：

2 33
0 0 0 -1 1 .7 .7 - .7 - .7 0 0 2 -2 1.4 1.4 -1.4 -1.4 0 0 3 -
3 2.1 2.1 -2.1 -2.1 0 0 4 -4 2.8 2.8 -2.8 -2.8
0 1 -1 0 0 - .7 .7 - .7 - .7 2 -2 0 0 1.4 -1.4 -1.4 1.4 3 -3 0 0
2.1 -2.1 -2.1 2.1 4 -4 0 0 -2.8 2.8 2.8 -2.8
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1

(m=2个自变量的情况)

主函数程序如下：

//非线性逻辑回归例1
#include <iostream>
#include <cmath>
#include <fstream>
#include "非线性逻辑回归.cpp"
using namespace std;
int main()
{
 LOGIC3 h;
 char * c1="logic2.in"; //数据文件名
 char * c2="logic23.out"; //结果文件名
 h.dataintput(c1); //从文件读入样本数据
 h.logic3_reg(); //非线性逻辑回归
 h.dataoutput(c2); //结果输出到文件
 return 0;
}

运行结果存放在文件 logic23.out 中，其内容如下：

w(0)=0.0262501
w(1)=0
w(2)=-0.00846548
w(3)=0
w(4)=0
w(5)=-0.0084)548
w(6)=0

(2) 原函数值 (3) 模拟函数值

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>( 0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>1 ,</td><td style='text-align: center; word-wrap: break-word;'>1 ,</td><td style='text-align: center; word-wrap: break-word;'>1 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>-1 ,</td><td style='text-align: center; word-wrap: break-word;'>1 ,</td><td style='text-align: center; word-wrap: break-word;'>-1 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-1 ,</td><td style='text-align: center; word-wrap: break-word;'>1 ,</td><td style='text-align: center; word-wrap: break-word;'>-1 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 1 ,</td><td style='text-align: center; word-wrap: break-word;'>1 ,</td><td style='text-align: center; word-wrap: break-word;'>1 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 0 . 7 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 4 9 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 3 4 3 ,</td><td style='text-align: center; word-wrap: break-word;'>-0 . 7 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 4 9 ,</td><td style='text-align: center; word-wrap: break-word;'>-0 . 3 4 3 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 0 . 7 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 4 9 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 3 4 3 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 7 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 4 9 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 3 4 3 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-0 . 7 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 4 9 ,</td><td style='text-align: center; word-wrap: break-word;'>-0 . 3 4 3 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 7 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 4 9 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 3 4 3 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-0 . 7 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 4 9 ,</td><td style='text-align: center; word-wrap: break-word;'>-0 . 3 4 3 ,</td><td style='text-align: center; word-wrap: break-word;'>-0 . 7 ,</td><td style='text-align: center; word-wrap: break-word;'>0 . 4 9 ,</td><td style='text-align: center; word-wrap: break-word;'>-0 . 3 4 3 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>2 ,</td><td style='text-align: center; word-wrap: break-word;'>4 ,</td><td style='text-align: center; word-wrap: break-word;'>8 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>-2 ,</td><td style='text-align: center; word-wrap: break-word;'>4 ,</td><td style='text-align: center; word-wrap: break-word;'>-8 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 2 ,</td><td style='text-align: center; word-wrap: break-word;'>4 ,</td><td style='text-align: center; word-wrap: break-word;'>8 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-2 ,</td><td style='text-align: center; word-wrap: break-word;'>4 ,</td><td style='text-align: center; word-wrap: break-word;'>-8 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 1 . 4 ,</td><td style='text-align: center; word-wrap: break-word;'>1 . 9 6 ,</td><td style='text-align: center; word-wrap: break-word;'>2 . 7 4 4 ,</td><td style='text-align: center; word-wrap: break-word;'>1 . 4 ,</td><td style='text-align: center; word-wrap: break-word;'>1 . 9 6 ,</td><td style='text-align: center; word-wrap: break-word;'>2 . 7 4 4 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 1 . 4 ,</td><td style='text-align: center; word-wrap: break-word;'>1 . 9 6 ,</td><td style='text-align: center; word-wrap: break-word;'>2 . 7 4 4 ,</td><td style='text-align: center; word-wrap: break-word;'>-1 . 4 ,</td><td style='text-align: center; word-wrap: break-word;'>1 . 9 6 ,</td><td style='text-align: center; word-wrap: break-word;'>-2 . 7 4 4 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-1 . 4 ,</td><td style='text-align: center; word-wrap: break-word;'>1 . 9 6 ,</td><td style='text-align: center; word-wrap: break-word;'>-2 . 7 4 4 ,</td><td style='text-align: center; word-wrap: break-word;'>-1 . 4 ,</td><td style='text-align: center; word-wrap: break-word;'>1 . 9 6 ,</td><td style='text-align: center; word-wrap: break-word;'>-2 . 7 4 4 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-1 . 4 ,</td><td style='text-align: center; word-wrap: break-word;'>1 . 9 6 ,</td><td style='text-align: center; word-wrap: break-word;'>-2 . 7 4 4 ,</td><td style='text-align: center; word-wrap: break-word;'>1 . 4 ,</td><td style='text-align: center; word-wrap: break-word;'>1 . 9 6 ,</td><td style='text-align: center; word-wrap: break-word;'>2 . 7 4 4 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>3 ,</td><td style='text-align: center; word-wrap: break-word;'>9 ,</td><td style='text-align: center; word-wrap: break-word;'>27 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>-3 ,</td><td style='text-align: center; word-wrap: break-word;'>9 ,</td><td style='text-align: center; word-wrap: break-word;'>-27 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 3 ,</td><td style='text-align: center; word-wrap: break-word;'>9 ,</td><td style='text-align: center; word-wrap: break-word;'>27 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-3 ,</td><td style='text-align: center; word-wrap: break-word;'>9 ,</td><td style='text-align: center; word-wrap: break-word;'>-27 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 ,</td><td style='text-align: center; word-wrap: break-word;'>0 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 2 . 1 ,</td><td style='text-align: center; word-wrap: break-word;'>4 . 4 1 ,</td><td style='text-align: center; word-wrap: break-word;'>9 . 2 6 1 ,</td><td style='text-align: center; word-wrap: break-word;'>2 . 1 ,</td><td style='text-align: center; word-wrap: break-word;'>4 . 4 1 ,</td><td style='text-align: center; word-wrap: break-word;'>9 . 2 6 1 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>( 2 . 1 ,</td><td style='text-align: center; word-wrap: break-word;'>4 . 4 1 ,</td><td style='text-align: center; word-wrap: break-word;'>9 . 2 6 1 ,</td><td style='text-align: center; word-wrap: break-word;'>-2 . 1 ,</td><td style='text-align: center; word-wrap: break-word;'>4 . 4 1 ,</td><td style='text-align: center; word-wrap: break-word;'>-9 . 2 6 1 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-2 . 1 ,</td><td style='text-align: center; word-wrap: break-word;'>4 . 4 1 ,</td><td style='text-align: center; word-wrap: break-word;'>-9 . 2 6 1 ,</td><td style='text-align: center; word-wrap: break-word;'>-2 . 1 ,</td><td style='text-align: center; word-wrap: break-word;'>4 . 4 1 ,</td><td style='text-align: center; word-wrap: break-word;'>-9 . 2 6 1 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-2 . 1 ,</td><td style='text-align: center; word-wrap: break-word;'>4 . 4 1 ,</td><td style='text-align: center; word-wrap: break-word;'>-9 . 2 6 1 ,</td><td style='text-align: center; word-wrap: break-word;'>2 . 1 ,</td><td style='text-align: center; word-wrap: break-word;'>4 . 4 1 ,</td><td style='text-align: center; word-wrap: break-word;'>9 . 2 6 1 )</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr></table>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0</td></tr></table>

从上述结果可以看出，回归系数与分类结果与二次逻辑回归相同。

## 8.3.3 样本标准化

为了消除不同变量之间的量级差异，使得不同变量能够在同一尺度上进行比较和分析，通常在做逻辑回归之前要对样本数据做标准化处理。特别是在决策边界为非线性的情况下，其增加的特征与原样本数据（x 与  $ x^{2} $ 与  $ x^{3} $）往往不在一个量级，这就需要统一进行标准化处理。当样本数据经过标准化处理后，其分类准确率会得到提高，但决策边界就变得不直观了，不能直接预测判断新数据的类别。

逻辑回归本质上是属于分类算法，即在给定样本数据的情况下，用逻辑回归对这些数据点进行二分类。而当有新的数据点需要判断属于哪一类时，可以直接将它们加入样本中再进行分类。因为执行逻辑回归算法简单方便，没有必要用它来预测和判断新的数据类别。因此，逻辑回归的重点是提高分类的准确率，而不在于实际直观的决策边界。因此，人们往往习惯于在逻辑回归前对样本数据进行标准化处理。

常用的标准化处理方法是对所有样本数据做如下处理：

 $ \underline{\text{原数据 — 平均值}} $

标准偏差

下面分别给出对样本数据标准化的逻辑回归算法。

1. 标准化样本的线性逻辑回归算法的 C++ 描述

//标准化样本的线性逻辑回归.cpp
#include <iostream>
#include <iomanip>
#include <cmath>
#include <fstream>
using namespace std;
class STLOGIC1
{
 private:
 int m;
 int n;
 double *w;
 double *x;
 double *y;
 double *stx;

 //自变量个数
 //样本点数
 //回归系数 w[0], w[1], ..., w[m]
 //样本点值 x
 //各样本点函数值 (0/1)
 //标准化后的样本特征

 public:
 //函数声明

STLOGIC1() {;}
void datainput(char *);
void stand();
void stlogic1_reg();
void dataoutput(char *);
~STLOGIC1()
{delete[] w; delete[] x; delete[] y; delete[] stx;
//构造函数
//从文件读入样本数据
//标准化样本数据特征
//线性逻辑回归
//输出回归分类结果
//析构函数

### //标准化样本数据特征

void STLOGIC1::stand()
{
 int i, j;
 double av, s; //平均值与标准差
 for (j=0; j<m; j++)
 {
 av=0;
 for (i=0; i<n; i++) //随机样本的算术平均值
 av=av+x[j*n+i]/n;
 s=0;
 for (i=0; i<n; i++)
 s=s+ (x[j*n+i]-av) * (x[j*n+i]-av);
 s=s/n; //随机样本的方差
 s=sqrt(s); //随机样本的标准差
 for (i=0; i<n; i++)
 stx[j*n+i]=(x[j*n+i]-av)/s;
 }
 return;
}

#### //线性逻辑回归

void STLOGIC1::stlogic1_reg()
{
 int i, j, k;
 double z, alpha, *e;
 e = new double[n];
 for (i = 0; i <= m; i++) w[i] = 0.0; // 初始化
 alpha = 0.01 / n;
 k = 0;
 while (k < 10)
 {
 for (i = 0; i < n; i++)
 {
 z = w[0];
 for (j = 1; j <= m; j++)
 z = z + w[j] * stx[(j - 1) * n + i];
 e[i] = 1.0 / (1.0 + exp(-z)) - y[i];
 }
 for (j = 1; j <= m; j++)
 {
 z = 0.0;
 for (i = 0; i < n; i++) z = z + stx[(j - 1) * n + i] * e[i];
 w[j] = w[j] - alpha * z;
 }
 }
}

}
k=k+1;
}
delete[] e;
return;
}

//从文件读入数据
//c 数据文件名
void STLOGIC1::dataintput(char *c)
{
int i, j, k;
ifstream fin(c);
fin >> m; fin >> n;
x=new double[m*n]; //动态分配内存
y=new double[n];
w=new double[m+1];
stx=new double[m*n];
k=0;
for(i=0; i<m; i++) //数据从文件读入
for(j=0; j<n; j++)
{
 fin >> x[k]; k=k+1;
 for(i=0; i<n; i++) fin >> y[i]; //数据读入结束
 return;
}

//输出回归分类结果
//c
void STLOGIC1::dataoutput(char *c)
{
 int i, j, k;
 double z;
 ofstream fout(c);
 fout << "回归系数 w: " <<endl;
 for(i=0; i<=m; i++)
 fout <<"w("<<i<<")="<<w[i]<<endl;
 fout <<"(1)样本数据特征(2)标准化数据特征";
 fout <<"____(2)原函数值(3)模拟函数值"<<endl;
 for(i=0; i<n; i++)
 {
 fout <<"("<<setw(6)<<x[i];
 for(j=1; j<m; j++) fout <<", "<<setw(6)<<x[j*n+i];
 fout <<"";
 fout <<"("<<setw(10)<<stx[i];
 for(j=1; j<m; j++) fout <<", "<<setw(10)<<stx[j*n+i];
 fout <<"");
 fout <<setw(11)<<y[i];
 z=w[0];
 for(k=1; k<=m; k++) z=z+w[k]*stx[(k-1)*n+i];
 fout <<setw(11)<<int(1.0/(1.0+exp(-z))+0.5)<<endl;
 }
 fout.close();
 }
}

//同时显示
cout << "回归系数 w: " <<endl;
for(i=0; i<=m; i++)
 cout <<"w("<<i<<")="<<w[i]<<endl;
cout <<"(1)样本数据特征 (2)标准化数据特征 ";
cout <<" (3)原函数值 (4)模拟函数值" <<endl;
for(i=0; i<n; i++)
{
 cout <<"("<<setw(6)<<x[i];
 for(j=1; j<m; j++) cout <<","<<setw(6)<<x[j*n+i];
 cout <<"）；
 cout <<"("<<setw(10)<<stx[i];
 for(j=1; j<m; j++) cout <<","<<setw(10)<<stx[j*n+i];
 cout <<"）；
 cout <<setw(11)<<y[i];
 z=w[0];
 for(k=1; k<=m; k++) z=z+w[k]*stx[(k-1)*n+i];
 cout <<setw(11)<<int(1.0/(1.0+exp(-z))+0.5)<<endl;
}
return ;
}
