# A gentle introduction to Postgres

#### Start

```bash
# To log in to default `postgres` account, the password is password for current Linux user
# This means to run in interactive mode with user `postgres`
sudo -i -u postgres
```

Then do `psql` to enter into SQL interactive mode. 

Notes:

- I've changed the authentication level of user `postgres` to `trust`, which means it will not check for passwords. Don't have this in production code!



Tutorial: https://www.postgresqltutorial.com/postgresql-select/



Remember: close command with `;`



#### **Useful psql commands**: 

https://www.postgresqltutorial.com/psql-commands/

`\c dbname [username]`: Switch database

`\d`: Show tables

`\d tablename`: Describe a table

`\dn`: List all schemas (Schemas are just a namespace element, so you can create both `admin` and `sales` schema and have both `admin.staff` and `sales.staff`). A schema belongs to only 1 database and a database can have one or more schemas

`\df`: List available functions

`\dv`: List available views

`\du`: Show users

`\l`: List databases

`\g`: Execute previous command

`\s`: List command history

`\i filename`: Execute psql commands from file

`\timing`: Time subsequent query executions

`\q`: To quit SQL interactive mode

`help`: For help

`\?`: List SQL commands

`\h ALTER TABLE`: Get detailed information on specific statements, like `ALTER TABLE`



#### **Other admin things:**

How to set password for Postgres

https://stackoverflow.com/questions/27107557/what-is-the-default-password-for-postgres

(Follow the commands here to restart Postgres after resetting the password:

https://www.dev2qa.com/how-to-resolve-psql-fatal-peer-authentication-failed-for-user-postgres-error-when-login-postgresql-in-command-line/)



Postgres roles

https://www.educba.com/postgresql-roles/

Chech role of current user

https://stackoverflow.com/questions/22501705/how-to-check-role-of-current-postgresql-user-from-qt-application



#### psycopg2

When using this to execute commands inside postgres, the return result is a list of tuples which represents the rows.

Remember, when doing

```sql
SELECT (name, age), email
FROM users
```

This doesn't return a tuple and a string, but rather it returns 2 strings as the `()` results in string concatenation



#### **Concepts**

Database vs. Tables

Get name of current db: https://www.dbrnd.com/2018/04/postgresql-get-the-name-of-current-database/

Switching db: https://www.liquidweb.com/kb/listing-switching-databases-postgresql/



**Triggers**: Code to be executed upon a defined alteration of the database

**Views**: Like virtual tables, which can represent a table, a partial table, a combination of different tables etc. One cannot alter views by default. Views are useful for report generation or restricting access.

**Functions**: aka. a stored procedure, allows you to carry out multiple instructions in a single call, creating an abstraction



**Check**:

Check constraints are executed right before each alternation of the table

Checks can be done at the column level or table level (where multiple columns are involved in the check)



Foreign keys must reference column(s) with uniqueness contraints, as otherwise it is ambiguous which row to reference



**Schema** https://www.postgresqltutorial.com/postgresql-schema/

> In PostgreSQL, a schema is a namespace that contains named database objects such as tables, [views](https://www.postgresqltutorial.com/postgresql-views/), [indexes](https://www.postgresqltutorial.com/postgresql-indexes/), [data types](https://www.postgresqltutorial.com/postgresql-data-types/), [functions](https://www.postgresqltutorial.com/postgresql-create-function/), [stored procedures](https://www.postgresqltutorial.com/postgresql-create-procedure/) and operators.

The idea is that you can access separate tables with the same relation. For example

```sql
hr.staff
-- or
sales.staff
```

The default schema is called "public". So the following is the same

```sql
CREATE TABLE table_name(
  ...
);
-- and
CREATE TABLE public.table_name(
   ...
);
```

The schema search path: use `SHOW search_path;` and `SELECT current_schema();`. When a table is mentioned, Postgres will scan through the search path and return the first instance (and an error is not found by the end of the search path)

To create a new schema, do

```sql
CREATE SCHEMA sales;
```

and alter the search path to modify names under the new schema:

```sql
SET search_path TO sales, public;
```

Then, subsequent `CREATE TABLE` commands will create them under the `sales` schema.

```SQL
DROP SCHEMA IF EXISTS private  -- Drops the schema `private` and all of its objects!
```







#### Tutorial





#### Other learnings



**FOREIGN KEY vs. REFERENCES**

One is a table constraint, the other is a column constraint. Of course, when you apply a table constraint only to a specific column, it has the same effect as a column constraint. So in this case the effects will be the same.

You can check this buy creating the table in either way and looking at the metadata with `\d psql` or `pg_dump -s -t table_name dbname`



**Inserting**

In Postgres, textual data must be wrapped in literal `'` and not in double quotes.



**Escaping `'`**

We use `''` to escape it, instead of `\'`



**Clearing the screen**

Use linux `Ctrl-L` or `\! clear` in psql to clear the screen



**SERIAL data type**

https://www.postgresqltutorial.com/postgresql-serial/

https://www.postgresqltutorial.com/postgresql-sequences/

Essentially a shortcut to associate a field with a sequence. The command

```sql
CREATE TABLE table_name(
    id SERIAL
);
```

is equivalent to 

```sql
CREATE SEQUENCE table_name_id_seq;

CREATE TABLE table_name (
    id integer NOT NULL DEFAULT nextval('table_name_id_seq')
);

ALTER SEQUENCE table_name_id_seq
OWNED BY table_name.id;  -- So that if we drop the `id` column, the sequence will be deleted
```

Then, when we add a new entry into `table_name` but not giving a specific id, we will get the next number in the sequence. For example:

```sql
INSERT INTO fruits(name) 
VALUES('Orange');

INSERT INTO fruits(id,name) 
VALUES(DEFAULT,'Apple');

SELECT * FROM fruits;

 id |  name
----+--------
  1 | Apple
  2 | Orange
(2 rows)
```

