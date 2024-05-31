

### Misc

- `datetime.time` is treated as strings in plotly, as pandas does not have a native type for just time, so it wraps `datetime.time` in an object. This may cause the x-axis to be plotted wrongly. Workaround is to convert `datetime.time` to `datetime.datetime` by adding an arbitrary date, then use the below to strip the date when plotting.

```python
fig.update_xaxes(tickformat="%H:%M")
```

