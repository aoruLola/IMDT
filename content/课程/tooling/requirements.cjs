// Independent requirement inventory, keyed to the numbered clauses in the
// university-hosted document headed 2018. Names are our short topic summaries.
const groups=[
 ['高数一',1,['函数与建模|function elementary-atlas optimization','函数性质|properties','复合、分段、反函数与隐式关系|composition function implicit-parametric','初等函数|elementary-atlas composition p-exp p-trig','极限与单侧趋势|limit','极限法则|limit-rules','存在准则与重要极限|sequence important-limits','无穷小的比较|important-limits','连续与间断|continuity','连续函数性质|continuity']],
 ['高数二',2,['导数微分意义与切法线|derivative higher-differential piecewise-derivative','求导法则与微分运算|derivative-rules higher-differential','高阶导数|higher-differential','分段隐式参数反函数求导|piecewise-derivative implicit-parametric derivative-rules','中值与泰勒|rolle-lagrange cauchy-proof taylor','洛必达|lhopital','单调极值最值应用|monotone-extrema optimization','凹凸拐点渐近线作图|shape','曲率与曲率圆|curvature']],
 ['高数三',2,['原函数与两类积分|primitive riemann','积分公式性质与两种方法|primitive substitution parts riemann fundamental','有理三角根式积分|rational-integrals substitution','变限积分与基本公式|fundamental','反常积分|improper','几何物理量与平均值|area-volume length-surface physical-integrals']],
 ['高数四',3,['多元函数与图像|multivariable-limit','极限连续与闭区域性质|multivariable-limit multivariable-extrema','偏导全微分复合与隐式|partial-total multivariable-chain','多元极值约束与应用|multivariable-extrema','二重积分|double-cartesian double-order double-polar']],
 ['高数五',3,['方程与初值概念|ode-separable','三类一阶方程|ode-separable ode-first','降阶|ode-reduction','线性解结构|ode-linear','二阶及高阶常系数齐次|ode-linear ode-higher-model','常系数非齐次|ode-forced','方程应用|ode-higher-model']],
 ['线代一',4,['行列式及性质|determinant','展开与计算|cofactor-inverse determinant']],
 ['线代二',4,['矩阵与特殊矩阵|matrix-entry special-blocks orthogonal','矩阵运算|matrix-product determinant','逆与伴随|cofactor-inverse cramer','初等变换等价与秩|elimination special-blocks rank-basis','分块|special-blocks']],
 ['线代三',4,['向量与表示|span','相关与无关|span','极大无关组与秩|rank-basis','等价及行列秩|rank-basis','内积与正交化|orthogonal']],
 ['线代四',5,['克拉默|cramer','解的存在条件|homogeneous-system nonhomogeneous-system','基础解系与齐次通解|homogeneous-system','非齐次解结构|nonhomogeneous-system','消元解方程|elimination parameter-system']],
 ['线代五',5,['特征值与特征向量|eigen','相似与对角化|diagonalization','对称矩阵|symmetric-eigen']],
 ['线代六',5,['二次型表示与合同|quadratic-form','标准形惯性与化简|quadratic-form','正定|positive-definite']]
];
module.exports=groups.flatMap(([group,page,rows])=>rows.map((row,i)=>{const [title,ids]=row.split('|');const actualPage=group==='高数三'&&i>=4?3:group==='线代三'&&i===4?5:page;return{id:`${group}-${i+1}`,title,page:actualPage,lessons:ids.split(' ')};}));
