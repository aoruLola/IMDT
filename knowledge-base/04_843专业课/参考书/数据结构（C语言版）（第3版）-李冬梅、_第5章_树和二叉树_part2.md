# 3. 孩子兄弟表示法

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


孩子兄弟表示法又称二叉树表示法，或二叉链表示法，即以二叉链表作为树的存储结构。链表中结点的两个链域分别指向该结点的第一个孩子结点和下一个兄弟结点，分别命名为firstchild域和nextsibling域，其结点形式如图5.22所示。

<div style="text-align: center;"><div style="text-align: center;">图5.22 孩子兄弟表示法的结点</div> </div>

//

图5.23所示为图5.19中树的二叉链表表示。利用这种存储结构便于实现各种树的操作。首先易于实现找结点孩子等操作。例如，若要访问结点x的第i个孩子，则只要先从firstchild域找到第1个孩子结点，然后沿着孩子结点的nextsibling域连续走i-1步，便可找到x的第i个孩子。当然，如果为每个结点增设一个parent域，则同样能方便地实现查找双亲的操作。

<div style="text-align: center;"><div style="text-align: center;">图5.23 图5.19中树的二叉链表</div> </div>

这种存储结构的优点是它和二叉树的二叉链表表示完全一样，便于将一般的树结构转换为二叉树进行处理，利用二叉树的算法来实现对树的操作。因此孩子兄弟表示法是应用较为普遍的一种树的存储表示方法。

## 5.6.2 森林与二叉树的转换

从树的二叉链表表示的定义可知，任何一棵和树对应的二叉树，其根结点的右子树必为空。若把森林中第二棵树的根结点看成第一棵树的根结点的兄弟，则同样可导出森林和二叉树的对应关系。

图 5.24 所示为森林与二叉树的对应关系。

<div style="text-align: center;"><div style="text-align: center;">图5.24 森林与二叉树的对应关系</div> </div>

这种——对应的关系说明森林或树与二叉树可以相互转换。

## 1. 森林转换成二叉树

如果  $ F=\{T_1,T_2,\cdots,T_m\} $ 是森林，则可按如下规则将其转换成一棵二叉树  $ B=(root,LB,RB) $：

（1）若 F 为空，即 m=0，则 B 为空树；

（2）若 F 非空，即  $ m \neq 0 $，则 B 的根 root 即森林中第一棵树的根  $ \mathrm{ROOT}(T_1) $；B 的左子树 LB 是从  $ T_1 $ 中根结点的子树森林  $ F_1 = \{T_{11}, T_{12}, \cdots, T_{1m}\} $ 转换而成的二叉树；其右子树 RB 是从森林  $ F' = \{T_2, T_3, \cdots, T_m\} $ 转换而成的二叉树。

## 2. 二叉树转换成森林

如果  $ B = (root, LB, RB) $ 是一棵二叉树，则可按如下规则将其转换成森林  $ F = \{T_1, T_2, \cdots, T_m\} $ ：

（1）若B为空，则F为空；

（2）若 B 非空，则 F 中第一棵树  $ T_{1} $ 的根  $ \mathrm{ROOT}(T_{1}) $ 即为二叉树 B 的根 root； $ T_{1} $ 中根结点的子树森林  $ F_{1} $ 是由 B 的左子树 LB 转换而成的森林；F 中除  $ T_{1} $ 之外其余树组成的森林  $ F' = \{T_{2}, T_{3}, \cdots, T_{m}\} $ 是由 B 的右子树 RB 转换而成的森林。

从上述递归定义容易写出相互转换的递归算法。同时，森林和树的操作亦可转换成二叉树的操作来实现。

## 1. 树的遍历

由树结构的定义可引出以两种次序遍历树的方法：一种是先根（次序）遍历树，即先访问树的根结点，然后依次先根遍历根的每棵子树；另一种是后根（次序）遍历，即先依次后根遍历每棵子树，然后访问根结点。

例如，对图5.19所示的树进行先根遍历，可得树的先根序列为：

### RADEBCFGHK

若对此树进行后根遍历，则得树的后根序列为：

#### DEABGHKFCR

按照森林和树相互递归的定义，可以推出森林的两种遍历方法：先序遍历和中序遍历。

### （1）先序遍历森林

若森林非空，则可按下述规则遍历：

①访问森林中第一棵树的根结点；

②先序遍历第一棵树的根结点的子树森林；

③先序遍历除去第一棵树之后剩余的树构成的森林。

（2）中序遍历森林

若森林非空，则可按下述规则遍历：

①中序遍历森林中第一棵树的根结点的子树森林；

②访问第一棵树的根结点；

③中序遍历除去第一棵树之后剩余的树构成的森林。

若对图5.24中所示的森林进行先序遍历和中序遍历，则分别得到森林的先序序列为：

#### ABCDEFGHIJ

中序序列为：

##### BCDAFEHJIG

由 5.6.2 小节森林与二叉树之间转换的规则可知，当森林转换成二叉树时，其第一棵树的子树森林转换成左子树，剩余树的森林转换成右子树，则上述森林的先序和中序遍历即为其对应的二叉树的先序和中序遍历。若对图 5.24 中所示的和森林对应的二叉树分别进行先序和中序遍历，可得和上述相同的序列。

由此可见，当以二叉链表作为树的存储结构时，树的先根遍历和后根遍历可借用二叉树的先序遍历和中序遍历的算法实现。

## 5.7 哈夫曼树及其应用

树结构是一种应用非常广泛的结构，在一些特定的应用中，树具有一些特殊的特点，利用这些特点可以解决很多工程问题。在5.2节提出的应用案例5.1可以借助一种应用很广的树——哈夫曼树来解决，本节便以哈夫曼树为例，说明二叉树的一个具体应用。

### 5.7.1 哈夫曼树的基本概念

哈夫曼（Huffman）树又称最优树，是一类带权路径长度最短的树，在实际中有广泛的用途。哈夫曼树的定义，涉及路径、路径长度、权等概念，下面先给出这些概念的定义，再介绍哈夫曼树。

（1）路径：从树中一个结点到另一个结点之间的分支构成这两个结点之间的路径。

（2）路径长度：路径上的分支数目称作路径长度。

（3）树的路径长度：从树根到每一结点的路径长度之和。

（4）权：赋予某个实体的一个量，是对实体的某个或某些属性的数值化描述。在数据结构中，实体有结点（元素）和边（关系）两大类，所以对应有结点权和边权。结点权或边权具体代表什么意义，由具体情况决定。如果在一棵树中的结点上带有权值，则对应的就有带权树等概念。

（5）结点的带权路径长度：从该结点到树根之间的路径长度与结点上权值的乘积。

（6）树的带权路径长度：树中所有叶子结点的带权路径长度之和，通常记作  $ WPL=\sum_{k=1}^{n}w_{k}l_{k} $。

（7）哈夫曼树：假设有 m 个权值  $ \{w_1, w_2, \cdots, w_m\} $，可以构造一棵含 n 个叶子结点的二叉树，每个叶子结点的权值为  $ w_i $，则其中带权路径长度 WPL 最小的二叉树称作最优二叉树或哈夫曼树。

例如，图5.25中所示的3棵二叉树，都含4个叶子结点a、b、c、d，分别带权值7、5、2、4，它们的带权路径长度分别如图5.25（a）、图5.25（b）、图5.25（c）所示。

<div style="text-align: center;"><div style="text-align: center;">(a)  $ WPL=7\times2+5\times2+2\times2+4\times2=36 $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b)  $ WPL=7 \times 3 + 5 \times 3 + 2 \times 1 + 4 \times 2 = 46 $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(C) WPL=7\times1+5\times2+2\times3+4\times3=35</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图5.25 具有不同带权路径长度的二叉树</div> </div>

其中以图5.25（c）所示二叉树的带权路径长度为最小。可以验证，它恰为哈夫曼树，即其带权路径长度在所有带权值为7、5、2、4的4个叶子结点的二叉树中居最小。

哈夫曼树中具有不同权值的叶子结点的分布有什么特点呢？从上面的例子中，可以直观地发现，在哈夫曼树中，权值越大的结点离根结点越近。根据这个特点，哈夫曼最早给出了一个构造哈夫曼树的方法，称哈夫曼算法。

## 1. 哈夫曼树的构造过程

（1）根据给定的 n 个权值  $ \{w_{1}, w_{2}, \cdots, w_{n}\} $，构造 n 棵只有根结点的二叉树，这 n 棵二叉树构成森林 F。

（2）在森林 F 中选取两棵根结点的权值最小的树作为左右子树构造一棵新的二叉树，且置新的二叉树的根结点的权值为其左、右子树上根结点的权值之和。

（3）在森林 F 中删除这两棵树，同时将新得到的二叉树加入 F 中。

（4）重复（2）和（3），直到 F 只含一棵树为止。这棵树便是哈夫曼树。

在构造哈夫曼树时，首先选择权值小的，这样保证权值大的离根较近，这样一来，在计算树的带权路径长度时，自然会得到最小带权路径长度，这种生成算法是一种典型的贪心法。 $ \textcircled{a} $ $ \textcircled{b} $ $ \textcircled{c} $ $ \textcircled{d} $ $ \textcircled{a} $ $ \textcircled{b} $ $ \textcircled{c} $

例如，图 5.26 所示为图 5.25（c）所示的哈夫曼树的构造过程。其中，根结点上标注的数字是所赋的权值。

## 2. 哈夫曼算法的实现

哈夫曼树是一种二叉树，当然可以采用前面介绍过的通用存储方法，而由于哈夫曼树中没有度为1的结点，则一棵有n个叶子结点的哈夫曼树共有2n-1个结点，可以存储在一个大小为2n-1的一维数组中。树中每个结点还要包含其双亲信息和孩子结点的信息，由此，每个结点的存储结构设计如图5.27所示。

<div style="text-align: center;"><div style="text-align: center;">图5.26 哈夫曼树的构造过程</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图5.27 结点的存储结构设计</div> </div>

// -- -- -- - 哈夫曼树的存储表示
typedef struct{
 int weight; // 结点的权值
 int parent,lchild,rchild;  // 结点的双亲、左孩子、右孩子的下标
}HTNode,*HuffmanTree;  // 动态分配数组存储哈夫曼树

哈夫曼树的各结点存储在由 HuffmanTree 定义的动态分配的数组中，为了实现方便，数组的 0 号单元不使用，从 1 号单元开始使用，所以数组的大小为  $ 2n $。将叶子结点集中存储在前面部分的 n 个位置，而后面的 n-1 个位置存储其余非叶子结点。

### 算法 5.10 构造哈夫曼树

【算法步骤】

构造哈夫曼树算法的实现可以分成两大部分。

① 初始化：首先动态申请 2n 个单元；然后循环 2n-1 次，从 1 号单元开始，依次将 1 至 2n-1 所有单元中的双亲、左孩子、右孩子的下标都初始化为 0；最后循环 n 次，输入前 n 个单元中叶子结点的权值。

② 创建树：循环 n-1 次，通过 n-1 次的选择、删除与合并来创建哈夫曼树。选择是从当前森林中选择双亲为 0 且权值最小的两个树根结点 s1 和 s2；删除是指将结点 s1 和 s2 的双亲改为非 0；合并就是将 s1 和 s2 的权值和作为一个新结点的权值依次存入数组的  $ n+1 $ 号及之后的单元中，同时记录这个新结点左孩子的下标为 s1，右孩子的下标为 s2。

【算法描述】

构造哈夫曼树

void CreateHuffmanTree(HuffmanTree &HT, int n)
{
 // 构造哈夫曼树HT
 if (n<=1) return;
 m=2*n-1;
 HT=new HTNode[m+1]; // 0号单元未用，所以需要动态分配m+1个单元，HT[m]表示根结点
 for (i=1; i<=m; ++1) // 将1~m号单元中的双亲、左孩子，右孩子的下标都初始化为0
 {HT[i].parent=0; HT[i].lchild=0; HT[i].rchild=0;}
 for (i=1; i<=n; ++1) // 输入前n个单元中叶子结点的权值
 cin>>HT[i].weight;
 /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
 for (i=n+1; i<=m; ++1)
 {// 通过n-1次的选择、删除、合并来创建哈夫曼树
 Select(HT, i-1, s1, s2);
 // 在HT[k](1≤k≤i-1)中选择两个其双亲域为0且权值最小的结点，并返回它们在HT中的序
号s1和s2
 HT[s1].parent=i; HT[s2].parent=i;
 // 得到新结点i，从森林中删除s1, s2，将s1和s2的双亲域由0改为i
 HT[i].lchild=s1; HT[i].rchild=s2; // s1, s2分别作为i的左右孩子
 HT[i].weight=HT[s1].weight+HT[s2].weight; // i的权值为左右孩子权值之和
}

【例 5.2】已知 w = (5, 29, 7, 8, 14, 23, 3, 11)，利用算法 5.10 试构造一棵哈夫曼树，计算树的带权路径长度，并给出其构造过程中存储结构 HT 的初始状态和终结状态。

n=8，则 m=15，按算法 5.10 可构造一棵哈夫曼树，如图 5.28 所示。

<div style="text-align: center;"><div style="text-align: center;">图5.28 例5.2的哈夫曼树</div> </div>

树的带权路径长度计算如下：

 $$ WPL=\sum_{k=1}^{n}w_{k}l_{k}=23\times2+11\times3+5\times4+3\times4+29\times2+14\times3+7\times4+8\times4=271 $$

其存储结构 HT 的初始状态如表 5.2（a）所示，其终结状态如表 5.2（b）所示。

<div style="text-align: center;"><div style="text-align: center;">表5.2 例5.2的存储结构</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（a）HT 的初始状态</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>结点i</td><td style='text-align: center; word-wrap: break-word;'>weight</td><td style='text-align: center; word-wrap: break-word;'>parent</td><td style='text-align: center; word-wrap: break-word;'>lchild</td><td style='text-align: center; word-wrap: break-word;'>rchild</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>29</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>23</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>-</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>-</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>-</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>-</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>-</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>-</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>15</td><td style='text-align: center; word-wrap: break-word;'>-</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">（b）HT的终结状态</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>结点i</td><td style='text-align: center; word-wrap: break-word;'>weight</td><td style='text-align: center; word-wrap: break-word;'>parent</td><td style='text-align: center; word-wrap: break-word;'>lchild</td><td style='text-align: center; word-wrap: break-word;'>rchild</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>29</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>23</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>15</td><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>19</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>8</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>29</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>10</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>42</td><td style='text-align: center; word-wrap: break-word;'>15</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>6</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>58</td><td style='text-align: center; word-wrap: break-word;'>15</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>12</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>15</td><td style='text-align: center; word-wrap: break-word;'>100</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>14</td></tr></table>

哈夫曼树在通信、编码和数据压缩等技术领域有着广泛的应用，下面讨论一个构造通信码的典型应用——哈夫曼编码。

## 1. 哈夫曼编码的主要思想

在 5.2 节提出的案例 5.1 中已经讨论，在进行数据压缩时，为了使压缩后的数据文件尽可能短，可采用不定长编码。其基本思想是：为出现次数较多的字符编以较短的编码。为确保对数据文件进行有效的压缩和对压缩文件进行正确的解码，可以利用哈夫曼树来设计二进制编码。哈夫曼树的具体构造过程可以参考算法 5.10，图 5.26 所示为图 5.4 所示的哈夫曼树的构造过程。在图 5.4 所示的哈夫曼树中，约定左分支标记为 0，右分支标记为 1，则根结点到每个叶子结点路径上的 0、1 序列即相应字符的编码。

下面给出有关编码的两个概念。

（1）前缀编码：如果在一个编码方案中，任一个编码都不是其他任何编码的前缀（最左子串），则称编码是前缀编码。例如，案例5.1中的第2种编码方案［见表5.1（b）］的编码0、10、110、111是前缀编码，而第3种编码方案［见表5.1（c）］的编码0、01、010、111就不是前缀编码。前缀编码可以保证对压缩文件进行解码时不产生二义性，确保正确解码。

（2）哈夫曼编码：对一棵具有n个叶子的哈夫曼树，若对树中的每个左分支赋予0，对每个右分支赋予1，则从根到每个叶子的路径上，各分支的赋值分别构成一个二进制串，该二进制串就称为哈夫曼编码。

哈夫曼编码具有下面的两个性质。

性质1 哈夫曼编码是前缀编码。

证明：哈夫曼编码是根到叶子路径上的编码序列。由树的特点知，若路径A是另一条路

径 B 的最左部分，B 经过了 A，则 A 的终点一定不是叶子。而哈夫曼编码对应路径的终点一定为叶子，因此，任一哈夫曼编码都不会与任意其他哈夫曼编码的前缀部分完全重叠，因此哈夫曼编码是前缀编码。

### 性质2 哈夫曼编码是最优前缀编码。

对于包括 n 个字符的数据文件，分别以它们的出现次数为权值构造哈夫曼树，则利用该树对应的哈夫曼编码对文件进行编码，能使该文件压缩后对应的二进制文件的长度最短。

证明：假设每种字符在数据文件中出现的次数为  $ w_i $，其编码长度为  $ l_i $，文件中只有  $ n $ 种字符，则文件总长为  $ \sum_{i=1}^{n} w_i l_i $。对应到二叉树上，若置  $ w_i $ 为叶子结点的权值， $ l_i $ 恰为从根到叶子的路径长度，则  $ \sum_{i=1}^{n} w_i l_i $ 恰为二叉树上的带权路径长度。由此可见，设计文件总长最短的二进制前缀编码问题，就是以  $ n $ 种字符出现的频率作权值设计一棵哈夫曼树的问题。而由哈夫曼树的构造方法可知，出现次数较多的字符对应的编码较短，这便直观地说明了该性质是成立的。

下面给出根据哈夫曼树构造哈夫曼编码的算法。

## 2. 哈夫曼编码的算法实现

在构造哈夫曼树之后，求哈夫曼编码的主要思想是：依次以叶子为出发点，向上回溯至根结点为止。回溯时走左分支则生成代码0，走右分支则生成代码1。

由于每个哈夫曼编码是变长编码，因此使用一个指针数组来存放每个字符编码串的首地址。

// - - - - - - - - 哈夫曼编码表的存储表示 - - - - -

typedef char **HuffmanCode; // 动态分配数组存储哈夫曼编码表

各字符的哈夫曼编码存储在由 HuffmanCode 定义的动态分配的数组 HC 中，为了实现方便，数组的 0 号单元不使用，从 1 号单元开始使用，所以数组 HC 的大小为  $ n + 1 $，即编码表 HC 包括  $ n + 1 $ 行。但因为每个字符编码的长度事先不能确定，所以不能预先为每个字符分配大小合适的存储空间。为不浪费存储空间，动态分配一个长度为  $ n $（字符编码长度一定小于  $ n $）的一维数组 cd，用来临时存放当前正在求解的第  $ i $（ $ 1 \leq i \leq n $）个字符的编码，当第  $ i $ 个字符的编码求解完毕后，根据数组 cd 的字符串长度分配 HC[i] 的空间，然后将数组 cd 中的编码复制到 HC[i] 中。

因为求解编码时是从哈夫曼树的叶子出发，向上回溯至根结点，所以对于每个字符，得到的编码顺序是从右向左的，故将编码向数组 cd 存放的顺序也是从后向前的，即每个字符的第 1 个编码存放在 cd[n-2] 中（cd[n-1] 存放字符串结束标志 \0'），第 2 个编码存放在 cd[n-3] 中，依此类推，直到全部编码存放完毕。

### 算法 5.11 根据哈夫曼树求哈夫曼编码

【算法步骤】

① 分配存储 n 个字符编码的编码表空间 HC，长度为  $ n + 1 $；分配临时存储每个字符编码的动态数组空间 cd，cd $ [n - 1] $ 置为  $ \backslash 0' $。

②逐个求解 n 个字符的编码，循环 n 次，执行以下操作：

设置变量 start 用于记录编码在 cd 中存放的位置，start 初始时指向最后，即编码结束符位置 n-1；

设置变量 c 用于记录从叶子结点向上回溯至根结点所经过的结点下标，c 初始时为当前待编码字符的下标 i，f 用于记录 i 的双亲结点的下标；

从叶子结点向上回溯至根结点，求得字符 i 的编码，当 f 没有到达根结点时，循环执行以下操作：

回溯一次 start 向前指一个位置，即 --start；

若结点 c 是 f 的左孩子，则生成代码 0，否则生成代码 1，生成的代码 0 或 1 保存在 cd[start] 中；

继续向上回溯，改变c和f的值。

根据数组 cd 的字符串长度为第 i 个字符编码分配空间 HC[i]，然后将数组 cd 中的编码复制到 HC[i] 中。

③释放临时空间cd。

根据哈夫曼树

求哈夫曼编码

【算法描述】

void CreateHuffmanCode(HuffmanTree HT, HuffmanCode &HC, int n)
{
 // 从叶子到根逆向求每个字符的哈夫曼编码，存储在编码表 HC 中
 HC=new char*[n+1];
 cd=new char[n];
 cd[n-1]='\\0';
 for(i=1;i<=n;++i)
 {
 start=n-1;
 c=i;f=HT[i].parent;
 while(f!=0)
 {
 --start;
 if(HT[f].lchild==c) cd[start]='0'; // 结点c是f的左孩子，则生成代码0
 else cd[start]='1'; // 结点c是f的右孩子，则生成代码1
 c=f;f=HT[f].parent;
 }
 HC[i]=new char[n-start];
 strcpy(HC[i],&cd[start]);
 }
 delete cd;
}

【例 5.3】已知某系统在通信联络中只可能出现 8 种字符，其概率分别为 0.05、0.29、0.07、0.08、0.14、0.23、0.03、0.11，试设计哈夫曼编码。

根据其出现的概率可设8个字符的权值为： $ w = (5, 29, 7, 8, 14, 23, 3, 11) $，其对应的哈夫曼树如图5.28所示。将树的左分支标记为0，右分支标记为1，便得到其哈夫曼编码表如图5.29所示。

<div style="text-align: center;"><div style="text-align: center;">图5.29 哈夫曼编码表</div> </div>

### （1）编码

有了字符集的哈夫曼编码表之后，对数据文件的编码过程是：依次读入文件中的字符 c，在哈夫曼编码表 HC 中找到此字符，将字符 c 转换为编码表中存放的编码串。

#### （2）译码

对编码后的文件进行译码的过程必须借助于哈夫曼树。具体过程是：依次读入文件的二进制码，从哈夫曼树的根结点（即 HT[m]）出发，若当前读入 0，则走向左孩子，否则走向右孩子。一旦到达某一叶子 HT[i] 时便译出相应的字符编码 HC[i]。然后重新从根出发继续译码，直至文件结束。

具体编码和译码的算法留给读者去完成。

### 5.8.1 并查集的基本概念

在处理某些实际问题时，我们常需将 n 个不同的元素划分为若干不相交的集合。初始时，每个元素各自构成一个单独的集合，随后我们按照特定的规则，对属于同一组的元素进行合并。在这个过程中，需要反复执行两种关键操作：一是查找包含特定元素的唯一集合（查找操作），二是将两个集合合并为一个（合并操作）。用于描述此类问题的抽象数据类型被称为并查集（Union-find Set），亦称为不相交集合（Disjoint Set）。并查集是一种简洁而广泛应用的集合，通常采用树结构来表示元素与其所属子集的关系。

并查集的核心在于动态维护元素的归属关系，其主要包括查找和合并两个基本操作。查找操作用于确定某一元素所属的集合，而合并操作则是使一个集合整体归属于另一个集合。在同一集合内的元素构成一个等价类，彼此之间具有等价关系；而不同集合内的元素则不具备这种等价性。下面给出等价类的相关概念。

等价类是元素（或成员）的集合，在此集合中所有元素应该满足等价关系。若用符号“≡”表示集合中的等价关系，那么该集合中的任意元素 x、y、z 均满足以下 3 个性质：

（1）自反性： $ x \equiv x $（即等于自身）；

（2）对称性：若  $ x \equiv y $，则  $ y \equiv x $；

（3）传递性：若  $ x \equiv y $ 且  $ y \equiv z $，则  $ x \equiv z $。

因此，等价关系是一种在集合中同时满足自反性、对称性和传递性的关系。在现实世界的许多问题中，等价类问题极为普遍，而并查集为解决此类问题提供了高效的手段。下面我们通过亲戚关系的实例，具体阐述并查集的应用。

设想我们面临一个任务，需要在一个特定的人群中判断任意两个人之间是否存在亲戚关系。若我们手头有一份完整的家谱，理论上可以完成这一判断。然而，当两个人的最近公共祖先（Lowest Common Ancestor，LCA）相隔多代，导致家谱信息变得极其复杂时，传统的判断方法便显得不切实际。在这种情形下，并查集就成为解决问题的有力工具。

以10个人为例，编号为0～9，已知1与2、5与6、3与4、1与4、5与8之间存在亲戚关系，试判断2与3之间是否存在亲戚关系。

亲戚关系是一种等价关系，可以借助并查集来方便快速地实现等价类的划分。

借助并查集来判断亲戚关系的具体步骤：初始时，为每个人建立一个独立的集合，集合元素为该人本身，表示此时该人不知道自己与他人之间是否存在亲戚关系，每个人都代表一个单独的等价类；之后每给出一个亲戚关系，则根据等价关系的3个性质将互为亲戚关系的两个集合合并，这样可以实时获得当前状态下的亲戚关系；最后在得到的结果中，通过检查两个人是否属于同一集合，即可判断他们之间是否存在亲戚关系。

对上述样例数据的具体合并过程如表5.3所示。

<div style="text-align: center;"><div style="text-align: center;">表5.3 亲戚关系的合并过程</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>输入关系</td><td style='text-align: center; word-wrap: break-word;'>集合</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>初始状态</td><td style='text-align: center; word-wrap: break-word;'>{0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>{0}, {1,2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>56</td><td style='text-align: center; word-wrap: break-word;'>{0}, {1,2}, {3}, {4}, {5,6}, {7}, {8}, {9}</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>34</td><td style='text-align: center; word-wrap: break-word;'>{0}, {1,2}, {3,4}, {5,6}, {7}, {8}, {9}</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>{0}, {1,2,3,4}, {5,6}, {7}, {8}, {9}</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>58</td><td style='text-align: center; word-wrap: break-word;'>{0}, {1,2,3,4}, {5,6,8}, {7}, {9}</td></tr></table>

由合并结果可知，2与3最终属于同一集合，所以它们之间存在亲戚关系。

由表5.3可知，合并操作是在现有集合的基础上进行的，每一步得到的集合划分结果都是动态变化的。在合并过程的每一步中，并查集的数据结构均维护着一组不相交的动态集合 $ S=\{S_{1},S_{2},\cdots,S_{n}\} $。每个集合通过该集合中一个特定的代表元素来标识。代表元素的选择取决于具体的应用场景，例如，可以选择集合中的最小元素或最大元素作为代表元素。

综上所述，并查集是一种基于集合结构的抽象数据类型，它支持查找元素所属集合的查找操作，以及对一些互不相交的集合进行合并的操作。下面给出并查集的抽象数据类型定义：

数据对象：若设S是UFSet型的集合，则它由n(n>0)个子集 $ S_{i}(i=1,2,\cdots,n) $构成，每个子集的成员都是定义在域 $ [-MAXSIZE, MAXSIZE] $内的整数。

数据关系： $ S_{1} \cup S_{2} \cup \cdots \cup S_{n} = S $  $ S_{i} \subset S $ (i=1,2,\cdots,n)

基本操作：

Init_UFSet(&S, n)

 操作结果：构造一个由n个子集(每个子集只含单个元素)构成的集合S。

Find_UFSet(&S, x)

 初始条件：S是已存在的集合，x是S中某个子集的成员。

 操作结果：查找S中x所属的子集。

Union_UFSet(&S, i, j)

 初始条件：Si和Sj是S中的两个互不相交的非空集合。

 操作结果：将Si和Sj两个集合合并。
}ADT_UFSet;

## 1. 并查集的实现

在并查集的实现中，通常需要定义两种数据类型的参数：一种是集合名类型，另一种是集合元素类型。通常情况下，可以使用整数来表示集合名，如果集合包含n个元素，则可以使用从0到n-1的整数来表示元素。

并查集需要借助某种数据结构来实现，而不同的数据结构选择可能会显著影响查找和合并操作的效率。并查集数据结构的实现方法有多种，可以使用数组、链表或树等。在这些方法中，树的双亲表示法可以直观有效地表示元素与其所属子集的关系，是一种常用的并查集实现方法。

树的双亲表示法将每个集合表示为一棵树，树的每个结点代表集合中的一个单元素，而所有集合的全集合则构成一个森林。在这种表示法中，每个结点包含一个指向其双亲结点的指针，根结点的成员同时作为子集的名称。假设集合元素的编号从0到MAXSIZE-1，其中MAXSIZE是集合中的最大元素数。

在具体实现时，利用树的双亲指针数组来表示这些集合。这种表示方法使得查找和合并操作更加高效，因为它直接反映了元素之间的层次关系。其存储结构表示如下：

// 集合元素数组（双亲指针数组）

其中，数组下标起到了双重作用：它既代表元素的名字，也代表包含该元素树的根结点。具体来说，数组的第i个元素指向包含元素i的树的根结点。树的根结点的下标即为集合的名称，而根结点的双亲结点指针设为-1，用以表示集合中元素的个数。为了区分双结点指针信息（非负数）和集合元素个数的信息，我们使用负数来表示集合的规模。

下面给出并查集的3种基本操作的实现。

### （1）并查集的初始化

并查集的初始化是构建一个包含 n 个子集的集合 S，其中每个子集仅包含一个单独的元素。这个过程将每个元素初始化为其自身的双亲结点，从而每个元素都成为一棵独立的树的根。

例如，设有一个包括 10 个元素的集合  $ S = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\} $，初始化后每个元素自成为一个单元素子集。初始化后形成的森林如图 5.30（a）所示，其双亲指针数组表示如图 5.30（b）所示。

（a）全集合S初始化时形成一个森林

<div style="text-align: center;"><div style="text-align: center;">（b）初始化形成的森林的双亲指针数组表示</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图5.30 并查集的初始化</div> </div>

#### 算法 5.12 并查集的初始化

【算法步骤】

将数组 UFSet 中的每个单元素的值初始化为 -1。

【算法描述】

void Init_UFSet(int UFSet[], int size)
{
 // 初始化并查集
 for(int i = 0; i < size; i++)
 UFSet[i] = -1;
}

// 每个由单个元素组成的集合

##### （2）并查集的查找

并查集的查找是查找集合中 x 所属的子集，并返回所属子集的根结点。

##### 【算法步骤】

从待查元素 x 出发，沿着双亲指针向上查找，直到找到双亲指针为负值的结点，即元素 x 的根。

【算法描述】

int Find_UFSet(int UFSet[], int x)
{
 // 查找元素x所属的集合
 while(UFSet[x] >= 0)
 x = UFSet[x];
 return x;
}

##### （3）并查集的合并

并查集的合并是将一个集合并入另外一个集合。

设集合  $ S = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\} $，在初始化之后，通过一系列操作，可以将这些初始的单元素子集合并为 3 个更大的子集，它们是全集合  $ S $ 的子集： $ S_1 = \{0, 6, 7, 8\} $， $ S_2 = \{1, 4, 9\} $， $ S_3 = \{2, 3, 5\} $。在每个集合中选择最小元素作为代表元素，则各集合的并查集的树形表示如图 5.31（a）所示，对应的双亲指针数组表示如图 5.31（b）所示。

<div style="text-align: center;"><div style="text-align: center;">（a）集合的树形表示</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）集合 $ S_{1} $、 $ S_{2} $和 $ S_{3} $的双亲指针数组表示</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图5.31 并查集的表示</div> </div>

为了得到两个子集的并集，只需要将其中一个子集根结点的双亲指针指向另一个集合的根结点。因此， $ S_1 \cup S_2 $ 的树形表示如图 5.32（a）所示，对应的双亲指针数组表示如图 5.32（b）所示。

<div style="text-align: center;"><div style="text-align: center;">(a)  $ S_{1} \cup S_{2} $ 的树形表示</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b） $ S_{1} $ ∪  $ S_{2} $ 的双亲指针数组表示</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图5.32  $ S_{1}US_{2} $ 的表示</div> </div>

##### 算法 5.14 并查集的合并

① 利用查找操作分别找到两个结点的根结点 Root1 和 Root2。

② 判断两个结点是否属于同一集合，如果是，则不执行合并操作，否则将根结点 Root2 链

接到另一个根结点 Root1 下。

【算法描述】

void Union_UFSet(int UFSet[], int Root1, int Root2)
{
 // 将两个子集合并
 Root1 = Find(UFSet, Root1);
 Root2 = Find(UFSet, Root2);
 if (Root1 == Root2) return;
 else
 {
 UFSet[Root1] += UFSet[Root2];
 UFSet[Root2] = Root1;
 // 将根Root2链接到另一根Root1下面
}

## 2. 并查集的优化

并查集的查找与合并操作实现起来比较简单，但性能较差。查找与合并的时间复杂度主要取决于树的深度。就平均情况而言，树的深度为  $ \log_2 n $ 的数量级，因此查找操作的平均时间复杂度为  $ O(\log_2 n) $。但是，在最坏情况下，假设最初  $ n $ 个元素自成一个单元素的集合（ $ S_i = \{i\}, 0 \leq i \leq n-1 $），相应的树结构为由  $ n $ 棵树组成的森林。对该  $ n $ 棵树做  $ n-1 $ 次合并操作，并假设每次都是含结点多的树的根结点指向含结点少的树的根结点，具体过程如图 5.33 所示。

<div style="text-align: center;"><div style="text-align: center;">(a) n个元素</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）“并”操作</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图5.33 “并” 操作的一种极端情况</div> </div>

合并后，n个结点的树退化成一条链，深度为n。该情况下若再执行查找操作，则需要从待查元素出发，沿双亲指针链走到根。若待查元素为i，完成查找操作的时间复杂度为O(i)，则完成n次查找的总时间复杂度将达到式（5-6），即 $ O(n^{2}) $。

 $$ O\left(\sum_{i=1}^{n}i\right)=O(n^{2}) $$

在查找一个结点所在树的根结点的过程中，需经过一条从待查元素到根结点的路径。如果能够将路径上的这些结点直接指向根结点，作为根结点的子结点，如图5.34所示，则查找这些结点的时间复杂度会大大降低。例如，对图5.35（a）所示的树采用折叠规则，在查找6所属集

合的过程中，对于从结点6到根结点的路径上的每一个结点，如果其双亲指针不指向结点6的根结点0，则将其双亲指针指向结点6的根结点0。这样，下一次查找6所属集合时，只经过一步便可以定位到根。在查找6之后经过调整的树如图5.35（b）所示。

<div style="text-align: center;"><div style="text-align: center;">图5.34 路径压缩后的树</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（a）查找6之前</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）查找6之后</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图5.35 在查找时调整子集树的方法示例</div> </div>

这种改变结点所指方向以减小结点深度，从而缩短查找路径长度的方法，称作路径压缩。换句话说，路径压缩实际上是在找到根结点之后，在返回时将路径上各元素的双亲指针均指向根结点，由此缩短查找路径长度。

路径压缩可以采用递归或非递归的迭代方法实现，下面给出路径压缩的递归算法。

### 算法 5.15 路径压缩的递归算法

【算法步骤】

① 寻找结点 x 的树根结点，并对结点 x 所在的子树进行路径压缩，返回调整后的 x 的双亲指针。

②如果 x 为根结点，返回其本身结点元素。

③找到根结点后，按原路返回的同时，进行中间结点的逆序路径压缩，一次性完成。

int CompressionFind(int UFSet[], int x)
{
 // 递归实现路径压缩
 if(UFSet[x] < 0) // 找到根结点
 return x;
 return UFSet[x] = CompressionFind(UFSet, UFSet[x]); // 路径压缩，提高查找效率
}

使用路径压缩技术可大大提高查找操作的效率，减少最坏情况下完成一系列查找操作所需的时间。对路径压缩后的树进行查找操作，时间复杂度为  $ O(1) $。

## 5.9 案例分析与实现

在 5.2 节引入的案例 5.1 已在 5.7 节中进行了详细的讨论，案例 5.2 提出了可以利用二叉树来表示表达式，本节将对案例 5.2 进行进一步的分析，给出利用表达式构建表达式树和利用表达式树求解表达式的算法。

### 案例5.2：利用二叉树求解表达式的值。

【案例分析】

对于任意一个算术表达式，都可用二叉树来表示。创建表达式对应的二叉树后，利用二叉树的遍历等操作，很容易实现表达式的求值运算。因此问题的关键就是如何创建表达式树，下

面讨论由中级表达式创建表达式树的方法。

假设运算符均为双目运算符，则表达式对应的表达式树中叶子结点均为操作数，分支结点均为运算符。由于创建的表达式树需要准确的表达运算次序，因此在创建表达式树的过程中，当遇到运算符时不能直接创建结点，而应将其与前面的运算符进行优先级比较，根据比较的结果再进行处理。这种处理方式类似于第3章的表达式求值算法中的运算符的比较，可以借助一个运算符栈，来暂存已经读取到的还未处理的运算符。

根据表达式树与表达式对应关系的递归定义，每两个操作数和一个运算符就可以建立一棵表达式二叉树，而该二叉树又可以作为另一个运算符结点的一棵子树。可以另外借助一个表达式树栈，来暂存已建立好的表达式树的根结点，以便其作为另一个运算符结点的子树而被引用。

#### 【案例实现】

为实现表达式树的创建算法，可以使用两个工作栈，一个称作OPTR，用以暂存运算符；另一个称作EXPT，用以暂存已建立好的表达式树的根结点。

为了便于实现，和第3章一样，假设每个表达式均以“#”开始，以“#”结束。

##### 算法 5.16 表达式树的创建

【算法步骤】

①初始化 OPTR 栈和 EXPT 栈，将表达式起始符 “#” 压入 OPTR 栈。

②读取表达式，读入第一个字符ch，如果表达式没有读取完毕至“#”或OPTR的栈顶元素不为“#”，则循环执行以下操作。

若 ch 不是运算符，则以 ch 为根创建一棵只有根结点的二叉树，且将该树根结点压入 EXPT 栈，读入下一字符 ch；

表达式树的创建

若 ch 是运算符，则根据 OPTR 的栈顶元素和 ch 的优先级比较结果，进行不同的处理：

若小于，则将 ch 压入 OPTR 栈，读入下一字符 ch；

若大于，则弹出 OPTR 栈顶的运算符，从 EXPT 栈弹出两个表达式子树的根结点，以该运算符为根结点，以 EXPT 栈中弹出的第二个子树作为左子树，以 EXPT 栈中弹出的第一个子树作为右子树，创建一棵新二叉树，并将该树根结点压入 EXPT 栈；

若等于，则 OPTR 的栈顶元素是“(”且 ch 是“)”，这时弹出 OPTR 栈顶的“(”，相当于括号匹配成功，然后读入下一字符 ch。

【算法描述】

void InitExpTree()
{
 // 表达式树的创建算法
 InitStack(EXPT);
 InitStack(OPTR);
 Push(OPTR, '#');
 cin>>ch;
 while(ch!='#' || GetTop(OPTR) != '#')
 {
 ##
 }
 if(!In(ch))
 {
 CreateExpTree(T, NULL, NULL, ch);
 Push(EXPT, T);
 cin>>ch;
 }
}

// 初始化EXPT栈
// 初始化OPTR栈
// 将表达式起始符“#”压入OPTR栈
// 表达式没有读取完毕或OPTR的栈顶元素不为
// ch不是运算符
// 以ch为根创建一棵只有根结点的二叉树
// 将二叉树根结点T进EXPT栈
// 读入下一字符

else
 switch (Precede(GetTop(OPTR), ch)) // 比较 OPTR 的栈顶元素和 ch 的优先级
{
 case '<':
 Push(OPTR, ch); cin >> ch; // 当前字符 ch 压入 OPTR 栈，读入下一字符 break;
 case '>':
 Pop(OPTR, theta); // 弹出 OPTR 栈顶的运算符
 Pop(EXPT, b); Pop(EXPT, a); // 弹出 EXPT 栈顶的两个操作数
 CreateExpTree(T, a, b, theta);
 // 以 theta 为根，a 为左子树，b 为右子树，创建一棵二叉树
 Push(EXPTR, T); // 使二叉树根结点 T 进 EXPT 栈
 break;
 case '=':
 Pop(OPTR, x); cin >> ch; // OPTR 的栈顶元素是“(”且 ch 是“)”
 break;
}

// switch
// while

##### 【算法分析】

此算法从头到尾读取表达式中每个字符，若表达式的字符串长度为 n，则此算法的时间复杂度为  $ O(n) $。算法在运行时所占用的辅助空间主要取决于 OPTR 栈和 EXPT 栈的大小，显然，它们的空间大小之和不会超过 n，所以此算法的空间复杂度也同样为  $ O(n) $。

##### 【算法步骤】

① 设变量 l value 和 r value 分别用以记录表达式树中左子树和右子树的值，初始均为 0。

② 如果当前结点为叶子（结点为操作数），则返回该结点的数值，否则（结点为运算符）执行以下操作：

表达式树的

求值

递归计算左子树的值，记为 lvalue；

递归计算右子树的值，记为 rvalue；

根据当前结点运算符的类型，将 lvalue 和 rvalue 进行相应运算并返回。

【算法描述】

int EvaluateExpTree(BiTree T)
{
 // 遍历表达式树进行表达式求值
 lvalue=rvalue=0;
 if(T->lchild==NULL && T->rchild==NULL)
 return T->data='0';
 else
 {
 lvalue=EvaluateExpTree(T->lchild);
 rvalue=EvaluateExpTree(T->rchild);
 return GetValue(T->data,lvalue,rvalue);
 }
}

##### 【算法分析】

遍历表达式进行求值的过程实际上是一个后序遍历二叉树的过程，因此时间和空间复杂度均为 O(n)。

## 5.10 LeetCode算法练习题

为使本节各算法练习题中的算法描述部分所使用的二叉树存储结构与LeetCode官方一致，将二叉树的二叉链表存储结构定义如下：

// - - - - - 二叉树的二叉链表存储结构 - - - - -
typedef struct TreeNode
{
 int val;
 struct TreeNode *left, *right;
}TreeNode, *BiTree;

// 结点指针域
// 左右孩子指针

【算法练习题5.1】LeetCode 872 叶子相似的树

【问题描述】

给定两棵根结点分别为 root1 和 root2 的树，判断两棵树是否叶相似，如果是，则返回 true，否则返回 false。叶相似是指两棵二叉树的叶值序列相同，叶值序列为一棵二叉树上所有叶子从左向右顺序排列形成的序列。例如，图 5.36 所示二叉树的叶值序列为 (6, 7, 4, 9, 8)。

<div style="text-align: center;"><div style="text-align: center;">图5.36 叶值序列为（6，7，4，9，8）的二叉树</div> </div>

【输入输出示例】

输入：

root1 = [3, 5, 1, 6, 2, 9, 8, NULL, NULL, 7, 4]

root2 = [3, 5, 1, 6, 7, 4, 2, NULL, NULL, NULL, NULL, NULL, 9, 8]

根结点分别 root1 和 root2 的二叉树如图 5.37 所示。

输出：true

<div style="text-align: center;"><div style="text-align: center;">图5.37 根结点分别为root1和root2的二叉树</div> </div>

### 【问题分析】

本题首先需要判断两棵树是否为空，若为空，则返回 true；否则利用先序遍历方法遍历二叉树，分别得到两棵二叉树的叶值序列，然后判断两棵树的叶值序列是否相同。具体而言，在

先序遍历过程中，先先序遍历左子树，再先序遍历右子树，当遍历到一个叶子结点时，则将该叶子结点的值放入叶值序列。分别得到两棵树的叶值序列后，判断两个叶值序列长度是否相等，若不相等，则两棵二叉树一定不是叶相似的；若相等，则遍历两个叶值序列，判断其中的值是否完全相同，以判定两棵二叉树是否叶相似。

#### 【算法步骤】

①若 root1 不为空，利用先序遍历方法遍历二叉树得到叶值序列 seq1。

②若 root2 不为空，利用先序遍历方法遍历二叉树得到叶值序列 seq2。

③若叶值序列长度 seq1Size 不等于 seq2Size，返回 false。

④ 若叶值序列长度 seq1Size 等于 seq2Size，遍历叶值序列 seq1 和 seq2，若 seq1[i] 不等于 seq2[i]，返回 false。

⑤若不符合以上情况，返回 true。

【算法描述】

void PreOrderTraverse(struct TreeNode* node, int* seq, int* seqSize)
{
 // 先序遍历方法得到叶值序列
 if (!node->left && !node->right)
 seq[(*seqSize)+] = node->val; // 将叶子结点的值添加到序列中
 else
 {
 if (node->left)
 PreOrderTraverse(node->left, seq, seqSize);
 if (node->right)
 PreOrderTraverse(node->right, seq, seqSize);
 }
}

bool leafSimilar(struct TreeNode* root1, struct TreeNode* root2)
{
 // 判断两棵二叉树是否叶相似
 int seq1[200], seq1Size = 0;
 if (root1)
 PreOrderTraverse(root1, seq1, &seq1Size);
 int seq2[200], seq2Size = 0;
 if (root2)
 PreOrderTraverse(root2, seq2, &seq2Size);
 if (seq1Size != seq2Size)
 // 两个叶值序列长度不等, 返回 false
 return false;
 for (int i = 0; i < seq1Size; i++)
 // 遍历叶值序列
 {
 if (seq1[i] != seq2[i])
 return false;
 }
 return true;
}

【算法分析】

算法需要遍历两棵二叉树，假设两棵树的结点个数分别是  $ n_{1} $ 和  $ n_{2} $，则时间复杂度为  $ O(\max(n_{1}, n_{2})) $；空间复杂度取决于存储叶值序列的空间和先序遍历过程中所使用的栈空间，空间复杂度亦为  $ O(\max(n_{1}, n_{2})) $。

##### 【问题描述】

给定一个根结点为 root 的二叉树和一个整数目标和 targetSum，找出所有从根结点到叶子结点路径总和等于给定目标和的路径。

##### 【输入输出示例】

输入：root = [5, 4, 8, 11, NULL, 13, 4, 7, 2, NULL, NULL, 5, 1]，targetSum = 22

输出：[[5,4,11,2],[5,8,4,5]]

二叉树及对应路径如图 5.38 所示。

<div style="text-align: center;"><div style="text-align: center;">图5.38 二叉树及对应路径</div> </div>

##### 【问题分析】

本题的核心思想是对二叉树进行一次遍历，在遍历时记录从根结点到当前结点的路径和，以防止重复计算。可以采用先序遍历的方式递归遍历二叉树，枚举每条从根结点到叶子结点的路径，当遍历到叶子结点，且路径和等于目标和时，则找到了一条满足条件的路径。最后返回所有路径即可。

##### 【算法步骤】

① 利用先序遍历方法记录从根结点到叶子结点的每条路径，记录路径和等于目标和的所有路径。具体实现步骤如下：

若 root 为空，二叉树遍历结束；

若 root 不为空，path 存储路径上结点的值，targetnum 等于 targetnum 减去当前结点的值；

若 root 的左、右子树均为空，且 targetSum 等于 0，说明路径总和等于给定目标和，将当前路径写入 ret；

递归遍历左子树和右子树。

②返回所有路径ret。

【算法描述】

int** ret; // 存储所有满足条件的路径
int retSize; // 满足条件的路径数量
int* retColSize; // 每条路径的结点数量
int* path; // 当前路径的结点值
int pathSize; // 当前路径的结点数量
void PreOrderTraverse(struct TreeNode* root, int targetSum)
{ // 先序遍历方法记录从根结点到叶子结点的每条路径
 if (root == NULL) // 判断当前结点是否为空
 return;
 path[pathSize++] = root->val; // 存储路径上的结点值

targetSum -= root->val;
if (root->left == NULL && root->right == NULL && targetSum == 0)
{
 int* tmp = (int*)malloc(pathSize * sizeof(int));
 memcpy(tmp, path, sizeof(int) * pathSize);
 ret[retSize] = tmp; // 当前路径写入ret
 retColSize[retSize++] = pathSize;
}
PreOrderTraverse(root->left, targetSum); // 递归遍历左子树
PreOrderTraverse(root->right, targetSum); // 递归遍历右子树
pathSize--;
}
int** pathSum(struct TreeNode* root, int targetSum, int* returnSize, int** returnColumnSizes)
{
 ret = (int**)malloc(1000 * sizeof(int));
 retColSize = (int*)malloc(1000 * sizeof(int));
 path = (int*)malloc(1000 * sizeof(int));
 retSize = pathSize = 0;
 PreOrderTraverse(root, targetSum); // 深度优先搜索
 *returnSize = retSize;
 *returnColumnSizes = retColSize;
 return ret; // 返回所有路径
}

##### 【算法分析】

在最坏情况下，树的上半部分为链状，下半部分为完全二叉树，并且从根结点到每个叶子结点的路径都符合题目要求，此时，路径的数目为  $ O(n) $，并且每条路径的结点个数也为  $ O(n) $，因此时间复杂度为  $ O(n^{2}) $；空间复杂度主要取决于递归时栈空间的开销，栈中元素个数不会超过树的结点数。因此空间复杂度为  $ O(n) $。

##### 【问题描述】

给定一棵根结点为 root 的二叉树，请找出该二叉树中每层的最大值。

##### 【输入输出示例】

输入 : root = [1, 3, 2, 5, 3, NULL, 9]

输出：[1,3,9]

该二叉树每行最大值如图5.39所示。

<div style="text-align: center;"><div style="text-align: center;">图5.39 二叉树每行最大值</div> </div>

##### 【问题分析】

本题首先需要判断二叉树是否为空，若为空，则返回 NULL，否则利用先序遍历方法递归遍历二叉树，并使用变量 curHeight 标记遍历到的当前结点的高度。若当前结点为 curHeight 层第一个结点，则直接写入 res，否则判断是否更新该层结点的最大值。

##### 【算法步骤】

① 若树为空，返回 NULL。

② 利用先序遍历方法递归遍历二叉树，curHeight 标记遍历到的当前结点的高度。具体实现步骤如下：

当遍历到 curHeight 层第一个结点时，直接写入 res；

当前结点不是 curHeight 层第一个结点时，判断是否更新该层结点的最大值；

递归遍历当前结点的左子树：

递归遍历当前结点的右子树。

③返回每层的最大值集合res。

【算法描述】

#define MAX_NODE_SIZE 10001
#define MAX(a, b) ((a) > (b) ? (a) : (b))
void PreOrderTraverse(int *res, int *pos, struct TreeNode* root, int curHeight)
{
 // 先序遍历进行深度优先搜索
 if (curHeight == *pos) // curHeight 层第一个结点直接写入 res
 res[(*pos)++] = root->val;
 else // 判断是否更新 curHeight 层结点的最大值
 res[curHeight] = MAX(res[curHeight], root->val);
 if (root->left)
 PreOrderTraverse(res, pos, root->left, curHeight + 1);
 if (root->right)
 PreOrderTraverse(res, pos, root->right, curHeight + 1);
}

int* largestValues(struct TreeNode* root, int* returnSize)
{
 // 寻找每层的最大值
 if (!root) // 若树为空, 返回 NULL
 {
 return NULL;
 }
 int* res = (int*)malloc(MAX_NODE_SIZE * sizeof(int));
 *returnSize = 0;
 PreOrderTraverse(res, returnSize, root, 0); // 先序遍历方法递归遍历二叉树
 return res; // 返回每层最大值集合 res
}

##### 【算法分析】

二叉树的每个结点会被访问一次且只会被访问一次，时间复杂度为  $ O(n) $；空间复杂度主要取决于递归时栈空间的开销，栈中元素个数不会超过树的结点数，因此空间复杂度为  $ O(n) $。

## 5.11 小结

树和二叉树是一类具有层次关系的非线性数据结构，本章主要内容如下。

（1）二叉树是一种常用的树结构，二叉树具有一些特殊的性质，而满二叉树和完全二叉树又是两种特殊形态的二叉树。

（2）二叉树有两种存储表示：顺序存储和链式存储。顺序存储就是把二叉树的所有结点按照层次顺序存储到连续的存储单元中，这种存储更适用于完全二叉树。链式存储又称二叉链表，每个结点包括两个指针，分别指向其左孩子和右孩子。链式存储是二叉树常用的存储结构。

（3）树的存储结构有3种：双亲表示法、孩子表示法和孩子兄弟表示法。孩子兄弟表示法是常用的表示法，任意一棵树都能通过孩子兄弟表示法转换为二叉树进行存储。森林与二叉树

之间也存在相应的转换方法，通过这些转换，可以利用二叉树的操作解决一般树的有关问题。

（4）二叉树的遍历算法是其他运算的基础，通过遍历可得到二叉树中结点访问的线性序列，实现了非线性结构的线性化。根据访问结点的次序不同有3种遍历，即先序遍历、中序遍历、后序遍历，其时间复杂度均为  $ O(n) $。

（5）在线索二叉树中，利用二叉链表中的  $ n+1 $ 个空指针域来存放指向某种遍历次序下的前驱结点和后继结点的指针，这些附加的指针称为“线索”。引入二叉线索树的目的是加快查找结点前驱或后继的速度。

（6）哈夫曼树在通信编码技术上有广泛的应用，只要构造了哈夫曼树，按分支情况在左路径上写代码0，在右路径上写代码1，然后从上到下叶子结点相应路径上的代码序列就是该叶子结点的最优前缀码，即哈夫曼编码。

（7）并查集主要用于处理一些不相交集合的合并及查找问题，通常采用树结构来表示元素及其所属子集的关系。优化后的并查集可以通过路径压缩来提高效率，使得几乎每次操作都能在常数时间内完成，适用于解决动态连通性问题，如亲戚关系、网络连接等。

学习完本章后，读者应掌握二叉树的性质和存储结构，熟练掌握二叉树的前、中、后序遍历算法，掌握线索化二叉树的基本概念和构造方法；熟练掌握哈夫曼树和哈夫曼编码的构造方法；能够利用树的孩子兄弟表示法将一般的树结构转换为二叉树进行存储；掌握森林与二叉树之间的转换方法；掌握并查集中的查找、合并等运算，并能运用并查集进行等价类划分。

## 1. 选择题

（1）把一棵树转换为二叉树后，这棵二叉树的形态（ ）。

A. 是唯一的

B. 有多种

C. 有多种，但根结点都没有左孩子

D. 有多种，但根结点都没有右孩子

（2）由3个结点可以构造出多少种不同的二叉树？（ ）

A. 2 B. 3 C. 4 D. 5

（3）一棵完全二叉树上有1001个结点，其中叶子结点的个数是（）。

A. 250 B. 254 C. 500 D. 501

（4）一个具有1025个结点的二叉树的高h为（）。

A. 10 B. 11 C. 11～1025 D. 10～1024

（5）深度为 h 的满 m 叉树的第 k 层有（ ）个结点（ $ 1 \leqslant k \leqslant h $）。

A.  $ m^{k-1} $ B.  $ m^k-1 $ C.  $ m^{h-1} $ D.  $ m^h-1 $

（6）利用二叉链表存储树，则根结点的右指针（）。

A. 指向最左孩子 B. 指向最右孩子 C. 为空 D. 非空

（7）对二叉树的结点从1开始进行连续编号，要求每个结点的编号大于其左、右孩子的编号，同一结点的左、右孩子中，其左孩子的编号小于其右孩子的编号，可采用（ ）遍历实现编号。

A. 先序 B. 中序 C. 后序 D. 从根开始按层次

（8）在一棵度为4的树T中，若有20个度为4的结点，10个度为3的结点，1个度为2的结点，10个度为1的结点，则树T的叶子结点个数是（）。

A. 41 B. 82 C. 113 D. 122

（9）在下列存储结构表示法中，( )不是树的存储结构表示法。

A. 双亲表示法

B. 孩子链表表示法

C. 孩子兄弟表示法

D. 顺序存储表示法

（10）一棵非空的二叉树的先序遍历序列与后序遍历序列正好相反，则该二叉树一定满足()。

A. 所有的结点均无左孩子

B. 所有的结点均无右孩子

C. 只有一个叶子结点

D. 是任意一棵二叉树

（11）设哈夫曼树中有199个结点，则该哈夫曼树中有( )个叶子结点。

A. 99 B. 100 C. 101 D. 102

（12）若 X 是二叉中序线索树中一个有左孩子的结点，且 X 不为根，则 X 的前驱为（）。

A. X 的双亲

B. X 的右子树中最左的结点

C. X 的左子树中最右的结点

D. X 的左子树中最右的叶子结点

（13）引入二叉线索树的目的是（）。

A. 加快查找结点的前驱或后继的速度

B．为了能在二叉树中方便地进行插入与删除

C. 为了能方便地找到双亲

D. 使二叉树的遍历结果唯一

（14）设 F 是森林，B 是由 F 变换而得的二叉树。若 F 中有 n 个非终端结点，则 B 中右指针域为空的结点有（）个。

A. n-1 B. n C.  $ n+1 $ D.  $ n+2 $

（15）在并查集的查找过程中做路径压缩，即每次从待查找结点走到根结点的过程中把路径上各结点的双亲指针都指向根结点。采用这种方法，查找的时间复杂度为（），合并的时间复杂度为（），设 n 是树中的结点个数。

A.  $ O(1) $  $ \quad O(\log_{2}n) $

B.  $ \quad O(\log_{2}n) $  $ \quad O(1) $

C.  $ O(n) $  $ \quad O(1) $

D.  $ O(1) $  $ \quad O(n) $

2. 应用题

（1）试找出满足下列条件的二叉树。

① 先序序列与后序序列相同。

②中序序列与后序序列相同。

③ 先序序列与中序序列相同。

④中序序列与层次遍历序列相同。

（2）设一棵二叉树的先序序列为 A B D F C E G H，中序序列为 B F D A G E H C。

①画出这棵二叉树。

②画出这棵二叉树的后序线索树。

③将这棵二叉树转换成对应的树（或森林）。

（3）假设用于通信的电文仅由8个字母组成，字母在电文中出现的频率分别为0.07、0.19、0.02、0.06、0.32、0.03、0.21、0.10。

①试为这8个字母设计哈夫曼编码。

②试设计另一种由二进制表示的等长编码方案。

③对于上述实例，比较两种方案的优缺点。

（4）已知下列字符 A、B、C、D、E、F、G 的权值分别为 3、12、7、4、2、8、11，试写出其对应哈夫曼树 HT 存储结构的初态和终态。

（5）设并查集的合并操作为 Merge(R1, R2)，给出下列操作序列运算的结果：Merge(1, 2)，Merge(1, 6)，Merge(3, 4)，Merge(3, 5)，Merge(10, 11)，Merge(1, 10)，Merge(3, 7)，Merge(8, 9)，Merge(3, 8)，Merge(3, 12)，Merge(3, 13)，Merge(14, 15)，Merge(16, 17)，Merge(14, 16)，Merge(1, 3)，Merge(1, 14)。要求：

①以 R1 为根，让 R2 的双亲指针指向 R1；

②让高度小的子树的根结点的双亲指针指向高度大的子树的根结点；

③让结点个数少的子树的根结点的双亲指针指向结点个数多的子树的根结点。

## 3. 算法设计题

以二叉链表作为二叉树的存储结构，设计以下算法。

（1）统计二叉树的叶子结点个数。

（2）判别两棵树是否相等。

（3）交换二叉树每个结点的左孩子和右孩子。

（4）设计二叉树的双序遍历算法（双序遍历是指对于二叉树的每一个结点来说，先访问这个结点，再按双序遍历它的左子树，然后再一次访问这个结点，接下来按双序遍历它的右子树）。

（5）计算二叉树最大的宽度（二叉树的最大宽度是指二叉树所有层中结点个数的最大值）。

（6）用按层次顺序遍历二叉树的方法，统计树中度为1的结点数目。

（7）求任意二叉树中第一条最长的路径长度，并输出此路径上各结点的值。

（8）输出二叉树中从每个叶子结点到根结点的路径。

（9）班上有 N 名学生。其中有些人是朋友，有些则不是。他们的友谊具有传递性。如果已知 A 是 B 的朋友，B 是 C 的朋友，那么可以认为 A 也是 C 的朋友。所谓的朋友圈，是指所有朋友的集合。给定一个  $ N \times N $ 的矩阵 M，表示班级中学生之间的朋友关系。如果 M[i][j] = 1，表示已知第 i 个和 j 个学生互为朋友关系，否则为不知道。请设计一个算法，输出所有学生中的已知的朋友圈总数。
