# 上述程序的运行结果如下：

> 来源：docs/08_电子书/计算机软件技术基础（第5版）-徐士良、葛兵.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：d53505b4754eaf37


填入的原序列：
9 31 26 19 1 13 2 11 27 16 5 21
依次输出溢出 Hash 表中的关键字：
Hash 表：
<1><5><NULL><9><13><16><19><21><26><27><31><NULL>
溢出表：
<2><11><NULL><NULL><NULL><NULL><NULL><NULL><NULL>
查找序列各关键字在溢出 Hash 表中的位置（表项序号）：
4 11 9 7 1 5 -1 -2 10 6 2 8
删除 2 后依次输出溢出 Hash 表中的关键字：
Hash 表：
<1><5><NULL><9><13><16><19><21><26><27><31><NULL>
溢出表：
<11><NULL><NULL><NULL><NULL><NULL><NULL><NULL>
又删除 19 后依次输出溢出 Hash 表中的关键字：
Hash 表：
<1><5><NULL><9><13><16><NULL><21><26><27><31><NULL>
溢出表：
<11><NULL><NULL><NULL><NULL><NULL><NULL>

## 4. 拉链 Hash 表

拉链 Hash 表是一种最常用又最有效的 Hash 表。拉链 Hash 表又分为外链 Hash 表与内链 Hash 表。下面主要讨论外链 Hash 表。

外链 Hash 表由 Hash 表及表外结点组成。在 Hash 表中，登记的不是关键字 k 及有关信息，而只是指针。所有的关键字 k 及有关信息分别被登记在表外各结点中，每一个表外结点还含有一个指针域，用来链接 Hash 码相同的各结点。因此，在外链 Hash 表中，各表外结点按关键字的 Hash 码被链接成各单链表，而各单链表的头指针被登记在 Hash 表的各表项中，即 Hash 表的第 i 项登记着 Hash 码为 i 的所有关键字的表外结点。在初始状态下，Hash 表中的所有指针为空。

设数组  $ H(1:n) $ 为 Hash 表的存储空间，其初始状态为  $ H(i)=0(i=1,2,\cdots,n) $，则外链 Hash 表的填入与取出过程如下。

### 1）外链 Hash 表的填入

将关键字 k 及有关信息填入外链 Hash 表的步骤如下：

（1）计算关键字 k 的 Hash 码 i=i(k)。

（2）取得一个新结点 p，并将关键字 k 及有关信息填入结点 p。

（3）将结点 p 链入以  $ H(i) $ 为头指针的链表的链头。

在填入关键字 k 及有关信息的过程中，一般总是将新的结点链接到相应链表的链头，而不是链接到链尾。这样处理的优点是填表比较快，并且在外链 Hash 表的实际应用中，往往是后填入的关键字的使用频率要比先填入的高，

因此，这种处理也能提高查找效率。

例 3.6 将关键字序列(09,31,26,19,01,13,02,11,27,16,05,21)依次填入长度为 n=12 的外链 Hash 表中。设 Hash 码为 i=INT(k/3)+1。

填入后的外链 Hash 表如图 3.2 所示。

#### 2）外链 Hash 表的取出

要在外链 Hash 表中取出关键字 k 的元素，其步骤如下：

（1）计算关键字 k 的 Hash 码 i=i(k)。

（2）在以 $ H(i) $为头指针的链表中顺序查找关键字为k的结点。若找到，则从结点中取出该元素。

下面是对外链 Hash 表类的 C++ 描述：

<div style="text-align: center;"><div style="text-align: center;">图 3.2 外链 Hash 表示例</div> </div>

//Link_hash.h
#include<iostream>
using namespace std;
//外链 Hash 表结点类型
template<class T>
struct LHnode
{
 T key;
 LHnode *next; //指针域
};
template<class T> //模板声明，数据元素虚拟类型为 T
class Link_hash //外链 Hash 表类
{
 private: //数据成员
 int NN; //外链 Hash 表长度
 LHnode<T> * * LH; //外链 Hash 表存储空间首地址
 public: //成员函数
 Link_hash() { NN=0; return; }
 Link_hash(int); //建立外链 Hash 表存储空间
 void prt_Link_hash(); //顺序输出外链 Hash 表中的元素
 void ins_Link_hash(int (* f)(T), T); //在外链 Hash 表中填入新元素
 LHnode<T>* sch_Link_hash(int (* f)(T), T); //在外链 Hash 表中查找元素
 void del_Link_hash(int (* f)(T), T); //在外链 Hash 表中删除一个元素
 };

//建立外链 Hash 表存储空间
template<class T>
Link_hash<T>::Link_hash(int m)
{
 int k;
 NN=m;
 LH=new LHnode<T>* [NN];
 for (k=0; k<NN; k++)
 LH[k]=NULL;
 return;
}

//顺序输出外链 Hash 表中的元素
template<class T>
void Link_hash<T>::prt_Link_hash()
{
 int k;
 LHnode<T>* p;
 for (k=0; k<NN; k++)
 { p=LH[k];
 cout<<k+1<<" ";
 if (p==NULL) cout<<"<NULL>";
 else
 while (p!=NULL)
 { cout<<p->key;
 p=p->next;
 }
 cout<<endl;
}

return;
}

//在外链 Hash 表中填入新元素
template<class T>
void Link_hash<T>::ins_Link_hash(int (*f)(T), Tx)
{
 int k;
 LHnode<T>* p;
 k=(*f)(x);
 p=new LHnode<T>;
 p->key=x;
 p->next=LH[k-1]; LH[k-1]=p;
 return;
}

//在外链 Hash 表中查找元素
template<class T>
LHnode<T>* Link_hash<T>::sch_Link_hash(int (*f)(T), Tx)
{
 int k;
 LHnode<T>* p;
 k=(*f)(x);
 p=LH[k-1];
 while ((p!=NULL) &&(p->key!=x)) p=p->next;
 return(p);
}

//在外链 Hash 表中删除一个元素
template<class T>
void Link_hash<T>::del_Link_hash(int (*f)(T), T x)
{
 int k;
 LHnode<T>* p, *q;
 k = (*f)(x);
 p = LH[k-1]; q = NULL;
 while ((p != NULL) && (p->key != x))
 //计算 Hash 码
 {
 q = p; p = p->next;
 if (p == NULL)
 cout << "表中没有这个关键字: <<endl;
 else if (q != NULL) q->next = p->next;
 else LH[k-1] = p->next;
 return;
 }
}

下面是例3.6的主函数：

//ch3_5.cpp
#include "Link_hash.h"
int hashf(int k);
int main()
{
 int a[12]={9,31,26,19,1,13,2,11,27,16,5,21};
 int k;
 Link_hash<int>h(12); //建立容量为12的外链Hash表空间
 cout<<"填入的原序列:"<<endl;
 for (k=0; k<12; k++)
 cout<<a[k]<<";
 cout<<endl;
 for (k=0; k<12; k++)
 h.ins_Link_hash(hashf, a[k]);
 cout<<"依次输出外链Hash表中的关键字:"<<endl;
 h.prt_Link_hash();
 cout<<"查找序列各关键字在外链Hash表中结点序号:"<<endl;
 for (k=0; k<12; k++)
 cout<<h.sch_Link_hash(hashf, a[k])<<";
 cout<<endl;
 h.del_Link_hash(hashf, 2);
 cout<<"删除2后依次输出溢出Hash表中的关键字:"<<endl;
 h.prt_Link_hash();
 h.del_Link_hash(hashf, 19);
 cout<<"又删除19后依次输出溢出Hash表中的关键字:"<<endl;
 h.prt_Link_hash();
 return 0;
}
int hashf(int k) //Hash 函数
{
 return(k/3+1);
}

上述程序的运行结果如下：

填入的原序列：
9 31 26 19 1 13 2 11 27 16 5 21
依次输出外链 Hash 表中的关键字：
1 ----→2 ----→1

2  -----5
3  <NULL>
4  -----11  -----9
5  -----13
6  -----16
7  -----19
8  -----21
9  -----26
10  -----27
11  -----31
12 <NULL>
查找序列各关键字在外链 Hash 表中的结点序号：
00481FF0 00481FA0 00481F60 00481F20 00481FE0 00481D00 00481CC0 00481C80
00481C40 00481C00 00481BC0 00481B80
删除 2 后依次输出溢出 Hash 表中的关键字：
1  -----1
2  -----5
3  <NULL>
4  -----11  -----9
5  -----13
6  -----16
7  -----19
8  -----21
9  -----26
10  -----27
11  -----31
12 <NULL>
又删除 19 后依次输出溢出 Hash 表中的关键字：
1  -----1
2  -----5
3  <NULL>
4  -----11  -----9
5  -----13
6  -----16
7  <NULL>
8  -----21
9  -----26
10  -----27
11  -----31
12 <NULL>

## 5. 指标 Hash 表

前面讨论的所有 Hash 表中，各关键字 k 及有关信息所占的表项空间长度均相等。如果各关键字及有关信息的长度各不相同，则 Hash 表的表项空间的设计就会很困难。如果 Hash 表的每一表项空间按最大长度设计，则会造成存储空间的浪费。在这种情况下，指标 Hash 表具有明显的优越性。

指标 Hash 表包括指标表与内容表两部分。在指标 Hash 表中，所有的关键字及有关信息被登记在内容表中，每个关键字的信息占内容表中的一段连续空间。在实际存储时，为了能够方便地分割内容表中各关键字的信息，通常在关键字的信息中还包含信息的长度或者在信息的最后附设一个结束标志。指标表为 Hash 表，它可以是前面所讨论的任何一种

Hash 表，但在 Hash 表的各表项中不再存放关键字及有关信息，而只是指示对应关键字信息在内容表中的地址。

由于存放一个地址所需的存储空间比存放一个关键字及有关信息的存储空间要小得多，因此，为了减少 Hash 码的冲突，通常可将指标表的长度（Hash 表的长度）设计得大一些，这样，浪费的也只是少量存放指标（地址）的空间，而内容表的空间却可以得到极为充分的利用。这是指标 Hash 表的一个显著优点，并且广泛用于关键字信息长度相等的情况。

### 3.3 基本的排序技术

排序也是数据处理的重要内容。所谓排序，是指将一个无序序列整理成按值非递减顺序排列的有序序列。排序的方法有很多，根据待排序序列的规模以及对数据处理的要求，可以采用不同的排序方法。本节主要介绍一些常用的排序方法。

排序可以在各种不同的存储结构上实现。在本节所介绍的排序方法中，其排序的对象一般认为是顺序存储的线性表，在程序设计语言中就是一维数组。

#### 3.3.1 冒泡排序与快速排序

冒泡排序与快速排序属于互换类的排序方法。所谓互换排序，是指借助数据元素之间的互相交换进行排序的一种方法。

## 1. 冒泡排序

冒泡排序是一种最简单的互换类排序方法，它通过相邻数据元素的交换逐步将线性表变成有序。

### 冒泡排序的基本过程如下：

首先，从表头开始往后扫描线性表，在扫描过程中逐次比较相邻两个元素的大小。若相邻两个元素中，前面的元素大于后面的元素，则将它们互换，称为消去了一个逆序。显然，在扫描过程中，不断将两相邻元素中的大者往后移动，最后就将线性表中的最大者换到了表的最后，这也是线性表中最大元素应有的位置。

然后，从后到前扫描剩下的线性表，同样，在扫描过程中逐次比较相邻两个元素的大小。若相邻两个元素中，后面的元素小于前面的元素，则将它们互换，这样就又消去了一个逆序。显然，在扫描过程中，不断将两相邻元素中的小者往前移动，最后就将剩下线性表中的最小者换到了表的最前面，这也是线性表中最小元素应有的位置。

对剩下的线性表重复上述过程，直到剩下的线性表变空为止，此时的线性表已经变为有序。

在上述排序过程中，对线性表的每一次来回扫描后，都将其中的最大者沉到了表的底部，最小者像气泡一样冒到表的前头。冒泡排序由此而得名，且冒泡排序又称下沉排序。

假设线性表的长度为 n，则在最坏情况下，冒泡排序需要经过 n/2 遍的从前往后的扫描和 n/2 遍的从后往前的扫描，需要的比较次数为  $ n(n-1)/2 $。但这个工作量不是必须的，一般情况下要小于这个工作量。

图 3.3 是冒泡排序过程示意图。图中有方框的元素位置表示扫描过程中最后一次发生交换的位置。由图 3.3 可以看出，整个排序实际上只用了两遍从前往后的扫描和两遍从后

往前的扫描就完成了。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>原序列</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第1遍（从前往后）</td><td style='text-align: center; word-wrap: break-word;'>5→1</td><td style='text-align: center; word-wrap: break-word;'>7→3→1→6</td><td colspan="9">9→4→2→8→6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>结果</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>9</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>（从后往前）</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>5→3→1</td><td colspan="9">6→7→4→2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>结果</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第2遍（从前往后）</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>5→3→2</td><td colspan="8">6→7→4→6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>结果</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>（从后往前）</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>3→2</td><td colspan="8">5→6→4</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>结果</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第3遍（从前往后）</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>最后结果</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 3.3 冒泡排序过程示意图</div> </div>

冒泡排序的 C++ 描述如下：

//bub.h
template<class T>
void bub(T p[], int n)
{
 int m, k, j, i;
 T d;
 k = 0; m = n - 1;
 while (k < m)
 {
 j = m - 1; m = 0;
 for (i = k; i <= j; i++)
 //从前往后扫描
 if (p[i] > p[i + 1])
 {
 d = p[i]; p[i] = p[i + 1]; p[i + 1] = d; m = i;
 j = k + 1; k = 0;
 for (i = m; i >= j; i++)
 //从后往前扫描
 if (p[i - 1] > p[i])
 {
 d = p[i]; p[i] = p[i - 1]; p[i - 1] = d; k = i;
 }
 return;
 }

主函数的例子如下：

//ch3_6.cpp
#include "bub.h"
#include<iostream>
#include<iomanip>
using namespace std;
int main()
{
 int i, j;
 double p[50], r = 1.0;
 for (i = 0; i < 50; i++)
 //产生50个0~1的随机数
 {
 r = 2053.0 * r + 13849.0;
 j = r / 65536.0;
 r = r - j * 65536.0;
 p[i] = r / 65536.0;
 }
 for (i = 0; i < 50; i++)
 //产生50个100~300的随机数
}

p[i]=100.0+200.0 * p[i];
cout<<"排序前的序列:"<<endl;
for (i=0; i<10; i++)
{
 for (j=0; j<5; j++)
 cout<<setw(10) << p[5 * i + j];
 cout<<endl;
}
bub(p+10, 30); //对原序列中的第11到第40个元素进行排序
cout<<"排序后的序列:"<<endl;
for (i=0; i<10; i++)
{
 for (j=0; j<5; j++)
 cout<<setw(10) << p[5 * i + j];
 cout<<endl;
}
return 0;
}

上述程序的运行结果如图 3.4 所示。

<div style="text-align: center;"><div style="text-align: center;">图 3.4 运行结果</div> </div>

在前面所讨论的冒泡排序中，由于在扫描过程中只对相邻两个元素进行比较，因此，在互换两个相邻元素时只能消除一个逆序。如果通过两个（不是相邻的）元素的交换，能够消除线性表中的多个逆序，就会大大加快排序的速度。显然，为了通过一次交换能消除多个逆序，就不能像冒泡排序那样对相邻两个元素进行比较，因为这只能使相邻两个元素进行交换，从而只能消除一个逆序。下面介绍的快速排序可以通过一次交换而消除多个逆序。

## 2. 快速排序

快速排序也是一种互换类的排序方法，但由于它比冒泡排序的速度快，因此称之为快速排序。快速排序的基本思想如下：

从线性表中选取一个元素，设为 T，然后将线性表后面小于 T 的元素移到前面，而前面大于 T 的元素移到后面，结果就将线性表分成了两部分（称为两个子表），T 插入其分界线的位置处，这个过程称为线性表的分割。通过对线性表的一次分割，就以 T 为分界线，将线性表分成了前后两个子表，且前面子表中的所有元素均不大于 T，而后面子表中的所有元

素均不小于T。

如果对分割后的各子表再按上述原则进行分割，并且，这种分割过程可以一直做下去，直到所有子表为空为止，则此时的线性表就变成了有序表。

<div style="text-align: center;"><div style="text-align: center;">图 3.5 快速排序示意图</div> </div>

由此可知，快速排序的关键是对线性表的分割，以及对各分割出的子表再进行分割，这个过程如图3.5所示。

在对线性表或子表进行实际分割时，可以按如下

步骤进行：

首先，在表的第一个、中间与最后一个元素中选取中项，设为  $ P(k) $，并将  $ P(k) $ 赋给 T，再将表中的第一个元素移到  $ P(k) $ 的位置上。

然后设置指针 i 和 j 分别指向表的起始与最后的位置。反复作以下两步：

（1）将 j 逐渐减小，并逐次比较  $ P(j) $ 与 T，直到发现一个  $ P(j) < T $ 为止，将  $ P(j) $ 移到  $ P(i) $ 的位置上。

（2）将 i 逐渐增大，并逐次比较  $ P(i) $ 与 T，直到发现一个  $ P(i) > T $ 为止，将  $ P(i) $ 移到  $ P(j) $ 的位置上。

上述两个操作交替进行，直到指针 i 与 j 指向同一个位置  $ (i=j) $ 为止，此时将 T 移到  $ P(i) $ 的位置上。

有了对线性表的分割算法后，快速排序的算法就很简单了。根据快速排序的基本思想，可以得到快速排序的 C++ 描述如下：

//qck.h
#include "bub.h"
template<class T>
void qck(T p[], int n)
{
 int m, i;
 T *s;
 if (n>10)
 { i=split(p,n); qck(p,i); s=p+(i+1); m=n-(i+1); qck(s,m);
 }
 else
 bub(p,n);
 return;
}
//表的分割
template<class T>
static int split(T p[], int n)
{
 int i, j, k, l;
}
//子表长度大于10，用快速排序
//对表进行分割
//对前面的子表进行快速排序
//对后面的子表进行快速排序
//子表长度小于10，用冒泡排序

T t;
i=0; j=n-1;
k=(i+j)/2;
if ((p[i]>=p[j])&&(p[j]>=p[k])) l=j;
else if ((p[i]>=p[k])&&(p[k]>=p[j])) l=k;
else l=i;
t=p[1]; //选取一个元素为T
p[1]=p[i];
while (i!=j)
{
 { while ((i<j)&&(p[j]>=t)) //逐渐减小j,直到发现p[j]<t
 j=j-1;
 if (i<j)
 { p[i]=p[j]; i=i+1;
 while ((i<j)&&(p[i]<=t)) //逐渐增大i,直到发现p[i]>t
 i=i+1;
 if (i<j)
 { p[j]=p[i]; j=j-1;}
 }
 }
 p[i]=t;
 return(i); //返回分界线位置
}

快速排序在最坏情况下需要  $ n(n-1)/2 $ 次比较，但实际的排序效率要比冒泡排序高得多。主函数示例与冒泡排序示例相似。

### 3.3.2 简单插入排序与谢尔排序

冒泡排序与快速排序本质上都是通过数据元素的交换来逐步消除线性表中逆序。本节讨论另一类排序的方法，即插入类排序。

## 1. 简单插入排序

所谓插入排序，是指将无序序列中的各元素依次插入已经有序的线性表中。

可以想象，在线性表中，只包含第1个元素的子表显然可以看成有序表。接下来的问题是，从线性表的第2个元素开始直到最后一个元素，逐次将其中的每一个元素插入前面已经有序的子表中。一般来说，假设线性表中前j-1个元素已经有序，现在要将线性表中第j个元素插入前面的有序子表中，插入过程如下：

首先将第 j 个元素放到一个变量 T 中，然后从有序子表的最后一个元素（线性表中第 j-1 个元素）开始，往前逐个与 T 进行比较，将大于 T 的元素均依次向后移动一个位置，直到发现一个元素不大于 T 为止，此时就将 T（原线性表中的第 j 个元素）插入刚移出的空位置上，有序子表的长度就变为 j 了。

图3.6给出了插入排序的示意图。图中画有方框的元素表示刚被插入有序子表中。

在简单插入排序中，每一次比较后最多移掉一个逆序，因此，这种排序方法的效率与冒泡排序法相同。在最坏情况下，简单插入排序需要 $ n(n-1)/2 $次比较。

简单插入排序的 C++ 描述如下：

<div style="text-align: center;"><div style="text-align: center;">图 3.6 简单插入排序示意图</div> </div>

//insert.h
template<class T>
void insert(T p[], int n)
{
 int j, k;
 T t;
 for (j=1; j<n; j++)
 {
 t=p[j];
 k=j-1;
 while ((k>=0) && (p[k]>t))
 {
 p[k+1]=p[k]; k=k-1;
 p[k+1]=t;
 }
 return;
 }
}

主函数示例与冒泡排序示例相似。

## 2. 谢尔排序

谢尔排序(Shell sort)属于插入类排序，但它对简单插入排序做了较大的改进。

谢尔排序的基本思想如下：

将整个无序序列分割成若干小的子序列分别进行插入排序。

子序列的分割方法如下：

将相隔某个增量 h 的元素构成一个子序列。在排序过程中，逐次减小这个增量。最后，当 h 减到 1 时，进行一次插入排序，排序就完成了。

增量序列一般取  $ h_{k}=n/2^{k}(k=1,2,\cdots,[\log_{2}n]) $，其中 n 为待排序序列的长度。

图 3.7 为谢尔排序的示意图。

<div style="text-align: center;"><div style="text-align: center;">图 3.7 谢尔排序示意图</div> </div>

在谢尔排序过程中，虽然对于每一个子表采用的仍是插入排序，但是，在子表中每进行一次比较就有可能移去整个线性表中的多个逆序，从而改善整个排序过程的性能。

谢尔排序的效率与选取的增量序列有关。如果选取上述增量序列，则在最坏情况下，谢尔排序所需要的比较次数为  $ O(n^{1.5}) $。

谢尔排序的 C++ 描述如下：

//shel.h
template<class T>
void shel(T p[], int n)
{
 int k, j, i;
 T t;
 k = n / 2;
 while (k > 0)
 {
 for (j = k; j <= n - 1; j++)
 {
 t = p[j]; i = j - k;
 while ((i >= 0) && (p[i] > t))
 {
 p[i + k] = p[i]; i = i - k;
 p[i + k] = t;
 }
 k = k / 2;
 }
 return;
 }

主函数示例与冒泡排序示例相似。

## 1. 简单选择排序

选择排序的基本思想如下：

扫描整个线性表，从中选出最小的元素，将它交换到表的最前面（这是它应有的位置）；然后对剩下的子表采用同样的方法，直到子表空为止。

对于长度为 n 的序列，选择排序需要扫描 n-1 遍，每一遍扫描均从剩下的子表中选出最小的元素，然后将该最小的元素与子表中的第一个元素进行交换。图 3.8 是这种排序的

示意图，图中有方框的元素是刚被选出来的最小元素。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>原序列</td><td style='text-align: center; word-wrap: break-word;'>89</td><td style='text-align: center; word-wrap: break-word;'>21</td><td style='text-align: center; word-wrap: break-word;'>56</td><td style='text-align: center; word-wrap: break-word;'>48</td><td style='text-align: center; word-wrap: break-word;'>85</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>47</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第1遍选择</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>21</td><td style='text-align: center; word-wrap: break-word;'>56</td><td style='text-align: center; word-wrap: break-word;'>48</td><td style='text-align: center; word-wrap: break-word;'>85</td><td style='text-align: center; word-wrap: break-word;'>89</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>47</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第2遍选择</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>56</td><td style='text-align: center; word-wrap: break-word;'>48</td><td style='text-align: center; word-wrap: break-word;'>85</td><td style='text-align: center; word-wrap: break-word;'>89</td><td style='text-align: center; word-wrap: break-word;'>21</td><td style='text-align: center; word-wrap: break-word;'>47</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第3遍选择</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>21</td><td style='text-align: center; word-wrap: break-word;'>48</td><td style='text-align: center; word-wrap: break-word;'>85</td><td style='text-align: center; word-wrap: break-word;'>89</td><td style='text-align: center; word-wrap: break-word;'>56</td><td style='text-align: center; word-wrap: break-word;'>47</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第4遍选择</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>21</td><td style='text-align: center; word-wrap: break-word;'>47</td><td style='text-align: center; word-wrap: break-word;'>85</td><td style='text-align: center; word-wrap: break-word;'>89</td><td style='text-align: center; word-wrap: break-word;'>56</td><td style='text-align: center; word-wrap: break-word;'>48</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第5遍选择</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>21</td><td style='text-align: center; word-wrap: break-word;'>47</td><td style='text-align: center; word-wrap: break-word;'>48</td><td style='text-align: center; word-wrap: break-word;'>89</td><td style='text-align: center; word-wrap: break-word;'>56</td><td style='text-align: center; word-wrap: break-word;'>85</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第6遍选择</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>21</td><td style='text-align: center; word-wrap: break-word;'>47</td><td style='text-align: center; word-wrap: break-word;'>48</td><td style='text-align: center; word-wrap: break-word;'>56</td><td style='text-align: center; word-wrap: break-word;'>89</td><td style='text-align: center; word-wrap: break-word;'>85</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第7遍选择</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>21</td><td style='text-align: center; word-wrap: break-word;'>47</td><td style='text-align: center; word-wrap: break-word;'>48</td><td style='text-align: center; word-wrap: break-word;'>56</td><td style='text-align: center; word-wrap: break-word;'>85</td><td style='text-align: center; word-wrap: break-word;'>89</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 3.8 简单选择排序示例</div> </div>

简单选择排序在最坏情况下需要比较  $ n(n-1)/2 $ 次。

简单选择排序的 C++ 描述如下：

//select.h
template<class T>
void select(T p[], int n)
{
 int i, j, k;
 T d;
 for (i=0; i<n-1; i++)
 {
 k=i;
 for (j=i+1; j<n; j++)
 if (p[j]<p[k]) k=j;
 if (k!=j)
 {
 d=p[i]; p[i]=p[k]; p[k]=d;
 }
 return;
 }

主函数示例与冒泡排序示例相似。

## 2. 堆排序

堆的定义如下：

堆排序属于选择类的排序方法。

具有 n 个元素的序列 $ (h_{1}, h_{2}, \cdots, h_{n}) $，当且仅当满足

 $$ \left\{\begin{aligned}h_{i}&\geqslant h_{2i}\\ h_{i}&\geqslant h_{2i+1}\end{aligned}\right.\quad 或 \quad\left\{\begin{aligned}h_{i}&\leqslant h_{2i}\\ h_{i}&\leqslant h_{2i+1}\end{aligned}\right. $$

 $ (i=1,2,\cdots,n/2) $ 时称之为堆。本节只讨论满足前者条件的堆。

<div style="text-align: center;"><div style="text-align: center;">图3.9 堆顶元素为最大的堆</div> </div>

由堆的定义可以看出，堆顶元素（第一个元素）必为最大项。

在实际处理中，可以用一维数组  $ H(1:n) $ 来存储堆序列中的元素，也可以用完全二叉树来直观地表示堆的结构。例如，序列（91，85，53，36，47，30，24，12）是一个堆，它所对应的完全二叉树如图3.9所示。由图3.9可以看出，在用完全二叉树表示堆时，树中所有非叶子结点值均不小于其左、右子树的根结点值，因此，堆顶（完全二叉树的根

结点）元素必为序列中 n 个元素中的最大项。

在具体讨论堆排序之前，先讨论这样一个问题：在一棵具有n个结点的完全二叉树（用一维数组 $ H(1:n) $表示）中，假设结点 $ H(m) $的左右子树均为堆，现要将以 $ H(m) $为根结点的子树也调整为堆，这是调整建堆的问题。

例如，假设图3.10(a)是某完全二叉树的一棵子树。显然，在这棵子树中，根结点47的左、右子树均为堆。现在为了将整个子树调整为堆，首先将根结点47与其左、右子树的根结点值进行比较，此时由于左子树根结点91大于右子树根结点53，且它又大于根结点47，因此，根据堆的条件，应将元素47与91交换，如图3.10(b)所示。经过这一次交换后，破坏了原来左子树的堆结构，需要对左子树再进行调整，将元素85与47进行交换，调整后的结果如图3.10(c)所示。

<div style="text-align: center;"><div style="text-align: center;">(a) 某完全二叉树的一棵子树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 元素 47 与 91 交换后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 元素 85 与 47 交换后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 3.10 调整建堆示意图</div> </div>

由这个例子可以看出，在调整建堆的过程中，总是将根结点值与左、右子树的根结点值进行比较，若不满足堆的条件，则将左、右子树根结点值中的大者与根结点值进行交换。这个调整过程一直做到所有子树均为堆为止。

完全二叉树中的所有结点值是从根结点开始一层一层地从左到右存储在一维数组 H 中。而对于完全二叉树的顺序存储结构来说，结点 k 的左子树根结点为 2k，右子树的根结点为 2k+1。因此，在上述算法中没有用到指针运算，而只用到数组的下标运算。

有了调整建堆的算法后，就可以将一个无序序列建成为堆。

假设无序序列  $ H(1:n) $ 以完全二叉树表示。从完全二叉树的最后一个非叶子结点（第 n/2 个元素）开始，直到根结点（第一个元素）为止，对每一个结点进行调整建堆，最后就可以得到与该序列对应的堆。

根据堆的定义，可以得到堆排序的方法如下：

（1）将一个无序序列建成堆。

（2）将堆顶元素（序列中的最大项）与堆中最后一个元素交换（最大项应该在序列的最后）。不考虑已经换到最后的那个元素，只考虑前 n-1 个元素构成的子序列，显然，该子序列已不是堆，但左、右子树仍为堆，可以将该子序列调整为堆。反复做第（2）步，直到剩下的子序列为空为止。

堆排序的方法对于规模较小的线性表并不适合，但对于较大规模的线性表来说是很有效的。在最坏情况下，堆排序需要比较的次数为  $ O(n \log_{2} n) $。

堆排序的 C++ 描述如下：

//hap.h
template<class T>
void hap(T p[], int n)
{
 int i, mm;
 T t;
 mm = n / 2;
 for (i = mm - 1; i >= 0; i--) //无序序列建堆
 sift(p, i, n - 1);
 for (i = n - 1; i >= 1; i--)
 { t = p[0]; p[0] = p[i]; p[i] = t; //堆顶元素换到最后
 sift(p, 0, i - 1); //调整建堆
 }
 return;
}
template<class T>
static sift(T p[], int i, int n)
{
 int j;
 T t;
 t = p[i]; j = 2 * (i + 1) - 1;
 while (j <= n)
 { if ((j < n) && (p[j] < p[j + 1])) j = j + 1;
 if (t < p[j])
 { p[i] = p[j]; i = j; j = 2 * (i + 1) - 1;
 else j = n + 1;
 }
 p[i] = t;
 return (0);
}

主函数示例与冒泡排序示例相似。

### 3.3.4 其他排序方法简介

本节开头已经指出，排序的方法有很多，且各有优缺点，在实际应用中，读者可以根据需要与条件进行选择。在前面介绍的几种排序方法的基础上，本节再简要介绍另外两种排序方法。

## 1. 归并排序

所谓归并（merging），是指将两个或两个以上的有序表合并成一个新的有序表。

在具体讨论归并排序之前，先考虑一种特殊情形。

设线性表  $ L(1:n) $ 中的某段  $ L(\text{low}:\text{high}) $ 已经部分有序，即它的两个子表  $ L(\text{low}:\text{mid}) $ 与  $ L(\text{mid}+1:\text{high}) $（其中  $ \text{low} \leq \text{mid} \leq \text{high} $）已经有序，现要将这两个有序子表归并成一个有序子表  $ L(\text{low}:\text{high}) $。

实现上述两个子表的归并是不难的，基本做法如下。

（1）开辟一个与线性表 L 同样大小的表空间 A。

（2）设置3个指针i,j,k，其初始状态分别指向两个有序子表的首部及表空间A中与L中需要进行排序段相对应空间的首部，即i=low,j=mid+1,k=low。

（3）沿两个有序子表扫描：

若  $ L(i)\leqslant L(j) $，则  $ A(k)=L(i) $，且 i 与 k 指针均加 1；否则  $ A(k)=L(j) $，且 j 与 k 指

针均加1。如此反复，直到有一个子表的指针已经指到末端（子表内的元素已经取空）为止。

（4）将未取空的子表中的剩余元素依次放入表空间A。

（5）将 A 中的对应段复制到 L。

所谓归并排序(merge sort)，是指把一个长度为 n 的线性表看成由 n 个长度为 1 的有序表组成，然后反复进行两两归并，最后就得到长度为 n 的有序线性表。由于归并是两两进行的，因此也称之为 2-路归并排序。

图 3.11 为归并排序的示意图。

<div style="text-align: center;"><div style="text-align: center;">图 3.11 归并排序示意图</div> </div>

归并排序的计算工作量为  $ O(n \log_{2} n) $。

归并排序的算法有递归和非递归两种形式。下面给出归并排序非递归算法的 C++ 描述。

//merge.h
template<class T>
void merge(T p[], int n)
{
 int m, k, j, low, high, mid;
 T *a;
 a = new T[n];
 m = 1;
 while (m < n)
 {
 k = 2 * m;
 for (j = 1; j <= n; j = j + k)
 {
 low = j; high = j + k - 1; mid = j + m - 1;
 if (high > n) high = n;
 if (high > mid)
 merg(p, low, mid, high, a);
 }
 m = k;
 }
 delete[] a;
 return;
 }

template<class T>
static merg(T p[], int low, int mid, int high, T a[])
{
 int i, j, k;
 i = low; j = mid + 1; k = low;
 while ((i <= mid) && (j <= high))
 {

{
 if (p[i-1] <= p[j-1])
 { a[k-1]=p[i-1]; i=i+1; }
 else
 { a[k-1]=p[j-1]; j=j+1; }
 k=k+1;
}
if (i<=mid)
 for (j=i; j<=mid; j++)
 { a[k-1]=p[j-1]; k=k+1; }
else
 if (j<=high)
 for (i=j; i<=high; i++)
 { a[k-1]=p[i-1]; k=k+1; }
 for (i=low; i<=high; i++)
 p[i-1]=a[i-1];
 return (0);
}

主函数的例子如下：

//ch3_7.cpp
#include "merge.h"
#include<iomanip>
#include<iostream>
using namespace std;
int main()
{
 int i, j;
 double p[50], r = 1.0;
 for (i = 0; i < 50; i++) //产生50个0~1之间的随机数
 {
 r = 2053.0 * r + 13849.0; j = r / 65536.0;
 r = r - j * 65536.0; p[i] = r / 65536.0;
 }
 for (i = 0; i < 50; i++) //产生50个100~300之间的随机数
 p[i] = 100.0 + 200.0 * p[i];
 cout << "排序前的序列:" << endl;
 for (i = 0; i < 10; i++) //每行输出5个数据
 {
 for (j = 0; j < 5; j++) cout << setw(10) << p[5 * i + j];
 cout << endl;
 }
 merge(p, 50); //对原序列进行归并排序
 cout << "排序后的序列:" << endl;
 for (i = 0; i < 10; i++) //每行输出5个数据
 {
 for (j = 0; j < 5; j++) cout << setw(10) << p[5 * i + j];
 cout << endl;
 }
 return 0;
}

上述程序的运行结果如图 3.12 所示。
