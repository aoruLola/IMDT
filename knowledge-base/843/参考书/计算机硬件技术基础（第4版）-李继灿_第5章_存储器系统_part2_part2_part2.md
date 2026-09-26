# 2. 主流 CPU 架构与制程的演进

> 来源：docs/08_电子书/计算机硬件技术基础（第4版）-李继灿.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：0c93d8c7280859f1


从2006年开始，Intel公司开发的处理器已进入Core时代。酷睿2处理器（Core 2Duo）是Intel公司2006年推出的基于Core微架构的产品体系统称，包括服务器版、桌面版、移动版3个领域。其中，服务器版的开发代号为Woodcrest，桌面版的开发代号为Conroe，移动版的开发代号为Merom。

在 2007 年，Intel 公司正式提出 Tick-Tock 模式，如图 9-1 所示，它是 Intel 公司发展微处理器芯片设计制造业务的一种发展战略模式（参见 1.2.1 节）。

<div style="text-align: center;"><div style="text-align: center;">Tick/Tock Development Model</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 9-1 Intel 公司的 Tick-Tock 发展模式</div> </div>

2008年11月，Intel公司发布了基于45nm制造工艺技术的Intel微架构（微架构更新，代号Nehalem）极大地推动了计算的发展。这是Core2架构的首次重大革新，创新点主要体现在两方面：一是将内存控制器整合到CPU内部，可支持三通道DDR3；二是引入高速QPI总线技术，便于多处理器的互联与扩展。从而实现了第二代Core架构与核芯显卡的兼容并包。

到2009年，Intel公司开始将制造工艺升级到32nm，形成Westmere。Westmere实现了六核心设计，拥有高达12MB的三级缓存。Westmere最大的创意在于将GPU整合到处理器内部。虽然Westmere仅仅是将GPU芯片同CPU封装在一起，但它在技术应用上表明Intel公司对“整合”的趋势起到了重要的推动作用。

2010年，在“工艺年”周期中，Intel公司发布了第二代智能酷睿系列产品。第二代系列产品Core i3/i5/i7全部基于全新的Sandy Bridge微架构，相比第一代产品主要有5点重要创新：①采用全新32nm的Sandy Bridge微架构，更低功耗、更强性能；②内置高性能GPU（核芯显卡），视频编码、图形性能更强；③睿频加速技术2.0，更智能、更高效能；④引入全新环形架构，带来更高带宽与更低延迟；⑤全新的指令集，加强浮点运算与加密解密运算。

2011年1月，在“架构年”周期中，Intel公司推出了基于32nm工艺技术的微架构Sandy Bridge。Sandy Bridge最引人注目的是将GPU直接集成于芯片内，做到硬件层面的

高度融合，同时 CPU 与 GPU 可以共享三级缓存，显著改善了 GPU 的性能表现。此外，Sandy Bridge 中还集成了视频引擎，可以对 1080p 高清媒体进行硬件解码，这样就不必再消耗 CPU 资源。内存控制器方面，Sandy Bridge 可以支持双通道 DDR3-1600。

2012 年 4 月，Intel 公司发布了第三代酷睿处理器（制程改进更新，代号 Ivy Bridge），采用 22nm 工艺。Ivy Bridge 架构产品延续了 LGA1155 平台。

2013年6月，Intel公司发布了代号Haswell的酷睿处理器。Haswell架构的CPU接口为Intel LGA1150，适配的主板芯片组为8系列的Z87、H87、Q87等。

2014年8月30日，Intel Haswell-E平台正式发布。该系列处理器包括Core i7 5960X、Core i7 5930K和Core i7 5820K。其中最为引人瞩目的是Core i7 5960X，它是首款面向民用桌面市场的消费级八核心十六线程产品。处理器的制程与核心数量等如表9-1所示。

<div style="text-align: center;"><div style="text-align: center;">表9-1 处理器生产工艺与晶体管数量对比</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>CPU 架构</td><td style='text-align: center; word-wrap: break-word;'>工艺</td><td style='text-align: center; word-wrap: break-word;'>核心数量</td><td style='text-align: center; word-wrap: break-word;'>GPU 架构</td><td style='text-align: center; word-wrap: break-word;'>晶体管数量</td><td style='text-align: center; word-wrap: break-word;'>核心面积( $ mm^{{2}} $)</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>Haswell-E 8C</td><td style='text-align: center; word-wrap: break-word;'>22nm</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>N/A</td><td style='text-align: center; word-wrap: break-word;'>26 亿</td><td style='text-align: center; word-wrap: break-word;'>356</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>Haswell GT2 4C</td><td style='text-align: center; word-wrap: break-word;'>22nm</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>GT2</td><td style='text-align: center; word-wrap: break-word;'>14 亿</td><td style='text-align: center; word-wrap: break-word;'>177</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>Haswell ULT GT3 2C</td><td style='text-align: center; word-wrap: break-word;'>22nm</td><td style='text-align: center; word-wrap: break-word;'>2</td><td style='text-align: center; word-wrap: break-word;'>GT3</td><td style='text-align: center; word-wrap: break-word;'>13 亿</td><td style='text-align: center; word-wrap: break-word;'>181</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>lvy Bridge-E 6C</td><td style='text-align: center; word-wrap: break-word;'>22nm</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>N/A</td><td style='text-align: center; word-wrap: break-word;'>18.6 亿</td><td style='text-align: center; word-wrap: break-word;'>257</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>lyv Bridge 4C</td><td style='text-align: center; word-wrap: break-word;'>22nm</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>GT2</td><td style='text-align: center; word-wrap: break-word;'>12 亿</td><td style='text-align: center; word-wrap: break-word;'>160</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>Sandy Bridge-E 6C</td><td style='text-align: center; word-wrap: break-word;'>32nm</td><td style='text-align: center; word-wrap: break-word;'>6</td><td style='text-align: center; word-wrap: break-word;'>N/A</td><td style='text-align: center; word-wrap: break-word;'>22.7 亿</td><td style='text-align: center; word-wrap: break-word;'>435</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>Sandy Bridge 4C</td><td style='text-align: center; word-wrap: break-word;'>32nm</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>GT2</td><td style='text-align: center; word-wrap: break-word;'>9.95 亿</td><td style='text-align: center; word-wrap: break-word;'>216</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>Lynnfield 4C</td><td style='text-align: center; word-wrap: break-word;'>45nm</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>N/A</td><td style='text-align: center; word-wrap: break-word;'>7.74 亿</td><td style='text-align: center; word-wrap: break-word;'>296</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>AMD Trinity 4C</td><td style='text-align: center; word-wrap: break-word;'>32nm</td><td style='text-align: center; word-wrap: break-word;'>4</td><td style='text-align: center; word-wrap: break-word;'>7660D</td><td style='text-align: center; word-wrap: break-word;'>13.03 亿</td><td style='text-align: center; word-wrap: break-word;'>246</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>AMD Vishera 8C</td><td style='text-align: center; word-wrap: break-word;'>32nm</td><td style='text-align: center; word-wrap: break-word;'>8</td><td style='text-align: center; word-wrap: break-word;'>N/A</td><td style='text-align: center; word-wrap: break-word;'>12 亿</td><td style='text-align: center; word-wrap: break-word;'>315</td></tr></table>

现今 x86 已经迎来计算机技术发展史上新的转折点：PC 不再是唯一的计算终端，各种移动设备陆续登台，云计算让 PC 的重要性大大削弱，ARM 架构开始对 x86 构成威胁。尽管面对这些转折，但 x86 仍是处理器最重要的架构。

## 9.1.5 CPU 指令集及其扩展

指令集是 CPU 为控制计算机系统工作而预先设计的一套操作命令的集合，而每一种新型的 CPU 在设计时就规定了一系列与其硬件电路相配合的指令系统。指令集的先进与否，关系到 CPU 的性能发挥，也是 CPU 体现性能的一个重要标志。

从主流体系结构讲，指令集可分为复杂指令集和精简指令集两部分；在现代先进的微处理器中，不仅兼容了Intel 80x86系列CPU的所有指令系统，同时也发展了新的CPU指令集。例如，Intel的MMX、SSE、SSE2、SSE3、SSE4和AMD的3DNow！等都是CPU的扩展指令集，加入了图形、视频编码、处理、三维成像及游戏应用等众多指令，使处理器在音频、图像、数据压缩算法等多方面的性能大幅提升。

## 1. MMX 指令集

MMX（multi media extension，多媒体扩展指令）指令集是 Intel 公司在 1996 年为

Pentium 系列处理器所开发的一项多媒体指令增强技术。它包含了 57 条多媒体指令，这些指令可以一次性处理多个数据。

MMX 指令与 FPU（浮点运算器）使用同样的 8 个通用寄存器，准确地说是借用了 FPU 每个寄存器的前 64 位，这样 MMX 指令一次最多可以处理 8 字节或者 4 字节或者两个双字节或者一个 4 字节的数据，理论上可以将运算速度最高提高 8 倍。MMX 与 FPU 共用寄存器证明了 Intel 公司的短视，主要问题是它不能与 x86 的浮点运算指令同时执行，而必须在进行密集式的交错切换后才可正常执行，这会造成系统运行速度的下降。

Intel 公司没有沿用 MMX 的称呼，1999 年的 Pentium Ⅲ 处理器上指令集改称 SSE。SSE 采用了单独的寄存器，解决了与 FPU 冲突的问题。8 个 128 位单独的 SSE 寄存器，支持同时处理 4 个单精度浮点数，能够同时处理的数据比 64 位的 MMX 翻了一番。SSE 一共有 70 条指令，进一步提升了 CPU 多媒体处理能力。从此，SSE 的名称固定了下来。

## 2. SSE 指令集

SSE (streaming SIMD extensions) 是 SIMD 扩展指令集，其中 SIMD (single instruction multiple data) 是单指令多数据，所以 SSE 指令集 (1999 年发布) 也称为单指令多数据流扩展。该指令集最先运用于 Pentium Ⅲ系列处理器，是为提高处理器浮点性能而开发的扩展指令集，共有 70 条指令，其中包含提高三维图形运算效率的 50 条 SIMD 浮点运算指令、12 条 MMX 整数运算增强指令、8 条优化内存中的连续数据块传输指令。这些指令对图像处理、浮点运算、三维运算和多媒体处理等多媒体的应用能力有全面的提升。SSE 指令与 AMD 公司的 3DNow! 指令彼此互不兼容，但 SSE 包含了 3DNow! 中的绝大部分功能，只是实现的方法不同而已。SSE 向下兼容 MMX 指令，它可以通过 SIMD 和单时钟周期并行处理多个浮点数据来有效地提高浮点运算速度。

## 3. 3DNow! 指令集

3DNow!(3D no waiting)是 AMD 公司开发的 SIMD 指令集，可以增强浮点和多媒体运算的速度，并被 AMD 公司广泛应用于其 K6-2、K6-3 和 Athlon(K7)处理器上，它拥有21条扩展指令集。与 Intel 公司的侧重于整数运算的 MMX 技术有所不同，3DNow! 指令集主要针对三维建模、坐标变换和效果渲染等三维数据的处理。AMD 公司后来又在 Athlon 系列处理器上开发了新的 Enhanced 3DNow! 指令集，新的增强指令数达了52个，Athlon 64系列处理器也支持 3DNow! 指令。

## 4. SSE2 指令集

Intel 公司为了应对 AMD 公司的 3Dnow! 指令集，又在 SSE 的基础上开发了 SSE2。SSE2 由 SSE 和 MMX 两部分组成，共有 144 条指令。SSE 部分主要负责处理浮点数，而 MMX 部分则专门计算整数。重要的是 SSE2 能处理 128 位和两倍精密浮点数学运算。处理更精确浮点数的能力使 SSE2 成为加速多媒体程序、3D 处理工程及工作站类型任务的基础配置。由于 SSE2 指令集与 MMX 指令集兼容，因此，被 MMX 优化过的程序很容易被 SSE2 进行更深层次的优化，达到更好的运行效果。

Intel 公司是从 Willamette 核心的 Pentium 4 开始支持 SSE2 指令集的，而 AMD 公司

则是从 K8 架构的 SledgeHammer 核心的 Opteron 开始才支持 SSE2 指令集的。

## 5. SSE3 指令集

SSE3(streaming SIMD extension 3)是Intel公司推出Prescott核心处理器时出现的。SSE3在SSE2的基础上又增加了13个额外的SIMD指令。SSE3中13个新指令的主要目的是改进线程同步和特定应用程序领域，如媒体和游戏。这些新增指令强化了处理器在浮点转换至整数、复杂算法、视频编码、SIMD浮点寄存器操作以及线程同步5方面的表现，最终达到提升多媒体和游戏性能的目的。

Intel 公司是从 Prescott 核心的 Pentium 4 开始支持 SSE3 指令集的，而 AMD 公司则是从 Troy 核心的 Opteron 开始支持 SSE3 的。需要注意的是，AMD 公司所支持的 SSE3 与 Intel 公司的 SSE3 并不完全相同，主要是删除了针对 Intel 超线程技术优化的部分指令。

## 6. SSE4 指令集

SSE4(streaming SIMD extension 4)指令集构建于 Intel 64 指令集架构，该架构被视为继 2001 年以来最重要的媒体指令集架构的改进。

SSE4 包含 54 条指令，主要分为两种：一种是矢量化编译器和媒体加速器；另一种是高效加速字符串和文本处理。

（1）矢量化编译器和媒体加速器：可提供高性能的编译器函数库，如封包（同时使用多个操作数）整数运算和浮点运算，可生成性能优化型代码。此外，它还包括高度优化的媒体相关运算，如绝对差值求和、浮点点积和内存负载等。矢量化编译器和媒体加速器指令可改进音频、视频和图像的编辑应用，提高视频编码器、3D应用和游戏的性能。

（2）高效加速字符串和文本处理：包含多个压缩字符串比较指令，允许同时运行多项比较和搜索操作。由此受益的应用包括数据库和数据采掘应用，以及利用病毒扫描和编译器等分析、搜索和模式匹配算法的应用。

在指令集的发展过程中，x86 架构的主流处理器起着重要的作用。虽然 Intel 和 AMD 公司在 x86 架构处理器上推出了一些主要的扩展指令集，对于处理器的性能提升有一定的作用，但由于受到 IA-32 体系的限制，x86 架构基本上难以出现具有突破性意义的指令集，现双方都已把重点转向 64 位体系架构的处理器指令集的开发上。

## 9.2 主 板

主板是计算机中用于连接其他硬件设备的主体部件。CPU、内存、显卡等部件都是通过相应的插槽安装在主板上，硬盘、显示器、鼠标、键盘等外部设备也通过相应接口连接在主板上。典型主板的示例参见图1-5。

### 9.2.1 主板芯片组概述

芯片组（chipset）是主板的核心组成部分，它几乎决定了主板的全部功能，进而影响到整

个计算机系统性能的发挥。芯片组性能的优劣，决定了主板性能的好坏与级别的高低。

芯片组有几种分类方式，按用途可分为：服务器/工作站，台式机，笔记本等；按芯片数量可分为：单芯片芯片组，标准的南、北桥芯片组，以及多芯片芯片组（主要用于高档服务器/工作站）；按整合程度的高低还可分为：整合型芯片组和非整合型芯片组等。

生产芯片组的厂家主要有 Intel、AMD、NVIDIA（美国）、VIA（中国台湾）等公司，其中以 Intel、AMD 公司生产的芯片组最为常见。在台式机的 Intel 平台上，Intel 芯片组占有最大的市场份额，而且产品线齐全，高、中、低端以及整合型产品都有。

芯片组的技术发展迅速，从 ISA、PCI、AGP 到 PCI-Express，从 ATA 到 SATA 技术，双通道内存技术，高速前端总线，等等，每一次技术的进步都带来计算机性能的提高。另一方面，芯片组技术也在向着高整合性方向发展。到 2008 年，整合芯片组在芯片组产品中约占 67% 的市场份额，随着 Intel、AMD 两大公司开始在 CPU 中内建显示芯片，整合芯片组的需求已大幅减少。

从810芯片组开始，Intel公司对芯片组的设计进行了革命性的变革，引入“加速中心架构”，用MCH（内存控制中心）取代了以往的北桥芯片，用ICH（输入/输出控制中心）取代了南桥芯片（如ICH7等），MCH和ICH通过专用的Intel Hub Architecture（Intel集线器结构）总线连接。从915芯片组开始，MCH和ICH的连接增加了带宽，名称也改为DMI（直接媒体接口），参见书中的Intel i975芯片组举例。

Intel公司的Core i7 800和i5 700系列成功地把原来的MCH全部移到CPU内，支持它们的主板上只留下PCH（平台管理控制中心）芯片。PCH芯片具有原来ICH的全部功能，又具有原来MCH芯片的管理引擎功能。单PCH芯片的设计可参见书中的Intel z77芯片举例。

## 1. 南北桥结构芯片组

较通用的主板芯片组一般由北桥芯片和南桥芯片组成，两者共同组成主板的芯片组。

### 1）南北桥芯片简介

北桥芯片（north bridge）是主板芯片组中起主导作用的最重要的组成部分，也称为主桥（host bridge）。一般来说，芯片组的名称就是以北桥芯片的名称来命名的，例如 Intel 845E 芯片组的北桥芯片是 82845E，875P 芯片组的北桥芯片是 82875P 等。北桥芯片主要负责实现与 CPU、内存、AGP 接口之间的数据传输。提供对 CPU 类型和主频的支持、系统高速缓存的支持、主板的系统总线频率、内存管理（内存类型、容量和性能）、显卡插槽规格等支持；同时，还通过特定的数据通道和南桥芯片相连接。整合型芯片组的北桥芯片还集成了显示核心。

南桥芯片（south bridge）负责 I/O 总线之间的通信，主板上的各种接口（如 IEEE 1394、串口、并口、USB2.0/1.1 等）、PCI 总线（如接电视卡、内置 MODEN、声卡等）、IDE（如接硬盘、光驱）以及主板上的其他芯片（如集成声卡、集成 RAID 卡、集成网卡等）都归南桥芯片控制。

#### 2）Intel的i975/965芯片组

Intel公司在2006年开发了i975X芯片组。图9-2给出了Intel i975芯片组的架构示意图。该芯片组支持双PCI-E图形技术，可将一条PCI-E x16总线划分成两个PCI-Ex8总

线，并且可支持弹性的 I/O 执行方案，其中包括了 SLI 和 Crossfire 技术。除了支持双显卡以外，i975X 芯片组还可支持 800/1066MHz 的 FSB，支持 533/667MHz 的 DDR2 内存，并且在容量上可达到 8GB，还可支持 ECC 内存。

<div style="text-align: center;"><div style="text-align: center;">图 9-2 Intel i975 芯片组及其与 I/O 接口的架构示意图</div> </div>

ICH7 南桥芯片集成 4 个 SATA 接口，还提供对 PATA 的支持，配备的 USB 接口为 8 个。

## 2. 集线架构芯片组

主板芯片组经过数代的发展，已呈现出“化繁就简”的趋势，从原先最通用的南北桥结构设计，到如今单PCH芯片设计，越来越多的功能从主板转移到了处理器上。例如，内存控制器及核芯显卡的工作已经完全由处理器所承担，这使主板的设计显得更加简练。

2012年4月，正式发布了第三代Core i系列（代号为Ivy Bridge，简称IVB）处理器，配套的Intel 7系列主板也陆续发布。7系列芯片组在桌面上只有三款型号，包括定位高端、搭配Core i7处理器的Z77、Z75和定位主流、搭配Core i5处理器的H77，其中主打的型号是Z77。

Intel Z77 芯片组的架构如图 9-3 所示。它实际上是一颗南桥芯片，主要用于外围设备通信、连接等功能。

这三款芯片组都同时支持 Ivy Bridge、Sandy Bridge 两代 LGA1155 接口处理器及其整合图形核心，都有 RAID 技术，均配备 4 个 USB 3.0 和 10 个 USB 2.0 接口、两个 SATA 6Gbps 和 4 个 SATA 3Gbps 接口，都能提供 8 条 PCI-E 2.0 总线通道。全面支持双通道 DDR3 1600 内存；在显卡方面，可以支持最高 x8+x4+x4 的 3 路 PCI-Express 3.0 显卡。PCI-Express 3.0 x4 可以提供等效 PCI-Express 1.0 x16 的带宽，多显卡带宽瓶颈将不复存在。

<div style="text-align: center;"><div style="text-align: center;">Inter* Z77 Express Chipset Platform Block Diagram</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 9-3 Intel Z77 芯片组的架构示意图</div> </div>

多卡互联的支持一向都是区分芯片组地位的重要参数。Z77 支持将 CPU 提供的 16 路 PCI-E 拆分为两个 8 路 PCI-E，搭建双卡 SLI 或者 Cross Fire 系统，或者拆分为一个 8 路 PCI-E 和两个 4 路 PCI-E，这样就可以组建三卡 SLI 或者 Cross Fire 系统。

### 9.2.3 主板上的 I/O 接口

主板上的 I/O 接口有很多，例如串行口、并行口、PS/2 接口、USB2.0/3.0 接口、网线接口、显卡和声卡输入输出接口等。图 9-4 为主板上的 I/O 接口的示意图。本节主要介绍 USB（universal serial bus）接口。

<div style="text-align: center;"><div style="text-align: center;">图 9-4 主板上的 I/O 接口</div> </div>

## 1. 键盘、鼠标 PS/2 接口

PS/2 接口曾是键盘和鼠标的专用 6 针圆型接口，主板上提供两个 PS/2 接口。一般情况下，符合 PC99 规范的主板，其键盘的接口为紫色、鼠标的接口为绿色。现键盘和鼠标是通过 USB 接口与计算机相连。

## 2. LPT 插座

LPT 插座俗称“并口”（parallel port），在主板上是 25 孔的母接头。曾用于连接打印机。现因打印机多采用 USB 接口，并口已不多见。

## 3. 声卡接口

多数主板都集成了声卡，图9-5为声卡的输入输出接口示意图。

<div style="text-align: center;"><div style="text-align: center;">麦克风输入2 前置输出/耳机输出 中置/低音炮/侧左</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 9-5 声卡的输入输出接口示意图</div> </div>

（1）线性输入插口：标记为 Line In。可用于外接音频设备（如影碟机、录像机等），将声音、音乐信息输入计算机中。

（2）麦克风输入插口：标记为 Mic In。用于连接麦克风（话筒），将声音或歌声录制下来。

（3）线性输出插口：标记为 Line Out。用于连接外部音频设备（如音箱等）的输出端口。

（4）扬声器输出插口：标记为 Speaker 或 SPK。用于插接音箱的音频线插头。

## 4. 显卡接口

（1）数字信号接口 DVI 接口：当 LCD（液晶）显示器出现之后，模拟信号 D-SUB 接口（该接口“上宽下窄”，看起来像一个倒写的 D，共有 3 排 15 针的信号线）被数字信号 DVI 接口取代。显卡处理好的数字信号，可直接通过 DVI 接口输送到液晶显示器中，这样可避免信号的丢失与失真。

（2）DisplayPort 接口：DisplayPort 是一种高清数字显示接口标准，可以连接笔记本电脑和显示器，也可以连接台式计算机和家庭影院。2006年5月，视频电子标准协会（VESA）确定了1.0版标准。

DisplayPort 的外接型接头有两种：一种是标准型，类似 USB、HDMI 等接头；另一种是

低矮型，如用于超薄型笔记本电脑等。在2011年后，DisplayPort接口开始接替DVI接口，并将逐步成为主流的PC显示设备输出接口。

（3）HDMI 接口：HDMI 接口更加侧重于家庭多媒体高清应用，已逐步主领家用多媒体数字接口。

## 5. 网卡接口

随着网络应用的日益普及，主板大都集成了网卡，其接口为 RJ-45 接口。

## 6. IEEE 1394 接口

IEEE 1394 是由 IEEE 协会于 1995 年 12 月正式接纳的一个新的工业标准，全称为高性能串行总线标准。它的原名叫 FireWire 串行总线，是由 Apple 公司于 20 世纪 80 年代中期开发的一种串行总线，一般称为 IEEE 1394 总线。

IEEE 1394 也是一种高效的串行接口标准，其主要特点是：连接方便，支持外设热插拔和即插即用；传输速率高；通用性强；实时性好，对传送多媒体信息非常重要，可减少图像和声音的断续传送或失真。IEEE 1394 采用 6 芯电缆，可向被连接的设备提供 4～10V，1.5A 的电源；无须驱动等。

## 7. USB 接口

USB 是通用串行总线的简称，不是一种新的总线标准，而是一种新型的串行外设接口标准和广泛应用在 PC 领域的接口技术，已成功替代串口和并口，并成为当今 PC 和大量智能设备必配的接口之一。

USB 从 1994 年年底由 Microsoft、Intel、Compaq、IBM 等公司共同推出，已有 USB 1.0、USB 1.1、USB 2.0 和 USB 3.0 等版本，均完全向后兼容，如表 9-2 所示。

<div style="text-align: center;"><div style="text-align: center;">表9-2 多个版本 USB 接口的传输速率</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>USB 版本</td><td style='text-align: center; word-wrap: break-word;'>最大传输速率</td><td style='text-align: center; word-wrap: break-word;'>速率称号</td><td style='text-align: center; word-wrap: break-word;'>最大输出电流</td><td style='text-align: center; word-wrap: break-word;'>推出时间</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>USB1.0</td><td style='text-align: center; word-wrap: break-word;'>1.5Mbps(192KB/s)</td><td style='text-align: center; word-wrap: break-word;'>低速(low-speed)</td><td style='text-align: center; word-wrap: break-word;'>500mA</td><td style='text-align: center; word-wrap: break-word;'>1996 年 1 月</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>USB1.1</td><td style='text-align: center; word-wrap: break-word;'>12Mbps(1.5MB/s)</td><td style='text-align: center; word-wrap: break-word;'>全速(full-speed)</td><td style='text-align: center; word-wrap: break-word;'>500mA</td><td style='text-align: center; word-wrap: break-word;'>1998 年 9 月</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>USB2.0</td><td style='text-align: center; word-wrap: break-word;'>480Mbps(60MB/s)</td><td style='text-align: center; word-wrap: break-word;'>高速(high-speed)</td><td style='text-align: center; word-wrap: break-word;'>500mA</td><td style='text-align: center; word-wrap: break-word;'>2000 年 4 月</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>USB3.0</td><td style='text-align: center; word-wrap: break-word;'>5～10Gbps(640MB/s)</td><td style='text-align: center; word-wrap: break-word;'>超速(super-speed)</td><td style='text-align: center; word-wrap: break-word;'>900mA</td><td style='text-align: center; word-wrap: break-word;'>2008 年 11 月</td></tr></table>

USB 具有传输速度快、使用方便、支持热插拔、连接灵活、独立供电等优点，可以连接鼠标、键盘、打印机、扫描仪、摄像头、闪存盘、MP3 机、手机、数码相机、移动硬盘和外置光驱等外部设备。

2008年推出的USB 3.0理论上比USB 2.0快10倍以上。USB 3.0利用了双向数据传输模式，而不再是USB 2.0时代的半双工模式。外形和USB 2.0接口基本一致。USB 3.0还引入了新的电源管理机制，支持待机、休眠和暂停等状态。

所有的高速 USB 2.0 设备连接到 USB 3.0 上都会有更好的表现。这些设备包括：①外置硬盘；②高分辨率的网络摄像头；③USB 接口的数码相机、数码摄像机；④蓝光光驱等。随着光纤导线的全面应用，USB 3.0 将得到更高的传输速度，未来在主流产品上的扩展应用

将进一步展现。

## 9.3 扩展总线应用技术

在计算机系统中，各功能部件都是通过总线交换数据的，所以，总线被誉为计算机系统的神经中枢；正因为如此，总线的速度对系统性能有着极大的影响。但是，与CPU、显卡、内存、硬盘等功能部件相比，总线技术的提升速度要缓慢得多。在PC发展的历史中，总线只进行过3次更新换代，但每次变革都使计算机的整体性能得到极大提高。从PC总线到ISA、PCI总线，再由PCI进入PCI Express和HyperTransport体系，计算机总线在这3次变革中也完成了3次飞跃式的提升。与此同时，计算机的处理速度、实现的功能和软件平台也都在进行同样的提升。显然，如果没有总线技术的进步作为基础，计算机的快速发展也就无从谈起。

系统总线通常是指 CPU 的 I/O 接口单元与系统内存、L2 cache 和主板芯片组之间的数据、指令等传输通道。在计算机主板中，它通常与 I/O 扩展槽相连。

总线的3个性能指标是：①总线的带宽，指单位时间内总线上可传输的数据量，以MB/s或MBps为单位；②总线的位宽，指总线能同时传输的数据位数，如通常所说的16位、32位、64位等总线宽度；③总线的工作频率（或总线的时钟频率），指用于协调总线上的各种操作的时钟频率，以MHz为单位。三者之间的关系是：

 $$  总线带宽 =( 总线位宽 /8)\times 总线工作频率 (MB/s) $$

## 1. PC 总线与 ISA 总线

PC 总线最早出现在 IBM 公司 1981 年推出的 PC/XT 系统中，它基于 8 位的 8088 处理器，也被称为 PC/XT 总线。

1984年，IBM公司推出基于16位Intel 80286处理器的PC/AT，系统总线被16位的PC/AT总线代替。在PC/AT总线规范被标准化以后，就衍生出著名的ISA总线。ISA（industry standard architecture）是工业标准体系结构总线的简称，它是IBM PC/AT及其兼容机所使用的16位标准系统扩展总线，又称为PC-AT总线，其数据传输率为16MBps。

ISA 总线一直贯穿 286 和 386SX 时代，但在 32 位 386DX 处理器出现之后，16 位宽度的 ISA 总线数据传输速度严重制约了处理器性能。1988 年，由康柏、惠普、AST、爱普生等 9 家厂商协商将 ISA 总线扩展到 32 位宽度，EISA (extended industry standard architecture，扩展工业标准架构) 总线由此诞生。

EISA 总线的工作频率仍然保持在 8MHz 水平，但受益于 32 位宽度，其总线带宽提升到 32MBps。另外，EISA 可以完全兼容之前的 8/16 位 ISA 总线。EISA 总线在还没有来得及成为正式工业标准时，更先进的 PCI 总线就开始出现，但 EISA 总线并没有因此快速消失，它在计算机系统中与 PCI 总线共存了相当长的时间，直到 2000 年后才正式退出。

## 2. PCI 总线一族

PCI（peripheral component interconnect，外设部件互连标准）总线诞生于1992年。第

一个版本的 PCI 总线工作于 33MHz 频率下，传输带宽 133MBps。在 PCI 发布一年之后，Intel 公司紧接着推出 64 位的 PCI 总线，它的传输性能达到 266MBps，但主要用于企业服务器和工作站领域。随着 x86 服务器市场的不断扩大，64 位/66MHz 规格的 PCI 总线很快成为该领域的标准，针对服务器/工作站平台设计的 SCSI 卡、RAID 控制卡、千兆网卡等设备无一例外都采用 64 位 PCI 接口，乃至到今天，这些设备还被广泛使用。

1996年，3D显卡出现，Intel公司在PCI基础上研发出一种专门针对显卡的接口 AGP（accelerated graphics port，加速图形接口）。1996年7月，AGP 1.0标准问世，它的工作频率达到66MHz，具有1X和2X两种模式，数据传输带宽分别达到了266MBps和533MBps。

1998 年 5 月，Intel 公司发布 AGP 2.0 版规范，它的工作频率仍然停留在 66MHz，但工作电压降低到 1.5V，且通过增加的 4X 模式，将数据传输带宽提升到 1.06GBps，AGP 4X 获得非常广泛的应用。与 AGP 2.0 同时推出的，还有一种针对图形工作站的接口 AGP Pro，这种接口具有更强的供电能力，可驱动高功耗的专业显卡。

2000年8月，Intel公司推出AGP 3.0规范，它的工作电压进一步降低到0.8V，所增加的8X模式可以提供2.1GBps的总线带宽。

## 3. PCI-X

2000年正式发布PCI-X1.0版标准。在技术上，PCI-X并没有脱离PC体系，它仍使用64位并行总线和共享架构，但将工作频率提升到133MHz，由此获得高达1.06GBps的总带宽。

2002年7月，PCI-SIG推出更快的PCI-X2.0规范，它包含较低速的PCI-X266及高速的PCI-X533两套标准，分别针对不同的应用。PCI-X266标准可提供2.1GBps共享带宽，PCI-X533标准则更是达到4.2GBps的高水平。此外，PCI-X2.0也保持良好的兼容性，它的接口与PCI-X1.0完全相同，可无缝兼容之前所有的PCI-X1.0设备和PCI扩展设备。很自然，PCI-X2.0成功进入服务器市场并大获成功，直到现在它仍然在服务器市场占据主流地位。

## 4. PCI Express 总线

随着系统外部带宽需求的快速增加，第三代 I/O 总线——PCI Express (PCI-E) 已经应运而生。PCI-E 在工作原理上与并行体系的 PCI 不同，它采用串行方式传输数据，而依靠高频率来获得高性能，因此，PCI-E 也一度被称为“串行 PCI”。由于串行传输不存在信号干扰，总线频率提升不受阻碍，PCI-E 很顺利就达到 2.5GHz 的超高工作频率。其次，PCI-E 采用全双工运作模式，最基本的 PCI-E 拥有 4 条传输线路，其中 2 条线路用于数据发送，2 条线路用于数据接收，即发送数据和接收数据可以同时进行。由 PCI 的并行数据传输变为串行数据传输，并且采用了点对点技术，因此，极大地加快了相关设备之间的数据传送速度。

PCI Express 总线包括多种速率的插槽，例如 PCI Express x1、x2、x4、x8、x16、x32 等，1X 的 PCI-E 最短，然后依次增长。其中，PCI Express x16 总线已成为新一代图形总线标准。表 9-3 给出了 PCI Express 几种模式总线的速率。

<div style="text-align: center;"><div style="text-align: center;">表 9-3 PCI Express 总线的速率表</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>模式</td><td style='text-align: center; word-wrap: break-word;'>双向传输模式</td><td style='text-align: center; word-wrap: break-word;'>数据传输模式</td><td style='text-align: center; word-wrap: break-word;'>模式</td><td style='text-align: center; word-wrap: break-word;'>双向传输模式</td><td style='text-align: center; word-wrap: break-word;'>数据传输模式</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>PCI Express x1</td><td style='text-align: center; word-wrap: break-word;'>500MBps</td><td style='text-align: center; word-wrap: break-word;'>250MBps</td><td style='text-align: center; word-wrap: break-word;'>PCI Express x8</td><td style='text-align: center; word-wrap: break-word;'>4GBps</td><td style='text-align: center; word-wrap: break-word;'>2GBps</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>PCI Express x2</td><td style='text-align: center; word-wrap: break-word;'>1GBps</td><td style='text-align: center; word-wrap: break-word;'>500MBps</td><td style='text-align: center; word-wrap: break-word;'>PCI Express x16</td><td style='text-align: center; word-wrap: break-word;'>8GBps</td><td style='text-align: center; word-wrap: break-word;'>4GBps</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>PCI Express x4</td><td style='text-align: center; word-wrap: break-word;'>2GBps</td><td style='text-align: center; word-wrap: break-word;'>1GBps</td><td style='text-align: center; word-wrap: break-word;'>PCI Express x32</td><td style='text-align: center; word-wrap: break-word;'>16GBps</td><td style='text-align: center; word-wrap: break-word;'>8GBps</td></tr></table>

## 5. HyperTransport 总线

在系统总线家族中，HyperTransport是一个另类总线，因为它只是AMD公司提出的企业标准，其设计目的是用于高速芯片间的内部连接。但随着AMD 64平台的成功，HyperTransport总线的影响力也随之扩大。

在基本工作原理上，HyperTransport与PCI Express相似，都是通过串行传输、高频率运作获得超高性能。除了速度快之外，HyperTransport还有一个独有的优势，它可以在串行传输模式下模拟并行数据的传输效果。

2004 年 2 月，AMD 公司推出 HyperTransport 2.0，其主要变化是数据传输频率提升到 1GHz，32 位总线的带宽达到 8GBps。AMD 将它用于 Opteron 以及高端型号的 Athlon 64 FX、Athlon 64 处理器中，该平台的所有芯片组产品都迅速提供支持。

PCI Express 和 HyperTransport 开创了一个近乎完美的总线架构，而业界对高速总线的渴求也将无止境。

### 9.4.1 全球计算机硬件新技术的重要发展

在计算机科学和技术领域，新的硬件技术不断涌现，为计算机性能和功能带来了突破性的进展。以下是一些全球计算机硬件新技术的重要发展。

#### 1）量子计算机

量子计算机是一种基于量子力学原理的计算机系统，利用量子比特（qubits）进行计算，具有极高的计算速度和处理能力。这项技术的成果包括量子比特的稳定性和控制能力的提升，以及量子计算机算法的研究和应用等。

##### 2）人工智能芯片

人工智能芯片是专门为人工智能应用而设计的硬件，通过优化芯片架构和算法，能够高效地执行深度学习和机器学习任务。这项技术的成果包括高效的神经网络加速器和边缘计算芯片的开发，使得人工智能应用能够在更多设备上实现。

##### 3）光子计算机

光子计算机利用光子作为信息传输和处理的 $ \underset{\cdot}{媒} $介，具有高速、低能耗和抗干扰 $ \underset{\cdot}{等} $特点。这项技术的成果包括光子芯片的研发和应用，光学计算和量子光学的进展，为光子计算机的实现提供了基础。

### 9.4.2 全球计算机硬件新技术的未来发展趋势

计算机硬件领域的新技术将继续迎来新的发展趋势。以下是一些全球计算机硬件新技术的未来趋势。

#### 1）边缘计算

随着物联网和移动互联网的普及，边缘计算成为一个重要的发展方向。边缘计算将计算和数据存储推向网络边缘，提供更低的延迟和更高的安全性，以满足实时和离线应用的需求。

##### 2）量子计算的商业化

虽然量子计算机目前还处于发展的早期阶段，但随着技术的进步和对量子计算机的需求增加，商业化将成为一个重要的趋势。人们可以期待在未来几年中看到更多的量子计算机产品和解决方案。

##### 3）生物计算机

生物计算机利用生物分子作为信息存储和处理单元，具有高容量和低能耗的优点。该技术的发展可能会引起计算机硬件的革命性变化，并在生物医学、环境监测等领域发挥重要作用。

综上所述，全球计算机硬件新技术的重要发展成果包括量子计算机、人工智能芯片和光子计算机等。未来，边缘计算、量子计算的商业化和生物计算机等趋势将引领计算机硬件技术的发展。这些新技术的出现将为计算机科学和技术领域带来新的机遇和挑战，为人类创造更广阔的未来。

### 9.4.3 中国计算机硬件新技术的重要发展

中国在计算机新技术研发方面也取得了显著成果。主要集中以下几方面。

#### 1）超级计算机

中国已经成功研制出世界上速度最快的超级计算机，如天河系列超级计算机。这些超级计算机在科学研究、天气预报、核能模拟等领域发挥着重要作用。

##### 2）云计算技术

中国的云计算技术也取得了快速发展。中国的云计算企业，如阿里巴巴、腾讯等公司，在公有云和私有云服务领域具有很强的竞争力，并为企业和个人提供了强大的计算和存储能力。

##### 3）人工智能

中国的人工智能领域也取得了许多重要成果。中国的一些科技公司，如百度和腾讯公司，已经在人工智能领域取得了领先成果，这些成果应用于语音识别、图像识别等众多领域。

近年来，中国在计算机处理器核心及其系统领域取得了许多重要的技术发展。以下给出其中的一些例子。

（1）AI芯片：中国在人工智能领域的发展非常迅速，为此推出了许多专门用于处理人工智能任务的芯片。例如，中国的海思公司推出了自主设计的芯片 Kirin 970，其内置了神

经网络处理单元(NPU)，大大提升了AI计算效率。

（2）5G通信芯片：中国是5G技术的领先国家之一，为了支持5G网络的建设，各大芯片制造商都在加大对5G通信芯片的研发投入。中国的华为公司已经推出了多款用于5G设备的芯片，为全球范围内的5G网络发展做出了贡献。

（3）自研处理器架构：中国正致力于发展自己的处理器架构，减少对国外处理器技术的依赖。例如，中国的龙芯公司推出了基于自主研发的 MIPS 指令集的处理器，并已在一些应用场景中得到了广泛应用。

（4）区块链技术应用：区块链技术可以用于提供去中心化的数据存储和计算能力。中国在区块链技术的研发和应用方面取得了一些成果，包括与计算硬件相关的实验和应用，为区块链技术的发展做出了贡献。

（5）大规模并行计算系统：中国正在积极发展具有大规模并行计算能力的超级计算机系统，并在关键领域中取得了显著进展。这些超级计算机能够在天气预报、基因组学研究、气候模拟等领域发挥重要作用。

总的来说，中国计算机硬件领域的技术发展日益重要，涉及了AI芯片、5G通信芯片、处理器架构、区块链技术应用以及大规模并行计算系统等方面，对于中国在科技创新和国家安全等方面具有重要意义。

### 9.4.4 中国计算机硬件新技术的未来发展趋势

中国计算机硬件领域的未来发展趋势可以归纳为以下几方面。

#### 1）AI加速芯片的进一步发展

随着人工智能应用的不断增加，对于更高效、更专业的 AI 加速芯片需求也在增长。未来，中国将继续投入研发力量，推动 AI 芯片的创新，包括更高性能、更低功耗、更专业化的设计，以满足各行业的需求。

##### 2）量子计算技术的突破

量子计算技术被认为是计算机领域未来的重要方向。中国一直在积极投入研发和实验中，在量子计算硬件方面取得了一些突破。未来，随着量子计算技术的进一步发展，中国将继续加大投入，推动量子计算硬件技术的更大突破和更广泛应用。

##### 3）智能物联网设备的发展

随着物联网技术的普及，对于小型、低功耗、智能的硬件设备需求不断增加。中国将继续致力于研发和生产更先进的智能物联网芯片和设备，满足物联网市场的需求。

##### 4）5G通信技术的普及和应用

中国是全球5G技术的领先国家，5G通信技术的普及和应用将进一步推动计算机硬件的发展。中国将持续投入研发，提供更快速、更稳定、更低功耗的5G通信芯片和设备。

##### 5）可穿戴设备和柔性电子技术的发展

随着可穿戴设备市场的增长，对于柔性电子技术和可穿戴设备的需求也在增加。中国将继续研发和生产更先进的柔性电子技术和可穿戴设备，提供更舒适、更便携、更多样化的硬件产品。

总的来说，中国计算机硬件领域未来发展趋势是推动 AI 加速芯片、量子计算技术、智

能物联网设备、5G通信技术以及可穿戴设备和柔性电子技术的发展。这些将进一步推动中国在计算机硬件技术方面的创新和实力的提升。

## 本章小结

本章主要介绍微机硬件的一些新技术特点，以及主板芯片组和总线的技术发展。在现代CPU中逐渐融入了一些新技术，如超线程技术、64位技术、双核与多核技术以及扩展指令集等。这些新技术的应用，大幅度提高了CPU的性能。

主板是最重要的部件，一块主板的性能和档次主要取决于它所采用的芯片组。总线技术在发展过程中经过3次大的变革，从PC总线到ISA、PCI总线，再由PCI总线进入PCI Express和HyperTransport总线体系，使得计算机的整体性能得到巨大改善。

最后简要介绍了计算机硬件新技术的重要发展与未来发展趋势。

## 习题9

9.1 什么是 USB 接口？它有何特点？

9.2 简述扩展总线的发展过程。

## 软件调试技术

DEBUG 调试软件是分析、调试、排错的基本软件工具。

### A.1 调试软件 DEBUG

学习使用任何软件，都要从熟悉软件的操作命令着手。使用 DEBUG 也是如此。在操作系统环境下，启动 DEBUG 后便进入 DEBUG 的命令状态，在此状态下，便可以使用 DEBUG 的任何命令。每个命令均以回车结尾。

在 DEBUG 状态下，所有地址、数据均以无后缀的十六进制表示，例如 234D、FABC 等。启动 DEBUG：

C> DEBUG [d:] [path] [filename[.exe]] [parm1] [parm2]

其中，d：表示盘符； $ \underline{\text{path}} $是filename的目录路径；filename是要分析或调试的二进制程序文件名；exe是程序文件的扩展名；parml被调试程序约定的第1参数文件名；parm2被调试程序约定的第2参数文件名。

屏幕的提示符一，表示当前正在 DEBUG 的命令状态。

在 DEBUG 命令中经常用到地址、范围等参数。这些参数表示方式如下。

地址表示形式——段寄存器名：相对地址 或 段值：相对地址 或 相对地址

地址范围表示——起始地址 结尾地址 或 起始地址 L 字节数

DEBUG 命令的格式及其功能说明见表 A-1。

<div style="text-align: center;"><div style="text-align: center;">表 A-1 DEBUG 命令格式及其功能</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>命令名称</td><td style='text-align: center; word-wrap: break-word;'>格式</td><td style='text-align: center; word-wrap: break-word;'>功能说明</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>显示存储单元内容</td><td style='text-align: center; word-wrap: break-word;'>1. D[起始地址]2. D[地址范围]</td><td style='text-align: center; word-wrap: break-word;'>格式1：命令从起始地址开始按十六进制显示80个单元的内容，每行16个单元。每行右侧还显示该16个单元的ASCII码字符，对于无字符对应的ASCII码则显示。格式2：命令显示指定范围存储单元中的内容，每行16个单元。每行右侧还显示该16个单元的ASCII码字符，无字符对应的ASCII则显示如果不给出起始地址或地址范围，则从当前地址开始按格式1操作</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>修改存储单元内容</td><td style='text-align: center; word-wrap: break-word;'>1. E 起始地址 [列表]2. E 地址</td><td style='text-align: center; word-wrap: break-word;'>格式1：按列表内容修改从起始地址开始的多个存储单元内容。例如，E12DFFF D“ABC”41 即从 12DF 单元开始修改 5 个单元的内容，分别是十六进制 FD、A、B、C 的 ASCII 码，以及十六进制数 41。格式2：修改指定地址单元内容</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>显示、修改寄存器内容</td><td style='text-align: center; word-wrap: break-word;'>R[寄存器名]</td><td style='text-align: center; word-wrap: break-word;'>如果指定了寄存器名，则显示寄存器的内容，并允许修改；如果不指定寄存器名，则按一定格式显示通用寄存器、段寄存器、标志寄存器的内容</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>运行命令</td><td style='text-align: center; word-wrap: break-word;'>G[=起始地址][第 1 断点地址][第 2 断点地址...]</td><td style='text-align: center; word-wrap: break-word;'>CPU 从指定起始地址开始执行，依次在第 1、第 2……断点处中断。若不给起始地址，则从当前 CS：IP 指示地址开始执行</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>跟踪命令</td><td style='text-align: center; word-wrap: break-word;'>T[=起始地址][正整数]</td><td style='text-align: center; word-wrap: break-word;'>从指定地址开始执行正整数条指令。如果不给出正整数，则按 1 处理；如果不给定起始地址，则从当前 CS：IP 指示地址开始执行</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>汇编命令</td><td style='text-align: center; word-wrap: break-word;'>A[起始地址]</td><td style='text-align: center; word-wrap: break-word;'>从指定地址开始接受汇编指令。如果不给出起始地址，则从当前地址开始接受，或从当前代码段的十六进制 100 表示的相对地址处接受汇编指令。如果输入汇编指令过程中，在某行不作任何输入而直接按 Enter 键，则结束 A 命令，回到接受命令状态一处</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>反汇编命令</td><td style='text-align: center; word-wrap: break-word;'>1. U[起始地址]2. U 地址范围</td><td style='text-align: center; word-wrap: break-word;'>格式 1：从指定起始地址处开始将 32 字节内容转换成汇编指令形式；如果不给出起始地址，则从当前地址开始。格式 2：将指定范围内的存储内容转换成汇编指令</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>指定文件名</td><td style='text-align: center; word-wrap: break-word;'>格式：N 文件名及扩展名</td><td style='text-align: center; word-wrap: break-word;'>指出即将调入内存或从内存中存盘的文件名。这条命令要配合 L 或 W 命令一起使用</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>命令</td><td style='text-align: center; word-wrap: break-word;'>1. L 起始地址 驱动器号 起始扇区 扇区数2. L[起始地址]</td><td style='text-align: center; word-wrap: break-word;'>格式 1：根据指定驱动器号（0：A 驱，1：B 驱，2：C 驱），指定起始逻辑扇区号和扇区数将相应扇区内容装入指定起始地址的存储区中。格式 2：将 N 命令指出的文件装入指定起始地址的存储区中；若没有指定起始地址，则装入 CS：100 处或按原来文件定位约定装入相应位置</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>装入命令</td><td style='text-align: center; word-wrap: break-word;'>1. W 起始地址 驱动器号 起始扇区 扇区数2. W[起始地址]</td><td style='text-align: center; word-wrap: break-word;'>格式 1：功能与 L 命令格式 1 的功能正好相反。格式 2：将起始地址开始的 BX * 10000H+CX 字节内容存放到由 N 命令指定的文件中。执行这条命令前注意给 BX、CX 中设置恰当的值</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>写磁盘命令</td><td style='text-align: center; word-wrap: break-word;'>Q</td><td style='text-align: center; word-wrap: break-word;'>退出 DEBUG，返回到操作系统</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>比较命令</td><td style='text-align: center; word-wrap: break-word;'>C 源地址范围 目标起始地址</td><td style='text-align: center; word-wrap: break-word;'>F 地址范围 要填入的字节或字符串</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>填充命令</td><td style='text-align: center; word-wrap: break-word;'>F 地址范围 要填入的字节或字符串</td><td style='text-align: center; word-wrap: break-word;'>F 地址范围 要填入的字节或字符串</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>计算十六进制的和与差</td><td style='text-align: center; word-wrap: break-word;'>H数1，数2</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>从指定端口输入并显示</td><td style='text-align: center; word-wrap: break-word;'>端口地址</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>移动存储器内容</td><td style='text-align: center; word-wrap: break-word;'>M源地址范围 目标起始地址</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>向指定端口输出字节</td><td style='text-align: center; word-wrap: break-word;'>O端口地址</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>搜索字符或字符串</td><td style='text-align: center; word-wrap: break-word;'>S地址范围 要搜索的字节或字节串</td><td style='text-align: center; word-wrap: break-word;'></td></tr></table>

#### A.2 软件调试基本方法

利用调试软件 DEBUG 装入二进制执行程序，通过连续运行、分段运行、单步运行，可以实现对软件剖析、查错或修改。

将.COM文件装入后，指令指针IP放置成十六进制的100，即为程序入口的相对地址。首先从此处开始连续运行，考查程序的功能是否达到。如果出错，则可用分段运行方式，缩小错误所在程序段的范围，然后再用单步方式找出错误确切所在处。

设有程序 EXAMP.COM，调试方法如下。

C>DEBUG EXAMP.COM
—G

先连续执行，如出现问题，例如死机，则再启动 DOS。接着用分段方式运行。

-T=100,5↘

即从相对地址为十六进制的100处开始执行EXAMP.COM，连续执行5条指令。可以恰当地选择这一常数，确定分段大小。在此期间如果出现问题，就说明这5条指令中有错误。这时，可用单步逐条执行，例如：

 $$ -T=100\le $$

这时，执行一条指令后，会显示通用寄存器、段寄存器、标志寄存器的内容。由此可以分析出本条指令的执行结果是否正确。如果正确，则执行下一条指令；如果出错，则进行必要的修改。

对 EXE 类型文件的调试与上面相似，但不能直接用 DEBUG 存盘命令存盘。掌握 DEBUG 的各种命令功能，并且深入了解 DOS 各种参数表及其参数含义，不仅对分析调试软件很有帮助，而且对软件进行加密解密及系统硬件配置分析也有很大帮助。

## 參考文獻

[1] William H Murray, Christ H Paooas. 80386/80286 ASSEMBLY LANGUAGE PROG RAMMING [M]. McGraw-Hill Inc., 1986.

[3] 李继灿. 微机原理与接口技术[M]. 北京：清华大学出版社，2011.

[2] Barry B Brey. Intel 微处理器全系列：结构、编程与接口[M]. 于惠华，艾明晶，尚利宏，译. 5 版. 北京：电子工业出版社，2001.

[4] 李继灿. 微型计算机系统与接口[M]. 2版. 北京：清华大学出版社，2011.

[5] 李继灿. 新编16/32位微型计算机原理及应用[M]. 5版. 北京：清华大学出版社，2013.

[6] Peter Norton. 计算机导论[M]. 6 版. 北京：清华大学出版社，2009.

[7] 李继灿. 计算机硬件技术基础[M]. 3 版. 北京：清华大学出版社，2015.

## 图书资源支持

感谢您一直以来对清华版图书的支持和爱护。为了配合本书的使用，本书提供配套的资源，有需求的读者请扫描下方的“书圈”微信公众号二维码，在图书专区下载，也可以拨打电话或发送电子邮件咨询。

如果您在使用本书的过程中遇到了什么问题，或者有相关图书出版计划，也请您发邮件告诉我们，以便我们更好地为您服务。

### 我们的联系方式：

清华大学出版社计算机与信息分社网站：https://www.shuimushuhui.com/

地址：北京市海淀区双清路学研大厦A座714

邮编：100084

电 话：010-83470236 010-83470237

客服邮箱：2301891038@qq.com

QQ：2301891038（请写明您的单位和姓名）

资源下载：关注公众号“书圈”下载配套资源。

资源下载、样书申请

书圏

图书案例

清华计算机学堂

观看课程直播
