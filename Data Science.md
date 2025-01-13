# Data Science handbook

Some notes from various data science books. I have pretty good understanding of how to use various tools and statistical models. This notebook fills in gaps in workflows (e.g., data cleaning, exploratory data analysis, hypothesis testing ...)

Data analytics is the foundation for more advanced data science methods, which you can build on

Focus is on structured data (tabular, timeseries ...)

Why is Python used today for data science and AI?
- Lots of good data science libraries
- Easy-to-write glue code. In many data science applications, bottleneck is scientific compute optimisations, which are done by decade-old libraries written in C++, FORTRAN etc. Performance of glue code in this case is insignificant (it's a very small portion of the total CPU time)
- Potentially for solving two-language problem. Write production systems also in Python

**Common Python libraries**
- `NumPy`: fast NumPy arrays for storing and manipulating data, mature C API for linear algebra operations, Fourier transforms etc. directly on ndarrays without data copying
- `pandas`: a single tool for data manipulation, perparation, cleaning, compute etc. on the common Pandas DataFrame object
- `matplotlib`: 2D plotting tool
- `IPython` and `Jupyter`: For interactive Python experience, no need to switch between terminal and Python session
- `SciPy`: Scientific computing libraries (numerical integration, linear algebra, optimisers, root finding algos, signal processing, prob distributions, statistical tests)
- `scikit-learn`: ML library (classification, regression, clustering, dimensionality reduction, model selection, preprocessing (feature extraction, normalising))
- `statsmodels`: Statistical analysis package (regression models, ANOVA, time series analysis, nonparametric models (kernal density), visualiation)


## Data loading

Loading data in text format: `pd.read_csv`

Loading data in json format: use the `json` library

```python
import json
result = json.loads(obj)  # loads JSON into Python object
df = pd.DataFrame(result['siblings'], columns=['name', 'age'])  # convert to data frame
```

Web scraping: `pd.read_html`, attempts to parse tabular data inside `<table>`

Binary data: `pd.read_pickle`, `pd.read_parquet`

Interact with databases



## Data cleaning and preparation

Data preparation (loading, cleaning, transforming, rearranging etc.) take up 80% of data analytics project time. This is normal.

**Handling missing data**

`isna`, `notna`, `dropna` (filtering out missing data), `fillna` (filling missing data, `ffill` and `bfill`)


**Data tranformation**

`duplicated`, `drop_duplicates` (removing duplicates), `map` (mapping values), `replace` (replacing values), `index`, `rename` (renaming axis), `cut`, `qcut`, `value_counts` (discretization and binning), `describe` (outliers), `permutation`, `take`, `sample` (permutation and random sampling), string manipulations (splitting, regex ...), 


## Data wrangling

Combining many sources of data together.

**Hierarchical indexing**

`MultiIndex`, `stack`, `unstack`, `swaplevel`, `sort_index`, `set_index`, `reset_index` => work with high-dimensional data in 2D

**Combining and merging**

`merge`, `concat`, `concatenate`

**Reshaping and pivoting**

`

**Group operations**


**Timeseries**

See pandas methods on timeseries data




## Data plotting


## Model building


## Data analysis workflow

Load some data, clean data, wrangle data to get into right shape, plotting and visualisation for exploratory data analysis, data aggregation, modelling 







