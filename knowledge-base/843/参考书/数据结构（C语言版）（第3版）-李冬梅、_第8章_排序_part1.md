# 第8章 排序

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


排序是计算机程序设计中的一种重要操作，在很多领域中都有广泛的应用。如各种升学考试的录取工作、各类竞赛活动等都离不开排序。排序的一个主要目的是便于查找。从第7章的讨论中容易看出，有序的顺序表可以采用查找效率较高的折半查找法，又如创建树表（无论是二叉排序树还是B-树）的过程本身就是一个排序的过程。

人们设计了大量的排序算法以满足不同的需求。例如，著名计算机科学家克努特（D.E.Knuth）在他的巨著《计算机程序设计艺术卷3：排序和查找》中，就给出了25种排序方法，并且指出，这只不过是现有排序方法的一小部分。本章仅讨论几种典型的、常用的排序方法。读者在学习本章内容时应注意，除了掌握算法本身以外，更重要的是了解该算法在进行排序时所依据的原则，以利于学习和创造更加新的算法。

## 1. 排序

排序（Sorting）是按关键字的非递减或非递增顺序对一组记录重新进行排列的操作。确切描述如下。

假设含 n 个记录的序列为：

 $$ \{R_{1},R_{2},\cdots,R_{n}\} $$

其相应的关键字序列为：

 $$ \{K_{1},K_{2},\cdots,K_{n}\} $$

需确定 1,2,⋯,n 的一种排列  $ p_{1},p_{2},\cdots,p_{n} $，使其相应的关键字满足如下的非递减（或非递增）关系：

 $$ K_{p_{1}}\leqslant K_{p_{2}}\leqslant\cdots\leqslant K_{p_{n}} $$

即使式（8-1）中的序列成为一个按关键字有序的序列：

 $$ \{R_{p_{1}},R_{p_{2}},\cdots,R_{p_{n}}\} $$

这样的操作称为排序。

## 2. 排序的稳定性

当排序记录中的关键字  $ K_{i} $ ( $ i=1,2,\cdots,n $) 都不相同时，则任何一个记录的无序序列经排序后得到的结果唯一；反之，当待排序的序列中存在两个或两个以上关键字相等的记录时，则排序所得的结果不唯一。假设  $ K_{i}=K_{j} $ ( $ 1\leq i\leq n $,  $ 1\leq j\leq n $,  $ i\neq j $)，且在排序前的序列中  $ R_{i} $ 领先于  $ R_{j} $ (即 i<j)。若在排序后的序列中  $ R_{i} $ 仍领先于  $ R_{j} $，则称所用的排序方法是稳定的；反之，若可能使排序后的序列中  $ R_{j} $ 领先于  $ R_{i} $，则称所用的排序方法是不稳定的。注意，排序算法的稳定性是针对所有记录而言的。也就是说，在所有的待排序记录中，只要有一组关键字的实例不满足稳定性要求，则该排序方法就是不稳定的。虽然稳定的排序方法和不稳定的排序方法排序结果不同，但不能说不稳定的排序方法就不好，各有各的适用场合。

## 3. 内部排序和外部排序

由于待排序记录的数量不同，使得排序过程中数据所占用的存储设备会有所不同。根据在排序过程中记录所占用的存储设备，可将排序方法分为两大类：一类是内部排序，指的是待排序记录全部存放在计算机内存中进行排序的过程；另一类是外部排序，指的是待排序记录的数量很大，以致内存一次不能容纳全部记录，在排序过程中尚需对外存进行访问的排序过程。本章首先介绍各种常用内部排序的方法，最后介绍外部排序的基本过程。

### 8.1.2 内部排序方法的分类

内部排序的方法很多，但就其全面性能而言，很难提出一种被认为是最好的方法，每一种方法都有各自的优缺点，适合在不同的环境（如记录的初始排列状态等）下使用。

内部排序的过程是一个逐步扩大记录的有序序列长度的过程。在排序的过程中，可以将排序记录区分为两个区域：有序序列区和无序序列区。

使有序区中记录的数目增加一个或几个的操作称为一趟排序。

根据逐步扩大记录有序序列长度的原则不同，可以将内部排序分为以下几类。

（1）插入类：将无序子序列中的一个或几个记录插入有序序列，从而增加记录的有序子序列的长度。主要包括直接插入排序、折半插入排序和希尔排序。

（2）交换类：通过交换无序序列中的记录从而得到其中关键字最小或最大的记录，并将它加入有序子序列中，以此方法增加记录的有序子序列的长度。主要包括冒泡排序和快速排序。

（3）选择类：从记录的无序子序列中选择关键字最小或最大的记录，并将它加入有序子序列中，以此方法增加记录的有序子序列的长度。主要包括简单选择排序、树形选择排序和堆排序。

（4）归并类：通过归并两个或两个以上的记录有序子序列，逐步增加记录有序序列的长度。2-路归并排序是最为常见的归并排序方法。

（5）分配类：是唯一一类不需要进行关键字比较的排序方法，排序时主要利用分配和收集两种基本操作来完成。基数排序是主要的分配排序方法。

#### 8.1.3 待排序记录的存储方式

（1）顺序表：记录之间的次序关系由其存储位置决定，实现排序需要移动记录。

（2）链表：记录之间的次序关系由指针指示，实现排序不需要移动记录，仅需修改指针。这种排序方式称为链表排序。

（3）待排序记录本身存储在一组地址连续的存储单元内，同时另设一个指示各个记录存储位置的地址向量，在排序过程中不移动记录本身，而移动地址向量中这些记录的“地址”，在排序结束之后按照地址向量中的值调整记录的存储位置。这种排序方式称为地址排序。

在本章的讨论中，除基数排序外，待排序记录均按上述第一种方式存储，且为了讨论方便，设记录的关键字均为整数。

即在以后讨论的大部分算法中，待排序记录的数据类型定义为：

#define MAXSIZE 20
typedef int KeyType;
typedef struct{
 KeyType key;
 InfoType otherinfo;
}RedType;
typedef struct{
 RedType r[MAXSIZE+1];
 int length;
}SqList;
// 顺序表的最大长度
// 定义关键字类型为整型
// 关键字项
// 其他数据项
// 记录类型
//r[0]闲置或用做哨兵单元
// 顺序表长度
// 顺序表类型

#### 8.1.4 排序算法效率的评价指标

前面已指出，就排序方法的全面性能而言，很难提出一种被认为是最好的方法。目前，评价排序算法好坏的标准主要有两点。

##### （1）执行时间

对于排序操作，时间主要消耗在关键字之间的比较和记录的移动上（这里，只考虑以顺序表方式存储待排序记录），排序算法的时间复杂度由这两个指标决定。因此可以认为，高效的排序算法的比较次数和移动次数都应该尽可能的少。

##### （2）辅助空间

空间复杂度由排序算法所需的辅助空间决定。辅助空间是除了存放待排序记录占用的空间之外，执行算法所需要的其他存储空间。理想的空间复杂度为  $ O(1) $，即算法执行期间所需要的辅助空间与待排序的数据量无关。

在以下各节讨论各种排序算法时，将给出有关算法的关键字比较次数和记录的移动次数。有的排序算法的执行时间不仅依赖于待排序的记录个数，还取决于待排序序列的初始状态。因此，对这样的算法，本书还将给出其最好、最坏和平均情况下的3种时间性能评价。

在讨论排序算法的平均执行时间时，均假定待排序记录初始状态是随机分布的，即出现各种排列情况的概率是相等的。同时假定各种排序的结果均是按关键字非递减排序。

## 8.2 插入排序

插入排序的基本思想是：每一趟将一个待排序的记录，按其关键字的大小插入已经排好序的一组记录的适当位置，直到所有待排序记录全部插入为止。

例如，打扑克牌在抓牌时要保证抓过的牌有序排列，则每抓一张牌，就插入合适的位置，直到抓完牌为止，即可得到一个有序序列。

可以选择不同的方法在已排好序的记录中寻找插入位置。根据查找方法的不同，有多种插入排序方法，这里仅介绍3种方法：直接插入排序、折半插入排序和希尔排序。

### 8.2.1 直接插入排序

直接插入排序（Straight Insertion Sort）是一种最简单的排序方法，其基本操作是将一条记录插入已排好序的表，从而得到一个新的、记录数量增1的有序表。

#### 算法 8.1 直接插入排序

【算法步骤】

① 设待排序的记录存放在数组 r[1..n] 中，r[1] 是一个有序序列。

② 循环 $n-1$ 次，每次使用顺序查找法，查找 r[i] ($i=2,\cdots,n$) 在已排好序的序列 $r[1\cdots i-1]$ 中的插入位置，然后将 r[i] 插入表长为 $i-1$ 的有序序列 r[1\cdots i-1]，直到将 r[n] 插入表长为 $n-1$ 的有序序列 r[1\cdots n-1]，最后得到一个表长为 $n$ 的有序序列。

【例 8.1】已知待排序记录的关键字序列为 {49, 38, 65, 97, 76, 13, 27,  $ \overline{49} $}，请给出用直接插入排序法进行排序的过程。

直接插入排序过程如图8.1所示，其中()中为已排好序的记录的关键字。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>初始关键字</td><td style='text-align: center; word-wrap: break-word;'>(49)</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>49</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>i=2</td><td style='text-align: center; word-wrap: break-word;'>(38</td><td style='text-align: center; word-wrap: break-word;'>49)</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>49</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>i=3</td><td style='text-align: center; word-wrap: break-word;'>(38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>65)</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>49</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>i=4</td><td style='text-align: center; word-wrap: break-word;'>(38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>97)</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>49</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>i=5</td><td style='text-align: center; word-wrap: break-word;'>(38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>97)</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>49</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>i=6</td><td style='text-align: center; word-wrap: break-word;'>(13</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>97)</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>49</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>i=7</td><td style='text-align: center; word-wrap: break-word;'>(13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>97)</td><td style='text-align: center; word-wrap: break-word;'>49</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>i=8</td><td style='text-align: center; word-wrap: break-word;'>(13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>97)</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图8.1 直接插入排序过程</div> </div>

在具体实现 r[i] 向前面的有序序列插入时，有两种方法：一种是将 r[i] 与 r[1], r[2], …, r[i-1] 从前向后顺序比较；另一种是将 r[i] 与 r[i-1], r[i-2], …, r[1] 从后向前顺序比较。这里采用后一种方法，和顺序查找类似，为了在查找插入位置的过程中避免数组下标越界，在 r[0] 处设置监视哨。在自 i-1 起往前查找插入位置的过程中，可以同时后移记录。

直接插入排序

【算法描述】

void InsertSort(SqList &L)
{
 // 对顺序表L进行直接插入排序
 for (i = 2; i <= L.length; ++i)
 if (L.r[i].key < L.r[i-1].key)
 {
 L.r[0] = L.r[i];
 L.r[i] = L.r[i-1];
 for (j = i-2; L.r[0].key < L.r[j].key; --j)
 L.r[j+1] = L.r[j];
 L.r[j+1] = L.r[0];
 }
 }
}

##### （1）时间复杂度

从时间来看，排序的基本操作为比较两个关键字的大小和移动记录。

对于其中的某一趟插入排序，算法 8.1 中内层的 for 循环次数取决于待插记录的关键字与前 i-1 个记录的关键字之间的关系。其中，在最好情况（正序：待排序序列中记录按关键字非递减有序排列）下，比较 1 次，不移动；在最坏情况（逆序：待排序序列中记录按关键字非递增有序排列）下，比较 i 次（依次同前面的 i-1 个记录进行比较，并和监视哨比较 1 次），移动 i+1 次（前面的 i-1 个记录依次向后移动，另外开始时将待插入的记录移动到监视哨中，最后找到插入位置，又从监视哨中移过去）。

对于整个排序过程需执行 n-1 趟，最好情况下，总的比较次数达最小值 n-1，记录不需移动；最坏情况下，总的关键字比较次数 KCN 和记录移动次数 RMN 均达到最大值，分别为：

 $$ K C N=\sum_{i=2}^{n}i=(n+2)(n-1)/2\approx n^{2}/2 $$

 $$ RMN=\sum_{i=2}^{n}(i+1)=(n+4)(n-1)/2\approx n^{2}/2 $$

若待排序序列中出现各种可能排列的概率相同，则可取上述最好情况和最坏情况的平均情况。在平均情况下，直接插入排序关键字的比较次数和记录移动次数均约为 $ n^{2}/4 $。

由此，直接插入排序的时间复杂度为  $ O(n^{2}) $。

##### （2）空间复杂度

直接插入排序只需要一个记录的辅助空间 r[0]，所以空间复杂度为  $ O(1) $。

【算法特点】

（1）稳定排序。

（2）算法简便，且容易实现。

（3）也适用于链式存储结构，只是在单链表上无须移动记录，只需修改相应的指针。

（4）更适合于初始记录基本有序（正序）的情况，当初始记录无序、n较大时，此算法时间复杂度较高，不宜采用。

#### 8.2.2 折半插入排序

直接插入排序采用顺序查找法查找当前记录在已排好序的序列中的插入位置，从7.2节的讨论中可知，这个“查找”操作可利用“折半查找”来实现，由此进行的插入排序称之为折半插入排序（Binary Insertion Sort）。

##### 算法 8.2 折半插入排序

【算法步骤】

① 设待排序的记录存放在数组 r[1⋯n] 中，r[1] 是一个有序序列。

② 循环 $n-1$ 次，每次使用折半查找法，查找 $\text{r}[i]$ ($i=2,\cdots,n$) 在已排好序的序列 $\text{r}[1..i-1]$ 中的插入位置，然后将 $\text{r}[i]$ 插入表长为 $i-1$ 的有序序列 $\text{r}[1\cdots i-1]$，

直到将 r[n] 插入表长为 n-1 的有序序列 r[1⋯n-1]，最后得到一个表长为 n 的有序序列。

折半插入排序

【算法描述】

void BInsertSort(SqList &L)
{ // 对顺序表L进行折半插入排序
 for(i=2;i<=L.length;++i)

{
 L.r[0]=L.r[i];
 // 将待插入的记录暂存到监视哨中
 low=1;high=i-1;
 while(low<=high) {
 // 在 r[low..high] 中折半查找插入的位置
 {
 m=(low+high)/2;
 if(L.r[0].key<L.r[m].key) high=m-1; // 折半
 else low=m+1; // 插入点在前一子表
 }
 for(j=i-1;j>=high+1;--j) L.r[j+1]=L.r[j]; // 记录后移
 L.r[high+1]=L.r[0]; // 将 r[0] 即原 r[i], 插入正确位置
 }
}

##### （1）时间复杂度

从时间上比较，折半查找比顺序查找快，所以就平均性能来说，折半插入排序优于直接插入排序。

折半插入排序所需要的关键字比较次数与待排序序列的初始排列无关，仅依赖于记录的个数。不论初始序列情况如何，在插入第  $ i $ 个记录时，需要经过 $ \lfloor \log_2 i \rfloor + 1 $ 次比较，才能确定它应插入的位置。所以当记录的初始排列为正序或接近正序时，直接插入排序比折半插入排序执行的关键字比较次数要少。

折半插入排序的对象移动次数与直接插入排序的相同，依赖于对象的初始排列。

在平均情况下，折半插入排序仅减少了关键字间的比较次数，而记录的移动次数不变。因此，折半插入排序的时间复杂度仍为  $ O(n^{2}) $。

##### （2）空间复杂度

折半插入排序所需附加存储空间和直接插入排序相同，只需要一个记录的辅助空间 r[0]，所以空间复杂度为 O(1)。

##### 【算法特点】

（1）稳定排序。

（2）因为要进行折半查找，所以只能用于顺序结构，不能用于链式结构。

（3）适合初始记录无序、n 较大的情况。

#### 8.2.3 希尔排序

希尔排序（Shell's Sort）又称“缩小增量排序”（Diminishing Increment Sort），是插入排序的一种，因D.L.希尔（D.L.Shell）于1959年提出而得名。

当待排序的记录个数较少且待排序序列的关键字基本有序时，直接插入排序效率较高。希尔排序基于以上两点，从“减少记录个数”和“序列基本有序”两个方面对直接插入排序进行了改进。

##### 【算法步骤】

希尔排序实质上是采用分组插入的方法，先将整个待排序记录序列分割成几组，从而减少参与直接插入排序的数据量，对每组分别进行直接插入排序，然后增加每组的数据量，重新分组。这样当经过几次分组排序后，整个序列中的记录“基本有序”时，再对全体记录进行一次

直接插入排序。

希尔对记录的分组，不是简单地“逐段分割”，而是将相隔某个“增量”的记录分成一组。

① 第一趟取增量  $ d_{1}\left(d_{1}<n\right) $ 把全部记录分成  $ d_{1} $ 个组，所有间隔为  $ d_{1} $ 的记录分在同一组，在各个组中进行直接插入排序。

②第二趟取增量 $ d_{2} $（ $ d_{2}<d_{1} $），重复上述的分组和排序。

③依次类推，直到所取的增量  $ d_{t}=1 $ ( $ d_{t}<d_{t-1}<\cdots<d_{2}<d_{1} $)，所有记录在同一组中进行直接插入排序为止。

【例 8.2】已知待排序记录的关键字序列为 {49, 38, 65, 97, 76, 13, 27,  $ \overline{49} $, 55, 04}，请给出用希尔排序法进行排序的过程（增量选取 5、3 和 1）。

希尔排序过程如图8.2所示。

<div style="text-align: center;"><div style="text-align: center;">图8.2 希尔排序过程</div> </div>

（1）第一趟取增量  $ d_{1}=5 $ ，所有间隔为5的记录分在同一组，全部记录分成5组，在各个组中分别进行直接插入排序，排序结果如图8.2的第7行所示。

（2）第二趟取增量  $ d_{2}=3 $ ，所有间隔为3的记录分在同一组，全部记录分成3组，在各个组中分别进行直接插入排序，排序结果如图8.2的第11行所示。

（3）第三趟取增量  $ d_{3}=1 $ ，对整个序列进行一趟直接插入排序，排序完成，排序结果如图8.2的第12行所示。

希尔排序的算法实现如算法 8.3 所示。预设好的增量序列保存在数组  $ dt[0\cdots t-1] $ 中，整个

希尔排序算法需执行  $ t $ 趟。从上述排序过程可见，算法 8.1 中的直接插入排序可以看成一趟增量是 1 的希尔排序，所以可以通过修改算法 8.1，得到一趟希尔排序算法 ShellInsert。在 ShellInsert 中，具体改写主要有两处：

（1）前后记录位置的增量是 dk，而不是 1；

（2）r[0] 只是暂存单元，不是监视哨。当  $ j \leq 0 $ 时，插入位置已找到。【算法描述】

【算法描述】

希尔排序

for(i=dk+1;i<=L.length;++i)
 if(L.r[i].key<L.r[i-dk].key) // 需将L.r[i]插入有序增量子表
 {
 L.r[0]=L.r[i]; // 暂存在r[0]中
 for(j=i-dk;j>0&&L.r[0].key<L.r[j].key;j-=dk)
 L.r[j+dk]=L.r[j]; // 记录后移，直到找到插入位置
 L.r[j+dk]=L.r[0]; // 将r[0]即原r[i]，插入正确位置
 }
 // if
}

void ShellSort(SqList &L,int dt[], int t)
{
 // 按增量序列dt[0..t-1]对顺序表L进行t趟希尔排序
 for(k=0;k<t;++k)
 ShellInsert(L,dt[k]); // 一趟增量为dt[t]的希尔插入排序
}

##### （1）时间复杂度

当增量大于 1 时，关键字较小的记录就不是一步一步地挪动，而是跳跃式地移动，从而使得在进行最后一趟增量为 1 的插入排序时，序列已基本有序，只要对记录进行少量比较和移动即可完成排序，因此希尔排序的时间复杂度较直接插入排序的低。但要具体进行分析，则是一个复杂的问题，因为希尔排序的时间复杂度是所取“增量”序列的函数，这涉及一些数学上尚未解决的难题。因此，到目前为止尚未有人求得一种最好的增量序列，但大量的研究已得出一些局部的结论。如有人指出，当增量序列为  $ \text{dt}[k]=2^{t-k+1}-1 $ 时，希尔排序的时间复杂度为  $ O(n^{3/2}) $，其中  $ t $ 为排序趟数， $ 1 \leq k \leq t \leq \lfloor \log_2(n+1) \rfloor $。还有人在大量的实验基础上推出：当  $ n $ 在某个特定范围内，希尔排序所需的比较和移动次数约为  $ n^{1/3} $，当  $ n \to \infty $ 时，比较和移动次数可减少到  $ n(\log_2 n)^2 $。

##### （2）空间复杂度

从空间来看，希尔排序和前面两种排序方法一样，也只需要一个辅助空间 r[0]，空间复杂度为 O(1)。

##### 【算法特点】

（1）记录跳跃式地移动导致排序方法是不稳定的。

（2）只能用于顺序结构，不能用于链式结构。

（3）增量序列可以有各种取法，但应该使增量序列中的值没有除1之外的公因子，并且最后一个增量值必须等于1。

（4）记录总的比较次数和移动次数都比直接插入排序的要少，n 越大时，效果越明显。所以适合初始记录无序、n 较大时的情况。

## 8.3 交换排序

交换排序的基本思想是：两两比较待排序记录的关键字，一旦发现两个记录不满足次序要求时则进行交换，直到整个序列全部满足要求为止。本节首先介绍基于简单交换思想实现的冒泡排序，然后给出另一种在此基础上进行改进的排序方法——快速排序。

### 8.3.1 冒泡排序

冒泡排序（Bubble Sort）是一种最简单的交换排序方法，它通过两两比较相邻记录的关键

字，如果为逆序，则进行交换，从而使关键字小的记录如气泡一般逐渐往上“漂浮”（左移），或者使关键字大的记录如石块一样逐渐向下“坠落”（右移）。

#### 【算法步骤】

① 设待排序的记录存放在数组 r[1⋯n] 中。首先将第一个记录的关键字和第二个记录的关键字进行比较，若为逆序（即 L.r[1].key > L.r[2].key），则交换两个记录。然后比较第二个记录和第三个记录的关键字。依次类推，直至第 n-1 个记录和第 n 个记录的关键字进行过比较为止。上述过程称作第一趟起泡排序，其结果使得关键字最大的记录被安置到最后一个记录的位置上。

② 然后进行第二趟起泡排序，对前 n-1 个记录进行同样的操作，其结果是使关键字次大的记录被安置到第 n-1 个记录的位置上。

③ 重复上述比较和交换过程，第 i 趟是从 L.r[1] 到 L.r[n - i + 1] 依次比较相邻两个记录的关键字，并在“逆序”时交换相邻记录，其结果是这 n - i + 1 个记录中关键字最大的记录被交换到第 n - i + 1 的位置上。直到在某一趟排序过程中没有进行过交换记录的操作，说明序列已全部达到排序要求，则完成排序。

【例 8.3】已知待排序记录的关键字序列为 {49, 38, 65, 97, 76, 13, 27,  $ \overline{49} $}，请给出用冒泡排序法进行排序的过程。

冒泡排序过程如图8.3所示，算法如算法8.4所示。

<div style="text-align: center;"><div style="text-align: center;">图8.3 冒泡排序过程</div> </div>

待排序的记录总共有8个，但算法在第六趟排序过程中没有进行过交换记录的操作，则完成排序。

##### 【算法描述】

void BubbleSort(SqList &L)
{
 // 对顺序表L进行冒泡排序
 m = L.length - 1;
 flag = 1;
 // flag 用来标记某一趟排序是否发生交换
 while ((m > 0) && (flag == 1))
 {
 flag = 0;
 for (j = 1; j <= m; j++)
 if (L.r[j].key > L.r[j + 1].key)
 {
 flag = 1;
 t = L.r[j];
 }
 }
 }
}

##### （1）时间复杂度

最好情况（初始序列为正序）：只需进行一趟排序，在排序过程中进行 n-1 次关键字间的比较，且不移动记录。

最坏情况（初始序列为逆序）：需进行 n-1 趟排序，总的关键字比较次数 KCN 和记录移动次数 RMN（每次交换都要移动 3 次记录）分别为：

冒泡排序

 $$ K C N=\sum_{i=n}^{2}(i-1)=n(n-1)/2\approx n^{2}/2 $$

 $$ RMN=3\ \sum_{i=n}^{2}(i-1)=3n(n-1)/2\approx3n^{2}/2 $$

所以，在平均情况下，冒泡排序关键字的比较次数和记录移动次数分别约为  $ n^{2}/4 $ 和  $ 3n^{2}/4 $，时间复杂度为  $ O(n^{2}) $。

##### （2）空间复杂度

冒泡排序只有在两个记录交换位置时需要一个辅助空间用于暂存记录，所以空间复杂度为 $ O(1) $。

【算法特点】

（1）稳定排序。

（2）可用于链式存储结构。

（3）移动记录次数较多，算法的平均时间性能比直接插入排序的差。当初始记录无序、n较大时，此算法不宜采用。

#### 8.3.2 快速排序

快速排序（Quick Sort）是由冒泡排序改进而得的。在冒泡排序过程中，只对相邻的两个记录进行比较，因此每次交换两个相邻记录时只能消除一个逆序排列。如果能通过两个（不相邻）记录的一次交换，消除多个逆序排列，则会大大加快排序的速度。快速排序方法中的一次交换可能消除多个逆序排列。

##### 【算法步骤】

在待排序的 n 个记录中任取一个记录（通常取第一个记录）作为枢轴（或支点），设其关键字为 pivotkey。经过一趟排序后，把所有关键字小于 pivotkey 的记录交换到前面，把所有关键字大于 pivotkey 的记录交换到后面，结果将待排序记录分成两个子表，最后将枢轴放置在分界处的位置。然后，分别对左、右子表重复上述过程，直至每一子表只有一个记录时，排序完成。

其中，一趟快速排序的具体步骤如下。

① 选择待排序表中的第一个记录作为枢轴，将枢轴记录暂存在 r[0] 的位置上。附设两个指针 low 和 high，初始时分别指向表的下界和上界（第一趟时，low = 1; high = L.length;）。

②从表的最右侧位置依次向左搜索，找到第一个关键字小于枢轴关键字 pivotkey 的记录，将其移到 low 处。具体操作是：当 low < high 时，若 high 所指记录的关键字大于等于 pivotkey，则向左移动指针 high（执行操作 --high），否则将 high 所指记录与枢轴记录交换。

③ 然后从表的最左侧位置，依次向右搜索找到第一个关键字大于 pivotkey 的记录和枢轴记录交换。具体操作是：当 low < high 时，若 low 所指记录的关键字小于等于 pivotkey，则向右移动指针 low（执行操作 ++low），否则将 low 所指记录与枢轴记录交换。

④ 重复步骤②和步骤③，直至 low 与 high 相等为止。此时 low 或 high 的位置即枢轴在此趟排序中的最终位置，原表被分成两个子表。

在上述过程中，记录的交换都是与枢轴之间发生的，每次交换都要移动3次记录，可以先将枢轴记录暂存在r[0]的位置上，排序过程中只移动要与枢轴交换的记录，即只进行r[low]或r[high]的单向移动，直至一趟排序结束后再将枢轴记录移至正确位置上。

【例 8.4】已知待排序记录的关键字序列为 {49, 38, 65, 97, 76, 13, 27,  $ \overline{49} $}，请给出用快速排序法进行排序的过程。

第一趟快速排序过程如图8.4（a）所示，整个快速排序的过程如图8.4（b）所示。

<div style="text-align: center;"><div style="text-align: center;">（a）第一趟快速排序过程</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>初始状态</td><td style='text-align: center; word-wrap: break-word;'>{49}</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>$ \overline{49} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第一趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>{27}</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>13}</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>{76}</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>$ \overline{49} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第二趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>{13}</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>{38}</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>{76}</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>$ \overline{49} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第三趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>{49}</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>{97}</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第四趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>$ \overline{49} $</td><td style='text-align: center; word-wrap: break-word;'>{65}</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>97</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">（b）整个快速排序的过程</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.4 快速排序过程</div> </div>

由上述可知，整个快速排序的过程可递归进行，其递归树如图8.5所示。快速排序的算法实现如算法8.5所示。其中，算法Partition完成一趟快速排序，返回枢轴的位置。若待排序序列长度大于1（low < high），算法QuickSort调用Partition获取枢轴位置，然后递归执行，分别对分割所得的两个子表进行排序。若待排序序列中只有一个记录，递归结束，排序完成。

##### 【算法描述】

<div style="text-align: center;"><div style="text-align: center;">图8.5 快速排序的递归树</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第8章 排序</td></tr></table>

{
 // 对顺序表L中的子表r[low..high]进行一趟排序，返回枢轴位置
 L.r[0]=L.r[low]; // 用于表的第一个记录作为枢轴记录
 pivotkey=L.r[low].key; // 枢轴记录关键字保存在pivotkey中
 while(low<high) {
 // 从表的两端交替地向中间查找
 }
 while(low<high&&L.r[high].key>=pivotkey) --high;
 L.r[low]=L.r[high]; // 将比枢轴记录小的记录移到低端
 while(low<high&&L.r[low].key<=pivotkey) ++low;
 L.r[high]=L.r[low]; // 将比枢轴记录大的记录移到高端
}
L.r[low]=L.r[0]; // 枢轴记录到位
return low; // 返回枢轴位置
}

void QSort(SqList &L, int low, int high)
{
 // 调用前置初值：low=1; high=L.length;
 // 对顺序表L中的子表L.r[low..high]进行快速排序
 if(low<high) {
 pivotloc=Partition(L, low, high); // 将L.r[low..high]一分为二，pivotloc是枢轴位置
 QSort(L, low, pivotloc-1); // 对左子表递归排序
 QSort(L, pivotloc+1, high); // 对右子表递归排序
}

void QuickSort(SqList &L)
{
 // 对顺序表L进行快速排序
 QSort(L, L, L.length);
}

##### （1）时间复杂度

从快速排序算法的递归树可知，快速排序的趟数取决于递归树的深度。

最好情况：每一趟排序后都能将记录序列均匀地分割成两个长度大致相等的子表，类似折半查找。在 n 个元素的序列中，对枢轴定位所需时间为 O(n)。若设 T(n) 是对 n 个元素的序列进行排序所需的时间，而且每次对枢轴正确定位后，正好把序列划分为长度相等的两个子表，此时，设 Cn 是一个常数，表示 n 个元素进行一趟快速排序的时间，则总的排序时间为：

快速排序

$$
\begin{aligned}
T(n) &= Cn + 2T(n/2) \\
&\leqslant n + 2T(n/2) \\
&\leqslant n + 2(n/2 + 2T(n/4)) = 2n + 4T(n/4) \\
&\leqslant 2n + 4(n/4 + 2T(n/8)) = 3n + 8T(n/8) \\
&\cdots \\
&\leqslant kn + 2^k T(n/2^k) \\
&\because k = \log_2 n \\
&\therefore T(n) \leqslant n \log_2 n + n \, T(1) \approx O(n \log_2 n)
\end{aligned}
$$

最坏情况：在待排序序列已经排好序的情况下，其递归树成为单支树，每次划分只得到一个比上一次少一个记录的子序列。这样，必须经过 n-1 趟才能将所有记录定位，而且第 i 趟需要经过 n-i 次比较。这样，总的关键字比较次数 KCN 为：

 $$ K C N=\sum_{i=1}^{n-1}n-i=n(n-1)/2\approx n^{2}/2 $$

这种情况下，快速排序的速度已经退化到简单排序的水平。枢轴记录的合理选择可避免这种最坏情况的出现，如利用“三者取中”的规则：比较当前表中第一个记录、最后一个记录和中间一个记录的关键字，取关键字居中的记录作为枢轴记录，并将其事先调换到第一个记录的位置。

理论上可以证明，平均情况下，快速排序的时间复杂度为  $ O(n \log_2 n) $。

##### （2）空间复杂度

快速排序是递归的，执行时需要有一个栈来存放相应的数据。最大递归调用次数与递归树的深度一致，所以最好情况下的空间复杂度为  $ O(\log_{2}n) $，最坏情况下为  $ O(n) $。

【算法特点】

（1）记录非顺次的移动导致排序方法是不稳定的。

（2）排序过程中需要定位表的下界和上界，所以适合用于顺序结构，很难用于链式结构。

（3）当 n 较大时，在平均情况下快速排序是所有内部排序方法中速度最快的一种，所以其适合初始记录无序、n 较大的情况。

## 8.4 选择排序

选择排序的基本思想是：每一趟从待排序的记录中选出关键字最小的记录，按顺序将其放在已排好序的记录序列的最后，直到全部排完为止。本节首先介绍简单选择排序方法，然后给出一种改进的选择排序方法——堆排序。

### 8.4.1 简单选择排序

简单选择排序（Simple Selection Sort）也称作直接选择排序。

#### 【算法步骤】

① 设待排序的记录存放在数组 r[1⋯n] 中。第一趟从 r[1] 开始，通过 n-1 次比较，从 n 个记录中选出关键字最小的记录，记为 r[k]，交换 r[1] 和 r[k]。

② 第二趟从 r[2] 开始，通过 n-2 次比较，从 n-1 个记录中选出关键字最小的记录，记为 r[k]，交换 r[2] 和 r[k]。

③依次类推，第i趟从r[i]开始，通过n-i次比较，从n-i+1个记录中选出关键字最小的记录，记为r[k]，交换r[i]和r[k]。

④经过n-1趟，排序完成。

【例 8.5】已知待排序记录的关键字序列为 {49, 38, 65, 97,  $ \overline{49} $, 13, 27, 76}，给出用简单选择排序法进行排序的过程。

简单选择排序过程如图8.6所示，其中( )中为已排好序的记录的关键字。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>初始关键字</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>76</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第一趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>(13)</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>76</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第二趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>(13)</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>76</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第三趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>(13)</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>76</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第四趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>(13)</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>76</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第五趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>(13)</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>76</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第六趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>(13)</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>97</td><td style='text-align: center; word-wrap: break-word;'>76</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第七趟排序结果</td><td style='text-align: center; word-wrap: break-word;'>(13)</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>38</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>49</td><td style='text-align: center; word-wrap: break-word;'>65</td><td style='text-align: center; word-wrap: break-word;'>76</td><td style='text-align: center; word-wrap: break-word;'>97</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图8.6 简单选择排序过程</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>301</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第8章 排序</td></tr></table>

【算法描述】

void SelectSort(SqList &L)
{
 // 对顺序表L进行简单选择排序
 for(i=1;i<L.length;++i){
 // 在L.r[i..L.length] 中选择关键字最小的记录
 k=i;
 for(j=i+1;j<=L.length;++j)
 if(L.r[j].key<L.r[k].key) k=j; // k指向此趟排序中关键字最小的记录
 if(k!=i)
 {
 t=L.r[i]; L.r[i]=L.r[k]; L.r[k]=t;} // 交换r[i]与r[k]
 }
 }

##### （1）时间复杂度

简单选择排序过程中，所需进行记录移动的次数较少。最好情况下，当初始序列为正序时，不移动。最坏情况下，关键字最大的记录位于数组第一个位置，其余元素正序时，移动3 $ n-1 $次。

然而，无论记录的初始排列如何，所需进行的关键字间的比较次数相同，均为：

简单选择排序

 $$ K C N=\sum_{i=1}^{n-1}n-i=n(n-1)/2\approx n^{2}/2 $$

因此，简单选择排序的时间复杂度也是  $ O(n^{2}) $。

##### （2）空间复杂度

同冒泡排序一样，只有在两个记录交换时需要一个辅助空间，所以空间复杂度为  $ O(1) $。

##### 【算法特点】

（1）就选择排序方法本身来讲，它是一种稳定的排序方法，但图8.6所表现出来的现象是不稳定的，这是因为上述实现选择排序的算法采用“交换记录”的策略所造成的，改变这个策略，可以写出不产生“不稳定现象”的选择排序算法。

（2）可用于链式存储结构。

（3）移动记录次数较少，当每一记录占用的空间较多时，此方法比直接插入排序快。

从上述可见，选择排序的主要操作是进行关键字间的比较，因此改进简单选择排序应从如何减少“比较”出发考虑。显然，在n个关键字中选出最小值，至少要进行n-1次比较，然而，继续在剩余的n-1个关键字中选择次小值并非一定要进行n-2次比较，若能利用前n-1次比较所得信息，则可减少以后各趟选择排序中所用的比较次数。实际上，体育比赛中的锦标赛便是一种选择排序。例如，在8个运动员中决出前3名至多需要11场比赛，而不是 $ 7+6+5=18 $场比赛（它的前提是，若乙胜丙，甲胜乙，则认为甲必能胜丙）。例如，图8.7（a）中最低层的叶子结点中8个选手之间经过第一轮的4场比赛之后选拔出4个优胜者“CHA”“BAO”“DIAO”和“WANG”，然后经过两场半决赛和一场决赛之后，选拔出冠军“BAO”。显然，按照锦标赛的传递关系，亚军只能产生于分别在决赛、半决赛和第一轮比赛中输给冠军的选手中。由此，在经过“CHA”和“LIU”“CHA”和“DIAO”的两场比赛之后，选拔出亚军“CHA”，如图8.7（b）所示。同理，选拔季军的比赛只要在“ZHAO”“LIU”和“DIAO”3个选手之间进行即可，如图8.7（c）所示。按照这种锦标赛的思想可导出树形选择排序。

<div style="text-align: center;"><div style="text-align: center;">（a）选拔冠军的比赛程序</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）选拔亚军的两场比赛</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）选拔季军的两场比赛</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.7 锦标赛过程示意</div> </div>

#### 8.4.2 树形选择排序

树形选择排序（Tree Selection Sort），又称锦标赛排序（Tournament Sort），是一种按照锦标赛的思想进行选择排序的方法。首先对 $n$ 个记录的关键字进行两两比较，然后在其中 $\left[\frac{n}{2}\right]$ 个较小者之间再进行两两比较，如此重复，直至选出最小关键字的记录为止。这个过程可用一棵有 $n$ 个叶子结点的完全二叉树表示。例如，图 8.8（a）中的二叉树表示从 8 个关键字中选出最小关键字的过程。8 个叶子结点中依次存放排序之前的 8 个关键字，每个非终端结点中的关键字均等于其左、右孩子结点中较小的关键字，则根结点中的关键字即叶子结点中的最小关键字。在输出最小关键字之后，根据关系的可传递性，欲选出次小关键字，仅需将叶子结点中的最小关键字（13）改为“最大值”，然后从该叶子结点开始，和其左（或右）兄弟的关键字进行比较，修改从叶子结点到根的路径上各结点的关键字，则根结点的关键字即次小关键字。同理，可依次选出从小到大的所有关键字如图 8.8（b）和图 8.8（c）所示。由于含有 $n$ 个叶子结点的完全二叉树的深度为 $\left[\log_2 n\right]+1$，则在树形选择排序中，除了最小关键字之外，每选择一个次小关键字仅需进行 $\left[\log_2 n\right]$ 次比较，因此，它的时间复杂度为 $O(n\log_2 n)$。但是，这种排序方法尚有辅助存

储空间较多、和“最大值”进行多余的比较等缺点。为了弥补这个缺点，威廉姆斯（J.Williams）在1964年提出了另一种形式的选择排序——堆排序。

<div style="text-align: center;"><div style="text-align: center;">（c）选出第三小的关键字为38</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.8 树形选择排序示例</div> </div>

#### 8.4.3 堆排序

堆排序（Heap Sort）是一种树形选择排序，在排序过程中，将待排序的记录 r[1..n] 看成一棵完全二叉树的顺序存储结构，利用完全二叉树中双亲结点和孩子结点之间的内在关系，在当前无序的序列中选择关键字最大（或最小）的记录。

首先给出堆的定义。

n 个元素的序列  $ \{k_{1}, k_{2}, \cdots, k_{n}\} $ 称之为堆，当且仅当满足以下条件时：

（1） $ k_{i} \geqslant k_{2i} $ 且  $ k_{i} \geqslant k_{2i+1} $ 或（2） $ k_{i} \leqslant k_{2i} $ 且  $ k_{i} \leqslant k_{2i+1} $ （ $ 1 \leqslant i \leqslant \lfloor n/2 \rfloor $）

若将和此序列对应的一维数组（即以一维数组做此序列的存储结构）看成是一个完全二叉树，则堆实质上是满足如下性质的完全二叉树：树中所有非终端结点的值均不大于（或不小于）其左、右孩子结点的值。

例如，关键字序列 {96, 83, 27, 38, 11, 09} 和 {12, 36, 24, 85, 47, 30, 53, 91} 分别满足条件（1）和条件（2），故它们均为堆，对应的完全二叉树分别如图 8.9（a）和图 8.9（b）所示。显然，在这两种堆中，堆顶元素（或完全二叉树的根）必为序列中 n 个元素的最大值（或最小值），分别称之为大根堆（或小根堆）。

堆排序利用了大根堆（或小根堆）堆顶记录的关键字最大（或最小）这一特征，使得当前无序的序列中选择关键字最大（或最小）的记录变得简单。下面讨论用大根堆进行排序，堆排序的步骤如下。

<div style="text-align: center;"><div style="text-align: center;">（a）堆顶元素取最大值</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 堆顶元素取最小值</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.9 堆的示例</div> </div>

① 按堆的定义将待排序序列 r[1..n] 调整为大根堆（这个过程称为建初堆），交换 r[1] 和 r[n]，则 r[n] 为关键字最大的记录。

②将 r[1..n-1] 重新调整为堆，交换 r[1] 和 r[n-1]，则 r[n-1] 为关键字次大的记录。

③循环 n-1 次，直到交换 r[1] 和 r[2] 为止，得到一个非递减的有序序列 r[1..n]。

同样，可以通过构造小根堆得到一个非递增的有序序列。

由此，实现堆排序需要解决如下两个问题。

（1）建初堆：如何将一个无序序列建成一个堆？

（2）调整堆：去掉堆顶元素，在堆顶元素改变之后，如何调整剩余元素成为一个新的堆？因为建初堆要用到调整堆的操作，所以下面先讨论调整堆的实现。

## 1. 调整堆

先看一个例子，图8.10（a）是个堆，将堆顶元素97和堆中最后一个元素38交换后，如图8.10（b）所示。由于此时除根结点外，其余结点均满足堆的性质，因此仅需自上至下进行一条路径上的结点调整即可。首先以堆顶元素38和其左、右子树根结点的值进行比较，由于左子树根结点的值大于右子树根结点的值且大于根结点的值，则将38和76交换；由于38替代了76之后破坏了左子树的“堆”，则需进行类似的调整，直至叶子结点，调整后的状态如图8.10（c）所示。重复上述过程，将堆顶元素76和堆中最后一个元素27交换且调整，得到如图8.10（d）所示的新堆。

<div style="text-align: center;"><div style="text-align: center;">(a) 大根堆</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 97和38交换后的情形</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）调整后的新堆</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）76和27交换后再进行调整后的新堆</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.10 堆顶元素改变后调整堆的过程</div> </div>

上述过程就像 “过筛子” 一样，把较小的关键字逐层筛下去，而将较大的关键字逐层选上来。因此，称此方法为 “筛选法”。

假设 r[s + 1..m] 已经是堆，按 “筛选法” 将 r[s..m] 调整为以 r[s] 为根的堆，算法实现如下。

### 【算法步骤】

从 r[2s] 和 r[2s + l] 中选出关键字较大者，假设 r[2s] 的关键字较大，比较 r[s] 和 r[2s] 的关键字。

① 若 r[s].key >= r[2s].key，说明以 r[s] 为根的子树已经是堆，不必进行任何调整。

筛选法调整堆

② 若 r[s].key < r[2s].key，交换 r[s] 和 r[2s]。交换后，以 r[2s + l] 为根的子树仍是堆，如果以 r[2s] 为根的子树不是堆，则重复上述过程，将以 r[2s] 为根的子树调整为堆，直至进行到叶子结点为止。

【算法描述】

void HeapAdjust(SqList &L, int s, int m)
{
 // 假设r[s+1..m]已经是堆, 将r[s..m]调整为以r[s]为根的大根堆
 rc = L.r[s];
 for (j = 2 * s; j <= m; j == 2)
 // 沿key较大的孩子结点向下筛选
 {
 if (j < m && L.r[j].key < L.r[j+1].key)
 ++j;
 // j为key较大的记录的下标
 if (rc.key >= L.r[j].key) break;
 // rc应插入在位置s上
 L.r[s] = L.r[j];
 s = j;
 }
 L.r[s] = rc;
}

## 2. 建初堆

要将一个无序序列调整为堆，就必须将其所对应的完全二叉树中以每一结点为根的子树都调整为堆。显然，只有一个结点的树必是堆，而在完全二叉树中，所有序号大于 $ \lfloor n/2 \rfloor $的结点都是叶子，因此以这些结点为根的子树均已是堆。这样，只需利用筛选法，从最后一个分支结点 $ \lfloor n/2 \rfloor $开始，依次将序号为 $ \lfloor n/2 \rfloor $、 $ \lfloor n/2 \rfloor - 1 $、 $ \cdots $、1的结点作为根的子树都调整为堆即可。

### 算法8.8 建初堆

【算法步骤】

对于无序序列 r[1⋯n]，从 i = n/2 开始，反复调用筛选法 HeapAdjust (L,i,n)，依次将以 r[i]，r[i-1],⋯,r[1] 为根的子树调整为堆。

建初堆

【算法描述】

void CreatHeap(SqList &L)
{
 // 把无序序列L.r[1..n]建成大根堆
 n=L.length;
 for(i=n/2;i>0; --i)
 HeapAdjust(L,i,n);
}

【例 8.6】已知无序序列为 {49, 38, 65, 97, 76, 13, 27,  $ \overline{49} $ }，用筛选法将其调整为一个大根堆，给出建堆的过程。

从图 8.11（a）所示的无序序列的最后一个非终端结点开始筛选，即从第4个元素97开始，由于 $ 97 > \overline{49} $，因此无须交换。同理，第3个元素65不小于其左、右子树根的值，仍无须交换。而第2个元素38 < 97，被筛选之后序列的状态如图8.11（b）所示，然后对根元素49进行筛选之后得到图8.11（c）所示的大根堆。

<div style="text-align: center;"><div style="text-align: center;">(a) 无序序列</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）38被筛选之后序列的状态 图8.11 建初堆的过程</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 49被筛选之后得到的大根堆</div> </div>

## 3. 堆排序算法的实现

根据前面堆排序算法步骤的描述，可知堆排序就是将无序序列建成初堆以后，反复进行交换和堆调整。在建初堆和调整堆算法实现的基础上，下面给出堆排序算法的实现。

### 算法 8.9 堆排序

【算法描述】

堆排序

void HeapSort(SqList &L)
{
 // 对顺序表L进行堆排序
 CreatHeap(L); // 把无序序列L.r[1..L.length]建成大根堆
 for(i=L.length;i>1;--i)
 {
 x=L.r[1]; // 将堆顶记录和当前未经排序子序列L.r[1..i]中最后一个记录互换
 L.r[1]=L.r[i];
 L.r[i]=x;
 HeapAdjust(L,1,i-1); // 将L.r[1..i-1]重新调整为大根堆
 }
}

【例 8.7】已知待排序记录的关键字序列为 {49, 38, 65, 97, 76, 13, 27,  $ \overline{49} $ }，给出用堆排序法进行排序的过程。

首先将无序序列建初堆，过程如图8.11所示。在初始大根堆的基础上，反复交换堆顶元素和最后一个元素，然后重新调整堆，直至最后得到一个有序序列，整个堆排序过程如图8.12所示。

<div style="text-align: center;"><div style="text-align: center;">（a）初始大根堆[1..8] （b）第一趟排序的交换操作之后（c）第一趟重调整堆[1..7]之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.12 堆排序过程</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(d) 第二趟排序的交换操作之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（e）第二趟重调整堆[1.6]之后（f）第三趟排序的交换操作之后（g）第三趟重调整堆[1.5]之后（h）第四趟排序的交换操作之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（i）第四趟重调整堆[1,4]之后 （j）第五趟排序的交换操作之后（k）第五趟重调整堆[1,3]之后 （l）第六趟排序的交换操作之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（m）第六趟重调整堆[1..2]之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（n）第七趟排序的交换操作之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图8.12 堆排序过程（续）</div> </div>

#### （1）时间复杂度

堆排序的运行时间主要耗费在建初堆和调整堆时进行的反复筛选上。

设有 n 个记录的初始序列所对应的完全二叉树的深度为 h，建初堆时，每个非终端结点都要自上而下进行筛选。由于第 i 层上的结点数小于等于  $ 2^{i-1} $，且第 i 层结点最大下移的深度为  $ h-i $，每下移一层要做两次比较，因此建初堆时关键字总的比较次数为：

 $$ \sum_{i=h-1}^{1}2^{i-1}\cdot2(h-i)=\sum_{i=h-1}^{1}2^{i}\cdot(h-i)=\sum_{j=1}^{h-1}2^{h-j}\cdot j\leqslant2n\sum_{j=1}^{h-1}j/2^{j}\leqslant4n $$

调整建新堆时要进行 $n-1$ 次筛选，每次筛选都要将根结点下移到合适的位置。$n$ 个结点的完全二叉树的深度为 $\lfloor \log_2 n \rfloor + 1$，则重建堆时关键字总的比较次数不超过：

 $$ 2(\lfloor\operatorname{l o g}_{2}(n-1)\rfloor+\lfloor\operatorname{l o g}_{2}(n-2)\rfloor+\cdots+\operatorname{l o g}_{2}2)<2n(\lfloor\operatorname{l o g}_{2}n\rfloor) $$

由此，堆排序在最坏的情况下，其时间复杂度也为  $ O(n \log_{2} n) $。

实验研究表明，堆排序的平均性能接近于最坏性能。

##### （2）空间复杂度

仅需一个记录大小供交换用的辅助存储空间，所以空间复杂度为  $ O(1) $。

【算法特点】

（1）是不稳定排序。

（2）只能用于顺序结构，不能用于链式结构。

（3）初始建堆所需的比较次数较多，因此记录数较少时不宜采用。堆排序在最坏情况下时间复杂度为  $ O(n\log_{2}n) $，相对于快速排序最坏情况下的  $ O(n^{2}) $ 而言更有优势，当记录较多时较为高效。

## 8.5 归并排序

归并排序（Merging Sort）就是将两个或两个以上的有序表合并成一个有序表的过程。将两个有序表合并成一个有序表的过程称为 2- 路归并，2- 路归并最为简单和常用。下面以 2- 路归并为例，介绍归并排序算法。

归并排序算法的思想是：假设初始序列含有 n 个记录，则可将其看成 n 个有序的子序列，每个子序列的长度为 1，然后两两归并，得到  $ \left\lceil n/2 \right\rceil $ 个长度为 2 或 1 的有序子序列；再两两归并，如此重复，直至得到一个长度为 n 的有序序列为止。

【例 8.8】已知待排序记录的关键字序列为 {49, 38, 65, 97, 76, 13, 27}，给出用 2-路归并排序法进行排序的过程。

2- 路归并排序的过程如图 8.13 所示。

<div style="text-align: center;"><div style="text-align: center;">图8.13 2-路归并排序的过程</div> </div>

2- 路归并排序中的核心操作是，将待排序序列中前后相邻的两个有序序列归并为一个有序序列，其算法类似于第2章的算法2.16。
