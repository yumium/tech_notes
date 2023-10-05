#!/bin/bash
replace () {
	ls | while read -r d; do
		if [[ "$d" =~ .\.\  ]]; then
			#echo "Old name is $d"
			#  Don't put single quotes when doing replacements
			new=${d/. /-}
			#echo "New name is $new"
			mv "$d" "$new" 
		fi
	done
}
