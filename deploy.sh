echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Jump to app folder"
cd /home/ubuntu/dms-backend

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo yarn install

echo "Run new PM2 action"
sudo pm2 start ecosystem.json