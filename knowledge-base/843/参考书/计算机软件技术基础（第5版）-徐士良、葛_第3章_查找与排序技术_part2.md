# 2. 基数排序

> 来源：docs/08_电子书/计算机软件技术基础（第5版）-徐士良、葛兵.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：d53505b4754eaf37


基数排序（radix sorting）又称为吊桶排序，它属于分配类的排序方法。

设线性表中各元素的关键字具有 k 位有效数字，则基数排序的基本思想是：从有效数字的最低位开始直到最高位，对于每一位有效数字对线性表进行重新排列，其调整的原则

<div style="text-align: center;"><div style="text-align: center;">图 3.12 运行结果</div> </div>

如下：

（1）将线性表依当前位的有效数字为序排列。

（2）当前位的有效数字相同时，按原次序排列。

这种基数排序法称为最低位优先法（Least Significant Digit first, LSD）。图3.13是基数排序的示意图。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>排序前</td><td style='text-align: center; word-wrap: break-word;'>按末位排序</td><td style='text-align: center; word-wrap: break-word;'>连接</td><td style='text-align: center; word-wrap: break-word;'>按首位排序</td><td style='text-align: center; word-wrap: break-word;'>连接</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>(0)</td><td style='text-align: center; word-wrap: break-word;'>01</td><td style='text-align: center; word-wrap: break-word;'>(0) 01,02,05,09</td><td style='text-align: center; word-wrap: break-word;'>01</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>(1) 01,31,11,21</td><td style='text-align: center; word-wrap: break-word;'>31</td><td style='text-align: center; word-wrap: break-word;'>(1) 11,13,16,19</td><td style='text-align: center; word-wrap: break-word;'>02</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>05</td><td style='text-align: center; word-wrap: break-word;'>(2) 02</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>(2) 21,26,27</td><td style='text-align: center; word-wrap: break-word;'>05</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>(3) 13</td><td style='text-align: center; word-wrap: break-word;'>21</td><td style='text-align: center; word-wrap: break-word;'>(3) 31</td><td style='text-align: center; word-wrap: break-word;'>09</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>01</td><td style='text-align: center; word-wrap: break-word;'>(4)</td><td style='text-align: center; word-wrap: break-word;'>02</td><td style='text-align: center; word-wrap: break-word;'>(4)</td><td style='text-align: center; word-wrap: break-word;'>11</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>26</td><td style='text-align: center; word-wrap: break-word;'>(5) 05</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>(5)</td><td style='text-align: center; word-wrap: break-word;'>13</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>31</td><td style='text-align: center; word-wrap: break-word;'>(6) 26,16</td><td style='text-align: center; word-wrap: break-word;'>05</td><td style='text-align: center; word-wrap: break-word;'>(6)</td><td style='text-align: center; word-wrap: break-word;'>16</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>(7) 27</td><td style='text-align: center; word-wrap: break-word;'>26</td><td style='text-align: center; word-wrap: break-word;'>(7)</td><td style='text-align: center; word-wrap: break-word;'>19</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>02</td><td style='text-align: center; word-wrap: break-word;'>(8)</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>(8)</td><td style='text-align: center; word-wrap: break-word;'>21</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>09</td><td style='text-align: center; word-wrap: break-word;'>(9) 19,09</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>(9)</td><td style='text-align: center; word-wrap: break-word;'>26</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>27</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>21</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>09</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>31</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 3.13 基数排序示例</div> </div>

还有一种称为基数排序的最高位优先法（Most Significant Digit first，MSD）。这种方法是从有效数字的最高位开始直到最低位进行调整。但在这种情况下，必须将线性表按有效位从高到低逐层分割成若干子表，然后对各子表独立进行排序。

## 3.4 二叉排序树及其查找

从线性表的顺序查找与对分查找可以看出，对分查找的效率要比顺序查找高，但对分查找只适用于顺序存储结构的有序线性表。本节将介绍一种对于无序表的查找方法，当采用一种合适的存储结构后，其查找效率与有序表的对分查找基本接近，这就是二叉排序树查找。

二叉排序树的结点结构与一般二叉树相同。

//定义二叉排序树结点类型
template<class T>
struct BSnode
{ T d;
BSnode *lchild;
BSnode *rchild;
};

二叉排序树的主要操作有插入、删除、查找和按关键字值大小输出元素（中序遍历二叉排序树）等。

在 C++ 中，可以定义二叉排序树类 BS_Tree 如下：

//BS_Tree.h
#include<iostream>
using namespace std;
//定义二叉链表结点类型
template<class T>
struct BSnode
{ T d;
BSnode *lchild;
BSnode *rchild;
};
//数据域
//左指针域
//右指针域

//二叉排序树类
template<class T>
class BS_Tree
{ private:
 BSnode<T>* BT;
 public:
 BS_Tree() { BT=NULL; return; }
 void insert_BS_Tree(T);
 int delete_BS_Tree(T);
 BSnode<T>* serch_BS_Tree(T);
 void intrav_BS_Tree();
 };
//二叉排序树根结点指针
//成员函数
//二叉排序树初始化
//二叉排序树的插入
//二叉排序树的删除
//二叉排序树的查找
//中序遍历二叉排序树

下面具体讨论二叉排序树的插入、删除、查找和按值大小输出元素（中序遍历二叉排序树）等操作。

### 3.4.1 二叉排序树的基本概念

所谓二叉排序树，是指满足下列条件的二叉树：

（1）左子树上的所有结点值均小于根结点值。

（2）右子树上的所有结点值均不小于根结点值。

（3）左、右子树也满足上述两个条件。

由此可以看出，二叉排序树中的结点值都是应该可以互相比较的，并且，在二叉排序树中，所有结点以根结点为界按值分成了两部分：左子树上的所有结点值均小于右子树上的所有结点值。图3.14(a)是结点值为数值的二叉排序树，图3.14(b)是结点值为字母的二叉排序树。

<div style="text-align: center;"><div style="text-align: center;">(a) 结点值为数值的二叉排序树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 结点值为字母的二叉排序树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 3.14 二叉排序树例</div> </div>

二叉排序树有一个重要特性：中序遍历二叉排序树可以得到有序序列。因此，由无序序列构造二叉排序树实际上就将一个无序序列变成了有序序列。

下面是中序遍历二叉排序树的成员函数。

//中序遍历二叉排序树
template<class T>
void BS_Tree<T>::intrav_BS_Tree()
{ BSnode<T> * p;
p=BT;
intrav(p); //从根结点开始后序遍历
return;
}
template<class T>
static intrav(BSnode<T> * p)
{ if (p != NULL)
{ intrav(p->lchild); //中序遍历左子树
 cout<<p->d<<endl; //输出根结点值
 intrav(p->rchild); //中序遍历右子树
}
return 0;
}

#### 3.4.2 二叉排序树的插入

下面讨论如何根据给定的元素插入二叉排序树。

根据二叉排序树的定义，二叉排序树的插入过程如下：

（1）若当前的二叉排序树为空，则插入的元素为根结点。

（2）若插入的元素值小于根结点值，则将元素插入左子树。

（3）若插入的元素值不小于根结点值，则将元素插入右子树。

无论是插入左子树还是右子树，同样按照上述方法处理。

由上述二叉排序树的插入过程可以看出，每次插入的元素，最后总是以二叉排序树的叶子结点来插入。

依次插入一个元素序列后，就构成了最后的二叉排序树。

例如，如果依次读入元素序列（80，82，85，75，82，68，71，77，88）中的元素，则构造二叉排序树的过程如图3.15(a)～(i)所示，图3.15(i)为最后的二叉排序树。

<div style="text-align: center;"><div style="text-align: center;">(a) 插入元素 80</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 插入元素 82</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 插入元素 85</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(d) 插入元素 75</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(e) 插入元素 82</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(f) 插入元素 68</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(g) 插入元素 71</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(h) 插入元素 77</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(i) 插入元素 88</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图3.15 二叉排序树的构造过程</div> </div>

必须指出，对于给定的一批元素，如果读入的顺序不同，最后构造出的二叉排序树的形态也是不同的。例如，如果将读入上述元素序列的顺序改为(75，82，68，71，77，88，80，82，85)，则构造出的二叉排序树如图3.16所示。

由于在二叉排序树中插入的新结点都是叶子结点，因此，在对二叉排序树进行插入运算时，不需要移动其他结点，而只需改动插入位置上的叶子结点指针即可。

在二叉排序树中插入一个元素的成员函数如下：

##### //二叉排序树的插入

<div style="text-align: center;"><div style="text-align: center;">图 3.16 图 3.15(i) 二叉排序树的另一种形态</div> </div>

template<class T>
void BS_Tree<T>::insert_BS_Tree(T x)
{ BSnode<T>* p, *q;
p=new BSnode<T>;
p->d=x;
p->lchild=NULL; p->rchild=NULL;
q=BT;
if (q==NULL) BT=p;
else
{ while ((q->lchild!=p)&&(q->rchild!=p)) //未到叶子结点
{ if (x<q->d) //插入左子树
{ if (q->lchild!=NULL) q=q->lchild;
 else q->lchild=p;
}
else
{ if (q->rchild!=NULL) q=q->rchild;
 else q->rchild=p;
}
}
return;
}

#### 3.4.3 二叉排序树的删除

为了在二叉排序树中删除一个指定的元素，首先要找到被删元素所在的结点 p 与它的父结点 q，然后分以下三种情况进行处理：

（1）p 为叶子结点（左右子树均为空）。此时直接删除该结点，再修改其父结点的指针。

（2）p 为单支子树（只有左子树或只有右子树）。此时，如果 p 是 q 的左子结点，则将 p 的单支子树链接到 q 的左指针上；否则将 p 的单支子树链接到 q 的右指针上。

（3）p 的左子树与右子树均不空。此时，如果 p 的左子结点的右子树为空，则将 p 的左子结点值赋给 p 的值域，左子结点的左子树链接到结点 p 的左指针上；否则，从结点 p 的左子结点开始沿右链进行搜索，直到发现某结点 s 的右指针空为止，将结点 s 的值赋给结点 p 的值域，将结点 s 的左子树链接到 s 父结点的右指针上。

在二叉排序树中删除元素 x 的成员函数如下（如果在二叉排序树中找不到这个元素，函数返回 0，否则正常删除）：

//二叉排序树的删除
template<class T>
int BS_Tree<T>::delete_BS_Tree(T x)
{ BSnode<T> *p, *q, *t, *s;
 int flag;
 p=BT; q=NULL; flag=0;
 while ((p!=NULL) && (flag==0))
 { if (p->d==x) flag=1;
 else if (x<p->d)
 { q=p; p=p->lchild; }

else //沿右子树找
{ q=p; p=p->rchild; }
}
if (p==NULL) //找不到
{ cout<<"找不到!"<<endl; return(flag); }
flag=1;
if ((p->lchild==NULL) &&(p->rchild==NULL)) //p 为叶子结点
{ if (p==BT) BT=NULL; //p 为根结点
 else if (p==q->lchild) q->lchild=NULL;
 else q->rchild=NULL;
 delete p; //释放结点 p
}
else if ((p->lchild==NULL) || (p->rchild==NULL)) //p 为单支子树
{ if (p==BT) //p 为根结点
 { if (p->lchild==NULL) BT=p->rchild;
 else BT=p->lchild;
 }
 else //p 为单支子树，但 p 不是根结点
{ if ((p==q->lchild) && (p->lchild!=NULL)) //p 是 q 的左子结点
 q->lchild=p->lchild; //将 p 的左子树链接到 q 的左指针上
 else if ((p==q->lchild) && (p->rchild!=NULL)) //p 是 q 的左子结点
 q->lchild=p->rchild; //将 p 的右子树链接到 q 的左指针上
 else if ((p==q->rchild) && (p->lchild!=NULL)) //p 是 q 的右子结点
 q->rchild=p->lchild; //将 p 的左子树链接到 q 的右指针上
 else if ((p==q->rchild) && (p->rchild!=NULL)) //p 是 q 的右子结点
 q->rchild=p->rchild; //将 p 的右子树链接到 q 的右指针上
}
delete p; //释放结点 p
}
else if ((p->lchild!=NULL) && (p->rchild!=NULL)) //p 的左子树均不空
{ t=p;
s=t->lchild; //从 p 的左子结点开始
while (s->rchild!=NULL) //沿右链寻找右指针为空的结点 s
{ t=s; s=s->rchild; }
p->d=s->d; //结点 s 的值赋给 p 的值域
if (t==p)
 p->lchild=s->lchild; //p 的左子结点的左子树链接到 p 的左指针上
else
 t->rchild=s->lchild; //s 的左子树链接到 p 的右指针上
delete s; //释放结点 s
}
return(flag);

#### 3.4.4 二叉排序树查找

根据二叉排序树的定义，要在二叉排序树中查找一个指定元素是很方便的，其方法如下。

从二叉排序树的根结点开始与被查值进行比较：

（1）若被查值等于根结点值，则查找成功，查找过程结束。

（2）若被查值小于根结点值，则到左子树中去查找，这是因为只有左子树中的结点值才

小于根结点值。

（3）若被查值大于根结点值，则到右子树中去查找，这是因为只有右子树中的结点值才不小于根结点值。

在左、右子树中查找时也采用上述方法。这种查找过程直到查找成功或所考虑的子树已空（说明二叉排序树中无此元素的结点，查找失败）为止。

在二叉排序树中查找指定元素 x 的成员函数如下（函数返回被查找元素 x 所在结点的存储空间首地址。若二叉排序树中没有被查找的元素，则函数返回 NULL）：

//二叉排序树的查找
template<class T>
BSnode<T>* BS_Tree<T>::serch_BS_Tree(T x)
{ BSnode<T>* p=NULL;
int flag;
p=BT; flag=0;
while ((p!=NULL) &&(flag==0)) //寻找被删元素
{ if (p->d==x) flag=1; //找到被删元素
 else if (x<p->d) p=p->lchild; //沿左子树找
 else p=p->rchild; //沿右子树找
}
if (p==NULL) //找不到
{ cout<< "找不到！"<<endl; return(p); }
return(p);
}

从二叉排序树的查找过程可以看出，当被查值与根结点值进行比较后，要么查找成功（被查值与根结点值相等），要么已经确定沿哪棵子树去查找。这就是说，在二叉排序树的查找过程中，通过与根结点的一次比较，就可以抛弃另一棵子树中的所有结点，即要抛弃大约一半的剩余结点。因此，二叉排序树查找的效率非常接近于对分查找。由于同一批元素所构成的二叉排序树不是唯一的，它与元素插入的顺序有关。在最坏情况下，如果构造的二叉排序树实际上是单支树，则查找效率与顺序查找相同。因此，一般来说，二叉排序树的查找效率介于对分查找和顺序查找之间。在实际应用中，为了提高二叉排序树的查找效率，有时还需要在构造二叉排序树的过程中进行“平衡化”处理，使之成为平衡的二叉排序树，而对平衡二叉排序树的查找效率与对分查找相同。有关二叉排序树的平衡化处理，有兴趣的读者可参阅其他数据结构的书。

显然，对于经常需要动态增长且经常需要查找的大线性表来说，采用二叉排序树这种结构是很方便的，它既有利于插入元素，也有利于查找元素。

例 3.7 在二叉排序树中依次插入给定元素序列中的元素，然后输出二叉排序树的中序序列。在二叉排序树中依次删除原序列中的前 6 个元素，再输出二叉排序树的中序序列。最后在二叉排序树中查找原序列中的所有元素。

主函数程序如下：

//ch3_8.cpp
#include "BS_Tree.h"
#include<iostream>

using namespace std;
int main()
{
 int k;
 int d[12]={04,18,13,79,33,45,06,23,35,12,34,76};
 BS_Tree<int>b; //建立一个二叉排序树对象b，数据域为整型
 for (k=0; k<12; k++) //依次将元素插入二叉排序树b
 b.insert_BS_Tree(d[k]);
 cout<<"第1次输出中序序列："<endl;
b.intrav_BS_Tree();
for (k=0; k<6; k++) //在二叉排序树中依次删除原序列中的前6个元素
 b.delete_BS_Tree(d[k]);
 cout<<"第2次输出中序序列："<endl;
b.intrav_BS_Tree();
cout<<"查找结果："<endl;
for (k=0; k<12; k++) //在二叉排序树中查找原序列中的所有元素
 cout<<b.serch_BS_Tree(d[k])<<endl;
 return 0;
}

上述程序的运行结果如下：

##### 第1次输出中序列：

4
6
12
13
18
23
33
34
35
45
76
79
第2次输出中序列：
6
12
23
34
35
76
查找结果：
找不到！
00000000
找不到！
00000000
找不到！
00000000
找不到！
00000000
找不到！
00000000

注意：最后几个数据（表示计算机存储地址）在每次运行时都有可能不同。

### 3.5 多层索引树及其查找

索引是提高数据存取效率的基本方法。但如果索引本身很大，对索引的查找代价也会很大。因此，在实际应用中，一般采用多层索引树。

多层索引的应用很广泛。二叉排序树实际上就是一种多层索引树。在二叉排序树中，每个结点有一个关键字（结点值），并且还有两个指针。在对二叉排序树进行查找的过程中，当查找的关键字小于结点中的关键字时，就沿左指针往下找；当查找的关键字大于结点中的关键字时，就沿右指针往下找；当两者相等时，说明查找成功。由此可以看出，二叉排序树中结点的关键字起着指示查找路径的作用。

一般来说，多层索引树中的每个结点包含2m个关键字域和 $ 2m+1 $个指针域。多层索引树中的结点结构如图3.17所示。

<div style="text-align: center;"><div style="text-align: center;">图3.17 多层索引树中的结点结构</div> </div>

与二叉排序树一样，多层索引树的形态直接影响查找效率。本节介绍两种应用较为广泛的平衡多层索引树—— $ B^{-} $树与 $ B^{+} $树。

#### 3.5.1 B 树

 $ B^{-} $树是一种动态调节的平衡多路查找树。 $ B^{-} $树的定义如下。

一棵  $ 2m+1 $ 阶的 B 树，或为空，或为满足下列特性的度为  $ 2m+1 $ 的树：

（1）树中每个结点最多有  $ 2m+1 $ 棵子树，且除根结点外的所有非叶子结点至少有  $ m+1 $ 棵子树，而根结点至少有两棵子树（除非根结点又是叶子结点）。

（2）所有叶子结点均在最后一层上。

（3）除叶子结点外的每个结点结构如图3.17所示。其中， $ \mathrm{KEY}_{i}(1\leqslant i\leqslant2m) $为关键字域，用于存放关键字及有关数据信息； $ \mathrm{LINK}_{i}(1\leqslant i\leqslant2m+1) $为指针域，指向各子树的根结点。对于度为 $ n+1(1\leqslant n\leqslant2m) $的结点，前n个关键字域内容按关键字有序，即 $ \mathrm{KEY}_{i}<\mathrm{KEY}_{i+1}(1\leqslant i<n-1) $，并且， $ \mathrm{LINK}_{i}(1\leqslant i<n) $所指子树中所有结点的关键字均小于 $ \mathrm{KEY}_{n} $，而 $ \mathrm{LINK}_{n+1} $所指子树中所有结点的关键字均大于 $ \mathrm{KEY}_{n} $。

（4）所有叶子结点中的指针域为空。

图3.18为一棵5阶 $ (m=2) $的 $ B^{-} $树。

<div style="text-align: center;"><div style="text-align: center;">图 3.18 5 阶  $  (m=2) B^{-}  $ 树例</div> </div>

在实际存储 B⁻ 树时，为了使处理方便，一般在每一个结点中还增加两个域：一个用于记录本结点中实际的关键字个数；另一个用于指向父结点。

 $ B^{-} $树中每一个结点的存储结构在C++中可以定义如下：

//定义B树中的结点类型
template<class T>
struct mblnode
{ int num;
mblnode *prt;
T key[2 * M];
mblnode *link[2 * M+1];
};

其中，2M+1为 $ B^{-} $树的阶数。

 $ B^{-} $树的主要操作有查找、插入、删除和按关键字值大小输出等。在 C++ 中，可以定义  $ B^{-} $树类 MB1 如下（5 阶，M=2）：

//MB1.h
#define M 2
#include<iostream>
using namespace std;
//定义 B⁻ 树中的结点类型
template<class T>
struct mblnode
{ int num; //记录结点中的关键字个数
mblnode *prt; //指向父结点的指针
T key[2 * M]; //2m 个关键字域
mblnode *link[2 * M+1]; //2m+1 个指向各子树的指针
};
//定义 B⁻ 树类
template<class T>
class MB1
{ private:
mblnode<T> *BTH; //B⁻ 树根结点指针
public:
MB1() { BTH=NULL; return; } //成员函数
MB1<T>* MB1_search(T, int * , int *); //B⁻ 树的查找
void MB1_insert(T); //B⁻ 树的插入
void MB1_delete(T); //B⁻ 树的删除
void MB1_prt(); //按值大小输出 B⁻ 树
};

下面具体讨论  $ B^{-} $树的查找、插入、删除和按关键字值大小输出关键字等操作。

## 1. B $ ^{-} $树的查找

由  $ B^{-} $ 树的定义可知，在  $ B^{-} $ 树中进行查找的过程与二叉排序树的查找很类似。在根结点为 BTH 的 2m+1 阶的  $ B^{-} $ 树中查找关键字 x 的过程如下。

从根结点 BTH 开始，将关键字 x 与结点 q 中的各关键字 KEY(i)(1≤i≤n) 进行比较：

若 x=KEY(i)，则查找成功，结束；

若 x < KEY(1)，则沿指针 LINK(1) 向下搜索；

若 x > KEY(n)，则沿指针 LINK $ (n+1) $ 向下搜索；

若  $ \mathrm{KEY}(i) < x < \mathrm{KEY}(i+1) $，则沿指针  $ \mathrm{LINK}(i+1) $ 向下搜索。

这个过程一直进行到查找成功或进行到叶子结点而查找失败为止。

B $ ^{-} $树的查找的成员函数如下：

//在 B⁻ 树中查找元素 x 所在结点的存储位置以及在该结点中的关键字序号 k
//函数返回结点存储空间首地址，flag=0 表示查找失败。
template<class T>
mbnode<T>* MB1<T>::MB1_search(T x, int *k, int *flag)
{
 mbnode<T>* p, *q;
 p=BTH; *flag=0; q=p;
 while ((p!=NULL) && (*flag==0)) //未到叶子结点且并未找到该元素
 {
 k=1; q=p;
 while ((*k<q->num) &&(q->key[*k-1]<x)) //与各关键字比较
 {
 k=k+1;
 if (q->key[*k-1]==x) //查找成功
 *flag=1;
 else if ((*k==q->num) &&(q->key[*k-1]<x)) //向下搜索
 {
 p=q->link[*k];
 }
 else
 {
 p=q->link[*k-1]; *k=k-1;
 }
 }
 return(q);
}

这个函数返回被查关键字 x 所在结点的存储空间首地址。在这个函数的形参中，若返回的标志 flag=1，则表示查找成功，返回被查关键字 x 在该结点中的关键字序号 k；若标志 flag=0，则表示查找失败，函数返回的输出的结点存储空间首地址与形参 k 指示了关键字 x 在 B⁻ 树中应插入的位置（该信息供插入用），即应插入在该结点的第 k 与 k+1 个关键字之间，其中返回的该结点必为叶子结点。

 $ B^{-} $树查找的效率取决于  $ B^{-} $树的深度以及结点中的元素数目。在实际应用中， $ B^{-} $树的深度是影响查找效率的主要因素。

## 2. B^{-} 树的插入

在  $ 2m+1 $ 阶的 B⁻ 树中插入一个新元素 x，首先要进行查找，以便找到元素 x 在叶子结点中应插入的位置。如果在查找过程中发现 B⁻ 树中已经存在元素 x，则表示出错，这是因为在 B⁻ 树一般不允许存在两个相等的元素；否则根据找到的插入位置（参看 B⁻ 树的查找）将元素 x 插入，并保持有序排列。在实际插入过程中，要考虑以下两种情况：

（1）如果在找到插入位置的叶子结点中的元素个数不足 2m 个，则直接进行插入。

（2）如果在找到插入位置的叶子结点中的元素已经有2m个，则需要进行分裂，即将原结点中的2m个元素与要插入的元素一起按序排列后再对分，其中前半部分的元素仍然按序放在原来的结点中，而后半部分的元素将放在一个新申请的结点中，并将中间的一个元素放到其父结点中。如果父结点中的元素个数也已满（元素个数等于2m），则又要进行分裂。这种分裂过程有可能一直进行到根结点。但必须注意，在每一次的分裂过程中，对于放在新申请结点中的所有元素的下一层结点，以及放到父结点中的元素的下一层结点，它们的父结点也变了，因此，需要改变它们中指向父结点的指针。

详细插入过程可参看插入函数中的注释。图3.19给出了在 $ B^{-} $树中进行插入的示意图。

<div style="text-align: center;"><div style="text-align: center;">(a) m=2 的 B^{-} 树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 插入元素 12，结点数未变</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 又插入元素 46 后，增加了一个结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 3.19 B $ ^{-} $树的插入</div> </div>

在  $ B^{-} $树中插入一个关键字的成员函数如下：

//在 B⁻ 树中插入 x
template<class T>
void MB1<T>::MB1_insert(T x)
{
 int flag, j, k, t;
 T y;
 mb1node<T> *p, *q, *u, *s;
 if (BTH == NULL)
 { p = new mb1node<T>;
 p->num = 1;
 p->key[0] = x;
 p->prt = NULL;
 for (j = 1; j <= 2 * M + 1; j++)
 p->link[j - 1] = NULL;
 BTH = p;
 return;
 }
} //B⁻ 树为空
//申请一个结点
//置该结点中只有一个关键字
//置关键字
//指向父结点的指针为空
//置所有指针为空
//B⁻ 树根结点指针

q=(mb1node<T>* )MB1_search(x,&k,&flag); //寻找插入位置
if (flag==1) //B 树中已有元素 x,不能再插入
{
 cout<<"ERR!\\n"; return;
}

p=NULL;
t=0; //未插入完标志
while (t==0) //未插入完
{
 if (k==(q->num)) //插入结点 q 的最后
 { y=x; //记录结点 q 的最后应插入的关键字
 u=p; //记录结点 q 的最后应插入的向下指针
}

else {
 //插入结点 q 的中间某位置处
 { y=q->key[q->num-1]; //记录结点 q 中的最后一个关键字
 u=q->link[q->num]; //记录结点 q 中最后一个向下指针
 for (j=(q->num)-1; j>=k+1; j--) //结点 q 中最后第二个关键字到
 { q->key[j]=q->key[j-1]; //插入位置处的关键字以及对应的
 q->link[j+1]=q->link[j]; //向下指针均后移一个位置
 }
 q->key[k]=x; //在插入位置处插入关键字 x
 q->link[k+1]=p; //在插入位置后插入关键字 x 的向下指针
 if (p!=NULL)
 p->prt=q; //改变结点 p 中指向父结点的指针
}

if (q->num<2*M) //结点 q 中关键字未满,可直接插入
{ q->num=(q->num)+1; //结点 q 中的关键字个数增1
 q->key[(q->num)-1]=y; //将记录的关键字插入 q 的最后
 q->link[q->num]=u; //将记录的向下指针插入 q 的最后
 if (u!=NULL)
 u->prt=q; //改变结点 u 中指向父结点的指针
 t=1; //置插入完成标志
}

else {
 if (p=new mb1node<T>; //申请一个新结点
 p->num=M; //新结点中存放结点 q 中的一半关键字
 q->num=M; //结点 q 中保留原一半的关键字
 p->prt=q->prt; //结点 q 的父结点也是新结点 p 的父结点
 x=q->key[M]; //记录原结点 q 中的中间关键字,应插入父结点
 for (j=1; j<=M-1; j++)
 { p->key[j-1]=q->key[M+j]; //将原结点 q 中的后半部的关键字
 p->link[j-1]=q->link[M+j]; //和向下指针复制到结点 p 中
 if (q->link[M+j]!=NULL)
 (q->link[M+j])->prt=p; //改变子结点中指向父结点的指针
 }
 p->link[M-1]=q->link[M*M]; //将 q 中的最后一个指针复制到 p 中
 if (q->link[2*M]!=NULL)
 (q->link[2*M])->prt=p; //改变子结点中指向父结点的指针
 p->key[M-1]=y; //将记录的关键字插入 p 的最后
 p->link[M]=u; //将记录的向下指针插入 p 的最后
 if (u!=NULL)
 u->prt=p; //改变结点 u 中指向父结点的指针
 for (j=M+2; j<=2*M+1; j++)
 { q->link[j-1]=NULL; //置结点 q 后半部分指针为空
 p->link[j-1]=NULL; //置结点 p 后半部分指针为空

}
if (q->prt==NULL)
{ s=new mblnode<T>;
s->key[0]=x;
s->link[0]=q;
s->link[1]=p;
s->num=1;
s->prt=NULL;
q->prt=s; p->prt=s;
for (j=3; j<=2 * M+1; j++)
{
 s->link[j-1]=NULL;
}
BTH=s;
t=1;
}
else
{ q=q->prt;
k=1;
while ((k<=q->num) && (q->key[k-1]<x))
{
 //q 为根结点
 //申请一个新结点作为新的根结点
 //插入原结点 q 分裂时的中间关键字 x
 //第一个指针指向 q
 //第二个指针指向 p
 //根结点中关键字个数为 1
 //根结点无父结点
 //结点 p 与 q 的父结点均为根结点 s
 //置根结点中后面的指针为空
 //s 为 B 树的根结点
 //置插入完成标志
}

//寻找插入位置
}

return;
}

如果给定一个元素序列，需要构造一棵 B 树，则可以从空树开始，反复调用上述函数，逐个将元素插入 B 树（参看下面的主函数）。

## 3. B 树的删除

在 B^{-} 树中删除元素 x，首先也要进行查找，找到元素 x 在 B^{-} 树中的位置。如果要删除的元素 x 在 B^{-} 树的叶子结点上，则进行删除；如果要删除的元素 x 不在叶子结点上，则要用一个比 x 大而又最接近 x 的元素 y 代替 x（删除了元素 x），显然，这个 y 就是 x 右边指针所指的路径上最左边叶子结点上的第一个元素，然后在叶子结点中删除 y。由此可以看出，B^{-} 树的删除都归结为在叶子结点上删除一个元素。

为了在  $ B^{-} $树的叶子结点上删除一个元素，且仍保持  $ B^{-} $树的特性，在删除过程中要考虑以下两种情况：

（1）如果被删除一个元素后的叶子结点中的元素个数不小于 m，则删除过程就结束。

（2）如果被删除一个元素后的叶子结点中的元素个数小于 m，则需要向与它在同一层上的右（或左）兄弟结点借一个元素。在这种情况下，如果邻近兄弟结点中的元素个数均为 m，则要将它们合二而一，此时，其父结点中也就少了一个元素，因此又要考虑它是否需要合并。在最坏情况下，这种合并可能会进行到根结点。在进行结点合并后，还需考虑改变被合并结点的下一层中各结点的指向父结点的指针。

由此可以看出， $ B^{-} $树的插入与删除是很麻烦的。为了维持 $ B^{-} $树的平衡，以便提高查找效率，必须要做这些麻烦的操作。

详细删除过程可参看删除函数中的注释。

在  $ B^{-} $树中删除一个元素的成员函数如下：

//复制右移

u->prt=q;
p->key[j-2]=s->key[s->num-1];
s->link[s->num]=NULL;
s->num=s->num-1;
}
else
{ if (j==p->num+1)
{ q=p->link[j-2];
s=p->link[j-1];
j=j-1;
}
else s=p->link[j];
q->key[q->num]=p->key[j-1];
t=q->num+1;
for (k=1; k<=s->num; k++)
{ q->key[t+k-1]=s->key[k-1];
q->link[t+k-1]=s->link[k-1];
u=s->link[k-1];
if (u!=NULL)
{ u->prt=q;
q->link[t+s->num]=s->link[s->num]; //最后的指针合并
u=s->link[s->num];
if (u!=NULL)
{ u->prt=q;
q->num=2*M;
delete s;
for (k=j; k<=p->num-1; k++)
{ p->key[k-1]=p->key[k];
p->link[k]=p->link[k+1];
}
p->num=p->num-1; //父结点中关键字个数减1
s=q; q=p;
}
if ((q==BTH)&&(q->num==0))
{
{ delete BTH;
if (s!=NULL)
{ BTH=s; BTH->prt=NULL; }
else
{ BTH=NULL; delete s; }
}
return;
}

4. 按值大小输出 B 树中各关键字元素

按值大小输出 B⁻ 树中各关键字元素，类似于二叉树的中序遍历。现在由于 B⁻ 树中的每个结点最多有 2m 个关键字和 2m+1 个指针，因此，按值大小遍历输出 B⁻ 树中各关键字值的过程如下。

从 B $ ^{-} $树的根结点开始，对于每一个非空结点中的关键字域依次做如下操作：

（1）沿关键字左指针指向的结点做同样的操作；

（2）输出关键字值。

最后沿该结点最后一个指针指向的结点做同样的操作。

显然，这是一个递归操作。

按值大小输出  $ B^{-} $树的成员函数如下：

//按值大小输出 B 树
template<class T>
void MB1<T>::MB1_prt()
{
 MB1_out(BTH); //从根结点开始搜索
 return;
}
template<class T>
static MB1_out(mblnode<T>* p)
{
 int n;
 if (p != NULL)
 { for (n=0; n<p->num; n++)
 { MB1_out(p->link[n]); //对该结点中的每一个关键字
 cout<<p->key[n]<<endl; //沿关键字左指针向下搜索
 }
 MB1_out(p->link[n]); //沿最后一个指针向下搜索
}
return 0;
}

下面举例说明反映以上这些操作的成员函数的使用。

例 3.8 在一棵空 B 树中依次插入以下关键字序列：

04,18,13,79,33,45,06,23,35,12,34,76

再按值大小输出该  $ B^{-} $树中的各关键字；然后在该  $ B^{-} $树中删除前 6 个插入的关键字，再按值大小输出该  $ B^{-} $树中的各关键字。

其主函数如下：

//ch3_9.cpp
#include "MB1.h"
int main()
{
 int x, k;
 int d[12]={04,18,13,79,33,45,06,23,35,12,34,76};
 MB1<int>mb1; //定义 B 树对象
 for (k=0; k<12; k++) //生成 B 树
 { x=d[k]; mb1_MB1_insert(x); }
 cout<<"第1次按值大小输出 B 树: "<<endl;
 mb1.MB1_prt();
 for (k=0; k<6; k++) //在 B 树中删除前 6 个插入的关键字
 { x=d[k]; mb1.MB1_delete(x); }
 cout<<"第2次按值大小输出 B 树: "<<endl;
 mb1.MB1_prt();
 return 0;
}

上述程序的运行结果如下：

第1次按值大小输出B⁻树：
4
6
12
13
18
23
33
34
35
45
76
79
第2次按值大小输出B⁻树：
6
12
23
34
35
76

### 3.5.2 B^{+} 树

前面讨论的  $ B^{-} $ 树，其随机查找的效率是很高的，但是遍历  $ B^{-} $ 树中的所有元素却很不方便。在  $ B^{-} $ 树中，元素被分布在整个  $ B^{-} $ 树中的各个结点中，并且，在非叶子结点中出现的元素就不再出现在叶子结点中。因此，在  $ B^{-} $ 树中，很难用一个顺序链将所有的元素链接在一起。本小节讨论的  $ B^{+} $ 树将在这一点上作改进。

在  $ B^{+} $ 树中，所有的元素均按递增顺序从左到右被安排在叶子结点上，各叶子结点之间从左到右用指针（利用叶子结点中的第一个指针域）链接起来。图 3.20 是一个  $ B^{+} $ 树的模型。

<div style="text-align: center;"><div style="text-align: center;">图 3.20 B $ ^{+} $ 树的模型</div> </div>

由图3.20可以看出， $ B^{+} $树由以下两部分组成：

（1） $ B^{-} $树索引。其中的元素值只起指示路标的作用，而并不代表实际的元素值。

（2）链接各叶子结点的顺序链。在这个链上从左到右按递增顺序链接着所有的叶子结

点，从而也就实际将叶子结点中的各元素都链接了起来。

在  $ B^{+} $树中有两个头指针：BTH 指向索引  $ B^{-} $树的根结点；SH 指向顺序链的第一个结点。

图3.21 是一棵5阶 $ (m=2) $的 $ B^{+} $树。

<div style="text-align: center;"><div style="text-align: center;">图3.21 5阶（m=2）的 $ B^{+} $树</div> </div>

 $ B^{+} $ 树中各结点的存储结构与  $ B^{-} $ 树的相同。其中，叶子结点中的最后一个指针域用于链接有序元素的各叶子结点。

 $ B^{+} $树中每一个结点的存储结构在 C++ 中可以定义如下：

//定义 B⁺树中的结点类型
template<class T>
struct mb2node
{ int num;
mb2node *prt;
T key[2 * M];
mb2node *link[2 * M+1];
};
//记录结点中的关键字个数
//指向父结点的指针
//2m 个关键字域
//2m+1 个指向各子树的指针

其中， $ 2M+1 $ 为  $ B^{+} $ 树的阶数。

 $ B^{+} $树在各方面都优于 $ B^{-} $树，因此， $ B^{+} $树在软件系统中有着广泛的应用。 $ B^{+} $树的主要操作有顺序查找、随机查找、插入、删除和按关键字值大小输出等。

在 C++ 中，可以定义 B $ ^{+} $ 树类 MB2 如下（5 阶，M=2）：

//MB2.h
#define M 2
#include<iostream>
using namespace std;
//定义 B⁺树中的结点类型
template<class T>
struct mb2node
{
 int num;
 mb2node *prt;
 T key[2 * M];
 mb2node *link[2 * M+1];
};
//定义 B⁺树类
//记录结点中的关键字个数
//指向父结点的指针
//2m 个关键字域
//2m+1 个指向各子树的指针

template<class T>
class MB2
{ private:
 mb2node<T> * BTH;
 mb2node<T> * SH;
 public:
 MB2() { BTH=NULL; SH=NULL; return; }
 mb2node<T> * MB2_shch(T, int *, int *);
 mb2node<T> * MB2_search(T, int *, int *);
 void MB2_insert(T);
 void MB2_delete(T);
 void MB2_prt();
}

下面具体讨论 B⁺树的顺序查找、随机查找、插入、删除和按关键字值大小输出等操作。

1. B⁺树的查找
B⁺树的查找分随机查找与顺序查找。

1) B⁺树的顺序查找
B⁺树的顺序查找是从顺序链的头指针开始，顺链对叶子结点逐个进行顺序查找。实际上，利用 B⁺树的顺序查找可以遍历 B⁺树中的所有元素。B⁺树顺序查找的详细过程请参看函数中的注释。

B⁺树顺序查找的成员函数如下：

// B⁺树的顺序查找
//函数返回包含元素 x 的结点存储地址；指针变量 k 指向的变量中
//存放元素 x 在存储结点中的序号；指针变量 flag 指向的变量值为 0 时，
//表示查找失败，值为 1 时表示查找成功。
template<class T>
mb2node<T> * MB2<T>::MB2_shch(T x, int * k, int * flag)
{
 mb2node<T> * p, * q;
 p = SH;
 * flag = 0; q = p;
 while ((p != NULL) && (*flag == 0))
 {
 * k = 1; q = p;
 }
 while (( *k < q->num) && (q->key[ * k-1] < x) )
 * k = * k + 1;
 if ( q->key[ * k-1] == x)
 * flag = 1;
 else if (( *k == q->num) && (q->key[ * k-1] < x) )
 { p = q->link[0];
 if (( p != NULL) && (p->key[0] > x) )
 p = NULL;
 }
 else { * k = * k-1; p = NULL; }
 }
}
return(q);

//从顺序链第一个结点开始
//在当前叶子结点中寻找关键字值不小于 x 的位置
//查找成功
//顺序链中下一个结点
//查找失败

}

这个函数返回被查关键字 x 所在结点的存储空间首地址。在这个函数的形参中，若返回的标志 flag=1，则表示查找成功，返回被查关键字 x 在该结点中的关键字序号 k；若标志

flag=0,则表示查找失败，函数返回的输出的结点存储空间首地址与形参k指示了关键字x在 $ B^{+} $树中应插入的位置（该信息供插入用），即应插入在该结点的第k与 $ k+1 $个关键字之间，其中返回的该结点必为叶子结点。

#### 2） $ B^{+} $树的随机查找

 $ B^{+} $树的随机查找与  $ B^{-} $树大致相同。其不同之处在于：在  $ B^{+} $树随机查找过程中，如果在非叶子结点中发现某元素等于被查元素值，则并不像  $ B^{-} $树那样停止查找，而是继续沿右指针向下搜索，直到叶子结点为止，最后在相应的叶子结点中顺序查找要找的元素。这是因为  $ B^{+} $树中非叶子结点中的元素值并不是实际的元素值，它只起指示路标的作用， $ B^{+} $树中实际的元素都在叶子结点中。

 $ B^{+} $树随机查找的详细过程请参看函数中的注释。

 $ B^{+} $树随机查找的成员函数如下：

##### //B^{+}树的随机查找

//函数返回包含元素 x 的结点存储地址；指针变量 k 指向的变量中
//存放元素 x 在存储结点中的序号；指针变量 flag 指向的变量值为 0 时，

template<class T>
mb2node<T>* MB2<T>::MB2_search(T x, int *k, int *flag)
{ mb2node<T> *p, *q;
p=BTH; //从根结点开始
*flag=0; q=p;
if (p==NULL) return(q); //B+树为空
while ((p!=NULL) &(& *flag==0)) //未到叶子结点且还未查到
{ *k=1; q=p;
while (( *k<q->num) &&(q->key[* k-1]<x))
 *k= *k+1; //在当前结点中寻找索引值不小于 x 的位置
if (q->key[* k-1]==x) //当前结点中的索引值等于 x
{ if (q->link[* k]==NULL) //索引的右指针为空,
 *flag=1; //当前结点为叶子结点,查找成功
else p=q->link[* k]; //沿索引的右指针向下搜索
}
else if (( *k==q->num) &&(q->key[* k-1]<x))
 p=q->link[* k]; //沿索引的右指针向下搜索
else if (*k<2) //被查值在最左边的叶子结点中
{ q=MB2_shch(x,k,flag); p=NULL; } //采用顺序查找
else
{ p=q->link[* k-1]; *k= *k-1; }
}
return(q);
}

与顺序查找一样，这个函数返回被查关键字 x 所在结点的存储空间首地址。在这个函数的形参中，若返回的标志 flag=1，则表示查找成功，返回被查关键字 x 在该结点中的关键字序号 k；若标志 flag=0，则表示查找失败，函数返回的输出的结点存储空间首地址与形参 k 指示了关键字 x 在 B⁺ 树中应插入的位置（该信息供插入用），即应插入在该结点的第 k 与 k+1 个关键字之间，其中返回的该结点必为叶子结点。

## 2. B^{+} 树的插入

 $ B^{+} $树的插入与  $ B^{-} $树的插入过程也基本相同。其不同之处在于：当进行结点分裂时，

在  $ B^{+} $树的插入过程中要把中间的元素提升到父结点中；而在  $ B^{+} $树的插入过程中，还必须将真正的元素保留在叶子结点中。这是因为  $ B^{+} $树中各非叶子结点中的元素值不一定是真正的元素，而只起到分界的作用， $ B^{+} $树中真正的元素必须在叶子结点上。 $ B^{+} $树插入的详细过程请参看函数中的注释。

 $ B^{+} $树插入的成员函数如下：

//B+树的插入
template<class T>
void MB2<T>::MB2_insert(T x)
{
 int flag, j, k, t;
 T y;
 mb2node<T> *p, *q, *u, *s, *w;
 if (BTH==NULL)
 { p=new mb2node<T>;
 p->num=1;
 p->key[0]=x;
 p->prt=NULL;
 for (j=1; j<=2 * M+1; j++)
 p->link[j-1]=NULL;
 BTH=p; SH=p;
 return;
 }
 q=MB2_shch(x, &k, &flag);
 //q=MB2_search(x, &k, &flag);
 w=q;
 if (flag==1)
 { cout<<"ERR!\n"; return; }
 p=NULL;
 t=0;
 while (t==0)
 { if (k==(q->num))
 { y=x;
 u=p;
 }
 else
 { y=q->key[q->num-1];
 u=q->link[q->num];
 for (j=(q->num)-1; j>=k+1; j--) //记录结点 q 的最后插入的关键字
 { q->key[j]=q->key[j-1]; if (w-q!=0)
 q->link[j+1]=q->link[j];
 }
 q->key[k]=x;
 if (w-q!=0)
 q->link[k+1]=p;
 if (p!=NULL)
 p->prt=q;
 }
 if (q->num<2 * M)
 { q->num=(q->num)+1; q->key[(q->num)-1]=y; if (w-q!=0)
 //若 q 不是叶子结点，则插入关键字 x 的向下指针
 //改变结点 p 中指向父结点的指针
 //结点 q 中关键字未满，可直接插入
 //结点 q 中的关键字个数增 1
 //将记录的关键字插入 q 的最后
 //若 q 不是叶子结点

if (u != NULL)
 u->prt=q;
t=1;
}
else
{ p=new mb2node<T>;
for (j=1; j<=2 * M+1; j++)
 p->link[j-1]=NULL;
p->num=M+1;
q->num=M;
p->prt=q->prt;
x=q->key[M];
for (j=1; j<=M; j++)
{ p->key[j-1]=q->key[M+j-1]; //将原结点q中的后半部的关键字
 p->link[j]=q->link[M+j]; //和向下指针复制到结点p中
 if (q->link[M+j] != NULL)
 (q->link[M+j])->prt=p; //改变子结点中指向父结点的指针
}
p->link[M+1]=u; //将记录的向下指针插入p的最后
p->key[M]=y; //将记录的关键字插入p的最后
if (u != NULL)
 u->prt=p; //改变结点u中指向父结点的指针
for (j=M+2; j<=2 * M+1; j++)
 q->link[j-1]=NULL; //将新结点p插入顺序链
p->link[0]=q->link[0]; //将新结点p链接到结点q的后面
q->link[0]=p; //即将新结点p链接到结点q的后面
if (q->prt==NULL)
 { s=new mb2node<T>; //申请一个新结点作为新的根结点
 s->key[0]=q->key[0]; //复制q中的第1个关键字到结点s
 s->key[1]=x; //插入结点q分裂时的中间关键字x
 s->link[1]=q; //第二个指针指向q
 s->link[2]=p; //第三个指针指向p
 s->num=2; //根结点中关键字个数为2
 s->prt=NULL; //根结点无父结点
 q->prt=s; p->prt=s; //结点p与q的父结点均为根结点s
 s->link[0]=NULL; //根结点第一个指针为空
 for (j=3; j<=2 * M; j++)
 s->link[j]=NULL; //置根结点中后面的指针为空
 BTH=s;
 t=1;
}
else
{ q=q->prt; //原结点q分裂时的中间关键字x应插入q的父结点
 k=1;
 while ((k<=q->num) && (q->key[k-1]<=x)) //寻找插入位置
 k=k+1;
 k=k-1;
}
}
return;

如果给定一个元素序列，需要构造一棵  $ B^{+} $ 树，则可以从空树开始，反复调用上述函数，逐个将元素插入  $ B^{+} $ 树（参看下面的主函数）。

## 3. B^{+} 树的删除

在  $ B^{+} $ 树中删除一个元素要比  $ B^{-} $ 树简单，这也是  $ B^{+} $ 树的优点之一。在  $ B^{+} $ 树的删除过程中，一般只需要在叶子结点中删除指定的元素就可以了，而索引  $ B^{-} $ 树部分一般不需要改动，即使非叶子结点中的某个元素值也等于被删的元素值，也不必改动它，因为它仍然可以起分界的作用。只有当删除一个元素后，使叶子结点中的元素个数小于 m 而需要合并时，才可能需要改动非叶子结点中的元素值。

 $ B^{+} $树删除的详细过程请参看函数中的注释。

 $ B^{+} $树删除的成员函数如下：

//B+树的删除
template<class T>
void MB2<T>::MB2_delete(T x)
{
 int flag, j, k, t;
 T y;
 mb2node<T> *u, *s=NULL, *p, *q;
 q=MB2_shch(x, &k, &flag); //用顺序查找法寻找被删除关键字的位置
// q=MB2_search(x, &k, &flag); //也可用随机查找法查找被删除关键字的位置
 if (flag==0) {
 cout<< "not this key!\\n"; return;
 }
 for (j=k; j<=q->num-1; j++)
 q->key[j-1]=q->key[j]; //删除关键字
 q->num=q->num-1; //结点 q 中关键字个数减 1
 if (q==BTH) {
 if (q->num==0) {
 if (delete BTH; BTH=NULL; SH=NULL; }
 return;
 }
 while ((q!=BTH) && (q->num<M)) {
 //q不是根结点且关键字个数小于M
 if (p=q->prt; j=1;
 while (p->link[j]!=q)
 j=j+1;
 if ((j<p->num) && ((p->link[j+1])->num>M))
 {
 s=p->link[j+1]; //从右兄弟结点中借关键字
 y=s->key[0]; //借最左边的关键字
 u=s->link[1]; //最左边的第二个指针
 }
 for (k=1; k<=s->num-1; k++)
 {
 s->key[k-1]=s->key[k]; //关键字左移
 s->link[k]=s->link[k+1]; //指针左移
 }
 s->link[s->num]=NULL; //置最后一个指针为空
 q->key[q->num]=y; //借的关键字复制到父结点
 q->link[q->num+1]=u; //借的指针复制到父结点
 p->key[j]=s->key[0]; //在父结点中置新的路标值
 if (u!=NULL)
 u->prt=q; //改变指向父结点的指针
 s->num=s->num-1; //右兄弟结点中的关键字个数减 1
 }
}

//B+树中没有该关键字

//删除关键字
//结点 q 为根结点
//关键字个数变为 0，即 B+树变空

//寻找结点 q 在父结点中的指针位置
//从右兄弟结点中借关键字
//借最左边的关键字
//最左边的第二个指针
//借最后一个指针为空
//借的关键字复制到父结点
//借的指针复制到父结点
//在父结点中置新的路标值

//改变指向父结点的指针
//右兄弟结点中的关键字个数减 1

q -> num = q -> num + 1; // 结点 q 的关键字个数增 1

else if ((j > 1) && ((p -> link[j - 1]) -> num > M))
{ s = p -> link[j - 1]; // 从左兄弟结点中借关键字
for (k = q -> num; k >= 1; k--)
{ q -> key[k] = q -> key[k - 1]; // 关键字右移
q -> link[k + 1] = q -> link[k]; // 指针右移
}
q -> key[0] = s -> key[s -> num - 1]; // 复制左兄弟结点中的关键字
u = s -> link[s -> num];
q -> link[1] = u; // 复制左兄弟结点中的指针
if (u != NULL)
{
 u -> prt = q;
 p -> key[j - 1] = q -> key[0]; // 改变指向父结点的指针
 s -> link[s -> num] = NULL; // 置父结点中的路标值
 s -> num = s -> num - 1; // 置左兄弟结点最后一个指针为空
 q -> num = q -> num + 1; // 左兄弟结点 s 的关键字个数减 1
}
else
{ if (j == p -> num)
{
 q = p -> link[j - 1]; // 要合并的结点之一
 s = p -> link[j]; // 要合并的结点之二
 j = j - 1;
}
else s = p -> link[j + 1]; // 要合并的结点之二
t = q -> num; // 记录结点 q 中关键字个数
for (k = 1; k <= s -> num; k++) // 邻近两个结点合并
{ q -> key[t + k - 1] = s -> key[k - 1]; q -> link[t + k] = s -> link[k]; u = s -> link[k]; if (u != NULL)
 u -> prt = q; // 改变指向父结点的指针
}
q -> num = t + (s -> num); // 结点 q 中的关键字个数
q -> link[0] = s -> link[0]; // 顺序链中结点 q 的指针
delete s; // 释放结点 s
for (k = j + 1; k <= p -> num - 1; k++) {
 p -> key[k - 1] = p -> key[k]; // 父结点中关键字左移
 p -> link[k] = p -> link[k + 1]; // 父结点中指针左移
}
p -> link[p -> num] = NULL; // 父结点中最后一个指针为空
p -> num = p -> num - 1; // 父结点中关键字个数减 1
s = q; q = p;
}
if ((q == BTH) && (q -> num == 1)) // 合并到了 B⁺树的根结点, 且只有一个关键字 { delete BTH; BTH = s; BTH -> prt = NULL; if (s -> num == 0) { BTH = NULL; SH = NULL; delete s; }
}

## 4. 按值大小输出  $ B^{+} $ 树中的关键字元素

按值大小输出  $ B^{+} $ 树中的关键字元素是很方便的，只需从顺序链的第一个结点开始，依次输出顺序链中各结点中的关键字值即可。

其成员函数如下：

//按值大小输出 B⁺ 树
template<class T>
void MB2<T>::MB2_prt()
{
 mb2node<T> *p;
 int k;
 p=SH;
 while (p!=NULL)
 {
 for (k=0; k<p->num; k++)
 cout<<p->key[k]<<endl;
 p=p->link[0];
 }
 return;
 }
}

下面举例说明反映以上操作的成员函数的使用。

例 3.9 在一棵空 B $ ^{+} $ 树中依次插入以下关键字序列：

04,18,13,79,33,45,06,23,35,12,34,76

按值大小输出该  $ B^{+} $ 树中的各关键字；然后在该  $ B^{+} $ 树中删除前 6 个插入的关键字，再按值大小输出该  $ B^{+} $ 树中的各关键字。

其主函数如下：

//ch3_10.cpp
#include "MB2.h"
int main()
{
 int x, k;
 int d[12]={04,18,13,79,33,45,06,23,35,12,34,76};
 MB2<int>mb2; //定义 B⁺树对象
 for (k=0; k<12; k++) //生成 B⁺树
 { x=d[k]; mb2.MB2_insert(x); }
 cout<<"第1次按值大小输出 B⁺树："<endl;
 mb2.MB2_prt();
 for (k=0; k<6; k++) //在 B⁺树中删除前6个插入的关键字
 { x=d[k]; mb2.MB2_delete(x); }
 cout<<"第2次按值大小输出 B⁺树："<endl;
 mb2.MB2_prt();
 return 0;
}

上述程序的运行结果如下：

第1次按值大小输出 B⁺ 树：
4
6
12
13
18

第2次按值大小输出 $ B^{+} $树：

### 3.6 拓扑分类

在许多实际应用中，经常会遇到这样的问题：一项大的工程可能要分成若干个子工程，但在整个工程中，有些子工程必须在其他有关子工程完成之后才能开始，也就是说，一个子工程的开始是以它的所有前序子工程的结束为前提条件的。当然，有些子工程也有可能是没有前提条件的，随时可以开始。例如，一个学生在整个学习阶段要学习许多课程，但在这些课程中，有些课程是有先修课程的，即在学习某门课程之前必须先学完它所规定的所有先修课程。当然，也有一些基础课程是没有先修课程的，它们随时可以开始学习。

如果把每一个子工程都看成一个独立的事件，则在这些事件中，每两个事件之间都有一个前后关系，如果前面的事件没有结束，则后面的那个事件就不能开始。因此，这就必须要给所有的事件排一个次序，以便能使工程正常进行。这就是拓扑分类的问题，拓扑分类也称拓扑排序。

不失一般性，我们将一项工程中的 n 个事件用自然数  $ 1 \sim n $ 进行编号（其编号顺序无关紧要），这就构成了一个自然数的集合  $ D = \{1,2,\cdots,n\} $。而这个集合中的每两个数之间存在着前后件关系（代表相应两个事件之间的前后关系），我们将每两个数之间的前后件关系用一个二元组  $ (i,j) $ 来表示，其中 i 是 j 的前件，j 是 i 的后件。那么，拓扑分类的问题就可以归结为如下问题：

已知自然数集合  $ D=\{1,2,\cdots,n\} $ 中各元素之间所有前后件关系（二元组）的集合为

 $$ \boldsymbol{R}=\left\{(i_{1},j_{1}),(i_{2},j_{2}),\cdots,(i_{m},j_{m})\right\} $$

其中， $ 1 \leqslant i_k \leqslant n $， $ 1 \leqslant j_k \leqslant n $， $ 1 \leqslant k \leqslant m $。要求自然数  $ 1 \sim n $ 的一个序列满足：该序列中前面的数一定不是后面数的后件，后面的数一定不是前面数的前件。

例如，有一自然数集合 $ D=\{1,2,3,4,5,6,7\} $，其所有的前后件关系为

 $$ R=\left\{\left(3,1\right),\left(3,2\right),\left(4,6\right),\left(4,7\right),\left(5,4\right),\left(5,6\right),\left(5,7\right),\left(6,7\right)\right\} $$

则可以验证，序列 $ A=(3,1,2,5,4,6,7) $就是一个拓扑分类序列。拓扑分类序列不是唯一的。

一种有效的拓扑分类方法是：通过给定的二元组的集合 R 依次找出没有前件的 D 中的元素并输出，同时将它从 D 中删除，其具体过程如下。

首先定义以下几个数组。

•  $ F(1:n) $：其中每一个元素  $ F(i) $ 用于存放相对于 R 的数 i 的前件个数（在 R 中数是后件的二元组个数），其初始状态为  $ F(i)=0(i=1,2,\cdots,n) $。

 $ G(1:n) $：其中每一个元素 $ G(i) $用于链接R中数i的所有后件，其初始状态为 $ G(i)=0(i=1,2,\cdots,n) $。

• S(1:n)：这是一个栈，用于在算法执行过程中存放当前所有没有前件的数。

另外，为了存放 R 中的 m 个后件，并将它们分别链接到以  $ G(i)(i=1,2,\cdots,n) $ 为头指针的链接表中，这就需要 m 个结点，分别用数组  $ V(1:m) $ 和  $ NEXT(1:m) $ 中的元素表示结点的值域与指针域。

然后依次读入 R 中的各二元组  $ (i_k, j_k) $ (1  $ \leq k \leq m $)，对于每一次的输入，将  $ F(j_k) $ 增加 1（对数  $ j_k $ 的前件进行计数），并将  $ j_k $ 插入以  $ G(i_k) $ 为头指针的链接表中，其中结点依次取自数组 V 和 NEXT。

当 R 中的所有二元组读入结束后，再将所有没有前件的数推入栈 S 中，即将所有满足  $ F(k)=0 $ 的  $ k(k=1,2,\cdots,n) $ 推入栈 S。

以上过程结束后，可以得到如下结果：

(1)  $ F(i)(i=1,2,\cdots,n) $ 给出了相对于 R 的数 i 的前件个数。

（2）以  $ G(i)(i=1,2,\cdots,n) $ 为头指针的链表中链接了相对于 R 的数 i 的所有后件，其中所有结点都取自于数组 V（存放数 i 的后件）和 NEXT（存放指针）。

（3）栈 S 中存放了所有没有前件的数。

对于一个可以求解的实际问题中，应该至少有一个元素没有前件（至少应该有一个子工程没有前序工程，可以首先开工），因此，在以上结果中，栈 S 中至少存放着一个没有前件的数。

最后，可以通过系统地修改数组 F 和栈 S 找出一个拓扑分类序列，其过程如下：

将栈 S 的栈顶元素（设为 i）输出（因为它已经没有前件），并将它从栈 S 中删除。此时，对于数 i 的每一个后件 j（它们均被链接在以  $ G(i) $ 为头指针的链接表中），由于不必再考虑它的前件 i，因此，对于每一个  $ F(j) $ 的值应当减去 1（因为形式上可以认为它的前件 i 已从集合中删去）。如果此时对于某些  $ F(j) $ 已变为 0，则将这些 j 推入栈 S（因为它们也没有前件了）。这个过程一直进行到栈 S 变空为止。如果该问题可以求解，则这个过程能正确地终止。

拓扑分类算法的 C++ 描述如下：

//topo.h
#include<iostream>
using namespace std;
void topo(int n, int r[], int m, int p[])
{
 int top, i, j, k, t, *s, *g, *f;
 struct node
 {
 int suc;
 int next;
 } *q;
 q=new node[m];
 f=new int[n];

s = new int[n];
g = new int[n];
top = -1; t = 0;
for (k = 0; k <= n - 1; k++)
{
 f[k] = 0; g[k] = -1;
for (k = 0; k <= m - 1; k++)
{
 i = r[k + k]; j = r[k + k + 1];
 f[j - 1] = f[j - 1] + 1;
 q[k].next = g[i - 1];
 q[k].suc = j;
 g[i - 1] = k;
 }
for (k = 0; k <= n - 1; k++)
{
 if (f[k] == 0) {
 top = top + 1; s[top] = k + 1;
 while (top) != -1;
 i = s[top]; top = top - 1; p[t] = i; t = t + 1;
 k = g[i - 1];
 while (k) != -1;
 j = q[k].suc; f[j - 1] = f[j - 1] - 1;
 if (f[j - 1] == 0) {
 top = top + 1; s[top] = j;
 k = q[k].next;
 j
 for (k = 0; k <= n - 1; k++)
 if (f[k] != 0) {
 p[t] = - (k + 1); t = t + 1;
 }
 delete[] f; delete[] g; delete[] s; delete[] q;
 return;
 }

主函数程序如下：

//ch3_11.cpp
#include "topo.h"
int main()
{
 int p[7], i;
 int r1[8][2]={}, {3,1}, {3,2}, {4,6}, {4,7},
 {5,4}, {5,6}, {5,7}, {6,7}, {7};
 int r2[6][2]={}, {3,1}, {3,2}, {2,7},
 {4,5}, {5,6}, {6,4};
 topo(7, &r1[0][0], 8, p);
 for (i=0; i<=6; i++) cout<<p[i]<<";
 cout<<endl;
 topo(7, &r2[0][0], 6, p);
 for (i=0; i<=6; i++) cout<<p[i]<<";
 cout<<endl;
 return 0;
}

上述程序的运行结果如下：

5 4 6 7 3 1 2
3 1 2 7 -4 -5 -6

#### 3.7.1 字符串的基本概念

字符串(string)是字符的一个有限序列，它本质上就是数据元素类型为字符的线性表。字符串一般表示为

 $$ \mathbf{\Omega}a_{1}a_{2}\cdots a_{i}\cdots a_{n}\mathbf{\Omega} $$

其中，两边的双撇号是作为字符串的起止定界符号，不属于字符串中的字符； $ a_{i}(1 \leqslant i \leqslant n, n \geqslant 0) $ 表示字符串中的第i个字符，n 表示字符串中字符的个数，称为字符串的长度；当 n = 0 时，称为空串，即字符串中不含任何字符。

由于字符串本质上是线性表，只不过其中的数据元素为字符类型，因此，对线性表的所有运算对字符串也适用。

从字符串的表示形式来看，字符串是字符的紧密排列，是一个有机的整体，用于描述事物的基本属性。例如，可以用字符串表示姓名、产品名称等。在一般的程序设计语言中，一般都定义了字符串类型，并且把字符型数组看成长度固定的字符串。

字符串除了具有一般线性表所具有的运算外，由于字符串具有多种数据类型的特点，因此，对字符串的运算要比一般的线性表更丰富。下面列出一些常用的字符串运算。

（1）连接运算。将两个字符串首尾相连成一个字符串。

（2）取子串运算。从一个字符串中取出从某个位置（或某个字符）开始的若干个连续字符。

（3）删除子串运算。从一个字符串中删除从某个（或某个字符）位置开始的若干个连续字符。

（4）插入子串运算。在一个字符串的某个位置处插入另一个字符串（称为子串）。

（5）求子串位置。在一个字符串中找出首次与另一字符串（称为子串）相同的起始位置。

求子串位置的运算一般称为字符串匹配，也称为模式匹配。

#### 3.7.2 字符串匹配的 KMP 算法

在一般的编辑软件系统中，经常要遇到在一个给定的文本中检测一个特定的字符串的问题，这就是字符串匹配。字符串匹配又称模式匹配。

设 P 是一个模式字符串（特定字符串，以下简称模式），其长度为 m（P 中的字符个数）；S 是一个正文字符串（以下简称正文），其长度为 n。通常总是认为 n 要比 m 大得多。字符串匹配的问题就是要从正文 S 中检测出模式 P，即从正文 S 中查找模式 P 的位置。例如，要将字符串 "CONGEMUE" 中的 "GEM" 修改为 "TIN"，则首先应在该字符串中检测出 "GEM" 的位置，这就是字符串匹配的问题。其中，"CONGEMUE" 为正文 S，"GEM" 为模式 P。

## 1. 字符串匹配的简单算法

字符串匹配的一个直观而简单的方法是：从正文 S 和模式 P 的第一个字符出发，将 S

和 P 的字符依次进行比较。如果模式 P 中的所有字符均与 S 中的对应字符匹配完，则说明在正文 S 中找到了模式 P 的字符串；如果在字符比较过程中发现了一对字符不匹配，则将模式 P 沿正文 S 向后移动一个字符的位置，然后从模式 P 的第一个字符开始依次与正文 S 中的对应字符逐个进行比较。以此类推，这个过程直到模式 P 中的字符全部匹配完成模式 P 到达正文 S 的末端为止，前者说明在正文 S 中找到了模式 P，后者说明在正文 S 中找不到模式 P。

例如，设正文 S 为 "ABABABCCA"，模式 P 为 "ABABC"，利用上述方法进行比较的过程如下。

（1）开始进行比较，并发现模式P的第5个字符C与正文S的对应字符A不匹配。即

（2）模式 P 沿正文 S 向后移动一个位置，从模式 P 的第一个字符开始重新进行比较，并且又发现了模式 P 的第一个字符 A 与正文 S 中的对应字符 B 不匹配。即

（3）模式 P 沿正文 S 又向后移动一个位置，并从模式 P 的第一个字符开始又重新进行比较，此时，模式 P 中的字符全部匹配完。即

在正文 S 的第 3 个字符处找到了模式 P。

字符串匹配简单算法的 C++ 描述如下：

//zfpp.cpp

//字符串匹配简单算法

//s 正文字符串S

//p 模式字符串P

//n 正文字符串S长度

//m 模式字符串P长度

//zfpp() 返回模式 P 在正文 S 中的位置

int zfpp(char s[], char p[], int n, int m)

{

 int i, j, k, flag;

 i = 0; flag = 0;

 while ((i <= n - m) && (flag == 0))

 {

 i = i + 1; j = i; k = 1;

 while ((k <= m) && (s[j - 1] == p[k - 1]))

 {

 j = j + 1; k = k + 1;

 }

 }

 }

}

if (k==m+1) flag=1;
}
i=i-1;
if (flag==0) i=-1;
return(i);
}

在上述算法程序中，若返回的函数值为 $ -1 $，则说明查找失败；否则说明查找成功，且返回的函数值为模式P的第一个字符在正文中的位置（下标）。下面对这个算法的性能进行讨论。

如果模式 P 出现在正文 S 的始端，则只要进行 m 次比较就以“成功”结束，这显然是一种最好的情况。如果模式 P 的第一个字符根本不在正文 S 中，则在模式 P 与正文 S 的比较过程中，只需通过一次比较就发现不匹配，模式 P 就要沿正文 S 向后移动一个位置，这个过程直到模式 P 到达正文 S 的末端为止。因此，在这种情况下，只需比较  $ n-m+1 $ 次就以“失败”告终，这也是一种好的情况。还有一种情况是，在模式 P 中，除了最后一个字符外，其余的前 m-1 个字符都与正文 S 中从任意位置开始的对应字符相匹配。例如，模式 P 为 "A…AB" ( $ m-1 $ 个 A 后面紧跟 1 个 B)，正文 S 为 "AA…A" ( $ n $ 个 A)，这就属于这种情况。在这种情况下，模式 P 要与正文 S 比较 m 个字符后才能发现不匹配，也就是说，要比较 m 次后才使得模式 P 沿正文 S 向后移动一个位置，直至模式 P 移到正文 S 的末端为止。因此，在这种情况下，共需要比较  $ m(n-m+1) $ 次，这是一种最坏的情况。

另外，在这个算法执行过程中，当发现一次不匹配时，模式 P 沿正文 S 只向后移动一个位置，这就造成先前已经比较过的正文字符可能还需进行比较，这不但增加了比较次数，而且会引起反复存取正文字符串的操作。下面介绍的 KMP 算法克服了这个缺点。

## 2. 字符串匹配的 KMP 算法

KMP(Knuth-Morris-Pratt)算法的基本思想是：当模式P与正文字符串S进行比较的过程中发生不匹配时，找到一种模式P沿正文S向后移动的规则，以便使得正文S中失去匹配的字符之前的字符不再参与比较，即只从当前失去匹配的字符开始与模式P中的字符继续依次进行比较，并且不能错过模式发现的机会。

例如，模式 P 为 "ABABABCB"，并假设模式 P 与正文字符串 S 进行比较的过程中已经有 6 个连续的字符匹配如下：

现在，如果发现正文 S 的下一个字符 X 不是 C，即在模式 P 的第 7 个字符上匹配失败，此时，模式 P 可沿正文 S 向后移动两个位置或四个位置，这样，正文 S 中字符 X 以前的字符与模式 P 中的对应字符匹配，从而使 X 以前的字符不再进行重复比较。但为了不错过模式 P 在正文 S 中发现的机会，模式 P 只能沿正文 S 向后移动两个位置，即当模式 P 中的第 7 个字符与正文 S 中的对应字符不匹配时，应该用模式 P 中的第 5 个字符再开始与之进行比较，即

A B A B A B C B

通常用一个失败链接数组 FLINK 来描述模式 P 在匹配失败时的移动规则，其中 FLINK(i) 表示当模式 P 中的第 i 个字符匹配失败时，模式 P 中重新开始进行比较的字符序号，其中  $ 1 \leq i \leq m $。在上述例子中有 FLINK(7)=5，并称为模式 P 中第 7 个结点的失败链接应指向第 5 个结点。

失败链接数组只与模式 P 有关，而与具体的正文 S 无关。因此，在字符串匹配过程中，失败链接数组反映了模式 P 的特性。

下面具体介绍如何构造模式 P 的失败链接数组。

设在模式 P 中的第 i 个结点的失败链接为 j，即  $ \mathrm{FLINK}(i)=j $，则根据上面的叙述可知，失败链接应具有以下 3 个性质：

(1)  $ j < i $。也就是说，当发现模式 P 中的第 i 个字符不匹配时，应沿正文 S 向后移动。

（2）在模式 P 中，前 j-1 个字符与第 i 个结点之前的 j-1 个字符匹配，即  $ p_{1}, p_{2}, \cdots, p_{j-1} $ 匹配于  $ p_{i-(j-1)}, \cdots, p_{i-2}, p_{i-1} $。这就是说，当模式 P 沿正文 S 向后移动后，正文 S 中失去匹配的字符之前的字符均已经与模式 P 中的字符相匹配，从而避免了正文字符的重复比较。

（3）j 是满足(1)和(2)的最大整数。这就是说，模式 P 的最初段与刚比较过的正文部分有最大的重叠，以避免错过模式 P 被发现的机会。

显然， $ FLINK(1)=0 $，即当模式P的第一个字符失去匹配时，应将模式P沿正文S向后移动一个位置，从模式P的第一个字符开始与正文S的下一个字符进行比较。

现假设模式 P 的前 i-1 个结点的失败链接已经设置好，且 FLINK $ (i-1)=j $。下面设置第 i 个结点的失败链接。

根据失败链接的性质(2)，有如下匹配序列：

 $$ \begin{array}{ccccc} \mathcal{P}_{i-j} & \mathcal{P}_{i-j+1} & \cdots & \mathcal{P}_{i-2} \\ \uparrow & \uparrow& & \uparrow \\ \downarrow & \downarrow& & \downarrow \\ \mathcal{P}_{1} & \mathcal{P}_{2} & \cdots & \mathcal{P}_{j-1} \end{array} $$

并且，在模式 P 与正文 S 进行比较的过程中，如果模式 P 已经到达第 i 个结点，则前一个被比较的正文字符必定为  $ p_{i-1} $。由此可以得到以下两个规则。

（1）如果 $ p_{i-1}=p_{j} $，则在上述匹配序列中可以再延伸一对匹配字符，得

 $$ \begin{array}{ccccc}\dot{p}_{i-j}&\dot{p}_{i-j+1}&\cdots&\dot{p}_{i-2}&\dot{p}_{i-1}\\\uparrow&\uparrow&&\uparrow&\uparrow\\\downarrow&\downarrow&&\downarrow&\downarrow\\\dot{p}_{1}&\dot{p}_{2}&\cdots&\dot{p}_{j-1}&\dot{p}_{j}\end{array} $$

即模式 P 中的前 j 个字符与第 i 个结点之前的 j 个字符匹配。因此，根据失败链接的 3 个性质，第 i 个结点的失败链接为  $ j+1 $，即

 $$ \mathrm{F L I N K}(i)=\mathrm{F L I N K}(i-1)+1 $$

（2）如果  $ p_{i-1} \neq p_j $，则必须寻找模式 P 中的一个初始子串，使它与以  $ p_{i-1} $ 结束的子串相匹配，这就需要返回。即令

 $$ j^{^{(1)}}=FLINK(j) $$

然后判断  $ p_{j(1)} $ 是否等于  $ p_{i-1} $。若相等，则有

 $$ \mathrm{F L I N K}(i)=j^{(1)}+1 $$

否则，再令

 $$ j^{^{(2)}}=\mathrm{F L I N K}(j^{^{(1)}}) $$

以此类推，直到对于某个 $ j^{(k)} $满足 $ p_{j^{(k)}}=p_{i-1} $或 $ j^{(k)}=0 $为止。此时有

 $$ \mathrm{F L I N K}(i)=j^{(k)}+1 $$

由以上两个规则，可以得到模式  $ P = \prime ABABABCB' $ 的失败链接如下：

FLINK(1) = 0, FLINK(2) = 1, FLINK(3) = 1, FLINK(4) = 2
FLINK(5) = 3, FLINK(6) = 4, FLINK(7) = 5, FLINK(8) = 1

有了模式 P 的失败链接数组后，就可以在具体的正文 S 中检测模式 P。由以上的分析，可以得到字符串匹配 KMP 算法的 C++ 描述如下：

//kmp.cpp
//s 正文字符串 S
//p 模式字符串 P
//kmp()返回模式字符串 P 在正文字符串 S 中的位置
#include<string.h>
#include<iostream>
using namespace std;
void qflink(char[], int, int[])
;
int kmp(char s[], char p[])
{
 int i, j, n, m, flag, *flink;
 n=strlen(s);
 m=strlen(p);
 flink=new int[m];
 qflink(p, m, flink);
 i=1; j=1; flag=0;
 while ((i<=n)&& (flag==0))
 {
 while ((j!=0)&& (p[j-1] != s[i-1])) j=flink[j-1];
 if (j==m) flag=1;
 else { i=i+1; j=j+1; }
 }
 i=i-m;
 if (flag==0) i=-1;
 delete[] flink; return(i);
}
//构造模式P的失败链接数组
void qflink(char p[], int m, int flink[])
{
 int i, j;
 flink[0]=1; i=1;
 while (i<=m-1)
 {
 j=flink[i-1];
 while ((j!=0)&& (p[j-1] != p[i-1])) j=flink[j-1];
 }
 }
}

flink[i]=j+1;
i=i+1;
}
return;
}

在上述描述的算法程序中，若返回的函数值为 -1，则说明查找失败；否则说明查找成功，且返回的函数值为模式 P 的第一个字符在正文中的位置（下标）。

字符串匹配 KMP 算法的最坏情况是模式 P 不在正文 S 中出现，在这种情况下，算法中的内循环测试对于每一个正文字符最多有一次是成功匹配的，即算法中的内循环测试最多有 n 次比较是成功的。另一方面，算法执行外循环一次，j 都要增加 1，而外循环共执行了 n 次，因此，j 共增加了 n 次；但根据失败链接的性质（FLINK $ (i) < j $），每执行一次内循环 j 将减少一次，而 j 又不能是负数。

因此，算法中的内循环最多执行 n 次，即内循环测试中的不成功比较最多有 n 次。由此可知，在算法的内循环测试中，最多有 n 次比较是成功的，也最多有 n 次比较是不成功的。而在这个算法中，所有的字符比较操作均包含在内循环测试中，因此，在字符串匹配的 KMP 算法中，在最坏情况下，最多要进行 2n 次字符比较。

根据以上分析可以看出，字符串匹配的 KMP 算法与字符串匹配的简单算法相比，有两个显著的优点：一是时间复杂度小（字符比较的次数少）；二是避免了正文字符的重复比较，从而减少了对正文字符串反复存取的操作。

## 3.1 依次输入以下元素序列：

 $$ \begin{array}{l} 56,78,34,45,85,45,36,91,84,78 \end{array} $$

试构造一棵二叉排序树。要在这棵二叉排序树中查找55，需要比较多少次？

3.2 依次输入以下元素序列：

 $$ \begin{array}{l} 12,15,20,23,34,46,51,62,73,88 \end{array} $$

试构造一棵二叉排序树。

3.3 依次输入以下元素序列：

 $$ \begin{array}{l} 04,18,13,76,34,45,06,23,35,12 \end{array} $$

试构造一棵5阶 $ (m=2) $ B 树。

3.4 设线性 Hash 表的长度 n=12，分别用下列 Hash 码将关键字元素序列（09，12，04，16，19，31，20，45，01，11，25，26）填入线性 Hash 表，并指出各关键字元素在填入过程中的冲突次数。

(1)  $ i = \bmod(k, n) $;

(2)  $ i = \text{mod}(k * 0.618, n) $.

3.5 设溢出 Hash 表中的关键字元素均为非负整数，其存储空间为数组  $ H(1:m) $。其中，Hash 表的长度为  $ n(n<m) $，并使用数组 H 的前 n 个元素；溢出表为栈结构，存储空间使用数组 H 的后 m-n 个元素。Hash 码为  $ i=\text{mod}(k,n) $。

（1）如何表示 Hash 表中的空表项？

（2）给出 Hash 表与溢出表的初始状态。

（3）编写在溢出 Hash 表中填入关键字元素的算法。在此算法中应考虑关键字元素的合法性及表空间是否溢出。

（4）编写在溢出 Hash 表中查找关键字元素的算法。在此算法中要求检查待查元素的合法性，并要求设置一个标志说明是否查到。

3.6 设随机 Hash 表的长度为 n=8。

（1）利用本章给出的算法，写出伪随机数序列中的前6个随机数。

(2) 设 Hash 码为  $ i = \text{mod}(k * 0.618, n) $。将关键字元素序列 (19, 31, 20, 45, 01, 11, 25, 26) 填入随机 Hash 表，并注明冲突次数。

3.7 Hash 表技术的目标是什么？如何提高 Hash 表的查找效率？

3.8 扼要归纳本章介绍的几种 Hash 表的适用对象及其优缺点。

3.9 分别用冒泡排序及谢尔排序对下列线性表进行排序。要求给出中间每一步的结果。

（1）（81，52，57，22，95，04，83，96，42，32，48，78，14，87，67）；

（2）（424，887，807，709，882，616，573，413，679，180，975，264）。

3.10 试编写归并排序的递归算法。

3.11 分别依次读入题3.9中的两个无序序列中的元素，构造两个堆。

3.12 用快速排序法对题3.9中的两个无序序列进行排序。

3.13 编写下列程序：

（1）产生1000个伪随机数，并依次存入一个数据文件。

（2）对此1000个伪随机数序列分别用冒泡排序、快速排序、谢尔排序和堆排序方法进行排序，并比较它们的运行时间。

3.14 设自然数集合为  $ D=\{1,2,3,4,5,6,7\} $，反映元素间前后件关系的二元组集合为  $ R=\{(1,2),(1,3),(2,4),(2,5),(2,6),(3,5),(3,7),(5,7),(6,7)\} $

试确定一个相对于集合 R 的 D 的拓扑分类序列。
