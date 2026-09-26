# 3. 用中断方式编程

> 来源：docs/08_电子书/计算机硬件技术基础（第4版）-李继灿.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：0c93d8c7280859f1


在 IBM PC 中使用 8250 中断方式进行通信编程要完成以下几个步骤。

（1）对8259A中断控制器进行初始化，允许中断优先级4。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>MOV AL, 13H</td><td style='text-align: center; word-wrap: break-word;'>;单片使用,需要  $ ICW_{4} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV DX, 20H</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT DX, AL</td><td style='text-align: center; word-wrap: break-word;'>;设置  $ ICW_{1} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AL, 8</td><td style='text-align: center; word-wrap: break-word;'>;中断类号为 08H～0FH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>INC DX</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT DX, AL</td><td style='text-align: center; word-wrap: break-word;'>;设置  $ ICW_{2} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>INC AL</td><td style='text-align: center; word-wrap: break-word;'>;缓冲方式,8086/8088</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT DX, AL</td><td style='text-align: center; word-wrap: break-word;'>;设置  $ ICW_{4} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV AL, 8CH</td><td style='text-align: center; word-wrap: break-word;'>;允许 0、1、4、5、6 级中断</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT DX, AL</td><td style='text-align: center; word-wrap: break-word;'>;送中断屏蔽字  $ OCW_{1} $</td></tr></table>

（2）设置中断向量 $ IR_{4} $

对于  $ \mathrm{IR}_{4} $，中断类型号为  $ 0\mathrm{CH}, 0\mathrm{CH} \times 4 = 30\mathrm{H} $。因此，应在 30H、31H 存放 IP 值，32H、33H 存放 CS 值。

设中断服务程序入口地址为2000:100。

XOR AX, AX
MOV DS, AX
MOV AX, 100H
MOV WORD PTR[0030H], AX ;送100H到00030H、00031H内存单元中
MOV AX, 2000H
MOV WORD PTR[0032H], AX ;送2000H到00032H、00033H内存单元中

（3）对8250送中断允许寄存器（3F9H）设置允许/屏蔽位。例如，允许发送与接收中断请求。

MOV AL, 3
MOV DX, 3F9H
OUT DX, AL

（4）发EOI命令，中断结束。

在中断结束返回时，需要对8259A发EOI命令，保证8250可以重新响应中断请求。

MOV AL, 20H
MOV DX, 20H

## 8.5 数/模与模/数转换接口芯片

数字电子计算机只能识别与加工处理数字量，而在实际的计算机应用系统中，除了数字量以外，还必然涉及模拟量。若要把模拟量（如生产现场的温度、压力、流量、转速等参数）输入计算机，则必须先通过各种传感器将非电量变换为电量（电压或电流），并且加以放大，使之达到某一标准电压值，然后经过模/数（analog to digit，A/D）转换，变为数字量才能输入计算机进行存储、运算等操作；反之，若计算机的监控对象是模拟量，则必须先把计算机输出的数字量经过数/模（digit to analog，D/A）转换，变成电压或电流模拟信号，才能控制模拟量。通常，在一个微型计算机的应用系统中，可能既需要D/A转换，又需要A/D转换。实现D/A或A/D转换的部件称为D/A或A/D转换器。

常用的 D/A 转换器有 8 位的 DAC 0832 和 12 位的 DAC 1210 等芯片；A/D 转换器有 8 位的 ADC 0809、ADC 0804、AD 570，还有 12 位高精度、高速的 AD 574、AD 578、AD 1210，以及 16 位的 AD 1140 等芯片。

本节将选取常用的 DAC 0832 以及 ADC 0809 为例，介绍模拟量的转换接口技术。

### 8.5.1 DAC 0832 数/模转换器

DAC 0832 是一个 8 位的电流输出型 D/A 转换器，内部包含有 T 型电阻网络，输出为差动电流信号。当需要输出模拟电压时，应外接运算放大器。

## 1. DAC 0832 的引脚功能与内部结构

1）DAC 0832 的引脚功能

DAC 0832 的外部引脚如图 8-36 所示。共有 20 条引脚，各引脚功能如下。 $ D_{7} \sim D_{0} $：8 位输入数据线。

CS：片选信号，低电平有效。

WR_{1}：输入寄存器的写入控制，低电平有效。

 $ \overline{WR}_{2} $：数据变换（DAC）寄存器写入控制，低电平有效。

ILE：输入锁存允许（输入锁存器选通命令），它与 $ \overline{CS} $、 $ \overline{WR} $信号一起用于把要转换的数据写入输入锁存器。

XFER：传送控制信号，低电平有效。它与 $ WR_{2} $一起允许把输入锁存器的数据传送到DAC寄存器。

 $ I_{OUT1} $：模拟电流输出端，当DAC寄存器中内容为

<div style="text-align: center;"><div style="text-align: center;">图 8-36 DAC 0832 的外部引脚</div> </div>

FFH 时， $ I_{OUT1} $ 电流最大；当 DAC 寄存器中内容为 00H 时， $ I_{OUT1} $ 电流最小。

 $ I_{OUT2} $：模拟电流输出端。DAC 0832 为差动电流输出，接运放的输入，一般情况下  $ I_{OUT1} + I_{OUT2} = $ 常数。

 $ V_{REF} $：参考电压， $ -10V\sim+10V $，一般为 $ +5V $或 $ +10V $。

 $ R_{fb} $：内部反馈电阻引脚，接运算放大器的输出端。

AGND、DGND：模拟地、数字地。

### 2）DAC 0832 的内部结构

DAC 0832 的内部结构如图 8-37 所示。0832 内部有两级锁存器，第一级锁存器是一个 8 位输入寄存器，由锁存控制信号 ILE 控制（高电平有效）。当 ILE=1， $ \overline{CS}=\overline{WR}_{1}=0 $（由 OUT 指令产生）时， $ \overline{LE}_{1}=1 $，输入寄存器的输出随输入而变化。接着， $ \overline{WR}_{1} $ 由低电平变为高电平时， $ \overline{LE}_{1}=0 $，则数据被锁存到输入寄存器，其输出端不再随外部数据而变。第二级锁存器是一个 8 位 DAC 寄存器，它的锁存控制信号为  $ \overline{X_{FER}} $，当  $ \overline{X_{FER}}=\overline{WR}_{2}=0 $（由 OUT 指令产生）时， $ \overline{LE}_{2}=1 $，这时 8 位 DAC 输出随输入而变，接着， $ \overline{WR}_{2} $ 由低电平变高电平， $ \overline{LE}_{2}=0 $，于是输入寄存器的信息被锁存到 DAC 寄存器中。同时，转换器开始工作， $ I_{OUT1} $ 和  $ I_{OUT2} $ 端输出电流。

<div style="text-align: center;"><div style="text-align: center;">图 8-37 DAC 0832 内部结构示意图</div> </div>

## 2. DAC 0832 的工作时序

DAC 0832 的工作时序如图 8-38 所示。由图可知，D/A 转换可分为两个阶段：当  $ \overline{CS}=0 $

 $ \overline{WR}_{1}=0 $、ILE=1时，使输入数据先传送到输入寄存器；当 $ \overline{WR}_{2}=0 $、 $ \overline{XFER}=0 $时，数据传送到DAC寄存器，并开始转换。待转换结束，0832将输出一个模拟信号。

## 3. DAC 0832 的工作方式

DAC 0832 的内部有两级锁存器：第一级是 0832 的 8 位数据输入寄存器，第二级是 8 位的 DAC 寄存器。根据这两个寄存器使用的方法不

<div style="text-align: center;"><div style="text-align: center;">图 8-38 DAC 0832 的工作时序</div> </div>

同，可将 DAC 0832 分为 3 种工作方式。

### 1）单缓冲方式

单缓冲方式下，使输入寄存器或DAC寄存器二者之一处于直通，这时，CPU只需一次写入DAC 0832即开始转换。其控制比较简单。

采用单缓冲方式时，通常是将 $ \mathrm{WR}_{2} $和XFER接地，使DAC寄存器处于直通方式，另外把ILE接+5V， $ \overline{\mathrm{CS}} $接端口地址译码信号， $ \overline{\mathrm{WR}}_{1} $接系统总线的 $ \overline{\mathrm{IOW}} $信号，这样，当CPU执行一条OUT指令时，选中该端口，使 $ \overline{\mathrm{CS}} $和 $ \overline{\mathrm{WR}}_{1} $有效便可以启动D/A转换。

#### 2）双缓冲方式（标准方式）

双缓冲方式下，转换要有两个步骤：①当CS=0、WR_{1}=0、ILE=1时，输入寄存器输出随输入而变， $ \overline{WR}_{1} $ 由低电平变高电平时，将数据锁入8位数据寄存器；②当 $ \overline{XFER}=0 $、 $ \overline{WR}_{2}=0 $时，DAC寄存器输出随输入而变，而在 $ \overline{WR}_{2} $ 由低电平变高电平时，将输入寄存器的内容锁入DAC寄存器，并实现D/A转换。

双缓冲方式的优点是数据接收和 D/A 启动转换可以异步进行，即在 D/A 转换的同时，可以接收下一个数据，提高了 D/A 转换的速率。此外，它还可以实现多个 DAC 同步转换输出——分时写入、同步转换。

##### 3）直通方式

直通方式下，使内部的两个寄存器都处于直通状态，此时，模拟输出始终跟随输入变化。由于这种方式不能直接将0832与CPU的数据总线相连接，需外加并行接口，如74LS373、8255等，故这种方式在实际应用中很少采用。

##### 【例 8-6】双缓冲方式的同步转换示例。

假设图 8-39 系统中有两个 DAC 0832 按双缓冲方式工作，其 3 个端口地址的用途是：PORT $ _{1} $ 选择 0832-1 的输入寄存器；PORT $ _{2} $ 选择 0832-2 的输入寄存器；PORT $ _{3} $ 选择 0832-1 和 0832-2 的 DAC 寄存器。

此例双缓冲方式的程序段如下。

MOV AL, DATA₁ ;要转换的数据送 AL
MOV DX, PORT₁ ;0832-1 的输入寄存器地址送 DX
OUT DX, AL ;数据送 0832-1 的输入寄存器
MOV AL, DATA₂
MOV DX, PORT₂ ;0832-2 输入寄存器地址送 DX
OUT DX, AL ;数据送 0832-2 的输入寄存器
MOV DX, PORT₃ ;DAC 寄存器端口地址送 DX
OUT DX, AL ;DATA₁ 与 DATA₂ 数据分别送两个 DAC 寄存器，并同时启动实现同步转换
HLT

## 4. D/A 转换器的应用

由于 D/A 转换器能够将一定规律的数字量转换为相应比例的模拟量，因此，常将它用作函数发生器，即只要往 D/A 转换器写入按规律变化的数据，即可在输出端获得三角波、锯齿波、方波、阶梯波、梯形波、正弦波等函数波形。现以 DAC 0832 为例说明如下。

【例 8-7】试编写利用 DAC 0832 产生一个正向锯齿波电压的程序，周期任意，

<div style="text-align: center;"><div style="text-align: center;">图 8-39 DAC 0832 双缓冲方式示例</div> </div>

DAC 0832工作在单缓冲方式，端口地址为 PORT_A。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="5">NEXT:</td><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DX, PORT $ _{A} $</td><td style='text-align: center; word-wrap: break-word;'>;DAC 0832 端口地址号送 DX</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, OFFH</td><td style='text-align: center; word-wrap: break-word;'>;设转换初值</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>INC</td><td style='text-align: center; word-wrap: break-word;'>AL</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>DX, AL</td><td style='text-align: center; word-wrap: break-word;'>;往 DAC 0832 输出数据</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JMP</td><td style='text-align: center; word-wrap: break-word;'>NEXT</td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

【例 8-8】试编写一段程序，要求利用 DAC 0832 产生一个可以通过延时子程序 DELAY 控制锯齿波周期的电压。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>DX, PORT $ _{{A}} $</td><td style='text-align: center; word-wrap: break-word;'>; PORT $ _{{A}} $ 为 DAC 0832 端口地址号</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, OFFH</td><td style='text-align: center; word-wrap: break-word;'>; 设转换初值</td></tr><tr><td rowspan="5">NEXT:</td><td style='text-align: center; word-wrap: break-word;'>INC</td><td style='text-align: center; word-wrap: break-word;'>AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>DX, AL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CALL</td><td style='text-align: center; word-wrap: break-word;'>DELAY</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JMP</td><td style='text-align: center; word-wrap: break-word;'>NEXT</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>CX, DATA</td></tr><tr><td rowspan="2">DELAY:</td><td style='text-align: center; word-wrap: break-word;'>LOOP</td><td style='text-align: center; word-wrap: break-word;'>DELAY</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>RET</td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

【例 8-9】试编写一段程序，利用 DAC 0832 产生一个三角波电压，波形下限的电压为 0.5V，上限的电压为 2.5V。

由于8位的DAC 0832在5V电压时对应的数字量为256，故每一个最低有效位对应的电压为： $ 1LSB=5V/256=0.019V $。

下限电压对应的数据为：0.5V/0.019V=26=1AH。

上限电压对应的数据为：2.5V/0.019V=131=83H。

程序段如下。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>BEGIN:</td><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL,</td><td style='text-align: center; word-wrap: break-word;'>1AH</td><td style='text-align: center; word-wrap: break-word;'>;下限值</td></tr><tr><td rowspan="5">UP:</td><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>PORT,</td><td rowspan="2">AL</td><td style='text-align: center; word-wrap: break-word;'>;D/A转换</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>INC</td><td style='text-align: center; word-wrap: break-word;'>AL</td><td style='text-align: center; word-wrap: break-word;'>;数值增1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CMP</td><td style='text-align: center; word-wrap: break-word;'>AL,</td><td rowspan="3">84H</td><td style='text-align: center; word-wrap: break-word;'>;超过上限否</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JNZ</td><td style='text-align: center; word-wrap: break-word;'>UP</td><td style='text-align: center; word-wrap: break-word;'>;若未超过上限，则继续转换</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DEC</td><td style='text-align: center; word-wrap: break-word;'>AL</td><td style='text-align: center; word-wrap: break-word;'>;若已超过上限，则数值减量</td></tr><tr><td rowspan="5">DOWN:</td><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>PORT,</td><td rowspan="2">AL</td><td style='text-align: center; word-wrap: break-word;'>;D/A转换</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>DEC</td><td style='text-align: center; word-wrap: break-word;'>AL</td><td style='text-align: center; word-wrap: break-word;'>;数值减1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>CMP</td><td style='text-align: center; word-wrap: break-word;'>AL,</td><td rowspan="3">19H</td><td style='text-align: center; word-wrap: break-word;'>;低于下限否</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JNZ</td><td style='text-align: center; word-wrap: break-word;'>DOWN</td><td style='text-align: center; word-wrap: break-word;'>;若没有低于下限，则继续转换</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>JMP</td><td style='text-align: center; word-wrap: break-word;'>BEGIN</td><td style='text-align: center; word-wrap: break-word;'>;若低于下限，则转下一个周期</td></tr></table>

参照以上示例，可以利用 D/A 转换器产生各种波形。例如，产生方波时，只需要向 DAC 0832 交替输出两个不同大小的数字量，控制每个数字量保持的时间，即可得到所需占空比的方波波形。又如，产生正弦波时，只需根据正弦函数在程序中给出一个周期的正弦波对应的数字量表（如32个数据或37个数据），然后顺序将表中各值送至DAC 0832，即可产生正弦波的波形。

在调速系统和位置伺服控制系统中，常用 D/A 转换器输出来控制直流电动机的转速。此外，D/A 转换器在电子测量中也得到了广泛的应用，它可用来作为程控电源、可控增益放大器和峰值保持器等。高速 D/A 转换器还用于高分辨率彩色图形接口中。

### 8.5.2 ADC 0809 模/数转换器

ADC 0809 是一个基于逐位逼近型原理的 8 位单片 A/D 转换器。片内含有 8 路模拟输入通道，其转换时间为  $ 100\mu s $，并且内置有三态输出缓冲器，可直接与系统总线相连。

### 1) ADC 0809 的引脚功能

ADC 0809 的外部引脚如图 8-40 所示。共有 28 条引脚，各引脚功能如下。 $ D_{7} \sim D_{0} $：输出数据线（三态）。

 $ IN_{7}\sim IN_{0} $: 8通道模拟电压输入端，可连接8路模拟量输入。

ADDA、ADDB、ADDC：通道地址选择，用于选择8路中的一路输入。ADDA为最低位（LSB），ADDC为最高位，这3个引脚上所加电平的编码为000～111，分别对应于选通通道 $ IN_{0} $～ $ IN_{7} $。

ALE: 通道地址锁存信号，用于锁存 ADDA、ADDB、ADDC 端的地址输入，上升沿有效。

START: 启动转换信号输入端，下降沿有效。在启动信号的下降沿，启动变换。

<div style="text-align: center;"><div style="text-align: center;">图 8-40 ADC 0809 外部引脚图</div> </div>

EOC：转换结束状态信号。平时为高电平，当其正在转换时为低电平，转换结束时，又变为高电平。此信号可用于查询或作为中断申请。

OE：输出（读）允许（打开输出三态门）信号，高电平有效。在其有效期间，即打开输出缓冲器三态门，CPU将转换后的数字量读入。

CLK：时钟输入（外接时钟频率为  $ 10\text{kHz} \sim 1.2\text{MHz} $）。ADC 0809 典型的时钟频率为  $ 640\text{kHz} $，转换时间是  $ 100\mu\text{s} $。

VREF $ (+) $、VREF $ (-) $：基准参考电压输入端。通常将 VREF $ (-) $ 接模拟地，参考电压从 VREF $ (+) $ 接入。

#### 2）ADC 0809 的内部结构

ADC 0809 的内部结构如图 8-41 所示，它由以下 3 部分组成。

<div style="text-align: center;"><div style="text-align: center;">图 8-41 ADC 0809 的内部结构框图</div> </div>

##### （1）模拟输入选择部分。

模拟输入选择部分包括一个8路模拟开关和地址锁存与译码电路。输入的3位通道地址信号由锁存器锁存，经译码电路译码后控制模拟开关选择相应的模拟输入。地址译码后控制选择的通道地址与对应的模拟输入通道的关系如表8-5所示。

<div style="text-align: center;"><div style="text-align: center;">表 8-5 通道地址与对应的模拟输入通道的关系</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>对应模拟输入通道</td><td style='text-align: center; word-wrap: break-word;'>ADDC</td><td style='text-align: center; word-wrap: break-word;'>ADDB</td><td style='text-align: center; word-wrap: break-word;'>ADDA</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ IN_0 $</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ IN_1 $</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ IN_2 $</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ IN_3 $</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ IN_4 $</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ IN_5 $</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ IN_6 $</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ IN_7 $</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td></tr></table>

（2）转换器部分。

转换器部分主要包括比较器、8位D/A转换器、逐次逼近数码寄存器以及控制逻辑电路等。

（3）输出部分。

输出部分包括一个8位三态输出锁存器。

## 2. ADC 0809 的工作时序

ADC 0809 的工作时序如图 8-42 所示。外部时钟信号通过 CLK 端进入其内部控制逻辑电路，作为转换时的时间基准。由时序图可以看出 ADC 0809 的工作过程如下。

<div style="text-align: center;"><div style="text-align: center;">图 8-42 ADC 0809 的工作时序</div> </div>

（1）由 CPU 首先把 3 位通道地址信号送到 ADDC、ADDB、ADDA 上，选择模拟输入。

（2）在通道地址信号有效期间，由 ALE 引脚上的一个脉冲上升沿信号，将输入的 3 位通道地址锁存到内部地址锁存器。

（3）START 引脚上的上升沿脉冲清除 ADC 寄存器的内容，被选通的输入信号在 START 的下降沿到来时就开始 A/D 转换。

（4）转换开始后，EOC引脚呈现低电平，一旦A/D转换结束，EOC又重新变为高电平表示转换结束。

（5）当 CPU 检测到 EOC 变为高电平后，则执行指令输出一个正脉冲到 OE 端，由它打开三态门，将转换的数据读取到 CPU。

### 1）模拟信号输入端 IN

模拟信号分别连接到  $ IN_{7} \sim IN_{0} $。当前若要转换哪一路，则通过 ADDC～ADDA 的不同编码来选择。

在单路输入时，模拟信号可固定连接到任何一个输入端，相应地，地址线 ADDA～ADDC 将根据输入线编号固定连接（高电平或低电平）。如输入端为 IN，则 ADDC 接高电平，ADDB 与 ADDA 均接低电平。

在多路输入时，模拟信号按顺序分别连接到输入端，要转换哪一路输入，就将其编号送到地址线上（动态选择）。

#### 2）地址线 ADDA、ADDB、ADDC 的连接

多路输入时，地址线不能固定连接，而是要通过一个接口芯片与数据总线连接。接口芯片可以选用锁存器74LS273和74LS373等（要占用一个I/O地址），或选用可编程并行接口8255（要占用4个I/O地址）。ADC 0809内部有地址锁存器，CPU可通过接口芯片用一条OUT指令把通道地址编码送给0809。地址线ADDA、ADDB、ADDC的连接方法如图8-43所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-43 ADC 0809 地址线的连接</div> </div>

##### 3）数据输出线 $ D_{7} $～ $ D_{0} $的连接

ADC 0809 内部已有三态门，故可直接连到 DB 上；另外，也可通过一个输入接口与 DB 相连。这两种方法均需占用一个 I/O 地址。ADC 0809 数据输出线的连接如图 8-44 所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-44 ADC 0809 数据输出线的连接</div> </div>

##### 4）地址锁存 ALE 和启动转换 START 信号的连接

地址锁存 ALE 和启动转换 START 信号线有以下两种连接方法：①独立连接，用两个信号分别进行控制，这时需占用两个 I/O 端口或两个 I/O 线（用 8255 时）；②统一连接，由于 ALE 是上升沿有效，而 START 是下降沿有效，所以 ADC 0809 通常可采用脉冲启动方式，将 START 和 ALE 连接在一起作为一个端口看待，先用一个脉冲信号的上升沿进行地址锁存，再用下降沿实现启动转换，这时只需占用一个 I/O 端口或一条 I/O 线（用 8255 时），其连接方法如图 8-45 所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-45 ALE 和 START 信号的连接方法</div> </div>

##### 5）转换结束 EOC 端的连接

判断一次 A/D 转换是否结束有以下几种方式。

（1）延时方式：采用软件延时等待（如延时1ms）时，要预先精确地知道完成一次A/D转换所需要的时间，这样，在CPU发出启动命令后，执行一个固定的延迟程序，使延时时间 $ \geq $A/D转换时间。当延时时间一到，A/D转换也正好结束，则CPU读取转换的数据。这种

方式不用 EOC 信号，实时性较差，CPU 的效率最低。

（2）软件查询方式：把 0809 的 EOC 端通过一个三态门连到数据总线的  $ D_{0} $（也可连到其他数据线），三态门要占用一个 I/O 端口地址。在 A/D 转换过程中，CPU 通过程序不断查询 EOC 端的状态，当读到其状态为 1 时，则表示一次转换结束，于是 CPU 用输入指令读取转换数据。这种方式的实时性也较差。

（3）CPU 等待方式：这种方式利用 CPU 的 READY 引脚功能，设法在 A/D 转换期间使 READY 处于低电平，以使 CPU 停止工作，而在转换结束时，则使 READY 成为高电平，CPU 读取转换数据。

（4）中断方式：用中断方式时，把转换结束信号（ADC 0809 的 EOC 端）作为中断请求信号接到中断控制器 8259A 的中断请求输入端 IR，当 EOC 端由低电平变为高电平时（转换结束），即产生中断请求。CPU 在收到该中断请求信号后，读取转换结果。这种方式由于避免了占用 CPU 运行软件延时等待或查询时间，故 CPU 效率最高。

## 4. ADC 0809 的一个连接实例

【例 8-10】ADC 0809 与系统的一个连接实例如图 8-46 所示。用延时等待的方法，检

<div style="text-align: center;"><div style="text-align: center;">图 8-46 ADC 0809 的连接实例</div> </div>

测 ADC 0809 转换结束的程序如下。

<div style="text-align: center;"><div style="text-align: center;">【例 8-11】用查询 EOC 状态的方法，检测 ADC 0809 转换是否结束。</div> </div>

图 8-47 是一个用 8255A 控制 ADC 0809 完成数据采集的系统方案设计图，它能方便地将 ADC 接口到 8086 的系统总线，并采用查询法检测转换结束标志。

图8-47中，将ADC 0809的数据线 $ D_{7}\sim D_{0} $接到8255A的A口，而将ADC的EOC端接8255A的PC，用来检测ADC 0809是否转换结束。ADC的OE端接PB，以保证当PB=1时将转换后的数字信号送上数据线 $ D_{7}\sim D_{0} $并读入CPU。START和ALE与PB

<div style="text-align: center;"><div style="text-align: center;">图 8-47 用 8255A 控制 ADC 0809 数据采集系统方案设计图</div> </div>

相连，由 CPU 控制 PB $ _{3} $ 发通道号锁存信号 ALE 和启动信号 START，PB $ _{2} $～PB $ _{0} $ 输出 3 位通道号地址信号 ADDC、ADDB、ADDA。EOC 输出信号和 PC $ _{7} $ 相连，CPU 通过查询 PC $ _{7} $ 的状态，控制数据的输入过程。在启动脉冲结束后，先要查到 EOC 为低电平，表示转换已开始，然后继续查询，当发现 EOC 变高，说明转换已结束。当转换结束时使 OE 也变高，将 ADC 的输出缓冲器打开，数据出现在 A 口上，可由 IN 指令读入 CPU。

假设 8255A 的端口地址为  $ 0FC0H \sim 0FC3H $。编程使 A、B、C 3 个端口均工作在方式 0，A 口作为输入口，输入转换后的结果；B 口作为输出口，用来输出通道地址、发出地址锁存信号和启动转换信号；C 口高 4 位作为输入口，用来读取转换状态，低 4 位没有使用。转换模拟量从  $ IN_0 $ 通道开始，然后采样下一个模拟通道  $ IN_1 $，如此循环，直至采样完  $ IN_7 $ 通道。采样后的数据存放在数据段中以 2000H 开始的数据区。

8 路模拟量的循环数据采集程序如下。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>WAIT:</td><td style='text-align: center; word-wrap: break-word;'>IN</td><td style='text-align: center; word-wrap: break-word;'>AL,</td><td style='text-align: center; word-wrap: break-word;'>DX</td><td style='text-align: center; word-wrap: break-word;'>; 200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000</td></tr></table>

## 本章小结

本章首先介绍 I/O 接口的分类和功能，这些是学习接口及接口技术的基础。然后，分别对计数器/定时器 8253-5、并行通信接口 8255A、串行异步通信接口 8250 以及 DAC 0832 与 ADC 0809 模拟量转换接口等常用的接口芯片进行了详细的讨论。这些接口芯片共同的特点是可编程，即通过编程可以改变它们的工作方式与工作参数，以适应不同的应用场合。

虽然在微机系统中已广泛地采用了新型的标准接口技术，但是，在设计一般检测与控制系统时，仍需要使用具有单一功能的可编程接口芯片。同时，掌握这些可编程接口芯片的初始化编程与一般应用编程技术，对于从事信息化技术工作的专业人员也是一个必要的基础训练。

## 习题8

8-1 按照接口电路和设备的复杂程度，I/O 接口的硬件可分为哪几类？试举例说明。

8-2 接口的主要功能有哪些？一般靠什么实现功能转换？

8-3 可编程计数器/定时器 8253 有哪几种工作方式？试简述其工作原理。

8-4 可编程计数器/定时器 8253 选用二进制与十进制计数的区别是什么？每种计数

方式的最大计数值分别为多少？

8-5 若已有一个频率发生器，其频率为  $ 1\mathrm{MHz} $，如果要求通过 8253 芯片产生每秒一次的信号，那么 8253 芯片应如何连接？假设控制口的地址为  $ 203\mathrm{H} $，试编写初始化程序。

8-6 在某微机系统中，8253 的 3 个计数器的端口地址分别为 60H、61H 和 62H，控制字寄存器的端口地址为 63H，要求 8253 的通道 0 工作于方式 3，并已知对它写入的计数初值 n=1234H，试编写初始化程序。

8-7 假定有一片 8253 接在系统中，其端口地址分配如下：0# 计数器为 220H，1# 计数器为 221H，2# 计数器为 222H，而控制口为 223H。

（1）利用  $ 0\# $ 计数器高 8 位计数，计数值为 256，二进制方式，选用方式 3 工作，试编写初始化程序。

（2）利用1#计数器高、低8位计数，计数值为1000，BCD计数，选用方式2工作，试编写初始化程序。

8-8 在某个 8086 微机系统中使用了一块 8253 芯片，所用的时钟频率为 1MHz，其中端口地址分配如下：0# 计数器为 220H，1# 计数器为 221H，2# 计数器为 222H，而控制口为 223H。

（1）要求通道0工作于方式3，输出频率为 $ 2\mathrm{kHz} $的方波，试编写初始化程序。

（2）要求通道2用硬件方式触发，输出单脉冲，时间常数为26，试编写初始化程序。

8-9 设计数器/定时器 8253 在微机系统中的端口地址分配如下：0# 计数器为 340H，1# 计数器为 341H，2# 计数器为 342H，而控制口为 343H。

设已有信号源频率为  $ 1 \, MHz $，现要求用一片 8253 定时 1 秒，试编写初始化程序。

8-10 试说明 8255A 的 A 口、B 口和 C 口一般在使用上有什么区别。

8-11 当 8255A 的  $ PC_{7} \sim PC_{4} $ 全部为输出线时，这时 8255A 的 A 口是什么工作方式？

8-12 当 8255A 工作于方式 1 时，CPU 如何以中断方式将输入设备的数据读入？

8-13 比较 8255A 的 3 种工作方式的应用场合有何区别。

8-14 8255A 在复位(RESET)有效后，各端口均处于什么状态？为什么这样设计？

8-15 在一个微机系统中，用 8255A 芯片作为数据传送接口，并规定使用 I/O 地址的最低两位作为芯片内部寻址，已知芯片 A 口地址为 0A4H，当 CPU 执行输出指令访问 0A7H 端口时，CPU 将执行什么操作？

8-16 如果需要 8255A 的  $ PC_{3} $ 输出连续方波，如何用 C 口的置位与复位控制命令字编程实现？

8-17 假定 8255A 的端口地址为 0040H～0043H，试编写下列情况的初始化程序：A 组设置为方式 1，且端口 A 作为输入，PC $ _{5} $ 和 PC $ _{6} $ 作为输出；B 组设置为方式 1，且端口 B 作为输入。

8-18 编写一个初始化程序，使 8255A 的  $ PC_{7} $ 端输出一个负跳变。如果要求从  $ PC_{5} $ 端输入一个负脉冲，那么初始化程序应该进行哪些修改？

8-19 设 8250 串行接口芯片外部的时钟频率为 1.8432 MHz。

（1）8250工作的波特率为19200，计算出波特因子的高8位、低8位分别是多少。

（2）设线路控制寄存器高8位、低8位波特因子寄存器的端口地址分别为3FBH、3F8H，试编写初始化波特因子的程序段。

8-20 如何用程序查询方式实现串行通信？在查询式串行通信方式中，8250引脚 $ OUT_{1} $和 $ OUT_{2} $如何设置？

8-21 在串行通信中，设异步传送的波特率为 4800，每个数据占 10 位，传输 2KB 的数据需要多少时间？

8-22 A/D 和 D/A 转换器在微机应用中起什么作用？

8-23 ADC 中的转换结束信号(EOC)起什么作用？

8-24 如果 0809 与微机接口采用中断方式，那么 EOC 应该如何与微处理器连接？程序又应该进行什么改进？

8-25 DAC 0832 有哪几种工作方式？每种工作方式适用于什么场合？每种方式是用什么方法产生的？

### 【学习目标】

本章介绍现代主流微型计算机硬件技术的发展，包括超线程技术、多核技术、主板芯片组的技术和扩展总线技术等。最后简要介绍了计算机硬件新技术的重要发展及未来趋势。

#### 【学习要求】

理解先进微处理器的新技术特点。

理解主板芯片组的技术发展。

了解总线更新换代的背景与基本过程。

## 9.1 CPU 新技术概述

由于微机应用日益扩大，现代 CPU 中逐渐融入了一些新技术，如超线程技术、64 位技术、多核技术以及扩展指令集等。这些新技术的应用，大幅提高了 CPU 的性能。

### 9.1.1 超线程技术

超线程(hyper-threading, HT)技术是Intel公司在2002年发布的一项新技术，并率先应用于Intel XERON处理器。

为了提高 CPU 的性能，通常的做法是提高 CPU 的时钟频率和增加缓存容量。随着 CPU 的频率越来越快，如果再通过提高 CPU 频率和增加缓存的方法来提高性能，往往会受到制造工艺上的限制以及成本过高的制约。因此，Intel 公司采用另一个思路去提高 CPU 的性能，让 CPU 可以同时执行多重线程，以便让 CPU 发挥更大效率，即所谓“超线程”技术。

超线程技术就是利用特殊的硬件指令，把多线程处理器内部的两个逻辑内核模拟成两个物理芯片，从而使单个处理器就能“享用”线程级并行计算，进而兼容多线程操作系统和软件，这样减少了CPU的闲置时间，提高了CPU的运行效率。

超线程技术带来的好处是可以使操作系统或者应用软件的多个线程，同时运行于一个

超线程处理器上，其内部的两个逻辑处理器共享一组处理器执行单元，并行完成加、乘等操作，使处理器芯片的性能得到提升。在第三代智能酷睿的 i3 和 i7 系列处理器（2012 年发布）上也可看到超线程技术。i3 系列处理器采用的是双核心四线程设计；而 i7 系列处理器则采用了四核心八线程或六核心十二线程设计。在使用带有超线程技术的处理器时，人们在系统中所能见到的核心数量其实是处理器的线程数。

需要注意的是，含有超线程技术的 CPU 需要芯片组、操作系统和应用软件的支持。Microsoft 公司的操作系统中 Windows XP 专业版、Windows Vista、Windows 7、Windows Server 2008 等均支持此功能；另外，一般来说，只要能够支持多处理器的应用软件均可支持超线程技术。

### 9.1.2 64 位技术

64 位技术是指 CPU 的 GPRs（general-purpose registers，通用寄存器）的数据宽度为 64 位，即处理器一次可以运行 64 位数据。64 位处理器早在精简指令集计算机上就已出现。现在的 64 位技术有了新的发展。

64 位计算主要有两个优点：一是扩大了整数运算的范围；二是支持更大的内存。要实现真正意义上的 64 位计算，仅有 64 位的处理器是不够的，还必须有 64 位的操作系统以及 64 位的应用软件支持才行，三者缺一不可，缺少其中任何一种要素都无法实现 64 位计算。CPU 使用的 64 位技术主要有 Intel 公司的 EM64T 技术和 AMD 公司的 AMD64 位技术。

## 1. EM64T 技术

EM64T(extended memory 64 technology)是Intel公司开发的64位内存扩展技术。它实际上是IA-32构架体系的扩展，即IA-32E(Intel architecture-32 extension)。Intel公司的IA-32处理器通过加入EM64T技术便可在兼容IA-32软件的情况下，允许软件程序利用更多的内存地址空间，并且允许程序进行32位线性地址写入。Intel公司的EM64T所强调的是32位技术与64位技术的兼容性，为采用EM64T的处理器增加了8个64位通用寄存器(R8～R15)，并将原有的32位通用寄存器全部扩展为64位，这样也提高了处理器的整数运算能力。另外增加的8个128位SEE寄存器(XMM8～XMM15)是为了增强多媒体性能，包括对SSE、SSE2和SSE3的支持。

Intel 公司为支持 EM64T 技术的处理器设计了两种模式：传统 IA-32 模式和 IA-32e 扩展模式。在支持 EM64T 技术的处理器内有一个称为 IA-32 扩展功能激活寄存器（IA-32 extended feature enable register，IA32_EFER）的部件，其中的第 10 位控制着 EM64T 是否激活。若 EM64T 被激活，处理器会运行在 IA-32e 扩展模式下。

## 2. AMD64 位技术

AMD 的 Athlon 64 系列处理器的 64 位技术，是在 x86 指令集基础上加入 x86-64 的 64 位扩展 x86 指令集，从而使得 Athlon 64 系列处理器可兼容原来的 32 位 x86 软件，同时支持 x86-64 的扩展 64 位计算，并具有 64 位寻址能力，使其成为真正的 64 位 x86 构架处

理器。

x86-64 新增的几组 CPU 寄存器将提供更快的执行效率。寄存器是 CPU 内部用来创建和储存 CPU 运算结果和其他运算结果的地方。标准的 32 位 x86 架构包括 8 个通用寄存器（GPR），AMD 在 x86-64 中又增加了 8 组通用寄存器，将寄存器的数目提高到 16 组。x86-64 寄存器默认位 64 位。还增加了 8 组 128 位 XMM 寄存器（又称 SSE 寄存器，XMM8～XMM15），将能给单指令多数据流技术（SIMD）运算提供更多的空间，这些 128 位的寄存器将提供在矢量和标量计算模式下，进行 128 位双精度处理，以及为实现 3D 建模、矢量分析和虚拟现实提供了硬件基础。通过提供更多的寄存器，按照 x86-64 标准生产的 CPU 可以更有效地处理数据，可以在一个时钟周期中传输更多的信息。IA-64 体系架构还在继续研发，并已应用到高端服务器领域。

### 9.1.3 “整合”技术

从2009年起，CPU领域最大的变化就是“整合”。整合GPU、整合内存控制器，直至完全整合了北桥。整合所带来的不仅仅是性能上的提升，同时也带来了平台功耗的进一步降低，可以说整合已经成为未来CPU的发展趋势。

AMD公司的Fusion计划就是整合技术的一部分。面对CPU性能过剩的共识，AMD公司在提高图形性能领域加强了竞争优势。APU(accelerated processing unit，加速处理器)是AMD公司推出的整合了x86/x64 CPU处理核心和GPU处理核心的新型“融聚”(Fusion)处理器。2011年AMD公司发布了第一款Fusion APU平台，并且提出“异构计算”的理念。它第一次将中央处理器和独显核心做在一个晶片上，使其同时具有高性能处理器和最新独立显卡的处理性能，支持最新应用的“加速运算”，大幅提升了计算机运行效率，实现了CPU与GPU真正的融合。

AMD公司的APU平台分为两种：一种是E系列入门级APU；另一种是A系列主流级APU，有A4/A6/A8三大系列，也就是“Llano APU处理器”（拉诺APU处理器）。2011年正式发布面向主流市场的Llano APU。

Llano APU采用32nm工艺制造，芯片集成的晶体管数量达14亿5千万个，比Intel Sandy Bridge四核心的9亿9500万个晶体管多出近50%。针对不同的市场，Llano APU分别有A8（四核心）、A6（四核心）和A4（双核心）系列等多种配置，并且都有台式机版本和移动版本。Llano APU一经推出，就表现出相当出色的图形性能，性价比高。

AMD 公司认为，CPU 和 GPU 的融合可分为以下 4 步进行。

第一步是物理整合过程，将CPU和GPU集成在同一块硅芯片上，并利用高带宽的内部总线通信，集成高性能的内存控制器，借助开放的软件系统促成异构计算。

第二步是平台优化，CPU和GPU之间互连接口进一步增强，并且统一进行双向电源管理，GPU也支持高级编程语言（这部分是最关键的）。

第三步是架构整合，实现统一的 CPU/GPU 寻址空间，GPU 使用可分页系统内存，GPU 硬件可调度，CPU/GPU/APU 内存协同一致。

第四步是架构和系统整合，主要包括GPU计算环境切换、GPU图形优先计算、独立显卡的PCI-E协同、任务并行运行实时整合等。

浮点计算任务更多会由 GPU 来完成，所以 AMD 公司有意识地推进异构应用程序的开发，由此节省出的资源则被用于整数计算模块以及 GPU 部分。这也意味着 AMD 开始以全局的视野来构建新一代处理器，而不再局限于 x86 或 GPU 自身的限制，这对于微处理器工业来说是一个新时代的开启。

### 9.1.4 双核及多核技术

在2005年以前，主频一直是Intel和AMD两大公司竞争的焦点。但实际运行表明，单纯提升主频已经无法为系统整体性能的提升带来明显的变化，伴随着高主频也带来了处理器巨大的发热量，以及技术上的多种困难，Intel和AMD公司都不约而同地将研制开发重点投向了多核心的发展。

Intel公司于2006年推出第一个双核处理器——基于酷睿（Core）架构的处理器。双核心处理器是在一块CPU基板上集成两个处理器核心，并通过并行总线将各处理器核心连接起来。其工作原理与超线程技术有些相似。所不同的是：超线程技术是对处理器的一种优化技术，即将一个物理处理器分为两个逻辑处理器，从而实现多线程运算；而双核技术则是完全采用两个物理处理器实现多线程工作，每个核心拥有独立的指令集和执行单元，与超线程中所采用的模拟共享机制完全不同。

在双核处理器的基础上，很快发展了多核处理器。多核处理器也称为片上多处理器（chip multi-processor，CMP），或单芯片多处理器。多核处理器是将多个具有完全功能的处理器核心集成在同一个芯片内，整个芯片作为一个统一的结构对外提供服务，输出更加优异的整体性能。多核处理器的技术优势主要体现在多任务应用环境下的表现。随着处理器核心数量的增加，也面临了一些新的技术难题。

## 1. CPU 核心架构演进

核心(die)又称内核，是CPU最重要的组成部分。CPU中心那块隆起的芯片就是核心，它负责CPU所有的计算、接受/存储命令、处理数据。各种CPU核心都具有固定的逻辑结构，如一级缓存、二级缓存、执行单元、指令级单元和总线接口逻辑单元等，都有科学的布局。

为了便于 CPU 设计、生产和销售管理，CPU 制造商对各种 CPU 核心都给出了相应的代号，即所谓的 CPU 核心类型。

不同的 CPU（不同系列或同一系列）都会有不同的核心类型。每一种核心类型都有其相应的制造工艺（如 180nm、130nm、90nm、65nm、45nm、22nm 等）、核心面积（这是决定 CPU 成本的关键因素，成本与核心面积基本上成正比）、核心电压、电流大小、晶体管数量、各级缓存的大小、主频范围、流水线架构和支持的指令集（这两点是决定 CPU 实际性能和工作效率的关键因素）、功耗和发热量的大小、封装方式、接口类型、前端总线频率等。因此，核心类型在某种程度上决定了 CPU 的工作性能。

CPU 核心的发展方向是：更低的电压、更低的功耗、更先进的制造工艺、集成更多的晶体管、更小的核心面积、更先进的流水线架构和更多的指令集、更高的前端总线频率、集成更多的功能（如集成内存控制器）以及多核心等。
