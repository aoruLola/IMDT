module.exports=chapters=>{
const pseudocode={
'algorithm':'max(a,n):\n  若 n=0：返回“无最大值”\n  best ← a[0]\n  对 i=1 到 n−1：\n    若 a[i]>best：best ← a[i]\n  返回 best',
'lists':'insert_after(p,s):\n  要求 p,s 有效且 s 不在链中\n  s.next ← p.next\n  p.next ← s\nremove_after(p):\n  q ← p.next\n  若 q 为空：返回失败\n  p.next ← q.next\n  保存结果，再释放由本表拥有的 q',
'stack-queue':'match(text):\n  栈 S ← 空\n  逐字符 c：\n    若 c 为左括号：push(S,c)\n    若 c 为右括号：\n      若 S 为空或栈顶类型不匹配：返回假\n      pop(S)\n  返回 S 为空',
'strings-arrays':'prefix(pattern):\n  若模式空：返回空表\n  pi[0] ← 0\n  对 i=1 到 m−1：\n    j ← pi[i−1]\n    当 j>0 且 pattern[i]≠pattern[j]：j ← pi[j−1]\n    若 pattern[i]=pattern[j]：j ← j+1\n    pi[i] ← j\n  返回 pi\n空模式在查找中的结果须另定，本课约定匹配位置0。',
'trees':'preorder(node):\n  若 node 为空：返回\n  访问 node\n  preorder(node.left)\n  preorder(node.right)\n将访问根移到两次递归之间是中序；移到之后是后序。',
'huffman':'把所有正频率叶放入最小优先队列Q\n当 Q 至少有2项：\n  a ← 取最小项；b ← 再取最小项\n  新根权重 ← a.weight+b.weight\n  新根左右孩子 ← a,b\n  新根放回Q\n仅一个符号时，实际码流需约定长度/码字以支持解码。',
'graphs':'BFS(start):\n  start 标为已发现并入队\n  当队列非空：\n    u ← 出队；访问u\n    对u的邻居v（按题目约定次序）：\n      若v未发现：标记v并入队\n非连通图外层还须遍历所有未发现顶点。',
'graph-paths':'Dijkstra(start):\n  d[start] ← 0；其他d ← ∞；已确定集合S ← 空\n  重复：\n    选S外有限d最小的u；若不存在则停止\n    u加入S\n    对u的出边(u,v,w)：\n      若d[u]+w<d[v]：更新d[v]与前驱\n前提：所有边权非负；未可达点保持∞。',
'search':'binary(a,n,key):\n  l ← 0；r ← n−1\n  当 l≤r：\n    mid ← l+floor((r−l)/2)\n    若a[mid]=key：返回mid\n    若a[mid]<key：l ← mid+1\n    否则：r ← mid−1\n  返回未找到\n前提：a非降序且可随机访问；返回任一匹配位置。',
'sorting':'insertion(a,n):\n  对i=1到n−1：\n    value ← a[i]；j ← i\n    当j>0且a[j−1]>value：\n      a[j] ← a[j−1]；j ← j−1\n    a[j] ← value\n严格大于才右移，可保持同键顺序。',
'synchronization':'生产者：P(empty) → P(mutex) → 放入 → V(mutex) → V(full)\n消费者：P(full) → P(mutex) → 取出 → V(mutex) → V(empty)\n初值：empty=N，full=0，mutex=1。\nP/V操作本身必须原子化；不在持mutex时等待空位或数据。',
'memory-files':'LRU访问(page):\n  若page在页框：将其更新为最近使用\n  否则：缺页次数加1\n    若已满：淘汰最久未使用页\n    装入page并记为最近使用\nFIFO命中时不改变装入先后次序。'
};
const byId=new Map(chapters.flatMap(c=>c.lessons).map(l=>[l.id,l]));
for(const [id,code]of Object.entries(pseudocode))byId.get('843-'+id).fields['补充']='先按图示和正文用纸笔追踪，再阅读以下伪代码。箭头←为赋值，“若”为条件，“当”为循环；不是可直接编译的C。\n\n```伪代码\n'+code+'\n```';
for(const id of ['c-control','c-memory','lists','search','sorting'])byId.get('843-'+id).code=true;
byId.get('843-sql').code=true;
byId.get('843-ui-story').visual='wireframe';
byId.get('843-graph-paths').visual='weighted';
byId.get('843-graph-matrix').visual='weighted';
byId.get('843-divide-sort').visual='quick';
byId.get('843-heap-radix').visual='heap';
for(const l of byId.values())for(const k of Object.keys(l.fields))l.fields[k]=l.fields[k].replace('概率Cᴷᴹ的写法容易混淆，本节统一写','概率可写为');
for(const l of byId.values())for(const k of Object.keys(l.fields))l.fields[k]=l.fields[k].replace('下图可逐步观察','上方图示可逐步观察');
};
