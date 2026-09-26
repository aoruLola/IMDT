---
subject: 843
chapter: 843-09-database 数据库：把事实存得清楚、查得准确
type: 章末综合训练
---

# 数据库：把事实存得清楚、查得准确 · 章末综合训练

## 原创综合训练

**题目**

Reader(id,name)，Loan(id,reader_id,returned)。设计外键；写每位读者未还数量；解释为何不在每行Loan重复电话。

**提示**

LEFT JOIN的筛选放ON可保留零借阅者；COUNT计右表非空键。

**解析**

外键Loan.reader_id引用Reader.id。SELECT r.id, COUNT(l.id) AS n FROM Reader r LEFT JOIN Loan l ON l.reader_id=r.id AND l.returned=0 GROUP BY r.id; 电话属于读者事实，重复会产生更新异常，应放Reader。WHERE l.returned=0会筛掉补NULL的零记录读者。

