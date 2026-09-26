# 第4章 串、数组和广义表

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


计算机上的非数值处理的对象大部分是字符串数据，字符串一般简称为串。串是一种特殊的线性表，其特殊性体现在数据元素是一个字符，也就是说，串是一种内容受限的线性表。由于现今使用的计算机硬件结构是面向数值计算的需要而设计的，在处理字符串数据时比处理整数和浮点数要复杂得多。而且，在不同类型的应用中，所处理的字符串具有不同的特点，要有效地实现字符串的处理，就必须根据具体情况使用合适的存储结构。本章的第一部分主要讨论串的定义、存储结构和基本操作，重点讨论串的模式匹配算法。

本章后两部分讨论的数组和广义表，可以被看成线性表的一种扩充，即线性表的数据元素自身又是一个数据结构。高级语言都支持数组，但高级语言的教材通常重点介绍数组的使用方法，而本章重点介绍数组的内部实现，并介绍如何实现一些特殊二维数组的压缩存储。最后介绍广义表的基本概念和存储结构。

## 4.1 串的定义

串或字符串（string）是由零个或多个字符组成的有限序列，一般记为

 $$ s=a_{1}a_{2}\cdots a_{n}\quad(n\geqslant0) $$

其中，s 是串的名，用双引号标识的字符序列是串的值； $ a_i $ ( $ 1 \leq i \leq n $) 可以是字母、数字或其他字符；串中字符的数目 n 称为串的长度。零个字符的串称为空串（null string），其长度为 0。

串中任意个连续的字符组成的子序列称为该串的子串，包含子串的串相应地称为主串。通常称字符在序列中的序号为该字符在串中的位置。子串在主串中的位置则以子串的第一个字符在主串中的位置来表示。

例如，假设a、b、c、d为如下的4个串：

 $$ a=“BEI”,b=“JING” $$

 $$ c=BEIJING\text{},\ d=BEIJING $$

则它们的长度分别为3、4、7和8；并且a和b都是c和d的子串，a在c和d中的位置都是1，而b在c中的位置是4，在d中的位置则是5。

当且仅当两个串的值相等，称这两个串是相等的。也就是说，只有当两个串的长度相等，并且各个对应位置的字符都相等时两个串才相等。例如，上例中的串 a、b、c 和 d 彼此都不相等。

在各种应用中，空格常常是串的字符集合中的一个元素，因而可以出现在其他字符中间。由一个或多个空格组成的串“”称为空格串（blank string，请注意：此处不是空串），其长度为串中空格字符的个数。为清楚起见，以后我们用符号“O”来表示“空串”。

## 4.2 案例引入

字符串在实际中有极为广泛的应用，在文字编辑、信息检索、语言编译等软件系统中，字符串均是重要的操作对象；在网络入侵检测、计算机病毒特征码匹配以及 DNA 序列匹配等应用中，都需要进行串匹配（也称模式匹配）。

### 案例4.1：植物双生病毒感染检测。

植物双生病毒是一种全球范围内广泛存在的 DNA 病毒，对众多植物构成了严重的威胁，不仅威胁着粮食安全，也影响生态系统的稳定性。在倡导生态文明和绿色可持续发展的今天，植物病毒的防控及其科学研究显得尤为关键。随着技术的发展，研究人员不断从苹果、桑树等多种多年生树种中检测到新的双生病毒，并将其命名为苹果双生病毒（AGV）和桑花叶萎缩相关病毒（MMDAV），这些发现进一步凸显了植物病毒防控的重要性。

为了有效地对这些病毒进行监测和防控，研究者深入分析了植物双生病毒的 DNA 结构，发现它们的 DNA 序列均为环状。这一特性为病毒的检测带来了新的挑战。现在研究者已收集了大量的病毒 DNA 和植物 DNA 数据，想快速检测出这些植物是否感染了相应的病毒。为了便于研究，研究者将病毒 DNA 序列以及植物 DNA 序列转换成由特定字母组成的字符串，然后检测某种病毒 DNA 序列是否在植物 DNA 序列中出现过。如果出现过，则此植物感染了该病毒，否则没有感染。例如，假设病毒的 DNA 序列为 baa，植物 1 的 DNA 序列为 aaabbba，则感染，植物 2 的 DNA 序列为 babbba，则未感染。（注意：植物的 DNA 序列是线性的，而病毒的 DNA 序列是环状的。）

为简化案例的实现过程，假设研究者将待检测的数据保存在一个文本文件中，文件格式和内容规定如下（图4.1截取了部分数据）。

文件有 num+1 行，第一行有一个整数 num，表示有 num 个待检测的任务（num ≤ 300）。

接下来每行  $ i $（ $ 2 \leq i \leq num+1 $）对应一个任务，每行有两个数据，用空格分隔，第一个数据表示病毒的 DNA 序列（length  $ \leq 6000 $），第二个数据表示植物的 DNA 序列（length  $ \leq 10000 $）。

要求将检测结果输出到文件中，文件中包括 num 行，每行有 3 个数据，用空格分隔，前两个数据分别表示输入文件中对应病毒的 DNA 序列、植物的 DNA 序列，如果该植物感染了对应的病毒，该行第三个数据则为 “YES”，否则为 “NO”。图 4.1 数据对应的输出结果如图 4.2 所示。

<div style="text-align: center;"><div style="text-align: center;">图4.1 病毒感染检测输入数据（部分）</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图4.2 病毒感染检测输出结果（部分）</div> </div>

这个案例中要处理的操作对象便是字符串，将病毒的 DNA 序列看作子串，将被检测植物的 DNA 序列看作主串，检测任务的实质就是看子串是否在主串中出现过，即 4.3.3 小节讨论的字符串的模式匹配算法。但因为此案例中病毒的 DNA 序列是环状的，这样需要对传统模式匹配算法进行改进。案例的具体分析与实现将在 4.6 节给出。

### 4.3.1 串的抽象类型定义

串的逻辑结构和线性表极为相似，区别仅在于串的数据对象约束为字符集。然而，串的基本操作和线性表有很大差别。在线性表的基本操作中，大多以“单个元素”作为操作对象，例如，在线性表中查找某个元素，求取某个元素，在某个位置上插入一个元素或删除一个元素等；而在串的基本操作中，通常以“串整体”作为操作对象，例如，在串中查找某个子串，求取一个子串，在串的某个位置上插入一个子串，以及删除一个子串等。

串的抽象数据类型的定义如下：

ADT String{
 数据对象：D={ai|ai∈CharacterSet,i=1,2,…,n,n≥0}
 数据关系：R1={<ai-1,ai>|ai-1,ai∈D,i=2,…,n}
 基本操作：
 StrAssign(&T,chars)
 初始条件：chars是字符串常量。
 操作结果：生成一个其值等于chars的串T。
 StrCopy(&T,S)
 初始条件：串S存在。
 操作结果：由串S复制得串T。
 StrEmpty(S)
 初始条件：串S存在。
 操作结果：若S为空串，则返回true，否则返回false。
 StrCompare(S,T)
 初始条件：串S和T存在。
 操作结果：若S>T，则返回值>0；若S=T，则返回值=0；若S<T，则返回值<0。
 StrLength(S)
 初始条件：串S存在。
 操作结果：返回S的元素个数，称为串的长度。
 ClearString(&S)
 初始条件：串S存在。
 操作结果：将S清为空串。
 Concat(&T,S1,S2)
 初始条件：串S1和S2存在。
 操作结果：用T返回由S1和S2连接而成的新串。
 SubString(&Sub,S,pos,len)
 初始条件：串S存在，1≤pos≤StrLength(S)且0≤len≤StrLength(S)-pos+1。
 操作结果：用Sub返回串S的第pos个字符起长度为len的子串。
 Index(S,T,pos)
 初始条件：串S和T存在，T是非空串，1≤pos≤StrLength(S)。
 操作结果：若主串S中存在和串T值相同的子串，则返回它在主串S中第pos个字符之后第一次出现的位置；否则函数值为0。

Replace(&S,T,V)

初始条件：串S，T和V存在，T是非空串。

操作结果：用V替换主串S中出现的所有与T相等的不重叠的子串。

StrInsert(&S,pos,T)

初始条件：串S和T存在， $ 1 \leq \text{pos} \leq \text{StrLength}(S) + 1 $。

操作结果：在串S的第pos个字符之前插入串T。

StrDelete(&S,pos,len)

初始条件：串S存在， $ 1 \leq \text{pos} \leq \text{StrLength}(S) - \text{len} + 1 $。

操作结果：从串S中删除第pos个字符起长度为len的子串。

DestroyString(&S)

初始条件：串S存在。

操作结果：串S被销毁。

#### }ADT String

对于串的基本操作集可以有不同的定义方法，读者在使用高级程序设计语言中的串类型时，应以相应语言的参考手册为准。

#### 4.3.2 串的存储结构

与线性表类似，串也有两种基本存储结构：顺序存储和链式存储。但考虑到存储效率和算法的方便性，串多采用顺序存储结构。

## 1. 串的顺序存储

采用顺序存储结构存储的串称为顺序串，类似于线性表的顺序存储结构，用一组地址连续的存储单元存储串值的字符序列。按照预定义的大小，为每个定义的串变量分配一个固定长度的存储区，则可用定长数组描述如下：

// - - - - 串的定长顺序存储结构 - - - - -
#define MAXLEN 255 // 串的最大长度
typedef struct{
 char ch[MAXLEN+1]; // 存储串的一维数组
 int length; // 串的当前长度
} SString;

其中，MAXLEN 表示串的最大长度，ch 是存储字符串的一维数组，每个分量存储一个字符，length 表示字符串的当前长度。为了便于说明问题，本章后面算法描述当中所用到的顺序存储的字符串都是从下标为 1 的数组分量开始存储的，下标为 0 的分量闲置不用。

这种定义方式是静态的，在编译时刻就确定了串空间的大小。而多数情况下，串的操作是以串的整体形式参与的，串变量之间的长度相差较大，在操作中串值长度的变化也较大，这样为串变量设定固定大小的空间不尽合理。因此最好是根据实际需要，在程序执行过程中动态地分配和释放字符数组空间。在 C 语言中，存在一个称之为 “堆”（Heap）的自由存储区，可以为每个新产生的串动态分配一块实际串长所需的存储空间，若分配成功，则返回一个指向起始地址的指针，作为串的基址，同时为了以后处理方便，约定串长也作为存储结构的一部分。这种字符串的存储方式也称为串的堆式顺序存储结构，定义如下：

// - - - - 串的堆式顺序存储结构 - - - - -
typedef struct{
 char *ch; // 若是非空串，则按串长分配存储区，否则 ch 为 NULL
 int length; // 串的当前长度
} HString;

## 2. 串的链式存储

顺序串的插入和删除操作不方便，需要移动大量的字符。因此，可采用单链表方式存储串。采用链式存储结构存储的串称为链串。由于串结构的特殊性——结构中的每个数据元素是一个字符，则在用链表存储串值时，存在一个“结点大小”的问题，即每个结点可以存放一个字符，也可以存放多个字符。例如，图4.3（a）所示为结点大小为4（每个结点存放4个字符）的链表，图4.3（b）所示为结点大小为1的链表。当结点大小大于1时，由于串长不一定是结点大小的整倍数，则链表中的最后一个结点不一定被串值占满，此时通常补上“#”或其他的非串值字符（通常“#”不属于串的字符集，是一个特殊的符号）。

<div style="text-align: center;"><div style="text-align: center;">(a) 结点大小为4的链表</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 结点大小为1的链表</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图4.3 串值的链表存储方式</div> </div>

为了便于进行串的操作，当以链表存储串值时，除头指针外，还可假设一个尾指针指示链表中的最后一个结点，并给出当前串的长度。称如此定义的串存储结构为块链结构，说明如下：

// - - - - - 串的链式存储结构 - - - - -
#define CHUNKSIZE 80 // 可由用户定义的块大小
typedef struct Chunk{
 char ch[CHUNKSIZE];
 struct Chunk *next;
}Chunk;
typedef struct{
 Chunk *head, *tail; // 串的头和尾指针
 int length; // 串的当前长度
}LString;

在链式存储方式中，结点大小的选择直接影响着串处理的效率。在各种串的处理系统中，所处理的串往往很长或很多，如一本书的几百万个字符、情报资料的成千上万个条目，这就要求考虑串值的存储密度。

显然，存储密度小（如结点大小为1时），运算处理方便，然而，存储占用量大。如果在串处理过程中需进行内、外存交换的话，则会因为内、外存交换操作过多而影响处理的总效率。应该看到，串的字符集的大小也是一个重要因素。一般来说，字符集小，则字符的机内编码就短，这也影响串值存储方式的选取。

串值的链式存储结构对某些串操作，如连接操作等，有一定方便之处，但总的来说，不如顺序存储结构灵活，它占用存储量大且操作复杂。此外，在串值的链式存储结构中，串操作的实现和线性表在链表存储结构中的操作类似，故在此不进行详细讨论。4.3.3 小节的模式匹配算法是采用串的定长顺序存储结构实现的。

### 4.3.3 串的模式匹配算法

子串的定位运算通常称为串的模式匹配或串匹配。此运算的应用非常广泛，比如在搜索引擎、拼写检查、语言翻译、数据压缩等应用中，都需要进行串匹配。

设有两个字符串 S 和 T，设 S 为主串，也称正文串；设 T 为子串，也称为模式。在主串 S 中查找与模式 T 相匹配的子串，如果匹配成功，确定相匹配的子串中的第一个字符在主串 S 中出现的位置。

著名的模式匹配算法有 BF 算法和 KMP 算法，下面详细介绍这两种算法。

## 1. BF 算法

最简单直观的模式匹配算法是 BF（Brute-Force）算法，也称串匹配的朴素算法或者简单匹配算法。该算法通过穷举主串 S 的所有模式 T，来判断是否与主串 S 匹配。模式匹配不一定是从主串的第一个位置开始，可以指定主串中查找的起始位置 pos。基本思路是从主串 S 的查找起始位置 pos 开始的第一个字符开始和模式 T 中的第一个字符比较，若相等则继续比较下一个字符，若不相等，则从主串的下一个字符开始重新和模式 T 中的第一个字符比较。以此类推，如果模式 T 比较完毕，则说明匹配成功，此时返回模式 T 第一个字符在主串 S 中出现的位置，否则说明匹配失败，返回 0。

### 算法4.1 BF算法

如果采用字符串顺序存储结构，可以写出不依赖于其他串操作的匹配算法。

#### 【算法步骤】

① 分别利用计数指针 i 和 j 指示主串 S 和模式 T 中当前正待比较的字符位置，i 初值为 pos，j 初值为 1。

② 如果两个串均未比较到串尾，即 i 和 j 均分别小于等于 S 和 T 的长度时，则循环执行以下操作：

BF算法

S.ch[i] 和 T.ch[j] 比较，若相等，则 i 和 j 分别指示串中下个位置，继续比较后续字符；

若不相等，指针后退重新开始匹配，从主串的下一个字符 $ (i=i-j+2) $起再重新和模式的第一个字符 $ (j=1) $比较。

③ 如果 j > T.length，说明模式 T 中的每个字符依次和主串 S 中的一个连续的字符序列相等，则匹配成功，返回和模式 T 中第一个字符相等的字符在主串 S 中的序号（i - T.length）；否则称匹配不成功，返回 0。

【例 4.1】 假设主串 S = “abaabaabcde”，模式 T = “abaabc”，主串中查找的起始位置 pos 从 1 开始，用 BF 算法求模式 T 在主串 S 中的位置。过程如图 4.4 所示。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="4">第一趟</td><td style='text-align: center; word-wrap: break-word;'>i</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>11</td><td rowspan="4">6次比较</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>e</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>T</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>j</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td rowspan="4">第二趟</td><td style='text-align: center; word-wrap: break-word;'>i</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>11</td><td rowspan="4">1次比较</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>e</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>T</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>j</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td rowspan="4">第三趟</td><td style='text-align: center; word-wrap: break-word;'>i</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>11</td><td rowspan="4">2次比较</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>e</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>T</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>j</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td rowspan="4">第四趟</td><td style='text-align: center; word-wrap: break-word;'>i</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>11</td><td rowspan="4">6次比较匹配成功</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>e</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>T</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>j</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图4.4 BF算法的匹配过程</div> </div>

（1）第一趟匹配：从 S 和 T 的第一个字符开始，i=1,j=1，比较两个字符是否相等，如果相等，则 i 和 j 分别指向串中下一个位置，即  $ i++ $,  $ j++ $。第六次比较出现不相等的情况，转向下一步，即第二趟匹配，此时 i=6, j=6。

（2）第二趟匹配：i回溯到主串的下一个字符，即 $ i-j+2 $的位置2，j回溯到位置1，i从S的第二个字符开始，j从T的第一个字符开始，比较两个字符是否相等。第一次比较即出现不相等的情况，转向下一步，即第三趟匹配，此时i=2，j=1。

（3）第三趟匹配：和第二趟匹配类似，i回溯到 $ i=i-j+2 $的位置3，j回溯到位置1，第一次比较相等， $ i++ $， $ j++ $。第二次比较不相等，转向下一步，即第四趟匹配，此时i=4，j=2。

（4）第四趟匹配：和第二趟匹配类似，i回溯到位置4，j回溯到位置1，前五次比较均相等， $ i^{++} $， $ j^{++} $。经过六次比较，此时模式T比较完毕。

（5）模式 T 比较完毕，返回 T 在 S 中第一个字符出现的位置，即 i - T.length = 4。

【算法描述】

int Index_BF(String S, String T, int pos)
{
 // 返回模式T在主串S中第pos个字符开始第一次出现的位置。若不存在，则返回0

 // 其中，T非空， $ 1 \leq pos \leq S $.length

 i = pos; j = 1;
 while (i ≤ S.length && j ≤ T.length) {
 // 初始化
 // 两个串均未比较到串尾
 }

 if (S.ch[i] == T.ch[j]) {
 // 继续比较后继字符
 else {
 i = i - j + 2;
 j = 1;
 // 指针后退，重新开始匹配
 }

 if (j > T.length) return i - T.length;
 // 匹配成功
 else return 0;
 }
}

##### 【算法分析】

BF 算法的匹配过程易于理解，且在某些应用场合效率也较高。在匹配成功的情况下，考虑以下两种极端情况。

（1）最好情况下，每趟不成功的匹配都发生在模式串的第一个字符与主串中相应字符的比较。

例如：

S="aaaaaba"
T="ba"

设主串的长度为 n，子串的长度为 m，假设从主串的第 i 个位置开始与模式串匹配成功，则在前 i-1 趟匹配中字符总共比较了 i-1 次；若第 i 趟匹配成功的字符比较次数为 m，则总比较次数为  $ i-1+m $。对于成功匹配的主串，其起始位置由 1 到  $ n-m+1 $，假定在这  $ n-m+1 $ 个起始位置上匹配成功的概率相等，则最好情况下，匹配成功的平均比较次数为：

 $$ \sum_{i=1}^{n-m+1}p_{i}(i-1+m)=\frac{1}{n-m+1}\sum_{i=1}^{n-m+1}i-1+m=\frac{1}{2}(n+m) $$

即最好情况下的平均时间复杂度是  $ O(n+m) $。

（2）最坏情况下，每趟不成功的匹配都发生在模式串的最后一个字符与主串中相应字符的比较。

例如：

S="aaaaaaab"
T="aab"

假设从主串的第i个位置开始与模式串匹配成功，则在前i-1趟匹配中字符总共比较了 $ (i-1)\times m $次；若第i趟匹配成功的字符比较次数为m，则总比较次数为 $ i\times m $。因此最坏情况下匹配成功的平均比较次数为：

 $$ \sum_{i=1}^{n-m+1}p_{i}\left(i\times m\right)=\frac{1}{n-m+1}\sum_{i=1}^{n-m+1}i\times m=\frac{1}{2}m\times(n-m+2) $$

即最坏情况下的平均时间复杂度是  $ O(n \times m) $。

BF 算法思路直观简明。但当匹配失败时，主串的指针 i 总是回溯到  $ i-j+2 $ 位置，模式串的指针总是回溯到首字符位置 j=1，因此，算法时间复杂度高。下面将介绍另一种改进的模式匹配算法。

## 2. KMP 算法

这种改进算法是由克努特（Knuth）、莫里斯（Morris）和普拉特（Pratt）共同设计实现的，因此简称为KMP算法。此算法可以在较大程度上避免重复遍历的情况，能够在 $ O(n+m) $的时间数量级上完成串的模式匹配操作。其改进在于：主串的指针 $ i $不回溯，直接从匹配失败的位置 $ i $开始，继续向右“滑动”，虽然模式的指针 $ j $需要回溯，但不必回溯到开头处，而是使其尽可能向右“滑动”。

基于上述改进思路，若要理解KMP算法，首先需要理解以下两个问题。

（1）主串的指针i为什么可以不回溯？

（2）模式的指针 j 既然需要回溯，应该回溯到什么位置？

首先通过一个例子来理解第一个问题。

假设主串 S= “abcdefghi”，模式 T= “abcdx”，二者的前 4 个字符完全相等，直到第 5 个字符对应的 “e” 和 “x” 不相等。如果利用前面的 BF 算法，则有如图 4.5 所示的匹配过程。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="4">第一趟</td><td style='text-align: center; word-wrap: break-word;'>i</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td rowspan="4">5次比较</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>e</td><td style='text-align: center; word-wrap: break-word;'>f</td><td style='text-align: center; word-wrap: break-word;'>g</td><td style='text-align: center; word-wrap: break-word;'>h</td><td style='text-align: center; word-wrap: break-word;'>i</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>T</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>j</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td rowspan="4">第二趟</td><td style='text-align: center; word-wrap: break-word;'>i</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td rowspan="4">1次比较</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>e</td><td style='text-align: center; word-wrap: break-word;'>f</td><td style='text-align: center; word-wrap: break-word;'>g</td><td style='text-align: center; word-wrap: break-word;'>h</td><td style='text-align: center; word-wrap: break-word;'>i</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>T</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>j</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td rowspan="4">第三趟</td><td style='text-align: center; word-wrap: break-word;'>i</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td rowspan="4">1次比较</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>e</td><td style='text-align: center; word-wrap: break-word;'>f</td><td style='text-align: center; word-wrap: break-word;'>g</td><td style='text-align: center; word-wrap: break-word;'>h</td><td style='text-align: center; word-wrap: break-word;'>i</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>T</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>j</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td rowspan="4">第四趟</td><td style='text-align: center; word-wrap: break-word;'>i</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td rowspan="4">1次比较</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>e</td><td style='text-align: center; word-wrap: break-word;'>f</td><td style='text-align: center; word-wrap: break-word;'>g</td><td style='text-align: center; word-wrap: break-word;'>h</td><td style='text-align: center; word-wrap: break-word;'>i</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>T</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>j</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td rowspan="4">第五趟</td><td style='text-align: center; word-wrap: break-word;'>i</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td rowspan="4">1次比较匹配失败</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S</td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>e</td><td style='text-align: center; word-wrap: break-word;'>f</td><td style='text-align: center; word-wrap: break-word;'>g</td><td style='text-align: center; word-wrap: break-word;'>h</td><td style='text-align: center; word-wrap: break-word;'>i</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>T</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>a</td><td style='text-align: center; word-wrap: break-word;'>b</td><td style='text-align: center; word-wrap: break-word;'>c</td><td style='text-align: center; word-wrap: break-word;'>d</td><td style='text-align: center; word-wrap: break-word;'>x</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>j</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>5</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图4.5 BF算法的匹配过程</div> </div>

当主串 S 的 i 取  $ 2 \sim 5 $ 时，首字符与模式 T 中的首字符均不相等，模式 T 中的首字符 “a” 与其后面的子串 “bcdx” 任意一个字符也均不相等。也就是说，既然模式 T 中的首字符 “a” 与自身后面子串的中任何一个字符不等，由图 4.5 所示的第一趟可知，主串 S 和模式 T 的前 4 个字符分

别相等，即意味着模式 T 的首字符 “a” 不可能与主串 S 的第 2~4 位的字符相等，由此可以断定，图 4.5 所示的第二、三、四趟的判断均是多余的。

模式 T 的首字符 “a” 与其后面的子串任意一个字符均不相等，但如果后面的子串也包含 “a” 时，情况如何呢？在这种情况下，既然 KMP 算法的指针 i 不回溯，则要考虑模式 T 的指针 j 的变化了。下面通过回顾例 4.1 的匹配过程，分析指针 j 应该回溯到什么位置。

根据 BF 算法，例 4.1 在第一趟匹配后，当 i=6、j=6 指向的字符不等时，第二趟匹配时 i 回溯到 2，j 回溯到 1 后重新开始比较，其实，经仔细观察可发现，由于 i 指向的字符 “a” 前面的两个字符和模式 T 中的前两个字符相等，均为 “a” 和 “b”，如图 4.6 所示。因此 i 不必回溯，只需使 j 回溯到第 3 个位置继续比较即可，如图 4.7 所示。

<div style="text-align: center;"><div style="text-align: center;">图4.6 i前面的两个字符和模式T中的前两个字符相等</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图4.7 i不回溯，j从第3个字符开始比较</div> </div>

根据 KMP 算法的改进思想，例 4.1 中主串 S 和模式 T 进行匹配的过程如图 4.8 所示。

<div style="text-align: center;"><div style="text-align: center;">图4.8 KMP算法的匹配过程</div> </div>

在理解前面提出的第一个问题之后（即主串的指针 i 为什么可以不回溯？），下面讨论第二个问题，即模式的指针 j 应该回溯到什么位置？

在图 4.7 中，为什么可以让 j 回溯到第 3 个位置？因为 i 前面的两个字符和模式 T 中的前两个字符相等。虽然看起来这样的算法设计避免了冗余的比较次数，但如何知道 i 前面的两个字符和模式 T 中的前两个字符相等呢？实际上，如果 i 前面的两个字符和模式 T 中的前两个字符相等，则只需在模式 T 本身中比较即可。假设模式 T 中当前 j 所指向字符前的所有字符组成的串记为 T'（例如图 4.8 中第一趟匹配 j=6 时，T' = “abaab”），则只需比较 T' 的前缀和 T' 的后缀是否相等即可。

对于字符串T'，所谓前缀是指从字符串起始位置开始，连续取出的若干字符；后缀是指从字符串末尾开始，连续取出的若干字符。前缀和后缀不可以取字符串本身，如果串的长度为n，前缀和后缀的长度最多是n-1。

下面以 T′ = “abaab” 为例，分析如何判断 T′ 的前缀和后缀是否相等，并得到前后缀相等的最大长度  $ l_{max} $。

（1）前后缀长度为1时：前缀a，后缀b，不相等。

（2）前后缀长度为2时：前缀ab，后缀ab，相等。

（3）前后缀长度为3时：前缀aba，后缀aab，不相等。

（4）前后缀长度为4时：前缀abaa，后缀baab，不相等。

对于上述示例，前后缀相等时的最大长度为2。如果前后缀相等时的最大长度 $ l_{max} $为2，则j可以回溯到3的位置。

基于上述分析，可以归纳得出：当i和j指向的两个字符不相等时，如果T’的相等前后缀的最大长度为l_max，则i保持不变，j回溯到l_max+1的位置即可。

若使用 next[j] 表示 j 需要回溯到的位置， $ T' = "t_1t_2\cdots t_{j-1}" $，则 next[j] 的定义为：

根据式（4-1），可以得到模式串 T = “abaabc” 如下所示的 next 函数值：

根据式（4-1），可以得到模式串 T = abaabc。如下所示的 next 函数值
当 j=1 时，next[1]=0；
当 j=2 时，T′ = “a”，没有相等的前后缀，next[2]=1；
当 j=3 时，T′ = “ab”，没有相等的前后缀，next[3]=1；
当 j=4 时，T = “aba”，相等前后缀的最大长度为 1，next[4]=2；
当 j=5 时，T′ = “abaa”，相等前后缀的最大长度为 1，next[5]=2；
当 j=6 时，T′ = “abaab”，相等前后缀的最大长度为 2，next[6]=3。
故此，很容易求得 next 函数值，如图 4.9 所示。

<div style="text-align: center;"><div style="text-align: center;">图4.9 模式串的 next 函数值</div> </div>

以上求解 next 函数值的方法属于穷举法，比较直观，但由于穷举法固有的缺点，我们可以选择动态规划算法递归求解 next 的值。

现在讨论一般情况。假设主串为 "s₁s₂⋯sₙ"，模式串为 "t₁t₂⋯tₘ"，从上例的分析可知，为了实现改进算法，需要解决下述问题：当匹配过程中产生“失配"（sₖ≠tₖ）时，模式串可“向右滑动”的距离有多远，换句话说，当主串中第i个字符与模式中第j个字符“失配”（不等）时，主串中第i个字符（i指针不回溯）应与模式中哪个字符再比较？

假设此时应与模式中第 k（k < j）个字符继续比较，则模式中前 k-1 个字符的子串必须满足下列关系式（4-2），且不可能存在 k' > k 满足下列关系式（4-2）：

 $$ t_{1}t_{2}\cdots t_{k-1}=S_{i-k+1}S_{i-k+2}\cdots S_{i-1} $$

而已经得到的“部分匹配”的结果是：

 $$ t_{j-k+1}t_{j-k+2}\cdots t_{j-1}=s_{i-k+1}s_{i-k+2}\cdots s_{i-1} $$

由式（4-2）和式（4-3）推得下列等式：

 $$ t_{1}t_{2}\cdots t_{k-1}=t_{j-k+1}t_{j-k+2}\cdots t_{j-1} $$

反之，若模式串中存在满足式（4-4）的两个子串，则当匹配过程中，主串中第i个字符与模式中第j个字符不等时，仅需将模式向右滑动至模式中第k个字符和主串中第i个字符对齐。此时，模式中头k-1个字符的子串“ $ t_1t_2\cdots t_{k-1} $”必定与主串中第i个字符之前长度为k-1的子串

"S_{i-k+1}S_{i-k+2}\cdots S_{i-1)" 相等。由此，匹配仅需从模式中第 k 个字符与主串中第 i 个字符开始，依次向后进行比较。

若令  $  \text{next}[j] = k  $，则  $  \text{next}[j]  $ 表明当模式中第 j 个字符与主串中相应字符 “失配” 时，在模式中需重新和主串中该字符进行比较的字符的位置。由此可引出模式串的 next 函数的定义为：

 $$  next[j]=\left\{\begin{aligned}&0\quad j=1(t_{1} 与 s_{i} 不等时 , 下一步进行 t_{1} 与 s_{i+1} 的比较 )\\ &Max\left\{k|1<k<j 且有 \quad t_{1}t_{2}\cdots t_{k-1}=t_{j-k+1}t_{j-k+2}\cdots t_{j-1}\right\}\\ &1\quad k=1( 不存在相同子串 , 下一步进行 t_{1} 与 s_{i} 的比较 )\end{aligned}\right. $$

由此定义可推出模式串的 next 函数值，如图 4.10 所示。

<div style="text-align: center;"><div style="text-align: center;">图4.10 模式串的next函数值</div> </div>

在求得模式的 next 函数之后，匹配可按如下步骤进行。假设以指针 i 和 j 分别指示主串和模式中正待比较的字符，令 i 的初值为 pos，j 的初值为 1。若在匹配过程中  $ s_i = t_j $，则 i 和 j 分别增 1，否则，i 不变；而 j 退到 next  $ [j] $ 的位置再比较，若相等，则指针各自增 1，否则 j 再退到下一个 next 值的位置，依次类推。直至下列两种可能：一种是 j 退到某个 next 值（next [ next [ …next [ j] …]]）时字符相等，则指针各自增 1，继续进行匹配；另一种是 j 退到值为 0（模式的第一个字符“失配”），则此时需将模式继续向右滑动一个位置，即从主串的下一个字符  $ s_{i+1} $ 起和模式重新开始匹配。图 4.11 所示正是上述匹配过程的一个示例。

<div style="text-align: center;"><div style="text-align: center;">图4.11 利用模式的 next 函数进行匹配的过程示例</div> </div>

KMP 算法如算法 4.2 所示，它在形式上和算法 4.1 极为相似，不同之处仅在于：当匹配过程中产生“失配”时，指针 i 不变，指针 j 退回到 next [j] 所指示的位置上重新进行比较，并且当指针 j 退至 0 时，指针 i 和指针 j 需同时增 1。即若主串的第 i 个字符和模式的第 1 个字符不等，应从主串的第 i + 1 个字符起重新进行匹配。

KMP算法

### 【算法描述】

int Index_KMP(String S,String T,int pos)
{
 // 利用模式串T的next函数求T在主串S中第pos个字符之后的位置
 // 其中，T非空， $ 1 \leq \text{pos} \leq S $.length
 i=pos; j=1;
 while (i<=S.length && j<=T.length) {
 // 两个串均未比较到串尾
 {
 if (j==0 || S.ch[i]==T.ch[j]) {++i;++j;}
 else j=next[j];
 }
 if (j > T.length) return i-T.length;
 // 匹配成功
 else return 0;
 }

KMP 算法是在已知模式串的 next 函数值的基础上执行的，那么，如何求得模式串的 next 函数值呢？

从上述讨论可见，此函数值仅取决于模式串本身，而和相匹配的主串无关，可从分析其定义出发用递推的方法求得 next 函数值。

由定义得知：

 $$  next\left[1\right]=0 $$

设 $ next[j]=k $，这表明在模式串中存在下列关系：

 $$ \begin{array}{r l}{t_{1}t_{2}\cdots t_{k-1}}&{=~t_{j-k+1}t_{j-k+2}\cdots t_{j-1}}\end{array} $$

其中 k 为满足  $ 1 < k < j $ 的某个值，并且不可能存在  $ k' > k $ 满足式（4-8）。此时 next  $ [j + 1] $ 的值可能有以下两种情况。

（1）若  $ t_{k}=t_{j} $，则表明在模式串中：

 $$ \begin{array}{r l}{t_{1}t_{2}\cdots t_{k}}&{{}=t_{j-k+1}t_{j-k+2}\cdots t_{j}}\end{array} $$

并且不可能存在  $ k' > k $ 满足式（4-8），这就是说 next  $ [j+1] = k+1 $，即：

 $$  next[j+1]=next[j]+1 $$

（2）若  $ t_{k} \neq t_{j} $，则表明在模式串中：

 $$ \begin{array}{l} "t_{1}t_{2}\cdots t_{k}"\ne t_{j-k+1}t_{j-k+2}\cdots t_{j}"\end{array} $$

此时可把求 next 函数值的问题看成一个模式匹配的问题，整个模式串既是主串又是模式串，而当前在匹配的过程中，已有  $ t_{j-k+1} = t_1 $， $ t_{j-k+2} = t_2 $， $ \cdots $， $ t_{j-1} = t_{k-1} $，则当  $ t_j \ne t_k $ 时应将模式向右滑动至以模式中的第 next[k] 个字符和主串中的第 j 个字符相比较。若 next[k] = k'，且  $ t_j = t_k' $，则说明在主串中第  $ j+1 $ 个字符之前存在一个长度为  $ k' $（next[k]）的最长子串，和模式串中从首字符起长度为  $ k' $ 的子串相等，即：

 $$ \begin{array}{r l}{t_{1}t_{2}\cdots t_{k}\mathrm{~}}&{{}=u_{t_{j-k}+1}t_{j-k^{\prime}+2}\cdots t_{j}\mathrm{~}\quad(1<k^{\prime}<k<j)}\end{array} $$

这就是说next $ [j+1]=k'+1 $，即：

 $$  next\left[j+1\right]=next\left[k\right]+1 $$

同理，若  $ t_j \ne t_k $，则将模式继续向右滑动直至将模式中第 next[k'] 个字符和  $ t_j $ 对齐……依次类推，直至  $ t_j $ 和模式中某个字符匹配成功或者不存在任何  $ k'(1 < k' < j) $ 满足式（4-10），则：

 $$  next\left[j+1\right]=1 $$

例如，图4.12中的模式串，已求得前6个字符的 next 函数值，现求 next [7]，因为 next[6] = 3，又  $ t_6 \neq t_3 $，则需比较  $ t_6 $ 和  $ t_1 $（因为 next [3] = 1），这相当于将子串模式向右滑动。由于

$t_6 \ne t_1$，而且 next [1] = 0，所以 next [7] = 1，而因为 $t_7 = t_1$，则 next [8] = 2。

<div style="text-align: center;"><div style="text-align: center;">(a b a)</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图4.12 模式串的next函数值</div> </div>

根据上述分析所得结果即式（4-6）、式（4-9）、式（4-11）和式（4-12），仿照 KMP 算法，可得到求 next 函数值的算法，如算法 4.3 所示。

#### 算法 4.3 计算 next 函数值

【算法描述】

void get_next(String T,int next[])
{
 // 求模式串T的next函数值并将其存入数组next
 i=1;next[1]=0;j=0;
 while(i<T.length)
 {
 if(j==0∥T.ch[i]==T.ch[j])++i;++j;next[i]=j;
 else j=next[j];
 }
}

算法 4.3 的时间复杂度为  $ O(m) $。通常，模式串的长度 m 比主串的长度 n 要小得多，因此，对整个匹配算法来说，所增加的这点儿运算时间是值得的。

最后，要说明以下两点。

（1）虽然 BF 算法的时间复杂度是  $ O(n \times m) $，但在一般情况下，其实际的执行时间近似于  $ O(n + m) $，因此至今仍被采用。KMP 算法仅当模式与主串之间存在许多“部分匹配”的情况下，才显得比 BF 算法快得多。但是 KMP 算法的最大特点是指主串的指针不需回溯，整个匹配过程中，对主串仅需从头至尾查找一遍，这对处理从外设输入的庞大文件很有效，可以边读入边匹配，而无须回头重读。

（2）前面定义的 next 函数在某些情况下尚有缺陷。例如模式 "aaaab" 在和主串 "aaabaaaab" 匹配时，当  $ i = 4 $、 $ j = 4 $ 时 s.ch[4]  $ \neq $ t.ch[4]，由 next[j] 的指示还需进行  $ i = 4 $ 和  $ j = 3 $、 $ i = 4 $ 和  $ j = 2 $、 $ i = 4 $ 和  $ j = 1 $ 这 3 次比较。实际上，因为模式中第  $ 1 \sim 3 $ 个字符和第 4 个字符都相等，因此不需要再和主串中第 4 个字符相比较，而可以将模式连续向右滑动 4 个字符的位置直接进行  $ i = 5 $、 $ j = 1 $ 时的字符比较。这就是说，若按上述定义得到 next[j] = k，而模式中  $ t_j = k $，则当主串中字符  $ s_i $ 和  $ t_j $ 不等时，不需要再和  $ t_k $ 进行比较，而直接和  $ t_{next[k]} $ 进行比较，换句话说，此时的 next[j] 应和 next[k] 相同。由此可得，计算 next 函数修正值的算法如算法 4.4 所示，next 函数修正值的计算结果如图 4.13 所示。此时匹配算法不变。

<div style="text-align: center;"><div style="text-align: center;">图4.13 next函数修正值</div> </div>

##### 算法 4.4 计算 next 函数修正值

【算法描述】

void get_nextval(CString T,int nextval[])
{
 // 求模式串T的next函数修正值并将之存入数组nextval
 i=1;nextval[1]=0;j=0;
 while(i<T.length)
 {
 if(j==0‖T.ch[i]==T.ch[j])
 {
 ++i;++j;
 if(T.ch[i]!=T.ch[j]) nextval[i]=j;
 else nextval[i]=nextval[j];
 }
 else j=nextval[j];
 }
}

计算 next 函数修正值

### 4.4.1 数组的类型定义

数组是由类型相同的数据元素构成的有序集合，每个元素称为数组元素，每个元素受 $ n(n \geqslant 1) $个线性关系的约束，每个元素在n个线性关系中的序号 $ i_{1}, i_{2}, \cdots, i_{n} $称为该元素的下标，可以通过下标访问该数据元素。因为数组中每个元素处于 $ n(n \geqslant 1) $个关系中，故称该数组为n维数组。数组可以看成线性表的推广，其特点是结构中的元素本身可以是具有某种结构的数据，但属于同一数据类型。

例如，一维数组可以看成一个线性表，二维数组可以看成数据元素是线性表的线性表。图4.14（a）所示的二维数组可以看成一个线性表：

 $$ A_{m\times n}=\left[\begin{array}{c c c c c}a_{00}&a_{01}&a_{02}&\cdots&a_{0,n-1}\\ a_{10}&a_{11}&a_{12}&\cdots&a_{1,n-1}\\ \vdots&\vdots&\vdots&&\vdots\\ a_{m-1,0}&a_{m-1,1}&a_{m-1,2}&\cdots&a_{m-1,n-1}\end{array}\right]\quad,A_{m\times n}=\left[\left[\begin{array}{c}a_{00}\\ a_{10}\\ \vdots\\ a_{m-1,0}\end{array}\right]\left[\begin{array}{c}a_{01}\\ a_{11}\\ \vdots\\ a_{m-1,1}\end{array}\right]\cdots\left[\begin{array}{c}a_{0,n-1}\\ a_{1,n-1}\\ \vdots\\ a_{m-1,m-1}\end{array}\right]\right] $$

 $$ A_{m\times n}=((a_{00}a_{01}\cdots a_{0,n-1}),(a_{10}a_{11}\cdots a_{1,n-1}),\cdots,(a_{m-1,n}a_{m-1,1}\cdots a_{m-1,n-1})) $$

<div style="text-align: center;"><div style="text-align: center;">(c) 行向量的一维数组</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图4.14 二维数组图例</div> </div>

 $$ A=\left(a_{0},a_{1},\cdots,a_{p}\right)\qquad\left(p=m-1 或 n-1\right) $$

其中每个数据元素  $ a_{i} $ 是一个列向量形式的线性表（见图 4.14（b））：

 $$ a_{j}=\left(a_{0j},a_{1j},\cdots,a_{m-1,j}\right)\qquad0{\leqslant}j{\leqslant}n-1 $$

或者  $ a_{i} $ 是一个行向量形式的线性表（见图 4.14（c））：

 $$ a_{i}=\left(a_{i0},a_{i1},\cdots,a_{i,n-1}\right)\qquad0\leqslant i\leqslant m-1 $$

在 C 语言中，一个二维数组类型可以定义为其分量类型为一维数组类型的一维数组类型，也就是说，

typedef ElemType Array2[m][n];

等价于

typedef ElemType Array1[n];

typedef Array1 Array2[m];
同理，一个 n 维数组类型可以定义为其数据元素为 n-1 维数组类型的一维数组类型。
数组一旦被定义，它的维数和维界就不再改变。因此，除了结构的初始化和销毁之外，数组只有存取元素和修改元素值的操作。

抽象数据类型数组可定义为：

ADT Array{
 数据对象： $ j_i=0,\cdots,b_i-1,i=1,2,\cdots,n $,
 D = {a_{j_i j_2}\cdots j_i | n (>0) 称为数组的维数, b_i 是数组第 i 维的长度,
 j_i 是数组元素的第 i 维下标, a_{j_i j_2}\cdots j_i \in ElemSet}
 数据关系：R = {R1, R2\cdots, Rn}
 Ri = {<a_{j_i}\cdots j_i\cdots j_n, a_{j_i}\cdots j_i+1\cdots j_n > |}
 0 \leq j_k \leq b_k-1, 1 \leq k \leq n 且 k \neq i,
 0 \leq j_i \leq b_i-2,
 a_{j_i\cdots j_i-1}, a_{j_i\cdots j_i+1\cdots j_n} \in D i = 2 L n}
基本操作：
InitArray(&A, n, boundi, \cdots, boundn)
 操作结果：若维数 n 和各维长度合法，则构造相应的数组 A，并返回 OK。
DestroyArray(&A)
 操作结果：销毁数组 A。
Value (A, &e, index1, \cdots, indexn)
 初始条件：A 是 n 维数组，e 为元素变量，随后是 n 个下标值。
 操作结果：若各下标不越界，则 e 赋值为所指定的 A 的元素值，并返回 OK。
Assign (&A, e, index1, \cdots, indexn)
 初始条件：A 是 n 维数组，e 为元素变量，随后是 n 个下标值。
 操作结果：若下标不越界，则将 e 的值赋给所指定的 A 的元素，并返回 OK。
} ADT Array

#### 4.4.2 数组的顺序存储

由于对数组一般不进行插入或删除操作，也就是说，一旦建立了数组，则结构中的数据元素个数和元素之间的关系一般就不再发生变动，因此，采用顺序存储结构表示数组比较合适。

由于存储单元是一维的结构，而数组可能是多维的结构，则用一组连续存储单元存放数组的数据元素就有次序约定问题。例如图4.14（a）所示的二维数组可以看成如图4.14（b）所示的一维数组，也可看成如图4.14（c）所示的一维数组。对应地，对二维数组可有两种存储方式：一种是以列序为主序的存储方式，如图4.15（a）所示；一种是以行序为主序的存储方式，如图4.15（b）所示。在扩展Basic、Pascal、Java和C语言中，用的都是以行序为主序的存储结构；而在FORTRAN语言中，用的是以列序为主序的存储结构。

由此，对于数组，一旦规定了其维数和各维的长度，便可为它分配存储空间。反之，只要给出一组下标便可求得相应数组元素的存储位置。下面仅用以行序为主序的存储结构为例予以说明。

假设每个数据元素占 L 个存储单元，则二维数组 A[0..m-1,0..n-1]（下标从 0 开始，共有 m 行 n 列）中任一元素  $ a_{ij} $ 的存储位置可由下式确定：

 $$  LOC(i,j)=LOC(0,0)+(n\times i+j)L $$

其中，LOC $ (i, j) $ 是  $ a_{ij} $ 的存储位置；LOC $ (0, 0) $ 是  $ a_{00} $ 的存储位置，即二维数组 A 的起始存储位置，也称为基地址或基址。

<div style="text-align: center;"><div style="text-align: center;">(a) 以列序为主序</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）以行序为主序</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图4.15 二维数组的两种存储方式</div> </div>

将式（4-13）推广到一般情况，可得到 n 维数组  $ A[0..b_1-1,0..b_2-1,\cdots,0..b_n-1] $ 的数据元素存储位置的计算公式：

 $$ \begin{align*}\mathrm{LOC}(j_{1},j_{2},\cdots,j_{n})=&\mathrm{LOC}(0,0,\cdots,0)+(b_{2}\times\cdots\times b_{n}\times j_{1}+b_{3}\times\cdots\times b_{n}\times j_{2}+\cdots+b_{n}\times j_{n-1}+j_{n})L\\=&\mathrm{LOC}(0,0,\cdots,0)+\left(\sum_{i=1}^{n-1}j_{i}\prod_{k=i+1}^{n}b_{k}+j_{n}\right)L\end{align*} $$

可缩写成：

 $$  LOC(j_{1},j_{2},\cdots,j_{n})=LOC(0,0,\cdots,0)+\sum_{i=1}^{n}c_{i}j_{i} $$

其中， $ c_{n}=L, c_{i-1}=b_{i}\times c_{i}, 1<i\leq n $。

式（4-14）称为 n 维数组的映像函数。容易看出，数组元素的存储位置是其下标的线性函数，一旦确定了数组各维的长度， $ c_{i} $ 就是常数。由于计算各个元素存储位置的时间相等，所以存取数组中任一元素的时间也相等，即数组是一种随机存取结构。

#### 4.4.3 特殊矩阵的压缩存储

矩阵是很多科学与工程计算问题中研究的数学对象，矩阵用二维数组来表示是最自然的方法。但是，在数值分析中经常出现一些阶数很高的矩阵，同时在矩阵中有很多值相同的元素或者是零元素。有时为了节省存储空间，可以对这类矩阵进行压缩存储。所谓压缩存储，是指为多个值相同的元只分配一个存储空间，对零元不分配空间。

假若值相同的元素或者零元素在矩阵中的分布有一定规律，则称此类矩阵为特殊矩阵。特殊矩阵主要包括对称矩阵、三角矩阵和对角矩阵等，下面我们重点讨论这3种特殊矩阵的压缩存储。

## 1. 对称矩阵

若 n 阶矩阵 A 中的元满足下述性质：

 $$ a_{ij}=a_{ji}\quad1\leqslant i,j\leqslant n $$

则称为n阶对称矩阵。

对于对称矩阵，可以为每一对对称元分配一个存储空间，则可将  $ n^{2} $ 个元压缩存储到  $ n(n+1)/2 $ 个元的空间中，不失一般性，可以行序为主序存储其下三角（包括对角线）中的元。

假设以一维数组  $ sa[n(n+1)/2] $ 作为 n 阶对称矩阵 A 的存储结构，则  $ sa[k] $ 和矩阵元  $ a_{ij} $ 之间存在着一一对应的关系：

 $$ k=\left\{\begin{aligned}&\frac{i(i-1)}{2}+j-1&\quad&i\geqslant j\\ &\frac{j(j-1)}{2}+i-1&\quad&i<j\end{aligned}\right. $$

对于任意给定的一组下标 $ (i,j) $，均可在sa中找到矩阵元 $ a_{ij} $；反之，对所有的k=0,1,2, $ \cdots $， $ \frac{n(n+1)}{2}-1 $，都能确定sa[k]中的元在矩阵中的位置 $ (i,j) $。由此，称sa[n(n+1)/2]为n阶对称矩阵A的压缩存储（见图4.16）。

<div style="text-align: center;"><div style="text-align: center;">图4.16 对称矩阵的压缩存储</div> </div>

## 2. 三角矩阵

以对角线划分，三角矩阵有上三角矩阵和下三角矩阵两种。上三角矩阵是指矩阵下三角（不包括对角线）中的元均为常数 c 或 0 的 n 阶矩阵，下三角矩阵与之相反。对三角矩阵进行压缩存储时，除了和对称矩阵一样，只存储其上（下）三角中的元素之外，再加一个存储常数 c 的存储空间即可。

### （1）上三角矩阵

 $ s_{a}[k] $ 和矩阵元  $ a_{ij} $ 之间的对应关系为：

 $$ k=\left\{\begin{aligned}&\frac{(i-1)(2n-i+2)}{2}+(j-i)&\quad&i\leqslant j\\&\frac{n(n+1)}{2}&\quad&i>j\end{aligned}\right. $$

#### （2）下三角矩阵

 $ s_{a}[k] $ 和矩阵元  $ a_{ij} $ 之间的对应关系为：

 $$ k=\left\{\begin{aligned}&\frac{i(i-1)}{2}+j-1&\quad&i\geqslant j\\ &\frac{n(n+1)}{2}&\quad&i<j\end{aligned}\right. $$

## 3. 多对角线矩阵

多对角线矩阵所有的非零元都集中在以对角线为中心的带状区域中，即除了对角线上和直接在对角线上、下方若干条与对角线平行的线上的元之外，所有其他的元皆为零，如图4.17所示。

对这种矩阵，也可按某个原则（或以行为主，或以对角线的顺序）将其压缩存储到一维数组上。

<div style="text-align: center;"><div style="text-align: center;">(a) 一般情形</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 三对角矩阵</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图4.17 多对角线矩阵</div> </div>

在上述这些特殊矩阵中，非零元的分布都有明显的规律，从而可将其压缩存储到一维数组中，并找到每个非零元在一维数组中的对应关系。

然而，在实际应用中还经常会遇到另一类矩阵，其非零元较零元少，且分布没有一定规律，称之为稀疏矩阵。这类矩阵的压缩存储就要比特殊矩阵复杂，在此不进行讨论。
