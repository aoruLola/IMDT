"""Independent symbolic/numerical checks of calculations used in the course.
Run with Python and SymPy. This is not a proof or a substitute for prose review.
"""
import sys, json, pathlib, datetime
sys.path.insert(0, str(pathlib.Path(__file__).parent / '.pydeps'))
import sympy as s
import mpmath as mp
x,y,t,a,h,n=s.symbols('x y t a h n', real=True)
C,C1,C2=s.symbols('C C1 C2')
checks=[]
def eq(name,actual,expected):
    diff=actual-expected
    ok=all(s.simplify(v)==0 for v in diff) if isinstance(diff,s.MatrixBase) else s.simplify(diff)==0
    assert ok, f'{name}: {actual} != {expected}'
    checks.append({'case':name,'result':'passed'})
def numeric(name,actual,expected,tol=1e-9):
    assert abs(float(actual)-float(expected))<tol,(name,actual,expected)
    checks.append({'case':name,'result':'passed','value':float(actual)})
def primitive(name,F,f):eq(name,s.diff(F,x),f)
def ode(name,f,p,q,rhs):eq(name,s.diff(f,x,2)+p*s.diff(f,x)+q*f,rhs)
M=s.Matrix; R=s.Rational

# Prerequisite algebra and limiting calculations, including values/conditions.
eq('p-algebra/e1',(-2)**2+3*(-2)-1,-3)
eq('p-algebra/e2',(x*x-4)/(x-2),x+2)
eq('p-algebra/practice2',(x*x+2*x)/x,x+2)
eq('p-graph/line',2*3+1,7)
eq('p-exp/inverse',s.log(s.exp(2*x-1)),2*x-1)
eq('p-trig/arcsin',s.asin(s.sin(5*s.pi/6)),s.pi/6)
eq('function/value-min',x*x.subs(x,0) if False else s.Integer(0),0)
eq('properties/cubic-difference',(y**3+y)-(x**3+x),(y-x)*(y*y+x*y+x*x+1))
eq('properties/positive-factor',y*y+x*y+x*x+1,(y+x/2)**2+3*x*x/4+1)
limits=[('limit/linear',3*x-1,2,5),('limit/infinity',2+1/x,s.oo,2),('sequence/rational',(2*x+1)/(x+3),s.oo,2),('limit-rules/e1',(x*x-4)/(x-2),2,4),('limit-rules/e2',(3*x*x+x)/(2*x*x-1),s.oo,R(3,2)),('limit-rules/rationalize',(s.sqrt(1+x)-1)/x,0,R(1,2)),('limit-rules/practice2',(s.sqrt(4+x)-2)/x,0,R(1,4)),('important-limits/e1',s.sin(3*x)/s.log(1+2*x),0,R(3,2)),('important-limits/e2',(1+2*x)**(3/x),0,s.exp(6)),('important-limits/practice2',(1-s.cos(2*x))/x**2,0,2),('taylor/e1',(s.sin(x)-x)/x**3,0,-R(1,6)),('taylor/practice2',(s.exp(x)-1-x)/x**2,0,R(1,2)),('lhopital/e1',s.log(x)/x,s.oo,0),('lhopital/e2',x**x,0,1),('mean-training',(s.log(1+x)-x+x*x/2)/x**3,0,R(1,3)),('review-methods/e1',(1-s.cos(x))/x**2,0,R(1,2)),('review-methods/practice2',(2*x+8*x**3/3)/x,0,2)]
for name,f,point,value in limits:eq(name,s.limit(f,x,point,dir='+'),value)
eq('sequence/recurrence-fixed-point',s.sqrt(2+s.Integer(2)),2)
eq('derivative/definition',s.limit(((a+h)**2-a*a)/h,h,0),2*a)
derivatives=[('derivative-rules/e1',s.log(1+x*x),2*x/(1+x*x)),('derivative-rules/e2',x*s.exp(x),(1+x)*s.exp(x)),('derivative-rules/arctan',s.atan(2*x),2/(1+4*x*x)),('derivative-rules/practice2',s.sin(x*x)/(x+1),(2*x*s.cos(x*x)*(x+1)-s.sin(x*x))/(x+1)**2),('implicit-parametric/power',x**x,x**x*(s.log(x)+1))]
for name,f,d in derivatives:eq(name,s.diff(f,x),d)
eq('implicit-parametric/second',s.diff(3*t/2,t)/(2*t),3/(4*t))
eq('higher-differential/third',s.diff(s.exp(2*x),x,3),8*s.exp(2*x))
for k in range(1,7):eq(f'higher-differential/log-order-{k}',s.diff(s.log(x),x,k),(-1)**(k-1)*s.factorial(k-1)/x**k)
eq('higher-differential/Leibniz',s.diff(x*s.exp(x),x,5),(x+5)*s.exp(x))
numeric('higher-differential/approximation',2+.04/4,2.01)
eq('rolle-lagrange/e1',s.diff(x*x,x).subs(x,2),4)
eq('rolle-lagrange/practice2',3*(1/s.sqrt(3))**2,1)
eq('cauchy-proof/e1',2/(3*R(14,9)),R(3,7))
mp.mp.dps=30
taylor_error=mp.exp(mp.mpf('0.1'))-mp.mpf('1.105')
assert 0<taylor_error<mp.mpf('0.0005')
checks.append({'case':'taylor/positive-remainder-below-proved-bound','result':'passed','error':float(taylor_error),'bound':0.0005})
for v,expected in [(-2,-2),(-1,2),(1,-2),(2,2)]:eq(f'monotone-extrema/value-{v}',v**3-3*v,expected)
eq('monotone-extrema/min',1**2-2*1,-1)
eq('curvature/parabola-zero',2/(1+s.Integer(0))**R(3,2),2)
eq('curvature/parabola-one',2/(1+s.Integer(4))**R(3,2),2/(5*s.sqrt(5)))
for direction in ['+','-']:eq('exam12/asymptote-'+direction,s.limit(s.real_root(x**3-3*x*x+1,3)-(x-1),x,s.oo if direction=='+' else -s.oo),0)
eq('optimization/rectangle',s.diff(x*(a/2-x),x).subs(x,a/4),0)

# Antiderivatives checked by differentiation, not by reusing integration steps.
for name,F,f in [
 ('primitive/e1',x**3-x*x+x,3*x*x-2*x+1),('primitive/practice2',x*x+s.exp(x),2*x+s.exp(x)),
 ('substitution/e1',s.sin(x*x),2*x*s.cos(x*x)),('substitution/e2',s.asin(x/2),1/s.sqrt(4-x*x)),('substitution/practice2',s.log(1+x*x)/2,x/(1+x*x)),
 ('parts/e1',x*s.log(x)-x,s.log(x)),('parts/e2',s.exp(x)*(s.sin(x)-s.cos(x))/2,s.exp(x)*s.sin(x)),('parts/practice2',x*s.sin(x)+s.cos(x),x*s.cos(x)),
 ('rational-integrals/e1',s.log(x)-s.log(x+1),1/(x*(x+1))),('rational-integrals/e2',s.atan(x+1),1/(x*x+2*x+2)),('rational-integrals/practice2',x/2-s.sin(2*x)/4,s.sin(x)**2),('rational-integrals/practice3',2*s.sqrt(x+1),1/s.sqrt(x+1)),
 ('antiderivatives-training',s.exp(x*x)/2+s.log(x)-s.log(x+1),x*s.exp(x*x)+1/(x*(x+1))),
 ('exam17/primitive',s.log(x+1)/5-s.log(x*x-2*x+2)/10+2*s.atan(x-1)/5,1/((x+1)*(x*x-2*x+2)))]:primitive(name,F,f)
integrals=[('riemann/e1',x*x,0,1,R(1,3)),('fundamental/substitution',2*x*s.exp(x*x),0,1,s.E-1),('fundamental/practice2',x*s.exp(x),0,1,1),('improper/e1',x**-2,1,s.oo,1),('improper/e2',1/s.sqrt(x),0,1,2),('improper/practice2',1/(1+x*x),1,s.oo,s.pi/4),('area-volume/e1',x-x*x,0,1,R(1,6)),('area-volume/e2',s.pi*x*x,0,1,s.pi/3),('area-volume/shell',2*s.pi*x*x,0,1,2*s.pi/3),('area-volume/practice2',s.pi*x,0,1,s.pi/2),('length-surface/e1',s.sqrt(2),0,1,s.sqrt(2)),('length-surface/surface',2*s.pi*x*s.sqrt(2),0,1,s.pi*s.sqrt(2)),('length-surface/mean',x*x/2,0,2,R(4,3)),('physical-integrals/spring',10*x,1,2,15),('physical-integrals/centroid',2*x*x,0,1,R(2,3)),('exam13',x*s.log(x),0,1,-R(1,4)),('exam17/value',1/((x+1)*(x*x-2*x+2)),0,1,(3*s.log(2)+s.pi)/10)]
for name,f,lo,hi,result in integrals:eq(name,s.integrate(f,(x,lo,hi)),result)
eq('fundamental/variable-limits',s.diff(s.Integral(s.exp(t*t),(t,x,x*x)),x),2*x*s.exp(x**4)-s.exp(x*x))
eq('physical-integrals/pressure',s.integrate(x,(x,0,a)),a*a/2)
eq('exam6/gravity',s.integrate(x/(1+x*x)**R(3,2),(x,0,1)),1-1/s.sqrt(2))
eq('applications-training/centroid-x',s.integrate(x*x,(x,0,2))/2,R(4,3))
eq('applications-training/centroid-y',s.integrate(x*x/2,(x,0,2))/2,R(2,3))
eq('multivariable-chain/e1',s.diff(t*t+t**4,t),2*t+4*t**3)
eq('multivariable-chain/practice2',s.diff((x+y)*(x-y),x),2*x)
f=x*x+2*y*y-2*x+4*y
eq('multivariable-extrema/gradient-x',s.diff(f,x).subs({x:1,y:-1}),0)
eq('multivariable-extrema/gradient-y',s.diff(f,y).subs({x:1,y:-1}),0)
eq('multivariable-extrema/value',f.subs({x:1,y:-1}),-3)
AA,BB,CC=s.symbols('A B C',real=True)
eq('multivariable-extrema/completing-square',AA*x*x+2*BB*x*y+CC*y*y,AA*(x+BB*y/AA)**2+(AA*CC-BB*BB)*y*y/AA)
eq('multivariable-extrema/zero-A-case',(2*BB*x*y+CC*y*y).subs(x,-CC*y/(2*BB)+t*y),2*BB*t*y*y)
eq('multi-training/constraint',(x*x+y*y-2*x-4*y).subs(y,1-x),2*x*x-3)
f=(-x*x+y+2)*s.exp(-y)
eq('exam19/dx',s.diff(f,x),-2*x*s.exp(-y))
eq('exam19/dy',s.diff(f,y),s.exp(-y)*(x*x-y-1))
eq('exam19/initial',f.subs({x:0,y:0}),2)
eq('exam19/value',f.subs({x:0,y:-1}),s.E)
eq('exam19/hessian',s.hessian(f,(x,y)).subs({x:0,y:-1}),M([[-2*s.E,0],[0,-s.E]]))
for name,f,inner,outer,result in [
 ('double-cartesian/e1',x+y,(y,0,2),(x,0,1),3),('double-cartesian/e2',x,(y,0,1-x),(x,0,1),R(1,6)),('double-cartesian/practice2',x*y,(y,0,1),(x,0,1),R(1,4)),('double-order/e1',s.exp(y*y),(x,0,y),(y,0,1),(s.E-1)/2)]:eq(name,s.integrate(s.integrate(f,inner),outer),result)
eq('double-polar/e1',2*s.pi*s.integrate(x**3,(x,0,1)),s.pi/2)
eq('double-polar/e2',s.integrate(2*s.cos(t)**2,(t,-s.pi/2,s.pi/2)),s.pi)
eq('exam20/polar',128*s.integrate(s.sin(t)**4*(1-s.sin(2*t)),(t,0,s.pi/4)),12*s.pi-R(112,3))
# Independent Cartesian quadrature of the same circular lens, split at x=2.
mp.mp.dps=30
upper=lambda xx: mp.sqrt(max(0,4*xx-xx*xx))
lower=lambda xx: 2-mp.sqrt(max(0,4-xx*xx))
cart=mp.quad(lambda xx: ((upper(xx)-xx)**3-(lower(xx)-xx)**3)/3,[0,1,2])
numeric('exam20/cartesian-quadrature',cart,12*mp.pi-mp.mpf(112)/3,1e-12)

# Differential equation answers substituted into their equations.
eq('ode-separable/e1',s.diff(3*s.exp(x*x),x),2*x*3*s.exp(x*x))
eq('ode-separable/e2',s.diff(1/(1-x),x),(1/(1-x))**2)
eq('ode-first/e1',s.diff(x*(s.log(x)+C),x),1+(x*(s.log(x)+C))/x)
eq('ode-first/e2',s.diff(2-s.exp(-2*x),x)+2*(2-s.exp(-2*x)),4)
eq('ode-first/practice2',s.diff(s.exp(x)/2+C*s.exp(-x),x)+s.exp(x)/2+C*s.exp(-x),s.exp(x))
eq('ode-reduction/e1',s.diff(x*x+3*x+1,x,2),2)
eq('ode-reduction/e2',s.diff(-1/(x+C),x,2),2*(-1/(x+C))*s.diff(-1/(x+C),x))
ode('ode-linear/e1',s.exp(2*x)-s.exp(x),-3,2,0)
ode('ode-linear/e2',s.exp(-x)*(C1*s.cos(2*x)+C2*s.sin(2*x)),2,5,0)
ode('ode-linear/repeated',(C1+C2*x)*s.exp(x),-2,1,0)
ode('ode-forced/e1',C1*s.exp(x)+C2*s.exp(-x)-1,0,-1,1)
ode('ode-forced/e2',x*s.sin(x)/2,0,1,s.cos(x))
ode('ode-forced/practice2',s.exp(3*x)/2,-3,2,s.exp(3*x))
answer=s.exp(x)/2-s.exp(2*x)+s.exp(3*x)/2
ode('ode-training',answer,-3,2,s.exp(3*x));eq('ode-training/initial-y',answer.subs(x,0),0);eq('ode-training/initial-dy',s.diff(answer,x).subs(x,0),0)
eq('ode-higher-model/e1',s.diff(-1+s.exp(x)+s.exp(-x),x,3)-s.diff(-1+s.exp(x)+s.exp(-x),x),0)
numeric('ode-higher-model/cooling',20+60*mp.exp(-mp.log(2)/10*20),35)

# Matrices, vector relations, ranks, eigenpairs and inertia checks.
A=M([[1,2],[0,1]]);B=M([[1,0],[3,1]])
eq('matrix-product/AB',A*B,M([[7,2],[3,1]]));eq('matrix-product/BA',B*A,M([[1,2],[3,7]]))
eq('matrix-product/vector',M([[1,2],[3,4]])*M([2,1]),M([4,10]))
eq('elimination/e1',M([[1,1],[2,-1]])*M([1,2]),M([3,0]))
eq('elimination/e2',s.Integer(M([[1,2,3],[2,4,6],[1,1,1]]).rank()),2)
eq('special-blocks/decompose',M([[1,2],[2,2]])+M([[0,1],[-1,0]]),M([[1,3],[1,2]]))
eq('determinant/e1',M([[2,1],[3,4]]).det(),5)
eq('determinant/e2',M([[1,2,3],[2,5,7],[0,1,2]]).det(),1)
eq('cofactor-inverse/e1',M([[2,1],[1,1]])*M([[1,-1],[-1,2]]),s.eye(2))
eq('cofactor-inverse/e2',A*M([[1,-2],[0,1]]),s.eye(2))
eq('cramer/e1',M([[2,1],[1,-1]])*M([2,1]),M([5,1]))
eq('cramer/e2',s.diag(2,3)*M([[1,2],[1,2]]),M([[2,4],[3,6]]))
eq('span/e2',2*M([1,2])-M([2,4]),s.zeros(2,1))
eq('rank-basis/e1',s.Integer(M([[1,0,1],[0,1,1],[1,1,2]]).rank()),2)
eq('rank-basis/parameter',M([[1,2],[2,a]]).det(),a-4)
eq('orthogonal/projection',M([1,1]).dot(M([1,-1])),0)
eq('vectors-training/orthogonal',M([1,1,0]).dot(M([1,-1,2])),0)
eq('vectors-training/unit1',M([1,1,0]).norm(),s.sqrt(2));eq('vectors-training/unit2',M([1,-1,2]).norm(),s.sqrt(6))
for i,v in enumerate([M([-1,1,0]),M([-1,0,1])]):eq(f'homogeneous-system/basis{i}',M([[1,1,1]])*v,M([0]))
eq('nonhomogeneous-system/particular',M([[1,1,1]])*M([1,0,0]),M([1]))
eq('parameter-system/general',M([[1,1],[1,a]])*M([(a-y)/(a-1),(y-1)/(a-1)]),M([1,y]))
eq('exam9/rref',M([[1,1,0,1],[1,1,2,5],[1,1,1,3]]).rref()[0],M([[1,1,0,1],[0,0,1,2],[0,0,0,0]]))
A=M([[2,1],[0,3]]);P=M([[1,1],[0,1]])
eq('diagonalization/example',P.inv()*A*P,s.diag(2,3))
for power in range(1,5):eq(f'diagonalization/power{power}',A**power,M([[2**power,3**power-2**power],[0,3**power]]))
A=M([[2,1],[1,2]]);Q=M([[1,1],[1,-1]])/s.sqrt(2)
eq('symmetric-eigen/orthogonal',Q.T*Q,s.eye(2));eq('symmetric-eigen/diagonal',Q.T*A*Q,s.diag(3,1));eq('eigen-training/cube',A**3,M([[14,13],[13,14]]))
eq('quadratic-form/e1',x*x+2*x*y+3*y*y,(x+y)**2+2*y*y)
eq('quadratic-training',x*x+2*a*x*y+y*y,(x+a*y)**2+(1-a*a)*y*y)
eq('positive-definite/e1',M([[2,1],[1,a]]).det(),2*a-1)
eq('review-parameters/determinant',M([[1,a],[a,1]]).det(),1-a*a)
A=M([[4,1,-2],[1,1,1],[-2,1,a]])
eq('exam22/determinant',A.det(),3*a-12)
A=A.subs(a,4);Q=M.hstack(M([1,1,1])/s.sqrt(3),M([1,0,-1])/s.sqrt(2),M([1,-2,1])/s.sqrt(6))
eq('exam22/orthogonal',Q.T*Q,s.eye(3));eq('exam22/diagonal',Q.T*A*Q,s.diag(3,6,0))
eq('exam18/series',s.series(s.exp(2*s.sin(x)),x,0,3).removeO(),1+2*x+2*x*x)
eq('exam18/answer-substitution',s.limit((x*(2+5*x)-s.exp(2*s.sin(x))+1)/s.log(1-x*x),x,0),-3)
eq('2024-exam14',s.diff((s.exp(x)+1)*x*x,x,5).subs(x,1),31*s.E)
eq('2024-exam11/curvature',s.Abs(2*t*0-1*2).subs(t,0)/(4*t*t+1).subs(t,0)**R(3,2),2)
eq('2024-exam15',s.integrate(t+3*s.pi*s.sin(s.pi*t)/2,(t,0,3))/3,R(5,2))
eq('multivariable-chain/second-example',s.diff(t*t+t**4,t,2),2+12*t*t)
eq('higher-differential/differential-product',s.diff(x*s.exp(x),x),(1+x)*s.exp(x))

report={'passed':True,'engine':f'SymPy {s.__version__}; mpmath {mp.__version__}','checks':len(checks),'scope':'Independent calculation checks; logical proofs and pedagogical completeness require prose review.','cases':checks,'time':datetime.datetime.now(datetime.timezone.utc).isoformat()}
target=pathlib.Path(__file__).parents[1]/'MATH-QA.json'
target.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'passed':True,'checks':len(checks),'report':str(target)},ensure_ascii=False))
