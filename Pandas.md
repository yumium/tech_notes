# Pandas

https://app.codility.com/test/ARHDAN-VF2/



```python
import pandas as pd
```


Parking:

- Join vs Merge, apparently Join needs common column to be an index??



### DataFrame

**Creating a DataFrame**

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



**Types**

- Integers (int64)
- Floats (float64)
- Strings (object)



**Reading and writing**

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



**Slicing**

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





**Creating new columns**

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



**Aggregates**

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





**Reshaping**

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



**Combining data**

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





**DataFrame operations**

`.head(n)`: Display first `n` rows of data

`.tail(n)`: Display last `n` rows of data

`.dtypes`: Return dtypes of each column 

`.info()`: Detailed summary

`.shape`: Shape (# row, # col)

`.max(axis=0, numeric_only=False)`: Return max of each column/row, which is a series. If `numeric_only` is set to True, then leave only columns with float/int/boolean dtype.

`.mean()`: Mean of columns

`.median()`: Median of columns

`.sort_values(by='Age')` / `.sort_values(by=['Pclass', 'Age'], ascending=False, inplace=False)`: Sorting values

`.keys()`: Keys of DataFrame

`.index`: Index of DataFrame

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





^^ Some of these methods/attributes also work on series

`.apply()`: Used in column creation for more complex patterns

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





### Series

Creating a series

```python
# Directly
ser = pd.Series([22, 35, 58], name='Age')

# From a column of a DataFrame
ser = df['Age']
```



Series operations

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





### Misc

#### String methods

`.str.lower()`

`.upper()`

`.len()`

`.strip()`

`.lstrip()`

`.rstrip()`

`.split(sep, expand=False)`: Split column values with `sep`, turns string into list. If `expand` is set to True, then `.split` will return a DataFrame of columns, not a single column with list values

`.get(idx)`: Gets the `idx` of a list value in the column

`.contains(substring)`

`.replace(orig, new)`: Similar to Python .replace(). Note `str.replace` (here) is different from `.replace` for Series

`.capitalize()`: Make first character uppercase and all the rest lowercase

`[1:3]`: Any indexing like you would with Python strings would work here

`.match(pat)`: Return mask that matches the RE pattern `pat`



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
monthly_max = no_2.resample("M").max()
# The frequency of time series above is provided by the `freq` attribute
monthly_max.index.freq
>>>	<MonthEnd>
```



#### Misc

- If you do df['col'] you get a series. You can either do df['col'].to_frame() to get the DF, or df[['col']]









### Plotting

getting_started/intro_tutorials/04_plotting.html



Use matplotlib