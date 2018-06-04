#!/bin/bash
echo 'startup start.'
export NODE_ENV=online && export PORT=10079 && nohup node bin/www &
echo 'startup end.'

