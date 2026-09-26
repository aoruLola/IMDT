# 4.5.1 广义表的定义

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


顾名思义，广义表是线性表的推广，也称为列表。广泛地用于人工智能等领域的表处理语言LISP语言，把广义表作为基本的数据结构，就连程序也表示为一系列的广义表。

广义表一般记作：

 $$ L S=(a_{1},a_{2},\cdots,a_{n}) $$

其中，LS 是广义表  $ (a_1, a_2, \cdots, a_n) $ 的名称，n 是其长度。在线性表的定义中， $ a_i $（ $ 1 \leq i \leq n $）只限于是单个元素。而在广义表的定义中， $ a_i $ 可以是单个元素，也可以是广义表，分别称为广义表 LS 的原子和子表。习惯上，用大写字母表示广义表的名称，用小写字母表示原子。

显然，广义表的定义是一个递归的定义，因为在描述广义表时又用到了广义表的概念。下面列举一些广义表的例子。

(1) A = ()——A 是一个空表，其长度为 0。

(2)  $ B=(e) $——B 只有一个原子 e，其长度为 1。

（3） $ C=(a,(b,c,d)) $——C的长度为2，两个元素分别为原子a和子表 $ (b,c,d) $。

(4) $ D=(A,B,C) $——D的长度为3，3个元素都是广义表。显然，将子表的值代入后，则有 $ D=((),(e),(a,(b,c,d))) $。

（5） $ E=(a,E) $——这是一个递归的表，其长度为2。E相当于一个无限的广义表 $ E=(a,(a,(\cdots))) $。

从上述定义和例子可推出广义表的如下3个重要结论。

（1）广义表的元素可以是子表，而子表的元素还可以是子表……由此，广义表是一个多层次的结构，可以用图形象地表示。例如，图4.18表示的是广义

表 D，图中以圆表示广义表，以矩形表示原子。

（2）广义表可为其他广义表所共享。例如在上述例子中，广义表A、B和C为D的子表，则在D中可以不必列出子表的值，而是通过子表的名称来引用。

（3）广义表可以是一个递归的表，即广义表也可以是其本身的一个子表。例如，表 E 就是一个递归的表。

由于广义表的结构比较复杂，其各种运算的实现也不如线性表简单，其中，最重要的两个运算如下。

（1）取表头 GetHead(LS)：取出的表头为非空广义表的第一个元素，它可以是一个单原子，也可以是一个子表。

（2）取表尾 GetTail(LS)：取出的表尾为除去表头之外由其余元素构成的表，即表尾一定是一个广义表。

例如：

 $$  GetHead(B)=e,\qquad GetTail(B)=(), $$

 $$  GetHead(D)=A,\quad GetTail(D)=(B,C), $$

由于 $ (B,C) $为非空广义表，则可继续分解得到：

 $$  GetHead(B,C)=B,\ GetTail(B,C)=(C), $$

值得提醒的是，广义表（）和（（））不同。前者为空表，长度 n=0；后者长度 n=1，可分解得到其表头、表尾均为空表。

## 4.5.2 广义表的存储结构

由于广义表中的数据元素可以有不同的结构（或是原子，或是列表），因此难以用顺序存储结构表示，通常采用链式存储结构。常用的链式存储结构有两种，头尾链表的存储结构和扩展线性链表的存储结构。

## 1. 头尾链表的存储结构

由于广义表中的数据元素可能为原子或广义表，因此需要两种结构的结点：一种是表结点，用以表示广义表；一种是原子结点，用以表示原子。从4.5.1节得知，若广义表不为空，则可分解成表头和表尾，因此，一对确定的表头和表尾可唯一确定广义表。一个表结点可由3个域组成：标志域、指示表头的指针域和指示表尾的指针域。而原子结点只需两个域：标志域和值域。如图4.19所示，其中tag是标志域，值为1时表明结点是子表，值为0时表明结点是原子。

其形式定义说明如下：

<div style="text-align: center;"><div style="text-align: center;">图4.19 头尾链表表示的结点结构</div> </div>

// - - - - -广义表的头尾链表存储表示 - - - - -
typedef enum{ATOM,LIST} ElemTag; //ATOM==0：原子；LIST==1：子表
typedef struct GLNode
{
 ElemTag tag; //公共部分，用于区分原子结点和表结点
 union //原子结点和表结点的联合部分
 {
 AtomType atom; //atom是原子结点的值域，AtomType由用户定
 struct{struct GLNode*hp, *tp;}ptr;
 //ptr是表结点的指针域，ptr.hp和ptr.tp分别指向表头和表尾

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>};</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>}*GList; //广义表类型</td></tr></table>

4.5.1 节中曾列举了广义表的例子，它们的存储结构如图 4.20 所示，在这种存储结构中有以下几种情况。

<div style="text-align: center;"><div style="text-align: center;">图4.20 头尾链表表示的存储结构示例</div> </div>

（1）除空表的表头指针为空外，对任何非空广义表，其表头指针均指向一个表结点，且该结点中的hp域指向广义表表头（或为原子结点，或为表结点），tp域指向广义表表尾（除非表尾为空，则指针为空，否则必为表结点）。

（2）容易分清列表中原子和子表所在层次。如在广义表 D 中，原子 a 和 e 在同一层次上，而 b、c 和 d 在同一层次且比 a 和 e 低一层，B 和 C 是同一层的子表。

（3）最高层的表结点个数即广义表的长度。

以上3个特点在某种程度上可给广义表的操作带来方便。

## 2. 扩展线性链表的存储结构

在这种结构中，无论是表结点还是原子结点均由3个域组成，其结点结构如图4.21所示。

<div style="text-align: center;"><div style="text-align: center;">图4.21 扩展线性链表表示的结点结构</div> </div>

4.5.1 小节中广义表例子所对应的这种表示法的存储结构，如图4.22所示。

<div style="text-align: center;"><div style="text-align: center;">图4.22 扩展线性链表表示的存储结构示例</div> </div>

### 【案例分析】

因为植物 DNA 和病毒 DNA 均是由一些字母组成的字符串序列，要检测某种病毒 DNA 序列是否在植物 DNA 序列中出现过，实际上就是字符串的模式匹配问题。可以利用 BF 算法，也可以利用更高效的 KMP 算法。但与一般的模式匹配问题不同的是，此案例中病毒 DNA 序列是环状的，这样需要对传统的 BF 算法或 KMP 算法进行改进。

下面给出利用 BF 算法实现检测的方案。

#### 【案例实现】

对于每一个待检测的任务，假设病毒 DNA 序列的长度是 m，因为病毒 DNA 序列是环状的，为了线性取到每个可行的长度为 m 的模式串，可将存储病毒 DNA 序列的字符串长度扩大为 2m，将病毒 DNA 序列连续存储两次。然后循环 m 次，依次取得每个长度为 m 的环状字符串，将此字符串作为模式串，将植物 DNA 序列作为主串，调用 BF 算法进行模式匹配。只要匹配成功，即可中止循环，表明该植物感染了对应的病毒；否则，循环 m 次后结束，可通过 BF 算法的返回值判断该植物是否感染了对应的病毒。

##### 【算法步骤】

①从文件中读取待检测的任务数num。

② 根据 num 个数依次检测每对病毒 DNA 和植物 DNA 是否匹配，循环 num 次，执行以下操作。

从文件中分别读取一对病毒 DNA 序列和植物 DNA 序列。

设置一个标志性变量 flag，用来标识是否匹配成功，初始为 0，表示未匹配。

病毒 DNA 序列的长度是 m，将存储病毒 DNA 序列的字符串长度扩大为 2m，将病毒 DNA 序列连续存储两次。

循环 m 次，重复执行以下操作：

病毒感染检测

依次取得每个长度为 m 的病毒 DNA 环状字符串；

将此字符串作为模式串，将植物 DNA 序列作为主串，调用 BF 算法进行模式匹配，将匹配结果返回赋值给 flag；

若 flag 非 0，表示匹配成功，中止循环，表明该植物感染了对应的病毒。

退出循环时，判断flag的值，若flag非0，输出“YES”；否则，输出“NO”。

【算法描述】

void Virus_detection()
{
 // 利用BF算法实现病毒检测
 ifstream inFile("病毒感染检测输入数据.txt");
 ofstream outFile("病毒感染检测输出结果.txt");
 inFile>>num;
 while(num--)
 {
 {
 inFile>>Virus.ch+1;
 }
 }
}
// 读取待检测的任务数
// 依次检测每对病毒DNA和植物DNA是否匹配
// 读取病毒DNA序列，字符串从下标1开始存放

inFile>>Person.ch1; // 读取植物DNA序列
Vir=Virus.ch; // 将病毒DNA临时暂存在Vir中，以备输出
flag=0; // 用来标识是否匹配，初始为0，匹配后为非0
m=Virus.length; // 病毒DNA序列的长度是m
for(i=m+1,j=1;j<=m;j++)
 Virus.ch[i++]=Virus.ch[j]; // 将病毒字符串的长度扩大2倍
Virus.ch[2*m+1]='\\0'; // 添加结束符号
for(i=0;i<m;i++) // 取得每个长度为m的病毒DNA环状串temp
{
 for(j=1;j<=m;j++) temp.ch[j]=Virus.ch[i+j];
 temp.ch[m+1]='\\0'; // 添加结束符号
 flag=Index_BF(Person,temp,1); // 模式匹配
 if(flag) break; // 匹配即可退出循环
}
if(flag) outFile<<Vir+1<<"  "<<Person.ch+1<<"  "<<"YES"<<endl;
else outFile<<Vir+1<<"  "<<Person.ch+1<<"  "<<"NO"<<endl;
}

##### 【算法分析】

对于每一个待检测的任务而言，该算法都需要执行 $m$ 次模式匹配。假设植物 DNA 序列长度为 $n$，由于 BF 算法的时间复杂度为 $O(m \times n)$，因此，对于每一个待检测的任务，时间复杂度都为 $O(m \times m \times n)$。如果待检测的任务个数为 $num$，则上述算法的时间复杂度为 $O(num \times m \times m \times n)$，时间复杂度较高。利用 KMP 算法完成模式匹配将有效地提高匹配效率，读者可以模仿该算法，实现利用 KMP 算法完成检测的方案。

从上述案例的实现可以看出，基于模式匹配算法的病毒感染检测简单有效。实际上，模式匹配算法在现代生物学中的应用不限于基因序列分析，还包括生物标志物识别、蛋白质序列分析等。在数字世界中，模式匹配算法同样发挥着至关重要的作用，正如我们利用该算法识别植物病毒序列以保护生态平衡，模式匹配算法在网络安全领域也扮演着守护者的角色。

随着互联网的普及和发展，网络安全问题日益严峻。习近平总书记提出“没有网络安全，就没有国家安全”。网络安全事关国家安全和社会稳定，因此，必须采取有效措施来保障我国的网络安全。入侵检测系统如 Snort 应运而生，它通过规则匹配来识别网络入侵。使用 Snort 时，用户需编写规则来描述入侵特征，系统通过比对网络数据与规则库来检测入侵。规则匹配效率是 Snort 性能的关键，而模式匹配算法是其核心技术之一，模式匹配算法的性能直接影响入侵检测系统的效率。

由此看来，模式匹配算法的性能直接影响病毒感染检测、入侵检测等技术的效率。本章主要介绍了BF算法和KMP算法两种最基本的模式匹配算法，而KMP算法还存在一些改进的版本，例如BM（Boyer-Moore）算法、Horspool算法等，如果读者对这些算法感兴趣，可以自行查找资料进行进一步学习，在实际应用中，可以根据具体情况进行选择和优化。

#### 【问题描述】

给定一个字符串 s，判断其是否为回文串，若是，返回 true，否则返回 false。其中，回文串是指将字符串中所有大写字母转换为小写字母，并移除所有非字母数字字符之后，正读和反读相同的字符串。字母和数字都属于字母数字字符。

##### 【输入输出示例】

输入："A man, a plan, a canal: Panama"

输出：true

解释：“amanaplanacanalpanama”是回文串。

##### 【问题分析】

本题可以在原字符串 s 上使用 left 和 right 两个指针。初始时，left 指向字符串第一个字符，right 指向最后一个字符。若 left 所指字符为非字母数字字符，则将 left 向右移动，直到 left 指向一个字母或数字字符；若 right 所指字符为非字母数字字符，则将 right 向左移动，直到 right 指向一个字母或数字字符。然后判断两个指针所指的字符转换为小写之后是否相同，若相同，则继续移动，直到 left>=right，并返回 true，若不同，则返回 false。具体实现步骤如图 4.23 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）初始状态</div> </div>

##### 【算法步骤】

<div style="text-align: center;"><div style="text-align: center;">(c) left == right, 返回true</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图4.23 LeetCode 125 具体实现步骤</div> </div>

①定义 left 和 right 两个指针，初始时 left 指向第一个字符，right 指向最后一个字符。

②遍历字符串s，当left<right时，循环执行以下操作：

若 left 所指字符为非字母数字字符，则将其向右移动一步，并循环执行此操作，直到 left 所指字符为字母或数字字符；

若 right 所指字符为非字母数字字符，则将其向左移动一步，并循环执行此操作，直到 right 所指字符为字母数字字符；

若 left 和 right 所指字符转换为小写后不同，则返回 false；

若 left 和 right 所指字符转换为小写后相同，则 left 向右移动一步，right 向左移动一步。

③ left>=right，遍历完字符串 s，返回 true。

【算法描述】

bool isPalindrome(char * s)
{
 // 验证回文串
 int n = strlen(s);
 int left = 0, right = n-1;
 while (left < right) {
 // 遍历字符串s
 }
 while (left < right && !isalnum(s[left])) {
 // left所指字符为非字母数字字符
 ++left;
 while (left < right && !isalnum(s[right])) {
 // 右移一步
 --right;
 }
 if (left < right) {
 if (tolower(s[left]) != tolower(s[right])) {
 // 所指字符不同，返回false
 }
 return false;
 }
 ++left;
 --right;
 }
}

}
return true;

【算法分析】

最坏情况下，算法需要遍历输入字符串 s 的每个字符，因此，时间复杂度为  $ O(n) $；算法只需要两个指针的额外空间，因此空间复杂度为  $ O(1) $。

##### 【算法练习题4.2】LeetCode 566 重塑矩阵

【问题描述】

MATLAB 中有一个非常有用的函数 reshape()，该函数可以将一个  $ m \times n $ 的矩阵重塑为一个  $ r \times c $ 的新矩阵，且仍保留原始数据。给定一个由二维数组 mat 表示的  $ m \times n $ 矩阵，以及两个正整数 r 和 c，分别表示重塑矩阵的行数和列数。重塑矩阵时需要将原矩阵的所有元素以相同的行遍历顺序填充。如果给定参数的 reshape 操作是可行且合理的，则输出新的重塑矩阵；否则输出原矩阵。

##### 【输入输出示例】

输入：mat = [[1, 2], [3, 4]]，r = 1, c = 4

输出：[[1,2,3,4]]

重塑矩阵如图4.24所示。

<div style="text-align: center;"><div style="text-align: center;">图4.24 重塑矩阵</div> </div>

【问题分析】

本题首先需要判断给定参数的 reshape 操作是否可行且合理，若不合理，说明无法进行重塑，直接返回原始矩阵 mat，若合理，则可以直接从二维矩阵 mat 得到 r 行 c 列的重塑矩阵。具体来说，若 reshape 操作可行，可以将二维数组 mat 映射为一个一维数组，那么对于一维数组中的第  $ x \in [0, m \times n) $ 个元素，其在 mat 中对应的下标为  $ (x/n, x\%n) $，在重塑矩阵 ans 中对应的下标为  $ (x/c, x\%c) $，因此，可以直接将元素 mat $ [x/n, x\%n] $ 直接赋值给重塑矩阵 ans $ [x/c, x\%c] $，最后返回重塑矩阵 ans 即可。

【算法步骤】

①初始化，得到原矩阵的行数和列数。

②若  $ m \times n $ 和  $ r \times c $ 不相等，则直接返回原矩阵。

③ 若  $ m \times n $ 和  $ r \times c $ 相等，首先对重塑矩阵进行初始化，然后对于任意的  $ x \in [0, m \times n) $，循环执行以下操作：将元素  $ \text{mat}[x/n, x\%n] $ 赋值给重塑矩阵  $ \text{ans}[x/c, x\%c] $。

④返回重塑矩阵ans。

【算法描述】

int** matrixReshape(int** mat, int matSize, int* matColSize, int r, int c, int* returnSize, int** returnColumnSizes)
{
 int m = matSize;
 int n = matColSize[0];
 if (m * n != r * c) // 给定参数的 reshape 操作不合理, 返回原矩阵
 {
 *returnSize = matSize;
 *returnColumnSizes = matColSize;
 return mat;
 }
 *returnSize = r;
 *returnColumnSizes = (int*)malloc(r*sizeof(int));
 int** ans = (int**)malloc(r*sizeof(int*));
 for (int i = 0; i < r; i++) // 对重塑的新矩阵进行初始化
 {

(*returnColumnSizes)[i] = c;
ans[i] = (int*)malloc(c*sizeof(int));
}
for (int x = 0; x < m * n; ++x) // 矩阵重塑
 ans[x / c][x % c] = mat[x / n][x % n];
return ans;

##### 【算法分析】

在重塑矩阵成功的前提下,时间复杂度为  $ O(rc) $, 否则直接返回原矩阵, 时间复杂度为  $ O(1) $; 算法不需要额外空间, 因此空间复杂度为  $ O(1) $。

##### 【问题描述】

给定一个字符串 s，请找出其中不含有重复字符的最长子串的长度。

【输入输出示例】

输入：s="abcabcbbb"

输出：3

解释：因为无重复字符的最长子串是 "abc"，所以其长度为 3。

##### 【问题分析】

本题可以利用滑动窗口的思想，使用 left 和 right 两个变量表示滑动窗口的左右两端在字符串中的下标，遍历字符串 s，循环执行以下操作：检测下标从 left 到 right 的子串是否包含重复字符；当没有重复字符时，right 不断向右移动，并记录不包含重复字符的最长子串的长度；当出现重复字符时，left 向右移动至左侧重复字符的下一个字符位置，再继续检测下标从 left 到 right 的子串是否包含重复字符；最后返回最长子串长度 max 即可。具体实现步骤如图 4.25 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）初始状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）未出现重复字符，right不断右移</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）此时出现重复字符</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）left移动至左侧重复字符的下一个字符</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（e）遍历结束，返回max</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图4.25 LeetCode 3具体实现步骤</div> </div>

##### 【算法步骤】

① 定义变量 left、right 和 max，初始时值都为 0。

② 遍历字符串 s. 循环执行以下操作：

当 left 小于或等于 right 时，遍历下标从 left 到 right 的子串，检测是否出现重复字符，若是，left 向右移动至左侧重复字符的下一个字符位置，然后继续遍历子串；

否则统计当前最长子串长度，right 向右移动一个位置。

③返回最长无重复字符的子串长度 $ \max $。

int lengthOfLongestString(char* s)
{
 // 返回无重复字符的最长子串的长度
 int left = 0, right = 0, max = 0;
 int len = strlen(s);
 for (int i = 0; i < len; i++)
 {
 if (left <= right)
 {
 for (int j = left; j < right; j++)
 // 在left和right之间查找重复字符
 }
 if (s[j] == s[right])
 {
 left = j + 1;
 break;
 }
 }
 }
 max = max < (right - left + 1) ? (right - left + 1) : max; // 更新最长子串长度 right++;
 }
 return max;
}

##### 【算法分析】

最坏情况下，外层循环需要遍历整个字符串，内层循环需要遍历从 left 到 right 的子串，最长为 n，因此时间复杂度为  $ O(n^{2}) $；算法只需要申请常数个变量空间，因此空间复杂度为  $ O(1) $。

##### 【算法练习题4.4】LeetCode 6Z 字形变换★★

【问题描述】

将一个给定字符串 s 根据给定的行数 numRows，以从上向下、从左到右的顺序进行 Z 字形排列，之后，从左往右逐行读取，产生一个新的字符串，并将其输出。例如，输入字符串为 PAYPALISHIRING，行数为 3 时，排列如下：

P A H N
APL S I I G
Y I R

输出的新字符串为 “PAHNAPLSIIGYIR”。

【输入输出示例】

输入：s = "PAYPALISHIRING", numRows = 4

输出："PINALSIGYAHRPI"
解释：
P I N
A L S I G
Y A H R
P I

本题首先需要判断行数 r 是否等于 1，或者大于或等于字符串长度 n，若是，则新字符串与原字符串相同，直接返回字符串 s 即可；否则需要创建一个二维矩阵，然后按 Z 字形填写字符串 s，最后行遍历矩阵中的非空字符，返回新字符串。

根据题意，在矩阵中填充字符时，先向下填写 r 个字符，再向右继续填写 r-2 个字符，然后回到第 0 行，因此 Z 字形的变换周期  $ t = 2r - 2 $。当使用传统二维矩阵存储字符串 s 时，矩阵中的大量空间会遭到浪费。本题可以使用压缩矩阵 mat 来存储 s。首先将矩阵中的每行初始化为一个空列表，每次向矩阵中添加字符 s[i] 时，将其添加到第 x 行列表的尾部；然后计算下一个元素所在行，若  $ i\%t < r - 1 $，则下一个元素所在行为 x 的下一行，否则为上一行，直到 s 中的最后一个元素添加到 mat 中；最后遍历 mat，返回新的字符串即可。输入输出示例对应的压缩矩阵如图 4.26 所示。

<div style="text-align: center;"><div style="text-align: center;">图4.26 压缩矩阵</div> </div>

【算法步骤】

①若行数 r=1 或  $ r \geqslant n $，返回 s。

②初始化压缩矩阵 mat。

③ 遍历字符串 s，循环执行以下操作：将元素 s[i] 追加到 mat 对应的第 x 行列表中，计算下一个元素所在行，若 i%t<r-1，则下一个元素所在行为 x 的下一行，否则为上一行。

④遍历压缩矩阵，将元素赋值给s。

⑤返回新的字符串s。

【算法描述】

char* convert(char* s, int numRows) {
 int n = strlen(s), r = numRows;
 if (r == 1 || r >= n)
 return s;
 char** mat = (char**)malloc(r * sizeof(char*));
 int* columnSize = (int*)malloc(numRows * sizeof(int));
 memset(columnSize, 0, sizeof(int) * numRows);
 for (int i = 0; i < r; i++)
 // 矩阵初始化
 {
 mat[i] = (char*)malloc((n) * sizeof(char));
 memset(mat[i], 0, sizeof(char) * (n));
 }
 for (int i = 0, x = 0, t = r * 2 - 2; i < n; ++i) // 填充压缩矩阵
 {

mat[x][columnSize[x]++] = s[i]; // 将 s[i] 放入矩阵当前位置
i %t < r - 1 ? ++x : --x; // 计算下一个元素所在行
}
int pos = 0;
for (int i = 0; i < r; i++)  // 逐行遍历压缩矩阵
{
 for (int j = 0; j < columnSize[i]; j++)
 s[pos++] = mat[i][j]; // 从矩阵读取字符并写回原字符串
 free(mat[i]);
}
free(columnSize);
free(mat);
return s;

##### 【算法分析】

初始化矩阵和数组的时间复杂度为  $ O(r \times n) $，填充压缩矩阵的过程中，需要遍历字符串中的每个字符，时间复杂度为  $ O(n) $，遍历压缩矩阵并获取新的字符串的过程，时间复杂度也为  $ O(n) $，一般情况下，认为 r 远小于 n，因此，算法的整体时间复杂度为  $ O(n) $；算法使用  $ O(n) $ 的空间来存储压缩矩阵，因此，空间复杂度为  $ O(n) $。

##### 【问题描述】

给定一个字符数组 chars，请使用下述算法压缩。从一个空字符串 s 开始，对于 chars 中的每组连续重复字符：如果这一组长度为 1，则将该字符追加到 s 中，否则，需要向 s 追加该字符，后跟这一组的长度。压缩后得到的字符串 s 不应该直接返回，需要转存到字符数组 chars 中。需要注意的是，如果组长度为 10 或 10 以上，则该数字会被拆分为多个字符。要求设计并实现一个只使用常量额外空间的算法，在修改完输入数组后，返回该数组的新长度。

##### 【输入输出示例】

输入：chars = ["a", "b", "b", "b", "b", "b", "b", "b", "b", "b"]

##### 输出：4

解释：压缩后的数组是 ["a","b","1","2"。字符 "a" 不重复，所以不会被压缩。"bbbbbbbbbbb" 被 "b12" 替代。

##### 【问题分析】

为了实现原地压缩，本题可以使用两个变量 write 和 read，分别标识在字符数组中读和写的位置。对于每组连续相同字符，read 移动到该子串的最右侧，在 chars[write] 写入该子串对应的字符 chars[read]，并记录该子串长度 num = read - left + 1。其中，left 为记录子串最左侧位置的变量。若 num = 1，则 left 向右移动到下一组字符的最左侧；若 num > 1，则采用短除法将 num 倒序写入 chars，并将其反转。最后返回压缩字符数组的长度 write 即可。具体实现步骤如图 4.27 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）初始状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）left移向下一组子串</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) read移动到尾部得到该子串长度 $ num=12 $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">a b l 2</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）压缩后的字符串</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图4.27 LeetCode 443具体实现步骤</div> </div>

##### 【算法步骤】

① 定义变量 write 和 left，初始时值均为 0。

②遍历 chars，循环执行以下操作：

当 read 位于 chars 的尾部或所指字符不同于下一个字符时，将 read 所指字符写入到 chars 中 write 所指向的位置，write 向右移动一个位置，并记录子串长度 num；

若 num > 1，将 num 采用短除法倒序写入 chars，然后将其反转；

left 向右移动到下一组字符的最左侧。

③返回压缩字符数组的长度 write。

【算法描述】

void swap(char *a, char *b)
{
 // 交换数值
 char t = *a;
 *a = *b, *b = t;
}

void reverse(char *a, char *b)
{
 // 反转字符数组
 while (a < b)
 swap(a++, --b);
}

int compress(char *chars, int charsSize)
{
 // 返回压缩字符串长度
 int write = 0, left = 0;
 for (int read = 0; read < charsSize; read++) // 遍历字符数组 chars
 {
 if (read == charsSize - 1 || chars[read] != chars[read + 1])
 {
 // read位于字符串末尾或所指字符不同于下一个字符
 chars[write++] = chars[read];
 int num = read - left + 1; // 记录子串长度
 if (num > 1) // 子串长度大于1
 {
 int anchor = write;
 while (num > 0) // 数字转化为字符串倒序写入原字符串
 }
 chars[write++] = num % 10 + '0';
 num / = 10;
 }
 reverse(&chars[anchor], &chars[write]); // 反转
 }
 left = read + 1; // left移到下一组字符的起始位置
}

return write;
}

##### 【算法分析】

算法只需要遍历输入字符串一次，时间复杂度为  $ O(n) $；由于只需要常数个变量空间保存若干变量，因此空间复杂度为  $ O(1) $。

## 4.8 小结

本章介绍了3种数据结构：串、数组和广义表，主要内容如下。

（1）串是内容受限的线性表，它限定了表中的元素为字符。串有两种基本存储结构，即顺序存储和链式存储，但多采用顺序存储结构。串的常用算法是模式匹配算法，主要有BF算法和KMP算法。BF算法实现简单，但存在回溯，效率低，时间复杂度为 $ O(m \times n) $；KMP算法对BF算法进行了改进，消除了回溯，提高了效率，时间复杂度为 $ O(m+n) $。

（2）多维数组可以看成线性表的推广，其特点是结构中的元素本身可以是具有某种结构的数据，但属于同一数据类型。一个n维数组实质上是n个线性表的组合，其每一维都是一个线性表。数组一般采用顺序存储结构，故存储多维数组时，应先将其确定转换为一维结构，转换方式有按“行”转换和按“列”转换两种。科学与工程计算中的矩阵通常用二维数组来表示，为了节省存储空间，对于几种常见形式的特殊矩阵等，比如对称矩阵、三角矩阵和对角矩阵，在存储时可进行压缩存储，即为多个值相同的元只分配一个存储空间，对零元不分配空间。

（3）广义表是另外一种线性表的推广形式，表中的元素可以是称为原子的单个元素，也可以是子表，所以线性表可以看成广义表的特例。广义表的结构相当灵活，在某种前提下，它可以兼容线性表、数组、树和有向图等各种常用的数据结构。广义表的常用操作有取表头和取表尾。广义表通常采用链式存储结构，包括头尾链表的存储结构和扩展线性链表的存储结构。

学习完本章后，读者应掌握串的存储方法，理解串的两种模式匹配算法——BF算法和KMP算法，明确数组和广义表这两种数据结构的特点，掌握数组存储时地址的计算方法，掌握几种特殊矩阵的压缩存储方法，了解广义表的两种链式存储结构。

### 习题

1. 选择题

（1）串是一种特殊的线性表，其特殊性体现在（）。

A. 可以采用顺序存储

B. 数据元素是单个字符

C. 可以采用链式存储

D. 数据元素可以是多个字符

（2）下列关于串的叙述中，不正确的是（）。

A. 串是字符的有限序列

B. 空串是由空格构成的串

C. 模式匹配是串的一种重要运算

D. 串既可以采用顺序存储，也可以采用链式存储

（3）串 "ababaababaa" 的 next 数组为（）。

A. 012345678999 B. 012121111212 C. 011234223456 D. 0123012322345

（4）串 "ababaabab" 的 nextval 为（）。

A. 010104101 B. 010102101 C. 010100011 D. 010101011

（5）串的长度是指（）。

A. 串中所含不同字母的个数 B. 串中所含字符的个数

C．串中所含不同字符的个数 D．串中所含非空格字符的个数

（6）假设以行序为主序存储二维数组 A[1..100,1..100]，设每个数据元素占 2 个存储单元，基

地址为10，则 $ \mathrm{LOC}[5,5]= $（）。

A. 808 B. 818 C. 1010 D. 1020

（7）设有数组  $ A[i,j] $，数组的每个元素长度为 3 字节，i 的值为 1～8，j 的值为 1～10，数组从内存首地址 BA 开始顺序存储，当以列序为主序存储时，元素 A[5,8] 的存储首地址为（）。

A. BA+141 B. BA+180 C. BA+222 D. BA+225

（8）设有一个10阶的对称矩阵A，采用压缩存储方式，以行序为主序存储， $ a_{11} $ 为第一元素，其存储地址为1，每个元素占一个地址空间，则 $ a_{85} $ 的地址为（）。

A. 13 B. 32 C. 33 D. 40

（9）若对 n 阶对称矩阵 A 以行序为主序方式将其下三角形的元素（包括主对角线上所有元素）依次存放于一维数组  $ B[1\ldots(n(n+1))/2] $ 中，则在 B 中确定  $ a_{ij} $（i<j）的位置 k 的关系为（）。

A.  $ i \times (i-1)/2 + j $ B.  $ j \times (j-1)/2 + i $ C.  $ i \times (i+1)/2 + j $ D.  $ j \times (j+1)/2 + i $

（10）二维数组A的每个元素是由10个字符组成的串，其行下标i=0,1, $ \cdots $,8，列下标j=1,2, $ \cdots $,10。若A以行序为主序存储，元素A[8,5]的起始地址与当A以列序为主序存储时的元素（）的起始地址相同。设每个字符占一个字节。

A. A[8.5] B. A[3.10] C. A[5.8] D. A[0.91]

（11）设二维数组  $ A[1..m,1..n] $ （m 行 n 列）以行序为主序存储在数组  $ B[1..m\times n] $ 中，则二维数组元素  $ A[i,j] $ 在一维数组 B 中的下标为（）。

A.  $ (i-1)\times n+j $ B.  $ (i-1)\times n+j-1 $ C.  $ i\times(j-1) $ D.  $ j\times m+i-1 $

（12）数组 A[0..4, -1..-3, 5..7] 中含有元素的个数为（）。

A. 55 B. 45 C. 36 D. 16

（13）广义表  $ A=(a,b,(c,d),(e,(f,g))) $，则 Head(Tail(Head(Tail(Tail(A))))) 的值为（）。

A. (g) B. (d) C. c D. d

（14）广义表((a, b, c, d))的表头是( ), 表尾是( )。

A. a B. () C.  $ (a, b, c, d) $ D.  $ (b, c, d) $

（15）设广义表  $ L=((a,b,c)) $，则 L 的长度和深度分别为（）。

A. 1 和 1 B. 1 和 3 C. 1 和 2 D. 2 和 3

## 2. 应用题

（1）已知模式串  $ t= $ "abcaabbabcab"，写出用 KMP 法求得的每个字符对应的 next 和 nextval 数值。

（2）设目标为  $ t = \text{abcaabbabcabaacbacba} $，模式为  $ p = \text{abcabaa} $。

① 计算模式 p 的 nextval 函数值；

②画出利用 KMP 算法进行模式匹配时每一趟的匹配过程。

（3）数组 A 中，每个元素 A[i,j] 的长度均为 32 个二进制位，行下标从 -1～9，列下标从 1～11，从首地址 S 开始连续存放在主存储器中，主存储器字长为 16 位。求：

①存放该数组所需多少单元？

②存放数组第4列所有元素至少需多少单元？

③数组以行序为主序存储时，元素A[7,4]的起始地址是多少？

④数组以列序为主序存储时，元素 A[4,7] 的起始地址是多少？

（4）请将香蕉（banana）用工具H( )—Head( )、T( )—Tail( )从L中取出。

L = (apple, (orange, (strawberry, (banana)), peach), pear)

## 3. 算法设计题

（1）设计一个算法统计在输入字符串中各个不同字符出现的频度并将结果存入文件（字符串中的合法字符为 A～Z 这 26 个字母和 0～9 这 10 个数字）。

（2）设计一个递归算法来实现字符串逆序存储，要求不另设串存储空间。

（3）设计算法，实现下面函数的功能。函数 void insert(char* s, char* t, int pos) 将字符串 t 插入到字符串 s 中，插入位置为 pos。假设分配给字符串 s 的空间足够让字符串 t 插入。（说明：不得使用任何库函数）

（4）已知字符串 s1 中存放一段英文，设计算法 format(s1, s2, s3, n)，要求将 s1 按给定的长度 n 格式化成两端对齐的字符串存储在 s2 中（即确保 s2 长度为 n 且首尾字符不得为空格），s1 多余的字符存储在字符串 s3 中。

（5）设二维数组  $ a[1\ldots m, 1\ldots n] $ 含有  $ m \times n $ 个整数。

①设计一个算法判断 a 中所有元素是否互不相同，输出相关信息（yes/no）。

②试分析算法的时间复杂度。

（6）设任意 n 个整数存放于数组  $ A[1\ldots n] $ 中，试设计算法，将所有正数排在所有负数前面（要求：算法时间复杂度为  $ O(n) $）。
