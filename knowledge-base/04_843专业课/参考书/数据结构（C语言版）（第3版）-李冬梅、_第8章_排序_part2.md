# 算法 8.10 相邻两个有序子序列的归并

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


【算法步骤】

设两个有序表存放在同一数组中相邻的位置（R[low..mid] 和 R[mid + 1..high]）上，每次分别从两个表中取出一个记录进行关键字的比较，将较小者放入 T[low..high] 中。重复此过程，直至其中一个表为空，最后将另一非空表中余下的部分直接复制到 T 中。

相邻两个有序子序列的归并

【算法描述】

void Merge(RedType R[], RedType T[], int low, int mid, int high)
{
 // 将有序表R[low..mid]和R[mid+1..high]归并为有序表T[low..high]
 i=low; j=mid+1; k=low;
 while(i<=mid&j<=high) // 将R中的记录由小到大地并入T中
 {
 if(R[i].key<=R[j].key) T[k++]=R[i++];
 }
}

else T[k++]=R[j++];
}
while(i<=mid) T[k++]=R[i++]; //while
while(j<=high) T[k++]=R[j++]; //将剩余的R[i..mid]复制到T中
//将剩余的R[j..high]复制到T中

假设每个子序列的长度为 $h$，则一趟归并排序需调用 $\left\lceil n/2h \right\rceil$ 次算法 merge 进行两两归并，得到前后相邻、长度为 $2h$ 的有序段，整个归并排序需进行 $\left\lceil \log_2 n \right\rceil$ 趟。

与快速排序类似，2-路归并排序也可以利用划分为子序列的方法递归实现。首先把整个待排序序列划分为两个长度大致相等的子序列，对这两个子序列分别递归地进行排序，然后把它们归并。

## 【算法步骤】

2- 路归并排序将 R[low..high] 中的记录归并排序后放入 T[low..high] 中。当序列长度等于 1 时，递归结束，否则：

① 将当前序列一分为二，求出分裂点 mid = ⌊(low + high)/2⌋；

②对子序列R[low..mid]递归进行归并排序，结果放入S[low..mid]中；

③递归，进行归并排序，结果放入S[mid+1..high]中；

④ 调用算法 Merge，将有序的两个子序列 S[low..mid] 和 S[mid + 1..high] 归并为一个有序的序列 T[low..high]。

归并排序

【算法描述】

void MSort(RedType R[], RedType T[], int low, int high)
{
 // R[low..high] 归并排序后放入T[low..high] 中
 if (low == high) T[low] = R[low];
 else
 {
 mid = (low + high) / 2; // 将当前序列一分为二，求出分裂点mid
 S = new RedType[MAXSIZE];
 MSort(R, S, low, mid); // 对子序列R[low..mid] 递归进行归并排序，结果放入S[low..mid]
 MSort(R, S, mid + 1, high);
 // 对子序列R[mid + 1..high] 递归进行归并排序，结果放入S[mid + 1..high]
 Merge(S, T, low, mid, high); // 将S[low..mid] 和S[mid + 1..high] 归并到T[low..high]
 }
}

void MergeSort(SqList &L)
{
 // 对顺序表L进行归并排序
 MSort(L, r, L, r, 1, L, length);
}

### （1）时间复杂度

当有 $n$ 个记录时，需进行 $\left[\log_2 n\right]$ 趟归并排序，每一趟归并的关键字比较次数不超过 $n$，元素移动次数都是 $n$，因此，归并排序的时间复杂度为 $O(n\log_2 n)$。

#### （2）空间复杂度

用顺序表实现归并排序时，需要和待排序记录个数相等的辅助存储空间，所以空间复杂度为  $ O(n) $。

【算法特点】

（1）是稳定排序。

（2）可用于链式结构，且不需要附加存储空间，但递归实现时仍需要开辟相应的递归工作栈。

## 8.6 基数排序

前述各类排序方法都建立在关键字比较的基础上，而分配类排序不需要比较关键字的大小，它是根据关键字中各位的值，通过对待排序记录进行若干趟“分配”与“收集”来实现排序的，是一种借助于多关键字排序的思想对单关键字进行排序的方法。基数排序（Radix Sorting）是典型的分配类排序。

### 8.6.1 多关键字的排序

先看一个具体例子。

已知扑克牌中52张牌面的次序关系为

 $$ \begin{array}{l} \text{♣}2<\text{♣}3<\text{⋯}<\text{♣}A<\text{♦}2<\text{♦}3<\text{⋯}<A<\text{♥}2<\text{♥}3<\text{⋯}<A<\text{♠}2<\text{♠}3<\text{⋯}<\text{♠}A \end{array} $$

每一张牌有两个“关键字”：花色（♣＜♦＜♥＜♠）和面值（2<3<⋯<A），且花色的地位高于面值。在比较任意两张牌面的大小时，必须先比较花色，若花色相同，则再比较面值。

由此，将扑克牌整理成如上所述次序关系时，有以下两种排序法。

（1）最高位优先法：先按不同花色分成有次序的4堆牌，每堆牌均具有相同的花色，然后分别对每堆牌按面值大小整理排序。

（2）最低位优先法：这是一种分配与收集交替进行的方法。先按不同面值将牌分成13堆，然后将这13堆牌自小至大叠在一起（“3”在“2”之上，“4”在“3”之上，……，最上面的是4张“A”），再将每堆按照面值的次序收集到一起。接着重新对这些牌按不同花色分成4堆，最后将这4堆牌按花色的次序再收集到一起（♣在最下面，♠在最上面），此时同样得到一副满足如上次序关系的牌，如图8.14所示。

#### 8.6.2 链式基数排序

基数排序的思想类似于上述最低位优先法的洗牌过程，是借助分配和收集两种操作对单逻辑关键字进行排序的一种内部排序方法。有的逻辑关键字可以看成由若干个关键字复合而成。例如，若关键字是数值，且其值都为  $ 0 \leq K \leq 999 $，则可把每一个十进制数字看成一个关键字，即可认为 K 由 3 个关键字  $ (K^{0}, K^{1}, K^{2}) $ 组成，其中  $ K^{0} $ 是百位数， $ K^{1} $ 是十位数， $ K^{2} $ 是个位数；又若关键字 K 是由 5 个字母组成的单词，则可看

<div style="text-align: center;"><div style="text-align: center;">图8.14 扑克牌的一种洗牌过程</div> </div>

成由 5 个关键字  $ (K^0, K^1, K^2, K^3, K^4) $ 组成，其中  $ K^{j-1} $ 是（自左至右的）第  $ j $ 个字母。由于如此分解而得的每个关键字  $ K^j $ 都在相同的范围内（对数字， $ 0 \leq K^j \leq 9 $；对字母， $ ^{\prime}A' \leq K^j \leq 'Z' $），故可以按照分配和收集的方法进行排序。

假设记录的逻辑关键字由 d 个关键字组成，每个关键字可能取 rd 个值。只要从最低数位关键字起，按关键字的不同值将序列中记录分配到 rd 个队列中后再收集，如此重复 d 次完成排序。按这种方法实现排序称之为基数排序，其中“基”指的是 rd 的取值范围，在上述两种关键字的情况下，rd 分别为 10 和 26。

具体实现时，一般采用链式基数排序。

先看一个具体例子。首先以链表存储 n 个待排记录，并令表头指针指向第一个记录，如图 8.15（a）所示，然后通过以下 3 趟分配和收集操作来完成排序。

第一趟分配对最低数位关键字（个位数）进行，改变记录的指针值将链表中的记录分配至10个链队列中，每个队列中记录的关键字的个位数相等，如图8.15（b）所示，其中f[i]和e[i]分别为第i个队列的头指针和尾指针；第一趟收集是改变所有非空队列的队尾记录的指针域，令其指向下一个非空队列的队头记录，重新将10个队列中的记录链成一个链表，如图8.15（c）所示。

第二趟分配和第二趟收集是对十位数进行的，其过程第一趟的类似。分配和收集结果分别如图 8.15（d）和图 8.15（e）所示。

第三趟分配和第三趟收集是对百位数进行的，过程与第一趟和第二趟的类似，分配和收集结果分别如图 8.15（f）和图 8.15（g）所示。至此排序完毕。

<div style="text-align: center;"><div style="text-align: center;">(a) 初始状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 第一趟分配之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）第一趟收集之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）第二趟分配之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 8.15 链式基数排序过程</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（e）第二趟收集之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（Ⅰ）第三趟分配之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（g）第三趟收集之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.15 链式基数排序过程（续）</div> </div>

算法实现时采用静态链表，以便于更有效地存储和重排记录。相关数据类型的定义如下：

#define MAXNUM_KEY 8 // 关键字项数的最大值
#define RADIX 10 // 关键字基数，此时基数是十进制整数
#define MAX_SPACE 10000
typedef struct
{
 KeyType keys[MAXNUM_KEY]; // 关键字
 InfoType otheritems; // 其他数据项
 int next;
}SLCell; // 静态链表的结点类型
typedef struct
{
 SLCell r[MAX_SPACE]; // 静态链表的可利用空间，r[0]为头结点
 int keynum; // 记录的当前关键字个数
 int recnum; // 静态链表的当前长度
}SLList; // 静态链表类型
typedef int ArrType[RADIX] // 数组类型

##### 【算法描述】

void Distribute(SLCell &r, int i, ArrType &f, ArrType &e)
{
 // 静态链表L的r域中记录已按(keys[0], ..., keys[i-1])有序
 // 本算法按第i个关键字keys[i]建立RADIX个子表，使同一子表中记录的keys[i]相同
 // f[0..RADIX-1] 和 e[0..RADIX-1] 分别指向各子表中第一个和最后一个记录
 for (j=0; j<RADIX; ++j) f[j]=0; // 各子表初始化为空表
 for (p=r[0].next; p; p=r[p].next)
 {
 j=ord(r[p].keys[i]); // ord将记录中第i个关键字映射到[0..RADIX-1]
 if(!f[j]) f[j]=p;
 else r[e[j]].next=p;
 e[j]=p; // 将p所指的结点插入第j个子表中
 }
}

基数排序

void Collect(SLCell &r, int i, ArrType f, ArrType e)
{
 // 本算法按 keys[i] 自小至大地将 f[0..RADIX-1] 所指各子表依次链接成一个链表
 // e[0..RADIX-1] 为各子表的尾指针
 for (j=0; !f[j]; j=succ(j)); // 找第一个非空子表，succ() 为求后继函数
 r[0].next = f[j]; t = e[j]; // r[0].next 指向第一个非空子表中第一个结点
 while (j < RADIX)
 {
 for (j = succ(j); j < RADIX - 1 && !f[j]; j = succ(j)); // 找下一个非空子表
 if (f[j]) { r[t].next = f[j]; t = e[j]; } // 链接两个非空子表
 }
 r[t].next = 0; // t 指向最后一个非空子表中最后一个结点
}

void RadixSort(SList &L)
{
 // L 是采用静态链表表示的顺序表
 // 对 L 进行基数排序，使得 L 成为按关键字自小到大的有序静态链表，L.r[0] 为头结点
 for (i=0; i<L.recnum; ++i) L.r[i].next = i + 1;
 L.r[L.recnum].next = 0; // 将 L 改造为静态链表
 for (i=0; i<L.keynum; ++i) // 按最低位优先依次对各关键字进行分配和收集
 {
 Distribute(L.r, i, f, e); // 第 i 趟分配
 Collect(L.r, i, f, e); // 第 i 趟收集
 }
}

##### （1）时间复杂度

对于 n 个记录（假设每个记录含 d 个关键字，每个关键字的取值范围为 rd 个值）进行链式基数排序时，每一趟分配的时间复杂度为  $ O(n) $，每一趟收集的时间复杂度为  $ O(rd) $，整个排序需进行 d 趟分配和收集，所以时间复杂度为  $ O(d(n + rd)) $。

##### （2）空间复杂度

所需辅助空间为 2nd 个队列指针，另外由于需用链表作为存储结构，则相对于其他以顺序结构存储记录的排序方法而言，链式基数排序还增加了 n 个指针域的空间，所以空间复杂度为  $ O(n + nd) $。

##### 【算法特点】

（1）是稳定排序。

（2）可用于链式结构，也可用于顺序结构。

（3）时间复杂度可以突破基于关键字比较一类方法的下界  $ O(n\log_{2}n) $，达到  $ O(n) $。

（4）基数排序使用条件有严格的要求：需要知道各级关键字的主次关系和各级关键字的取值范围。

## 8.7 外部排序

前面讨论的都是内部排序的方法，即整个排序过程全部是在内存中完成的，并不涉及数据的内外存交换问题。但如果待排序的记录数目很大，无法一次性调入内存，整个排序过程就必须借用外存分批调入内存才能完成。

### 8.7.1 外部排序的基本方法

外部排序基本上由两个相对独立的阶段组成。首先，按可用内存大小，将外存上含 n 个记录的文件分成若干长度为 l 的子文件或段（segment），将其依次读入内存并利用有效的内部排序方法对它们进行排序，并将排序后得到的有序子文件重新写入外存，通常称这些有序子文件为归并段或顺串；然后，对这些归并段进行逐趟归并，使归并段（有序的子文件）逐渐由小至大，直至得到整个有序文件为止。显然，第一阶段所涉及的内部排序的工作在前几节已经讨论过。本节主要讨论第二阶段即归并的过程。先从一个具体例子来看外部排序中的归并是如何进行的。

假设有一个含10 000个记录的文件，首先通过10次内部排序得到10个初始归并段R1～R10，其中每一段都含1 000个记录。然后对它们进行如图8.16所示的两两归并，直至得到一个有序文件为止。

从图 8.16 可见，由 10 个初始归并段到一个有序文件，共进行了 4 趟归并，每一趟从 m 个归并段得到  $ \lceil m/2\rceil $ 个归并段。这种归并方法称为 2-路平衡归并。

<div style="text-align: center;"><div style="text-align: center;">图8.16 2-路平衡归并</div> </div>

将两个有序段归并成一个有序段的过程，若在内存进行，则很简单，算法 8.10 的 merge 过程便可实现此归并。但是，在外部排序中实现两两归并时，不仅要调用 merge 过程，而且要进行对外存的读/写，这是由于我们不可能将两个有序段及归并结果段同时存放在内存中的缘故。我们知道，对外存上信息的读/写是以物理块为单位的。假设在上例中每个物理块可以容纳 200 个记录，则每一趟归并需进行 50 次读和 50 次写，4 趟归并加上内部排序时所需进行的读/写使得在外部排序中总共需进行 500 次读和 500 次写。

一般情况下，

 $$ \begin{aligned} 外部排序所需总的时间 &= 内部排序（产生初始归并段）所需的时间 (m\times t_{IS})+\\&\quad 外存信息读 / 写的时间 (d\times t_{IO})+\\&\quad 内部归并所需的时间 (s\times u t_{mg})\end{aligned} $$

其中， $ t_{IS} $ 为得到一个初始归并段进行内部排序所需时间的均值； $ t_{to} $ 是进行一次外存读 / 写时间的均值； $ ut_{mg} $ 是对 u 个记录进行内部归并所需时间；m 为经过内部排序之后得到的初始归并段的个数；s 为归并的趟数；d 为总的读 / 写次数。由此，上例 10 000 个记录利用 2- 路归并进行外部排序所需总的时间为：

 $$ 10\times t_{IS}+500\times t_{IO}+4\times10\ 000t_{mg} $$

其中， $ t_{IO} $ 取决于所用的外存设备，显然， $ t_{IO} $ 较  $ t_{mg} $ 要大得多。因此，提高外部排序的效率应主要着眼于减少外存信息读/写的次数 d。

下面来分析 d 和归并过程的关系。若对上例中所得的 10 个初始归并段进行 5-路平衡归并（每一趟将 5 个或 5 个以下的有序子文件归并成一个有序子文件），则从图 8.17 可见，仅需进行二趟归并，外部排序时总的读 / 写次数便减至  $ 2 \times 100 + 100 = 300 $，比 2-路归并减少了 200 次读 / 写。

<div style="text-align: center;"><div style="text-align: center;">图8.17 5-路平衡归并</div> </div>

可见，对同一文件而言，进行外部排序时所需读/写外存的次数和归并的趟数 s 成正比。而在一般情况下，对 m 个初始归并段进行 k-路平衡归并时，归并的趟数：

 $$ s=\left\lceil\log_{k} m\right\rceil $$

此时，为了减少归并趟数 s，可以从以下两个方面进行改进：

（1）增加归并段的个数 k；

（2）减少初始归并段的个数 m。

其中，“多路平衡归并”的方法是通过增加归并段的个数来减少对数据的查找趟数的；“置换-选择”的方法通过在查找一遍的前提下得到更长的初始归并段，从而减少初始归并段的个数。

下面分别就这两个方面进行讨论。

#### 8.7.2 多路平衡归并的实现

从式（8-5）得知，增加 k 可以减少 s，从而减少外存读 / 写的次数。但是，从下面的讨论中又可发现，单纯增加 k 将导致内部归并的时间  $ ut_{mg} $ 增加。那么，如何解决这个矛盾呢？

先看 2-路归并。令 u 个记录分布在两个归并段上，按 merge 过程进行归并。每得到归并后的一个记录，仅需一次比较即可，则得到含 u 个记录的归并段需进行 u-1 次比较。

再看 k- 路归并。令 u 个记录分布在 k 个归并段上，显然，归并后的第一个记录应是 k 个归并段中关键字最小的记录，即应从每个归并段的第一个记录的比较中选出最小者，这需要进行 k-1 次比较。同理，每得到归并后的有序段中的一个记录，都要进行 k-1 次比较。显然，为得到含 u 个记录的归并段需进行  $ (u-1)(k-1) $ 次比较。由此，对含有 n 个记录的文件进行外部排序时，在内部归并过程中进行的总的比较次数为  $ s(k-1)(n-1) $。假设所得初始归并段为 m 个，则由式（8-5）可得内部归并过程中进行的总的比较次数为：

 $$ \left\lceil\log_{k}m\right\rceil\left(k-1\right)\left(n-1\right)t_{m g}=\left\lceil\frac{\log_{2}m}{\log_{2}k}\right\rceil\left(k-1\right)\left(n-1\right)t_{m g} $$

由于 $ \frac{k-1}{\log_2 k} $随 $ k $的增长而增长，因此内部归并时间亦随 $ k $的增长而增长。这将抵消由于增大 $ k $而缩短外存信息读/写时间所得效益，这是我们所不希望的。然而，若在进行 $ k $-路归并时利用“败者树”（Tree of Loser），则可使在 $ k $个记录中选出关键字最小的记录仅需进行 $ \lceil \log_2 k \rceil $次比较，从而使总的归并时间由式（8-6）变为 $ \lceil \log_2 m \rceil (n-1) t_{mg} $，显然，这个式子和 $ k $无关，它不再随 $ k $的增长而增长。

那么，什么是“败者树”？它是树形选择排序的一种变形。相对地，我们可称图8.7和图8.8中的二叉树为“胜者树”，因为其每个非终端结点均表示其左、右孩子结点中的“胜者”。反之，若在双亲结点中记下刚进行完的这场“比赛”中的“败者”，而让胜者去参加更高一层的比赛，便可得到一棵败者树。例如，图8.18（a）所示为一棵实现5-路归并的败者树ls[0..4]，图中方形结点表示叶子结点（也可看成外结点），分别为5个归并段中当前参加归并选择的记录的关键字；败者树中根结点ls[1]的双亲结点ls[0]为“冠军”，在此指示各归并段中的最小关键

字记录为第 3 段中的当前记录；结点 ls[3] 指示 b1 和 b2 两个叶子结点中的败者即 b2，而胜者 b1 和 b3（b3 是与 b4 和 b0 经过两场比赛后的胜者）进行比较，结点 ls[1] 则指示它们中的败者为 b1。在选得最小关键字的记录之后，只要修改叶子结点 b3 中的值，使其为同一归并段中的下一个记录的关键字，然后从该结点向上和双亲结点所指的关键字进行比较，败者留在该双亲结点，胜者继续向上，直至树根的双亲。如图 8.18（b）所示，当第 3 个归并段中第 2 个记录参加归并时，选得的最小关键字记录为第 1 个归并段中的记录。为防止在归并过程中某个归并段变空，可以在每个归并段中附加一个关键字为最大值的记录。当选出的“冠军”记录的关键字为最大值时，表明此次归并已完成。由于实现 k- 路归并的败者树的深度为 $ \lceil \log_2 k \rceil + 1 $，因此在 k 个记录中选择最小关键字仅需进行 $ \lceil \log_2 k \rceil $次比较。败者树的初始化也容易实现，只要先令所有的非终端结点指向一个含最小关键字的叶子结点，然后从各个叶子结点出发调整非终端结点为新的败者即可。

<div style="text-align: center;"><div style="text-align: center;">(Ⅱ)</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b)</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.18 实现5-路归并的败者树</div> </div>

最后要提及一点，k 值的选择并非越大越好，如何选择合适的 k 值是一个需要综合考虑的问题。

#### 8.7.3 置换－选择排序

由式（8-5）得知，归并的趟数 $s$ 不仅和 $k$ 成反比，也和 $m$ 成反比，因此，减少 $m$ 是减少 $s$ 的另一条途径。然而，我们从 8.7.1 小节的讨论中也得知，$m$ 是外部文件经过内部排序之后得到的初始归并段的个数，显然，$m = \lceil n/l \rceil$，其中 $n$ 为外部文件中的记录数，$l$ 为初始归并段中的记录数。回顾前面讨论的各种内部排序方法，在内部排序过程中移动记录和对关键字进行比较都是在内存中进行的。因此，用这些方法进行内部排序得到的各个初始归并段的长度 $l$（除最后一段外）都相同，且其完全依赖于进行内部排序时可用内存工作区的大小，$m$ 也随其而限定。由此，若要减小 $m$，即增加 $l$，就必须探索新的排序方法。

置换－选择排序（Replacement-Selection Sorting）是在树形选择排序的基础上得来的，它的特点是：在整个排序（得到所有初始归并段）的过程中，选择最小（或最大）关键字和输入、输出交叉或平行进行。

先从具体例子谈起。已知初始文件含有24个记录，它们的关键字分别为51，49，39，46，38，29，14，61，15，30，1，48，52，3，63，27，4，13，89，24，46，58，33，76。假设内存工作区可容纳6个记录，则按前面讨论的选择排序可求得如下4个初始归并段。

RUN1 : 29, 38, 39, 46, 49, 51

RUN2:1,14,15,30,48,61

RUN3 : 3, 4, 13, 27, 52, 63

RUN4:24,33,46,58,76,89

若按置换 - 选择排序进行排序，则可求得如下 3 个初始归并段。

RUN1 : 29, 38, 39, 46, 49, 51, 61

RUN2 : 1, 3, 14, 15, 27, 30, 48, 52, 63, 89

RUN3 : 4, 13, 24, 33, 46, 58, 76

假设初始待排文件为输入文件 FI，初始归并段文件为输出文件 FO，内存工作区为 WA，FO 和 WA 的初始状态为空，并设内存工作区的容量可容纳 w 个记录，则置换 - 选择排序的操作过程如下。

①从FI输出w个记录到工作区WA。

②从 WA 中选出其中关键字取最小值的记录，记为 MINIMAX 记录。

③将 MINIMAX 记录输入 FO。

④若 FI 不空，则从 FI 输出下一个记录到 WA。

⑤ 从 WA 中所有关键字比 MINIMAX 记录的关键字大的记录中选出最小关键字记录，作为新的 MINIMAX 记录。

⑥ 重复③～⑤，直至 WA 中选不出新的 MINIMAX 记录为止，由此得到一个初始归并段，输入一个归并段的结束标志到 FO。

⑦重复②～⑥，直至 WA 为空。由此得到所有初始归并段。

例如，以上所举之例的置换 - 选择过程如表 8.1 所示。

<div style="text-align: center;"><div style="text-align: center;">表8.1 置换－选择过程</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>FO</td><td style='text-align: center; word-wrap: break-word;'>WA</td><td style='text-align: center; word-wrap: break-word;'>FI</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>空</td><td style='text-align: center; word-wrap: break-word;'>空</td><td style='text-align: center; word-wrap: break-word;'>51,49,39,46,38,29,14,61,15,30,1,48,52,3,63,27,4 $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>空</td><td style='text-align: center; word-wrap: break-word;'>51,49,39,46,38,29</td><td style='text-align: center; word-wrap: break-word;'>14,61,15,30,1,48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29</td><td style='text-align: center; word-wrap: break-word;'>51,49,39,46,38,</td><td style='text-align: center; word-wrap: break-word;'>14,61,15,30,1,48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29</td><td style='text-align: center; word-wrap: break-word;'>51,49,39,46,38,14</td><td style='text-align: center; word-wrap: break-word;'>61,15,30,1,48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38</td><td style='text-align: center; word-wrap: break-word;'>51,49,39,46, ,14</td><td style='text-align: center; word-wrap: break-word;'>61,15,30,1,48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38</td><td style='text-align: center; word-wrap: break-word;'>51,49,39,46,61,14</td><td style='text-align: center; word-wrap: break-word;'>15,30,1,48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39</td><td style='text-align: center; word-wrap: break-word;'>51,49, ,46,61,14</td><td style='text-align: center; word-wrap: break-word;'>15,30,1,48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39</td><td style='text-align: center; word-wrap: break-word;'>51,49,15,46,61,14</td><td style='text-align: center; word-wrap: break-word;'>30,1,48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46</td><td style='text-align: center; word-wrap: break-word;'>51,49,15, ,61,14</td><td style='text-align: center; word-wrap: break-word;'>30,1,48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46</td><td style='text-align: center; word-wrap: break-word;'>51,49,15,30,61,14</td><td style='text-align: center; word-wrap: break-word;'>1,48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46,49</td><td style='text-align: center; word-wrap: break-word;'>51, ,15,30,61,14</td><td style='text-align: center; word-wrap: break-word;'>1,48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46,49</td><td style='text-align: center; word-wrap: break-word;'>51,1,15,30,61,14</td><td style='text-align: center; word-wrap: break-word;'>48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46,49,51</td><td style='text-align: center; word-wrap: break-word;'>,1,15,30,61,14</td><td style='text-align: center; word-wrap: break-word;'>48,52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46,49,51</td><td style='text-align: center; word-wrap: break-word;'>48,1,15,30,61,14</td><td style='text-align: center; word-wrap: break-word;'>52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46,49,51,61</td><td style='text-align: center; word-wrap: break-word;'>48,1,15,30, ,14</td><td style='text-align: center; word-wrap: break-word;'>52,3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46,49,51,61</td><td style='text-align: center; word-wrap: break-word;'>48,1,15,30,52,14</td><td style='text-align: center; word-wrap: break-word;'>3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46,49,51,61, ,*</td><td style='text-align: center; word-wrap: break-word;'>48,1,15,30,52,14</td><td style='text-align: center; word-wrap: break-word;'>3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46,49,51,61, ,1</td><td style='text-align: center; word-wrap: break-word;'>48, ,15,30,52,14</td><td style='text-align: center; word-wrap: break-word;'>3,63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>29,38,39,46,49,51,61, ,*1</td><td style='text-align: center; word-wrap: break-word;'>48,3,15,30,52,14</td><td style='text-align: center; word-wrap: break-word;'>63,27,4, $ \cdots $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>...</td></tr></table>

注：“*”为归并段的结束标志。

在 WA 中选择 MINIMAX 记录的过程需利用 “败者树” 来实现。关于 “败者树” 本身，上节已有详细讨论，在此仅就置换 - 选择排序中的实现细节加以说明。

##### 说明

（1）内存工作区中的记录作为败者树的外部结点，而败者树中根结点的双亲结点指示工作区中关键字最小的记录。

（2）为了便于选出 MINIMAX 记录，为每个记录附设一个所在归并段的序号，在进行关键字的比较时，先比较段号，段号小者为胜者；段号相同的则关键字小的为胜者。

（3）败者树的建立可从设工作区中所有记录的段号均为0开始，然后从FI逐个输入w个记录到工作区时，自上而下调整败者树。由于这些记录的段号为“1”，所以它们对于段号为0的记录而言均为败者，从而逐个填充到败者树的各结点中去。

下面利用败者树对前面例子进行置换 - 选择排序时的局部状况进行说明，如图 8.19 所示。其中，内存工作区的存储结构定义如下：

// - - - - - 内存工作区的存储结构 - - - - -
typedef struct
{
 RedType rec; // 记录
 KeyType key; // 从记录中抽取的关键字
 int rnum; // 所属归并段的段号
}RcdNode,WorkArea[w]; // 内存工作区，容量为w

WorkArea wa;

图 8.19（a）～（g）显示了败者树建立过程中的状态变化状况。最后得到最小关键字的记录为 wa[0]，之后，输出 wa[0].rec，并从 FI 中输出下一个记录至 wa[0]。由于它的关键字小于刚刚输出的记录的关键字，则设此新输入的记录的段号为 2[见图 8.19（h）]，而由于在输出 wa[1]之后新输入的关键字较 wa[1].key 大，则该新输入的记录的段号仍为 1[见图 8.19（i）]。图 8.19（j）所示为在输出 6 个记录之后选得的 MINIMAX 记录为 wa[1] 时的败者树。图 8.19（k）表明在该记录 wa[1] 之后，由于输入的下一条记录的关键字较小，其段号亦为 2，致使工作区中的所有记录的段号均为 2。由此败者树选出的新的 MINIMAX 记录的段号大于当前生成的归并段的序号。这说明该段已结束，而此新的 MINIMAX 记录应是下一归并段中的第一个记录。

从上述可见，由置换-选择排序所得初始归并段的长度不等。且可证明，当输入文件中记录的关键字为随机数时，所得初始归并段的平均长度为内存工作区大小w的两倍。这个证明是E.F.摩尔（E.F.Moore）在1961年从置换-选择排序和扫雪机的类比中得出的。

假设一台扫雪机在环形路上等速进行扫雪，下雪的速度也是均衡的（每小时落到地面上的雪量相等），雪均匀地落在扫雪机的前、后路面上，边下雪边扫雪。显然，在某个时刻之后，整个系统达到平衡状态，路面上的积雪总量不变。且在任何时刻，整个路面上的积雪都形成一个均匀的斜面，紧靠扫雪机前端的积雪最厚，其深度为 h，而在扫雪机刚扫过的路面上的积雪深度为 0。若将环形路伸展开来，路面积雪状态如图 8.20 所示。假设此刻路面积雪的总体积为 w，环形路一圈的长度为 l，由于扫雪机在任何时刻扫走的雪的深度为 h，则扫雪机在环形路上走一圈扫掉的积雪体积为 lh，即 2w。

<div style="text-align: center;"><div style="text-align: center;">图8.19 置换－选择过程中的败者树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">注：图8.19（a）～（g）建立败者树，选出最小关键字记录wa[0]，图8.19（h）～（k）选好新的MINIMAX记录</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.20 环形路上路面积雪状态</div> </div>

将置换 - 选择排序与此类比，工作区中的记录好比路面的积雪，输出的 MINIMAX 记录好比扫走的雪，新输入的记录好比新下的雪，当关键字为随机数时，新记录的关键字比 MINIMAX 大或小的概率相等。若大，则该关键字属当前归并段（好比落在扫雪机前面的积雪，在这一圈中将被扫走）；若小，则该关键字属下一归并段（好比落在扫雪机后面的积雪，在下一圈中才能被扫走）。由此，得到一个初始归并段好比扫雪机走一圈。假设工作区的容量为 w，则

置换 - 选择所得初始归并段长度的期望值便为 2w。

容易看出，若不计输入、输出的时间，则对 n 个记录的文件而言，生成所有初始归并段所需时间为  $ O(n \log_{2} w) $。

#### 8.7.4 最佳归并树

这一节要讨论的问题是，由置换 - 选择生成所得的初始归并段，其各段长度不等对平衡归并有何影响？

假设由置换 - 选择得到 9 个初始归并段，其长度（记录数）依次为 9、30、12、18、3、17、2、6、24。现对其进行 3- 路平衡归并，其归并树（表示归并过程的图）如图 8.21 所示，图中每个圆圈表示一个初始归并段，圆圈中数字表示归并段的长度。假设每个记录

<div style="text-align: center;"><div style="text-align: center;">图8.21 3-路平衡归并的归并树</div> </div>

占一个物理块，则两趟归并所需对外存进行读/写的次数为

 $$ \left(9+30+12+18+3+17+2+6+24\right)\times2\times2=484 $$

若将初始归并段的长度看成归并树中叶子结点的权，则此3叉树的带权路径长度的两倍恰为484。显然，归并方案不同，树的带权路径长度（或外存读/写次数）亦不同。在第5章中曾讨论了有n个叶子结点的带权路径长度最短的二叉树称哈夫曼树，同理，存在有n个叶子结点的带权路径长度最短的3叉、4叉、...、k叉树，亦称哈夫曼树。因此，若对长度不等的m个初始归并段，构造一棵哈夫曼树作为归并树，便可使在进行外部归并时所需对外存进行读/写的次数达到最少。例如，对上述9个初始归并段可构造一棵图8.22所示的归并树，按此树进行归并，仅需对外存进行446次读/写，这棵归并树便称作最佳归并树。

图 8.22 中的哈夫曼树是一棵真正的 3 叉树，即树中只有度为 3 或 0 的结点。假若只有 8 个初始归并段，例如，在前面例子中少了一个长度为 30 的归并段。如果在设计归并方案时，缺额的归并段留在最后，即除了最后一次进行 2-路归并外，其他各次归并都是 3-路归并，容易看出此归并方案的外存读 / 写次数为 386。显然，这不是最佳方案。正确的做法是，当初始归并段的数目不足时，需附加长度为 0 的“虚段”，按照哈夫曼树构造的原则，权为 0 的叶子应离树根最远，因此，这个只有 8 个初始归并段的归并树应如图 8.23 所示。

<div style="text-align: center;"><div style="text-align: center;">图8.22 3-路平衡归并的最佳归并树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.23 只有8个归并段的最佳归并树</div> </div>

那么，如何判断附加虚段的数目？当3叉树中只有度为3或0的结点时，必有 $ n_{3}=(n_{0}-1)/2 $，其中， $ n_{3} $是度为3的结点数， $ n_{0} $是度为0的结点数。由于 $ n_{3} $必为整数，因此 $ (n_{0}-1) $MOD2=0。也就是说，对3-路归并而言，只有当初始归并段的个数为偶数时，才需加1个虚段。

在一般情况下，对 k-路归并而言，容易推算得到，若  $ (m-1) $ MOD  $ (k-1)=0 $，则不需加虚段，否则需附加  $ k-(m-1) $ MOD  $ (k-1)-1 $ 个虚段。换句话说，第一次归并为  $ [(m-1) $ MOD  $ (k-1)+1]-1 $ 路归并。

若按最佳归并树的归并方案进行磁盘归并排序，需在内存建立一张载有归并段的长度和它在磁盘上的物理位置的索引表。

#### 【问题描述】

给定一个长度为 n 的整数数组 arr，其中的元素在  $ [0, n-1] $ 范围内，且互不相同。将 arr 分割成若干块（即分区），并对每个块单独排序。将它们连接起来后，连接的结果和按升序排序后的原数组相同。返回数组能分成的最多块数。

##### 【输入输出示例】

输入：arr = [1, 0, 2, 3, 4]

输出：4

解释：可以把它分成两块，如 [1,0]，[2,3,4]；但分成 [1,0]，[2]，[3]，[4] 可以得到最多的块数，对每个块单独排序后，结果为 [0,1]，[2]，[3]，[4]。

##### 【问题分析】

本题给定数组长度为 n，元素在  $ [0, n-1] $ 范围内，且互不相同，因此将整个数组升序排序后，元素与数组下标之间存在对应关系，即  $ \text{arr}[i] == i $。由此可知，分块的最小依据为当前块中最大值  $ \max $ 等于其在数组中的对应下标。

按照分块的最小依据遍历数组，每次保存遍历到的最大值 max。当 max 与当前位置下标相同时，说明到了最小的分块位置，分组数 chunknum 加 1。具体实现步骤如图 8.24 所示。

初始状态 [1, 0, 2, 3, 4]
i=0, max=1, chunknum=0 [1, 0, 2, 3, 4]
i=1, max=1, chunknum=1 [1, 0], 2, 3, 4]
i=2, max=2, chunknum=2 [1, 0], [2], 3, 4]
i=3, max=3, chunknum=3 [1, 0], [2], [3], 4]
i=4, max=4, chunknum=4 [1, 0], [2], [3], [4]

<div style="text-align: center;"><div style="text-align: center;">图8.24 LeetCode 769具体实现步骤</div> </div>

##### 【算法步骤】

① 定义变量 chunknum 和 max，分别表示当前块数和当前块中的最大值，初始时，chunknum = 0，max = 0。

② 遍历数组 arr，循环执行以下操作：

将当前元素 arr[i] 和 max 中的较大值赋值给 max；

若 max 等于 i，块数 chunknum 加 1。

③ 返回最多可分块数 chunknum。

##### 【算法描述】

int maxChunksToSorted(int* arr, int arrSize)
{
 // 计算数组能分成的最多块数
 int chunknum = 0, max = 0;
 for (int i = 0; i < arrSize; ++i)
 {
 max = fmax(max, arr[i]);
 // 将当前元素 arr[i] 和 max 中的较大值赋值给 max
 if (max == i)
 chunknum++;
 }
 return chunknum;
}

##### 【算法分析】

算法需要遍历整个数组一次，因此时间复杂度为  $ O(n) $；算法只需要申请几个额外的常量空间，因此空间复杂度为  $ O(1) $。

##### 【问题描述】

给定一个整数数组 nums 和一个整数 k，返回数组中第 k 大的元素。请设计并实现时间复杂度为  $ O(n) $ 的算法来解决此问题。

##### 【输入输出示例】

输入：nums=[3,2,1,5,6,4]，k=2

输出：5

##### 【问题分析】

本题可以使用快速排序的思想来求解，先对原数组排序，再返回倒数第 $k$ 个位置的元素，这样平均时间复杂度是 $O(n\log_2n)$。但是，可以对快速排序算法进行改进，使算法时间复杂度更小。在待排序的元素中任取一个元素（通常取第一个元素）作为枢轴，设其为 pivotkey。经过一趟快速排序后，把所有小于 pivotkey 的元素交换到前面，把所有大于 pivotkey 的元素交换到后面，最后将枢轴放在分界处，该枢轴在随后的排序中不再改变。所以只要某趟排序的枢轴在倒数第 $k$ 个位置，该枢轴即为答案。

改进快速排序算法来解决这个问题：如果某趟排序的枢轴在倒数第k个位置，则直接返回该元素；否则，如果枢轴的下标小于倒数第k个位置的下标，则递归右子区间，否则递归左子区间。这样就可以把原来递归两个区间变成只递归一个区间，从而避免了对整个数组进行全面排序，显著提高了算法的时间效率，这

<div style="text-align: center;"><div style="text-align: center;">此时区间内只有一个数，返回第k大元素</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.25 LeetCode 215具体实现步骤</div> </div>

就是“快速选择”算法。具体实现步骤如图8.25所示。

##### 【算法步骤】

①选择数组 nums 的第一个元素作为枢轴 pivotkey。

②遍历数组 nums，将其划分为两部分：小于或等于枢轴 pivotkey 的元素移至 pivotkey 的左边，大于枢轴 pivotkey 的元素移至 pivotkey 的右边。

③遍历结束后，判断枢轴的下标i与目标下标k的大小关系。如果i小于k，在左子区间中继续查找，否则在右子区间中继续查找。

【算法描述】

int quickselect(int *nums, int l, int r, int k)
{
 // 快速选择函数
 if (l == r) return nums[k]; // 如果区间内只有一个元素，直接返回该元素
 int pivotkey = nums[l]; // 选择第一个元素作为枢轴
 int i = l - 1, j = r + l;
 while (i < j)
 {
 do i++; while (nums[i] < pivotkey); // 从左向右找第一个大于或等于 pivotkey 的数

do j--; while (nums[j] > pivotkey); //从右向左找第一个小于或等于pivotkey的数
if (i < j) //交换这两个元素
{
 int tmp = nums[i];
 nums[i] = nums[j];
 nums[j] = tmp;
}

if (j < k)
 return quickselect(nums, j + 1, r, k);  //在右子区间中查找
else
 return quickselect(nums, l, j, k);  //在左子区间中查找
}

int findKthLargest(int *nums, int numsSize, int k)
{
 //寻找第k大元素
 return quickselect(nums, 0, numsSize - 1, numsSize - k);
}

##### 【算法分析】

在最坏情况下，每次划分都会选择到数组的最大或最小元素作为枢轴，每次只排除一个元素，从而使递归深度达到  $ O(n) $ 级别，这样会导致时间复杂度为  $ T(n) = T(n-1) + O(n) $，解这个递归关系得到的时间复杂度为  $ O(n^2) $；在平均情况下，快速选择算法的每次划分都会将数组分成近似均匀的两部分，这样划分的递归深度是对数级别的，平均时间复杂度为  $ T(n) = T\left(\frac{n}{2}\right) + O(n) $，求解该递归关系得到的时间复杂度为  $ O(n) $。由于递归时需要  $ \log_2 n $ 大小的栈空间，因此空间复杂度为  $ O(\log_2 n) $。

##### 【问题描述】

给定一个链表数组，每个链表都已按升序排列，要求将所有链表合并到一个升序链表中，返回合并后的链表。

##### 【输入输出示例】

输入：lists = [[1, 4, 5], [1, 3, 4], [2, 6]]

输出：[1,1,2,3,4,4,5,6]

解释：链表数组为

[
 1->4->5,
 1->3->4,
 2->6
]

将它们合并到一个有序链表中得到 1->1->2->3->4->4->5->6。

##### 【问题分析】

由于每个链表都是升序的，因此可以利用归并排序将各链表合并为一个有序链表。首先使用递归方法对 k 个链表进行划分，然后两两一组对链表进行合并；第一轮合并之后，k 个链表被合并为 k/2 个链表，然后重复上述过程，直到将其合并为一个有序链表。其中，合并两个有序链表的过程同第 2 章的算法 2.17。

##### 【算法步骤】

① 利用递归方法将 k 个链表两两一组进行合并，当下界 low 等于上界 high 时，返回 lists[low]；当 low 大于 high 时，返回 NULL。

② 取 mid = (low + high)/2，mid 将链表分为两部分，分别递归调用链表的左子表和右子表，然后将这两部分合并。

【算法描述】

struct ListNode* MergeTwoLists(struct ListNode* list1,struct ListNode* list2)
{
 // 归并两个有序链表
 struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
 struct ListNode* list3=node;
 while(list1&&list2)
 {
 if(list1->val>list2->val)
 {
 // 链表1的当前结点值大于链表2的当前结点值
 node->next=list2;
 list2=list2->next;
 }
 else
 {
 // 链表1的当前结点值小于或等于链表2的当前结点值
 node->next=list1;
 list1=list1->next;
 }
 node=node->next;
 }
 node->next=list1!=NULL?list1:list2;
 return list3->next;
}
struct ListNode* Merge(struct ListNode** lists,int low,int high)
{
 // 递归实现链表的合并
 if (low == high) return lists[low];
 if (low > high) return NULL;
 int mid = (low + high)/2;
 return MergeTwoLists(Merge(lists, low, mid), Merge(lists, mid + 1, high));
}
struct ListNode* mergeKLists(struct ListNode** lists,int listsSize)
{
 // 将k个链表合并到一个升序链表中
 return Merge(lists, 0, listsSize-1);
}

【算法分析】

算法在递归向上回升的过程中，第一轮合并 $ \frac{k}{2} $组链表，每一组的时间代价是 $ O(2n) $；第二轮合并 $ \frac{k}{4} $组链表，每一组的时间代价是 $ O(4n) $……所以总的时间代价是 $ \sum_{i=1}^{\infty}\frac{k}{2}\times2^i n=kn\times\log_2k $，故算法整体时间复杂度为 $ O(kn\times\log_2k) $；由于递归时需要 $ \log_2 n $大小的栈空间，因此空间复杂度为 $ O(\log_2 n) $。

## 8.9 小结

本章介绍了内部排序和外部排序的方法，内部排序是外部排序的基础，必须通过内部排序产生初始归并段之后，才能进行外部排序。

对于内部排序，本章总计介绍了5类共9种较常用的排序方法，下面从时间复杂度、空间复杂度和稳定性几个方面对这些内部排序方法进行比较，结果如表8.2所示。

<div style="text-align: center;"><div style="text-align: center;">表8.2 各种内部排序方法的比较</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">排序方法</td><td colspan="3">时间复杂度</td><td rowspan="2">空间复杂度</td><td rowspan="2">稳定性</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>最好情况</td><td style='text-align: center; word-wrap: break-word;'>最坏情况</td><td style='text-align: center; word-wrap: break-word;'>平均情况</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>直接插入排序</td><td style='text-align: center; word-wrap: break-word;'>$ O(n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>稳定</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>折半插入排序</td><td style='text-align: center; word-wrap: break-word;'>$ O(n\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>稳定</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>希尔排序</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>$ O(n^{1.3}) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>不稳定</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>冒泡排序</td><td style='text-align: center; word-wrap: break-word;'>$ O(n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>稳定</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>简单选择排序</td><td style='text-align: center; word-wrap: break-word;'>$ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>稳定</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>快速排序</td><td style='text-align: center; word-wrap: break-word;'>$ O(n\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>不稳定</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>堆排序</td><td style='text-align: center; word-wrap: break-word;'>$ O(n\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(1) $</td><td style='text-align: center; word-wrap: break-word;'>不稳定</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>归并排序</td><td style='text-align: center; word-wrap: break-word;'>$ O(n\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n) $</td><td style='text-align: center; word-wrap: break-word;'>稳定</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>基数排序</td><td style='text-align: center; word-wrap: break-word;'>$ O(d(n + rd)) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(d(n + rd)) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(d(n + rd)) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(n + rd) $</td><td style='text-align: center; word-wrap: break-word;'>稳定</td></tr></table>

从表8.2的时间复杂度的平均情况来看，直接插入排序、折半插入排序、冒泡排序和简单选择排序的速度较慢，而其他排序方法的速度较快。从算法实现的角度来看，速度较慢的算法实现过程比较简单，称之为简单的排序方法；而速度较快的算法可以看作是对某一排序算法的改进，称之为先进的排序方法，但这些算法实现过程比较复杂。总的来看，各种排序算法各有优缺点，没有哪一种是绝对最优的。在使用时需根据不同情况适当选用，甚至可将多种方法结合起来使用。一般综合考虑以下因素：

（1）待排序的记录个数；

（2）记录本身的大小；

（3）关键字的结构及初始状态；

（4）对排序稳定性的要求；

（5）存储结构。

根据这些因素和表8.2所做的比较，可以得出以下几点结论。

（1）当待排序的记录个数 n 较小时， $ n^{2} $ 和  $ n \log_{2} n $ 的差别不大，可选用简单的排序方法。而当关键字基本有序时，可选用直接插入排序或冒泡排序，排序速度很快，其中直接插入排序最为简单常用，性能也最佳。

（2）当 n 较大时，应该选用先进的排序方法。对于先进的排序方法，就平均时间性能而言，快速排序最佳，是目前基于比较的排序方法中最好的方法。但在最坏情况下，即当关键字基本有序时，快速排序的递归深度为 n，时间复杂度为  $ O(n^{2}) $，空间复杂度为  $ O(n) $。堆排序和归并排序不会出现快速排序的最坏情况，但归并排序的辅助空间较大。这样，当 n 较大时，具体选用

的原则是：

①当关键字分布随机，对稳定性不做要求时，可采用快速排序；

②当关键字基本有序，对稳定性不做要求时，可采用堆排序；

③当关键字基本有序，内存允许且要求排序稳定时，可采用归并排序。

（3）可以将简单的排序方法和先进的排序方法结合使用。例如，当 n 较大时，可以先将待排序序列划分成若干子序列分别进行直接插入排序，再利用归并排序将有序子序列合并成一个完整的有序序列。或者，在快速排序中，当划分子区间的长度小于某值时，可以转而调用直接插入排序算法。

（4）基数排序的时间复杂度也可写成  $ O(dn) $。因此，它最适用于 n 值很大而关键字较小的序列。若关键字也很大，而序列中大多数记录的“最高位关键字”均不同，则亦可先按“最高位关键字”不同将序列分成若干“小”的子序列，而后进行直接插入排序。但基数排序对使用条件有严格的要求：需要知道各级关键字的主次关系和各级关键字的取值范围，即只适用于像整数和字符这类有明显结构特征的关键字，当关键字的取值范围为无穷集合时，则无法使用基数排序。

（5）从方法的稳定性来比较，基数排序是稳定的内部排序方法，所有时间复杂度为  $ O(n^{2}) $ 的简单排序法也是稳定的，然而，快速排序、堆排序和希尔排序等时间性能较好的排序方法都是不稳定的。

一般来说，如果排序过程中的比较是在相邻的两个记录关键字间进行的，则排序方法是稳定的。值得提出的是，稳定性是由方法本身决定的，对不稳定的排序方法而言，不管其描述形式如何，总能举出一个不稳定的实例来。反之，对稳定的排序方法，可能有的描述形式会引起不稳定，但总能找到一种可不引起不稳定的描述形式。由于大多数情况下排序是按记录的主关键字进行的，因此所用的排序方法是否稳定无关紧要。若排序按记录的次关键字进行，则必须采用稳定的排序方法。

（6）在本章讨论的排序方法中，多数是采用顺序表实现的。若记录本身信息量较大，为避免移动记录耗费大量时间，可采用链式存储结构。比如直接插入排序、归并排序都易于在链表上实现。但像折半插入排序、希尔排序、快速排序和堆排序，却难以在链表上实现。

对于外部排序，常用的方法是归并方法，这种方法主要由两个独立的阶段组成：第一，把待排序的文件划分成若干个子文件；第二，逐趟归并子文件，最后形成对整个文件的排序。为减少归并中外存读/写的次数，提高外排序的效率，一般通过增大归并路数和减少初始归并段个数两种方案对归并算法进行改进，其中，多路平衡归并的方法可以增加归并段的个数，置换选择的方法可以减少初始归并段的个数。

学完本章后，读者应掌握与排序相关的基本概念，如关键字比较次数、数据移动次数、稳定性、内部排序、外部排序；深刻理解各种内部排序方法的基本思想、特点、实现方法及其性能分析，能从时间、空间、稳定性各个方面对各种排序方法进行综合比较，并能加以灵活应用。掌握外部排序方法中败者树的建立及归并方法；掌握置换-选择排序的过程和最佳归并树的构造方法。

在深入学习本章内容时，我们不仅要熟练掌握算法本身，更要深刻理解这些算法背后的原理和思想。通过对算法的深刻理解，我们能够更加深刻地领悟到科学探究的真谛，激发创造新算法的灵感，从而推进技术的进步，为社会的繁荣发展贡献自己的智慧和力量。这种学习过程不仅是个人能力的提升，更是我们践行科技报国之志的具体体现，是我们作为新时代青年应有的担当。

1. 选择题

（1）从未排序序列中依次取出元素与已排序序列（初始时为空）中的元素进行比较，将其放入已排序序列的正确位置，这种排序方法称为（）。

A. 归并排序 B. 冒泡排序 C. 插入排序 D. 选择排序

（2）从未排序序列中挑选元素，并将其依次插入已排序序列（初始时为空）末端的方法，称为（）。

A. 归并排序 B. 冒泡排序 C. 插入排序 D. 选择排序

（3）对 n 个不同的关键字由小到大进行冒泡排序，在下列（ ）情况下比较的次数最多。

A. 元素从小到大排列好的 B. 元素从大到小排列好的

C. 元素无序的 D. 元素基本有序的

（4）对 n 个不同的排序码进行冒泡排序，在元素无序的情况下比较的次数为（）。

A.  $ n+1 $ B. n C. n-1 D.  $ n(n-1)/2 $

（5）快速排序在下列（）的情况下最易发挥其长处。

A. 被排序的数据中含有多个相同排序码

B．被排序的数据已基本有序

C. 被排序的数据完全无序

D．被排序的数据中的最大值和最小值相差悬殊

（6）对 n 个关键字进行快速排序，在最坏情况下，算法的时间复杂度是（）。

A.  $ O(n) $ B.  $ O(n^{2}) $ C.  $ O(n\log_{2}n) $ D.  $ O(n^{3}) $

（7）若一组记录的排序码为（46，79，56，38，40，84），则利用快速排序的方法，以第一个记录为基准得到的一次划分结果为（）。

A. 38, 40, 46, 56, 79, 84

B. 40, 38, 46, 79, 56, 84

C. 40, 38, 46, 56, 79, 84

D. 40, 38, 46, 84, 56, 79

（8）下列关键字序列中，（）是堆。

A. 16, 72, 31, 23, 94, 53

B. 94, 23, 31, 72, 16, 53

C. 16, 53, 23, 94, 31, 72

D. 16, 23, 53, 31, 94, 72

（9）堆是一种（）排序。

A. 插入 B. 选择 C. 交换 D. 归并

（10）堆的形状是一棵（）。

A. 二叉排序树 B. 满二叉树 C. 完全二叉树 D. 平衡二叉树

（11）若一组记录的排序码为（46, 79, 56, 38, 40, 84），则利用堆排序的方法建立的初始堆为（）。

A. 79, 46, 56, 38, 40, 84

B. 84, 79, 56, 38, 40, 46

C. 84, 79, 56, 46, 40, 38

D. 84, 56, 79, 40, 46, 38

（12）下述几种排序方法中，要求内存最大的是（）。

A. 希尔排序 B. 快速排序 C. 归并排序 D. 堆排序

（13）下述几种排序方法中，（）是稳定的排序方法。

A. 希尔排序 B. 快速排序 C. 归并排序 D. 堆排序

（14）数据表中有10000个元素，如果仅要求求出其中最大的10个元素，则采用（）算法最节省时间。

A. 冒泡排序 B. 快速排序 C. 简单选择排序 D. 堆排序

（15）下列排序算法中，不能保证每趟排序至少能将一个元素放到其最终的位置上的排序方法是（）。

A. 希尔排序 B. 快速排序 C. 冒泡排序 D. 堆排序

## 2. 应用题

（1）设待排序的关键字序列为 {12, 2, 16, 30, 28, 10, 16 $ ^{*} $, 20, 6, 18}，试分别写出使用以下排序方法，每趟排序结束后关键字序列的状态。

① 直接插入排序；

②折半插入排序；

③希尔排序（增量选取5、3和1）；

④ 冒泡排序；

⑤ 快速排序；

⑥ 简单选择排序；

⑦堆排序：

⑧二路归并排序。

（2）给出如下关键字序列 {321, 156, 57, 46, 28, 7, 331, 33, 34, 63}，试按链式基数排序方法，列出每一趟分配和收集的过程。

（3）对输入序列(101, 51, 19, 61, 3, 71, 31, 17, 19, 100, 55, 20, 9, 30, 50, 6, 90)；当k=6时，使用置换-选择算法，写出建立的初始败者树及生成的初始归并段。

## 3. 算法设计题

（1）试以单链表为存储结构，实现简单选择排序算法。

（2）有 n 个记录存储在带头结点的双向链表中，利用双向冒泡排序法对其按升序进行排序，请设计这种排序的算法。（注：双向冒泡排序即相邻两趟排序向相反方向冒泡。）

（3）设有顺序放置的 n 个桶，每个桶中装有一粒砾石，每粒砾石的颜色是红、白、蓝之一。要求重新安排这些砾石，使得所有红色砾石在前，所有白色砾石居中，所有蓝色砾石在后，重新安排时对每粒砾石的颜色只能看一次，并且只允许用交换操作来调整砾石的位置。

（4）设计算法，对 n 个整数值的关键字记录序列进行重新排列，使所有关键字为负值的记录排在关键字为非负值的记录之前，要求：

①采用顺序存储结构，至多使用存储一个记录的辅助空间；

②算法的时间复杂度为  $ O(n) $。

（5）借助于快速排序的算法思想，在一组无序的记录中查找给定关键字值等于 key 的记录。设此组记录存放于数组 r[1..n] 中。若查找成功，则输出该记录在数组 r 中的位置及其关键字值，否则显示 “not find” 信息。请简要说明算法思想并设计算法。

（6）有一种简单的排序算法，叫作计数排序。这种排序算法对一个待排序的表进行排序（所有待排序的关键字互不相同），并将排序结果存放到一个新的表中。计数排序的要求如下：针对表中的每个记录，逐趟遍历待排序的表，每趟遍历结束后统计出当前表中比该记录关键字小的记录个数。假设针对某一个记录，统计出的计数值为c，则将该记录在新的有序表中的存放位置置为c。

① 给出适用于计数排序的顺序表定义；

②设计实现计数排序的算法；

③对于有 n 个记录的表，关键字比较次数是多少？

④与简单选择排序相比较，这种方法是否更好？为什么？

## 参考文献

[1] 严蔚敏，吴伟民．数据结构（C语言版）[M]．北京：清华大学出版社，2011.

[2] 严蔚敏，陈文博．数据结构及应用算法教程（修订版）[M]．北京：清华大学出版社，2011.

[3] 陈越，何钦铭，徐镜春，等．数据结构[M]．北京：高等教育出版社，2012.

[4] 耿国华．数据结构——用C语言描述[M]．北京：高等教育出版社，2011.

[5] 王红梅，胡明，王涛．数据结构（C++版）[M]．北京：清华大学出版社，2011.

### 本/书/特/色

本书在选材与编排上，贴近当前普通高等院校“数据结构”课程的现状和发展趋势，符合最新的全国硕士研究生统一入学考试计算机科学与技术学科数据结构考试大纲，内容难度适中，突出实用性和应用性。全书共8章，内容包括绪论，线性表，栈和队列，串、数组和广义表，树和二叉树，图，查找和排序。全书采用类C语言作为数据结构和算法的描述语言。

本书可作为普通高等院校计算机和信息技术相关专业“数据结构”课程的教材，也可供从事计算机工程与应用工作的科技工作者参考。

#### 本教材的结构框图

用书教师扫码下载

本书配套资源

人邮教育服务与资源下载社区：www.ryjiaoyu.com
