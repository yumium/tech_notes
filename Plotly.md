



### Renders

Installed renderers:

```python
import plotly.io as pio
pio.renderers
```

Overriding default renderer
```python
import plotly.graph_objects as go
fig = go.Figure(
    data=[go.Bar(y=[2, 1, 3])],
    layout_title_text="A Figure Displayed with the 'svg' Renderer"
)
fig.show(renderer="svg")
```

Other renderers:

- `notebook`: For display in Jupyter Notebook
- `kaggle` and `azure`
- `colab`: For google colab
- `browser`: Opens figure in default web browser
- `png`, `svg`: Static renderers


### Plotly express

A subframework with simpler syntax to create common graphs easily. Example:

```python
import plotly.express as px
df = px.data.tips()
fig = px.histogram(df, x="total_bill", y="tip", color="sex", marginal="rug", hover_data=df.columns)
fig.show()
```


### Misc

- `datetime.time` is treated as strings in plotly, as pandas does not have a native type for just time, so it wraps `datetime.time` in an object. This may cause the x-axis to be plotted wrongly. Workaround is to convert `datetime.time` to `datetime.datetime` by adding an arbitrary date, then use the below to strip the date when plotting.

```python
fig.update_xaxes(tickformat="%H:%M")
```

