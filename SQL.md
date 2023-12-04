# SQL

This guide contains

- SQL cheatsheet (for t-sql dialect)
- Some database theory mnemonics

```sql
ON DELETE CASCADE
```



In this guide we are using MSSQL/TSQL dialect.





### SQL primer

```sql
CREATE TABLE TableName (
	attrOne [datatype] [field level contraints],
    attrTwo [datatype] [field level contraints],
)
```

```sql
CREATE TABLE productCatalog.ProductGroup (
	productGroupId INT PRIMARY KEY CLUSTERED NOT NULL IDENTITY(1, 1),  -- synthetic key
	activeId BIT NOT NULL DEFAULT(1),
	creationDate DATETIME NOT NULL DEFAULT(GETDATE()),
	modifiedDate DATETIME NULL,
	productGroup VARCHAR(255),
	[description] VARCHAR(255),
);
```

```sql
DROP TABLE TableName
```

```sql
INSERT INTO entities (name, device_id) VALUES ('Withings Body Cardio', 'WIT-BODYCA-98299053');
```



Datatypes:

```sql
CHAR(20);
VARCHAR(255);
INTEGER;
REAL;
```



Field level constraints

```sql
NOT NULL;
NULL;
DEFAULT 0;
FOREIGN KEY [attr] REFERENCES [table];						-- can also be table level
ON DELETE/UPDATE NO ACTION/CASCADE/SET DEFAULT/SET NULL;	-- can also be table level
PRIMARY KEY
CLUSTERED	-- If it's a key, specify it to be clustered on this PK
```





Table level constraints

```sql
PRIMARY KEY (attr1, attr2);
UNIQUE (attr1, attr2);
CONSTRAINT slt_chk Check (
	sizelimit < 30 and sizelimit > 0
)
```















SQL queries

```sql
-- Basic query
SELECT [DISTINCT] attr1, attr2
FROM table1, table2
WHERE condition;

SELECT S.name
FROM Sailor S, Boats B
WHERE S.sid = B.sid AND B.bid = 103;

SELECT S.name
FROM Sailor S
WHERE S.sid = 1

GROUP BY S.month

-- In / Not In (uncorrelated queries)
...
...
WHERE attr1, attr2 IN (SELECT ...)		-- Attribute outputs must match arity & type

-- Exists / Not Exists (correlated queries)
...
...
WHERE EXISTS (SELECT ...)		-- Is the subquery empty? Subquery can use relation names in main query, so it's like a function call executed at each value of select

-- All, Any
...
...
WHERE P.cost > ALL (SELECT ...)	-- Is this condition satisfied on all outputs of subquery? Attribute outputs must match arity & type

-- Aggregates (COUNT, AVG, MAX, SUM) => return a value instead of relation
SELECT COUNT (DISTINCT id)
...

SELECT E.id
FROM Employee E
WHERE E.salary > (SELECT AVG (salary) FROM Employee)

-- Grouping -> Each cell (apart from key) are tables, which can then be turned into values via aggregates
SELECT F.dept, COUNT(F.facultyId)
FROM Faculty F
GROUP BY F.dept
HAVING COUNT(*) > 4	-- optional

-- NOTE! Sometimes engines like `presto` would require you to give new column names for the aggregates $$
SELECT F.dept, COUNT(F.facultyId) as count_faculty
FROM Faculty F
GROUP BY F.dept
```





**ALTER **$$

```sql
# Add new column
# ALTER TABLE <table> ADD <column>
ALTER TABLE dbo.doc_exa ADD column_b VARCHAR(20) NULL;

# Add DEFAULT constraint on an existing column
ALTER TABLE dob.doc_exz
	ADD CONSTRAINT col_b_df
	DEFAULT 50 FOR column_b;
GO

# Drop a column
# ALTER TABLE <table> DROP COLUMN <columns>
ALTER TABLE dbo.doc_exb DROP COLUMN column_c, column_d;

# Change data type of column
# ALTER TABLE <table> ALTER COLUMN <column> <datetype>
ALTER TABLE dbo.doc_exb ALTER COLUMN column_a DECIMAL (5, 2);
```



**UPDATE** $$

```sql
# Update all rows for a column
# UPDATE <table> SET <column = new_value>
UPDATE Person.Address
SET ModifiedDate = GETDATE():
GO

# Update all rows for multiple column
UPDATE Sales.SalesPerson
SET Bonus = 6000, CommissionPct = .10, SalesQuota = NULL;
GO

# Limit rows updated using WHERE
# UPDATE <table> SET <column = new_value> WHERE <condition>
UPDATE Sales.SalesPerson
SET Bonus = 6000, CommisionPct = .10, SalesQuota = NULL
WHERE Name LIKE N'Road-250%' AND Color = N'Red';
GO

# Limit rows updated using TOP
UPDATE TOP (10) Sales.SalesPerson
SET Bonus = 6000, CommissionPct = .10, SalesQuota = NULL;
GO

# Specifying a computed value
UPDATE Production.Product
SET ListPrice = ListPrice * 2;
Go
```



**DELETE** $$

```sql
# Delete all rows in table
DELETE FROM Production.ProductionCostHistory;
GO

# Delete rows that match condition
# DELETE FROM <table> WHERE <condition>
DELETE FROM Production.ProductionCostHistory
WHERE StandardCost > 1000.00;
GO
```







### Advanced SQL

#### <u>Joins</u>

B+ Tree primer

- Basically a balanced, generalized (>= 2 children) binary search tree
- Typical fan out: 200, average fan out 133 (66% fill factor)
  - Upper level in memory, lower level on disk

- Internal nodes contain alternating pointers and separater values
- External nodes contain pointers to disk (if unclustered)
- Performance:
  - Query and change both log(N) time
  - Compared to sorted storage, which is log(N) time for query but N time for change

- Clustered vs. unclustered
  - Unclustered: Leaf nodes are pointers to record
  - Clustered: Leaf nodes are record themselves
    - Faster read (no extra disk I/O) but only 1 cluster per record, and any changes need more alternation in tree

  - SQL creates an unclustered index on primary keys






Single-table query optimisation

```sql
SELECT *
FROM table as T
WHERE cond1 AND cond2 AND cond3
```

Here we have no joins, just need to filter out the rows in the table that satisfy conditions.

The key is to filter first the condition that can reduce the output size the most (e.g. col = key).

So should we do cond1 -> cond2 -> cond3, or cond2 -> cond1 -> cond3 etc. ? We use cost estimation! For this we need:

- A way to estimate searching cost: index search is O(height + #pages) while sequential scan is O(N)
- A way to estimate output size: This depends on metadata of table









Multi-table query optimisation - Join algorithms

| Join Algorithm          | Description                                                  | Complexity (of disk I/O)                                 |
| ----------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| Simple nested loop join | Retrieve R one page at a time<br />For each page join with S (check join condition) | Pages(R) + Pages(R) * Pages(S)                           |
| Block nested loop join  | Retrieve R one page at a time<br />Fit as many pages in block as possible<br />For each block join with S (check join condition) | Pages(R) + Blocks(R) * Pages(S)                          |
| Index nested loop join  | Retrieve R one page at a time<br />For each page join with S but search on S instead of linear scan<br />Can perform better than block nested loop join when R is small and S is indexed and large | Pages(R) + Tuples(R) * Search_Cost(S)                    |
| Sort-merge join         | Sort R and S on index, then do racing linear scan            | Sort_Cost + Pages(R) + Pages(S)<br />worstcase quadratic |
| Hash join               | Useful for large, unsorted, and nonindexed inputs.<br />Hash R on the condition columns, then consume S one row at a time, using the hash table to join matching rows.<br />If R cannot fit entirely in memory, we partition R and S into chunks, where matching rows must be in the same chunk. We then do hash join on each chunk<br /> | Pages(R) + Pages(S)                                      |



Pipelining: process on upstream output as they come

Materialisation: wait till upstream output is complete before continue (e.g., wait for sort)



RA optimization

- Sometimes we can optimise the RA before optimising each join





T-SQL join syntax

```sql
FROM first_table < join_type > second_table [ ON ( join_condition ) ]
```

Example

```sql
FROM Purchasing.ProductVendor INNER JOIN Purchasing.Vendor
	ON ( ProductVendor.BusinessEntityID = Vendor.BusinessEntityID )
```

The join plans are optimised in each instance before being executed. The above join syntax of inner join is perferred over the use of `WHERE` clause on top of a cross join below:

```sql
FROM Purchasing.ProductVendor AS PV, Purchasing.Vendor AS V
WHERE PV.BusinessEntityID = V.BusinessEntityID
```

Join types: $$

- INNER JOIN: rows that satisfy condition
- LEFT [OUTER] JOIN: + rows in left table (fields that don't satisfy are left as NULL)
- RIGHT [OUTER] JOIN: + rows in right table
- FULL [OUTER] JOIN: + rows in both tables
- CROSS JOIN: regular product on rows



Example of join types:

```sql
CREATE SCHEMA testSchema;

CREATE TABLE testSchema.Orders (
	orderId INT NOT NULL,
	customerId INT NOT NULL
);


CREATE TABLE testSchema.Customers (
	customerId INT NOT NULL,
	customerName VARCHAR(255) NOT NULL,
	country VARCHAR(255) NOT NULL
);

INSERT INTO testSchema.Orders (orderId, customerId) VALUES ('10308', '2');
INSERT INTO testSchema.Orders (orderId, customerId) VALUES ('10309', '37');
INSERT INTO testSchema.Orders (orderId, customerId) VALUES ('10310', '77');

INSERT INTO testSchema.Customers (customerId, customerName, country) VALUES ('1', 'Alice', 'Germany');
INSERT INTO testSchema.Customers (customerId, customerName, country) VALUES ('2', 'Bob', 'Mexico');
INSERT INTO testSchema.Customers (customerId, customerName, country) VALUES ('3', 'Charlie', 'Mexico');
```

INNER JOIN

```sql
SELECT *
FROM testSchema.Orders INNER JOIN testSchema.Customers ON (testSchema.Orders.customerId = testSchema.Customers.customerId)
```

| orderId | customerId | customerId | customerName | country |
| ------- | ---------- | ---------- | ------------ | ------- |
| 10308   | 2          | 2          | Bob          | Mexico  |



LEFT JOIN

```sql
SELECT *
FROM testSchema.Orders LEFT JOIN testSchema.Customers ON (testSchema.Orders.customerId = testSchema.Customers.customerId)
```

| orderId | customerId | customerId | customerName | country |
| ------- | ---------- | ---------- | ------------ | ------- |
| 10308   | 2          | 2          | Bob          | Mexico  |
| 10309   | 37         | NULL       | NULL         | NULL    |
| 10310   | 77         | NULL       | NULL         | NULL    |



RIGHT JOIN

```sql
SELECT *
FROM testSchema.Orders RIGHT JOIN testSchema.Customers ON (testSchema.Orders.customerId = testSchema.Customers.customerId)
```

| orderId | customerId | customerId | customerName | country |
| ------- | ---------- | ---------- | ------------ | ------- |
| NULL    | NULL       | 1          | Alice        | Germany |
| 10308   | 2          | 2          | Bob          | Mexico  |
| NULL    | NULL       | 3          | Charlie      | Mexico  |



FULL JOIN

```sql
SELECT *
FROM testSchema.Orders FULL JOIN testSchema.Customers ON (testSchema.Orders.customerId = testSchema.Customers.customerId)
```

| orderId | customerId | customerId | customerName | country |
| ------- | ---------- | ---------- | ------------ | ------- |
| 10308   | 2          | 2          | Bob          | Mexico  |
| 10309   | 37         | NULL       | NULL         | NULL    |
| 10310   | 77         | NULL       | NULL         | NULL    |
| NULL    | NULL       | 1          | Alice        | Germany |
| NULL    | NULL       | 3          | Charlie      | Mexico  |



CROSS JOIN

```sql
SELECT *
FROM testSchema.Orders CROSS JOIN testSchema.Customers
```

| orderId | customerId | customerId | customerName | country |
| ------- | ---------- | ---------- | ------------ | ------- |
| 10308   | 2          | 1          | Alice        | Germany |
| 10309   | 37         | 1          | Alice        | Germany |
| 10310   | 77         | 1          | Alice        | Germany |
| 10308   | 2          | 2          | Bob          | Mexico  |
| 10309   | 37         | 2          | Bob          | Mexico  |
| 10310   | 77         | 2          | Bob          | Mexico  |
| 10308   | 2          | 3          | Charlie      | Mexico  |
| 10309   | 37         | 3          | Charlie      | Mexico  |
| 10310   | 77         | 3          | Charlie      | Mexico  |









#### <u>ER diagrams</u> $$

- Tables & relations (potentially w/ data)
- Keys
- Optional/Mandatory
- One/Many
- Subtype (inheritance)
- Part/Whole (weak identity)



Potential cookbook translation:

- 1-1 bijective: R <-> S, add key of R to S and vice versa w/ FK constraint both ways. You can also have them as the same table
- Many-1: Add key of parent to child and FK on child
- Many-Many: Create intersection table w/ keys from R and S, FK on these
- Subtypes: Add key of parent to child and FK on child
- Part/Whole: Add key of parent to child and FK on child





#### <u>Functional dependencies & normal forms</u>

Functional dependency: A -> B but A is not a key. This is bad as repeated As give predictable, repeated Bs$$

​	Solution: T1 = T\B, T2 = A U B, make A a key in T2. This decomposition is lossless as T1 JOIN T2 = T

Example:

```sql
CREATE TABLE screenings (
	screen_id CHAR(30)	PRIMARY KEY NOT NULL CLUSTERED
    movie_id CHAR(30)
    movie_name VARCHAR(100)
    director VARCHAR(100)
    [time] DATETIME
)

-- movie_id => (movie_name, director), but movie_id is not a key in screenings

CREATE TABLE screenings (
	screen_id CHAR(30)	PRIMARY KEY NOT NULL CLUSTERED
    movie_id CHAR(30)	FOREIGN KEY movie_id REFERENCES movies ON DELETE SET DEFAULT(NULL)
    [time] DATETIME
)

CREATE TABLE movies (
	movie_id CHAR(30) PRIMARY KEY NOT NULL CLUSTERED
    movie_name VARCHAR(100)
    director VARCHAR(100)
)
```



Multi-value dependency (MVD): Pi_AB(T) JOIN Pi_AC(T) = T, where C = T \ A \ B

​	Solution: decompose into AB and AC

Example:

| Course |     Book     |  Lecturer   |
| :----: | :----------: | :---------: |
|  AHA   | Silberschatz |   John D    |
|  AHA   |  Nederpelt   |   John D    |
|  AHA   | Silberschatz |  William M  |
|  AHA   |  Nederpelt   |  William M  |
|  AHA   | Silberschatz | Christian G |
|  AHA   |  Nederpelt   | Christian G |
|  OSO   | Silberschatz |   John D    |
|  OSO   | Silberschatz |  William M  |

Book => Course & Book => Lecturer. Aka (Course, Book) JOIN (Book, Lecturer) = Table. So split to 2 tables like so.



Normalisation & denormalisation

- Normalisation is the process of removing dependencies. This removes redundancy at expense of performance 
- Denormalisation is the opposite, where tables are joined together. This introduces redundancy for performance





Normal forms: $$

3NF: Allow A -> b and A not key is b is part of some key

BCNF (= 3.5NF): No FD

4NF: No MVD







#### <u>Views</u>

https://learn.microsoft.com/en-us/sql/relational-databases/views/views?view=sql-server-ver16

A view is essentially the table resulted from a query.

Views can be used as a security feature that exposes certain part of the database to each different user.

Views also have a materialised, optimal execution plan. Accessing a view from a DB thus can have much better performance, than executing the same query every time from the frontend (in that case the view isn't materialised and the query plan needs to be executed every time)

Views are produced dynamically when the view is referenced. We can also create an Indexed View to materialize the data (compute query as table).

```sql
CREATE VIEW HumanResources.EmployeeHireDate  
AS  
SELECT p.FirstName, p.LastName, e.HireDate  
FROM HumanResources.Employee AS e JOIN Person.Person AS  p  
ON e.BusinessEntityID = p.BusinessEntityID ;   
GO

-- So a view is just the result of a query
```





#### <u>Miscellaneous concepts</u>

<u>Schemas</u>

= namespace of tables within db, default is `dpo` in t-sql

```sql
CREATE SCHEMA products;
```





<u>IDENT</u>

```sql
CREATE TABLE dbo.Test (
	productGroupId INT PRIMARY KEY CLUSTERED NOT NULL IDENTITY(1, 1),  -- Start at 1, increment by 1
)
```

If we create 5 products, then delete product 3, and create another product, that product will have `productGroupId` 6. To reset the counter we need to use below:

```sql
DBCC CHECKIDENT ('dbo.Test', RESEED, 2)
INSERT INTO dbo.test (description) VALUES ('Test 3');  -- productGroupId is 3
```







**ER diagram**



![](https://www.ermodelexample.com/wp-content/uploads/2019/10/free-entity-relationship-diagram-template-in-conceptual-entity-relationship-diagram.png)





<u>Pivot statement</u>

Pivot statement creates new columns where the values are aggregates of other columns

Syntax:

```sql
SELECT <non-pivoted column>,
	[first pivoted column] AS <column name>,
	[second pivoted column] AS <column name>,
	...
	[last pivoted column] AS <column name>
FROM
	(<SELECT query that produces data>)
	AS <alias for source query>
PIVOT
(
	<aggregate function>(<column being aggregated>)
FOR
[<column to be pivoted>]
    	IN ( [first pivoted column], [second pivoted column], ... [last pivoted column])
) AS <alias for the pivot table
<optional ORDER BY clause>;
```



Example:

We have a table for manufactoring time and cost of various products

```sql
SELECT DaysToManufacture, AVG(StandardCost) AS AverageCost
FROM Production.Product
GROUP BY DaysToManufacture;
```

Result set:

```
DaysToManufacture AverageCost
----------------- -----------
0                 5.0885
1                 223.88
2                 359.1082
4                 949.4105
```

We want to find out average days to manufacture for each `DaysToManufacture` values. We can use `PIVOT` to make `DaysToManufacture` columns of the new table

```sql
SELECT 'AverageCost' AS Cost_Sorted_By_Production_Days
	[0], [1], [2], [3], [4]
FROM
	(SELECT P.DayToManufacture, P.StandardCost
	FROM Production.Product AS P)
	AS SourceTable
PIVOT (
	AVG(P.StandardCost)
FOR
[P.DayToManufacture] IN ([0], [1], [2], [3], [4])
) AS PivotTable
```

Result set:

```
Cost_Sorted_By_Production_Days 0           1           2           3           4         
------------------------------ ----------- ----------- ----------- ----------- -----------
AverageCost                    5.0885      223.88      359.1082    NULL        949.4105
```



<u>More complex example:</u>

Finding how many purchases each employee made for each vendor

```sql
SELECT VendorID, [250] AS Emp1, [251] AS Emp2, [256] AS Emp3, [257] AS Emp4, [260] AS Emp5  
FROM   
(SELECT PurchaseOrderID, EmployeeID, VendorID  
FROM Purchasing.PurchaseOrderHeader) p  
PIVOT  
(  
COUNT (PurchaseOrderID)  
FOR EmployeeID IN  
( [250], [251], [256], [257], [260] )  
) AS pvt  
ORDER BY pvt.VendorID;
```

Partial result set:

```
VendorID    Emp1        Emp2        Emp3        Emp4        Emp5  
----------- ----------- ----------- ----------- ----------- -----------
1492        2           5           4           4           4
1494        2           5           4           5           4
1496        2           4           4           5           5
1498        2           5           4           4           4
1500        3           4           4           5           4
```









### Miscellaneous

<u>GO</u>

In MS SQL Management Server, batches of SQL statements are periodically sent to the server where a plan is produced to execute the query.

Go signals the end of a batch, used on ad-hoc queries.



<u>Squared brackets</u>

Like a string literal, used when you are quoting something that is a keyword or with spaces

```sql
SELECT First Name FROM People				-- Space results in syntax error
SELECT [First Name] FROM People

CREATE TABLE Test (
	id INT,
    user VARCHAR(255),
);											-- `user` is a keyword
CREATE TABLE Test (
	id INT,
    [user] VARCHAR9(255),
);
```



Use `''` single quotes for strings, not double quote



<u>Information schema</u>

Gives metadata of tables

- [INFORMATION_SCHEMA.CHECK_CONSTRAINTS](https://www.mssqltips.com/sqlservertutorial/180/informationschemacheckconstraints/)
- [INFORMATION_SCHEMA.COLUMN_DOMAIN_USAGE](https://www.mssqltips.com/sqlservertutorial/181/informationschemacolumndomainusage/)
- INFORMATION_SCHEMA.COLUMN_PRIVILEGES
- [INFORMATION_SCHEMA.COLUMNS](https://www.mssqltips.com/sqlservertutorial/183/informationschemacolumns/)
- INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE
- INFORMATION_SCHEMA.CONSTRAINT_TABLE_USAGE
- INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS
- INFORMATION_SCHEMA.DOMAINS
- INFORMATION_SCHEMA.KEY_COLUMN_USAGE
- INFORMATION_SCHEMA.PARAMETERS
- INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS
- INFORMATION_SCHEMA.ROUTINE_COLUMNS
- INFORMATION_SCHEMA.ROUTINES
- INFORMATION_SCHEMA.SCHEMATA
- INFORMATION_SCHEMA.TABLE_CONSTRAINTS
- INFORMATION_SCHEMA.TABLE_PRIVILEGES
- [INFORMATION_SCHEMA.TABLES](https://www.mssqltips.com/sqlservertutorial/196/informationschematables/)
- INFORMATION_SCHEMA.VIEW_COLUMN_USAGE
- INFORMATION_SCHEMA.VIEW_TABLE_USAGE
- INFORMATION_SCHEMA.VIEWS



<u>Date strings</u>

If your data has a date string column with format `yyyy-mm-dd` such as `2023-05-19`, then getting dates before and after that date is just `<=` and `>=` in string comparison, as lexicographic order directly relates to date.



Top/Limit

LImit output

```sql
SELECT TOP 1 *
FROM table as T
```

```sql
SELECT *
FROM table as T
LIMIT 1
```



Joins on subqueries

```sql
SELECT 
FROM
(SELECT Boats.id FROM Boats WHERE Boats.owner='Bob') as B
INNER JOIN
(SELECT Purchases.id FROM Employee) as P
ON Boats.purchaseYear = Purchases.purchaseYear
WHERE
```





### Database design

<u>Step 1: Handle ambiguity</u>

Can a professor be in more than one department? etc.



<u>Step 2: Define the core objects</u>

Each object is probably a table with fields as columns



<u>Step 3: Analyze relationships</u>

These form the foreign keys, relation tables etc.



<u>Step 4: Analyze actions</u>

Actions may require new tables







