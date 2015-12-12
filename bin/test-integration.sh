#!/usr/bin/env bash

TEST="mkdir sagui-project &&
      cd sagui-project &&
      npm init -y . &&
      npm install --loglevel=silent --save-dev /sagui &&
      ./node_modules/.bin/sagui install &&
      npm test &&
      npm run sagui:build &&
      npm run sagui:dist"

docker run --rm -ti -v $PWD:/sagui -w /tmp node:5.1 /bin/bash -c "$TEST"
