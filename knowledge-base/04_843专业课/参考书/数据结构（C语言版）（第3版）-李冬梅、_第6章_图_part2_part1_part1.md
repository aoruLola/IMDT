# 算法 6.10 迪杰斯特拉算法

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


【算法步骤】

①初始化：

将源点  $ v_{0} $ 加到 S 中，即  $ S[v_{0}] = true $；

将  $ v_0 $ 到各个终点的最短路径长度初始化为权值，即  $ D[i] = G. \arcsin[v_0][v_i] $ ( $ v_i \in V - S $)；

如果  $ v_0 $ 和顶点  $ v_i $ 之间有弧，则将  $ v_i $ 的前驱置为  $ v_0 $，即  $ \text{Path}[i] = v_0 $，否则  $ \text{Path}[i] = -1 $。

迪杰斯特拉

算法

②循环n-1次，执行以下操作。

选择下一条最短路径的终点  $ v_{k} $，使得：

 $$ \mathbf{D}[k]=\min\{\mathbf{D}[i]|v_{i}\in V-S\} $$

将  $ v_{k} $ 加到 S 中，即  $ S[v_{k}] = \text{true} $;

● 根据条件更新从  $ v_0 $ 出发到集合  $ V - S $ 上任一顶点的最短路径的长度，若条件  $ D[k] + G. \arcsin [k][i] < D[i] $ 成立，则更新  $ D[i] = D[k] + G. \arcsin[k][i] $，同时更改  $ v_i $ 的前驱为  $ v_k $， $ \operatorname{Path}[i] = k $。

void ShortestPath_DIJ(AMGraph G, int v0)
{
 //用Dijkstra算法求有向网的v0顶点到其余顶点的最短路径
 n=G.vexnum; //n为G中顶点的个数
 for(v=0;v<n;++v) //n个顶点依次初始化
 {
 S[v]=false; //S初始为空集
 D[v]=G.arcs[v0][v]; //将v0到各个终点的最短路径长度初始化为弧上的权值
 if(D[v]<MaxInt) Path[v]=v0;  //如果v0和v之间有弧，则将v的前驱置为v0
 else Path[v]=-1; //如果v0和v之间无弧，则将v的前驱置为-1
 }
 S[v0]=true; //将v0加入S
 D[v0]=0; //源点到源点的距离为0
/*-----初始化结束，开始主循环，每次求得v0到某个顶点v的最短路径，将v加到S集-----*/
 for(i=1;i<n;++i) //对其余n-1个顶点，依次进行计算
 {
 min=MaxInt;
 for(w=0;w<n;++w)
 if(!S[w]&&D[w]<min)
 {v=w;min=D[w];}
 }
 S[v]=true; //将v加入S
 for(w=0;w<n;++w) //更新从v_0出发到集合V-S上所有顶点的最短路径长度

if (!S[w]&&(D[v]+G.arcs[v][w]<D[w]))
{
 D[w]=D[v]+G.arcs[v][w]; // 更新D[w]
 Path[w]=v; // 更改w的前驱为v
}
// if
// for

【例 6.2】利用算法 6.10，对图 6.22 所示的有向网  $ G_{6} $ 求解最短路径，给出算法中各参量的初始化结果和求解过程中的变化。

 $ G_{6} $ 的邻接矩阵如图 6.23 所示。

 $$ \begin{bmatrix}\infty&\infty&10&\infty&30&100\\\infty&\infty&5&\infty&\infty&\infty\\\infty&\infty&\infty&50&\infty&\infty\\\infty&\infty&\infty&\infty&\infty&10\\\infty&\infty&\infty&20&\infty&60\\\infty&\infty&\infty&\infty&\infty&\infty\end{bmatrix} $$

<div style="text-align: center;"><div style="text-align: center;">图6.23  $ G_{6} $ 的邻接矩阵</div> </div>

（1）对图中6个顶点依次初始化，初始化结果如表6.3所示。

<div style="text-align: center;"><div style="text-align: center;">表6.3 迪杰斯特拉算法初始化结果</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>v</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>true</td><td style='text-align: center; word-wrap: break-word;'>false</td><td style='text-align: center; word-wrap: break-word;'>false</td><td style='text-align: center; word-wrap: break-word;'>false</td><td style='text-align: center; word-wrap: break-word;'>false</td><td style='text-align: center; word-wrap: break-word;'>false</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>D</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>$ \infty $</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>$ \infty $</td><td style='text-align: center; word-wrap: break-word;'>30</td><td style='text-align: center; word-wrap: break-word;'>100</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>Path</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr></table>

（2）求解过程中各参量的变化如表6.4所示。

<div style="text-align: center;"><div style="text-align: center;">表6.4 迪杰斯特拉算法求解过程中各参量的变化</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">终点</td><td colspan="5">从 $ v_0 $到各终点的最短路径长度D值和最短路径的求解过程</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>i = 1</td><td style='text-align: center; word-wrap: break-word;'>i = 2</td><td style='text-align: center; word-wrap: break-word;'>i = 3</td><td style='text-align: center; word-wrap: break-word;'>i = 4</td><td style='text-align: center; word-wrap: break-word;'>i = 5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_1 $</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>∞</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_2 $</td><td style='text-align: center; word-wrap: break-word;'>$ \frac{10}{v_0, v_2} $</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>$ 60(v_0, v_2, v_3) $</td><td style='text-align: center; word-wrap: break-word;'>$ \frac{50}{v_0, v_4, v_3} $</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_4 $</td><td style='text-align: center; word-wrap: break-word;'>$ 30(v_0, v_4) $</td><td style='text-align: center; word-wrap: break-word;'>$ \frac{30}{v_0, v_4} $</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_5 $</td><td style='text-align: center; word-wrap: break-word;'>$ 100(v_0, v_5) $</td><td style='text-align: center; word-wrap: break-word;'>$ 100(v_0, v_5) $</td><td style='text-align: center; word-wrap: break-word;'>$ 90(v_0, v_4, v_5) $</td><td style='text-align: center; word-wrap: break-word;'>$ \frac{60}{v_0, v_4, v_3, v_5} $</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_k $</td><td style='text-align: center; word-wrap: break-word;'>$ v_2 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_4 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td style='text-align: center; word-wrap: break-word;'>$ v_5 $</td><td style='text-align: center; word-wrap: break-word;'>无</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>Path</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>Path[3] = 2</td><td style='text-align: center; word-wrap: break-word;'>Path[3] = 4\nPath[5] = 4</td><td style='text-align: center; word-wrap: break-word;'>Path[5] = 3</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>S[2] = true\n{  $ v_0, v_2 $ }</td><td style='text-align: center; word-wrap: break-word;'>S[4] = true\n{  $ v_0, v_2, v_4 $ }</td><td style='text-align: center; word-wrap: break-word;'>S[3] = true\n{  $ v_0, v_2, v_4, v_3 $ }</td><td style='text-align: center; word-wrap: break-word;'>S[5] = true\n{  $ v_0, v_2, v_4, v_3, v_5 $ }</td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

如何从表6.4中读取源点 $ v_{0} $到终点 $ v_{k} $的最短路径？以顶点k=5为例：

 $$  Path[5]=3\rightarrow Path[3]=4\rightarrow Path[4]=0 $$

反过来排列，得到路径0、4、3、5，这就是源点 $ v_{0} $到终点 $ v_{5} $的最短路径。

## 【算法分析】

算法 6.10 求解最短路径的主循环共进行 n-1 次，每次执行的时间是  $ O(n) $，所以算法的时间复杂度是  $ O(n^{2}) $。如果用带权的邻接表作为有向图的存储结构，则虽然修改 D 的时间可以减少，但由于在 D 中选择最小分量的时间不变，所以时间复杂度仍为  $ O(n^{2}) $。

人们可能只希望找到从源点到某一个特定终点的最短路径，但是，这个问题和求源点到其他所有顶点的最短路径一样复杂，也需要利用迪杰斯特拉算法来解决，其时间复杂度仍为 $ O(n^{2}) $。

## 2. 每一对顶点之间的最短路径

求解每一对顶点之间的最短路径有两种方法：其一是分别以图中的每个顶点为源点共调用n次迪杰斯特拉算法；其二是采用下面介绍的弗洛伊德（Floyd）算法。两种算法的时间复杂度均为 $ O(n^{3}) $，但后者形式上较简单。

弗洛伊德算法仍然使用带权的邻接矩阵  $ \mathrm{arcs} $ 来表示有向网 G，求从顶点  $ v_{i} $ 到  $ v_{j} $ 的最短路径。

算法的实现要引入以下辅助的数据结构。

（1）二维数组 Path[i][j]：最短路径上顶点  $ v_{j} $ 的前一顶点的序号。

（2）二维数组 D[i][j]：记录顶点  $ v_{i} $ 和  $ v_{j} $ 之间的最短路径长度。

### 【算法步骤】

将  $ v_i $ 到  $ v_j $ 的最短路径长度初始化，即  $ D[i][j] = \text{G.arcs[i][j]} $，然后进行  $ n $ 次比较和更新。

弗洛伊德算法

① 在  $ v_{i} $ 和  $ v_{j} $ 间加入顶点  $ v_{0} $，比较  $ (v_{i}, v_{j}) $ 和  $ (v_{i}, v_{0}, v_{j}) $ 的路径长度，取其中较短者作为  $ v_{i} $ 到  $ v_{j} $ 的中间顶点序号不大于 0 的最短路径。

② 在  $ v_{i} $ 和  $ v_{j} $ 间加入顶点  $ v_{1} $，得到  $ (v_{i},\cdots,v_{1}) $ 和  $ (v_{1},\cdots,v_{j}) $，其中  $ (v_{i},\cdots,v_{1}) $ 是从  $ v_{i} $ 到  $ v_{1} $ 的且中间顶点的序号不大于 0 的最短路径， $ (v_{1},\cdots,v_{j}) $ 是从  $ v_{1} $ 到  $ v_{j} $ 的且中间顶点的序号不大于 0 的最短路径，这两条路径已在上一步中求出。比较  $ (v_{i},\cdots,v_{1},\cdots,v_{j}) $ 与上一步求出的  $ v_{i} $ 到  $ v_{j} $ 的中间顶点序号不大于 0 的最短路径，取其中较短者作为  $ v_{i} $ 到  $ v_{j} $ 的中间顶点序号不大于 1 的最短路径。

③ 依次类推，在  $ v_{i} $ 和  $ v_{j} $ 间加入顶点  $ v_{k} $，若  $ (v_{i},\cdots,v_{k}) $ 和  $ (v_{k},\cdots,v_{j}) $ 分别是从  $ v_{i} $ 到  $ v_{k} $ 和从  $ v_{k} $ 到  $ v_{j} $ 的中间顶点的序号不大于 k-1 的最短路径，则将  $ (v_{i},\cdots,v_{k},\cdots,v_{j}) $ 和已经得到的从  $ v_{i} $ 到  $ v_{j} $ 且中间顶点序号不大于 k-1 的最短路径相比较，其长度较短者便是从  $ v_{i} $ 到  $ v_{j} $ 的中间顶点的序号不大于 k 的最短路径。这样，经过 n 次比较后，最后求得的必是从  $ v_{i} $ 到  $ v_{j} $ 的最短路径。按此方法，可以同时求得各对顶点间的最短路径。

根据上述求解过程，图中的所有顶点对  $ v_{i} $ 和  $ v_{j} $ 间的最短路径长度对应一个 n 阶方阵 D。在上述  $ n+1 $ 步中，D 的值不断变化，对应一个 n 阶方阵序列。

n 阶方阵序列可定义为：

 $$ D^{(-1)},D^{(0)},D^{(1)},\cdots,D^{(k)},\cdots,D^{(n-1)} $$

其中，

 $$ \begin{align*}D^{(-1)}[i][j]=\mathrm{G}.\arcsin[i][j]\\D^{(k)}[i][j]=\min\{D^{(k-1)}[i][j],\ D^{(k-1)}[i][k]+D^{(k-1)}[k][j]\}\qquad0\leqslant k\leqslant n-1\end{align*} $$

显然， $ D^{(1)}[i][j] $ 是从  $ v_i $ 到  $ v_j $ 的且中间顶点的序号不大于 1 的最短路径的长度； $ D^{(k)}[i][j] $ 是从  $ v_i $ 到  $ v_j $ 的中间顶点的序号不大于 k 的最短路径的长度； $ D^{(n-1)}[i][j] $ 就是从  $ v_i $ 到  $ v_j $ 的最短路径的长度。

【算法描述】

void ShortestPath_Floyd(AMGraph G)
{
 //用弗洛伊德算法求有向网G中各对顶点i和j之间的最短路径
 for (i=0; i<G.vexnum; ++i)
 //各对顶点之间初始已知路径及距离
 for (j=0; j<G.vexnum; ++j)
 {
 D[i][j]=G.arcs[i][j];
 if (D[i][j]<MaxInt && i!=j) Path[i][j]=i; //如果i和j之间有弧，则将j的前驱置为i
 else Path[i][j]=-1; //如果i和j之间无弧，则将j的前驱置为-1
 }
 for (k=0; k<G.vexnum; ++k)
 for (i=0; i<G.vexnum; ++i)
 for (j=0; j<G.vexnum; ++j)
 if (D[i][k]+D[k][j]<D[i][j])
 {
 D[i][j]=D[i][k]+D[k][j]; //从i经k到j的一条路径更短
 Path[i][j]=Path[k][j]; //更新D[i][j]
 }
 }
 }
}

【例 6.3】利用算法 6.11，对图 6.24 所示有向网  $ G_{7} $ 求解最短路径，给出每一对顶点之间的最短路径及其路径长度在求解过程中的变化。

 $ G_{7} $ 的邻接矩阵如图 6.25 所示。

<div style="text-align: center;"><div style="text-align: center;">图6.24 带权有向图 $ G_{7} $</div> </div>

 $$ \left\{{\begin{array}{c c c c}{0}&{1}&{2}&{3}\\ {\infty}&{1}&{\infty}&{4}\\ {\infty}&{\infty}&{9}&{2}\\ {3}&{5}&{\infty}&{8}\\ {\infty}&{\infty}&{6}&{\infty}\end{array}}\right.\;3 $$

<div style="text-align: center;"><div style="text-align: center;">图6.25  $ G_{7} $ 的邻接矩阵</div> </div>

每一对顶点 i 和 j 之间的最短路径 Path[i][j] 以及其路径长度 D[i][j] 在求解过程中的变化如表 6.5 所示。

<div style="text-align: center;"><div style="text-align: center;">表6.5 弗洛伊德算法求解过程中最短路径及其路径长度的变化</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'></td><td colspan="4">$ D^{(-1)} $</td><td colspan="4">$ D^{(0)} $</td><td colspan="4">$ D^{(1)} $</td><td colspan="4">$ D^{(2)} $</td><td colspan="4">$ D^{(3)} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>∞</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td colspan="4">$ Path^{(-1)} $</td><td colspan="4">$ Path^{(0)} $</td><td colspan="4">$ Path^{(1)} $</td><td colspan="4">$ Path^{(2)} $</td><td colspan="4">$ Path^{(3)} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>-1</td></tr></table>

如何从表 6.5 中读取两个顶点之间的最短路径？以 Path $ ^{(3)} $ 为例，对最短路径的读法加以说明。从 D $ ^{(3)} $ 知，顶点 1 到顶点 2 的最短路径长度为  $ D_{[1][2]} = 8 $，其最短路径看 Path[1][2] = 3，表明顶点 2 的前驱是顶点 3；再看 Path[1][3] = 1，表明顶点 3 的前驱是顶点 1。所以从顶点 1 到顶点 2 的最短路径为  $ \{<1, 3>,<3, 2>\} $。

最短路径问题在多个领域都有着广泛的应用。1960年，我国著名学者管梅谷教授首次提出了一种典型的组合优化问题，即中国邮路问题（Chinese Postman Problem, CPP）。该问题描述了一个邮递员从邮局出发，遍历某一地区所有街道并最终返回邮局的路径最短化问题。CPP问题在计算机科学、组合优化以及交通规划等领域成为研究的热点。这一问题的解决方案可以直接应用于现实生活中的多种场景，例如规划邮件投递路线、安排警察巡逻路径、设计垃圾收集线路等。因此，CPP问题吸引了通信、交通工程、运筹学等多个领域专家学者的广泛关注，并产生了众多求解该问题的方法。

## 1. AOV-网

无环的有向图称作有向无环图（Directed Acycline Graph），简称DAG图。有向无环图是描述一项工程或系统的进行过程的有效工具。通常把计划、施工过程、生产流程、程序流程等都当成一个工程。除了很小的工程外，一般的工程都可分为若干个称作活动（Activity）的子工程，而这些子工程之间，通常受着一定条件的约束，如其中某些子工程的开始必须在另一些子工程完成之后。

例如，一个软件专业的学生必须学习一系列基本课程（见表 6.6），其中有些课程是基础课，独立于其他课程，如“高等数学”；而另一些课程必须在学完作为其基础的先修课程才能开始。比如，在“程序设计基础”和“离散数学”学完之前就不能开始学习“数据结构”。这些先决条件定义了课程之间的领先（优先）关系。这个关系可以用有向图更清楚地表示，如图 6.26 所示。图中顶点表示课程，有向弧表示先决条件。若课程  $ c_i $ 是课程  $ c_j $ 的先决条件，则图中有弧  $ \langle c_i, c_j \rangle $。

<div style="text-align: center;"><div style="text-align: center;">表6.6 软件专业的必修课及其关系</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>课程编号</td><td style='text-align: center; word-wrap: break-word;'>课程名称</td><td style='text-align: center; word-wrap: break-word;'>先修课程</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_1 $</td><td style='text-align: center; word-wrap: break-word;'>程序设计基础</td><td style='text-align: center; word-wrap: break-word;'>无</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_2 $</td><td style='text-align: center; word-wrap: break-word;'>离散数学</td><td style='text-align: center; word-wrap: break-word;'>$ c_1 $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_3 $</td><td style='text-align: center; word-wrap: break-word;'>数据结构</td><td style='text-align: center; word-wrap: break-word;'>$ c_1, c_2 $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_4 $</td><td style='text-align: center; word-wrap: break-word;'>汇编语言</td><td style='text-align: center; word-wrap: break-word;'>$ c_1 $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_5 $</td><td style='text-align: center; word-wrap: break-word;'>高级语言程序设计</td><td style='text-align: center; word-wrap: break-word;'>$ c_3, c_4 $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_6 $</td><td style='text-align: center; word-wrap: break-word;'>计算机原理</td><td style='text-align: center; word-wrap: break-word;'>$ c_{11} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_7 $</td><td style='text-align: center; word-wrap: break-word;'>编译原理</td><td style='text-align: center; word-wrap: break-word;'>$ c_3, c_5 $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_8 $</td><td style='text-align: center; word-wrap: break-word;'>操作系统</td><td style='text-align: center; word-wrap: break-word;'>$ c_3, c_6 $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_9 $</td><td style='text-align: center; word-wrap: break-word;'>高等数学</td><td style='text-align: center; word-wrap: break-word;'>无</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_{10} $</td><td style='text-align: center; word-wrap: break-word;'>线性代数</td><td style='text-align: center; word-wrap: break-word;'>$ c_9 $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_{11} $</td><td style='text-align: center; word-wrap: break-word;'>普通物理</td><td style='text-align: center; word-wrap: break-word;'>$ c_9 $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ c_{12} $</td><td style='text-align: center; word-wrap: break-word;'>数值分析</td><td style='text-align: center; word-wrap: break-word;'>$ c_1, c_9, c_{10} $</td></tr></table>

这种用顶点表示活动，用弧表示活动间的优先关系的有向图称为以顶点表示活动的网（Activity On Vertex Network），简称 AOV-网。在网中，若从顶点  $ v_i $ 到顶点  $ v_j $ 有一条有向路径，则  $ v_i $ 是  $ v_j $ 的前驱； $ v_j $ 是  $ v_i $ 的后继。若  $ <v_i, v_j> $ 是网中一条弧，则  $ v_i $ 是  $ v_j $ 的直接前驱， $ v_j $ 是  $ v_i $ 的直接后继。

在 AOV- 网中，不应该出现有向环，因为存在环意味着某项活动应以自己为先决条件。显然，这是荒谬的。若设计出这样的流程图，工程便无法进行。而对程序的数据流图来说，则表明存在一个死循环。因此，对给定的 AOV- 网应首先判定网中是否存在环。检测的办法是对有向图的顶点进行拓扑排序，若网中所有顶点都在它的拓扑有序序列中，则该 AOV- 网中必定不存在环。

所谓拓扑排序就是将 AOV-网中所有顶点排成一个线性序列，该序列满足：若在 AOV-网中从顶点  $ v_{i} $ 到顶点  $ v_{j} $ 有一条路径，则该线性序列中的顶点  $ v_{i} $ 必定在顶点  $ v_{j} $ 之前。

例如，图 6.26 所示的有向图有如下两个拓扑有序

序列（当然，对此图也可构造出其他的拓扑有序序列）：

 $ c_{1} $,  $ c_{2} $,  $ c_{3} $,  $ c_{4} $,  $ c_{5} $,  $ c_{7} $,  $ c_{9} $,  $ c_{10} $,  $ c_{11} $,  $ c_{6} $,  $ c_{12} $,  $ c_{8} $ 和

 $$ c_{9},~c_{10},~c_{11},~c_{6},~c_{1},~c_{12},~c_{4},~c_{2},~c_{3},~c_{5},~c_{7},~c_{8} $$

学生必须按照拓扑有序的顺序来安排学习计划，这样才能保证学习任一门课程时其先修课程已经学过。那么如何进行拓扑排序呢？

<div style="text-align: center;"><div style="text-align: center;">图6.26 表示课程之间优先关系的有向图</div> </div>

## 2. 拓扑排序的过程

（1）在有向图中选一个无前驱的顶点且输出它。

（2）从图中删除该顶点和所有以它为尾的弧。

（3）重复（1）和（2），直至不存在无前驱的顶点。

（4）若此时输出的顶点数小于有向图中的顶点数，则说明有向图中存在环，否则输出的顶点序列即一个拓扑序列。

以图 6.27（a）中所示的有向图为例， $ v_1 $ 和  $ v_6 $ 没有前驱，则可任选一个。假设先输出  $ v_6 $，在删除  $ v_6 $ 及弧  $ \langle v_6, v_4 \rangle $、 $ \langle v_6, v_5 \rangle $ 之后，只有顶点  $ v_1 $ 没有前驱，则输出  $ v_1 $ 且删去  $ v_1 $ 及弧  $ \langle v_1, v_2 \rangle $、 $ \langle v_1, v_3 \rangle $ 和  $ \langle v_1, v_4 \rangle $，之后  $ v_3 $ 和  $ v_4 $ 都没有前驱。依次类推，可从中任选一个继续进行。整个拓扑排序的过程如图 6.27 所示，最后可得到该有向图的拓扑有序序列为  $ v_6, v_1, v_4, v_3, v_2, v_5 $。

 $$  A O V-|x| $$

 $$ V_{ 排 } $$

 $$ v_{i} $$

 $$ v_{4} 之后 $$

 $$ V_{s} $$

 $$ V_{ 空 } $$

<div style="text-align: center;"><div style="text-align: center;">图6.27 AOV-网及其拓扑有序序列产生的过程</div> </div>

## 3. 拓扑排序的实现

针对上述拓扑排序的过程，可采用邻接表作为有向图的存储结构。算法的实现要引入以下辅助的数据结构。

（1）一维数组 indegree[i]：存放各顶点入度，没有前驱的顶点就是入度为 0 的顶点。删除顶点及以它为尾的弧的操作，可不必真正对图的存储结构进行改变，可用弧头顶点的入度减 1 的办法来实现。

（2）栈 S：暂存所有入度为 0 的顶点，这样可以避免重复查找数组 indegree[i] 检测入度为 0 的顶点，提高算法的效率。

（3）一维数组 topo[i]：记录拓扑序列的顶点序号。

### 算法6.12 拓扑排序

【算法步骤】

① 求出各顶点的入度并存入数组 indegree[i] 中，使入度为 0 的顶点入栈。

②只要栈不空，则重复以下操作：

使栈顶顶点  $ v_{i} $ 出栈并保存在拓扑序列数组 topo 中；

对顶点  $ v_{i} $ 的每个邻接点  $ v_{k} $ 的入度减1，如果  $ v_{k} $ 的入度变为0，则使  $ v_{k} $ 入栈。

拓扑排序

③ 如果输出顶点个数少于 AOV- 网的顶点个数，则网中存在有向环，无法进行拓扑排序，否则拓扑排序成功。

【算法描述】

Status TopologicalSort(ALGraph G,int topo[])
{
 //有向图G采用邻接表作为存储结构
 //若G无回路，则生成G的一个拓扑序列topo并返回OK，否则ERROR
 FindInDegree(G,indegree); //求出各顶点的入度并存入数组indegree中
 InitStack(S); //栈S初始化为空
 for(i=0;i<G.vexnum;++i)
 if(!indegree[i]) Push(S,i); //入度为0者进栈
 m=0; //对输出顶点计数，初始为0
 while(!StackEmpty(S)) //栈S非空
 {
 Pop(S,i); //使栈顶顶点 $ v_i $出栈
 topo[m]=i; //将顶点 $ v_i $保存在拓扑序列数组topo中
 ++m; //对输出顶点计数
 p=G.vertices[i].firstarc; //p指向顶点 $ v_i $的第一个邻接点
 while(p!=NULL)
 {
 k=p->adjvex; // $ v_k $为 $ v_i $的邻接点
 --indegree[k]; // $ v_i $的每个邻接点的入度减1
 if(indegree[k]==0) Push(S,k); //若入度减为0，则入栈
 p=p->nextarc; //p指向顶点 $ v_i $下一个邻接结点
 }
 //while
 //while
 if(m<G.vexnum) return ERROR; //该有向图有回路
 else return OK;
}

分析算法 6.12，对有 n 个顶点和 e 条边的有向图而言，建立求各顶点入度的时间复杂度为  $ O(e) $；建立零入度顶点栈的时间复杂度为  $ O(n) $；在拓扑排序过程中，若有向图无环，则每个顶点进一次栈，出一次栈，入度减 1 的操作在循环中总共执行 e 次，所以，总的时间复杂度为  $ O(n + e) $。

【算法分析】

上述拓扑排序的算法亦是下面讨论的求关键路径算法的基础。
