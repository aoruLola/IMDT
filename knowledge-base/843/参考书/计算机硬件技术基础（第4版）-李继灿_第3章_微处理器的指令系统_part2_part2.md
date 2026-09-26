# 4.4.2 符号定义伪指令

> 来源：docs/08_电子书/计算机硬件技术基础（第4版）-李继灿.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：0c93d8c7280859f1


在程序中，对于多次出现的同一个表达式，通常要预先为它赋予一个名字，以便在需要修改该表达式的值时，只要修改名字即可。符号定义伪指令就是用来给一个表达式赋予名字的。

## 1. EQU（赋值伪指令）

EQU 伪指令格式：

名字 EQU 表达式

EQU 伪指令给表达式赋予一个名字。语句中的“名字”为任何有效的标识符；“表达式”可以是常数、符号、数值表达式、地址表达式，甚至可定义为指令助记符。

EQU 伪指令只用来为常量、表达式、其他符号等定义一个符号名，但并不申请分配内存。表达式的更改只需修改其赋值指令（或语句），使原名字具有新赋予的值，而使用名字的各条指令可保持不变。下面分别举例说明。

（1）为常量定义一个符号。

ONE EQU 1
TWO EQU 2
SUM EQU ONE+TWO

;数值赋给符号名

;把1+2=3赋给符号名SUM

（2）给变量或标号定义新的类型属性并取一个新的名字。

BYTES DB 4 DUP(?) ; 为变量 BYTES 先定义保留 4 字节类型的连续内存单元 FIRSTW EQU WORD PTR BYTES ; 给变量 BYTES 重新定义为字类型

（3）给由地址表达式指出的任意存储单元定义一个符号名。

符号名可以是“变量”或“标号”，取决于地址表达式的类型。

XYZ EQU [BP+3] ;变址寻址引用赋予符号名 XYZ
A EQU ARRAY[BX][SI] ;基址加变址寻址引用赋予符号名 A
B EQU ES: ALPHA ;加段前缀的直接寻址引用赋予符号名 B

（4）为汇编语言中的任何符号定义一个新的名字。

格式：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>新的名字\nCOUNT</td><td style='text-align: center; word-wrap: break-word;'>EQU</td><td style='text-align: center; word-wrap: break-word;'>原符号名\nCX</td><td style='text-align: center; word-wrap: break-word;'>;为寄存器CX定义新的符号名COUNT</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LD</td><td style='text-align: center; word-wrap: break-word;'>EQU</td><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>;为指令助记符MOV定义新的符号名LD</td></tr></table>

在以后的程序中，可以用 COUNT 作为 CX 寄存器的名字，而用 LD 作为与 MOV 同含义的助记符。

注意：EQU 伪指令不能重复定义已使用过的符号名。

## 2. =（等号伪指令）

等号伪指令与 EQU 基本类似，也用于赋值，但有以下区别。

（1）使用=定义的符号名可以被重新定义，使符号名具有新值。例如：

X=18 ;先将18赋予符号名X
X=X+1 ;将符号名X重新定义使其具有新值19

（2）习惯上＝主要用来定义符号常量。

## 3. LABEL（类型定义伪指令）

LABEL 伪操作命令为当前存储单元定义一个指定类型的变量或标号。其格式为：

变量名或标号名 LABEL 类型

对于数据项，类型可以是 BYTE、WORD、DWORD；对于可执行的指令代码，类型为 NEAR 和 FAR。

LABEL 伪指令不仅给名字（标号或变量）定义一个类型属性，而且隐含有给名字定义段属性和段内偏移量属性。例如：

ARRAY_BYTE LABEL BYTE ;为变量 ARRAY_BYTE 定义一个字节类型的数据区 ARRAY_WORD DW 50 DUP(?) ;为变量 ARRAY_WORD 定义一个字类型的数据区

下面程序中可用指令：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>MOV AL, ARRAY_BYTE</td><td style='text-align: center; word-wrap: break-word;'>;将该数据区的第1字节数据送AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV BX, ARRAY_WORD</td><td style='text-align: center; word-wrap: break-word;'>;将该数据区的第1字节和第2字节数据送BX</td></tr></table>

上述指令中的两个变量名具有同样的段值属性和偏移值属性，只是类型属性不同，前者是BYTE，后者是WORD。

### 4.4.3 段定义伪指令

8086 的存储器是分段管理的，段定义伪指令就用来定义汇编语言源程序中的逻辑段，即指示汇编程序如何按段来组织程序和使用存储器。段定义的命令主要有 SEGMENT、ENDS、ASSUME 与 ORG。

## 1. SEGMENT 和 ENDS 伪指令

SEGMENT 和 ENDS 伪指令用于把程序模块中的指令或语句分成若干逻辑段，其格式为：

段名 SEGMENT [定位类型][组合类型]['类别名']
 : ;一系列汇编指令

段名 ENDS

格式中 SEGMENT 与 ENDS 必须成对出现，它们两者之间为段体，给其赋予一个名字，名字由用户指定，是不可省略的，而定位类型、组合类型和类别名是可选的。

### 1）定位类型

定位类型又称“定位方式”，它指示汇编程序如何确定逻辑段的起始边界地址，定位类型有以下4种。

（1）BYTE：字节型，指示逻辑段的起始地址从字节边界开始，即可以从任何地址开始。这时本段的起始地址可以紧接在前一个段的最后一个存储单元。

（2）WORD：字型，指示逻辑段的起始地址从字边界开始，即本段的起始地址必须是偶数。

（3）PARA：节型，指示逻辑段的起始地址从一个节（16字节称为一个节）的边界开始，即起始地址应能被16整除，也就是段起始物理地址=XXXX0H。PARA为隐含值，即如果省略“定位类型”，则汇编程序按PARA处理。

（4）PAGE：页型，指示逻辑段的起始地址从页边界开始。256字节称为一页，故本段的起始物理地址=XXX00H。

#### 2）组合类型

组合类型又称“联合方式”或“连接类型”，它主要用在具有多个模块的程序中，指示连接程序如何将某个逻辑段在装入内存时与其他段进行组合。连接程序不但可以将不同模块的同名段进行组合，并根据组合类型，可将各段顺序地连接在一起或重叠在一起。共有以下6种组合类型。

（1）NONE：表示本段与其他段在逻辑上不发生关系，这是隐含的组合类型，若省略“组合类型”项即为NONE。

（2）PUBLIC：表示在不同程序模块中，凡是用 PUBLIC 说明的同名同类别的段在汇编时将被连接成一个大的逻辑段，而运行时又将它们装入同一物理段中，并使用同一段基址。

（3）STACK：在汇编连接时，将具有 STACK 类型的同名段连接成一个大的堆栈段，由各模块共享，而运行时，堆栈段地址 SS 和堆栈指针 SP 指向堆栈段的开始位置。

（4）COMMON：表示本段与其他模块中由COMMON说明的所有同名同类别的其他段连接时，将被重叠地放在一起，其长度是同名段中最长的那个段的长度，这样可以使不同模块的变量或标号使用同一存储区域，便于模块之间的通信。

（5）MEMORY：表示当几个逻辑段连接时，由MEMORY说明的本逻辑段被放在所有段的最后（高地址端）。若有几个段的组合类型都是MEMORY，则汇编程序只将所遇到的第1个段作为MEMORY组合类型，而其他段则被当作COMMON段处理。

（6）AT 表达式：表示本逻辑段以表达式指定的地址值来定位 16 位段地址，连接程序将把本段装入由该段地址所指定的存储区内。例如，AT 0C16H 表示本段从物理地址 0C160H 开始装入。但要注意，这一组合类型不能用来指定代码段。

##### 3）类别名

类别名是用单引号括起来的字符串，以表示该段的类型。连接时，连接程序只把类别名相同的所有段存放在连续的存储区内。典型的类别名如'STACK'、'CODE'、'DATA'，也允许用户在类别名中用其他的表示。

以上是对定位类型、组合类型和类别名3个参数的说明，各常数之间用空格分隔。在选用时，可以只选其中一个或两个参数项，但不能改变它们之间的顺序。

## 2. ASSUME 伪指令

ASSUME 伪指令一般出现在代码段中，它用来告诉汇编程序如何设定各段（通过段名）与对应段寄存器的相互关系。当在程序中使用这条语句后，汇编程序就能将设定的段作为当前可访问的段处理。它也可以用来取消某段寄存器与其原来设定段之间的对应关系（使用 NOTHING 即可）。引用该伪指令后，汇编程序才能对使用变量或标号的指令汇编出正确的目标代码。其格式为：

ASSUME 段寄存器：段名[，段寄存器名：段名]

其中，段寄存器是CS、DS、SS、ES中的一个，“段名”可以是SEGMENT/ENDS伪指令语句中已定义过的任何段名或组名，也可以是表达式“SEG变量”或“SEG标号”，或者是关键词NOTHING。例如：

ASSUME CS: SEGA, DS: SEGB, SS: NOTHING

其中，CS：SEGA与DS：SEGB表示CS与DS分别被设定为以SEGA和SEGB为段名的代码段与数据段的两个段地址寄存器；SS：NOTHING表示以前为SS段寄存器所作的设定已被取消，以后指令运行时将不再用到该寄存器，除非再用ASSUME给其重新定义。

注意：使用 ASSUME 伪指令，仅告诉汇编程序，有关段寄存器将被设定为内存中哪一个段的段地址寄存器，而其中段地址值(CS 的值除外)的真正装入还必须通过给段寄存器赋值的执行性指令来完成。例如：

SEGA SEGMENT

ASSUME CS: SEGA, DS: SEGB, SS: NOTHING

代码段寄存器 CS 的值是由系统在初始化时自动设置的，程序中不能用以上方法装入段值。但 ASSUME 伪指令中一定要给出 CS 段寄存器对应段的正确段名——ASSUME 所在段的段名（这里是 SEGA）。

数据段寄存器DS中的段地址值是在程序执行MOV AX，SEGB与MOV DS，AX两条语句后装入的。

堆栈段寄存器 SS 原来建立的段对应关系已被取消，故程序运行时将不再访问该段寄存器。

## 3. ORG 伪指令

ORG伪指令用来指出其后的程序段或数据块所存放的起始地址的偏移量。当汇编程序对源程序中的段进行汇编时，将段名填入段表，并为该段配备一个初值为0的位置计数器。计数器依次累计段内语句被汇编后生成的目标代码字节个数。为了改变该位置计数器的内容，可用ORG实现。其格式为：

### ORG 表达式

汇编程序把语句中表达式之值作为起始地址，连续存放程序和数据，直到出现一个新的ORG指令。若省略ORG，则从本段起始地址开始连续存放。

### 4.4.4 过程定义伪指令

在程序设计中，常常把具有一定功能并可能多次重复使用的程序设计成一个“过程”。过程也称为子程序，在主程序中任何需要的地方都可以调用它。控制从主程序转移到过程被定义为调用；过程执行结束后将返回主程序。在汇编语言中，用CALL指令来调用过程，用RET指令结束过程并返回CALL指令的后续指令。过程定义伪指令格式为：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>过程名</td><td style='text-align: center; word-wrap: break-word;'>PROC〔类型〕</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>: ;指令序列</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>过程名</td><td style='text-align: center; word-wrap: break-word;'>RET</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>ENDP</td></tr></table>

其中，伪指令 PROC 和 ENDP 必须成对出现，过程名是为该过程起的名字，但它被 CALL 指令调用时作为标号使用。过程的属性除了段和偏移量之外，其类型属性可选作 NEAR 或 FAR。选作 NEAR 时，该过程一定要与主程序在一个段；选作 FAR 时，该过程可以与主程序在同一个段，也可与主程序不在同一个段。如果类型省略，则系统取 NEAR 类型。由于过程是被 CALL 语句调用的，因此，过程中必须包含返回指令 RET。

## 4.5 8086/8088 汇编语言程序设计基本方法

在 DOS 环境下的 8086/8088 汇编语言程序结束时，通常用 DOS 的 4CH 号中断调用，使程序控制返回 DOS，即采用如下两条指令：

MOV AH, 4CH
INT 21H

有关 DOS 及 BIOS 的中断调用将在后续部分详细说明。

下面将根据程序的几种基本结构（顺序结构、分支结构、循环结构、子程序和 MASM 的源程序基本组成）分别举例，介绍 8086/8088 汇编语言程序设计的一般方法。

### 4.5.1 顺序结构程序

顺序结构程序的特点是 CPU 将根据指令的顺序排列而逐条依次执行，直至结束用户程序。设计顺序程序时，只要按顺序编写指令即可。

【例 4-4】对两个8字节无符号数求和，这两个数分别用变量D1及D2表示。将两数之和的最高位进位放在AL中，两数之和的其他位按从高到低顺序依次放在SI、BX、CX、DX中。

分析：有两个8字节无符号数参加求和计算，先要分配两个8字节存储单元存放这两个操作数；定义代码段和数据段；将两个8字节的操作数分别取入4个16位寄存器中；依次从低位向高位逐次完成加法运算；最后退出用户程序，返回DOS状态。

程序如下。

D SEGMENT
D1 DB 12H, 34H, 56H, 78H, 9AH, 0ABH, 0BCH, 0CDH ; 定义第1个源操作数
D2 DB 0CDH, 0BCH, 0ABH, 9AH, 78H, 56H, 34H, 12H ; 定义第2个源操作数
D ENDS
C SEGMENT
ASSUME CS: C, DS: D ; 说明代码段、数据段
BG: MOV AX, D
MOV DS, AX ; 给 DS 赋段值
LEA DI, D1 ; 将 D1 表示的偏移地址送 DI
MOV DX, [DI] ; 取第1操作数到寄存器中
MOV CX, [DI+2]
MOV BX, [DI+4]
MOV SI, [DI+6]
LEA DI, D2 ; 将第2个操作数 D2 表示的偏移地址送 DI
ADD DX, [DI] ; 两个操作数的低字节相加
ADC CX, [DI+2] ; 依次执行两个操作数的高位字节相加
ADC BX, [DI+4]
ADC SI, [DI+6]
MOV AL, 0

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>ADC</td><td style='text-align: center; word-wrap: break-word;'>AL, 0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AH, 4CH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>INT</td><td style='text-align: center; word-wrap: break-word;'>21H</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>C</td><td style='text-align: center; word-wrap: break-word;'>ENDS</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>END</td><td style='text-align: center; word-wrap: break-word;'>BG</td></tr></table>

设这一源程序名为 ABC.ASM，即利用任一编辑软件产生一个 ASCII 文件 ABC.ASM；然后，用 MASM 汇编 ABC.ASM，产生文件 ABC.OBJ；再用 LINK 软件对文件 ABC.OBJ 进行连接，产生文件 ABC.EXE；最后，在 DOS 环境下运行文件 ABC.EXE。当然，这个程序的最终运行结果是存放在寄存器中，而在 DOS 环境下运行时，看不到任何结果。为了能观察结果，可在 DEBUG 环境下，在程序返回 DOS 处设一个“断点”，然后在 DEBUG 中连续运行文件 ABC.EXE，当运行到“断点”处，程序会暂停，这时 DEBUG 会将 CPU 寄存器的内容显示在屏幕上，即显示结果。

【例 4-5】试编写计算  $ f=(w-(x*y+z-5000))/x $ 的程序。其中，w、x、y、z 均为有符号 16 位二进制数，并假设 w、x、y、z 的值分别为 5000、200、-250、20000。程序运行后，将计算结果存入变量 F，而余数存入变量  $ F+2 $ 中。

分析：输入数据为 w、x、y、z；输出数据为 f。由 f 算式可知，它是一个双字操作数除以字操作数所得的商，故 f 占一个字。由于中间结果 x * y 是双字操作数，所以，w、z 均应将符号扩展成双字操作数之后再进行加减运算。计算的所有中间结果也都应按 32 位带符号二进制数处理。

现设定存储单元分配为：字变量 W、X、Y、Z 分别存放 w、x、y、z 的值；字变量 F、 $ F+2 $ 中分别用来存放除法运算所得的商、余数。寄存器 CX、BX 用来存放运算的 32 位中间结果。则计算 f 值的步骤如下。

①  $ x \times y \rightarrow CX $、BX。

② 将 z 变量扩展成双字→DX、AX。

③  $ (CX、BX) + (DX、AX) \rightarrow CX $、BX。

④  $ (CX、BX) - 5000 \rightarrow CX $、BX。

⑤ 将 w 扩展成双字→DX、AX。

⑥  $ (DX、AX) - (CX、BX) \rightarrow DX $、AX。

⑦  $ (DX、AX)/x $，其商→F，余数→ $ F+2 $

计算程序如下

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>STACK</td><td style='text-align: center; word-wrap: break-word;'>SEGMENT ACK</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DB</td><td style='text-align: center; word-wrap: break-word;'>200 DUP(0)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>STACK</td><td style='text-align: center; word-wrap: break-word;'>ENDS</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DATA</td><td style='text-align: center; word-wrap: break-word;'>SEGMENT</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>W</td><td style='text-align: center; word-wrap: break-word;'>DW 5000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>X</td><td style='text-align: center; word-wrap: break-word;'>DW 200</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>Y</td><td style='text-align: center; word-wrap: break-word;'>DW -250</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>Z</td><td style='text-align: center; word-wrap: break-word;'>DW 20000</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>F</td><td style='text-align: center; word-wrap: break-word;'>DW 2 DUP(?)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DATA</td><td style='text-align: center; word-wrap: break-word;'>ENDS</td></tr></table>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>CODE</td><td style='text-align: center; word-wrap: break-word;'>SEGMENT</td></tr><tr><td colspan="2">ASSUME CS: CODE, DS: DATA, SS: STACK</td></tr><tr><td colspan="2">BEGIN: MOV AX, DATA</td></tr><tr><td colspan="2">MOV DS, AX</td></tr><tr><td colspan="2">MOV AX, X</td></tr><tr><td colspan="2">IMUL Y</td></tr><tr><td colspan="2">MOV CX, DX</td></tr><tr><td colspan="2">MOV BX, AX</td></tr><tr><td colspan="2">MOV AX, Z</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CWD</td><td style='text-align: center; word-wrap: break-word;'>;将 z 扩展成双字  $ \rightarrow $ DX, AX</td></tr><tr><td colspan="2">ADD BX, AX</td></tr><tr><td colspan="2">ADC CX, DX</td></tr><tr><td colspan="2">SUB BX, 5000</td></tr><tr><td colspan="2">SBB CX, 0</td></tr><tr><td colspan="2">MOV AX, W</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CWD</td><td style='text-align: center; word-wrap: break-word;'>;将 W 扩展成双字  $ \rightarrow $ DX, AX</td></tr><tr><td colspan="2">SUB AX, BX</td></tr><tr><td colspan="2">SBB DX, CX</td></tr><tr><td colspan="2">IDIV X</td></tr><tr><td colspan="2">MOV F, AX</td></tr><tr><td colspan="2">MOV F+2, DX</td></tr><tr><td colspan="2">MOV AH, 4CH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>INT 21H</td><td style='text-align: center; word-wrap: break-word;'>;退出用户程序, 返回 DOS 状态</td></tr><tr><td colspan="2">ENDS</td></tr><tr><td colspan="2">END BEGIN</td></tr></table>

程序运行后，在变量 F 中存入了 200，对应的十六进制数 00C8H，而余数 0 送入变量  $ F+2 $ 中。

### 4.5.2 分支结构程序

分支结构程序的特点是：CPU将根据不同的条件，使程序跳转到某个指定的地址去执行不同的指令。有两种分支形式：一是一次只引出两个分支；二是可能引出多个分支。设计分支程序时，通常要根据分支条件的情况，利用CMP、AND、OR、TEST等指令把分支条件转换为某个标志位的状态，再通过条件转移指令控制CPU转向不同的程序段去执行。

【例 4-6】比较以存储变量 D1 和 D2 表示的两个有符号字数据（即 -123 与 -120）的大小，将其中较大数据放在 BX 寄存器中。

程序如下。

DATA SEGMENT
D1 DW - 123H
D2 DW - 120H
DATA ENDS
CODE SEGMENT
ASSUME CS: CODE, DS: DATA
BEGIN: MOV AX, DATA
MOV DS, AX
MOV BX, D1
;补码为 FF85H
;补码为 FF88H
;说明代码段、数据段
;给 DS 赋段值

COMP BX, D2
JGE NEXT ;若  $ D1 \geq D2 $，则不交换，较大数已存入 BX，转 NEXT
MOV BX, D2 ;若  $ D1 < D2 $，则交换
NEXT: MOV AH, 4CH
INT 21H ;返回 DOS 状态
CODE ENDS
END BEGIN

【例 4-7】试编制计算下列函数值的程序（设 x、y 为带符号 8 位二进制数）：

 $$ a=\left\{\begin{aligned}&1& 当 x\geqslant0,y\geqslant& 时 \\&-1& 当 x<0,y<0& 时 \\&0& 当 x、y 异号时 \end{aligned}\right. $$

分析：依题意，输入数据为 x、y，输出数据为 a。假定存储单元分配为：变量 X、Y 中存放 x、y 的值，变量 A 用来存放函数值 a。则函数中各变量均为字节类型。

程序如下。

DATA SEGMENT
X DB-12
Y DB 9
A DB ?
DATA ENDS
STACK SEGMENT STACK
DB 200 DUP(0)
STACK ENDS
CODE SEGMENT
ASSUME CS: CODE, DS: DATA, SS: STACK
BEGIN: MOV AX, DATA
MOV DS, AX ;为 DS 赋值 DATA
CMP X, 0 ;判断 x 是否为负
JS L1 ;若 x<0, 则转 L1
CMP Y, 0 ;判 y 是否小于零
JL L2 ;若 x≥0, y<0, 则转 L2
MOV A, 1 ;若 x≥0, y≥0, 则 1→A, 且无条件转 EXIT
JMP EXIT ;若 x<0, y<0, 则 -1→A, 且无条件转 EXIT
L1: CMP Y, 0
JGE L2 ;若 x<0, y≥0, 则转 L2
MOV A, -1 ;若 x<0, y<0, 则 -1→A, 且无条件转 EXIT
JMP EXIT ;若 x与 y异号, 则 0→A
L2: MOV A, 0
EXIT: MOV AH, 4CH
INT 21H
CODE ENDS
END BEGIN

### 4.5.3 循环结构程序

循环结构程序的特点是：按设计的循环控制数，重复地对不同对象做相同的操作过程。在编程时，可根据循环控制条件放在循环体前后的位置，分为两种结构形式：一种是将循环

控制条件放在循环体的入口处，先判断条件，满足条件则执行循环体的程序段，否则退出循环；另一种则相反，将循环控制条件放在循环体的出口处，先执行循环体，然后再判断循环控制条件，不满足条件则继续执行循环操作，一旦满足条件则退出循环。不论哪一种循环结构形式，其程序都由设置循环初始化、循环体和循环控制3部分组成。

【例 4-8】 找出从无符号字节数据存储变量 VAR 开始存放的 N 个数中的最大数放在 BH 中。现假定 VAR 数据存储变量中的 N 个无符号数为 5、7、19H、23H 与 0A0H。程序如下。

DSEG SEGMENT
VAR DB 5, 7, 19H, 23H, 0A0H
N EQU $-VAR
DSEG ENDS
CSEG SEGMENT
ASSUME CS: CSEG, DS: DSEG ;说明代码段、数据段
BG: MOV AX, DSEG
MOV DS, AX ;给 DS 赋段值
MOV CX, N-1 ;置循环控制数
MOV SI, 0
MOV BH, VAR[SI] ;取第 1 字节数到 BH
JCXZ LAST ;置循环控制条件，如果 CX=0 则转至结束
AGIN: INC SI ;进入循环体入口
CMP BH, VAR[SI] ;若判断 BH 中为较大数，则跳转至循环体入口
JAE NEXT ;若判断 BH 中为较小数，则先交换；使 BH 中存较大数；后，再跳转至循环体入口
NEXT: LOOP AGIN ;CX←CX-1，若 CX 不等于 0 则转回到循环体入口
LAST: MOV AH, 4CH ;用户程序结束，返回 DOS 状态
CSEG ENDS BG

这个例子的程序结构是顺序、分支、循环3种结构的复合。在应用实例中，程序结构不会是单一的顺序、单一的分支或者单一的循环，而是多种基本结构的复合。保证了这一点，程序的结构就是比较良好的。为了增强程序的可读性，使程序功能的层次性更加分明，便于较大软件设计的分工合作，往往将一个大的程序中的诸多功能用功能子程序来实现，主程序采用“调用”的形式来组装这些功能子程序。

【例 4-9】将一组有符号存储字节数据按照从小到大的顺序排序。设数组变量为 VAR，数组元素个数为 N。

分析：这是一个排序问题，可采用气泡浮起（或称冒泡排序法）的算法思想来实现上述要求。这种算法的原理是：从第一个数开始依次对相邻的数做两两比较，并使相邻的两数按从小到大顺序排列，直到数组中任意两个相邻的数都是从小到大时，则排序结束。为简单起见，不妨设该组数是-1、8、-5、-8共4个数来说明这种算法思想。

具体排序过程可参见表4-2。

<div style="text-align: center;"><div style="text-align: center;">表4-2 数据排序过程</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>排序前数据顺序</td><td style='text-align: center; word-wrap: break-word;'>第1轮比较</td><td style='text-align: center; word-wrap: break-word;'>第2轮比较</td><td style='text-align: center; word-wrap: break-word;'>第3轮比较</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>VAR[1]=-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-5</td><td style='text-align: center; word-wrap: break-word;'>-8</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>VAR[2]=8</td><td style='text-align: center; word-wrap: break-word;'>-5</td><td style='text-align: center; word-wrap: break-word;'>-8</td><td style='text-align: center; word-wrap: break-word;'>-5</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>VAR[3]=-5</td><td style='text-align: center; word-wrap: break-word;'>-8</td><td style='text-align: center; word-wrap: break-word;'>-1</td><td style='text-align: center; word-wrap: break-word;'>-1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>VAR[4]=-8</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>8</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>数组变量VAR有4个数，但元素按-1、8、-5、-8先后次序无序排列</td><td style='text-align: center; word-wrap: break-word;'>从第1个数-1开始做3次两两相邻的数据比较，使这一组数中的最大数8被排在最后</td><td style='text-align: center; word-wrap: break-word;'>因第1轮比较后已将最大数“沉入”最底部，故第2轮比较只需对前3个数进行排序，即做2次比较</td><td style='text-align: center; word-wrap: break-word;'>因2轮比较后已将最大的两个数“沉入”最底部，故第3轮比较只对前2个数进行排序，即做1次比较</td></tr></table>

经上述分析后可知：对 N 个元素的排序采用这种算法思想最多要做 N-1 轮比较；第 i 轮比较时，应做 N-i 次两两比较及交换。

如果对第 i 轮的比较及交换用一子程序来实现，即子程序功能是从第 1 个元素开始做  $ N-i $ 次两两比较交换，主程序对该子程序做  $ N-1 $ 次调用，即完成对 N 个数的排序。

设子程序名为：SUBP。

子程序的输入为：DX 表示当前是第几轮比较。

数组为：VAR。

子程序的输出为：做了第 DX 轮比较及交换的数组。

现将 SUBP 作为段内过程，则气泡浮起程序如下。

D SEGMENT
VAR DB -1, -10, -100, 27H, 0AH, 47H
N EQU $ -VAR
D ENDS
C SEGMENT
ASSUME CS: C, DS: D ;说明代码段、数据段
B: MOV AX, D
MOV DS, AX ;给 DS 赋取值
MOV CX, N-1 ;设置 N-1 轮比较次数
MOV DX, 1 ;比较轮次数，输入子程序
AG: CALL SUBP
INC DX
LOOP AG
MOV AH, 4CH
INT 21H
SUBP PROC
PUSH CX
MOV CX, N
SUB CX, DX
MOV SI, 0
RECMP: MOV AL, VAR[SI]
CMP AL, VAR[SI+1]
JLE NOCH

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="6">NOCH:</td><td style='text-align: center; word-wrap: break-word;'>XCHG</td><td style='text-align: center; word-wrap: break-word;'>AL, VAR[SI+1]</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>XCHG</td><td style='text-align: center; word-wrap: break-word;'>AL, VAR[SI]</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>INC</td><td style='text-align: center; word-wrap: break-word;'>SI</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LOOP</td><td style='text-align: center; word-wrap: break-word;'>RECMP</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>POP</td><td style='text-align: center; word-wrap: break-word;'>CX</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>RET</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>SUBP</td><td style='text-align: center; word-wrap: break-word;'>ENDP</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>C</td><td style='text-align: center; word-wrap: break-word;'>ENDS</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>END</td><td style='text-align: center; word-wrap: break-word;'>B</td></tr></table>

在此例中，若用子程序中的指令序列代替主程序中的 CALL 指令，则程序结构为一个多重循环结构。由此可知，解决某一个具体问题的程序，其结构可以多样化。采用何种结构，由程序员决定。但采用良好的结构，即用上列几种基本结构复合，则有利于增强程序的可维护性、可读性、正确性等。

## 本章小结

汇编语言程序设计是编程人员必须掌握的基本功。而对大多数非编程人员来说，学习汇编语言的语法特点、程序结构和编程方法，对于深入理解硬件与软件的相互关系和工作原理，也是一个重要的基础。

在理解和应用汇编语言时，先要弄清汇编源程序、汇编、手工汇编与机器汇编、汇编程序等名词的含义。分清程序段与源程序的区别，理解用汇编语言书写的程序是不能为机器所识别和执行的，而必须翻译成机器代码组成的目标文件。

汇编语言源程序的语句可分为指令性语句和指示性语句两大类。它们的区别在于语句中是使用指令还是使用伪指令。在表达两种语句时，常用变量和标号来分别表示它们后面的两个不同含义的符号地址，前者表示某个数据在数据存储段中的地址，而后者表示某条指令在代码存储段中的地址。变量后面没冒号，而标号后面一定带冒号。

汇编语言中的伪指令有数据定义伪指令(DB、DW、DD、DQ、DT等)、符号定义伪指令(EQU、=、LABEL)、段定义伪指令(SEGMENT、ENDS、ASSUME、ORG)、过程定义伪指令(PROC、ENDP)等类。

编写汇编语言程序的基本步骤：①分析问题，建立数学模型，确定算法；②设计程序的逻辑结构，编制程序流程图；③合理分配内存空间；④编制程序与静态检查；⑤程序调试（动态检查）。

汇编程序设计的一般方法有顺序结构、分支结构和循环结构3种程序结构设计。主要掌握分支结构和循环结构程序结构设计。

最后需要指出的是，不同的汇编程序版本所支持的 CPU 指令集和伪指令会有所不同，汇编程序的版本越高，支持的硬指令和伪指令越多，功能也就越强。

## 习题4

4-1 说明 MOV BX, DATA 和 MOV BX, OFFSET DATA 指令之间有何区别。

4-2 指令语句 AND AX, OPD1 AND OPD2 中, OPD1 和 OPD2 是两个已赋值的变量, 两个 AND 在含义上和操作上有何区别?

4-3 已知一数组语句定义为：

ARRAY DW 100 DUP(567H, 3 DUP(?)), 5678H

请指出下列指令执行后，各寄存器中的内容是多少。

MOV BX, OFFSET ARRAY
MOV CX, LENGTH ARRAY
MOV SI, 0
ADD SI, TYPE ARRAY

4-4 已知某数据段中有

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>COUNT1</td><td style='text-align: center; word-wrap: break-word;'>EQU</td><td style='text-align: center; word-wrap: break-word;'>16H</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>COUNT2</td><td style='text-align: center; word-wrap: break-word;'>DW</td><td style='text-align: center; word-wrap: break-word;'>16H</td></tr></table>

下面两条指令有何异同？

MOV AX, COUNT1
MOV BX, COUNT2

4-5 下列程序段执行后，寄存器 AX、BX 和 CX 的内容分别是多少？

ORG 0202H
DA_WORD DW 20H
MOV AX, DA_WORD
MOV BX, OFFSET DA_WORD
MOV CL, BYTE PTR DA_WORD
MOV CH, TYPE DA_WORD

4-6 已知下列数组语句：

ORG 0100H
ARY DW 3, $+4, 5, 6
CNT EQU $-ARY
DB 7, 8, CNT, 9

执行语句 MOV AX, ARY+2 和 MOV BX, ARY+10 后，AX=? BX=?

4-7 假设数据段的定义为：

P1 DW ?
P2 DB 32 DUP(?)
PLENTH EQU $-P1

试问 PLENTH 的值为多少？它表示什么意义？

4-8. 在 MOV AX, [BX+SI] 与 MOV AX, ES: [BX+SI] 两个语句中，数据项段的属性有什么不同？

4-9 某程序设置的数据区为：

DATA SEGMENT
DB1 DB 12H, 34H, 0, 56H
DW1 DW 78H, 90H, 0AB46H, 1234H
ADR1 DW DB1
ADR2 DW DW1
AAA DW $-DB1
BUF DB 5 DUP(0)
DATA ENDS

画出该数据段内容在内存中的存放形式（要求用十六进制补码表示，按字节组织）。

4-10 分析下列程序：

A1 DB 10 DUP(?)
A2 DB 0,1,2,3,4,5,6,7,8,9
 :
 MOV CX, LENGTH A1
 MOV SI, SIZE A1-TYPE A1
LP: MOV AL, A2[SI]
 MOV A1[SI], AL
 SUB SI, TYPE A1
 DEC CX
 JNZ LP
 HLT

（1）该程序的功能是什么？

（2）该程序执行后，A1 单元开始的 10 个字节内容是什么？

4-11 假设 BX=45A7H，变量 VALUE 中存放的内容为 78H，下列各条指令单独执行后，BX=?

(1) XOR BX, VALUE

(2) SUB BX, VALUE

(3) OR BX, VALUE

(4) XOR BX, OFFH

(5) AND BX,00H

(6) TEST BX, 01H

4-12 已知：

DABY1 DB 6BH
DABY2 DB 3DUP(0)

编写一段程序，把 DABY1 字节单元中的数据分解成 3 个八进制数，其最高位八进制数据存放在 DABY2 字节单元中，最低位存放在 DABY2+2 字节单元中。

4-13 从 BUF 地址处起，存放有 60 字节的字符串，设其中有一个以上的 A 字符，试编

程查找出第一个 A 字符相对起始地址的距离，并将其存入 LEN 单元。

4-14 以 BUF1 和 BUF2 开头的两个字符串，其长度均为 LEN，试编程实现：

（1）将 BUF1 开头的字符串传送到 BUF2 开始的内存空间。

（2）将 BUF1 开始的内存空间全部清 0。

## 4-15 试分析下列程序：

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>BUF</td><td style='text-align: center; word-wrap: break-word;'>DB</td><td style='text-align: center; word-wrap: break-word;'>OBH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, BUF</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>CALL</td><td style='text-align: center; word-wrap: break-word;'>FAR PTR HECA</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>HECA</td><td style='text-align: center; word-wrap: break-word;'>PROC</td><td style='text-align: center; word-wrap: break-word;'>FAR</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>CMP</td><td style='text-align: center; word-wrap: break-word;'>AL, 10</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>JC</td><td style='text-align: center; word-wrap: break-word;'>LP</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>ADD</td><td style='text-align: center; word-wrap: break-word;'>AL, 7</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LP:</td><td style='text-align: center; word-wrap: break-word;'>ADD</td><td style='text-align: center; word-wrap: break-word;'>AL, 30H</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DL, AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>SH, 2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>INT</td><td style='text-align: center; word-wrap: break-word;'>21H</td></tr><tr><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>RET</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>HECA</td><td style='text-align: center; word-wrap: break-word;'>ENDP</td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

（1）该程序是什么结构的程序？功能是什么？

（2）程序执行后，DL=?

（3）屏幕上显示输出的字符是什么？

4-16 分析下列程序：

DATA SEGMENT
NUM DB 06H
SUM DB ?
DATA ENDS
STACK SEGMENT PARA STACK 'STACK'
STAPN DW 100 DUP (?)
STACK ENDS
CODE SEGMENT
ASSUME CS: CODE, DS: DATA, SS: STACK
START: MOV AX, DATA
MOV DS, AX
PUSH AX
PUSH DX
CALL AAA
MOV AH, 4CH
INT 21H
AAA PROC
XOR AX, AX
MOV DX, AX
INC DL
MOV CL, NUM
MOV CH, 00H
BBB: ADD AL, DL
DAA INC DL

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>LOOP</td><td style='text-align: center; word-wrap: break-word;'>BBB</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>SUM, AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>RET</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>AAA</td><td style='text-align: center; word-wrap: break-word;'>ENDP</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CODE</td><td style='text-align: center; word-wrap: break-word;'>ENDS</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>END</td><td style='text-align: center; word-wrap: break-word;'>START</td></tr></table>

（1）程序执行到 MOV AH,4CH 语句时，AX=? DX=? SP=?

(2) BBB: ADD AL, DL 语句的功能是什么?

（3）整个程序的功能是什么？

4-17 试编写一个程序，找出 BUF 数据区中 N 个带符号数（设为 11H、22H、33H、44H、55H、66H、77H、88H）中的最大数和最小数。

4-18 试编写一个程序，统计出某数组中相邻两数间符号变化的次数。

4-19 若 AL 中的内容为 2 位压缩的 BCD 数，即 6AH，试编程实现下列功能：

（1）将其拆开成非压缩的 BCD 码，高低位分别存入 BH 和 BL 中。

（2）将上述已求出的2位BCD码变换成对应的ASCII码，并存入CH和CL中。

4-20 设一存储区中存放有10个带符号的单字节数（设为-10、15H、20H、-1、-23、46H、16H、-33、65H、88H），现要求分别求出其绝对值后存放到原单元中，试编写出汇编源程序。
