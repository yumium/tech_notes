# To build paper.pdf, we need dependency on files `paper.tex` and `plot-data.png`. If one of them changes, paper.pdf needs to be rebuilt. The next line gives the commands on how to build it
paper.pdf: paper.tex plot-data.png
	pdflatex paper.tex

# % means any string in make, a wildcard pattern
# -i means input, -o means output
# $* expands the %
# $@ is the name of the target (ie. plot-%.png)
plot-%.png: %.dat plot.py
	./plot.py -i $*.dat -o $@
