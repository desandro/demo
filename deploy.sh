#!/bin/bash
rsync -avz --exclude '.git' --exclude '*.sh' --exclude '.DS_Store' ./ $BERNA:~/www/demo
