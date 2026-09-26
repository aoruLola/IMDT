# 3.6 案例分析与实现

> 来源：docs/08_电子书/数据结构（C语言版）（第3版）-李冬梅、严蔚敏、吴伟民.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：4cb27e4c52013412


在 3.2 节我们引入了 3 个有关栈应用的案例和一个有关队列应用的案例。本节对这 4 个案例进行进一步的分析，然后分别利用栈和队列的基本操作给出案例中相关算法的具体实现。

案例3.1：数制的转换。

## 【案例分析】

当将一个十进制整数 N 转换为八进制数时，在计算过程中，使 N 与 8 求余得到的八进制数的各位依次进栈，计算完毕后将栈中的八进制数依次输出，输出结果就是待求得的八进制数。

数制的转换

【案例实现】

在具体实现时，栈可以采用顺序存储表示，也可以采用链式存储表示。

### 算法3.20 数制的转换

【算法步骤】

①初始化空栈S。

②当十进制数 N 非零时，循环执行以下操作：

把N与8求余得到的八进制数压入栈S；

N 更新为 N 与 8 的商。

③当栈 S 非空时，循环执行以下操作：

弹出栈顶元素e；

输出 $ e_{0} $

【算法描述】

void Conversion(int N)
{
 //对于任意一个非负十进制数，打印输出与其等值的八进制数
 InitStack(S);
 while(N) {
 //初始化空栈S
 //当N非零时，循环
 }
 Push(S, N);
 N=N/8;
}
while(!StackEmpty(S))
{
 Pop(S, e);
 cout<<e;
}

#### 【算法分析】

显然，该算法的时间和空间复杂度均为  $ O(\log_{8}n) $。

这是利用栈的后进先出特性的最简单的例子。在这个例子中，栈的操作是单调的，即先一味地入栈，然后一味地出栈。也许，有的读者会提出疑问：用数组直接实现不是更简单吗？但仔细分析上述算法不难看出，栈的引入简化了程序设计的问题，划分了不同的关注层次，使思考范围缩小了。而用数组实现不仅掩盖了问题的本质，还要分散精力去考虑数组下标增减等细节问题。

在实际利用栈的问题中，入栈和出栈操作大都不是单调的，而是交错进行的。下面的案例3.2和3.3都属于这种情况。

##### 案例3.2：括号匹配的检验。

检验算法借助一个栈，每当读入一个左括号，则直接入栈，等待相匹配的同类右括号；每当读入一个右括号，若与当前栈顶的左括号类型相同，则二者

##### 【案例分析】

括号的匹配

匹配，将栈顶的左括号出栈，直到表达式读取完毕。

在处理过程中，还要考虑括号不匹配出错的情况。例如，出现“((]))”这种情况时，由于前面入栈的左括号均已和后面出现的右括号相匹配，栈已空，因此最后读取的右括号不能得到匹配；出现“[(]）”这种情况时，当表达式读取结束时，栈中还有一个左括号没有匹配；出现“(()]”这种情况时，显然是栈顶的左括号和最后的右括号不匹配。

【案例实现】

##### 【算法步骤】

①初始化空栈S。

② 设置一标记性变量 flag，用来标记匹配结果以控制循环及返回结果，1 表示正确匹配，0 表示错误匹配，flag 初值为 1。

③读取表达式，依次读入字符 ch，如果表达式没有读取完毕且 flag 非零，则循环执行以下操作：

若 ch 是左括号“[” 或 “(”， 则将其压入栈；

若 ch 是右括号“)”，则根据当前栈顶元素的值分情况考虑：若栈非空且栈顶元素是“(”，则正确匹配，否则错误匹配，flag 置为 0；

若 ch 是右括号 “]”，则根据当前栈顶元素的值分情况考虑：若栈非空且栈顶元素是“[”，则正确匹配，否则错误匹配，flag 置为 0。

④退出循环后，如果栈空且flag值为1，则匹配成功，返回true，否则返回false。

【算法描述】

Status Matching()
{
 // 检验表达式中所含括号是否正确匹配，如果正确匹配，则返回 true，否则返回 false
 // 表达式以“#”结束
 InitStack(S);
 flag=1;
 cin>>ch;
 while(ch!='#'&&flag)
 {
 switch(ch)
 {
 case '[':
 case '(':
 Push(S,ch);
 break;
 case ')：
 if(!StackEmpty(S)&&GetTop(S)=='(')
 Pop(S,x);
 else flag=0;
 break;
 case '']:
 if(!StackEmpty(S)&&GetTop(S)=='[')
 Pop(S,x);
 else flag=0;
 break;
 }
 cin>>ch;
 }
}

if (StackEmpty(S) && flag) return true; // 匹配成功
else return false; // 匹配失败

【算法分析】

此算法要从头到尾读取表达式中每个字符，若表达式的字符串长度为 n，则此算法的时间复杂度为  $ O(n) $。算法在运行时所占用的辅助空间主要取决于栈的大小，显然，栈 S 的空间大小不会超过 n，所以此算法的空间复杂度也同样为  $ O(n) $。

案例3.3：表达式求值。

【案例分析】

任何一个表达式都是由操作数（operand）、运算符（operator）和界限符（delimiter）组成的，统称它们为单词。一般地，操作数既可以是常数，也可以是被定义为变量或常量的标识符；运算符可以分为算术运算符、关系运算符和逻辑运算符3类；基本界限符有左右括号和表达式结束符等。为了叙述的简洁，在此仅讨论简单算术表达式的求值问题，这种表达式只含加、减、乘、除4种运算符。读者不难将它推广到更一般的表达式上。

下面把运算符和界限符统称为算符。

我们知道，算术四则运算遵循以下3条规则：

（1）先乘除，后加减；

（2）从左算到右：

（3）先括号内，后括号外。

根据上述3条运算规则，在运算的每一步中，任意两个相继出现的算符 $ \theta_{1} $和 $ \theta_{2} $之间的优先关系，至多是下面3种关系之一：

 $$ \theta_{1}<\theta_{2}, 即 \theta_{1} 的优先权低于 \theta_{2} $$

 $$ \theta_{1}=\theta_{2}, 即 \theta_{1} 的优先权等于 \theta_{2} $$

 $$ \theta_{1}>\theta_{2}, 即 \theta_{1} 的优先权高于 \theta_{2} $$

表3.1 定义了算符间的优先关系。

<div style="text-align: center;"><div style="text-align: center;">表3.1 算符间的优先关系</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">$ \theta_{{1}} $</td><td colspan="7">$ \theta_{{2}} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>+</td><td style='text-align: center; word-wrap: break-word;'>-</td><td style='text-align: center; word-wrap: break-word;'>*</td><td style='text-align: center; word-wrap: break-word;'>/</td><td style='text-align: center; word-wrap: break-word;'>(</td><td style='text-align: center; word-wrap: break-word;'>)</td><td style='text-align: center; word-wrap: break-word;'>#</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>+</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>-</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>*</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>/</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>(</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>=</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>)</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>&gt;</td><td style='text-align: center; word-wrap: break-word;'>&gt;</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>#</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'>&lt;</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>=</td></tr></table>

由规则（1），先进行乘除运算，后进行加减运算，所以有“+”<“*”、“+”<“/”、“*”>“+”、“/”>“+”等。

由规则（2），运算遵循左结合性，当两个运算符相同时，先出现的运算符优先级高，所以有“+”>“+”、“-”>“-”、“*”>“*”、“/”>“/”。

由规则（3），括号内的优先级高， $ \theta_{1} $ 为 “+” “-” “*” 和 “/” 时的优先级均低于  $ \theta_{2} $ 为 “(” 时的优先级，但高于  $ \theta_{2} $ 为 “)” 时的优先级。

表中的“(”=“”)表示当左右括号相遇时，括号内的运算已经完成。为了便于实现，假设每个表达式均以“#”开始，以“#”结束。所以“#”=“#”表示整个表达式求值完毕。“)”与“(”、“#”与“)”以及“(”与“#”之间无优先关系，这是因为表达式中不允许它们相继出现，一旦遇到这种情况，则可以认为出现了语法错误。在下面的讨论中，我们暂假定所输入的表达式不会出现语法错误。

##### 【案例实现】

可以使用两个工作栈实现表达式求值算法，一个称作 OPTR，用以寄存运算符；另一个称作 OPND，用以寄存操作数或运算结果。

##### 算法 3.22 表达式求值

【算法步骤】

①初始化 OPTR 栈和 OPND 栈，将表达式起始符 “#” 压入 OPTR 栈。

②读取表达式，读入第一个字符 ch，如果表达式没有读取完毕至“#”或 OPTR 的栈顶元素不为“#”时，则循环执行以下操作。

若 ch 不是运算符，则压入 OPND 栈，读入下一字符 ch。

表达式求值

若 ch 是运算符，则根据 OPTR 的栈顶元素和 ch 的优先级比较结果，做不同的处理：

若小于，则将 ch 压入 OPTR 栈，读入下一字符 ch；

若大于，则弹出 OPTR 栈顶的运算符，从 OPND 栈弹出两个数，进行相应运算，将结果压入 OPND 栈；

若等于，则 OPTR 的栈顶元素是“(”且 ch 是“)”，这时弹出 OPTR 栈顶的“(”，相当于括号匹配成功，然后读入下一字符 ch。

③ OPND 栈顶元素即表达式求值结果，返回此元素。

【算法描述】

char EvaluateExpression()
{
 // 算术表达式求值的算符优先算法，设OPTR和OPND分别为运算符栈和操作数栈
 InitStack(OPND);
 InitStack(OPTR);
 Push(OPTR, '#');
 cin>>ch;
 while(ch='##'||GetTop(OPTR) != '#')
 {
 if(!In(ch)) {
 Push(OPND, ch);
 cin>>ch;
 }
 else
 {
 switch(Precede(GetTop(OPTR), ch))
 case '<':
 Push(OPTR, ch);
 cin>>ch;
 break;
 }
 case '>':
 Pop(OPTR, theta);
 Pop(OPND, b);
 Pop(OPND, a);
 Push(OPND, Operate(a, theta, b));
 break;
 }
 case '=':
 Pop(OPTR, x);
 cin>>ch;
 break;
 }
}

// 初始化OPND栈
// 初始化OPTR栈
// 将表达式起始符“#”压入OPTR栈
// 表达式未读完或OPTR的栈顶元素不为“#”
// ch不是运算符则进OPND栈
// 比较OPTR的栈顶元素和ch的优先级
// 当前字符ch压入OPTR栈，读入下一字符ch
// 弹出OPTR栈顶的运算符
// 弹出OPND栈顶的两个运算数
// 将运算结果压入OPND栈
// OPTR的栈顶元素是“(”且ch是“)”
// 弹出OPTR栈顶的“(”，读入下一字符ch
// switch

}
return GetTop(OPND);

算法调用的 3 个函数需要读者自行补充完成。其中  $ \ln() $ 是判定读入的字符 ch 是否为运算符的函数，Precede() 是判定运算符栈的栈顶元素与读入的运算符之间优先关系的函数，Operate() 是进行二元运算的函数。

另外需要特别说明的是，上述算法中的操作数只能是一位数，因为这里使用的 OPND 栈是字符栈，如果要进行多位数的运算，则需要将 OPND 栈改为数栈，即将读入的数字字符拼成数之后再入栈。读者可以改进此算法，使之能完成多位数的运算。

##### 【算法分析】

同算法 3.21 一样，此算法从头到尾读取表达式中每个字符，若表达式的字符串长度为 n，则此算法的时间复杂度为  $ O(n) $。算法在运行时所占用的辅助空间主要取决于 OPTR 栈和 OPND 栈的大小，显然，它们的空间大小之和不会超过 n，所以此算法的空间复杂度也同样为  $ O(n) $。

利用算法3.22对算术表达式 $ 3*(7-2) $进行求值，给出其求值的具体过程。

##### 【例 3.2】算法表达式的求值过程。

在表达式两端先增加“#”，将其改写为

#3*(7-2)#

具体操作过程如表3.2所示。

<div style="text-align: center;"><div style="text-align: center;">表3.2 算术表达式  $ 3*(7-2) $ 求值的具体操作过程</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>步骤</td><td style='text-align: center; word-wrap: break-word;'>OPTR栈</td><td style='text-align: center; word-wrap: break-word;'>OPND栈</td><td style='text-align: center; word-wrap: break-word;'>读入字符</td><td style='text-align: center; word-wrap: break-word;'>主要操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>#</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>3*(7-2)#</td><td style='text-align: center; word-wrap: break-word;'>Push(OPND, ‘3’)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>#</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>*(7-2)#</td><td style='text-align: center; word-wrap: break-word;'>Push(OPTR, ‘*’)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>#*</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>(7-2)#</td><td style='text-align: center; word-wrap: break-word;'>Push(OPTR, ‘(’)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>#*(</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>(7-2)#</td><td style='text-align: center; word-wrap: break-word;'>Push(OPND, ‘7’)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>#*(</td><td style='text-align: center; word-wrap: break-word;'>3 7</td><td style='text-align: center; word-wrap: break-word;'>(2)#</td><td style='text-align: center; word-wrap: break-word;'>Push(OPTR, ‘-’)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>#*(-</td><td style='text-align: center; word-wrap: break-word;'>3 7</td><td style='text-align: center; word-wrap: break-word;'>2)#</td><td style='text-align: center; word-wrap: break-word;'>Push(OPND, ‘2’)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>7</td><td style='text-align: center; word-wrap: break-word;'>#*(-</td><td style='text-align: center; word-wrap: break-word;'>3 7 2</td><td style='text-align: center; word-wrap: break-word;'>)#</td><td style='text-align: center; word-wrap: break-word;'>Push(OPND, Operate(‘7’, ‘-’, ‘2’))</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>#*(</td><td style='text-align: center; word-wrap: break-word;'>3 5</td><td style='text-align: center; word-wrap: break-word;'>)#</td><td style='text-align: center; word-wrap: break-word;'>Pop(OPTR){ 消去一对括号 }</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>#*</td><td style='text-align: center; word-wrap: break-word;'>3 5</td><td style='text-align: center; word-wrap: break-word;'>#</td><td style='text-align: center; word-wrap: break-word;'>Push(OPND, Operate(‘3’, ‘*’, ‘5’))</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>#</td><td style='text-align: center; word-wrap: break-word;'>15</td><td style='text-align: center; word-wrap: break-word;'>#</td><td style='text-align: center; word-wrap: break-word;'>return(GetTop(OPND))</td></tr></table>

在高级语言的编译处理过程中，实际上不只是表达式求值可以借助栈来实现，高级语言中一般语法成分的分析都可以借助栈来实现，在编译原理课程中会涉及栈在语法、语义等分析算法中的应用。

##### 案例3.4：舞伴问题。

【案例分析】

对于舞伴配对问题，先入队的男士或女士先出队配成舞伴，因此设置两个队列分别存放男士和女士入队者。假设男士和女士的记录存放在一个数组中作为输入，然后依次读取该数组的各元素，并根据性别来决定是进入男队还是女队。当这两个队列构造完成之后，依次使两队当前的队头元素出队来配成舞伴，直至某队列变空为止。此时，若某队仍有等待配对者，则输出此队列中排在队头的等待者的姓名，此人将是下一轮舞曲开始时第一个可获得舞伴的人。

##### 【案例实现】

算法中有关数据结构的定义如下：

// - - - - 跳舞者个人信息 - - - - -
typedef struct
{
 char name[20]; // 姓名
 char sex; // 性别，F表示女性，M表示男性
}Person;
// - - - - - 队列的顺序存储结构 - - - - -
#define MAXQSIZE 100 // 队列可能达到的最大长度
typedef struct
{
 Person *base; // 队列中数据元素类型为 Person
 int front; // 头指针
 int rear; // 尾指针
}SqQueue;
SqQueue Mdancers, Fdancers; // 分别存放男士和女士入队者队列

##### 【算法步骤】

① 初始化 Mdancers 队列和 Fdancers 队列。

② 反复循环，依次将跳舞者姓名根据性别插入 Mdancers 队列或 Fdancers 队列。

③ 当 Mdancers 队列和 Fdancers 队列均为非空时，反复循环，依次输出男女舞伴的姓名。

舞伴问题

④ 如果 Mdancers 队列为空而 Fdancers 队列非空，则输出 Fdancers 队列的队头女士的姓名。

⑤如果 Fdancers 队列为空而 Mdancers 队列非空，则输出 Mdancers 队列的队头男士的姓名。

【算法描述】

void DancePartner(Person dancer[], int num)
{
 // 结构数组 dancer 中存放跳舞的男女姓名和性别，num 是跳舞的人数。
 InitQueue(Mdancers); // 男士队列初始化
 InitQueue(Fdancers); // 女士队列初始化
 for (i=0; i<num; i++)
 {
 p=dancer[i];
 if (p.sex=='F') EnQueue(Fdancers,p); // 插入女队
 else EnQueue(Mdancers,p); // 插入男队
 }
 cout<<"The dancing partners are:\n";
 while (!QueueEmpty(Fdancers) && !QueueEmpty(Mdancers))
 {
 // 依次输出男女舞伴的姓名
 DeQueue(Fdancers,p); // 女士团队
 cout<<p.name<<" ".; // 输出团队女士姓名
 DeQueue(Mdancers,p); // 男士团队
 cout<<p.name<<endl; // 输出团队男士姓名
 }
 if (!QueueEmpty(Fdancers)) // 女士队列非空，输出队头女士的姓名
 {
 p=GetHead(Fdancers); // 取女士队头

cout<<"The first woman to get a partner is: "<< p.name<<endl;
}
else if(!QueueEmpty(Mdancers)) // 男士队列非空，输出队头男士的姓名
{
 p=GetHead(Mdancers) // 取男士队头
 cout<<"The first man to get a partner is: "<< p.name<<endl;
}

##### 【算法分析】

若跳舞者人数总计为 n，则此算法的时间复杂度为  $ O(n) $。空间复杂度取决于 Mdancers 队列和 Fdancers 队列的长度，二者长度之和不会超过 n，因此空间复杂度也同样为  $ O(n) $。

队列在程序设计中也有很多应用，凡是符合先进先出原则的数学模型，都可以用队列。最典型的例子是队列在操作系统中用来解决主机与外设之间速度不匹配的问题，或多个用户引起的资源竞争问题。

例如，一个局域网上有一台共享的网络打印机，网上每个用户都可以将数据发送给网络打印机进行打印。为了保证能够正常打印，操作系统为网络打印机生成一个“作业队列”，每个申请打印的“作业”应按先后的顺序排队，打印机从作业队列中逐个提取作业进行打印。

这方面的例子很多，在操作系统等课程中会涉及大量队列这种数据结构的应用。

在实际应用中，队列应用的例子更是常见，通常用以模拟排队情景。例如，以汽车加油站为例，通常的结构基本上是：入口和出口为单行道，加油车道可能有若干条。每辆车加油都要经过3段路程，第一段是在入口处排队等候进入加油车道；第二段是在加油车道排队等候加油；第三段是在出口处排队等候离开。实际上，这3段都是队列结构。若用算法模拟这个过程，总共需要设置的队列个数应该为加油车道数加上2。

#### 【问题描述】

根据逆波兰表示法求表达式的值。有效的算符包括 +、-、*、/，每个运算对象可以是整数，也可以是另一个逆波兰表达式。假设给定的逆波兰表达式总是有效的，即表达式总会计算出有效数值且不存在除数为 0 的情况。其中，整数除法只保留整数部分。

##### 【输入输出示例】

输入：tokens = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", +", "5", +"]

##### 输出：22

解释：该算式转化为常见的中级表达式为

((10 * (6 / ((9 + 3) * -11)))) + 17) + 5
= ((10 * (6 / (12 * -11)))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22

##### 【问题分析】

逆波兰表达式（Reverse Polish Notation，RPN）由波兰的逻辑学家卢卡西维兹提出，其特点是没有括号，运算符总是放在和其相关的操作数之后，因此，逆波兰表达式也称后缀表达式。

由于逆波兰表达式严格遵循从左到右的运算顺序，因此计算逆波兰表达式的值时，可以使用一个栈来存储操作数，从左到右遍历逆波兰表达式。若遇到操作数，则将其入栈；若遇到运算符，则将与此运算符相关的操作数出栈，即将栈顶两个操作数出栈，其中先出栈的是右操作数，后出栈的是左操作数。然后使用运算符对两个操作数进行运算，将运算得到的新操作数入栈。遍历结束后，栈内只有一个元素，即逆波兰表达式的值，返回此元素的值即可。具体实现步骤如图3.17所示。

<div style="text-align: center;"><div style="text-align: center;">（a）初始状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）遇到操作数依次入栈</div> </div>

<div style="text-align: center;"><div style="text-align: center;">逆波兰表达式：</div> </div>

<div style="text-align: center;"><div style="text-align: center;">逆波兰表达式：</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）遇到运算符，相关操作数出栈，运算结果入栈</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）返回逆波兰表达式的值</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图3.17 LeetCode 150具体实现步骤</div> </div>

①遍历逆波兰表达式，循环执行以下操作：

##### 【算法步骤】

判断当前字符 token 是否为操作数：

若 token 为操作数，则将字符转化为整型数据，并将其入栈；

若 token 为运算符，首先将两个操作数出栈，并进行相应运算，然后将运算后得到的新操作数入栈。

②逆波兰表达式遍历结束后，栈内元素即为表达式的值res。

③返回逆波兰表达式的值res。

【算法描述】

bool isNumber(char* token)
{
 // 判断token是否为操作数
 return strlen(token) > 1 || ('0' <= token[0] && token[0] <= '9');
}

int evalRPN(char** tokens, int tokensSize)
{
 //求逆波兰表达式的值
 int n = tokensSize;
 int* stk = (int*)malloc(10000*sizeof(int));
 int top = 0;
 for (int i = 0; i < n; i++)
 {
 char* token = tokens[i];
 if (isNumber(token))
 stk[top++] = atoi(token);
 else
 {
 long long num2 = stk[-top]; //遇到操作数，字符转化为整型数据，入栈
 long long num1 = stk[-top]; //num1记录左操作数
 switch (token[0]) //运算得到的新操作数入栈
 }
 case '+':
 stk[top++] = num1 + num2;
 break;
 case '-':
 stk[top++] = num1 - num2;
 break;
 case '*':
 stk[top++] = num1 * num2;
 break;
 case '/':
 stk[top++] = num1 / num2;
 break;
 }
}
int res = stk[top - 1];
return res; //返回逆波兰表达式的值
}

##### 【算法分析】

算法需要遍历 tokens 一次，计算逆波兰表达式的值，因此时间复杂度为  $ O(n) $；使用栈存储计算过程中的操作数及其计算结果，栈内元素个数不会超过逆波兰表达式的长度，因此空间复杂度为  $ O(n) $。

##### 【算法练习题3.2】LeetCode 1249 移除无效的括号

【问题描述】

给定一个由“(”“)”和小写字母组成的字符串 s，从字符串中删除最少数目的“(”或“)”，使得剩下的括号字符串有效。有效括号字符串应当符合以下任意一条要求：

（1）空字符或只包含小写字母的字符串；

（2）可以被写作“AB”的字符串，即“A”连接“B”，其中“A”和“B”都是有效括号字符串；

（3）可以被写作“(A)”的字符串，其中“A”是一个有效括号字符串。

##### 【输入输出示例】

输入：s = "lee(t(c)o)de)"

输出 : 'lee(t(c)o)de'

解释：“lee(t(co)de)”, "lee(t(c)ode)" 也是一个可行答案。

##### 【问题分析】

本题可以在遍历字符串过程中，利用栈统计出需要删除的括号，将其在原字符串中标记为 -1。具体做法为遍历字符串，若遇到 “(”， 则将其下标入栈；若遇到 “)”，且栈为空，则将其在原字符串中标记为 -1，否则，说明该 “)” 与栈顶的 “(” 匹配，弹出栈顶元素。遍历结束后，处理栈中剩余的 “(”， 将其在原字符串中标记为 -1。遍历修改后的字符串，将不是 -1 的元素即有效括号存入字符串 news，返回有效括号字符串 news 即可。具体实现步骤如图 3.18 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）初始状态</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）遇到“（”，对应下标入栈</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）遇到“）”且栈为空，弹出栈顶元素</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）遇到“）”且栈为空，将其在原字符串中标记为-1</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（e）返回有效括号字符串news</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图3.18 LeetCode 1249具体实现步骤</div> </div>

【算法步骤】

①遍历字符串s，循环执行以下操作：

若字符为小写字母，则跳出本次循环；

若字符为“（”，则将下标入栈；

若字符为“)”，首先判断栈是否为空，若栈为空，则将其在原字符串中标记为 -1，否则弹出栈顶元素。

②将栈中剩余字符在原字符串中标记为-1。

③遍历修改后的字符串s，将不是-1的元素即有效括号存入news。

④返回有效括号字符串 news。
【算法描述】

char* minRemoveToMakeValid(char* s)
{
 // 返回有效括号字符串
 int n = strlen(s);
 int* stk = (int*)malloc(n * sizeof(int));
 int top = 0;
 for (int i = 0; i < n; i++)
 {
 if (s[i] != '(' && s[i] != '')
 continue;
 else if(s[i] == '(')
 stk[top++] = i;
 else
 {
 if (top == 0)
 s[i] = -1;
 else
 stk[top--];
 }
 }
 for (int i = 0; i < top; i++)
 {
 int i = 0, j = 0;
 char* news = (char*)calloc(n + 1, sizeof(char));
 while (j < n)
 {
 if (s[j] != -1)
 news[i + 1] = s[j + 1];
 else
 j++;
 }
 return news;
 }

##### 【算法分析】

算法首先需要遍历字符串一次，统计需要删除的括号，这一步的时间复杂度是  $ O(n) $，之后需要遍历修改后的字符串，返回有效括号字符串，这一步的时间复杂度也是  $ O(n) $，因此算法的整体时间复杂度为  $ O(n) $；算法使用栈来统计需要删除的括号，在最坏情况下，栈将存储 n 个元素，另外字符串 news 用于存储最终的有效括号字符串，在最坏情况下，news 的长度与原字符串相同，均为 n，因此算法空间复杂度为  $ O(n) $。

##### 【问题描述】

假设共有 n 名小伙伴一起做游戏，小伙伴们围成一圈，顺时针从 1 到 n 编号，即从小伙伴 i 的位置顺时针移动一位会到达小伙伴 i + 1 的位置，其中， $ 1 \leq i < n $，从小伙伴 n 的位置顺时针移动一位会回到小伙伴 1 的位置。游戏遵循如下规则。

（1）从小伙伴1所在位置开始。

（2）朝顺时针方向数 k 名小伙伴，计数时需要包含起始时的那位小伙伴。绕圈进行计数，

一些小伙伴可能会被数过不止一次。

（3）数到的最后一名小伙伴需要离开圈子，并视作输掉游戏。

（4）如果圈子中仍然有不止一名小伙伴，则从刚刚输掉游戏的小伙伴顺时针方向的下一位小伙伴开始，继续执行（2）。

（5）如果圈子中只剩下一名小伙伴，则此人获胜。

给定参与游戏的小伙伴总数 n 和一个整数 k，返回游戏的获胜者。

【输入输出示例】

输入：n=5, k=2

输出：3

解释：游戏步骤如下。

（1）从小伙伴1开始。

（2）顺时针数2名小伙伴，也就是小伙伴1和小伙伴2。

（3）小伙伴2离开圈子。下一轮从小伙伴3开始。

（4）顺时针数2名小伙伴，也就是小伙伴3和小伙伴4。

（5）小伙伴4离开圈子。下一轮从小伙伴5开始。

（6）顺时针数2名小伙伴，也就是小伙伴5和小伙伴1。

（7）小伙伴1离开圈子。下一轮从小伙伴3开始。

（8）顺时针数2名小伙伴，也就是小伙伴3和5。

（9）小伙伴5离开圈子。只剩下小伙伴3。所以小伙伴3是游戏的获胜者。

游戏过程如图3.19所示。

##### 【问题分析】

本题可以将 $n$ 个小伙伴的编号存入无头结点的链队。每一轮游戏过程中，将队头元素出队并将其在队尾处重新入队，重复该操作 $k-1$ 次。在 $k-1$ 次操作之后，队头元素即为本轮游戏的第 $k$ 名小伙伴，将此元素取出，即第 $k$ 名小伙伴离开圈子。每一轮游戏之后，新的队头元素即为下一轮游戏的起始小伙伴的编号，且圈子中减少一名小伙伴，即队列中减少一个元素。当队列中只剩下 1 个元素时，该元素对应的小伙伴即为获胜者，返回该元素即可。具体实现步骤如图 3.20 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）第一轮</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）第二轮</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）第三轮</div> </div>

【算法步骤】

<div style="text-align: center;"><div style="text-align: center;">（d）第四轮</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（e）结束</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图3.19 游戏过程</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（a）链队初始化（n=5, k=2）</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）队头元素出队并重新入队</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）队头元素出队</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）返回游戏获胜者编号</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图3.20 LeetCode 1823 具体实现步骤</div> </div>

①定义 head 和 tail 两个指针，初始时均为空。

②将 n 个小伙伴的编号存入无头结点的链队，head 指向队头，tail 指向队尾。

③当队列中元素个数大于1时，循环执行以下操作。

重复以下操作 k-1 次：将队头元素出队并将其在队尾处重新入队，将 head 指向新的队头，tail 指向新的队尾。

将队头元素出队。

④ 返回游戏获胜者编号 res。

【算法描述】

int findTheWinner(int n, int k)
{
 // 返回游戏的获胜者，本题链队的存储结构同2.9节给出的链表结构
 struct ListNode* head = NULL;
 struct ListNode* tail = NULL;
 for (int i = 1; i <= n; i++)
 {
 struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
 node->val = i;
 node->next = NULL;
 if (!head)
 {
 head = node;
 tail = node;
 }
 else
 {
 tail->next = node;
 tail = tail->next;
 }
 }
 while (head != tail)
 {
 // 队列不止一个元素
 }
 for (int i = 1; i < k; i++)
 {
 struct ListNode* node = head;
 head = head->next;
 tail->next = node;
 tail = tail->next;
 tail->next = NULL;
 }
 struct ListNode* node = head;
 head = head->next;
 free(node);
}
int res = head->val;
free(head);
return res;

int 返回获胜者编号

【算法分析】

初始时需要将 n 个元素入队，每一轮游戏需要将 k 个元素依次出队，将 k-1 个元素依次入队，游戏总计进行 n-1 轮，因此时间复杂度为  $ O(nk) $；队列中最多有 n 个元素，空间复杂度

为 $ O(n) $

##### 【问题描述】

给定一个只包含 “(” 和 “)” 的字符串，找出最长有效括号子串的长度，即格式正确且连续的括号子串的长度。

【输入输出示例】

输入：s="())"

##### 输出：4

解释：最长有效括号子串是“()”。

##### 【问题分析】

本题可以借助一个栈来追踪未匹配的右括号的位置，并据此计算最长有效括号子串的长度。在遍历字符串数组过程中，应始终确保栈底为已遍历过的元素中最后一个没有被匹配的右括号的数组下标，而栈中其他元素为左括号的下标。初始时首先向栈中压入一个值为 -1 的元素，使得当栈为空且第一个入栈的字符为左括号时，同样可以确保栈底为已遍历过的元素中最后一个没有被匹配的右括号的下标。然后遍历字符串，当遇到 “(” 时，则将其下标入栈。当遇到 “)” 时，弹出栈顶元素，表示栈顶元素匹配了当前的右括号，此时如果栈为空，说明当前右括号没有匹配，则将其下标入栈，更新栈底元素；如果栈不为空，则弹出的元素是最近一个未匹配左括号的下标，此时可以通过当前右括号的下标减去栈顶元素（即栈中下一个未匹配的右括号的下标）来计算当前有效括号子串的长度。在每一步中，如果计算出的子串长度大于先前记录的最大长度 maxans，则更新 maxans，遍历结束后返回 maxans 即可。具体实现步骤如图 3.21 所示。

<div style="text-align: center;"><div style="text-align: center;">（a）初始状态，-1入栈</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（b）-1出栈，0入栈</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 3入栈</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（d）5入栈，遍历结束</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图3.21 LeetCode 32 具体实现步骤</div> </div>

##### 【算法步骤】

①桟stk 初始化，并存入一个值为 -1 的元素。

②遍历字符串s，循环执行以下操作：

若字符为“（”，将其下标入栈；

若字符为“)”，弹出栈顶元素，如果弹出后栈为空，则将其下标入栈，否则，将其下标减去栈顶元素即为以该右括号结束的最长有效括号子串的长度。

③返回最长有效括号子串的长度 maxans。

【算法描述】

int longestValidParentheses(char* s)
{
 // 最长有效括号子串长度
 int maxans = 0, n = strlen(s);
 int* stk = (int*)malloc((n + 1) * sizeof(int));
 int top = 0;
 stk[top++] = -1;
 for (int i = 0; i < n; i++)
 {
 if (s[i] == '(')
 stk[top++] = i;
 else
 {
 --top;
 if (top == 0)
 stk[top++] = i;
 else
 maxans = fmax(maxans, i - stk[top-1]);
 }
}
return maxans;

##### 【算法分析】

算法只需要遍历字符串一次，时间复杂度为  $ O(n) $；在最坏情况下，栈的大小会达到 n，空间复杂度为  $ O(n) $。

##### 【问题描述】

给定一个以字符串形式表述的布尔表达式 expression，返回该式的运算结果。有效的表达式需遵守以下约定：

（1）“t”，运算结果为 true；

（2）“f”，运算结果为 false；

（3）“！（expr）”，运算过程为对内部表达式 expr 进行逻辑非运算，即 NOT；

（4）“&(expr1, expr2,…)”，运算过程为对2个或2个以上内部表达式expr1, expr2, …进行逻辑与运算，即AND；

（5）“|(expr1, expr2,…)”，运算过程为对2个或2个以上内部表达式expr1, expr2, …进行逻辑或运算，即OR。

##### 【输入输出示例】

输入：expression = "!(f)"

输出：true

##### 【问题分析】

本题可以利用栈结构来解析和计算布尔表达式，栈结构有助于处理嵌套的表达式和操作符。逐字符遍历表达式，将非右括号的字符入栈；当遇到右括号时，弹出栈中相应的子表达式，统计t和f的数量，并根据操作符计算结果，再将结果入栈。最终，栈顶元素即为整个表达式的布尔值。具体实现步骤如图3.22所示。

<div style="text-align: center;"><div style="text-align: center;">（a）初始状态</div> </div>

（c）遇到的字符不是右括号，将其入栈

<div style="text-align: center;"><div style="text-align: center;">（e）操作符出栈，运算结果入栈</div> </div>

（b）遇到逗号，跳过不处理

<div style="text-align: center;"><div style="text-align: center;">（d）遇到的字符是右括号，统计“t”和“f”的数量分别存入num_t和num_f</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（f）返回布尔表达式的值</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图3.22 LeetCode 1106具体实现步骤</div> </div>

【算法步骤】
① 初始化一个字符栈 stack 用于存储表达式中的字符，栈顶指针 top 为 0。
② 遍历表达式中的每个字符，循环执行以下操作：
如果字符是逗号“，”，跳过，继续处理下一个字符；
如果字符不是右括号“)”，将其入栈并继续处理下一个字符；
如果字符是右括号“)”，则统计在括号内的“t”和“f”的数量。
③ 计算表达式结果，根据操作符 op 进行相应的布尔计算。

④遍历完成后，返回栈顶的元素即为最终的布尔表达式结果。

【算法描述】

bool parseBoolExpr(char* expression)
{
 // 计算布尔表达式
 int n = strlen(expression);
 char stack[n];
 int top = 0;
 for (int i = 0; i < n; i++)
 {
 char c = expression[i];
 if (c == ',')
 continue;
 if (c != '')
 {
 stack[top++] = c;
 continue;
 }
 int num_t = 0, num_f = 0;
 while (stack[top - 1] != '(')
 {
 char val = stack[-top];
 if (val == 't')
 num_t++;
 else if (val == 'f')
 num_f++;
 }
 top--;
 char op = stack[-top];
 switch (op)
 {
 case '！': // 非操作: "！”后面只有一个布尔值，若是“f”，则结果为“t”，否则为“f”
 stack[top++] = (num_f == 1) ? 't' : 'f';
 break;
 case '&': // 与操作: “f”的数量为0结果才为“t”，否则为“f”
 stack[top++] = (num_f == 0) ? 't' : 'f';
 break;
 case '|': // 或操作: 只要有一个“t”结果就为“t”，否则为“f”
 stack[top++] = (num_t > 0) ? 't' : 'f';
 break;
 default:
 break;
 }
}

}
return stack[top - 1] == 't'; // 返回最终结果，判断栈顶元素是否为“t”

【算法分析】

在 expr() 函数中，每个字符只会被访问一次，因此时间复杂度为  $ O(n) $；在最坏情况下，栈的高度可能接近表达式的长度的一半，因此空间复杂度为  $ O(n) $。

## 3.8 小结

本章介绍了两种特殊的线性表：栈和队列，主要内容如下。

（1）栈是限定仅在表尾进行插入或删除的线性表，又称为后进先出的线性表。栈有两种存储表示，顺序表示（顺序栈）和链式表示（链栈）。栈的主要操作是进栈和出栈，对于顺序栈的进栈和出栈操作要注意判断栈满或栈空。

（2）队列是一种先进先出的线性表。它只允许在表的一端进行插入，而在另一端进行删除。队列也有两种存储表示，顺序表示（循环队列）和链式表示（链队）。队列的主要操作是进队和出队，对于顺序表示的循环队列的进队和出队操作要注意判断队满或队空。凡是涉及队头或队尾指针的修改都要将其对 MAXQSIZE 求模。

（3）栈和队列是在程序设计中被广泛使用的两种数据结构，其具体的应用场景都是与其表示方法和运算规则相互联系的。表3.3分别从逻辑结构、存储结构和运算规则3方面对二者进行了比较。

<div style="text-align: center;"><div style="text-align: center;">表3.3 栈和队列的比较</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>比较项目</td><td style='text-align: center; word-wrap: break-word;'>栈</td><td style='text-align: center; word-wrap: break-word;'>队列</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>逻辑结构</td><td style='text-align: center; word-wrap: break-word;'>和线性表一样，数据元素之间存在一对一的关系</td><td style='text-align: center; word-wrap: break-word;'>和线性表一样，数据元素之间存在一对一的关系</td></tr><tr><td rowspan="2">存储结构</td><td style='text-align: center; word-wrap: break-word;'>顺序存储：\n存储空间预先分配，可能会出现空间闲置或栈满溢出现象；数据元素个数不能自由扩充</td><td style='text-align: center; word-wrap: break-word;'>顺序存储（常设计成循环队列形式）：\n存储空间预先分配，可能会出现空间闲置或队满溢出现象；数据元素个数不能自由扩充</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>链式存储：\n动态分配，不会出现闲置或栈满溢出现象；数据元素个数可以自由扩充</td><td style='text-align: center; word-wrap: break-word;'>链式存储：\n动态分配，不会出现闲置或队满溢出现象；数据元素个数可以自由扩充</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>运算规则</td><td style='text-align: center; word-wrap: break-word;'>插入和删除在表的一端（栈顶）完成，后进先出</td><td style='text-align: center; word-wrap: break-word;'>插入运算在表的一端（队尾）进行，删除运算在表的另一端（队头）进行，先进先出</td></tr></table>

（4）栈有一个重要应用是在程序设计语言中实现递归。递归是程序设计中最为重要的方法之一，递归程序结构清晰，形式简洁。但递归程序在执行时需要系统提供隐式的工作栈来保存调用过程中的参数、局部变量和返回地址，因此递归程序占用内存空间较多，运行效率较低。

学习完本章后，读者应掌握栈和队列的特点，熟练掌握顺序栈和链栈的进栈和出栈算法、循环队列和链队列的进队和出队算法。读者应能够灵活运用栈和队列解决实际应用问题，掌握表达式求值算法，深刻理解递归算法执行过程中栈的状态变化过程，以更好地使用递归算法。

1. 选择题

（1）若让元素 1,2,3,4,5 依次进栈，则出栈次序不可能出现（）的情况。

A. 5,4,3,2,1 B. 2,1,5,4,3 C. 4,3,1,2,5 D. 2,3,5,4,1

（2）若已知一个栈的入栈序列是  $ 1,2,3,\cdots,n $，其输出序列为  $ p_{1},p_{2},p_{3},\cdots,p_{n} $，若  $ p_{1}=n $，则  $ p_{i} $ 为（）。

A. i B. n - i C.  $ n - i + 1 $ D. 不确定

（3）一个循环队列，f 为当前队列头元素的前位置，r 为队尾元素的位置，假定队列中元素的个数小于 n，计算队列中元素个数的公式为（）。

A. r - f B.  $ (n + f - r)\%n $ C.  $ n + r - f $ D.  $ (n + r - f)\%n $

（4）链式栈结点为 (data, link)，top 指向栈顶，若想删除栈顶结点，并将删除结点的值保存到 x 中，则应执行操作（）。

A. x=top->data; top=top->link; B. top=top->link; x=top->link;

C. x=top; top=top->link; D. x=top->link;

（5）设有一个递归算法如下：

int fact(int n)

{

 //n大于等于0

 if(n<=0) return 1;

 else return n*fact(n-1);

}

则计算 fact(n) 需要调用该函数的次数为（）。

A.  $ n+1 $ B. n-1 C. n D.  $ n+2 $

（6）栈在（）中有所应用。

A. 递归调用 B. 函数调用 C. 表达式求值 D. 前三个选项都有

（7）为解决计算机主机与打印机间速度不匹配问题，通常设一个打印数据缓冲区。主机将要输出的数据依次写入该缓冲区，而打印机则依次从该缓冲区中取出数据。该缓冲区的逻辑结构应该是（）。

A. 队列 B. 栈 C. 线性表 D. 有序表

（8）设栈 S 和队列 Q 的初始状态为空，元素 e1, e2, e3, e4, e5, e6 依次进入栈 S，一个元素出栈后即进入 Q，若 6 个元素出队的序列是 e2, e4, e3, e6, e5, e1，则栈 S 的容量至少应该是（）。

A. 2 B. 3 C. 4 D. 6

（9）若一个栈以向量  $ V[1..n] $ 存储，初始栈顶指针 top 设为  $ n+1 $，则元素 x 进栈的正确操作是（ ）。

A. top++; V[top]=x; B. V[top]=x; top++; C. top--; V[top]=x; D. V[top]=x; top--;

（10）设计一个判别表达式中左、右括号是否配对出现的算法，采用（）数据结构最佳。

A. 线性表的顺序存储结构

B. 队列

C. 线性表的链式存储结构

D. 栈

（11）用链接方式存储的队列，在进行删除运算时（）。

A. 仅修改头指针

B. 仅修改尾指针

C. 头、尾指针都要修改

D. 头、尾指针可能都要修改

（12）循环队列存储在数组 A[0..m] 中，则入队时的操作为（）。

A. rear=rear+1

B. rear=(rear+1)%(m-1)

C. rear=(rear+1)%m

D. rear=(rear+1)%(m+1)

（13）最大容量为 n 的循环队列，队尾指针是 rear，队头指针是 front，则队空的条件是（）。

A. (rear+1)\%n==front

B. rear==front

C. rear+1==front

D. (rear-1)\%n==front

（14）栈和队列的共同点是（）。

A. 都是先进先出

B. 都是先进后出

C. 只允许在端点处插入和删除元素

D. 没有共同点

（15）一个递归算法必须包括（）。

A. 递归部分

B. 终止条件和递归部分

C. 迭代部分

D. 终止条件和迭代部分

2. 算法设计题

（1）将编号为 0 和 1 的两个栈存放于一个数组空间 V[m] 中，栈底分别处于数组的两端。当第 0 号栈的栈顶指针 top[0] 等于 -1 时该栈为空；当第 1 号栈的栈顶指针 top[1] 等于 m 时，该栈为空。两个栈均从两端向中间填充（见图 3.23）。试编写双栈初始化，判断栈空、栈满、进栈和出栈等算法的函数。双栈数据结构的定义如下：

<div style="text-align: center;"><div style="text-align: center;">图3.23 双栈结构的表示</div> </div>

（2）回文是指正读、反读均相同的字符序列，如“abba”和“abdba”均是回文，但“good”不是回文。试设计算法判定给定的字符序列是否为回文。（提示：将一半字符入栈。）

（3）设从键盘输入一整数的序列  $ a_{1}, a_{2}, a_{3}, \cdots, a_{n} $，试设计算法实现：用栈结构存储输入的整数，当  $ a_{i} \neq -1 $ 时，将  $ a_{i} $ 进栈；当  $ a_{i} = -1 $ 时，输出栈顶整数并出栈。算法应对异常情况（栈满等）给出相应的信息。

（4）从键盘上输入一个后缀表达式，试设计算法计算表达式的值。规定：逆波兰表达式的长度不超过一行，输入以“$”作为结束，操作数之间用空格分隔，操作符只可能有“+”“-”“*”“/”4种。例如：234 34 + 2*$。

（5）假设以Ⅰ和O分别表示入栈和出栈操作。栈的初态和终态均为空，入栈和出栈的操作序列可表示为仅由Ⅰ和O组成的序列，称可以操作的序列为合法序列，否则称为非法序列。

①下面所示的序列中哪些是合法的？

A. IOIIOIO O B. IOOIOIIO C. IIIOIOIO D. IIIOOIOO

② 通过对①的分析，写出一个算法，判定所给的操作序列是否合法。若合法，返回 true，

否则返回 false（假定被判定的操作序列已存入一维数组中）。

（6）假设以带头结点的循环链表表示队列，并且只设一个指针指向队尾元素结点（注意：不设头指针），试编写相应的置空队列、判断队列是否为空、入队和出队等算法。

（7）假设以数组 Q[m] 存放循环队列中的元素，同时设置一个标志 tag，以 tag == 0 和 tag == 1 来区别在队头指针（front）和队尾指针（rear）相等时，队列状态是“空”还是“满”。试编写与此结构相应的插入（enqueue）和删除（dequeue）算法。

（8）如果允许在循环队列的两端进行插入和删除操作。要求：

① 写出循环队列的类型定义；

②写出“从队尾删除”和“从队头插入”的算法。

（9）已知 Ackermann 函数定义如下：

 $$ \begin{aligned}&Ack(m,n)=\left\{\begin{aligned}\\ &n+1&&m=0\\&&&\\&&&\\&Ack(m-1,1)&&m\neq0,n=0\\&&&\\&&&\\&Ack(m-1,Ack(m,n-1))&&m\neq0,n\neq0\\ &\end{aligned}\right.\\ \end{aligned} $$

① 写出计算  $ Ack(m, n) $ 的递归算法，并根据此算法给出  $ Ack(2, 1) $ 的计算过程；

②写出计算 $ Ack(m,n) $的非递归算法。

（10）已知 f 为单链表的表头指针，链表中存储的都是整型数据，试写出实现下列运算的递归算法：

①求链表中的最大整数；

②求链表的结点个数；

③ 求所有整数的平均值。
