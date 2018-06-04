#!/bin/bash
echo 'kill start.'
ps -ef | grep 'app' | grep -v ' grep ' | awk '{print $2}' | xargs kill -9 2>/dev/null
ps -ef | grep 'web' | grep -v ' grep ' | awk '{print $2}' | xargs kill -9 2>/dev/null
ps -ef | grep 'www' | grep -v ' grep ' | awk '{print $2}' | xargs kill -9 2>/dev/null
echo "kill end."