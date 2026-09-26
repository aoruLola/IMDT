# 第6章 图

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


图是一种比线性表和树更为复杂的数据结构。在线性表中，数据元素之间仅有线性关系，每个数据元素只有一个直接前驱和一个直接后继；在树结构中，数据元素之间有着明显的层次关系，并且每一层中的数据元素可能和下一层中的多个元素（其孩子结点）相关，但只能和上一层中一个元素（其双亲结点）相关；而在图结构中，结点之间的关系可以是任意的，图中任意两个数据元素都可能相关。由此，图的应用极为广泛，已渗入诸如物理、化学、通信、计算机，以及数学等领域。在离散数学中，图论是专门研究图的性质的数学分支，而在数据结构中，则应用图论的知识讨论如何在计算机上实现图的操作，因此本章主要介绍图的存储结构，以及若干图的操作的实现。

## 6.1.1 图的定义

图（Graph）G 由两个集合 V 和 E 组成，记为  $ G = (V, E) $，其中 V 是顶点的有穷非空集合，E 是 V 中顶点偶对的有穷集合，这些顶点偶对称为边。 $ V(G) $ 和  $ E(G) $ 通常分别表示图 G 的顶点集合和边集合， $ E(G) $ 可以为空集。若  $ E(G) $ 为空，则图 G 只有顶点而没有边。

对于图 G，若边集  $ E(G) $ 为有向边的集合，则称该图为有向图；若边集  $ E(G) $ 为无向边的集合，则称该图为无向图。

在有向图中，顶点对  $ <x, y> $ 是有序的，它称为从顶点 x 到顶点 y 的一条有向边。因此， $ <x, y> $ 与  $ <y, x> $ 是不同的两条边。顶点对用尖括号括起来，对  $ <x, y> $ 而言，x 是有向边的始点，y 是有向边的终点。 $ <x, y> $ 也称作一条弧，则 x 为弧尾，y 为弧头。

在无向图中，顶点对 $ (x,y) $是无序的，它称为与顶点x和顶点y相关联的一条边。这条边没有特定的方向， $ (x,y) $与 $ (y,x) $是同一条边。为了有别于有向图，无向图的顶点对用一对圆括号括起来。

图 6.1 分别给出了有向图和无向图的示例。

<div style="text-align: center;"><div style="text-align: center;">（a）有向图 $ G_{1} $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）无向图 $ G_{1} $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.1 图的示例</div> </div>

### 6.1.2 图的基本术语

用 n 表示图中顶点数目，用 e 表示边的数目，下面介绍图结构中的一些基本术语。

（1）子图：假设有两个图  $ G = (V, E) $ 和  $ G' = (V', E') $，如果  $ V' \subseteq V $ 且  $ E' \subseteq E $，则称  $ G' $ 为  $ G $ 的子图。例如，图 6.2 所示为图 6.1 中  $ G_1 $ 和  $ G_2 $ 的子图示例。

<div style="text-align: center;"><div style="text-align: center;">（a）G_{1}的子图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(6)  $ G_{2} $ 的子图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.2 子图示例</div> </div>

（2）无向完全图和有向完全图：对于无向图，若具有 $ n(n-1)/2 $条边，则称为无向完全图。对于有向图，若具有 $ n(n-1) $条弧，则称为有向完全图。

（3）稀疏图和稠密图：有很少条边或弧（如  $ e < n \log_2 n $）的图称为稀疏图，反之称为稠密图。

（4）权和网：在实际应用中，每条边可以标上具有某种含义的数值，该数值称为该边上的权。这些权可以表示从一个顶点到另一个顶点的距离或耗费。这种带权的图通常称为网。

（5）邻接点：对于无向图  $ G $，如果图的边  $ (v, v') \in E $，则称顶点  $ v $ 和  $ v' $ 互为邻接点，即  $ v $ 和  $ v' $ 相邻接。边  $ (v, v') $ 依附于顶点  $ v $ 和  $ v' $，或者说边  $ (v, v') $ 与顶点  $ v $ 和  $ v' $ 相关联。

（6）度、入度和出度：顶点 v 的度是指和 v 相关联的边的数目，记为  $ TD(v) $。例如，图 6.1（b）中  $ G_{2} $ 的顶点  $ v_{3} $ 的度是 3。对于有向图，顶点 v 的度分为入度和出度。入度是以顶点 v 为头的弧的数目，记为  $ ID(v) $；出度是以顶点 v 为尾的弧的数目，记为  $ OD(v) $。顶点 v 的度为  $ TD(v) = ID(v) + OD(v) $。例如，图 6.1 中  $ G_{1} $ 的顶点  $ v_{1} $ 的入度  $ ID(v_{1}) = 1 $，出度  $ OD(v_{1}) = 2 $，度  $ TD(v_{1}) = ID(v_{1}) + OD(v_{1}) = 3 $。一般地，如果顶点  $ v_{i} $ 的度记为  $ TD(v_{i}) $，那么一个有 n 个顶点，e 条边的图，满足如下关系：

 $$ e=\frac{1}{2}\sum_{i=1}^{n}TD\left(v_{i}\right) $$

（7）路径和路径长度：在无向图  $ G $ 中，从顶点  $ v $ 到顶点  $ v' $ 的路径是一个顶点序列  $ (v = v_{i,0}, v_{i,1}, \cdots, v_{i,m} = v') $，其中  $ (v_{i,j-1}, v_{i,j}) \in E $， $ 1 \leq j \leq m $。如果  $ G $ 是有向图，则路径也是有向的，顶点序列应满足  $ <v_{i,j-1}, v_{i,j} \in E $， $ 1 \leq j \leq m $。路径长度是一条路径上经过的边或弧的数目。

（8）回路或环：第一个顶点和最后一个顶点相同的路径称为回路或环。

（9）简单路径、简单回路或简单环：序列中顶点不重复出现的路径称为简单路径。除了第一个顶点和最后一个顶点之外，其余顶点不重复出现的回路，称为简单回路或简单环。

（10）连通、连通图和连通分量：在无向图  $ G $ 中，如果从顶点  $ v $ 到顶点  $ v' $ 有路径，则称  $ v $ 和  $ v' $ 是连通的。如果对于图中任意两个顶点  $ v_i, v_j \in V $， $ v_i $ 和  $ v_j $ 都是连通的，则称  $ G $ 是连通图。

图6.1（b）中的  $ G_{2} $ 就是一个连通图，而图6.3（a）中的  $ G_{3} $ 则是非连通图，但  $ G_{3} $ 有3个连通分量，如图6.3（b）所示。所谓连通分量，指的是无向图中的极大连通子图。

<div style="text-align: center;"><div style="text-align: center;">（b） $ G_{A} $ 的3个连通分量</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.3 无向图及其连通分量</div> </div>

（11）强连通图和强连通分量：在有向图  $ G $ 中，如果对于每一对  $ v_i, v_j \in V, v_i \neq v_j $，从  $ v_i $ 到  $ v_j $ 和从  $ v_j $ 到  $ v_i $ 都存在路径，则称  $ G $ 是强连通图。有向图中的极大强连通子图称作有向图的强连通分量。例如图 6.1（a）中的  $ G_1 $ 不是强连通图，但它有两个强连通分量，如图 6.4 所示。

<div style="text-align: center;"><div style="text-align: center;">图6.4  $ G_{1} $ 的两个强连通分量</div> </div>

（12）连通图的生成树：一个极小连通子图，它含有图中全部顶点，但只有足以构成一棵树的 n-1 条边，这样的连通子图称为连通图的生成树。图 6.5 所示为  $ G_{3} $ 中最大连通分量的一棵生成树。如果在一棵生成树上添加一条边，必定构成一个环，因为这条边使得它依附的那两个顶点之间有了第二条路径。

一棵有 n 个顶点的生成树有且仅有 n-1 条边。如果一个图有 n 个顶点和小于 n-1 条边，则是非连通图。如果它多于 n-1 条边，则一定有环。但是，有 n-1 条边的图不一定是生成树。

（13）有向树和生成森林：有一个顶点的入度为0，其余顶点的入度均为1的有向图称为有向树。一个有向图的生成森林是由若干棵有向树组成，含有图中全部顶点，但只有足以构成若干棵不相交的有向树的弧。图6.6所示为其一例。

<div style="text-align: center;"><div style="text-align: center;">图6.5  $ G_{3} $ 的最大连通分量的一棵生成树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.6 一个有向图及其生成森林</div> </div>

## 6.2 案例引入

SNS（Social Networking Services），即社会性网络服务，是指帮助人们建立社会性网络的互联网应用服务，也指社会现有的已成熟且普及的信息载体，如短消息业务（Short Message Service，SMS）。SNS 的另一种常用解释是 “社交网站” 或 “社交网”（Social Network Site）。SNS 的理论

基础为“六度空间理论”。基于此理论，SNS社区将用户关系梳理好后，可以将海量的内容“灌入”SNS社区。同时，这一理论也论证了二十大报告指出的内容，即“必须坚持系统观念。万事万物是相互联系、相互依存的”。在自然界、人类社会和人的思维中，都能够体现这一论断。例如，喜欢电影的朋友，把内容传递给爱好相同的朋友；备战考研的同学，把研究生入学考试的相关信息和自己的复习经验传递给身边其他考研的同学。这种传递的形式非常简单，用户产生交互，内容即通过渠道传递到真实的关系网中，杂乱无章的内容与人群通过SNS社区变得有序，如图6.7所示。

### 案例6.1：六度空间理论。

六度空间理论是一个数学领域的猜想，又称为六度分割理论（Six Degrees of Separation）。六度空间理论是在20世纪60年代由美国的心理学家斯坦利·米尔格拉姆（Stanley Milgram）提出的，理论指出：你和任何一个陌生人之间所间隔的人不会超过6个，也就是说，最多通过6个中间人你就能够认识任何一个陌生人，如图6.8所示。

<div style="text-align: center;"><div style="text-align: center;">图6.7 SNS社区有序化示意</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.8 六度空间理论示意</div> </div>

随着新技术的发展，六度空间理论的应用价值受到了人们的广泛关注，除了前面提到的微软的人立方搜索，很多领域都运用了六度空间理论，例如 SNS 网站、Blog 网站、电子游戏社区等。

六度空间理论的出现使得人们对于自身的人际关系网络的威力有了新的认识。但为什么偏偏是“六度”，而不是“七度”“八度”或者“千百度”呢？这可能要从人际关系网络的另外一个特征——“150定律”来寻找解释。“150定律”指出，人类智力允许人类拥有稳定社交网络的人数是148人，四舍五入大约是150人。这样我们可以对六度空间理论做如下数学解释（并非数学证明）：若每个人平均认识150人，其六度便是 $ 150^{6}=11390625000000 $，消除一些重复的结点，也远远超过了整个地球人口的若干倍。

那么，如何从理论上验证六度空间理论呢？六度空间理论的数学模型属于图结构，我们把六度空间理论中的人际关系网络图抽象成一个无向图G，用图G中的一个顶点表示一个人，两个人“认识”与否，用代表这两个人的顶点之间是否有一条边来表示。然后利用本章所学的图的有关算法即可从理论上进行验证，本章6.7节将给出此案例的分析与实现。

## 6.3 图的类型定义

图是一种数据结构，加上一组基本操作，就构成了抽象数据类型。抽象数据类型图的定义如下：

ADT Graph{
 数据对象：V 是具有相同特性的数据元素的集合，称为顶点集。
 数据关系：
 R = {VR}
 VR = {<v, w> | v, w ∈ V 且 P(v, w) < v, w> 表示从 v 到 w 的弧，

谓词P(v, w)定义了弧<v, w>的意义或信息}
基本操作：
CreateGraph(&G,V,VR)
初始条件：V是图的顶点集，VR是图中弧的集合。
操作结果：按V和VR的定义构造图。
DestroyGraph(&G)
初始条件：图G存在。
操作结果：销毁图G。
LocateVex(G,u)
初始条件：图G存在，u和G中顶点有相同特征。
操作结果：若G中存在顶点u，则返回该顶点在图中的位置，否则返回其他信息。
GetVex(G,v)
初始条件：图G存在，v是G中某个顶点。
操作结果：返回v的值。
PutVex(&G,v,value)
初始条件：图G存在，v是G中某个顶点。
操作结果：对v赋值value。
FirstAdjVex(G,v)
初始条件：图G存在，v是G中某个顶点。
操作结果：返回v的第一个邻接顶点。若v在G中没有邻接顶点，则返回“空”。
NextAdjVex(G,v,w)
初始条件：图G存在，v是G中某个顶点，w是v的邻接顶点。
操作结果：返回v的（相对于w的）下一个邻接顶点。若w是v的最后一个邻接点，则返回“空”。
InsertVex(&G,v)
初始条件：图G存在，v和图中顶点有相同特征。
操作结果：在图G中增添新顶点v。
DeleteVex(&G,v)
初始条件：图G存在，v是G中某个顶点。
操作结果：删除G中顶点v及其相关的弧。
InsertArc(&G,v,w)
初始条件：图G存在，v和w是G中两个顶点。
操作结果：在G中增添弧<v，w>，若G是无向图，则还增添对称弧<w，v>。
DeleteArc(&G,v,w)
初始条件：图G存在，v和w是G中两个顶点。
操作结果：在G中删除弧<v，w>，若G是无向图，则还删除对称弧<w，v>。
DFStraverse(G)
初始条件：图G存在。
操作结果：对图进行深度优先遍历，在遍历过程中对每个顶点访问一次。
BFStraverse(G)
初始条件：图G存在。
操作结果：对图进行广度优先遍历，在遍历过程中对每个顶点访问一次。
}ADT Graph

## 6.4 图的存储结构

一方面，由于图的结构比较复杂，任意两个顶点都可能存在联系，因此无法以数据元素在存储区中的物理位置来表示元素之间的关系，即图没有顺序存储结构，但其可以借助二维数组来表示元素之间的关系，即采用邻接矩阵表示法。另一方面，由于图的任意两个顶点都可能存在关系，因此，用链式存储表示图是很自然的事，图的链式存储有多种，有邻接表、十字链表和邻接多重表，应根据实际需要的不同选择不同的存储结构。

## 1. 邻接矩阵表示法

邻接矩阵（Adjacency Matrix）是表示顶点之间相邻关系的矩阵。设  $ G(V, E) $ 是具有 n 个顶点的图，则 G 的邻接矩阵是具有如下性质的 n 阶方阵：

 $$ A[i][j]=\left\{\begin{aligned}&1&\left\langle v_{i},v_{j}\right\rangle 或 \left(v_{i},v_{j}\right)\in E\\ &0& 其他 \end{aligned}\right. $$

例如，图6.1中所示的 $ G_{1} $和 $ G_{2} $的邻接矩阵如图6.9所示。

 $$ \begin{array}{r l}{G_{1,{\mathrm{a n s}}}=\left[\begin{array}{l l l l}{0}&{1}&{1}&{0}\\ {0}&{0}&{0}&{0}\\ {0}&{0}&{0}&{1}\\ {1}&{0}&{0}&{0}\end{array}\right],G_{2,{\mathrm{a n s}}}=\left[\begin{array}{l l l l l}{0}&{1}&{0}&{1}&{0}\\ {1}&{0}&{1}&{0}&{1}\\ {0}&{1}&{0}&{1}&{1}\\ {1}&{0}&{1}&{0}&{0}\\ {0}&{1}&{1}&{0}&{0}\end{array}\right]}\end{array} $$

<div style="text-align: center;"><div style="text-align: center;">图6.9 图的邻接矩阵</div> </div>

若 G 是网，则邻接矩阵可以定义为：

 $$ A[i][j]=\left\{\begin{aligned}&w_{i,j}&&\left\langle v_{i},v_{j}\right\rangle 或 \left(v_{i},v_{j}\right)\in E\\ &\infty&& 其他 \end{aligned}\right. $$

其中， $ w_{i,j} $ 表示边上的权值； $ \infty $ 表示计算机允许的、大于所有边上权值的数。例如，图 6.10 所示为一个有向网和它的邻接矩阵。

<div style="text-align: center;"><div style="text-align: center;">（a）有向网N</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）邻接矩阵</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.10 有向网及其邻接矩阵</div> </div>

用邻接矩阵表示法表示图，除了一个用于存储邻接矩阵的二维数组外，还需要用一个一维数组来存储顶点信息。其形式说明如下：

//-----图的邻接矩阵存储表示-----
#define MaxInt 32767 //表示极大值，即∞
#define MVNum 100 //最大顶点数
typedef char VerTexType; //假设顶点的数据类型为字符型
typedef int ArcType; //假设边的权值类型为整型
typedef struct
{
 VerTexType vexs[MVNum]; //顶点表
 ArcType arcs[MVNum][MVNum]; //邻接矩阵
 int vexnum, arcnum; //图的当前点数和边数
}AMGraph;

## 2. 采用邻接矩阵表示法创建无向网

已知一个图的点和边，使用邻接矩阵表示法来创建此图的方法比较简单，下面以一个无向网为例来说明创建图的算法。

### 【算法步骤】

① 输入总顶点数和总边数。

②依次输入点的信息并将其存入顶点表中。

③初始化邻接矩阵，使每个权值初始化为极大值。

④ 构造邻接矩阵。依次输入每条边依附的顶点和其权值，确定两个顶点在图中的位置之后，使相应边赋予相应的权值，同时使其对称边赋予相同的权值。

采用邻接
矩阵表示法
创建无向网

#### 【算法描述】

Status CreateUDN(AMGraph &G)
{// 采用邻接矩阵表示法，创建无向网G
cin>>G.vexnum>>G.arcnum; // 输入总顶点数，总边数
for(i=0;i<G.vexnum;++i) // 依次输入点的信息
 cin>>G.vexs[i];
for(i=0;i<G.vexnum;++i) // 初始化邻接矩阵，边的权值
 均置为极大值MaxInt
 for(j=0;j<G.vexnum;++j)
 G.arcs[i][j]=MaxInt;
for(k=0;k<G.arcnum;++k) // 构造邻接矩阵
{
 cin>>v1>>v2>>w; // 输入一条边依附的顶点及权值
 i=LocateVex(G,v1); j=LocateVex(G,v2); // 确定v1和v2在G中的位置，即顶点数组的下标
 G.arcs[i][j]=w; // 边<v1，v2>的权值置为w
 G.arcs[j][i]=G.arcs[i][j]; // 置<v1，v2>的对称边<v2，v1>的权值为w
}
return OK;

##### 【算法分析】

该算法的时间复杂度是  $ O(\max(n^{2}, n \times e)) $。

若要建立无向图，只需对上述算法做两处小的改动：一是初始化邻接矩阵时，将边的权值均初始化为0；二是构造邻接矩阵时，将权值w改为常量值1即可。同样，将该算法稍做修改即可建立一个有向网或有向图。

### （1）优点

① 便于判断两个顶点之间是否有边，即根据  $ A[i][j] $ 等于 0 或 1 来判断。（若为网，则根据  $ A[i][j] $ 等于  $ \infty $ 或权值来判断。）

②便于计算各个顶点的度。对于无向图，邻接矩阵第i行元素之和就是顶点 $ v_{i} $的度；对于有向图，第i行元素之和就是顶点 $ v_{i} $的出度，第i列元素之和就是顶点 $ v_{i} $的入度。

#### （2）缺点

① 不便于增加和删除顶点。

② 不便于统计边的数目，需要查找邻接矩阵所有元素才能统计完毕，时间复杂度为  $ O(n^{2}) $。

③ 空间复杂度高。如果是有向图，n 个顶点需要  $ n^{2} $ 个单元存储边。如果是无向图，因其邻接矩阵是对称的，所以对规模较大的邻接矩阵可以采用压缩存储的方法，仅存储下三角（或上三角）的元素，这样需要  $ n(n-1)/2 $ 个单元即可。但无论以何种方式存储，邻接矩阵表示法的空间复杂度均为  $ O(n^{2}) $，这对于稀疏图而言尤其浪费空间。

下面介绍的邻接表将邻接矩阵的 n 行改成 n 个单链表，适合表示稀疏图。

## 1. 邻接表表示法

邻接表（Adjacency List）是图的一种链式存储结构。在邻接表中，对图中每个顶点  $ v_{i} $ 建立一个单链表，把与  $ v_{i} $ 相邻接的顶点放在这个链表中。邻接表中每个单链表的第一个结点存放有关顶点的信息，把这一结点看成链表的表头，其余结点存放有关边的信息，这样邻接表便由两部分组成：表头结点表和边表。

（1）表头结点表：由所有表头结点以顺序结构的形式存储，以便可以随机访问任一顶点的边链表。表头结点包括数据域（data）和链域（firstarc）两部分，如图 6.11（a）所示。其中，数据域用于存储顶点  $ v_i $ 的名称或其他有关信息；链域用于指向链表中第一个结点（与顶点  $ v_i $ 邻接的第一个邻接点）。

（2）边表：由表示图中顶点间关系的 n 个边链表组成。边链表中边结点包括邻接点域（adjvex）、数据域（info）和链域（nextarc）3 个部分，如图 6.11（b）所示。其中，邻接点域指示与顶点  $ v_i $ 邻接的点在图中的位置；数据域存储和边相关的信息，如权值等；链域指示与顶点  $ v_i $ 邻接的下一条边的结点。

<div style="text-align: center;"><div style="text-align: center;">（a）表头结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）边结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.11 表头结点和边结点</div> </div>

例如，图6.12（a）和图6.12（b）所示分别为图6.1中 $ G_{1} $和 $ G_{2} $的邻接表。

在无向图的邻接表中，顶点  $ v_i $ 的度恰为第 i 个链表中的结点个数；而在有向图中，第 i 个链表中的结点个数只是顶点  $ v_i $ 的出度，为求入度，必须遍历整个邻接表。在所有链表中，其邻接点域的值为  $ i $ 的结点个数是顶点  $ v_i $ 的入度。有时，为了便于确定顶点的入度，可以建立一个有向图的逆邻接表，即对每个顶点  $ v_i $ 建立一个链接所有进入  $ v_i $ 的边的表，例如，图 6.12（c）所示为有向图  $ G_1 $ 的逆邻接表。

<div style="text-align: center;"><div style="text-align: center;">(b)  $ G_{2} $ 的邻接表</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c） $ G_{1} $的逆邻接表</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.12 邻接表和逆邻接表</div> </div>

根据上述讨论，要定义一个邻接表，需要先定义其存放顶点的头结点和表示边的边结点。图的邻接表存储结构说明如下：

// - - - - - - - - - - -
#define MVNum 100
typedef struct ArcNode
{
 int adjvex;
 struct ArcNode * nextarc;
 OtherInfo info;
}ArcNode;
typedef struct VNode
{
 VerTexType data;
 ArcNode *firstarc;
}VNode,AdjList[MVNum];
typedef struct
{
 AdjList vertices;
 int vexnum,arcnum;
}ALGraph;

// 最大顶点数
// 边结点
// 该边所指向的顶点的位置
// 指向下一条边的指针
// 和边相关的信息

// 顶点信息
// 指向第一条依附该顶点的边的指针
// AdjList 表示邻接表类型
// 邻接表

// 图的当前顶点数和边数

## 2. 采用邻接表表示法创建无向图

基于上述的邻接表表示法，要创建一个图则需要创建其相应的顶点表和边表。下面以一个无向图为例来说明采用邻接表表示法创建无向图的算法。

### 【算法步骤】

① 输入总顶点数和总边数。

②依次输入点的信息存入顶点表中，使每个表头结点的指针域初始化为NULL。

③ 创建邻接表。依次输入每条边依附的两个顶点，确定这两个顶点的序号 i 和 j 之后，将此边结点分别插入  $ v_i $ 和  $ v_j $ 对应的两个边链表的头部。

采用邻接表表示法创建无向图

【算法描述】

Status CreateUDG(ALGraph &G)
{
 // 采用邻接表表示法，创建无向图G
 cin>>G.vexnum>>G.arcnum; // 输入总顶点数，总边数
 for(i=0;i<G.vexnum;++i) // 输入各点，构造表头结点表
 {
 cin>>G.vertices[i].data; // 输入顶点值
 G.vertices[i].firstarc=NULL; // 初始化表头结点的指针域为NULL
 }
 for(k=0;k<G.arcnum;++k) // 输入各边，构造边表
 {
 cin>>v1>>v2; // 输入一条边依附的两个顶点
 i=LocateVex(G,v1); j=LocateVex(G,v2);
 // 确定v1和v2在G中的位置，即顶点在G.vertices中的序号
 p1=new ArcNode; // 生成一个新的边结点*p1
 p1->adjvex=j; // 邻接点序号为j
 p1->nextarc=G.vertices[i].firstarc; G.vertices[i].firstarc=p1;
 // 将新结点*p1插入顶点v的边表头部
 p2=new ArcNode; // 生成另一个对称的新的边结点*p2
 p2->adjvex=i; // 邻接点序号为i
 }
}

p2->nextarc=G.vertices[j].firstarc; G.vertices[j].firstarc=p2;
// 将新结点 *p2 插入顶点  $ v_j $ 的边表头部
}
return OK;

#### 【算法分析】

该算法的时间复杂度是  $ O(n \times e) $。

建立有向图的邻接表与此类似，只是更加简单，每读入一个顶点对  $ <i, j> $，仅需生成一个邻接点序号为 j 的边表结点，并将其插入  $ v_i $ 的边链表头部即可。若要创建网的邻接表，可以将边的权值存储在 info 域中。

#### 注意

值得注意的是，一个图的邻接矩阵表示是唯一的，但其邻接表示不唯一，这是因为邻接表示中，各边表结点的链接次序取决于建立邻接表的算法，以及边的输入次序。

邻接矩阵和邻接表是图的两种常用的存储结构，它们各有所长。与邻接矩阵相比，邻接表有其自己的优缺点。

## 3. 邻接表表示法的优缺点

（1）优点

① 便于增加和删除顶点。

②便于统计边的数目，按顶点表顺序查找所有边表可得到边的数目，时间复杂度为  $ O(n+e) $。

③空间效率高。对于一个具有n个顶点、e条边的图G，若G是无向图，则在其邻接表表示中有n个顶点表结点和2e个边表结点；若G是有向图，则在它的邻接表表示或逆邻接表表示中均有n个顶点表结点和e个边表结点。因此，邻接表或逆邻接表表示的空间复杂度为 $ O(n+e) $，适合表示稀疏图。对于稠密图，考虑到邻接表中要附加链域，因此常采取邻接矩阵表示法。

（2）缺点

① 不便于判断顶点之间是否有边，要判定  $ v_{i} $ 和  $ v_{j} $ 之间是否有边，就需查找第 i 个边表，最坏情况下时间复杂度为 O(e)。

② 不便于计算有向图各个顶点的度。对于无向图，在邻接表表示中顶点  $ v_{i} $ 的度是第 i 个边表中的结点个数。在有向图的邻接表中，第 i 个边表上的结点个数是顶点  $ v_{i} $ 的出度，但求  $ v_{i} $ 的入度较困难，需遍历各顶点的边表。若有向图采用逆邻接表表示，则与邻接表表示相反，求顶点的入度较容易，而求顶点的出度较困难。

下面介绍的十字链表便于求得顶点的入度和出度。

### 6.4.3 十字链表

十字链表（Orthogonal List）是有向图的另一种链式存储结构，可以看成将有向图的邻接表和逆邻接表结合起来得到的一种链表。在十字链表中，对应于有向图中每一条弧有一个结点，对应于每个顶点也有一个结点。这些结点的结构如图6.13所示。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>tailvex</td><td style='text-align: center; word-wrap: break-word;'>headvex</td><td style='text-align: center; word-wrap: break-word;'>hlink</td><td style='text-align: center; word-wrap: break-word;'>tlink</td><td style='text-align: center; word-wrap: break-word;'>info</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">（a）弧结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.13 弧结点和顶点结点的结构</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）顶点结点</div> </div>

在弧结点中有5个域：其中尾域 tailvex 和头域 headvex 分别指示弧尾和弧头这两个顶点。在图中的位置，链域 hlink 指向弧头相同的下一条弧，而链域 tlink 指向弧尾相同的下一条弧，info 域指向该弧的相关信息。弧头相同的弧在同一链表上，弧尾相同的弧也在同一链表上。它们的头结点即顶点结点，由3个域组成：其中 data 域存储和顶点相关的信息，如顶点的名称等；firstin 和 firstout 为两个链域，分别指向以该顶点为弧头和弧尾的第一个弧结点。例如，图 6.14（a）中所示图的十字链表如图 6.14（b）所示。若将有向图的邻接矩阵看成稀疏矩阵的话，则十字链表也可以看成邻接矩阵的链式存储结构。在图的十字链表中，弧结点所在的链表非循环链表，结点之间相对位置自然形成，不一定按顶点序号排列，表头结点即顶点结点，它们之间不是链接关系，而是顺序存储关系。

<div style="text-align: center;"><div style="text-align: center;">图6.14 有向图的十字链表</div> </div>

有向图的十字链表存储表示的形式说明如下所示：

// -- -- -- 有同图的十字链表存储表示 -- -- -- --
#define MAX_VERTEX_NUM 20
typedef struct ArcBox
{
 int tailvex,headvex; // 该弧的尾和头顶点的位置
 struct ArcBox *hlink, *tlink; // 分别为弧头相同和弧尾相同的弧的链域
 InfoType *info; // 该弧相关信息的指针
}ArcBox;
typedef struct VexNode
{
 VertexType data;
 ArcBox *firstin, *firstout; // 分别指向该顶点第一条入弧和出弧
}VexNode;
typedef struct
{
 VexNode xlist[MAX_VERTEX_NUM]; // 表头向量
 int vexnum, arcnum; // 有向图的当前顶点数和弧数
}OLGraph;

只要输入 n 个顶点的信息和 e 条弧的信息，便可建立该有向图的十字链表，读者可以模仿算法 6.2 写出采用十字链表表示法创建有向图的算法。建立十字链表的时间复杂度和建立邻接表是相同的。在十字链表中既容易找到以  $ v_{i} $ 为尾的弧，也容易找到以  $ v_{i} $ 为头的弧，因而容易求得顶点的出度和入度（若需要，可在建立十字链表的同时求出）。在某些有向图的应用中，十字链表是很有用的工具。

#### 6.4.4 邻接多重表

邻接多重表（Adjacency Multilist）是无向图的另一种链式存储结构。虽然邻接表是无向图的一种很有效的存储结构，在邻接表中容易求得顶点和边的各种信息。但是，在邻接表中每一

条边 $ (v_{i}, v_{j}) $有两个结点，分别在第i个和第j个链表中，这给某些图的操作带来不便。例如在某些图的应用问题中需要对边进行某种操作，如对已被搜索过的边进行标记或删除一条边等，此时需要找到表示同一条边的两个结点。因此，在进行这一类操作的无向图的问题中采用邻接多重表作为存储结构更为适宜。

邻接多重表的结构和十字链表类似。在邻接多重表中，每一条边用一个结点表示，它由如图 6.15（a）所示的 6 个域组成。其中，mark 为标志域，可用以标记该条边是否被搜索过；ivex 和 jvex 为该边依附的两个顶点在图中的位置；ilink 指向下一条依附于顶点 ivex 的边；jlink 指向下一条依附于顶点 jvex 的边，info 为指向和边相关的各种信息的指针域。

每一个顶点也用一个结点表示，它由如图 6.15（b）所示的两个域组成。其中，data 域存储和该顶点相关的信息，firstedge 域指示第一条依附于该顶点的边。例如，图 6.16 所示为无向图  $ G_{2} $ 的邻接多重表。在邻接多重表中，所有依附于同一顶点的边串联在同一链表中，由于每条边依附于两个顶点，则每个边结点同时链接在两个链表中。可见，对无向图而言，其邻接多重表和邻接表的差别，仅仅在于同一条边在邻接表中用两个结点表示，而在邻接多重表中只用一个结点表示。因此，除了在边结点中增加一个标志域外，邻接多重表所需的存储量和邻接表所需的相同。

##### （a）边结点

<div style="text-align: center;"><div style="text-align: center;">（b）顶点结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.15 边结点和顶点结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.16 无向图 $ G_{2} $的邻接多重表</div> </div>

在邻接多重表上，各种基本操作的实现亦和邻接表相似。邻接多重表的类型说明如下：

// -- -- -- -- 无同图的邻接多重表存储表示 -- -- -- --
#define MAX_VERTEX_NUM 20
typedef enum{unvisited,visited} VisitIf;
typedef struct EBox
{
 VisitIf mark;
 int ivex, jvex;
 struct EBox *ilink, *jlink;
 InfoType *info;
} Ebox;
typedef struct VexBox
{
 VertexType data;
 EBox *firstedge;
} VexBox;
typedef struct{
 VexBox adjmulist[MAX_VERTEX_NUM];
 int vexnum, edgenum;
} AMLGraph;

// 访问标记
// 该边依附的两个顶点的位置
// 分别指向依附这两个顶点的下一条边
// 该边信息指针

// 指向第一条依附该顶点的边
// 无向图的当前顶点数和边数

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>150</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第6章 图</td></tr></table>

## 6.5 图的遍历

和树的遍历类似，图的遍历也是从图中某一顶点出发，按照某种方法对图中所有顶点进行访问且仅访问一次。图的遍历算法是求解图的连通性问题、拓扑排序和关键路径等算法的基础。

然而，图的遍历要比树的遍历复杂得多。因为图的任一顶点都可能和其余的顶点相邻接，所以在访问了某个顶点之后，可能沿着某条路径搜索之后，又回到该顶点上。例如，图6.1（b）中所示的 $ G_{2} $，由于图中存在回路，因此在访问了 $ v_{1} $、 $ v_{2} $、 $ v_{3} $、 $ v_{4} $之后，沿着边 $ <v_{4}, v_{1}> $又可访问到 $ v_{1} $。为了避免同一顶点被访问多次，在遍历图的过程中，必须记下每个已访问过的顶点。为此，设一个辅助数组visited[n]，其初始值置为“false”或者0，一旦访问了顶点 $ v_{i} $，便置visited[i]为“true”或者1。

根据搜索路径的方向，通常有两条遍历图的路径：深度优先搜索和广度优先搜索。它们对无向图和有向图都适用。

## 1. 深度优先搜索遍历的过程

深度优先搜索（Depth First Search，DFS）遍历类似于树的先序遍历，是树的先序遍历的推广。

对于一个连通图，深度优先搜索遍历的过程如下。

（1）从图中某个顶点 v 出发，访问 v。

（2）找出刚访问过的顶点的第一个未被访问的邻接点，访问该顶点。以该顶点为新顶点，重复此步骤，直至刚访问过的顶点没有未被访问的邻接点为止。

（3）返回前一个访问过的且仍有未被访问的邻接点的顶点，找出该顶点的下一个未被访问的邻接点，访问该顶点。

（4）重复步骤（2）和步骤（3），直至图中所有顶点都被访问过，搜索结束。

以图 6.17（a）所示的无向图  $ G_{4} $ 为例，深度优先搜索遍历图的过程如图 6.17（b）所示 $ ^{①} $。具体过程如下。

<div style="text-align: center;"><div style="text-align: center;">(a) 无向图 $ G_{4} $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 深度优先搜索遍历图的过程</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.17 遍历图的过程</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）广度优先搜索遍历图的过程</div> </div>

（1）从顶点  $ v_{1} $ 出发，访问  $ v_{1} $

（2）在访问了顶点  $ v_{1} $ 之后，选择第一个未被访问的邻接点  $ v_{2} $，访问  $ v_{2} $。以  $ v_{2} $ 为新顶点，重复此步骤，访问  $ v_{4} $， $ v_{8} $、 $ v_{5} $。在访问了  $ v_{5} $ 之后，由于  $ v_{5} $ 的邻接点都已被访问，此步骤结束。

（3）搜索从  $ v_{5} $ 回到  $ v_{8} $，由于同样的理由，搜索继续回到  $ v_{4} $、 $ v_{2} $ 直至  $ v_{1} $，此时由于  $ v_{1} $ 的另一个邻接点未被访问，则搜索又从  $ v_{1} $ 到  $ v_{3} $，再继续进行下去。由此，得到的顶点访问序列为：

 $$ V_{1}\rightarrow V_{2}\rightarrow V_{4}\rightarrow V_{8}\rightarrow V_{5}\rightarrow V_{3}\rightarrow V_{6}\rightarrow V_{7} $$

图 6.17（b）中所示的所有顶点加上标有实箭头的边，构成一棵以  $ v_{1} $ 为根的树，称之为深度优先生成树，如图 6.18（a）所示。

<div style="text-align: center;"><div style="text-align: center;">（a） $ G_{4} $的深度优先生成树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b） $ G_{4} $的广度优先生成树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.18 生成树</div> </div>

## 2. 深度优先搜索遍历的算法实现

显然，深度优先搜索遍历连通图是一个递归的过程。为了在遍历过程中便于区分顶点是否已被访问，需附设访问标志数组 visited[n]，其初值为 “false”，一旦某个顶点被访问，则其相应的分量置为 “true”。

### 算法 6.3 深度优先搜索遍历连通图

【算法步骤】

①从图中某个顶点 v 出发，访问 v，并置 visited[v] 的值为 true。

②依次检查 v 的所有邻接点 w，如果 visited[w] 的值为 false，再从 w 出发进行递归遍历，直到图中所有顶点都被访问过。

深度优先搜索

遍历连通图

【算法描述】

bool visited[MVNum]; // 访问标志数组, 其初值为“false”
void DFS(Graph G,int v)
{
// 从第v个顶点出发递归地深度优先遍历图G
cout<<v;visited[v]=true; // 访问第v个顶点, 并置访问标志数组相应分量值为true
for(w=FirstAdjVex(G,v);w>=0;w=NextAdjVex(G,v,w))
// 依次检查v的所有邻接点w, FirstAdjVex(G,v)表示v的第一个邻接点
//NextAdjVex(G,v,w)表示v相对于w的下一个邻接点.w≥0表示存在邻接点
if(!visited[w]) DFS(G,w); // 对v的尚未访问的邻接顶点w递归调用DFS()
}

若是非连通图，上述遍历过程执行之后，图中一定还有顶点未被访问，需要从图中另选一个未被访问的顶点作为起始点，重复上述深度优先搜索过程，直到图中所有顶点均被访问过为止。这样，要实现对非连通图的遍历，需要循环调用算法6.3，具体实现如算法6.4所示。

#### 算法6.4 深度优先搜索遍历非连通图

【算法描述】

void DFSTraverse(Graph G)

深度优先搜索

遍历非连通图

{
 // 对非连通图 G 进行深度优先遍历
 for (v=0; v<G.vexnum; ++v) visited[v]=false; // 访问标志数组初始化
 for (v=0; v<G.vexnum; ++v) // 循环调用算法 6.3
 if (!visited[v]) DFS(G, v); // 对尚未访问的顶点调用 DFS
}

对于算法 6.4，每调用一次算法 6.3 将遍历一个连通分量，有多少次调用，就说明图中有多少个连通分量。

在算法 6.3 中，对于查找邻接点的操作 FirstAdjVex( $ G, v $) 及 NextAdjVex( $ G, v, w $) 并没有具体展开。如果图的存储结构不同，这两个操作的实现方法不同，时间耗费也不同。下面的算法 6.5、算法 6.6 分别用邻接矩阵和邻接表具体实现了算法 6.3 的功能。

##### 算法 6.5 采用邻接矩阵表示图的深度优先搜索遍历

采用邻接矩阵

表示图的深度

优先搜索遍历

【算法描述】

void DFS_AM(AMGraph G, int v)
{
 // 图G为邻接矩阵类型，从第v个顶点出发深度优先搜索遍历图G
 cout << v; visited[v] = true;  // 访问第v个顶点，并置访问标志数组相应分量值为true
 for (w=0; w<G.vexnum; w++)  // 依次检查邻接矩阵v所在的行
 if ((G.arcs[v][w] != 0) && (!visited[w])) DFS_AM(G, w);
 // G.arcs[v][w] != 0 表示w是v的邻接点，如果w未访问，则递归调用DFS_AM()
}

##### 算法 6.6 采用邻接表表示图的深度优先搜索遍历

【算法描述】

void DFS_AL (ALGraph G, int v)
{
 // 图G为邻接表类型，从第v个顶点出发深度优先搜索遍历图G
 cout << v; visited[v] = true; // 访问第v个顶点
 p = G.vertices[v].firstarc; // p指向v的边链表的第一个边结点
 while (p != NULL)
 // 边结点非空
 {
 w = p -> adjvex;
 if (!visited[w]) DFS_AL(G, w);
 p = p -> nextarc;
 }
}

采用邻接表

表示图的深度

优先搜索遍历

## 3. 深度优先搜索遍历的算法分析

分析上述算法，在遍历图时，对图中每个顶点至多调用一次 DFS() 函数，因为一旦某个顶点被标志成已被访问，就不再从它出发进行搜索。因此，遍历图的过程实质上是对每个顶点查找其邻接点的过程，其耗费的时间则取决于所采用的存储结构。当用邻接矩阵表示图时，查找每个顶点的邻接点的时间复杂度为  $ O(n^{2}) $，其中 n 为图中顶点数。而当以邻接表作为图的存储结构时，查找邻接点的时间复杂度为  $ O(e) $，其中 e 为图中边数。由此，当以邻接表作为存储结构时，深度优先搜索遍历图的时间复杂度为  $ O(n + e) $。

## 1. 广度优先搜索遍历的过程

广度优先搜索（Breadth First Search，BFS）遍历类似于树的按层次遍历的过程。

广度优先搜索遍历的过程如下。

（1）从图中某个顶点 v 出发，访问 v。

（2）依次访问 v 的各个未曾访问过的邻接点。

（3）分别从这些邻接点出发依次访问它们的邻接点，并使“先被访问的顶点的邻接点”先于“后被访问的顶点的邻接点”被访问。重复步骤（3），直至图中所有已被访问的顶点的邻接点都被访问到。

例如，对图 $ G_{4} $进行广度优先搜索遍历的过程如图6.17（c）所示，具体过程如下。

（1）从顶点  $ v_{1} $ 出发，访问  $ v_{1} $

（2）依次访问  $ v_{1} $ 的各个未曾访问过的邻接点  $ v_{2} $ 和 v

（3）依次访问  $ v_{2} $ 的邻接点  $ v_{4} $ 和  $ v_{5} $，以及  $ v_{3} $ 的邻接点  $ v_{6} $ 和  $ v_{7} $，最后访问  $ v_{4} $ 的邻接点  $ v_{8} $。由于这些顶点的邻接点均已被访问，并且图中所有顶点都被访问，由此完成了图的遍历。得到的顶点访问序列为：

 $$ V_{1}\rightarrow V_{2}\rightarrow V_{3}\rightarrow V_{4}\rightarrow V_{5}\rightarrow V_{6}\rightarrow V_{7}\rightarrow V_{8} $$

图 6.17（c）中所示的所有顶点加上标有实箭头的边，构成一棵以  $ v_{1} $ 为根的树，称为广度优先生成树，如图 6.18（b）所示。

## 2. 广度优先搜索遍历的算法实现

可以看出，广度优先搜索遍历的特点是：尽可能先对横向进行搜索。设 x 和 y 是两个相继被访问过的顶点，若当前以 x 为出发点进行搜索，则在访问 x 的所有未曾被访问过的邻接点之后，紧接着以 y 为出发点进行横向搜索，并对搜索到的 y 的邻接点中尚未被访问的顶点进行访问。也就是说，先访问的顶点其邻接点亦先被访问。为此，算法实现时需引进队列保存已被访问过的顶点。

和深度优先搜索类似，广度优先搜索在遍历的过程中也需要一个访问标志数组。

### 算法6.7 广度优先搜索遍历连通图

【算法步骤】

① 从图中某个顶点 v 出发，访问 v，并置 visited[v] 的值为 true，然后使 v 入队。

② 只要队列不空，则重复下述操作：

队头元素u出队：

依次检查 u 的所有邻接点 w，如果 visited[w] 的值为 false，则访问 w，并置 visited[w] 的值为 true，然后使 w 入队。

广度优先搜索

遍历连通图

#### 【算法描述】

void BFS(Graph G, int v)
{
 // 按广度优先非递归遍历连通图G
 cout << v; visited[v] = true; // 访问第v个顶点，并置访问标志数组相应分量值为true
 InitQueue(Q); // 辅助队列Q初始化，置空
 EnQueue(Q, v); // v入队
 while (!QueueEmpty(Q)) // 队列非空
 {
 DeQueue(Q, u); // 队头元素出队并置为u
 for (w = FirstAdjVex(G, u); w >= 0; w = NextAdjVex(G, u, w))
 // 依次检查u的所有邻接点w, FirstAdjVex(G, u) 表示u的第一个邻接点
 // NextAdjVex(G, u, w) 表示u相对于w的下一个邻接点，w ≥ 0表示存在邻接点

if(!visited[w]) //w为u的尚未访问的邻接顶点
{
 cout<<w; visited[w]=true; //访问w，并置访问标志数组相应分量值为true
 EnQueue(Q,w); //w入队
}

//if
//while

若是非连通图，上述遍历过程执行之后，图中一定还有顶点未被访问，需要从图中另选一个未被访问的顶点作为起始点，重复上述广度优先搜索过程，直到图中所有顶点均被访问过为止。

对于非连通图的遍历，实现算法类似于算法 6.4，仅需将原算法中的 DFS() 函数调用改为 BFS() 函数调用。

读者可以参考算法 6.5 和算法 6.6，分别用邻接矩阵和邻接表具体实现算法 6.7 的功能。

## 3. 广度优先搜索遍历的算法分析

分析上述算法，每个顶点至多进一次队列。遍历图的过程实质上是通过边找邻接点的过程，因此广度优先搜索遍历的时间复杂度和深度优先搜索遍历相同，即当用邻接矩阵存储时，时间复杂度为  $ O(n^{2}) $；用邻接表存储时，时间复杂度为  $ O(n + e) $。两种遍历方法的不同之处仅仅在于对顶点访问的顺序不同。

## 6.6 图的应用

现实生活中的许多问题都可以利用图来解决。例如，如何以最小成本构建一个通信网络，如何计算地图中两地之间的最短路径，如何为复杂活动中各子任务的完成寻找一个较优的顺序等。本节将结合这些常用的实际问题，介绍图的几个常用算法，包括最小生成树、最短路径、拓扑排序和关键路径算法等。

### 6.6.1 最小生成树

党的二十大报告提出，加快建设制造强国、质量强国、航天强国、交通强国、网络强国、数字中国。网络强国建设承载着以习近平同志为核心的党中央的深切关怀、殷切期望。假设要在n个城市之间建立通信联络网，则连通n个城市只需要n-1条线路。这时，自然会考虑这样一个问题，如何在最节省经费的前提下建立这个通信网。

在每两个城市之间都可设置一条线路，相应地都要付出一定的经济代价。n 个城市之间，最多可能设置  $ n(n-1)/2 $ 条线路，那么，如何在这些可能的线路中选择 n-1 条，以使总的耗费最少呢？

可以用连通网来表示 n 个城市，以及 n 个城市间可能设置的通信线路，其中网的顶点表示城市，边表示两城市之间的线路，赋予边的权值表示相应的代价。对于 n 个顶点的连通网可以建立许多不同的生成树，每一棵生成树都可以是一个通信网。最合理的通信网应该是代价之和最小的生成树。在一个连通网的所有生成树中，各边的代价之和最小的那棵生成树称为该连通网的最小代价生成树（Minimum Cost Spanning Tree），简称为最小生成树。

构造最小生成树有多种算法，其中多数算法利用了最小生成树的一种简称为 MST 的性质：假设  $ N = (V, E) $ 是一个连通网，U 是顶点集 V 的一个非空子集，若  $ (u, v) $ 是一条具有最小权值（代价）的边，其中  $ u \in U $、 $ v \in V - U $，则必存在一棵包含边  $ (u, v) $ 的最小生成树。

可以用反证法来证明。假设网 N 的任何一棵最小生成树都不包含  $ (u, v) $。设 T 是连通网上的

一棵最小生成树，当将边  $ (u, v) $ 加入  $ T $ 中时，由生成树的定义， $ T $ 中必存在一条包含  $ (u, v) $ 的回路。另一方面，由于  $ T $ 是生成树，则在  $ T $ 上必存在另一条边  $ (u', v') $，其中  $ u' \in U $、 $ v' \in V - U $，且  $ u $ 和  $ u' $ 之间、 $ v $ 和  $ v' $ 之间均有路径相通。删去边  $ (u', v') $，便可消除上述回路，同时得到另一棵生成树  $ T' $。因为  $ (u, v) $ 的权值不高于  $ (u', v') $，则  $ T' $ 的权值亦不高于  $ T $， $ T' $ 是包含  $ (u, v) $ 的一棵最小生成树。由此和假设矛盾。

普里姆（Prim）算法和克鲁斯卡尔（Kruskal）算法是两个利用 MST 性质构造最小生成树的算法。下面先介绍普里姆算法。

### （1）普里姆算法的构造过程

假设  $ N = (V, E) $ 是连通网，TE 是 N 上最小生成树中边的集合。

①  $ U = \{u_0\} (u_0 \in V) $,  $ TE = \{\} $.

② 在所有  $ u \in U $、 $ v \in V - U $ 的边  $ (u, v) \in E $ 中找一条权值最小的边  $ (u_0, v_0) $ 并入集合  $ TE $，同时  $ v_0 $ 并入  $ U $。

③重复②，直至U=V为止。

此时 TE 中必有 n-1 条边，则  $ T=(V,TE) $ 为 N 的最小生成树。

图 6.19 所示为连通网  $ G_{5} $ 从  $ v_{1} $ 开始构造最小生成树的过程。可以看出，普里姆算法逐步增加 U 中的顶点，可称为“加点法”。

<div style="text-align: center;"><div style="text-align: center;">图6.19 普里姆算法构造最小生成树的过程</div> </div>

#### 注意

每次选择最小边时，可能存在多条同样权值的边可选，此时任选其一即可。

##### （2）普里姆算法的实现

假设一个无向网  $ G $ 以邻接矩阵形式存储，从顶点  $ u $ 出发构造  $ G $ 的最小生成树  $ T $，要求输出  $ T $ 的各条边。为实现这个算法需附设一个辅助数组 closedge，以记录从  $ U $ 到  $ V - U $ 具有最小权值的边。对每个顶点  $ v_i \in V - U $，在辅助数组中存在一个相应分量 closedge[i-1]，它包括两个域：lowcost 和 adjvex。其中 lowcost 存储最小边上的权值，adjvex 存储最小边在  $ U $ 中的那个顶点。显然，closedge[i-1].lowcost = min{cost( $ u, v_i $)| $ u \in U $}，其中 cost( $ u, v $) 表示赋予边 ( $ u, v $) 的权。// 辅助数组的定义，用来记录从顶点集  $ \bar{U} $ 到  $ V - U $ 的权值最小的边

VerTexType adjvex; // 最小边在U中的那个顶点
ArcType lowcost; // 最小边上的权值
}closedge[MVNum];

##### 算法6.8 普里姆算法

【算法步骤】

① 首先将初始顶点 u 加入 U 中，对其余的每一个顶点  $ v_{i} $，将 closedge[j] 均初始化为到 u 的边信息。

②循环n-1次，做如下处理：

从各组边 closedge 中选出最小边 closedge[k]，输出此边；

普里姆算法

将 k 加入 U 中；

更新剩余的每组最小边信息 closedge[j]，对于 V-U 中的边，新增加了一条从 k 到 j 的边，如果新边的权值比 closedge[j].lowcost 小，则将 closedge[j].lowcost 更新为新边的权值。

【算法描述】

void MiniSpanTree_Prim(AMGraph G, VerTexType u)
{
 // 无向网G以邻接矩阵形式存储，从顶点u出发构造G的最小生成树，输出树的各条边
 k = LocateVex(G, u);
 for (j = 0; j < G.vexnum; ++j)
 // 对V-U的每一个顶点初始化closedge[j]
 if (j != k) closedge[j] = {u, G.arcs[k][j]}; // {adjvex, lowcost}
 closedge[k].lowcost = 0; // 初始, U = {u}
 for (i = 1; i < G.vexnum; ++i)
 {
 // 选择其余n-1个顶点，生成n-1条边 (n = G.vexnum)
 k = Min(closedge);
 // 求出T的下一个结点：第k个顶点，closedge[k]中存有当前最小边
 u0 = closedge[k].adjvex; // u0 为最小边的一个顶点, u0 ∈ U
 v0 = G.vexs[k]; // v0 为最小边的另一个顶点, v0 ∈ V-U
 cout << u0 << v0; // 输出当前的最小边 (u0, v0)
 closedge[k].lowcost = 0; // 第k个顶点并入U集
 for (j = 0; j < G.vexnum; ++j)
 if (G.arcs[k][j] < closedge[j].lowcost) // 新顶点并入U后重新选择最小边
 closedge[j] = {G.vexs[k], G.arcs[k][j]};
 }
 // for
}

【算法分析】

分析算法 6.8，假设网中有 n 个顶点，则第一个进行初始化的循环语句的频度为 n，第二个循环语句的频度为 n-1。其中第二个有两个内循环：其一是在 closedge[v].lowcost 中求最小值，其频度为 n-1；其二是重新选择具有最小权值的边，其频度为 n。由此，普里姆算法的时间复杂度为  $ O(n^{2}) $，与网中的边数无关，因此适用于求稠密网的最小生成树。

【例 6.1】利用算法 6.8，对图 6.19（a）所示的连通网  $ G_{5} $ 从顶点  $ v_{1} $ 开始构造最小生成树，给出算法中各参量的变化。

各参量的变化如表6.1所示。

<div style="text-align: center;"><div style="text-align: center;">表6.1 图6.19构造最小生成树过程中辅助数组中各参量的变化</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">closedage[i]</td><td colspan="11">i</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>U</td><td style='text-align: center; word-wrap: break-word;'>V-U</td><td style='text-align: center; word-wrap: break-word;'>k</td><td style='text-align: center; word-wrap: break-word;'>$ (u_0, v_0) $</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>adjvex</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>$ v_1 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_1 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_1 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_1 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_1 $</td><td rowspan="2">$ \{\nu_1\} $</td><td rowspan="2">$ \{\nu_2, \nu_3, \nu_4, \nu_5, \nu_6\} $</td><td rowspan="2">2</td><td rowspan="2">$ (\nu_1, \nu_3) $</td><td rowspan="2"></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>lowcost</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>$ \infty $</td><td style='text-align: center; word-wrap: break-word;'>$ \infty $</td></tr></table>

续表

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">closedage[i]</td><td colspan="10">i</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>U</td><td style='text-align: center; word-wrap: break-word;'>V-U</td><td style='text-align: center; word-wrap: break-word;'>k</td><td style='text-align: center; word-wrap: break-word;'>$ (u_0, v_0) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>adjvex</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>$ v_1 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td rowspan="2">$ \{\ v_1, v_3 \} $</td><td rowspan="2">$ \{\ v_2, v_4, v_5, v_6 \} $</td><td rowspan="2">5</td><td rowspan="2">$ (v_3, v_6) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>lowcost</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>4</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>adjvex</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>$ v_6 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td style='text-align: center; word-wrap: break-word;'></td><td rowspan="2">$ \{\ v_1, v_3, v_6 \} $</td><td rowspan="2">$ \{\ v_2, v_4, v_5 \} $</td><td rowspan="2">3</td><td rowspan="2">$ (v_6, v_4) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>lowcost</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>adjvex</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td style='text-align: center; word-wrap: break-word;'></td><td rowspan="2">$ \{\ v_1, v_3, v_6, v_4 \} $</td><td rowspan="2">$ \{\ v_2, v_5 \} $</td><td rowspan="2">1</td><td rowspan="2">$ (v_3, v_2) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>lowcost</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>adjvex</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>$ v_2 $</td><td style='text-align: center; word-wrap: break-word;'></td><td rowspan="2">$ \{\ v_1, v_3, v_6, v_4, v_2 \} $</td><td rowspan="2">$ \{ v_5 \} $</td><td rowspan="2">4</td><td rowspan="2">$ (v_2, v_5) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>lowcost</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>adjvex</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td rowspan="2">$ \{\ v_1, v_3, v_6, v_4, v_2, v_5 \} $</td><td rowspan="2">{}</td><td rowspan="2"></td><td rowspan="2"></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>lowcost</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr></table>

初始状态时，由于  $ U = \{v_1\} $，则到  $ V - U $ 中各顶点的最小边，即从依附于顶点  $ v_1 $ 的各条边中，找到一条权值最小的边  $ (v_1, v_3) $ 为生成树上的第一条边，同时将顶点  $ v_3 $ 并入集合  $ U $ 中。然后修改辅助数组中的值，首先将 closedge[2].lowcost 改为 0，表明顶点  $ v_3 $ 已并入  $ U $。由于边  $ (v_3, v_2) $ 上的权值小于 closedge[1].lowcost，则需修改 closedge[1] 为边  $ (v_3, v_2) $ 及其权值。同理修改 closedge[4] 和 closedge[5]。依次类推，直到  $ U = V $。

### （1）克鲁斯卡尔算法的构造过程

假设连通网  $ N = (V, E) $，将 N 中的边按权值从小到大的顺序排列。

① 初始状态为只有 n 个顶点而无边的非连通图  $ T=(V,\{\}) $，图中每个顶点自成一个连通分量。

② 在 E 中选择权值最小的边，若该边依附的顶点落在 T 中不同的连通分量上（不形成回路），则将此边加入 T 中，否则舍去此边而选择下一条权值最小的边。

③重复②. 直至T中所有顶点都在同一连通分量上为止。

例如，对图 6.19（a）所示的连通网  $ G_{5} $，图 6.20 所示为依照克鲁斯卡尔算法构造最小生成树的过程。权值分别为 1、2、3、4 的 4 条边由于满足上述条件，因此先后被加入 T 中；权值为 5 的两条边  $ (v_{1}, v_{4}) $ 和  $ (v_{3}, v_{4}) $ 被舍去。因为它们依附的两顶点在同一连通分量上，它们若加入 T 中，则会使 T 中产生回路，而下一条权值（=5）最小的边  $ (v_{2}, v_{3}) $ 连结两个连通分量，则可加入  $ T_{\circ} $。由此，构造成一棵最小生成树。

<div style="text-align: center;"><div style="text-align: center;">图6.20 克鲁斯卡尔算法构造最小生成树的过程</div> </div>

可以看出，克鲁斯卡尔算法逐步增加生成树的边，与普里姆算法相比，其可称为“加边法”。与普里姆算法一样，每次选择最小边时，可能有多条同样权值的边可选，可以任选其一。

#### （2）克鲁斯卡尔算法的实现

算法的实现要引入以下辅助的数据结构。

① 结构体数组 Edge：存储边的信息，包括边的两个顶点信息和权值。

// 辅助数组 Edges 的定义

struct
{
 VerTexType Head; // 边的始点
 VerTexType Tail; // 边的终点
 ArcType lowcost; // 边上的权值
}Edge[arcnum];

② Vexset[i]：标识各个顶点所属的连通分量。对每个顶点  $ v_i \in V $，在辅助数组中存在一个相应元素 Vexset[i] 表示该顶点所在的连通分量。初始时 Vexset[i] = i，表示各顶点自成一个连通分量。

// 辅助数组 Vexset 的定义
int Vexset[MVNum];

##### 【算法步骤】

① 将数组 Edge 中的元素按权值从小到大排序。

②依次查看数组 Edge 中的边，循环执行以下操作：

依次从排好序的数组 Edge 中选出一条边  $ (v_{1}, v_{2}) $；

在 Vexset 中分别查找  $ v_{1} $ 和  $ v_{2} $ 所在的连通分量 vs $ _{1} $ 和 vs $ _{2} $ 进行判断：

如果  $ vs_{1} $ 和  $ vs_{2} $ 不等，表明所选的两个顶点分属不同的连通分量，输出此边，并合并  $ vs_{1} $ 和  $ vs_{2} $ 两个连通分量；

如果  $ vs_{1} $ 和  $ vs_{2} $ 相等，表明所选的两个顶点属于同一个连通分量，舍去此边而选择下一条权值最小的边。

克鲁斯卡尔

算法

##### 【算法描述】

void MiniSpanTree_Kruskal(AMGraph G)
{
 // 无向网G以邻接矩阵形式存储，构造G的最小生成树，输出树的各条边
 Sort(Edge); // 将数组 Edge 中的元素按权值从小到大排序
 for (i=0; i<G.vexnum; ++i) // 辅助数组，表示各顶点自成一个连通分量
 Vexset[i]=i;
 for (i=0; i<G.arcnum; ++i) // 依次查看数组 Edge 中的边
 {
 v1=LocateVex(G, Edge[i].Head); // v1为边的始点 Head 的下标
 v2=LocateVex(G, Edge[i].Tail); // v2为边的终点 Tail 的下标
 vs1=Vexset[v1]; // 获取边 Edge[i] 的始点所在的连通分量 vs1
 vs2=Vexset[v2]; // 获取边 Edge[i] 的终点所在的连通分量 vs2
 if (vs1!=vs2) // 边的两个顶点分属不同的连通分量
 {
 cout<< Edge[i].Head << Edge[i].Tail;// 输出此边
 for (j=0; j<G.vexnum; ++j) // 合并 vs1 和 vs2 两个分量，即两个集合统一编号
 if (Vexset[j]==vs2) Vexset[j]=vs1; // 集合编号为 vs2 的都改为 vs1
 }
 // if
 // for

##### 【算法分析】

假若以第8章将介绍的“堆”来存放网中的边进行堆排序，对于包含e条边的网，上述算法排序时间是 $ O(\mathrm{elog}_2e) $。在for循环中最耗时的操作是合并两个不同的连通分量，只要采取合适的数据结构，就可以证明其执行时间为 $ O(\log_2e) $，因此整个for循环的执行时间是 $ O(\mathrm{elog}_2e) $。由此，克鲁斯卡尔算法的时间复杂度为 $ O(\mathrm{elog}_2e) $，与网中的边数有关。与普里姆算法相比，克鲁斯卡尔算法更适合于求稀疏网的最小生成树。

#### 6.6.2 最短路径

假若要在计算机上建立一个交通咨询系统，则可以采用图的结构来表示实际的交通网。如图 6.21 所示，图中顶点表示城市，边表示城市间的交通联系。例如，一位旅客要从 A 城到 B 城，他希望选择一条中转次数最少的路线。假设图中每一站都需要换车，则这个问题反映到图上就是要找一条从顶点 A 到 B 所含边的数目最少的路径。只需从顶点 A 出发对图进行广度优先搜索，一旦遇到顶点 B 就终止。由此所得的广度优先生成树上，从根顶点 A 到顶点 B 的路径就是中转次数最少的路径，路径上 A 与 B 之间的顶点数就是中转次数，但是，这只是一类最简单的图的最短路径问题。有时，对于旅客来说，可能更关心的是节省交通费用；而对于司机来说，里程和速度则是他们感兴趣的信息。为了在图上表示有关信息，可对边赋以权，权值表示两城市间的距离，或途中所需时间，或交通费用等。此时路径长度的度量就不再是路径上边的数目，而是路径上边的权值之和。考虑到交通图的有向性，例如，汽车的上山和下山，轮船的顺水和逆水，所花费的时间或代价就不相同，所以交通网往往是用带权有向网表示的。在带权有向网中，习惯上称路径上的第一个顶点为源点（Source），最后一个顶点为终点（Destination）。

<div style="text-align: center;"><div style="text-align: center;">图6.21 交通网示例</div> </div>

本节主要讨论两种常见的最短路径问题：一种是求从某个源点到其余各顶点的最短路径，另一种是求每一对顶点之间的最短路径。

## 1. 从某个源点到其余各顶点的最短路径

本节将讨论单源点的最短路径问题：给定带权有向图 G 和源点  $ v_{0} $，求从  $ v_{0} $ 到 G 中其余各顶点的最短路径。迪杰斯特拉（Dijkstra）提出了一个按路径长度递增的次序产生最短路径的算法，称为迪杰斯特拉算法。

### （1）迪杰斯特拉算法的求解过程

对于网  $ N = (V, E) $，将 N 中的顶点分成两组。

第一组 S：已求出的最短路径的终点集合（初始时只包含源点  $ v_{0} $）。

第二组 V-S：尚未求出的最短路径的顶点集合（初始时为  $ V-\{v_{0}\} $）。

算法将按各顶点与  $ v_{0} $ 间最短路径长度递增的次序，逐个将集合 V-S 中的顶点加入集合 S 中去。在这个过程中，总保持从  $ v_{0} $ 到集合 S 中各顶点的路径长度始终不大于到集合 V-S 中各顶点的路径长度。

这种求解方法能确保是正确的。因为，假设 S 为已求得最短路径的终点的集合，则可证明：下一条最短路径（设其终点为 x）或者是边  $ (v, x) $，或者是中间只经过 S 中的顶点而最后到达顶点 x 的路径。

这可用反证法来证明。假设此路径上有一个顶点不在 S 中，则说明存在一条终点不在 S 而长度比此路径短的路径。但是，这是不可能的。因为算法是按路径长度递增的次序来产生最短路径的，故长度比此路径短的所有路径均已产生，它们的终点必定在 S 中，即假设不成立。

例如，图6.22所示的带权有向图 $ G_{6} $中，从 $ v_{0} $到其余各顶点的最短路径如表6.2所示。

<div style="text-align: center;"><div style="text-align: center;">图 6.22 带权有向图  $ G_{6} $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">表6.2 有向图 $ G_{6} $中从 $ v_{0} $到其余各顶点的最短路径</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>源点</td><td style='text-align: center; word-wrap: break-word;'>终点</td><td style='text-align: center; word-wrap: break-word;'>最短路径</td><td style='text-align: center; word-wrap: break-word;'>路径长度</td></tr><tr><td rowspan="5">$ v_0 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_2 $</td><td style='text-align: center; word-wrap: break-word;'>$ (v_0, v_2) $</td><td style='text-align: center; word-wrap: break-word;'>10</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_4 $</td><td style='text-align: center; word-wrap: break-word;'>$ (v_0, v_4) $</td><td style='text-align: center; word-wrap: break-word;'>30</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td style='text-align: center; word-wrap: break-word;'>$ (v_0, v_4, v_3) $</td><td style='text-align: center; word-wrap: break-word;'>50</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_5 $</td><td style='text-align: center; word-wrap: break-word;'>$ (v_0, v_4, v_3, v_5) $</td><td style='text-align: center; word-wrap: break-word;'>60</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_1 $</td><td style='text-align: center; word-wrap: break-word;'>无</td><td style='text-align: center; word-wrap: break-word;'>∞</td></tr></table>

根据迪杰斯特拉算法的求解过程，首先求出  $ v_{0} $ 到  $ v_{2} $ 的路径  $ (v_{0}, v_{2}) $，然后按路径长度递增的次序依次得到  $ v_{0} $ 到  $ v_{4} $ 的路径  $ (v_{0}, v_{4}) $， $ v_{0} $ 到  $ v_{3} $ 的路径  $ (v_{0}, v_{4}, v_{3}) $， $ v_{0} $ 到  $ v_{5} $ 的路径  $ (v_{0}, v_{4}, v_{3}, v_{5}) $，而从  $ v_{0} $ 到  $ v_{1} $ 没有路径。

#### （2）迪杰斯特拉算法的实现

假设用带权的邻接矩阵  $ \text{arcs} $ 来表示带权有向网  $ G $， $ \text{G.arcs}[i][j] $ 表示弧  $ \langle v_i, v_j \rangle $ 上的权值。若  $ \langle v_i, v_j \rangle $ 不存在，则置  $ \text{G.arcs}[i][j] $ 为  $ \infty $，源点为  $ v_0 $。

算法的实现要引入以下辅助的数据结构。

① 一维数组 S[i]：记录从源点  $ v_{0} $ 到终点  $ v_{i} $ 是否已被确定最短路径长度，true 表示确定，false 表示尚未确定。

②一维数组 Path[i]：记录从源点  $ v_{0} $ 到终点  $ v_{i} $ 的当前最短路径上  $ v_{i} $ 的直接前驱顶点序号。其初值为：如果从  $ v_{0} $ 到  $ v_{i} $ 有弧，则 Path[i] 为  $ v_{0} $，否则为 -1。

③一维数组 D[i]：记录从源点  $ v_{0} $ 到终点  $ v_{i} $ 的当前最短路径长度。其初值为：如果从  $ v_{0} $ 到  $ v_{i} $ 有弧，则 D[i] 为弧上的权值，否则为  $ \infty $。

显然，最短路径必为 $ (v_{0}, v_{k}) $，其满足以下条件：

 $$ \mathbf{D}[k]=\min\{\mathbf{D}[i]|v_{i}\in V-S\} $$

求得顶点  $ v_{k} $ 的最短路径后，将其加入第一组顶点集 S 中。

每当加入一个新的顶点到顶点集 S，对第二组剩余的各个顶点而言，多了一个“中转”顶点，从而多了一个“中转”路径，所以要对第二组剩余的各个顶点的最短路径长度进行更新。

原来  $ v_0 $ 到  $ v_i $ 的最短路径长度为  $ D[i] $，加入  $ v_k $ 之后，以  $ v_k $ 作为中间顶点的“中转”路径长度为  $ D[k] + \text{G.arcs}[k][i] $，若  $ D[k] + \text{G.arcs}[k][i] < D[i] $，则用  $ D[k] + \text{G.arcs}[k][i] $ 取代  $ D[i] $。

更新后，再选择数组 D 中值最小的顶点加入第一组顶点集 S 中，如此进行下去，直到图中所有顶点都加入第一组顶点集 S 中为止。
