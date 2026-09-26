# 【算法分析】

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


在算法 6.13 中，在求每个事件的最早和最迟发生时间，以及活动的最早和最迟开始时间时，都要对所有顶点及每个顶点边表中所有的边结点进行检查，由此，求关键路径算法的时间复杂度为  $ O(n + e) $。

实践已经证明：用 AOE-网来估算某些工程完成的时间是非常有用的。实际上，求关键路径算法本身最初就是与维修和建造工程一起发展的。但是，由于网中各项活动是互相牵涉的，因此，影响关键活动的因素亦是多方面的，任何一项活动持续时间的改变都可能引起关键路径的改变。所以，当子工程在进行过程中持续时间有所调整时，就要重新计算关键路径。另外，若网中有几条关键路径，那么，单加快一条关键路径上关键活动的进度，还不能导致整个工程缩短工期，而必须同时加快在几条关键路径上的活动进度。

## 【案例分析】

在六度空间理论提出之后的30多年的时间里，社会学家试图证明（或否定）此假设的正确性，但是该理论从来没有得到过严谨的证明，虽然屡屡应验，但它只是一种假说。很多社会学家主持的验证研究，都使用了网络时代的新型通信手段——E-mail。

比较著名的实验是2001年美国哥伦比亚大学社会学系的登肯·瓦兹（Duncan J. Watts）主持的一项验证工程。166个不同国家的6万多名志愿者参加了该项研究。瓦兹随机选定18名目标（比如一名美国的教授、一名澳大利亚警察和一名挪威兽医等），要求志愿者选择其中的一名作为自己的目标，并发送电子邮件给自己认为最有可能发送该邮件给目标的亲友。研究取得了较好的验证成果，瓦兹在世界顶级的科学学术期刊《科学》上发表了论文，表明邮件要达到目标，平均也只要经历5～7个人。

但实际上，这种研究方式有很大的局限性和困难。第一，使用 E-mail 保持社会关系的人群是有限的；第二，要记录和跟踪所有 E-mail 的走向是一项巨大的工程，需要大量的人力和较长的时间；第三，验证过程与志愿者的意愿紧密相关，志愿者可能会遗漏某些相识的人。

现代人使用电话和短信进行联络的频率远远大于使用 E-mail 的频率。由于电话和短信的通信都有运营商，与 E-mail 的通信相比，更便于跟踪。为了排除部分广告电话和广告短信，我们可以假设任意两个人在一年内，电话或短信相互收发两次以上即定义为两人“认识”，这样便很容易根据电话或短信的通信信息确定两人是否存在“认识”的关系。但在实际操作中，由于通信数据保密的原因，我们无法获取实际的通信数据，因此我们只能从理论上介绍并分析验证的方法。

我们把六度空间理论中的人际关系网络图抽象成一个不带权值的无向图 G，用图 G 中的一个顶点表示一个人，两个人“认识”与否，用代表这两个人的顶点之间是否有一条边来表示。

这样六度空间理论问题便可描述为：在图 G 中，任意两个顶点之间都存在一条路径长度不超过7的路径。

在实际验证过程中，可以通过测试满足要求的数据达到一定的百分比（比如99.5%）来进行验证。这样我们便把待验证六度空间理论问题描述为：在图G中，任意一个顶点到其余99.5%以上的顶点都存在一条路径长度不超过7的路径。

比较简单的一种验证方案是：利用广度优先搜索方法，对任意一个顶点，通过对图 G 的“7层”遍历，就可以统计出所有路径长度不超过7的顶点数，从而得到这些顶点在所有顶点中所占的比例。

【案例实现】

### 算法 6.14 六度空间理论的验证

【算法步骤】

① 完成系列初始化工作：设变量 Visit_Num 用来记录路径长度不超过 7 的顶点个数，初值为 0；数组 level 用来记录遍历时不同层次下入队的顶点个数；Start 为指定的一个起始顶点，置 visited[Start] 的值为 true，即将 Start 标记为六度顶点的始点；辅助队列 Q 初始化为空，然后使 Start 入队。

② 当队列 Q 非空，且循环次数小于 7 时，循环执行以下操作（统计路径长度不超过 7 的顶点个数）。

当遍历到点的个数小于上一层入队的点的个数时：

队头顶点 u 出队：

依次检查 u 的所有邻接点 w，如果 visited[w] 的值为 false，则将 w 标记为六度顶点；

路径长度不超过7的顶点个数 Visit Num 加1，该层次的顶点个数加1；

使w入队。

③ 退出循环时输出从顶点 Start 出发，到其他顶点长度不超过 7 的路径的百分比。

六度空间

【算法描述】

void SixDegree_BFS(Graph G,int Start)
{
 // 通过广度优先搜索方法遍历G来验证六度空间理论，Start为指定的始点
 Visit_Num=0; // 记录路径长度不超过7的顶点个数
 visited[Start]=true; // 置顶点Start访问标志数组相应分量值为true
 InitQueue(Q); EnQueue(Q,Start); // 辅助队列Q初始化，置空，Start进队
 level[0]=1; // 第一层入队的顶点个数初始化为1
 for(len=1;len<=6 && !QueueEmpty(Q);len++) // 统计路径长度不超过7的顶点个数
 {
 for(i=0;i<level[len-1];i++)
 {
 DeQueue(Q,u);
 for(w=FirstAdjVex(G,u);w>=0;w=NextAdjVex(G,u,w))
 // 依次检查u的所有邻接点w，FirstAdjVex(G,u)表示u的第一个邻接点
 //NextAdjVex(G,u,w)表示u相对于w的下一个邻接点，w≥0表示存在邻接点
 if(!visited[w])
 {
 visited[w]=true;
 Visit_Num++; level[len]++; // 路径长度不超过7的顶点个数加1，该层次的顶点个数加1
 EnQueue(Q,w);
 }
 }
 }
}
cout<<100*Visit_Num/G.vexnum;

// 输出从顶点 Start 出发，到其他顶点长度不超过 7 的路径的百分比

#### 【算法分析】

假定人际关系网络图 G 中有 10 亿人，即图中的顶点个数 n = 10 亿。根据“150 定律”，如果平均每个人认识其他 150 个人，则该图中边的个数  $ e \approx 150 \times n / 2 = 75 \times 10^9 $，该算法的时间复杂度为  $ O(n + e) $，约为 100G，对于现代达到每秒万亿次的运算速度的计算机来说，每秒钟可以验证数个顶点，每天可以验证数万人。算法在空间上需要借助数组 visited 和队列 Q，因而空间复杂度为  $ O(n) $。

算法 6.14 给出了利用广度优先搜索方法进行验证的方案，实际上也可以利用求解最短路径的方法（迪杰斯特拉算法或弗洛伊德算法）对六度空间理论进行理论上的验证。读者可以根据算法 6.14 和最短路径算法自行写出相应的验证方法。

#### 【问题描述】

给定包含 $n$ 个结点的网络，结点标记为 1 到 $n$，信号经过有向边的传递时间用列表 times 表示。其中，$\text{times}[i] = (u_i, v_i, w_i)$，$u_i$ 是源结点，$v_i$ 是目标结点，$w_i$ 是一个信号从源结点传递到目标结点的时间。从网络中的某个结点 $k$ 发出信号，需要多久才能使所有结点都收到信号？若不能使所有结点都收到信号，返回 -1。

【输入输出示例】

输入：times = [[2, 1, 1], [2, 3, 1], [3, 4, 1]]，n = 4，k = 2

输出：2

网络结点如图 6.30 所示。

##### 【问题分析】

本题需要用到单源最短路径迪杰斯特拉算法。根据题意，从结点 k 发出的信号，到达结点 x 的时间就是到结点 x 的最短路径的长度。因此需要计算结点 k 到其余所有点的最短路径长度，其中的最大值就是答案。若网络中存在从 k 出发无法到达的结点，则返回 -1。图 6.30 所示的网络中，从结点 2 到其余各结点的最短路径如表 6.8 所示。

<div style="text-align: center;"><div style="text-align: center;">图6.30 网络结点</div> </div>

<div style="text-align: center;"><div style="text-align: center;">表6.8 从结点2到其余各结点的最短路径</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>起点</td><td style='text-align: center; word-wrap: break-word;'>终点</td><td style='text-align: center; word-wrap: break-word;'>最短路径</td><td style='text-align: center; word-wrap: break-word;'>路径长度</td><td style='text-align: center; word-wrap: break-word;'>ans</td></tr><tr><td rowspan="3">2</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>(2, 1)</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>(2, 3)</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>(2, 3, 4)</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr></table>

【算法步骤】

①遍历传递时间列表 times，循环执行以下操作：

定义变量 v1 和 v2，分别记录源结点和目标结点；

将信号从 v1 传递到 v2 所需的时间记录在 g 中。

②遍历所有结点，循环执行以下操作：

遍历用于记录从源结点到当前结点的最短路径长度是否被确定的数组 used，查找未确

定结点中到源结点路径长度最短的结点；
将查找到的结点标记为已确定；
更新最短路径长度的最大值；
再次遍历所有结点，更新其他结点到源结点的最短路径长度。

③返回从结点 k 发出信号到所有结点都收到信号所需时间 ans。

【算法描述】

int networkDelayTime(int** times, int timesSize, int* timesColSize, int n, int k)
{
 int 计算从结点k发出一个信号，使所有结点都收到信号的时间
 const int inf = 0x3f3f3f3f;
 int** g = (int**)malloc(n * sizeof(int*));
 for (int i = 0; i < n; i++) {
 g[i] = (int*)malloc(n * sizeof(int));
 memset(g[i], inf, sizeof(int) * n);
 }
 for (int i = 0; i < timesSize; i++) {
 // 将结点间的信号传递时间记录在g中
 {
 int v1 = times[i][0], v2 = times[i][1];
 g[v1 - 1][v2 - 1] = times[i][2];
 }
 int* dist = (int*)malloc(n * sizeof(int)); // 记录从k到其余各点的最短路
 memset(dist, inf, sizeof(int) * n);
 dist[k - 1] = 0;
 int* used = (int*)malloc(n * sizeof(int)); // 记录结点是否为已确定结点
 memset(used, 0, sizeof(int) * n);
 int ans = 0;
 for (int i = 0; i < n; ++i)
 {
 int x = -1;
 for (int y = 0; y < n; ++y) // 查找未确定结点中到源结点路径长度最短的结点
 if (!used[y] && (x == -1 || dist[y] < dist[x]))
 x = y;
 used[x] = true; // 将查找到的结点标记为已确定
 ans = fmax(ans, dist[x]); // 更新最短路路径长度的最大值
 for (int y = 0; y < n; ++y) // 更新其他结点到源结点的最短路路径长度
 dist[y] = fmin(dist[y], dist[x] + g[x][y]);
 }
 return ans == inf ? -1 : ans; // 返回所需时间
 }

【算法分析】

数组 times 的长度为 m 时，时间复杂度为  $ O(n^{2}+m) $；邻接矩阵需占用  $ O(n^{2}) $ 的空间，因此空间复杂度为  $ O(n^{2}) $。

【算法练习题6.2】LeetCode 547 省份数量 ★★

【问题描述】

假设有 $n$ 个城市，其中部分城市彼此相连，另一部分没有相连，若城市 $a$ 与城市 $b$ 直接相连，且城市 $b$ 与城市 $c$ 直接相连，则城市 $a$ 与城市 $c$ 间接相连。给定一个 $n \times n$ 的矩阵 isConnected$，isConnected[i][j] = 1$ 表示第 $i$ 个城市和第 $j$ 个城市直接相连，isConnected[i][j] = 0 表示二者不直接相连。请设计一个算法，返回城市关系图中的省份数目，省份即一组直接或间接相连。

相连的城市，组内不含其他没有与它们相连的城市。

##### 【输入输出示例】

输入：isConnected = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]

输出：2

城市关系图如图6.31所示。

<div style="text-align: center;"><div style="text-align: center;">图6.31 城市关系图</div> </div>

##### 【问题分析】

本题可以将 n 个城市和城市之间的相连关系看成图，城市是图中的顶点，相连关系是图中的边，矩阵 isConnected 为图的邻接矩阵，省份即为图中的连通分量。

计算城市关系图中的省份数目等同于计算图中的连通分量数目，可以通过深度优先搜索来实现。遍历所有城市，对于每个城市，如果该城市未被访问过，则从该城市开始深度优先搜索，通过矩阵 isConnected 得到与该城市直接相连的城市，这些城市与该城市属于同一个连通分量，然后对这些城市继续进行深度优先搜索，直到同一个连通分量的所有城市都被访问到，即可得到一个省份。遍历完所有城市后，即可得到连通分量的总数，即城市关系图中的省份数目。

##### 【算法步骤】

①遍历所有城市，循环执行以下操作。

若当前城市 i 没有被访问过，则从该城市开始深度优先搜索与其直接相连的城市，具体步骤如下：遍历所有结点，若城市 i 与城市 j 直接相连，且城市 j 未被访问过，则将其标记为已访问，并递归调用深度优先搜索方法，搜索与城市 j 直接相连的城市。

搜索完一个连通分量，省份数目 provinces 加 1。

②返回省份数目 provinces。

【算法描述】

void DFS(int** isConnected, int* visited, int cities, int i)
{
 // 深度优先搜索
 for (int j = 0; j < cities; j++)
 if (isConnected[i][j] == 1 && !visited[j])
 {
 visited[j] = 1;
 DFS(isConnected, visited, cities, j);
 }
}

int findCircleNum(int** isConnected, int isConnectedSize, int* isConnectedColSize)
{
 // 计算省份数目
 int cities = isConnectedSize;
 int* visited = (int*)malloc(cities * sizeof(int));  // 记录当前城市是否访问过
}

memset(visited, 0, sizeof(visited) * cities);
int provinces = 0;
for (int i = 0; i < cities; i++)
{
 if (!visited[i])
 {
 DFS(isConnected, visited, cities, i);
 provinces++;
 }
}
return provinces;

##### 【算法分析】

算法需要遍历矩阵 isConnected 中的每个元素，时间复杂度为  $ O(n^{2}) $；算法使用数组 visited 来记录每个城市是否被访问过，数组长度是 n，递归调用栈的深度不会超过 n，因此空间复杂度为  $ O(n) $。

##### 【问题描述】

假设有 $n$ 个房间，编号为 $0 \sim n-1$，初始时，除 0 号房间外的其余房间都被锁住。现需要获取钥匙进入所有房间，当进入一个房间时，可能会在房间内找到一套不同的钥匙，每把钥匙上标有对应的房间号，表示该钥匙可以打开对应的房间。给定一个数组 rooms，其中，rooms[i] 表示在 $i$ 号房间可找到的钥匙集合，若能进入所有房间，则返回 true，否则返回 false。

##### 【输入输出示例】

输入：rooms = [[1], [2], [3], []]

输出：true

解释：从0号房间开始，拿到钥匙1；之后去1号房间，拿到钥匙2；然后去2号房间，拿到钥匙3；最后去3号房间；由于能够进入每个房间，返回true。

##### 【问题分析】

当 x 号房间中有 y 号房间的钥匙时，就可以从 x 号房间进入 y 号房间。如果将 n 个房间视为有向图中的 n 个顶点，上述关系则可以视为图中的顶点 x 到顶点 y 的一条有向边。上述问题转化为给定一个有向图，判断从顶点 0 出发能否到达所有的顶点。

本题可以使用广度优先搜索的方式遍历整个有向图，统计从顶点 0 出发可以到达的顶点个数。广度优先搜索结束后，如果可到达顶点数等于图的总顶点数，则说明可以进入所有房间，返回 true，否则返回 false。

##### 【算法步骤】

① 定义数组 visited 和 que，visited 用来记录房间是否已进入过，que 模拟队列，用来记录待进入的房间编号。

② 定义变量 left 和 right，初始时 left = 0，right = 1。

③当 left 小于 right 时，即 que 非空时，循环执行以下操作。

从队列 que 中取出一个房间编号 x，left 向右移动一步。

可进入房间数 num 加 1。

遍历房间 x 中找到的钥匙列表，循环执行以下操作：

判断房间 x 中的第 i 把钥匙对应的房间是否进入过；

若没有进入过，则将该房间标记为已进入过，并将房间编号存入 que。

④ 判断已进入过的房间数是否等于房间总数，若等于，返回 true，否则返回 false。

【算法描述】

bool canVisitAllRooms(int** rooms, int roomsSize, int* roomsColSize)
{
 // 利用基于队列的广度优先搜索方法判断能否进入所有房间
 int* visited = (int*)malloc(roomsSize * sizeof(int));
 memset(visited, 0, sizeof(int) * roomsSize);
 int* que = (int*)malloc(roomsSize * sizeof(int));
 memset(que, 0, sizeof(int) * roomsSize);
 int left = 0, right = 1, num = 0;
 visited[0] = true;
 que[0] = 0;
 while (left < right)
 {
 int x = que[left++];
 num++;
 for (int i = 0; i < roomsColSize[x]; i++)
 {
 if (!visited[rooms[x][i]])
 {
 visited[rooms[x][i]] = true;
 que[right++] = rooms[x][i];
 }
 }
 }
 if (num == roomsSize)
 return true;
 else
 return false;
}

##### 【算法分析】

算法使用广度优先搜索来遍历所有房间，最坏情况下需要访问所有房间和房间中的钥匙，因此时间复杂度为  $ O(n + m) $；算法使用了 visited 和 que 两个动态数组，大小为房间数，最坏情况下，所有房间都需要被访问，因此空间复杂度为  $ O(n) $。其中，n 为房间总数，m 为所有房间中的钥匙总数。

## 6.9 小结

图是一种复杂的非线性数据结构，具有广泛的应用背景。本章主要内容如下。

（1）根据不同的分类规则，图分为多种类型：无向图、有向图、完全图、连通图、强连通图、带权图（网）、稀疏图和稠密图等。邻接点、路径、回路、度、连通分量、生成树等是在图的算法设计中常用到的重要术语。

（2）图的存储方式有两大类：以边集合方式表示和以链接方式表示。其中，以边集合方式表示的为邻接矩阵，以链接方式表示的包括邻接表、十字链表和邻接多重表。邻接矩阵借助二维数组来表示元素之间的关系，实现起来较为简单；邻接表、十字链表和邻接多重表都属于链式存储结构，实现起来较为复杂。在实际应用中具体采取哪种存储表示，可以根据图的类型和实际算法的基本思想进行选择。其中，邻接矩阵和邻接表是两种常用的存储结构，二者之间的

比较如表6.9所示。

<div style="text-align: center;"><div style="text-align: center;">表6.9 邻接矩阵和邻接表的比较</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2" colspan="2">比较项目</td><td colspan="2">邻接矩阵</td><td colspan="2">邻接表</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>无向图</td><td style='text-align: center; word-wrap: break-word;'>有向图</td><td style='text-align: center; word-wrap: break-word;'>无向图</td><td style='text-align: center; word-wrap: break-word;'>有向图</td></tr><tr><td colspan="2">空间</td><td style='text-align: center; word-wrap: break-word;'>邻接矩阵对称，可压缩至  $ n(n-1)/2 $ 个单元</td><td style='text-align: center; word-wrap: break-word;'>邻接矩阵不对称，存储  $ n^2 $ 个单元</td><td style='text-align: center; word-wrap: break-word;'>存储  $ n+2e $ 个单元</td><td style='text-align: center; word-wrap: break-word;'>存储  $ n+e $ 个单元</td></tr><tr><td rowspan="3">时间</td><td style='text-align: center; word-wrap: break-word;'>求某个顶点  $ v_i $ 的度</td><td style='text-align: center; word-wrap: break-word;'>查找邻接矩阵中序号 i 对应的一行， $ O(n) $</td><td style='text-align: center; word-wrap: break-word;'>求出度：查找矩阵的一行， $ O(n) $；\n求入度：查找矩阵的一列， $ O(n) $</td><td style='text-align: center; word-wrap: break-word;'>查找  $ v_i $ 的边表，\n最坏情况  $ O(n) $</td><td style='text-align: center; word-wrap: break-word;'>求出度：查找  $ v_i $ 的边表，最坏情况  $ O(n) $；\n求入度：按顶点表顺序查找所有边表， $ O(n+e) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>求边的数目</td><td colspan="2">查找邻接矩阵， $ O(n^2) $</td><td style='text-align: center; word-wrap: break-word;'>按顶点表顺序查找所有边表， $ O(n+2e) $</td><td style='text-align: center; word-wrap: break-word;'>按顶点表顺序查找所有边表， $ O(n+e) $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>判定边 ( $ v_i $,  $ v_j $) 是否存在</td><td colspan="2">直接检查邻接矩阵  $ A[i][j] $ 元素的值， $ O(1) $</td><td colspan="2">查找  $ v_i $ 的边表，最坏情况  $ O(n) $</td></tr><tr><td colspan="2">适用情况</td><td colspan="2">稠密图</td><td colspan="2">稀疏图</td></tr></table>

（3）图的遍历算法是实现图的其他运算的基础，图的遍历方法有两种：深度优先搜索遍历和广度优先搜索遍历。深度优先搜索遍历类似于树的先序遍历，借助于栈结构来实现（递归）；广度优先搜索遍历类似于树的层次遍历，借助于队列结构来实现。两种遍历方法的不同之处仅仅在于对顶点访问的顺序不同，所以时间复杂度相同。当用邻接矩阵存储时，时间复杂度均为 $ O(n^{2}) $，用邻接表存储时，时间复杂度均为 $ O(n+e) $。

（4）图的很多算法与实际应用密切相关，比较常用的算法包括构造最小生成树算法、求解最短路径算法、拓扑排序和求解关键路径算法。

① 构造最小生成树有普里姆算法和克鲁斯卡尔算法，两者都能达到同一目的。但前者算法思想的核心是归并点，时间复杂度是  $ O(n^{2}) $，适用于稠密图；后者是归并边，时间复杂度是  $ O(\mathrm{elog}_{2}e) $，适用于稀疏图。

② 最短路径算法：一种是迪杰斯特拉算法，求从某个源点到其余各顶点的最短路径，求解过程是按路径长度递增的次序产生最短路径，时间复杂度是  $ O(n^{2}) $；另一种是弗洛伊德算法，求每一对顶点之间的最短路径，时间复杂度是  $ O(n^{3}) $，从实现形式上来说，这种算法比以图中的每个顶点为源点 n 次调用迪杰斯特拉算法更为简洁。

③ 拓扑排序和关键路径都是有向无环图的应用。拓扑排序基于以顶点表示活动的网，即 AOV-网。对于不存在环的有向图，图中所有顶点一定能够排成一个线性序列，即拓扑序列，拓扑序列是不唯一的。用邻接表表示图，拓扑排序的时间复杂度为  $ O(n + e) $。

④关键路径算法基于用边表示活动的网，即AOE-网。关键路径上的活动叫作关键活动，这些活动是影响工程进度的关键，它们的提前或延期将使整个工程提前或延期。关键路径是不唯一的。关键路径算法的实现是在拓扑排序的基础上，用邻接表表示图，关键路径算法的时间复杂度为  $ O(n + e) $。

学习完本章后，读者应掌握图的基本概念和术语，掌握图的4种存储表示，明确各自的特

点和适用场合，熟练掌握图的两种遍历算法，熟练掌握图在实际应用中的主要算法：最小生成树算法、最短路径算法、拓扑排序和关键路径算法。

## 1. 选择题

（1）在一个无向图中，所有顶点的度数之和等于图的边数的（）倍。

A. 1/2 B. 1 C. 2 D. 4

（2）在一个有向图中，所有顶点的入度之和等于所有顶点的出度之和的（）倍。

A. 1/2 B. 1 C. 2 D. 4

（3）具有 n 个顶点的有向图最多有 ___ 条边。

A. n B.  $ n(n-1) $ C.  $ n(n+1) $ D.  $ n^{2} $

（4）n 个顶点的连通图用邻接矩阵表示时，该矩阵至少有（）个非零元素。

A. n B. 2(n-1) C. n/2 D.  $ n^{2} $

（5）G 是一个非连通无向图，共有 28 条边，则该图至少有（ ）个顶点。

A. 7 B. 8 C. 9 D. 10

（6）若从无向图的任意一个顶点出发进行一次深度优先搜索可以访问图中所有的顶点，则该图一定是（）图。

A. 非连通 B. 连通 C. 强连通 D. 有向

（7）下面（___）适合构造一个稠密图 G 的最小生成树。

A. 普里姆算法

B. 克鲁斯卡尔算法

C. 弗洛伊德算法

D. 迪杰斯特拉算法

（8）用邻接表表示图进行广度优先遍历时，通常可借助（）来实现算法。

A. 栈 B. 队列 C. 树 D. 图

（9）用邻接表表示图进行深度优先遍历时，通常可借助（）来实现算法。

A. 栈 B. 队列 C. 树 D. 图

（10）图的深度优先遍历类似于二叉树的（）。

A. 先序遍历 B. 中序遍历 C. 后序遍历 D. 层次遍历

（11）图的广度优先遍历类似于二叉树的（）。

A. 先序遍历 B. 中序遍历 C. 后序遍历 D. 层次遍历

（12）图的 BFS 生成树的树高比 DFS 生成树的树高（）。

A. 小 B. 大 C. 小或相等 D. 大或相等

（13）已知图的邻接矩阵如图6.32所示，则从顶点 $ v_{0} $出发按深度优先遍历的结果是()。

 $$ \begin{aligned}&v_{0}\left[\begin{array}{lllllll}0&1&1&1&1&0&1\\1&0&0&1&0&0&1\\1&0&0&0&1&0&0\\1&1&0&0&1&1&0\\1&0&1&1&0&1&0\\0&0&0&1&1&0&1\\1&1&0&0&0&1&0\end{array}\right]\\&v_{3}\left[\begin{array}{lllllll}0&1&1&1&1&0&1\\1&0&1&1&0&1&0\\0&0&0&1&1&0&1\\1&1&0&0&0&1&0\end{array}\right]\end{aligned} $$

A. 0243156

B. 0136542

C. 0134256

D. 0361542

（14）已知图的邻接表如图6.33所示，则从顶点 $ v_{0} $出发按广度优先遍历的结果是( ),按深度优先遍历的结果是( )。

A. 0132 B. 0231 C. 0321 D. 0123

<div style="text-align: center;"><div style="text-align: center;">图6.33 邻接表</div> </div>

（15）下面的（）方法可以判断出一个有向图是否有环。

A. 求最小生成树

B. 拓扑排序

C. 求最短路径

D. 求关键路径

## 2. 应用题

（1）已知如图 6.34 所示的有向图，请给出：

①每个顶点的入度和出度；

②邻接矩阵：

③邻接表：

④逆邻接表。

（2）已知如图 6.35 所示的无向网，请给出：

①邻接矩阵：

②邻接表：

③最小生成树。

③最小生成树。

（3）已知图的邻接矩阵如图6.36所示。试分别画出自顶点1出发进行遍历所得的深度优先生成树和广度优先生成树。

（4）有向网如图6.37所示，试用迪杰斯特拉算法求出从顶点a到其他各顶点的最短路径，完成表6.10。

<div style="text-align: center;"><div style="text-align: center;">图6.34 有向图</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>10</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图6.35 无向网</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 6.36 邻接矩阵</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图6.37 有向网</div> </div>

<div style="text-align: center;"><div style="text-align: center;">表6.10 最短路径的求解</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>终点</td><td style='text-align: center; word-wrap: break-word;'>i = 1</td><td style='text-align: center; word-wrap: break-word;'>i = 2</td><td style='text-align: center; word-wrap: break-word;'>i = 3</td><td style='text-align: center; word-wrap: break-word;'>i = 4</td><td style='text-align: center; word-wrap: break-word;'>i = 5</td><td style='text-align: center; word-wrap: break-word;'>i = 6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>15\n(a,b)</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>$ \frac{{2}}{{(a,c)}} $</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>12\n(a,d)</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>e</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>f</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>g</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S\n终点集</td><td style='text-align: center; word-wrap: break-word;'>{a,c}</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

（5）已知如图 6.38 所示的 AOE-网：

<div style="text-align: center;"><div style="text-align: center;">图6.38 AOE-网</div> </div>

①求这个工程最早可能在什么时间结束；

②求每个活动的最早开始时间和最迟开始时间；

③ 确定哪些活动是关键活动。

3. 算法设计题

（1）分别以邻接矩阵和邻接表作为存储结构，实现以下图的基本操作：

①增加一个新顶点v，函数为 $  \mathrm{InsertVex}(G,v)  $;

②删除顶点 v 及其相关的边，函数为 DeleteVex(G, v);

③增加一条边 $ \langle v, w \rangle $，函数为  $ \mathrm{InsertArc}(G, v, w) $；

④ 删除一条边  $ \langle v, w \rangle $，函数为 DeleteArc(G, v, w)。

（2）一个连通图采用邻接表作为存储结构，设计一个算法，实现从顶点 v 出发的深度优先遍历的非递归过程。

（3）设计一个算法，求图G中距离顶点v的最短路径长度最大的一个顶点，设v可达其余各个顶点。

（4）试基于图的深度优先搜索策略设计一算法，判别以邻接表方式存储的有向图中是否存在由顶点  $ v_{i} $ 到顶点  $ v_{j} $ 的路径 ( $ i \neq j $)。

（5）采用邻接表存储结构，设计一个算法，判别无向图中任意给定的两个顶点之间是否存在一条长度为 k 的简单路径。
