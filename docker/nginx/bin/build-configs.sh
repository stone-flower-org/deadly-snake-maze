#!/bin/sh

ENV=$1
FROM_DIR=$2
TO_DIR=$3

[ -z "$ENV" ] && echo "Error: Must enter ENV" && exit 1
([ -z "$FROM_DIR" ] || [ -z "$TO_DIR" ]) && echo "Error: Must enter FROM_DIR and TO_DIR" && exit 1

CONFIGS=$(ls "$FROM_DIR" | grep ".$ENV.json")

for config in ${CONFIGS}; do
  echo "Info: Trying to copy $config"

  CONFIG_NAME=$(echo $config | sed "s/.$ENV.json/.json/g")
  CONFIG_PATH="$TO_DIR/$CONFIG_NAME"
  SOURCE_CONFIG_PATH="$FROM_DIR/$config"

  if [[ -f $CONFIG_PATH ]]; then
    echo "Info: Config '$CONFIG_PATH' already exists"
  else
    mkdir -p $TO_DIR && cp $SOURCE_CONFIG_PATH $CONFIG_PATH
    echo "Info: Config '$CONFIG_PATH' created"
  fi
done

exit 0
