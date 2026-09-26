# 5. CMP d, s ;d-s, 只置标志位

> 来源：docs/08_电子书/计算机硬件技术基础（第4版）-李继灿.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：0c93d8c7280859f1


指令功能：将目标操作数与源操作数相减但不送回结果，只根据运算结果置标志位。源操作数可以是8/16位通用寄存器、存储器操作数或立即数；目标操作数只可以是8/16位通用寄存器或存储器操作数。但不允许两个操作数同时为存储器操作数，也不允许进行段寄存器比较。比较指令使用的寻址方式与前面介绍过的加法和减法指令相同。例如：

CMP BL, CL ; BL-CL
CMP AX, SP ; AX-SP
CMP AX, 1000H ; AX-1000H
CMP [DI], BL ; DI 寻址的数据段存储单元的字节内容减 BL
CMP CL, [BP] ; 用 CL 减由 BP 寻址的堆栈段存储单元的字节内容
CMP SI, TEMP[BX] ; 用 SI 减由 TEMP+BX 寻址的数据段存储单元的字内容

注意：执行比较指令时，会影响标志位 OF、SF、ZF、AF、PF、CF。

当判断两比较数的大小时，应区分无符号数与有符号数的不同判断条件，对于两无符号数比较，只需根据借位标志 CF 即可判断；而对于两有符号数比较，则要根据溢出标志（OF）和符号标志（SF）两者的异或运算结果来判断。具体判断方法如下：若为两无符号数比较，当 ZF=1 时，则表示 d=s；当 ZF=0 时，则表示 d≠s。如 CF=0 时，则表示无借位或够减，即 d≥s；如 CF=1 时，则表示有借位或不够减，即 d<s。若为两有符号数比较，当 OF⊕SF=0 时，则 d≥s；当 OF⊕SF=1 时，则 d<s。通常，比较指令后面跟一条条件转移指令，检查标志位的状态以决定程序的转向。

【例 3-33】 假如要将 CL 的内容与 64H 作比较，当 CL≥64H 时，则程序转向存储器地址 SUBER 处继续执行。其程序段如下。

CMP CL, 64H ; CL 与 64H 作比较
JAE SUBER ; 如果等于或高于则跳转

以上的 JAE 为一条等于或高于的条件转移指令。

## 3.3.3 乘法指令

乘法指令用来实现两个二进制操作数的相乘运算，包括两条指令：无符号数乘法指令MUL和有符号数乘法指令IMUL。

## 1. MUL s

MULs 是无符号乘法指令，它完成两个无符号的 8/16 位二进制数相乘的功能。被乘数隐含在累加器 AL/AX 中；指令中由 s 指定的源操作数作乘数，它可以是 8/16 位通用寄

存器或存储器操作数。相乘所得双倍位长的积，按其高8/16位与低8/16位两部分分别存放到AH与AL或DX与AX中去，即对8位二进制数乘法，其16位积的高8位存于AH，低8位存于AL；而对16位二进制数乘法，其32位积的高16位存于DX，低16位存于AX。若运算结果的高位字节或高位字有效，即AH≠0或DX≠0，则将CF和OF两标志位同时置1；否则，CF=OF=0。据此，利用CF和OF标志可判断相乘结果的高位字节或高位字是否为有效数值。

### 【例 3-34】MUL BYTE PTR[BX+2AH]

设当前 CS=3000H, IP=0250H, AL=12H, DS=2000H, BX=0234H, 且源操作数已被定义为字节变量(66H)，则指令的操作过程如图 3-10 所示。

<div style="text-align: center;"><div style="text-align: center;">图 3-10 MUL BYTE PTR[BX+2AH] 指令的操作过程</div> </div>

该指令执行后，乘积 072CH 存放于 AX 中。根据机器的约定，因 AH≠0，故 CF 与 OF 两位置 1，其余标志位为任意状态，是不可预测的。

## 2. IMUL s

IMUL s 是有符号乘法指令，它完成两个带符号的 8/16 位二进制数相乘的功能。

对于两个带符号的数相乘，如果简单采用与无符号数乘法相同的操作过程，那么会产生完全错误的结果。为此，专门设置了IMUL指令。

IMUL 指令除计算对象是带符号二进制数以外，其他都与 MUL 是一样的，但结果不同。

IMUL 指令对 OF 和 CF 的影响是：若乘积的高一半是低一半的符号扩展，则 OF = CF = 0；否则 OF = CF = 1。它仍然可用来判断相乘的结果中高一半是否含有有效数值。另外，IMUL 指令对其他标志位没有定义。例如：

IMUL CL ;AX←(AL)×(CL)
IMUL CX ; DX、AX←(AX)×(CX)
IMUL BYTE PTR[BX] ; AX←(AL)×[BX]，即 AL 中的和 BX 所指内存单元中的两个 8 位有符号；数相乘，结果送 AX 中

有关 IMUL 指令的其他约定都与 MUL 指令相同。

### 3.3.4 除法指令

除法指令执行两个二进制数的除法运算，包括无符号二进制数除法指令DIV和有符号二进制数除法指令IDIV两条指令。

## 1. DIV s

DIVs指令完成两个不带符号的二进制数相除的功能。被除数隐含在累加器AX（字节除）或DX、AX（字除）中。指令中由s给出的源操作数作除数，可以是8/16位通用寄存器或存储器操作数。

对于字节除法，所得的商存于 AL，余数存于 AH。对于字除法，所得的商存于 AX，余数存于 DX。根据 8086 的约定，余数的符号应与被除数的符号一致。

若除法运算所得的商数超出累加器的容量，则系统将其当作除数为0处理，自动产生类型0中断，CPU将转去执行类型0中断服务程序作适当处理，此时所得商数和余数均无效。在进行类型0中断处理时，先是将标志位进堆栈，IF和TF清0，接着是CS和IP的内容进堆栈；然后，将0、1两单元的内容装入IP，而将2、3两单元的内容装入CS；最后，再进入0号中断的处理程序。

### 【例 3-35】 DIV BYTE PTR[BX+SI]

设当前 CS=1000H, IP=0406H, BX=2000H, SI=050EH, DS=3000H, AX=1500H, 存储器中的源操作数已被定义为字节变量 22H，则该指令执行后，所得商数 9EH 存于 AL 中，余数 04H 存于 AH 中。

## 2. IDIV s

IDIV s 指令完成将两个带符号的二进制数相除的功能。它与 DIV 指令的主要区别在于对符号位处理的约定，其他约定相同。

具体地说，如果源操作数是字节/字数据，被除数应为字/双字数据并隐含存放于 AX/DX、AX 中。如果被除数也是字节/字数据在 AL/AX 中，那么，应将 AL/AX 的符号位（ $ \left(\mathrm{AL}_{7}\right)/\left(\mathrm{AX}_{15}\right) $）扩展到 AH/DX 寄存器后，才能开始字节/字除法运算，运算结果商数在 AL/AX 寄存器中， $ \mathrm{AL}_{7}/\mathrm{AX}_{15} $ 是商数的符号位；余数在 AH/DX 中， $ \mathrm{AH}_{7}/\mathrm{DX}_{15} $ 是余数的符号位，它应与被除数的符号一致。在这种情况下，允许的最大商数为 +127/+32 767，最小商数为 -127/-32 767。例如：

IDIV BX ; 将 DX 和 AX 中的 32 位数除以 BX 中的 16 位数，商在 AX 中，余数在 DX 中

IDIV BYTE PTR[SI] ; 将 AX 中的 16 位数除以 SI 所指内存单元的 8 位数，所得的商在 AL 中，

; 余数在 AH 中

## 3. CBW 和 CWD

CBW 和 CWD 是两条专门为 IDIV 指令设置的符号扩展指令，用于将被除数字节/字扩展为字/双字的符号，所扩充的高位字节/字部分均为低位的符号位。它们在使用时应安排在 IDIV 指令之前，执行结果对标志位没有影响。

CBW 指令将 AL 的最高有效位  $ D_{7} $ 扩展至 AH，即若 AL 的最高有效位是 0，则 AH = 00H；若 AL 的最高有效位为 1，则 AH = FFH。该指令在执行后，AL 不变。

CWD 指令将 AX 的最高有效位  $ D_{15} $ 扩展形成 DX，即若 AX 的最高有效位为 0，则 DX = 0000H；若 AX 的最高有效位为 1，则 DX = FFFFH。该指令在执行后，AX 不变。

符号扩展指令常用于获得除法指令所需要的被除数。例如，AX=FF00H，它表示有符号数-256；执行CWD指令后，则DX=FFFFH，DX、AX仍表示有符号数-256。

【例 3-36】进行有符号数除法  $ AX \div BX $ 的指令如下。

对无符号数除法应该采用直接使高8位或高16位清0的方法，以获得倍长的被除数。

### 3.3.5 十进制调整指令

上面介绍的算术运算指令都是针对二进制数的。为了能方便地进行十进制数的运算，就必须对二进制运算的结果进行十进制调整，以得到正确的十进制运算结果。为此，8086专门为完成十进制数运算而提供了一组十进制调整指令。

十进制数在计算机中也是用二进制来表示的，这就是二进制编码的十进制数——BCD码。8086支持压缩BCD码和非压缩BCD码，相应的十进制调整指令也分为压缩BCD码调整指令和非压缩BCD码调整指令。其中，压缩BCD码调整指令有两条：DAA和DAS；非压缩BCD码调整指令有4条：AAA、AAS、AAM和AAD。这6条指令分别介绍如下。

## 1. DAA

DAA 是加法的十进制调整指令，它必须跟在 ADD 或 ADC 指令之后使用。其功能是将存于 AL 中的 2 位 BCD 码加法运算的结果调整为 2 位压缩型十进制数，仍保留在 AL 中。

AL 中的运算结果在出现非法码(1010B～1111B)或本位向高位(指 BCD 码)有进位(由 AF=1 或 CF=1 表示低位向高位或高位向更高位有进位)时，由 DAA 自动进行加 6 调整。由于 DAA 指令只能对 AL 中的结果进行调整，因此，对于多字节的十进制加法，只能从低字节开始，逐字节地进行运算和调整。

【例 3-37】设当前 AX=6698，BX=2877，如果要将这两个十进制数相加，结果保留在 AX 中，则需要用下列几条指令来完成。

ADD AL, BL ; 低字节相加

DAA ; 低字节调整

MOV CL, AL

MOV AL, AH
ADC AL, BH
DAA
MOV AH, AL
MOV AL, CL
; 高字节相加
; 高字节调整

## 2. DAS

DAS 是减法的十进制调整指令，它必须跟在 SUB 或 SBB 指令之后，将 AL 寄存器中的减法运算结果调整为 2 位压缩型十进制数，仍保留在 AL 中。

减法是加法的逆运算，对减法的调整操作是减6调整。

## 3. AAA

AAA 是加法的 ASCII 码调整指令，也是只能跟在 ADD 指令之后使用。其功能是将存于 AL 寄存器中的 1 位 ASCII 码数加法运算的结果调整为 1 位非压缩型十进制数，仍保留在 AL 中；如果向高位有进位（AF=1），则进到 AH 中。调整过程与 DAA 相似，其具体算法如下。

① 若 AL 的低 4 位是在  $ 0 \sim 9 $ 之间，且 AF = 0，则跳过第②步，执行第③步。

② 若 AL 的低 4 位是在  $ 0AH \sim 0FH $ 之间，或 AF=1，则 AL 寄存器需进行加 6 调整，AH 寄存器加 1，且使 CF=1。

③ AL 的高 4 位虽参加运算，但不影响运算结果，无须调整，且清除之。

【例 3-38】若 AX=0835H，BL=39H，则执行下列指令。

ADD AL, BL AAA

结果是 AX=0904H, AF=1, 且 CF=1。其运算与调整过程如下。

 $$ \begin{aligned}&00001000\quad\begin{aligned}&+&0&0&11&10&10&1&0&1&AL\\ &+&0&0&11&10&0&1&0&1&BL\\ \hline 0&0&0&11&10&1&1&0&1&AL&AL\end{aligned} 低 4 位出现非法码 , 需进行加 6 调整 \\&00001001\quad\begin{aligned}&+&0&1&1&0&1&0&0&0&0&0\\ &\wedge&0&0&0&0&1&1&1&AL&AL\end{aligned}—AF=1, 应进位到 AH 中 , 即 AH 加 1\\&\underbrace{00001001}_{AH}\quad\underbrace{00000100}_{AL}\end{aligned}—AL 高 4 位清 0, 低 4 位不变 $$

【例 3-39】 若有两个用 ASCII 码表示的 2 位十进制数分别存放在 AX 和 BX 寄存器中，即

AX=0011011000110111
BX=0011100100110101

现要求将两数相加，并把结果保留在 AX 中，如果有进位，将进位置入 DX 中，则完成上述功能的程序段如下。

MOV DX, 0
MOV CX, AX
MOV AH, 0
ADD AL, BL
AAA
MOV CL, AL
MOV AL, CH
ADD AL, AH
AAA
MOV AH, 0
ADD AL, BH
AAA
MOV CH, AL
ADD DL, AH
MOV AX, CX
; CX='67'
; AL←'-'7'+ '5'
; AH=01H, AL=02H
; CL=02H
; AL='6'
; AL=07H
; AH=01H, AL=06H
; CH=06H
; DL=01H
; AX=0602H

最后得到正确的十进制结果为162，并以非压缩型BCD码形式存放在DX、AX中，如下所示。

DX 00000000 00000001

## 4. AAS

AAS 是减法的 ASCII 码调整指令，它也必须跟在 SUB 或 SBB 指令之后，用于将 AL 寄存器中的减法运算结果调整为 1 位非压缩型十进制数；如果有借位，则保留在借位标志 CF 中。

## 5. AAM

AAM 是乘法的 ASCII 码调整指令。由于 8086/8088 指令系统中不允许采用压缩型十进制数乘法运算，故只设置了一条 AAM 指令，用于将 AL 中的乘法运算结果调整为 2 位非压缩型十进制数，其高位在 AH 中，低位在 AL 中。参加乘法运算的十进制数必须是非压缩型，故通常在 MUL 指令之前安排两条 AND 指令。例如：

AND AL, OFH
AND BL, OFH
MUL BL
AAM

执行 MUL 指令的结果，会在 AL 中得到 8 位二进制数结果，用 AAM 指令可将 AL 中结果调整为 2 位非压缩型十进制数，并保留在 AX 中。其调整操作是：将 AL 寄存器中的结果除以 10，所得商数即为高位十进制数置入 AH 中，所得余数即为低位十进制数置入 AL 中。

## 6. AAD

AAD 是除法的 ASCII 码调整指令。它与上述调整指令的操作不同，它是在除法之前进行调整操作。

AAD 指令的调整操作是将累加器 AX 中的 2 位非压缩型十进制的被除数调整为二进制数，保留在 AL 中。其具体做法是：将 AH 中的高位十进制数乘以 10，与 AL 中的低位十进制数相加，结果保留在 AL 中。例如，一个数据为 67，用非压缩型 BCD 码表示时，则 AH 中为 00000110，AL 中为 00000111；调整时执行 AAD 指令，该指令将 AH 中的内容乘以 10，再加到 AL 中，故得到的结果为 43H。

## 3.4 逻辑运算和移位循环类指令

这类指令可分为3种类型：逻辑运算、移位和循环指令。

## 1. AND d,s ;d←d∧s,按位“与”操作

源操作数可以是 8/16 位通用寄存器、存储器操作数或立即数；目标操作数只允许是通用寄存器或存储器操作数。

【例 3-40】 AND AX, ALPHA

设当前 CS=2000H, IP=0400H, DS=1000H, AX=F0F0H, ALPHA 是数据段中偏移地址为 0500H 和 0501H 地址中的字变量 7788H 的名字。则执行该指令后，将累加器 AX 中的 F0F0H 与物理地址 10500H 和 10501H 地址中的数据字 7788H 进行逻辑“与”运算后得结果为 7080H，并把它送回 AX 寄存器中。

2. OR d, s ;d←d∨s, 按位“或”操作

源操作数与目标操作数的约定同 AND 指令。

3. XOR d, s ;d←d⊕s, 按位“异或”操作

源操作数与目标操作数的约定同 AND 指令。

4. NOT d ;d←d, 按位取反操作

源操作数与目标操作数的约定同 AND 指令。

## 5. TEST d, s ;d  $ \wedge $ s, 按位“与”操作, 不送回结果

有关的约定和操作过程与 AND 指令相同，只是 TEST 指令不传送结果。

### 3.4.2 移位指令与循环移位指令

移位与循环移位指令的功能如图 3-11 所示。

移位指令分为算术移位和逻辑移位。算术移位是对带符号数进行移位，在移位过程中

<div style="text-align: center;"><div style="text-align: center;">图 3-11 移位/循环移位指令功能</div> </div>

必须保持符号不变；而逻辑移位是对无符号数移位，总是用0来填补已空出的位。根据移位操作的结果置标志寄存器中的状态标志（AF标志除外）。若移位位数是1位，移位结果使最高位（符号位）发生变化，则将溢出标志OF置1；若移多位，则OF标志将无效。

循环移位指令是将操作数首尾相接进行移位，它分为不带进位位与带进位位循环移位。这类指令只影响CF和OF标志。CF标志总是保持移出的最后一位的状态。若只循环移1位，且使最高位发生变化，则OF标志置1；若循环移多位，则OF标志无效。

所有移位与循环移位指令的目标操作数只允许是8/16位通用寄存器或存储器操作数，指令中的 $  \text{count}(\text{计数值})  $可以是1，也可以是 $  n(n \leq 255)  $。若移1位，则指令的count字段直接写1；若移n位，则必须将n事先装入CL寄存器中，故count字段只能书写CL而不能用立即数n。例如：

SAL BX,1 ;BX 的内容算术左移 1 位

ROR AX,1 ;AX 的内容循环右移 1 位

MOV CL,6

SAR DX,CL ;DX 的内容算术右移 6 位

RCL AX,CL ;AX 的内容连同 CF 循环左移 6 位

## 3.5 串操作类指令

串操作类指令是唯一能在存储器内的源与目标之间进行操作的指令。

串操作指令对向量和数组操作提供了很好的支持，可有效地加快处理速度、缩短程序长度。它们能对字符串进行各种基本的操作，如传送（MOVS）、比较（CMPS）、搜索（SCAS）、读（LODS）和写（STOS）等。对任何一个基本操作指令，可以用加一个重复前缀指令来指示该操作要重复执行，所需重复的次数由CX中的初值来确定。被处理的串长度可达64KB。

为缩短指令长度，串操作指令均采用隐含寻址方式，源数据串一般在当前数据段中，即由DS段寄存器提供段地址，其偏移地址必须由源变址寄存器SI提供；目标串必须在附加段中，即由ES段寄存器提供段地址，其偏移地址必须由目标变址寄存器DI提供。如果要在同一段内进行串操作，必须使DS和ES指向同一段。串长度必须存放在CX寄存器中。在串指令执行之前，必须对SI、DI和CX进行预置，即将源串和目标串的首元素或末元素的

偏移地址分别置入 SI 和 DI 中，将串长度置入 CX 中。这样，在 CPU 每处理完一个串元素时，就自动修改 SI 和 DI 寄存器的内容，使之指向下一个元素。

为加快串操作的执行，可在基本串操作指令的前方加上重复前缀，共有无条件重复（REP）、相等时重复（REPE）、为0时重复（REPZ）、不等时重复（REPNE）、不为0时重复（REPNZ）5种重复前缀。带有重复前缀的串操作指令，每处理完一个元素能自动修改CX的内容（按字节/字处理减1/减2），以完成计数功能。当 $ CX\neq0 $时，继续串操作；直到CX=0时才结束串操作。

无条件重复前缀(REP)常与串传送(MOVS)指令连用，完成传送整个串操作，即执行到CX=0为止。REPE和REPZ具有相同的含义，只有当ZF=1，且 $ CX\neq0 $时才重复执行串操作，常与串比较(CMPS)指令连用，比较操作一直进行到ZF=0或CX=0时为止。与此相反，REPNE和REPNZ具有相同的含义，只有当ZF=0，且 $ CX\neq0 $时才重复执行串操作，常与串搜索(SCAS)指令连用，搜索操作一直进行到ZF=1或CX=0为止。

串操作指令对 SI 和 DI 寄存器的修改与两个因素有关：一是和被处理的串是字节串还是字串有关；二是和当前的方向标志 DF 的状态有关。当 DF=0，表示串操作由低地址向高地址进行，SI 和 DI 内容应递增，其初值应该是源串和目标串的首地址；当 DF=1 时，则情况正好相反。

8086/8088 有 5 种基本的串操作指令，现分述如下。

### 3.5.1 MOVs 目标串，源串

串传送(MOVS)指令的功能：将由SI作为指针的源串中的一个字节或字，传送到由DI作为指针的目标串中，且相应地自动修改SI/DI，使之指向下一个元素。如果加上REP前缀，则每传送一个元素，CX自动减1，直到CX=0为止。

【例 3-41】 REP MOVSB 指令。

设当前 CS=6180H, IP=120AH, DS=1000H, SI=2000H, ES=3000H, DI=1020H, CX=0064H, DF=0。则该指令的操作过程如图 3-12 所示。

该指令执行后，将源串的100字节传送到目标串，每传送1B，SI+1，DI+1，CX-1，直到CX=0为止。

【例 3-42】若要将源串的 100B 数据传送到目标串单元中去，设源串首元素的偏移地址为 2500H，目标串首元素的偏移地址为 1400H，则完成这一串操作的程序段如下。

CLD ; DF←0, 地址自动递增

MOV CX, 100 ; 串的长度

MOV SI, 2500H ; 源串首元素的偏移地址

MOV DI, 1400H ; 目标串首元素的偏移地址

REP MOVSB ; 重复传送操作, 直到 CX=0 为止

### 3.5.2 CMPS 目标串，源串

串比较(CMPS)指令的功能：将由 SI 作为指针的源串中的一个元素减去由 DI 作为指

<div style="text-align: center;"><div style="text-align: center;">图 3-12 REP MOVSB 指令的操作过程</div> </div>

针的目标串中相对应的一个元素，不回送结果，只根据结果特征置标志位；并相应地修改SI和DI内容指向下一个元素。通常，在CMPS指令前加重复前缀REPE/REPZ，用来确定两个串中的第1个不相同的数据。

【例 3-43】试比较例 3-42 中两串是否完全相同。若两串相同，则 BX 寄存器内容为 0；若两串不同，则 BX 指向源串中第 1 个不相同字节的地址，且该字节的内容保留在 AL 寄存器中。完成这一功能的程序段如下。

### 3.5.3 SCAS 目标串

串搜索(SCAS)指令的功能：用于从目标数据串中搜索（或查找）某个关键字，要求将待查找的关键字在执行该指令之前事先置入AX或AL中。

搜索的实质是将 AX 或 AL 中的关键字减去由 DI 所指向的数据段目标数据串中的一

个元素，不传送结果，只根据结果置标志位，然后修改DI的内容指向下一个元素。通常，在SCAS前加重复前缀REPNE/REPNZ，用于从目标数据串中寻找关键字，操作一直进行到ZF=1（查到了某关键字）或CX=0（终未查找到）为止。

【例 3-44】要求在长度为 N 的某字符串中查找是否存在字符'$\'。若存在，则将字符'$\'所在地址送入 BX 寄存器中，否则将 BX 清 0。假定字符串首元素的偏移地址为 DSTO。实现上述要求的程序段如下。

### 3.5.4 LODS 源串

读串(LODS)指令的功能：用于将源串中由 SI 所指向的元素取到 AX/AL 寄存器中，修改 SI 的内容指向下一个元素。该指令一般不加重复前缀，常用来和其他指令结合起来完成复杂的串操作功能。

【例 3-45】已知在数据段中有100个字组成的串，现要求将其中的负数相加，其和数存放到紧接着该串的下一个顺序地址中。若已知串首元素的偏移地址为1680H，则可用如下程序段来完成上述要求。

### 3.5.5 STOS 目标串

写串(STOS)指令的功能：用于将AX/AL寄存器中的一个字或字节写入由DI作为指针的目标串中，同时修改DI以指向串中的下一个元素。该指令一般不加重复前缀，常与其他指令结合起来完成较复杂的串操作功能。若利用重复操作，可以建立一串相同的值。

【例 3-46】要求将两串中各对应元素相加，所得到的新串写入目标串中。若已知当前目标串和源串的偏移地址分别为 0300H 和 0500H，串长度为 100B，则可用如下程序段完成上述要求。

## 3.6 程序控制类指令

一般情况下，指令按顺序逐条执行。但在实际运行中，也经常会根据微处理器的状态和工作要求等不同情况而随时改变程序的流向。程序控制类指令就是用来控制程序流向的指令。本节介绍无条件转移、条件转移、循环控制和中断4种程序控制指令。

### 3.6.1 无条件转移指令

在无条件转移类指令中，除介绍无条件转移指令 JMP 外，也一并介绍无条件调用过程指令 CALL 以及从过程返回指令 RET，因为，后两条指令实质上也是无条件地控制程序流向的转移，不过它们在使用上与 JMP 有所不同。

## 1. JMP 目标标号

JMP 指令允许程序流无条件地转移到由目标标号指定的地址，去继续执行从该地址开

始的程序。

转移可分为段内转移和段间转移两种。段内转移是指在同一代码段的范围之内进行转移，此时，只需要改变指令指针 IP 寄存器的内容，即用新的转移目标地址（指偏移地址）代替原有的 IP 值就可实现转移。而段间转移则是要转移到一个新的代码段去执行指令，此时不仅要修改 IP 的内容，还要修改段寄存器 CS 的内容才能实现转移。当然，此时的转移目标地址，应由新的段地址和偏移地址两部分组成。根据目标地址的位置与寻址方式的不同，JMP 指令有以下 4 种基本格式。

### 1）段内直接转移

段内直接转移是指目标地址就在当前代码段内，其偏移地址（即目标地址的偏移量）与本指令当前IP值（即JMP指令的下一条指令的地址）之间的字节距离（即位移量）将在指令中直接给出。此时，目标标号偏移地址为：

 $$  目标标号偏移地址 =(IP)+ 指令中位移量 $$

其中，(IP)是指IP的当前值。位移量的字节数则根据微处理器的位数而定。

对于16位微处理器而言，段内直接转移的指令格式又分为2B和3B两种，它们的第1字节是操作码，而第2字节或第2、3字节为位移量（最高位为符号位）。若位移量只有1字节，则称为段内短转移，其目标标号与本指令之间的距离不能超过 $ -128\sim+127 $字节；若位移量占2字节，则称为段内近转移，其目标标号与本指令之间的距离不能超过 $ \pm32 $KB范围。注意，段的偏移地址是周期性循环计数的，这意味着在偏移地址FFFFH之后的一个位置是偏移地址0000H。由于这个原因，如果指令指针IP指向偏移地址FFFFH，而要转移到存储器中的后两个字节地址，则程序流将在偏移地址0001H处继续执行。

【例 3-47】 JMP ADDR1 指令中是以目标标号 ADDR1 表示目标地址。若已知目标标号 ADDR1 与本指令当前 IP 值之间的距离（即位移量）为 1235H 字节，CS = 1500H，IP = 2400H，则该指令执行后，CPU 将转移到物理地址 18638H。

注意：在计算当前 IP 值时，是将原 IP 值 2400H 加上了本指令的字节数 3，得到 2403H；然后，再将段基址（ $ 1500H \times 16 = 15000H $）加上此当前 IP 值 2403H 与位移量 1235H 之和 3638H，于是，可求得最终寻址的目标地址 18638H，其操作过程如图 3-13 所示。由图中可知，这是一个段内直接近转移的例子，其目标标号 ADDR1 就是一个符号地址。

<div style="text-align: center;"><div style="text-align: center;">图 3-13 JMP ADDR1 指令的操作过程</div> </div>

#### 2）段内间接转移

段内间接转移是一种间接寻址方式，它是将段内的目标地址（指偏移地址或按间接寻址方式计算出的有效地址）先存放在某通用寄存器或存储器的某两个连续地址中，这时指令中只需给出该寄存器号或存储单元地址即可。

【例 3-48】JMP BX 指令中的 BX 没有方括号“[ ]”，但仍表示间接指向内存区的某地址单元。BX 中的内容即转移目标的偏移地址。设当前 CS = 1200H，IP = 2400H，BX = 3502H，则该指令执行后，BX 寄存器中的内容 3502H 取代原 IP 值，CPU 将转到物理地址 15502H 单元中去执行后续指令。

注意：为区分段内的短转移（位移量为8位）和近转移（位移量为16位），其指令格式常以 JMP SHORT ABC 和 JMP NEAR PTR ABC 的汇编语言形式来表示。

##### 3）段间直接转移

段间转移是指程序由当前代码段转移到其他代码段，由于其转移的范围超过 $ \pm32 $KB，故段间转移指令也称为远转移。在远转移时，目标标号是在其他代码段中，若指令中直接给出目标标号的段地址和偏移地址，则构成段间直接转移指令。

【例 3-49】 JMP FAR PTR ADDR2 是一条段间直接远转移指令，ADDR2 为目标标号。设当前 CS=2100H，IP=1500H，目标地址在另一代码段中，其段地址为 6500H，偏移地址为 020CH，则该指令执行后，CPU 将转移到另一代码段物理地址为 6520CH 目标地址中去执行后续指令。

一般来说，在执行段间直接（远）转移指令时，目标标号的段内偏移地址送入IP，而目标标号所在段的段地址送入CS。在汇编语言中，目标标号可使用符号地址，而机器语言中则要指定目标（或转向）地址的偏移地址和段地址。

##### 4）段间间接转移

段间间接转移是指以间接寻址方式来实现由当前代码段转移到其他代码段。

##### 【例 3-50】 JMP DWORD PTR[BX+ADDR3]

设当前 CS = 1000H，IP = 026AH，DS = 2000H，BX = 1400H，ADDR3 = 020AH，(2160AH) = 0EH，(2160BH) = 32H，(2160CH) = 00H，(2160DH) = 40H，则执行指令时，目标地址的偏移地址 320EH 送入 IP，而其段地址 4000H 送入 CS，于是，该指令执行后，CPU 将转到另一代码段物理地址为 4320EH 的单元中去执行后续程序。

需要指出的是，段间转移和段内间接转移都必须用无条件转移指令，而条件转移指令则只能用段内直接寻址方式，并且，其转移范围只能是本指令所在位置前后的一128～+127字节。

## 2. CALL 过程名

这是无条件调用过程指令。

“过程”即“子程序”，调用过程也即调用子程序。CALL 指令将迫使 CPU 暂停执行调用程序（又称主程序）后续的下一条指令（即断点），转去执行指定的过程；待过程执行完毕，再用返回指令 RET 将程序返回到断点处继续执行。

8086/8088 指令系统中把处于当前代码段的过程称为近过程，用 NEAR 表示，而把其他代码段的过程称为远过程，用 FAR 表示。当调用过程时，如果是近过程，只需将当前 IP

值入栈；如果是远过程，则必须将当前CS和IP的值一起入栈。

CALL 指令与 JMP 类似，也有 4 种不同的寻址方式和 4 种基本格式。举例如下。

### 1) CALL N_PROC

这条指令中的 N_PROC 是一个近过程名，采用段内直接寻址方式。

执行段内直接调用指令 CALL 时，第1步操作是把过程的返回地址（即调用程序中CALL指令的下一条指令的地址）压入堆栈中，以便过程返回调用程序（主程序）时使用。第2步操作则是转移到过程的入口地址去继续执行。指令中的近过程名将给出目标（转向）地址（即过程的入口地址）。

#### 2) CALL BX

这是一条段内间接寻址的调用过程指令，事先已将过程入口的偏移地址置入BX寄存器中。在执行该指令时，调用程序将转向由BX寄存器的内容所指定的某内存单元。

##### 3) CALL F_PROC

这条指令中的 F_PROC 是一个远过程名，它可以采用段间直接和段间间接两种寻址方式来实现调用过程。在段间调用的情况下，则把返回地址的段地址和偏移地址先后压入堆栈。

##### 【例 3-51】 CALL 2000H:5600H

这是一条段间直接调用指令，调用的段地址为2000H，偏移地址为5600H。执行该指令后，调用程序将转移到物理地址为25600H的过程入口去继续执行。

##### 【例 3-52】 CALL DWORD PTR[DI]

这是一条段间间接调用指令，调用地址在DI、DI+1、DI+2、DI+3所指的4个连续内存单元中，前两个字节为偏移地址，后两个字节为段地址。若DI=0AH，DI+1=45H，DI+2=00H，DI+3=63H，则执行该指令后，将转移到物理地址为6750AH的过程入口去继续执行。

##### 4）RET 弹出值

过程返回（RET）指令应安排在过程的出口即过程的最后一条指令处，它的功能是从堆栈顶部弹出由CALL指令压入的断点地址值，迫使CPU返回到调用程序的断点去继续执行。RET指令与CALL指令相呼应，CALL指令安排在调用过程中，RET指令安排在被调用的过程末尾处。并且，为了能正确返回，返回指令的类型要和调用指令的类型相对应。也就是说，如果一个过程是供段内调用的，则过程末尾用段内返回指令；如果一个过程是供段间调用的，则末尾用段间返回指令。此外，如果调用程序通过堆栈向过程传送了一些参数，过程在运行中要使用这些参数，一旦过程执行完毕，这些参数也应当弹出堆栈作废，这就是RET指令有时还要带弹出值的原因，其取值就是要弹出的数据字节数，因此，带弹出值的RET指令除了从堆栈中弹出断点地址（对近过程为2字节的偏移量，对远过程为2字节的偏移量和2字节的段地址）外，还要弹出由弹出值n所指定的n字节偶数的内容。n可以为0～FFFFH中的任何一个偶数。但是弹出值并不是必须的，这取决于调用程序是否向过程传送了参数。

### 3.6.2 条件转移指令

条件转移指令是根据 CPU 执行上一条指令时，某一个或某几个标志位的状态而决定

是否控制程序转移。如果满足指令中所要求的条件，则产生转移；否则，将继续往下执行紧接着条件转移指令后面的一条指令。条件转移指令的测试条件如表3-10所示。注意，为缩短指令长度，所有的条件转移指令都被设计成短转移，即转移目标与本指令之间的字节距离在 $ -128\sim+127 $内。

<div style="text-align: center;"><div style="text-align: center;">表 3-10 条件转移指令</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="3">指令名称</td><td colspan="2">助记符</td><td style='text-align: center; word-wrap: break-word;'>测试条件</td></tr><tr><td rowspan="4">无符号数</td><td style='text-align: center; word-wrap: break-word;'>高于/不低于也不等于</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JA/JNBE</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>CF=0 AND ZF=0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>高于或等于/不低于</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JAE/JNB</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>CF=0 OR ZF=1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>低于/不高于也不等于</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JB/JNAE</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>CF=1 AND ZF=0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>低于或等于/不高于</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JBE/JNA</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>CF=1 OR ZF=1</td></tr><tr><td rowspan="4">带符号数</td><td style='text-align: center; word-wrap: break-word;'>大于/不小于也不等于</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JG/JNLE</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>(SF XOR OF) AND ZF=0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>大于或等于/不小于</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JGE/JNL</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>SF XOR OF=0 OR ZF=1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>小于/不大于也不等于</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JL/JNGE</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>SF XOR OF=1 AND ZF=0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>小于或等于/不大于</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JLE/JNG</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>(SF XOR OF) OR ZF=1</td></tr><tr><td rowspan="4">单标志位</td><td style='text-align: center; word-wrap: break-word;'>等于/结果为0</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JE/JZ</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>ZF=1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>不等于/结果不为0</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JNE/JNZ</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>ZF=0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>有进位/有借位</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JC</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>CF=1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>无进位/无借位</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JNC</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>CF=0</td></tr><tr><td rowspan="6">位条件转移</td><td style='text-align: center; word-wrap: break-word;'>溢出</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JO</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>OF=1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>不溢出</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JNO</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>OF=0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>奇偶性为1/偶状态</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JP/JPE</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>PF=1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>奇偶性为0/奇状态</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JNP/JPO</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>PF=0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>符号位为1</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JS</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>SF=1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>符号位为0</td><td style='text-align: center; word-wrap: break-word;'>转移</td><td style='text-align: center; word-wrap: break-word;'>JNS</td><td style='text-align: center; word-wrap: break-word;'>目标标号</td><td style='text-align: center; word-wrap: break-word;'>SF=0</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">【例 3-53】JZ ADDR</div> </div>

设当前 CS=1000H, IP=300BH, ZF=1, 目标地址 ADDR 相对于本指令的字节距离为 -9, 则该指令执行后, 由于 ZF=1 满足条件, 故 CPU 将转到目标地址为  $ (CS \times 16 + IP + 2 - 9) = 13004 $ H 的单元去执行后续程序。

在使用条件转移指令时，应注意以下特点。

（1）由于条件转移指令都是短转移形式的，所以，其转移范围为 $ -128\sim+127 $。这样设计的好处是指令字节少，执行速度快。当需要转移到较远的目标地址时，可以先用条件转移指令转移到附近一个单元；然后再从该单元起放一条无条件转移指令，这样就可以通过该指令转移到较远的目标地址。这种情况一般是较少使用的。

（2）有一部分条件转移指令是根据对两个数比较的结果来决定是否转移的，但由于对无符号数和带符号数的比较会产生不同的结果，所以，为了作出正确的判断，8086指令系统分别为无符号数和带符号数的比较提供了两组不同的条件转移指令。对于无符号数的比较判断，用“高于”和“低于”来作为判断条件；而对于带符号数的比较判断，则用“大于”和“小于”来作为判断条件。例如，FFH和00H，如果将它们当作无符号数，则FFH“高于”00H；如果将它们当作带符号数，则FFH“小于”00H。

（3）在条件转移指令中，有一部分指令可以用两种不同的助记符来表示，但其指令功能是等同的。例如，一个数 M 高于另一个数 N 和 M 不低于也不等于 N 的结论是等同的，因此，条件转移指令 JA 和 JNBE 的功能是等同的。

### 3.6.3 循环控制指令

循环控制指令实际上是一组增强型的条件转移指令，但它是根据自己进行某种运算后来设置状态标志的。

循环控制指令都与CX寄存器配合使用，CX中存放着循环次数。另外，这些指令所控制的目标地址的范围都在 $ -128\sim+127 $字节之内。

## 1. LOOP 目标标号

LOOP 指令的功能是先将 CX 寄存器内容减 1 后送回 CX，再判断 CX 是否为 0，若  $ CX \neq 0 $，则转移到目标标号所给定的地址继续循环；否则，结束循环顺序执行下一条指令。这是一条常用的循环控制指令，使用 LOOP 指令前，应将循环次数送入 CX 寄存器。其操作过程与条件转移指令类似，只是它的位移量应为负值。

## 2. LOOPE/LOOPZ 目标标号

LOOPE 和 LOOPZ 是同一条指令的两种不同的助记符，其指令功能是先将 CX 减 1 送 CX，若 ZF=1 且 CX≠0 时则循环；否则，顺序执行下一条指令。

## 3. LOOPNE/LOOPNZ 目标标号

LOOPNE 和 LOOPNZ 也是同一条指令的两种不同的助记符，其指令功能是先将 CX 减 1 送 CX，若 ZF=0 且 CX≠0 时则循环；否则，顺序执行下一条指令。

## 4. JCXZ 目标标号

JCXZ 指令不对 CX 寄存器内容进行操作，只根据 CX 内容控制转移。它是一条条件转移指令，也可用来控制循环，但循环控制条件与 LOOP 指令相反。

循环控制指令在使用时放在循环程序的开头或结尾处，以控制循环程序的运行。

【例 3-54】若在存储器的数据段中有 100 字节构成的数组，要求从该数组中找出字符 '$'，然后将字符 '$' 前面的所有元素相加，结果保留在 AL 寄存器中。完成此任务的程序段如下。

MOV CX,100
MOV SI 00FFH
LL1: INC SI
CMP BYTE PTR [SI], 's'
LOOPNE LL1
SUB SI,0100H
MOV CX,SI
MOV SI,0100H
;初始化
;找字符'$'
;字符'$'之前字节数

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="2">MOV AL, [SI]</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DEC CX</td><td style='text-align: center; word-wrap: break-word;'>; 相加次数</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>INC SI</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>ADD AL, [SI]</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LOOP LL2</td><td style='text-align: center; word-wrap: break-word;'>; 累加$字符前的字节</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>HLT</td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

## 1. INT 中断类型

8086/8088 系统中允许有 256 种中断类型（0～255），各种类型的中断在中断向量表中占 4 字节，前两个字节用来存放中断入口的偏移地址，后两个字节用来存放中断入口的段地址（即段值）。

CPU 执行 INT 指令时，首先将标志寄存器的内容入栈，然后清除中断标志 IF 和单步标志 TF，以禁止可屏蔽中断和单步中断进入，并将当前程序断点的段地址和偏移地址入栈保护，于是，从中断向量表中获得的中断入口的段地址和偏移地址，可分别置入段寄存器 CS 和指令指针 IP 中，CPU 将转向中断入口去执行相应的中断服务程序。

### 【例 3-55】 INT 20H

设当前 CS=2000H, IP=061AH, SS=3000H, SP=0240H, 则 INT 20H 指令操作过程如图 3-14 所示。

该指令执行时，首先，将标志寄存器内容压入堆栈原栈顶 30240H 之上的两个单元 3023FH 和 3023EH；然后，再将断点地址的段地址 CS=2000H 和指令指针 IP=061AH+2=061CH 入栈保护，分别放入 3023DH、3023CH 和 3023BH、3023AH 连续 4 个单元中；最后，根据指令中提供的中断类型号 20H 得到中断向量的存放地址为 80H～83H，假定这 4 个单元中存放的值分别为 00H、30H、00H、40H，则 CPU 将转到物理地址为 43000H 的入口去执行中断服务程序。

## 2. INTO

为了判断有符号数的加减运算是否产生溢出，专门设计了一条1字节的INTO指令，用于对溢出标志OF进行测试；当OF=1时，立即向CPU发出溢出中断请求，并根据系统对溢出中断类型的定义，可从中断向量表中得到类型4的中断服务程序入口地址。该指令一般安排在带符号的算术运算指令之后， $ \underline{\text{用于处理}} $溢出中断。

## 3. IRET

IRET 指令总是安排在中断服务程序的出口处，由它控制从堆栈中弹出程序断点送回 CS 和 IP 中，弹出标志寄存器内容送回标志寄存器中，迫使 CPU 返回到断点继续执行后续程序。IRET 也是一条 1 字节指令。

<div style="text-align: center;"><div style="text-align: center;">图 3-14 INT 20H 指令的操作过程</div> </div>

## 3.7 处理器控制类指令

处理器控制类指令只完成对 CPU 的简单控制功能。

### 3.7.1 对标志位操作指令

1. CLC、STC、CMC 指令

CLC、STC、CMC 指令分别用来对进位标志 CF 清 0、置 1 和取反。

## 2. CLD、STD 指令

CLD、STD 指令分别用来将方向标志 DF 清 0、置 1，常用于串操作指令之前。

## 3. CLI、STI 指令

CLI、STI 指令分别用来将中断标志 IF 清 0、置 1。当 CPU 需要禁止可屏蔽中断进入时，应将 IF 清 0；当允许可屏蔽中断进入时，应将 IF 置 1。

### 3.7.2 同步控制指令

8086/8088 CPU 构成最大方式系统时，可与其他处理器一起构成多处理器系统，当 CPU 需要协处理器帮助它完成某个任务时，CPU 可用同步指令向协处理器发出请求，待它们接受这一请求，CPU 才能继续执行程序。为此，专门设置了以下 3 条同步控制指令。

## 1. ESC 外部操作码，源操作数

ESC 指令中的外部操作码是用于外部处理器的操作码，源操作数是用于外部处理器的源操作数。

ESC 指令是在最大方式系统中，CPU 要求协处理器完成某种任务的命令，它的功能是实现 8086 对 8087 协处理器的控制，使 8087 协处理器可以从 CPU 的程序中取得一条指令或一个存储器操作数。ESC 指令与 WAIT 指令、 $ \underline{\text{TEST}} $ 引线结合使用时，能够启动一个在某个协处理器中执行的子程序。

协处理器平时处于查询状态，一旦查询到 CPU 执行 ESC 指令且发出交权命令，被选协处理器便可开始工作，根据 ESC 指令的要求完成某种操作；待协处理器操作结束，便在  $ \underline{\text{TEST}} $ 状态线上向 8086 CPU 回送一个有效低电平信号，当 CPU 测试到  $ \underline{\text{TEST}} $ 有效时才能继续执行后续指令。

## 2. WAIT

WAIT 指令通常用在 CPU 执行完 ESC 指令后，用来挂起当前进程，等待外部事件，即等待 TEST 线上的有效信号。当  $ \overline{TEST}=1 $ 时，表示 CPU 正处于等待状态，并继续执行 WAIT 指令，CPU 每隔 5 个时钟周期就测试一次 TEST 状态；一旦测试到  $ \overline{TEST}=0 $，则 CPU 结束 WAIT 指令，继续执行后续指令。WAIT 与 ESC 两条指令是成对使用的，它们之间可以插入一段程序，也可以相连。

## 3. LOCK

LOCK 是 1 字节的指令前缀，而不是一条独立的指令，常作为指令的前缀，可位于任何指令的前端。凡带有 LOCK 前缀的指令，在该指令执行过程中都禁止其他协处理器占用总线，故它又称为总线锁定前缀。

总线封锁常用于资源共享的最大方式系统中。可利用 LOCK 指令，使任一时刻只允许子处理器之一工作而其他的均被封锁。
