# 3.7.3 其他控制指令

> 来源：docs/08_电子书/计算机硬件技术基础（第4版）-李继灿.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：0c93d8c7280859f1


## 1. HLT

HLT 是一条暂停指令，它用于迫使 CPU 暂停执行程序，直到接收到复位或中断信号为止。

## 2. NOP

NOP 是一条空操作指令，它并未使 CPU 完成任何有效功能，只是每执行一次该指令要占用 3 个时钟周期的时间，常用作延时，或取代其他指令用作调试。

## 本章小结

8086/8088 寻址方式与指令系统的分类方法在不同版本的教材中基本上是一致的，但它们之间也有一些细微的差别。本章叙述的分类是典型的分类方法之一。

要熟悉指令的操作首先要掌握指令的寻址方式。8086/8088的寻址方式主要分为数据寻址方式和程序存储器寻址方式两种。

数据寻址方式有立即寻址、寄存器寻址、直接数据寻址、寄存器间接寻址、基址加变址寻址、寄存器相对寻址、相对基址加变址寻址等多种。其中，除立即寻址与寄存器寻址外，其他的寻址方式都需要对存储器操作数（不包括立即数）进行寻址。它们的一个共同寻址机理是，首先要由汇编程序根据书写的寻址方式汇编语句计算出有效地址（即偏移地址）EA，EA = 基址值（BX 或 BP）+ 变址值（SI 或 DI）+ 位移量 DISP。然后，再在地址加法器中将它与 16 位段地址左移 4 位后的 20 位段基地址相加，便得出寻址存储器某段中的一个 20 位的物理地址。

程序存储器寻址方式也就是转移类指令的寻址方式，它是寻址程序的地址（在代码段中）。其具体寻址方式可进一步分为4种类型：转移（包括无条件转移JMP与各种条件转移——其格式为JX的指令）、循环控制（包括无条件循环指令LOOP和5种条件循环指令）、过程调用（CALLY与RET）与中断控制（INT与IRET）。

此外，还有堆栈存储器寻址方式。它由堆栈段寄存器 SS 和堆栈指针 SP 来寻址。CPU 与堆栈之间的数据操作，是使用 PUSH 指令压入堆栈，用 POP 指令弹出堆栈。

其他类的寻址方式包括串操作指令寻址方式与 I/O 端口寻址方式两种。

8086/8088的指令按功能可分为6类：数据传送、算术运算、逻辑运算、串操作、程序控制和CPU控制。表3-11列出了8086/8088指令系统中的全部指令助记符。要正确使用指令必须掌握指令的功能，并理解它对标志寄存器的影响以及使用中的某些特定限制。学会指令的有效方法是，亲自动手进行编程练习并上机调试。只有实践，才会熟能生巧。

<div style="text-align: center;"><div style="text-align: center;">表 3-11 8086/8088 指令助记符</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>指令类型</td><td colspan="2">助 记 符</td></tr><tr><td rowspan="4">数据传送</td><td style='text-align: center; word-wrap: break-word;'>通用数据传送</td><td style='text-align: center; word-wrap: break-word;'>MOV,PUSH,POP,XCHG,XLAT</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>目标地址传送</td><td style='text-align: center; word-wrap: break-word;'>LEA,LDS,LES</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>标志位传送</td><td style='text-align: center; word-wrap: break-word;'>LAHF,SAHF,PUSHF,POPF</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>I/O 数据传送</td><td style='text-align: center; word-wrap: break-word;'>IN,OUT</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>指令类型</td><td colspan="3">助记符</td></tr><tr><td rowspan="5">算术运算</td><td colspan="2">加法</td><td style='text-align: center; word-wrap: break-word;'>ADD, ADC, INC</td></tr><tr><td colspan="2">减法</td><td style='text-align: center; word-wrap: break-word;'>SUB, SBB, DEC, NEG, CMP</td></tr><tr><td colspan="2">乘法</td><td style='text-align: center; word-wrap: break-word;'>MUL, IMUL</td></tr><tr><td colspan="2">除法</td><td style='text-align: center; word-wrap: break-word;'>DIV, IDIV, CBW, CWD</td></tr><tr><td colspan="2">十进制调整</td><td style='text-align: center; word-wrap: break-word;'>AAA, DAA, AAS, DAS, AAM, AAD</td></tr><tr><td rowspan="3">逻辑运算和移位、循环</td><td colspan="2">逻辑运算</td><td style='text-align: center; word-wrap: break-word;'>AND, OR, XOR, NOT, TEST</td></tr><tr><td colspan="2">移位</td><td style='text-align: center; word-wrap: break-word;'>SAL, SAR, SHL, SHR</td></tr><tr><td colspan="2">循环</td><td style='text-align: center; word-wrap: break-word;'>ROL, ROR, RCL, RCR</td></tr><tr><td rowspan="2">串操作</td><td colspan="2">基本字符串指令</td><td style='text-align: center; word-wrap: break-word;'>MOVS(MOVSB/MOVSW), CMPS(CMPSB/CMPSW), SCAS(SCASB/SCASW), LODS(LODSB/LODSW), STOS(STOSB/STOSW)</td></tr><tr><td colspan="2">重复前缀</td><td style='text-align: center; word-wrap: break-word;'>REP, REPE, REPZ, REPNE, REPNZ</td></tr><tr><td rowspan="8">程序控制</td><td rowspan="5">转移</td><td style='text-align: center; word-wrap: break-word;'>无条件转移</td><td style='text-align: center; word-wrap: break-word;'>JMP</td></tr><tr><td rowspan="4">条件转移</td><td style='text-align: center; word-wrap: break-word;'>对无符号数 JA/JNBE, JAE/JNB, JB/JNAE, JBE/JNA</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>单标志 JC, JNC, JE/JZ, JNE/JNZ</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>对带符号数 JG/JNLE, JGE/JNL, JL/JNGE, JLE/JNG</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>位条件转移 JO, JNO, JNP/JPO, JP/JPE, JNS, JS</td></tr><tr><td colspan="2">循环控制</td><td style='text-align: center; word-wrap: break-word;'>LOOP, LOOPE/LOOPZ, LOOPNE/LOOPNZ, JCXZ</td></tr><tr><td colspan="2">过程调用</td><td style='text-align: center; word-wrap: break-word;'>CALL, RET</td></tr><tr><td colspan="2">中断控制</td><td style='text-align: center; word-wrap: break-word;'>INT, INTO, IRET</td></tr><tr><td rowspan="3">处理器控制</td><td colspan="2">对标志位操作</td><td style='text-align: center; word-wrap: break-word;'>CLC, STC, CMC, CLD, STD, CLI, STI</td></tr><tr><td colspan="2">同步控制</td><td style='text-align: center; word-wrap: break-word;'>WAIT, ESC, LOCK</td></tr><tr><td colspan="2">其他</td><td style='text-align: center; word-wrap: break-word;'>HLT, NOP</td></tr></table>

## 习题3

3-1 为什么要学习 8086/8088 CPU 的指令系统？它是按什么设计流派的理论来设计的？其主要特点是什么？

3-2 什么是寻址方式？8086/8088 微处理器有哪几种主要的寻址方式？

3-3 指出 8086/8088 下列指令源操作数的寻址方式。

（1）MOV AX,1200H

(3) MOV BX, [SI]

(2) MOV BX, [1200H]

(4) MOV BX, [SI + 1200H]

(5) MOV[BX+SI], AL

(6) ADD AX, [BX + DI + 20H]

（7）MUL BL （8）XLAT

（9）IN AL,DX （10）INC WORD PTR[BP+50H]

3-4 指出 8086/8088 下列指令中存储器操作数物理地址的计数表达式。

（1）MOV AL,[DI] （2）MOV AX,[BX+SI]

（3）MOV AL,8[BX+DI] （4）ADD AL,ES:[BX]

（5）SUB AX,[2400H] （6）ADC AX,[BX+DI+1200H]

（7）MOV CX,[BP+SI] （8）INC BYTE PTR[DI]

3-5 指出 8086/8088 下列指令的错误。

（1）MOV [SI],IP （2）MOV CS,AX

（3）MOV BL,SI+2 （4）MOV 60H,AL

（5）PUSH 2400H （6）INC[BX]

（7）MUL -60H （8）ADD [2400H],2AH

（9）MOV [BX],[DI] （10）MOV SI,AL

3-6 设 SP=2000H, AX=3000H, BX=5000H, 执行下列片段程序后, SP=? AX=? BX=?

3-7 假定 PC 存储器低地址区有关单元的内容如下：

(20H) = 3CH, (21H) = 00H, (22H) = 86H, (23H) = 0EH 且 CS = 2000H, IP = 0010H, SS = 1000H, SP = 0100H, FLAGS = 0240H, 这时若执行 INT 8 指令, 试问：

（1）程序转向从何处执行（用物理地址回答）？

（2）栈顶6个存储单元的地址（用逻辑地址回答）及内容分别是什么？

3-8 阅读下列程序段，每条指令执行以后有关寄存器的内容是多少？

MOV AX, 0ABCH
DEC AX
AND AX, 00FFH
MOV CL, 4
SAL AL, 1
MOV CL, AL
ADD CL, 78H
PUSH AX
POP BX

## 3-9 某程序段为：

2000H: 304CH ABC: MOV AX, 1234H
2000H: 307EH JNE ABC

试问：代码段中跳转指令的操作数为何值？

3-10 若 AX=5555H, BX=FF00H, 试问在下列程序段执行后，AX=? BX=? CF=?

AND AX, BX
XOR AX, AX
NOT BX

3-11 若 DS=3000H, BX=2000H, SI=0100H, ES=4000H, 计算出下述各条指令中存储器操作数的物理地址：

(1) MOV [BX], AH (2) ADD AL, [BX + SI + 1000H]

(3) MOV AL, [BX + SI] (4) SUB AL, ES: [BX]

3-12 试比较 SUB AL, 09H 与 CMP AL, 09H 这两条指令的异同。若 AL=08H，分别执行上述两条指令后，SF=? CF=? OF=? ZF=?

3-13 若要完成两个压缩 BCD 数相减(67-76)，结果仍为 BCD 数，试编写该程序段。执行程序后，AL=?CF=?

3-14 试选用最少的指令，实现下述功能。

（1）AH 的高 4 位清 0。

（2）AL 的高 4 位取反。

（3）AL 的高 4 位移到低 4 位，高 4 位清 0。

（4）AH的低4位移到高4位，低4位清0。

3-15 设 BX = 6D16H, AX = 1100H, 写出下列两条指令执行后 BX 寄存器中的内容。

MOV CL, 06H
ROL AX, CL
SHR BX, CL

<div style="text-align: center;"><div style="text-align: center;">3-16 设初值 AX=0119H，执行下列程序段后，AX=?</div> </div>

MOV CH, AH
ADD AL, AH
DAA
XCHG AL, CH
ADC AL, 34H
DAA
MOV AH, AL
MOV AL, CH
HLT

<div style="text-align: center;"><div style="text-align: center;">3-17 设初值 AX=6264H, CX=0004H, 在执行下列程序段后, AX=?</div> </div>

AND AX, AX
JZ DONE
SHL CX, 1
ROR AX, CL
DONE: OR AX, 1234H

3-18 哪个段寄存器不能从堆栈弹出？

3-19 如果堆栈定位在存储器位置 02200H，试问 SS 和 SP 中将装入什么值？

3-20 若 AX=1001H, DX=20FFH, 当执行 ADD AX, DX 指令以后, 请列出和数及标志寄存器中每个位的内容(CF、AF、SF、ZF 和 OF)。

3-21 若  $ \mathrm{DL}=0F3H, BH=72H $，当从 DL 减去 BH 后，列出差数及标志寄存器各位的内容。

3-22 当两个16位数相乘时，乘积放在哪两个寄存器中？积的高有效位和低有效位分别放在哪个寄存器中？CF 和 OF 两个标志位是什么？

3-23 当执行8位数除法指令时，被除数放在哪个寄存器中？当执行16位除法指令时，商数放在哪个寄存器中？

3-24 执行除法指令时，微处理器能检测出哪种类型的错误？简述它的处理过程。

3-25 试写出一个程序段，用 CL 中的数据除 BL 中的数据，然后将结果乘 2，最后的结果存入 DX 寄存器中的 16 位数。

3-26 设计一个程序段，将 AX 和 BX 中的 8 位 BCD 数加 CX 和 DX 中的 8 位 BCD 数（AX 和 CX 是最高有效寄存器），加后的结果必须存入 CX 和 DX 中。

3-27 设计一个程序段，将 DI 中的最右 5 位置 1，而不改变 DI 中的其他位，结果存入 SI 中。

3-28 选择正确的指令以实现下列任务。

（1）把DI右移3位，再把0移入最高位。

（2）把 AL 中的所有位左移 1 位，使 0 移入最低位。

（3）AL循环左移3位。

（4）EDX 带进位循环右移1位。

3-29 若要将 AL 中的 8 位二进制数按逆序重新排列，试编写一段程序实现该逆序排列。

3-30 REPE CMPSB 指令可实现什么功能？它和 REPE CMPSD 指令有何区别？

3-31 REPZ SCASB 指令完成什么操作？它和 REPZ SCASD 指令有何区别？

3-32 如果要使程序无条件地转移到下列几种不同距离的目标地址，应使用哪种类型的 JMP 指令？

（1）假定位移量为 0120H 字节。（2）假定位移量为 0012H 字节。

（3）假定位移量为12000H字节。

3-33 已知指令 JMP NEAG PROG1 在程序代码段中的偏移地址为 2105H，其机器码为 E91234H。执行该指令后，程序转移的偏移地址是多少？

3-34 JMP [DI]与 JMP FAR PTR[DI]指令的操作有什么区别？

3-35 用串操作指令设计实现如下功能的程序段：先将100个数从6180H处转移到2000H处；再从中检索出等于AL中字符的单元，并将此单元值换成空格符。

3-36 带参数的返回指令用在什么场合？设栈顶地址为 2000H，当执行 RET 0008 后，SP 的值是多少？

3-37 在执行中断返回指令 IRET 和过程（子程序）返回指令 RET 时，具体操作内容有什么区别？

3-38 8086 的 LOOP 指令使什么寄存器减 1，并且为了决定是否发生转移测试它是否为 0？

3-39 设平面上有一点 P 的直角坐标  $ (x, y) $，试编写程序完成以下操作：

如 P 点落在第 i 象限，则 K=i；如 P 点落在坐标轴上，则 K=0。

### 【学习目标】

汇编语言程序设计是开发微机系统软件的基本功，在程序设计中占有十分重要的地位。本章选择 IBM PC 作为基础机型，着重讨论 8086/8088 汇编语言的基本语法和程序设计的基本方法，以掌握一般汇编语言程序设计的初步技术。

#### 【学习要求】

理解 8086/8088 汇编语言的一般概念。

通过 8086/8088 汇编源程序实例，理解源程序结构：分段、行语句、字段。

学习汇编语言语句的类型及格式，掌握指令语句与伪指令语句的异同点。

学习 8086/8088 汇编语言的数据项时，着重分清变量与标号的区别。变量是标定伪指令的符号地址，而标号是标定指令的符号地址。

学习表达式和运算符时，重点掌握地址表达式的3个属性。

汇编语言程序有顺序结构、分支结构、循环结构及其组合结构等形式，熟练掌握和灵活运用顺序结构、分支结构、循环结构3种基本结构。

## 4.1 程序设计语言概述

程序设计语言是专门为计算机编程所配置的语言。它们按照形式与功能的不同可分为机器语言、汇编语言和高级语言。

### 1）机器语言

机器语言(machine language)是由0、1二进制代码书写和存储的指令与数据。它的特点是能为机器直接识别与执行，程序所占内存空间较少。其缺点是难认、难记、难编、易错。

#### 2）高级语言

高级语言(high level language)是脱离具体机器(即独立于机器)的通用语言，不依赖于特定计算机的结构与指令系统。用同一种高级语言写的源程序，一般可以在不同的计算机上运行而获得同一结果。

高级语言源程序必须经编译程序或解释程序编译或解释生成机器码目标程序后方能执行。它的特点是简短、易读、易编。其缺点是编译程序或解释程序复杂，占用内存空间大，且

产生的目标程序也比较长，因而执行时间就长；同时，用高级语言处理接口技术、中断技术比较困难。所以，它不适合于实时控制。

##### 3）汇编语言

汇编语言(assembly language)是介于机器语言与高级语言之间的一种中低级语言。它是用指令的助记符、符号地址、标号等书写程序的语言，简称符号语言。它的特点是易读、易写、易记。其缺点是不能被计算机直接识别。

由汇编语言写成的语句，必须遵循严格的语法规则。现将与汇编语言相关的几个名词介绍如下。

汇编源程序：它是按严格的语法规则用汇编语言编写的程序，称为汇编语言源程序，简称汇编源程序或源程序。

汇编（过程）：将汇编源程序翻译成机器码目标程序的过程称为汇编过程，简称汇编。

手工汇编与机器汇编：前者是指由人工进行汇编，而后者是指由计算机进行汇编。

汇编程序：为计算机配置的担任把汇编源程序翻译成目标程序的一种系统软件。

驻留汇编：又称本机自我汇编，是在小型机上配置汇编程序，并在译出目标程序后在本机上执行。

交叉汇编：是多用户终端利用某一大型机的汇编程序进行他机汇编，然后在各终端上执行，以共享大型机的软件资源。

汇编语言程序的上机与处理过程如图4-1所示。

<div style="text-align: center;"><div style="text-align: center;">图 4-1 汇编语言程序的上机与处理过程</div> </div>

图4-1中，椭圆表示系统软件及其操作，方框表示磁盘文件。椭圆中横线上部是系统软件的名称，横线下部是软件所做的操作。此图说明了从源程序输入、汇编到运行的全过程。首先，用户编写的汇编语言源程序要用编辑程序（如编辑程序EDIT或各种编辑器等）建立与修改，形成属性为.ASM的汇编语言源文件；再经过汇编程序进行汇编，产生属性为.OBJ的以二进制代码表示的目标程序并存盘。OBJ文件虽然已经是二进制文件，但它还不能直接上机运行，必须经过连接程序（LINK）把目标文件与库文件以及其他目标文件连接在一起，形成属性为.EXE的可执行文件，这个文件可以由DOS装入内存，最后才能在DOS环境下在机器上执行。

汇编程序分为小汇编程序 ASM 和宏汇编程序 MASM 两种，后者功能比前者强，可支持宏汇编。

### 4.2.1 8086/8088 汇编源程序实例

在第3章中介绍过一些用汇编语言编写的程序，但这些程序都还不是完整的汇编语言源程序，在计算机上不能通过汇编生成目标代码，因而也就不能在机器上运行。正因为如

此，所以将这些不能直接汇编与运行的程序称为程序段。什么是汇编源程序呢？下面先举一个完整的汇编源程序实例。

【例 4-1】将数据段内存单元 DATA 中的数据 12H 与立即数 16H 相加，然后把和数存入 SUM 单元中保存。一个用完整的段定义语句编写的汇编语言源程序如下。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>DSEG</td><td style='text-align: center; word-wrap: break-word;'>SEGMENT</td><td style='text-align: center; word-wrap: break-word;'>;定义数据段, DSEG 为段名</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DATA</td><td style='text-align: center; word-wrap: break-word;'>DB 12H</td><td style='text-align: center; word-wrap: break-word;'>;用变量名 DATA 定义 1 字节的内存单元, 初值为 12H</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>SUM</td><td style='text-align: center; word-wrap: break-word;'>DB 0</td><td style='text-align: center; word-wrap: break-word;'>;用变量名 SUM 定义 1 字节的内存单元, 初值为 0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DSEG</td><td style='text-align: center; word-wrap: break-word;'>ENDS</td><td style='text-align: center; word-wrap: break-word;'>;定义数据段结束</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>SSEG</td><td style='text-align: center; word-wrap: break-word;'>SEGMENT STACK</td><td style='text-align: center; word-wrap: break-word;'>;定义堆栈段, 这是组合类型伪指令, 其后必须跟 STACK 类型名</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DB 512 DUP(0)</td><td colspan="2">;在堆栈段内定义 512 字节的连续内存空间, 且初值为 0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>SSEG</td><td style='text-align: center; word-wrap: break-word;'>ENDS</td><td style='text-align: center; word-wrap: break-word;'>;定义堆栈段结束</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CSEG</td><td style='text-align: center; word-wrap: break-word;'>SEGMENT</td><td style='text-align: center; word-wrap: break-word;'>;定义代码段开始</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>START:</td><td style='text-align: center; word-wrap: break-word;'>MOV AX, DSEG</td><td style='text-align: center; word-wrap: break-word;'>;设置数据段的段地址</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV DS, AX</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AL, DATA</td><td colspan="2">;将变量 DATA 中的 12H 置入 AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>ADD AL, 16H</td><td colspan="2">;将 AL 的 12H 加上 16H 的和置入 AL 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV SUM, AL</td><td colspan="2">;将 AL 中的和数送 SUM 单元保存</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AH, 4CH</td><td colspan="2">;DOS 功能调用语句, 机器将结束本程序的运行, 返回 DOS 状态</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>INT 21H</td><td colspan="2"></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CSEG</td><td style='text-align: center; word-wrap: break-word;'>ENDS</td><td style='text-align: center; word-wrap: break-word;'>;定义代码段结束</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>END START</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>;整个汇编程序结束, 规定入口地址</td></tr></table>

由以上实例可以看到汇编源程序在结构和语句格式上有以下特点。

（1）汇编源程序一般由若干段组成，每段都有一个名字（称为段名），以 SEGMENT 作为段的开始，以 ENDS 作为段的结束，这两者（伪指令）前面都要冠以相同的名字。从段的性质上看，可分为代码段、堆栈段、数据段和附加段4种，但代码段与堆栈段是不可少的，数据段与附加段可根据需要设置。在上面的例子中，程序分3段：第一段为数据段，段名是 DSEG，段内存放原始数据和运算结果；第二段为堆栈段，段名是 SSEG，其功能用于存放堆栈数据；第三段为代码段，段名是 CSEG，它用于包含实现基本操作的指令。在代码段中，用 ASSUME 命令（伪指令）告诉汇编程序，在各种指令执行时所要访问的各段寄存器将分别对应哪一段。程序中不必给出这些段在内存中的具体位置，而由汇编程序自行定位。各段在源程序中的顺序可任意安排，段的数目原则上也不受限制。

（2）汇编源程序的每一段是由若干行汇编语句组成的，每行只有一条语句，且不能超过128个字符，但一条语句允许有后续行，最后均以回车作结束。整个源程序必须以 END 语句来结束，它通知汇编程序停止汇编。END 后面的标号 START 表示该程序执行时的起始地址。

（3）每条汇编语句最多由4个字段组成，它们均按照一定的语法规则分别写在一个语句的4个区域内，各区域之间用空格或制表符（Tab键）隔开。汇编语句的4个字段是：名字或标号、操作码（指令助记符）或伪操作命令、操作数表（操作数或地址）、注释。

## 1. 汇编语言语句的类型

汇编语言源程序的语句可分为两大类：指令性语句（简称指令语句）和指示性语句（又称伪指令语句）。

指令性语句是指由指令组成的一种可执行的语句，它在汇编时，汇编程序将产生与它一一对应的机器目标代码。例如：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>汇编指令</td><td style='text-align: center; word-wrap: break-word;'>机器码</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DS,AX</td><td style='text-align: center; word-wrap: break-word;'>8E D8</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>ADD</td><td style='text-align: center; word-wrap: break-word;'>AX,BX</td><td style='text-align: center; word-wrap: break-word;'>03 C3</td></tr></table>

指示性语句是指由伪指令组成的一种只起说明作用而不能执行的语句，它在汇编时只为汇编程序提供进行汇编所需要的有关信息，如定义符号、分配存储单元、初始化存储器等，而本身并不生成目标代码。例如：

DATA SEGMENT
AA DW 20H, -30H
DATA ENDS

这 3 条伪指令语句只是告诉汇编程序定义一个段名为 DATA 的数据段。在汇编时，汇编程序将把变量 AA 定义为一个字类型数据区的首地址，在内存区的数据段中使数据的存放形式为：

AA: 20H, 00H, 0D0H, 0FFH

<div style="text-align: center;"><div style="text-align: center;">图 4-2 AA 字变量数据 存放示意图</div> </div>

该数据段在内存中的数据存放示意图如图4-2所示。

## 2. 汇编语言语句的格式

汇编语言源程序的语句一般由4个字段组成，但它们在指令性语句和指示性语句中的含义有些区别。现分述如下。

（1）指令性语句的格式：

[标号：][前缀]指令助记符[操作数表][；注释]

其中，[]表示可以任选的部分；操作数表是由逗号分隔的多个操作数。

说明：

① 标号：代表后面的指令所在的存储地址，供 JMP、CALL 和 LOOP 等指令作操作数使用，以寻找转移目标地址。除此之外，它还具有一些其他“属性”。

②前缀：8086/8088中有些特殊指令，它们常作为前缀同其他指令配合使用，例如，与“串操作指令”（MOVS、CMPS、SCAS、LODS与STOS）连用的5条“重复指令”（REP、REPE/REPZ、REPNE/REPNZ），以及总线封锁指令LOCK等，都是前缀。

③ 指令助记符：包括 8086/8088 的全部指令助记符，以及用宏定义语句定义过的宏指令名。宏指令在汇编时将用相应指令序列的目标代码插入。

④ 操作数表：对 8086/8088 的一般性执行指令来说，操作数表可以是一个或两个操作数，若是两个操作数，则称左边的操作数为目标操作数，右边的操作数为源操作数；对宏指令来说，操作数表可能有多个操作数。操作数之间用逗号分隔。

⑤ 注释：以分号(;)开始，用来简要说明该指令在程序中的功能，以提高程序的可读性。

（2）伪指令语句的格式：

[名字]伪操作命令[操作数表][；注释]

其中，“名字”可以是标识符定义的常量名、变量名、过程名、段名等。所谓标识符是由字母开头，由字母、数字、特殊字符（如？、下画线、@等）组成的字符串。

注意，名字的后面没有冒号，这是它同指令语句中的标号在格式上的主要区别。

## 4.3 8086/8088 汇编语言的数据项与表达式

操作数是汇编语言语句中的一个重要字段，它可以是寄存器、存储器单元或数据项。而汇编语言能识别的数据项又可以是常量、变量、标号和表达式。

### 4.3.1 常量

常量是指汇编时已经有确定数值的量，它有多种表示形式，常见的有二进制数、十六进制数、十进制数和 ASCII 码字符串。其中，十六进制数的第一个数值必须是 0～9，如 7A65H、0FA9H 等；ASCII 字符串是用单引号括起来的一个或多个字符，如 'IBM PC'、'OK' 等。

常量可以用数值形式直接写在汇编语言的语句中，也可以用符号形式预先给它定义一个“名字”，供编程时直接引用。用“名字”表示的常量称为符号常量，符号常量是用伪指令EQU或=来定义的。例如：

ONE EQU 1
DATA1=2 *12H
MOV AX, DATA1+ONE

即把25H送AX。

常量是没有属性的纯数据，它的值是在汇编时确定的。

### 4.3.2 变量

变量是内存中一个数据区的名字，即数据所存放地址的符号地址，它可以作为指令中的存储器操作数来引用。由于存储器是分段使用的，因而对源程序中所定义的变量也有3种

属性：段属性（变量所在段的段地址）、偏移值属性（该变量与起始地址之间相距的字节数）和类型属性（数据项的存取长度单位）。

应当注意，“变量”与“标号”有以下区别。

（1）变量指的是数据区的名字；而标号是某条执行指令起始地址的符号表示。

（2）变量的类型是指数据项存取单位的字节数大小（即字节、字、双字、四字或十字）；而标号的类型则是指使用该标号的两条指令之间的距离远近（即 NEAR 或 FAR）。

变量名应由字母开头，其长度不能超过 $ \underline{31} $个字符。在定义变量时，变量名对应的是数据区的首地址。若需对数据区中其他数据项进行操作时，必须修改地址值以指出哪个数据项是指令中的操作数。

例如，MOV SI，[WDATA+2]语句是取 WDATA 存储单元下面的第2个数据项给 SI。

### 4.3.3 标号

标号为指令性语句所在地址所起的名字，它表明该指令在存储器中的位置，用来作为程序转移的转向地址（目标地址）。和变量一样，标号也具有3个属性：段属性、偏移地址属性和类型属性（距离属性）。标号的段属性和偏移地址属性分别是指它的段地址和段内偏移地址，而距离属性（或类型属性）则分NEAR与FAR两种。

标号是用标识符定义的，即以字母开头，由字母、数字、特殊字符组成的字符串表示。标号的最大长度一般不超过31个字符，除宏指令名外，标号不能与保留字相同。保留字包括CPU寄存器名、指令助记符、伪指令、某些已由系统赋予有特定含义的名字。

标号最好用在程序功能方面具有一定含义的英文单词或单词缩写表示，以便于阅读。

标号也可单列一行，紧跟的下一行为执行性指令。例如：

SUBROUT:

MOV AX, 3000H

“标号”通常只在循环、转移和调用指令中使用。使用时要注意两种类型标号的不同：NEAR类型的标号是指标号所在的语句和调用指令或转移指令在同一个代码段中，执行调用指令或转移指令时，只需要把标号的偏移地址送给IP，就可以实现调用或转移，并不需要改变码段的段值；而FAR类型的标号则不同，它所在的语句与其调用指令或转移指令不在同一码段中，执行调用指令或转移指令时，不仅需要改变偏移地IP的值，而且还需要改变代码段寄存器CS的值。

### 4.3.4 表达式和运算符

以上介绍的常量、变量和标号是汇编语言中表示数据的3种基本形式。在实际使用时，通常需要将它们用运算符组合成所谓表达式作为汇编语言的数据。注意，表达式并不是指令，所以它本身不能执行，而只能在汇编时由汇编程序预先对它们进行运算，然后再将所得的值作为操作数参加指令规定的操作。也就是说，表达式的求值是由汇编程序来完成的。

8086/8088 汇编语言中使用的表达式有两类：一类是数值表达式，它在汇编时只产生

一个数值，仅具有大小而无其他属性，可作为执行性指令中的立即数和数据区中的初值使用；另一类是地址表达式，它产生的结果表示一个存储器地址，其值一般都是段内的偏移地址，因此它具有段属性、偏移值属性和类型属性。地址表达式主要用来表示执行性指令中的操作数。

表达式由运算对象和运算符组成。运算对象可根据不同的运算符选用常量、变量或标号，常用的运算符主要包括以下几种类型。

## 1. 算术运算符

常用的算术运算符包括+（加）、-（减）、*（乘）/（除）、MOD（模除，取余数）、SHL（左移）和SHR（右移）共7种。其中，MOD运算符表示两整数相除以后取余数，如17MOD7结果为3。SHR为右移运算符，SHL为左移运算符。例如，设NUMB=01010101B，则NUMB SHL1后，NUMB=10101010B。

算术运算符用于数值表达式时，其汇编结果是一个数值。

注意：除了加和减运算符可以使用变量或标号外，其他算术运算符只适用于常量的数值运算。

## 2. 逻辑运算符

逻辑运算符包括 AND(与)、OR(或)、XOR(异或)、NOT(非)共4种。逻辑运算符只能用于数值表达式，用来对数值进行按位逻辑运算，并得到一个数值；而对地址进行逻辑运算则无意义。这4种运算符与逻辑运算指令中的助记符书写的名称一样，但它们在语句中的位置和作用不同。表达式中的逻辑运算符出现在语句的操作数部分，并且是在汇编时由汇编程序完成的；而逻辑运算指令中的助记符出现在指令的操作码部分，其运算是在指令执行时完成的。例如，MOV AL，0ADH AND 0EAH 等价于 MOV AL，0A8H。

## 3. 关系运算符

关系运算符包括 EQ(或=)、NE(或≠)、LT(或<)、GT(或>)、LE(或≤)、GE(或≥) 共 6 种。

在数值表达式中参与关系运算的必须是两个数值，或同一段中的两个存储单元地址，关系运算的结果是一个逻辑值（常数），其数值在汇编时获得。当关系成立（为真）时，结果为0FFFFH；当关系不成立（为假）时，结果为0。例如：

AND AX, ((NUMB LT 5) AND 30) OR ((NUMB GE 5) AND 20)

当 NUMB<5 时，指令含义为 AND AX,30;

当  $ NUMB \geq 5 $ 时，指令含义为 AND AX, 20。

此例中，操作符 AND 与操作数表达式中的 AND 具有不同的含义，前者是助记符，后者是伪运算。

## 4. 数值返回运算符

数值返回运算符用来分析一个存储器操作数（即变量或标号）的属性，即将它分解为其组成部分（段地址、偏移值、类型、数据字节总数、数据项总数等），并在汇编时以数值形式返

回给存储器操作数。运算符总是加在运算对象前，返回的结果是一个数值。下面介绍几个常用的数值返回运算符SEG、OFFSET、TYPE、SIZE、LENGTH。

### 1）SEG运算符

SEG 运算符加在变量名或标号前，它返回的数值是位于其后的变量或标号的段地址。例如：

 $$  MOV\ AX,SEG\ DATA\quad; 将变量 \ DATA 的段地址送 \ AX $$

如果变量 DATA 的段地址为 0618H，则该指令执行后，AX=0618H。

#### 2）OFFSET 运算符

OFFSET 运算符加在变量或标号前，它返回的数值是位于其后的变量或标号的偏移值。例如：

##### 3）TYPE 运算符

TYPE 运算符加在变量或标号前，它返回的数值是反映该变量或标号类型的一个数值，如果是变量，则返回数值为字节数：DB 为 1，DW 为 2，DD 为 4，DQ 为 8，DT 为 10；如果是标号，则返回数值为代表该标号类型的数值：NEAR 为 -1(FFH)，FAR 为 -2(FEH)。

##### 4）SIZE 运算符

SIZE 运算符加在变量前，它返回的数值是变量所占数据区的字节总数。

##### 5）LENGTH 运算符

LENGTH 运算符加在变量前，它返回的数值是变量数据区的数据项总数。如果变量是用重复数据操作符 DUP 说明的，则返回外层 DUP 前面的数值；如果没有 DUP 说明，则返回的数值总是 1。例如：

DATA1 DW 100 DUP(?)

则 LENGTH DATA1 的值为 100，SIZE DATA1 的值为 200，TYPE DATA1 的值为 2。

## 5. 属性运算符

属性运算符用来说明或修改存储器操作数的某个属性。这里介绍常用的 PTR 和 THIS。

### 1）PTR 运算符

PTR 运算符用来说明或修改位于其后的存储器操作数的类型。例如：

CALL DWORD PTR[BX]; 说明存储器操作数为4字节长，即调用远程MOV AL,BYTE PTR[SI]; 将 SI 指向的存储器字节数送 AL

如果一个变量已经定义为字变量，利用 PTR 运算符可以修改它的属性。例如，变量 VAR 已定义为字类型，若要将 VAR 当作字节操作数写成 MOV AL，VAR 则会出错，因为两个操作数的字长类型不同；如果将指令写成 MOV AL，BYTE PTR VAR 就是合法的，因为指令中已经用 BYTE PTR 将 VAR 修改为字节类型操作数。注意，PTR 运算符只对当前

指令有效。

#### 2）THIS 运算符

THIS 运算符用来把它后面指定的类型和距离属性赋给当前的变量、标号或地址表达式，但不分配新的存储单元，它所定义的存储器地址的段和偏移量部分与下一个能分配的存储单元的段和偏移量相同。例如：

DATA B EQU THIS BYTE DATAW DW ?

上面语句中 DATAB 与 DATAW 的段地址和偏移量相同，但变量 DATAB 的类型是字节，而变量 DATAW 的类型是字。

注意，运算符 THIS 和 PTR 有类似的功能，但具体用法有所不同，其中，THIS 是为当前存储单元定义一个指定类型的变量或标号，也就是说为下一个能分配存储单元的变量或标号定义新的类型，因此它必须放在被修改的变量之前。如上例第一句中的 THIS 运算符就是放在下一个字类型变量 DATAW 之前，以便将 DATAW 定义为字节类型变量 DATAB。而运算符 PTR 则是对已经定义的变量或标号修改其属性，它可以放在被修改的变量之前，也可以放在被修改的变量之后。

## 4.4 8086/8088 汇编语言的伪指令

伪指令其实是微处理器指令表中所没有的一个伪操作命令集。汇编语言的伪指令较多，而且版本越高伪指令功能越强。本节介绍8086/8088汇编语言中常用的几种伪指令。

### 4.4.1 数据定义伪指令

数据定义伪指令用来为数据项定义变量的类型、分配存储单元，并且为该数据项提供一个任选的初始值。

常用的数据定义伪指令有 DB、DW、DD、DQ、DT。

#### 1）DB伪指令定义字节

DB 伪指令用于定义一个数据项为字节的数据区，需要时可以用数值表达式赋予初值。如果将该数据区定义作为一个变量，则变量类型是 BYTE。DB 也常用来定义字符串。

##### 2）DW伪指令定义字

DW 伪指令定义的数据项为字，它允许用地址表达式为数据项赋初值（即偏移量属性），变量类型是 WORD。

##### 3）DD伪指令定义双字

DD伪指令定义的数据项为双字，它允许用地址表达式为数据项赋初值（即段属性及偏移量属性），变量类型为DWORD。

##### 4）DQ伪指令定义四字

DQ伪指令定义的数据项为4字(8B)，变量类型为QBYTE。

##### 5）DT伪指令定义十字节

DT伪指令定义的数据项为10B，变量类型为TBYTE。DT后面的每个操作数都为10字节的压缩BCD数。

数据定义伪指令后面的操作数可以是常数、表达式或字符串。一个数据定义伪指令可以定义多个数据元素，但每个数据元素的值不能超过由伪指令所定义的数据类型限定的范围。例如，DB伪指令定义数据的类型为字节，则它所定义的数据元素的范围为0～255（无符号数）或-128～+127（有符号数）。字符和字符串都必须用单引号括起来。超过两个字符的字符串只能用于DB伪指令。

当一个变量用 DB、DW 和 DD 定义时，变量名出现在伪指令 DB、DW 和 DD 的左边，伪指令给出了该变量的类型属性，变量在汇编时的偏移量等于段首址到该变量的字节数（即偏移值属性），其段地址为当前段首址的高 16 位。若某变量所表示的是一个数组（向量），则其类型属性为变量的单个元素所占用的字节数。

<div style="text-align: center;"><div style="text-align: center;">【例4-2】</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>DSEG</td><td style='text-align: center; word-wrap: break-word;'>SEGMENT</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>TABLE</td><td style='text-align: center; word-wrap: break-word;'>DW 12</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DATA1</td><td style='text-align: center; word-wrap: break-word;'>DW 34</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>TABLE2</td><td style='text-align: center; word-wrap: break-word;'>DB 5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DATA2</td><td style='text-align: center; word-wrap: break-word;'>DW 67</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DATA3</td><td style='text-align: center; word-wrap: break-word;'>DW 89</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DSEG</td><td style='text-align: center; word-wrap: break-word;'>ENDS</td></tr></table>

这段程序用 DB、DW 和 DD 定义了若干变量，根据上述对数据定义命令的约定，则各变量及其属性可列于表 4-1 中。

<div style="text-align: center;"><div style="text-align: center;">表4-1 变量及其属性</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>变量名</td><td style='text-align: center; word-wrap: break-word;'>段属性(SEG)</td><td style='text-align: center; word-wrap: break-word;'>偏移值属性(OFFSET)</td><td style='text-align: center; word-wrap: break-word;'>类型属性(TYPE)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>TABLE</td><td style='text-align: center; word-wrap: break-word;'>DSEG</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DATA1</td><td style='text-align: center; word-wrap: break-word;'>DSEG</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>TABLE2</td><td style='text-align: center; word-wrap: break-word;'>DSEG</td><td style='text-align: center; word-wrap: break-word;'>5</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DATA2</td><td style='text-align: center; word-wrap: break-word;'>DSEG</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>RATES</td><td style='text-align: center; word-wrap: break-word;'>DSEG</td><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OTHERAT</td><td style='text-align: center; word-wrap: break-word;'>DSEG</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>4</td></tr></table>

所有变量的段属性(分量)均为 DSEG。DB、DW、DD 右边的表达式或数值即相应存储单元中的内容，汇编后的存储器分配情况如图 4-3 所示。

DB、DW、DD可用于初始化存储器。这些伪指令的右边有一个表达式，表达式的值即该存储“单位”的初值。一个存储单位可以是字节、字、双字。

表达式有数值表达式与地址表达式之分，在使用地址表达式来初始化存储器时，这样的表达式只可在DW或DD伪指令中出现，绝不允许出现在DB中。“DW变量”语句表

<div style="text-align: center;"><div style="text-align: center;">图 4-3 汇编后存储器分配情况</div> </div>

示利用该变量的偏移量来初始化相应的存储字；“DD变量”语句表示利用该变量的段地址和偏移量来初始化相应的两个连续的存储字，低位字中是偏移量，高位字中是段地址。

<div style="text-align: center;"><div style="text-align: center;">【例4-3】</div> </div>

这段程序对存储器初始化以后的情况如图4-4所示。

以语句 TWO DD TWO 为例说明如下。

②为0003H～0006H 4B存储单元设置初值。汇编后将变量TWO的偏移量0003H存入其前两个字节内存单元；而将段FOO的段地址0055H存入其后两个字节内存单元中。DD伪指令中的两个字即表示变量TWO的偏移地址及段地址。

① 从 0003H 单元开始分配 4 个存储单元。

1 字节的操作数也可以是某个字符的 ASCII 代码，注意只允许在 DB 伪指令中用字符串来初始化存储器。

<div style="text-align: center;"><div style="text-align: center;">图 4-4 对存储器初始化的情况</div> </div>

STRING1 DB 'HELLO'
STRING2 DB 'AB'
STRING3 DW 'AB'

上面3个语句在汇编后，存储器初始化的情况如图4-5所示。

在数据定义伪指令中的操作数还可以是问号（?），它表示只给变量保留相应的存储单

<div style="text-align: center;"><div style="text-align: center;">图 4-5 对字符串的存储器初始化情况</div> </div>

元，而不给变量赋予确定的值。

另外，若操作数有多次重复时，可用重复操作符 DUP 表示。

DUP的一般格式为：

[变量名]数据定义伪指令 n DUP(初值[,初值…])

其中，n 为重复次数，圆括号内的项为重复的内容。若用 n DUP(?) 作为数据定义伪指令的唯一操作数，则汇编程序只是保留 n 个元素大小的数据区。例如：

D1 DB 40 DUP(?)
D2 DW ?
D3 DB 40 DUP(60H)

为变量 D1 分配 40B 的数据区，初值为任意值；为变量 D2 分配 2B 的数据区，初值为任意值；为变量 D3 分配 40B 的数据区，初值为 60H
