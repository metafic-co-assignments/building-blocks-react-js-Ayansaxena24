#!/bin/bash

git fetch -f --all --tags
if [ "$#" -lt 2 ]; then
    echo "Usage $0 stage|prod version-tag"
	exit 1
fi

if [ "$1" != "stage" ] && [ "$1" != "prod" ]; then
	echo "'stage' and 'prod' and the only valid environment keywords"
	exit 1
fi

COMMIT_ID=$(git rev-list -n 1 $2 2> /dev/null)
if [ -z "$COMMIT_ID" ]; then
	printf "\n\e[31mNo such tag:\e[0m $2\n"
	printf "To see available tags run: git tag | sort -V\n\n"
	exit 0
fi

if [ "$1" = "stage" ]; then
	git tag -af $2 -m "stage" $COMMIT_ID
	git push -f origin --tags
fi
if [ "$1" = "prod" ]; then
	git tag -af $2 -m "production" $COMMIT_ID
	git push -f origin --tags
fi
