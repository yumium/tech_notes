# Pandas

Getting started: https://pandas.pydata.org/docs/getting_started/index.html#tutorials

10 mins to pandas: https://pandas.pydata.org/docs/user_guide/10min.html

Comparison with SQL: https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html#top-n-rows-per-group



Overview:

- Pandas handles tabular data (like excel). A data table is called a `DataFrame`
- Pandas support reading data from many file formats (csv, excel, sql, json ...) and writing data to these formats
- Pandas support many methods to select specific roles, columns, or any subset of the data frame
- Pandas support plotting capabilities out of the box, such as with Matplotlib
- Pandas support summary statistics calculation
- Pandas support table reshape
- Pandas support table combinations with power like join/merge
- Pandas support time series data manipulation
- Pandas support textual data manipulation







## 10 min overview

**Object creation**

Lots of ways to create objects, see "Introduction to Data Structures"



**Viewing data**

`df.head()`: top rows of the frame

`df.tail(n)`: bottom rows of the frame

`df.index`: the index

`df.columns`: the columns

`df.to_numpy()`: converts to np representation of data. np arrays have 1 dtype but pd have 1 dtype per column, so the data frame will be converted to a dtype that can hold entire frame, which may end up being a Python object

`df.describe()`: quick statistic summary of data

`df.T`: transpose

`df.sort_index(axis=1, ascending=False)`: sorting by axis (axis=0 is index, axis=1 is column etc.)

`df.sort_values(by="B")`: sort by values in the column "B"



**Selecting data**

(Note: optimized pandas data access methods (.at, .iat, .loc, .iloc) should be used in production workloads)

`df["A"]`: single column

`df[0:3]`: select rows

`df["idx1", "idx2"]`: select rows

`df.loc["20130102":"20130104", ["A", "B"]]`: select subset of data frame using labels

`df.iloc[3]`, `df.iloc[:, 1:3]`: select subset of data frame using indices

`df[condition]`: conditional/boolean selection, either returning rows that satisfy or the entire data frame but with values that don't satisfy removed. This depends on the condition

`df.at["20220301", "A"] = 0`: setting a field by labels

`df.iat[0,1]`: setting a field by indices

`df["A"] = s1`: setting a column. `s1` must be a data frame with one column, the indices of s1 and df will automatically match.

`df[df > 0] = -df`: conditional setting, this example makes all fields non-positive



**Missing data**

By default, missing data in df is represented as `np.nan`.

`df.dropna(how="any")`: drop rows that contain missing data

`df.fillna(value=5)`: fill missing data with default value

`pd.isna(df1)`: create a mask (data frame with same dimension) where the value is `True` if that field contains missing data and `False` otherwise











