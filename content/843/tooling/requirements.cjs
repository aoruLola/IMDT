const R=(id,page,title,ids)=>({id,page,title,source:'syllabus',lessons:ids.split(' ').map(s=>'843-'+s)});
module.exports=[
R('A1a',2,'随机事件与概率','events conditional bayes'),R('A1b',2,'常见随机变量及分布','distribution models joint more-models'),R('A1c',2,'随机变量的数字特征','moments'),
R('A2a',2,'总体与样本','sampling'),R('A2b',2,'统计量','sample-distributions'),R('A3a',2,'行列式、矩阵及其运算','matrix-entry matrix-product determinant cofactor-inverse'),R('A3b',2,'矩阵的初等变换与线性方程组','elimination cramer span rank-basis homogeneous-system nonhomogeneous-system parameter-system'),
R('A4a',2,'数值：二、八、十六进制','bases'),R('A4b',2,'数字与字符表示和编码','bases logic floating'),R('A4c',3,'计算机硬件组成等基础知识','cpu'),
R('A5a',3,'集合与算法的基本概念','symbols algorithm'),R('A5b',3,'数据结构及其运算','lists stack-queue strings-arrays trees huffman graphs graph-paths graph-matrix'),R('A5c',3,'查找与排序','search sorting divide-sort heap-radix'),R('A5d',3,'资源管理技术','processes synchronization memory-files'),R('A5e',3,'数据库设计技术','relational sql normalization'),R('A5f',3,'应用软件设计与开发技术','requirements lifecycle-testing architecture'),R('A5g',3,'大数据技术与人工智能概述','data-pipeline learning neural-generative'),
R('B1',3,'洞察力：发现、思考与分析现实生活问题','design-function ethics research define-ideate'),R('B2',3,'学习力：吸收、记忆、消化、运用与跨界学习','design-history visual-language media-types media-history answer-method integrate'),R('B3',3,'思维力：运用互联网＋思维与方法提出创新方案','interaction-narrative select-prototype evaluate integrate'),R('B4',3,'表现力：设计表现技能','lines-forms perspective people-scenes ui-story answer-layout')
];
