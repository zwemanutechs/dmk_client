#!/bin/bash

yarn build

cp manifest.yml ./build/manifest.yml
cd build
cf push