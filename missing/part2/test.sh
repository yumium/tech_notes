#!/bin/bash
test () {
	for i in {5..10..2}; do
		echo "$i"
	done
}

output () {
	echo "$1"
	echo "$2"
}

output1 () {
	read foo
	echo "$foo"
}

output2 () {
	while read -r data; do
		echo "$data"
	done
}

reload () {
	source $_
}

test1 () {
	if [[ "A.B" =~ *.* ]]; then
		echo "Matched!"
	else
		echo "Didn't match :/"
	fi
}

test2 () {
	echo -n "Proceed? [Y/n]: "
	read ans
	if [[ -z "$ans" || "$ans" == "y" || "$ans" == "Y" ]]; then
		echo "Executing..."
	elif [[ "$ans" == "n" || "$ans" == "N" ]]; then
		echo "Aborted."
	else
		echo "couldn't parse response"
		test2
	fi
}
