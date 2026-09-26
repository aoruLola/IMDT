# 6.6.4 关键路径

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


## 1. AOE-网

与 AOV-网相对应的是 AOE-网（Activity On Edge Network），即以边表示活动的网。AOE-网是带权的有向无环图，其中，顶点表示事件，弧表示活动，权表示活动持续的时间。通常，AOE-网可用来估算工程的完成时间。

例如，图 6.28 所示为一个有 11 项活动的 AOE-网。其中有 9 个事件  $ v_{0}, v_{1}, \cdots, v_{8} $，每个事件表示在它之前的活动已经完成，在它之后的活动可以开始。例如， $ v_{0} $ 表示整个工程开始； $ v_{8} $ 表示整个工程结束， $ v_{4} $ 表示  $ a_{4} $ 和  $ a_{5} $ 已经完成， $ a_{7} $ 和  $ a_{8} $ 可以开始了。与每个活动相联系的数是执行该活动所需的时间，比如，活动  $ a_{1} $ 需要 6 天， $ a_{2} $ 需要 4 天等。

<div style="text-align: center;"><div style="text-align: center;">图6.28 一个AOE-网</div> </div>

AOE- 网在工程计划和经营管理中有广泛的应用，针对实际的应用问题，通常需要解决以下两个问题：

（1）估算完成整项工程至少需要多少时间；

（2）判断哪些活动是影响工程进度的关键。

工程进度控制的关键在于抓住关键活动。在一定范围内，非关键活动的提前完成对于整个工程的进度没有直接的好处，它的稍许拖延也不会影响整个工程的进度。工程的指挥者可以把非关键活动的人力和物力资源暂时调给关键活动，加快其进展速度，以使整个工程提前完工。

由于整个工程只有一个开始点和一个完成点，故在正常的情况（无环）下，网中只有一个入度为0的点，称作源点，也只有一个出度为0的点，称作汇点。在AOE-网中，一条路径各弧上的权值之和称为该路径的带权路径长度（后面简称路径长度）。要估算整项工程完成的最短时间，就是要找一条从源点到汇点的带权路径长度最长的路径，称为关键路径（Critical Path）。关键路径上的活动叫作关键活动，这些活动是影响工程进度的关键，它们的提前或延期将使整个工程提前或延期。

例如，在图 6.28 中， $ v_{0} $ 是源点， $ v_{8} $ 是汇点，关键路径有两条： $ (v_{0}, v_{1}, v_{4}, v_{6}, v_{8}) $ 或  $ (v_{0}, v_{1}, v_{4}, v_{7}, v_{8}) $，长度均为 18。关键活动为  $ (a_{1}, a_{4}, a_{7}, a_{10}) $ 或  $ (a_{1}, a_{4}, a_{8}, a_{11}) $。比如，关键活动  $ a_{1} $ 需要 6 天完成，如果  $ a_{1} $ 提前 1 天完成，整个工程也可以提前 1 天完成。所以不论是估算工期，还是研究如何加快工程进度，主要问题就在于要找到 AOE-网的关键路径。

如何确定关键路径，首先定义4个描述量。

（1）事件  $ v_{i} $ 的最早发生时间 ve(i)

进入事件  $ v_{i} $ 的每一活动都结束， $ v_{i} $ 才可发生，所以  $ ve(i) $ 是从源点到  $ v_{i} $ 的最长路径长度。

求  $  \boldsymbol{v} \boldsymbol{e}(i)  $ 的值，可根据拓扑顺序从源点开始向汇点递推。通常将工程的开始顶点事件  $ v_{0} $ 的最早发生时间定义为 0，即：

 $$ \nu e(0)=0 $$

 $$ v e(i)=\max\{v e(k)+w_{k,i}\}\quad<v_{k},v_{i}>\in T,1\leqslant i\leqslant n-1 $$

其中，T 是所有以  $ v_{i} $ 为头的弧的集合， $ w_{k,i} $ 是弧  $ \langle v_{k}, v_{i} \rangle $ 的权值，即对应活动  $ \langle v_{k}, v_{i} \rangle $ 的持续时间。

### （2）事件 $ v_{i} $的最迟发生时间vl(i)

事件  $ v_{i} $ 的发生不得延误  $ v_{i} $ 的每一后继事件的最迟发生时间。为了不拖延工期， $ v_{i} $ 的最迟发生时间不得迟于其后继事件  $ v_{k} $ 的最迟发生时间减去活动  $ \langle v_{i}, v_{k} \rangle $ 的持续时间。

求出  $ ve(i) $ 后，可根据逆拓扑顺序从汇点开始向源点递推，求出  $ \mathit{vl}(i) $。

 $$ vl(n-1)=ve(n-1) $$

 $$ v l(i)=\min\{v l(k)-w_{i,k}\}\quad<v_{i},v_{k}>\in S,0\leqslant i\leqslant n-2 $$

其中，S 是所有以  $ v_{i} $ 为尾的弧的集合， $ w_{i,k} $ 是弧  $ \langle v_{i}, v_{k} \rangle $ 的权值。

#### （3）活动  $ a_{i} = \langle v_{j}, v_{k} \rangle $ 的最早开始时间  $ e(i) $

只有事件  $ v_{j} $ 发生了，活动  $ a_{i} $ 才能开始。所以，活动  $ a_{i} $ 的最早开始时间等于事件  $ v_{j} $ 的最早发生时间 ve(j)，即：

 $$ e(i)=\nu e(j) $$

（4）活动  $ a_{i} = \langle v_{j}, v_{k} \rangle $ 的最晚开始时间  $ l(i) $

活动  $ a_{i} $ 的开始时间需保证不延误事件  $ \nu_{k} $ 的最迟发生时间。所以活动  $ a_{i} $ 的最晚开始时间  $ l(i) $ 等于事件  $ \nu_{k} $ 的最迟发生时间  $ \nu_{l}(k) $ 减去活动  $ a_{i} $ 的持续时间  $ w_{j,k} $，即：

 $$ l(i)=vl(k)-w_{j,k} $$

显然，对于关键活动而言， $ e(i) = l(i) $。对于非关键活动， $ l(i) - e(i) $ 的值是该工程的时间余量，在此范围内的适度延误不会影响整个工程的工期。

一个活动  $ a_{i} $ 的最迟开始时间  $ l(i) $ 和其最早开始时间  $ e(i) $ 的差值  $ l(i) - e(i) $ 是该活动完成的时间余量。它是在不增加完成整个工程所需的总时间的情况下，活动  $ a_{i} $ 可以拖延的时间。当一活动的时间余量为 0 时，说明该活动必须如期完成，否则就会拖延整个工期。所以称  $ l(i) - e(i) = 0 $，即  $ l(i) = e(i) $ 时的活动  $ a_{i} $ 是关键活动。

## 2. 关键路径求解的过程

（1）对图中顶点进行排序，在排序过程中按拓扑序列求出每个事件的最早发生时间 ve(i)。

（2）按逆拓扑序列求出每个事件的最迟发生时间  $ \mathit{vl}(i) $

（3）求出每个活动 $ a_{i} $的最早开始时间 $ e(i) $

（4）求出每个活动 $ a_{i} $的最晚开始时间 $ l(i) $

（5）找出  $ e(i) = l(i) $ 的活动  $ a_i $，即关键活动。由关键活动形成的由源点到汇点的每一条路径就是关键路径，关键路径有可能不止一条。

【例6.4】对图6.28所示的AOE-网，计算关键路径。

计算过程如下。

（1）计算各顶点事件 $ v_{i} $的最早发生时间ve(i)。

 $$  ve(0)=0 $$

 $$ \mathrm{ve}(1)=\max\left\{\mathrm{ve}(0)+\mathrm{w}_{0,1}\right\}=6 $$

 $$ \mathrm{ve}(2)=\max\left\{\mathrm{ve}(0)+\mathrm{w}_{0,2}\right\}=4 $$

 $$ \mathrm{ve}(3)=\max\left\{\mathrm{ve}(0)+\mathrm{w}_{0,3}\right\}=5 $$

 $$ \mathrm{ve}(4)=\max\{\mathrm{ve}(1)+\mathrm{w}_{1,4},\mathrm{ve}(2)+\mathrm{w}_{2,4}\}=7 $$

 $$ \mathrm{ve}(5)=\max\left\{\mathrm{ve}(3)+\mathrm{w}_{3,5}\right\}=7 $$

 $$ \mathrm{ve}(6)=\max\left\{\mathrm{ve}(4)+\mathrm{w}_{4,6}\right\}=16 $$

ve(6) = max{ve(4) + w_{4,6}} = 16

ve(7) = max{ve(4) + w_{4,7}, ve(5) + w_{5,7}} = 14

ve(8) = max{ve(6) + w_{6,8}, ve(7) + w_{7,8}} = 18

(2) 计算各顶点事件  $ v_i $ 的最迟发生时间  $ vl(i) $。

vl(8) = ve(8) = 18

vl(7) = min{vl(8) - w_{7,8}} = 14

vl(6) = min{vl(8) - w_{6,8}} = 16

vl(5) = min{vl(7) - w_{5,7}} = 10

vl(4) = min{vl(6) - w_{4,6}, vl(7) - w_{4,7}} = 7

vl(3) = min{vl(5) - w_{3,5}} = 8

vl(2) = min{vl(4) - w_{2,4}} = 6

vl(1) = min{vl(4) - w_{1,4}} = 6

vl(0) = min{vl(1) - w_{0,1}, vl(2) - w_{0,2}, vl(3) - w_{0,3}} = 0

(3) 计算各活动  $ a_i $ 的最早开始时间  $ e(i) $。

e(a_1) = ve(0) = 0

e(a_2) = ve(0) = 0

e(a_3) = ve(0) = 0

e(a_4) = ve(1) = 6

e(a_5) = ve(2) = 4

e(a_6) = ve(3) = 5

e(a_7) = ve(4) = 7

e(a_8) = ve(4) = 7

e(a_9) = ve(5) = 7

e(a_{10}) = ve(6) = 16

e(a_{11}) = ve(7) = 14

（4）计算各活动 $ a_{i} $的最迟开始时间 $ l(i) $。

 $$ \mathrm{l}(\mathrm{a}_{11})=\mathrm{vl}(8)-\mathrm{w}_{7,8}=14 $$

 $$ \mathrm{l}(\mathrm{a}_{10})=\mathrm{vl}(8)-\mathrm{w}_{6.8}=16 $$

 $$ \mathrm{l}(\mathrm{a}_{9})=\mathrm{vl}(7)-\mathrm{w}_{5,7}=10 $$

 $$ \mathrm{l}(\mathrm{a}_{8})=\mathrm{vl}(7)-\mathrm{w}_{4,7}=7 $$

 $$ \mathrm{l}(\mathrm{a}_{7})=\mathrm{vl}(6)-\mathrm{w}_{4,6}=7 $$

 $$ \mathrm{l}(\mathrm{a}_{6})=\mathrm{vl}(5)-\mathrm{w}_{3.5}=8 $$

 $$ \mathrm{l}(\mathrm{a}_{5})=\mathrm{vl}(4)-\mathrm{w}_{2,4}=6 $$

 $$ \mathrm{l}(\mathrm{a}_{4})=\mathrm{vl}(4)-\mathrm{w}_{1,4}=6 $$

 $$ \mathrm{l}(\mathrm{a}_{3})=\mathrm{vl}(3)-\mathrm{w}_{0.3}=3 $$

 $$ \mathrm{l}(\mathrm{a}_{2})=\mathrm{vl}(2)-\mathrm{w}_{0,2}=2 $$

 $$ \mathrm{l}(\mathrm{a}_{1})=\mathrm{vl}(1)-\mathrm{w}_{0,1}=0 $$

将顶点的发生时间和活动的开始时间分别汇总为表 6.7（a）和表 6.7（b）。由表 6.7（b）可以看出，图 6.28 所示的 AOE-网有两条关键路径：一条是由活动  $ (a_{1}, a_{4}, a_{7}, a_{10}) $ 组成的关键路径，另一条是由  $ (a_{1}, a_{4}, a_{8}, a_{11}) $ 组成的关键路径，如图 6.29 所示。

<div style="text-align: center;"><div style="text-align: center;">表6.7 图6.28 所示网的关键路径求解的中间结果</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（a）顶点的发生时间</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>顶点 $ v_i $</td><td style='text-align: center; word-wrap: break-word;'>ve(i)</td><td style='text-align: center; word-wrap: break-word;'>vl(i)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_0 $</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_1 $</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_2 $</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_3 $</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>8</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_4 $</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>7</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_5 $</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>10</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_6 $</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>16</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_7 $</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>14</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ v_8 $</td><td style='text-align: center; word-wrap: break-word;'>18</td><td style='text-align: center; word-wrap: break-word;'>18</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">（b）活动的开始时间</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>活动 $ a_i $</td><td style='text-align: center; word-wrap: break-word;'>e(i)</td><td style='text-align: center; word-wrap: break-word;'>I(i)</td><td style='text-align: center; word-wrap: break-word;'>I(i) - e(i)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_1 $</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_2 $</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_3 $</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_4 $</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_5 $</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_6 $</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_7 $</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_8 $</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_9 $</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>3</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_{10} $</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ a_{11} $</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图6.29 图6.28所示网的关键路径</div> </div>

## 3. 关键路径算法的实现

由于每个事件的最早发生时间  $ ve(i) $ 和最迟发生时间  $ vl(i) $ 要在拓扑序列的基础上进行计算，因此关键路径算法的实现要基于拓扑排序算法，我们仍采用邻接表作为有向图的存储结构。

算法的实现要引入以下辅助的数据结构。

（1）一维数组 ve[i]：事件  $ v_{i} $ 的最早发生时间。

（2）一维数组vl[i]：事件 $ v_{i} $的最迟发生时间。

（3）一维数组 topo[i]：记录拓扑序列的顶点序号。

### 算法6.13 关键路径算法

【算法步骤】

① 调用拓扑排序算法，使拓扑序列保存在 topo 中。

②将每个事件的最早发生时间 ve[i] 初始化为 0，即 ve[i] = 0。

③ 根据 topo 中的值，按从前向后的拓扑次序，依次求每个事件的最早发生时间，循环几次，执行以下操作：

关键路径算法

取得拓扑序列中的顶点序号 k，k = topo[i]；

用指针 p 依次指向 k 的每个邻接顶点，取得每个邻接顶点的序号  $ j = p \to \text{adjvex} $，依次更新顶点 j 的最早发生时间  $ \text{ve}[j] $：

 $$  if(\mathbf{v}\mathbf{e}[\mathbf{j}]<\mathbf{v}\mathbf{e}[\mathbf{k}]+\mathbf{p}->weight)\quad\mathbf{v}\mathbf{e}[\mathbf{j}]=\mathbf{v}\mathbf{e}[\mathbf{k}]+\mathbf{p}->weight; $$

④将每个事件的最迟发生时间  $ \mathrm{vl}[i] $ 初始化为汇点的最早发生时间，即  $ \mathrm{vl}[i] = \mathrm{ve}[n-1] $。

⑤ 根据 topo 中的值，按从后向前的逆拓扑次序，依次求每个事件的最迟发生时间，循环 n 次，执行以下操作：

取得拓扑序列中的顶点序号 k，k = topo[i]；

用指针 p 依次指向 k 的每个邻接顶点，取得每个邻接顶点的序号 j = p -> adjvex，依次根

据  $ k $ 的邻接点，更新  $ k $ 的最迟发生时间  $ \text{vl}[k] $：

if  $ (\text{vl}[k] > \text{vl}[j] - p->weight) $  $ \quad \text{vl}[k] = \text{vl}[j] - p->weight; $

⑥ 判断某一活动是否为关键活动，循环  $ n $ 次，执行以下操作：对于每个顶点  $ v_i $，用指针  $ p $ 依次指向  $ v_i $ 的每个邻接顶点，取得每个邻接顶点的序号  $ j = p->adjvex $，分别计算活动  $ \langle v_i, v_j \rangle $ 的最早和最迟开始时间  $ e $ 和  $ l $：

e = ve[i]; l = vl[j] - p->weight;

如果 e 和 l 相等，则活动  $ \langle v_{i}, v_{j} \rangle $ 为关键活动，输出弧  $ \langle v_{i}, v_{j} \rangle $。

【算法描述】

Status CriticalPath(ALGraph G)
{
 //G为邻接表存储的有向网，输出G的各项关键活动
 if(!TopologicalOrder(G, topo)) return ERROR;
 //调用拓扑排序算法，使拓扑序列保存在topo中，若调用失败，则存在有向环，返回ERROR
 n=G.vexnum;
 for(i=0; i<n; i++)
 ve[i]=0;
 /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

e=ve[i]; // 计算活动<v₁，v₃>的最早开始时间
l=vl[j]-p->weight; // 计算活动<v₁，v₃>的最迟开始时间
if(e==1) // 若为关键活动，则输出<v₁，v₃>
 cout<<G.vertices[i].data<<G.vertices[j].data;
p=p->nextarc; // p指向i的下一个邻接顶点
} // while
} // for
