# 1. 方式0

> 来源：docs/08_电子书/计算机硬件技术基础（第4版）-李继灿.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：0c93d8c7280859f1


方式 0 是基本的输入输出工作方式，它只能完成简单的并行输入输出操作，其控制字格式如图 8-16 所示。

<div style="text-align: center;"><div style="text-align: center;">1=输入,0=输出</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 8-16 方式 0 控制字格式</div> </div>

方式0具有以下特点。

（1）方式0作为一种基本输入输出工作方式，通常不用联络信号，或不使用固定的联络信号，因此，只能无条件传送或按查询方式传送，而不能采用中断方式来和CPU交换数据。任何一个数据端口都可用方式0作为简单的数据输入或输出。在输出时，3个数据口都有锁存功能；在输入时，只有A口有锁存功能，而B口和C口只有三态缓冲能力。

（2）由 A 口、B 口两个 8 位并口和 C 口高 4 位与 C 口低 4 位两个 4 位并口，共有 4 个独立的并口，它们可组合成 16 种不同的输入输出组态。注意，在方式 0 下，这 4 个独立的并口只能按 8 位（对 A 口、B 口）或 4 位（对 C 口高 4 位、C 口低 4 位）作为一组同时输入或输出，不能再把其中的一部分位作为输入而另一部分位作为输出。同时，它们也是一种单向的输入输出传送，一次初始化只能使所指定的某个端口或者作为输入或者作为输出，而不能指定它既作为输入又作为输出。

（3）8255A 在方式 0 下不设置专用联络信号线，若需要联络时，可由用户任意指定 C 口中的某一位完成联络功能，但这种联络功能与后面将要讨论的在方式 1、方式 2 下设置固定的专用联络信号线是不同的。

方式0的使用场合有两种：同步传送、查询式传送。同步传送时，对接口的要求很简单，只要能传送数据就行了。但查询传送时，需要有应答信号，通常将A口与B口作为数据端口，而将C口的4位规定为控制信号输出口，另外4位规定为状态输入口，这样用C口配合A口与B口工作。

## 2. 方式1

方式1和方式0不同，它在使用A口和B口进行输入输出时，一定要利用C口所提供的选通信号和应答信号来配合输入输出操作。所以，方式1又称为选通输入输出方式或者应答方式。

方式1具有以下特点。

（1）方式1作为一种选通输入输出方式，它在工作时需要联络线配合A口和B口对CPU和I/O设备两边进行联络控制，联络线及其联络信号是通过方式1控制字自动对PC口的一些位设置的，编程员不能指定作其他用途，除非改变工作方式。这是一个基本的特性。

（2）A 口和 B 口可被分别指定作为两个数据端口进行单向输入或输出传输，如果 A 口和 B 口中只有一个端口工作于方式 1，则 C 口中就有 3 位被规定为配合该方式工作的联络信号，此时，另一个数据端口可以工作在方式 0，C 口中的其他数位也可以工作在方式 0。

（3）如果 A 口和 B 口都工作在方式 1，则 C 口中就有 6 位（分为两组 3 位）联络线来作联络与控制操作。各联络信号线之间有着固定的时序关系，传送数据时，将严格按照时序的规定进行。而 C 口的其余 2 位，仍可作为输入或输出线。

（4）在方式1的输入输出操作过程中，将产生固定的状态字，这些状态字可作为查询或中断请求用，并可由C口读取。

8255A 按方式 1 工作时，A 口、B 口及 C 口的两位 $ (PC_{4}, PC_{5} $ 或  $ PC_{6}, PC_{7}) $ 可作为 I/O 数据口用，C 口的其余 6 位将作为控制口用。方式 1 的具体操作可以分为以下 3 种情况详细讨论。

### 1）A 口和 B 口均为输入方式

在 A 口和 B 口均为输入方式下，其控制字格式和连接图如图 8-17 所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-17 方式 1 A 口、B 口均为输入</div> </div>

从图8-17中可见，C口的$\mathrm{PC}_{5}\sim\mathrm{PC}_{0}$作为A口与B口输入工作时的选通（STB）、输入缓冲器满（IBF）及中断请求（INTR）信号。其中，$\mathrm{PC}_{4}$作为A口的选通信号输入端$\overline{\mathrm{STB}}_{\mathrm{A}}$，$\mathrm{PC}_{5}$作为A口输入缓冲器满信号的输出端$\mathrm{IBF}_{\mathrm{A}}$，$\mathrm{PC}_{3}$则作为A口的中断请求信号输出端$\mathrm{INTR}_{\mathrm{A}}$。相应地，$\mathrm{PC}_{2}$作为B口的选通信号输入端$\overline{\mathrm{STB}}_{\mathrm{B}}$，$\mathrm{PC}_{1}$作为其输入缓冲器满信号输出端$\mathrm{IBF}_{\mathrm{B}}$，$\mathrm{PC}_{0}$则作为B口的中断请求信号输出端$\mathrm{INTR}_{\mathrm{B}}$。注意，这些被作为控制口使用的由C口所提供的选通信号、应答信号和中断请求信号，它们同C口中的某些指定位线之间有着固定的对应关系，这种关系是在对端口设定工作方式时自动确定的，而不能用编程来改变，除非重新设置方式选择控制字。关于这些信号的含义说明如下。

STB(strobe)：选通输入信号，低电平有效。是由外设送给8255A的选通信号，当它有效时，就把来自外设的一个8位输入数据送到8255A的端口A或端口B的输入缓冲器中。

IBF(input buffer full)：输入缓冲器满信号的输出信号，高电平有效。IBF是8255A输出的状态信号，当它有效时，表示当前已有一个新的数据进入A口或B口的输入缓冲器中，即缓冲器已满，8255A此刻不能再接收别的数据。IBF信号是对STB的响应信号，由STB信

号置位。它可以由 CPU 通过查询 C 口的  $ PC_{5} $ 或  $ PC_{1} $ 位获得。当 CPU 查得  $ PC_{5} $（或  $ PC_{1} $）=1 时，表示输入缓冲器数据已满，CPU 可以从 A 口（或 B 口）读入输入数据；一旦完成读入操作后，IBF 将由 RD 信号的上升沿复位（变为低电平），复位后表示输入缓冲器已空，又允许外设将一个新的数据送到 8255A。

INTR(interrupt request): 是 8255A 送往 CPU 的中断请求信号，高电平有效。

当STB结束（回到高电平时）和IBF为高电平，且有相应的中断允许信号（即INTE为高电平）时，则8255A就把INTR变为有效，以向CPU发中断请求。它表示8255A的数据端口已输入一个新的数据，并向CPU请求中断服务。若CPU响应此中断请求，则读入数据端口的数据，并由RD信号的下降沿使INTR复位（变为低电平）。INTR通常和8259A的一个中断请求输入端IR相连，通过8259A的输出端INT向CPU发出中断请求。

INTE(interrupt enable)：中断允许信号。它是在 8255A 内部的一个控制中断允许或禁止的控制信号。INTE 没有外部引出端，即没有对片外输入或输出的功能，它只能由软件通过对 C 口某位的置位或复位实现对中断请求的允许或禁止。具体地讲，A 口的中断请求 INTR_A 可以通过对 PC_4 的置位或复位加以控制，PC_4 置 1，允许 INTR_A 工作；PC_4 置 0，则屏蔽 INTR_A。B 口的中断请求 INTR_B 可以通过对 PC_2 的置位或复位加以控制。注意，INTR_A 和 INTR_B 是两个中断允许触发器，由于它们没有外部引出脚，因此，在 PC_4 或 PC_2 脚上出现外来的高电平或低电平信号时，并不能改变中断允许触发器的状态。

#### 2）A 口和 B 口均为输出方式

在 A 口和 B 口均为输出方式下，其控制字格式和连线图如图 8-18 所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-18 方式 1 A 口、B 口均为输出</div> </div>

从图8-18可见，端口C的$\mathrm{PC}_{3}\sim\mathrm{PC}_{0}$ 与$\mathrm{PC}_{7}$、$\mathrm{PC}_{6}$ 这6位线分别作为端口A与端口B输出时的缓冲器满（OBF）、应答（ACK）信号和中断请求信号（INTR）。其中，$\mathrm{PC}_{7}$ 作为A口的输出缓冲器满信号端$\overline{\mathrm{OBF}}_{\mathrm{A}}$，$\mathrm{PC}_{6}$ 作为其外设应答信号端$\overline{\mathrm{ACK}}_{\mathrm{A}}$，$\mathrm{PC}_{3}$ 则作为中断请求信号端$\mathrm{INTR}_{\mathrm{A}}$。相应地，$\mathrm{PC}_{2}$、$\mathrm{PC}_{1}$ 与$\mathrm{PC}_{0}$ 则分别作为B口的3位联络线$\overline{\mathrm{ACK}}_{\mathrm{B}}$、$\overline{\mathrm{OBF}}_{\mathrm{B}}$与$\mathrm{INTR}_{\mathrm{B}}$。它们的含义如下。

OBF(output buffer full)：输出缓冲器满信号，输出信号，低电平有效。当它有效时，表示 CPU 已把数据写入 A 口或 B 口的输出缓冲器等待输出。当  $ \overline{CPU} $ 执行 OUT 指令  $ \overline{WR} $ 有效时，表示将数据锁存到输出缓冲器，由写信号  $ \overline{WR} $ 的上升沿把 OBF 信号置成低电平，通知外设可以到 A 口或 B 口取走数据。当外设取走数据时，向 8255A 发应答信号  $ \overline{ACK} $， $ \overline{ACK} $ 信号使 OBF 复位为高电平。

ACK(acknowledge)：外设应答信号，低电平有效。当ACK有效时，表示CPU输出到

8255A 的数据已被外设取走。

 $ \underline{\text{INTR}} $(interrupt request)：中断请求信号，高电平有效。当外设向8255A发回的应答信号ACK结束（回到高电平），8255A便向CPU发中断请求信号INTR，表示CPU可以对8255A写入一个新的数据。若CPU响应此中断请求，向数据口写入一新的数据，则由写信号WR上升沿（后沿）使INTR复位，变为低电平。

INTE(interrupt enable)：中断允许信号，与方式1输入类似，A口的输出中断请求$\mathrm{INTR}_{A}$可以通过对$\mathrm{PC}_{3}$的置位或复位来加以允许或禁止。B口的输出中断请求$\mathrm{INTR}_{B}$可以通过对$\mathrm{PC}_{0}$的置位或复位来加以允许或禁止。

##### 3）混合输入与输出

端口 A 为输入，端口 B 为输出，其控制字格式和连线图如图 8-19 所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-19 方式 1 端口 A 输入、端口 B 输出</div> </div>

端口 A 为输出，端口 B 为输入，其控制字格式如图 8-20 所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-20 方式 1 端口 A 输出、端口 B 输入</div> </div>

【例 8-4】设 8255A 为工作在方式 1，A 口为输出。当外设向 8255A 发回的应答信号变为高电平时，若允许 8255A 向 CPU 发中断请求信号，则必须设置中断允许信号 INTRA=1，即置 PC₆=1；若禁止它产生中断请求，则 INTRA=0，即置 PC₆=0。假定端口的地址范围为 300H～303H，其程序段如下。

MOV DX, 303H ; 置 8255A 控制口
MOV AL, 00001101B ; 置 C 口按位控制字，使  $ PC_{6}=1 $，允许发中断请求
OUT DX, AL
MOV AL, 00001100B ; 置  $ PC_{6}=0 $，禁止发中断请求
OUT DS, AL

【例 8-5】若将 8255A 的 A 口与打印机相连，使 A 口工作于方式 1 下输出，并利用中断方式向打印机输出一组（字符串长度为 256 字节）字符，打印机接口连接电路如图 8-21 所示。试编写采用中断方式传送一组打印字符的程序段。

<div style="text-align: center;"><div style="text-align: center;">图 8-21 打印机接口连接电路</div> </div>

由图8-21可知，当8255A的A口按方式1采用中断方式向打印机输出字符时，将通过自动设置的3位联络线配合A口输出，这时3位联络线的连接情况是：用PC $ _{7} $自动作为8255A的输出缓冲器满信号OBF的输出端，通过单稳触发器接到打印机的1号引脚端，PC $ _{6} $自动作为外设的应答信号ACK从打印机的10号引脚接到8255A的PC $ _{6} $端，而PC $ _{3} $则自动作为A口的中断请求信号输出端INTR $ _{A} $接到8259A的IR $ _{2} $端（这是由用户选用的保留引脚），它所对应的中断类型号为0AH。

由联络线信号引起 CPU 中断的具体过程是：输出时，首先由 CPU 执行 OUT 指令向 A 口输出一个空字符（也可以是空格字符），通过配合 A 口输出的 3 位联络线的控制以引发第一次中断请求。在中断服务子程序中，当取一个要打印的字符送到 8255A 的 A 口时，若为低电平有效，则表示 CPU 已把 1 个字符写入 A 口的输出缓冲器，等待外设来取走 A 口的字符。利用  $ PC_{7} $ 引脚上 OBF 的下降沿触发一次单稳触发器，产生打印机所需要的脉冲，将字符锁存到打印机的内部缓冲器中。当打印机接收到字符后，便从 10 号引脚上向 8255A 的  $ PC_{6} $ 发一个低电平的应答信号 ACK，由 ACK 使 OBF 变为高电平。当结束应答 ACK 回到高电平，8255A（在其中断允许 INTE 已设定为 1 时）便由  $ PC_{3} $ 输出 INTR $ _{A} $ 中断请求信号。当 CPU 响应中断后，将再次执行中断服务子程序输出下一个字符，待中断处理完毕，返回主程序，又继续准备接收和响应新的中断请求。如此重复地响应中断请求和执行中断服务子程序，直至输出完一组打印字符。

假定 8255A 的端口地址范围为 300H～303H，8259A 的端口地址为 020H 与 021H。初始化时使 A 口为方式 1、输出，B 口可任意设定为方式 0、输出，C 口除联络线以外的 5 位线也均设定为输出，则方式选择控制字为 10100000B（0A0H）。允许 A 口输出中断请求的 INTR<sub>A</sub> 中断允许信号，由 C 口置位/复位控制字对 PC<sub>6</sub> 置位来设定。

中断打印输出字符的程序由主程序 MAIN 和中断服务子程序 SUBP 两部分组成。主程序完成中断向量设置、开放中断（包括使 CPU 的中断允许标志 IF 为 1 与使 8255A 的 INTE 为 1）以及 8255A 初始化等准备工作，而中断服务子程序则完成 A 口字符的输出、8259A 芯片的中断命令字与结束中断方式的设置以及中断返回等操作。

MAIN: PUSH DS

MOV AX, SEG SUBP

;保存原 DS

;为打印驱动子程序入口 SUBP 设置新的中断向量

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DS, AX</td><td style='text-align: center; word-wrap: break-word;'>;SUBP 的段地址送 DS</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DX, OFFSET</td><td style='text-align: center; word-wrap: break-word;'>;SUBP 的偏移地址送 DX</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AH, 25H</td><td style='text-align: center; word-wrap: break-word;'>;设置中断向量的功能号 AH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 0AH</td><td style='text-align: center; word-wrap: break-word;'>;为 8259A 的  $ IR_2 $ 建立 0AH 号中断向量表项</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>INT</td><td style='text-align: center; word-wrap: break-word;'>21H</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>POP</td><td style='text-align: center; word-wrap: break-word;'>DS</td><td style='text-align: center; word-wrap: break-word;'>;恢复原 DS</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DX, 303H</td><td style='text-align: center; word-wrap: break-word;'>;设定 8255A 控制端口地址</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 0AOH</td><td style='text-align: center; word-wrap: break-word;'>;8255A 初始化, 设置方式选择控制字</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>DX, AL</td><td style='text-align: center; word-wrap: break-word;'>;控制字送端口</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 00001101B</td><td style='text-align: center; word-wrap: break-word;'>;设定 C 口置位/复位控制字</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DX, AL</td><td style='text-align: center; word-wrap: break-word;'>;置  $ PC_6 $ = 1, 使  $ INTE_A $ = 1, 允许 8255A 产生中断</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DX, 300H</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 00H</td><td style='text-align: center; word-wrap: break-word;'>;设置空白字符的 ASCII 码</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>DX, AL</td><td style='text-align: center; word-wrap: break-word;'>;A 口输出一个空白字符, 以引发第一次中断请求</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AX, OFFSET DATA</td><td style='text-align: center; word-wrap: break-word;'>;打印字符串的标号 DATA (首地址) 的偏移地址送 AX</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>STR_PTR, AX</td><td style='text-align: center; word-wrap: break-word;'>;设置增 1 的打印字符串指针的偏移地址</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AX, SEG DATA</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>STR_PTR +2, AX</td><td style='text-align: center; word-wrap: break-word;'>;设置增 1 的打印字符串指针的段地址</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>STI</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'>;CPU 开中断</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>:</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td colspan="3">SUBP: PUSH SI</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>PUSH</td><td style='text-align: center; word-wrap: break-word;'>DS</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>PUSH</td><td style='text-align: center; word-wrap: break-word;'>AX</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>LDS</td><td style='text-align: center; word-wrap: break-word;'>SI, DWORD PTR STR_PTR</td><td style='text-align: center; word-wrap: break-word;'>;设置打印字符串地址的指针 DS:SI</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CLD</td><td style='text-align: center; word-wrap: break-word;'></td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td colspan="2">LODSB</td><td style='text-align: center; word-wrap: break-word;'>;从 SI 寻址的字符串中取一个 8 位字符送 AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>STR_PTR, SI</td><td style='text-align: center; word-wrap: break-word;'>;将自动增 1 后的 SI 保存于新的字符串指针</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DX, 300H</td><td style='text-align: center; word-wrap: break-word;'>;8255A 的 A 口地址</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>DX, AL</td><td style='text-align: center; word-wrap: break-word;'>;将 AL 的一个打印字符串输出到 A 口</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>CX, 0FFH</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DEC</td><td style='text-align: center; word-wrap: break-word;'>CX</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JNZ</td><td style='text-align: center; word-wrap: break-word;'>NEXT</td><td style='text-align: center; word-wrap: break-word;'>;字符传送完否? 未完, 转 NEXT</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 00001100B</td><td style='text-align: center; word-wrap: break-word;'>;已传送完, 重设 C 口置位/复位控制字</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DX, 303H</td><td style='text-align: center; word-wrap: break-word;'>;8255A 控制端口地址</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DX, AL</td><td style='text-align: center; word-wrap: break-word;'>;置  $ PC_6 $ = 0, 使  $ INTE_A $ = 0, 禁止 8255A 产生中断</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>NEXT: MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 20H</td><td style='text-align: center; word-wrap: break-word;'>;设置 8259A 的  $ OCW_2 $ 命令</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>20H, AL</td><td style='text-align: center; word-wrap: break-word;'>;送中断结束命令给 8259A 的端口</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>POP</td><td style='text-align: center; word-wrap: break-word;'>AX</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>POP</td><td style='text-align: center; word-wrap: break-word;'>DS</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>POP</td><td style='text-align: center; word-wrap: break-word;'>SI</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>IRET</td><td colspan="2">;中断返回</td></tr></table>

注意：采用中断方式打印输出和查询方式打印输出的数据。传输方式是不同的，其基本区别在于，采用中断方式时，CPU不会用自身执行查询或循环指令来等待输出数据，它可以照常执行主程序，只有当接收到中断请求信号并允许中断时，才响应中断并转向处理中断服务子程序，这样，大大节省了查询等待的时间，提高了CPU的工作效率。

## 3. 方式 2

方式2称为选通双向传输，仅适用于A口。图8-22是方式2的控制字格式和连线图。其控制信号含义如下。

<div style="text-align: center;"><div style="text-align: center;">图 8-22 方式 2 控制字格式</div> </div>

INTR $ _{A} $：中断请求信号，高电平有效。端口 A 完成一次输入或输出数据操作后，可通过 INTR $ _{A} $ 向 CPU 发中断请求。

 $ \overline{STB}_{A} $：输入选通信号，低电平有效。当 $ \overline{STB}_{A} $有效时，把外设输入的数据信号锁存入端口A。

IBF $ _{A} $：输入缓冲器满，高电平有效。当 IBF $ _{A} $ 有效时，表示已有一个数据送入 A 口，等待 CPU 读取。此信号可供 CPU 作输入查询用。

OBF $ _{A} $：输出缓冲器满，低电平有效。当OBF $ _{A} $有效时，表示CPU已将一个数据写入A口，通知外设，可以将其取走。

ACK $ _{A} $：外设应答信号，低电平有效。当ACK $ _{A} $有效时，表示A口输出的数据已送到外设。

INTE $ _{1} $：A 口输出中断允许信号（在片内）。可以由软件通过对 PC $ _{6} $ 的置位或复位来加以允许或禁止。

INTE $ _{2} $：A 口输入中断允许信号（在片内）。可以由软件对 PC $ _{4} $ 的置位或复位来加以允许或禁止。

### 8.3.5 8255A 的时序关系

按方式 0 工作时，因为外设与 8255A 之间的数据交换没有时序控制，所以只能作为简单的输入输出和用于低速并行数据通信。而按方式 1 工作时，外设与 CPU 可以进行实时数据通信。

方式1的工作时序如图8-23和图8-24所示。

方式2的工作时序如图8-25所示。

从时序图上，可以把它们的工作过程归纳如下。

（1）当数据端口作为输入工作时，在STB有效时，由外设把输入数据送入端口，并发出IBF有效信号，该信号可供外设作通信联络信号，也可以由CPU查询C口的相应位获得。当CPU执行IN指令对该数据口进行读入操作后，由RD的上升 $ \underline{\text{沿使}} $IBF复位，为下一次输入数据作准备。如果该数据端口的中断允许INTE被置位，则在STB信号回复到高电平时，8255A通过INTR向CPU发中断请求。若CPU响应该中断请求，读取该数据端口的输入数据，则RD由下降沿使INTR复位，为下一次数据输入请求中断作准备。

（2）当数据端口作为输出口时，在CPU把数据写入端口后，由WR的上升沿使OBF有效并使INTR复位。 $ \overline{OBF} $由8255A输出到外设，并通知外设可以取走端口的输出数据。当外

<div style="text-align: center;"><div style="text-align: center;">图 8-23 方式 1 的输入时序</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 8-24 方式 1 的输出时序</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 8-25 方式 2 的时序</div> </div>

设取走一个数据时，应向8255A发回应答信号 $ \underline{\text{ACK}} $。 $ \underline{\text{ACK}} $的有效低电平可以使 $ \underline{\text{OBF}} $复位，为下一次输出做好准备。如果该端口输出中断允许INTE位被置位，则当 $ \underline{\text{ACK}} $回到高电平时，8255A可以通过INTR发输出中断请求。若CPU响应该中断请求，又可以把下一次输出数据写入数据端口。

（3）当数据端口既作为输入又作为输出选通双向传送时，其时序图上所表示的工作过程将是以上输入时序与输出时序的综合，故不再详述。

### 8.3.6 8255A 的应用举例

8255A 作为通用的并行输入输出接口芯片，常用于 CPU 与外设之间，CPU 可以通过 8255A 将数字量送往外设，也可以通过 8255A 将数字量从外设读入 CPU。当 8255A 用作矩阵键盘接口时，既有输入操作，又有输出操作，用一片 8255A 构成 4 行 4 列的非编码键盘电路如图 8-26 所示。

非编码键盘通常有线性排列和 M 行  $ \times $ N 列的矩阵排列两种。通过程序查询来判断是哪一个键有效，其硬件电路较编码键盘要简单。线性键盘的每一个按键均有一根输入线，每根输入线接到微机输入端口的一根输入线上，若为 16 个按键则需要 16 根输入线，因此，线性键盘不适合较多的按键应用场合。非编码矩阵键盘应用较广，输入输出引线数量等于行

数加列数。

图8-26为4行4列矩阵键盘接口，输入输出共8根线实现16个按键，按键越多，矩阵键盘优点越明显。

<div style="text-align: center;"><div style="text-align: center;">图 8-26 矩阵键盘接口</div> </div>

该矩阵键盘接口由 8255A 的 PA_{3}～PA_{0} 作为输出线，PB_{3}～PB_{0} 作为输入线，且 PB_{3}～PB_{0} 均通过电阻接到 +5V（本图略）。其工作过程如下。

计算机对其实现两次扫描。第1次扫描，将  $ PA_3 \sim PA_0 $ 输出均为低电平，由  $ PB_3 \sim PB_0 $ 读入，判断是否有一个低电平，若没有任何一个是低电平，则继续实现第1次扫描；若有低电平，则应用软件消除抖动，延时  $ 10 \sim 20ms $ 后，再去判别是否有低电平，若低电平消失，则可能是干扰或按键的抖动，必须重新实现第1次扫描；否则，经  $ 10 \sim 20ms $ 后，仍然判别出有低电平，则确认有键按下，接着实现第2次扫描。第2次扫描，即逐行扫描法，例如，先扫描0行，计算机从A口输出，使  $ PA_3 = 1, PA_2 = 1, PA_1 = 1, PA_0 = 0 $，然后从B口读入，判别是否有低电平，如果有则可识别出0行哪一列上有键按下，如果没有则计算机从PA口重新输出，使  $ PA_3 = 1, PA_2 = 1, PA_1 = 0, PA_0 = 1 $，从B口输入，用上述方法判别，直至扫描完所有4行，总可以找到某一个按下的按键，并识别出其处于矩阵中的位置，因而可根据键号去执行对该键所设计的子程序。

设图8-26中8255A的A口作为输出，端口地址为80H，B口作为输入，端口地址为81H，控制口地址为83H，其键盘扫描程序如下。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="14">LOOA:</td><td colspan="2">;判别是否有键按下</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 82H</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>83H, AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 00H</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>80H, AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>IN</td><td style='text-align: center; word-wrap: break-word;'>AL, 81H</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>AND</td><td style='text-align: center; word-wrap: break-word;'>AL, 0FH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CMP</td><td style='text-align: center; word-wrap: break-word;'>AL, 0FH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JZ</td><td style='text-align: center; word-wrap: break-word;'>LOOA</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CALL</td><td style='text-align: center; word-wrap: break-word;'>D20ms</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>IN</td><td style='text-align: center; word-wrap: break-word;'>AL, 81H</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>AND</td><td style='text-align: center; word-wrap: break-word;'>AL, 0FH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CMP</td><td style='text-align: center; word-wrap: break-word;'>AL, 0FH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JZ</td><td style='text-align: center; word-wrap: break-word;'>LOOA</td></tr></table>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="5">START:</td><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>BL, 4</td><td style='text-align: center; word-wrap: break-word;'>;行数送 BL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>BH, 4</td><td style='text-align: center; word-wrap: break-word;'>;列数送 BH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 0FEH</td><td style='text-align: center; word-wrap: break-word;'>; $ D_{0} $=0, 准备先扫描 0 行</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>CL, 0FH</td><td style='text-align: center; word-wrap: break-word;'>;键盘屏蔽码送 CL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>CH, 0FFH</td><td style='text-align: center; word-wrap: break-word;'>;CH 中存放起始键号</td></tr><tr><td rowspan="12">LOP1:</td><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>80H,AL</td><td style='text-align: center; word-wrap: break-word;'>;A 口输出, 扫描一行</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>ROL</td><td style='text-align: center; word-wrap: break-word;'>AL</td><td style='text-align: center; word-wrap: break-word;'>;修改扫描码, 准备扫描下一行</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AH, AL</td><td style='text-align: center; word-wrap: break-word;'>;暂时保存</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>IN</td><td style='text-align: center; word-wrap: break-word;'>AL, 81H</td><td style='text-align: center; word-wrap: break-word;'>;B 口输入, 读列值</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>AND</td><td style='text-align: center; word-wrap: break-word;'>AL, CL</td><td style='text-align: center; word-wrap: break-word;'>;屏蔽高 4 位</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CMP</td><td style='text-align: center; word-wrap: break-word;'>AL, CL</td><td style='text-align: center; word-wrap: break-word;'>;比较</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JNZ</td><td style='text-align: center; word-wrap: break-word;'>LOP2</td><td style='text-align: center; word-wrap: break-word;'>;有列线为 0, 转 LOP2, 找列线</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>ADD</td><td style='text-align: center; word-wrap: break-word;'>CH, BH</td><td style='text-align: center; word-wrap: break-word;'>;无键按下, 修改键号, 使其适合下一行找键号</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, AH</td><td style='text-align: center; word-wrap: break-word;'>;恢复扫描码</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DEC</td><td style='text-align: center; word-wrap: break-word;'>BL</td><td style='text-align: center; word-wrap: break-word;'>;行数减 1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JNZ</td><td style='text-align: center; word-wrap: break-word;'>LOP1</td><td style='text-align: center; word-wrap: break-word;'>;未扫描完转 LOP1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JMP</td><td style='text-align: center; word-wrap: break-word;'>START</td><td style='text-align: center; word-wrap: break-word;'>;重新扫描</td></tr><tr><td rowspan="11">LOP2:</td><td style='text-align: center; word-wrap: break-word;'>INC</td><td style='text-align: center; word-wrap: break-word;'>CH</td><td style='text-align: center; word-wrap: break-word;'>;键号增 1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>ROR</td><td style='text-align: center; word-wrap: break-word;'>AL</td><td style='text-align: center; word-wrap: break-word;'>;右移 1 位</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JC</td><td style='text-align: center; word-wrap: break-word;'>LOP2</td><td style='text-align: center; word-wrap: break-word;'>;无键按下, 查下一列线</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, CH</td><td style='text-align: center; word-wrap: break-word;'>;已找到, 键号送 AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CMP</td><td style='text-align: center; word-wrap: break-word;'>AL, 0</td><td style='text-align: center; word-wrap: break-word;'>;是 0 号键按下, 转 KEY0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JZ</td><td style='text-align: center; word-wrap: break-word;'>KEY0</td><td style='text-align: center; word-wrap: break-word;'>;否则, 判断是否为 1 号键</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CMP</td><td style='text-align: center; word-wrap: break-word;'>AL, 1</td><td style='text-align: center; word-wrap: break-word;'>;是 1 号键按下, 转 KEY1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JZ</td><td style='text-align: center; word-wrap: break-word;'>KEY1</td><td style='text-align: center; word-wrap: break-word;'>:</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CMP</td><td style='text-align: center; word-wrap: break-word;'>AL, 0EH</td><td style='text-align: center; word-wrap: break-word;'>;判断是否为 14 号键</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JZ</td><td style='text-align: center; word-wrap: break-word;'>KEY14</td><td style='text-align: center; word-wrap: break-word;'>;是, 转 KEY14</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JMP</td><td style='text-align: center; word-wrap: break-word;'>KEY15</td><td style='text-align: center; word-wrap: break-word;'>;不是 0~14 号键, 则一定是 15 号键</td></tr></table>

该4行4列矩阵键盘接口易于扩展，无论是增加行还是增加列均可扩充键的数量，只需对以上程序稍做更改即可。

## 8.4 可编程串行异步通信接口芯片 8250

NINS 8250 是一种可编程的串行异步通信接口芯片，例如 IBM PC 中的串行接口即用此芯片。它支持异步通信规程；芯片内部设置时钟发生电路，并可以通过编程改变传送数据的波特率；它提供完善的 modem 接口，极易通过 modem 实现远程通信。

### 8.4.1 串行异步通信规程

在详细介绍可编程串行异步通信接口芯片8250之前，首先要了解串行异步通信规程。

串行异步通信规程是把一个字符看作一个独立的信息单元，每个字符中的各位以固定的时间传送。因此，这种传送方式在同一字符内部是同步的，而字符之间是异步的。在异步通信中收发双方取得同步的方法是采用在字符格式中设置起始位和停止位的办法。在一个

有效字符正式发送之前，先发送一个起始位，而在字符结束时发送1～2个停止位。当接收器检测到起始位时，便能知道接下来是有效的字符位，于是开始接收字符，检测到停止位时，就将接收到的有效字符装入接收缓冲器中。通常串行异步通信的数据传输格式如图8-27所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-27 串行异步通信数据传输格式</div> </div>

从图8-27中可见，串行异步通信格式如下。

起始位：一定是逻辑0电平。

数据位（5～8位）：紧跟在起始位后，是要被传送的数据。传送时，先传送低位，后传送高位。

奇偶校验位：占1位，奇校验或偶校验。

停止位：可以是1位、1.5位或2位，一定是逻辑1电平。

### 8.4.2 8250 芯片引脚定义与功能

8250 是一个 40 脚封装的双列直插式芯片，图 8-28 是其引脚功能示意图。除电源线  $ (V_{cc}) $ 和地线 (GND) 外，其引脚线可分为两类：

与 CPU 接口的信号线、与通信设备接口的信号线。

## 1. 与 CPU 接口的信号线

与 CPU 接口的信号线共分为 5 组：数据线、读写控制信号线、总线驱动器控制线、中断信号线和复位信号输入线。

（1）数据线： $ D_{7} \sim D_{0} $，CPU 和 8250 通过此 8 位双向数据线传送数据或命令。

（2）读写控制信号线如下。

①  $ \mathrm{CS}_{0} $、 $ \mathrm{CS}_{1} $、 $ \overline{\mathrm{CS}_{2}} $：片选输入引脚。当  $ \mathrm{CS}_{0} $、 $ \mathrm{CS}_{1} $ 为高电平， $ \overline{\mathrm{CS}_{2}} $ 为低电平时，则选中 8250。

② DISTR、DISTR：数据输入选通引脚。当DISTR为高电平或DISTR为低电平时，CPU就能从选中的8250寄存器中读出状态字或数据信息。DISTR连接系统总线上的IOR。

<div style="text-align: center;"><div style="text-align: center;">图 8-28 8250 引脚功能示意图</div> </div>

③ DOSTR、 $ \overline{DOSTR} $：数据输出选通的输入引脚。当 DOSTR 为高电平或 DOSTR 为低电平时，CPU 就能将数据或命令写入 8250。 $ \overline{DOSTR} $ 连接系统总线上的  $ \overline{IOW} $。

④  $ A_{2} $、 $ A_{1} $、 $ A_{0} $：地址选择线，用来选择8250内部寄存器。它们通常接地址线  $ A_{2} $、 $ A_{1} $、 $ A_{0} $。

⑤  $ \overline{ADS} $：地址锁存输入引脚，当  $ \overline{ADS}=0 $ 时，选通地址  $ A_{2} $、 $ A_{1} $、 $ A_{0} $ 和片选信号，当  $ \overline{ADS}=1 $ 时，便锁存  $ A_{2} $、 $ A_{1} $、 $ A_{0} $ 和片选信号。实用中， $ \overline{ADS} $ 接地便可。

（3）总线驱动器控制线如下。

① CSOUT：片选输出信号。当 CSOUT 为高电平时，表示  $ \mathrm{CS}_{0} $、 $ \mathrm{CS}_{1} $、 $ \overline{\mathrm{CS}_{2}} $ 信号均有效，即 8250 被选中。

②DDIS：禁止驱动器输出引脚。当CPU读8250时DDIS输出低电平；非读时输出高电平。该信号用来控制8250与系统总线之间的“总线驱动器”方向选择。在PC/XT异步适配器上，DDIS悬空不用。

（4）INTRPT：中断信号线，中断请求输出引脚，高电平有效。当8250允许中断时，接收出错、接收数据寄存器满、发送数据寄存器空以及modem的状态均能够产生有效的INTRPT信号。

（5）MR：复位信号输入线，高电平有效。复位后，8250 回到初始状态。一般接系统复位信号线 RESET。

## 2. 与通信设备接口的信号线

与通信设备接口的信号线分为4组：串行数据I/O线、联络控制线、用户编程端口和时钟信号线。

（1）串行数据 I/O 线如下。

① SIN：串行数据输入引脚。外设或其他系统送来的串行数据由此端进入8250。

② SOUT：串行数据输出引脚。

（2）联络控制线如下。

① CTS: 清除发送(即允许发送)信号线的输入引脚。当 $ \underline{\text{CTS}} $为低电平时，表示8250本次发送数据结束，而允许8250向外设(modem或数据装置)发送新的数据。它是外设对 $ \underline{\text{RTS}} $信号的应答信号。

② $ \overline{RTS} $：请求发送输出引脚。当 $ \overline{RTS} $为低电平时，通知 modem 或数据装置，8250 已准备发送数据。

③  $ \overline{DTR} $：数据终端准备就绪输出引脚。当 $ \overline{DTR} $为低电平时，就通知 modem 或数据装置，8250 已准备好可以通信。

④  $ \overline{DSR} $：数据装置准备好输入引脚。当 $ \overline{DSR} $为低电平时，表示 modem 或数据装置与8250 已建立通信联系，传送数据已准备就绪。

⑤ RLSD：载波检测输入引脚。当RLSD为低电平时，表示 modem 或数据装置已检测到通信线路上送来的信息，指示应开始接收。

⑥ $ \overline{RI} $：振铃指示输入引脚。当 $ \overline{RI} $为低电平时，表示 modem 或数据装置已接收到了电话线上的振铃信号。

（3）用户编程端口如下。

① OUT $ _{1} $：用户指定的输出引脚。可以通过对8250的编程使 $ \overline{OUT}_{1} $为低电平或高电平。若用户在modem控制寄存器第2位(OUT $ _{1} $)写入1，则输出端 $ \overline{OUT}_{1} $变为低电平。

② $ \overline{OUT}_{2} $：用户指定的另一输出引脚。也可以通过对8250的编程使 $ \overline{OUT}_{2} $为低电平或高电平。若用户在modem控制寄存器第3位( $ \overline{OUT}_{2} $)写入1，则输出端 $ \overline{OUT}_{2} $变为低电平。

（4）时钟信号线如下。

① BAUDOUT：波特率信号输出引脚。由8250内部时钟发生器分频后输出，频率是发送数据波特率的16倍。若此信号接到RCLK上，可以同时作为接收时钟使用。

② RCLK：接收时钟输入引脚。通常直接连到BAU $ \underline{\text{DOUT}} $输出引脚，保证接收与发送的波特率相同。

③ XTAL $ _{1} $、XTAL $ _{2} $：时钟信号输入和输出引脚。如果外部时钟从 XTAL $ _{1} $ 输入，则 XTAL $ _{2} $ 可悬空不用；也可在 XTAL $ _{1} $ 和 XTAL $ _{2} $ 之间接晶体振荡器。

### 8.4.3 8250 芯片的内部结构和寻址方式

图8-29是8250芯片内部结构框图。由图中可以看出，它是由10个内部寄存器、数据缓冲器和寄存器选择与I/O控制逻辑组成。通过微处理器的输入输出指令可以对10个内部寄存器进行操作，以实现各种异步通信的要求。表8-3列出了各种寄存器的名称及相应的口地址。

<div style="text-align: center;"><div style="text-align: center;">表 8-3 8250 寄存器的口地址</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>I/O 口</td><td style='text-align: center; word-wrap: break-word;'>IN/OUT</td><td style='text-align: center; word-wrap: break-word;'>寄存器名称</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3F8H</td><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>发送保持寄存器</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3F8H</td><td style='text-align: center; word-wrap: break-word;'>IN</td><td style='text-align: center; word-wrap: break-word;'>接收数据寄存器</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3F8H</td><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>低字节波特率因子（设置工作方式时控制字  $ D_7=1 $）</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3F9H</td><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>高字节波特率因子（设置工作方式时控制字  $ D_7=1 $）</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3F9H</td><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>中断允许寄存器</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3FAH</td><td style='text-align: center; word-wrap: break-word;'>IN</td><td style='text-align: center; word-wrap: break-word;'>中断识别寄存器</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3FBH</td><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>线路控制寄存器</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3FCH</td><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>modem 控制寄存器</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3FDH</td><td style='text-align: center; word-wrap: break-word;'>IN</td><td style='text-align: center; word-wrap: break-word;'>线路状态寄存器</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>3FEH</td><td style='text-align: center; word-wrap: break-word;'>IN</td><td style='text-align: center; word-wrap: break-word;'>modem 状态寄存器</td></tr></table>

需要说明的是，表8-3中I/O口地址（3F8H～3FEH）是由IBM PC/XT系统中的地址译码器提供的（串行口1）。当8250用于其他场合时，表中I/O的口地址应由8250所在电路的地址译码器决定。

### 8.4.4 8250 内部控制状态寄存器的功能及其工作过程

8250 内部有 9 个控制状态寄存器，其功能分述如下。

<div style="text-align: center;"><div style="text-align: center;">晶体振荡器 1.8432MHz</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 8-29 8250 异步通信接口芯片内部结构框图</div> </div>

## 1. 发送数据保持寄存器（THR，口地址 3F8H）

当发送数据时，CPU 将待发送的字符写入发送数据保持寄存器（THR）中，即口地址3F8H中，其中第0位是串行发送的第1位数据。先由8250的硬件送入发送移位寄存器（TSR）中，在发送时钟驱动下逐位将数据由SOUT引脚输出。

## 2. 接收数据缓冲寄存器（RBR，口地址 3F8H）

接收数据缓冲寄存器(RBR)用于存放接收到的1个字符。当8250从SIN端接收到一个完整的字符后，会把该字符从接收移位寄存器送入RBR中。在RBR存放接收到的一个字符后，可由CPU将它读出，读出的数据只是一个字符帧中的数据部分，而起始位、奇偶校验位、停止位均被8250过滤掉。

## 3. 通信线路控制寄存器（LCR，口地址 3FBH）

通信线路控制寄存器（LCR）设定异步串行通信的数据格式，各位含义如图8-30所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-30 通信线路控制寄存器数据位的含义</div> </div>

## 4. 波特率因子寄存器（DLR，口地址 3F8H、3F9H）

波特率因子寄存器(DLR)用于写入波特率因子。8250规定当线路控制寄存器LCR写入 $ D_{7}=1 $时，接着对口地址3F8H、3F9H可分别写入波特率因子的低字节和高字节，即写入除数寄存器(L)和除数寄存器(H)中。而波特率为1.8432MHz/(波特率因子×16)。

波特率和除数对照值如表8-4所示。例如，要求发送波特率为1200波特，则波特率因子为：

 $$  波特率因子 =1.8432MHz/1200\times16=1843200Hz/1200=96 $$

因此，3F8H 口地址应写入 96(60H)，3F9H 口地址应写入 0。

<div style="text-align: center;"><div style="text-align: center;">表 8-4 波特率和除数对照表</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>十进制</td><td style='text-align: center; word-wrap: break-word;'>十六进制</td><td style='text-align: center; word-wrap: break-word;'>波特率</td><td style='text-align: center; word-wrap: break-word;'>十进制</td><td style='text-align: center; word-wrap: break-word;'>十六进制</td><td style='text-align: center; word-wrap: break-word;'>波特率</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1047</td><td style='text-align: center; word-wrap: break-word;'>417</td><td style='text-align: center; word-wrap: break-word;'>110</td><td style='text-align: center; word-wrap: break-word;'>96</td><td style='text-align: center; word-wrap: break-word;'>60</td><td style='text-align: center; word-wrap: break-word;'>1200</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>768</td><td style='text-align: center; word-wrap: break-word;'>300</td><td style='text-align: center; word-wrap: break-word;'>150</td><td style='text-align: center; word-wrap: break-word;'>48</td><td style='text-align: center; word-wrap: break-word;'>30</td><td style='text-align: center; word-wrap: break-word;'>2400</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>384</td><td style='text-align: center; word-wrap: break-word;'>180</td><td style='text-align: center; word-wrap: break-word;'>300</td><td style='text-align: center; word-wrap: break-word;'>24</td><td style='text-align: center; word-wrap: break-word;'>18</td><td style='text-align: center; word-wrap: break-word;'>4800</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>192</td><td style='text-align: center; word-wrap: break-word;'>C0</td><td style='text-align: center; word-wrap: break-word;'>600</td><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>0C</td><td style='text-align: center; word-wrap: break-word;'>9600</td></tr></table>

## 5. 中断允许寄存器（IER，口地址 3F9H）

中断允许寄存器(IER)的低4位允许8250设置4种类型的中断（将相应位置1即可），并通过 $ IRQ_{4} $向CPU发中断请求，各位含义如图8-31所示。

## 6. 中断标识寄存器（IIR，口地址 3FAH）

中断标识寄存器（IIR）可以用来判断有无中断，并判断是哪一类中断请求。IIR 的高 5

<div style="text-align: center;"><div style="text-align: center;">图 8-31 中断允许寄存器低 4 位的含义</div> </div>

位恒为0，只使用低3位作为8250的中断标识位，各位的含义如图8-32所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-32 中断标识寄存器低 3 位的含义</div> </div>

## 7. 通信线路状态寄存器（LSR，口地址 3FDH）

通信线路状态寄存器（LSR）用于向CPU提供有关8250数据传输的状态信息，各位含义如图8-33所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-33 通信线路寄存器各位的含义</div> </div>

D_{7}：未用，其值为0。

 $ D_{6} $：为1时，表示发送移位寄存器TSR为空。当THR的数据移入TSR后，此位清0。该位常记为TSRE或TEMT。

D_{5}：为1时，表示发送保持寄存器THR为空。当CPU将数据写入THR后，此位清0。该位常记为THRE。

 $ D_{4} $：为线路间断（break）标志。在接收数据过程中，若出现结构错、奇偶校验错、越限或在一个完整的字符传送时间周期里收到的均为空闲状态，则此位置1，表示线路信号间断，这时接收的数据可能不正常。该位常记为BI。

 $ D_{3} $：结构错标志。当接收到的数据停止位个数不正确时，此位置1。该位常记为FE。

D $ _{2} $：奇偶校验错标志。在对接收字符进行奇偶校验时，若发现其值与规定的奇偶校验不同，则此位为1，表示数据可能出错。该位常记为PE。

D $ _{1} $：越限状态标志。接收数据寄存器中的前一个数据还未被CPU读取，而下一个数据

已经到来，产生数据重叠出错时，此位为1。该位常记为OE。

 $ D_{0} $：此位为1时表示8250已接收到一个有效的字符并将它放在接收数据缓冲器中，CPU可以从8250的接收数据寄存器中读取。一旦读取后，此位自动清0。如果 $ D_{0}=1 $时8250有接收到一个新数据，就会冲掉前一个未取走的数据，8250将产生一个重叠错误。该位常记为DR。

当读入时，各数据位等于1有效，读入操作后各位均复位。除 $ D_{6} $位外，其他各位还可被CPU写入，同样可以产生中断请求。

当要发送一个数据时，必须先读 LSR 并检其  $ D_{0} $ 位，若为 1，则表示发送数据缓冲器空，可以接收 CPU 新送来的数据。数据输入到 8250 后，LSR 的  $ D_{5} $ 位将自动清 0，表示缓冲器已满，该状态一直持续到数据发送完毕、发送数据缓冲器变空为止。

LSR 也可以用来检测任一接收数据错或接收间断错。如果对应位中有一个是 1，就表示接收数据缓冲器的内容无效。注意，一旦读过 LSR 的内容，则 8250 中所有错误位都将自动复位。

## 8. modem 控制寄存器（MCR，口地址 3FCH）

modem 控制寄存器(MCR)用于设置联络线，以控制与调制解调器或数传机的接口信号。其中，高 3 位恒为 0，低 5 位含义如图 8-34 所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-34 modem 控制寄存器各位的含义</div> </div>

 $ D_{4} $：用于“本地环”检测控制。 $ D_{4} $ 通常置为 0，当  $ D_{4}=0 $ 时，8250 正常工作。当  $ D_{4}=1 $ 时，则 8250 串行输出被回送。此时，SOUT 为高电平状态，SIN 将与外设分离，TSR 的数据由 8250 内部直接回送到 RSR 的输入端，形成“本地环”；同时，CTS、DSR、RI 和 RLSD 与外设相应线断开，而在 8250 内部分别与  $ \overline{RTS} $、 $ \overline{DTR} $、 $ \overline{OUT_{1}} $ 和  $ \overline{OUT_{2}} $ 连接，实现数据在 8250 芯片内部的自发自收，实现 8250 自检。利用这个特点，可以编程测试 8250 工作是否正常。从环回测试转到正常工作状态，必须对 8250 重新初始化。

 $ D_{3} $、 $ D_{2} $：是用户指定的输入与输出。当它们为1时，对应的OUT端输出为0；而当它们为0时，对应的OUT端输出为1。 $ D_{2}(\overline{OUT}_{1}) $是用户指定的输出，这里不用； $ D_{3}(\overline{OUT}_{2}) $是用户指定的输入，为了把8250产生的中断信号经系统总线送到中断控制器的 $ IRQ_{4} $上，此位须置1。

 $ D_{1} $：当  $ D_{1}=1 $ 时，8250 的 RTS 输出为低电平，表示 8250 准备发送数据。

 $ D_{0} $：当  $ D_{0}=1 $ 时，使8250的DTR输出为低电平，表示8250准备接收数据。

## 9. modem 状态寄存器（MSR，口地址 3FEH）

modem 状态寄存器(MSR)主要用于在有 modem 的系统中了解 modem 控制线的当前

状态，提供低4位记录输入信号变化的状态信息。当CPU读取MSR时把这些位清0。若CPU读取MSR后输入信号发生了变化，则将对应的位置1，各数据等于1为有效；高4位以相反的形式记录对应的输入引脚的电平。MSR各位含义如图8-35所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-35 modem 状态寄存器各位的含义</div> </div>

8250 在发送和接收数据时，各功能寄存器相互配合工作。其数据发送与接收工作过程分述如下。

### 1）发送数据过程

8250 的发送器由发送数据保持寄存器（THR）、发送移位寄存器（TSR）和发送控制逻辑（TCL）组成，TSR 是一个并入串出的移位寄存器，THR 空和 TSR 空由通信线路状态寄存器（LSR）中 THRE、TSRE（或 TEMT）两个位标识。在 THR 空出时，THRE=1，CPU 把要发送的数据写入 THR，清除 TSRE（或 TEMT）标志。当 TSR 中的数据发送完毕，TSRE（或 TEMT）=1，这时 TCL 会把 THR 中的数据自动转移到 TSR 中，并清除 TSRE（或 TEMT）标志，同时使标志 THRE=1。然后，发送时钟驱动 TSR，将数据按顺序一位接一位地移出，从 SOUT 端发送出去。发送时钟频率取决于波特率寄存器。起始位、奇偶校验位和停止位是自动插入发送信号的位序列中的，用户可通过 LCR 设定其具体格式。

#### 2）数据接收过程

8250 的接收器由接收数据缓冲寄存器（RBR）、接收移位寄存器（RSR）和接收控制逻辑（RCL）组成，RSR 是一个串入并出的移位寄存器。外部通信设备的串行数据线接至 SIN 端，线路空闲时为高电平，当起始位检测电路监测到线路上外设发送来的起始位时，计数器复位确认同步，在接收时钟 RSLK 驱动下，线路串行数据逐位进入 RSR。当确定接收到一个完整的数据后，RSR 会自动将数据送到 RBR，在 LSR 中建立 DR 接收数据就绪标志，这时若中断允许寄存器 IER 的  $ D_{0}=1 $，允许 RBR 满中断，则 DR（IER 的  $ D_{0}=1 $ 时将触发中断。

### 8.4.5 8250 通信编程

对 8250 编制通信软件时，首先应对该芯片初始化，然后按程序查询或中断方式实现通信。

## 1. 8250 初始化

8250 的初始化需完成以下工作。

### （1）设置波特率。

例如，设波特率为9600，则波特率因子N=12。

MOV DX, 3FBH
MO AL, 80H
OUT DX, AL
MOV DX, 3F8H
MOV AL, 12
OUT DX, AL
INC DX
MOV AL, 0
OUT DX, AL
;设置波特率
;3F9H送0

（2）设置串行通信数据格式。

例如，数据格式为8位，1位停止位，奇校验。

MOV AL, 0BH
MOV DX, 3FBH
OUT DX, AL

（3）设置工作方式。

无中断方式设置如下。

MOV AL, 3 ;  $ \overline{OUT}_{1} $、 $ \overline{OUT}_{2} $ 均为 1
MOV DX, 3FCH
OUT DX, AL

有中断方式设置如下。

MOV AL, 0BH ; OUT2=0, 允许 INTRT 去申请中断
MOV DX, 3FCH
OUT DX, AL

循环测试方式设置如下。

MOV AL, 13H
MOV DX, 3FCH
OUT DX, AL

## 2. 程序查询方式通信编程

采用程序查询方式工作时，CPU可以通过读线路状态寄存器（3FDH）查询相应状态位（ $ D_{0} $ 与  $ D_{5} $ 位），检查接收数据寄存器是否就绪（ $ D_{0}=1 $）与发送保持器是否空（ $ D_{5}=1 $）。

（1）发送程序如下。

TR: MOV DX, 3FDH
IN AL, DX
TEST AL, 20H
JZ TR
MOV AL, [SI]
MOV DX, 3F8H
OUT DX, AL

（2）接收程序如下。

RE: MOV DX, 3FDH
IN AL, DX
TEST AL, 1
JZ RE
MOV DX, 3F8H
IN AL, DX
MOV [DI], AL ;读入数据存入[DI]中
