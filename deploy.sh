#!/bin/bash
rsync -avz --exclude '.git' --exclude '*.sh' ./ $BERNA:~/www/demo
