# Pandas




```python
import pandas as pd
```


Parking:



### DataFrame

#### Creating a DataFrame

```python
df = pd.DataFrame(
	{
        "Name": [
            "Braud, Mr. Owen Harris",
            "Allen, Mr. William Henry",
            "Bonnell, Miss. Elizabeth"
        ],
        "Age": [22, 35, 58],
        "Sex": ["male", "male", "female"]
    }
)
```



#### Types


| Pandas dtype  | Python type  | NumPy type                                                     | Usage                                        |
|---------------|--------------|----------------------------------------------------------------|----------------------------------------------|
| object        | str or mixed | string_, unicode_, mixed types                                 | Text or mixed numeric and non-numeric values |
| int64         | int          | int_, int8, int16, int32, int64, uint8, uint16, uint32, uint64 | Integer numbers                              |
| float64       | float        | float_, float16, float32, float64                              | Floating point numbers                       |
| bool          | bool         | bool_                                                          | True/False values                            |
| datetime64    | NA           | datetime64[ns]                                                 | Date and time values                         |
| timedelta[ns] | NA           | NA                                                             | Differences between two datetimes            |
| category      | NA           | NA                                                             | Finite list of text values                   |

Why use `object` type for strings in Pandas?

- numpy strings have fixed length, which isn't very flexible
- numpy strings also don't hold unicode properly
- numpy strings are mutable

So Pandas uses Python strings which are objects.

Note: Integers can be casted to `object` but they are not strings underneath.



#### IO tools

Reading

```python
titanic = pd.read_csv('data/titanic,csv')
titanic2 = pd.read_excel('titanic.xlsx', sheet_name='passengers')
```

Writing

```python
# save to 'passengers' instead of default 'Sheet 1', don't copy over row index labels
titanic.to_excel('titanic.xlsx', sheet_name='passengers', index=False)
```



#### Slicing

```python
titanic[['Age', 'Sex']]			# specifc columns

# Conditions
titanic[titanic['Age'] > 35]	# filters
	# Under the hood, titanic['Age'] > 35 is a series of bools, which can be used for filtering
    
# isin
titanic[titanic['Pclass'].isin([2,3])]

# Joining conditions
titanic[(titanic['Pclass'] == 2) | (titanic['Pclass'] == 3)]

# Drop NA
titanic[titanic['Age'].notna()]

# Specific rows and cols by conditions
# loc[rows you want, cols you want]
titanic.loc[titanic['Age'] > 35, 'Name'] # all rows with age > 35, select column 'Name' within these rows

# Specific rows and cols by index
titanic.iloc[9:25, 2:5]
titanic.iloc[9:25, 2:5] = 'anonymous'	# insert new values at data locations
```

Condition: ~, |, &




#### Sorting

- `.sort_index([key=func])`: Sort by index
- `ser.sort_values()`: Sort series by values
- `df.sort_values(by='col'/['col's][, na_position='first', key=func])`: Sort DF by column values
- `ser.searchsorted(value, side='left, sorter=None)`: Return indices to insert `value` (can be list of values) to maintain sorted order
- `ser.nsmallest(n)`: Like `head(n)`
- `ser.nlargest(n)`: Like `tail(n)`
- `df.nsmallest(n, cols)`
- `df.nlargest(n, cols)`



#### Copy-on-Write (CoW)

`.copy()`: Deep copy of data frame.

Note, this is used very rarely becaues pandas almost always creates a new object upon modification (so code looks functional)


#### Creating new columns

```python
# Creating new column, with values calculated by element
air_quality['london_mg_per_cubic'] = air_quality['station_london'] * 1.882

air_quality['ratio_paris_antwarp'] = (
	air_quality['station_paris'] / air_quality['station_antwerp']
)

# Rename: provide mapping for column and row names
air_quality_renamed = air_quality.rename(
    columns={
        "station_antwerp": "BETR801",
        "station_paris": "FR04014",
        "station_london": "London Westminster",
    }
)

# Rename: provide renaming function
air_quality_renamed = air_quality_renamed.rename(columns=str.lower)

# For more advanced logic, use .apply()
```

#### Reindexing and renaming

`.reindex(index=, columns=[, method=])`: Reindex indices and columns. method can take "ffill", "bfill", and "nearest" for filling nan when new index are introduced
	You can also add `limit` and `tolerance` when using ffill and bfill

`.reindex_like(df2)`: Change current DF index to that of `df2`

`.drop([...], axis=0)`: Drop labels from an axis

`.rename(columns={'old': 'new'}, index={'old': 'new})`: Renaming labels
`.rename(columns=str.upper)`: Can take functions too to apply to each label


#### Iteration

By columns

```python
for label, ser in df.items():
    print(label)
    print(ser)
```

By rows

```python
for row_index, row in df.iterrows():
    print(row_index, row, sep="\n")
```

By rows as named tuple

```
In [271]: for row in df.itertuples():
   .....:     print(row)
   .....: 
Pandas(Index=0, a=1, b='a')
Pandas(Index=1, a=2, b='b')
Pandas(Index=2, a=3, b='c')
```




#### Datetime operations

- np.datetime64 type vs. pd.Timestamp vs. python datetime types
  - In Pandas 1.4, pd.Timestamp has no concept of precision. It always stores till ns precision. Flooring just clears the lower bits. `unit` is only used at point of initialisation so the timestamp taken is converted to the correct time

**Series** have `.dt` accessor that return a Series of datetime like values

`.dt.hour`: Integer representing the hour (similar `.dt.second`, `.dt.day` ...)

`.dt.tz_localize(timezone_string | None)`: Set timezone of datetime

`.dt.tz_convert(timezone_string)`: Convert time to target timezone

`.dt.strftime("%Y/%m/%d")`: Formats datetime to a string

`.dt.components`: Breaks down datetime to component (days, hours, minutes ...)

This accessor brings convenience when filtering, say `df[lambda x: x.date_col.dt.weekday == 0]`








#### Aggregates

```python
# Aggregates for each column
titanic.agg(
	{
        'Age': ['min', 'max', 'median', 'skew'],
        'Fare': ['min', 'max', 'median', 'mean']
    }
)
Out[7]: 
              Age        Fare
min      0.420000    0.000000
max     80.000000  512.329200
median  28.000000   14.454200
skew     0.389108         NaN
mean          NaN   32.204208

# Create aggregates and insert to new columns
activites
>>>	+------------+------------+
    | sell_date  | product     |
    +------------+------------+
    | 2020-05-30 | Headphone  |
    | 2020-06-01 | Pencil     |
    | 2020-06-02 | Mask       |
    | 2020-05-30 | Basketball |
    | 2020-06-01 | Bible      |
    | 2020-06-02 | Mask       |
    | 2020-05-30 | T-Shirt    |
    +------------+------------+

activities.groupby(
    'sell_date'
)['product'].agg([
    ('num_sold', 'nunique'),
    ('products', lambda x: ','.join(sorted(x.unique())))
]).reset_index()

>>>	+------------+----------+------------------------------+
    | sell_date  | num_sold | products                     |
    +------------+----------+------------------------------+
    | 2020-05-30 | 3        | Basketball,Headphone,T-shirt |
    | 2020-06-01 | 2        | Bible,Pencil                 |
    | 2020-06-02 | 1        | Mask                         |
    +------------+----------+------------------------------+

# Use this syntax to specify how to aggregate on other columns
right=examinations.groupby(
	['student_id', 'subject_name'],
).agg(
	attended_exams=('subject_name', 'count')
).reset_index()

# Groupby
titanic[["Sex", "Age"]].groupby("Sex").mean()
```





#### Reshaping

```python
# Pivoting is entirely reshaping of data (no aggregation is done)
df = pd.DataFrame({'foo': ['one', 'one', 'one', 'two', 'two',
                           'two'],
                   'bar': ['A', 'B', 'C', 'A', 'B', 'C'],
                   'baz': [1, 2, 3, 4, 5, 6],
                   'zoo': ['x', 'y', 'z', 'q', 'w', 't']})

df
>>>	    foo   bar  baz  zoo
    0   one   A    1    x
    1   one   B    2    y
    2   one   C    3    z
    3   two   A    4    q
    4   two   B    5    w
    5   two   C    6    t



# If no index is given, use original index. If no values are given, use all remaining columns
df.pivot(index='foo', columns='bar', values=['baz', 'zoo'])
>>>	      baz       zoo
    bar   A  B  C   A  B  C
    foo
    one   1  2  3   x  y  z
    two   4  5  6   q  w  t
    
    
df.pivot(index='foo', columns=['bar', 'baz'], values='zoo')
>>>	bar    A    B    C    A    B    C
    baz    1    2    3    4    5    6
    foo
    one    x    y    z  NaN  NaN  NaN
    two  NaN  NaN  NaN    q    w    t
    
df.pivot(index=['foo', 'bar'], columns='baz', values='zoo')
>>>	baz        1    2    3    4    5    6
    foo bar
    one A      x  NaN  NaN  NaN  NaN  NaN
        B    NaN    y  NaN  NaN  NaN  NaN
        C    NaN  NaN    z  NaN  NaN  NaN
    two A    NaN  NaN  NaN    q  NaN  NaN
        B    NaN  NaN  NaN  NaN    w  NaN
        C    NaN  NaN  NaN  NaN  NaN    t
        
# Note, we get value error when the combination of columns and indices contain duplicates, in which case we will need to use aggregation using pivot_table


# Pivot Table
# Provide addtional aggregation function to resolve aggregates
df = pd.DataFrame({"A": ["foo", "foo", "foo", "foo", "foo",
                         "bar", "bar", "bar", "bar"],
                   "B": ["one", "one", "one", "two", "two",
                         "one", "one", "two", "two"],
                   "C": ["small", "large", "large", "small",
                         "small", "large", "small", "small",
                         "large"],
                   "D": [1, 2, 2, 3, 3, 4, 5, 6, 7],
                   "E": [2, 4, 5, 5, 6, 6, 8, 9, 9]})
>>>	     A    B      C  D  E
    0  foo  one  small  1  2
    1  foo  one  large  2  4
    2  foo  one  large  2  5
    3  foo  two  small  3  5
    4  foo  two  small  3  6
    5  bar  one  large  4  6
    6  bar  one  small  5  8
    7  bar  two  small  6  9
    8  bar  two  large  7  9
    
table = pd.pivot_table(df, values='D', index=['A', 'B'],
                       columns=['C'], aggfunc="sum")
>>>	C        large  small
    A   B
    bar one    4.0    5.0
        two    7.0    6.0
    foo one    4.0    1.0
        two    NaN    6.0
        
# Use `fill_value` to fill for NaN
table = pd.pivot_table(df, values='D', index=['A', 'B'],
                       columns=['C'], aggfunc="sum", fill_value=0)
>>>	C        large  small
    A   B
    bar one      4      5
        two      7      6
    foo one      4      1
        two      0      6
        
# If no `columns` is given, we use `values` as "columns"
table = pd.pivot_table(df, values=['D', 'E'], index=['A', 'C'],
                       aggfunc={'D': "mean",
                                'E': ["min", "max", "mean"]})
>>>	                  D   E
                   mean max      mean  min
    A   C
    bar large  5.500000   9  7.500000    6
        small  5.500000   9  8.500000    8
    foo large  2.000000   5  4.500000    4
        small  2.333333   6  4.333333    2
        
        
# Resetting index => changing the index of a DataFrame
df = pd.DataFrame([('bird', 389.0),
                   ('bird', 24.0),
                   ('mammal', 80.5),
                   ('mammal', np.nan)],
                  index=['falcon', 'parrot', 'lion', 'monkey'],
                  columns=('class', 'max_speed'))
>>>	         class  max_speed
    falcon    bird      389.0
    parrot    bird       24.0
    lion    mammal       80.5
    monkey  mammal        NaN
    
# When we reset the index, old index is added as column. New sequential index used
df.reset_index()
>>>	    index   class  max_speed
    0  falcon    bird      389.0
    1  parrot    bird       24.0
    2    lion  mammal       80.5
    3  monkey  mammal        NaN


# We can choose to drop the original index
df.reset_index(drop=True)
>>>	    class  max_speed
    0    bird      389.0
    1    bird       24.0
    2  mammal       80.5
    3  mammal        NaN
    
# Resetting index with MultiIndex
index = pd.MultiIndex.from_tuples([('bird', 'falcon'),
                                   ('bird', 'parrot'),
                                   ('mammal', 'lion'),
                                   ('mammal', 'monkey')],
                                  names=['class', 'name'])

columns = pd.MultiIndex.from_tuples([('speed', 'max'),
                                     ('species', 'type')])

df = pd.DataFrame([(389.0, 'fly'),
                   (24.0, 'fly'),
                   (80.5, 'run'),
                   (np.nan, 'jump')],
                  index=index,
                  columns=columns)

>>>	               speed species
                     max    type
    class  name
    bird   falcon  389.0     fly
           parrot   24.0     fly
    mammal lion     80.5     run
           monkey    NaN    jump
        
# We can choose which levels we want to reset
df.reset_index(level='class')
>>>	         class  speed species
                      max    type
    name
    falcon    bird  389.0     fly
    parrot    bird   24.0     fly
    lion    mammal   80.5     run
    monkey  mammal    NaN    jump
    
df.reset_index(level=['name', 'class'])
>>>	     class    name  speed species
                         max    type
    0    bird  falcon  389.0     fly
    1    bird  parrot   24.0     fly
    2  mammal    lion   80.5     run
    3  mammal  monkey    NaN    jump
    
# By default, for MultiIndex on columns, index is added to top level. We can change this with the `col_level` argument
df.reset_index(level='class', col_level=1)
>>>	                 speed species
             class    max    type
    name
    falcon    bird  389.0     fly
    parrot    bird   24.0     fly
    lion    mammal   80.5     run
    monkey  mammal    NaN    jump

# Use `col_fill` to fill the rest of the column level for new columns
df.reset_index(level=['class', 'name'], col_level=1, col_fill='animal')
>>>	   animal          speed species
        class    name    max    type
    0    bird  falcon  389.0     fly
    1    bird  parrot   24.0     fly
    2  mammal    lion   80.5     run
    3  mammal  monkey    NaN    jump

    
    
# Use melt to lengthen a DataFrame
df = pd.DataFrame({'A': {0: 'a', 1: 'b', 2: 'c'},
                   'B': {0: 1, 1: 3, 2: 5},
                   'C': {0: 2, 1: 4, 2: 6}})
>>>	   A  B  C
    0  a  1  2
    1  b  3  4
    2  c  5  6

df.melt(id_vars=['A'], value_vars=['B'])
   A variable  value
0  a        B      1
1  b        B      3
2  c        B      5

df.melt(id_vars=['A'], value_vars=['B', 'C'])
   A variable  value
0  a        B      1
1  b        B      3
2  c        B      5
3  a        C      2
4  b        C      4
5  c        C      6

df.melt(id_vars=['A', 'B'], value_vars=['C'])
>>>	   A  B variable  value
    0  a  1        C      2
    1  b  3        C      4
    2  c  5        C      6

# Change name of `variable` and `name` to something different
df.melt(id_vars=['A'], value_vars=['B'],
        var_name='myVarname', value_name='myValname')
```



#### Combining data

```python
# We can concatenate tables along axis 0 (row) or axis 1 (column), provided the other dimension match
air_quality_no2
>>>	  location parameter  value
    0     FR04       no2   20.0
    1     FR04       no2   21.8
    2     FR04       no2   26.5

air_quality_pm25
>>>	  location parameter  value
    0  BETR801      pm25   18.0
    1  BETR801      pm25    6.5
    2  BETR801      pm25   18.5

pd.concat([air_quality_no2, air_quality_pm25], axis=0)
>>>	  location parameter  value
    0     FR04       no2   20.0
    1     FR04       no2   21.8
    2     FR04       no2   26.5
    0  BETR801      pm25   18.0
    1  BETR801      pm25    6.5
    2  BETR801      pm25   18.5
    
# We can add a hierarchical index so we can always tell which rows belonged to which original table
pd.concat([air_quality_no2, air_quality_pm25], axis=0, keys=['no2', 'pm25'])
>>>	       location parameter  value
    no2  0     FR04       no2   20.0
         1     FR04       no2   21.8
         2     FR04       no2   26.5
    pm25 0  BETR801      pm25   18.0
         1  BETR801      pm25    6.5
         2  BETR801      pm25   18.5
            
            
            
# Joins
# how{‘left’, ‘right’, ‘outer’, ‘inner’, ‘cross’}, default ‘inner’
air_quality = pd.merge(air_quality, stations_coord, how="left", on="location")

air_quality = pd.merge(air_quality, air_quality_parameters,
                       how='left', left_on='parameter', right_on='id', suffices=('_aq', '_aq_param'))
# Does what you expect it to do, like in SQL join
```





#### DataFrame attributes and operations

Attributes

`.dtypes`: Return dtypes of each column 

`.shape`: Shape (# row, # col)

`.index`: Index of DataFrame

`.array`: Underlying numpy array

`.empty`: If it's empty

Descriptive


|Function|Description|
| --- | --- |
|`count` |Number of non-NA observations |
|`sum` |Sum of values |
|`mean` |Mean of values |
|`median` |Arithmetic median of values |
|`min` |Minimum |
|`max` |Maximum |
|`mode` |Mode |
|`abs`|Absolute Value |
|`prod` |Product of values |
|`std` |Bessel-corrected sample standard deviation |
|`var` |Unbiased variance |
|`sem` |Standard error of the mean |
|`skew` |Sample skewness (3rd moment) |
|`kurt` |Sample kurtosis (4th moment) |
|`quantile` |Sample quantile (value at %) |
|`cumsum` |Cumulative sum |
|`cumprod` |Cumulative product |
|`cummax` |Cumulative maximum |
|`cummin` |Cumulative minimum|

Note, by default some numpy methods like `mean`, `std`, and `sum` will skip `NA`s

`.describe()`: Summarize DF  `series.describe(percentiles=[0.05, 0.25, 0.75, 0.95])`, `frame.describe(include=["object"])`

`idxmin()` / `idxmax()`: Index of min and max, returns first if multiple candidates (`df1.idxmin(axis=0)`, `df1.idxmax(axis=1)`)

`.value_counts()`: Histogram

`.cut()`: Discretization by value

`.qcut()`: Discretization by sample quantiles


Common operations

`.head(n)`: Display first `n` rows of data

`.tail(n)`: Display last `n` rows of data

`.info()`: Detailed summary

`.max(axis=0, numeric_only=False)`: Return max of each column/row, which is a series. If `numeric_only` is set to True, then leave only columns with float/int/boolean dtype.

`.mean()`: Mean of columns

`.median()`: Median of columns

`.sort_values(by='Age')` / `.sort_values(by=['Pclass', 'Age'], ascending=False, inplace=False)`: Sorting values

`.keys()`: Keys of DataFrame

`.drop_duplicates(subset='col1', keep='first', inplace=False)`: Drop duplicate rows

`.count(axis=0)`: Count non-NA cells for each column or row.

`.dropna()`: Drop rows with null fields

`.droplevel(level, axis=0)`: Name or level index to drop for MultiIndex, `axis` at 0 is for row index and 1 for column 

`.drop(columns=[], ...)`: Drop columns, rows ...

`.rename(column={'A': 'a', 'B': 'b'}, ...)`: Rename column and index labels

`.fillna(x)` Fill NA values

`.astype(dtype)`: Cast a pandas object to a specified type `dtype`

```python
df.astype('int32')	# cast all columns
df['wordcount'] = df['wordcount'].astype('int32')	# cast a column and map back
```

`.iterrows()`: Returns an iterator through the rows of the data frame, each row is a tuple of (index: Label or Tuple of Label, data: Series)

`.reindex(columns=)`: Conform DataFrame to new index with optional filling logic

`.assign(**{col_name : func / ser})`: Assigns new column or overwrite existing column if name clash. Takes in keyword args that maps column name to the series for the column or a function that takes in the existing DF and returns a series.     => Note: Later items in `**kwargs` may refer to newly created or modified columns in `df`; items are computed and assigned into `df` in order.
   Also note that `assign` always copies data, so `.assign().assign().assign()` is anti-pattern, always use a single assign.

`.apply()`: Used in column creation for more complex patterns. Apply a function along an axis of the DataFrame. Function takes in series as input (column if axis=0, row if axis=1)

```python
df = pd.DataFrame([[4, 9]] * 3, columns=['A', 'B'])
df
>>>	   A  B
    0  4  9
    1  4  9
    2  4  9

# Apply function work on series, default axis is 0
df.apply(np.sum, axis=0)
>>>	A    12
	B    27
    
df.apply(np.sum, axis=1)
>>>	0    13
    1    13
    2    13

df.apply(np.sqrt)
>>>	     A    B
    0  2.0  3.0
    1  2.0  3.0
    2  2.0  3.0

# Apply function works element-wise for series
def find_patients(patients: pd.DataFrame) -> pd.DataFrame:
    return patients[patients.conditions.apply(is_valid)]

def is_valid(condition):
    return any([x.startswith('DIAB1') for x in condition.split()])
```

`.rename(columns)`: Rename column name (`columns` is mapping of old name => new name)

`.any(axis=0)`: Return a series of the result of logical `any` on the axis (0 is over columns, 1 is over rows)

`.transpose()`: Transposes the data frame, indices are now column names

`.to_string()`: For displaying

^^ Some of these methods/attributes also work on series



#### GroupBy



GroupBy process is a sequence of 3 steps:

- Splitting the data into groups based on some criteria
- Applying a function to each group independently
- Combining the results into a data structure 



For apply step, generally one of 3 options

- Aggregation: compute summary stats. for each group
  - sums, means, sizes, counts
- Transformation: 
  - standardize data, fillling NAs
- Filtration: 
  - discard some groups 





**Splitting an object into groups**

Groupby options

```python
df.groupby(['A', 'B'],
	sort=True,	# Sorts by group keys by default, slight performance improvement as sorting is not done (leave in same order as groups appear in the original data)
	dropna=True, # Drops group keys with NA by default
	as_index=True, # Have group keys are index by default 
	group_keys=True # Have group keys in result by default
)
```

Showing groupings => keys are group keys, values are index values of members in each group

```python
>>> df
   a    b  c
0  1  2.0  3
1  1  NaN  4
2  2  1.0  3
3  1  2.0  2

>>> grouped = df.groupby('a')

>>> grouped.groups
{1: [0, 1, 3], 2: [2]}
```

Splitting with MultiIndex

```python
>>> s
first  second
bar    one       0.744977
       two       0.201677
baz    one      -1.444160
       two       0.301844
foo    one       0.556619
       two       1.182560
qux    one       1.163549
       two       0.162515
    
>>> s.groupby(level=0).sum()
first
bar    0.946655
baz   -1.142317
foo    1.739180
qux    1.326064

>>> s.groupby(level='second').sum()
second
one    1.020985
two    1.848596
    
>>> s.groupby(level=['first', 'second']).sum()
first  second
bar    one       0.744977
       two       0.201677
baz    one      -1.444160
       two       0.301844
foo    one       0.556619
       two       1.182560
qux    one       1.163549
       two       0.162515
```

You can group by a combination of index and columns using a Grouper

```python
df
Out[63]: 
              A  B
first second      
bar   one     1  0
      two     1  1
baz   one     1  2
      two     1  3
foo   one     2  4
      two     2  5
qux   one     3  6
      two     3  7
    
df.groupby([pd.Grouper(level=1), "A"]).sum()
Out[64]: 
          B
second A   
one    1  2
       2  4
       3  6
two    1  4
       2  5
       3  7
```

You may want different operations for each column for the groups

```python
grouped = df.groupby(['A'])
grouped_C = grouped['C']
grouped_D = grouped['D']

'''
This is syntactic sugar to
df['C'].groupby(df['A'])

But of course saves the need to recompute the group keys
'''
```

Iterating through groups => SLOW! Don't use for loops in dataframe operations

```python
for name, group in groups:
    print(name)
    print(group)
```

Selecting the dataframe belonging to a group

```python
grouped.get_group('bar')
grouped_multi_index.get_group(('bar', 'one'))
```







**Aggregation**

Maps each column in each group to a scalar, returning a dataframe.

```python
animals
Out[80]: 
  kind  height  weight
0  cat     9.1     7.9
1  dog     6.0     7.5
2  cat     9.5     9.9
3  dog    34.0   198.0

animals.groupby("kind").sum()
Out[81]: 
      height  weight
kind                
cat     18.6    17.8
dog     40.0   205.5

# Resets index, otherwise index is group key by default
animals.groupby("kind", as_index=False).sum()
Out[82]: 
  kind  height  weight
0  cat    18.6    17.8
1  dog    40.0   205.5
```

| Method                                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`any()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.any.html#pandas.core.groupby.DataFrameGroupBy.any) | Compute whether any of the values in the groups are truthy   |
| [`all()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.all.html#pandas.core.groupby.DataFrameGroupBy.all) | Compute whether all of the values in the groups are truthy   |
| [`count()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.count.html#pandas.core.groupby.DataFrameGroupBy.count) | Compute the number of non-NA values in the groups            |
| [`cov()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.cov.html#pandas.core.groupby.DataFrameGroupBy.cov) * | Compute the covariance of the groups                         |
| [`first()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.first.html#pandas.core.groupby.DataFrameGroupBy.first) | Compute the first occurring value in each group              |
| [`idxmax()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.idxmax.html#pandas.core.groupby.DataFrameGroupBy.idxmax) | Compute the index of the maximum value in each group         |
| [`idxmin()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.idxmin.html#pandas.core.groupby.DataFrameGroupBy.idxmin) | Compute the index of the minimum value in each group         |
| [`last()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.last.html#pandas.core.groupby.DataFrameGroupBy.last) | Compute the last occurring value in each group, order is order of row in dataframe               |
| [`max()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.max.html#pandas.core.groupby.DataFrameGroupBy.max) | Compute the maximum value in each group                      |
| [`mean()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.mean.html#pandas.core.groupby.DataFrameGroupBy.mean) | Compute the mean of each group                               |
| [`median()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.median.html#pandas.core.groupby.DataFrameGroupBy.median) | Compute the median of each group                             |
| [`min()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.min.html#pandas.core.groupby.DataFrameGroupBy.min) | Compute the minimum value in each group                      |
| [`nunique()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.nunique.html#pandas.core.groupby.DataFrameGroupBy.nunique) | Compute the number of unique values in each group            |
| [`prod()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.prod.html#pandas.core.groupby.DataFrameGroupBy.prod) | Compute the product of the values in each group              |
| [`quantile()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.quantile.html#pandas.core.groupby.DataFrameGroupBy.quantile) | Compute a given quantile of the values in each group         |
| [`sem()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.sem.html#pandas.core.groupby.DataFrameGroupBy.sem) | Compute the standard error of the mean of the values in each group |
| [`size()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.size.html#pandas.core.groupby.DataFrameGroupBy.size) | Compute the number of values in each group                   |
| [`skew()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.skew.html#pandas.core.groupby.DataFrameGroupBy.skew) * | Compute the skew of the values in each group                 |
| [`std()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.std.html#pandas.core.groupby.DataFrameGroupBy.std) | Compute the standard deviation of the values in each group   |
| [`sum()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.sum.html#pandas.core.groupby.DataFrameGroupBy.sum) | Compute the sum of the values in each group                  |
| [`var()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.var.html#pandas.core.groupby.DataFrameGroupBy.var) | Compute the variance of the values in each group             |

`aggregate()` method

```python
grouped['C'].agg(['sum', 'mean', 'std'])
          sum      mean       std
A                                
bar  0.392940  0.130980  0.181231
foo -1.796421 -0.359284  0.912265

grouped['C'].agg('sum')

# anonymous function
animals.groupby("kind")[["height"]].agg(lambda x: x.astype(int).sum())

(
    grouped["C"]
    .agg(["sum", "mean", "std"])
    .rename(columns={"sum": "foo", "mean": "bar", "std": "baz"})
)

# named aggregation
# syntax: new_column=(orig_column, func)
animals.groupby("kind").agg(
    min_height=("height", "min"),
    max_height=("height", "max"),
    average_weight=("weight", "mean"),
)
```



**Transformation**

DF => DF operations. Return DF with same index as original, now with transformed values. 

```python
speeds
Out[117]: 
          class           order  max_speed
falcon     bird   Falconiformes      389.0
parrot     bird  Psittaciformes       24.0
lion     mammal       Carnivora       80.2
monkey   mammal        Primates        NaN
leopard  mammal       Carnivora       58.0

result = speeds.copy()

result["cumsum"] = grouped.cumsum()

result["diff"] = grouped.diff()

result
Out[124]: 
          class           order  max_speed  cumsum   diff
falcon     bird   Falconiformes      389.0   389.0    NaN
parrot     bird  Psittaciformes       24.0   413.0 -365.0
lion     mammal       Carnivora       80.2    80.2    NaN
monkey   mammal        Primates        NaN     NaN    NaN
leopard  mammal       Carnivora       58.0   138.2    NaN
```

| Method                                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`bfill()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.bfill.html#pandas.core.groupby.DataFrameGroupBy.bfill) | Back fill NA values within each group                        |
| [`cumcount()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.cumcount.html#pandas.core.groupby.DataFrameGroupBy.cumcount) | Compute the cumulative count within each group               |
| [`cummax()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.cummax.html#pandas.core.groupby.DataFrameGroupBy.cummax) | Compute the cumulative max within each group                 |
| [`cummin()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.cummin.html#pandas.core.groupby.DataFrameGroupBy.cummin) | Compute the cumulative min within each group                 |
| [`cumprod()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.cumprod.html#pandas.core.groupby.DataFrameGroupBy.cumprod) | Compute the cumulative product within each group             |
| [`cumsum()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.cumsum.html#pandas.core.groupby.DataFrameGroupBy.cumsum) | Compute the cumulative sum within each group                 |
| [`diff()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.diff.html#pandas.core.groupby.DataFrameGroupBy.diff) | Compute the difference between adjacent values within each group |
| [`ffill()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.ffill.html#pandas.core.groupby.DataFrameGroupBy.ffill) | Forward fill NA values within each group, will not fill first value if it is NaN                    |
| [`pct_change()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.pct_change.html#pandas.core.groupby.DataFrameGroupBy.pct_change) | Compute the percent change between adjacent values within each group |
| [`rank()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.rank.html#pandas.core.groupby.DataFrameGroupBy.rank) | Compute the rank of each value within each group             |
| [`shift()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.shift.html#pandas.core.groupby.DataFrameGroupBy.shift) | Shift values up or down within each group                    |

The `transform` method

Can take any built-in transformation method, or a function that outputs a scalar for the group (so it can be broadcasted to the rows).

```python
# Normalising inside each group
transformed = ts.groupby(lambda x: x.year).transform(
    lambda x: (x - x.mean()) / x.std()
)
```

Note, function inside `.transform` takes a series as argument. This function is applied to each column of each group.

The returned DF will be in the original index, not ordered by group keys.

Also note that group keys are dropped after transform (https://github.com/pandas-dev/pandas/issues/12495)

```python
df_simp = pd.DataFrame({
    'A': [1,2,1,2,1],
    'B': [10,20,30,40,50]
})
'''
	A	B
0	1	10
1	2	20
2	1	30
3	2	40
4	1	50
'''

df_simp.groupby('A').transform(lambda ser : ser * 10)
'''
B
0	100
1	200
2	300
3	400
4	500
'''
```







**Filtration**

Crushes each group into a single row

```python
speeds.groupby("class").nth(1)
```

| Method                                                       | Description                            |
| ------------------------------------------------------------ | -------------------------------------- |
| [`head()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.head.html#pandas.core.groupby.DataFrameGroupBy.head) | Select the top row(s) of each group    |
| [`nth()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.nth.html#pandas.core.groupby.DataFrameGroupBy.nth) | Select the nth row(s) of each group    |
| [`tail()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.core.groupby.DataFrameGroupBy.tail.html#pandas.core.groupby.DataFrameGroupBy.tail) | Select the bottom row(s) of each group |

The `filter()` method => Returns a bool for each group, and result is subset of group where the method returned True.

```python
dff.groupby("B").filter(lambda x: len(x["C"]) > 2)
```







**Flexible `apply`**

`apply` takes in DF of each group and spits out new DF. These new DFs are then combined together under each group key

```python
grouped["C"].apply(lambda x: x.describe())

A
bar  count    3.000000
     mean     0.130980
     std      0.181231
     min     -0.077118
     25%      0.069390
                ...   
foo  min     -1.143704
     25%     -0.862495
     50%     -0.575247
     75%     -0.408530
     max      1.193555
```











#### Windowing operations



https://pandas.pydata.org/pandas-docs/stable/user_guide/window.html#window-expanding











### Series

#### Creating a series

From an ndarray

```python
In [3]: s = pd.Series(np.random.randn(5), index=["a", "b", "c", "d", "e"])

In [4]: s
Out[4]: 
a    0.469112
b   -0.282863
c   -1.509059
d   -1.135632
e    1.212112
dtype: float64
```

From a dict

```python
In [7]: d = {"b": 1, "a": 0, "c": 2}

In [8]: pd.Series(d)
Out[8]: 
b    1
a    0
c    2
dtype: int64
```

From a scalar value

```python
In [12]: pd.Series(5.0, index=["a", "b", "c", "d", "e"])
Out[12]: 
a    5.0
b    5.0
c    5.0
d    5.0
e    5.0
dtype: float64
```

#### Getting Series values


```python
In [21]: s["a"]
Out[21]: 0.4691122999071863

# Safe get
In [27]: s.get("f")

In [28]: s.get("f", np.nan)
Out[28]: nan
```

#### Series

Pandas series work by matching indices. Binary operators work on the union of the left and right indices.

```python
In [32]: s.iloc[1:] + s.iloc[:-1]
Out[32]: 
a         NaN
b   -0.565727
c   -3.018117
d   -2.271265
e         NaN
dtype: float64
```

#### Name attribute

Series has a `name` attribute which is the column name given to the series after `reset_index()`

You can change the name by `s.name = 'new'` or call `s.rename('new')`



#### Series operations

`.max()`: Maximum of a series

`.min()`: Minimum of series

`.mode()`: Mode of series

`.describe()`: Basic statistics of a series (mean, std, quartile ...)

`.value_counts()`: Tallying the # of occurrences per value

`.to_frame()`: Make Series into a DataFrame

`.unique()`: Return an array of unique values in the series

`.nunique()`: Return # of unique elements in series

`.idxmax()`: Index of maximum value of a series

`.idxmin()`: ^^ but for min

`.replace({old: new, old: new})`: Replaces cells with `old` values with `new` values





### General

#### Boolean functions

`.any()`: Over an axis (DF -> Series), default 0 so by row
`.all()`: All ^^


#### Function application

`.pipe(func -> DF, *args)`: Applies function to the current data frame, `df.pipe(func, *args)` returns `func(df, *args)`

`.apply(func, axis=0)`: Apply function to each column or row, default to each column

`.applymap(arg, na_action=None|'ignore')`: Apply function element-wise, default nan behaviour is passing into the function as usual
^^ renamed to `.map` in 2.1





#### String methods

Also a **Series** accessor (like `.dt`)

`.str.lower()`

`.str.upper()`

`.str.len()`

`.str.strip()`

`.str.lstrip()`

`.str.rstrip()`

`.str.split(sep, expand=False)`: Split column values with `sep`, turns string into list. If `expand` is set to True, then `.split` will return a DataFrame of columns, not a single column with list values

`.str.get(idx)`: Gets the `idx` of a list value in the column

`.str.contains(substring)`

`.str.replace(orig, new)`: Similar to Python .replace(). Note `str.replace` (here) is different from `.replace` for Series

`.str.capitalize()`: Make first character uppercase and all the rest lowercase

`[1:3]`: Any indexing like you would with Python strings would work here

`.str.match(pat)`: Return mask that matches the RE pattern `pat`



Cleaning up column names

```python
df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
```



These functions take a series of dtype `string` and return a new series



#### General functions

`pandas.*`

`.cut(x, bins, labels=True)`: `bins` is # of equal width bins to use. `x` is the series. This function will return a series of equal length, where each value points to the bin (`(lo, hi]`) the value belongs to. If `labels` is set to `False`, return integer ID of the bin instead.

`.qcut(ser, q)` E.g. `pandas.qcut(articles['wordcount'], 10)` , returns new column where each cell is the decile of the `worcount` cell. Each decile contains exactly 10% of the rows in `articles`





#### Timeseries data

```python
# Convert datetime strings to datetime objects for parsing
air_quality["datetime"] = pd.to_datetime(air_quality["datetime"])

# For example, we can get time deltas
air_quality["datetime"].max() - air_quality["datetime"].min()
TimeDelta('44 days 23:00:00')

# Another example, create a new column based on month values
air_quality["month"] = air_quality["datetime"].dt.month

# Resampling a time series to another frequency
# This aggregates datetime by month and retain the maximum value
# Note, resample returns continuous groups, filling intermediate ones with value NaN (usually we pair resample with ffill(), e.g., df.set_index('time').resample('T').sum().ffill() )
# Each group is in range [base, base+1). So if we're doing resample('T') ie. in minutes, the ranges are [16:00:00, 16:01:00), [16:01:00, 16:02:00), ...
monthly_max = no_2.resample("M").max()
# The frequency of time series above is provided by the `freq` attribute
monthly_max.index.freq
>>>	<MonthEnd>
```



#### Misc

- If you do df['col'] you get a series. You can either do df['col'].to_frame() to get the DF, or df[['col']]

- To read csv as string, do this:

```python
from io import StringIO
import pandas as pd

TESTDATA = StringIO("""col1;col2;col3
    1;4.4;99
    2;4.5;200
    3;4.7;65
    4;3.2;140
    """)

df = pd.read_csv(TESTDATA, sep=";")
```

- Iterating through DFs:
  - `df.itertuples()`: rows as named tuples
  - `df.iterrows()`: rows as (index, Series) pairs

- Currently Pandas `int` cannot take NaN. When you do say an outer join, you may introduce NaN in `int` columns. In that case Pandas will convert those columns into `float` type to allow for NaN.






### Plotting

getting_started/intro_tutorials/04_plotting.html



Use matplotlib
