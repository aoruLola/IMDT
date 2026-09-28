-- 固定教学数据；在空SQLite数据库中执行。
PRAGMA foreign_keys = ON;
CREATE TABLE Reader(id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE Loan(id INTEGER PRIMARY KEY,
  reader_id INTEGER NOT NULL REFERENCES Reader(id),
  returned INTEGER NOT NULL CHECK(returned IN (0,1)));
INSERT INTO Reader VALUES(1,'小林'),(2,'小周'),(3,'小陈');
INSERT INTO Loan VALUES(10,1,0),(11,1,0),(12,2,1),(13,2,0);
-- 结果 (1,2)：先筛未还行，再分组筛选。
SELECT reader_id, COUNT(*) AS n FROM Loan WHERE returned=0
GROUP BY reader_id HAVING COUNT(*)>=2;
-- 结果 (1,2),(2,1),(3,0)：条件放ON才能保留无借阅者。
SELECT r.id, COUNT(l.id) AS n FROM Reader r
LEFT JOIN Loan l ON l.reader_id=r.id AND l.returned=0
GROUP BY r.id ORDER BY r.id;
-- 结果 (1,2),(2,2),(3,0)：全部借阅次数，COUNT不计补出的NULL。
SELECT r.id, COUNT(l.id) AS n FROM Reader r
LEFT JOIN Loan l ON l.reader_id=r.id GROUP BY r.id ORDER BY r.id;
