# 2. B-树的查找

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


由 B- 树的定义可知，在 B- 树上进行查找的过程和二叉排序树查找的过程类似。

例如，在图 7.48 所示的 B- 树上查找关键字 47 的过程如下：首先从根开始，根据根结点指针 t 找到 *a 结点，因 *a 结点中只有一个关键字，且 47 > 35，若查找的记录存在，则必在指针  $ P_1 $ 所指的子树内，顺指针找到 *c 结点，该结点有两个关键字（43 和 78），而 43 < 47 < 78，若查找的记录存在，则必在指针  $ P_1 $ 所指的子树中。同样，顺指针找到 *g 结点，在该结点中顺序查找，找到关键字 47，由此，查找成功。

查找不成功的过程也类似，例如，在同一棵树中查找 23。从根开始，因为 23 < 35，则顺该结点中指针  $ P_{0} $ 找到 *b 结点，又因为 *b 结点中只有一个关键字 18，且 23 > 18，所以顺结点中第二个指针  $ P_{1} $ 找到 *e 结点。同理，因为 23 < 27，则顺指针往下找，此时因指针所指为叶子结点，说明此棵 B- 树中不存在关键字 23，查找以失败而告终。

由此可见，在 B- 树上进行查找的过程是一个顺指针查找结点，和查找结点的关键字交叉进行的过程。

由于 B− 树主要用于文件的索引，因此它的查找涉及外存的存取，在此略去外存的读 / 写，只做示意性的描述。假设结点类型定义如下：

#define m 3

typedef struct BTNode
{
 int keynum;
 struct BTNode *parent;
 KeyType K[m+1];
 struct BTNode *ptr[m+1];
 Record *recptr[m+1];
} BTNode, *BTree;
typedef struct
{
 BTNode *pt;
 int i;
 int tag;
} Result;

// B-树的阶，暂设为3
// 结点中关键字的个数，即结点的大小
// 指向双亲结点
// 关键字向量，0号单元未用
// 子树指针向量
// 记录指针向量，0号单元未用
// B-树结点和B-树的类型
// 指向找到的结点
// 1～m，在结点中的关键字序号
// 1表示查找成功，0表示查找失败
// B-树的查找结果类型

## 【算法步骤】

将给定值 key 与根结点的各个关键字  $ K_{1}, K_{2}, \cdots, K_{j} $ （ $ 1 \leqslant j \leqslant m - 1 $）进行比较，由于该关键字序列是有序的，因此查找时可采用顺序查找，也可采用折半查找。查找时：

B-树的查找

①若 key = K_{i} (1 \leq i \leq j)，则查找成功；

②若 key < K_{1}，则顺着指针 P_{0} 所指向的子树继续向下查找；

③若  $ K_i < key < K_{i+1} (1 \leq i \leq j-1) $，则顺着指针  $ P_i $ 所指向的子树继续向下查找；

④若 key > K_{j}，则顺着指针 P_{j} 所指向的子树继续向下查找。

如果在自上而下的查找过程中，找到了值为 key 的关键字，则查找成功；如果直到叶子结点也未找到值为 key 的关键字，则查找失败。

### 【算法描述】

Result SearchBTree(BTree T,KeyType key)
{
 // 在m阶B-树T上查找关键字key，返回结果(pt,i,tag)
 // 若查找成功，则特征值tag=1，指针pt所指结点中第i个关键字等于key
 // 否则特征值tag=0，等于key的关键字应插入在指针pt所指结点中第i个和第i+1个关键字之间
 p=T;q=NULL;found=FALSE;i=0; // 初始化，p指向待查结点，q指向p的双亲 while(p&amp;&amp;!found)
 {
 i=Search(p,key);
 // 在p->K[1..keynum]中查找i，使得p->K[i<=key<p->K[i+1]]
 if(i>0&p->K[i==key) found=TRUE; // 找到待查关键字
 else{q=p; p=p->ptr[i];}
 }
 if(found) return(p,i,1); // 查找成功
 else return(q,i,0); // 查找不成功，返回key的插入位置信息
}

#### 【算法分析】

从算法 7.8 可见，在 B- 树上进行查找包含两种基本操作：①在 B- 树中找结点；②在结点中找关键字。由于 B- 树通常存储在磁盘上，则前一查找操作是在磁盘上进行的（在算法 7.8 中

没有体现），而后一查找操作是在内存中进行的，即在磁盘上找到指针 p 所指结点后，先将结点中的信息读入内存，然后利用顺序查找或折半查找查询等于 key 的关键字。显然，在磁盘上进行一次查找比在内存中进行一次查找耗费的时间多出很多，因此，在磁盘上进行查找的次数，即待查关键字所在结点在 B- 树上的层次数，是决定 B- 树查找效率的首要因素。

现考虑最坏的情况，即待查结点在 B- 树的最下面一层。也就是说，含 N 个关键字的 m 阶 B- 树的最大深度是多少？

先看一棵3阶的B-树。按B-树上的定义，3阶的B-树上所有非终端结点至多有两个关键字，至少有一个关键字（子树个数为2或3，故又称2-3树）。因此，当关键字个数小于等于2时，树的深度为2（叶子结点层次为2）；当关键字个数小于等于6时，树的深度不超过3。反之，若B-树的深度为4，则关键字的个数必须大于等于7[见图7.50（g）]，此时，每个结点都含有可能的关键字的最小数目。

<div style="text-align: center;"><div style="text-align: center;">（Ⅱ）</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b)</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c)</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(d)</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(e)</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(F)</div> </div>

<div style="text-align: center;"><div style="text-align: center;">( )</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图7.50 不同关键字数目的B-树</div> </div>

一般情况的分析可类似平衡二叉树进行，先讨论深度为  $ h+1 $ 的 m 阶 B-树所具有的最少结点数。

根据B-树的定义，第一层至少有1个结点；第二层至少有2个结点；由于除根之外的每个非终端结点至少有 $ \lceil m/2 \rceil $棵子树，则第三层至少有 $ 2\lceil m/2 \rceil $个结点；依次类推，第 $ h+1 $层至少有 $ 2\lceil m/2 \rceil)^{h-1} $个结点。而 $ h+1 $层的结点为叶子结点。若 $ m $阶B-树中具有 $ N $个关键字，则叶子结点数即查找不成功的结点数为 $ N+1 $，由此有：

 $$ N+1\geqslant2\times\left(\lceil m/2\rceil\right)^{h-1} $$

反之：

 $$ h\leqslant\log_{\left\lceil m/2\right\rceil}\left(\frac{N+1}{2}\right)+1 $$

这就是说，在含有 $N$ 个关键字的 B- 树上进行查找时，从根结点到关键字所在结点的路径上涉及的结点数不超过 $\log_{\left\lceil m/2\right\rceil}\left(\frac{N+1}{2}\right)+1$。

## 3. B-树的插入

B- 树是动态查找树，因此其是从空树起，在查找的过程中通过逐个插入关键字而得到。但由于 B- 树中除根之外的所有非终端结点中的关键字个数必须大于等于  $ \lceil m/2 \rceil - 1 $，因此，每次插入一个关键字不是在树中添加一个叶子结点，而是首先在最低层的某个非终端结点中添加一个关键字。若该结点的关键字个数不超过  $ m - 1 $，则插入完成，否则表明结点已满，需要进行结点的“分裂”，将此结点在同一层分成两个结点。一般情况下，结点分裂方法是：以中间关键字为界把结点一分为二，并把中间关键字向上插入双亲结点上，若双亲结点已满，则采用同样的方法继续分裂。最坏的情况下，一直分裂到树根结点，这时 B- 树高度增加 1。

例如，图 7.51（a）所示为 3 阶的 B− 树（图中略去 F 结点，即叶子结点），假设需依次插入关键字 30、26、85 和 7。首先通过查找确定应插入的位置。由根 *a 起进行查找，确定 30 应插入在 *d 结点中，由于 *d 中关键字数目不超过 2（即  $ m - 1 $），因此第一个关键字插入完成。插入 30 后的 B− 树如图 7.51（b）所示。同样，通过查找确定关键字 26 亦应插入在 *d 结点中。由于 *d 中关键字的数目超过 2，此时需将 *d 分裂成两个结点，关键字 26 及其前、后两个指针仍保留在 *d 结点中，而关键字 37 及其前、后两个指针存储到新产生的结点 *d' 中。同时，将关键字 30 和指示结点 *d' 的指针插入到其双亲结点中。由于 *b 结点中的关键字数目没有超过 2，则插入完成。插入 26 后的 B− 树如图 7.51（c）和图 7.51（d）所示。类似地，在 *g 中插入 85 之后需分裂成两个结点，如图 7.51（e）和图 7.51（f）所示。而当 70 继而插入双亲结点中时，由于 *e 中关键字数目超过 2，则分裂为结点 *e 和 *e', 如图 7.51（g）所示。最后在插入关键字 7 时，*c、*b 和 *a 相继分裂，并生成一个新的根结点 *m，如图 7.51（h）～（j）所示。

<div style="text-align: center;"><div style="text-align: center;">(a) 一棵2-3树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）插入30之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 插入26之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图7.51 在B-树中进行插入（省略叶子结点）</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>263</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>第7章 查找</td></tr></table>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>264</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>数据结构（C语言版）（第3版）</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">(e) 插入85之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(f) 插入85之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（g）插入85之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(h) 插入7之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图7.51 在B-树中进行插入（省略叶子结点）（续）</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（1）插入7之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(1) 插入7之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图7.51 在B-树中进行插入（省略叶子结点）（续）</div> </div>

### 【算法步骤】

①在 B- 树中查找给定关键字的记录，若查找成功，则插入操作失败，否则将新记录作为空指针 ap 插入查找失败的叶子结点的上一层结点（由 q 指向）。

② 若插入新记录和空指针后，q 指向的结点的关键字个数未超过 m-1，则插入操作成功，否则转入步骤③。

③以该结点的第 $ \lceil m/2 \rceil $个关键字 $ K_{\lceil m/2\rceil} $为拆分点，将该结点分成3个部分： $ K_{\lceil m/2\rceil} $左边部分、 $ K_{\lceil m/2\rceil} $、 $ K_{\lceil m/2\rceil} $右边部分。 $ K_{\lceil m/2\rceil} $左边部分仍然保留在原结点中；

B-树的插入

 $ K_{[m/2]} $ 右边部分存放在一个新创建的结点（由 ap 指向）中；关键字为  $ K_{[m/2]} $ 的记录和指针 ap 插入 q 的双亲结点。因 q 的双亲结点增加一个新的记录，所以必须对 q 的双亲结点重复②和③的操作，依次类推，直至由 q 指向的结点是根结点，转入步骤④。

④ 由于根结点无双亲，则由其分裂产生的两个结点的指针 ap 和 q，以及关键字为  $ K_{[m/2]} $ 的记录构成一个新的根结点。此时，B- 树的高度增加 1。

下面算法描述中的 q 和 i 是由查找函数 SearchBTree 返回的信息而得。

#### 【算法描述】

Status InsertBTree(BTree &T,KeyType key,BTree q,int i)
{
 // 在m阶B-树T上结点*q的K[i]与K[i+1]之间插入关键字key
 // 若引起结点过大，则沿双亲链进行必要的结点分裂调整，使T仍是m阶B-树
 x=key;ap=NULL;finished=FALSE; //x表示新插入的关键字，ap为一个空指针
 while (q&&!finished)
 {
 Insert(q,i,x,ap); // 将x和ap分别插入q->key[i+1]和q->ptr[i+1]
 if (q->keynum<m) finished=TRUE;  // 插入完成
 else
 {

s= $ \lceil(m+1)/2\rceil $; split(q,s,ap); x=q->K[s];
// 将 q->K[s+1..m], q->ptr[s..m] 和 q->recptr[s+1..m] 移入新结点 *ap
q=q->parent;
if(q) i=Search(q,x); // 在双亲结点 *q 中查找 x 的插入位置
}
// else
// while
if(!finished) // T 是空树（参数 q 初值为 NULL）或者根结点已分裂为结点 *q 和 *ap
NewRoot(T,q,x,ap); // 生成含信息 (T,x,ap) 的新的根结点 *T, 原 T 和 ap 为子树指针
return OK;

## 4. B-树的删除

m 阶 B− 树的删除操作，是指在 B− 树的某个结点中删除指定的关键字及其邻近的一个指针，删除后应该进行调整使该树仍然满足 B− 树的定义，也就是要保证每个结点的关键字数目区间为  $ \lceil m/2 \rceil - 1, m - 1 $。删除记录后，结点的关键字个数如果小于  $ \lceil m/2 \rceil - 1 $，则要进行“合并”结点的操作。除了删除记录，还要删除该记录邻近的指针。若该结点为最下层的非终端结点，由于其指针均为空，删除后不会影响其他结点，可直接删除；若该结点不是最下层的非终端结点，其邻近的指针则指向一棵子树，不可直接删除。此时可做如下处理：将要删除记录用其右（左）边邻近指针指向的子树中关键字最小（大）的记录（该记录必定在最下层的非终端结点中）替换。采取这种方法进行处理，无论要删除的记录所在的结点是否为最下层的非终端结点，都可归结为在最下层的非终端结点中删除记录的情况。

例如，在图 7.51（a）所示的 B− 树上删去 45，可以用 *f 结点中的 50 替代 45，然后在 *f 结点中删去 50。因此，下面可以只讨论删除最下层非终端结点中的关键字的情形。有以下 3 种可能。

（1）被删关键字所在结点中的关键字数目不小于 $ \lceil m/2 \rceil $，则只需从该结点中删去关键字  $ K_{i} $ 和相应指针  $ P_{i} $，树的其他部分不变。例如，从图 7.51（a）所示 B- 树中删去关键字 12，删除后的 B- 树如图 7.52（a）所示。

（2）被删关键字所在结点中的关键字数目等于 $ \lceil m/2 \rceil - 1 $，而与该结点相邻的右兄弟（或左兄弟）结点中的关键字数目大于 $ \lceil m/2 \rceil - 1 $，则需将其兄弟结点中的最小（或最大）关键字上移至双亲结点中，而将双亲结点中小于（或大于）且紧靠该上移关键字的关键字下移至被删关键字所在结点中。例如，从图7.52（a）中删去50，需将其右兄弟结点中的61上移至*e结点中，而将*e结点中的53移至*f，从而使*f和*g中关键字数目均不小于 $ \lceil m/2 \rceil - 1 $，而双亲结点中的关键字数目不变，如图7.52（b）所示。

（3）被删关键字所在结点和其相邻的兄弟结点中的关键字数目均等于  $ \lceil m/2 \rceil - 1 $。假设该结点有右兄弟，且其右兄弟结点地址由双亲结点中的指针  $ P_i $ 所指，则在删去关键字之后，它所在结点中剩余的关键字和指针，加上双亲结点中的关键字  $ K_i $，一起合并到  $ P_i $ 所指的兄弟结点中（若没有右兄弟，则合并至左兄弟结点中）。例如，从图 7.52（b）所示 B- 树中删去 53，则应删去  $ *f $ 结点，并将  $ *f $ 的剩余信息（指针“空”）和双亲  $ *e $ 结点中的 61 一起合并到右兄弟结点  $ *g $ 中，删除后的树如图 7.52（c）所示。如果因此使双亲结点中关键字数目小于  $ \lceil m/2 \rceil - 1 $，则依次类推做相应处理。例如，在图 7.52（c）的 B- 树中删去关键字 37 之后，双亲结点  $ *b $ 中剩余信息（指针 c）应和其双亲结点  $ *a $ 中关键字 45 一起合并至右兄弟结点  $ *e $ 中，删除后的 B- 树如图 7.52（d）所示。

<div style="text-align: center;"><div style="text-align: center;">图7.52 在B-树中删除关键字的情形</div> </div>

在 B- 树中删除结点的算法在此不详述，读者可根据上述讨论自行写出此算法。

### 7.3.5 B+ 树

B+ 树是一种 B− 树的变形树，更适合用于文件索引系统。严格来讲，它已不是第 5 章中定义的树了。

## 1. B+ 树和 B− 树的差异

一棵 m 阶的 B+ 树和 m 阶的 B- 树的差异在于：

（1）有 n 棵子树的结点中含有 n 个关键字；

（2）所有的叶子结点中包含了全部关键字的信息，以及指向含这些关键字记录的指针，且叶子结点本身依关键字的大小自小而大顺序链接；

（3）所有的非终端结点可以看成索引部分，结点中仅含有其子树（根结点）中的最大（或

最小）关键字。

例如，图7.53所示为一棵3阶的B+树，通常在B+树上有两个头指针，一个指向根结点，另一个指向关键字最小的叶子结点。因此，可以对B+树进行两种查找运算：一种是从最小关键字起顺序查找；另一种是从根结点开始，进行随机查找。

<div style="text-align: center;"><div style="text-align: center;">图7.53 一棵3阶的B+树</div> </div>

## 2. B+ 树的查找、插入和删除

在 B+ 树上进行随机查找、插入和删除的过程基本上与 B- 树类似。

（1）查找：若非终端结点上的关键字等于给定值，并不终止，而是继续向下直到叶子结点。因此，在 B+ 树中，不管查找成功与否，每次查找都走一条从根到叶子结点的路径。B+ 树查找的分析类似于 B- 树。

B+ 树不仅能够有效地查找单个关键字，而且更适合查找某个范围内的所有关键字。例如，在 B+ 树上找出值在 [a,b] 内的所有关键字。处理方法如下：通过一次查找找出关键字 a，不管它是否存在，都可以到达可能出现 a 的叶子结点，然后在叶子结点中查找值等于 a 或大于 a 的那些关键字，对于所找到的每个关键字都有一个指针指向相应的记录，这些记录的关键字在所需要的范围。如果在当前结点中没有发现大于 b 的关键字，就可以使用当前叶子结点的最后一个指针找到下一个叶子结点，并继续进行同样的处理，直至在某个叶子结点中找到大于 b 的关键字，才停止查找。

（2）插入：仅在叶子结点上进行插入，当结点中的关键字个数大于 m 时要分裂成两个结点，它们所含关键字的个数分别为  $ \left\lfloor \frac{m+1}{2} \right\rfloor $ 和  $ \left\lceil \frac{m+1}{2} \right\rceil $；并且，它们的双亲结点中应同时包含这两个结点中的最大关键字。

（3）删除：B+ 树的删除也仅在叶子结点进行，当叶子结点中最大关键字被删除时，其在非终端结点中的值可以作为一个“分界关键字”存在。当因删除而使结点中关键字的个数少于 $ \lceil m/2 \rceil $时，其和兄弟结点的合并过程亦和 B- 树类似。

### 7.4.1 散列表的基本概念

前面讨论了基于线性表、树表结构的查找方法，这类查找方法都是以关键字的比较为基础的。在查找过程中只考虑各元素关键字之间的相对大小，记录在存储结构中的位置和其关键字

无直接关系，其查找时间与表的长度有关，特别是当结点个数很多时，查找时要大量地与无效结点的关键字进行比较，致使查找速度很慢。如果能在元素的存储位置和其关键字之间建立某种直接关系，那么在进行查找时，就无须作比较或只需作很少的比较，按照这种关系直接由关键字找到相应的记录。这就是散列查找法（Hash Search）的思想，它通过对元素的关键字值进行某种运算，直接求出元素的地址，即使用关键字到地址的直接转换方法，而不需要反复比较。因此，散列查找法又叫杂凑法或散列法。

下面给出散列法中常用的几个术语。

（1）散列函数和散列地址：在记录的存储位置 p 和其关键字 key 之间建立一个确定的对应关系 H，使 p = H(key)，称这个对应关系 H 为散列函数，p 为散列地址。

（2）散列表：一个有限连续的地址空间，用以存储按散列函数计算得到相应散列地址的数据记录。通常散列表的存储空间是一个一维数组，散列地址是数组的下标。

（3）冲突和同义词：对不同的关键字可能得到同一散列地址，即 key₁ ≠ key₂，而  $ H(key_1) = H(key_2) $，这种现象称为冲突。具有相同函数值的关键字对该散列函数来说称作同义词，key₁ 与 key₂ 互为同义词。

例如，对 C 语言某些关键字集合建立一个散列表，关键字集合为：

 $$ S_{1}=\{\mathrm{m a i n},\mathrm{i n t},\mathrm{f l o a t},\mathrm{w h i l e},\mathrm{r e t u r n},\mathrm{b r e a k},\mathrm{s w i t c h},\mathrm{c a s e},\mathrm{d o}\} $$

设定一个长度为26的散列表应该足够，散列表可定义为：

 $$  char~HT[26][8]; $$

假设散列函数的值取为关键字 key 中第一个字母在字母表 {a, b,  $ \cdots $, z} 中的序号（序号范围为 0～25），即：

 $$ H(key)=key[0]-^{\prime}a^{\prime} $$

其中，设 key 的类型是长度为 8 的字符数组，根据此散列函数构造的散列表如表 7.1 所示。

<div style="text-align: center;"><div style="text-align: center;">表7.1 关键字集合 S1 对应的散列表</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>17</td><td style='text-align: center; word-wrap: break-word;'>18</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>22</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>25</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>break</td><td style='text-align: center; word-wrap: break-word;'>case</td><td style='text-align: center; word-wrap: break-word;'>do</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>float</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>int</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>main</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>return</td><td style='text-align: center; word-wrap: break-word;'>switch</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>while</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

假设关键字集合扩充为：

 $$ S_{2}=S_{1}+\{\mathrm{s h o r t,d e f a u l t,d o u b l e,s t a t i c,f o r,s t r u c t}\} $$

如果散列函数不变，新加入的7个关键字经过计算得到： $ H(\text{short}) = H(\text{static}) = H(\text{struct}) = 18 $， $ H(\text{default}) = H(\text{double}) = 3 $， $ H(\text{for}) = 5 $，而18、3和5这几个位置均已存放相应的关键字，这就发生了冲突，其中，switch、short、static和struct称为同义词；do、default和double称为同义词；float和for称为同义词。

集合  $ S_{2} $ 中的关键字仅有 15 个，仔细分析这 15 个关键字的特性，应该不难构造一个散列函数以避免冲突。但在实际应用中，理想化的、不产生冲突的散列函数极少存在，这是因为通常散列表中关键字的取值集合远远大于表空间的地址集。例如，高级语言的编译程序要对源程序中的标识符建立一张符号表进行管理，多数都采取散列表。在设定散列函数时，考虑的查找关键字集合应包含所有可能产生的关键字，不同的源程序中使用的标识符一般也不相同，如果此语言规定标识符为长度不超过 8 的、字母开头的由字母和数字组成的串，字母区分大小写，则标识符取值集合的大小为：

 $$ C_{52}^{1}\times C_{62}^{7}\times7!=1.09\times10^{12} $$

而一个源程序中出现的标识符是有限的，所以编译程序将散列表的长度设为 1000 足矣。于是，要将多达  $ 10^{12} $ 个可能的标识符映射到有限的地址上，难免产生冲突。通常，散列函数是一

个多对一的映射，所以冲突是不可避免的，只能通过选择一个“好”的散列函数使得在一定程度上减少冲突。而一旦发生冲突，就必须采取相应措施及时予以解决。

综上所述，散列查找法主要研究以下两方面的问题：

（1）如何构造散列函数：

（2）如何处理冲突。

#### 7.4.2 散列函数的构造方法

构造散列函数的方法很多，一般来说，应根据具体问题选用不同的散列函数，通常要考虑以下因素：

（1）散列表的长度；

（2）关键字的长度；

（3）关键字的分布情况；

（4）计算散列函数所需的时间；

（5）记录的查找频率。

构造一个“好”的散列函数应遵循以下两条原则：

（1）函数计算要简单，每一关键字只能有一个散列地址与之对应；

（2）函数的值域需在表长的范围内，计算出的数列地址的分布应均匀，尽可能减少冲突。下面介绍构造数列函数的几种常用方法。

## 1. 数字分析法

如果事先知道关键字集合，且每个关键字的位数比散列表的地址码位数多，每个关键字由n位数组成，如 $ k_1k_2\cdots k_n $，则可以从关键字中提取数字分布比较均匀的若干位作为散列地址。

例如，有80个记录，其关键字为8位十进制数。假设散列表的表长为100，则可取两位十进制数组成散列地址，选取的原则是分析这80个关键字，使得到的散列地址尽量避免产生冲突。假设这80个关键字中的一部分如下所列：

 $$ \begin{aligned}&\begin{bmatrix} \\{{{8}}}&{{{1}}}&{{{3}}}&{{{4}}}&{{{6}}}&{{{5}}}&{{{3}}}&{{{2}}} \\{{{8}}}&{{{1}}}&{{{3}}}&{{{7}}}&{{{2}}}&{{{2}}}&{{{4}}}&{{{2}}} \\{{{8}}}&{{{1}}}&{{{3}}}&{{{8}}}&{{{7}}}&{{{4}}}&{{{2}}}&{{{2}}} \\{{{8}}}&{{{1}}}&{{{3}}}&{{{0}}}&{{{1}}}&{{{3}}}&{{{6}}}&{{{7}}} \\{{{8}}}&{{{1}}}&{{{3}}}&{{{2}}}&{{{2}}}&{{{8}}}&{{{1}}}&{{{7}}} \\{{{8}}}&{{{1}}}&{{{3}}}&{{{3}}}&{{{8}}}&{{{9}}}&{{{6}}}&{{{7}}} \\{{{8}}}&{{{1}}}&{{{3}}}&{{{5}}}&{{{4}}}&{{{1}}}&{{{5}}}&{{{7}}} \\{{{8}}}&{{{1}}}&{{{3}}}&{{{6}}}&{{{8}}}&{{{5}}}&{{{3}}}&{{{7}}} \\{{{8}}}&{{{1}}}&{{{4}}}&{{{1}}}&{{{9}}}&{{{3}}}&{{{5}}}&{{{5}}} \\&\vdots\\ &\end{bmatrix}\\ & \textcircled{1} \quad \textcircled{2} \quad \textcircled{3} \quad \textcircled{4} \quad \textcircled{5} \quad \textcircled{6} \quad \textcircled{7} \quad \textcircled{8} \end{aligned} $$

从对关键字全体的分析中可以发现：第 $ ① $、 $ ② $位都是“8 1”，第 $ ③ $位只可能取3或4，第 $ ⑧ $位可能取2、5或7，因此这4位都不可取。由于中间的4位可看成近乎随机的，因此可取其中任意两位，或取其中两位与另外两位叠加求和后舍去进位作为散列地址。

数字分析法的适用情况：事先必须明确知道所有的关键字每一位上各种数字的分布情况。

在实际应用中，例如，同一出版社出版的所有图书，其 ISBN 的前几位都是相同的，因此，若数据表只包含同一出版社的图书，构造散列函数时可以利用数字分析法排除 ISBN 的前几位数字。

## 2. 平方取中法

通常在选定散列函数时不一定能知道关键字的全部情况，取其中某几位也不一定合适，而一个数平方后的中间几位数和数的每一位都相关，如果取关键字平方后的中间几位或其组合作为散列地址，则使随机分布的关键字得到的散列地址也是随机的，具体所取的位数由表长决定。平方取中法是一种较常用的构造散列函数的方法。

例如，为源程序中的标识符建立一个散列表，假设标识符为字母开头的由字母和数字组成的串。假设人为约定每个标识的内部编码规则如下：把字母在字母表中的位置序号作为该字母的内部编码，如 I 的内部编码为 09，D 的内部编码为 04，A 的内部编码为 01。数字直接用其自身作为内部编码，如 1 的内部编码为 01，2 的内部编码为 02。根据以上编码规则，可知 “IDA1” 的内部编码为 09040101，同理可以得到 “IDB2” “XID3” 和 “YID4” 的内部编码。之后分别对内部编码进行平方运算，再取出第 7 位到第 9 位作为其相应标识符的散列地址，如表 7.2 所示。

<div style="text-align: center;"><div style="text-align: center;">表7.2 标识符及其散列地址</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>标识符</td><td style='text-align: center; word-wrap: break-word;'>内部编码</td><td style='text-align: center; word-wrap: break-word;'>内部编码的平方</td><td style='text-align: center; word-wrap: break-word;'>散列地址</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>IDA1</td><td style='text-align: center; word-wrap: break-word;'>09040101</td><td style='text-align: center; word-wrap: break-word;'>081723426090201</td><td style='text-align: center; word-wrap: break-word;'>426</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>IDB2</td><td style='text-align: center; word-wrap: break-word;'>09040202</td><td style='text-align: center; word-wrap: break-word;'>081725252200804</td><td style='text-align: center; word-wrap: break-word;'>252</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>XID3</td><td style='text-align: center; word-wrap: break-word;'>24090403</td><td style='text-align: center; word-wrap: break-word;'>580347516702409</td><td style='text-align: center; word-wrap: break-word;'>516</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>YID4</td><td style='text-align: center; word-wrap: break-word;'>25090404</td><td style='text-align: center; word-wrap: break-word;'>629528372883216</td><td style='text-align: center; word-wrap: break-word;'>372</td></tr></table>

平方取中法的适用情况：不能事先了解关键字的所有情况，或难于直接从关键字中找到取值较分散的几位。

## 3. 折叠法

将关键字分割成位数相同的几部分（最后一部分的位数可以不同），然后取这几部分的叠加和（舍去进位）作为散列地址，这种方法称为折叠法。根据数位叠加的方式，可以把折叠法分为移位叠加和边界叠加两种。移位叠加是将分割后每一部分的最低位对齐，然后相加；边界叠加是将两个相邻的部分沿边界来回折叠，然后对齐相加。

例如，当散列表长为1000时，关键字key = 45387765213，从左到右每3位分为一组，可以得到4个部分：453、877、652、13。分别采用移位叠加和边界叠加，求得散列地址为995和914，如图7.54所示。

<div style="text-align: center;"><div style="text-align: center;">（a）移位叠加</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）边界叠加</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图7.54 由折叠法求得散列地址</div> </div>

折叠法的适用情况：适合于散列地址的位数较少，而关键字的位数较多，且难于直接从关键字中找到取值较分散的几位。

## 4. 除留余数法

假设散列表表长为 m，选择一个不大于 m 的数 p，用 p 去除关键字，除后所得余数为散列地址，即：

 $$ H(key)=key\%p $$

这个方法的关键是选取适当的 p，一般情况下，可以选 p 为小于表长的最大质数。例如，表长 m=100，可取 p=97。

除留余数法计算简单，适用范围非常广，是最常用的构造散列函数的方法。它不仅可以对关键字直接取模，也可在折叠、平方取中等运算之后取模，这样能够保证散列地址一定落在散列表的地址空间中。

### 7.4.3 处理冲突的方法

选择一个 “好” 的散列函数可以在一定程度上减少冲突，但在实际应用中，很难完全避免发生冲突，所以选择一个有效的处理冲突的方法是散列法的另一个关键。创建散列表和查找散列表都会遇到冲突，两种情况下处理冲突的方法应该一致。下面以创建散列表为例，来说明处理冲突的方法。

处理冲突的方法与散列表本身的组织形式有关。按组织形式的不同，处理冲突的方法通常分两大类：开放地址法和链地址法。

## 1. 开放地址法

开放地址法的基本思想是：把记录都存储在散列表数组中，当某一记录关键字 key 的初始散列地址  $ H_{0} = H(key) $ 发生冲突时，以  $ H_{0} $ 为基础，采取合适方法计算得到另一个地址  $ H_{1} $，如果  $ H_{1} $ 仍然发生冲突，以  $ H_{1} $ 为基础再求下一个地址  $ H_{2} $，若  $ H_{2} $ 仍然冲突，再求得  $ H_{3} $。依次类推，直至  $ H_{k} $ 不发生冲突为止，则  $ H_{k} $ 为该记录在表中的散列地址。

这种方法在寻找 “下一个” 空的散列地址时，原来的数组空间对所有的元素都是开放的，所以称为开放地址法。通常把寻找 “下一个” 空位的过程称为探测，上述方法可用如下公式表示：

 $$ H_{i}=(H(key)+d_{i})\%m\quad i=1,2,\cdots,k(k\leqslant m-1) $$

其中， $ H(key) $ 为散列函数，m 为散列表表长， $ d_{i} $ 为增量序列。根据  $ d_{i} $ 取值的不同，可以分为以下 3 种探测方法。

### （1）线性探测法

 $$ d_{i}=1,2,3,\cdots,m-1 $$

这种探测方法可以将散列表假想成一个循环表，发生冲突时，从冲突地址的下一单元顺序寻找空单元，如果到最后一个位置也没找到空单元，则回到表头开始继续查找，一旦找到一个空位，就把此元素放入此空位中。如果找不到空位，则说明散列表已满，需要进行溢出处理。

（2）二次探测法

 $$ d_{i}=1^{2},-1^{2},2^{2},-2^{2},3^{2},\cdots,k^{2},-k^{2}(k\leqslant m/2) $$

#### （3）伪随机探测法

 $$ d_{i}= 伪随机数序列 $$

例如，散列表的长度为11，散列函数 $ H(key)=key\%11 $，假设表中已填有关键字分别为60、

17、29 的记录，如图 7.55（a）所示。现有第四个记录，其关键字为 38，由散列函数得到散列地址为 5，产生冲突。

若用线性探测法处理时，得到下一个地址6，仍冲突；再求下一个地址7，仍冲突；直到散列地址为8的位置为“空”，处理冲突的过程结束，38填入散列表中序号为8的位置，如图7.55（b）所示。

若用二次探测法，散列地址 5 冲突后，得到下一个地址 6，仍冲突；再求得下一个地址 4，无冲突，38 填入序号为 4 的位置，如图 7.55（c）所示。

若用伪随机探测法，假设产生的伪随机数为9，则计算下一个散列地址为 $ (5+9)\%11=3 $，所以38填入序号为3的位置，如图7.55（d）所示。

<div style="text-align: center;"><div style="text-align: center;">(a) 插入前</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 线性探测法</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）伪随机探测法</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图7.55 用开放地址法处理冲突时，关键字为38的记录插入前后的散列表</div> </div>

从上述线性探测法处理的过程中可以看到一个现象：当表中 i、i+1、i+2 位置上已填有记录时，下一个散列地址为 i、i+1、i+2 和 i+3 的记录都将填入 i+3 的位置，这种在处理冲突过程中发生的两个第一个散列地址不同的记录争夺同一个后继散列地址的现象称作“二次聚集”（或称作“堆积”），即在处理同义词的冲突过程中又添加了非同义词的冲突。

可以看出，上述3种处理方法各有优缺点。线性探测法的优点是：只要散列表未填满，总能找到一个不发生冲突的地址。缺点是：会产生“二次聚集”现象。而二次探测法和伪随机探测法的优点是：可以避免“二次聚集”现象。其缺点也很显然：不能保证一定找到不发生冲突的地址。

## 2. 链地址法

链地址法的基本思想是：把具有相同散列地址的记录放在同一个单链表中，称之为同义词链表。有 m 个散列地址就有 m 个单链表，同时用数组  $ HT[0\cdots m-1] $ 存放各个链表的头指针，凡是散列地址为 i 的记录都以结点方式插入以  $ HT[i] $ 为头结点的单链表。

【例 7.2】已知一组关键字为 (19, 14, 23, 1, 68, 20, 84, 27, 55, 11, 10, 79)，设散列函数  $ H(key) = key \% 13 $，用链地址法处理冲突，试构造这组关键字的散列表。

由散列函数  $ H(key) = key \% 13 $ 得知散列地址的值域为  $ 0 \sim 12 $，故整个散列表由 13 个单链表组成，用数组  $ HT[0..12] $ 存放各个链表的头指针。如散列地址均为 1 的同义词 14、1、27、79 构成一个单链表，链表的头指针保存在  $ HT[1] $ 中，同理，可以构造其他几个单链表，整个散列表的结构如图 7.56 所示。

<div style="text-align: center;"><div style="text-align: center;">图7.56 用链地址法处理冲突时的散列表</div> </div>

这种构造方法在具体实现时，依次计算各个关键字的散列地址，然后根据散列地址将关键字插入相应的链表。

### 7.4.4 散列表的查找

在散列表上进行查找的过程和创建散列表的过程基本一致。算法 7.10 描述了开放地址法（线性探测法）处理冲突的散列表的查找过程。

下面以开放地址法为例，给出散列表的存储表示。

//--- -- -- 开放地址法散列表的存储表示 -- -- -- --
#define m 20
typedef struct{
 KeyType key;
 InfoType otherinfo;
} HashTable[m];
// 散列表的表长
// 关键字项
// 其他数据项

#### 算法 7.10 散列表的查找

【算法步骤】

① 给定待查找的关键字 key，根据创建表时设定的散列函数计算  $ H_{0}=H(key) $。

②若单元 $ H_{0} $为空，则所查元素不存在。

③若单元 $ H_{0} $中元素的关键字为key，则查找成功。

④否则重复下述解决冲突的过程：

按处理冲突的方法，计算下一个散列地址 $ H_{i} $;

若单元 $ H_{i} $为空，则所查元素不存在；

若单元  $ H_{i} $ 中元素的关键字为 key，则查找成功。

散列表的查找

【算法描述】

#define NULLKEY 0 // 单元为空的标记
int SearchHash(HashTable HT,KeyType key)
{ // 在散列表 HT 中查找关键字为 key 的元素，若查找成功，返回散列表的单元标号，否则返回 -1
 H0=H(key); // 根据散列函数 H(key) 计算散列地址
 if (HT[H0].key==NULLKEY) return -1; // 若单元 H0 为空，则所查元素不存在
 else if (HT[H0].key==key) return H0; // 若单元 H0 中元素的关键字为 key，则查找成功
 else

{
 for(i=1;i<m;++i)
 {
 Hi=(HO+i)&m;
 if(HT[Hi].key==NULLKEY) return -1;
 else if(HT[Hi].key==key) return Hi;
 }
 return -1;
}

##### 【算法分析】

从散列表的查找过程可见：

（1）虽然散列表在关键字与记录的存储位置之间建立了直接映像，但由于“冲突”的产生，使得散列表的查找过程仍然是一个给定值和关键字进行比较的过程，因此，仍需以平均查找长度作为散列表查找效率的量度；

（2）查找过程中需和给定值进行比较的关键字的个数取决于3个因素，即散列函数、处理冲突的方法和散列表的装填因子。

散列表的装填因子 $ \alpha $定义为：

 $$ \alpha=\frac{ 表中填入的记录数 }{ 散列表的长度 } $$

 $ \alpha $ 表示散列表的装填程度。直观地看， $ \alpha $ 越小，发生冲突的可能性就越小；反之， $ \alpha $ 越大，表中已填入的记录越多，再填记录时，发生冲突的可能性就越大，则查找时，给定值需与之进行比较的关键字的个数也就越多。

（3）散列函数的“好坏”首先影响出现冲突的频繁程度。但一般情况下认为：凡是“均匀”的散列函数，对同一组随机的关键字，产生冲突的可能性相同。假如所设定的散列函数是“均匀”的，则影响平均查找长度的因素只有两个——处理冲突的方法和装填因子 $ \alpha $。

表7.3给出了在等概率情况下，采用几种不同方法处理冲突时，得到的散列表查找成功和查找失败时的平均查找长度，证明过程从略。

<div style="text-align: center;"><div style="text-align: center;">表7.3 用几种不同方法处理冲突时散列表的平均查找长度</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">处理冲突的方法</td><td colspan="2">平均查找长度</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>查找成功</td><td style='text-align: center; word-wrap: break-word;'>查找失败</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>线性探测法</td><td style='text-align: center; word-wrap: break-word;'>$ \frac{1}{2}\left(1+\frac{1}{1-\alpha}\right) $</td><td style='text-align: center; word-wrap: break-word;'>$ \frac{1}{2}\left(1+\frac{1}{(1-\alpha)^2}\right) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>二次探测法和伪随机探测法</td><td style='text-align: center; word-wrap: break-word;'>$ -\frac{1}{\alpha}\ln(1-\alpha) $</td><td style='text-align: center; word-wrap: break-word;'>$ \frac{1}{1-\alpha} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>链地址法</td><td style='text-align: center; word-wrap: break-word;'>$ 1+\frac{\alpha}{2} $</td><td style='text-align: center; word-wrap: break-word;'>$ \alpha + e^{-\alpha} $</td></tr></table>

（4）从表7.3可以看出，散列表的平均查找长度是 $ \alpha $的函数，而不是记录个数n的函数。由此，在设计散列表时，不管n多大，总可以选择合适的 $ \alpha $以便将平均查找长度限定在一个范围内。

对于一个具体的散列表，通常采用直接计算的方法求其平均查找长度，下面通过具体

示例说明。

【例 7.3】对于例 7.2 中的关键字 (19, 14, 23, 1, 68, 20, 84, 27, 55, 11, 10, 79)，仍设散列函数为  $ H(key) = key \% 13 $，用线性探测法处理冲突。设表长为 16，试构造这组关键字的散列表，并计算查找成功和查找失败时的平均查找长度。

依次计算各个关键字的散列地址，如果没有冲突，将关键字直接存放在相应的散列地址所对应的单元中；否则，用线性探测法处理冲突，直到找到相应的存储单元。

如对于前3个关键字进行计算， $ H(19)=6 $， $ H(14)=1 $， $ H(23)=10 $，所得散列地址均没有冲突，直接填入所在单元。

而对于第四个关键字， $ H(1)=1 $，发生冲突，根据线性探测法，求得下一个地址 $ (1+1)\% $ 16=2，没有冲突，所以1填入序号为2的单元。

同理，可依次填入其他关键字。对于最后一个关键字 79， $ H(79)=1 $，发生冲突，用线性探测法处理冲突，后面的地址 2～8 均有冲突，最终 79 填入 9 号单元。

最终构造结果如表7.4所示，表中最后一行的数字表示放置该关键字时所进行的关键字比较次数。

<div style="text-align: center;"><div style="text-align: center;">表7.4 用线性探测法处理冲突时的散列表</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>散列地址</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>15</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>关键字</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>68</td><td style='text-align: center; word-wrap: break-word;'>27</td><td style='text-align: center; word-wrap: break-word;'>55</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>20</td><td style='text-align: center; word-wrap: break-word;'>84</td><td style='text-align: center; word-wrap: break-word;'>79</td><td style='text-align: center; word-wrap: break-word;'>23</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>比较次数</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

要查找一个关键字 key，根据算法 7.10，首先用散列函数计算  $ H_{0}=H(key) $，然后进行比较，比较的次数和创建散列表时放置此关键字的比较次数是相同的。

例如，查找 19 时，计算散列函数  $ H(19) = 6 $，HT [6].key 非空且值为 19，查找成功，关键字比较次数为 1 次。

同样，当查找关键字 14、68、20、23、11 时，均只需比较 1 次即查找成功。

当查找关键字 1 时，计算散列函数  $ H(1) = 1 $，HT  $ [1] $.key 非空且值为  $ 14 \neq 1 $，用线性探测法处理冲突，计算下一个地址为  $ (1 + 1)\%16 = 2 $，HT  $ [2] $.key 非空且值为 1，查找成功，关键字比较次数为 2。

当查找关键字 55、84、10 时，需比较 3 次；当查找 27 时，需比较 4 次；而查找 79 时，需要比较 9 次才能查找成功。

在记录的查找概率相等的前提下，这组关键字采用线性探测法处理散列表冲突时，查找成功时的平均查找长度为：

 $$ A S L_{s u c c}=\frac{1}{12}\times\left(1\times6+2+3\times3+4+9\right)=2.5 $$

查找失败时有两种情况：

（1）单元为空；

（2）按处理冲突的方法探测一遍后仍未找到。假设散列函数的取值个数为 r，则  $ 0 \sim r - 1 $ 相当于 r 个查找失败的入口，从每个入口进入后，直到确定查找失败为止，其关键字的比较次数就是与该入口对应的查找失败的查找长度。

在例7.3中，散列函数的取值个数为13，即总共有13个查找失败的入口（0～12），对每个入口依次进行计算。

假设待查找的关键字不在表中，若计算散列函数  $ H(key) = 0 $， $ HT[0].key $ 为空，比较 1 次即

确定查找失败。若  $ H(key) = 1 $， $ HT[1] $.key 非空，则依次向后比较，直到  $ HT[13] $.key 为空，总共比较 13 次才能确定查找失败。类似地，对  $ H(key) = 2, 3, \cdots, 12 $ 进行分析，可得查找失败的平均查找长度为：

 $$ A S L_{unsucc}=\frac{1}{13}\times\left(1+13+12+11+10+9+8+7+6+5+4+3+2\right)=7 $$

在例7.2中，采用链地址法处理冲突时，对于图7.56中所示的每个单链表中的第1个结点的关键字（如14、68、19、20、23、11），查找成功时只需比较1次；而对于第2个结点的关键字（如1、55、84、10），查找成功时需比较2次；第3个结点的关键字27需比较3次；第4个结点的关键字79则需比较4次才能查找成功。这时，查找成功时的平均查找长度为：

 $$ ASL_{succ}=\frac{1}{12}\times\left(1\times6+2\times4+3+4\right)=1.75 $$

采用链地址法处理冲突时，待查的关键字不在表中，若计算散列函数  $ H(key) = 0 $， $ HT[0] $ 的指针域为空，比较 1 次即确定查找失败。若  $ H(key) = 1 $， $ HT[1] $ 所指的单链表包括 4 个结点，所以需要比较 5 次才能确定失败。类似地，对  $ H(key) = 2, 3, \cdots, 12 $ 进行分析，可得查找失败的平均查找长度为：

 $$ ASL_{unsucc}=\frac{1}{13}\times(1+5+1+3+1+1+3+2+1+1+3+2+1)\approx1.92 $$

容易看出，线性探测法在处理冲突的过程中易产生记录的二次聚集，使得散列地址不相同的记录又产生新的冲突；而链地址法处理冲突不会发生类似情况，因为散列地址不同的记录在不同的链表中，所以链地址法的平均查找长度小于开放地址法的。另外，由于链地址法的结点空间是动态申请的，无须事先确定表的容量，因此更适用于表长不确定的情况。同时，链地址法易于实现插入和删除操作。

通过上面的示例，可以看出，在查找概率相等的前提下，直接计算查找成功的平均查找长度可以采用以下公式：

 $$ ASL_{succ}=\frac{1}{n}\sum_{i=1}^{n}C_{i} $$

其中，n 为散列表中记录的个数， $ C_{i} $ 为成功查找第 i 个记录所需的比较次数。

而直接计算查找失败的平均查找长度可以采用以下公式：

 $$ ASL_{unsucc}=\frac{1}{r}\sum_{i=1}^{r}C_{i} $$

其中，r 为散列函数取值的个数， $ C_{i} $ 为散列函数取值为 i 时查找失败的比较次数。

### 【算法练习题7.1】LeetCode235二叉搜索树的最近公共祖先

【问题描述】

给定一棵二叉排序树（又称二叉搜索树），要求找到该树中两个指定结点的最近公共祖先。最近公共祖先的定义：对于有根树 T 的两个结点 p 和 q，最近公共祖先为一个结点 x，满足 x 是 p 和 q 的祖先且 x 的深度尽可能大，p 和 q 中的一个结点也可以是自己的祖先。

#### 【输入输出示例】

输入：root = [6, 2, 8, 0, 4, 7, 9, NULL, NULL, 3, 5]，p=2，q=8

该二叉排序树如图 7.57 所示。

输出：6

解释：结点2和结点8的最近公共祖先是结点6。

##### 【问题分析】

本题可以从根结点开始遍历，比较当前结点 ancestor 的值与结点 p 和 q 的值的大小关系，若结点 ancestor 的值大于结点 p 和 q 的值，说明结点 p 和 q 在结点 ancestor 的左子树，则继续遍历结点 ancestor 的值。

<div style="text-align: center;"><div style="text-align: center;">图7.57 二叉排序树</div> </div>

的左子树；若结点 ancestor 的值小于结点 p 和 q 的值，说明结点 p 和 q 在结点 ancestor 的右子树，则继续遍历结点 ancestor 的右子树；若不满足以上两个条件，则此时结点 p 和 q 在结点 ancestor 的不同子树，或者结点 p 和 q 中的一个结点就是结点 ancestor，说明结点 ancestor 就是结点 p 和 q 的公共祖先。图 7.58 所示为寻找二叉排序树中结点 3 和 5 的最近公共祖先的具体实现步骤。

<div style="text-align: center;"><div style="text-align: center;">（a）初始时p和q所在位置</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）从根结点开始遍历二叉排序树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）当前结点的值大于p和q的值，遍历当前结点的左孩子</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 7.58 LeetCode 235 具体实现步骤</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（e）找到p到q的最近公共祖先</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 7.58 LeetCode 235 具体实现步骤（续）</div> </div>

##### 【算法步骤】

① 定义指针 ancestor，初始时指向二叉排序树的根结点。

②遍历二叉排序树，循环执行以下操作：

若 ancestor 所指结点的值大于 p 和 q 的值，将 ancestor 指向左孩子；

若 ancestor 所指结点的值小于 p 和 q 的值，将 ancestor 指向右孩子；

若不符合以上两种情况，跳出循环。

③ 返回 p 和 q 的最近公共祖先，即结点 ancestor。

【算法描述】

typedef struct TreeNode
{
// 二叉树的二叉链表存储结构
int val;
// 结点指针域
struct TreeNode *left, *right;
// 左右孩子指针
}TreeNode, * BiTree;
struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q)
{
// 查找二叉排序树的最近公共祖先
struct TreeNode* ancestor = root;
while (true) {
 // 从根结点开始遍历
}
if (ancestor->val > p->val && ancestor->val > q->val)
 ancestor = ancestor->left; // ancestor的值大于结点p和q的值，遍历左子树
 else if (ancestor->val < p->val && ancestor->val < q->val)
 ancestor = ancestor->right; // ancestor的值小于结点p和q的值，遍历右子树
}

else
break;
}
return ancestor; // 返回最近公共祖先
}

##### 【算法分析】

算法运行所需时间与结点 p 和 q 在二叉排序树中的深度线性相关，最坏的情况下，树呈现链式结构，结点 p 和 q 是树的唯一叶子结点和另一个结点是该叶子结点的父结点，此时算法的时间复杂度为  $ O(n) $，整体复杂度为  $ O(n) $；算法不需要额外空间，因此空间复杂度为  $ O(1) $。

##### 【问题描述】

给定一个按照非递减顺序排列的整数数组 nums 和一个目标值 target，请找出给定目标值在数组中的开始位置和结束位置，如果数组中不存在目标值 target，返回 [-1, -1]，要求算法的时间复杂度为  $ O(\log_2 n) $。

【输入输出示例】

输入：nums=[5,7,7,8,8,10]，target=8

输出：[3,4]

##### 【问题分析】

由于给定的整数数组中的元素是按照非递减顺序排列的，因此，本题可以利用二分查找实现。查找给定目标值 target 在数组中的开始和结束位置，就是查找数组中第一个大于或等于 target 的元素的下标和第一个大于 target 的元素的下标减 1，得到 target 在数组中的开始位置 leftIdx 和结束位置 rightIdx。leftIdx 和 rightIdx 的查找过程为，定义函数 binarySearch（몰수를 잘 골라져 보여야 한다）后，通过两次调用该函数，实现对 nums 的两次二分查找，如果变量 lower 为 true，则查找数组中第一个大于等于 target 的元素下标，否则，查找第一个大于 target 的元素下标。若 leftIdx 小于或等于 rightIdx，rightIdx 小于数组长度，且 leftIdx 和 rightIdx 对应的元素都等于目标值，则返回左右边界 leftIdx 和 rightIdx，否则，数组中不存在 target，返回 [-1, -1]。具体实现步骤如图 7.59 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）初始时left和right分别指向数组两端</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）mid指向数组(left + right)/2位置</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) nums[mid]小于target，令left = mid+1</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）重新获取mid的值</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图7.59 LeetCode 34 具体实现步骤</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（e）nums[mid]等于target且lower为true，令right = mid - 1</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(f) 重新获取 mid 的值</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(g) 得到leftldx的值</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（h）初始时left和right分别指向数组两端</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（i）mid指向数组(left + right)/2位置</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(j) nums[mid]小于target，令left = mid + 1</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（k）重新获取mid的值</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（1）nums[mid]等于target且lower为false，令left = mid + 1</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（m）重新获取mid的值，得到rightldx的值</div> </div>

<div style="text-align: center;"><div style="text-align: center;">返回[3,4]</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（n）返回开始位置和结束位置</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图7.59 LeetCode 34具体实现步骤（续）</div> </div>

【算法步骤】

① 调用函数 binarySearch（nums，target，lower），在 nums 中执行二分查找，确定 target 的左右边界 leftIdx 和 rightIdx。

②定义数组 ret，用于存放开始位置和结束位置，设数组元素个数为 2。

③ 若 leftIdx 小于或等于 rightIdx，rightIdx 小于数组长度，且 leftIdx 和 rightIdx 对应的元素都等于目标值，则返回左右边界 leftIdx 和 rightIdx，否则，数组中不存在 target，返回  $ [-1, -1] $。

【算法描述】

int binarySearch(int* nums, int numsSize, int target, bool lower)
{
 // 二分查找，返回 nums 数组中二分查找 target 的位置
 int left=0, right=numsSize-1, ans=numsSize;
 while (left<=right)
 {
 int mid=(left+right)/2;
 if (nums[mid]>target||(lower && nums[mid]>=target))
 {
 // 返回 nums 数组中第一个等于 target 的位置或第一个大于 target 的位置
 right=mid-1;
 ans=mid;
 }
 else
 left=mid+1;
 }
 return ans;
 }

 int* searchRange(int* nums, int numsSize, int target, int* returnSize)
 {
 // 查找给定目标值在数组中的开始位置和结束位置
 int leftIdx=binarySearch(nums, numsSize, target, true);
 int rightIdx=binarySearch(nums, numsSize, target, false)-1;
 int* ret=new int[sizeof(int)*2];
 *returnSize=2;
 if (leftIdx<=rightIdx && rightIdx<numsSize && nums[leftIdx]==target && nums[rightIdx]==target)
 {
 // 存在目标值且 num 数组中 leftIdx 和 rightIdx 的位置所存元素均为 target
 ret[0]=leftIdx, ret[1]=rightIdx;
 return ret;
 }
 ret[0]=-1, ret[1]=-1;
 // 不存在目标值，返回 [-1,-1]
 return ret;
 }

##### 【算法分析】

二分查找的时间复杂度为  $ O(\log_{2}n) $，一共会执行两次，所以算法总时间复杂度为  $ O(\log_{2}n) $；算法只需要常数个变量空间，所以空间复杂度为  $ O(1) $。

【算法练习题7.3】LeetCode 153 寻找旋转排序数组中的最小值 ★

【问题描述】

已知一个长度为 n 的数组按照升序排列，经过 1 到 n 次旋转后，得到输入数组。例如，原数组  $ 믬_{ums} = [0, 1, 2, 4, 5, 6, 7] $，旋转 4 次，则可以得到  $ [4, 5, 6, 7, 0, 1, 2] $，旋转 7 次，则可以得到  $ [0, 1, 2, 4, 5, 6, 7] $。

注意，数组  $ [a[0], a[1], a[2], \cdots, a[n-1]] $ 旋转一次的结果为数组  $ [a[n-1], a[0], a[1], a[2], \cdots, a[n-2]] $。

给定一个元素值互不相同的数组 nums，它原来是一个升序排列的数组，按上述情形进行了多次旋转，请编写时间复杂度为  $ O(\log_2 n) $ 的算法，找出并返回数组中的最小元素。

【输入输出示例】

输入：nums = [3, 4, 5, 1, 2]

输出：1

解释：原数组为 $ [1,2,3,4,5] $，旋转3次得到输入数组。

##### 【问题分析】

一个不包含重复元素的长度为  $  \text{numsSize}  $ 的升序数组在经过旋转之后，可以得到如图 7.60 所示的折线图，其中横轴表示数组元素的下标，纵轴表示数组元素的值。图中标出的最小值就是本题需要查找的数组中的最小元素。对于数组中的最后一个元素  $  x  $，在最小值右侧的元素（不包括最后一个元素本身）的值一定都严格小于  $  x  $，而在最小值左侧的元素的值一定都严格大于  $  x  $。基于以上分析，本题可以通过二分查找的方法找出最小值。分别用 low 和 high 来表示当前查找区间的下界和上界，mid 为区间的中间位置。若  $  \text{nums}[mid] < \text{nums}[high]  $，说明  $  \text{nums}[mid]  $ 是最小值右侧的元素，此时，可以忽略二分查找区间的右半部分，继续二分查找左半部分，若  $  \text{nums}[mid] > \text{nums}[high]  $，说明  $  \text{nums}[mid]  $ 是最小值左侧的元素，此时，可以忽略二分查找区间的左半部分，继续二分查找右半部分，二分查找结束，返回最小值。

<div style="text-align: center;"><div style="text-align: center;">图7.60 经过旋转后的数组折线图</div> </div>

设  $ x = \text{nums}[mid] $ 为当前二分取到的数，如果  $ x > \text{nums}[n-1] $，则可以推断数组  $ n $ums 被分为两个递增段，第一段的所有元素均大于第二段的所有元素，因此， $ x $ 位于最小值的左侧；如果  $ x <= \text{nums}[n-1] $，则可以推断  $ x $ 一定位于第二个递增段，或者数组  $ n $ums 本身是递增数组（此时只有一个递增段），因此， $ x $ 要么是最小值，要么位于最小值的右边。通过不断比较  $ x $ 与  $ n $ums $ [n-1] $ 的大小关系，可以间接地确定  $ x $ 和数组最小值的位置关系，从而在二分查找过程中不断缩小数组最小值所在的位置范围，最终找到数组的最小值。

【算法步骤】

① 置查找区间初值，low = 0、high = numsSize - 1。

②遍历数组 nums，循环执行以下操作：

设置 mid=(low+ high)/2；

如果 nums[mid] < nums[high]，则 high = mid，否则 low = mid+1。

③遍历结束，返回最小值 nums[low]。

【算法描述】

int findMin(int* nums, int numsSize) {
 // 查找经过旋转后的数组中的最小元素
 int low = 0;
 int high = numsSize - 1;
 while (low < high) {
 int mid = (low + high) / 2;

if (nums[mid] < nums[high])
 high = mid;
else
 low = mid + 1;
}
return nums[low];
}

【算法分析】

在二分查找的过程中，每一步会忽略一半的区间，因此时间复杂度为  $ O(\log_{2}n) $；算法不需要额外空间，因此空间复杂度为  $ O(1) $。

## 7.6 小结

查找是数据处理中经常使用的一种操作。本章主要介绍了对查找表的查找，查找表实际上仅仅是一个集合，为了提高查找效率，将查找表组织成不同的数据结构，主要包括3种不同结构的查找表：线性表、树表和散列表。

（1）线性表的查找。基于线性表的查找方法主要包括顺序查找、折半查找和分块查找，3者之间的比较详见表7.5。

<div style="text-align: center;"><div style="text-align: center;">表7.5 顺序查找、折半查找和分块查找的比较</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">比较项目</td><td colspan="3">查找方法</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>顺序查找</td><td style='text-align: center; word-wrap: break-word;'>折半查找</td><td style='text-align: center; word-wrap: break-word;'>分块查找</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>查找时间复杂度</td><td style='text-align: center; word-wrap: break-word;'>$ O(n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(\log_{2}n) $</td><td style='text-align: center; word-wrap: break-word;'>与确定所在块的查找方法有关</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>特点</td><td style='text-align: center; word-wrap: break-word;'>算法简单，对表结构无任何要求，但查找效率较低</td><td style='text-align: center; word-wrap: break-word;'>对表结构要求较高，查找效率较高</td><td style='text-align: center; word-wrap: break-word;'>对表结构有一定要求，查找效率介于折半查找和顺序查找之间</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>适用情况</td><td style='text-align: center; word-wrap: break-word;'>任何结构的线性表，不经常进行插入和删除</td><td style='text-align: center; word-wrap: break-word;'>有序的顺序表，不经常进行插入和删除</td><td style='text-align: center; word-wrap: break-word;'>块间有序、块内无序的顺序表，经常进行插入和删除</td></tr></table>

（2）树表的查找。树表的结构主要包括二叉排序树、平衡二叉树、红黑树、B-树和B+树。

①二叉排序树的查找过程与折半查找的过程类似，二者之间的比较详见表7.6。

<div style="text-align: center;"><div style="text-align: center;">表7.6 折半查找和二叉排序树查找的比较</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">比较项目</td><td colspan="2">查找方法</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>折半查找</td><td style='text-align: center; word-wrap: break-word;'>二叉排序树的查找</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>查找时间复杂度</td><td style='text-align: center; word-wrap: break-word;'>$ O(\log_2n) $</td><td style='text-align: center; word-wrap: break-word;'>$ O(\log_2n) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>特点</td><td style='text-align: center; word-wrap: break-word;'>数据结构采用有序的顺序表，进行插入和删除操作需移动大量元素</td><td style='text-align: center; word-wrap: break-word;'>数据结构采用树的二叉链表表示，进行插入和删除操作无须移动元素，只需修改指针</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>适用情况</td><td style='text-align: center; word-wrap: break-word;'>不经常进行插入和删除的静态查找表</td><td style='text-align: center; word-wrap: break-word;'>经常进行插入和删除的动态查找表</td></tr></table>

②二叉排序树在形态均匀时性能最好，而当其形态为单支树时其查找性能则退化为与顺序查找的性能相同，因此，二叉排序树最好是平衡二叉树。平衡二叉树的平衡调整方法就是确保二叉排序树在任何情况下的深度均为  $ O(\log_2 n) $，平衡调整方法分为4种：LL型、RR型、LR型和RL型。

③红黑树是指每个结点都带有颜色属性的二叉排序树，其颜色不是红色就是黑色，并且要在二叉排序树的基础上满足一些特殊的性质。红黑树是在平衡二叉树的基础上牺牲严格的平衡，降低对旋转的要求，通过少量的旋转操作达到平衡，从而提高性能。

④ B- 树是一种平衡的多叉查找树，是一种在外存文件系统中常用的动态索引技术。在 B- 树上进行查找的过程和在二叉排序树上进行查找的过程类似，是一个顺指针查找结点和查找结点内的关键字交叉进行的过程。为了确保 B- 树的定义，在 B- 树中插入一个关键字，可能产生结点的“分裂”；而删除一个关键字，可能产生结点的“合并”。

⑤ B+ 树是一种 B− 树的变形，更适合做文件系统的索引。在 B+ 树上进行随机查找、插入和删除的过程基本上与在 B− 树上进行类似，但具体实现细节又有所区别。

（3）散列表的查找。散列表也属线性结构，但它的查找和线性表的查找有着本质的区别。它不是以关键字比较为基础进行查找的，而是通过散列函数把记录的关键字和它在表中的位置建立起对应关系，并在存储记录发生冲突时采用专门的处理冲突的方法。这种方式构造的散列表，不仅平均查找长度和记录总数无关，而且可以通过调节装填因子，把平均查找长度控制在所需的范围内。

散列查找法主要研究两方面的问题：如何构造散列函数，以及如何处理冲突。

① 构造散列函数的方法很多，除留余数法是最常用的构造散列函数的方法。它不仅可以对关键字直接取模，也可在折叠、平方取中等运算之后取模。

②处理冲突的方法通常分为两大类，即开放地址法和链地址法，二者之间的差别类似于顺序表和单链表的差别，二者的比较详见表7.7。

<div style="text-align: center;"><div style="text-align: center;">表7.7 开放地址法和链地址法的比较</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2" colspan="2">比较项目</td><td colspan="2">处理方法</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>开放地址法</td><td style='text-align: center; word-wrap: break-word;'>链地址法</td></tr><tr><td colspan="2">空间</td><td style='text-align: center; word-wrap: break-word;'>无指针域，存储效率较高</td><td style='text-align: center; word-wrap: break-word;'>附加指针域，存储效率较低</td></tr><tr><td rowspan="2">时间</td><td style='text-align: center; word-wrap: break-word;'>查找</td><td style='text-align: center; word-wrap: break-word;'>有二次聚集现象，查找效率较低</td><td style='text-align: center; word-wrap: break-word;'>无二次聚集现象，查找效率较高</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>插入、删除</td><td style='text-align: center; word-wrap: break-word;'>不易实现</td><td style='text-align: center; word-wrap: break-word;'>易于实现</td></tr><tr><td colspan="2">适用情况</td><td style='text-align: center; word-wrap: break-word;'>表的大小固定，适于表长无变化的情况</td><td style='text-align: center; word-wrap: break-word;'>结点动态生成，适于表长经常变化的情况</td></tr></table>

学习完本章后，读者应掌握顺序查找、折半查找和分块查找的方法，掌握描述折半查找过程的判定树的构造方法；掌握二叉排序树的构造和查找方法，平衡二叉树的4种平衡调整方法；理解B-和B+树的特点、基本操作和二者的区别；熟练掌握散列表的构造方法；明确各种不同查找方法之间的区别和各自的适用情况，能够按定义计算各种查找方法在等概率情况下查找成功的平均查找长度。

1. 选择题

（1）对包含 n 个元素的表进行顺序查找时，若查找每个元素的概率相同，则平均查找长度为（）。

A.  $ (n-1)/2 $ B. n/2 C.  $ (n+1)/2 $ D. n

（2）适用于折半查找的表的存储方式，以及元素排列要求为()。

A. 链接方式存储，元素无序 B. 链接方式存储，元素有序

C．顺序方式存储，元素无序 D．顺序方式存储，元素有序

（3）如果要求一个线性表既能较快地查找，又能适应动态变化的要求，最好采用（___）查找法。

A. 顺序查找 B. 折半查找 C. 分块查找 D. 哈希查找

（4）折半查找有序表（4，6，10，12，20，30，50，70，88，100）。若查找表中元素 58，则它将依次与表中（___）比较大小，查找结果是失败。

A. 20、70、30、50 B. 30、88、70、50 C. 20、50 D. 30、88、50

（5）对22个记录的有序表进行折半查找，当查找失败时，至少需要比较（）次关键字。

A. 3 B. 4 C. 5 D. 6

（6）折半查找与二叉排序树的时间性能（）。

A. 相同 B. 完全不同 C. 有时不相同 D. 数量级都是  $ O(\log_{2} n) $

（7）分别以下列序列构造二叉排序树，与用其他3个序列所构造的结果不同的是（）。

A. (100, 80, 90, 60, 120, 110, 130) B. (100, 120, 110, 130, 80, 60, 90)

C. (100, 60, 80, 90, 120, 110, 130) D. (100, 80, 60, 90, 120, 130, 110)

（8）在平衡二叉树中插入一个结点后造成了不平衡，设最低的不平衡结点为 A，并已知 A 的左孩子的平衡因子为 0，右孩子的平衡因子为 1，则应作（）型调整以使其平衡。

A. LL B. LR C. RL D. RR

（9）下列关于 m 阶 B- 树的说法错误的是（）。

A. 根结点至多有 m 棵子树

B. 所有叶子都在同一层次上

C. 非叶子结点至少有 m/2 (m 为偶数) 或 m/2 + 1 (m 为奇数) 棵子树

D. 根结点中的数据是有序的

（10）下面关于 B− 和 B+ 树的叙述中，不正确的是（）。

A. B- 树和 B + 树都是平衡的多叉树

B. B- 树和 B + 树都可用于文件的索引结构

C. B- 树和 B + 树都能有效地支持顺序检索

D. B- 树和 B+ 树都能有效地支持随机检索

（11）m 阶 B- 树是一棵（）。

A. m 叉排序树

B. m 叉平衡排序树

C. m-1 叉平衡排序树

D.  $ m+1 $ 叉平衡排序树

（12）下面关于散列查找的说法，正确的是（）。

A. 散列函数构造得越复杂越好，因为这样随机性好，冲突小

B. 除留余数法是所有散列函数中最好的

C. 不存在特别好与特别坏的散列函数，要视情况而定

D. 散列表的平均查找长度有时也和记录总数有关

（13）下面关于散列查找的说法，不正确的是（）。

A. 采用链地址法处理冲突时，查找任何一个元素的时间都相同

B．采用链地址法处理冲突时，若规定插入总是在链首，则插入任一个元素的时间是相同的

C. 用链地址法处理冲突，不会引起二次聚集现象

D．用链地址法处理冲突，适合表长不确定的情况

（14）设散列表长为14，散列函数是 $ H(key)=key\%11 $，表中已有数据的关键字为15、38、61、84这4个，现要将关键字为49的元素加到表中，用二次探测法解决冲突，则放入的位置是()。

A. 3 B. 5 C. 8 D. 9

（15）假设将一棵红黑树的每一个红色结点“吸收”到它的黑色父结点中，使得红色结点的子结点变成黑色父结点的子结点（忽略关键字的变化）。当一个黑结点的所有红色子结点都被吸收后，它可能的度为（）。

A. 123 B. 234 C. 345 D. 124

2. 应用题

（1）假定对有序表（3,4,5,7,24,30,42,54,63,72,87,95）进行折半查找，试回答下列问题。

① 画出描述折半查找过程的判定树。

②若查找元素54，需依次与哪些元素比较？

③若查找元素90，需依次与哪些元素比较？

④假定每个元素的查找概率相等，求查找成功时的平均查找长度。

（2）在一棵空的二叉排序树中依次插入关键字序列（12, 7, 17, 11, 16, 2, 13, 9, 21, 4），请画出所得到的二叉排序树。

（3）已知如下所示长度为12的表(Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)。

① 试按表中元素的顺序依次插入一棵初始为空的二叉排序树，画出插入完成之后的二叉排序树，并求其在等概率的情况下查找成功的平均查找长度。

②若对表中元素先进行排序构成有序表，求在等概率的情况下对此有序表进行折半查找时查找成功的平均查找长度。

③按表中元素顺序构造一棵平衡二叉排序树，并求其在等概率的情况下查找成功的平均查找长度。

（4）对图7.61所示的3阶B-树，依次执行下列操作，画出各步操作的结果。

<div style="text-align: center;"><div style="text-align: center;">图7.61 3阶B-树</div> </div>

①插入90；

②插入25；

③插入45；

④ 删除 60。

（5）设散列表的地址范围为  $ 0 \sim 17 $，散列函数为  $ H(key) = key\%16 $。用线性探测法处理冲突，输入关键字序列  $ (10, 24, 32, 17, 31, 30, 46, 47, 40, 63, 49) $，构造散列表，试回答下列问题。

①画出散列表的示意图。

②若查找关键字63，需要依次与哪些关键字进行比较？

③若查找关键字60，需要依次与哪些关键字进行比较？

④假定每个关键字的查找概率相等，求查找成功时的平均查找长度。

（6）设有一组关键字（9, 1, 23, 14, 55, 20, 84, 27），采用散列函数  $ H(key) = key\%7 $，表长为 10，用开放地址法的二次探测法处理冲突。要求：对该关键字序列构造散列表，并计算查找成功的平均查找长度。限定  $ d_i $ 取值为  $ 1^2, 2^2, \cdots, k^2 (k \leq m/2) $。

（7）设散列函数  $ H(K) = 3K\% $ 11，散列地址空间为  $ 0 \sim 10 $，对关键字序列 (32, 13, 49, 24, 38, 21, 4, 12)，按下述两种解决冲突的方法构造散列表，并分别求出等概率下查找成功时和查找失败时的平均查找长度  $ ASL_{succ} $ 和  $ ASL_{unsucc} $。

①线性探测法。

② 链地址法。

## 3. 算法设计题

（1）试设计折半查找的递归算法。

（2）试设计一个判别给定二叉树是否为二叉排序树的算法。

（3）已知二叉排序树采用二叉链表存储结构，根结点的指针为 T，链结点的结构为 (lchild, data, rchild)，其中 lchild、rchild 分别指向该结点左、右孩子的指针，data 存放结点的数据信息。请设计递归算法，从小到大输出二叉排序树中所有数据值大于等于 x 的结点的数据。要求先找到第一个满足条件的结点后，再依次输出其他满足条件的结点。

（4）已知二叉树 T 的结点形式为 (link, data, count, rlink)，在树中查找值为 X 的结点，若找到，则记数（count）加 1；否则，将其作为一个新结点插入树中，插入后树仍为二叉排序树，设计其非递归算法。

（5）假设一棵平衡二叉树的每个结点都标明了平衡因子b，试设计一个算法，求平衡二叉树的高度。

（6）分别设计在散列表中插入和删除关键字为 K 的一个记录的算法，设散列函数为 H，解决冲突的方法为链地址法。
