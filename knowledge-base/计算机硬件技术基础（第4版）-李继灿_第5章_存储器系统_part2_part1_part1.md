# 7.5.5 8259A 应用举例

> 来源：docs/08_电子书/计算机硬件技术基础（第4版）-李继灿.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：0c93d8c7280859f1


在 IBM PC/XT 系统中，只用一片 8259A 中断控制器，用来提供 8 级中断请求，其中 IR₀ 优先级最高，IR₇ 优先级最低。它们分别用于日历时钟中断、键盘中断、保留、网络通信、异步通信中断、硬盘中断、软盘中断和打印机中断。设 8259A 的 ICW₂ 高 5 位 T₇～T₃ = 00001，对应的中断类型码为 08H～0FH；片选地址为 20H、21H。8259A 的使用步骤如下。

## 1. 初始化

8259A 初始化程序如下。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 13H</td><td style='text-align: center; word-wrap: break-word;'>;写  $ ICW_{{1}} $, 单片, 边沿触发, 需要  $ ICW_{{4}} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>20H, AL</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 8</td><td style='text-align: center; word-wrap: break-word;'>;写  $ ICW_{{2}} $, 中断类型号从 8 开始</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>21H, AL</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 0DH</td><td style='text-align: center; word-wrap: break-word;'>;写  $ ICW_{{4}} $, 缓冲工作方式, 8086/8088 配置</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>21H, AL</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>MOV</td><td style='text-align: center; word-wrap: break-word;'>AL, 0</td><td style='text-align: center; word-wrap: break-word;'>;写  $ OCW_{{1}} $, 允许  $ IR_{{0}} \sim IR_{{7}} $ 全部 8 级中断请求</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>OUT</td><td style='text-align: center; word-wrap: break-word;'>21H, AL</td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

## 2. 送中断向量

根据中断源的中断类型码送中断向量。例如，异步通信中断 IR，其中，断向量类型码为  $ 8+4=12(0\mathrm{CH}) $，则中断向量的偏移量（IP 值）与段地址（CS）在中断向量表中的存放地址为  $ 12\times4=48(30\mathrm{H}) $、49（31H）、50（32H）、51（33H）。其中，30H、31H 存放指令指针 IP，

32H、33H存放指令段码CS。

## 3. 中断子程序结束

由于 8259A 采用中断工作方式，且  $ ICW_{4} $ 中的  $ D_{1} $ 位（即 AEOI）为 0，这意味着采用正常结束中断，因此，在中断子程序结束前必须发 EOI 命令和 IRET 命令。

MOV AL, 20H ; 写 OCW_{2} 命令，使 ISR 相应位复位（即发 EOI 命令）OUT 20H, AL

IRET ; 开放中断允许，并从中断返回

## 4. 中断嵌套

为了使中断嵌套，即在中断响应过程中，允许比本中断优先级高的中断进入，只要在进入中断处理程序后，执行开中断指令STI即可达到目的。

## 本章小结

输入输出接口是微处理器同外部设备之间信息交换的重要枢纽，也是微机应用的基础内容。CPU对外设的I/O操作类似于存储器的读写操作，但外设与存储器（即内存）有许多不同点。主存储器可以与CPU直接连接，而I/O设备则需要经过接口电路（即I/O适配器）与CPU连接。

接口电路的基本结构同它传送的信息种类有关。根据传送不同信息的需要，接口电路的基本结构安排也有一些特点：3种信息（数据、状态、控制）由于性质不同，应通过不同的端口分别传送；在用输入输出指令来寻址外设（实际寻址端口）的CPU中，外设的状态作为一种输入数据，而CPU的控制命令作为一种输出数据，从而可通过数据总线来分别传送；端口地址由CPU地址总线的低8位或低16位（如在8086用DX间接寻址外设端口时）地址信息来确定。

CPU 与外设之间数据传送的方式有程序传送、中断传送与 DMA 传送 3 种方式。其中，中断是控制异步数据传送的一种软、硬件相结合的关键技术，可以看作由中断源引起（即硬件随机激发或软件激发）的一次过程调用。所有中断过程都是由中断系统实现的。中断系统应能响应中断、处理中断和从中断返回，能实现优先权排队，并且能够实现中断嵌套。

8086/8088 的中断系统采用中断向量结构，使每个不同的中断都可以通过给定一个特定的中断类型号（或中断类型码）供 CPU 识别，处理多达 256 种类型的中断。这些中断可以来自外部，即由硬件产生；也可以来自内部，即由软件（中断指令）产生；或者满足某些特定条件（陷阱）后引发 CPU 中断。

8086/8088 CPU 有可屏蔽中断（INTR）与非屏蔽中断（NMI）两条引脚来接受外部硬件中断请求。可屏蔽中断要受标志寄存器的中断允许标志位（IF）的控制。若 IF=0，则 CPU 处于关中断状态，不响应 INTR；若 IF=1，则 CPU 处于开中断状态，将响应 INTR，并在 CPU 发回第 2 个中断响应信号  $ \overline{INTA} $ 时，通过  $ \overline{INTA} $ 引脚向产生 INTR 的设备接口（中断源）

发回响应信号，启动中断过程。而非屏蔽中断不受IF的控制。

8086/8088 CPU 内部中断又称软件中断，它包括除法出错中断（类型 0）、溢出中断（类型 4）、单步中断（类型 1）与断点中断（类型 3）；还有用户定义的软件中断（类型 n）。应着重掌握用户定义的软件中断（类型 n）。

8086/8088 CPU 中断处理的过程比较复杂。首先要掌握单个中断源的基本中断处理过程：中断请求、中断响应、中断处理和中断返回。当同时发生多个中断请求时，CPU 将根据各中断源优先权的高低来处理。

利用中断向量表来实现向量中断是8086/8088中断方法的设计特点。中断向量表又称中断入口地址表。每个中断向量具有一个相应的中断类型号，由中断类型号确定在中断向量表中的中断向量。中断类型号乘4，将给出中断向量表中的中断向量入口第1个字节的物理地址。

8086/8088 CPU 在响应 INTR 中断时，首先要读取中断类型号 n；然后按先后顺序把 PSW、CS 和 IP 的当前内容压入堆栈并且清除 IF 和 TF 标志；再把  $ 4 \times n + 2 $ 的字存储单元中的内容读入 CS 中，把  $ 4 \times n $ 的字存储单元中的内容读入 IP 中。于是，CPU 从新的 CS：IP 值确定中断入口地址后，便开始执行中断服务程序。至于 CPU 响应 NMI 或内部中断请求时的操作顺序与上述过程基本相同，只是不需要读取中断类型号 n 的操作。

在响应中断时是严格按时序进行的。8086 的中断响应时序由两个INTA中断响应总线周期组成，第1个INTA总线周期表示一个中断响应正在进行中，第2个INTA总线周期中，中断类型号必须在16位数据总线的低半部分（ $ AD_{0} \sim AD_{7} $）上传送给8086。

为了便于处理中断，专门设计了可编程中断控制器8259A。8259A的功能很强，它可以对中断源进行扩充和管理，通过编程可以实现各种中断处理功能和各种工作方式。

要结合书中的实例，着重掌握单片8259A的使用步骤和编程方法，包括如何完成初始化编程、如何送中断向量、如何正常地结束中断子程序、如何实现中断嵌套。在此基础上，能够通过自学进一步掌握由多片8259A组成的主从式中断系统的工作原理及其编程方法。

## 习题7

7-1 CPU 与外设的连接为什么要通过 I/O 接口才能挂到总线上？

7-2 接口电路的基本结构有哪些特点？

7-3 CPU 与外设交换数据的传送方式可分为哪几种？简要说明它们各自的特点。

7-4 在 CPU 与外设之间的数据接口上一般加有三态缓冲器，其作用是什么？

7-5 何谓中断？何谓中断源？有哪些中断源？

7-6 何谓中断系统？中断系统有哪些功能？微机的中断技术有什么优点？

7-7 CPU 响应中断有哪些条件？为什么需要这些条件？

7-8 CPU 在中断周期要完成哪些主要的操作？

7-9 在 I/O 控制方式中，中断和 DMA 有何主要异同？

7-10 向量中断与中断向量在概念上有何区别？中断向量和中断入口地址又有何区别？

7-11 什么是中断向量表？在 8086/8088 的中断向量表中有多少个不同的中断向量？

若已知中断类型号，举例说明如何在中断向量表中查找中断向量。

7-12 试比较主程序与中断服务程序和主程序调用子程序的主要异同点。

7-13 试比较保护断点与保护现场的主要异同点。

7-14 对 8086/8088 CPU 的 NMI 引脚上的中断请求应当如何处理？

7-15 若 8086 从 8259A 中断控制器中读取的中断类型号为 76H，其中断向量在中断向量表中的地址指针是什么？

7-16 简述 8086 中断系统响应可屏蔽中断的全过程。

7-17 8086/8088 响应可屏蔽中断的主要操作有哪些？

7-18 假设某中断程序入口地址为 21378H，放置在中断向量表中的位置为 00020H，那么此中断向量号为多少？入口地址在向量表中如何放置？

7-19 已知 8086/8088 的非屏蔽中断(NMI)服务程序的入口地址标号为 NMITS，试编程将入口地址填写到中断向量表中。

7-20 8259A 中断控制器的主要功能是什么？

7-21 试说明 8259A 中断控制器的全嵌套方式与特殊的全嵌套方式的区别。它们在应用上有什么不同？

7-22 8259A 中断屏蔽寄存器(IMR)和8086、8088 CPU 的中断允许标志(IF)有什么差别？在中断响应过程中它们如何配合工作？

7-23 当用 8259A 中断控制器时，其中断服务程序为什么要用 EOI 命令来结束中断服务？

7-24 简述 8259A 中断控制器的中断请求寄存器(IRR)和中断服务寄存器(ISR)的功能。

7-25 某 80×86 系统中，若 8259A 处于单片、全嵌套工作方式，并且采用非特殊屏蔽和非特殊结束方式，中断请求采用边沿触发， $ \mathrm{IR}_{0} $ 的中断类型码为 60H，试编写 8259A 的初始化程序。设 8259A 的端口地址为 93H、94H。

7-26 怎样用 8259A 的屏蔽命令字来禁止 IR₂ 和 IR₄ 引脚上的中断请求？又怎样撤销这一禁止命令？设 8259A 的端口地址为 53H、54H。

7-27 单片 8259A 能够管理多少级可屏蔽中断？若用 3 片级联，则能管理多少级可屏蔽中断？

7-28 一个 8259A 主片，连接两个 8259A 从片，从片分别经主片的  $ \mathrm{IR}_{2} $ 及  $ \mathrm{IR}_{5} $ 引脚接入，系统中优先排列次序如何？

7-29 当中断控制器 8259A 的  $ A_{0} $ 接向地址总线  $ A_{1} $ 时，如果其中一个口地址为 62H，那么另一个口地址为多少？若某外设的中断类型码是 56H，则该中断源应加到 8259A 中的中断请求寄存器 IRR 的哪个输入端？

### 【学习目标】

微机与外设交换信息，都必须通过接口电路实现。随着大规模集成电路技术的发展，已生产了各种各样的可编程接口芯片，不同系列的微处理器都有标准化、系列化的接口芯片可供选用。

本章介绍典型可编程接口芯片的工作原理和使用方法，这是掌握微机接口技术的重要基础。

#### 【学习要求】

理解 Intel 系列的 8253-5、8255A 以及 NINS 8250 等几种典型通用的接口芯片的工作原理。

重点掌握8253-5与8255A的编程技术。

掌握8250的初始化编程方法。

理解 A/D 和 D/A 转换器在微机应用中的作用。

掌握 ADC 0809 与 DAC 0832 和微机的接口方式以及连接方法。

## 1. 接口的分类

按接口的功能可分为通用接口和专用接口两类。通用接口又可分为并行接口和串行接口。并行接口是按字节传送的；串行接口和CPU之间按并行传送，而和外设之间是按串行传送的，如图8-1所示。专用接口仅适用于某台外设或某种微处理器，用于增强CPU的功能。此外，在微机控制系统中专为某个被控制的对象而设计的接口也是专用接口。

按接口芯片功能选择的灵活性来分，还可分为硬布线逻辑接口芯片和可编程接口芯片。前者的功能选择是由引线的有效电平决定的，其适用范围有限；而后者的功能可由指令控制，即用编程的方法可使接口选择不同的功能。

## 2. 接口的功能

接口的功能很丰富，根据具体的接口芯片而定，其主要功能如下。

<div style="text-align: center;"><div style="text-align: center;">图 8-1 并行接口和串行接口示意图</div> </div>

### （1）缓冲锁存数据。

通常 CPU 与外设工作速度不可能完全匹配，在数据传送过程中难免有等待的时候。为此，需要把传输数据暂存在接口的缓冲寄存器或锁存器中，以便缓冲或等待；而且，要为 CPU 提供有关外设的状态信息，如外设“准备好”或“忙”，或缓冲器“满”或“空”等。

#### （2）地址译码。

在微机系统中，每个外设都被赋予一个相应的地址编码，外设接口电路能进行地址译码，以选择设备。

##### （3）传送命令。

外设与 CPU 之间有一些联络信号，如外设的中断请求，CPU 的响应回答等信号都需要接口来传送。

##### （4）码制转换。

在一些通信设备中，信号是以串行方式传输的，而计算机的代码是以并行方式输入输出的，这就需要进行并行码与串行码的互相转换；在转换中，根据通信规程还要加进一些同步信号等，这些工作也是接口电路要完成的任务之一。

##### （5）电平转换。

一般 CPU 输入输出的信号都是 TTL 电平，而外设的信号就不一定是 TTL 电平。为此，在外设与 CPU 连接时，要进行电平转换，使 CPU 与外设的电压（或电流）相匹配。

除上述功能之外，一般接口电路都是可以编程控制的，能根据CPU的命令进行功能变换。以上是就一般接口功能而言的，实际上接口的功能不只是这些，还有如定时、中断和中断管理、时序控制等功能。

## 8.2 可编程计数器/定时器 8253-5

8253-5 是可编程计数器/定时器。下面介绍 8253-5 的引脚与功能结构、内部结构和寻址方式、工作方式及时序关系，并给出应用实例。

### 8.2.1 8253-5 的引脚与功能结构

8253-5 是一种 24 脚封装的双列直插式芯片，其引脚和功能结构示意图如图 8-2 所示。

<div style="text-align: center;"><div style="text-align: center;">(a) 引脚</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 功能示意图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 8-2 8253-5 引脚和功能结构示意图</div> </div>

8253-5 各引脚的定义如下。

 $ D_{0} $ ~  $ D_{7} $ : 数据线。

 $ A_{1} $、 $ A_{0} $：地址线，用于选择计数器0、1、2中的一个以及选择控制字寄存器。

RD：读控制信号，低电平有效。

WR：写控制信号，低电平有效。

CS：片选端，低电平有效。

CLK $ _{0-2} $：计数器0、1、2的时钟输入端。

GATE $ _{0-2} $：计数器0、1、2的门控制脉冲输入端，由外部设备送入门控脉冲。

 $ OUT_{0\sim2} $：计数器0、1、2的输出端，由它接至外部设备以控制其启停。

8253-5 的功能体现在两方面，即计数与定时。两者的工作原理在实质上是一样的，都是利用计数器做减 1 计数，减至 0 发信号；两者的差别只是用途不同。

## 1. 内部结构

8253-5 的内部结构如图 8-3 所示。它有 3 个独立结构完全相同的 16 位计数器和 1 个 8 位控制字寄存器。在每个计数器内部，又可分为计数初值寄存器（CR）、计数执行部件（CE）

<div style="text-align: center;"><div style="text-align: center;">图 8-3 8253-5 的内部结构</div> </div>

和输出锁存器(OL) 3 个部件，它们都是 16 位寄存器，也可以作 8 位寄存器来用。在计数器工作时，通过程序给初值寄存器 CR 送入初始值，该初始值再被送入执行部件 CE 进行减 1 计数；而输出锁存器 OL 则用来锁存 CE 的内容，该内容可以由 CPU 进行读出操作。

## 2. 寻址方式

如上所述，8253-5 内部有 3 个计数器和 1 个控制字寄存器，可通过地址线  $ A_{1} $、 $ A_{0} $，读写控制线  $ \overline{RD} $、 $ \overline{WR} $ 与选片  $ \overline{CS} $ 进行寻址，并实现相应的操作。CPU 对 8253-5 的寻址与相应操作如表 8-1 所示。

<div style="text-align: center;"><div style="text-align: center;">表8-1 8253-5的寻址与相应操作</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>$ A_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ A_{n} $</td><td style='text-align: center; word-wrap: break-word;'>RD</td><td style='text-align: center; word-wrap: break-word;'>WR</td><td style='text-align: center; word-wrap: break-word;'>CS</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>读计数器0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>读计数器1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>读计数器2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>写入计数器0</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>写入计数器1</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>写入计数器2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>写方式控制字</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>禁止（高阻抗）</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>无操作（高阻抗）</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>x</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>无操作（高阻抗）</td></tr></table>

### 8.2.3 8253-5 的工作方式及时序关系

8253-5 的方式控制字格式如图 8-4 所示，各计数器有 6 种可供选择的工作方式，以完成

<div style="text-align: center;"><div style="text-align: center;">图 8-4 8253-5 工作方式控制字格式</div> </div>

定时、计数或脉冲发生器等多种功能。

## 1. 方式 0 计数结束产生中断

8253-5 在方式 0（如图 8-5 所示）工作时，有以下特点。

<div style="text-align: center;"><div style="text-align: center;">图 8-5 方式 0 的时序图</div> </div>

（1）当写入控制字后，OUT端输出低电平作为起始电平，在计数初值装入计数器后，输出仍保持低电平。若GATE端的门控信号为高电平，当CLK端每一个计数脉冲，计数器就做减1计数，当计数值减为0时，OUT端输出变为高电平，若要使用中断，则可以用此电平变化向CPU发中断请求。

（2）GATE为计数控制门。方式0的计数过程可由门控信号GATE控制暂停，当GATE=1时，允许计数；当GATE=0时，停止计数。GATE信号的变化并不影响输出OUT端的状态。

（3）计数过程中可重新装入计数初值。如果在计数过程中，重新写入某一计数初值，则在写完新的计数值后，计数器将从该值重新开始做减1计数。

## 2. 方式 1 可编程单稳触发器

8253-5 按方式 1（如图 8-6 所示）工作时，有以下特点。

（1）写入控制字后，OUT端输出高电平作为起始电平。当计数初值送到计数器后，若无GATE的上升沿，不管此时GATE输入的触发电平是高电平还是低电平，都不会开始减1计数，而必须等到GATE端输入一个正跳变触发脉冲时，计数过程才会开始。

（2）工作时，由 GATE 输入触发脉冲的上升沿使 OUT 变为低电平，每来一个计数脉冲，

<div style="text-align: center;"><div style="text-align: center;">图 8-6 方式 1 的时序图</div> </div>

计数器做减1计数，当计数值减为0时，OUT再变为高电平。OUT端输出的单稳负脉冲的宽度为计数器的初值乘以CLK端输入脉冲周期。

（3）如果在计数器未减到0时，门控端GATE又来一个触发脉冲，则由下一个时钟脉冲开始，计数器将从初始值重新做减1计数。当减至0时，输出端又变为高电平。这样，使输出脉冲宽度延长。

## 3. 方式 2 分频器（又称分频脉冲产生器）

方式2是n分频计数器，n是写入计数器的初值。写入控制字后，OUT端输出高电平作为起始电平。当计数初值写入计数器后，从下一个时钟脉冲起，计数器开始做减1计数。当减到1时，OUT端输出将变为低电平。当计数端CLK输入n个计数脉冲后，在输出端OUT输出一个n分频脉冲，其正脉冲宽度为 $ (n-1) $个输入脉冲时钟周期，而负脉冲宽度只是一个输入脉冲时钟周期。图8-7是方式2的时序图。GATE用来控制计数，当GATE=1时，允许计数；当GATE=0时，停止计数。因此，可以用GATE来使计数器同步。

<div style="text-align: center;"><div style="text-align: center;">图 8-7 方式 2 的时序图</div> </div>

注意：在方式2下，不但高电平的门控信号有效，上升跳变的门控信号也是有效的。

## 4. 方式 3 方波频率发生器

方式3类似于方式2，但输出为方波或者为对称的矩形波。当写入控制字后，OUT端输出低电平作为起始电平，装入计数值n后，OUT端输出变为高电平。如果当前GATE为高电平，则立即开始做减1计数。当计数值n为偶数时，每当计数值减到n/2时，则OUT端由高电平变为低电平，并一直保持计数到0，故输出的n分频波为方波；当n为奇数时，输出分频波高电平宽度为 $ (n+1)/2 $计数脉冲周期，低电平宽度为 $ (n-1)/2 $计数脉冲周期。图8-8是方式3的时序图。

## 5. 方式 4 软件触发选通脉冲

按方式4工作时，写入控制字后，输出OUT变为高电平。当由软件触发写入初始值后，计数器做减1计数，当计数器减到0时，在OUT端输出一个宽度等于一个计数脉冲周期的负脉冲。当GATE=1时，允许计数；当GATE=0时，停止计数，如图8-9所示。

<div style="text-align: center;"><div style="text-align: center;">图 8-8 方式 3 的时序图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 8-9 方式 4 的时序图</div> </div>

## 6. 方式 5 硬件触发选通脉冲

方式5 类似于方式4，所不同的是GATE端输入信号的作用不同。8253-5按方式5工

作时，由 GATE 输入触发脉冲，从其上升沿开始，计数器做减 1 计数，计数结束时，在 OUT 端输出一个宽度等于一个计数脉冲周期的负脉冲。在此方式中，计数器可重新触发。当 GATE 触发脉冲上升沿到来时，将把计数初值重新送入计数器，然后开始计数过程。图 8-10 是方式 5 的时序图。

<div style="text-align: center;"><div style="text-align: center;">图 8-10 方式 5 的时序图</div> </div>

### 8.2.4 8253-5 应用举例

在 IBM PC/XT 微机系统中，8253-5 是 CPU 外围支持电路之一，提供系统日历时钟中断，动态存储器刷新定时及喇叭发声音调控制等功能。下面从硬件结构和软件编程两方面予以简要分析。

## 1. 硬件结构

图8-11是8253-5在IBM PC/XT微机系统中的连线图。图中，8253-5的3个计数器使用相同的时钟脉冲。 $ \mathrm{CLK}_{0}\sim\mathrm{CLK}_{2} $的频率是PCLK（2.38MHz）的1/2，即1.19MHz，由 $ U_{22} $分频实现。8253-5的3个计数器端口地址为40H、41H、42H。控制寄存器端口地址为43H。

<div style="text-align: center;"><div style="text-align: center;">图 8-11 8253-5 在 IBM/XT 微机系统中的连接图</div> </div>

3 个计数器的用途如下。

### 1）计数器0

计数器0向系统日历时钟提供定时中断，它选用方式3工作，设置的控制字为36H。计数器值预置为0（即65536），GATE接+5V，允许计数。因此，OUT输出时钟频率为1.19MHz/65536=18.21Hz。它直接接到中断控制器8259A的中断请求端IR（即图中IRQ），即0级中断，每秒出现18.2次。因此，每间隔55ms产生一次0级中断请求。并且，每一个输出脉冲均以其正跳变产生一次中断。

#### 2）计数器1

计数器1向DMA控制器定时发动态存储器刷新请求，它选用方式2工作，设置的控制

字为 54H。计数器初始值为 18, GATE₁ 接+5V，允许计数。因此，OUT₁ 输出分频脉冲频率为 1.19MHz/18=66.1kHz，相当于周期为 15.1μs。这样，计数器 1 每隔 15.1μs 经由 U₂₁ 产生一个动态 RAM 刷新的请求信号 DRQ₀。

##### 3）计数器2

计数器2控制喇叭发声音调，用方式3工作，设置的控制字为B6H，计数器的初值置533H（即1331），OUT $ _{2} $输出方波频率为1.19MHz/1331=894Hz。该计数器的工作由主机板8255A的PB $ _{0} $端控制。当PB $ _{0} $输出的TIME $ _{2} $GATESPK为高电平时，计数器才能工作。OUT $ _{2} $的输出与8255A PB $ _{1} $端产生的喇叭音响信号SPKRDATA在U $ _{87} $相与后送到功放驱动芯片75477的输入端A，其输出推动喇叭发音。

## 2. 计数器的预置程序

按上述功能，8253-5的3个计数器的预置程序如下。

PRO: MOV AL, 36H
 ;选择计数器 0,写双字节计数值,方式 3,二进制计数
 OUT 43H, AL
 ;写控制字
 MOV AL, 0
 ;预置计数值 65536
 OUT 40H, AL
 ;先送低字节计数值
 OUT 40H, AL
 ;后送高字节计数值
PR1: MOV AL, 54H
 ;选择计数器 1,读写低字节计数值,方式 2,二进制计数
 OUT 43H, AL
 ;写控制字
 MOV AL, 12H
 ;预置计数器初值 18
 OUT 41H, AL
 ;选择计数器 2,读写双字节计数值,方式 3,二进制计数
 PR2: MOV AL, 0B6H
 ;写控制字
 OUT 43H, AL
 ;送分频数 1331
 MOV AX, 533H
 ;先送低字节
 OUT 42H, AL
 ;后送高字节

## 8.3 可编程并行通信接口芯片 8255A

8255A 是 Intel 公司生产的一种典型的可编程并行通信接口芯片，其功能与通用性都较强，使用也很灵活。

### 8.3.1 8255A 芯片引脚定义与功能

8255A 是一个 40 脚封装双列直插式芯片，图 8-12 是其引脚和功能示意图。

 $ D_{7}\sim D_{0} $ ：8位双向数据线，连接CPU与8255A片内的三态双向数据总线缓冲器。 $ A_{1} $、 $ A_{0} $ ：2位地址线，用于选择3个I/O端口和一个控制端口。

RD：读控制线，低电平有效。它连接系统总线的RD（最小方式）或IOR（最大方式）信号，用于实现对8255A的读操作。

WR：写控制线，低电平有效。它连接系统总线的WR（最小方式）或IOR（最大方式）信

<div style="text-align: center;"><div style="text-align: center;">(a) 引脚</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 功能示意图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 8-12 8255A 引脚和功能示意图</div> </div>

号，用于实现对8255A的写操作。

CS: 片选端，低电平有效。当系统地址译码使之为低电平有效时，用于选中 8255A 芯片工作。

RESET：复位信号，高电平有效。8255A复位后，其内部控制逻辑电路中的控制寄存器和状态寄存器等都被清除，3个I/O端口均被置为输入方式；并且，屏蔽中断请求，24条连接外设的信号线呈现高阻悬浮状态。这种势态将一直维持到8255A接收方式选择控制命令时才能改变，使其进入用户所设定的工作方式。

A ☐：含一个 8 位数据输入锁存器和一个 8 位数据输出锁存器/缓冲器。

B 口：含一个 8 位数据输入缓冲器和一个 8 位数据输出锁存器/缓冲器。

C 口：含一个 8 位数据输入缓冲器和一个 8 位数据输出锁存器/缓冲器。

实际使用时，可以把 A 口、B 口、C 口分成两个控制组：A 组和 B 组。A 组控制电路由端口 A 和端口 C 的高 4 位（PC_{7}～PC_{4}）组成，B 组控制电路由端口 B 和端口 C 的低 4 位（PC_{3}～PC_{0}）组成。

8255A 的内部结构框图如图 8-13 所示。它可以分为 CPU 接口、内部逻辑和外设接口 3 部分。其中，各部件的具体组成与功能如下。

## 1. 数据端口 A、B、C

8255A 的 3 个 8 位 I/O 端口 A、B、C 是与外设相连的接口，它们均可用来连接外设和作为输入口或输出口传输信息，但各有不同特点，设计者可以用软件使它们分别作为输入端口或输出端口。

在实际使用中，A 口和 B 口通常只作为独立的输入或输出数据端口使用，虽然有时也利用它们从外设读取一些状态信号，如打印机的“忙”(BUSY)状态信号、A/D 转换器的“转换结束”(EOC)状态信号等，但对 A 口和 B 口来说，都是作为 8255A 的数据口读入的，而不是作为状态口读入的。这时，A 口和 B 口作数据口输入输出，是按 8 位信息一起传输的，即使只用到其中某一位，也要同时输入输出 8 位数据。

C 口的功能和使用比较特殊。它除了可以作数据口使用外，主要是用来配合 A 口和 B

<div style="text-align: center;"><div style="text-align: center;">图 8-13 8255A 的内部结构图</div> </div>

口工作。

具体地说，C 口的 8 位常常可通过控制命令将其分为 2 个 4 位端口，每个 4 位端口包含 1 个 4 位的输入缓冲器和 1 个 4 位的输出锁存器/缓冲器，它们分别用来作为 A 口和 B 口工作时的输出控制信号与输入状态信号。此外，C 口还可以作为专用（固定）联络（握手）信号线，以及用作实现按位控制之用。其具体用法将在下面详细说明。

## 2. A 组控制和 B 组控制部件

这两组控制部件是8255A的内部控制逻辑，其内部有控制寄存器与状态寄存器，它们完成两个功能：一是接收来自CPU通过内部数据总线送来的控制字，以选择两组端口的工作方式；二是接收来自读写控制逻辑电路的读写命令，以决定两组端口的读写操作。

## 3. 读写控制逻辑电路

读写控制逻辑电路是和 CPU 相连的控制电路，负责管理 8255A 的数据传输过程。它接收片选信号  $ \overline{CS} $ 和来自地址总线的地址信号  $ A_{1} $、 $ A_{0} $（在 8086 CPU 中为  $ A_{2} $、 $ A_{1} $）以及控制总线的信号 RESET、 $ \overline{WR} $、 $ \overline{RD} $，并将它们组合后，得到对 A 组和 B 组控制部件的控制命令，并将命令送给这两个部件，再由它们完成对数据信息、状态信息和控制信息的传输。

## 4. 数据总线缓冲器

数据总线缓冲器是连通 CPU 数据总线的一个双向三态 8 位数据缓冲器，8255A 正是通过它来输入输出数据的；此外，CPU 发给 8255A 的控制字以及由外设输入 CPU 的状态信息等，也都是通过该部件传递的。

### 8.3.2 8255A 寻址方式

8255A 有 3 个 I/O 端口和一个控制端口，它们通过地址线  $ A_{1} $、 $ A_{0} $，读写控制线  $ \overline{RD} $、 $ \overline{WR} $ 和片选线  $ \overline{CS} $ 进行寻址并实现相应的操作。表 8-2 列出了 8255A 的寻址方式与相应操作。

<div style="text-align: center;"><div style="text-align: center;">表8-2 8255A 寻址方式与相应操作</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>$ A_{1} $</td><td style='text-align: center; word-wrap: break-word;'>$ A_{0} $</td><td style='text-align: center; word-wrap: break-word;'>RD</td><td style='text-align: center; word-wrap: break-word;'>WR</td><td style='text-align: center; word-wrap: break-word;'>CS</td><td style='text-align: center; word-wrap: break-word;'>操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>读端口A</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>读端口B</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>读端口C</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>写端口A</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>写端口B</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>写端口C</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>写控制寄存器：若  $ D_{7}=1 $，则写入的是工作方式控制字；若  $ D_{7}=0 $，则写入的是对 C 口某位的置位/复位控制字</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>✗</td><td style='text-align: center; word-wrap: break-word;'>✗</td><td style='text-align: center; word-wrap: break-word;'>✗</td><td style='text-align: center; word-wrap: break-word;'>✗</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>无操作( $ D_{7} $～ $ D_{6} $ 处于高阻抗)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>✗</td><td style='text-align: center; word-wrap: break-word;'>✗</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>无操作( $ D_{7} $～ $ D_{6} $ 处于高阻抗)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>非法操作</td></tr></table>

### 8.3.3 8255A 的控制字

8255A 在初始化编程时，是利用 OUT 指令由 CPU 输出一个控制字到控制端口的控制寄存器来控制其工作的。根据具体控制要求的不同，可使用两种不同类型的控制字：一种是用于选择 3 个 I/O 端口工作方式的控制字，称为方式选择控制字；另一种是对端口 C 中任一位进行置位或复位操作的控制字，称为端口 C 置位/复位控制字。

## 1. 方式选择控制字

方式选择控制字的格式如图 8-14 所示。

## 2. 端口 C 置位/复位控制字

端口 C 的主要特点之一，就是可以通过对控制寄存器写入端口 C 置位/复位控制字，实现对其按位控制。端口 C 置位/复位控制字的格式如图 8-15 所示。

【例 8-1】若要将 8255A 设定为 A 口为方式 0 输入，B 口为方式 1 输出，PC₇～PC₄ 为输出，PC₃～PC₀ 为输入。设 8255A 的 4 个端口地址范围为 0060H～0063H（PC 系统中），则初始化编程时的程序段如下。

MOV DX, 0063H ; 8255A 控制口地址
MOV AL, 10010101B ; 设定初始化方式选择控制字
OUT DX, AL ; 送控制字到控制口

<div style="text-align: center;"><div style="text-align: center;">D_{4}、D_{3}、D_{1}、D_{0} 输入输出：1=输入，0=输出</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 8-14 方式选择控制字的格式</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 8-15 端口 C 置位/复位控制字</div> </div>

【例 8-2】若要使 8255A 的  $ PC_{5} $ 初始状态置为 1，设 8255A 端口地址范围为  $ 300H \sim 303H $（实验平台），则设置端口 C 置位/复位控制字的程序段如下。

MOV DX, 0303H ; 8255A 控制口地址
MOV AL, 00001011B ; 由 C 口置位/复位控制字设定  $ PC_{5}=1 $
OUT DX, AL ; 送控制字到控制口

【例 8-3】若要使 8255A 的  $ PC_{7} $ 产生一个负脉冲，用作打印机接口的选通信号，设 8255A 控制端口地址为 OFFFEH（TP86A），则设置端口 C 置位/复位控制字的程序段如下。

MOV DX, 0FFFEH ;8255A 控制口地址
MOV AL, 00001110B ;由 C 口置位/复位控制字设定  $ PC_{7}=0 $
OUT DX, AL ;送控制字到控制口
NOP ;延长负脉冲宽度
NOP
MOV AL, 00001111B ;由 C 口置位/复位控制字设定  $ PC_{7}=1 $
OUT DX, AL

### 8.3.4 8255A 的工作方式

8255A 有 3 种工作方式：方式 0（基本输入输出方式）、方式 1（选通输入输出方式）、方式 2（双向选通输入输出方式，仅适合于 A 口）。这些工作方式由初始化编程时设置方式选择控制字来选择。

A 口可选择方式 0、方式 1 和方式 2，B 口只能选择方式 0 和方式 1，而 C 口则只能工作在方式 0。当 A 口和 B 口选择方式 0 与方式 1 时，C 口通常都是配合 A 口或 B 口工作，作为 A 口、B 口与外设联络用的输出控制信号或输入状态信号，而 C 口的其余各位仍用方式 0 工作。
