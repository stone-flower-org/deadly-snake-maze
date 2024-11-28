#!/bin/sh

set -e

CONFIGS_DIR="/var/srv/configs"
BUILT_CONFIGS_DIR="/usr/share/nginx/html/static/config"

/usr/local/bin/build-configs.sh $ENV $CONFIGS_DIR $BUILT_CONFIGS_DIR
