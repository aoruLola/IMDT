# 第3章 微处理器的指令系统

> 来源：docs/08_电子书/计算机硬件技术基础（第4版）-李继灿.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：0c93d8c7280859f1


## 【学习目标】

8086/8088 CPU 的指令系统是 Intel 80x86 系列 CPU 共同的基础，其后续高型号微处理器的指令系统都是在此基础上新增了一些指令逐步扩充形成的。同时，它也是目前应用范围最广的一种指令系统。因此，本章重点讨论 8086/8088 CPU 的指令系统。

通过本章对 8086/8088 CPU 寻址方式和指令系统的学习，应该掌握汇编语言程序设计所需要的汇编语言和编写程序段的基础知识。

### 【学习要求】

在理解与掌握各种寻址方式的基础上，着重掌握存储器寻址的各种寻址方式。

☑ 应熟练掌握4类数据传送指令，难点是 XLAT、IN、OUT 指令。

学习算术运算类指令中的难点是带符号乘、除指令与十进制指令。

学习逻辑运算和移位循环类指令时，要着重理解 CL 的设置和进位位的处理。

学习串操作类指令时，着重理解重复前缀的使用。

学习程序控制类指令时，着重理解条件转移的条件及测试条件。

## 3.1 8086/8088 的寻址方式

指令格式包括操作码和操作数（或地址）两部分，根据操作码所指定的功能去寻找操作数所在地址的方式就是寻址方式。要熟悉指令的操作首先要了解寻址方式。8086/8088的寻址方式分为两种不同的类型：数据寻址方式和程序存储器寻址方式。前者是寻址操作数地址，后者是寻址程序地址（在代码段中）。

### 3.1.1 数据寻址方式

数据寻址方式有多种，图3-1给出了各种数据寻址方式的类型、指令举例以及存储器地址生成方法与数据流向，所有操作数的流向都是由源到目标，即它们在指令汇编语言格式的操作数区域中都是规定由右到左。源和目标可以是寄存器或存储器，但不能同时为存储器

（除个别串操作指令 MOVS 外）。下面将分别对各种寻址方式给予更详细的说明。

<div style="text-align: center;"><div style="text-align: center;">注：BX=3000H, SI=0400H, ARRAY=0100H, DS=2000H</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 3-1 8086/8088 数据寻址方式</div> </div>

## 1. 立即寻址

立即寻址是将立即数传送到目标寄存器或存储器中。操作数就在指令中，当执行指令时，CPU直接从紧跟着指令代码的后续地址单元中（经队列缓冲器）取得该立即数，而不必执行总线周期。立即数可以是8位，也可以是16位；并规定只能是整数类型的源操作数。这种寻址主要用来给寄存器赋初值，指令执行速度快。表3-1列出了各种立即数寻址的MOV指令。

## 2. 寄存器寻址

寄存器寻址是最通用的数据寻址方式。其操作数就放在CPU的寄存器中，而寄存器名在指令中指出。对16位操作数来说，寄存器可以为8个16位通用寄存器，而对8位操作数来说，寄存器只能为AH、AL、BH、BL、CH、CL、DH、DL。在一条指令中，源操作数或/和目的操作数都可以采用寄存器寻址方式。这种寻址的指令长度短，操作数就在CPU内部进行，不需要使用总线周期，所以执行速度快。注意，使用时源与目标操作数应有相同的数据类型长度。

表3-2列出了各种寄存器寻址的 MOV 指令。注意，代码段寄存器不能用 MOV 指令来改变，因为若只改变 CS 而 IP 为未知数，则下一条指令的地址将是不确定的，这可能引起系统运行的紊乱。

<div style="text-align: center;"><div style="text-align: center;">表3-1 使用立即寻址的 MOV 指令示例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>汇编语句</td><td style='text-align: center; word-wrap: break-word;'>长度/位</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AH,4CH</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把 4CH 传送到 AH 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AX,1234H</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把 1234H 传送到 AX 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV DI,0</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把 0000H 传送到 DI 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV CL,100</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把 100(64H) 传送到 CL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AI, &#x27;A&#x27;</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把 ASCII 码 A(41H) 传送到 AL 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AX, &#x27;AB&#x27;</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把 ASCII 码 BA $ ^{{*}} $ (4241H) 传送到 AX 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV CL,10101101B</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把二进制数 10101101 传送到 CL 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV WORD PTR [SI], 6180H</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把立即数 6180H 传送到数据段由 SI 和 SI+1 所指的两存储单元中</td></tr></table>

注： $ ^{*}AB' $在内存中的数据结构为ASCII码BA。

<div style="text-align: center;"><div style="text-align: center;">表3-2 使用寄存器寻址的 MOV 指令示例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>汇编语句</td><td style='text-align: center; word-wrap: break-word;'>长度/位</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AL,BL</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把 BL 复制到 AL 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV BH,BL</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把 BL 复制到 BH 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV CX,AX</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把 AX 复制到 CX 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV SP,BP</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把 BP 复制到 SP 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV DI,SI</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把 SI 复制到 DI 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AX,ES</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把 ES 复制到 AX 中</td></tr></table>

下面将讨论属于存储器寻址的各种寻找方式。指令系统中采用的复杂的寻址方式主要是针对存储器操作数而言的。当CPU寻找存储器操作数时，必须先经总线接口单元（BIU）的总线控制逻辑电路进行存取。当执行单元（EU）需要读写位于存储器的操作数时，应根据指令给出的寻址方式，由EU先计算出操作数地址的偏移量（即有效地址EA），并将它送给BIU，同时请求BIU执行一个总线周期，BIU将某个段寄存器的内容左移4位，加上由EU送来的偏移量形成一个20位的物理地址，然后执行总线周期，读写指令所需的操作数。8086/8088 CPU所寻址的操作数地址的有效地址EA，是一个无符号的16位地址码，表示操作数所在段的首地址与操作数地址之间的字节距离。所以，它实际上是一个相对地址。EA的值由汇编程序根据指令所采用的寻址方式自动计算得出。计算EA的通式为：

 $$  EA= 基址值 (BX 或 BP)+ 变址值 (SI 或 DI)+ 位移量 DISP $$

## 3. 直接数据寻址

直接数据寻址有两种基本形式：直接寻址和位移寻址。

### 1）直接寻址

直接寻址简单、直观，其含义是指令中以位移量方式直接给出存储器操作数的偏移地址，即有效地址EA=DISP。这种寻址方式的指令执行速度快，用于存储单元与AL、AX之

间的 MOV 指令。

#### 2）位移寻址

位移寻址也以位移量方式直接给出存储器操作数的偏移地址，但适合于几乎所有将数据从存储单元传送到寄存器的指令。

以上两种方式都是把位移量加到默认的数据段地址或其他段地址上形成的。表3-3列出了使用AX、AL直接寻址的指令示例；表3-4列出了使用位移量直接数据寻址的指令示例。

<div style="text-align: center;"><div style="text-align: center;">表3-3 使用 AX、AL 直接寻址的指令示例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>汇编语句</td><td style='text-align: center; word-wrap: break-word;'>长度/位</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AX, $ [1680H]^{*} $</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把数据段存储器地址 1680H 和 1681H 两单元的字内容复制到 AX 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AX,NUMBER</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把数据段存储器地址 NUMBER 中的字内容复制到 AX 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV TWO,AL</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把 AL 的字节内容复制到数据段存储单元 TWO 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV ES: $ [3000H] $,AX</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把 AX 的字内容复制到附加数据段存储单元 3000H 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AX,DATA</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把数据段存储单元 DATA 的字内容复制到 AX 中</td></tr></table>

注： $ ^{*} $汇编语言中很少采用绝对偏移地址，通常采用符号地址。

<div style="text-align: center;"><div style="text-align: center;">表3-4 使用位移量直接数据寻址的指令示例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>汇编语句</td><td style='text-align: center; word-wrap: break-word;'>长度/位</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV CL,COW</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把数据段存储单元 COW 的内容(字节)复制到 CL 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV ES,NUMBER</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把数据段存储器地址 NUMBER 中的内容(字)复制到 ES 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV CX,DATA2</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把数据段存储单元 DATA2 中的内容(字)复制到 CX 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV DATA3,BP</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把基址指针寄存器 BP 的内容复制到数据段存储单元 DATA3 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV DI,SUM</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把数据段存储单元 SUM 的字内容复制到 DI 中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV NUMBER,SP</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把 SP 的内容复制到数据段存储单元 NUMBER 中</td></tr></table>

位移寻址与直接寻址的操作相同，只是它的指令为4B长而不是3B长。

【例 3-1】 MOV CL, [2000H]指令与 MOV AL, [2000H]指令的操作相同，但 MOV CL, [2000H]指令为 4B 长，而 MOV AL, [2000H]指令为 3B 长。

## 4. 寄存器间接寻址

寄存器间接寻址的操作数一定是在存储器中，而存储单元的有效地址 EA 则由寄存器保存，这些寄存器是基址寄存器 BX、基址指针寄存器 BP、变址寄存器 SI 和 DI 之一或它们的某种组合。书写指令时，这些寄存器带有方括号[]。

【例 3-2】设 BX=3000H, DS=2000H, 当执行 MOV AX, [BX]指令后, 则数据段存储单元为 23000H 处的字内容将被复制 AX 中, 即 23000H 的内容送到 AL, 23001H 的内容送到 AH。指令中的方括号[]在汇编语言中表示间接寻址。表 3-5 给出了寄存器间接寻址的指令示例。

<div style="text-align: center;"><div style="text-align: center;">表 3-5 寄存器间接寻址的指令示例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>汇编语句</td><td style='text-align: center; word-wrap: break-word;'>长度/位</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AL,[BX]</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把数据段中以BX作为有效地址的存储单元的内容（字节）复制到AL中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV [SI],BL</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把寄存器BL的内容复制到数据段以SI作为有效地址的存储单元</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV CX,[DX]</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把数据段由DX寻址的存储单元的内容（字）复制到CX中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV [BP],CL*</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把寄存器CL的内容复制到堆栈段以BP作为有效地址的存储单元中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV [SI],[BX]</td><td style='text-align: center; word-wrap: break-word;'>—</td><td style='text-align: center; word-wrap: break-word;'>除数据串操作指令外，不允许由存储器到存储器的传送</td></tr></table>

注： $ ^{*} $系统把由BP寻址的数据默认为在堆栈段中，其他间接寻址方式均默认为数据段。

当使用 BX、DI 和 SI 寻址存储器时，寄存器间接寻址或任何其他寻址方式都默认使用数据段，而使用基址指针寄存器 BP 寻址存储器时，则默认使用堆栈段。

在使用寄存器间接寻址时，要注意在某些情况下，要求用指定的类型运算伪指令 BYTE PTR、WORD PTR 或 DWORD PTR 来规定传送数据的长度。

【例 3-3】 MOV AL, [SI] 指令的书写格式是对的，因为汇编程序能够清楚地根据 AL 来判明 [SI] 是指定存储器数据为字节传送类型。

【例 3-4】 MOV [SI], 6AH 指令的书写格式是模糊的，因为汇编程序不能根据立即数 6AH 确定 [SI] 存储单元的数据类型的长度。如果将此指令书写成 MOV BYTE PYR[SI], 6AH, 则汇编程序就能清楚地判明 SI 所寻址的存储单元为字节类型。

## 5. 基址加变址寻址

基址加变址寻址类似于间接寻址，它也是间接地寻址存储器数据。其操作数的有效地址EA是一个基址寄存器(BX或BP)的内容与一个变址寄存器(SI或DI)的内容之和。

【例 3-5】 MOV [BX+SI], CL 指令是将寄存器 CL 中的字节内容复制到数据段中由 BX 加 SI 寻址的存储单元中。

在使用基址加变址寻址时，通常用基址寄存器保持存储器数组的起始地址，而变址寄存器保持数组元素的相对位置。如果是用BP寄存器寻址堆栈段存储器数组，则由BP寄存器和变址寄存器两者生成有效地址。

【例 3-6】当执行指令 MOV DX, [BP + SI] 时，若 BP = 2000H, SI = 0300H, SS = 1000H，则指令执行后，将把堆栈段中 12300H 单元的字数据传送到 DX 寄存器。表 3-6 给出了基址加变址寻址的指令示例。

## 6. 寄存器相对寻址

寄存器相对寻址是带有位移量 DISP 的基址或变址寄存器（BX、BP 或 DI、SI）寻址。

【例 3-7】在 MOV AX, [SI + 4000H] 指令中，假设 SI = 0500H, DS = 2000H，则指令执行时，微处理器按段加偏移寻址机制得到的有效地址为 EA = SI + 4000H = 4500H，再加上 DS × 10H = 20000H，生成所寻址的存储器物理地址为 24500H，于是，指令执行后将把数据段存储单元 24500H 中的字内容送到 AX。表 3-7 给出了寄存器相对寻址的指令示例。

<div style="text-align: center;"><div style="text-align: center;">表3-6 基址加变址寻址的指令示例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>汇编语句</td><td style='text-align: center; word-wrap: break-word;'>长度/位</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV CL,[BX+SI]</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把以BX+SI作为有效地址的数据段存储单元的内容（字节）复制到CL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV CX,[BP+DI]</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把以BP+DI作为有效地址的堆栈段存储单元内的内容（字）复制到CX</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV [BX+DI],SP</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把SP的内容（字）存入以BX+DI作为有效地址的数据段存储单元</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV [BP+SI],CH</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把寄存器CH的内容（字节）存入以BP+SI作为有效地址的堆栈段存储单元</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV [AX+BX],CX</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把CX中的内容（字）存入以AX+BX作为有效地址的数据段存储单元</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">表3-7 寄存器相对寻址的指令示例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>汇编语句</td><td style='text-align: center; word-wrap: break-word;'>长度/位</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV CL,[SI+200H]</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把以SI+200H作为有效地址的数据段存储单元的字节内容装入CL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV ARRAY[DI],BL</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把BL中的字节内容存入以ARRAY+DI作为有效地址的数据段存储单元</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV LIST[DI+3],AX</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把AX的字内容存入以LIST+DI+3之和作为有效地址的数据段存储单元</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AX,ARRAY[BX]</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把数据段中以ARRAY+BX作为有效地址的字内容装入AX</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV SI,[AL+12H]</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把以AL+12H作为有效地址的数据段存储单元的字内容装入SI</td></tr></table>

## 7. 相对基址加变址寻址

相对基址加变址寻址是用基址、变址与位移量3个分量之和形成有效地址的寻址方式。

【例 3-8】在 MOV AX, [BX+DI+200H] 指令中，设 BX=0100H, DI=0300H, DS=4000H。当指令执行时，先计算出有效地址为 EA=BX+DI+200H=0600H，指令运行后，将把数据段存储单元 40600H 中的字内容装入 AX。表 3-8 给出了相对基址加变址寻址的指令示例。

相对基址加变址寻址方式一般很少使用，通常用来寻址存储器的二维数组数据。

【例 3-9】存储器中有一个文件 FILE 包含 A、B、C、D 共 4 个记录，每个记录又包含 10 个元素，如果要求将其中存储在单元 RECA 中的记录 A 的元素 0 复制到记录 D 的元素 4，这时，可以用位移量寻址文件，用基址寄存器 BX 寻址记录，而用变址寄存器 DI 寻址记录中的元素。程序段如下。

MOV BX, OFFSET RECA
MOV DI, 0
MOV AL, FILE [BX+DI]

MOV BX, OFFSET RECD ; 寻址记录 D 的存储单元 RECD

MOV DI, 4 ; 寻址单元 4

MOV FILE[BX+DI], AL ; 复制到记录 D 的元素 4 中

<div style="text-align: center;"><div style="text-align: center;">表 3-8 相对基址加变址寻址的指令示例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>汇编语句</td><td style='text-align: center; word-wrap: break-word;'>长度/位</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV BL,[BX+SI+100H]</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把以BX+SI+100H作为有效地址的数据段存储单元的字节内容装入BL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AX,ARRAY[BX+DI]</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把以ARRAY+BX+DI之和作为有效地址的数据段存储单元的字节内容装入AX</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV LIST[BP+DI],BX</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>把BX的字节内容存入以LIST+BP+DI之和作为有效地址的堆栈段存储单元</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AL,LIST[BX+DI]</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把以LIST+BX+DI之和作为有效地址的数据段存储单元的字节内容装入AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV FILE[BP+DI+2],DL</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>把DL存入以BP+DI+2之和作为有效地址的堆栈段存储单元</td></tr></table>

### 3.1.2 程序存储器寻址方式

程序存储器寻址方式即转移类指令（转移指令 JMP 和调用指令 CALL）的寻址方式。这种寻址方式最终是要确定一条指令的地址。

在8086/8088系统中，由于存储器采用分段结构，所以转移类指令有段内转移和段间转移之分。所有的条件转移指令只允许实现段内转移，而且是段内短转移，即只允许转移的地址范围在 $ -128\sim+127 $字节内，由指令中直接给出8位地址位移量。对于无条件转移和调用指令又可分为段内短转移、段内直接转移、段内间接转移、段间直接转移和段间间接转移5种寻址方式。

### 3.1.3 堆栈存储器寻址方式

表3-9列出了可以使用的一些PUSH和POP指令的示例。

<div style="text-align: center;"><div style="text-align: center;">表 3-9 PUSH 和 POP 指令的示例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>汇编语句</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>PUSHF</td><td style='text-align: center; word-wrap: break-word;'>把标志寄存器 FLAGS 的内容复制到堆栈中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>POPF</td><td style='text-align: center; word-wrap: break-word;'>把从堆栈弹出的一个字装入标志寄存器 FLAGS</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>PUSH DS</td><td style='text-align: center; word-wrap: break-word;'>把 DS 的内容复制到堆栈中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>PUSH 12ABH</td><td style='text-align: center; word-wrap: break-word;'>把 12ABH 压入堆栈</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>POP CS</td><td style='text-align: center; word-wrap: break-word;'>非法操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>PUSH WORD PTR[BX]</td><td style='text-align: center; word-wrap: break-word;'>把数据段中由 BX 寻址的存储单元内的字复制到堆栈中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>PUSH A</td><td style='text-align: center; word-wrap: break-word;'>把通用寄存器 AX、CX、DX、BX、SP、BP、DI、SI 的内容复制到堆栈中</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>POPA</td><td style='text-align: center; word-wrap: break-word;'>从堆栈中弹出数据并顺序装入 SI、DI、BP、SP、BX、DX、CX、AX 中</td></tr></table>

## 1. 串操作指令寻址方式

数据串（或称字符串）指令不能使用正常的存储器寻址方式来存取数据串指令中使用的操作数。执行数据串指令时，源串操作数第1个字节或字的有效地址应存放在源变址寄存器SI中（不允许修改），目标串操作数第1个字节或字的有效地址应存放在目标变址寄存器DI中（不允许修改）。在重复串操作时，8086/8088能自动修改SI和DI的内容，以使它们能指向后面的字节或字。因为指令中不必给出SI或DI的编码，所以串操作指令采用的是隐含寻址方式。

## 2. I/O 端口寻址方式

在8086/8088指令系统中，输入输出指令对I/O端口的寻址可采用直接或间接两种方式。

### 1）直接端口寻址

这种寻址方式端口地址以8位立即数方式在指令中直接给出。例如，IN AL, n指令是将端口号为8位立即数n的端口地址中的字节操作数输入到AL，它所寻址的端口号范围只能是0～255内。

#### 2）间接端口寻址

这种寻址方式类似于寄存器间接寻址，16位的I/O端口地址在DX寄存器中，即通过DX间接寻址，故可寻址的端口号为0～65535。例如，OUTDX，AL指令是将AL的字节内容输出到由DX指出的端口中去。

下面将详细讨论8086/8088的指令系统。8086/8088的指令按功能可分为6类：数据传送、算术运算、逻辑运算、串操作、程序控制和CPU控制。

## 3.2 数据传送类指令

数据传送类指令可完成寄存器与寄存器之间、寄存器与存储器之间以及寄存器与I/O端口之间的字节或字传送，除了SAHF和POPF指令对标志位有影响外，这类指令所具有的共同特点是不影响标志寄存器的内容。

### 3.2.1 通用数据传送指令

通用数据传送指令包括基本的传送指令 MOV、堆栈操作指令 PUSH 和 POP、数据交换指令 XCHG 与字节翻译指令 XLAT。

## 1. 基本的传送指令 MOV

MOV d, s; d←s

指令功能：将由源 s 指定的源操作数送到目标 d。

前面已介绍过 MOV 指令的使用例子。

注意：MOV 指令的源操作数可以是 8/16 位寄存器、存储器中的某个字节/字或者是 8/16 位立即数；目标操作数不允许为立即数，其他同源操作数。而且两者不能同时为存储器操作数。

MOV 指令可实现的数据传送类型可归纳为以下 7 种。

(1) MOV mem/reg1, mem/reg2

由 mem/reg2 所指定的存储单元或寄存器中的 8 位数据或 16 位数据传送到由 mem/reg1 所指定的存储单元或寄存器中，但不允许从存储器传送到存储器。这种双操作数指令中，必须有一个操作数是寄存器。例如，表 3-2～表 3-8 中所列的各种指令示例。

(2) MOV mem/reg, data

将8位或16位立即数data传送到由mem/reg所指定的存储单元或寄存器中。例如，表3-1所列的各种指令示例。

(3) MOV reg, data

将8位或16位立即数data传送到由reg所指定的寄存器中。

(4) MOV ac, mem

将存储单元中的8位或16位数据传送到累加器ac中。

(5) MOV mem, ac

将累加器 AL（8 位）或 AX（16 位）中的数据传送到由 mem 所指定的存储单元中。

(6) MOV mem/reg, segreg

将由 segreg 所指定的段寄存器(CS、DS、SS 或 ES)的内容传送到由 mem/reg 所指定的存储单元或寄存器中。

(7) MOV segreg, mem/reg

允许将由 mem/reg 指定的存储单元或寄存器中的 16 位数据传送到由 segreg 所指定的段寄存器（但代码段寄存器 CS 除外）中。

【例 3-10】 MOV DS, AX 指令是对的；而 MOV CS, AX 指令是错的。

注意：MOV 指令不能直接实现从存储器到存储器之间的数据传送，但可以通过寄存器作为中转站来完成这种传送。

【例 3-11】 MOV [SI], [BX] 指令是错的；而用以下两条指令是对的。

MOV AX, [BX]

MOV [SI], AX

【例 3-12】要将数据段存储单元 ARRAY1 中的 8 位数据传送到存储单元 ARRAY2 中，用 MOV ARRAY2, ARRAY1 指令是错的；而用以下两条指令则可以完成该操作。

MOV AL, ARRAY1

MOV ARRAY2, AL

### 1) PUSH s

字压入堆栈指令，允许将源操作数 s（16 位）压入堆栈。

#### 2) POP d

字弹出堆栈指令，允许将堆栈中当前栈顶两相邻单元的数据字弹出到 d。

PUSH 和 POP 是两条成对使用的进栈与出栈指令。其中，s 和 d 可以是 16 位寄存器或存储器两相邻单元，以保证堆栈按字操作。

【例 3-13】设当前 CS=1000H, IP=0030H, SS=2000H, SP=0040H, BX=2340H，则 PUSH BX 指令的操作过程如图 3-2 所示。

<div style="text-align: center;"><div style="text-align: center;">图 3-2 PUSH BX 指令的操作过程</div> </div>

该进栈指令执行时，堆栈指针被修改为 SP-2→SP，使之指向新栈顶 2003EH，同时将 BX 中的数据字 2340H 压入栈内 2003FH 与 2003EH 两单元中。

【例 3-14】设当前 CS=1000H，IP=0020H，SS=1600H，SP=004CH，则 POP CX 指令执行时，将当前栈顶两相邻单元 1604CH 与 1604DH 中的数据字弹出并传送到 CX 中，同时修改堆栈指针，SP+2→SP，使之指向新栈顶 1604EH。

PUSH 和 POP 两条指令可用来保存并恢复现场数据。由于堆栈中的内容是按 LIFO（后进先出）的次序进行传送的，因此，保存内容和恢复内容时，需按照对称的次序执行一系列压入指令和弹出指令。

【例 3-15】 若在一段子程序开头需要这样保存寄存器的内容：

则由子程序返回前，应该如下一一对应地恢复寄存器的内容：

使用堆栈操作指令时应该注意：

（1）堆栈操作是按字（即两字节）进行的，没有单字节的操作指令。

（2）每执行一条压入堆栈的指令，堆栈地址指针 SP 减 2，推入堆栈的数据放在栈顶，高位字节先入栈放在较高地址单元，低位字节后入栈放在较低地址单元（真正的栈顶地址单元）；而执行弹出指令时，正好相反，每弹出一个字，栈顶指针的值加 2。

（3）CS段寄存器的值可以压入堆栈，但却不能从堆栈中弹出一个字到CS段寄存器。

## 3. 数据交换指令 XCHG

XCHG d, s

本指令的功能是将源操作数与目标操作数（字节或字）相互对应交换位置。

交换可以在通用寄存器与累加器之间、通用寄存器之间、通用寄存器与存储器之间进行。但是，不能在两个存储单元之间交换，段寄存器与IP也不能作为源或目标操作数。

【例 3-16】XCHG AX, [SI+0400H]

设当前 CS=1000H，IP=0064H，DS=2000H，SI=3000H，AX=1234H，则该指令执行后，将把 AX 寄存器中的 1234H 与物理地址 23400H 单元开始的数据字（设为 ABCDH）相互交换位置，即 AX=ABCDH；(23400H)=34H，(23401H)=12H。

## 4. 字节翻译指令 XLAT

XLAT

字节翻译指令也称为代码转换或查表指令，它特别适合于不规则代码的转换。

该指令通过查表方式完成代码转换功能，执行操作是：AL←[BX+AL]。执行结果是将待转换的序号转换成对应的代码，并送回 AL 寄存器中。代码转换的操作步骤如下。

① 建立代码转换表（其最大容量为256B），将该表定位到内存中某个逻辑段的一片连续地址中，并将表的首地址的偏移地址置入BX。

② 将待转换的一个十进制数在表中的序号（又称索引值）送入 AL 寄存器中。该值实际上就是表中某一项与表格首地址之间的位移量。

③ 执行 XLAT 指令。

【例 3-17】已知 7 段显示码的编码规则为：0——01000000；1——01111001；2——00100100；3——00110000；4——00011001；5——00010010；6——00000010；7——01111000；8——00000000；9——00010000。设有一个十进制数 0～9 的 7 段显示码表被定位在当前数据段中，其起始地址的偏移地址值为 0030H。假定当前 CS = 2000H，IP = 007AH，DS = 4000H。若欲将 AL 中待转换的十进制数 5 转换成对应的 7 段码 12H，试分析执行 XLAT 指令的操作过程。

首先，将数据段中该转换表的首地址的偏移地址 0030H 置入 BX；再将待转换的十进制

数在表中的序号 05H 送入 AL；然后，执行 XLAT 指令。代码转换指令的功能与操作过程如图 3-3 所示。

<div style="text-align: center;"><div style="text-align: center;">图3-3 代码转换指令的功能</div> </div>

假设0～9的7段显示码表存放在偏移地址为0030H开始的内存中，则取出5所对应的7段码(12H)可以用如下3条指令的程序段完成。

MOV BX, 0030H
MOV AL, 5
XLAT

### 3.2.2 目标地址传送指令

这是一类专用于传送地址码的指令，可传送存储器的逻辑地址（即存储器操作数的段地址或偏移地址）至指定寄存器中，共包含3条指令：LEA、LDS和LES。

## 1. LEA d, s

这是取有效地址指令，其功能是把用于指定源操作数（它必须是存储器操作数）的16位偏移地址（即有效地址），传送到一个指定的16位通用寄存器中。这条指令常用来建立串操作指令所需要的寄存器指针。

 $$  【例 \;3-18】\quad LEA\;BX,\left[SI+100AH\right] $$

设当前 CS=1500H, IP=0200H, DS=2000H, SI=0030H, 源操作数 1234H 存放在 [SI+100AH] 开始的存储器内存单元中，则该指令的操作过程如图 3-4 所示。

该指令执行的结果，是将源操作数1234H的有效地址103AH传送到BX寄存器中。

请注意比较 LEA 指令和 MOV 指令的不同功能。

【例 3-19】 LEA BX, [SI] 指令是将 SI 指示的偏移地址 (SI 的内容) 装入 BX; 而 MOV BX, [SI] 指令则是将由 SI 寻址的存储单元中的数据装入 BX。

通常，LEA 指令用来使某个通用寄存器作为地址指针。

【例 3-20】LEA BX, [BP+DI]指令是将内存单元的偏移量(BP+DI)送 BX。LEA SP, [3768H]指令是使堆栈指针 SP 为 3768H。

<div style="text-align: center;"><div style="text-align: center;">图 3-4 LEA BX. [SI+100AH] 指令的操作过程</div> </div>

## 2. LDS d, s

这是取某变量的32位地址指针的指令，其功能是从由指令的源s所指定的存储单元开始，由4个连续存储单元中取出某变量的地址指针（共4字节），将其前两个字节（即变量的偏移地址）传送到由指令的目标d所指定的某16位通用寄存器，后两个字节（即变量的段地址）传送到DS段寄存器中。

### 【例 3-21】LDS SI,[DI+100AH]

设当前 CS=1000H, IP=0604H, DS=2000H, DI=2400H, 待传送的某变量的地址指针其偏移地址为 0180H, 段地址为 2230H, 则该指令的操作过程如图 3-5 所示。

<div style="text-align: center;"><div style="text-align: center;">图 3-5 LDS SI, [DI+100AH] 指令的操作过程</div> </div>

该指令执行后，将物理地址2340AH单元开始的4字节中前两个字节（偏移地址值）0180H传送到SI寄存器中，后两个字节（段地址）2230H传送到DS段寄存器中，并取代它

的原值 2000H。

## 3. LES d, s

这条指令与 LDS d, s 指令的操作基本相同，其区别仅在于将把由源操作数所指定的某变量的地址指针中后两个字节（段地址）传送到 ES 段寄存器，而不是 DS 段寄存器。

上述3条指令都是装入地址，但使用时要准确理解它们的不同含义。LEA指令是将16位有效地址装入任何一个16位通用寄存器；而LDS和LES是将32位地址指针装入任何一个16位通用寄存器及DS或ES段寄存器。

### 3.2.3 标志位传送指令

这类指令用于传送标志位，共有4条标志位传送指令：LAHF、SAHF、PUSHF和POPF。

## 1. LAHF

指令功能：将标志寄存器 FLAGS 的低字节（共包含 5 个状态标志位）传送到 AH 寄存器中。

LAHF 指令执行后，AH 的  $ \mathrm{D}_{7} $、 $ \mathrm{D}_{6} $、 $ \mathrm{D}_{4} $、 $ \mathrm{D}_{2} $、 $ \mathrm{D}_{0} $ 这 5 位将分别被设置成 SF（符号标志）、ZF（零标志）、AF（辅助进位标志）、PF（奇偶标志）、CF（进位标志）5 位，而 AH 的  $ \mathrm{D}_{5} $、 $ \mathrm{D}_{3} $、 $ \mathrm{D}_{1} $ 这 3 位没有意义。

## 2. SAHF

指令功能：将 AH 寄存器内容传送到标志寄存器 FLAGS 的低字节。

SAHF 与 LAHF 的功能相反，它常用来通过 AH 对标志寄存器 FLAGS 的 SF、ZF、AF、PF 与 CF 标志位分别置 1 或复 0。

上述两条指令只涉及对标志寄存器 FLAGS 的低 8 位进行操作，这是为了保持 8086 指令系统对 8088/8085 指令系统的兼容性。

## 3. PUSHF

指令功能：将16位标志寄存器FLAGS内容入栈保护。其操作过程与前述的PUSH指令类似。

## 4. POPF

指令功能：将当前栈顶和次栈顶中的数据字弹出送回到标志寄存器 FLAGS 中。

以上两条指令常成对出现，一般用在子程序和中断处理程序的首尾，用来保护和恢复主程序涉及的标志寄存器内容。必要时可用来修改标志寄存器的内容。

### IN 累加器，端口号

端口号可以用8位立即数直接给出；也可以将端口号事先安排在DX寄存器中，间接寻址16位长端口号（可寻址的端口号为0～65535）。IN指令是将指定端口中的内容输入到累加器AL/AX中。其指令如下。

IN AL, PORT ; AL←(端口 PORT), 即把端口 PORT 中的字节内容读入 AL
IN AX, PORT ; AX←(端口 PORT), 即把由 PORT 两相邻端口中的内容读入 AX
IN AL, DX ; AL←(端口 (DX)), 即从 DX 所指的端口中读取一个字节内容送 AL
IN AX, DX ; AX←(端口 (DX)), 即从 DX 和 DX+1 所指的两个端口中读取一个内容送 AX

<div style="text-align: center;"><div style="text-align: center;">【例 3-22】IN AL,40H</div> </div>

设当前 CS=1000H, IP=0050H; 8 位端口 40H 中的内容为 55H，则该指令的操作过程如图 3-6 所示。

<div style="text-align: center;"><div style="text-align: center;">图 3-6 IN AL, 40H 指令的操作过程</div> </div>

该指令执行后，把  $ 40H $ 端口中输入的数据字节  $ 55H $ 传送到累加器 AL 中。

### OUT 端口号，累加器

与 IN 指令相同，OUT 指令的端口号可以由 8 位立即数给出，也可由 DX 寄存器间接给出。OUT 指令是把累加器 AL/AX 中的内容输出到指定的端口。其指令如下。

OUT PORT,AL ; 端口 PORT←AL,即把 AL 中的字节内容输出到由 PORT 直接指定的端口
OUT PORT,AX ; 端口 PORT←AX,即把 AX 中的字内容输出到由 PORT 直接指定的端口
OUT DX,AL ; 端口 (DX)←AL,即把 AL 中的字节内容输出到由 DX 所指定的端口
OUT DX,AX ; 端口 (DX)←AX,即把 AX 中的字内容输出到由 DX 所指定的端口

#### 【例 3-23】 OUT DX, AL

设当前 CS=4000H, IP=0020H, DX=6A10H, AL=66H。则该指令的操作过程如图 3-7 所示。

<div style="text-align: center;"><div style="text-align: center;">图 3-7 OUT DX.AL 指令的操作过程</div> </div>

该指令执行后，将累加器 AL 中的数据字节 66H 输出到 DX 指定的端口 6A10H 中。

注意，I/O 指令只能用累加器作为执行 I/O 数据传送的机构。另外，当用直接寻址的 I/O 指令时，寻址范围仅为 0～255，这适用于较小规模的微机系统；当需要寻址大于 255 的端口地址时，则必须用间接寻址的 I/O 指令。在 IBM PC/XT 微机系统中，既用了范围为 0～255 的端口地址，也用了范围为 255～65 535 的端口地址。

从以上的讨论中可知，在 IN 和 OUT 指令中，I/O 设备（即 PORT，端口）的地址以两种形式存在：固定的端口和可变的端口。固定端口寻址允许 CPU 在 AL、AX 与使用 8 位 I/O 端口地址的设备之间传送数据。由于端口号在指令中是跟在指令操作码后面，所以称为固定端口寻址。如果固定端口地址存储在 RAM 中，它有可能被修改。

## 3.3 算术运算类指令

算术运算类指令有加、减、乘、除及十进制调整5种指令，它们能对无符号或有符号的8/16位二进制数以及无符号的压缩型/非压缩型（又称装配型/拆开型或者组合型/未组合型）十进制数进行运算。

### 3.3.1 加法指令

1. ADD d, s ; $ d \leftarrow d + s $

指令功能：将源操作数与目标操作数相加，结果保留在目标中，并根据结果置标志位。

源操作数可以是8/16位通用寄存器、存储器操作数或立即数；目标操作数不允许是立即数，其他同源操作数。而且不允许两者同时为存储器操作数。

【例 3-24】 ADD WORD PTR[BX+106BH], 1234H

设当前 CS=1000H, IP=0300H, DS=2000H, BX=1200H，则该指令的操作过程如图 3-8 所示。

<div style="text-align: center;"><div style="text-align: center;">图 3-8 ADD WORD PTR[BX+106BH].1234H 指令的操作过程</div> </div>

该指令执行后，将立即数1234H与物理地址为2226BH和2226CH中的存储器字3344H相加，结果4578H保留在目标地址2226BH和2226CH单元中。根据运算结果所置的标志位也示于图左下方。

【例 3-25】 寄存器加法。若将 AX、BX、CX 和 DX 的内容累加，再将所得的 16 位的和数存入 AX，则加法程序段如下。

ADD AX, BX ; AX←AX+BX
ADD AX, CX ; AX←AX+BX+CX
ADD AX, DX ; AX←AX+BX+CX+DX

【例 3-26】立即数加法。当常数或已知数相加时总是用立即数加法。若将立即数12H取入DL，然后用立即数加法指令再将34H加到DL中的12H上，所得的结果（即和数46H）放在DL中，则程序段如下。

MOV DL, 12H ADD DL, 34H

程序执行后，标志位的改变为：OF=0（没有溢出），SF=0（结果为正），ZF=0（结果不是0），AF=0（没有半进位），PF=0（奇偶性为奇），CF=0（没有进位）。

【例 3-27】存储器与寄存器的加法。假定要求将存储在数据段中其偏移地址为 NUMB 和 NUMB+1 连续单元的字节数据累加到 AL，则加法程序段如下。

MOV DI, OFFSET NUMB ;偏移地址 NUMB 装入 DI
MOV AL, 0 ;AL 清 0
ADD AL, [DI] ;将 NUMB 单元的字节内容加 AL, 和数存 AL
ADD AL, [DI+1] ;累加 NUMB+1 单元中的字节内容, 累加和存 AL

【例 3-28】 数组加法。存储器数组是一个按顺序排列的数据表。假定数据数组

（ARRAY）包括从元素0～9共10字节数。现要求累加元素3、元素5和元素7，则加法程序段如下。

MOV AL, 0 ;存放和数的 AL 清 0
MOV SI, 3 ;将 SI 指向元素 3
ADD AL, ARRAY[SI] ;加元素 3
ADD AL, ARRAY[SI+2] ;加元素 5
ADD AL, ARRAY[SI+4] ;加元素 7

本程序段中首先将 AL 清 0，为求累加和做好准备。然后，把 3 装入源变址寄存器 SI，初始化为寻址数组元素 3。ADD AL，ARRAY[SI] 指令是将数组元素 3 加到 AL 中。接着的两条加法指令是将元素 5 和 7 累加到 AL 中，指令用 SI 中原有的 3 加位移量 2 来寻址元素 5，再用加 4 寻址元素 7。

2. ADC d, s ;  $ d \leftarrow d + s + CF $

带进位加法(ADC)指令的操作过程与 ADD 指令基本相同，唯一的不同是进位标志位 CF 的原状态也将一起参与加法运算，待运算结束，CF 将重新根据结果置成新的状态。例如：

ADC AX, BX ; AX=AX+BX+C（进位位）
ADC BX, [BP+2] ; 由 BX+2 寻址的堆栈段存储单元的字内容加 BX 和进位位，结果存入 BX

ADC 指令一般用于 16 位以上的多字节数字相加的软件中。

【例 3-29】假定要实现 BX 和 AX 中的 4 字节数字与 DX 和 CX 中的 4 字节数字相加，其结果存入 BX 和 AX 中，则多字节加法的程序段如下。

ADD AX, CX
ADC BX, DX

上述多字节相加的程序段中用了ADD与ADC两条不同的加法指令，由于AX和CX的内容相加形成和的低16位时，可能产生也可能不产生进位，而事先又不可能断定有无进位，因此，在高16位相加时，就必须要采用带进位位的加法指令ADC。这样，ADC指令在执行加法时，就会把在低16位相加后产生的进位标志1或0，自动加到高16位的和数中去。最后，程序把BX、AX的4字节内容加到DX、CX两个寄存器，而和数则存入BX、AX两个寄存器中。

## 3. INC d ;d←d+1

指令功能：将目标操作数当作无符号数，完成加1操作后，结果仍保留在目标中。目标操作数可以是8/16位通用寄存器或存储器操作数，但不允许是立即数。例如：

INC SP ;SP=SP+1
INC BYTE PTR[BX+1000H] ;把数据段中由 BX+1000H 寻址的存储单元的字节内容加 1
INC WORD PTR[SI] ;把数据段中由 SI 寻址的存储单元的字节内容加 1
INC DATA1 ;把数据段中 DATA1 存储单元的内容加 1

注意，对于间接寻址的存储单元加1指令，数据的长度必须用TYPE PTR、WORD

PTR 或 DWORD PTR 类型伪指令加以说明；否则，汇编程序不能确定是对字节、字还是双字加 1。

另外，INC 指令只影响 OF、SF、ZF、AF、PF 5 个标志，而不影响进位标志 CF，故不能利用 INC 指令来设置进位位；否则，程序会出错。

## 1. SUB d,s ;d←d-s

指令功能：将目标操作数减去源操作数，其结果送回目标，并根据运算结果置标志位。源操作数可以是8/16位通用寄存器、存储器操作数或立即数；目标操作数只允许是通用寄存器或存储器操作数。而且不允许两个操作数同时为存储器操作数，也不允许做段寄存器的减法。

### 【例 3-30】SUB AX, [BX]

设当前 CS=1000H, IP=60C0H, DS=2000H, BX=970EH, 则该指令的操作过程如图 3-9 所示。

<div style="text-align: center;"><div style="text-align: center;">图 3-9 SUB AX. [BX] 指令的操作过程</div> </div>

该指令执行后，将 AX 寄存器中的目标操作数 8811H 减去物理地址 2970EH 和 2970FH 单元中的源操作数 00FFH，并把结果 8712H 送回 AX 中。各标志位的改变为： $ O=0 $（没有溢出）， $ S=1 $（结果为负）， $ Z=0 $（结果不为 0）， $ A=1 $（有半进位）， $ P=1 $（奇偶性为偶）， $ C=0 $（没有借位）。

SUB 指令的寻址方式和汇编语句形式也很多，例如：

SUB CL, BL ; CL=CL-BL
SUB AX, SP ; AX=AX-SP
SUB BH, 6AH ; BH=BH-6AH
SUB AX, 0AAAAH ; AX=AX-0AAAAH
SUB DI, TEMP[SI] ; 从 DI 中减去由 TEMP+SI 寻址的数据段存储单元的字内容

2. SBB d, s ;d←d−s−CF

本指令与 SUB 指令的功能、执行过程基本相同，唯一不同的是完成减法运算时还要再减去进位标志 CF 的原状态。运算结束时，CF 将被置成新状态。这条指令通常用于比 16 位数宽的多字节减法，在多字节减法中，如同多字节加法操作时传递进位一样，它需要传递借位。

SBB 指令的汇编语句形式很多，例如：

SBB AX, BX ; AX=AX-BX-CF
SBB WOLD PTR[DI], 50A0H ; 从由 DI 寻址的数据段字存储单元的内容减去 50A0H 及 CF 的值
SBB DI, [BP+2] ; 从 DI 中减去由 BP+2 寻址的堆栈段字存储单元的内容及借位

【例 3-31】假定从存于 BX 和 AX 中的 4 字节数减去存于 SI 和 DI 中的 4 字节数，则程序段为：

SUB AX, DI SBB BX, SI

3. DEC d ;d←d−1

减1指令功能：将目标操作数的内容减1后送回目标。

目标操作数可以是 8/16 位通用寄存器和存储器操作数，但不允许是立即数。例如：

DEC BL
DEC CX
DEC BYTE PTR[DI]
DEC WORD PTR[BP]

;BL=BL-1

;CX=CX-1

;由DI寻址的数据段字节存储单元的内容减1

;由BP寻址的堆栈段字存储单元的内容减1

从以上指令汇编语句的形式可以看出，对于间接寻址存储器数据减1指令，要求用TYPE PTR 类型伪指令来标识数据长度。

4. NEG d ; $ d\leftarrow d+1 $

NEG 是一条求补码的指令，简称求补指令。

指令功能：将目标操作数取负后送回目标。

目标操作数可以是 8/16 位通用寄存器或存储器操作数。

NEG 指令是把目标操作数当成一个带符号数，如果原操作数是正数，则 NEG 指令执行后将其变成绝对值相等的负数（用补码表示）；如果原操作数是负数（用补码表示），则 NEG 指令执行后将其变成绝对值相等的正数。

若 AL=00000100=+4，执行 NEG AL 指令后将各位变反，末位加 1 得 11111100=[-4]补；若 AL=11101110=[-18]补，执行 NEG AL 指令后将变成 00010010=+18。

【例 3-32】NEG BYTE PTR[BX]

设当前 CS=1000H, IP=200AH, DS=2000H, BX=3000H, 且由目标[BX]所指向的存储单元(=DS×16+BX=23000H)已定义为字节变量（假定为 FDH），则该指令执行后，将物理地址 23000H 中的目标操作数 FDH=[-3] 补，变成 +3 送回物理地址 23000H

单元中。

注意，执行 NEG 指令后，根据系统的约定，CF 通常被置成 1；这并不是由运算所置的新状态，而是该指令执行后的约定。只有当操作数为 0 时，才使 CF 为 0。这是因为 NEG 指令在执行时，实际上是用 0 减去某个操作数，自然在一般情况下要产生借位，而当操作数为 0 时，无须借位，故这时 CF=0。
