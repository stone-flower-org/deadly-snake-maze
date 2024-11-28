#!/bin/sh

cd "$(dirname $0)" && cd ../

echo "Info: Trying to install husky deps"
yarn husky install

echo "Info: Creating local configs"
CONFIGS=$(ls "./configs" | grep ".development.json")
for config in ${CONFIGS}; do
  LOCAL_CONFIG_NAME=$(echo $config | sed "s/.development.json/.local.json/g")
  cp ./configs/$config ./configs/$LOCAL_CONFIG_NAME
done
