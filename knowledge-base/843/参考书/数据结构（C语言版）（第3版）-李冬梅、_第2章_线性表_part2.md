# 2.6 顺序表和链表的比较

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


前面两节介绍了线性表的两种存储结构：顺序表和链表。在实际应用中，不能笼统地说哪种存储结构更好，由于它们各有优缺点，选用哪种存储结构，应根据具体问题作具体分析，通常从空间性能和时间性能两个方面作比较分析。

## （1）存储空间的分配

顺序表的存储空间必须预先分配，元素个数有一定限制，易造成存储空间浪费或空间溢出现象；而链表不需要为其预先分配空间，只要内存空间允许，链表中的元素个数就没有限制。

基于此，当线性表的长度变化较大，难以预估存储规模时，宜采用链表作为存储结构。

### （2）存储密度的大小

链表的每个结点除了设置数据域用来存储数据元素外，还要额外设置指针域，用来存储指示元素之间逻辑关系的指针，从存储密度上来讲，这是不经济的。所谓存储密度是指数据元素本身所占用的存储量和整个结点结构所占用的存储量之比，即：

 $$  存储密度 =\frac{ 数据元素本身占用的存储量 }{ 结点结构占用的存储量 } $$

存储密度越大，存储空间的利用率就越高。显然，顺序表的存储密度为1，而链表的存储密度小于1。如果每个元素数据域占据的空间较小，则指针的结构性开销就占用了整个结点的大部分空间，这样存储密度较小。例如，若单链表的结点数据均为整数，指针所占用的空间和整型量所占用的相同，则单链表的存储密度为0.5。因此，如果不考虑顺序表中的空闲区，则顺序表的存储空间利用率为100%，而单链表的存储空间利用率仅为50%。

基于此，当线性表的长度变化不大，易于事先确定其大小时，为了节约存储空间，宜采用顺序表作为存储结构。

#### （1）存取元素的效率

顺序表是由数组实现的，它是一种随机存取结构，指定任意一个位置序号 i，都可以在 O(1) 时间内直接存取该位置上的元素，即取值操作的效率高；而链表是一种顺序存取结构，按位置

访问链表中第 i 个元素时，只能从表头开始依次向后遍历链表，直到找到第 i 个位置上的元素，时间复杂度为  $ O(n) $，即取值操作的效率低。

基于此，若线性表的主要操作是和元素位置紧密相关的一类取值操作，很少做插入或删除时，宜采用顺序表作为存储结构。

##### （2）插入和删除操作的效率

对于链表，在确定插入或删除的位置后，插入或删除操作无须移动数据，只需要修改指针，时间复杂度为  $ O(1) $。而对于顺序表，进行插入或删除时，平均要移动表中近一半的结点，时间复杂度为  $ O(n) $。尤其是当每个结点的信息量较大时，移动结点的时间开销就相当可观。

基于此，对于频繁进行插入或删除操作的线性表，宜采用链表作为存储结构。

#### 【例2.1】求解一般集合的并集问题。

【问题描述】

已知两个集合 A 和 B，现要求一个新的集合  $ A = A \cup B $。例如，设：

 $$ A=(7,5,3,11) $$

 $$ B=(2,6,3) $$

合并后：

 $$ A=(7,5,3,11,2,6) $$

【问题分析】

可以利用两个线性表 LA 和 LB 分别表示集合 A 和 B（线性表中的数据元素为集合中的成员），这样只需扩大线性表 LA，将存在于 LB 中而不存在于 LA 中的数据元素插入 LA 中。只要从 LB 中依次取得每个数据元素，并依值在 LA 中进行查访，若不存在，则插入之。

上述操作过程可用算法2.15来描述。具体实现时既可采用顺序形式，也可采用链表形式。

##### 算法 2.15 线性表的合并

【算法步骤】

①分别获取LA表长m和LB表长 $ n_{0} $

②从 LB 中第 1 个数据元素开始，循环 n 次执行以下操作：

从 LB 中查找第  $ i $（ $ 1 \leq i \leq n $）个数据元素赋给 e；

在 LA 中查找元素 e，如果不存在，则将 e 插在表 LA 的最后。

线性表的合并

【算法描述】

void MergeList(List &LA, List LB)
{
 // 将所有在线性表 LB 中但不在 LA 中的数据元素插入 LA 中
 m = ListLength(LA); n = ListLength(LB); // 求线性表的长度
 for (i = 1; i <= n; i++)
 {
 GetElem(LB, i, e); // 取 LB 中第 i 个数据元素赋给 e
 if (!LocateElem(LA, e)) // LA 中不存在和 e 相同的数据元素
 ListInsert(LA, ++m, e); // 将 e 插在 LA 的最后
 }
}

##### 【算法分析】

上述算法的时间复杂度取决于抽象数据类型 List 定义中基本操作的执行时间，假设 LA 和 LB 的表长分别为 m 和 n，循环执行 n 次，则：

① 当采用顺序存储结构时，在每次循环中，GetElem 和 ListInsert 这两个操作的执行时间和表长无关，LocateElem 的执行时间和表长 m 成正比，因此，算法 2.15 的时间复杂度为  $ O(m \times n) $；

② 当采用链式存储结构时，在每次循环中，GetElem 的执行时间和表长 n 成正比，而 LocateElem 和 ListInsert 这两个操作的执行时间和表长 m 成正比，因此，若假设 m 大于 n，算法 2.15 的时间复杂度也为  $ O(m \times n) $。

#### 2.7.2 有序表的合并

若线性表中的数据元素相互之间可以比较，并且数据元素在线性表中依值非递减或非递增有序排列，则称该线性表为有序表（Ordered List）。

【例2.2】求解有序集合的并集问题。

【问题描述】

有序集合是指集合中的元素有序排列。已知两个有序集合  $ A $ 和  $ B $，数据元素按值非递减有序排列，现要求一个新的集合  $ C = A \cup B $，使集合  $ C $ 中的数据元素仍按值非递减有序排列。

例如，设：

 $$ A=(3,5,8,11) $$

 $$ B=(2,6,8,9,11,15,20) $$

则：

 $$ C=(2,3,5,6,8,8,9,11,11,15,20) $$

##### 【问题分析】

与例 2.1 一样，可以利用两个线性表 LA 和 LB 分别表示集合 A 和 B，不同的是，此例中的 LA 和 LB 有序，这样便没有必要从 LB 中依次取得每个数据元素，到 LA 中进行查访。

如果 LA 和 LB 两个表长分别记为 m 和 n，则合并后的新表 LC 的表长应该为  $ m + n $。由于 LC 中的数据元素或是 LA 中的元素，或是 LB 中的元素，因此只要先设 LC 为空表，然后将 LA 或 LB 中的元素逐个插入 LC 中即可。为使 LC 中的元素按值非递减有序排列，可设两个指针 pa 和 pb 分别指向 LA 和 LB 中的某个元素，若设 pa 当前所指的元素为 a，pb 当前所指的元素为 b，则当前应插入到 LC 中的元素 c 为：

 $$ c=\begin{cases}a&a\leq b\\b&a>b\end{cases} $$

显然，指针 pa 和 pb 初始时分别指向两个有序表的第一个元素，在所指元素插入 LC 之后，在 LA 或 LB 中顺序后移。

根据上述分析，分别给出有序表的顺序存储结构和链式存储结构相应合并算法的实现。

### 算法2.16 顺序有序表的合并

【算法步骤】

①创建一个表长为 $ m+n $的空表LC。

②指针 pc 初始化，指向 LC 的第一个元素。

③指针 pa 和 pb 初始化，分别指向 LA 和 LB 的第一个元素。

④ 当指针 pa 和 pb 均未到达相应表尾时，则依次比较 pa 和 pb 所指向的元素值，从 LA 或 LB 中“摘取”元素值较小的结点插入 LC 的最后。

⑤如果 pb 已到达 LB 的表尾，依次将 LA 的剩余元素插入 LC 的最后。

⑥如果 pa 已到达 LA 的表尾，依次将 LB 的剩余元素插入 LC 的最后。

#### 【算法描述】

void MergeList_Sq(SqList LA, SqList LB, SqList &LC)
{
 // 已知顺序有序表LA和LB的元素按值非递减排列
 // 归并LA和LB得到新的顺序有序表LC，LC的元素也按值非递减排列
 LC.length=LA.length+LB.length; // 新表长度为待合并两表的长度之和
 LC.elem=new ElemType[LC.length]; // 为合并后的新表分配一个数组空间
 pc=LC.elem; // 指针pc指向新表的第一个元素
 pa=LA.elem; pb=LB.elem; // 指针pa和pb的初值分别指向两个表的第一个元素
 pa_last=LA.elem+LA.length-1; // 指针pa_last指向LA的最后一个元素
 pb_last=LB.elem+LB.length-1; // 指针pb_last指向LB的最后一个元素
 while((pa<=pa_last)&&(pb<=pb_last)) // 未达到LA和LB的表尾
 {
 if (*pa<=*pb) *pc++=*pa++; // 依次摘取两表中值较小的结点插入LC的最后
 else *pc++=*pb++;
 }
 while(pa<=pa_last) *pc++=*pa++; // 已到达LB表尾，依次将LA的剩余元素插入LC的最后
 while(pb<=pb_last) *pc++=*pb++; // 已到达LA表尾，依次将LB的剩余元素插入LC的最后
}

##### 【算法分析】

若对算法 2.16 中第一个循环语句的循环体进行如下修改：分出元素比较的第三种情况，当 *pa == *pb 时，只将两者之一插入 LC，则该算法完成的操作和算法 2.15 相同，但时间复杂度却不同。在算法 2.16 中，由于 LA 和 LB 中元素依值非递减，则对 LB 中的每个元素，不需要在 LA 中从表头至表尾进行全程搜索。如果两个表长分别记为 m 和 n，则算法 2.16 循环最多执行的总次数为  $ m + n $。所以算法的时间复杂度为  $ O(m + n) $。

此算法在归并时，需要开辟新的辅助空间，所以空间复杂度也为  $ O(m + n) $，空间复杂度较高。利用链表来实现上述归并时，不需要开辟新的存储空间，可以使空间复杂度达到最低。

顺序有序表的合并

## 2. 链式有序表的合并

假设头指针为 LA 和 LB 的单链表分别为线性表 LA 和 LB 的存储结构，现要归并 LA 和 LB 得到单链表 LC。因为链表结点之间的关系是通过指针指向建立起来的，所以用链表进行合并不需要另外开辟存储空间，可以直接利用原来两个表的存储空间，合并过程中只需把 LA 和 LB 两个表中的结点重新进行链接即可。

按照例 2.2 给出的合并思想，需设立 3 个指针 pa、pb 和 pc，其中 pa 和 pb 分别指向 LA 和 LB 中当前待比较插入的结点，而 pc 指向 LC 中当前最后一个结点（LC 的表头结点设为 LA 的表头结点）。指针的初值为：pa 和 pb 分别指向 LA 和 LB 表中的第一个结点，pc 指向空表 LC 中的头结点。同算法 2.16 一样，通过比较指针 pa 和 pb 所指向的元素的值，依次从 LA 或 LB 中摘取元素值较小的结点插入到 LC 的最后，当其中一个表变空时，只要将另一个表的剩余段链接在 pc 所指结点之后即可。

### 【算法步骤】

①指针 pa 和 pb 初始化，分别指向 LA 和 LB 的第一个结点。

② LC 的结点取值为 LA 的头结点。

③指针 pc 初始化，指向 LC 的头结点。

④ 当指针 pa 和 pb 均未到达相应表尾时，则依次比较 pa 和 pb 所指向的元素值，从 LA 或 LB 中摘取元素值较小的结点插入 LC 的最后。

⑤将非空表的剩余段插入pc所指结点之后。

⑥释放 LB 的头结点。

链式有序表的合并

【算法描述】

void MergeList_L(LinkList &LA, LinkList &LB, LinkList &LC)
{
 // 已知单链表 LA 和 LB 的元素按值非递减排列
 // 归并 LA 和 LB 得到新的单链表 LC, LC 的元素也按值非递减排列
 pa=LA->next; pb=LB->next; // pa 和 pb 的初值分别指向两个表的第一个结点
 LC=LA; // 用 LA 的头结点作为 LC 的头结点
 pc=LC; // pc 的初值指向 LC 的头结点
 while (pa&&pb)
 {
 // LA 和 LB 均未到达表尾，依次“摘取”两表中值较小的结点插入到 LC 的最后
 if (pa->data<=pb->data) // 摘取 pa 所指结点
 {
 pc->next=pa; // 将 pa 所指结点链接到 pc 所指结点之后
 pc=pa; // pc 指向 pa
 pa=pa->next; // pa 指向下一结点
 }
 else
 {
 pc->next=pb; // 将 pb 所指结点链接到 pc 所指结点之后
 pc=pb; // pc 指向 pb
 pb=pb->next; // pb 指向下一结点
 }
 }
 pc->next=pa?pa:pb; // 将非空表的剩余段插入到 pc 所指结点之后
 delete LB; // 释放 LB 的头结点
}

#### 【算法分析】

可以看出，算法2.17的时间复杂度和算法2.16相同，但空间复杂度不同。在归并两个链表为一个链表时，不需要另建新表的结点空间，而只需将原来两个链表中结点之间的关系解除，重新按元素值非递减的关系将所有结点链接成一个链表即可，所以空间复杂度为 $ O(1) $。

## 2.8 案例分析与实现

在 2.2 节我们通过 3 个典型案例引入了线性表这种数据结构，本节结合线性表的基本操作对这 3 个案例进行进一步的分析，然后给出案例中有关算法的具体实现。

案例2.1：一元多项式的运算。

### 【案例分析】

由 2.2 节的讨论我们已知，一元多项式可以抽象成一个线性表。在计算机中，我们可以采用数组来表示一元多项式的线性表。

利用数组 p 表示：数组中每个分量 p[i] 表示多项式每项的系数  $ p_{i} $，数组分量的下标 i 即对应每项的指数。数组中非零的分量个数即多项式的项数。

例如，多项式  $ P(x)=10+5x-4x^{2}+3x^{3}+2x^{4} $ 可以用表2.1所示的数组表示。

<div style="text-align: center;"><div style="text-align: center;">表2.1 多项式的数组表示</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>指数（下标i）</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>系数 $ p[i] $</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>-4</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr></table>

显然，利用上述方法表示一元多项式，多项式相加的算法很容易实现，只要把两个数组对应的分量项相加就可以了。

案例2.2：稀疏多项式的运算。

#### 【案例分析】

由 2.2 节的讨论我们已知，稀疏多项式也可以抽象成一个线性表。结合 2.7 节介绍的两个有序表的归并方法，可以看出，稀疏多项式的相加过程和归并两个有序表的过程极其类似，不同之处仅在于，后者在比较数据元素时只出现两种情况（小于等于、大于），而多项式的相加过程在比较两个多项式指数时要考虑 3 种情况（等于、小于、大于）。因此，多项式相加的过程可以根据算法 2.16 和算法 2.17 改进而成。

和顺序存储结构相比，利用链式存储结构更加灵活，更适合表示一般的多项式，合并过程的空间复杂度为 O(1)，所以较为常用。本节将给出如何利用单链表的基本操作来实现多项式的相加运算。

例如，图2.22所示两个链表分别表示多项式 $ A(x)=7+3x+9x^{8}+5x^{17} $和多项式 $ B(x)=8x+22x^{7}-9x^{8} $。从图中可见，每个结点表示多项式中的一项。

<div style="text-align: center;"><div style="text-align: center;">图2.22 多项式的单链表存储结构</div> </div>

如何实现用这种单链表表示的多项式的加法运算呢？

根据多项式相加的运算规则：对于两个多项式中所有指数相同的项，对应系数相加，若其和不为0，则作为“和多项式”中的一项插入“和多项式”链表中；对于两个多项式中指数不相同的项，则将指数值较小的项插入“和多项式”链表中。“和多项式”链表中的结点无须生成，而应该从两个多项式的链表中摘取。图2.22所示的两个多项式相加得到的和多项式如图2.23所示，图中的长方框表示已被释放的结点。

<div style="text-align: center;"><div style="text-align: center;">图2.23 相加得到的和多项式</div> </div>

##### 【案例实现】

用链表表示多项式时，每个链表结点存储多项式中的一个非零项，包括系数（coef）和指

数（expn）两个数据域以及一个指针域（next）。对应的数据结构定义为：

typedef struct PNode
{
 float coef; // 系数
 int expn; // 指数
 struct PNode *next;  // 指针域
} PNode, *Polynomial;

一个多项式可以表示成由这些结点链接起来的单链表，要实现多项式的相加运算，首先需要创建多项式链表。

## 1. 多项式的创建

多项式的创建方法类似于链表的创建方法，区别在于多项式链表是一个有序表，每项的位置要经过比较才能确定。首先初始化一个空链表用来表示多项式，然后逐个输入各项，通过比较，找到第一个大于该输入项指数的项，将输入项插到此项的前面，这样即可保证多项式链表的有序性。

### 算法2.18 多项式的创建

【算法步骤】

①创建一个只有头结点的空链表。

②根据多项式的项的个数 n，循环 n 次执行以下操作：

生成一个新结点 $ ^{*} $s；

输入多项式当前项的系数和指数赋给新结点  $ ^{*} $s 的数据域；

设置一前驱指针 pre，用于指向待找到的第一个大于输入项指数的结点的前驱，pre 初始时指向头结点；

指针 q 初始化，指向首元结点；

循环向下逐个比较链表中当前结点的指数与输入项的指数，找到第一个大于输入项指数的结点 *q；

将输入项结点 *s 插入结点 *q 之前。

多项式的创建

【算法描述】

void CreatePolyn(Polynomial &P,int n)
{
 // 输入n项的系数和指数，建立表示多项式的有序链表P
 P=new PNode;
 P->next=NULL;
 for(i=1;i<=n;++i)
 {
 s=new PNode;
 cin>>s->coef>>s->expn;
 pre=P;
 q=P->next;
 while(q&&q->expn<s->expn)
 {
 pre=q;
 q=q->next;
 }
 s->next=q;
 pre->next=s;
 }
}

#### 【算法分析】

创建一个项数为 n 的有序多项式链表，需要执行 n 次循环逐个输入各项，而每次循环又都需要从前向后比较输入项与各项的指数。在最坏情况下，第 n 次循环需要进行 n 次比较，因此，时间复杂度为  $ O(n^{2}) $。

## 2. 多项式的相加

创建两个多项式链表后，便可以进行多项式的加法运算了。假设头指针为 Pa 和 Pb 的单链表分别为多项式 A 和 B 的存储结构，指针 p1 和 p2 分别指向 A 和 B 中当前进行比较的某个结点，则逐一比较两个结点中的指数项，对于指数相同的项，对应系数相加，若其和不为 0，则插入“和多项式”链表中；对于指数不相同的项，则通过比较，将指数值较小的项插入“和多项式”链表中。

### 【算法步骤】

①指针 p1 和 p2 初始化，分别指向 Pa 和 Pb 的首元结点。

② p3 指向和多项式的当前结点，初值为 Pa 的头结点。

③ 当指针 p1 和 p2 均未到达相应表尾时，则循环比较 p1 和 p2 所指结点对应的指数值（p1->expn 与 p2->expn），有下列 3 种情况：

当 p1 -> expn 等于 p2 -> expn 时，则将两个结点中的系数相加，若和不为 0，则修改 p1 所指结点的系数值，同时删除 p2 所指结点，若和为 0，则删除 p1 和 p2 所指结点；

当 p1 -> expn 小于 p2 -> expn 时，则应摘取 p1 所指结点插入“和多项

式”链表中；

当 p1 -> expn 大于 p2 -> expn 时，则应摘取 p2 所指结点插入 “和多项式” 链表中。

④将非空多项式的剩余段插入p3所指结点之后。

⑤释放Pb的头结点。

多项式的相加

#### 【算法描述】

void AddPolyn(Polynomial &Pa, Polynomial &Pb)
{
 // 多项式加法：Pa=Pa+Pb，利用两个多项式的结点构成“和多项式”
 p1=Pa->next; p2=Pb->next; // p1和p2初始时分别指向Pa和Pb的首元结点
 p3=Pa; // p3指向和多项式的当前结点，初值为Pa
 while (p1 && p2) {
 // p1和p2均非空
 }
 if (p1->expn==p2->expn) {
 // 指数相等
 {
 sum=p1->coef+p2->coef; // sum保存两项的系数和
 if (sum!=0) {
 // 系数和不为0
 }
 p1->coef=sum; // 修改Pa当前结点的系数值为两项系数的和
 p3->next=p1; p3=p1; // 将修改后的Pa当前结点链接在p3之后，p3指向p1
 p1->next; // p1指向后一项
 r=p2; p2=p2->next; delete r; // 删除Pb当前结点，p2指向后一项
 }
 else {
 // 系数和为0
 }
 r=p1; p1=p1->next; delete r; // 删除Pa当前结点，p1指向后一项
 r=p2; p2=p2->next; delete r; // 删除Pb当前结点，p2指向后一项
 }
}

}

else if (p1->expn<p2->expn)  // Pa 当前结点的指数值小
{
 p3->next=p1;  // 将 p1 链接在 p3 之后
 p3=p1;  // p3 指向 p1
 p1=p1->next;  // p1 指向后一项
}
else
{
 p3->next=p2;  // 将 p2 链接在 p3 之后
 p3=p2;  // p3 指向 p2
 p2=p2->next;  // p2 指向后一项
}

p3->next=p1?p1:p2;  // 插入非空多项式的剩余段
delete Pb;  // 释放 Pb 的头结点
}

##### 【算法分析】

假设两个多项式的项数分别为 m 和 n，则同算法 2.17 一样，该算法的时间复杂度为  $ O(m+n) $，空间复杂度为  $ O(1) $。

对于两个一元多项式减法和乘法的运算，都可以利用多项式加法的算法来实现。减法运算比较简单，只需要先对要减的多项式的每项系数进行取反，再调用加法运算 AddPolyn 即可。多项式的乘法运算可以分解为一系列的加法运算。假设  $ A(x) $ 和  $ B(x) $ 为式（2-1）的多项式，则：

 $$ \begin{aligned}M(x)&=A(x)\times B(x)\\&=A(x)\times[b_{1}x^{e_{1}}+b_{2}x^{e_{2}}+\cdots+b_{n}x^{e_{n}}]\\&=\sum_{i=1}^{n}b_{i}A(x)x^{e_{i}}\end{aligned} $$

其中，每一项都是一个一元多项式。

多项式相加的例子说明，对于一些有规律的数学运算，借助链表实现是一种解决问题的途径。

##### 【案例分析】

把图书表抽象成一个线性表，每本图书（包括 ISBN、书名、定价）作为线性表中的一个元素。在图书信息管理系统中要求实现查找、插入、删除、修改、排序和计数总计 6 个功能，具体分析如下。

（1）对于查找、插入、删除这3个功能的算法，本章已分别给出了线性表利用顺序存储结构和链式存储结构表示时相应的算法描述。

（2）对于修改功能，可以通过调用查找算法，找到满足条件的图书进行修改。

（3）对于排序功能，在没有时间复杂度限制的情况下，可以采用读者熟悉的冒泡排序来完成；如果图书数目较多，对排序算法的时间效率要求较高，在学完第8章的内部排序算法后，可以选取一种较高效的排序算法来实现，如快速排序。

（4）对于计数功能，如果采取顺序存储结构，线性表的长度是它的属性，可以直接通过返回length的值实现图书数量的统计功能，时间复杂度是 $ O(1) $；如果采取链式存储结构，则需要通过从首元结点开始，附设一个计数器进行计数，一直“数”到最后一个结点，时间复杂度是 $ O(n) $。

在实现图书信息管理系统时，具体采取哪种存储结构，可以根据实际情况而定。如果图书数据较多，需要频繁地进行插入和删除操作，则宜采取链表表示；反之，如果图书数据变化不大，很少进行插入和删除操作，则宜采取顺序表表示。

此案例中所涉及的算法比较基础，但非常重要，读者可以分别采用顺序表和链表实现此案例的相应功能，作为本章的实验题目来完成。

## 2.9 LeetCode算法练习题

为使本节各算法练习题中的算法描述部分所使用的链表存储结构与 LeetCode 官方一致，将本节中单链表的存储结构定义如下：

//---单链表的存储结构-
typedef struct ListNode
{
 ElemType val;
 struct ListNode *next;
}LNode, *LinkList;

//结点的数据域
//结点的指针域

另外，为了确保每个练习题中算法描述部分给出的代码提交到 LeetCode 官网可以通过，与前面章节算法描述部分的代码不同的是，本节中的代码均采用 C 语言源码形式（动态内存分配采用 C 语言的malloc()函数），后面第3～8章中LeetCode算法练习题中算法描述部分给出的代码也如此。

### 【问题描述】

给定一个升序排列的数组，原地删除重复出现的元素，使得每个元素只出现一次，返回删除后数组的长度。注意：不可以使用额外的数组空间，即算法的空间复杂度为  $ O(1) $。

【输入输出示例】

输入：nums=[0,0,1,1,1,2,2,3,3,4]

输出：5，num_s = [0, 1, 2, 3, 4]

解释：函数应该返回新的数组长度 5，并且原数组 nums 的前 5 个元素被修改为 0, 1, 2, 3, 4。不需要考虑数组中超出新长度的元素。

#### 【问题分析】

本题需要首先判断数组的长度是否为0，如果是，则数组不包含任何元素，返回0；否则，数组至少包含一个元素，数组的第一个元素保持原状即可，从数组下标为1的位置开始删除重复元素。

由于给定的数组 nums 是有序的，因此对于任意的  $ i < j $，如果 nums[i] = nums[j] $，则对任意  $ i \leq k \leq j $，必有 nums[i] = nums[k] = nums[j] $，即相等元素在数组中的下标一定是连续的。根据数组有序的特点，可以利用双指针的方法遍历数组来删除重复元素。定义两个指针 fast 和 slow，分别为快指针和慢指针，初始时两个指针均指向数组下标为 1 的位置，fast 指针用于遍历数组，slow 指针用于指向下一个不重复的元素要填入的下标位置。如果 nums[fast]  $ \neq $ nums[fast - 1] $，说明 nums[fast] 和前面的元素均不相同，则将 nums[fast] 的值复制到 nums[slow] $，然后将 slow 的值加 1，即指向下一个位置。遍历结束之后，从 nums[0] 到 nums[slow - 1] 的每个元素均不相同，且包含原数组中的每个不同的元素，因此新的数组长度即为 slow，返回 slow 即可。具体实现步骤如图 2.24 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）初始时双指针指向数组下标为1的位置</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）fast指针向后移动找到非重复元素位置</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）fast位置的值复制到slow位置，并移动slow指针</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）遍历数组，返回数组新长度 $ s_{low}=5 $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图2.24 LeetCode 26 具体实现步骤</div> </div>

【算法步骤】

① 判断数组长度是否为 0，如果是则返回 0。

②定义 fast 和 slow 指针，初始时二者均指向数组下标为 1 的位置。

③ fast 从 1 到 numsSize - 1 依次遍历数组，循环执行以下操作：如果 nums[fast] ≠ nums[fast - 1]，则将 nums[fast] 的值复制到 nums[slow]，然后将 slow 的值加 1。

④ 返回数组的新长度 slow。

【算法描述】

int removeDuplicates(int* nums, int numsSize)
{
 // 删除升序数组 nums 中的重复元素
 if (numsSize==0) // 数组长度为0
 return 0;
 int fast=1, slow=1; // 初始化快、慢两个指针
 while (fast<numsSize) // fast依次遍历从1到numsSize-1的每个位置
 {
 if (nums[fast]!=nums[fast-1]) // fast找到非重复元素的位置
 {
 nums[slow]=nums[fast]; // 将 nums[fast] 的值复制到 nums[slow]
 ++slow; // slow的值加1
 }
 ++fast;
 }
}

##### 【算法分析】

由于需要使用快、慢指针遍历整个输入数组，因此时间复杂度为  $ O(n) $；由于双指针方法删除升序数组中的重复元素只需复写原数组空间，而不需要额外空间，因此空间复杂度为  $ O(1) $。

##### 【问题描述】

给定一个链表，旋转链表，将链表每个结点向右移动 k 个位置，其中 k 为非负数。

【输入输出示例】

输入：head = [1, 2, 3, 4, 5]，k = 2

输出：[4,5,1,2,3]

链表旋转过程如图2.25所示。

<div style="text-align: center;"><div style="text-align: center;">图2.25 链表旋转过程</div> </div>

##### 【问题分析】

记给定链表的长度为 $n$，由于每移动 $n$ 次链表会变为原状，因此当向右移动的次数 $k \geq n$ 时，链表只需向右移动 $k\%n$ 次，旋转后链表的尾结点为原链表的第 $n-(k\%n)$ 个结点。根据以上描述，首先将链表尾结点指针域指向首元结点，使给定的链表闭合成环；然后计算旋转后链表的尾结点的位置，并将环形链表断开，返回旋转后的链表。具体实现步骤如图 2.26 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）链表初始状态（k=2）</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）链表闭合成环</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）在尾结点位置将环形链表断开</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(d) 旋转后链表</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图2.26 LeetCode 61 具体实现步骤</div> </div>

##### 【算法步骤】

①若链表长度不大于1，或k=0，可直接返回原链表。

②统计链表结点个数 n，并将指针 tail 指向链表尾结点。

③计算链表实际需要向右移动次数 $ \text{movenum} $。
④若 k 为 n 的整数倍，返回原链表。
⑤若 k 不是 n 的整数倍，则将链表尾结点指针域指向首元结点，使链表闭合成环。
⑥确定旋转后链表的尾结点，在环形链表第  $ \text{addnum} $ ( $ n $-movenum) 个结点位置将链表断开。
⑦返回旋转后的链表  $ \text{newhead} $。

【算法描述】

struct ListNode* rotateRight(struct ListNode* head, int k)
{
 // 将链表的每个结点向右移动 k 个位置
 if (k == 0 || head == NULL || head->next == NULL)
 return head;
 // 如果链表长度不大于 1，或 k=0，返回原链表
 int n = 1;
 struct ListNode* tail = head;
 while (tail->next != NULL)
 {
 tail = tail->next;
 n++;
 }
 int movenum = k%n;
 if (movenum == 0)
 return head;
 tail->next = head;
 int addnum = n-movenum;
 while (addnum--)
 tail = tail->next;
 struct ListNode* newhead = tail->next;
 tail->next = NULL;
 return newhead;
}

【算法分析】

最坏情况下，需要遍历原链表两次，因此时间复杂度为  $ O(n) $；算法不需要额外空间，因此空间复杂度为  $ O(1) $。

【算法练习题2.3】LeetCode 86 分隔链表★

【问题描述】

给定一个链表和特定值 x，对链表进行分隔，使得所有小于 x 的结点都出现在大于或等于 x 的结点之前，并保留以 x 为界的左右两个区域中结点的初始相对位置。

【输入输出示例】

输入：head = [1, 4, 3, 2, 5, 2]，x = 3

输出：[1,2,2,4,3,5]

链表分隔过程如图2.27所示。

<div style="text-align: center;"><div style="text-align: center;">图2.27 链表分隔过程</div> </div>

##### 【问题分析】

本题可以另外设置 small 和 large 两个带头结点的链表，分别用来存储原链表中小于 x 的结点和大于或等于 x 的结点。首先遍历原链表，判断当前结点的值是否小于 x，若是，则使用后插法将其插入链表 small，否则插入链表 large。由于 small 和 large 两个链表中的结点复用了原链表的结点，而链表 large 尾结点的指针域可能指向一个小于 x 的结点，因此遍历原链表之后需要将链表 large 尾结点的指针域置空。最后将链表 small 尾结点的指针域指向链表 large 的首元结点，返回分隔后的链表即可。具体实现步骤如图 2.28 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）链表初始状态（x=3）</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）分隔并重新拼接的新链表</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图2.28 LeetCode 86具体实现步骤</div> </div>

##### 【算法步骤】

① 定义 small 和 large 两个指针，分别指向新生成的两个链表的头结点。

② 指针 pa、pb 和 pc 初始化，pa 指向原链表的首元结点，pb 和 pc 分别指向 small 和 large 的头结点。

③遍历原链表，并循环执行以下操作：

若 pa 所指结点的值小于 x，则将其插入链表 small，并将 pb 指向新插入结点；

若 pa 所指结点的值大于或等于 x，则将其插入链表 large，并将 pc 指向新插入结点；

pa 指向下一个结点。

④将pc的指针域置空。

⑤将 pb 的指针域指向 large 链表的首元结点。

⑥ 将 newhead 指向链表 small 的首元结点，并返回分隔后的链表 newhead。

【算法描述】

struct ListNode* partition(struct ListNode* head, int x)
{
 //以特定值x为界对链表进行分隔
 struct ListNode* small=(struct ListNode*)malloc(sizeof(struct ListNode));
 struct ListNode*large=(struct ListNode*)malloc(sizeof(struct ListNode));
 struct ListNode*pa=head;
 struct ListNode*pb=small;
 struct ListNode*pc=large;
 while (pa != NULL)
 {
 if (pa->val < x) // 当前结点的值小于x，将其插入small
 {

{
 pb->next = pa;
 pb = pb->next;
}
else
{
 pc->next = pa;
 pc = pc->next;
}
pa = pa->next;
}
pc->next = NULL;
pb->next = large->next; // 链表拼接
struct ListNode* newhead = small->next;
return newhead;
}

##### 【算法分析】

由于需要对链表进行一次遍历，因此时间复杂度为  $ O(n) $；算法不需要额外空间，因此空间复杂度为  $ O(1) $。

##### 【问题描述】

给定一个链表，判断链表中是否有环。如果有环，则返回链表开始入环的第一个结点，否则返回 NULL。

##### 【输入输出示例】

输入：head = [3, 2, 0, -4]，pos = 1。

为了表示给定链表中的环，使用整数 pos 来表示链表尾结节链接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则该链表中没有环。注意：pos 不作为参数进行传递，仅用于标识链表的实际情况。该链表输入如图 2.29 所示。

<div style="text-align: center;"><div style="text-align: center;">图2.29 链表输入示例</div> </div>

输出：索引为1的链表结点

解释：链表中有一个环，其尾部链接到第二个结点。

##### 【问题分析】

本题可以利用双指针的方法判断链表中是否有环。首先定义两个指针 fast 和 slow，分别为快指针和慢指针，初始时两个指针均指向链表首元结点。之后，fast 每次向后移动两个位置，slow 每次向后移动一个位置，如果链表中存在环，则 fast 最终将与 slow 在环中相遇。如图 2.30 所示，设置链表中环外部分的长度为 a，slow 入环后，又移动长度为 b 的距离与 fast 相遇，此时，fast 已经绕环移动 n 圈。假设 fast 移动的总距离为 S，则  $ S = a + n(b + c) + b $。其中，c 为环内剩余长度。由于任意时刻，fast 移动的距离为 slow 的 2 倍，因此  $ S = 2(a + b) $。推导可得  $ a = c + (n - 1)(b + c) $，即链表头与入环点间的距离恰好等于

相遇点与入环点间的距离加上 n-1 圈环长。根据上述关系，在 fast 和 slow 相遇后设置一个额外指针 p，初始时指向链表首元结点，随后，p 和 slow 每次向后移动一个位置。最终，p 和 slow 在入环点相遇，返回 p 即可。返回链表开始入环的第一个结点 5 的具体实现步骤如图 2.31 所示。

<div style="text-align: center;"><div style="text-align: center;">图2.30 链表各部分长度</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（a）初始时快、慢指针位置（pos=3）</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）快、慢指针移动一次</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）环内相遇</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）设置指针p指向首元结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（e）返回入环结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图2.31 LeetCode 142具体实现步骤</div> </div>

##### 【算法步骤】

① 定义指针 fast 和 slow，初始时二者均指向链表首元结点。

②当 fast 所指结点为空时，返回 NULL，否则循环执行以下操作。

如果 fast 的后继结点为空，返回 NULL。

slow 每次向后移动一个位置，fast 每次向后移动两个位置。

如果 fast 和 slow 相遇，定义 p 指针，初始时指向链表首元结点，循环执行以下操作：p 和 slow 每次均向后移动一个位置，最终在入环的第一个结点处相遇，返回入环的第一个结点 p。

【算法描述】

struct ListNode* detectCycle(struct ListNode* head)
{
 // 判断链表中是否有环，若有，则返回入环的第一个结点
 struct ListNode *slow = head, *fast = head; // 初始化fast和slow两个指针
 while (fast != NULL)
 {
 if (fast->next == NULL)
 return NULL;
 slow = slow->next;
 fast = fast->next->next;
 if (fast == slow)
 {
 struct ListNode* p = head; // 指针p指向链表首元结点
 while (p != slow)
 {
 p = p->next;
 slow = slow->next;
 }
 return p;
 }
 }
 return NULL;
}

##### 【算法分析】

在最初判断快、慢指针是否相遇时，slow指针走过的距离不会超过链表的总长度，随后寻找入环点时，走过的距离也不会超过链表的总长度，因此时间复杂度为 $ O(n) $；算法不需要额外空间，空间复杂度为 $ O(1) $。

【算法练习题2.5】LeetCode 25 k个一组翻转链表★★

【问题描述】

给定一个链表，每 k 个结点一组进行翻转，返回修改后的链表。

【输入输出示例】

输入：head = [1, 2, 3, 4, 5]，k = 2

输出：[2,1,4,3,5]

翻转过程如图2.32所示。

<div style="text-align: center;"><div style="text-align: center;">图2.32 链表翻转过程</div> </div>

##### 【问题分析】

记给定链表的长度为  $ n $，首先设置一个带头结点的链表  $ s $ 和指针  $ \text{cur} $，并将  $ \text{cur} $ 指向  $ s $ 的头结点；然后将链表结点按照  $ k $ 个一组进行分组，可以得到有  $ \lfloor n/k \rfloor $ 个分组需要进行翻转；对每个分组进行翻转，并使用后插法将翻转后的各个分组插入  $ s $；然后将  $ \text{cur} $ 指向翻转部分链表的尾结点位置，为下一组翻转做准备；将不需要进行翻转的部分直接插入翻转部分链表尾部；最后返回翻转后的链表。具体实现步骤如图 2.33 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）链表初始状态（k=2）</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）翻转第1个分组并插入</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）翻转第2个分组并插入</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）翻转后链表</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 2.33 LeetCode 25 具体实现步骤</div> </div>

① 定义 s 指针，指向新生成的链表的头结点。

【算法步骤】

②定义 cur 指针，将 cur 指向 s。

③定义 slow、fast 和 prev 指针，并将 slow 指向原链表首元结点，fast 和 prev 置空。

④统计链表结点个数 n，并计算需要进行翻转的组数  $ [n/k] $。

⑤针对需要翻转的各组结点循环执行以下操作：

slow 指向当前结点，fast 指向 slow 的后继结点，然后将 slow 的指针域指向前驱结点 prev，实现组内结点的翻转；

使用后插法将翻转后的各组结点插入 s；

cur 指向翻转部分链表尾部。

⑥ 将不需要进行翻转的部分直接插入到链表尾部，即 cur 的指针域指向此部分的第一个结点。

⑦将 newhead 指向链表 s 的首元结点，并返回翻转后的链表 newhead。

【算法描述】

struct ListNode* reverseKGroup(struct ListNode* head, int k)
{
 //k个一组对链表进行翻转
 int x=k;
 int n=0;
 struct ListNode* s = (struct ListNode*)malloc(sizeof(struct ListNode));
 struct ListNode* cur=s;
 //定义cur，指向S
 struct ListNode* slow=head;

struct ListNode* fast=NULL;
struct ListNode* prev=NULL;
while(slow) // 统计链表结点
{
 n++;
 slow=slow->next;
}
slow=head;
n/=k; // 需进行翻转的组数
for(int i=0;i<n;i++)
{
 while(x)
 {
 fast=slow->next;
 slow->next=prev;
 prev=slow;
 slow=fast;
 x--;
 }
 cur->next=prev;
 while(cur->next) // 向前移动，为下一组翻转做准备
 cur=cur->next;
 prev=NULL; // prev置空，保证下一次cur向前走不会死循环
 x=k;
}
cur->next=slow; // 链接没有被翻转的部分
struct ListNode* newhead = s->next;
return newhead;

【算法分析】

cur 指针会在  $ O(\left\lfloor \frac{n}{k} \right\rfloor) $ 个结点上停留，每次停留需要进行一次时间复杂度为  $ O(k) $ 的翻转操作，因此时间复杂度为  $ O(n) $；算法不需要额外空间，因此空间复杂度为  $ O(1) $。

## 2.10 小结

线性表是整个数据结构课程的重要基础，本章主要内容如下。

（1）线性表的逻辑结构特性是指数据元素之间存在着线性关系，在计算机中表示这种关系的两类不同的存储结构是顺序存储结构（顺序表）和链式存储结构（链表）。

（2）对于顺序表，元素存储的相邻位置反映出其逻辑上的线性关系，可借助数组来表示。给定数组的下标，便可以存取相应的元素，可称为随机存取结构。而对于链表，其是依靠指针来反映其线性逻辑关系的，链表结点的存取都要从头指针开始，顺链而行，所以不属于随机存取结构，可称之为顺序存取结构。不同的特点使得顺序表和链表有不同的适用情况，表2.2分别从空间、时间和适用情况3个方面对二者进行了比较。

<div style="text-align: center;"><div style="text-align: center;">表2.2 顺序表和链表的比较</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2" colspan="2">比较项目</td><td colspan="2">存储结构</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>顺序表</td><td style='text-align: center; word-wrap: break-word;'>链表</td></tr><tr><td rowspan="2">空间</td><td style='text-align: center; word-wrap: break-word;'>存储空间</td><td style='text-align: center; word-wrap: break-word;'>预先分配，会出现空间闲置或溢出现象</td><td style='text-align: center; word-wrap: break-word;'>动态分配，不会出现存储空间闲置或溢出现象</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>存储密度</td><td style='text-align: center; word-wrap: break-word;'>不用为表示结点间的逻辑关系而增加额外的存储开销，存储密度等于 1</td><td style='text-align: center; word-wrap: break-word;'>需要借助指针来体现元素间的逻辑关系，存储密度小于 1</td></tr><tr><td rowspan="2">时间</td><td style='text-align: center; word-wrap: break-word;'>存取元素</td><td style='text-align: center; word-wrap: break-word;'>随机存取，按位置访问元素的时间复杂度为  $ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>顺序存取，按位置访问元素时间复杂度为  $ O(n) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>插入、删除</td><td style='text-align: center; word-wrap: break-word;'>平均移动约表中一半元素，时间复杂度为  $ O(n) $</td><td style='text-align: center; word-wrap: break-word;'>不需移动元素，确定插入、删除位置后，时间复杂度为  $ O(1) $</td></tr><tr><td colspan="2">适用情况</td><td style='text-align: center; word-wrap: break-word;'>① 表长变化不大，且能事先确定变化的范围\n② 很少进行插入或删除操作，经常按元素位置序号访问数据元素</td><td style='text-align: center; word-wrap: break-word;'>① 长度变化较大\n② 频繁进行插入或删除操作</td></tr></table>

（3）对于链表，除了常用的单链表外，在本章还讨论了两种不同形式的链表，即循环链表和双向链表，它们有不同的应用场合。表2.3对三者的几项有差别的基本操作进行了比较。

<div style="text-align: center;"><div style="text-align: center;">表2.3 单链表、循环链表和双向链表的比较</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">链表名称</td><td colspan="3">操作名称</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>查找首元结点</td><td style='text-align: center; word-wrap: break-word;'>查找表尾结点</td><td style='text-align: center; word-wrap: break-word;'>查找结点*p的前驱结点</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>带头结点的单链表 L</td><td style='text-align: center; word-wrap: break-word;'>L-&gt;next时间复杂度 O(1)</td><td style='text-align: center; word-wrap: break-word;'>从 L-&gt;next 依次向后遍历时间复杂度  $ O(n) $</td><td style='text-align: center; word-wrap: break-word;'>通过 p-&gt;next 无法找到其前驱</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>带头结点仅设头指针 L 的循环单链表</td><td style='text-align: center; word-wrap: break-word;'>L-&gt;next时间复杂度  $ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>从 L-&gt;next 依次向后遍历时间复杂度  $ O(n) $</td><td style='text-align: center; word-wrap: break-word;'>通过 p-&gt;next 可以找到其前驱时间复杂度  $ O(n) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>带头结点仅设尾指针 R 的循环单链表</td><td style='text-align: center; word-wrap: break-word;'>R-&gt;next-&gt;next时间复杂度  $ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>R时间复杂度  $ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>通过 p-&gt;next 可以找到其前驱时间复杂度  $ O(n) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>带头结点的双向循环链表 L</td><td style='text-align: center; word-wrap: break-word;'>L-&gt;next时间复杂度  $ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>L-&gt;prior时间复杂度  $ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>p-&gt;prior时间复杂度  $ O(1) $</td></tr></table>

学习完本章后，读者应熟练掌握顺序表和链表的查找、插入和删除算法，链表的创建算法，并能够设计出线性表应用的常用算法，比如线性表的合并等；能够从时间和空间复杂度的角度比较两种存储结构的不同特点及其适用场合，明确它们各自的优缺点。

## 1. 选择题

（1）顺序表中第一个元素的存储地址是100，每个元素的长度为2，则第5个元素的地址是()。

A. 110 B. 108 C. 100 D. 120

（2）在含 n 个结点的顺序表中，算法的时间复杂度是  $ O(1) $ 的操作是（）。

A. 访问第 i 个结点（ $ 1 \leq i \leq n $）和求第 i 个结点的直接前驱（ $ 2 \leq i \leq n $））

B. 在第i个结点后插入一个新结点（ $ 1 \leq i \leq n $）

C. 删除第i个结点（ $ 1 \leq i \leq n $）

D. 将 n 个结点从小到大排序

（3）在一个有127个元素的顺序表中插入一个新元素并保持原来顺序不变，平均要移动的元素个数为( )。

A. 8 B. 63.5 C. 63 D. 7

（4）链接存储的存储结构所占存储空间（）。

A. 分为两部分，一部分存放结点值，另一部分存放表示结点间关系的指针

B. 只有一部分，存放结点值

C. 只有一部分，存储表示结点间关系的指针

D. 分为两部分，一部分存放结点值，另一部分存放结点所占单元数

（5）线性表若采用链式存储结构，要求内存中可用存储单元的地址（）。

A. 必须是连续的

B. 部分地址必须是连续的

C. 一定是不连续的

D. 连续或不连续都可以

（6）线性表L在（）情况下适用于使用链式结构实现。

A. 需经常修改 L 中的结点值

B. 需不断对 L 进行删除、插入

C. L 中含有大量的结点

D. L 中结点结构复杂

（7）单链表的存储密度（）。

A. 大于1

B. 等于1

C. 小于1

D. 不能确定

（8）将两个各有 n 个元素的有序表归并成一个有序表，其最少的比较次数是（）。

A. n B. 2n-1 C. 2n D. n-1

（9）在一个长度为 n 的顺序表中，在第 i 个元素（ $ 1 \leq i \leq n+1 $）之前插入一个新元素时需向后移动（）个元素。

A. n-i B. n-i+1 C. n-i-1 D. i

（10）线性表  $ L=(a_{1},a_{2},\cdots,a_{n}) $，下列陈述正确的是（）。

A. 每个元素都有一个直接前驱和一个直接后继

B．线性表中至少有一个元素

C．表中诸元素的排列必须是由小到大或由大到小的

D．除第一个和最后一个元素外，其余每个元素都有一个且仅有一个直接前驱和直接后继

（11）创建一个包括n个结点的有序单链表的时间复杂度是（）。

A. O(1) B. O(n) C.  $ O(n^{2}) $ D.  $ O(n \log_{2} n) $

（12）以下陈述错误的是（）。

A. 求表长、定位这两种运算在采用顺序存储结构时实现的效率不比采用链式存储结构时实现的效率低

B. 顺序存储的线性表可以随机存取

C. 由于顺序存储要求连续的存储区域，因此在存储管理上不够灵活

D. 线性表的链式存储结构优于顺序存储结构

（13）在单链表中，要将 s 所指结点插入 p 所指结点之后，其语句应为（）。

A. s->next = p + 1; p->next = s;

B. (*p).next = s; (*s).next = (*p).next;

C. s->next = p->next; p->next = s->next;

D. s->next = p->next; p->next = s;

（14）在双向链表存储结构中，删除 p 所指结点时修改指针的操作为（）。

A. p->next->prior = p->prior; p->prior->next = p->next;

B. p->next = p ->next ->next; p ->next ->prior = p;

C. p->prior->next = p; p->prior = p ->prior ->prior;

D. p->prior = p ->next ->next; p ->next = p ->prior ->prior;

（15）在双向循环链表中，在 p 指针所指的结点后插入 q 所指向的新结点，其修改指针的操作是（ ）。

A. p->next = q; q->prior = p; p->next->prior = q; q->next = q;

B. p->next = q; p->next->prior = q; q->prior = p; q->next = p->next;

C. q->prior = p; q->next = p->next; p->next->prior = q; p->next = q;

D. q->prior = p; q->next = p->next; p->next = q; p->next->prior = q;

## 2. 算法设计题

（1）将两个递增的有序链表合并为一个递增的有序链表。要求结果链表仍使用原来两个链表的存储空间，不另外占用其他的存储空间。表中不允许有重复的数据。

（2）将两个非递减的有序链表合并为一个非递增的有序链表。要求结果链表仍使用原来两个链表的存储空间，不另外占用其他的存储空间。表中允许有重复的数据。

（3）已知两个链表 A 和 B 分别表示两个集合，其元素递增排列。请设计一个算法，用于求出 A 与 B 的交集，并将结果存放在 A 链表中。

（4）已知两个链表 A 和 B 分别表示两个集合，其元素递增排列。请设计算法求出两个集合 A 和 B 的差集（仅由在 A 中出现而不在 B 中出现的元素所构成的集合），并将结果以同样的形式存储，同时返回该集合的元素个数。

（5）设计算法将一个带头结点的单链表A分解为两个具有相同结构的链表B和C，其中B表的结点为A表中值小于0的结点，而C表的结点为A表中值大于0的结点（链表A中的元素为非零整数，要求B、C表利用A表的结点）。

（6）设计一个算法，通过一趟遍历确定长度为n的单链表中值最大的结点。

（7）设计一个算法，将链表中所有结点的链接方向“原地”逆转，即要求仅利用原表的存储空间，换句话说，要求算法的空间复杂度为 O(1)。

（8）设计一个算法，删除递增有序链表中值大于 mink 且小于 maxk 的所有元素（mink 和 maxk 是给定的两个参数，其值可以和表中的元素相同，也可以不同）。

（9）已知 p 指向双向循环链表中的一个结点，其结点结构为 data、prior、next 这 3 个域，设计算法 change(p)，交换 p 所指向的结点及其前驱结点的顺序。

（10）已知长度为 n 的线性表 A 采用顺序存储结构，请设计一个时间复杂度为  $ O(n) $、空间复杂度为  $ O(1) $ 的算法，该算法可删除线性表中所有值为 item 的数据元素。
