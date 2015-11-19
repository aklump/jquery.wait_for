#!/bin/bash
# 
# @file
# Copy distribution files to /dist
# 
sleep 3
test -d "$7/dist" || mkdir -p "$7/dist"
cp "$7/jquery.wait_for.js" "$7/dist/"
cp "$7/jquery.wait_for.min.js" "$7/dist/"
