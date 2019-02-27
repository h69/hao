#!/bin/bash
echo 'startup start.'
export ENV=online && export PORT=$main_port && nohup node /usr/local/app/web/bin/www &
echo 'startup end.'

