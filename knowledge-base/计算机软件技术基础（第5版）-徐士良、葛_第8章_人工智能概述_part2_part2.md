# 2. 标准化样本的二次逻辑回归算法的 C++ 描述

> 来源：docs/08_电子书/计算机软件技术基础（第5版）-徐士良、葛兵.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：d53505b4754eaf37


//标准化样本的二次逻辑回归.cpp
#include <iostream>
#include <iomanip>
#include <cmath>
#include <fstream>
using namespace std;
class STLOGIC2
{
 private:
 int m;
 int n;
 double * w;
 double * x;
 double * y;
 double * stx;

 public:
 STLOGIC2();
 void dataintput(char *);
 void stand();
 void dataoutput(char *);
 void stlogic2_reg();
 ~STLOGIC2()
 {delete[] w; delete[] x; delete[] y; delete[] stx;
 };

 //样本数据标准化
 void STLOGIC2::stand()

int i, j;
double av, s; //平均值与标准差
for (j=0; j<2 * m; j=j+1)
{
 av=0;
 for (i=0; i<=n-1; i++) //随机样本的算术平均值
 av=av+x[j * n+i]/n;
 s=0;
 for (i=0; i<=n-1; i++)
 s=s+(x[j * n+i]-av) * (x[j * n+i]-av);
 s=s/n; //随机样本的方差
 s=sqrt(s); //随机样本的标准差
 for (i=0; i<n; i++)
 stx[j * n+i]=(x[j * n+i]-av)/s;
}
return;
}

## //二次逻辑回归

void STLOGIC2::stlogic2_reg()
{
 int i, j, k;
 double z, alpha, *e;
 e = new double[n];
 for (i = 0; i <= 2 * m; i++) w[i] = 0.0; // 初始化
 alpha = 0.01 / n;
 k = 0;
 while (k < 10) {
 {
 for (i = 0; i < n; i++) // 计算 E
 {
 z = w[0];
 for (j = 1; j <= 2 * m; j++) z = z + w[j] * stx[(j - 1) * n + i];
 e[i] = 1.0 / (1.0 + exp(-z)) - y[i];
 }
 for (j = 1; j <= 2 * m; j++) // 计算 w
 {
 z = 0.0;
 for (i = 0; i < n; i++) z = z + stx[(j - 1) * n + i] * e[i];
 w[j] = w[j] - alpha * z;
 }
 k = k + 1;
 }
 delete[] e;
 return;
 }

// 从文件读入数据
//c
void STLOGIC2::dataintput(char *c)
{
 int i, j;

ifstream fin(c);
fin >>m;
fin >>n;
x=new double[2*m*n]; //动态分配内存
y=new double[n];
w=new double[2*m+1];
stx=new double[2*m*n];
//从文件读入数据
for(j=0; j<m; j++)
 for(i=0; i<n; i++)
{
 fin >>x[j*2*n+i]; //x
 x[(2*j+1)*n+i]=x[j*2*n+i]*x[j*2*n+i]; //x^2
}
for(i=0; i<n; i++) fin>>y[i];
fin.close(); //数据读入结束
return;
}

//结果输出到文件
//c 结果文件名
void STLOGIC2::dataoutput(char *c)
{
 int i, j, k;
 double z;
 ofstream fout(c);
 fout <<"回归系数 w: "<<endl;
 for(i=0; i<=2*m; i++)
 fout <<"w("<<i<<")="<<w[i]<<endl;
 fout <<"(1)样本数据特征 (2)标准化数据特征";
 fout <<" (3)原函数值(4)模拟函数值"<<endl;
 for(i=0; i<n; i++)
 {
 fout <<"("<<setw(6)<<x[i];
 for(j=1; j<2*m; j=j+1)fout<<","<<setw(6)<<x[j*n+i];
 fout <<")";
 fout <<"("<<setw(10)<<stx[i];
 for(j=1; j<2*m; j=j+1)fout<<","<<setw(10)<<stx[j*n+i];
 fout <<")";
 fout <<setw(10)<<y[i];
 z=w[0];
 for(k=1; k<=2*m; k++) z=z+w[k]*stx[(k-1)*n+i];
 fout <<setw(10)<<int(1.0/(1.0+exp(-z))+0.5)<<endl;
 }
 fout.close();
//同时显示
cout <<"回归系数 w: "<<endl;
for(i=0; i<=2*m; i++)
 cout <<"w("<<i<<")="<<w[i]<<endl;
 cout <<(1)样本数据特征 (2)标准化数据特征";
 cout <<" (3)原函数值(4)模拟函数值"<<endl;
 for(i=0; i<n; i++)
 for(i=0; i<=2*m; i++)

{
 cout <<("<<setw(6) <<x[i];
 for(j=1; j<2*m; j=j+1) cout <<", "<<setw(6) <<x[j*n+i];
 cout <<");
 cout <<("<<setw(10) <<stx[i];
 for(j=1; j<2*m; j=j+1) cout <<", "<<setw(10) <<stx[j*n+i];
 cout <<");
 cout <<setw(5) <<y[i];
 z=w[0];
 for(k=1; k<=2*m; k++) z=z+w[k]*stx[(k-1)*n+i];
 cout <<setw(10) <<int(1.0/(1.0+exp(-z))+0.5) <<endl;
}
return;
}

## 3. 标准化样本的非线性逻辑回归算法的 C++ 描述

//标准化样本的非线性逻辑回归.cpp
#include <iostream>
#include <iomanip>
#include <cmath>
#include <fstream>
using namespace std;
class STLOGIC3
{
 private:
 int m;
 int n;
 double *w;
 double *x;
 double *y;
 double *stx;

 public: //函数声明
 STLOGIC3() {,};
 void dataintput(char *); //从文件读入数据
 void stand();
 void dataoutput(char *); //分类结果输出
 void stlogic3_reg(); //非线性逻辑回归
 ~STLOGIC3() //析构函数
 {delete[] w; delete[] x; delete[] y; delete[] stx; }
 };

 //样本数据标准化
 void STLOGIC3::stand()
{
 int i, j;
 double av, s; //平均值与标准差
 for (j=0; j<3*m; j=j+1)
 {
 av=0;
 for (i=0; i<=n-1; i++) //随机样本的算术平均值
 }
 }
}

av=av+x[j*n+i]/n;
s=0;
for (i=0; i<=n-1; i++)
 s=s+(x[j*n+i]-av)*(x[j*n+i]-av);
s=s/n; //随机样本的方差
s=sqrt(s); //随机样本的标准差
for (i=0; i<n; i++)
 stx[j*n+i]=(x[j*n+i]-av)/s;
}
return;
}

### //非线性逻辑回归

void STLOGIC3::stlogic3_reg()
{
 int i, j, k;
 double z, alpha, *e;
 e = new double[n];
 for (i = 0; i <= 3 * m; i++) w[i] = 0.0; // 初始化
 alpha = 0.01 / n;
 k = 0;
 while (k < 10)
 {
 for (i = 0; i < n; i++)
 {
 z = w[0];
 for (j = 1; j <= 3 * m; j++) z = z + w[j] * stx[(j - 1) * n + i];
 e[i] = 1.0 / (1.0 + exp(-z)) - y[i];
 }
 for (j = 1; j <= 3 * m; j++)
 {
 z = 0.0;
 for (i = 0; i < n; i++) z = z + stx[(j - 1) * n + i] * e[i];
 w[j] = w[j] - alpha * z;
 }
 k = k + 1;
 }
 delete[] e;
 return;
}

#### //从文件读入数据

//c
void STLOGIC3::dataintput(char *c)
{
 int i, j;
 ifstream fin(c);
 fin >>m;
 fin >>n;
 x=new double[3 * m * n];
 y=new double[n];
 w=new double[3 * m + 1];
 stx=new double[3 * m * n];
}

数据文件名
//动态分配内存

//从文件读入数据
for(j=0; j<m; j++)
for(i=0; i<n; i++)
{
 fin >> x[j * 3 * n + i]; //x
 x[(3 * j + 1) * n + i] = x[j * 3 * n + i] * x[j * 3 * n + i]; //x^2
 x[(3 * j + 2) * n + i] = x[j * 3 * n + i] * x[j * 3 * n + i] * x[j * 3 * n + i]; //x^3
}
for(i=0; i<n; i++) fin >> y[i];
fin.close(); //数据读入结束
return;

//结果输出到文件
//c
void STLOGIC3::dataoutput(char * c)
{
 int i, j, k;
 double z;
 ofstream fout(c);
 fout <<"回归系数 w: " <<endl;
 for(i=0; i<=3 * m; i++)
 fout <<"w(" <<i <<") = " <<w[i] <<endl;
 fout <<"1样本数据特征"
(2)标准化数据特征";
 fout <<"
(3)原函数值(4)模拟函数值" <<endl;
 for(i=0; i<n; i++)
 {
 fout <<"(" <<setw(6) <<x[i];
 for(j=1; j<3 * m; j=j+1) fout <<", " <<setw(6) <<x[j * n+i];
 fout <<")";
 fout <<"(" <<setw(10) <<stx[i];
 for(j=1; j<3 * m; j=j+1) fout <<", " <<setw(10) <<stx[j * n+i];
 fout <<")";
 fout <<setw(5) <<y[i];
 z=w[0];
 for(k=1; k<=3 * m; k++) z=z+w[k] * stx[(k-1) * n+i];
 fout <<setw(5) <<int(1.0/(1.0 + exp(-z)) + 0.5) <<endl;
 }
 fout.close();

 //同时显示
 cout <<"回归系数 w: " <<endl;
 for(i=0; i<=3 * m; i++)
 cout <<"w(" <<i <<") = " <<w[i] <<endl;
 cout <<"1样本数据特征"
(2)标准化数据特征";
 cout <<"
(3)原函数值(4)模拟函数值" <<endl;
 for(i=0; i<n; i++)
 {
 cout <<"(" <<setw(3) <<x[i];
 for(j=1; j<3 * m; j=j+1) fout <<", " <<setw(6) <<x[j * n+i];
 cout <<")";
 cout <<"(" <<setw(9) <<stx[i];
 for(j=1; j<3 * m; j=j+1) fout <<", " <<setw(9) <<stx[j * n+i];
 cout <<")";
 }
}

cout <<setw(5) <<y[i];
z=w[0];
for(k=1; k<=3*m; k++) z=z+w[k]*stx[(k-1)*n+i];
cout <<setw(5) <<int(1.0/(1.0+exp(-z))+0.5) <<endl;
}
return ;
}

例 8.4 文件 stlogic2.in 中的内容与例 8.2 和例 8.3 中的数据文件 logic2.in（33 个样本点的数据以及相对应的函数值）相同，通过标准化二次逻辑回归分析，对给出的 33 个样本数据点进行模拟分类。其中，文件 stlogic2.in 中的内容如下：

2 33
0 0 0 -1 1 .7 .7 -.7 -.7 0 0 2 -2 1.4 1.4 -1.4 -1.4 0 0 3
-3 2.1 2.1 -2.1 -2.1 0 0 4 -4 2.8 2.8 -2.8 -2.8
0 1-1 0 0 -.7 .7 .7 -.7 2 -2 0 0 1.4 -1.4 -1.4 1.4 3 -3 0
0 2.1 -2.1 -2.1 2.1 4 -4 0 0 -2.8 2.8 2.8 -2.8
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0

(m=2 个自变量的情况)

主函数程序如下：

#include <iostream>
#include <cmath>
#include <fstream>
#include "标准化样本的二次逻辑回归.cpp"

using namespace std;
int main()
{
 STLOGIC2 h;
 char * c1="stlogic2.in"; //数据文件名
 char * c2="stlogic22.out"; //结果文件名
 h.dataintput(c1); //从文件读入样本数据
 h.stand(); //标准化样本数据特征
 h.stlogic2_reg(); //二次逻辑回归
 h.dataoutput(c2); //结果输出到文件
 return 0;
}

运行结果存放在文件 stlogic22.out 中，其内容如下：

回归系数 w:
w(0) = 0
w(1) = 0
w(2) = -0.0239235
w(3) = 0
w(4) -0.0239235

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="3">(1)样本数据特征</td><td colspan="3">(2)标准化数据特征</td><td colspan="3">(3)原值 (4)模拟值</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>0, 0, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 1, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>0, 0, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.527046, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.527046, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.599693</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-1, 1, 1, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>0, 0, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.527046, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.527046, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.599693</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0.7, 0.49, -0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>(0.7, 0.49, -0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>(0.7, 0.49, -0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>(0.7, 0.49, -0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>-0.599693, -0.717325, 0.368932, 0.368932</td><td style='text-align: center; word-wrap: break-word;'>-0.368932, 0.368932, 0.368932</td><td style='text-align: center; word-wrap: break-word;'>-0.717325</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-0.7, 0.49, 0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>(0.7, 0.49, 0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>(-0.7, 0.49, 0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>(-0.7, 0.49, 0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>-0.717325, 0.368932, 0.368932</td><td style='text-align: center; word-wrap: break-word;'>-0.717325, 0.368932, 0.368932</td><td style='text-align: center; word-wrap: break-word;'>-0.717325</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-0.7, 0.49, -0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>(0.7, 0.49, -0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>(-0.7, 0.49, -0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>(-0.7, 0.49, -0.7, 0.49)</td><td style='text-align: center; word-wrap: break-word;'>-0.717325, 0.368932, 0.368932</td><td style='text-align: center; word-wrap: break-word;'>-0.717325, 0.368932, 0.368932</td><td style='text-align: center; word-wrap: break-word;'>-0.717325</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 2, 4)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>0, 0, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.105409, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.105409, 0</td><td style='text-align: center; word-wrap: break-word;'>0.0922604</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 2, 4)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.0922604</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.0922604</td><td style='text-align: center; word-wrap: break-word;'>-0.830344</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-2, 4, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(-1.05409, 0.0922604, 0)</td><td style='text-align: center; word-wrap: break-word;'>(-1.05409, 0.0922604, 0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.737865</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.737865</td><td style='text-align: center; word-wrap: break-word;'>-0.378268</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(1.4, 1.96, 1.4, 1.96)</td><td style='text-align: center; word-wrap: break-word;'>(0.737865, 0.378268, 0.378268, 0.378268, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0.737865, 0.378268, 0.378268, 0.378268</td><td style='text-align: center; word-wrap: break-word;'>(-0.737865, 0.378268, 0.378268, 0.378268</td><td style='text-align: center; word-wrap: break-word;'>-0.737865, 0.378268, 0.378268, 0.378268</td><td style='text-align: center; word-wrap: break-word;'>-0.737865, 0.378268, 0.378268</td><td style='text-align: center; word-wrap: break-word;'>-0.378268</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-1.4, 1.96, -1.4, 1.96)</td><td style='text-align: center; word-wrap: break-word;'>(0.737865, 0.378268, 0.378268, 0.378268, 0)</td><td style='text-align: center; word-wrap: break-word;'>(-1.4, 1.96, -1.4, 1.96)</td><td style='text-align: center; word-wrap: break-word;'>(-0.737865, 0.378268, 0.378268, 0.378268</td><td style='text-align: center; word-wrap: break-word;'>-0.737865, 0.378268, 0.378268, 0.378268</td><td style='text-align: center; word-wrap: break-word;'>-0.737865, 0.378268, 0.378268</td><td style='text-align: center; word-wrap: break-word;'>-0.378268</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-1.4, 1.96, 1.4, 1.96)</td><td style='text-align: center; word-wrap: break-word;'>(0.737865, 0.378268, 0.378268, 0.378268, 0)</td><td style='text-align: center; word-wrap: break-word;'>(-1.4, 1.96, -1.4, 1.96)</td><td style='text-align: center; word-wrap: break-word;'>(-0.737865, 0.378268, 0.378268, 0.378268</td><td style='text-align: center; word-wrap: break-word;'>-0.737865, 0.378268, 0.378268, 0.378268</td><td style='text-align: center; word-wrap: break-word;'>-0.737865, 0.378268, 0.378268</td><td style='text-align: center; word-wrap: break-word;'>-0.378268</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>1.24552</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 1.24552</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 1.24552</td><td style='text-align: center; word-wrap: break-word;'>1.24552</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-3, 9, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>1.24552</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-3, 9, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>1.24552</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(2.1, 4.41, 2.1, 4.41)</td><td style='text-align: center; word-wrap: break-word;'>(0.158114, 0.158114, 0.158114, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0.158114, 0.158114, 0.158114, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0.158114, 0.158114, 0.158114, 0)</td><td style='text-align: center; word-wrap: break-word;'>0.186827, 0.186827</td><td style='text-align: center; word-wrap: break-word;'>1.1068, -1.1068, -1.1068</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-2.1, 4.41, -2.1, 4.41)</td><td style='text-align: center; word-wrap: break-word;'>(0.158114, 0.158114, 0.158114, 0)</td><td style='text-align: center; word-wrap: break-word;'>(-2.1, 4.41, -2.1, 4.41)</td><td style='text-align: center; word-wrap: break-word;'>(-1.1068, 0.158114, 0.158114, 0)</td><td style='text-align: center; word-wrap: break-word;'>0.186827, 0.186827</td><td style='text-align: center; word-wrap: break-word;'>-1.1068, 1.1068, 1.1068</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(-2.1, 4.41, 2.1, 4.41)</td><td style='text-align: center; word-wrap: break-word;'>(0.158114, 0.158114, 0.158114, 0)</td><td style='text-align: center; word-wrap: break-word;'>(-2.1, 4.41, 2.1, 4.41)</td><td style='text-align: center; word-wrap: break-word;'>(-1.1068, 0.158114, 0.158114, 0)</td><td style='text-align: center; word-wrap: break-word;'>0.186827, 0.186827</td><td style='text-align: center; word-wrap: break-word;'>-1.1068, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(0, 0, 0, 0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 0.158114, 0</td><td style='text-align: center; word-wrap: break-word;'>-0.830344, 2.10819</td><td style='text-align: center; word-wrap: break-word;'>0.186827</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr></table>

从上述结果可以看出，同样是二次逻辑回归，决策边界同样是圆，但样本特征经标准化后，其分类准确率要高一些，达到了25/33=0.76左右（如图8.4所示），而没有经过标准化的分类准确率只有17/33=0.5左右（如图8.3所示）。

<div style="text-align: center;"><div style="text-align: center;">图 8.4 样本数据经标准化后的二次逻辑回归分类效果</div> </div>

### 习题

8.1 什么叫人工智能？其主要特点是什么？人工智能的发展主要分哪几个阶段？

8.2 人工智能的主要技术有哪些？

8.3 什么是机器学习？机器学习主要有哪几种？

8.4 在逻辑回归算法中，增加“从主函数的数组提供样本数据”的功能。

8.5 给定自变量  $ x_{1} $ 与  $ x_{2} $ 的 30 个样本数据点以及对应的函数值 y 如下：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>$ x_{1} $</td><td style='text-align: center; word-wrap: break-word;'>-2</td><td style='text-align: center; word-wrap: break-word;'>-2</td><td style='text-align: center; word-wrap: break-word;'>-2</td><td style='text-align: center; word-wrap: break-word;'>-2</td><td style='text-align: center; word-wrap: break-word;'>-2</td><td style='text-align: center; word-wrap: break-word;'>-2</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ x_{2} $</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>y</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td colspan="11"></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ x_{1} $</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ x_{2} $</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>y</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td colspan="11"></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ x_{1} $</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ x_{2} $</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>y</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr></table>

（1）用线性逻辑回归进行分类，并确定分类的边界表达式（决策边界）。

（2）用二次逻辑回归进行分类，并确定分类的边界表达式（决策边界）。

## 本书特色

本书的前身是《软件应用技术基础》，该书曾获电子工业部优秀教材一等奖，经过修改后取名为《计算机软件技术基础》，后又经过多次修订再版，总计已销售20多万册。其中，第二版被评为普通高等教育“十一五”国家级规划教材，2008年度普通高等教育精品教材。本书不仅可以作为高等院校计算机软件技术基础相关课程的教材，也可以作为计算机软件的培训教材以及有关计算机软件考试的参考书。

本书涉及的软件环境为Visual C++ 6.0。

### 课件下载·样书申请

书、圈

官方微信号

ISBN 978-7-302-68536-4

9"787302"685364">

定价：69.90元
