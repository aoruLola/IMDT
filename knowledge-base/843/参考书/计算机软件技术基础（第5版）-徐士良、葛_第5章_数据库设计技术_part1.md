# 第5章 数据库设计技术

> 来源：docs/08_电子书/计算机软件技术基础（第5版）-徐士良、葛兵.md
> 科目：843 专业课 ｜ 年份：— ｜ 类型：参考教材 ｜ 来源级别：未标注 ｜ 可信度：未评估
> 状态：OCR 全文，存在识别错误
> 提取：原始 Markdown ｜ 原文件 sha256：d53505b4754eaf37


## 5.1 数据库基本概念

目前，计算机已经被广泛应用于科技文化、组织管理各个领域以及国民经济的各行各业和日常生活的各方面。在众多应用中，计算机的作用已不仅是进行数值近似计算，更多的是用于数据的加工和管理。例如，天文气象观测资料的管理、地质勘探数据的处理、商店和银行的账目管理、行政事务管理、图书资料管理以及各种经济、军事情报数据的处理等。在这些应用中，计算机主要不是用于计算，而是用于对各种类型的数据进行综合、分析和加工。为了有效地对这样一些数据量庞大、结构比较复杂的数据进行处理，需要有专门的技术。数据库技术正是为了满足这种应用的需要而发展起来的。随着应用的不断普及和深入，数据库技术已经成为计算机应用中必须掌握的重要技术之一。

本章将从应用出发，介绍有关数据库技术的基本概念和基本的数据库设计方法。

## 1. 数据库管理技术

数据管理技术的发展是与计算机技术及其应用的发展联系在一起的，它大致经历了人工管理、文件管理和数据库管理三个阶段。

在计算机发展的初期，计算机系统的结构还比较简单，其功能比较弱，还没有大容量的外存，也没有操作系统，用户程序的运行由简单的管理程序来控制。在这一阶段中，计算机

的应用也主要是科学计算，用户程序中需要管理的数据不多。因此，计算机中的数据与应用程序一一对应，即一组数据对应一个程序，如图5.1所示。程序中要用到的数据由程序员通过程序自己进行管理，当计算机中的数据结构改变时，其程序也必须随之修改，即计算机中的数据与程序不具有独立性。这就是人工管理阶段。在这种管理方式下，由于各应用程序所处理的数据经常是相互有关联的，因此，各程序中的数据会有大量重复。

<div style="text-align: center;"><div style="text-align: center;">图5.1 人工管理下程序与数据之间的关系</div> </div>

随着计算机技术的发展，特别是大容量外存的出现，在

软件方面有了操作系统。计算机的应用范围不断扩大，它不仅用于科学计算，而且开始大量用于数据处理。这时的数据需要长期保存在计算机中，以便经常对数据进行处理。在这个阶段中，数据是以文件的形式存放在计算机中的，并且由操作系统中的文件系统来管理文件中的数据。这就是文件管理阶段。在这个阶段中，借助操作系统中的文件系统，数据可以用统一的格式，以文件的形式长期保存在计算机系统中，并且数据的各种转换以及存储位置的

安排，完全由文件系统来统一管理，从而使程序与数据之间具有一定的独立性。在这种情况下，由于程序是通过操作系统中的文件系统与数据文件进行联系的，因此，一个应用程序可以使用多个文件中的数据。不同的应用程序也可以使用同一个文件中的数据。程序与数据之间的关系如图5.2所示。

<div style="text-align: center;"><div style="text-align: center;">图 5.2 文件系统管理下程序与数据之间的关系</div> </div>

文件系统对数据的管理虽然比人工管理大大前进了一步，但随着计算机应用的不断发展，管理的数据规模越来越大，文件系统对数据的管理也就越来越不适应了。主要体现在以下三方面：

（1）数据的冗余度比较大。在文件管理阶段，由于数据还是面向应用的，数据文件是针对某个具体应用而建立起来的，因此，文件之间互相孤立，不能反映各文件中数据之间的联系，即使所用数据有许多相同的部分，不同的应用还需要建立不同的文件。也就是说，数据不能共享，从而使数据大量重复。这不仅造成存储空间的浪费，而且使数据的修改变得十分困难，很可能使数据不一致，从而影响数据的正确性。

（2）由于数据是面向应用的，因此程序与数据互相依赖。由于一个文件中的数据只为一个或几个应用程序所专用，因此，为了适应一些新的应用，要对文件中的数据进行扩展是很困难的。这是因为，一旦文件中数据的结构被修改，应用程序也必须作相应的修改。同样，如果在应用程序中对数据的使用方式发生了变化，则文件中数据的结构也必须随之作相应的修改。由此可以看出，在文件管理阶段，对数据的使用还是很不方便的。

（3）文件系统对数据的控制没有统一的方法，而是完全靠应用程序自己对文件中的数据进行控制，因此，使应用程序的编制很麻烦，而且缺乏对数据的正确性、安全性、保密性等有效且统一的控制手段。

总之，在文件管理阶段，还不能满足将大量数据集中存储、统一控制以及数据为多个用户所共享的需要。数据库技术正是为克服文件系统中对数据管理的不足而产生的。

数据库技术的根本目标是解决数据的共享问题。也正是这个问题的解决，使数据的数据库管理具有以下三个主要特点。

（1）数据是结构化的，是面向系统的，数据的冗余度小，从而节省了数据的存储空间，也减少了对数据的存取时间，提高了访问效率，避免了数据的不一致性，同时也提高了数据的可扩充性和数据应用的灵活性。

（2）数据具有独立性。通过系统提供的映像功能，使数据具有两方面的独立性。一是物理独立性，即由于数据的存储结构与逻辑结构之间由系统提供映像，因此当数据的存储结构改变时，其逻辑结构可以不变，从而基于逻辑结构的应用程序可不必修改；二是逻辑独立性，即由于数据的局部逻辑结构（它是总体逻辑结构的一个子集，由具体的应用程序所确定，并且根据具体的需要可以作一定的修改）与总体逻辑结构之间也由系统提供映像，因此当总

体逻辑结构改变时，其局部逻辑结构可以不变，从而根据局部逻辑结构编写的应用程序也可以不必修改。数据具有这两方面的独立性，使应用程序的维护大大简化。

（3）保证了数据的完整性、安全性和并发性。因为数据库中的数据是结构化的，数据量大，影响面也很大，因此，保证数据的正确性、有效性、相容性至关重要，必须充分予以保证。同时，因为往往有多个用户一起使用数据库，因此，数据库还要具有并发控制的功能，以避免并发程序之间互相干扰。

在数据库管理下，程序与数据之间的关系如图5.3所示。

<div style="text-align: center;"><div style="text-align: center;">图 5.3 数据库管理阶段程序与数据之间的关系</div> </div>

综上所述，可以说，数据库是一个通用化的、综合性的数据集合，它可以为各种用户所共享，具有最小的冗余度和较高的数据与程序的独立性，而且能并发地为多个应用服务，同时具有安全性和完整性。因此，数据库系统是一个功能很强的复杂系统，数据库技术是计算机领域中重要的技术之一。

## 2. 数据库管理系统

前面提到，数据库管理最本质的特点是实现数据的共享。为了实现数据的共享，保证数据的独立性、完整性和安全性，需要有一组软件来管理数据库中的数据，处理用户对数据库的访问，这组软件就是数据库管理系统（DBMS）。数据库管理系统与计算机系统内的其他软件一样，也在操作系统（OS）的支持下工作，它与操作系统的关系极为密切。操作系统、数据库管理系统与应用程序在一定的硬件支持下就构成了数据库系统。

数据库管理系统是数据库系统中实现各种数据管理功能的核心软件，它负责数据库中所有数据的存储、检索、修改以及安全保护等，数据库内的所有活动都是在其控制下进行的。数据库管理系统虽然依赖于操作系统的支持，但它作为一个管理数据的独立软件系统，较之计算机系统内的其他软件，有它自己的一些特点。例如，数据库管理系统具有一套独立于操作系统的存取数据的命令，数据存储空间的分配由数据库管理系统自己来完成等。

数据库管理系统具有较强的对数据进行集中控制的能力，它包含各种类型的系统程序。一个大型的数据库系统，其复杂程度可能远远超过一个操作系统。一般来说，数据库管理系统具有以下功能。

（1）定义数据库，包括总体逻辑数据结构的定义、局部逻辑数据结构的定义、存储结构定义、保密定义等。

（2）管理数据库，包括控制整个数据库系统的运行，数据存取、插入、删除、修改等操作，数据完整性和安全性控制以及并发控制等。

（3）建立和维护数据库，包括数据库的建立、数据更新、数据库再组织、数据库的维护、

数据库恢复以及性能监视等。

（4）数据通信，具备与操作系统的联机处理、分时系统以及远程作业输入的相应接口。

上述几方面的功能分别由数据库管理系统中的各个系统程序来实现，每个程序实现各自的功能。数据库管理系统中的主要程序模块可以划分成以下三部分。

（1）语言处理部分。语言处理部分又分为以下4部分。

① 数据描述语言(Data Description Language, DDL)解释程序。其中包括模式 DDL、子模式 DDL 和物理 DDL。

模式 DDL 是数据库管理员用来定义数据库总体逻辑数据结构的，它包括所有数据元素的名字、特征以及相互关系。模式 DDL 还用来定义数据的保密码以及有关安全性和完整性的规定、存储路径等。

子模式 DDL 是用户用来定义其所用的局部逻辑数据结构的。

物理 DDL 又称为设备介质语言，主要用来定义数据的物理存储方式，例如，怎样建立索引以及数据如何压缩、分页等。它是最低一级的描述，因此，它与硬件的特性密切相关。

② 数据操纵语言 DML 处理程序。DML 是数据库管理系统提供给用户进行存储、检索、修改和删除数据库中数据的工具。将用 DML 语言写的应用程序转换成主语言的一个过程调用语句，这种 DML 称为宿主型的。有的数据库系统还配有供用户直接检索和更新数据用的查询语言，通常由一组命令组成，这是一种独立使用的 DML。

③终端询问解释程序。用于解释终端询问的意义，决定操作执行过程。

④数据库控制命令解释程序。用于解释每个控制命令的定义，决定怎样工作。

（2）系统运行控制程序。系统控制运行程序又分为以下几个模块。

① 系统总控程序。它是 DBMS 的神经中枢，其功能是控制和协调 DBMS 中各程序的活动，使系统有条不紊地运行。

②访问控制程序。其功能主要是核对用户标识符、口令，核对授权表，检验访问的合法性等。

③并发控制程序。其功能是在多个用户同时访问数据库时，协调各个用户的访问。

④ 保密控制程序。其功能是在执行操作之前核对保密规定。

⑤ 数据完整性控制程序。其功能是在执行操作前或操作后，核对数据库完整约束条件，从而决定是否允许操作执行或清除已经执行操作的影响。

⑥ 数据访问程序。其功能是根据用户的访问请求，实施对数据的访问，从物理文件中查找数据，执行插入、删除、修改等操作。

⑦ 通信控制程序。实现用户程序与数据库管理系统之间的通信。

（3）系统建立与维护程序。它分为以下几个模块。

① 数据装入程序。其功能是将数据装入数据库。

② 工作日志程序。负责记录进入数据库系统的所有访问，包括用户名称、进入系统时间、进行何种操作、数据对象、数据改变情况等。

③ 性能监督程序。监督操作时间与存储空间的占用情况，作出系统性能估算。

④ 系统恢复程序。其功能是：当软、硬件遭到破坏时，负责将数据库系统恢复到可用状态。

⑤ 重新组织程序。其功能是：当数据库性能变坏时，对数据重新进行物理组织。

以上列举的是数据库管理系统通常包含的内容，一个具体的数据库管理系统包含的内容可以根据具体条件和要求来确定。例如，有的数据库管理系统没有物理DDL，有的数据库管理系统没有查询语言解释程序等。

## 3. 数据库系统的构成

前面提到，一个数据库系统是由操作系统、数据库管理系统（DBMS）和应用程序在一定的硬件支持下构成的。因此，数据库系统不仅指数据库本身，也不仅指数据库管理系统，而是指计算机系统中引进数据库以后的系统。对于较大型的数据库系统，通常还应有数据库管理员（DBA）。

数据库系统的层次结构如图5.4所示。

<div style="text-align: center;"><div style="text-align: center;">图 5.4 数据库系统的层次结构</div> </div>

一般来说，数据库系统中的每一层都依赖于内层的支持，而对最内层的硬件有一定的要求。例如，具有足够大的内存，以便能存放操作系统、数据库管理系统、应用程序以及数据表等；具有大容量的外存，以便存放大量的数据；具有高的数据通道能力等。

由图5.4还可以看出，在软件方面需要支持数据库系统的操作系统和DBMS。为了使数据库的使用简单方便，一般还要配备应用软件包。数据库管理系统是整个数据库系统的核心，它对数据库中的数据进行管理，还在用户的个别应用与整体数据库之间起接口作用。

数据库管理员负责整个数据库系统的建立、维护和协调工作。数据库管理员要熟悉操作系统和数据库管理系统，同时还要熟悉有关的业务工作。数据库管理员不仅要决定数据库的信息内容，进行数据的逻辑设计（描述模式），建立与用户的联系（描述子模式），决定存取结构和存取策略（描述物理模式），定义用户的存取权限；还要负责建立数据库及其维护和恢复的工作。由此可见，数据库管理员在数据库系统中的作用是很重要的。

下面通过一个应用程序从数据库中读取一个数据记录的例子，说明用户访问数据库中数据的过程，同时也具体反映了各部分的作用以及它们之间的相互关系。

图 5.5 表示用户访问数据库中数据时的过程及主要步骤。

（1）用户在应用程序中向 DBMS 发出读取记录的请求，同时给出记录名和要读取记录的关键字值。

（2）DBMS接到请求后，利用应用程序A所用的子模式来分析这一请求。

<div style="text-align: center;"><div style="text-align: center;">图 5.5 访问数据库中数据的过程及主要步骤</div> </div>

（3）DBMS 调用模式，进一步分析请求，根据子模式与模式之间变换的定义，决定应读入哪些模式记录。

（4）DBMS 通过物理模式将数据的逻辑记录转换为实际的物理记录。

（5）DBMS 向操作系统发出读取所需物理记录的请求。

（6）操作系统对实际的物理存储设备启动读操作。

（7）读出的记录从保存数据的物理设备送到系统缓冲区。

（8）DBMS 根据模式和子模式的规定，将记录转换为应用程序所需要的形式。

（9）DBMS 将数据从系统缓冲区传送到应用程序 A 的工作区。

（10）DBMS 向用户程序 A 发出本次请求执行情况的信息。

以上步骤是用户从数据库中读取数据的一般过程。对于不同类型的 DBMS，有可能在具体细节上稍有不同，但基本过程大体上是一致的。

## 1. 信息的存在形态

现实生活中反映客观事物的信息是各种各样的，在计算机中都以二进制数据的形式表示。数据库设计是与实际应用对象紧密相关的，为了对数据进行有效的管理，在设计数据库的过程中，首先必须对反映客观事物的各种信息及其相互之间的联系进行考察和分析，以便确切地用数据来描述它们。就信息的存在形态而言，可以将所有信息划分为三个阶段：现实（客观）世界、观念（信息）世界与数据世界。

（1）现实世界：在现实世界中所反映的是所有客观存在的事物及其相互之间的联系，它们只是处理对象最原始的表示形式。

（2）观念世界：观念世界又称为信息世界。在观念世界中所存在的信息是现实世界的客观事物在人们头脑中的反映，并经过一定的选择、命名和分类。在观念世界中的主要对象是实体（entity）。

实体是客观存在的事物在人们头脑中的反映。实体可以指人，如一个教师、一个学生、一个医生等；也可以指物，如一本书、一个茶杯等。实体不仅可以指实际的物体，还可以指抽象的事件，如一次演出、一次借书等；甚至还可以指事物与事物之间的联系，如“学生选课登记”“教师任课记录”等。

下面给出在观念世界中所涉及的几个基本概念。

① 属性：在观念世界中，属性是一个很重要的概念。所谓属性，是指事物在某一方面

的特性，例如，教师的属性有姓名、年龄、性别、职称等。

属性所取的具体值称为属性值。例如，某一教师的姓名为李明，这是教师属性“姓名”的取值；该教师的年龄为45，这是教师属性“年龄”的取值；等等。一个属性可能取的所有属性值的范围称为该属性的属性值的域。例如，教师属性“性别”的域为男、女；教师属性“职称”的域为助教、讲师、副教授、教授；等等。

②实体：若干属性的属性值的集合。例如，某一教师的姓名为李明，性别为男，年龄为45，职称为副教授，这是教师的一个实体。

由此可知，每个属性是个变量，属性值就是变量所取的值，而域是变量的变化的范围。因此，属性是表征实体的最基本的信息。

③实体型：表征某一类实体的属性的集合。例如，姓名、年龄、性别、职称等属性是表征“教师”这一类实体的，因此，用这些属性所描述的是实体型“教师”。

④实体集：同一类型实体的集合。例如，某一学校中的教师具有相同的属性，它们就构成了实体集“教师”。

在观念世界中，一般就用上述这些概念来描述各种客观事物以及相互之间的区别与联系。

（3）数据世界。信息经过加工、编码后即进入数据世界，可以利用计算机来处理它们。因此，数据世界中的对象是数据。现实世界中的客观事物及其联系在数据世界中是用数据模型来描述的。

与观念世界中的基本概念对应，在数据世界中也涉及一些基本概念。

① 数据项(字段)(field)：相应于观念世界中的属性。例如，实体型“教师”中的各个属性：姓名、年龄、性别、职称等就是数据项。

②记录(record)：每一个实体所对应的数据。例如，对应某一教师的各属性值：李明、45、男、副教授等就是一个记录。

③ 记录型(record type)：相应于观念世界中的实体型。

④ 文件(file)：相应于观念世界中的实体集。

⑤ 关键字(key)：能够唯一标识一个记录的字段集。

在数据世界中，就是通过上述这些概念来描述客观事物及其联系的。图5.6是“教师”记录型与“教师”文件的示意图。

<div style="text-align: center;"><div style="text-align: center;">(a) “教师”记录型</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) “教师”文件</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.6 “教师”记录型与“教师”文件的示意图</div> </div>

描述信息是为了更好地处理信息，计算机所处理的信息形式是数据。因此，为了用计算机来处理信息，首先必须将现实世界转换为观念世界，然后将观念世界中的信息数据化。

## 2. 实体间的联系

客观事物相互之间存在着各种各样的联系，因此，在描述客观事物时，不仅要描述客观事物本身，还要描述它们相互之间的联系。

客观事物之间的联系包括两方面：一是实体内部的联系，它反映在数据模型中是记录内部的联系；二是实体与实体之间的联系，在数据模型中表现为记录与记录之间的联系。实体之间各种各样的联系可以归结为三类：一对一的联系、一对多的联系、多对多的联系。

### 1）一对一（1：1）的联系

设有两个实体集  $ E_{1} $ 和  $ E_{2} $，如果  $ E_{1} $ 和  $ E_{2} $ 中的每一个实体最多与另一个实体集中的一个实体有联系，则称实体集  $ E_{1} $ 和  $ E_{2} $ 的联系是一对一的联系，通常表示为“1：1 的联系”。例如，实体集学校与实体集校长之间的联系就是 1：1 的联系。因为一个校长只领导一个学校，且一个学校也只有一个校长。

#### 2）一对多(1:n)的联系

设有两个实体集  $ E_{1} $ 和  $ E_{2} $，如果  $ E_{2} $ 中的每一个实体与  $ E_{1} $ 中的任意个实体（包括零个）有联系，而  $ E_{1} $ 中的每一个实体最多与  $ E_{2} $ 中的一个实体有联系，则称这样的联系为“从  $ E_{2} $ 到  $ E_{1} $ 的一对多的联系”，通常表示为“1：n 的联系”。例如，实体集学校与实体集教师之间的联系为一对多的联系。因为一个学校有许多教师，而一个教师只归属于一个学校。又如，校长实体集与学生实体集之间的联系也是一对多的联系。一对多的联系是实体集之间比较普遍的一种联系。

##### 3）多对多 $ m:n $的联系

设有两个实体集  $ E_{1} $ 和  $ E_{2} $，其中的每一个实体都与另一个实体集中的任意个（包括零个）实体有联系，则称这两个实体集之间的联系是“多对多的联系”，通常表示为“m：n 的联系”。例如，教师实体集与学生实体集之间的联系是多对多的联系。因为，一个教师要对许多学生进行教学，而一个学生要学习多个教师所讲授的课程。又如，学生实体集和课程实体集之间的联系也是一种多对多的联系。多对多的联系是实体集之间更具有一般性的联系。

由上述叙述可以看出，一对一的联系是最简单的一种实体联系，它是一对多的联系的一种特殊情况。一对多的联系是比较常见的一种实体联系，它又是多对多的联系的一种特殊情况。

#### 5.1.3 数据模型

数据模型是对客观事物及其联系的数据描述，它反映了实体内部以及实体与实体之间的联系，因此，数据模型是数据库设计的核心。

在数据库中，数据模型可以分为三个层次：外层、概念和内层，分别称为外模型、概念模型和内模型。外模型反映的是一种局部的逻辑结构，它与应用程序相对应，由用户自己定义。对应于一个数据库可以有多个外模型。概念模型反映的是总体的逻辑结构，对应于一个数据库只有一个概念模型，它是由数据库管理员所定义的。内模型是反映物理数据存储的模型，它也是由数据库管理员所定义的。

在数据库系统中，由于采用的数据模型不同，相应的数据库管理系统也不同。常用的数

据模型有3种：层次模型、网状模型和关系模型。

## 1. 层次模型

在层次模型中，实体之间的联系是用树结构来表示的，其中实体集（记录型）是树中的结点，而树中各结点之间的连线表示它们之间的关系。根据树结构的特点，建立数据的层次模型需要满足下列两个条件：

（1）有一个数据记录没有“父亲”，这个记录即是根结点。

（2）其他数据记录有且只有一个“父亲”。

在实际应用中，许多实体之间的联系本身就是自然的层次关系。例如，一个学校下属有若干个系、处和研究所；每个系下属有若干个教研组和办公室，每个研究所下属有若干个科研组和办公室，每个处下属有若干个科室；等等。这样一个学校的行政机构就明显地有着层次关系，可以用图5.7所示的层次模型将这种关系表示出来。

<div style="text-align: center;"><div style="text-align: center;">图5.7 学校行政机构的层次模型</div> </div>

层次模型最明显的特点是层次清楚，构造简单，易于实现，它可以很方便地表示出一对一和一对多的两种实体之间的联系。但是，层次模型不能直接表示多对多的实体之间的联系。如果要用层次模型来表示实体之间的多对多的联系，则必须首先将实体之间多对多的联系分解为几个一对多的联系才能表示出来。因此，对于复杂的数据关系，用层次模型表示是比较麻烦的，这也正是层次模型的局限性。

以层次模型为数据模型所设计的数据库称为层次数据库。层次模型的数据库管理系统是最早出现的数据库系统。

## 2. 网状模型

网状数据模型是以记录型为结点的网状结构，它的特点是：

（1）可以有一个以上的结点无“父亲”。

（2）至少有一个结点有多于一个的“父亲”。

由这两个特点可知，网状模型可以描述数据之间的复杂关系。例如，关于学校的教学情况可以用图5.8所示的网状模型来描述。

网状模型和层次模型都属于格式化模型。所谓格式化模型，是指在建立数据模型时，根据应用的需要，事先将数据之间的逻辑关系固定下来，即先对数据逻辑结构进行设计，使数据结构化。由于网状模型中所描述的数据之间的关系要比层次模型复杂得多，为了描述记录之间的联系，引进了系(set)的概念，每一种联系都用系来表示，并给予不同的名字，以便互相区别，如图5.8中的教师-课程系、课程-学习系、学生-学习系和班级-学生系等。

用网状模型设计出来的数据库称为网状数据库。网状数据库是应用较为广泛的一种数

<div style="text-align: center;"><div style="text-align: center;">图 5.8 学校教学情况的网状模型</div> </div>

据库，它不仅具有层次模型数据库的一些特点，而且能方便地描述较为复杂的数据关系，可以直接表示实体之间多对多的联系。可以看出，网状模型是层次模型的一般形式，层次模型则是网状模型的特殊情况。

## 3. 关系模型

关系模型是与格式化模型完全不同的数据模型，它与层次模型、网状模型相比有着本质的区别。关系模型用表格数据来表示实体本身及其相互之间的联系，它是建立在数学理论基础上的。

在关系模型中，把数据看成一个二维表，每一个二维表称为一个关系。例如，表5.1所示的二维表就是一个关系，表中的每一列称为一个属性，相当于记录中的一个数据项，对属性的命名称为属性名，表中的一行称为一个元组，相当于记录值。

<div style="text-align: center;"><div style="text-align: center;">表5.1 关系例</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>学号  $ S^{\#} $</td><td style='text-align: center; word-wrap: break-word;'>学生姓名 SN</td><td style='text-align: center; word-wrap: break-word;'>所属系 SD</td><td style='text-align: center; word-wrap: break-word;'>...</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{1} $</td><td style='text-align: center; word-wrap: break-word;'>WANG</td><td style='text-align: center; word-wrap: break-word;'>MATH</td><td style='text-align: center; word-wrap: break-word;'></td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{2} $</td><td style='text-align: center; word-wrap: break-word;'>MA</td><td style='text-align: center; word-wrap: break-word;'>PHYS</td><td style='text-align: center; word-wrap: break-word;'>...</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>...</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{n} $</td><td style='text-align: center; word-wrap: break-word;'>ZHANG</td><td style='text-align: center; word-wrap: break-word;'>CHEM</td><td style='text-align: center; word-wrap: break-word;'>...</td></tr></table>

对于一个表示关系的二维表，其最基本的要求是，表中元组的每一个分量必须是不可分的数据项，即不允许表中再有表。关系是关系模型中最基本的概念。

在格式化模型中，要事先根据应用的需要，将数据之间的逻辑关系固定下来，即先对数据进行结构化。但在关系模型中，不需要事先构造数据的逻辑关系，只要将数据按照一定的关系存入计算机，也就是建立关系。当需要用这些数据作某种应用时，就将这些关系归结为某些集合的运算，如并、交、差以及投影等，从而达到在许多数据中选取所需要数据的目的。

关系模型较之格式化模型有以下几方面的优点。

### 1）数据结构比较简单

在关系模型中，对实体的描述、实体之间联系的描述，都采用关系这个单一的结构来表

示，因此，数据的结构比较简单、清晰。

#### 2）具有很高的数据独立性

在关系模型中，用户完全不涉及数据的物理存储，只与数据本身的特性发生关系，因此数据独立性很高。

##### 3）可以直接处理多对多的联系

在关系模型中，由于使用表格数据来表示实体之间的联系，因此，可以直接描述多对多的实体联系。例如，表5.2所示的二维表表示了一个“学生选课”的关系。在层次模型和网状模型中，都不能直接表示出“学生”和“课程”这两个实体之间多对多的联系，而必须通过引进“学生选课”这样一种记录，将其分解为两个一对多的联系，才能表示出它们的联系。但在表5.2所示的二维表中，则能直接表示出它们之间的联系。

<div style="text-align: center;"><div style="text-align: center;">表5.2 “学生选课”关系的二维表</div> </div>

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>学号</td><td style='text-align: center; word-wrap: break-word;'>姓名</td><td style='text-align: center; word-wrap: break-word;'>课程号</td><td style='text-align: center; word-wrap: break-word;'>学时数</td><td style='text-align: center; word-wrap: break-word;'>学分</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>814706</td><td style='text-align: center; word-wrap: break-word;'>张三</td><td style='text-align: center; word-wrap: break-word;'>JS1</td><td style='text-align: center; word-wrap: break-word;'>64</td><td style='text-align: center; word-wrap: break-word;'>4</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>813204</td><td style='text-align: center; word-wrap: break-word;'>李四</td><td style='text-align: center; word-wrap: break-word;'>JS2</td><td style='text-align: center; word-wrap: break-word;'>32</td><td style='text-align: center; word-wrap: break-word;'>2</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>...</td><td style='text-align: center; word-wrap: break-word;'>...</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>811754</td><td style='text-align: center; word-wrap: break-word;'>赵六</td><td style='text-align: center; word-wrap: break-word;'>J3</td><td style='text-align: center; word-wrap: break-word;'>48</td><td style='text-align: center; word-wrap: break-word;'>3</td></tr></table>

##### 4）有坚实的理论基础

在层次模型和网状模型的系统研究和数据库设计中，其性能和质量主要决定于设计者的经验和技术水平，而缺乏一定的理论指导。因此，系统的研制和数据库的设计都比较盲目，即使是同一个数据库管理系统，相同的应用、不同设计者设计出来的系统其性能可以差别很大。关系模型以数学理论为基础，从而避免了层次模型和网状模型系统中存在的问题。

在层次模型中，一个 n 元关系有 n 个属性，属性的取值范围称为值域。

一个关系的属性名表称为关系模式，也就是二维表的表框架，相当于记录型。若某一关系的关系名为 R，其属性名为  $ A_{1}, A_{2}, \cdots, A_{n} $，则该关系的关系模式记为

 $$ R\left(A_{1},A_{2},\cdots,A_{n}\right) $$

例如，图5.9所示的二维表为一个三元关系，其关系名为ER，关系模式（二维表的表框架）为ER（S#，SN，SD）。其中，S#，SN，SD

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="3">ER</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>学号 S#</td><td style='text-align: center; word-wrap: break-word;'>学生姓名 SN</td><td style='text-align: center; word-wrap: break-word;'>所属系 SD</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{1} $</td><td style='text-align: center; word-wrap: break-word;'>CHANG</td><td style='text-align: center; word-wrap: break-word;'>MATH</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{2} $</td><td style='text-align: center; word-wrap: break-word;'>WANG</td><td style='text-align: center; word-wrap: break-word;'>EL</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{3} $</td><td style='text-align: center; word-wrap: break-word;'>LI</td><td style='text-align: center; word-wrap: break-word;'>PHSY</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{4} $</td><td style='text-align: center; word-wrap: break-word;'>HU</td><td style='text-align: center; word-wrap: break-word;'>COM</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{5} $</td><td style='text-align: center; word-wrap: break-word;'>MA</td><td style='text-align: center; word-wrap: break-word;'>EL</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 5.9 关系 ER</div> </div>

分别是这个关系中的三个属性的名字， $ \{S_1, S_2, S_3, S_4, S_5\} $ 是属性  $ S \notin $（学号）的值域， $ \{CHANG, WANG, LI, HU, MA\} $ 是属性  $ SN $（学生姓名）的值域， $ \{MATH, EL, PHYS, COM\} $ 是属性  $ SD $（所属系）的值域。

### 5.2 关系代数

前面提到，在关系模型数据库中，把对数据的操作归结为各种集合运算。实际上，在关系模型的数据语言中，一般除了运用常规的集合运算（并、交、差、笛卡儿积等）外，还定义了

一些专门的关系运算，如投影、选择、联接等运算。前者将关系（二维表）看成元组的集合，这些运算主要是从二维表的行的方向来进行的；后者主要是从二维表的列的方向来进行运算。两者统称为关系代数。

本节将分别介绍关系代数中的各种运算。

## 1. 并运算（union）

假设有 n 元关系 R 和 n 元关系 S，它们相应的属性值取自同一个域，则它们的并仍然是一个 n 元关系，它由属于关系 R 或属于关系 S 的元组组成，并记为  $ R \cup S $。并运算满足交换律，即  $ R \cup S $ 与  $ S \cup R $ 是相等的。

例 5.1 设关系 R 和关系 S 分别如图 5.10(a) 和 (b) 所示，则关系  $ R \cup S $ 如图 5.10(c) 所示。

<div style="text-align: center;"><div style="text-align: center;">(a) 关系 R</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 关系 S</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 关系RUS</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.10 关系的并运算示例</div> </div>

## 2. 差运算（difference）

假设有 n 元关系 R 和 n 元关系 S，它们相应的属性值取自同一个域，则 n 元关系 R 和 n 元关系 S 的差仍然是一个 n 元关系，它由属于关系 R 而不属于关系 S 的元组组成，并记为 R-S。特别要注意的是，差运算不满足交换律，即 R-S 与 S-R 是不相等的。

例 5.2 设关系 R 和关系 S 分别如图 5.11(a) 和(b) 所示，则关系 R-S 如图 5.11(c) 所示。

<div style="text-align: center;"><div style="text-align: center;">(a) 关系 R</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 关系 S</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 关系 R-S</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.11 关系的差运算示例</div> </div>

## 3. 交运算（intersection）

假设有 n 元关系 R 和 n 元关系 S，它们相应的属性值取自同一个域，则它们的交仍然是

一个 n 元关系，它由属于关系 R 且又属于关系 S 的元组组成，并记为  $ R \cap S $。交运算满足交换律，即  $ R \cap S $ 与  $ S \cap R $ 是相等的。

例 5.3 设关系 R 和关系 S 分别如图 5.12(a) 和 (b) 所示，则关系  $ R \cap S $ 如图 5.12(c) 所示。

<div style="text-align: center;"><div style="text-align: center;">(a) 关系 R</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 关系 S</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(c) 关系  $ R \cap S $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.12 关系的交运算例</div> </div>

特别要指出的是，在上面的三种运算中，都要求参加运算的两个关系具有相同的属性名表，其运算结果也与它们具有相同的属性名，即它们的表框架是相同的。还要注意，并运算与交运算满足交换律，而差运算是不满足交换律的。

## 4. 笛卡儿积（Cartesian product）

设有 m 元关系 R 和 n 元关系 S，则 R 与 S 的笛卡儿积记为  $ R \times S $，它是一个  $ m+n $ 元组的集合  $ (m+n $ 元关系 $ ) $，其中每个元组的前 m 个分量是 R 的一个元组，后 n 个分量是 S 的一个元组。 $ R \times S $ 是所有具备这种条件的元组组成的集合。在实际进行组合时，可以从 R 的第一个元组开始到最后一个元组，依次与 S 的所有元组组合，最后得到  $ R \times S $ 的全部元组。显然， $ R \times S $ 共有  $ m \times n $ 个元组。

例 5.4 设关系 R 和关系 S 分别如图 5.13(a) 和 (b) 所示，则其笛卡儿积  $ R \times S $ 如图 5.13(c) 所示。

<div style="text-align: center;"><div style="text-align: center;">(a) 关系 R</div> </div>

<div style="text-align: center;"><div style="text-align: center;">(b) 关系 S</div> </div>

<div style="text-align: center;"><div style="text-align: center;">（c）笛卡儿积 $ R \times S $</div> </div>

<div style="text-align: center;"><div style="text-align: center;">图 5.13 关系的笛卡儿积例</div> </div>

笛卡儿积在下面要介绍的连接运算中是很有用的。

## 5. 选择运算（selection）

选择运算是在指定的关系中选取所有满足给定条件的元组，构成一个新的关系，而这个新的关系是原关系的一个子集。选择运算用公式表示为

 $$ R[g]=\{r\mid r\in R 且 g(r) 为真 \} $$

或

 $$ \sigma_{g}(R)=\{r\mid r\in R 且 g(r) 为真 \} $$

公式中的 R 是关系名；g 为一个逻辑表达式，取值为真或假。g 由逻辑运算符  $ \land $ 或 and（与）、 $ \lor $ 或 or（或）、 $ \neg $ 或 not（非）联接各算术比较表达式组成；算术比较符有 =、≠、>、≥、<、≤，其运算对象为常量、属性名或简单函数。在后一种表示中， $ \sigma $ 为选择运算符。

由选择运算的定义可以看出，选择运算在关系中的行的方向上进行运算，从一个关系中选择满足条件的元组。

例 5.5 设关系 R 如图 5.14 所示。如果要选择所在系(SD)为 COM 且所选课程(C#)为  $ C_{1} $ 的那些元组，则其运算为

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td colspan="4">R</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S#</td><td style='text-align: center; word-wrap: break-word;'>SN</td><td style='text-align: center; word-wrap: break-word;'>SD</td><td style='text-align: center; word-wrap: break-word;'>C#</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{1} $</td><td style='text-align: center; word-wrap: break-word;'>MA</td><td style='text-align: center; word-wrap: break-word;'>ELE</td><td style='text-align: center; word-wrap: break-word;'>$ C_{3} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{2} $</td><td style='text-align: center; word-wrap: break-word;'>HU</td><td style='text-align: center; word-wrap: break-word;'>COM</td><td style='text-align: center; word-wrap: break-word;'>$ C_{1} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{3} $</td><td style='text-align: center; word-wrap: break-word;'>LI</td><td style='text-align: center; word-wrap: break-word;'>MATH</td><td style='text-align: center; word-wrap: break-word;'>$ C_{2} $</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>$ S_{4} $</td><td style='text-align: center; word-wrap: break-word;'>CHEN</td><td style='text-align: center; word-wrap: break-word;'>PHSY</td><td style='text-align: center; word-wrap: break-word;'>$ C_{1} $</td></tr></table>

 $$ R[\mathrm{S D}=\mathrm{C O M}^{\prime}\land\mathrm{C}\#=\mathrm{C}_{1}^{\prime}] $$

<div style="text-align: center;"><div style="text-align: center;">图 5.14 关系 R</div> </div>

或表示为

 $$ \sigma_{SD=^{\prime}COM^{\prime}\land C\#=^{\prime}C1^{\prime}}(R) $$

运算结果如图5.15所示。

<table border=1 style='margin: auto; word-wrap: break-word;'><tr><td style='text-align: center; word-wrap: break-word;'>S\#</td><td style='text-align: center; word-wrap: break-word;'>SN</td><td style='text-align: center; word-wrap: break-word;'>SD</td><td style='text-align: center; word-wrap: break-word;'>C\#</td></tr><tr><td style='text-align: center; word-wrap: break-word;'>S_{2}</td><td style='text-align: center; word-wrap: break-word;'>HU</td><td style='text-align: center; word-wrap: break-word;'>COM</td><td style='text-align: center; word-wrap: break-word;'>C_{1}</td></tr></table>

<div style="text-align: center;"><div style="text-align: center;">图 5.15 关系 R[SD='COM' ∧ C#='C']</div> </div>

在进行选择运算时，条件表达式中的各运算符的运算顺序为：先算术比较符，后逻辑运算符。逻辑运算符的运算顺序为： $ \neg(\text{not}) $、 $ \land(\text{and}) $、 $ \lor(\text{or}) $。
