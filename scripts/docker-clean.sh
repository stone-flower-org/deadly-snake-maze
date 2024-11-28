#!/bin/sh

cd "$(dirname $0)" && cd ../

read -r APP_NAME _ <<< $( ./scripts/app-info.sh )

SEARCH_KEY="${SEARCH_KEY:=$APP_NAME}"

CONTAINERS=($( docker container ls --all | grep $SEARCH_KEY | awk '{print $1}' ))
CONTAINERS=${CONTAINERS[@]}
IMAGES=($( docker image ls --all | grep $SEARCH_KEY | awk '{print $3}' ))
IMAGES=${IMAGES[@]}

if [[ $CONTAINERS != "" ]]; then
  echo "Info: Trying to remove containers with ids=\"$CONTAINERS\""
  docker container rm -fv $CONTAINERS
  [ $? -eq 0 ] || exit 1
fi

if [[ $IMAGES != "" ]]; then
  echo "Info: Trying to remove images with ids=\"$IMAGES\""
  docker image rm -f $IMAGES
  [ $? -eq 0 ] || exit 1
fi

echo 'Success'
echo "REMOVED_CONTAINERS=$CONTAINERS"
echo "REMOVED_IMAGES=$IMAGES"
