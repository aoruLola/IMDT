# 2.3.1 线性链表的基本概念

> 来源：docs/08_电子书/计算机软件技术基础（第5版）-徐士良、葛兵.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：d53505b4754eaf37


2.2 节主要讨论了线性表的顺序存储结构以及在顺序存储结构下的运算。线性表的顺序存储结构具有简单、运算方便等优点，特别是对于小线性表或长度固定的线性表，采用顺序存储结构的优越性更为突出。

但是，线性表的顺序存储结构在某些情况下就显得不那么方便了，运算效率不那么高。实际上，线性表的顺序存储结构存在以下几方面的缺点。

（1）在一般情况下，要在顺序存储的线性表中插入一个新元素或删除一个元素时，为了保证插入或删除后的线性表仍然为顺序存储，在插入或删除过程中需要移动大量的数据元素。在平均情况下，为了在顺序存储的线性表中插入或删除一个元素，需要移动线性表中约一半的元素；在最坏情况下，则需要移动线性表中所有的元素。因此，对于大的线性表，特别是在元素的插入或删除很频繁的情况下，采用顺序存储结构是很不方便的，插入与删除运算的效率都很低。

（2）当为一个线性表分配顺序存储空间后，当线性表的存储空间已满，但还需要插入新的元素时，就会发生“上溢”错误。在这种情况下，如果在原线性表的存储空间中找不到与之连续的可用空间，则会导致运算的失败或中断。显然，这种情况的出现对运算是很不方便的。也就是说，在顺序存储结构下，线性表的存储空间不便于扩充。

（3）在实际应用中，往往同时有多个线性表共享计算机的存储空间。例如，在一个处理中，可能要用到若干个线性表（包括栈与队列）。在这种情况下，存储空间的分配将是一个难题。如果将存储空间平均分配给各线性表，则有可能造成有的线性表的空间不够用，而有的线性表根本用不着分配给它的那么多的空间，这就使得在有的线性表空间无用而处于空闲的情况下，另外一些线性表的操作由于“上溢”而无法进行。这种情况实际上是因为计算机的存储空间得不到充分利用而造成的。如果多个线性表共享存储空间，要对每一个线性表的存储空间进行动态分配，则为了保证每一个线性表的存储空间连续且顺序分配，就会导致在对某个线性表进行动态分配存储空间时，必须要移动其他线性表中的数据元素。这就是说，线性表的顺序存储结构不便于对存储空间进行动态分配。

由于线性表的顺序存储结构存在以上缺点，因此，对于大的线性表，特别是元素变动频繁的大线性表不宜采用顺序存储结构，而是采用下面要介绍的链式存储结构。

假设数据结构中的每一个数据结点对应于一个存储单元，则这种存储单元称为存储结点，简称结点。

在链式存储方式中，要求每个结点由两部分组成：一部分用于存放数据元素值，称为数据域；另一部分用于存放指针，称为指针域。其中，指针用于指向该结点的前一个或后一个

结点（前件或后件）。在链式存储结构中，存储数据结构的存储空间可以不连续，各数据结点的存储顺序与数据元素之间的逻辑关系可以不一致，而数据元素之间的逻辑关系是由指针域来确定的。链式存储方式既可用于表示线性结构，也可用于表示非线性结构。在用链式结构表示较复杂的非线性结构时，其指针域的个数要多一些。

线性表的链式存储结构称为线性链表。为了适应线性表的链式存储结构，计算机存储空间被划分为一个个小块，每一小块占若干字节，通常称这些小块为存储结点。为了存储线性表中的每一个元素，一方面要存储数据元素的值，另一方面要存储各数据元素之间的前后件关系。为此目的，将存储空间中的每一个存储结点分为两部分：一部分用于存储数据元素的值，称为数据域；另一部分用于存放下一个数据元素的存储序号（存储结点的地址），即指向后件结点，称为指针域。由此可知，在线性链表中，存储空间的结构如图2.17所示。

在程序设计语言中，线性链表的存储空间可以用两个同样大小的一维数组（但它们的数据类型不同）表示，分别为  $ V(1:m) $ 和  $ NEXT(1:m) $。其中  $ V(i) $ 表示第 i 个存储结点的数据域， $ NEXT(i) $ 表示第 i 个存储结点的指针域，线性链表中存储结点的结构如图 2.18 所示。

<div style="text-align: center;"><div style="text-align: center;">图 2.17 线性链表的存储空间</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.18 线性链表的一个存储结点</div> </div>

在线性链表中，用一个专门的指针 HEAD 指向线性链表中第一个数据元素的结点（存放线性表中第一个数据元素的存储结点的序号）。线性表中最后一个元素没有后件，因此，线性链表中最后一个结点的指针域为空（用 NULL 或 0 表示），表示链表终止。线性链表的逻辑结构如图 2.19 所示。

<div style="text-align: center;"><div style="text-align: center;">图 2.19 线性链表的逻辑结构</div> </div>

下面举一个例子来说明线性链表的存储结构。

设线性表为 $ (a_{1},a_{2},a_{3},a_{4},a_{5}) $，存储空间具有10个存储结点，该线性表在存储空间中的物理状态如图2.20(a)所示。为了直观地表示该线性链表中各元素之间的前后件关系，还可以用图2.20(b)所示的逻辑状态来表示，其中每一个结点上面的数字表示该结点的存储序号（简称结点号）。

一般来说，在线性表的链式存储结构中，各数据结点的存储序号是不连续的，并且各结点在存储空间中的位置关系与逻辑关系也不一致。在线性链表中，各数据元素之间的前后件关系是由各结点的指针域来指示的。指向线性表中第一个结点的指针HEAD称为头指针。当HEAD=NULL（或0）时，称为空表。

<div style="text-align: center;"><div style="text-align: center;">(a) 线性链表的物理状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 线性链表的逻辑状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.20 线性链表例</div> </div>

在 C++ 中，定义链表结点结构的一般形式如下：

struct 结构体类型名
{ 数据成员表；
 结构体类型名 *指针变量名；
};

例如，下面定义的结点类型中，数据域包含两个数据项：一是包含10个字符的数组（字符串），用于表示姓名；二是字符类型数据，用于表示性别。

struct node
{
 char name[10];
 char sex;
 node *next;
};

在 C++ 中，可以用 new 运算符申请分配链表结点的存储空间，其形式为

new 类型名 或 new 类型名[m]

其结果为存储空间的首地址。例如：

new node

为申请分配能存放一个链表结点 node 类型数据的存储空间，返回这个存储空间的首地址。而

new node[m]

为申请分配能存放 m 个链表结点 node 类型数据的存储空间，返回这个存储空间的首地址。

下面的 C++ 程序段定义了一种结点类型 node；并定义了该类型的指针变量 p（用于指向该种结点类型的存储空间的首地址）；最后申请分配该结点类型的一个存储空间，其首地址存放在指针变量 p 中。

struct node
{
 int d;
 node *next;
};
int main()
{
 node *p;
 ...
 p=new node;
 ...
 delete p;
 return 0;
}

//定义结点类型
//数据域
//指针域

//定义该类型的指针变量p

//申请分配结点存储空间

//释放结点存储空间

对于线性链表，可以从头指针开始，沿各结点的指针扫描到链表中的所有结点。

上面讨论的线性链表又称为线性单链表。在这种链表中，每一个结点只有一个指针域，由这个指针只能找到后件结点，但不能找到前件结点。因此，在这种线性链表中，只能顺指针向链尾方向进行扫描，这对于某些问题的处理会带来不便。因为在这种链接方式下，由某一个结点出发，只能找到它的后件，要找出它的前件，就必须从头指针开始重新寻找。

为了弥补线性单链表的这个缺点，在某些应用中，对线性链表中的每个结点设置两个指针。其中，一个称为左指针（Llink），用来指向其前件结点；另一个称为右指针（Rlink），用来指向其后件结点。这样的线性链表称为双向链表，其逻辑状态如图2.21所示。

<div style="text-align: center;"><div style="text-align: center;">图 2.21 双向链表示意图</div> </div>

## 2.3.2 线性链表的插入与删除

线性链表的运算主要有以下几个。

（1）在线性链表中包含指定元素的结点之前插入一个新元素。

（2）在线性链表中删除包含指定元素的结点。

（3）将两个线性链表按要求合并成一个线性链表。

（4）将一个线性链表按要求进行分解。

（5）逆转线性链表。

（6）复制线性链表。

（7）线性链表的排序。

（8）线性链表的查找。

本节主要讨论前两个运算。

1. 线性链表的插入

线性链表的插入是指在链式存储结构下的线性表中插入一个新元素。

为了在线性链表中插入一个新元素，首先要给该元素分配一个新结点，以便用于存储该元素的值。新结点可以从可利用栈中取得，然后将存放新元素值的结点链接到线性链表中指定的位置。

假设可利用栈与线性链表如图 2.22(a) 所示。现在要在线性链表中包含元素 x 的结点

之前插入一个新元素b，其插入过程如下：

<div style="text-align: center;"><div style="text-align: center;">(a) 原来的可利用栈与线性链表</div> </div>

(b) 从可利用栈取得结点 p，在线性链表中找到包含元素 x 的前一个结点 q

<div style="text-align: center;"><div style="text-align: center;">(c) p 插入到 q 之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.22 线性链表的插入</div> </div>

（1）从可利用栈中取得一个结点，设该结点号为 p（取得结点的存储序号存放在变量 p 中）；并置结点 p 的数据域为插入的元素值 b，即  $ V(p)=b $。经过这一步后，可利用栈的状态如图 2.22(b) 所示。

（2）在线性链表中寻找包含元素 x 的前一个结点，设该结点的存储序号为 q。线性链表如图 2.22(b) 所示。

（3）将结点 p 插入结点 q 之后。为了实现这一步，只要改变以下两个结点的指针域内容：

①使结点 p 指向包含元素 x 的结点（结点 q 的后件结点），即

 $$  NEXT(p)=NEXT(q) $$

②使结点q的指针域内容改为指向结点p，即

 $$  NEXT(q)=p $$

这一步的结果如图 2.22(c) 所示，此时插入就完成了。

从线性链表的插入过程可以看出，由于插入的新结点取自于可利用栈，因此，只要可利用栈不空，在线性链表插入时总能取到存储插入元素的新结点，不会发生“上溢”的情况。而且，由于可利用栈是公用的，多个线性链表可以共享它，从而很方便地实现了存储空间的动态分配。另外，线性链表在插入过程中不发生数据元素移动的现象，只需改变有关结点的指针即可，从而提高了插入的效率。

## 2. 线性链表的删除

线性链表的删除是指在链式存储结构下的线性表中删除包含指定元素的结点。为了在线性链表中删除包含指定元素的结点，首先要在线性链表中找到这个结点，然后将要删除结点放回到可利用栈。

假设可利用栈与线性链表如图 2.23(a) 所示。现在要在线性链表中删除包含元素 x 的

结点，其删除过程如下。

（1）在线性链表中寻找包含元素 x 的前一个结点，设该结点序号为 q，则包含元素 x 的结点序号 p=NEXT(q)。

（2）将结点 q 后的结点 p 从线性链表中删除，即让结点 q 的指针指向包含元素 x 的结点 p 的指针指向的结点，即

 $$  NEXT(q)=NEXT(p) $$

经过上述两步后，线性链表如图2.23（b）所示。

（3）将包含元素 x 的结点 p 送回可利用栈。经过这一步后，可利用栈的状态如图 2.23(c) 所示。此时，线性链表的删除运算完成。

<div style="text-align: center;"><div style="text-align: center;">(a) 原来的可利用栈与线性链表</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 从线性链表中删除包含元素 x 的结点 p 后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 将被删除的结点 p 送回可利用栈后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.23 线性链表的删除</div> </div>

从线性链表的删除过程可以看出，在线性链表中删除一个元素后，不需要移动表的数据元素，只需改变被删除元素所在结点的前一个结点的指针域即可。另外，由于可利用栈用于收集计算机中所有的空闲结点，因此，当从线性链表中删除一个元素后，该元素的存储结点就变为空闲，应将该空闲结点送回可利用栈。

## 3. 线性链表类

下面的描述是将线性链表的数据和基本操作（初始化、扫描输出、插入与删除操作等）封装成一个线性链表类。

//linked_List.h
#include<iostream>
using namespace std;
//定义结点类型
template<class T>
struct node
{
 T d;
 node *next;
};
//定义线性链表类

template<class T>
class linked_List
{
 private:
 node<T> * head;
 public:
 linked_List();
 void prt_linked_List();
 void ins_linked_List(T, T);
 int del_linked_List(T);
};

// 模板声明，数据元素虚拟类型为 T

// 查询函数
// 查询函数，建立空链表
// 扫描输出链表中的元素
// 在包含元素 x 的结点前插入新元素 b
// 删除包含元素 x 的结点

// 建立空链表
template<class T>
linked_List<T>:::linked_List()
{
 head = NULL;
 return;

// 扫描输出链表中的元素
template<class T>
void linked_List<T>:::prt_linked_List()
{
 node<T> * p;
 p = head;
 if (p == NULL) {
 cout << "空链表!" << endl;
 return;
 }
 do {
 cout << p -> d << endl;
 p = p -> next;
 }
 while (p != NULL);
 return;
}

// 在包含元素 x 的结点前插入新元素 b
template<class T>
void linked_List<T>:::ins_linked_List(T x, T b)
{
 node<T> * p, * q;
 p = new node < T>;
 p -> d = b;
 if (head == NULL)
 if (head = p; p -> next = NULL; return;
 if (head -> d == x)
 if (p -> next = head; head = p; return;
 q = head;
 while ((q -> next != NULL) && ((q -> next) -> d) != x)
 if (q -> next)
 if (q -> next = q -> next; q -> next = p;
 return;
 }

// 删除包含元素 x 的结点元素

template<class T>
int linked_List<T>:::del_linked_List(T x)
{
 node < T > * p, * q;
 if (head == NULL) return (0);
 if ((head -> d) == x)
 if (p = head -> next; delete head; head = p; return (1);
 q = head;
 while ((q -> next != NULL) && ((q -> next) -> d) != x)
 if (q -> next)
 if (q -> next == NULL) return (0);
 p = q -> next; q -> next = p -> next;
}

delete p; //释放结点 p 的存储空间
return(1);
}

下面举例说明。

例 2.10 建立一个空线性链表，依次做如下操作。

（1）第1次扫描输出链表s中的元素。

（2）依次做下列插入操作：

（4）在线性链表中依次删除元素30与50。

（3）第2次扫描输出链表s中的元素。

（5）第3次扫描输出链表s中的元素。

主函数如下：

//ch2_15.cpp
#include "linked_List.h"
int main()
{
 linked_List<int> s;
 cout<<"第1次扫描输出链表s中的元素:"<<endl;
 s.prt_linked_List();
 s.ins_linked_List(10,10); //在包含元素10的结点前插入新元素10
 s.ins_linked_List(10,20); //在包含元素10的结点前插入新元素20
 s.ins_linked_List(10,30); //在包含元素10的结点前插入新元素30
 s.ins_linked_List(40,40); //在包含元素40的结点前插入新元素40
 cout<<"第2次扫描输出链表s中的元素:"<<endl;
 s.prt_linked_List();
 if (s.del_linked_List(30))
 cout<<"删除元素:30"<<endl;
 else
 cout<<"链表中无元素:30"<<endl;
 if (s.del_linked_List(50))
 cout<<"删除元素:50"<<endl;
 else
 cout<<"链表中无元素:50"<<endl;
 cout<<"第3次扫描输出链表s中的元素:"<<endl;
 s.prt_linked_List();
 return 0;
}

上述程序的运行结果如下：

第1次扫描输出链表 s 中的元素：
空链表!
第2次扫描输出链表 s 中的元素：
20
30
10

40

删除元素：30

链表中无元素：50

第3次扫描输出链表s中的元素：

20

10

40

## 1. 带链的栈

栈也是线性表，也可以采用链式存储结构。图2.24是栈在链式存储时的逻辑状态示意图。

<div style="text-align: center;"><div style="text-align: center;">图 2.24 带链的栈</div> </div>

在实际应用中，带链的栈可以用来收集计算机存储空间中所有空闲的存储结点，这种带链的栈称为可利用栈。由于可利用栈链接了计算机存储空间中所有的空闲结点，因此，当计算机系统或用户程序需要存储结点时，就可以从中取出栈顶结点，如图2.25(a)所示；当计算机系统或用户程序释放一个存储结点（该元素从表中删除）时，就要将该结点放回到可利用栈的栈顶，如图2.25(b)所示。由此可知，计算机中的所有可利用空间都可以以结点为单位链接在可利用栈中。随着其他线性链表中结点的插入与删除，可利用栈处于动态变化之中，即可利用栈经常要进行退栈与入栈操作。

<div style="text-align: center;"><div style="text-align: center;">(b) 将结点 p 送回可利用栈</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.25 可利用栈及其运算</div> </div>

与顺序栈一样，带链栈的基本操作有以下几个：

（1）栈的初始化，即建立一个空栈的顺序存储空间。

（2）入栈运算，指在栈顶位置插入一个新元素。

（3）退栈运算，指取出栈顶元素并赋给一个指定的变量。

（4）读栈顶元素，指将栈顶元素赋给一个指定的变量。

下面的描述是将带链栈的数据和基本操作（初始化，入栈，退栈，读栈顶元素以及顺序输出栈中元素）封装成一个带链栈类 linked_Stack。

using namespace std;
template<class T>
struct node
{
 T d;
 node *next;
};
//定义带链栈类
template<class T>
class linked_Stack
{
 private:
 node<T>* top;
 public:
 linked_Stack();
 void prt_linked_Stack();
 int flag_linked_Stack();
 void ins_linked_Stack(T);
 T del_linked_Stack();
 T read_linked_Stack();
};
//带链栈类型
//模板声明，数据元素虚拟类型为T
//带链栈类
//数据成员
//带链栈栈顶指针
//成员函数
//构造函数，建立空栈，即栈初始化
//顺序输出带链栈中的元素
//检测带链栈的状态
//入栈
//退栈
//读栈顶元素

//带链栈初始化
template<class T>
linked_Stack<T>::linked_Stack()
{
 top=NULL;
 return;
}
//顺序输出栈中的元素
template<class T>
void linked_Stack<T>::prt_linked_Stack()
{
 node<T>* p;
 p=top;
 if (p==NULL) {
 cout<<空栈 !<<endl;
 return;
 }
 do {
 cout<<p->d<<endl;
 p=p->next;
 }
 while (p!=NULL);
 return;
}
//检测带链栈的状态
template<class T>
int linked_Stack<T>::flag_linked_Stack()
{
 if (top==0) return(0);
 return(1);
}
//入栈
template<class T>
void linked_Stack<T>::ins_linked_Stack(T x)
{
 node<T>* p;
 p=new node<T>;
 p->d=x;
 p->next=top;
 top=p;
 return;
}
//退栈
//栈顶指针指向新节点

template<class T>
T linked_Stack<T>::del_linked_Stack()
{
 T y;
 node<T> * q;
 if (top == NULL) {
 cout << "空栈!" << endl;
 return (0);
 }
 q = top;
 y = q->d;
 top = q->next;
 delete q;
 return (y);
}
//栈顶元素赋给变量
//栈顶指针指向下一个结点
//释放结点空间
//返回退栈的元素

//读栈顶元素
template<class T>
T linked_Stack<T>::read_linked_Stack()
{
 if (top == NULL) {
 cout << "空栈!" << endl;
 return (0);
 }
 return (top->d);
}

其中，成员函数 flag_linked_Stack() 的功能是检测带链栈的状态，若返回的函数值为 0，则说明栈空。该成员函数主要在读栈顶元素与退栈时使用。

下面是使用带链栈类的主函数的例子。

例 2.11 首先建立一个空的带链栈，然后依次将元素 50、60、70、80、90、100 入栈，输出栈中的元素，最后读栈顶元素，并连续作 3 次退栈运算，再输出栈中的元素。主函数如下：

//ch2_16.cpp
#include "linked_Stack.h"
int main()
{
 linked_Stack<int>s;
 ins_linked_Stack(50);
 ins_linked_Stack(60);
 ins_linked_Stack(70);
 ins_linked_Stack(80);
 ins_linked_Stack(90);
 ins_linked_Stack(100);
 cout<<"输出栈中的元素:"<<endl;
 s.prt_linked_Stack();
 if (s.flag_linked_Stack()) //若栈非空则读栈顶元素
 cout<<"栈顶元素:"<<s.read_linked_Stack()<<endl;
 if (s.flag_linked_Stack()) //若栈非空则退栈
 cout<<"退栈元素:"<<s.del_linked_Stack()<<endl;
 if (s.flag_linked_Stack()) //若栈非空则退栈
 cout<<"退栈元素:"<<s.del_linked_Stack()<<endl;
 cout<<"再次输出栈中的元素:"<<endl;
 s.prt_linked_Stack();
 return 0;
}

上述程序的运行结果如下：

输出栈中的元素：

100

90

80

70

60

50

栈顶元素：100

退栈元素：100

退栈元素：90

退栈元素：80

再次输出栈中的元素：

70

60

50

## 2. 带链的队列

与栈类似，队列也是线性表，也可以采用链式存储结构。图2.26是队列在链式存储时的逻辑状态示意图。

与顺序队列一样，带链队列的基本操作有以下几个：

（1）队列的初始化，即建立一个空队列的顺序存储空间。

（2）入队运算，指在循环队列的队尾加入一个新元素。

（3）退队运算，指在循环队列的排头位置退出一个元素并赋给指定的变量。

<div style="text-align: center;"><div style="text-align: center;">(a) 带链的队列</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 在带链的队列中插入一个新结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 在带链的队列中删除一个结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.26 带链的队列及其运算</div> </div>

下面的描述是将带链队列的数据和基本操作(初始化，入队，退队顺序输出队列中元素)封装成一个带链队列类 $ \underline{\text{linked_Queue}} $。

//linked_Queue.h
#include<iostream>
using namespace std;
//定义结点类型

template<class T> //T为虚拟类型
struct node
{
 T d;
 node *next;
};
//定义带链队列类
template<class T> {
 class linked_Queue
 { private:
 node<T>* front;
 node<T>* rear;
 public:
 linked_Queue();
 void prt_linked_Queue();
 int flag_linked_Queue();
 void ins_linked_Queue(T);
 T del_linked_Queue();
 };
 //带链队列
 {
 //成员函数
 //构造函数，建立空队列，即队列初始化
 //顺序输出带链队列中的元素
 //检测带链队列的状态
 //入队
 //退队
 }
 //带链队列初始化
 template<class T> {
 linked_Queue<T>::linked_Queue()
 { front=NULL; rear=NULL;
 return;
 }
 //顺序输出队列中的元素
 template<class T> {
 void linked_Queue<T>::prt_linked_Queue()
 { node<T>* p;
 p=front;
 if (p==NULL) {
 cout<<空队列!!"<<endl;
 }
 do {
 cout<<p->d<<endl;
 }
 p=p->next;
 } while (p!=NULL);
 return;
 }
 //检测带链队列的状态
 template<class T> {
 int linked_Queue<T>::flag_linked_Queue()
 { if (front==NULL) return(0); //若带链的队列为空，则函数返回0
 return(1);
 }
 //入队
 template<class T> {
 void linked_Queue<T>::ins_linked_Queue(T x)
 { node<T>* p;
 p=new node<T>;
 p->d=x;
 p->next=NULL;
 if (rear==NULL) {
 front=p;
 }
 else
 {
 rear->next=p;
 }
 rear=p;
 }
}

return;
}
//退队
template<class T>
{
 T linked_Queue<T>::del_linked_Queue()
 {
 T y;
 node<T> * q;
 if (front==NULL) {
 cout << "空队!" << endl;
 } return(0);
 y = front->d;
 q = front;
 front = q->next;
 delete q;
 if (front==NULL) rear = NULL;
 return(y);
 }
}

其中，成员函数 flag_linked_Queue()的功能是检测带链队列的状态。若返回的函数值为 0，则说明队空。该成员函数主要在退队时使用。

下面是使用带链队列类的主函数的例子。

例 2.12 首先建立一个空的带链队列，然后依次将元素 50、60、70、80、90、100 入队，输出队中的元素，最后连续进行 3 次退队运算，再输出队中的元素。主函数如下：

//ch2_17.cpp
#include "linked_Queue.h"
int main()
{
 linked_Queue<int>q;
 q.ins_linked_Queue(50);
 q.ins_linked_Queue(60);
 q.ins_linked_Queue(70);
 q.ins_linked_Queue(80);
 q.ins_linked_Queue(90);
 q.ins_linked_Queue(100);
 cout<<"输出带链队列中的元素:"<<endl;
 q.prt_linked_Queue();
 if (q.flag_linked_Queue())
 cout<<"输出退队元素:"<<q.del_linked_Queue()<<endl;
 if (q.flag_linked_Queue())
 cout<<"输出退队元素:"<<q.del_linked_Queue()<<endl;
 q.prt_linked_Queue();
 q.prt_linked_Queue();
 return 0;
}

上述程序的运行结果如下：

输出带链队列中的元素：

80
90
100
输出退队元素：50
输出退队元素：60
输出退队元素：70
再次输出带链队列中的元素：
80
90
100

### 2.3.4 循环链表

在前面所讨论的线性链表中，插入与删除的运算虽然比较方便，但还存在一个问题，即在运算过程中对于空表与第一个结点的处理必须单独考虑，会使空表与非空表的运算不统一。为了克服线性链表的这个缺点，可以采用另一种链接方式，即循环链表（Circular Linked List）的结构。

循环链表的结构与前面所讨论的线性链表相比，具有以下两个特点：

（1）在循环链表中增加了一个表头结点，其数据域为任意或者根据需要来设置，指针域指向线性表第一个元素的结点。循环链表的头指针指向表头结点。

（2）循环链表中最后一个结点的指针域不为空，而是指向表头结点，即在循环链表中，所有结点的指针构成了一个环状链。

图2.27是循环链表的示意图。其中，图2.27(a)是一个非空的循环链表，图2.27(b)是一个空的循环链表。在此，所谓的空表与非空表是针对线性表中的元素而言的。

<div style="text-align: center;"><div style="text-align: center;">(b) 空循环链表</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.27 循环链表的逻辑状态</div> </div>

在实际应用中，循环链表与线性单链表相比主要有以下两方面的优点：

（1）在循环链表中，只要指出表中任何一个结点的位置，就可以从它出发访问表中其他所有的结点，而线性单链表做不到这一点。

（2）由于在循环链表中设置了一个表头结点，因此，在任何情况下，循环链表中至少有一个结点存在，从而使空表与非空表的运算统一。

下面描述的是循环链表类。

//linked_Clist.h
#include<iostream>

using namespace std;
//定义结点类型
template<class T>
struct node
{
 T d;
 node *next;
};
//定义循环链表类
template<class T>
class linked_CList
{
 private:
 node<T>* head;
 public:
 linked_CList();
 void prt_linked_CList();
 void ins_linked_CList(T, T);
 int del_linked_CList(T);
};

//成员函数
//构造函数，建立空循环链表
//扫描输出循环链表中的元素
//在包含元素 x 的结点前插入新元素 b
//删除包含元素 x 的结点

template<class T>
linked_CList<T>:::linked_CList()
{
 node<T>* p;
 p=new node<T>;
 p->d=0; p->next=p;
 head=p;
 return;
}

//扫描输出循环链表中的元素
template<class T>
void linked_CList<T>:::prt_linked_CList()
{
 node<T>* p;
 p=head->next;
 if (p==head) {
 cout<<空循环链表!<<endl;
 }
 do {
 cout<<p->d<<endl;
 p=p->next;
 }
 while (p!=head);
 return;
}

//在包含元素 x 的结点前插入新元素 b

template<class T>
void linked_CList<T>:::ins_linked_CList(T x, T b)
{
 node<T>* p, *q;
 p=new node<T>;
 p->d=b;
 q=head;
 while ((q->next!=head)&&((q->next)->d)!=x))
 q=q->next;
 p->next=q->next; q->next=p; //新结点 p 插入结点 q 之后
 return;
}

//删除包含元素 x 的结点元素

template<class T>
int linked_CList<T>:::del_linked_CList(T x)

{
 node<T>* p, *q;
 q=head;
 while ((q->next!=head)&&((((q->next)->d)!=x))
 q=q->next;
 if (q->next==head) return(0);
 p=q->next; q->next=p->next;
 delete p;
 return(1);
}

由上述算法描述可以看出，循环链表的插入与删除运算要比一般的单链表简单，不用考虑在空链表和在第一个结点前插入，以及空链表的删除等特殊情况，从而实现了空表与非空表的运算统一。

下面举例说明。

例 2.13 建立一个空循环链表 s，依次做如下操作。

（1）第1次扫描输出循环链表s中的元素。

（2）依次做下列插入操作：

在包含元素 10 的结点前插入新元素 10；
在包含元素 10 的结点前插入新元素 20；
在包含元素 10 的结点前插入新元素 30；
在包含元素 40 的结点前插入新元素 40。

（3）第2次扫描输出循环链表s中的元素。

（4）在循环链表中依次删除元素 30 与 50。

（5）第3次扫描输出循环链表s中的元素。

主函数如下：

//ch2_18.cpp
#include "linked_Clist.h"
int main()
{
 linked_CList<int> s;
 cout<<"第1次扫描输出循环链表 s 中的元素: "<<endl;
 s.prt_linked_CList();
 s.ins_linked_CList(10,10); //在包含元素 10 的结点前插入新元素 10
 s.ins_linked_CList(10,20); //在包含元素 10 的结点前插入新元素 20
 s.ins_linked_CList(10,30); //在包含元素 10 的结点前插入新元素 30
 s.ins_linked_CList(40,40); //在包含元素 40 的结点前插入新元素 40
 cout<<"第2次扫描输出循环链表 s 中的元素: "<<endl;
 s.prt_linked_CList();
 if (s.del_linked_CList(30))
 cout<<"删除元素: 30"<<endl;
 else
 cout<<"循环链表中无元素: 30"<<endl;
 if (s.del_linked_CList(50))
 cout<<"删除元素: 50"<<endl;
 else
 cout<<"循环链表中无元素: 50"<<endl;
 cout<<"第3次扫描输出循环链表 s 中的元素: "<<endl;
}

s.prt_linked_CList();
return 0;
}

上述程序的运行结果如下：

第1次扫描输出循环链表 s 中的元素：
空循环链表！
第2次扫描输出循环链表 s 中的元素：
20
30
10
40
删除元素：30
循环链表中无元素：50
第3次扫描输出循环链表 s 中的元素：
20
10
40

#### 2.3.5 多项式的表示与运算

在许多实际应用中，经常会遇到多项式的处理与运算问题。下面通过对多项式的表示和运算的讨论，说明链表在实际中的应用，从而进一步理解链表的基本概念。

设多项式为

 $$ P_{n}(x)=a_{n}x^{n}+a_{n-1}x^{n-1}+\cdots+a_{1}x+a_{0} $$

n 次多项式共有  $ n+1 $ 项。在计算机中表示这个多项式时，可以用一块连续的存储空间（例如，在程序设计语言中可以用一维数组）来依次存放这  $ n+1 $ 个系数  $ a_{i}(i=0,1,2,\cdots,n) $。显然，在这种表示方式中，即使某次项的系数为 0，该系数也必须要存储。当多项式中存在大量零系数时，这种表示方式就显得太浪费存储空间了。为了有效而合理地利用存储空间，可以用链表形式来表示。

在采用链表表示多项式时，多项式中每一个非零系数的项构成链表中的一个结点，而对于系数为零的项不用表示。多项式中非零系数项所构成的结点如图2.28所示。其中，数据域有两项： $ \text{EXP}(i) $表示该项的指数值， $ \text{COEF}(i) $表示该项的系数。指针域 $ \text{NEXT}(i) $表示下一个非零系数项的结点序号。

<div style="text-align: center;"><div style="text-align: center;">图 2.28 多项式非零系数项的结点结构</div> </div>

多项式链表中的每一个非零项结点结构用 C++ 描述如下：

struct node  //定义结点类型
{ int exp;  //指数为正整数
double coef;  //系数为双精度型
node *next;  //指针域
};

在用链表表示多项式时，多项式中各非零系数项所对应的结点按指数域降幂链接，并且

可以链接成线性单链表的形式，也可以链接成循环链表的形式。

设只表示非零系数项的多项式为

 $$ P_{m}(x)=a_{m}x^{e_{m}}+a_{m-1}x^{e_{m-1}}+\cdots+a_{1}x^{e_{1}} $$

其中  $ a_{k} \neq 0 (k = 1, 2, \cdots, m) $,  $ e_{m} > e_{m-1} > \cdots > e_{1} \geqslant 0 $。

若用线性单链表表示，其逻辑状态如图2.29(a)所示。若用循环链表表示，其逻辑状态如图2.29(b)所示。在用循环链表表示时，其表头结点中的指数域为-1，系数域为任意。由于多项式中的指数不可能为负数，因此这种设置便于处理，很容易将表头结点与其他结点区分开。

<div style="text-align: center;"><div style="text-align: center;">(a) 多项式的线性单链表表示</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 多项式的循环链表表示</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.29 多项式的链式结构</div> </div>

多项式的运算主要有以下5种：

（1）多项式链表的生成；

（2）多项式链表的释放；

（3）多项式的输出；

（4）多项式的相加；

（5）多项式的相乘。

下面描述的是以循环链表表示的包括上述各运算的多项式类。

//Poly.h
#include<iostream>
using namespace std;
//定义结点类型
struct node
{
 int exp;
 double coef;
 node *next;
};
//多项式循环链表类
class Poly
{
 private:
 node *head;
 public:
 Poly();
 void in1_Poly();
 void in2_Poly(int, int[], double[]);
 void del_Poly();
 void prt_Poly();
 Poly operator +(Poly&(); //多项式相加
 Poly operator *(Poly&(); //多项式相乘
}

// 构造函数，建立空多项式链表
Poly::Poly()
{
 { node *p;
 p = new node;
 p -> exp = -1;
 p -> next = p;
 head = p;
 return;
}
// 键盘输入多项式链表
void Poly::in1_Poly()
{
 { node *p, *k;
 int e;
 double c;
 k = head;
 cout << "输入:系数<空格>指数。输入指数-1结束!" << endl;
 cin >> c >> e;
 while (e >= 0)
 { p = new node;
 p -> exp = e; p -> coef = c;
 p -> next = head;
 k -> next = p;
 k = p;
 cin >> c >> e;
 }
 return;
}
// 由数组复制多项式链表
void Poly::in2_Poly(int n, int e[], double c[])
{
 int k;
 node *p;
 for (k = n - 1; k >= 0; k--)
 { p = new node;
 p -> coef = c[k]; p -> exp = e[k];
 p -> next = head -> next;
 head -> next = p;
 }
 return;
}
// 释放多项式链表
void Poly::del_Poly()
{
 node *p, *q;
 q = head -> next;
 while (q != head)
 { p = q -> next; delete q; q = p; }
 q -> next = head;
 return;
}
// 输出多项式链表
void Poly::prt_Poly()
{
 if (head -> next == head)
 {
 // 申请一个表头结点
 // 指数域值为-1
 // 指针域指向表头结点自身
 // 头指针也指向表头结点
 }
}

cout<<"空表"<<endl;
k=head->next;
while (k!=head)
{
 cout<<"(<<k->coef<<", "<<k->exp<<") <<endl;
 k=k->next;
}
return;
}
//多项式相加
Poly Poly::operator + (Poly &p2)
{
 Poly p;
 node * k, * q, * m, * n;
 int e;
 double c;
 k=p.head;
 m=head->next;
 n=p2.head->next;
 while ((m->exp!=1)||(n->exp!=1))
 {
 if (m->exp==n->exp)
 {
 c=m->coef+n->coef;
 e=m->exp;
 m=m->next;
 }
 else if (m->exp>n->exp)
 {
 c=m->coef;
 m=m->next;
 }
 else
 {
 c=n->coef;
 n=n->next;
 }
 if (c!=0)
 {
 q=new node;
 q->exp=e;
 q->coef=c;
 q->next=p.head;
 k=q;
 }
 }
 return(p);
}
//记住和多项式链尾
//两个链表当前结点的指数相等
//系数相加
//复抄指数
//复抄链表1中的系数与指数值
//相加后系数不为0
//申请一个新结点
//记住和多项式的链尾
//多项式相乘
Poly Poly::operator * (Poly &p2)
{
 Poly p, p1, p3;
 node * q, * k, * m, * n;
 m=head->next;
 while (m->exp!=1)
 {
 p3=p;
 k=p1.head;
 n=p2.head->next;
 while (n->exp!=1)
 {
 q=new node;
 q->exp=m->exp+n->exp;
 q->coef=(m->coef)*(n->coef);
 }
 }
 }
}

q->next=p1.head; //新结点链到临时多项式 p1 链尾
k->next=q;
n=n->next;
k=q;
}
p=p3+p1; //累加
p1.del_Poly(); //释放临时多项式 p1
p3.del_Poly(); //释放临时多项式 p3
m=m->next;
}
return(p);

下面分别对以上各成员函数进行简单说明。

## 1. 多项式链表的生成

生成一个多项式链表有以下两种方法。

### 1）从键盘输入多项式链表

按降幂顺序以数偶形式依次输入多项式中非零系数项的指数  $ e_{k} $ 和系数  $ a_{k}(k=m,m-1,\cdots,1) $，最后以输入指数值 -1 为结束。对于每一次输入，申请一个新结点，填入输入的指数值与系数值后，将该结点链接到链表的末尾。

#### 2）由数组复制多项式链表

在调用程序中，利用数组初始化提供多项式链表的系数和指数。多项式的系数和指数按降幂顺序分别放在两个一维数组中，利用成员函数将数组中系数和指数复制到多项式链表中。

## 2. 多项式链表的释放

从表头结点开始，逐步释放链表中的各结点。但必须注意，多项式链表的释放只是删除多项式链表中的元素结点，而不删除表头结点，即经过这个操作过程后，多项式链表变成一个空的循环链表。

## 3. 多项式的输出

从表头结点后的第一个结点开始，以数偶形式顺链输出各结点中的指数域与系数域的内容。

## 4. 多项式的相加

设两个多项式分别为  $ A_{m}(x) $ 与  $ B_{n}(x) $，且

 $$ \mathrm{A}_{m}(x)=a_{m}x^{e_{m}}+a_{m-1}x^{e_{m-1}}+\cdots+a_{1}x^{e_{1}} $$

 $$ B_{n}(x)=b_{n}x^{e_{n}^{^{\prime}}}+b_{n-1}x^{e_{n-1}^{^{\prime}}}+\cdots+b_{1}x^{e_{1}^{^{\prime}}} $$

其中  $ a_{i} \neq 0 (i = 1, 2, \cdots, m) $,  $ b_{j} \neq 0 (j = 1, 2, \cdots, n) $，且

 $$ e_{m}>e_{m-1}>\cdots>e_{1}\geqslant0,\quad e_{n}^{\prime}>e_{n-1}^{\prime}>\cdots>e_{1}^{\prime}\geqslant0 $$

现在要求它们的和多项式  $ C(x) $，即求

 $$ C(x)=A_{m}(x)+B_{n}(x) $$

假设多项式  $ A_{m}(x) $ 与  $ B_{n}(x) $ 已经用循环链表表示，其头指针分别为 AH 与 BH；和多项式  $ C(x) $ 用另一个循环链表表示，其头指针为 CH。多项式相加的运算规则很简单，只要从两个多项式链表的第一个元素结点开始检测，对每一次的检测结果做如下运算：

（1）若两个多项式中对应结点的指数值相等，则将它们的系数值相加。如果相加结果

不为零，则形成一个新结点后链入头指针为 CH 的链表末尾，然后检测两个链表中的下一个结点。

（2）若两个多项式中对应结点的指数值不相等，则复抄指数值大的那个结点中的指数值与系数值，形成一个新结点后链入头指针为 CH 的链表末尾，然后检测指数值小的链表中的当前结点与指数值大的链表中的下一个结点。

上述过程一直做到两个链表中的所有结点均检测完为止。

## 5. 多项式的相乘

设两个多项式分别为  $ A\boldsymbol{m}(x) $ 与  $ B\boldsymbol{n}(x) $，且

 $$ \begin{array}{l}A_{m}(x)=a_{m}x^{e_{m}}+a_{m-1}x^{e_{m-1}}+\cdots+a_{1}x^{e_{1}}\\ B_{n}(x)=b_{n}x^{e_{n}^{^{\prime}}}+b_{n-1}x^{e_{n-1}^{^{\prime}}}+\cdots+b_{1}x^{e_{1}^{^{\prime}}}\end{array} $$

其中  $ a_{i} \neq 0 (i = 1, 2, \cdots, m) $,  $ b_{j} \neq 0 (j = 1, 2, \cdots, n) $，且

 $$ e_{m}>e_{m-1}>\cdots>e_{1}\geqslant0,\quad e_{n}^{\prime}>e_{n-1}^{\prime}>\cdots>e_{1}^{\prime}\geqslant0 $$

现在要求它们的乘积多项式  $ C(x) $，即求

 $$ C\left(x\right)=A_{m}\left(x\right)B_{n}\left(x\right) $$

假设多项式  $ A_{m}(x) $ 与  $ B_{n}(x) $ 已经用循环链表表示，其头指针分别为 AH 与 BH；乘积多项式  $ C(x) $ 用另一个循环链表表示，其头指针为 CH。

多项式相乘的基本方法如下：

对于多项式  $ A_{m}(x) $ 中每一项与多项式  $ B_{n}(x) $ 相乘，且将结果逐步累加，即

 $$ C(x)=\sum_{i=1}^{m}\sum_{j=1}^{n}a_{i}b_{j}x^{(e_{i}+e_{j}^{^{\prime}})} $$

下面举例说明多项式链表的运算。

 $$ \begin{aligned}&P_{1}(x)=3x^{10}+4x^{8}-5x^{5}+2x^{4}-3x+10\\&P_{2}(x)=4x^{14}+3x^{8}-7x^{6}-2x^{4}+5x-6\\ \end{aligned} $$

按下列步骤对多项式链表进行操作：

（1）从键盘分别输入多项式 $ P_{1}(x) $与 $ P_{2}(x) $，然后分别输出这两个多项式。

（2）求 $ P_{1}(x) $与 $ P_{2}(x) $的和多项式，然后输出这个和多项式。

（3）求 $ P_{1}(x) $与 $ P_{2}(x) $的乘积多项式，然后输出这个乘积多项式。

（4）分别释放多项式  $ P_{1}(x) $ 与  $ P_{2}(x) $，然后分别输出这两个多项式。

//ch2_19.cpp
#include "Poly.h"
int main()
{
 Poly p1, p2, add_p, mul_p;
 int pe1[6]={10, 8, 5, 4, 1, 0};
 double pc1[6]={3.0, 4.0, -5.0, 2.0, -3.0, 10.0};
 int pe2[6]={14, 8, 6, 4, 1, 0};
 double pc2[6]={4.0, 3.0, -7.0, -2.0, 5.0, -6.0};
 p1.in2_Poly(6, pe1, pc1);
 p2.in2_Poly(6, pe2, pc2);
 //键盘输入多项式p1的系数和指数
}

p2.in1_Poly(); //键盘输入多项式p2的系数和

cout<<"输出多项式p1:"<<endl;

p1.prt_Poly();

cout<<"输出多项式p2:"<<endl;

p2.prt_Poly();

add_p=p1+p2; //多项式p1与多项式p2相加

cout<<"输出多项式p=p1+p2:"<<endl;

add_p.prt_Poly();

mul_p=p1*p2; //多项式p1与多项式p2相乘

cout<<"输出多项式p=p1*p2:"<<endl;

mul_p.prt_Poly();

p1.del_Poly(); //释放多项式p1

cout<<"输出多项式p1:"<<endl;

p1.prt_Poly();

p2.del_Poly(); //释放多项式p1

cout<<"输出多项式p2:"<<endl;

p2.prt_Poly();

return 0;

}

输出多项式p1:

(3,10)

(4,8)

(-5,5)

(2,4)

(-3,1)

(10,0)

输出多项式p2:

(4,14)

(3,8)

(-7,6)

(-2,4)

(5,1)

(-6,0)

输出多项式p=p1+p2:

(4,14)

(3,10)

(7,8)

(-7,6)

(-5,5)

(2,1)

(4,0)

输出多项式p=p1*p2:

(12,24)

(16,22)

(-20,19)

…(略)

(-15,2)

(68,1)

(-60,0)

输出多项式p1:

空表

输出多项式p2:

空表

### 2.4.1 索引存储的概念

索引存储结构是线性表的另一种存储方式。

索引存储的基本思想是：将具有 n 个结点的线性表按性质划分成 m 个子表（长度可以不等），然后分别存储此 m 个子表。另外再设立一个索引表。索引表具有 m 个结点，每一个结点存储一个子表性质的有关信息以及子表中第一个结点的存储地址。索引表中的结点结构（如数据项个数）可以根据实际应用的需要来设置，但同一个索引表中的各结点的结构应相同。

由此可以看出，为了实现索引存储，需要解决以下两个问题：

（1）如何划分线性表。

（2）确定具体的索引方式。

## 1. 线性表的划分

设线性表为  $ L=(a_{1},a_{2},\cdots,a_{n}) $，其中每一个结点元素  $ a_{i}(i=1,2,\cdots,n) $ 的关键字为  $ k_{i} $。

在对线性表进行划分时，为了描述线性表中各结点的性质，引入所谓索引函数的概念，即

 $$ j=g(k_{i}),\quad i=1,2,\cdots,n;j=1,2,\cdots,m $$

有了索引函数后，将线性表 L 划分成 m 个子表  $ L_{1}, L_{2}, \cdots, L_{m} $ 的基本方法是：对线性表 L 中的每个结点元素  $ a_{i} $ 的关键字  $ k_{i} $ 计算其索引函数值，将所有索引函数值为 j 的结点元素均归并到第 j 个子表  $ L_{j} $ 中。经过划分后，m 个子表  $ L_{1}, L_{2}, \cdots, L_{m} $ 中的结点结合在一起正好是线性表 L 中的全部结点。在实际处理时，就用此 m 个子表代替线性表 L 本身。

例 2.15 设有一个学生成绩表如表 2.2 所示。如果以成绩（总分）为关键字对这个学生成绩表进行划分，并且以分数段 240～249、250～259、260～269、270～279、280～289、290～299、300 将此线性表划分成 7 个子表  $ L_{1} $、 $ L_{2} $、 $ L_{3} $、 $ L_{4} $、 $ L_{5} $、 $ L_{6} $、 $ L_{7} $，则可取索引函数为

 $$ g\left(k\right)=INT\left(k/10\right)-23 $$

经过划分后，除了 $ L_{5} $、 $ L_{6} $、 $ L_{7} $为空表外，其余4个子表如表2.3所示。

<div style="text-align: center;"><div style="text-align: center;">表2.2 学生成绩表</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>学号 S</td><td style='text-align: center; word-wrap: break-word;'>02</td><td style='text-align: center; word-wrap: break-word;'>03</td><td style='text-align: center; word-wrap: break-word;'>04</td><td style='text-align: center; word-wrap: break-word;'>05</td><td style='text-align: center; word-wrap: break-word;'>09</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>13</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>姓名 NS</td><td style='text-align: center; word-wrap: break-word;'>LIN</td><td style='text-align: center; word-wrap: break-word;'>ZHANG</td><td style='text-align: center; word-wrap: break-word;'>ZHAO</td><td style='text-align: center; word-wrap: break-word;'>MA</td><td style='text-align: center; word-wrap: break-word;'>ZHEN</td><td style='text-align: center; word-wrap: break-word;'>WANG</td><td style='text-align: center; word-wrap: break-word;'>LI</td><td style='text-align: center; word-wrap: break-word;'>XU</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>总分 k</td><td style='text-align: center; word-wrap: break-word;'>276</td><td style='text-align: center; word-wrap: break-word;'>261</td><td style='text-align: center; word-wrap: break-word;'>246</td><td style='text-align: center; word-wrap: break-word;'>273</td><td style='text-align: center; word-wrap: break-word;'>255</td><td style='text-align: center; word-wrap: break-word;'>243</td><td style='text-align: center; word-wrap: break-word;'>258</td><td style='text-align: center; word-wrap: break-word;'>249</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">表2.3 各分数段的子表</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="4">子表  $ L_{{1}} $</td><td colspan="3">子表  $ L_{{2}} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>学号 S</td><td style='text-align: center; word-wrap: break-word;'>04</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>学号 S</td><td style='text-align: center; word-wrap: break-word;'>09</td><td style='text-align: center; word-wrap: break-word;'>12</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>姓名 N</td><td style='text-align: center; word-wrap: break-word;'>ZHAO</td><td style='text-align: center; word-wrap: break-word;'>WANG</td><td style='text-align: center; word-wrap: break-word;'>XU</td><td style='text-align: center; word-wrap: break-word;'>姓名 N</td><td style='text-align: center; word-wrap: break-word;'>ZHEN</td><td style='text-align: center; word-wrap: break-word;'>LI</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>总分 k</td><td style='text-align: center; word-wrap: break-word;'>246</td><td style='text-align: center; word-wrap: break-word;'>243</td><td style='text-align: center; word-wrap: break-word;'>249</td><td style='text-align: center; word-wrap: break-word;'>总分 k</td><td style='text-align: center; word-wrap: break-word;'>255</td><td style='text-align: center; word-wrap: break-word;'>258</td></tr></table>

续表

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="2">子表  $ L_{{3}} $</td><td colspan="3">子表  $ L_{{4}} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>学号 S</td><td style='text-align: center; word-wrap: break-word;'>03</td><td style='text-align: center; word-wrap: break-word;'>学号 S</td><td style='text-align: center; word-wrap: break-word;'>02</td><td style='text-align: center; word-wrap: break-word;'>05</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>姓名 N</td><td style='text-align: center; word-wrap: break-word;'>ZHANG</td><td style='text-align: center; word-wrap: break-word;'>姓名 N</td><td style='text-align: center; word-wrap: break-word;'>LIN</td><td style='text-align: center; word-wrap: break-word;'>MA</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>总分 k</td><td style='text-align: center; word-wrap: break-word;'>261</td><td style='text-align: center; word-wrap: break-word;'>总分 k</td><td style='text-align: center; word-wrap: break-word;'>276</td><td style='text-align: center; word-wrap: break-word;'>273</td></tr></table>

由表2.3可以看出，由于索引存储将具有某个性质P的结点都集中在一个子表中，因此，处理（如查找）具有性质P的结点，不必查遍原线性表L中的全部结点，而只需要直接对具有性质P的子表进行处理就可以了。例如，在例2.15中，如果要查找成绩段为240～249的学生，只要直接查找子表 $ L_{1} $就可以了。可见，采用索引存储以后，有利于对线性表的处理，可以提高查找效率。

## 2. 索引存储的方式

索引存储包括索引表的存储与各个子表的存储。如果采用顺序分配与链式分配的存储结构，则共有以下4种索引存储的方式：

“顺序-索引-顺序”存储方式：

“顺序-索引-链接”存储方式：

“链接-索引-顺序”存储方式：

“链接-索引-链接”存储方式。

在此，所谓“A-索引-B”存储方式，是指用存储结构A方式存储索引表，用存储结构B方式存储各子表。

考虑到实际应用的需要，下面主要讨论前两种索引存储方式。其中，“顺序-索引-链接”存储方式是顺序存储与链接存储的折中，在实际应用中往往采用这种方式，这是因为在“顺序-索引-链接”存储方式中，由于各子表采用链式分配，从而使得在添加（插入）和删除一个结点时不必在大范围内重新分配存储空间（不存在数据元素的移动），并且在查找某个结点时不必搜索整个线性表，而只要搜索相应的子表就可以了。

### 2.4.2 “顺序-索引-顺序”存储方式

在“顺序-索引-顺序”存储方式中，索引表与各子表均用顺序分配的方式来表示。

索引表中的每一个结点均设有若干个数据项，用来表示相应子表的有关信息；另外，每个结点中还设有一个指针项，用来指示相应子表的第一个结点的存储序号（存储地址）。在这种存储方式中，每一个子表都是顺序分配的，但各个子表在存储空间中的前后位置无关紧要，并且各子表之间的存储地址也不一定是连续的。

图2.30是例2.15中学生成绩表的“顺序-索引-顺序”存储结构的物理状态。索引表中的每一个结点有两个数据项。其中，第一列的数据表示子表的性质（分数段）。例如，250表示250～259这个分数段；第二列的数据表示子表的长度；第三列为索引指针。在各子表的存储空间中，由于各子表的实际存储位置（子表中第一个结点的存储位置）是由索引表中的索引指针来指示的，因此，各子表的存储顺序可以任意，且各子表之间也是不连续的。

<div style="text-align: center;"><div style="text-align: center;">图 2.30 “顺序-索引-顺序”存储方式示例</div> </div>

需要指出的是，各子表的关键字与指针项在索引表中的位置是由索引函数决定的。

在实际应用中，索引表中的每一个结点设置一个子表长度的数据项是很有用的，这是因为各子表是顺序存储的，而对于顺序存储的线性表来说，除了需要指出第一个结点的存储序号外，它的长度有时是必不可少的，特别是对于查找操作尤为突出。

最后还需要指出的是，在“顺序-索引-顺序”存储方式中，虽然可以根据子表的性质将处理限制在某个子表范围内，但由于各子表采用顺序分配，因此，就各子表而言，其顺序分配的缺点依然存在。这种存储方式只有在线性表为固定的情况下才比较合适。

#### 2.4.3 “顺序-索引-链接”存储方式

“顺序-索引-链接”存储方式是指用顺序分配的方法存储索引表，而用链式分配的方法存储各子表。在这种存储方式中，各子表均为线性链表，而每一个线性链表的头指针是索引表中对应结点的指针项。图2.31为这种存储结构的示意图。图2.32是例2.15中学生成绩表的“顺序-索引-链接”存储结构图。

<div style="text-align: center;"><div style="text-align: center;">图 2.31 “顺序-索引-链接”存储结构示意图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(a) 逻辑状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 物理状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.32 “顺序-索引-链接”存储结构示例</div> </div>

#### 2.4.4 多重索引存储结构

如果在上述讨论的索引存储结构中，其索引表本身又是索引存储结构，则称之为二重索引存储结构。图2.33（a）为“顺序-索引-顺序-索引-链接”方式的二重索引存储结构示意图，图2.33（b）为“顺序-索引-链接-索引-链接”方式的二重索引存储结构示意图。

<div style="text-align: center;"><div style="text-align: center;">(a) “顺序-索引-顺序-索引-链接” 二重索引结构</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.33 二重索引存储结构示意图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) “顺序-索引-链接-索引-链接” 二重索引结构</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图2.33（续）</div> </div>

索引存储结构可以嵌套多层，形成多重索引存储结构。适当地嵌套使用索引存储结构，对于提高查找效率是很有用的，因为在这种存储结构下，一般只需很少的几步搜索就能找到所需要的结点。在 UNIX 操作系统中，对文件空间的管理就采用了多重索引结构。

### 2.5 数组

本节主要讨论二维数组，它是数学中的矩阵在程序设计语言中的表示。

程序设计语言中的数组在计算机中是顺序存储的。当矩阵中的绝大部分元素为零时，采用一般的二维数组的存储方式会浪费大量的存储空间，同时也做了大量不必要的运算。因此，本章主要讨论一般二维数组的顺序存储结构，以及当矩阵中绝大部分为零元素时的表示方法。

#### 2.5.1 数组的顺序存储结构

数学中的矩阵在程序设计语言中用二维数组表示。二维数组在计算机中是顺序存储的，其存储方式一般有两种：以行为主的顺序存储与以列为主的顺序存储。

## 1. 二维数组以行为主的顺序存储

二维数组以行为主的顺序存储是指将数组中的元素一行接一行地顺序存储在计算机的连续存储空间中。即：先存储第1行，然后存储第2行，以此类推；每一行的元素以从左到右的顺序存储。

在二维数组的以行为主顺序存储中，假设数组中第一个元素 $ (a_{11}) $在计算机中的存储地址为 $ ADR(a_{11}) $，且每一个元素占L字节，则数组中的元素 $ a_{ij} $在计算机中的存储地址为

 $$ \mathrm{A D R}(a_{i j})=\mathrm{A D R}(a_{11})+\left[(i-1)n+j-1\right]L $$

其中  $ 1 \leqslant i \leqslant m, 1 \leqslant j \leqslant n $。

程序设计语言 BASIC、C 中的多维数组在计算机中是以行为主的顺序存储的。

## 2. 二维数组以列为主的顺序存储

二维数组以列为主的顺序存储是指将数组中的元素一列接一列地顺序存储在计算机的

连续存储空间中。即：先存储第1列，然后存储第2列，以此类推；每一列的元素以上到下的顺序存储。

在二维数组的以列为主顺序存储中，假设数组中第一个元素 $ (a_{11}) $在计算机中的存储地址为 $ ADR(a_{11}) $，且每一个元素占L字节，则数组中的元素 $ a_{ij} $在计算机中的存储地址为

 $$ \mathrm{A D R}(a_{i j})=\mathrm{A D R}(a_{11})+\left[(j-1)m+i-1\right]L $$

其中  $ 1 \leqslant i \leqslant m, 1 \leqslant j \leqslant n $。

程序设计语言 FORTRAN 中的多维数组在计算机中是以列为主的顺序存储的。

### 2.5.2 规则矩阵的压缩

所谓规则矩阵，是指矩阵中非零元素的分布是有规律的。例如：上三角矩阵中的非零元素只在矩阵的右上三角出现，而左下三角中均为零元素；下三角矩阵中的非零元素只在矩阵的左下三角出现，而右上三角中均为零元素；对称矩阵中左下三角与右上三角的元素是对称的；三对角矩阵中只有在三条对角线上是非零元素，而在三条对角线以外均为零元素；一般带型矩阵只有在 $ 2k+1 $条对角线上是非零元素，而在 $ 2k+1 $条对角线以外均为零元素（三对角矩阵也是带型矩阵，其中k=1）。上述矩阵都是规则矩阵。

在规则矩阵中，由于非零元素有规律地分布在矩阵中，因此，在存储一个规则矩阵时，只需存储非零元素即可，而对于大部分的零元素或者重复的非零元素（如对称矩阵）则不必存储，从而可以节省存储空间。规则矩阵的这种存储方法称为压缩存储。

在规则矩阵的压缩存储中，一个很重要的问题是：规则矩阵经压缩存储后，虽然节省了存储空间，但还要求能够比较方便地访问矩阵中的每一个元素。下面以下三角矩阵、对称矩阵与三对角矩阵为例来讨论规则矩阵的压缩存储问题。

## 1. 下三角矩阵的压缩存储

对于下三角矩阵来说，大约有一半的元素为零，这些零元素不必存储，只需存储下三角部分的非零元素。存储的原则是：用一个一维数组以行为主顺序存放下三角矩阵中的所有下三角部分的元素。这样，一个n阶的下三角矩阵有 $ n^{2} $个元素，但只需存储 $ \frac{n(n+1)}{2} $个下三角部分的元素。具体做法如下：

设 n 阶下三角矩阵为

 $$ \boldsymbol{A}=\left[\begin{aligned}&a_{11}&&&&\\ &a_{21}&a_{22}&&0&\\ &a_{31}&a_{32}&a_{33}&&\\ &\vdots&\vdots&\vdots&\ddots&\\ &a_{n1}&a_{n2}&a_{n3}&\cdots&a_{nn}\end{aligned}\right] $$

开辟一个长度为 $ \frac{n(n+1)}{2} $的一维数组B，然后一行接一行地依次存放A中下三角部分的元素。经压缩后，存放在一维数组B中的形式如图2.34(a)所示。

显然，下三角矩阵 A 用一维数组 B 表示后，可以按如下原则访问 A 中的第 i 行、第 j 列的元素  $ a_{ij} $

如果  $ a_{ij} $ 为下三角部分的元素 ( $ j \leqslant i $)，则它被存放在一维数组 B 的第  $ i(i-1)/2+j $

<div style="text-align: center;"><div style="text-align: center;">(a) 以行为主</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 以列为主</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.34 用一维数组压缩存放下三角矩阵</div> </div>

个元素中。

如果  $ a_{ij} $ 为非下三角元素 (j > i)，则它实际上没有存储，但它的值为 0，即有如下关系：

 $$ a_{ij}=\left\{\begin{aligned}&B\left[i\left(i-1\right)/2+j\right]&j\leqslant i\\ &0&j>i\end{aligned}\right. $$

下三角矩阵 A 也可以用以列为主的方式压缩存储在一维数组 B 中，其存储形式如图 2.34(b) 所示。

在以列为主压缩存储下三角矩阵 A 的情况下，访问下三角矩阵 A 中第 i 行、第 j 列元素  $ a_{ij} $ 的公式为

 $$ a_{ij}=\left\{\begin{aligned}&B\left[(2n-j+2)(j-1)/2+(i-j+1)\right]&j\leqslant i\\ &0&j>i\end{aligned}\right. $$

显然，在以列为主压缩存储的情况下，访问下三角矩阵A中的元素时，其下标运算要比以行为主压缩存储时稍为复杂一些，因此，在实际应用时，一般采用以行为主压缩存储的方式存储下三角矩阵。

但如果要对上三角矩阵进行压缩存储，则采用以列为主比较方便。在以列为主压缩存储上三角矩阵A的情况下，访问下三角矩阵A中第i行、第j列元素 $ a_{ij} $的公式为

 $$ a_{ij}=\left\{\begin{aligned}&0&j<i\\ &B\left[j\left(j-1\right)/2+i\right]&j&\geqslant i\end{aligned}\right. $$

## 2. 对称矩阵的压缩存储

对称矩阵的压缩存储与下三角矩阵完全相同。在以行为主压缩存储对称矩阵A的情况下，访问对称矩阵A中第i行、第j列元素 $ a_{ij} $的公式为

 $$ a_{ij}=\left\{\begin{aligned}&B\left[i\left(i-1\right)/2+j\right]&j\leqslant i\\ &B\left[j\left(j-1\right)/2+i\right]&j>i\end{aligned}\right. $$

## 3. 三对角矩阵的压缩存储

n 阶三对角矩阵的形式为

 $$ \begin{aligned}&\boldsymbol{A}=\begin{bmatrix}a_{11}&a_{12}&&&&\\&a_{21}&a_{22}&a_{23}&&&0&\\&&\ddots&\ddots&\ddots&\ddots&\\&&&0&&a_{n-1,n-2}&a_{n-1,n-1}&a_{n-1,n}\\&&&&&&a_{n,n-1}&a_{nn}\end{bmatrix}\\ \end{aligned} $$

在三对角矩阵中，三条对角线以外的元素均为零；并且，除了第一行与最后一行外，其他每一行均只有3个元素为非零。因此，n阶三对角矩阵共有3n-2个非零元素。

对于 n 阶三对角矩阵，用一个长度为 3n-2 的一维数组以行为主存放三条对角线上的元素，其存储形式如图 2.35(a) 所示。

要访问三对角矩阵 A 中第 i 行、第 j 列的元素  $ a_{ij} $，可以分以下两种情况。

（1）如果  $ a_{ij} $ 在三条对角线上  $ (i-1 \leqslant j \leqslant i+1) $，则该元素被存放在一维数组 B 中，它在一维数组 B 中存放的位置（下标）可以按如下方式确定：

因为是以行为主存储，考虑在  $ a_{ij} $ 前面存放的有前 i-1 行的所有元素，共有  $ \left[3(i-1)-1\right] $ 个；在第 i 行上第 j 列前面的元素有  $ \left[j-i+1\right] $ 个（另外 i-2 个元素不在三条对角线上，没有存储）。因此，在  $ a_{ij} $ 前面存放的元素共有  $ \left[2(i-1)+j-1\right] $ 个，即  $ a_{ij} $ 在一维数组 B 中为第  $ \left[2(i-1)+j\right] $ 个。

（2）如果要访问的 $ a_{ij} $不在三条对角线上 $ (j<i-1 $或 $ j>i+1) $，则 $ a_{ij} $为零元素。

综上所述，在用一维数组 B 以行为主存放三对角矩阵 A 中的元素  $ a_{ij} $ 时，其访问公式为

 $$ a_{ij}=\left\{\begin{aligned}&B\left[2(i-1)+j\right]&i-1\leqslant j\leqslant i+1\\ &0&j<i-1 或 j>i+1\end{aligned}\right. $$

对于三对角矩阵，也可以用一维数组 B 以列为主存放三条对角线上的元素，如图 2.35(b) 所示。在这种情况下，访问三对角矩阵 A 中元素  $ a_{ij} $ 的公式为

 $$ a_{ij}=\left\{\begin{aligned}&B\left[2(j-1)+i\right]&i-1\leqslant j\leqslant i+1\\ &0&j<i-1 或 j>i+1\end{aligned}\right. $$

如果一个矩阵中绝大多数的元素值为零，只有很少的元素值非零，则称该矩阵为稀疏矩阵。例如，在 $ 7\times8 $的矩阵

 $$ \boldsymbol{A}=\begin{bmatrix}0&0&3&0&0&0&0&1\\0&0&0&0&0&0&0&0\\9&0&0&0&0&0&0&0\\0&0&0&0&7&0&0&0\\0&0&0&0&0&0&6&0\\0&0&0&2&0&3&0&0\\0&0&5&0&0&0&0&0\end{bmatrix} $$

中，共有56个元素，但只有8个是非零元素，其余均为零元素。

在稀疏矩阵中，由于绝大部分是零元素，而这些零元素如果也要存储在计算机的存储空

<div style="text-align: center;"><div style="text-align: center;">(a) 以行为主</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 以列为主</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.35 用一维数组压缩存放三对角矩阵</div> </div>

间中，则会浪费大量的存储空间。因此，在实际存储稀疏矩阵时，可以只存储非零元素，而大量的零元素不存储，这就是稀疏矩阵的压缩存储。

对稀疏矩阵采用压缩存储的目的是节省存储空间。并且，稀疏矩阵经压缩存储后，还要能够比较方便地访问其中的每一个元素（包括零元素与非零元素）。由于稀疏矩阵中非零元素的分布一般是没有规律的，不能像规则矩阵那样可以用一个一维数组来依次存放其中的非零元素。因此，稀疏矩阵的压缩存储要比规则矩阵复杂一些。对稀疏矩阵进行压缩存储的方法有很多，本节主要介绍两种方法：稀疏矩阵的三列二维数组表示与十字链表。
