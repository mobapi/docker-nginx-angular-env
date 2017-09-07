#!/bin/sh

usage() {
	cat << EOF
Usage:
	$0 [-p prefix] -m module -o output

		prefix: environment variables prefix
		module: angular module name
		output: output file path
EOF
}

while getopts 'p:m:o:' flag; do
	case "${flag}" in
		p)
			prefix="${OPTARG}" ;;
		m)
			module="${OPTARG}" ;;
		o)
			output="${OPTARG}" ;;
	esac
done

if [ -z "$module" -o -z "$output" ]; then
	usage
	exit -1
fi

cd /scripts && \
echo "Injecting environment variables (prefix: ${prefix}) to module ${module} in file ${output}..." && \
gulp --prefix "${prefix}" --module "${module}" --output "${output}" && \
echo "Done!" && \
nginx -g "daemon off;"
