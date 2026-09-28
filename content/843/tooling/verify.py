"""Independent arithmetic, enumeration, algorithm and SQLite checks for 843.
Uses only Python's standard library; compiler invocation is a separate step.
"""
from fractions import Fraction as F
from itertools import combinations, product, permutations
from math import comb, exp, isclose
from pathlib import Path
import json, sqlite3, struct, hashlib, heapq
root = Path(__file__).resolve().parents[1]
checks=[]
def check(name, actual, expected):
    assert actual == expected, (name, actual, expected)
    checks.append(name)
def near(name, actual, expected):
    assert isclose(actual, expected, rel_tol=1e-10, abs_tol=1e-10), (name,actual,expected)
    checks.append(name)
check('combination5choose2',len(list(combinations(range(5),2))),10)
check('choose6group3leader',comb(6,3)*3,60)
check('union cards',len(set([2,4,6])|set([5,6])),4)
check('at least one head',sum(any(x) for x in product([0,1],repeat=3)),7)
check('two red without replacement',F(comb(3,2),comb(5,2)),F(3,10))
check('conditional',F(3,10)/F(1,2),F(3,5))
check('bayes detection',F(90,90+495),F(2,13))
check('bayes production',F(4,10)*F(5,100)/(F(6,10)*F(2,100)+F(4,10)*F(5,100)),F(5,8))
check('channel posterior',F(4,10)*F(2,10)/(F(6,10)*F(1,10)+F(4,10)*F(2,10)),F(4,7))
check('binomial3half',sum(sum(x)==2 for x in product([0,1],repeat=3)),3)
near('exponential tail',exp(-2*.5),0.36787944117144233)
near('poisson1',2*exp(-2),0.2706705664732254)
check('mock A binomial',3*F(14,100)*F(86,100)**2,F(310632,1000000))
check('mock A binomial variance',3*F(14,100)*F(86,100),F(3612,10000))
check('geometric third',F(3,4)**2*F(1,4),F(9,64))
check('hypergeometric one',F(comb(3,1)*comb(2,1),comb(5,2)),F(3,5))
check('hypergeometric two',F(comb(2,2),comb(6,2)),F(1,15))
def moments(values, ps):
    mean=sum(x*p for x,p in zip(values,ps)); second=sum(x*x*p for x,p in zip(values,ps))
    return mean,second-mean*mean
check('waiting variance',moments([0,10],[F(1,2)]*2),(5,25))
check('symmetric covariance example',moments([-1,0,1],[F(1,4),F(1,2),F(1,4)]),(0,F(1,2)))
check('affine variance',9*F(16,10),F(144,10))
def sample(a):
    mean=F(sum(a),len(a));return mean,sum((x-mean)**2 for x in a)/(len(a)-1)
check('sample123',sample([1,2,3]),(2,1))
check('sample246',sample([2,4,6]),(4,4))
check('sample2446',sample([2,4,4,6]),(4,F(8,3)))
check('standard error',F(4,4),1)
check('matrix AB',[1*1+2*3,1*0+2*1,0*1+1*3,0*0+1*1],[7,2,3,1])
check('mock matrix determinant',1*5-2*2,1)
check('mock matrix solution',[1*1+2*2,2*1+5*2],[5,12])
for a,b in product(range(-2,4),repeat=2):
    if a!=1:
        y=F(b-2,a-1);x=2-y;check(f'parameter substitution {a},{b}',(x+y,x+a*y),(2,b))
check('bases45',(format(45,'08b'),format(45,'X')),('00101101','2D'))
check('basesD6',int('11010110',2),int('326',8))
check('negative6',format((-6)%256,'08b'),'11111010')
check('float1.5',struct.pack('>f',1.5).hex(),'3fc00000')
check('binary fraction625',F(1,2)+F(1,8),F(625,1000))
check('page2500',5*1024+2500%1024,5572)
check('page700',9*256+700%256,2492)
check('array offset',(2*4+1)*4,36)
check('CPUtime',F(10**8*2,2*10**9),F(1,10))
check('circular count',(1-3+5)%5,3)
def prefix(p):
    # Independent definition-based enumeration, not the taught KMP loop.
    return [max([0]+[k for k in range(1,i+1) if p[:k]==p[i-k+1:i+1]]) for i in range(len(p))]
check('prefixABAB',prefix('ABAB'),[0,0,1,2])
check('prefixAAAA',prefix('AAAA'),[0,1,2,3])
def huffman(weights):
    q=weights[:];heapq.heapify(q);cost=0
    while len(q)>1:
        v=heapq.heappop(q)+heapq.heappop(q);cost+=v;heapq.heappush(q,v)
    return cost
check('huffman1234',huffman([1,2,3,4]),19)
check('huffman237',huffman([2,3,7]),17)
edges=[('A','B',1),('A','C',4),('B','C',2),('B','D',5),('C','D',1)]
weights={frozenset([u,v]):w for u,v,w in edges}
costs=[]
for midlen in range(3):
    for mids in permutations(['B','C'],midlen):
        p=('A',)+mids+('D',)
        if all(frozenset([u,v]) in weights for u,v in zip(p,p[1:])):costs.append(sum(weights[frozenset([u,v])] for u,v in zip(p,p[1:])))
check('shortest path brute force',min(costs),4)
trees=[]
for picked in combinations(edges,3):
    seen={'A'}
    for _ in range(4):
        for u,v,w in picked:
            if u in seen or v in seen:seen.update([u,v])
    if len(seen)==4:trees.append(sum(w for u,v,w in picked))
check('MST brute force',min(trees),4)
def partition(a):
    a=a[:];i=0
    for j in range(len(a)-1):
        if a[j]<=a[-1]:a[i],a[j]=a[j],a[i];i+=1
    a[i],a[-1]=a[-1],a[i];return a,i
check('quick partition312',partition([3,1,2]),([1,2,3],1))
check('quick partition4231',partition([4,2,3,1]),([1,2,3,4],0))
for n in range(1,6):
    for a in product(range(3),repeat=n):
        b,i=partition(list(a));assert all(v<=b[i] for v in b[:i]) and all(v>b[i] for v in b[i+1:]) and sorted(b)==sorted(a)
checks.append('partition exhaustive: empty handled before call, 363 duplicate/boundary arrays')
check('radix ones',sorted([21,13,12],key=lambda n:n%10),[21,12,13])
check('radix tens',sorted([21,12,13],key=lambda n:n//10),[12,13,21])
def faults(seq, lru):
    queue=[];n=0
    for page in seq:
        if page in queue:
            if lru:queue.remove(page);queue.append(page)
        else:
            n+=1
            if len(queue)==2:queue.pop(0)
            queue.append(page)
    return n
check('FIFO',faults([1,2,1,3,1],False),4)
check('LRU',faults([1,2,1,3,1],True),3)
check('FCFS wait',F(0+3+4,3),F(7,3))
check('SJF wait',F(0+1+3,3),F(4,3))
def safe(available,alloc,maximum):
    work=available;done=set();order=[]
    while len(done)<len(alloc):
        found=next((i for i in range(len(alloc)) if i not in done and maximum[i]-alloc[i]<=work),None)
        if found is None:return None
        done.add(found);order.append(found);work+=alloc[found]
    return order
check('resource safe',safe(1,[1,1],[2,3]),[0,1])
check('weighted means18',F(2*10+8*20,10),18)
check('weighted means9',F(2*5+8*10,10),9)
check('precision recall A',(F(8,20),F(8,10)),(F(2,5),F(4,5)))
check('precision recall B',(F(6,10),F(6,8)),(F(3,5),F(3,4)))
check('MAE',F(abs(3-2)+abs(3-5)+abs(7-8),3),F(4,3))
check('neuron',max(0,2*1-3+1),0)
db=sqlite3.connect(':memory:');db.executescript((root/'examples/library.sql').read_text(encoding='utf8'))
check('SQL having',db.execute('SELECT reader_id,COUNT(*) FROM Loan WHERE returned=0 GROUP BY reader_id HAVING COUNT(*)>=2').fetchall(),[(1,2)])
check('SQL left join filtered',db.execute('SELECT r.id,COUNT(l.id) FROM Reader r LEFT JOIN Loan l ON l.reader_id=r.id AND l.returned=0 GROUP BY r.id ORDER BY r.id').fetchall(),[(1,2),(2,1),(3,0)])
check('SQL left join all',db.execute('SELECT r.id,COUNT(l.id) FROM Reader r LEFT JOIN Loan l ON l.reader_id=r.id GROUP BY r.id ORDER BY r.id').fetchall(),[(1,2),(2,2),(3,0)])
check('SQL counts',db.execute('SELECT COUNT(*),COUNT(DISTINCT reader_id) FROM Loan').fetchone(),(4,2))
try:db.execute('INSERT INTO Loan VALUES(99,99,0)');raise AssertionError('foreign key accepted')
except sqlite3.IntegrityError:checks.append('SQL foreign key rejects nonexistent reader')
hashes={str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((root/'chapters').glob('*.md'))}
report={'passed':True,'independentChecks':len(checks),'checks':checks,'sourceHashes':hashes,'limits':'Exact checks and independent enumeration cover numeric examples, algorithm traces and fixed SQL. Design answers are open teaching references, not uniquely machine-scored. Reused linear algebra also retains the Math II verification report.'}
(root/'NUMERIC-QA.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(f'PASS {len(checks)} independent numeric/algorithm/SQL checks')
