# 4）用三元组链表表示后的稀疏矩阵的相加

> 来源：docs/08_电子书/计算机软件技术基础（第5版）-徐士良、葛兵.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：d53505b4754eaf37


设 mc 行 nc 列稀疏矩阵 C 有 tc 个非零元素，且已经用三元组链表表示；mb 行 nb 列稀疏矩阵 B 有 tb 个非零元素，且也已经用三元组链表表示。求和矩阵  $ A = C + B $（用三元组链表表示）的步骤如下：

（1）先判断两个矩阵相加的合理性。如果两个矩阵的行数不相等或列数不相等，则两个矩阵不能相加。

（2）按行同时扫描用三元组链表表示的稀疏矩阵 C 和三元组链表表示的稀疏矩阵 B。

即对于行号相同的两个矩阵中的非零元素：

如果列号也相同，则值相加。如果相加后值非零，则申请一个三元组结点，将相加结果（包括行号和列号）填入该结点的数据域中，然后将该结点链接到和矩阵三元组链表的链尾。

如果列号不同，则申请一个三元组结点，将列号小的那个非零元素信息复制到该结点的数据域中，然后将该结点链接到和矩阵三元组链表的链尾。

在这个过程中，当一个矩阵中本行的所有非零元素都处理完后（进入了下一行），则将另一个矩阵中的每一个剩余非零元素申请一个三元组结点，复制非零元素信息后将它们依次链接到和矩阵三元组链表的链尾。

其成员函数如下：

//稀疏矩阵相加
template<class T>
{
 XL_Array<T>XL_Array<T>::operator + (XL_Array<T>&b)
{
 XL_Array<T>c;
 T d;
 B<T>*m, *n, *q, *s;
 int k=0;
 q=NULL;
 if ((mm!=b.mm) || (nn!=b.nn))  cout<<"不能相加!"<<endl;
 else
 {
 m=head; n=b.head;
 while ((m!=NULL) &&(n!=NULL))
 {
 if (m->i==n->i)
 {
 if (m->j==n->j)
 {
 d=m->v+n->v;
 if (d!=0)
 {
 s=new B<T>;
 s->i=m->i; s->j=m->j; s->v=d;
 s->next=NULL;
 if (q==NULL) c.head=s;
 //函数模板，T为虚拟类型
 }
 }
 }
}
//记住链尾
//行号相同
//列号相同则相加
//相加后非零
//申请一个三元组结点

if (q==NULL) c.head=s;

else q->next=s;
q=s;
k=k+1;

//记住链尾
//非零元素个数加1

m=m->next; n=n->next;

else if (m->j<n->j)
{
 //列号不同则复制列号小的一项
 { s=new B<T>;
 s->i=m->i; s->j=m->j; s->v=m->v;
 s->next=NULL;
 if (q==NULL) c.head=s;
 else q->next=s;
 q=s;
 k=k+1;
 m=m->next;
}
else
{ s=new B<T>;
s->i=n->i; s->j=n->j; s->v=n->v;
 s->next=NULL;
 if (q==NULL) c.head=s;
 else q->next=s;
 q=s;
 k=k+1;
 n=n->next;
}
else if (m->i<n->i)
{
 { s=new B<T>;
 s->i=m->i; s->j=m->j; s->v=m->v;
 s->next=NULL;
 if (q==NULL) c.head=s;
 else q->next=s;
 q=s;
 k=k+1;
 m=m->next;
}
else if (s=new B<T>;
 { s=new B<T>;
 s->i=n->i; s->j=n->j; s->v=n->v;
 s->next=NULL;
 if (q==NULL) c.head=s;
 //复制矩阵中行号小的非零元素
 //申请一个三元组结点
}
else if (q==NULL) c.head=s;
 else q->next=s;
 q=s;
 k=k+1;
 m=m->next;
}
else if (s=new B<T>;
 { s=new B<T>;
 s->i=n->i; s->j=n->j; s->v=n->v;
 s->next=NULL;
 if (q==NULL) c.head=s;
 else q->next=s;
 q=s;
 k=k+1;
 m=m->next;
}
while (m!=NULL)
{
 s=new B<T>;
 s->i=m->i; s->j=m->j; s->v=m->v;
 s->next=NULL;
 if (q==NULL) c.head=s;
}

else q->next=s;
q=s;
k=k+1;
m=m->next;
}
while (n!=NULL)
{
 s=new B<T>;
 s->i=n->i; s->j=n->j; s->v=n->v;
 s->next=NULL;
 if (q==NULL) c.head=s;
 else q->next=s;
 q=s;
 k=k+1;
 n=n->next;
}
c.mm=mm; c.nn=nn; c.tt=k;
}
return(c);
//记住链尾
//非零元素个数加1
//返回相加结果

下列主函数依次实现以下操作：

· 定义稀疏矩阵类对象，矩阵元素为双精度型。

直接将原始的稀疏矩阵a生成稀疏矩阵类对象x，然后输出稀疏矩阵x。

求稀疏矩阵x的转置矩阵xt，然后输出稀疏矩阵xt。

以三元组形式从键盘输入稀疏矩阵 y 的非零元素，然后输出稀疏矩阵 y。

求 $ z=x+y $，然后输出稀疏矩阵z。

//ch2_21.cpp
#include "XL_Array.h"
int main()
{
 double a[7][8]={0,0,3,0,0,0,0,1},
{
 {0,0,0,0,0,0,0,0,0},
 {9,0,0,0,0,0,0,0},
 {0,0,0,0,7,0,0,0},
 {0,0,0,0,0,0,6,0},
 {0,0,0,2,0,3,0,0},
 {0,0,5,0,0,0,0,0}};
 XL_Array<double>x, y, z, xt, c;
 x.th_XL_Array(7,8, &a[0][0]);
 cout<<"输出稀疏矩阵 x:" <<endl;
 x.prt_XL_Array();
 xt=x.tran_XL_Array(); //稀疏矩阵转置
 cout<<"输出稀疏矩阵 x的转置 xt:" <<endl;
 xt.prt_XL_Array();
 y.in_XL_Array(); //以三元组形式从键盘输入稀疏矩阵非零元素
 cout<<"输出稀疏矩阵 y:" <<endl;
 y.prt_XL_Array();
 z=x+y; //稀疏矩阵相加
 cout<<"输出稀疏矩阵 z=x+y:" <<endl;
 z.prt_XL_Array();
 return 0;
}

上述程序的运行结果如下（带有下画线的为键盘输入）：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="8">输出稀疏矩阵 x:</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td colspan="8">输出稀疏矩阵 x的转置xt:</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>输入行数列数</td><td colspan="7">非零元素个数: 7 8 2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>输入行号</td><td style='text-align: center; word-wrap: break-word;'>列号</td><td colspan="6">非零元素值:</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2 4 5</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>5 7 8</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td colspan="8">输出稀疏矩阵 y:</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr></table>

## 3. 十字链表

稀疏矩阵还可以用十字链表的结构来表示。在用十字链表结构表示稀疏矩阵时，矩阵

中的每一个非零元素对应一个结点，每个结点有5个域：行域、列域、值域、向下域与向右域，如图2.40所示。其中，行域与列域分别存放非零元素所在的行号与列号，值域存放非零元素的值，向下域指示同一列中下一个非零元素的

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>row</td><td style='text-align: center; word-wrap: break-word;'>col</td><td style='text-align: center; word-wrap: break-word;'>val</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>行域</td><td style='text-align: center; word-wrap: break-word;'>列域</td><td style='text-align: center; word-wrap: break-word;'>值域</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>向下域</td><td colspan="2">向右域</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>down</td><td colspan="2">right</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 2.40 十字链表的结点结构</div> </div>

字储结点序号，向右域指示同一行中下一个非零元素的存储结点序号。

用十字链表表示稀疏矩阵的结构特点如下：

· 稀疏矩阵的每一行与每一列均用带表头结点的循环链表表示。

表头结点中的行域与列域的值均置为-1（row=-1，col=-1）。

· 行、列链表的表头结点合用，且这些表头结点存放在一个顺序存储空间中。

由此可以看出，只要给出行列链表的头指针，就可以很方便地扫描到稀疏矩阵中的任意一行或一列中的非零元素。

例如，稀疏矩阵

 $$ \begin{align*}\mathbf{A}=\begin{bmatrix}3&0&0&7\\0&0&1&0\\2&0&0&0\\0&0&0&0\\0&0&0&9\end{bmatrix}\end{align*} $$

可以用图2.41所示的十字链表表示。

<div style="text-align: center;"><div style="text-align: center;">图 2.41 十字链表示例</div> </div>

十字链表的结点结构用 C++ 描述如下：

template<class T>
struct CN
{
 int i;
 int j;
 T v;
 CN<T> * down;
 CN<T> * right;
};

下面给出用十字链表表示的稀疏矩阵类描述。

//CN_Array.h
#include<iostream>
#include<iomanip>
using namespace std;
//定义十字链表结点类型
template<class T>

struct CN
{
 int i;
 int j;
 T v;
 CN<T> * down;
 CN<T> * right;
};
// 非零元素所在的行号
// 非零元素所在的列号
// 非零元素值
// 向下指针域
// 向右指针域

// 十字链表表示的稀疏矩阵类
template<class T>
class CN_Array
{
 private:
 int mm;
 int nn;
 int tt;
 CN<T> * H;
 public:
 CN_Array() { H=NULL; return; } // 稀疏矩阵列数
 void in_CN_Array(); // 稀疏矩阵中非零元素个数
 void th_CN_Array(int, int, T[]); // 由一般稀疏矩阵转换
 void prt_CN_Array(); // 按行输出稀疏矩阵
}

// 以三元组形式从键盘输入稀疏矩阵非零元素
template<class T>
void CN_Array<T>::in_CN_Array()
{
 int k, m, n;
 T d;
 CN<T> * p, * q;
 cout<< "输入行数 列数 非零元素个数:";
 cin >> mm >> nn >> tt;
 if (mm>=nn) m=mm;
 else m=nn;
 H=new CN<T>[m]; // 申请十字链表行列表头结点存储空间
 for (k=0; k<m; k++)
 { H[k].i=-1; H[k].j=-1; H[k].down=&H[k]; H[k].right=&H[k]; }
 cout<< "输入行号 列号 非零元素值:"<endl;
 for (k=0; k<tt; k++) // 输入三元组
 {
 cin >> m >> n >> d;
 p=new CN<T>; // 申请一个十字链表结点
 p->i=m-1; p->j=n-1; p->v=d;
 q=&H[m-1];
 while (q->right!=&H[m-1]) q=q->right;
 q->right=p; p->right=&H[m-1]; // 链接到行尾
 q=&H[n-1];
 while (q->down!=&H[n-1]) q=q->down;
 q->down=p; p->down=&H[n-1]; // 链接到列尾
 }
 return;
 }

// 由一般稀疏矩阵转换
template<class T>
void CN_Array<T>::th_CN_Array(int m, int n, T a[])
{
 int p, q;

CN<T>*s, *k;
T d;
mm=m; nn=n; tt=0;
if (mm>=nn) q=mm;
else q=nn;
H=new CN<T>[q]; //申请十字链表行列表头结点存
for (p=0; p<q; p++)
{ H[p].i=-1; H[p].j=-1; H[p].down=&H[p]; H[p].right=&H[p]; }
for (p=0; p<m; p++)
{ for (q=0; q<n; q++)
{ d=a[p*n+q]; if (d!=0) //非零元素 { s=new CN<T>; //申请一个十字链表结点 s->i=p; s->j=q; s->v=d; k=&H[p]; while (k->right!=&H[p]) k=k->right; k->right=s; s->right=&H[p]; //链接到行尾 k=&H[q]; while (k->down!=&H[q]) k=k->down; k->down=s; s->down=&H[q]; //链接到列尾 tt=tt+1; }
return;
}
//按行输出稀疏矩阵
template<class T> //函数模板，T为虚拟类型
void CN_Array<T>::prt_CN_Array()
{ int k, kk;
CN<T>*p;
for (k=0; k<mm; k++) //按行输出 { p=&H[k]; p=p->right; for (kk=0; kk<nn; kk++) //输出一行 if (p->j==kk) //输出非零元素 { cout<<setw(8)<<p->v; p=p->right; }
else cout<<setw(8)<<0; //输出0 cout<<endl;
}
return;
}

下列主函数依次实现以下操作：

· 定义用十字链表表示的稀疏矩阵类对象，矩阵元素为双精度型。

直接将原始的稀疏矩阵a生成稀疏矩阵类对象x，然后输出稀疏矩阵x。

以三元组形式从键盘输入稀疏矩阵 y 的非零元素，然后输出稀疏矩阵 y。

//ch2_22.cpp
#include "CN_Array.h"
int main()

{ double a[7][8]= { 0,0,3,0,0,0,0,1 },
 {0,0,0,0,0,0,0,0},
 {9,0,0,0,0,0,0,0},
 {0,0,0,0,7,0,0,0},
 {0,0,0,0,0,0,6,0},
 {0,0,0,2,0,3,0,0},
 {0,0,5,0,0,0,0,0} };
//定义用十字链表表示的稀疏矩阵类对象x与y
x.th_CN_Array(7,8, &a[0][0]); //直接将原始的稀疏矩阵a用十字链表表示
cout<<"输出稀疏矩阵x:" <<endl;
x.prt_CN_Array();
y.in_CN_Array(); //以三元组形式从键盘输入稀疏矩阵非零元素
cout<<"输出稀疏矩阵y:" <<endl;
y.prt_CN_Array();
return 0;
}

上述程序的运行结果如下（带有下画线的为键盘输入）：

输出稀疏矩阵x：
0 0 3 0 0 0 0 0 1
0 0 0 0 0 0 0 0 0 0
9 0 0 0 0 0 0 0 0 0
0 0 0 0 0 7 0 0 0 0
0 0 0 0 0 0 0 0 6 0
0 0 0 0 2 0 3 0 0 0
0 0 5 0 0 0 0 0 0 0
输入行数列数非零元素个数：782
输入行号列号非零元素值：
245
578
输出稀疏矩阵y：
0 0 0 0 0 0 0 0 0
0 0 0 0 5 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 8 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0

用十字链表表示稀疏矩阵后，各种矩阵运算留给读者思考。

### 2.6.1 树的基本概念

树(tree)是一种简单的非线性结构。在树这种数据结构中，所有数据元素之间的关系具有明显的层次特性。图2.42表示一棵一般的树。由图2.42可以看出，在用图形表示树这种数据结构时，很像自然界中的树，只不过是一棵倒着生长的树，因此，这种数据结构就用“树”来命名。

在树的图形表示中，总是认为在用直线连起来的两端结点中，上端结点是前件，下端结

<div style="text-align: center;"><div style="text-align: center;">图2.42 一般的树</div> </div>

点是后件，这样，表示前后件关系的箭头就可以省略。

在现实世界中，能用树这种数据结构表示的例子有很多。例如，图2.43中的树表示学校的行政关系结构，图2.44中的树反映一本书的层次结构。由于树具有明显的层次关系，因此，具有层次关系的数据都可以用树这种数据结构来描述。在所有的层次关系中，人们最熟悉的是血缘关系，按血缘关系可以很直观地理解树结构中各数据元素结点之间的关系，因此，在描述树结构时，也经常使用血缘关系中的一些术语。

<div style="text-align: center;"><div style="text-align: center;">图 2.43 学校的行政层次结构树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.44 书的层次结构树</div> </div>

下面介绍树这种数据结构中的一些基本特征，同时介绍有关树结构的基本术语。

在树结构中，每一个结点只有一个前件，称为父结点。在树中，没有前件的结点只有一个，称为树的根结点，简称为树的根。例如在图2.42中，结点R是树的根结点。

在树结构中，每一个结点可以有多个后件，它们都称为该结点的子结点。没有后件的结

点称为叶子结点。例如在图2.42中，结点C、M、F、E、X、G、S、L、Z、A均为叶子结点。

在树结构中，一个结点所拥有的后件个数称为该结点的度。例如，在图2.42中，根结点R的度为4；结点T的度为3；结点K、B、N、H的度为2；结点P、Q、D、O、Y、W的度为1。叶子结点的度为0。在树中，所有结点中的最大度称为树的度。例如，图2.42所示的树的度为4。

前面已经说过，树结构具有明显的层次关系，即树是一种层次结构。在树结构中，一般按如下原则分层：根结点在第1层；同一层上所有结点的所有子结点在下一层。

例如在图2.42中，根结点R在第1层；结点K、P、Q、D在第2层；结点B、E、N、O、T在第3层；结点C、H、X、Y、S、W、Z、A在第4层；结点M、F、G、L在第5层。

树的最大层次称为树的深度。例如，图2.42所示的树的深度为5。

在树中，以某结点的一个子结点为根构成的树称为该结点的一棵子树。例如在图2.42中，结点R有4棵子树，它们分别以K、P、Q、D为根结点；结点P有1棵子树，其根结点为N；结点T有3棵子树，它们分别以W、Z、A为根结点。在树中，叶子结点没有子树。

在计算机中，可以用树结构来表示算术表达式。

在一个算术表达式中，有运算符和运算对象。一个运算符可以有若干个运算对象。例如，取正(+)与取负(-)运算符只有一个运算对象，称为单目运算符；加(+)、减(-)、乘(*)、除(/)、乘幂(*)运算符有两个运算对象，称为双目运算符；三元函数 f(x, y, z)中的 f 为函数运算符，它有三个运算对象，称为三目运算符。一般来说，多元函数运算符有多个运算对象，称为多目运算符。算术表达式中的一个运算对象可以是子表达式，也可以是单变量（或单变数）。例如，在表达式 a * b + c 中，运算符“+”有两个运算对象，其中 a * b 为子表达式，c 为单变量；而在子表达式 a * b 中，运算符“*”有两个运算对象 a 和 b，它们都是单变量。

用树来表示算术表达式的原则如下：

（1）表达式中的每一个运算符在树中对应一个结点，称为运算符结点。

（2）运算符的每一个运算对象在树中为该运算符结点的子树（在树中的顺序为从左到右）。

（3）运算对象中的单变量均为叶子结点。

根据以上原则，可以将表达式

 $$ \mathrm{a}\ast(\mathrm{b}+\mathrm{c}/\mathrm{d})+\mathrm{e}\ast\mathrm{h}-\mathrm{g}\ast\mathrm{f}(\mathrm{s},\mathrm{t},\mathrm{x}+\mathrm{y}) $$

用图2.45所示的树来表示。表示表达式的树通常称为表达式树。由图2.45可以看出，表示一个表达式的表达式树是不唯一的，如上述表达式可以表示成图2.45(a)和图2.45(b)所示的两种表达式树。

树在计算机中通常用多重链表表示。多重链表中的每个结点描述了树中对应结点的信息，而每个结点中的链域（指针域）个数将随树中该结点的度而定，其一般结构如图2.46所示。

在表示树的多重链表中，由于树中每个结点的度一般是不同的，因此，多重链表中各结点的链域个数也就不同，这将导致对树进行处理的算法很复杂。如果用定长的结点来表示树中的每个结点，即取树的度作为每个结点的链域个数，这就可以使对树的各种处理算法大大简化。但在这种情况下，容易造成存储空间的浪费，因为有可能在很多结点中存在空链

<div style="text-align: center;"><div style="text-align: center;">(a) 表达式树之一</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 表达式树之二</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.45  $  \mathbf{a} * (\mathbf{b} + \mathbf{c} / \mathbf{d}) + \mathbf{e} * \mathbf{h} - \mathbf{g} * \mathbf{f} (\mathbf{s}, \mathbf{t}, \mathbf{x} + \mathbf{y})  $ 的两种表达式树</div> </div>

域。后面将介绍用二叉树来表示一般的树的方法，会给处理带来方便。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>value(值)</td><td style='text-align: center; word-wrap: break-word;'>degree(度)</td><td style='text-align: center; word-wrap: break-word;'>$ link_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ link_{2} $</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>$ link_{n} $</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 2.46 树链表中的结点结构</div> </div>

## 1. 什么是二叉树

二叉树（binary tree）是一种很有用的非线性结构。二叉树不同于前面介绍的树结构，但它与树结构很相似，并且，树结构的所有术语都可以用到二叉树这种数据结构上。

二叉树具有以下两个特点：

（1）非空二叉树只有一个根结点。

（2）每一个结点最多有两棵子树，且分别称为该结点的左子树与右子树。

由以上特点可以看出，在二叉树中，每一个结点的度最大为2，即所有子树（左子树或右子树）也均为二叉树。而树结构中的每一个结点的度可以是任意的。另外，二叉树中的每一个结点的子树被明显地分为左子树与右子树。在二叉树中，一个结点可以只有左子树而没有右子树，也可以只有右子树而没有左子树。当一个结点既没有左子树也没有右子树时，该结点即是叶子结点。

图2.47(a)是一棵只有根结点的二叉树，图2.47(b)是一棵深度为4的二叉树。

<div style="text-align: center;"><div style="text-align: center;">(a) 只有根结点的二叉树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 深度为4的二叉树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图2.47 二叉树例</div> </div>

## 2. 二叉树的基本性质

二叉树具有以下几个性质。

性质1 在二叉树的第k层上，最多有 $ 2^{k-1}(k\geqslant1) $个结点。

根据二叉树的特点，这个性质是显然的。

性质2 深度为 m 的二叉树最多有  $ 2^{m}-1 $ 个结点。

深度为 m 的二叉树是指二叉树共有 m 层。

根据性质1，只要将第1层到第m层上的最大结点数相加，就可以得到整个二叉树中结点数的最大值，即

 $$ 2^{1-1}+2^{2-1}+\cdots+2^{m-1}=2^{m}-1 $$

性质3 在任意一棵二叉树中，度为0的结点（叶子结点）总是比度为2的结点多一个。

对于这个性质说明如下。

假设二叉树中有  $ n_{0} $ 个叶子结点， $ n_{1} $ 个度为 1 的结点， $ n_{2} $ 个度为 2 的结点，则二叉树中总的结点数为

 $$ n=n_{0}+n_{1}+n_{2} $$

由于在二叉树中除了根结点外，其余每一个结点都有唯一的一个分支进入。设二叉树中所有进入分支的总数为 m，则二叉树中总的结点数又为

 $$ n=m+1 $$

又由于二叉树中这 m 个进入分支是分别由非叶子结点射出的，其中度为 1 的每个结点射出 1 个分支，度为 2 的每个结点射出 2 个分支。因此，二叉树中所有度为 1 与度为 2 的结点射出的分支总数为  $ n_{1}+2n_{2} $。而在二叉树中，总的射出分支数应与总的进入分支数相等，即

 $$ m=n_{1}+2n_{2} $$

将(3)式代入(2)式有

 $$ n=n_{1}+2n_{2}+1 $$

最后比较(1)式和(4)式有

 $$ n_{0}+n_{1}+n_{2}=n_{1}+2n_{2}+1 $$

化简后得

 $$ n_{0}=n_{2}+1 $$

即：在二叉树中，度为0的结点（叶子结点）总是比度为2的结点多一个。

例如，在图2.47(b)所示的二叉树中，有3个叶子结点，有2个度为2的结点，度为0的结点比度为2的结点多一个。

性质4 具有 n 个结点的二叉树，其深度至少为  $ [\log_{2}n]+1 $，其中  $ [\log_{2}n] $ 表示取  $ \log_{2}n $ 的整数部分。

这个性质可以由性质2直接得到。

3. 满二叉树与完全二叉树

满二叉树与完全二叉树是两种特殊形态的二叉树。

### 1）满二叉树

所谓满二叉树，是指这样一种二叉树：除最后一层外，每一层上的所有结点都有两个子结点。这就是说，在满二叉树中，每一层上的结点数都达到最大值，即在满二叉树的第k层上有 $ 2^{k-1} $个结点，且深度为m的满二叉树有 $ 2^{m}-1 $个结点。

图2.48(a)、(b)、(c)分别是深度为2、3、4的满二叉树。

<div style="text-align: center;"><div style="text-align: center;">(a) 深度为2的满二叉树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 深度为3的满二叉树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 深度为4的满二叉树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.48 满二叉树</div> </div>

#### 2）完全二叉树

所谓完全二叉树，是指这样的二叉树：除最后一层外，每一层上的结点数均达到最大值；在最后一层上只缺少右边的若干结点。

更确切地说，如果从根结点起，对二叉树的结点自上而下、自左至右用自然数进行连续编号，则深度为 m，且有 n 个结点的二叉树，当且仅当其每一个结点都与深度为 m 的满二叉树中编号从 1 到 n 的结点一一对应时，称之为完全二叉树。

图2.49(a)、2.49(b)分别是深度为3、4的完全二叉树。

对于完全二叉树来说，叶子结点只可能在层次最大的两层上出现；对于任何一个结点，若其右分支下的子孙结点的最大层次为 p，则其左分支下的子孙结点的最大层次或为 p，或为  $ p+1 $。

从满二叉树与完全二叉树的特点可以看出，满二叉树也是完全二叉树，而完全二叉树一般不是满二叉树。

完全二叉树还具有以下两个性质。

性质 5 具有 n 个结点的完全二叉树的深度为  $ [\log_{2}n]+1 $。

性质6 设完全二叉树共有n个结点。如果从根结点开始，按层序（每一层从左到右）用自然数1,2,\cdots,n给结点进行编号，则对于编号为 $ k(k=1,2,\cdots,n) $的结点有以下结论：

（1）若 k=1，则该结点为根结点，它没有父结点；若 k>1，则该结点的父结点编号为 INT(k/2)。

（2）若  $ 2k \leqslant n $，则编号为 k 的结点的左子结点编号为 2k；否则该结点无左子结点（显然

<div style="text-align: center;"><div style="text-align: center;">(a) 深度为3的完全二叉树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 深度为4的完全二叉树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.49 完全二叉树</div> </div>

也没有右子结点）。

（3）若  $ 2k+1 \leqslant n $，则编号为 k 的结点的右子结点编号为  $ 2k+1 $；否则该结点无右子结点。

根据完全二叉树的这个性质，如果按从上到下、从左到右顺序存储完全二叉树的各结点，则很容易确定每一个结点的父结点、左子结点和右子结点的位置。

#### 2.6.3 二叉树的遍历

二叉树的遍历是指不重复地访问二叉树中的所有结点。

由于二叉树是一种非线性结构，因此，对二叉树的遍历要比遍历线性表复杂得多。在遍历二叉树的过程中，当访问到某个结点时，再往下访问可能有两个分支，那么先访问哪一个分支呢？对于二叉树说，需要访问根结点、左子树上的所有结点、右子树上的所有结点，在这三者中，究竟先访问哪一个？也就是说，遍历二叉树的方法实际上是要确定访问各结点的顺序，以便不重不漏地访问二叉树中的所有结点。

在遍历二叉树的过程中，一般先遍历左子树，然后遍历右子树。在先左后右的原则下，根据访问根结点的次序，二叉树的遍历可以分为3种：前序遍历、中序遍历、后序遍历。下面分别介绍这三种遍历的方法。

## 1. 前序遍历(DLR)

所谓前序遍历，是指在访问根结点、遍历左子树与遍历右子树这三者中，首先访问根结点，然后遍历左子树，最后遍历右子树；并且，在遍历左、右子树时，仍然先访问根结点，然后遍历左子树，最后遍历右子树。因此，前序遍历二叉树的过程是一个递归的过程。

下面是二叉树前序遍历的简单描述。

若二叉树为空，则结束返回；否则：

（1）访问根结点。

（2）前序遍历左子树。

### （3）前序遍历右子树。

在此特别要注意的是，在遍历左右子树时仍然采用前序遍历的方法。如果对图2.50中的二叉树进行前序遍历，则遍历的结果为F、C、A、D、B、E、G、H、P（称为该二叉树的前序序列）。

## 2. 中序遍历（LDR）

所谓中序遍历，是指在访问根结点、遍历左子树与遍历右子树这三者中，首先遍历左子树，然后访问根结点，最后遍历右子树；并且，在遍历左、右子树时，仍然先遍历左子树，然后访问根结点，最后遍历右子树。因此，中序遍历二叉树的过程也是一个递归的过程。

<div style="text-align: center;"><div style="text-align: center;">图2.50 二叉树</div> </div>

下面是二叉树中序遍历的简单描述。

若二叉树为空，则结束返回；否则：

（1）中序遍历左子树。

（2）访问根结点。

（3）中序遍历右子树。

在此也要特别注意，在遍历左右子树时仍然采用中序遍历的方法。如果对图2.50中的二叉树进行中序遍历，则遍历结果为A、C、B、D、F、E、H、G、P（称为该二叉树的中序序列）。

## 3. 后序遍历（LRD）

所谓后序遍历，是指在访问根结点、遍历左子树与遍历右子树这三者中，首先遍历左子树，然后遍历右子树，最后访问根结点；并且，在遍历左、右子树时，仍然先遍历左子树，然后遍历右子树，最后访问根结点。因此，后序遍历二叉树的过程也是一个递归的过程。

下面是二叉树后序遍历的简单描述。

若二叉树为空，则结束返回；否则：

（1）后序遍历左子树。

（2）后序遍历右子树。

（3）访问根结点。

在此也要特别注意，在遍历左右子树时仍然采用后序遍历的方法。如果对图2.50中的二叉树进行后序遍历，则遍历结果为A、B、D、C、H、P、G、E、F（称为该二叉树的后序序列）。

## 1. 二叉链表

在计算机中，二叉树通常采用链式存储结构。

与线性链表类似，用于存储二叉树中各元素的存储结点也由两部分组成：数据域与指针域。但在二叉树中，由于每一个元素可以有两个后件（两个子结点），因此，用于存储二叉树的存储结点的指针域有两个：一个用于指向该结点的左子结点的存储地址，称为左指针域；另一个用于指向该结点的右子结点的存储地址，称为右指针域。图2.51为二叉树存储

结点的示意图。其中， $ L(i) $为结点i的左指针域，即 $ L(i) $为结点i的左子结点的存储地址； $ R(i) $为结点i的右指针域，即 $ R(i) $为结点i的右子结点的存储地址； $ V(i) $为数据域。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">i</td><td style='text-align: center; word-wrap: break-word;'>Lchild</td><td style='text-align: center; word-wrap: break-word;'>Value</td><td style='text-align: center; word-wrap: break-word;'>Rchild</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>L(i)</td><td style='text-align: center; word-wrap: break-word;'>V(i)</td><td style='text-align: center; word-wrap: break-word;'>R(i)</td></tr></table>

由于二叉树的存储结构中每一个存储结点有两个指针域，因此，二叉树的链式存储结构也称为二叉链表。

<div style="text-align: center;"><div style="text-align: center;">图 2.51 二叉树存储结点的结构</div> </div>

图2.52(a)、2.52(b)、2.52(c)分别表示一棵二叉树、二叉链表的逻辑状态、二叉链表的物理状态。其中，BT称为二叉链表的头指针，用于指向二叉树根结点（存放二叉树根结点的存储地址）。

对于满二叉树与完全二叉树来说，根据完全二叉树的性质6，可以按层序进行顺序存储，这样不仅节省了存储空间，又能方便地确定每一个结点的父结点与左右子结点的位置。但顺序存储结构对于一般的二叉树不适用。

<div style="text-align: center;"><div style="text-align: center;">(b) 二叉链表的逻辑状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 二叉链表的物理状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.52 二叉树的链式存储结构</div> </div>

在 C++ 中，可以用如下形式来定义二叉链表中的结点结构。

template<class T>

struct Btnode

{ T d;

//定义二叉链表结点类型

//数据域

Btnode * lchild; //左指针域
Btnode * rchild; //右指针域
};

## 2. 二叉链表类

在二叉链表类中，数据成员只有一个根结点指针BT，成员函数包括二叉链表的生成以及二叉链表的前序、中序和后序遍历。

下面是定义二叉链表类的 C++ 描述。

//Binary_Tree.h
#include<iostream>
using namespace std;
//定义二叉链表结点类型
template<class T>
struct Btnode
{ T d;
Btnode *lchild;
Btnode *rchild;
};
//二叉链表类
template<class T>
class Binary_Tree
{ private:
Btnode<T>*BT;
public:
Binary_Tree() { BT=NULL; return; }
void creat_Binary_Tree(T);
void pretrav_Binary_Tree();
void intrav_Binary_Tree();
void postrav_Binary_Tree();
};
//数据域
//左指针域
//右指针域
//类模板，T为虚拟类型
//二叉链表根结点指针
//成员函数
//二叉链表初始化
//生成二叉链表
//前序遍历二叉链表
//中序遍历二叉链表
//后序遍历二叉链表

各成员函数的描述如下。

### 1）二叉链表的生成

二叉链表的生成是指根据给定的二叉树在计算机中建立链式存储结构。

假设按如下顺序依此输入给定二叉树及左右子树中的各结点值：

（1）输入根结点值。

（2）若左子树不空，则输入左子树，否则输入一个结束符。

（3）若右子树不空，则输入右子树，否则输入一个结束符。

<div style="text-align: center;"><div style="text-align: center;">图2.53 给定二叉树</div> </div>

例如，对于图2.53中给定的二叉树，按上述原则其输入的顺序如下：

其中▲表示异于各结点值的一个结束符值。

其成员函数如下：

//生成二叉链表
template<class T>
void Binary_Tree<T>::creat_Binary_Tree(T end)
{
 Btnode<T> *p;
 T x;
 cin >> x;
 if (x == end) return;
 p = new Btnode<T>;
 p->d = x; p->lchild = NULL; p->rchild = NULL;
 BT = p;
 creat(p, 1, end);
 creat(p, 2, end);
 return;
}
template<class T>
static creat(Btnode<T> *p, int k, T end)
{
 Btnode<T> *q;
 T x;
 cin >> x;
 if (x != end)
 {
 q = new Btnode<T>;
 q->d = x; q->lchild = NULL; q->rchild = NULL;
 if (k == 1) p->lchild = q;
 if (k == 2) p->rchild = q;
 creat(q, 1, end);
 creat(q, 2, end);
 }
 return 0;
}

特别要指出，如果二叉树中各结点的输入方法不同，其构造二叉链表的算法也是不同的。

2）二叉链表的前序遍历

其成员函数如下：

//前序遍历二叉链表
template<class T>
void Binary_Tree<T>::pretrav_Binary_Tree()
{
 Btnode<T>* p;
 p=BT;
 pretrav(p);
 cout<<endl;
 return;
}
template<class T>
static pretrav(Btnode<T>* p)
{
 if (p != NULL)
 {
 cout<<p->d<<" ";
 pretrav(p->lchild);
 pretrav(p->rchild);
 }
 return 0;
}
