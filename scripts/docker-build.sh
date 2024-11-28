#!/bin/sh

cd "$(dirname $0)" && cd ../

read -r APP_NAME APP_VERSION _ <<< $( ./scripts/app-info.sh )

IFS=',' read -ra TAGS <<< $TAGS

TAGS=${TAGS:=${APP_NAME}:latest ${APP_NAME}:${APP_VERSION}}
TAGS_ARR=($TAGS)
BUILD_TAGS_OPTS=${TAGS_ARR[@]/#/-t }

echo "Info: Trying to remove prev images with tags=\"$TAGS\""
docker image rm -f $TAGS
echo "Info: Trying to build image using tags=\"$TAGS\""
docker build ./ $BUILD_TAGS_OPTS

[ $? -eq 0 ] || exit 1

printf "Success\nTAGS: $TAGS\n"
