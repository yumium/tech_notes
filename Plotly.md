
### Figure data structure

You can see the figure structure just by printing it

```python
import plotly.express as px

fig = px.line(x=["a","b","c"], y=[1,3,2], title="sample figure")
print(fig)
fig.show()
```

Each figure is a tree of attributes.

`layout.annotations[].text` <-> `layout -> annotations -> text`

The top level attributes are `data`, `layout`, and `frames`

`data`

-   Each trace has one of more than 40 possible types (see below for a list organized by subplot type, including e.g. [`scatter`](https://plotly.com/python/line-and-scatter/), [`bar`](https://plotly.com/python/bar-charts/), [`pie`](https://plotly.com/python/pie-charts/), [`surface`](https://plotly.com/python/3d-surface-plots/), [`choropleth`](https://plotly.com/python/choropleth-maps/) etc), and represents a set of related graphical marks in a figure. Each trace must have a `type` attribute which defines the other allowable attributes.
-   Each trace is drawn on a single [subplot](https://plotly.com/python/subplots/) whose type must be compatible with the trace's type, or is its own subplot (see below).
-   Traces may have a single [legend](https://plotly.com/python/legend/) entry, with the exception of pie and funnelarea traces (see below).
-   Certain trace types support [continuous color, with an associated colorbar](https://plotly.com/python/colorscales/), which can be controlled by attributes either within the trace, or within the layout when using the [coloraxis attribute](https://plotly.com/python/colorscales/).

`layout`

-   Dimensions and margins, which define the bounds of "paper coordinates" (see below)
-   Figure-wide defaults: [templates](https://plotly.com/python/templates/), [fonts](https://plotly.com/python/figure-labels/), colors, hover-label and modebar defaults
-   [Title](https://plotly.com/python/figure-labels/) and [legend](https://plotly.com/python/legend/) (positionable in container and/or paper coordinates)
-   [Color axes and associated color bars](https://plotly.com/python/colorscales/) (positionable in paper coordinates)
-   Subplots of various types on which can be drawn multiple traces and which are positioned in paper coordinates:
    -   `xaxis`, `yaxis`, `xaxis2`, `yaxis3` etc: X and Y cartesian axes, the intersections of which are cartesian subplots
    -   `scene`, `scene2`, `scene3` etc: 3d scene subplots
    -   `ternary`, `ternary2`, `ternary3`, `polar`, `polar2`, `polar3`, `geo`, `geo2`, `geo3`, `mapbox`, `mapbox2`, `mabox3`, `smith`, `smith2` etc: ternary, polar, geo, mapbox or smith subplots
-   Non-data marks which can be positioned in paper coordinates, or in data coordinates linked to 2d cartesian subplots:
    -   `annotations`: [textual annotations with or without arrows](https://plotly.com/python/text-and-annotations/)
    -   `shapes`: [lines, rectangles, ellipses or open or closed paths](https://plotly.com/python/shapes/)
    -   `images`: [background or decorative images](https://plotly.com/python/images/)
-   Controls which can be positioned in paper coordinates and which can trigger Plotly.js functions when interacted with by a user:
    -   `updatemenus`: [single buttons, toggles](https://plotly.com/python/custom-buttons/) and [dropdown menus](https://plotly.com/python/dropdowns/)
    -   `sliders`: [slider controls](https://plotly.com/python/sliders/)

`frames`

The third of the three top-level attributes of a figure is `frames`, whose value must be a list of dicts that define sequential frames in an [animated plot](https://plotly.com/python/animations/). Each frame contains its own data attribute as well as other parameters. Animations are usually triggered and controlled via controls defined in layout.sliders and/or layout.updatemenus



### Creating and updating figures

Updating by adding trace

```python
import plotly.graph_objects as go

fig = go.Figure()

fig.add_trace(go.Bar(x=[1, 2, 3], y=[1, 3, 2]))

fig.show()
```

Or more conveniently

```python
from plotly.subplots import make_subplots

fig = make_subplots(rows=1, cols=2)

fig.add_scatter(y=[4, 2, 1], mode="lines", row=1, col=1)
fig.add_bar(y=[2, 1, 3], row=1, col=2)

fig.show()
```


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

### Pandas Plotting backend

```python
import pandas as pd
pd.options.plotting.backend = "plotly"

df = pd.DataFrame(dict(a=[1,3,2], b=[3,2,1]))
fig = df.plot()
fig.show()
```

This will use plotly to render instead of default matplotlib, giving interactive plots.

Note not all APIs are implemented, only the basic ones: 

> The Plotly backend supports the following kinds of Pandas plots: scatter, line, area, bar, barh, hist and box, via the call pattern df.plot(kind='scatter') or df.plot.scatter(). These delegate to the corresponding Plotly Express functions. In addition, the following are valid options to the kind argument of df.plot(): violin, strip, funnel, density_heatmap, density_contour and imshow, even though the call pattern df.plot.violin() is not supported for these kinds of charts, per the Pandas API.



### Misc

- `datetime.time` is treated as strings in plotly, as pandas does not have a native type for just time, so it wraps `datetime.time` in an object. This may cause the x-axis to be plotted wrongly. Workaround is to convert `datetime.time` to `datetime.datetime` by adding an arbitrary date, then use the below to strip the date when plotting.

```python
fig.update_xaxes(tickformat="%H:%M")
```

