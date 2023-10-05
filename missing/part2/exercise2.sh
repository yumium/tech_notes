q1 () {
	ls -a -h --sort=time --color=always
}

# q2
setjmp () {
	sAvEdPatH=$(pwd)
	echo $sAvEdPatH
}

longjmp () {
	cd $sAvEdPatH
}

# q3
# Continuously execute a script until it terminates with error or MAX_ITER reached
# Usage: "q3debug ./testingScript [MAX_ITER]"
q3debug () {
	MAX_ITER=$2; MAX_ITER=${MAX_ITER:-500}
	nIter=1
	$1 > output 2> error; res=$?
	while [[ $nIter -lt $MAX_ITER && $res -eq 0 ]]; do
		$1 > output 2> error; res=$?
		nIter=$((nIter + 1))
	done
	if [[ $res -eq 0 ]]; then
		rm output error
		echo "Max iteration number ($MAX_ITER) reached"
	else
		echo "Error found after $nIter consecutive execution(s)"
	fi
}

test () {
	if [[ 1 < 500  && 0 == 0 ]]; then
		echo "true"
	else
		echo "false"
	fi
}
