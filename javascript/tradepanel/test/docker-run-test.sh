#!/bin/bash

cd javascript/tradepanel
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install
nvm use
npm install
npm run build
xvfb-run --auto-servernum --server-num=1 --server-args='-screen 0, 1920x1080x24' npm run test