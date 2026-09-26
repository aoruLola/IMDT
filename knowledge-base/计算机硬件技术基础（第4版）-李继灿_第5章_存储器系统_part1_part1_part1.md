# 第5章 存储器系统

> 来源：docs/08_电子书/计算机硬件技术基础（第4版）-李继灿.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：0c93d8c7280859f1


## 【学习目标】

本章首先以半导体存储器为对象，在讨论存储器及其基本电路、基础知识的基础上，讨论存储芯片及其与CPU之间的连接和扩充问题；然后，介绍内存的技术发展以及外部存储器；最后，简要介绍存储器系统的分层结构。

### 【学习要求】

存储器的分类、组成及功能。着重理解行选与列选对1位信息的读出。

重点掌握位扩充与地址扩充技术。

理解存储器与 CPU 的连接方法。

着重理解内存技术的发展。

理解存储器系统的分层结构。

## 5.1 存储器的分类与组成

计算机的存储器可分为两大类：一类为内部存储器，简称内存或主存，其基本存储元件多以半导体材料制造；另一类为外部存储器，简称外存，多以磁性材料或光学材料制造。

### 5.1.1 半导体存储器的分类

半导体存储器的分类如图5-1所示。按使用的功能可分为两大类：随机存取存储器（random access memory，RAM）和只读存储器（read only memory，ROM）。

RAM 按工艺又可分为双极型 RAM 和 MOS RAM 两类，而 MOS RAM 又可分为静态（static）和动态（dynamic）RAM 两种。双极型 RAM 的特点是存取速度快，但集成度低，功耗大，主要用于速度要求高的位片式微机中；静态 MOS RAM 的集成度高于双极型 RAM，而功耗低于双极型 RAM；动态 RAM 比静态 RAM 具有更高的集成度，靠电路中的栅极电容存储信息。由于电容器上的电荷会泄漏，因此，它需要定时进行刷新。

只读存储器 ROM 按工艺也可分为双极型和 MOS 型，但一般根据信息写入的方式不同，而分为不可编程掩膜式 ROM，可编程 ROM (PROM) 和可擦除、可再编程 ROM（包括紫外线擦除 EPROM 与电子擦除  $ E^{2} $PROM 以及 Flash ROM）等几种。

<div style="text-align: center;"><div style="text-align: center;">图 5-1 半导体存储器的分类</div> </div>

### 5.1.2 半导体存储器的组成

半导体存储器的组成框图如图5-2所示。它一般由存储体、地址选择电路、输入输出电路和控制电路组成。

<div style="text-align: center;"><div style="text-align: center;">图 5-2 半导体存储器组成框图</div> </div>

## 1. 存储体

存储体是存储1或0信息的电路实体，它由许多个存储单元组成，每个存储单元赋予一个编号，称为地址单元号。而每个存储单元由若干相同的位组成，每个位需要一个存储元件。对存储容量为1K（1024个单元）×8位的存储体，其总的存储位数为 $ 1024 \times 8 $

位=8192位。

存储器的地址用一组二进制数表示，其地址线的位数 n 与存储单元的数量 N 之间的关系为  $ 2^{n}=N $。

地址线数与存储单元数的关系如表5-1所示。

<div style="text-align: center;"><div style="text-align: center;">表 5-1 地址线数与存储单元数的关系</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>地址线数 n</td><td style='text-align: center; word-wrap: break-word;'>3</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>9</td><td style='text-align: center; word-wrap: break-word;'>10</td><td style='text-align: center; word-wrap: break-word;'>11</td><td style='text-align: center; word-wrap: break-word;'>12</td><td style='text-align: center; word-wrap: break-word;'>13</td><td style='text-align: center; word-wrap: break-word;'>14</td><td style='text-align: center; word-wrap: break-word;'>15</td><td style='text-align: center; word-wrap: break-word;'>16</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>存储单元数 N=2 $ ^{n} $</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>256</td><td style='text-align: center; word-wrap: break-word;'>512</td><td style='text-align: center; word-wrap: break-word;'>1024</td><td style='text-align: center; word-wrap: break-word;'>2048</td><td style='text-align: center; word-wrap: break-word;'>4096</td><td style='text-align: center; word-wrap: break-word;'>8192</td><td style='text-align: center; word-wrap: break-word;'>16 384</td><td style='text-align: center; word-wrap: break-word;'>32 764</td><td style='text-align: center; word-wrap: break-word;'>65 536</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>存储容量/B</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>16</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>256</td><td style='text-align: center; word-wrap: break-word;'>512</td><td style='text-align: center; word-wrap: break-word;'>1K</td><td style='text-align: center; word-wrap: break-word;'>2K</td><td style='text-align: center; word-wrap: break-word;'>4K</td><td style='text-align: center; word-wrap: break-word;'>8K</td><td style='text-align: center; word-wrap: break-word;'>16K</td><td style='text-align: center; word-wrap: break-word;'>32K</td><td style='text-align: center; word-wrap: break-word;'>64K</td></tr></table>

## 2. 地址选择电路

地址选择电路包括地址码缓冲器、地址译码器等。

地址译码器用来对地址码译码。设其输入端的地址线根数为 n，输出线数为 N，则它分别对应  $ 2^{n} $ 个不同的地址码，作为对存储体地址单元的选择线。这些输出的选择线又称字线。

地址译码方式有以下两种。

（1）单译码方式：或称字结构，其全部地址码只用一个地址译码器电路译码，译码输出的字选择线直接选中与输入地址码对应的存储单元。如图5-2所示，有 $ A_{2} $、 $ A_{1} $、 $ A_{0} $ 3根输入地址线，经过地址译码器输出8种不同编号的字线：000、001、010、011、100、101、110、111。这8条字线分别对应8个不同的地址单元。这种单译码方式需要的选择线数较多，只适用于容量较小的存储器。

（2）双译码方式：或称重合译码，双译码方式存储器结构如图5-3所示。它将地址码分为X与Y两部分，用两个译码电路分别译码。X向译码又称行译码，其输出线称行选择线，它选中存储矩阵中一行的所有存储单元。Y向译码又称列译码，其输出线称列选择线，它选中存储矩阵中一列的所有存储单元。只有X向和Y向的选择线同时选中的那一位存储单

<div style="text-align: center;"><div style="text-align: center;">图 5-3 双译码存储器结构</div> </div>

元，才能进行读或写操作。由图可见，具有1024个基本单元电路的存储体排列成 $ 32\times32 $的矩阵，它的X向和Y向译码器各有32根译码输出线，共64根。若采用单译码方式，则有1024根译码输出线。显然，双译码方式所需要的选择线数目较少，也简化了存储器的结构，故它适用于大容量的存储器。

## 3. 读写电路与控制电路

读写电路包括读写放大器、数据缓冲器（三态双向缓冲器）等，它是数据信息输入和输出的通道。

外界对存储器的控制信号有读信号(RD)、写信号(WR)和片选信号(CS)等，通过控制电路以控制存储器的读或写操作以及片选。只有片选信号处于有效状态，存储器才能与外界交换信息。

## 5.2 随机存取存储器

随机存取存储器(RAM)既可以读出，也可以写入。读出时并不损坏原来存储的内容，只有写入时才修改原来所存储的内容。断电后，存储内容立即消失，即具有易失性。它用于保存各种处理器需要使用的数据，可以加快计算机的运算速度。RAM可分为静态(static RAM，SRAM)和动态(dynamic RAM，DRAM)两种。常用静态内存(SRAM)作为系统的高速缓存(通常用于一级缓存和二级缓存)，而平常所提到的内存指的是动态内存，即DRAM。

## 1. SRAM 基本存储电路

SRAM 的基本存储电路，是由 6 个 MOS（金属氧化物半导体）管组成的 RS 触发器，如图 5-4 所示。

<div style="text-align: center;"><div style="text-align: center;">(a) 电路图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 表示符号</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5-4 六管静态存储电路</div> </div>

在图5-4中， $ T_{3} $、 $ T_{4} $为负载管， $ T_{1} $、 $ T_{2} $交叉耦合组成了一个RS触发器，具有两个稳定状态。在A点（相当于Q端）与B点（相当于Q端）可以分别寄存信息1和0。 $ T_{5} $、 $ T_{6} $为行向选通门，受行选线上的电平控制。 $ T_{7} $、 $ T_{8} $为列向选通门，受列选线上的电平控制。由此，组成了双译码方式。当行选线与列选线上的信号都为高电平时，则分别将 $ T_{5} $、 $ T_{6} $与 $ T_{7} $、 $ T_{8} $导通，使A、B两点的信息经D与 $ \overline{D} $两点分别送至输入输出电路的I/O线及 $ \overline{I/Q} $线上，从而存储器某单元位线上的信息同存储器外部的数据线相通。这时，就可以对该单元位线上的信息进行读写操作。

写入时，被写入的信息从 I/O 和 I/O 线输入。如写 1 时，使 I/O 线为高电平，I/O 线为低电平，经  $ T_{7} $、 $ T_{5} $ 与  $ T_{8} $、 $ T_{6} $ 分别加至 A 端和 B 端，使  $ T_{1} $ 截止而  $ T_{2} $ 导通，于是 A 端为高电平，触发器为存 1 的稳态；反之亦然。

读出时，只要电路被选中， $ T_{5} $、 $ T_{6} $ 与  $ T_{7} $、 $ T_{8} $ 导通，则 A 端与 B 端的电位就会送到 I/O 及  $ \overline{I/O} $ 线上。若原存的信息为 1，则 I/O 线上为 1， $ \overline{I/O} $ 线上为 0；反之亦然。读出信息时，触发器的状态不受影响，故为非破坏性读出。

## 2. SRAM 的组成

SRAM 的结构组成原理图，如图 5-5 所示。存储体是一个由  $ 64 \times 64 = 4096 $ 个六管静态存储电路组成的存储矩阵。在存储矩阵中，X 地址译码器输出端提供  $ X_0 \sim X_{63} $ 计 64 根行选择线，而每一行选择线接在同一行中的 64 个存储电路的行选端，故行选择线能同时为该行 64 个行选端提供行选择信号。Y 地址译码器输出端提供  $ Y_0 \sim Y_{63} $ 计 64 根列选择线，而同一列中的 64 个存储电路共用同一位线，故由列选择线可以同时控制它们与输入输出电路 (I/O 电路) 连通。显然，只有行、列均被选中的某个单元存储电路（即 1 位），在其 X 向选通门与 Y 向选通门同时被打开时，才能进行信息的读出和写入操作。

<div style="text-align: center;"><div style="text-align: center;">图 5-5 SRAM 结构组成原理图</div> </div>

图 5-5 中的存储体是容量为  $ 4K \times 1 $ 位的存储器，因此，它仅有一个 I/O 电路，用于存取

各存储单元中的1位信息。如果要组成字长为4位或8位的存储器，则每次存取时，同时应有4个或8个单元存储电路与外界交换信息。因此，在这种存储器中，要将列的列向选通门控制端引出线按4位或8位来分组，使每根列选择线能控制一组的列向门同时打开；相应地，I/O电路也应有4个或8个。每一组的同一位共用一个I/O电路。这样，当存储体的某个存储单元在一次存取操作中，被地址译码器输出端的有效输出电平选中时，则该单元内的4位或8位信息被一次读写完毕。

必须指出，在图5-5中所示的存储体如果是 $ 4K\times1 $位的存储矩阵，则在读写操作时每次只能存取1位信息。如果是8个 $ 4K\times1 $位的存储矩阵，则在读写操作时每次才能存取8位信息，这时的存储容量为 $ 4K\times8 $位。通常，一个RAM芯片的存储容量是有限的，需要用若干片才能构成一个实用的存储器。这样，地址不同的存储单元，可能处于不同的芯片中，因此，在选中地址时，应先选择其所属的芯片。对于每块芯片，都有一个片选控制端（CS），只有当片选端加上有效信号时，才能对该芯片进行读或写操作。一般来说，片选信号由地址码的高位译码（通过译码器输出端）产生。

## 3. SRAM 的读写过程

SRAM 的读写过程参见图 5-5。

### 1) SRAM 读出过程

① 地址码  $ A_{0} \sim A_{11} $ 加到 RAM 芯片的地址输入端，经 X 与 Y 地址译码器译码，产生行选与列选信号，选中某一存储单元，该单元中存储的代码，经一定时间，出现在 I/O 电路的输入端。I/O 电路对读出的信号进行放大、整形，送至输出缓冲寄存器。缓冲寄存器一般具有三态控制功能，没有开门控制信号，所存数据还不能送到数据总线(DB)上。

② 在送上地址码的同时，还要送上读写控制信号(R/W 或RD、WR)和片选信号(CS)。读出时，使 R/W=1，CS=0，这时，输出缓冲寄存器的三态门被打开，所存信息送至 DB 上，于是，存储单元中的信息被读出。

#### 2）SRAM 写入过程

①同 SRAM 读出过程①，先选中相应的存储单元，使其可以进行写操作。

② 将要写入的数据放在 DB 上。

③ 加上片选信号  $ \overline{CS}=0 $ 及写入信号 R/ $ \overline{W}=0 $。这两个有效控制信号打开三态门使 DB 上的数据进入输入电路，送到存储单元的位线上，从而写入该存储单元。

## 4. SRAM 芯片举例

常用的 SRAM 芯片有 Intel 6116、6264、62256、628128、628512、6281024 等。

例如，Intel 6116 是一个  $ 2K \times 8 $ 位的 CMOS SRAM 芯片，属双列直插式、24 条引脚封装。它的存储容量为  $ 2K \times 8 $ 位，其引脚图及内部结构框图如图 5-6 所示。

Intel 6116 芯片内部的存储体是一个由  $ 128 \times 128 = 16384 $ 个静态存储电路组成的存储矩阵。 $ A_0 \sim A_{10} 11 $ 根地址线供对其进行行地址、列地址译码，以便对  $ 2^{11} = 2048 $ 个存储单元进行选址。每当选中一个存储单元，将从该存储单元中同时读或写 8 位二进制信息，故 Intel 6116 有 8 根数据输入输出线 I/O₀～I/O₇。Intel 6116 存储矩阵内部基本存储电路上的信息，正是通过 I/O 控制电路和数据输入输出缓冲器与 CPU 的数据总线连通的。数据

<div style="text-align: center;"><div style="text-align: center;">(a) 引脚图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 内部结构框图</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5-6 Intel 6116 芯片的引脚图及内部结构框图</div> </div>

的读出或写入将由片选允许信号 $ \overline{CE} $、写允许信号 $ \overline{WE} $以及数据输出允许信号 $ \overline{OE} $一起控制。当 $ \overline{CE} $有效而 $ \overline{WE} $为低电平时，1门导通，使数据输入缓冲器打开，信息由 $ I/O_{0}\sim I/O_{7} $写入被选中的存储单元；当 $ \overline{CE} $与 $ \overline{OE} $同时有效而 $ \overline{WE} $为高电平时，2门导通，使数据输出缓冲器打开，CPU从被选中的存储单元由 $ I/O_{0}\sim I/O_{7} $读出信息送往数据总线。无论是写入或读出，一次都是读写8位二进制信息。

Intel 6264 芯片的结构及工作原理与 Intel 6116 相似，是一个存储容量为  $ 8K \times 8 $ 位的 CMOS SRAM 芯片，其外部引脚如图 5-7 所示。它有 28 条引脚，包括 13 根地址线  $ (A_{12} \sim A_{0}) $、8 根双向数据线  $ (D_{7} \sim D_{0}) $ 以及 4 根控制线（片选信号线  $ \overline{CS}_{1} $、 $ \overline{CS}_{2} $、输出允许信号 OE 与写允许信号），另外，还有 3 根其他信号线  $ (+5V $ 电源端  $ V_{CC} $、接地端 GND、空端 NC) $。这些引脚的功能及其用法是很容易理解的，不再赘述。

需要补充的是，Intel 6264 芯片有两个片选端  $ \mathrm{CS}_{1} $ 与  $ \mathrm{CS}_{2} $，在 CPU 选择 Intel 6264 芯片时，必须使其两个片选信号  $ \overline{\mathrm{CS}_{1}} $ 与  $ \mathrm{CS}_{2} $ 同时有效才行。事实上，一个微机系统的内存空间通常是由若干块存储器芯片组成的，各个存储器芯片究竟映射到内存空间的哪一段地址区间，是由高位地址信号决定的。系统中的一组高位地址信号和控制信号通过译码器译码可产生对应的一组片选信号，但每次只有一个特定的高位地址会将某个存储器芯片映射到所需要的地址范围上。

<div style="text-align: center;"><div style="text-align: center;">图 5-7 Intel 6264 SRAM 外部引脚图</div> </div>

### 5.2.2. 动态随机存取存储器

动态随机存取存储器（DRAM）芯片是以 MOS 管栅极电容是否充有电荷来存储信息的，其基本单元电路一般由四管、三管和单管组成，以三管和单管较为常用。由于它所需要的管子较少，故可以扩大每片存储器芯片的容量，并且其功耗较低，所以在微机系统中，大多数采用 DRAM 芯片。

## 1. 动态基本存储电路

下面重点介绍常用的三管和单管两种基本存储电路。

### 1）三管动态基本存储电路

三管动态基本存储电路如图5-8所示，它由 $ T_{1} $、 $ T_{2} $、 $ T_{3} $ 3个管子和两条字选择线（读、写选择线），以及两条数据线（读、写数据线）组成。

写选择线)，以及两条数据线(读、写数据线)组成。 $ T_{1} $ 是写数控制管； $ T_{2} $ 是存储管，用它的栅极电容  $ C_{g} $ 存储信息； $ T_{3} $ 是读数控制管； $ T_{4} $ 是一列基本存储电路上共同的预充电管，以控制对输出电容  $ C_{D} $ 的预充电。

写入操作时，写选择线上为高电平， $ T_{1} $ 导通。待写入的信息由写数据线通过  $ T_{1} $ 加到  $ T_{2} $ 管的栅极上，对栅极电容  $ C_{g} $ 充电。若写入1，则  $ C_{g} $ 上充有电荷；若写入0，则  $ C_{g} $ 上无电荷。写操作结束后， $ T_{1} $ 截止，信息被保存在电容  $ C_{g} $ 上。

<div style="text-align: center;"><div style="text-align: center;">图 5-8 三管动态基本存储电路</div> </div>

读出操作时，先在  $ T_{4} $ 管栅极加上预充电脉冲，使  $ T_{4} $ 管导通，读数据线因有寄生电容  $ C_{D} $ 而

预充到  $ 1(V_{DD}) $ 。然后使读选择线为高电平， $ T_{3} $ 管导通。若  $ T_{2} $ 管栅极电容  $ C_{g} $ 上已存有1信息，则  $ T_{2} $ 管导通。这时，读数据线上的预充电荷将通过  $ T_{3} $、 $ T_{2} $ 而泄放，于是，读数据线上为0。若  $ T_{2} $ 管栅极电容上所存为0信息， $ T_{2} $ 管不导通，则读数据线上为1。因此，经过读操作，在读数据线上可以读出与原存储相反的信息。若再经过读出放大器反相后，就可以得到原存储信息了。

对于三管动态基本存储电路，即使电源不掉电， $ C_{g} $ 的电荷也会在几毫秒之内逐渐泄漏掉，而丢失原存1信息。为此，必须每隔1～3ms定时对 $ C_{g} $充电，以保持原存信息不变，此即动态存储器的刷新（或称再生）。

刷新要有刷新电路，若周期性地读出信息，但不往外输出（这由读信号RD为高电平来保证），经三态门（由刷新信号RFSH为低电平时使其导通）反相，再写入 $ C_{g} $，就可实现刷新。

#### 2）单管动态基本存储电路

单管动态基本存储电路如图5-9所示，它由 $ T_{1} $管和寄生电容 $ C_{s} $组成。

写入时，使字选线上为高电平， $ T_{1} $ 管导通，待写入的信息由位线 D（数据线）存入  $ C_{s} $。

读出时，同样使字选线上为高电平， $ T_{1} $ 管导通，则存储在  $ C_{s} $ 上的信息通过  $ T_{1} $ 管送到 D 线上，再通过放大，即可得到存储信息。

为了节省面积，电容  $ C_{S} $ 不可能做得很大，一般使  $ C_{S} < C_{D} $。这样，读出 1 和 0 时电平差别不大，故需要鉴别能力高的读出放大器。此外， $ C_{S} $ 上的信息被读出后，其已存的电压由 0.2V 下降为 0.1V。这是一个破坏性读出，要保持原存信息，读出后必须重写。因此，使用单管电路，其外围电路比较复杂。但由于使用管子最少，4KB 以上容量较大的 RAM，大多采用单管电路。

<div style="text-align: center;"><div style="text-align: center;">图 5-9 单管动态基本存储电路</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5-10 Intel 2116 引脚及逻辑符号</div> </div>

## 2. 动态 RAM 芯片举例

Intel 2116 单管动态 RAM 芯片的引脚和逻辑符号如图 5-10 所示。Intel 2116 的引脚名称如表 5-2 所示。

<div style="text-align: center;"><div style="text-align: center;">表 5-2 Intel 2116 的引脚名称</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>引脚</td><td style='text-align: center; word-wrap: break-word;'>名称</td><td style='text-align: center; word-wrap: break-word;'>引脚</td><td style='text-align: center; word-wrap: break-word;'>名称</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ A_{0} \sim A_{6} $</td><td style='text-align: center; word-wrap: break-word;'>地址输入</td><td style='text-align: center; word-wrap: break-word;'>$ \overline{WE} $</td><td style='text-align: center; word-wrap: break-word;'>写(或读)允许</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ \overline{CAS} $</td><td style='text-align: center; word-wrap: break-word;'>列地址选通</td><td style='text-align: center; word-wrap: break-word;'>$ V_{BB} $</td><td style='text-align: center; word-wrap: break-word;'>电源(-5V)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ \overline{RAS} $</td><td style='text-align: center; word-wrap: break-word;'>行地址选通</td><td style='text-align: center; word-wrap: break-word;'>$ V_{CC} $</td><td style='text-align: center; word-wrap: break-word;'>电源(+5V)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ D_{IN} $</td><td style='text-align: center; word-wrap: break-word;'>数据输入</td><td style='text-align: center; word-wrap: break-word;'>$ V_{DD} $</td><td style='text-align: center; word-wrap: break-word;'>电源(+12V)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ D_{OUT} $</td><td style='text-align: center; word-wrap: break-word;'>数据输出</td><td style='text-align: center; word-wrap: break-word;'>$ V_{SS} $</td><td style='text-align: center; word-wrap: break-word;'>地</td></tr></table>

Intel 2116 芯片的存储容量为  $ 16K \times 1 $ 位（简写  $ 16K \times 1 $），需用 14 条地址输入线，但 2116 芯片只有 16 条引脚。由于受封装引线的限制，只用了  $ A_0 \sim A_6 $ 7 条地址输入线，数据线只有 1 条（1 位），而且数据输入  $ (D_{IN}) $ 和输出  $ (D_{OUT}) $ 端是分开的，它们有各自的锁存器。写允许信号  $ \overline{WE} $ 为低电平时允许写入，为高电平时可以读出，如表 5-2 所示，它需要 3 种电源。

Intel 2116 芯片的内部结构如图 5-11 所示。

为了解决用7条地址输入线传送14位地址码的矛盾，2116芯片采用地址线分时复用技术，用 $ A_{0}\sim A_{6} $ 7根地址线分两次将14位地址按行、列两部分分别引入芯片，即先把7位行地址 $ A_{0}\sim A_{6} $ 在行地址选通信号RAS有效时，通过2116芯片的 $ A_{0}\sim A_{6} $ 地址输入线送至行地址锁存器，而后把7位列地址 $ A_{7}\sim A_{13} $ 在列地址选通信号CAS有效时，通过2116芯片的 $ A_{0}\sim A_{6} $ 地址输入线送至列地址锁存器，从而实现了14位地址码的传送。

7位行地址码经行译码器译码后，某一行的128个基本存储电路都被选中，而列译码器只选通128个基本存储电路中的一个（即1位），经列放大器放大后，在定时控制发生器及写

<div style="text-align: center;"><div style="text-align: center;">图 5-11 Intel 2116 芯片内部结构框图</div> </div>

信号锁存器的控制下送至 I/O 电路。

Intel 2116 芯片没有片选信号CS，它的行地址选通信号RAS兼作片选信号，且在整个读、写周期中均处于有效状态，这是与其他芯片的不同之处。

此外，地址输入线  $ A_{0} \sim A_{6} $ 还用作刷新地址的输入端，刷新地址由 CPU 内部的刷新寄存器 R 提供。

与 Intel 2116 芯片类似的还有 2164、3764、4164 等 DRAM 芯片。

综上所述，动态基本存储电路所需管子的数目比静态的要少，提高了集成度，降低了成本，存取速度快。但由于要刷新，需要增加刷新电路，外围控制电路比较复杂。静态RAM尽管集成度低一些，但静态基本存储电路工作较稳定，也不需要刷新，所以外围控制电路比较简单。究竟选用哪种RAM，要综合比较各方面的因素决定。

## 5.3 只读存储器

只读存储器(read only memory, ROM)只能读出原有的内容，不能由用户再写入新内容。原来存储的内容是采用掩膜技术由厂家一次性写入的，并永久保存下来。它一般用来存放专用的固定程序和数据，不会因断电而丢失。

### 5.3.1 只读存储器存储信息的原理和组成

ROM 的存储元件如图 5-12 所示，它可以看作一个单向导通的开关电路。当字线上加有选中信号时，如果电子开关 S 是断开的，位线 D 上将输出信息 1；如果 S 是接通的，则位线 D 经  $ T_{1} $ 接地，将输出信息 0。

ROM 的组成结构与 RAM 相似，一般也是由地址译码电路、存储矩阵、读出电路及控制电路等组成。图 5-13 是有 16 个存储单元、字长为 1 位的 ROM 示意图。16 个存储单元，地址码应为 4 位，因采用复合译码方式，其行地址译码和列地址译码各占 2 位地址码。对某一

固定地址单元而言，仅有一根行选线和一根列选线有效，其相交单元即为选中单元，再根据被选中单元的开关状态，数据线上将读出0或1信息。例如，若地址  $ A_{3} \sim A_{0} $ 为0110，则行选线  $ X_{2} $ 及列选线  $ Y_{1} $ 有效（输出低电平），图中，有 * 号的单元被选中，其开关 S 是接通的，故读出的信息为 0。当片选信号有效时，打开三态门，被选中单元所存信息即可送至外面的数据总线上。图5-13中所示仅是16个存储单元的1位，8个这样的阵列才能组成一个  $ 16 \times 8 $ 位的ROM存储器。

<div style="text-align: center;"><div style="text-align: center;">图 5-12 ROM 存储元件</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5-13 16×1 位 ROM 结构图</div> </div>

## 1. 不可编程掩膜式 MOS 只读存储器

不可编程掩膜式 MOS ROM 又称为固定存储器，其内部存储矩阵的结构如图 5-13 所示。它是由器件制造厂家根据用户事先编好的机器码程序，把 0、1 信息存储在掩膜图形中而制成的 ROM 芯片。这种芯片制成以后，它的存储矩阵中每个 MOS 管所存储的信息 0 或 1 被固定下来，不能再改变，而只能读出。如果要修改其内容，只有重新制造。因此，它只适用于大批量生产，不适用于科学研究。

## 2. 可编程只读存储器

为了克服上述掩膜式 MOS ROM 芯片不能修改内容的缺点，设计了一种可编程序的只读存储器（programmable ROM，PROM），用户在使用前可以根据自己的需要编制 ROM 中的程序。

熔丝式 PROM 的存储电路相当于图 5-12 的元件原理图，其中的电子开关 S 改为一段熔丝，熔丝可用镍铬丝或多晶硅制成。假定在制造时，每一单元都由熔丝接通，则存储的都是 O 信息。如果用户在使用前根据程序的需要，利用编程写入器对选中的基本存储电路通

以20～50mA的电流，将熔丝烧断，则该单元将存储信息1。这样，便完成了程序修改。由于熔丝烧断后，无法再接通，所以，PROM只能一次编程。编程后，不能再修改。

## 3. 可擦除、可再编程的只读存储器

PROM 芯片虽然可供用户进行一次修改程序，但仍很局限。为了便于开展研究工作，试验各种 ROM 程序方案，就研制了一种可擦除、可再编程的 ROM（erasable PROM，EPROM）。

在 EPROM 芯片出厂时，它是未编程的。若 EPROM 中写入的信息有错或不需要时，可用两种方法来擦除原存的信息。一种是利用专用的紫外线灯对准芯片上的石英窗口照射15～20min，即可擦除原写入的信息，以恢复出厂时的状态，经过照射擦除了原写入信息后的EPROM，就可以再写入信息。写好信息的EPROM为防止光线照射，常用遮光胶纸贴于窗口上。这种方法只能把存储的信息全部擦除后再重新写入，它不能只擦除个别单元或某几位的信息，而且擦除的时间也很长。

还有一种方法是采用金属-氮-氧化物-硅(NMOS)工艺来生产NMOS型PROM，它是一种利用电来改写的可编程只读存储器，即 $ E^{2} $PROM，这种只读存储器能解决上述问题。当需要改写某存储单元的信息时，只要让电流通入该存储单元，就可以将其中的信息擦除并重新写入信息，而其余未通入电流的存储单元的信息仍然保留。用这种方法改写数万次，只需要0.1~0.6s，信息存储时间可达十余年之久，这给需要经常修改程序和参数的应用领域带来了极大的方便。但是， $ E^{2} $PROM有存取时间较慢，完成改写程序需要较复杂的设备等缺点。现在正在迅速发展和应用高密度、高存取速度的 $ E^{2} $PROM技术和闪存(Flash Memory)技术。

## 1. Intel 2732 芯片

Intel 2732 EPROM 芯片的容量为  $ 4K \times 8 $ 位，采用 HNMOS-E（高速 NMOS 硅栅）工艺制造和双列直插式封装，其引脚如图 5-14 所示。

Intel 2732 EPROM 芯片有 24 条引脚。

 $ A_{11}\sim A_{0} $ ：12条地址输入线，可寻址2732芯片内部的4KB存储单元。

 $ O_{7}\sim O_{0} $: 8位数据输入、输出线，都通过缓冲器输入、输出。

 $ \overline{CE} $与 $ \overline{OE} $:2条控制线。 $ \overline{CE} $为片选控制线，低电平有效。 $ \overline{OE} $为芯片编程后存储单元信息读出控制线，低电平有效。

 $ V_{pp} $：编程电源。 $ V_{pp} $与OE共用一条引脚，在编程

<div style="text-align: center;"><div style="text-align: center;">图 5-14 Intel 2732 EPROM 芯片的引脚</div> </div>

时应输入规定的编程电压，一般 $ V_{PP} $有+12.5V和+25V两种。

 $ V_{cc} $：工作电压，为+5V。

GND：地线。

Intel 2732 EPROM 的工作方式如表 5-3 所示。

<div style="text-align: center;"><div style="text-align: center;">表 5-3 Intel 2732 EPROM 的工作方式</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">工作方式</td><td colspan="5">引脚</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ \overline{CE} $(18)</td><td style='text-align: center; word-wrap: break-word;'>$ \overline{OE}/V_{pp} $(20)</td><td style='text-align: center; word-wrap: break-word;'>$ A_g $(22)</td><td style='text-align: center; word-wrap: break-word;'>$ V_{cc} $(24)</td><td style='text-align: center; word-wrap: break-word;'>输出(9～11.13～17)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>读</td><td style='text-align: center; word-wrap: break-word;'>$ V_{IL} $</td><td style='text-align: center; word-wrap: break-word;'>$ V_{IL} $</td><td style='text-align: center; word-wrap: break-word;'>×</td><td style='text-align: center; word-wrap: break-word;'>+5V</td><td style='text-align: center; word-wrap: break-word;'>$ D_{OUT} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>输出禁止</td><td style='text-align: center; word-wrap: break-word;'>$ V_{IL} $</td><td style='text-align: center; word-wrap: break-word;'>$ V_{IH} $</td><td style='text-align: center; word-wrap: break-word;'>×</td><td style='text-align: center; word-wrap: break-word;'>+5V</td><td style='text-align: center; word-wrap: break-word;'>高阻抗</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>待机</td><td style='text-align: center; word-wrap: break-word;'>$ V_{IH} $</td><td style='text-align: center; word-wrap: break-word;'>×</td><td style='text-align: center; word-wrap: break-word;'>×</td><td style='text-align: center; word-wrap: break-word;'>+5V</td><td style='text-align: center; word-wrap: break-word;'>高阻抗</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>编程</td><td style='text-align: center; word-wrap: break-word;'>$ V_{IL} $</td><td style='text-align: center; word-wrap: break-word;'>$ V_{pp} $</td><td style='text-align: center; word-wrap: break-word;'>×</td><td style='text-align: center; word-wrap: break-word;'>+5V</td><td style='text-align: center; word-wrap: break-word;'>$ D_{IN} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>编程禁止</td><td style='text-align: center; word-wrap: break-word;'>$ V_{IH} $</td><td style='text-align: center; word-wrap: break-word;'>$ V_{pp} $</td><td style='text-align: center; word-wrap: break-word;'>×</td><td style='text-align: center; word-wrap: break-word;'>+5V</td><td style='text-align: center; word-wrap: break-word;'>高阻抗</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>读标识码</td><td style='text-align: center; word-wrap: break-word;'>$ V_{IL} $</td><td style='text-align: center; word-wrap: break-word;'>$ V_{IL} $</td><td style='text-align: center; word-wrap: break-word;'>$ V_{H} $</td><td style='text-align: center; word-wrap: break-word;'>+5V</td><td style='text-align: center; word-wrap: break-word;'>标识码</td></tr></table>

与 Intel 2732 属于同一类的常用 EPROM 芯片还有 2764、27128、27256、27512 及 271024 等，它们的内部结构与外部引脚分配基本相同，主要是存储容量逐次成倍递增为  $ 4K \times 8 $ 位、 $ 8K \times 8 $ 位、 $ 16K \times 8 $ 位、 $ 32K \times 8 $ 位、 $ 64K \times 8 $ 位及  $ 128K \times 8 $ 位等。

## 2.  $ E^{2} $ PROM 芯片举例

常用的  $ E^{2} $PROM 芯片有 2816/2816A、2817/2817A、2864A 等，其中，以 2864A 的  $ 8K \times 8b $ 容量大，与 6264 兼容。其主要特点是能像 SRAM 芯片一样读写操作，读访问时间可为 45～450ns，在写之前自动擦除原内容。但它并不能像 RAM 芯片那样随机读写，而只能有条件地写入，即只有当一个字节或一页数据编程写入结束后，方可以写入下一个字节或下一页数据。在  $ E^{2} $PROM 的应用中，若需读其某一个单元的内容，只要执行一条存储器读指令，即可读出；若需对其内容重新编程，可在线直接用字节写入或页写入方式写入。

## 3. Flash ROM 芯片

常用的 Flash ROM 芯片类型和型号很多。例如，AMD 28F020/12V（2M）、29F002（N）T/5V（2M）、29F400BT/5V（4M）等；Intel E82802AB/3.3V（4M）、E82802AC/3.3V（8M）等。

在 Pentium CPU 以上的主板中普遍采用了 Flash ROM 芯片来作为 BIOS 程序的载体。Flash ROM 也称为闪速存储器，在本质上属于  $ E^{2} $PROM。平常情况下 Flash ROM 与 EPROM 一样是禁止写入的，在需要时，加入一个较高的电压就可以写入或擦除。为预防误操作删除 Flash ROM 中的内容导致系统瘫痪，一般在 Flash ROM 中固化了一小块启动程序（BOOT BLOCK）用于紧急情况下接管系统的启动。

一般主板上有关 Flash ROM 的跳线开关用于设置 BIOS 的只读/可读写状态。关机后在主板上找到它将其设置为可写(Enable 或 Write)，重新开机，即可重写 BIOS 升级。Flash ROM 升级需要两个软件：一个是 Flash ROM 写入程序，一般由主板附带的驱动程序盘提供；另一个是新版 BIOS 的程序数据，需要到 Internet 或 BBS 上下载。升级前检查 BIOS 数据的编号及日期，确认它是否比本机正使用的 BIOS 版本更新，同时也应检查它与现行 BIOS 是否是同一产品系列，如 TX 芯片组的 BIOS 不宜用于 VX 的主板，避免出现不兼容问题。BIOS 升级程序只能在 DOS 实模式运行，因此，开机启动时应按 F5 跳过 Config.sys。

和 Autoexec.bat，并且不能进入 Windows。

## 5.4 存储器的扩充及其与 CPU 的连接

本节要解决两个问题：一是如何用容量较小、字长较短的芯片，组成微机系统所需的存储器；二是存储器与CPU的连接方法与应注意的问题。

## 1. 位扩充

一块实际的存储芯片，其存储单元的位数（即字长）通常与实际内存单元的字长并不相等。例如，SRAM 芯片 2114 为  $ 1K \times 4 $ 位，DRAM 芯片 2164 为  $ 64K \times 1 $ 位等。显然，要用这些芯片来构成实际上按字节组织的内存空间，就需要进行位的扩充，以满足字长的要求。

用1位或4位的存储器芯片构成8位字长的存储器，可采用位并联的方法。例如，可以用两片 $ 4K\times4 $位（简写 $ 4K\times4 $）的存储器芯片经位扩充构成4KB的存储器，如图5-15所示。这时，每个单元中的8位二进制数被分别存放在两块芯片上，即一个芯片存储该单元内容的高4位，另一个芯片存放该单元内容的低4位，而两芯片的地址线及控制线则分别并联在一起。

<div style="text-align: center;"><div style="text-align: center;">图 5-15 用  $ 4K \times 4 $ 位 SRAM 芯片进行位扩展以构成容量为 4KB 的存储器</div> </div>

## 2. 字扩充

字扩充即存储容量的扩充（又称地址的扩充）。当扩充存储容量时，采用地址串联的方法。这时，要用到地址译码电路，以其输入的地址码来区分高位地址，而以其输出端的控制线来对具有相同低位地址的几片存储器芯片进行片选。

地址译码电路是可以将地址码翻译成相应控制信号的电路。例如，图5-16所示是一个2-4译码器，输入端 $ A_{0} $、 $ A_{1} $为2位地址码，输出为4根控制线，对应于地址码的4种状态，不论地址码 $ A_{0} $、 $ A_{1} $为何值，输出总是只有一根线处于有效状态，如逻辑关系表中所示，输出以低电平有效。

<div style="text-align: center;"><div style="text-align: center;">(b) 逻辑关系表</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5-16 2-4 译码器</div> </div>

【例 5-1】图 5-17 是用 4 片  $ 16K \times 8 $ 位（简称  $ 16K \times 8 $）的存储器芯片（或是经过位扩充的芯片组）组成  $ 64K \times 8 $ 位存储器连接线路。

<div style="text-align: center;"><div style="text-align: center;">图 5-17 用  $ 16K \times 8 $ 位芯片组成  $ 64K \times 8 $ 位存储器</div> </div>

16K 存储器芯片的地址为 14 位，而 64K 存储器的地址码应有 16 位。连接时，各芯片的 14 位地址线可直接接地址总线的  $ A_{0} \sim A_{13} $，而地址总线的  $ A_{15} $、 $ A_{14} $ 则接到 2-4 译码器的输入端，其输出端 4 根选择线分别接到 4 片芯片的片选  $ \overline{CS} $ 端。因此，在任一地址码时，仅有一片芯片处于被选中的工作状态，各芯片的取值范围如表 5-4 所示。

<div style="text-align: center;"><div style="text-align: center;">表 5-4 存储器芯片取址范围</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="3">地址</td><td rowspan="2">译码器输出</td><td rowspan="2">选中的芯片</td><td rowspan="2">地址范围</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ A_{15} $</td><td style='text-align: center; word-wrap: break-word;'>$ A_{14} $</td><td style='text-align: center; word-wrap: break-word;'>$ A_{13} \sim A_{0} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>从全0到全1</td><td style='text-align: center; word-wrap: break-word;'>$ \overline{Y}_{0} $</td><td style='text-align: center; word-wrap: break-word;'>1号</td><td style='text-align: center; word-wrap: break-word;'>0000H~3FFFH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>从全0到全1</td><td style='text-align: center; word-wrap: break-word;'>$ \overline{Y}_{1} $</td><td style='text-align: center; word-wrap: break-word;'>2号</td><td style='text-align: center; word-wrap: break-word;'>4000H~7FFFH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>0</td><td style='text-align: center; word-wrap: break-word;'>从全0到全1</td><td style='text-align: center; word-wrap: break-word;'>$ \overline{Y}_{2} $</td><td style='text-align: center; word-wrap: break-word;'>3号</td><td style='text-align: center; word-wrap: break-word;'>8000H~BFFFH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>1</td><td style='text-align: center; word-wrap: break-word;'>从全0到全1</td><td style='text-align: center; word-wrap: break-word;'>$ \overline{Y}_{3} $</td><td style='text-align: center; word-wrap: break-word;'>4号</td><td style='text-align: center; word-wrap: break-word;'>C000H~FFFFH</td></tr></table>

当需要同时位扩充与字扩充时，可以将上述两种方法结合起来使用。例如，当用 $ 16K\times1 $位的芯片组成 $ 64K\times8 $位的存储器时，共需用32片 $ 16K\times1 $位的芯片。先用位线并联方法将每8片组成一组 $ 16K\times8 $位存储器，再用字扩充方法，选用2-4译码器组成的译码电路，组成4组 $ 16K\times8 $位共 $ 64K\times8 $位存储器。

## 1. 只读存储器与 8086 CPU 的连接

ROM、PROM 和 EPROM 芯片都可以与 8086 系统总线连接，以组成程序存储器。例如，Intel 2716、2732、2764 和 27128 这一类 EPROM 芯片，由于它们是以 1B 宽度输出组织的，因此，在连接到 8086 系统时，为了存储 16 位指令字，要使用两片这类芯片并联组成一组。图 5-18 给出了两片 2732 EPROM 组成 4K 字的程序存储器再与 8086 系统总线连接的示意图。

由于2732芯片是一个4K×8位的EPROM芯片，所以该存储器子系统可提供4K字的程序存储器（即存放指令代码的只读存储器）。图5-18中，上、下两片2732芯片分别代表高8位与低8位存储体；为了能寻址4K字存储单元，将8086系统的 $ A_{12}\sim A_{1} $12根地址线接至两片2732的 $ A_{11}\sim A_{0} $引脚上；8086其余的高位地址线和M/IO（为高电平）以及 $ A_{0} $或 $ \overline{BHE} $（图中未画出）用来加译码，以产生两个片选信号 $ \overline{CS_{1}} $与 $ \overline{CS_{2}} $，并分别接至上、下两片2732的片选端 $ \overline{CE} $，而两片2732的输出允

<div style="text-align: center;"><div style="text-align: center;">图 5-18 两片 2732 组成 4K 字的程序 存储器再与 8086 系统 总线连接</div> </div>

许端OE将和8086系统的控制信号RD（最小模式时）或MRDC（最大模式时）连接，只有在CE和OE同时为低电平时，2732才能把被选中存储单元的指令代码读出到数据总线上。

## 2. 静态 RAM 与 8086 CPU 的连接

一般来说，当微机系统的存储器容量少于16K字时，宜采用静态RAM芯片，因为大多数动态RAM芯片都是以 $ 16K\times1 $位或 $ 64K\times1 $位来组织的，并且动态RAM芯片还要求动态刷新电路，这种附加的支持电路会增加存储器的成本。

8086 CPU 无论是在最小模式或最大模式下，都可以寻址 1MB 的存储单元，存储器均按字节编址。图 5-19 所示为由两片 6116 组成 2K 字的数据存储器即读写存储器子系统。

<div style="text-align: center;"><div style="text-align: center;">图 5-19 两片 6116 组成 2K 字的数据存储器</div> </div>

存储器芯片选用 SRAM 6116 (2K × 8 位)。该存储器子系统接成最小工作模式，由两片 6116 构成 2K 字的数据存储器。8086 可以通过软件从存储器中读取字节、字和双字数据。

图5-19中，上面的一片6116用作低8位RAM存储体，它的I/O引线和数据总线 $ D_{7}\sim D_{0} $相连，它代表了偶数地址字节数据；下面的一片6116用作高8位RAM存储体，它的I/O引线和数据总线 $ D_{15}\sim D_{8} $相连，它代表了奇数地址字节数据。利用 $ A_{0} $与 $ \overline{BHE} $可对偶数地址的低位库与

奇数地址的高位库分别进行选择。数据的读出或写入，在保持 6116 的片选信号CE为低电平的同时，将取决于输出允许信号  $ \overline{OE} $ 或者写允许信号  $ \overline{WE} $ 为低电平。例如，在执行偶地址边界上的字操作时，8086 将使  $ A_{0} $ 与  $ \overline{BHE} $ 都为低电平。这样，两个存储体都被允许执行读写操作，读写数据的高位字节和低位字节将同时在 16 位数据总线上传送。若此时  $ \overline{OE}=0 $ 而  $ \overline{WE}=1 $，则字数据将从所选中的存储单元读出；反之，若此时  $ \overline{OE}=1 $ 而  $ \overline{WE}=0 $，则字数据将从数据总线上写入被选中的存储单元。

图5-19是一个只有两片一组其容量为2K字的RAM子系统，故只有组内两片间的高、低位库选择和片内低位寻址，而没有若干组之间的高位片选。如果RAM子系统的容量增大，需要扩充为若干组RAM芯片，那么就会涉及组与组之间的高位片选问题。当使用6116RAM芯片时，若OE与WE已分别接至8086系统的RD与WR两条控制线，则每一片6116只剩下一个片选允许信号端CE可供作为唯一的片选信号端CS来使用。这时，由于既要考虑用8086的高位地址线和M/IO（高电平）控制信号来控制CS，又要考虑用 $ A_{0} $与BHE两个信号来控制选择高、低位库，因此，必须同时通过逻辑电路来连接这些信号，以实现上述多种控制要求。从下面的例子中，将看到这种连接与控制的具体情况。

## 3. EPROM、SRAM 与 8086 CPU 连接的实例

图 5-20 给出了由 8086 CPU 组成的单处理器系统的连接实例。图中，8086 连接成最小工作模式（MN/MX）引脚置逻辑高电平）。当机器复位时，由于 CS=FFFFH，IP=0000H，故 8086 将执行 FFFF0H 单元的指令。

<div style="text-align: center;"><div style="text-align: center;">图 5-20 8086 单处理器系统连接实例</div> </div>

本系统具有 32KB 的 EPROM 区，使用了 8 片 2732（4K×8 位）EPROM 芯片，分别以  $ U_{32} \sim U_{39} $ 表示。这 8 个芯片按每两片一组分别组成 4 组 4K 字的 EPROM 区，它们分别用

 $ A_{19} \sim A_{13} $ 7 条地址线和 M/IO 线以及 RD 线作为  $ U_{22} $ 的输入信号。 $ U_{22} $ 为 74LS138 译码器。当  $ A_{19} \sim A_{16} $ 4 条地址线经与非门输出一个低电平信号接入  $ U_{22} $ 的  $ \overline{G}_{2B} $ 端，通过  $ U_{22} $ 的 4 个输出端信号  $ \overline{Y}_{4} \sim \overline{Y}_{7} $ 控制该 4 组 2732 的输出允许信号端  $ \overline{OE} $。同时，还要用 8086 的  $ A_{0} $ 与 BHE 两个信号分别接入各片的  $ \overline{CE} $ 端来控制各组内两片高、低位库的选择。显然， $ U_{32} $、 $ U_{34} $、 $ U_{36} $、 $ U_{38} $ 是受  $ A_{0} $ 控制的偶数地址低位库，而  $ U_{33} $、 $ U_{35} $、 $ U_{37} $、 $ U_{39} $ 是受  $ \overline{BHE} $ 控制的奇数地址高位库。并且 4 组 EPROM（2732）的地址范围可以很容易被确定，如表 5-5 所示。

<div style="text-align: center;"><div style="text-align: center;">表 5-5 EPROM 区地址分配表</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">组 别</td><td colspan="2">EPROM 芯片(2732)</td><td rowspan="2">地址范围</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>偶地址</td><td style='text-align: center; word-wrap: break-word;'>奇地址</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第 1 组</td><td style='text-align: center; word-wrap: break-word;'>$ U_{32} $</td><td style='text-align: center; word-wrap: break-word;'>$ U_{33} $</td><td style='text-align: center; word-wrap: break-word;'>F8000H～F9FFFFH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第 2 组</td><td style='text-align: center; word-wrap: break-word;'>$ U_{34} $</td><td style='text-align: center; word-wrap: break-word;'>$ U_{35} $</td><td style='text-align: center; word-wrap: break-word;'>FA000H～FBFFFH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第 3 组</td><td style='text-align: center; word-wrap: break-word;'>$ U_{36} $</td><td style='text-align: center; word-wrap: break-word;'>$ U_{37} $</td><td style='text-align: center; word-wrap: break-word;'>FC000H～FDFFFH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第 4 组</td><td style='text-align: center; word-wrap: break-word;'>$ U_{38} $</td><td style='text-align: center; word-wrap: break-word;'>$ U_{39} $</td><td style='text-align: center; word-wrap: break-word;'>FE000H～FFFFFH</td></tr></table>

本系统还具有16KB的RAM，使用了8片6116（2K×8位）SRAM芯片，它们分别以 $ U_{24} \sim U_{31} $表示。这8个芯片也按每两片一组分别组成4组2K字的RAM区，它们分别用 $ A_{14} $、 $ A_{13} $、 $ A_{12} $3条地址线和M/IO线以及 $ \overline{RAMEM} $线作为输入信号，通过 $ U_{20} $和 $ U_{21} $（均为74LS138译码器）各自的4个输出端信号 $ \overline{Y}_{0} \sim \overline{Y}_{3} $控制该4组6116的8个片选端 $ \overline{CE} $。同时，还要用8086的 $ A_{0} $和 $ \overline{BHE} $作为输入信号接至 $ U_{20} $和 $ U_{21} $的 $ \overline{G}_{2B} $端，通过对 $ U_{20} $和 $ U_{21} $是否允许输出有效电平的选通，来实现对4组RAM芯片内高、低位库的选择。 $ U_{20} $为偶地址译码器，它们分别选择 $ U_{24} $、 $ U_{25} $、 $ U_{28} $和 $ U_{30} $； $ U_{21} $为奇地址译码器，它们分别选择 $ U_{25} $、 $ U_{27} $、 $ U_{29} $和 $ U_{31} $。系统读（ $ \overline{RD} $）、写（ $ \overline{WR} $）信号直接接到RAM芯片的 $ \overline{OE} $和 $ \overline{WE} $端，以控制数据的传送方向。RAM芯片本身低位地址的寻址由 $ A_{11} \sim A_{0} $12条地址线决定。此外，6116剩余的 $ A_{19} \sim A_{15} $5条地址线全为0，并通过一个或门输出0电平（即 $ \overline{RAMEM} $信号）接入 $ U_{20} $和 $ U_{21} $的 $ \overline{G}_{2A} $端。这时，4组RAM的地址范围也可以很容易被确定，如表5-6所示。

<div style="text-align: center;"><div style="text-align: center;">表 5-6 静态 RAM 区地址分配表</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td rowspan="2">组别</td><td colspan="2">SRAM 芯片(6116)</td><td rowspan="2">地址范围</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>偶地址</td><td style='text-align: center; word-wrap: break-word;'>奇地址</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第 1 组</td><td style='text-align: center; word-wrap: break-word;'>$ U_{24} $</td><td style='text-align: center; word-wrap: break-word;'>$ U_{25} $</td><td style='text-align: center; word-wrap: break-word;'>00000H~00FFFH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第 2 组</td><td style='text-align: center; word-wrap: break-word;'>$ U_{26} $</td><td style='text-align: center; word-wrap: break-word;'>$ U_{27} $</td><td style='text-align: center; word-wrap: break-word;'>01000H~01FFFH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第 3 组</td><td style='text-align: center; word-wrap: break-word;'>$ U_{28} $</td><td style='text-align: center; word-wrap: break-word;'>$ U_{29} $</td><td style='text-align: center; word-wrap: break-word;'>02000H~02FFFH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>第 4 组</td><td style='text-align: center; word-wrap: break-word;'>$ U_{30} $</td><td style='text-align: center; word-wrap: break-word;'>$ U_{31} $</td><td style='text-align: center; word-wrap: break-word;'>03000H~03FFFH</td></tr></table>

## 4.32位或64位存储器接口

32位或64位存储器接口原理同上面介绍的16位存储器接口基本一致。其主要区别在于32位存储器接口与64位存储器接口需要的存储体个数分别为4个与8个。此外，由

于16位、32位或64位微处理器地址线数目的不同，它们分别所能寻址的空间大小是不同的。例如，在32位存储器接口中，微处理器有32条地址线，其寻址空间为4GB；而在Pentium系统中，微处理器可以被设置为36条地址线，其最大寻址空间则为64GB。至于在存储器接口中，存储体与微处理器之间的具体连接方法还涉及译码器的选用与连接等问题，这里不再赘述。

## 5.5 内存的技术发展

内存历来都是系统中最大的性能瓶颈之一，特别是在PC技术发展的初期，PC上所使用的内存是一块块的集成电路芯片（IC），且将其焊接在主板上，这给后期维护与维修都带来了许多麻烦。

随着 PC 技术的发展，PC 设计人员首次在 80286 主板上推出了模块化的条装内存，使每一条上集成了多块内存 IC，并在主板上也设计了相应的内存插槽，这样的内存条就大大方便了安装与拆卸，内存的维修与升级也变得非常简单。此后，内存条从规格、技术到总线带宽等不断更新换代，使内存的性能瓶颈问题获得较大改善。图 5-21 为多个内存条的针脚与接口设计的示意图。

<div style="text-align: center;"><div style="text-align: center;">(a) 30线 SIMM</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(d) 168线 SDRAM DIMM</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 72线 SIMM</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 184线 RAMBus RDRAM RIMM</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(e) 184线 DDR DIMM</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(f) 240线 DDR-2 DIMM</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5-21 内存条的针脚与接口设计</div> </div>

## 1. SIMM 内存

最初(1982年)出现在80286主板上的“内存条”，采用的是单边接触内存模组（single inline memory modules，SIMM）接口，容量为30线、256KB，由8片数据位和1片校验位组成1个存储区块（bank），因此一般见到的30线SIMM都是4条一起使用。

在 1988 年至 1990 年，PC 技术进入 32 位的 386 和 486 时代，推出了 72 线 SIMM 内存，它支持 32 位快速页模式内存，内存带宽得以大幅提升。72 线 SIMM 内存单条容量一般为 512KB～2MB，要求两条同时使用。

注意：72 线的 SIMM 内存引进了一个 FP DRAM（又称快速页面动态内存），在 386 时代很流行。

## 2. EDO DRAM 内存

外扩充数据模式动态存储器（extended date out DRAM，EDO DRAM）是1991年至1995年之间盛行的内存条，EDO DRAM同FP DRAM极其相似，其速度比普通的DRAM

快15%~30%。工作电压一般为5V，带宽32位，主要应用在当时的486及早期的Pentium计算机中。

随着 EDO DRAM 在成本和容量上的突破，加上制作工艺的飞速发展，当时单条 EDO DRAM 内存的容量已达到 4MB～16MB。后来由于 Pentium 及更高档的 CPU 数据总线宽度都是 64 位甚至更高，所以 EDO RAM 与 FPM RAM 都必须成对使用。

## 3. SDRAM 时代

自 Intel Celeron 系列以及 AMD K6 处理器以及相关的主板芯片组推出后，EDO DRAM 内存性能再也无法满足需要，于是内存又开始进入比较经典的 SDRAM 时代。

第一代 SDRAM 内存为 PC66 规范，之后有 PC100、PC133、PC150 等规范，其频率从早期的 66MHz，发展到 100MHz、133MHz 等。由于 SDRAM 的带宽为 64 位，正好对应 CPU 的 64 位数据总线宽度，因此它只需要一条内存便可工作，便捷性进一步提高。在性能方面，由于其输入输出信号保持与系统外频同步，因此速度明显超越 EDO 内存。

## 4. Rambus DRAM 内存

SDRAM PC133 内存的带宽可提高带宽到 1064MB/s，但仍不能满足后来 CPU 主频的提升需求，此时 Intel 与 Rambus 公司联合推出了 Rambus DRAM 内存，简称 RDRAM 内存。与 SDRAM 不同的是，它采用了新一代高速简单内存架构，基于一种类 RISC 理论，可以减少数据的复杂性，使得整个系统性能得到提高。

硬件技术竞争的特点是频率竞争，由于 CPU 主频的不断提升，Intel 公司在推出高频 Pentium Ⅲ 和 Pentium 4 CPU 的同时，推出了 Rambus DRAM 内存。Rambus DRAM 内存以高时钟频率来简化每个时钟周期的数据量，因此内存带宽相当出色，如 PC 1066，1066 MHz 32 位带宽可达到 4.2GB/s，它曾一度被认为是 Pentium 4 的绝配。

尽管如此，Rambus RDRAM 内存并未在市场竞争中立足长久，很快被更高速度的 DDR 所取代。

## 5. DDR 时代

双倍速率 SDRAM（double date rate SDRAM，DDR SDRAM）简称 DDR，实际上是 SDRAM 的升级版本，在时钟信号的上升沿和下降沿都可以传输数据，因而时钟率可以加倍提高，传输速率和带宽也相应提高。

内存发展到 SDRAM 末期，出现了 RDRAM 和 DDR 的路线之争。RDR AM 的技术核心是串行，DDR 的技术核心是数据预取。

在传统的 SDRAM 中，每次读取只能操作一个数据。DDR 扩大了缓存区，改进了读写设计，将每次读取操作的数据数量由 1 个变成 2 个（即使用了 2 位预取，记为 2n）。例如，同为 100MHz，SDRAM 在 64 位下每秒可以移动 0.8GB/s（ $ 100 \times 64 \div 8 = 800 $MB/s）的数据，DDR 在 100MHz、64 位位宽下每秒可移动的数据量就会直接提升到 1.6GB/s（ $ 100 \times 64 \times 2 \div 8 = 1600 $MB/s），它的等效频率（等效频率是假定预取依旧是 1n 的情况下，DDR 相当于 SDRAM 的频率，又称名义频率），也就是表面上的数据直接提升了一倍。

DDR SDRAM 内存有 184 个引脚，引脚部分有一个缺口，其作用是在安装内存条时防

止插反，以及用于区分不同类型的内存条。

第一代 DDR200 规范未得到普及，第二代 PC266 DDR SRAM（133MHz 时钟×2 倍数据传输 = 266MHz 带宽）是由 PC133 SDRAM 内存衍生而来（不少赛扬和 AMD K7 处理器都采用了 DDR266 规格的内存），其后来的 DDR333 内存也属于一种过渡；双通道 DDR400 内存已经成为前端总线 800FSB 处理器搭配的基本标准。

## 6. DDR2 时代

随着 CPU 性能的不断提高，对内存性能的要求也逐步升级，JEDEC 组织很早就开始酝酿 DDR2 标准。针对 PC 等市场的 DDR2 内存拥有 400MHz、533MHz、667MHz 等不同的时钟频率，高端的 DDR2 内存速度已经提升到 800MHz/1066MHz。DDR2 内存实现了在每个时钟周期处理多达 4 位的数据，比传统 DDR 内存可以处理的 2 位数据高了一倍。DDR2 内存采用 200/220/240 针脚的 FBGA 封装形式，它可以提供更良好的电气性能与散热性。LGA775 接口的 915/925 和 945 等平台都支持 DDR2 内存。

## 7. DDR3 时代

2007年，JEDEC确定了DDR3内存规范。DDR3在DDR2基础上采用新型设计，其工作电压更低，从DDR2的1.8V降落到1.5V，性能更好，更省电；从DDR2的4位预读升级为8位预读；等效频率从DDR3 800提升到DDR3 1600甚至DDR3 2133。

DDR3 已提升数据预取至 8n，若在 100MHz、64 位的环境下，DDR3 的带宽提升到 6.4GB/s（ $ 100 \times 64 \times 8 \div 8 = 6400 $MB/s），等效频率是 DDR3 800。在实际发展中，由于工艺进步，内存实际的频率出现了如 133MHz、166MHz、200MHz 甚至 266MHz 的内存，在 DDR3 上，其等效频率分别是 DDR3 1066、DDR3 1333、DDR3 1600、DDR3 2133。

面向64位构架的DDR3显然在频率和速度上拥有更多的优势，此外，由于DDR3所采用的根据温度自动自刷新、局部自刷新等其他一些功能，在功耗方面DDR3也出色得多。在CPU外频提升迅速的PC台式机领域，DDR3的应用进一步扩大。市场对DDR3内存的需求顶点在2012年达成，其市场占有率约为71%。

## 8. DDR4 时代

2012年，JEDEC又发布了新的DDR4规范。JEDEC的内存规范极其详尽，包括芯片设计、PCB层数、频率等重要参数。DDR4的主要改进如下。
