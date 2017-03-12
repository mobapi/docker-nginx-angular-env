#!/bin/sh

cd /startup && \
npm up && \
gulp --module "mobapi.backoffice.parameters" --prefix "MOBAPI_" --output "/usr/share/nginx/html/js/conf.js" && \
nginx -g "daemon off;"
