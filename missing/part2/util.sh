#!/bin/bash/

# Create a new directory and cd into it
mcd () {
	mkdir -p "$1" && cd "$1"
}

# Reload, intended to be used following "nano script.sh". Used for editing shell scripts
reload () {
	source $_
}

# Remember the last few lines of command, default 2
:l () {
	nHist=$1; nHist=${nHist:-2}
	# history array, most recent last
	myHistory=()
	while read -r h; do
		myHistory+=("$h")
	done <<< "$(fc -ln -$nHist)"
	for ((i = 0; i < $nHist; i++)); do
		echo "${myHistory[$i]}"
	done
}

# Execute saved commands in sequence. Will only execute later commands when all previous commands are successful
# Use -v or --verbose flag to trigger it to print which command it is executing now
:r () {
	VERBOSE=1
	if [[ "$1" == "-v" || "$1" == "--verbose" ]]; then
		VERBOSE=0 
	fi

	# emulating a do-while loop
	if [[ $VERBOSE -eq 0 ]]; then 
		echo "Executing command 1: ${myHistory[0]}" 
	fi
	${myHistory[0]}; res=$?
	i=1
	while [[ $i -lt ${#myHistory[@]} && $res -eq 0 ]]; do
		if [[ $VERBOSE -eq 0 ]]; then
			echo "Executing command $(($i + 1)): ${myHistory[$i]}"
		fi
		${myHistory[$i]}; res=$?
		i=$(($i + 1))
	done
}

# save the current working directory
setjmp () {
	sAvEdPatH=$(pwd)
	echo $sAvEdPatH
}

# jump to previously saved working directory
longjmp () {
	cd $sAvEdPatH
}
