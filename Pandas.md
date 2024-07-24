# Pandas




```python
import pandas as pd
```


Parking:
- Index types: https://pandas.pydata.org/docs/user_guide/advanced.html#index-types
  - ^^ May be easier to understand if you learn the underlying types first


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

List of all IO tools

| Format Type | Data Description                                                      | Reader                                                                           | Writer                                                                         |
| ----------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| text        | [CSV](https://en.wikipedia.org/wiki/Comma-separated_values)           | [read_csv](https://pandas.pydata.org/docs/user_guide/io.html#io-read-csv-table)  | [to_csv](https://pandas.pydata.org/docs/user_guide/io.html#io-store-in-csv)    |
| text        | Fixed-Width Text File                                                 | [read_fwf](https://pandas.pydata.org/docs/user_guide/io.html#io-fwf-reader)      |                                                                                |
| text        | [JSON](https://www.json.org/)                                         | [read_json](https://pandas.pydata.org/docs/user_guide/io.html#io-json-reader)    | [to_json](https://pandas.pydata.org/docs/user_guide/io.html#io-json-writer)    |
| text        | [HTML](https://en.wikipedia.org/wiki/HTML)                            | [read_html](https://pandas.pydata.org/docs/user_guide/io.html#io-read-html)      | [to_html](https://pandas.pydata.org/docs/user_guide/io.html#io-html)           |
| text        | [LaTeX](https://en.wikipedia.org/wiki/LaTeX)                          |                                                                                  | [Styler.to_latex](https://pandas.pydata.org/docs/user_guide/io.html#io-latex)  |
| text        | [XML](https://www.w3.org/standards/xml/core)                          | [read_xml](https://pandas.pydata.org/docs/user_guide/io.html#io-read-xml)        | [to_xml](https://pandas.pydata.org/docs/user_guide/io.html#io-xml)             |
| text        | Local clipboard                                                       | [read_clipboard](https://pandas.pydata.org/docs/user_guide/io.html#io-clipboard) | [to_clipboard](https://pandas.pydata.org/docs/user_guide/io.html#io-clipboard) |
| binary      | [MS Excel](https://en.wikipedia.org/wiki/Microsoft_Excel)             | [read_excel](https://pandas.pydata.org/docs/user_guide/io.html#io-excel-reader)  | [to_excel](https://pandas.pydata.org/docs/user_guide/io.html#io-excel-writer)  |
| binary      | [OpenDocument](http://opendocumentformat.org/)                        | [read_excel](https://pandas.pydata.org/docs/user_guide/io.html#io-ods)           |                                                                                |
| binary      | [HDF5 Format](https://support.hdfgroup.org/HDF5/whatishdf5.html)      | [read_hdf](https://pandas.pydata.org/docs/user_guide/io.html#io-hdf5)            | [to_hdf](https://pandas.pydata.org/docs/user_guide/io.html#io-hdf5)            |
| binary      | [Feather Format](https://github.com/wesm/feather)                     | [read_feather](https://pandas.pydata.org/docs/user_guide/io.html#io-feather)     | [to_feather](https://pandas.pydata.org/docs/user_guide/io.html#io-feather)     |
| binary      | [Parquet Format](https://parquet.apache.org/)                         | [read_parquet](https://pandas.pydata.org/docs/user_guide/io.html#io-parquet)     | [to_parquet](https://pandas.pydata.org/docs/user_guide/io.html#io-parquet)     |
| binary      | [ORC Format](https://orc.apache.org/)                                 | [read_orc](https://pandas.pydata.org/docs/user_guide/io.html#io-orc)             | [to_orc](https://pandas.pydata.org/docs/user_guide/io.html#io-orc)             |
| binary      | [Stata](https://en.wikipedia.org/wiki/Stata)                          | [read_stata](https://pandas.pydata.org/docs/user_guide/io.html#io-stata-reader)  | [to_stata](https://pandas.pydata.org/docs/user_guide/io.html#io-stata-writer)  |
| binary      | [SAS](https://en.wikipedia.org/wiki/SAS_(software))                   | [read_sas](https://pandas.pydata.org/docs/user_guide/io.html#io-sas-reader)      |                                                                                |
| binary      | [SPSS](https://en.wikipedia.org/wiki/SPSS)                            | [read_spss](https://pandas.pydata.org/docs/user_guide/io.html#io-spss-reader)    |                                                                                |
| binary      | [Python Pickle Format](https://docs.python.org/3/library/pickle.html) | [read_pickle](https://pandas.pydata.org/docs/user_guide/io.html#io-pickle)       | [to_pickle](https://pandas.pydata.org/docs/user_guide/io.html#io-pickle)       |
| SQL         | [SQL](https://en.wikipedia.org/wiki/SQL)                              | [read_sql](https://pandas.pydata.org/docs/user_guide/io.html#io-sql)             | [to_sql](https://pandas.pydata.org/docs/user_guide/io.html#io-sql)             |
| SQL         | [Google BigQuery](https://en.wikipedia.org/wiki/BigQuery)             | [read_gbq](https://pandas.pydata.org/docs/user_guide/io.html#io-bigquery)        | [to_gbq](https://pandas.pydata.org/docs/user_guide/io.html#io-bigquery)        |





#### Sorting

- `.sort_index([key=func])`: Sort by index
- `ser.sort_values()`: Sort series by values
- `df.sort_values(by='col'/['col's][, na_position='first', key=func])`: Sort DF by column values
- `ser.searchsorted(value, side='left, sorter=None)`: Return indices to insert `value` (can be list of values) to maintain sorted order
- `ser.nsmallest(n)`: Like `head(n)`
- `ser.nlargest(n)`: Like `tail(n)`
- `df.nsmallest(n, cols)`
- `df.nlargest(n, cols)`


#### Indexing and Selecting

```python
titanic[['Age', 'Sex']]			# specifc columns

# Conditions
titanic[titanic['Age'] > 35]	# filters
	# Under the hood, titanic['Age'] > 35 is a series of bools, which can be used for filtering
    
# isin
titanic[titanic['Pclass'].isin([2,3])]

# Joining conditions
titanic[(titanic['Pclass'] == 2) | (titanic['Pclass'] == 3)]
```

Select by label based location
loc[rows you want, cols you want]
- `titanic.loc[titanic['Age'] > 35, 'Name']`:  all rows with age > 35, select column 'Name' within these rows
- `df.loc[:'index3', df.loc['index1'] > 0]`: Select rows where its label is less than or equal to `index3` and columns where `index1` row is positive
- `df.loc['index1', 'col1']`: Gets the cell value at row `index1` and column `col1`

A word on `.loc` slicing
- End points are inclusive (i.e. [a:b] is interval [a..b], not [a..b) in Python). The rationale is, unlike indices (which are non-negative integers), what is "next" is hard to tell. An time interval with Python-like slicing you need to modify `b` to be plus 1 of unit precision
- 1 absent label is fine if index is sorted, otherwise raises error (which side to include?)
- for duplicated label case, it's fine as long as neither a or b in [a:b] is duplicated, otherwise raises error (which interval to use?)
- 

Select by index based location
- `titanic.iloc[9:25, 2:5] = 'anonymous'`
- `df.iloc[[1,3,5], [2,4,6]]`


Attribute access
- `titanic[['Age', 'Sex']]`: specifc columns
- `titanic.Age`: attribute like access (preferred if possible)

Assigning to row
- `x.iloc[1] = {'col1': 1, 'col2': 2}

Assigning to column
- `x['col1'] = ser`
- `x.col1 = ser` WRONG, this assigns to attribute not column

Slicing simple
- `ser[::2]` => work as you'd expect in Python
- `df[::2]` => slices rows

Callable-based indexing
- Any of the ranges can be replaced by a function that takes as input 1 argument (the underlying series or df) and returns eligible input to the indexing
- `df1['A'].loc[lambda s: s > 0]`: Column 'A' with only non-negative rows
- `df.loc[lambda x: x['A'] > 0, lambda x: [0,1]]`

Reindexing
- `.reindex([1,2,3])`: Change to use these indices instead. Good for spotting missing values (for indices not in original DF, populate with NA)
- `s.loc[s.index.intersection(labels)]`: Get intersection of index and what is needed
- `.reindex(index=, columns=[, method=])`: Reindex indices and columns. method can take "ffill", "bfill", and "nearest" for filling nan when new index are introduced
	You can also add `limit` and `tolerance` when using ffill and bfill
- `.reindex_like(df2)`: Change current DF index to that of `df2`
- `.drop([...], axis=0)`: Drop labels from an axis

Setting index
- `df.set_index(['a', 'b'])`
- `df.set_index('c', drop=False)`: set index but don't delete column
- `df.set_index(['a', 'b'], append=True)` Append to existing index
- `df.reset_index()`: Pivot current indices to columns and use a index counting from 0
- `df.reset_index(level=1)`


Fast scalar getting and setting
- `.at[row label, column label]`
- `.iat[row index, column index]`
More restricted in functionality than `loc` and `iloc` but less performance overhead when getting just a scalar value.

Boolean indexing: ~, |, &
e.g., `s[~(s < 0)]`, takes a boolean series with same dimension

- `ser[ser.isin([1,2,3])]`: Filtering a series
- `df[df.index.isin([1,2,3])]`: Filtering a DF
- `df2[df2[1:4] > 0] = 3`: Indices are lined up!
- `s_mi.iloc[s_mi.index.isin([(1, 'a'), (2, 'b'), (0, 'c')])]`: Multi index
- `s_mi.iloc[s_mi.index.isin(['a', 'c', 'e'], level=1)]`: Multi index
- `df.isin(values)`: Returns boolean DF with same shape, each scalar is True iff the scalar is in `values`
- `df.isin({'col1': [1,2], 'col2': [3,4]})`: Is in with separate values for columns
- `df.where(boolean df[, other=other_df])`: Apply boolean mask (remaining values are NAs), optional `other` DF to fill in cells where it's NA
- `df.mask(cond)`: Inverse of `where`

`np` constructs
- `np.where(df['col2'] == 'Z', 'green', 'red')`
- `np.select([(df['col2'] == 'Z') & (df['col1'] == 'A'), (df['col2'] == 'Z') & (df['col1'] == 'B'), (df['col1'] == 'B')], ['yellow', 'blue', 'purple'], default='black')`

Get function to return default values
- `s.get('x', default=-1)`

Index object
- `index = pd.Index([1, 5, 12], dtype="int8")`: Index has a type (defaut inferred)
- `columns = pd.Index(['A', 'B', 'C'], name='cols')`: You can give it a name which is printed when displaying the DF
- `idx1.symmetric_difference(idx2)`: Do set operations between indices. Other methods `union`, `intersection`, and `difference`


#### Duplicated data

- `df[df.duplicated(keep=False/'first'/'last')]`: True for duplicated rows
- `df.drop_duplicates(keep=False/'first'/'last')`: Drop duplicated rows
- `df.duplicated(['col1', 'col2'], keep=...)`: Duplicated rows only looking at specific columns
- `df3[~df3.index.duplicated(keep=False)]`: Duplicated indices

- `df.fillna(val)`: Filling NaNs


#### Duplicated labels

- `Index.is_unique`: True or False
- `Index.duplicated()`: return ndarray for each index on whether it's duplicated. If an index appears multiple times, the first instance maps to false. So on way to deduplicate a series is `df.loc[~df.index.duplicated(), :]`


#### Missing data

Default representation is `np.nan`, downside is it makes types into float and object on its presence.

Pandas' own `NA` type, though I've not used it much.

Another example is `pd.NaT` which is a member `datetime64` type.

```python
np.nan == np.nan  # False
```

- `.isna()`
- `.notna()`
- `.fillna()`
- `.interpolate()`: Interesting function, never used

#### MultiIndex

Creating MultiIndex
- `pd.MultiIndex.from_tuples([('bar', 'one'), ('bar', 'two'),  ('baz', 'one'), ('baz', 'two')], names=["first", "second"])`: most straight forward way
- `pd.MultiIndex.from_product([["bar", "baz", "foo", "qux"], ["one", "two"]], names=["first", "second"])`: take cartesian product of iterables
- `pd.MultiIndex.from_frame(pd.DataFrame([["bar", "one"], ["bar", "two"], ["foo", "one"], ["foo", "two"]], columns=["first", "second"])`: or read MultiIndex from data frame, where the names are the column names and index are the rows
- `mi.names`: If names not given, they are None
- `df = pd.DataFrame(np.random.randn(8, 4), index=index)`: Assign your MultiIndex to a data frame

- `mi.get_level_values(level_idx)`: Return index at a certain level, outer-most is 0 etc.
- `df.remove_unused_levels()`: When you slice a DF, the `df.columns.levels` and `df.index.levels` attribute stay the same (to make slicing more performant). You can call this function to remove indices that are unused (no longer appear in current slice)

- `df.reindex(mi)`: You can pass MultiIndex as argument to `reindex`

Slicing MultiIndex
- `df.loc[('bar', 'foo'), 'col1']`: Slicing with MultiIndex 
- `df.loc["bar"]`: Partial slicing (specify level 0 only)
- `df.loc[("baz", "two"):"foo"]`: Range slicing, here the end value is a partial slice
- `df.swaplevel(0, 1, axis=0)`: Swapping levels
- `df.reorder_levels([1, 0], axis=0)`: Permutate levels
- `df.set_names(names)`: Sex MultiIndex name

Renaming
- `df.rename(index={"one": "two", "y": "z"})`: Renaming index values
- `df.rename_axis(index=["abc", "def"])`: Renaming index names

Further reading
- Advanced reindex and aligning in MultiIndex


#### Copy-on-Write (CoW)

`.copy()`: Deep copy of data frame.

Note, this is used very rarely becaues pandas almost always creates a new object upon modification (so code looks functional)

We completely avoid side effects with CoW enabled, which basically specifies that *DataFrame or Series derived from another in any way always behaves as a copy*. In other words, *it is not possible to update more than one object with one statement*. This way, all methods have no side effects.

One common case that is forbidden under CoW is this pattern:

```python
# Forbidden, tries to modify both Series df['col1'] and DataFrame df
df['col1'][df['col2'] > 5] = 0

# Instead, do this under CoW. Now only the DataFrame is modified
df.loc[df['col2'] > 5, 'col1'] = 0
```

Without CoW, you need to make new copies when setting values (like above), but applying methods that return DF have no side effects.




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

- `.pivot(columns, index=, values=)`: Stretch out values to column and index level. If no index is given, use original index. If no values are given, use all remaining columns. Will get value error when the combination of columns and indices contain duplicates

Example
```python
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
    
```

- `.pivot_table(values=None, index=None, columns=None, aggfunc='mean', fill_value=None, margins=False, dropna=True, margins_name='All')`: Additional `aggfunc` to solve duplication issue in `pivot`, can pass just a function or a dict of col_name->func. `fill_value` is fill value for NaNs. `dropna` will drop columns with all NaNs, and exclude rows with any NaN in margin calculation. `margins` adds aggregation for all rows and cols.

  


```python
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
                       columns=['C'], aggfunc="sum", fill_value=0)
>>>	C        large  small
    A   B
    bar one      4      5
        two      7      6
    foo one      4      1
        two      0      6
```

```
In [17]: table = df.pivot_table(
   ....:     index=["A", "B"],
   ....:     columns="C",
   ....:     values=["D", "E"],
   ....:     margins=True,
   ....:     aggfunc="std"
   ....: )
   ....: 

In [18]: table
Out[18]: 
                D                             E                    
C             bar       foo       All       bar       foo       All
A     B                                                            
one   A  1.568517  0.178504  1.293926  0.179247  0.033718  0.371275
      B  1.157593  0.299748  0.860059  0.653280  0.885047  0.779837
      C  0.523425  0.133049  0.638297  1.111310  0.770555  0.938819
three A  0.995247       NaN  0.995247  0.049748       NaN  0.049748
      B       NaN  0.030522  0.030522       NaN  0.931203  0.931203
      C  0.386657       NaN  0.386657  0.386312       NaN  0.386312
two   A       NaN  0.111032  0.111032       NaN  1.146201  1.146201
      B  0.695438       NaN  0.695438  1.166526       NaN  1.166526
      C       NaN  0.331975  0.331975       NaN  0.043771  0.043771
All      1.014073  0.713941  0.871016  0.881376  0.984017  0.923568
```

- `.stack(level=-1, dropna=True, sort=True)`: Moves a column level to the inner-most index. Default level is inner most column level, can also pass (list of) column level or name. If passing a list, end result is if each level is processed one after another from left to right. Note, index sorting is on by default
- `.unstack(level=-1, dropna=True, sort=True)`: Inverse operation of `stack`

```python
In [20]: tuples = [
   ....:    ["bar", "bar", "baz", "baz", "foo", "foo", "qux", "qux"],
   ....:    ["one", "two", "one", "two", "one", "two", "one", "two"],
   ....: ]
   ....: 

In [21]: index = pd.MultiIndex.from_arrays(tuples, names=["first", "second"])

In [22]: df = pd.DataFrame(np.random.randn(8, 2), index=index, columns=["A", "B"])

In [23]: df2 = df[:4]

In [24]: df2
Out[24]: 
                     A         B
first second                    
bar   one     0.895717  0.805244
      two    -1.206412  2.565646
baz   one     1.431256  1.340309
      two    -1.170299 -0.226169

In [25]: stacked = df2.stack(future_stack=True)

In [26]: stacked
Out[26]: 
first  second   
bar    one     A    0.895717
               B    0.805244
       two     A   -1.206412
               B    2.565646
baz    one     A    1.431256
               B    1.340309
       two     A   -1.170299
               B   -0.226169
dtype: float64
```

- `.melt(id_vars=None, value_vars=None, var_name=None, value_name='value', ignore_index=True, ...)`: For each row of `id_vars`, make `value_vars` into just 2 columns, `variable` and `value`, which are the variable othe values they take. By default resets index, otherwise may duplicate index.

Example

```python
In [47]: cheese = pd.DataFrame(
   ....:     {
   ....:         "first": ["John", "Mary"],
   ....:         "last": ["Doe", "Bo"],
   ....:         "height": [5.5, 6.0],
   ....:         "weight": [130, 150],
   ....:     }
   ....: )
   ....: 

In [48]: cheese
Out[48]: 
  first last  height  weight
0  John  Doe     5.5     130
1  Mary   Bo     6.0     150

In [49]: cheese.melt(id_vars=["first", "last"])
Out[49]: 
  first last variable  value
0  John  Doe   height    5.5
1  Mary   Bo   height    6.0
2  John  Doe   weight  130.0
3  Mary   Bo   weight  150.0

In [50]: cheese.melt(id_vars=["first", "last"], var_name="quantity")
Out[50]: 
  first last quantity  value
0  John  Doe   height    5.5
1  Mary   Bo   height    6.0
2  John  Doe   weight  130.0
3  Mary   Bo   weight  150.0
```

- `.explode(column, ignore_index=False)`: Given the column(s), unpack the array values into separate rows. If `ignore_index` is turned on, reset index instead of duplicating for each row

```python
>>> df = pd.DataFrame({'A': [[0, 1, 2], 'foo', [], [3, 4]],
...                    'B': 1,
...                    'C': [['a', 'b', 'c'], np.nan, [], ['d', 'e']]})
>>> df
           A  B          C
0  [0, 1, 2]  1  [a, b, c]
1        foo  1        NaN
2         []  1         []
3     [3, 4]  1     [d, e]

>>> df.explode('A')
     A  B          C
0    0  1  [a, b, c]
0    1  1  [a, b, c]
0    2  1  [a, b, c]
1  foo  1        NaN
2  NaN  1         []
3    3  1     [d, e]
3    4  1     [d, e]

>>> df.explode(list('AC'))
     A  B    C
0    0  1    a
0    1  1    b
0    2  1    c
1  foo  1  NaN
2  NaN  1  NaN
3    3  1    d
3    4  1    e
```

- `pd.cut(x, bins, labels=None, ...)`: Map input array-like `x` into intervals based on `bins` equally-sized bins. `labels` for labels to use instead of Interval type

```python
>>> pd.cut(np.array([1, 7, 5, 4, 6, 3]), 3)
... 
[(0.994, 3.0], (5.0, 7.0], (3.0, 5.0], (3.0, 5.0], (5.0, 7.0], ...
Categories (3, interval[float64, right]): [(0.994, 3.0] < (3.0, 5.0] ...

>>> pd.cut(np.array([1, 7, 5, 4, 6, 3]),
...        3, labels=["bad", "medium", "good"])
['bad', 'good', 'medium', 'medium', 'good', 'bad']
Categories (3, object): ['bad' < 'medium' < 'good']
```

- `pd.qcut(x, q, labels=None)`: Quantile-based binning, instead of value based like `.cut`.

```python
>>> pd.qcut(range(5), 4)
... 
[(-0.001, 1.0], (-0.001, 1.0], (1.0, 2.0], (2.0, 3.0], (3.0, 4.0]]
Categories (4, interval[float64, right]): [(-0.001, 1.0] < (1.0, 2.0] ...

>>> pd.qcut(range(5), 3, labels=["good", "medium", "bad"])
... 
[good, good, medium, bad, bad]
Categories (3, object): [good < medium < bad]
```



#### Combining data (merge, join, concatenate, compare)

- `pd.concat(sers/dfs, axis=0/1, join='outer'/'inner', ignore_index=False ...)`: Concatenates series or DFs along `axis`, perform set logic on the other axis depending on `join`, if `ignore_index` resets index on concat axis

- `left.merge(right, how='inner'/'left'/'right'/'outer'/'cross', on=cols, suffixes=('_x', '_y'), indicator=None, validate=None)`: Does a join on both data frames using `how` join type. Suffixes are used when column names are duplicated in non-join columns. Use `left_on`, `right_on` if join column names don't match. Use `left_index` and `right_index` if the join columns are indices. `indicator` adds extra column to indicate where the rows are from (`left_only`, `right_only`, `both`). `validate` checkes relationship in join keys (`one_to_one` mean unique keys etc.)

- `left.join(right)`: Basically syntac sugar on `merge`. By default does left join and joins on indices

- `left.combine_first(right)`: Fills left DF with values of right DF on cells where left DF is NA and not NA in right DF

- `left.merge_orderd(right ...)`: Pretty much same signature as `merge`, used when merge keys are ordered (lexicographically if more than 1 join column), with additioanl `fill_method`. Default `outer` join

- `left.merge_asof(right, ..., tolerance=None, allow_exact_matches=True, direction='backward')`: ASOF join

- `left.compare(right)`






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

`.isna()`: Return boolean mask, True if value is NaN

`.notna()`: Opposite of `isna`

`.dropna()`: Drop rows with null fields

`.droplevel(level, axis=0)`: Name or level index to drop for MultiIndex, `axis` at 0 is for row index and 1 for column 

`.drop(columns=[], ...)`: Drop columns, rows ...

`.rename(column={'A': 'a', 'B': 'b'}, ...)`: Rename column and index labels
`.rename(column=str.lower)`: Can also pass functions

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

`.dtype`: Datatype of the series

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



#### dtypes

NumPy provide supports to Python types `float`, `int`, `bool`, `timedelta64[ns]` and `datetime64[ns]`.

In addition, it adds from pandas native and third-parties library to extend supported types.

| Kind of Data                                                                                        | Data Type                                                                                                                                         | Scalar                                                                                                                | Array                                                                                                                                                                        | String Aliases                                                                                                                 |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [tz-aware datetime](https://pandas.pydata.org/docs/user_guide/timeseries.html#timeseries-timezone)  | [`DatetimeTZDtype`](https://pandas.pydata.org/docs/reference/api/pandas.DatetimeTZDtype.html#pandas.DatetimeTZDtype "pandas.DatetimeTZDtype")     | [`Timestamp`](https://pandas.pydata.org/docs/reference/api/pandas.Timestamp.html#pandas.Timestamp "pandas.Timestamp") | [`arrays.DatetimeArray`](https://pandas.pydata.org/docs/reference/api/pandas.arrays.DatetimeArray.html#pandas.arrays.DatetimeArray "pandas.arrays.DatetimeArray")            | `'datetime64[ns, <tz>]'`                                                                                                       |
| [Categorical](https://pandas.pydata.org/docs/user_guide/categorical.html#categorical)               | [`CategoricalDtype`](https://pandas.pydata.org/docs/reference/api/pandas.CategoricalDtype.html#pandas.CategoricalDtype "pandas.CategoricalDtype") | (none)                                                                                                                | [`Categorical`](https://pandas.pydata.org/docs/reference/api/pandas.Categorical.html#pandas.Categorical "pandas.Categorical")                                                | `'category'`                                                                                                                   |
| [period (time spans)](https://pandas.pydata.org/docs/user_guide/timeseries.html#timeseries-periods) | [`PeriodDtype`](https://pandas.pydata.org/docs/reference/api/pandas.PeriodDtype.html#pandas.PeriodDtype "pandas.PeriodDtype")                     | [`Period`](https://pandas.pydata.org/docs/reference/api/pandas.Period.html#pandas.Period "pandas.Period")             | [`arrays.PeriodArray`](https://pandas.pydata.org/docs/reference/api/pandas.arrays.PeriodArray.html#pandas.arrays.PeriodArray "pandas.arrays.PeriodArray") `'Period[<freq>]'` | `'period[<freq>]'`,                                                                                                            |
| [sparse](https://pandas.pydata.org/docs/user_guide/sparse.html#sparse)                              | [`SparseDtype`](https://pandas.pydata.org/docs/reference/api/pandas.SparseDtype.html#pandas.SparseDtype "pandas.SparseDtype")                     | (none)                                                                                                                | [`arrays.SparseArray`](https://pandas.pydata.org/docs/reference/api/pandas.arrays.SparseArray.html#pandas.arrays.SparseArray "pandas.arrays.SparseArray")                    | `'Sparse'`, `'Sparse[int]'`, `'Sparse[float]'`                                                                                 |
| [intervals](https://pandas.pydata.org/docs/user_guide/advanced.html#advanced-intervalindex)         | [`IntervalDtype`](https://pandas.pydata.org/docs/reference/api/pandas.IntervalDtype.html#pandas.IntervalDtype "pandas.IntervalDtype")             | [`Interval`](https://pandas.pydata.org/docs/reference/api/pandas.Interval.html#pandas.Interval "pandas.Interval")     | [`arrays.IntervalArray`](https://pandas.pydata.org/docs/reference/api/pandas.arrays.IntervalArray.html#pandas.arrays.IntervalArray "pandas.arrays.IntervalArray")            | `'interval'`, `'Interval'`, `'Interval[<numpy_dtype>]'`, `'Interval[datetime64[ns, <tz>]]'`, `'Interval[timedelta64[<freq>]]'` |
| [nullable integer](https://pandas.pydata.org/docs/user_guide/integer_na.html#integer-na)            | [`Int64Dtype`](https://pandas.pydata.org/docs/reference/api/pandas.Int64Dtype.html#pandas.Int64Dtype "pandas.Int64Dtype"), …                      | (none)                                                                                                                | [`arrays.IntegerArray`](https://pandas.pydata.org/docs/reference/api/pandas.arrays.IntegerArray.html#pandas.arrays.IntegerArray "pandas.arrays.IntegerArray")                | `'Int8'`, `'Int16'`, `'Int32'`, `'Int64'`, `'UInt8'`, `'UInt16'`, `'UInt32'`, `'UInt64'`                                       |
| [nullable float](https://pandas.pydata.org/docs/reference/arrays.html#api-arrays-float-na)          | [`Float64Dtype`](https://pandas.pydata.org/docs/reference/api/pandas.Float64Dtype.html#pandas.Float64Dtype "pandas.Float64Dtype"), …              | (none)                                                                                                                | [`arrays.FloatingArray`](https://pandas.pydata.org/docs/reference/api/pandas.arrays.FloatingArray.html#pandas.arrays.FloatingArray "pandas.arrays.FloatingArray")            | `'Float32'`, `'Float64'`                                                                                                       |
| [Strings](https://pandas.pydata.org/docs/user_guide/text.html#text)                                 | [`StringDtype`](https://pandas.pydata.org/docs/reference/api/pandas.StringDtype.html#pandas.StringDtype "pandas.StringDtype")                     | [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.12)")                                      | [`arrays.StringArray`](https://pandas.pydata.org/docs/reference/api/pandas.arrays.StringArray.html#pandas.arrays.StringArray "pandas.arrays.StringArray")                    | `'string'`                                                                                                                     |
| [Boolean (with NA)](https://pandas.pydata.org/docs/reference/arrays.html#api-arrays-bool)           | [`BooleanDtype`](https://pandas.pydata.org/docs/reference/api/pandas.BooleanDtype.html#pandas.BooleanDtype "pandas.BooleanDtype")                 | [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.12)")                                   | [`arrays.BooleanArray`](https://pandas.pydata.org/docs/reference/api/pandas.arrays.BooleanArray.html#pandas.arrays.BooleanArray "pandas.arrays.BooleanArray")                | `'boolean'`                                                                                                                    |

`StringDtype` -> `object` may be better because 1) it's simpler, 2) when we convert from other formats, if we have nan it'll convert to `object`. If your codebase only have strings as `object`, then `object` may be better

On instantiation, type for each column is taken as type that accommodates for all types in the column. When you modify values, column type may be upcasted (e.g., `int` -> `float`)

Explicit conversion

- `.astype(type)`: Convert series and df to `type`
- `df[['col1', 'col2']] = df[['col1', 'col2']].astype(type)`
- `.astype({'col1': type1, 'col2': type2})`
- `pd.to_datetime(ser)` / `pd.to_numeric(ser, downcast="smaller_type")` / `pd.to_timedelta(ser)`

Try converting object type to more specific type

- `.infer_objects()`: Try convert object types to more specific types

Select based on dtype

- `df['tdeltas']` / `df['uint64']` / `df['tz_aware_dates']` ...
- `df.select_dtypes(include=[cols], exclude=[cols])`


#### Categorical Data

- Takes a fixed set of values
- All values in Categorical type are either in the categories or `np.nan` (`np.nan` not allowed as part of the categories)
- Can be ordered
- Stored internally as enums so can save memory

Useful when:
- Low cardinality strings
- Lexicographic order not same as logical order (e.g., "January", "February" ...)

Creation

```python
# Use `category` as dtype
# On DF, each column is inferred separately their own categories
# Default unordered
s = pd.Series(["a", "b", "c", "a"], dtype="category")

# Change type to category
s = s.astype('category')

# Using the constructor
s = pd.Categorical(["a", "b", "c", "a"], categories=["b", "c", "d"], ordered=False)

# Specify order by enriching the category type
s = s.astype(CategoricalDtype(categories=["b", "c", "d"], ordered=True))
```

You can regain original type by converting the type back (using `.astype`)

Two instances of categorical type is equal if they have the same categories and order

The `.cat` accessor
- `s.cat.categories`
- `s.cat.ordered`

Changing attributes
- `s.rename_categories([names])` / `s.rename_categories({1: 'cat1', 2: 'cat2' ...})`
- `s.cat.add_categories([names])`
- `s.cat.remove_categories([names])`
- `s.cat.remove_unused_categories()`
- `s.cat.set_categories([names])`: Add and remove categories in one step
- `s.cat.as_ordered()`: Turn on order
- `s.cat.as_unordered()`: Turn off order
- `s.cat.reorder_categories([names], ordered=True)`: Reorder by giving a new order (as permutation of categories)
- `s.cat.codes`: Return enum value of categories, np.nan is always represented as -1

Comparisons
- Comparing to categorical of same type (categories and ordered) works as expected
- Comparing to scalar or list-like of same length works as expected

Other bits
- `.value_counts()` will show all categories (even when not observed in data)
- `.groupby(categorical_cols, observed=False)` will show all categories
- Slicing returns same category type unless you're returning one row or a scalar
- `.dt` and `.str` work if the underlying types are compatible
- You can set to categorical fields if values are in the category
- Merging between same category type result in category, otherwise result in base type depending on combination (obj & obj => obj; int & float => float)
- `union_categoricals(list_of_categorical_types)`
- The memory usage of a Categorical is proportional to the number of categories plus the length of the data.


#### Chart visualization

`ser.plot()` for line chart
`df.plot()` for indexed line chart
`df.plot(x='x_col', y='y_col')`

Different kinds of plots

Bar plot: `.bar(stacked=False)`, plots for each row bars of each column, if stacked are stacked up together per row. `.barh` makes it horizontal

Histograms: `.hist(alpha=1, stacked=False, bins=10, cumulative=False)`, plot for each column, x is mean of bin, y is frequency

Box and whiskers: `.box(color=color, sym="r+", vert=False, positions=[1, 4, 5, 6, 8]`, box and whiskers plot per column

```python
color = {
    "boxes": "DarkGreen",
    "whiskers": "DarkOrange",
    "medians": "DarkBlue",
    "caps": "Gray",
}
```

Area plot: `.area(stack=True)`, streamgraph for each column, data row at a time

Scatter plot: `.scatter(x="c", y="d", color="DarkGreen", label="Group 2", ax=ax)`, scatter plot of column for x and y

Hexagonal bin plot: `.hexbin(x="a", y="b", C="z", reduce_C_function=np.mean, gridsize=25)`, like scatter plot but aggregates adjacent points together



Missing data

| Plot Type      | NaN Handling            |
| -------------- | ----------------------- |
| Line           | Leave gaps at NaNs      |
| Line (stacked) | Fill 0’s                |
| Bar            | Fill 0’s                |
| Scatter        | Drop NaNs               |
| Histogram      | Drop NaNs (column-wise) |
| Box            | Drop NaNs (column-wise) |
| Area           | Fill 0’s                |
| KDE            | Drop NaNs (column-wise) |
| Hexbin         | Drop NaNs               |
| Pie            | Fill 0’s                |

Other null-handling can be done in data cleaning code using `fillna()`




Other utils

- `scatter_matrix(df, alpha=0.2, figsize=(6, 6), diagonal="kde");`
- `ser.plot.kde();`
- `andrews_curves(data, "Name");`
- `parallel_coordinates(data, "Name");`
- `lag_plot(data);`
- `autocorrelation_plot(data);`
- `bootstrap_plot(data, size=50, samples=500, color="grey");`
- `radviz(data, "Name");`



#### String methods

Method equipped on Series and Index

By default skips function application on NaNs.

Example of cleaning up column names

```python
df = df.rename(columns=str.strip().str.lower().str.replace(" ", "_"))
```

- `.str.split(sep, expand=False)`: Split string into list of substrings at separators. If expand is true, expand into columns.
- `.str.get(i)` / `.str[i]`: Get the string at index i of list of string, or the i-th character of string if the cell is a string
- `.str.replace("^.a|dog", "XX-XX ", case=False, regex=True)`: Text replacement
- `.str.cat([sep=",", na_rep='-'])`: Concatenate a Series or Index into a single string. If `na_rep` is given, mask with this on NA
- `ser.str.cat(that)`: Concatenate with another list-like object (can be 2D) row by row, must have same length
- `ser.str.cat(ser2[, join='left'])`: Concatenate with another Index object (like series) where indices can be joined
- `.str.extract(r"([ab])(\d)")`: Extract string into matched groups, each on separate column


- `.str.extract(r"(?P<letter>[ab])(?P<digit>\d)")`: If you want custom column names do this
^^ With this you can also add `expand` optional argument.
Behaviour if `expand=False`

|         | 1 group   | \>1 group |
| ------- | --------- |  -------- |
| Index   | Index     | ValueError |
| Series  | Series    | DataFrame |

Behaviour if `expand=True`

|         | 1 group   | \>1 group |
| ------- | --------- |  -------- |
| Index   | Index     | DataFrame |
| Series  | Series    | DataFrame |


| Method                                                                                                                                                                                 | Description                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [`split()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.split.html#pandas.Series.str.split "pandas.Series.str.split")                                 | Split strings on delimiter                                                                                                      |
| [`rsplit()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.rsplit.html#pandas.Series.str.rsplit "pandas.Series.str.rsplit")                             | Split strings on delimiter working from the end of the string                                                                   |
| [`join()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.join.html#pandas.Series.str.join "pandas.Series.str.join")                                     | Join strings in each element of the Series with passed separator                                                                |
| [`get_dummies()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.get_dummies.html#pandas.Series.str.get_dummies "pandas.Series.str.get_dummies")         | Split strings on the delimiter returning DataFrame of dummy variables                                                           |
| [`contains()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.contains.html#pandas.Series.str.contains "pandas.Series.str.contains")                     | Return boolean, matching regex anywhere in string. This and 2 below have option to treat NA as either True or False                                                                    |
| [`match()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.match.html#pandas.Series.str.match "pandas.Series.str.match")                                 | Return boolean, matching from start of string                                                               |
| [`fullmatch()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.fullmatch.html#pandas.Series.str.fullmatch "pandas.Series.str.fullmatch")		| Return boolean, matching entire string                                                               |
| [`replace()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.replace.html#pandas.Series.str.replace "pandas.Series.str.replace")                         | Replace occurrences of pattern/regex/string with some other string or the return value of a callable given the occurrence       |
| [`removeprefix()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.removeprefix.html#pandas.Series.str.removeprefix "pandas.Series.str.removeprefix")     | Remove prefix from string, i.e. only remove if string starts with prefix.                                                       |
| [`removesuffix()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.removesuffix.html#pandas.Series.str.removesuffix "pandas.Series.str.removesuffix")     | Remove suffix from string, i.e. only remove if string ends with suffix.                                                         |
| [`repeat()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.repeat.html#pandas.Series.str.repeat "pandas.Series.str.repeat")                             | Duplicate values (`s.str.repeat(3)` equivalent to `x * 3`)                                                                      |
| [`pad()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.pad.html#pandas.Series.str.pad "pandas.Series.str.pad")                                         | Add whitespace to left, right, or both sides of strings                                                                         |
| [`center()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.center.html#pandas.Series.str.center "pandas.Series.str.center")                             | Equivalent to `str.center`                                                                                                      |
| [`ljust()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.ljust.html#pandas.Series.str.ljust "pandas.Series.str.ljust")                                 | Equivalent to `str.ljust`                                                                                                       |
| [`rjust()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.rjust.html#pandas.Series.str.rjust "pandas.Series.str.rjust")                                 | Equivalent to `str.rjust`                                                                                                       |
| [`zfill()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.zfill.html#pandas.Series.str.zfill "pandas.Series.str.zfill")                                 | Equivalent to `str.zfill`                                                                                                       |
| [`wrap()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.wrap.html#pandas.Series.str.wrap "pandas.Series.str.wrap")                                     | Split long strings into lines with length less than a given width                                                               |
| [`slice()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.slice.html#pandas.Series.str.slice "pandas.Series.str.slice")                                 | Slice each string in the Series                                                                                                 |
| [`slice_replace()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.slice_replace.html#pandas.Series.str.slice_replace "pandas.Series.str.slice_replace") | Replace slice in each string with passed value                                                                                  |
| [`count()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.count.html#pandas.Series.str.count "pandas.Series.str.count")                                 | Count occurrences of pattern                                                                                                    |
| [`startswith()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.startswith.html#pandas.Series.str.startswith "pandas.Series.str.startswith")             | Equivalent to `str.startswith(pat)` for each element                                                                            |
| [`endswith()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.endswith.html#pandas.Series.str.endswith "pandas.Series.str.endswith")                     | Equivalent to `str.endswith(pat)` for each element                                                                              |
| [`findall()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.findall.html#pandas.Series.str.findall "pandas.Series.str.findall")                         | Compute list of all occurrences of pattern/regex for each string                                                                |
| [`extract()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.extract.html#pandas.Series.str.extract "pandas.Series.str.extract")                         | Call `re.search` on each element, returning DataFrame with one row for each element and one column for each regex capture group |
| [`extractall()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.extractall.html#pandas.Series.str.extractall "pandas.Series.str.extractall")             | Call `re.findall` on each element, returning DataFrame with one row for each match and one column for each regex capture group. If more than 1 match for a cell, add new level of index (default name `match`) that gives 1 row for each match  |
| [`len()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.len.html#pandas.Series.str.len "pandas.Series.str.len")                                         | Compute string lengths                                                                                                          |
| [`strip()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.strip.html#pandas.Series.str.strip "pandas.Series.str.strip")                                 | Equivalent to `str.strip`                                                                                                       |
| [`rstrip()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.rstrip.html#pandas.Series.str.rstrip "pandas.Series.str.rstrip")                             | Equivalent to `str.rstrip`                                                                                                      |
| [`lstrip()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.lstrip.html#pandas.Series.str.lstrip "pandas.Series.str.lstrip")                             | Equivalent to `str.lstrip`                                                                                                      |
| [`partition()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.partition.html#pandas.Series.str.partition "pandas.Series.str.partition")                 | Equivalent to `str.partition`                                                                                                   |
| [`rpartition()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.rpartition.html#pandas.Series.str.rpartition "pandas.Series.str.rpartition")             | Equivalent to `str.rpartition`                                                                                                  |
| [`lower()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.lower.html#pandas.Series.str.lower "pandas.Series.str.lower")                                 | Equivalent to `str.lower`                                                                                                       |
| [`casefold()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.casefold.html#pandas.Series.str.casefold "pandas.Series.str.casefold")                     | Equivalent to `str.casefold`                                                                                                    |
| [`upper()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.upper.html#pandas.Series.str.upper "pandas.Series.str.upper")                                 | Equivalent to `str.upper`                                                                                                       |
| [`find()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.find.html#pandas.Series.str.find "pandas.Series.str.find")                                     | Equivalent to `str.find`                                                                                                        |
| [`rfind()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.rfind.html#pandas.Series.str.rfind "pandas.Series.str.rfind")                                 | Equivalent to `str.rfind`                                                                                                       |
| [`index()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.index.html#pandas.Series.str.index "pandas.Series.str.index")                                 | Equivalent to `str.index`                                                                                                       |
| [`rindex()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.rindex.html#pandas.Series.str.rindex "pandas.Series.str.rindex")                             | Equivalent to `str.rindex`                                                                                                      |
| [`capitalize()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.capitalize.html#pandas.Series.str.capitalize "pandas.Series.str.capitalize")             | Equivalent to `str.capitalize`                                                                                                  |
| [`swapcase()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.swapcase.html#pandas.Series.str.swapcase "pandas.Series.str.swapcase")                     | Equivalent to `str.swapcase`                                                                                                    |
| [`normalize()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.normalize.html#pandas.Series.str.normalize "pandas.Series.str.normalize")                 | Return Unicode normal form. Equivalent to `unicodedata.normalize`                                                               |
| [`translate()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.translate.html#pandas.Series.str.translate "pandas.Series.str.translate")                 | Equivalent to `str.translate`                                                                                                   |
| [`isalnum()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.isalnum.html#pandas.Series.str.isalnum "pandas.Series.str.isalnum")                         | Equivalent to `str.isalnum`                                                                                                     |
| [`isalpha()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.isalpha.html#pandas.Series.str.isalpha "pandas.Series.str.isalpha")                         | Equivalent to `str.isalpha`                                                                                                     |
| [`isdigit()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.isdigit.html#pandas.Series.str.isdigit "pandas.Series.str.isdigit")                         | Equivalent to `str.isdigit`                                                                                                     |
| [`isspace()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.isspace.html#pandas.Series.str.isspace "pandas.Series.str.isspace")                         | Equivalent to `str.isspace`                                                                                                     |
| [`islower()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.islower.html#pandas.Series.str.islower "pandas.Series.str.islower")                         | Equivalent to `str.islower`                                                                                                     |
| [`isupper()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.isupper.html#pandas.Series.str.isupper "pandas.Series.str.isupper")                         | Equivalent to `str.isupper`                                                                                                     |
| [`istitle()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.istitle.html#pandas.Series.str.istitle "pandas.Series.str.istitle")                         | Equivalent to `str.istitle`                                                                                                     |
| [`isnumeric()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.isnumeric.html#pandas.Series.str.isnumeric "pandas.Series.str.isnumeric")                 | Equivalent to `str.isnumeric`                                                                                                   |
| [`isdecimal()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.isdecimal.html#pandas.Series.str.isdecimal "pandas.Series.str.isdecimal")                 | Equivalent to `str.isdecimal`                                                                                                   |





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
