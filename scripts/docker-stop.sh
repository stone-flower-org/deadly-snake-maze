#!/bin/sh

cd "$(dirname $0)" && cd ../

read -r APP_NAME _ <<< $( ./scripts/app-info.sh )

CONTAINER="${CONTAINER:=${APP_NAME}_latest}"

echo "Info: Trying to remove container with name=\"$CONTAINER\""
docker container rm -fv $CONTAINER

[ $? -eq 0 ] || exit 1

printf "Success\n"
