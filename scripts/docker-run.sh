#!/bin/sh

cd "$(dirname $0)" && cd ../

read -r APP_NAME _ <<< $( ./scripts/app-info.sh )

APP_PORT="${APP_PORT:=3000}"
CONFIGS_PATH="${CONFIGS_PATH:=}"
ENV="${ENV:=stage}"
TAG="${TAG:=${APP_NAME}:latest}"

CONTAINER=$(echo $TAG | sed 's/:/_/g')
if [[ ! -z "$CONFIGS_PATH" ]]; then
  VOLUMES_OPTS="-v $CONFIGS_PATH:/usr/share/nginx/html/assets/config"
fi

echo "Info: Trying to remove prev container with name=\"$CONTAINER\""
docker container rm -fv $CONTAINER
echo "Info: Trying to run container using
      ENV=\"$ENV\"
      name=\"$CONTAINER\"
      port=\"$APP_PORT\"
      tag=\"$TAG\"
      VOLUMES_OPTS=\"$VOLUMES_OPTS\""
docker run -itd --rm $VOLUMES_OPTS -p $APP_PORT:80 -e ENV=$ENV --name $CONTAINER $TAG

[ $? -eq 0 ] || exit 1

printf "Success\nCONTAINER: $CONTAINER\n"
