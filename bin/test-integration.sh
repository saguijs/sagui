#!/usr/bin/env bash

# Intergration test that attemts to create a new Sagui project
# run tests and build in both LTS and Current versions of Node

TEST="mkdir sagui-project &&
      cd sagui-project &&
      npm init -y . &&
      npm install --loglevel=silent --save-dev /sagui &&
      ./node_modules/.bin/sagui install &&
      npm test &&
      npm run build &&
      npm run dist"

# LTS
docker run --rm -ti -v $PWD:/sagui -w /tmp node:4.4.4 /bin/bash -c "$TEST"

# Current
docker run --rm -ti -v $PWD:/sagui -w /tmp node:6.2.0 /bin/bash -c "$TEST"
