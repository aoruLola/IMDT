---
subject: 843
type: 章节目录
---

# 互联网＋创新设计专业基础综合 · 章节目录

## 00 · 预备篇：读懂符号与程序

- [把符号读成一句话](843-00-prep/01-843-symbols.md) — 集合、逻辑、求和、函数
- [先数清可能性：排列与组合](843-00-prep/02-843-counting.md) — 加法原理、乘法原理、排列、组合　前置：843-symbols
- [让计算机按顺序做事](843-00-prep/03-843-c-control.md) — 变量、类型、赋值、分支、循环、函数　前置：843-counting
- [数组、指针与结构体怎样配合](843-00-prep/04-843-c-memory.md) — 数组、地址、指针、结构体、空指针　前置：843-c-control
- [章末综合训练](843-00-prep/章末训练.md)

## 01 · 概率：从可能性到可信判断

- [事件怎样合并与计数](843-01-probability/01-843-events.md) — 样本空间、事件运算、古典概率、加法公式　前置：843-counting
- [知道新信息后，概率会变](843-01-probability/02-843-conditional.md) — 条件概率、乘法公式、独立性　前置：843-events
- [全概率与贝叶斯：从结果追原因](843-01-probability/03-843-bayes.md) — 划分、全概率公式、贝叶斯公式、基准率　前置：843-conditional
- [章末综合训练](843-01-probability/章末训练.md)

## 02 · 随机变量：给不确定性一个数

- [分布表、密度与分布函数](843-02-random/01-843-distribution.md) — 随机变量、分布律、分布函数、概率密度　前置：843-conditional
- [选择常见概率模型](843-02-random/02-843-models.md) — 伯努利、二项、泊松、均匀、指数、正态　前置：843-distribution
- [两个变量与变量变换](843-02-random/03-843-joint.md) — 联合分布、边缘分布、独立、随机变量函数　前置：843-models
- [平均水平与波动：期望、方差和相关](843-02-random/04-843-moments.md) — 期望、方差、协方差、相关系数　前置：843-joint
- [等待次数、不放回抽取与连续变换](843-02-random/05-843-more-models.md) — 几何分布、超几何分布、连续变量变换、联合密度　前置：843-moments
- [章末综合训练](843-02-random/章末训练.md)

## 03 · 统计基础：从样本认识总体

- [总体、样本与统计量](843-03-statistics/01-843-sampling.md) — 总体、随机样本、抽样偏差、统计量　前置：843-moments
- [样本均值、样本方差与抽样分布](843-03-statistics/02-843-sample-distributions.md) — 样本均值、无偏样本方差、正态抽样、卡方、t、F　前置：843-sampling
- [章末综合训练](843-03-statistics/章末训练.md)

## 04 · 线性代数：把多个约束一起解

- [方程组与矩阵：把系数排成表](843-04-linear/01-843-matrix-entry.md) — 矩阵定义、特殊矩阵、矩阵相等、加法与数乘　前置：843-symbols
- [矩阵乘法、转置与分块](843-04-linear/02-843-matrix-product.md) — 矩阵乘法、矩阵幂、转置法则、分块矩阵　前置：843-matrix-entry
- [初等行变换与阶梯形](843-04-linear/03-843-elimination.md) — 初等变换、初等矩阵、行阶梯形、行最简形、矩阵秩　前置：843-matrix-product
- [行列式：方阵对应的一个数](843-04-linear/04-843-determinant.md) — 行列式定义、排列逆序、二三阶计算、行列式性质　前置：843-elimination
- [按行展开、伴随与求逆](843-04-linear/05-843-cofactor-inverse.md) — 余子式、代数余子式、展开定理、伴随矩阵、逆矩阵　前置：843-determinant
- [克拉默法则与矩阵方程](843-04-linear/06-843-cramer.md) — 克拉默法则、矩阵方程、逆矩阵应用　前置：843-cofactor-inverse
- [线性组合与相关无关](843-04-linear/07-843-span.md) — n维向量、线性组合、线性表示、线性相关、线性无关　前置：843-cramer
- [极大无关组、秩与子式](843-04-linear/08-843-rank-basis.md) — 极大线性无关组、向量组秩、等价向量组、矩阵秩、秩的性质　前置：843-span
- [齐次方程与基础解系](843-04-linear/09-843-homogeneous-system.md) — 齐次方程非零解条件、自由变量、基础解系、解空间维数　前置：843-rank-basis
- [非齐次方程与公共解](843-04-linear/10-843-nonhomogeneous-system.md) — 有解判别、唯一与无穷多解、特解加齐次解、公共解　前置：843-homogeneous-system
- [含参数方程组与秩讨论](843-04-linear/11-843-parameter-system.md) — 参数讨论、临界值、秩与解结构综合　前置：843-nonhomogeneous-system
- [章末综合训练](843-04-linear/章末训练.md)

## 05 · 信息表示与硬件：数字怎样成为动作

- [二进制、编码与数值范围](843-05-hardware/01-843-bases.md) — 进制、补码、字符、Unicode、定点、浮点　前置：843-symbols
- [逻辑门与组合电路](843-05-hardware/02-843-logic.md) — 与或非、异或、真值表、布尔逻辑　前置：843-bases
- [一条指令怎样执行](843-05-hardware/03-843-cpu.md) — CPU、控制器、运算器、寄存器、存储层次、总线、输入输出、中断　前置：843-logic
- [定点与浮点：小数也需要编码](843-05-hardware/04-843-floating.md) — 二进制小数、规格化、IEEE 754基础、舍入、误差　前置：843-cpu
- [章末综合训练](843-05-hardware/章末训练.md)

## 06 · 算法与线性结构：让步骤可执行

- [算法、复杂度与递归](843-06-linear-structures/01-843-algorithm.md) — 算法、伪代码、时间复杂度、空间复杂度、递归　前置：843-c-memory、843-c-control
- [顺序表与链表：搬元素还是改指针](843-06-linear-structures/02-843-lists.md) — 线性表、顺序表、单链表、插入、删除　前置：843-algorithm
- [栈与队列：不同的出场顺序](843-06-linear-structures/03-843-stack-queue.md) — 栈、队列、循环队列、括号匹配　前置：843-lists
- [串、数组与稀疏矩阵](843-06-linear-structures/04-843-strings-arrays.md) — 串、模式匹配、KMP直觉、多维数组、稀疏矩阵　前置：843-stack-queue
- [章末综合训练](843-06-linear-structures/章末训练.md)

## 07 · 非线性结构、查找与排序

- [树、二叉树与遍历](843-07-trees-graphs/01-843-trees.md) — 树、二叉树、完全二叉树、遍历、二叉搜索树　前置：843-algorithm、843-stack-queue
- [哈夫曼树：让常见符号更短](843-07-trees-graphs/02-843-huffman.md) — 带权路径长度、哈夫曼编码、前缀码　前置：843-trees
- [图的表示、遍历与拓扑次序](843-07-trees-graphs/03-843-graphs.md) — 有向无向图、邻接矩阵、邻接表、DFS、BFS、拓扑排序　前置：843-huffman
- [最短路径与最小生成树](843-07-trees-graphs/04-843-graph-paths.md) — Dijkstra、Floyd、Prim、Kruskal、生成树　前置：843-graphs
- [顺序查找、二分与散列](843-07-trees-graphs/05-843-search.md) — 顺序查找、二分、散列、冲突、装填因子　前置：843-graph-paths
- [排序过程、稳定性与取舍](843-07-trees-graphs/06-843-sorting.md) — 插入、冒泡、选择、快排、归并、堆排、希尔、基数、稳定性　前置：843-search
- [快速排序与归并：分开，再合起来](843-07-trees-graphs/07-843-divide-sort.md) — 分区、快排、归并、分治、递归边界　前置：843-sorting
- [堆、希尔与基数：不同的排序机制](843-07-trees-graphs/08-843-heap-radix.md) — 大根堆、堆调整、堆排序、希尔排序、LSD基数排序　前置：843-divide-sort
- [用中转点与割边完成图算法](843-07-trees-graphs/09-843-graph-matrix.md) — Floyd过程、Prim过程、负边、负环、连通性　前置：843-heap-radix
- [章末综合训练](843-07-trees-graphs/章末训练.md)

## 08 · 资源管理：让多个任务有序共处

- [进程、状态与调度](843-08-resources/01-843-processes.md) — 进程、线程、就绪运行阻塞、调度、周转时间　前置：843-cpu、843-stack-queue
- [互斥、同步与死锁](843-08-resources/02-843-synchronization.md) — 临界区、信号量、生产消费、死锁条件、安全状态　前置：843-processes
- [内存、文件与设备怎样管理](843-08-resources/03-843-memory-files.md) — 分页、地址转换、缺页、FIFO、LRU、文件、目录、设备管理　前置：843-synchronization
- [章末综合训练](843-08-resources/章末训练.md)

## 09 · 数据库：把事实存得清楚、查得准确

- [关系、键与关系操作](843-09-database/01-843-relational.md) — 关系模型、主键、候选键、外键、选择投影连接、完整性　前置：843-symbols
- [从查询到分组：读懂SQL](843-09-database/02-843-sql.md) — SELECT、WHERE、JOIN、GROUP BY、HAVING、聚合、更新、事务　前置：843-relational
- [函数依赖、规范化与ER设计](843-09-database/03-843-normalization.md) — 函数依赖、1NF、2NF、3NF、BCNF、ER、设计流程　前置：843-sql
- [章末综合训练](843-09-database/章末训练.md)

## 10 · 软件设计与开发：从需求到可靠服务

- [需求、模块与接口](843-10-software/01-843-requirements.md) — 功能需求、非功能需求、结构化、面向对象、模块、接口　前置：843-c-control、843-relational
- [开发流程、测试与维护](843-10-software/02-843-lifecycle-testing.md) — 瀑布、迭代、原型、黑盒、白盒、边界、回归、维护　前置：843-requirements
- [互联网应用如何连接](843-10-software/03-843-architecture.md) — 客户端服务器、HTTP、API、数据库、缓存、身份、隐私　前置：843-lifecycle-testing
- [章末综合训练](843-10-software/章末训练.md)

## 11 · 大数据与人工智能：从数据到有边界的应用

- [数据处理与分布式直觉](843-11-data-ai/01-843-data-pipeline.md) — 数据采集、清洗、ETL、批流、分布式、MapReduce　前置：843-sample-distributions、843-relational
- [机器学习任务与训练评估](843-11-data-ai/02-843-learning.md) — 监督、无监督、强化、分类、回归、训练验证测试、过拟合、指标　前置：843-data-pipeline
- [神经网络、生成式AI与设计应用](843-11-data-ai/03-843-neural-generative.md) — 神经网络、损失、梯度、生成式AI、幻觉、偏差、人机协作　前置：843-learning
- [章末综合训练](843-11-data-ai/章末训练.md)

## 12 · 艺术设计基础：形式背后的选择

- [设计、艺术、技术与社会](843-12-design/01-843-design-function.md) — 功能、形式、审美、技术、社会、系统
- [理解设计发展，不只背风格名称](843-12-design/02-843-design-history.md) — 工艺美术、工业化、包豪斯、现代设计、多元与数字转向　前置：843-design-function
- [点线面、色彩与信息层级](843-12-design/03-843-visual-language.md) — 点线面、对比、重复、对齐、亲近、色彩、版式、符号　前置：843-design-history
- [伦理、可及性与可持续设计](843-12-design/04-843-ethics.md) — 包容、无障碍、隐私、可持续、生命周期、暗黑模式　前置：843-visual-language
- [章末综合训练](843-12-design/章末训练.md)

## 13 · 数字媒体艺术：媒介怎样参与表达

- [从媒介到数字艺术的类型](843-13-media/01-843-media-types.md) — 媒介、数字化、网络艺术、影像、动画、游戏、VR、AR、装置　前置：843-design-history、843-visual-language
- [从录像反馈到算法艺术：读两件典型实践](843-13-media/02-843-media-history.md) — 录像艺术、闭路反馈、生成艺术、算法美学、发展脉络　前置：843-media-types
- [交互、叙事与体验节奏](843-13-media/03-843-interaction-narrative.md) — 输入映射、反馈、状态、叙事、分支、沉浸、评价　前置：843-media-history
- [章末综合训练](843-13-media/章末训练.md)

## 14 · 问题发现与创新方案：用证据推进

- [观察与访谈：先弄清问题](843-14-innovation/01-843-research.md) — 观察、访谈、样本、证据、事实假设、研究伦理　前置：843-design-function
- [证据整理、问题界定与创意生成](843-14-innovation/02-843-define-ideate.md) — 亲和图、需求、洞察、问题陈述、发散、类比、组合　前置：843-research
- [筛选、用户流程与原型](843-14-innovation/03-843-select-prototype.md) — 评价矩阵、用户流程、服务蓝图、低保真、原型、可行性　前置：843-define-ideate
- [评价与迭代：证明改进在哪里](843-14-innovation/04-843-evaluate.md) — 可用性测试、任务、指标、观察、迭代、自评　前置：843-select-prototype
- [章末综合训练](843-14-innovation/章末训练.md)

## 15 · 零基础手绘：把想法画到别人看懂

- [从线条到基本形体](843-15-sketch/01-843-lines-forms.md) — 直线、椭圆、方体、圆柱、轮廓、结构、线宽　前置：843-visual-language
- [比例、透视与构图](843-15-sketch/02-843-perspective.md) — 视平线、消失点、一点透视、两点透视、比例、构图　前置：843-lines-forms
- [人物、动作与使用场景](843-15-sketch/03-843-people-scenes.md) — 简笔人物、动作线、场景、比例参照、交互距离　前置：843-perspective
- [界面草图、故事板与流程图](843-15-sketch/04-843-ui-story.md) — 线框图、界面状态、故事板、流程图、标注　前置：843-people-scenes
- [把方案组织成一张清楚的答卷](843-15-sketch/05-843-answer-layout.md) — 答卷布局、说明文字、主视图、细节图、时间分配、自检　前置：843-ui-story
- [章末综合训练](843-15-sketch/章末训练.md)

## 16 · 综合应试：把知识连成完整答案

- [名词、简答、计算与算法过程题](843-16-practice/01-843-answer-method.md) — 名词解释、简答、计算、算法、审题、检查　前置：843-evaluate、843-answer-layout、843-neural-generative
- [跨模块案例怎样作答](843-16-practice/02-843-integrate.md) — 技术选择、设计推演、案例分析、证据链、综合　前置：843-answer-method
- [章末综合训练](843-16-practice/章末训练.md)

