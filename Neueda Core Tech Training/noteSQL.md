# Core Database Concepts - MySQL Workbench Skills

> All SQL code blocks in this section should be taken as a whole SQL shell file &mdash; it's separated just for better understandings on the lines' functions and output.
> The information in the code may inevitably have some overlap with that of real people; any such occurrences are purely coincidental.

`CRUD` (the abbreviation of Create, Read, Update & Delete), the interaction we want to achieve with any database, can be done using a syntax called **Structured Query Language** (or **SQL**).

Suppose there is a transaction operation in a database. The operation should go under the ***ACID*** property, which is the abbreviation for: **A**tomicity, **C**onsistency, **I**solation & **D**ecomposability.

> A *decomposable* operation means it can be either committed or rollbacked. In the assumption above, this could be explained by a man who is to draw CNY 5,000 &mdash; the bank will lock the database first to secure the *minus-5k* commit and then unlock it after the commit is finished to enable other organizations to begin other possible transactions. If the man's account doesn't have CNY 5,000, the commit should be rolled back before the unlock.

| Data Type | SPEC | Data Type | Spec |
|------|------|------|-------|
|`CHAR`|String (0 ～ 255)|`INT`|Integer (-$2^{31}$ ～ $2^{31}-1$)|
|`VARCHAR`|String (0 ～ 255)|`BIGINT`|Integer ($-2^{63}$ ～ $2^{63}-1$)|
|`TINYTEXT`|String (0 ～ 255)|`FLOAT`|Decimal precise to 23 digits|
|`TEXT`|String (0 ～ $2^{16}-1$)|`DOUBLE`|Decimal of 24 ～ 53 digits|
|`BLOB`|String (0 ～ $2^{16}-1$)|`DECIMAL`|`DOUBLE`, stored as string|
|`MEDIUMTEXT`|String (0 ～ $2^{24}-1$)|`DATE`|`YYYY-MM-DD`|
|`MEDIUMBLOB`|String (0 ～ $2^{24}-1$)|`DATETIME`|`YYYY-MM-DD HH:MM:SS`|
|`LONGTEXT`|String (0 ～ $2^{32}-1$)|`TIMESTAMP`|`YYYYMMDDHHMMSS`|
|`LONGBLOB`|String (0 ～ $2^{32}-1$)|`DATETIME`|`YYYY-MM-DD HH:MM:SS`|
|`TINYINT`|Integer (-128 ～ 127)|`ENUM`|One of preset options|
|`SMALLINT`|Integer (-$2^{15}$ ～ $2^{15}-1$)|`SET`|Selection of preset options|
|`MEDIUMINT`|Integer (-$2^{23}$ ～ $2^{23}-1$)|`BOOLEAN`|`TINYINT(1)`, `true` (`1`) or `false` (`0`)|

> What is the difference between `CHAR` and `VARCHAR`?

`VARCHAR` can make adjustments to the storage of the string according to the string's length. For example, the length of the `VARCHAR(10)` type string `"Manager"` will be 7 but it will still be 10 for the same string of data type `CHAR(10)`.

We should create a dataset first whether we are to create a table or the dataset itself to use. When going to create a table after the creation of dataset, use the dataset before defining the table's name.

```sql
/*
Trying to create a table to store the data for employees. The columns are:
a. EmpNumber, the employee No.
b. EmpName, the name of employee
c. Department, the department where the employee works
d. JobRole, the role of the employee
*/
CREATE DATABASE employees;
USE employees;
CREATE TABLE employees.employee_data(
    EmpNumber INT PRIMARY KEY, -- equivalent to constraints: unique, index, not null
    EmpName VARCHAR(50) NOT NULL,
    Department VARCHAR(50),
    JobRole VARCHAR(50)
);
```

> Each row (a.k.a. item) in a table has at least 1 column acting as the identifier or ID, which is the ***PRIMARY KEY***.

Think about why EmpName cannot be taken as a `PRIMARY KEY` &mdash; That is because it would happen when 2 employees have the same name.

> Please note that SQL is case-insensitive for keywords but case-sensitive for table & column names along with box values. However, **MySQL is completely case-insenstive**.

## Writing a database entry by entry

When inserting a record to the table, use the syntax `INSERT INTO $table_name$ ($indices$) VALUES ($values$);`. The `$indices$` part can be omitted if the `$values$` are right in the order of `$indices$` you defined during the creation stage.

```sql
-- Insert 2 records in this TABLE
INSERT INTO employee_data VALUES (
    1,
    'GU',
    'IWPB',
    'Digital Platform'
);
INSERT INTO employee_data (
    EmpNumber,
    EmpName,
    Department
) VALUES (
    2,
    'PAN',
    'IWPB'
);
```

The `$indices$` clarification is quite necessary for those who are to leave some of the data lines blank due to lack of information.

To make an update for a certain column of all existing entries in the database, use syntax `UPDATE $table_name$ SET $col_name$ = $value$`.

```sql
-- Make everyone's jobrole null
UPDATE employee_data SET JobRole = NULL;
```

Use `WHERE` the operator to control the exact update contents.

```sql
-- Update Gu's Job Role to "Digital Platform - Mobile" 
UPDATE employee_data SET JobRole = 'Digital Platform - Mobile'
WHERE EmpNumber = '1';
```

Use syntax `DELETE FROM $table_name$ WHERE $index$ = $value$` to delete a certain row where the `$index$` equals to `$value$`.

```sql
DELETE FROM employee_data WHERE EmpNumber = '2';
```

Use `TRUNCATE $table_name$` to empty the whole table itself with the column title preserved; use `DROP TABLE $table_name$` to reach the complete delete for the table.

```sql
TRUNCATE employee_data;
```

## Multiple entries writing

It's also possible to integrate all inserting operations in one by methods below.

```sql
-- Insert 7 records in this TABLE
INSERT INTO employee_data VALUES
(1, 'GU', 'IWPB', 'Digital Platform - Mobile Officer'),
(2, 'BAI', 'IWPB', 'Digital Platform - Mobile Officer'),
(5, 'WANG', 'IWPB', 'Chief Technical Officer'),
(6, 'LIU', 'IWPB', 'Linear Manager'),
(7, 'SHI', 'IWPB', 'Bank Counter');
INSERT INTO employee_data (EmpNumber, EmpName, Department) VALUES
(3, 'DING', 'IWPB'),
(4, 'PAN', 'IWPB');
```

Deletion operation for multiple entries is the same with that for a single entry.

```sql
DELETE FROM employee_data WHERE JobRole = 'Linear Manager';
```

> Please note that `DELETE FROM employee_data WHERE JobRole = NULL` is not executable &mdash; NULL is null. To delete entries where `JobRole` the column is `NULL`, please use `DELETE FROM employee_data WHERE JobRole IS NULL`.
> Occasions do exist that some machines still do not support deleting those entries even when `IS` the logical operator is applied due to operation security issues. Should the problem occur, please change a PC for experiments.

## Making queries

Use `SELECT * FROM $table_name$` to get the whole table. To control which rows are returned, we can use `LIMIT` by syntax `SELECT * FROM $table_name$ LIMIT $row_display_max_number$ OFFSET $number_of_lines_to_skip$`.

We can print all different contents of a certain column by `SELECT DISTINCT $col_name$ FROM $table_name$`.

```sql
SELECT DISTINCT Department FROM employee_data;
```

## Logical & Pattern Matching Operators

Basic ones are `=`, `<>`, `<=`, `>=`, `<`, `>`, `AND`, `OR` & `NOT` of which `<>` is used to express the inequality.

```sql
SELECT * FROM employee_data WHERE Department = 'IWPB' or 'Cyber';
```

```sql
SELECT * FROM employee_data WHERE Department IN ('IWPB', 'Cyber');
```

The 2 code blocks above share the same output, but the former one will be extremely time-consuming in that it employs 2 logical operators.

> The time-consuming discoveries highlight the importance to make boolean-related pre-calculations to fewer the application of these operators before the logical judgment takes place.

`LIKE` can get all entries where contents in the given column contain some specific keyword-like objects. If the specific object is located at the end of the whole box, use `LIKE(%$specific_content$)`; if the specific object is located at the very beginning of the whole box, use `LIKE($specific_content$%)`. Use `LIKE(%$specific_content$%)` otherwise.

> `LIKE(%$specific_content$%)` can also be used under circumstance where you are not sure or do not care about whether the keyword should be at the front or back of the box.

```sql
SELECT * FROM employee_data WHERE JobRole LIKE ('%Officer%'); 
```

The code above will output 3 entries (shown below), but no entries will be printed if use the keyword `'Officer%'`.

```plain
+-----------+----------+------------+-----------------------------------+
| EmpNumber |  EmpName | Department |              JobRole              |
+-----------+----------+------------+-----------------------------------+
|     1     |    GU    |    IWPB    | Digital Platform - Mobile Officer |
|     2     |    BAI   |    IWPB    | Digital Platform - Mobile Officer |
|     5     |   WANG   |    IWPB    |       Chief Technical Officer     |
+-----------+----------+------------+-----------------------------------+
```

Think again on the `LIMIT` and `OFFSET` syntax. We can employ the integration of them and `SELECT` along with logical operators to get less entries &mdash; for example, we can use the following code to obtain only one line whose owner is the **second** employee entitled as an `Officer` (shown in the block below the SQL code).

```sql
SELECT * FROM employee_data WHERE JobRole LIKE ('%Officer%') LIMIT 1 OFFSET 1;
/*
+-----------+----------+------------+-----------------------------------+
| EmpNumber |  EmpName | Department |              JobRole              |
+-----------+----------+------------+-----------------------------------+
|     2     |    BAI   |    IWPB    | Digital Platform - Mobile Officer |
+-----------+----------+------------+-----------------------------------+
*/
```

> **Practice:** Create a table `employee_detail` with `EmpNumber`, `email`, `phone_num`, `address`, `city` columns. Insert records of employees and make sure that these are the same ones who already exist in the table `employee_data`. List all those employees whose email is from qq and list all cities.

```sql
CREATE TABLE employees.employee_detail(
    EmpNumber INT PRIMARY KEY,
    email VARCHAR(100),
    phone_num VARCHAR(20),
    address VARCHAR(500),
    city VARCHAR(100)
);
INSERT INTO employee_detail VALUES
(1, 'gu@qq.com', '+86 123-4567-8910', 'Xian W. Technology Rd.', 'Nanjing'),
(2, 'bai@qq.com', '+86 109-8765-4321', 'Xian N. Chang Pa Rd.', 'Yinchuan'),
(3, 'ding@qq.com', '+86 6868-6789', 'Xian Shan Men Kau', 'Xian'),
(4, 'pan@qq.com', '+86 7979-9876', 'Xian Shan Men Kau', 'Suining'),
(5, 'wang@hsbc.com.cn', '+86 1234-5678', NULL, 'Guangzhou'),
(7, 'shi@hsbc.com.cn', '+86 8765-4321', NULL, 'Xian');
SELECT * FROM employee_detail WHERE email LIKE ('%@qq.com%');
SELECT DISTINCT city FROM employee_detail;
/*
(Result #1)
# EmpNumber,email,phone_num,address,city
1,gu@qq.com,+86 123-4567-8910,Xian W. Technology Rd.,Nanjing
2,bai@qq.com,+86 109-8765-4321,Xian N. Chang Pa Rd.,Yinchuan
3,ding@qq.com,+86 6868-6789,Xian Shan Men Kau,Xian
4,pan@qq.com,+86 7979-9876,Xian Shan Men Kau,Suining
---
(Result #2)
# city
Nanjing
Yinchuan
Xian
Suining
Guangzhou
*/
```

> Is *Xian* easy for readers to understand that it's a city?

*Xi'an*, a typical example of cities whose name features a necessary quote symbol for readers to understand, cannot be expressed by simply using `'Xi'an'` &mdash; the quote at the middle will end the string ahead of expected. To solve this problem, use **SQL Injections**.

## Integrating multiple tables (Referencing the Foreign Key)

> Think about the codes in the practice above. How can we secure the *same* employee between tables `employee_data` and `employee_detail`?

We can discover that when we change the `EmpNumber` in the `employee_detail` table generated in the previous chapter to a random number, the script can still be executed. In other words, the codes given in the previous practice phase fail to meet all the demands given.

Think about ways to achieve data normalization in this case, making a table that simultaneously contains but only contains `EmpNumber`, `EmpName`, `Department`, `JobRole`, `email`, `phone_num`, `address` and `city` columns. To integrate the 2 tables mentioned above, we should keep the following 3 key points in mind:

1. None of the columns should be repeated in the table.
2. Every table of them 2 should have primary key.
3. Use **Foreign Key** the constraint to implement relationship between 2 tables.

In MySQL, in other table write the following items for the same column which is in any previous table already:

- Foreign Key
- References

```sql
DROP TABLE employee_detail;
CREATE TABLE employees.employee_detail(
    EmpNumber INT PRIMARY KEY,
    email VARCHAR(100),
    phone_num VARCHAR(20),
    address VARCHAR(500),
    city VARCHAR(100),
    FOREIGN KEY(EmpNumber) REFERENCES employee_data(EmpNumber)
);
INSERT INTO employee_detail VALUES
(1, 'gu@qq.com', '+86 123-4567-8910', 'Xian W. Technology Rd.', 'Nanjing'),
(2, 'bai@qq.com', '+86 109-8765-4321', 'Xian N. Chang Pa Rd.', 'Yinchuan'),
(3, 'ding@qq.com', '+86 6868-6789', 'Xian Shan Men Kau', 'Xian'),
(4, 'pan@qq.com', '+86 7979-9876', 'Xian Shan Men Kau', 'Suining'),
(5, 'wang@hsbc.com.cn', '+86 1234-5678', NULL, 'Guangzhou'),
(7, 'shi@hsbc.com.cn', '+86 8765-4321', NULL, 'Xian');
```

The 2 tables now have been connected &mdash; you may receive an error report when we change the `EmpNumber` in the `employee_detail` table randomly at this moment.

## Ordering the Result Set

Use `ORDER BY` clause. Specify the column you want to order by `ASC` and `DESC` &mdash; that **WON'T** change the original order in the table itself.

```sql
SELECT * FROM employee_data ORDER BY EmpNumber DESC;
SELECT * FROM employee_detail ORDER BY email ASC;
/*
(Result #1)
# EmpNumber,EmpName,Department,JobRole
7,SHI,IWPB,Bank Counter
5,WANG,IWPB,Chief Technical Officer
4,PAN,IWPB,NULL
3,DING,IWPB,NULL
2,BAI,IWPB,Digital Platform - Mobile Officer
1,GU,IWPB,Digital Platform - Mobile Officer

(Result #2)
# EmpNumber,email,phone_num,address,city
2,bai@qq.com,+86 109-8765-4321,Xian N. Chang Pa Rd.,Yinchuan
3,ding@qq.com,+86 6868-6789,Xian Shan Men Kau,Xian
1,gu@qq.com,+86 123-4567-8910,Xian W. Technology Rd.,Nanjing
4,pan@qq.com,+86 7979-9876,Xian Shan Men Kau,Suining
7,shi@hsbc.com.cn,+86 8765-4321,NULL,Xian
5,wang@hsbc.com.cn,+86 1234-5678,NULL,Guangzhou
*/
```

## Chaining multiple WHERE, the operators

Chain multiple `WHERE` operators in SQL to create more complex conditions for filtering data by `AND`.

```sql
SELECT * FROM employee_detail
WHERE (EmpNumber BETWEEN 2 AND 7)
AND (email LIKE ('%@qq.com') OR email LIKE ('%@hsbc.com.cn%'));
/*
# EmpNumber,email,phone_num,address,city
2,bai@qq.com,+86 109-8765-4321,Xian N. Chang Pa Rd.,Yinchuan
3,ding@qq.com,+86 6868-6789,Xian Shan Men Kau,Xian
4,pan@qq.com,+86 7979-9876,Xian Shan Men Kau,Suining
5,wang@hsbc.com.cn,+86 1234-5678,NULL,Guangzhou
7,shi@hsbc.com.cn,+86 8765-4321,NULL,Xian
*/
```

## Obtaining Subqueries

> Think about how to get the answer of who is doing the same job with Gu without any early command of knowledge regarding Gu's job, Gu included.

We can divide the problem to the following 2 steps:

- Queries on what Gu is doing. (`SELECT JobRole FROM employee_data WHERE EmpName = 'GU';`)
- We know that Gu is the Digital Platform - Mobile Officer after finishing the first step. Then we make queries on who else is doing the job. (`SELECT * FROM employee_data WHERE JobRole = 'Digital Platform - Mobile Officer';`)

We can also integrate these 2 steps into 1 single step by the following code.

```sql
SELECT * FROM employee_data WHERE JobRole
    = (SELECT JobRole FROM employee_data WHERE EmpName = 'GU');
/*
# EmpNumber,EmpName,Department,JobRole
1,GU,IWPB,Digital Platform - Mobile Officer
2,BAI,IWPB,Digital Platform - Mobile Officer
*/
```

The inlay query (also can be taken as Step 1 of both) is the **subquery**, which should be secured to **return one value only**.

> **Practice:** Who else belong to the same city as that of Ding?

**Analysis:** We should get the `EmpNumber` of Ding first in that the number's the shared info of both tables. We then get the city where Ding lives in by checking table `employee_detail`. Afterwards we should refer to the `employee_detail` table again to acquire the `EmpNumber` of all employees who live in the same city with Ding. **We are likely to get a set of** `EmpNumber`**s** which is possible to return more than one single value at this step &mdash; therefore we are to output all the `EmpName`s that match the `EmpNumber`s. Make Ding excluded eventually.

```sql
SELECT EmpName FROM employee_data WHERE EmpNumber
    IN (SELECT EmpNumber FROM employee_detail WHERE city
        = (SELECT city FROM employee_detail WHERE EmpNumber
            = (SELECT EmpNumber FROM employee_data WHERE EmpName = 'DING')
        )
    ) AND EmpName <> 'DING';
```

The result will output `SHI` the `EmpName` only.

> The practice implies that we can hardly anticipate what is going to happen to our database &mdash; therefore it is recommended to use `IN` for subqueries conditions and try to avoid potential problems triggered by `=`.

## Alias

Particularly useful when handling complex queries, performing operations n multiple tables or renaming columns for the purpose of output.

```sql
SELECT EmpName AS Name, JobRole AS Job FROM employee_data WHERE JobRole IS NOT NULL;
```

The output is as follows. It can be checked that the titles of these 2 columns are different from original ones in the table `employee_data`.

```plain
# Name,Job
GU,Digital Platform - Mobile Officer
BAI,Digital Platform - Mobile Officer
WANG,Chief Technical Officer
SHI,Bank Counter
```

For some cases where results of arithmetic operations should be displayed as a independent column, alias can be of great help. For example, `SELECT EmpNumber * 10 AS No, EmpName FROM employee_data;`.

> Use `DROP DATABASE employees` to delete the database.

## JOINs, the operators

Suppose there is a database generated by the following code block.

```sql
CREATE DATABASE sports_joins;
USE sports_joins;
CREATE TABLE sports (
    sport_id INT,
    sport VARCHAR(50),
    team_size INT
);
INSERT INTO sports (sport_id, sport, team_size) VALUES
    (1, 'Football', 11),
    (2, 'Cricket', 11),
    (3, 'Ice Hockey', 18),
    (4, 'Tennis', 1),
    (5, 'Netball', 7);

CREATE TABLE equipment (
    item_id INT,
    item_name VARCHAR(50),
    sport_id INT
);
INSERT INTO equipment (item_id, item_name, sport_id) VALUES
    (1, 'Ball', 1),
    (2, 'Racket', 4),
    (3, 'Pommel Horse', 7),
    (4, 'Puck', 3),
    (5, 'Hockey stick', 3);
```

We can, beyond doubts, get 2 tables of which each contains 5 entries. If we want to make them together as one single table, we can simply use `SELECT * FROM equipment AS a, sports AS b` or `SELECT * FROM equipment AS a INNER JOIN sports AS b`. The number of entries can reach up to 25 in that it shows all possible combinations from single entry of 2 tables.

To make entries of which the `sport_id` in two tables match with each other, we should use `ON` to clarify the filter for `INNER JOIN`.

```sql
SELECT a.item_name, b.sport, b.team_size
FROM equipment AS a
INNER JOIN
sports AS b
ON a.sport_id = b.sport_id;
/*
# item_name,sport,team_size
Ball,Football,11
Hockey stick,Ice Hockey,18
Puck,Ice Hockey,18
Racket,Tennis,1
*/
```

> `INNER JOIN` can also be abbreviated to `JOIN` in that it's the default join type in MySQL.

### LEFT JOIN, the Operator

`LEFT JOIN` will return all rows from the left table and the matching rows from the right table &mdash; if there is no match, `NULL` values are included.

```sql
SELECT a.item_name, b.sport, b.team_size
FROM equipment AS a
LEFT JOIN
sports AS b
ON a.sport_id = b.sport_id;
/*
# item_name,sport,team_size
Ball,Football,11
Racket,Tennis,1
Pommel Horse,NULL,NULL
Puck,Ice Hockey,18
Hockey stick,Ice Hockey,18
*/
```

The code block above will output all sports that the club officially offers and any equipment that matches those sports.

### RIGHT JOIN, the Operator

`RIGHT JOIN` will return all rows from the right table and the matching rows from the left table &mdash; if there is no match, `NULL` values are included.

```sql
SELECT a.item_name, b.sport, b.team_size
FROM equipment AS a
RIGHT JOIN
sports AS b
ON a.sport_id = b.sport_id;
/*
# item_name,sport,team_size
Ball,Football,11
NULL,Cricket,11
Hockey stick,Ice Hockey,18
Puck,Ice Hockey,18
Racket,Tennis,1
NULL,Netball,7
*/
```

The code block above will output all equipment the club has, and any sports officially offered that match that equipment.

### FULL JOIN, the Operator

`FULL JOIN` will return all rows, including unmatched ones, from both tables.

> MySQL does NOT support FULL JOIN. However, it can be created by combining LEFT JOIN, RIGHT JOIN and UNION.

```sql
SELECT s.sport_id, s.sport, e.item_name
FROM sports AS s
LEFT JOIN equipment AS e
ON s.sport_id = e.sport_id
UNION
SELECT s.sport_id, s.sport, e.item_name
FROM sports AS s
RIGHT JOIN equipment AS e
ON s.sport_id = e.sport_id;
/*
# sport_id,sport,item_name
1,Football,Ball
2,Cricket,NULL
3,Ice Hockey,Hockey stick
3,Ice Hockey,Puck
4,Tennis,Racket
5,Netball,NULL
NULL,NULL,Pommel Horse
*/
```

### View

We can use ***View*** to define a table for convenience on later use.

```sql
CREATE VIEW all_sports
AS
SELECT a.item_name, b.sport, b.team_size
FROM equipment AS a
LEFT JOIN
sports AS b
ON a.sport_id = b.sport_id;
-- Using View for info check
SELECT * FROM all_sports;
/*
# item_name,sport,team_size
Ball,Football,11
Racket,Tennis,1
Pommel Horse,NULL,NULL
Puck,Ice Hockey,18
Hockey stick,Ice Hockey,18
*/
```

## Aggregate Functions

**Aggregate functions** in SQL allow its users to perform calculations on sets of rows and return a single value. They are commonly used to summarize data and provide insights into the dataset.

`COUNT()` counts the number of rows that match a specific criterion. Take `pub.sql` as an example &mdash; shell command `SELECT COUNT(*) AS total_authors FROM authors;` will return a set with the number of authors, 5.

`SUM()` calculates the sum of a numeric column.For `pub.sql`, shell command `SELECT SUM(sales) AS total_sales FROM sales_data;` will return 24500, the total sales amount.

`AVG()` calculates the average value of a numeric column. For `pub.sql`, shell command `SELECT AVG(price) AS average_price FROM books;` will work out the average price of books from the `books` table.

`MIN()` and `MAX()` calculate the minimum and maximum value from a column respectively. For example, the minimum price of books from `books` the table can be reached by `SELECT MIN(price) AS min_price FROM books;` in `pub.sql`.

> To find the $i$-th smallest entry, try using `OFFSET`.

`GROUP BY`, the operator, clause groups rows basing on a specific column or columns.

```sql
-- pub.sql
SELECT au_id, COUNT(*) AS book_count
FROM titleauthor
GROUP BY au_id
LIMIT 5;
/*
# au_id,book_count
172-32-1176,1
213-46-8915,1
238-95-7766,1
267-41-2394,2
274-80-9391,1
*/
```

`HAVING`, the operator, is similar to `WHERE` but used explicitly with aggregate functions. To use the operator, please follow the following 3 steps:

- Create distinct groups in the result set using `GROUP BY`.
- Calculate values for each group using *Aggregate Functions*.
- Use `HAVING` to filter groups basing on conditions applied to the aggregated values.

```sql
-- pub.sql
SELECT au_id, COUNT(*) AS book_count FROM titleauthor
GROUP BY au_id
HAVING book_count >= 2;
/*
# au_id,book_count
267-41-2394,2
*/
```

## SQL Functions

### String Functions

`CONCAT`, `LIKE`, `REPLACE` and `UPPER` are common functions that make transformations to strings.

```sql
-- pub.sql
-- 1. Find all authors whose first name starts with 'A'. Use the LEFT() function.
SELECT au_fname FROM authors WHERE LEFT(au_fname,1) = 'A';

-- 2. List all authors by their initials. Use the CONCAT() and LEFT() functions.
SELECT CONCAT(au_fname, ' ', au_lname) AS name FROM authors ORDER BY LEFT(au_fname,1) ASC;

-- 3. Find all authors whose phone numbers have '415' as the area code. Use the SUBSTRING() function.
SELECT CONCAT(au_fname, ' ', au_lname) AS name, phone FROM authors HAVING SUBSTRING(phone,1,3) = '415';

-- 4. Convert the first name of authors to lower case. Use the LOWER() function.
SELECT LOWER(au_fname) AS lowered_fname FROM authors;

-- 5. Find the length of the first names of all authors. Use the CHAR_LENGTH() function.
SELECT CONCAT(au_fname, ' ', au_lname) AS author, CHAR_LENGTH(au_fname) AS length_of_fname FROM authors;

-- 6. Find all authors whose last name contains 'er'. Use the LOCATE() function.
SELECT CONCAT(au_fname, ' ', au_lname), au_lname AS author FROM authors HAVING LOCATE("er", au_lname) <> 0;

-- 7. Reverse the order of the first and last names of all authors. Use the CONCAT() and REVERSE() functions.
SELECT REVERSE(CONCAT(au_fname, ' ', au_lname)) AS result FROM authors;
```

### Date & Time Functions

`NOW`, `DATE`, `YEAR`, `DAY`, `HOUR` and `SYSDATE` are common date and time functions.

```sql
-- pub.sql
-- Exercise 1: Find the current date.
SELECT CURDATE() AS date_now;

-- Exercise 2: Find out how many days have passed since the start of the year.
SELECT DATEDIFF(CURDATE(),DATE_FORMAT(CURDATE(), '%Y-01-01')) AS day_passed;

-- Exercise 3: Display the hire date of employees in the format 'YYYY-MM-DD'.
SELECT DATE_FORMAT(STR_TO_DATE(hire_date, '%Y%m%d'), '%Y-%m-%d') AS 'yyyy-mm-dd' FROM employee;

-- Exercise 4: List all employees who were hired in the month of December, regardless of the year.
SELECT emp_id, DATE_FORMAT(STR_TO_DATE(hire_date, '%Y%m%d'), '%Y-%m-%d') AS hired_on FROM employee WHERE MONTH(hire_date)=12;

-- Exercise 5: Find out how many days ago each employee was hired.
SELECT emp_id, DATE_FORMAT(STR_TO_DATE(hire_date, '%Y%m%d'), '%Y-%m-%d'), DATEDIFF(CURDATE(),DATE_FORMAT(hire_date, '%Y-%m-%d')) AS days_hired FROM employee;

-- Exercise 6: Display the order date of each sale in the format 'YYYY-MM-DD'.
SELECT stor_id, DATE_FORMAT(STR_TO_DATE(ord_date, '%Y%m%d'), '%Y-%m-%d') AS 'yyyy-mm-dd' FROM sales;

-- Exercise 7: List all sales made in the first quarter of any year.
SELECT * FROM sales WHERE QUARTER(ord_date) = 1;

-- Exercise 8: Find out how many days ago each sale was made.
SELECT stor_id, DATE_FORMAT(STR_TO_DATE(ord_date, '%Y%m%d'), '%Y-%m-%d'), DATEDIFF(CURDATE(),DATE_FORMAT(ord_date, '%Y-%m-%d')) AS days_orderd FROM sales;

-- Exercise 9: Display today's date and time in the format 'YYYY-MM-DD HH:MM:SS'.
SELECT SYSDATE();
```

There is also a function `CONVERT` that enables us to convert the date now to a certain format.

| Format # | Query | Format | Sample |
|----------|-------|--------|--------|
| 1 | `SELECT CONVERT (VARCHAR, GETDATE(), 1)` | mm/dd/yy |12/30/22|
| 2 | `SELECT CONVERT (VARCHAR, GETDATE(), 2)` | yy.mm.dd |22.12.30|
| 3 | `SELECT CONVERT (VARCHAR, GETDATE(), 3)` | dd/mm/yy |30/12/22|
| 4 | `SELECT CONVERT (VARCHAR, GETDATE(), 4)` | dd.mm.yy |30.12.22|
| 5 | `SELECT CONVERT (VARCHAR, GETDATE(), 5)` | dd-mm-yy |30-12-22|
| 6 | `SELECT CONVERT (VARCHAR, GETDATE(), 6)` | dd-Mon-yy |30 Dec 22|
| 7 | `SELECT CONVERT (VARCHAR, GETDATE(), 7)` | Mon dd, yy |Dec 30, 22|
| 10 | `SELECT CONVERT (VARCHAR, GETDATE(), 10)` | mm-dd-yy |12-30-22|
| 11 | `SELECT CONVERT (VARCHAR, GETDATE(), 11)` | yy/mm/dd |22/12/30|
| 12 | `SELECT CONVERT (VARCHAR, GETDATE(), 12)` | yymmdd |221230|
| 23 | `SELECT CONVERT (VARCHAR, GETDATE(), 23)` | yyyy-mm-dd |2022-12-30|
| 31 | `SELECT CONVERT (VARCHAR, GETDATE(), 31)` | yyyy-dd-mm |2022-30-12|
| 32 | `SELECT CONVERT (VARCHAR, GETDATE(), 32)` | mm-dd-yyyy |12-30-2022|
| 33 | `SELECT CONVERT (VARCHAR, GETDATE(), 33)` | mm-yyyy-dd |12-2022-30|

### Control Flow Functions

`CASE`, `IF` and `LOOP` are common functions for control flow.

```sql
-- pub.sql
-- Exercise 1: Use IF() to classify the titles into expensive (price > 20) and cheap (otherwise).
SELECT title_id, title, IF(price > 20, 'Expensive', 'Cheap') as price_category FROM titles;

-- Exercise 2: Use CASE to classify authors based on their state.
SELECT au_id, au_fname, au_lname, 
       CASE 
           WHEN state = 'CA' THEN 'California'
           WHEN state = 'TX' THEN 'Texas'
           ELSE 'Other'
       END as location 
FROM authors;

-- Exercise 3: Use IFNULL to replace NULL in address column with 'No Address Provided' in authors table.
SELECT au_id, au_fname, au_lname, IFNULL(address, 'No Address Provided') as address FROM authors;

-- Exercise 4: Use NULLIF to replace 'UNKNOWN' with NULL in phone column in authors table.
SELECT au_id, au_fname, au_lname, NULLIF(phone, 'UNKNOWN') as phone FROM authors;

-- Exercise 5: Use COALESCE to find the first non-null values of address, city, and state in authors table.
SELECT au_id, au_fname, au_lname, COALESCE(address, city, state) as location_info FROM authors;

-- Exercise 6: Use IF() to classify the sales into High (qty > 100), Medium (qty between 50 and 100) and Low (otherwise).
SELECT ord_num, ord_date, title_id, IF(qty > 100, 'High', IF(qty > 50, 'Medium', 'Low')) as sales_category FROM sales;

-- Exercise 7: Use CASE to give a rating to the titles based on their price.
SELECT title_id, title, 
       CASE 
           WHEN price > 30 THEN 'Expensive'
           WHEN price > 20 THEN 'Moderate'
           ELSE 'Cheap'
       END as price_rating 
FROM titles;

-- Exercise 8: Use IFNULL() to classify publishers based on their location. If the state is NULL replace it with 'UNKNOWN'.
SELECT pub_id, pub_name, IFNULL(state, 'UNKNOWN') as location FROM publishers;

-- Exercise 9: Use NULLIF to replace 'UNKNOWN' with NULL in phone column in authors table and then use COALESCE to replace NULL with 'No Phone Provided'.
SELECT au_id, au_fname, au_lname, COALESCE(NULLIF(phone, 'UNKNOWN'), 'No Phone Provided') as phone FROM authors;

-- Exercise 10: Use CASE to classify the authors based on their contract status. If contract = 1, they are 'Contracted', otherwise 'Non-contracted'.
SELECT au_id, au_fname, au_lname, CASE WHEN contract = 1 THEN 'Contracted' ELSE 'Non-contracted' END as contract_status FROM authors;

```

## Integrating All Functions and Operators Above for Operations

Think about how we use aggregate functions along with operator keywords for comprehensive queries in a database. Here are some examples on how it can be like.

```sql
-- pub.sql

-- 1. Count all authors
SELECT COUNT(*) AS author_count FROM authors; -- 24

-- 2. Calculate the average price of all titles
SELECT AVG(price) AS average_price FROM titles; -- 14.766250

-- 3. Count authors per city
SELECT city, COUNT(*) AS author_count FROM authors GROUP BY city;

-- 4. Count titles per type
SELECT type, COUNT(*) AS title_count FROM titles GROUP BY type;

-- 5. Count authors per state having more than 1 author
SELECT state, COUNT(*) AS author_count FROM authors GROUP BY state HAVING author_count > 1;

-- 6. Find the maximum price of titles per type, having maximum price greater than 15
SELECT type, MAX(price) AS max_price FROM titles GROUP BY type HAVING max_price > 15;

-- 7. Find the minimum price of titles per type, having minimum price less than 20
SELECT type, MIN(price) AS min_price FROM titles GROUP BY type HAVING min_price < 20;

-- 8. Count publishers per country having more than 1 publisher
SELECT country, COUNT(*) AS publisher_count FROM publishers GROUP BY country HAVING publisher_count > 1;

-- 9. Find the average price of titles per type where the advance is greater than 5000 and sort them in descending order
SELECT type, AVG(price) AS avg_price, advance FROM titles GROUP BY type, advance HAVING advance > 5000 ORDER BY avg_price DESC;

-- 10. Find the minimum and maximum price of titles per type, where the type has more than 2 titles and the average price is greater than 15
SELECT type, COUNT(title) AS title_count, MIN(price) AS min_price, MAX(price) AS max_price, AVG(price) AS avg_price FROM titles GROUP BY type HAVING title_count > 2 AND avg_price > 15;

-- 11. Count publishers per country having more than 2 publishers and where the country name starts with 'U'
SELECT country, COUNT(pub_name) AS publisher_count FROM publishers GROUP BY country HAVING publisher_count > 2 AND country LIKE ('U%');
```

> Practice: Suppose there is a database where tables are created by [this linked MySQL file](https://raw.githubusercontent.com/K-PK66/HSBCLRNEXP/refs/heads/main/Core%20Tech/task_airline_data.sql). Obtain the queries required in the note block at the bottom of the block.

```sql
-- 1. Extract and display the domain names from email addresses.
SELECT cst_name, RIGHT(email, LENGTH(email) - LOCATE('@', email)) AS domain FROM customer;
-- 2. Upper Case all the names from customer table.
SELECT UPPER(cst_name) AS name_capitalized FROM customer;
-- 3. Check for invalid phone numbers where phone number has less than 10 digits
SELECT IF(COUNT(*)<>0, 'Invalid Number Exists', 'All valid') AS '' FROM customer WHERE LENGTH(phone_num) < 10;
-- 4. Count customers by email domain
SELECT RIGHT(email, LENGTH(email) - LOCATE('@', email)) AS domain, COUNT(*) AS customer_count FROM customer GROUP BY domain;
-- 5. Find top 3 earliest joined customer
SELECT * FROM customer ORDER BY joining_date ASC LIMIT 3;
-- 6. Find each customer's membership level. Display their ID, Name, Miles and their Level.
SELECT customer.cst_id, cst_name, total_miles, membership_level FROM (customer JOIN flying_miles ON customer.cst_id = flying_miles.cst_id) JOIN membership_level ON total_miles BETWEEN membership_level.lower_limit AND membership_level.upper_limit;
-- 7. find customers who haven’t flown in the last 2 years
SELECT customer.cst_id, cst_name, last_flying_dt FROM customer JOIN flying_miles ON customer.cst_id = flying_miles.cst_id WHERE last_flying_dt < DATE_SUB(NOW(), INTERVAL 2 YEAR);
-- 8. identify customers whose flying miles should become zero if they haven’t flown in the last 2 years. In the resulting table display cst_id, cst_name,last_flying_dt,total_miles, and a derived column adjusted miles as 0 for the such customers
SELECT customer.cst_id, cst_name, last_flying_dt, total_miles, IF(last_flying_dt < DATE_SUB(NOW(), INTERVAL 2 YEAR), '→ 0', '') AS '' FROM customer JOIN flying_miles ON customer.cst_id = flying_miles.cst_id;
```

***
