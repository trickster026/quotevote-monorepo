#!/bin/bash

# Digital Ocean Droplet Setup Script for Backend Deployment
# Run this script once on your droplet to prepare the environment

set -e

echo "🚀 Setting up Digital Ocean Droplet for backend deployment..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
echo "📦 Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install nginx
echo "🌐 Installing nginx..."
sudo apt-get install -y nginx

# Create deployment user (if not exists)
if ! id "deploy" &>/dev/null; then
    echo "👤 Creating deploy user..."
    sudo useradd -m -s /bin/bash deploy
    sudo usermod -aG sudo deploy
fi

# Create deployment directories
echo "📁 Creating deployment directories..."
sudo mkdir -p /home/deploy/deployments
sudo mkdir -p /home/deploy/logs
sudo chown -R deploy:deploy /home/deploy

# Setup nginx configuration
echo "⚙️ Setting up nginx configuration..."
sudo tee /etc/nginx/sites-available/backend << EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the nginx site
sudo ln -sf /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
echo "🔍 Testing nginx configuration..."
sudo nginx -t

# Start and enable nginx
echo "🚀 Starting nginx..."
sudo systemctl start nginx
sudo systemctl enable nginx

# Setup firewall
echo "🔥 Setting up firewall..."
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'  # Allow HTTP (80) and HTTPS (443)
sudo ufw --force enable

# Setup PM2 startup script
echo "⚡ Setting up PM2 startup script..."
pm2 startup

echo "✅ Droplet setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Add your GitHub repository secrets:"
echo "   - DROPLET_HOST: $(curl -s ifconfig.me)"
echo "   - DROPLET_USERNAME: deploy"
echo "   - DROPLET_SSH_KEY: Your private SSH key"
echo "   - DROPLET_PORT: 22 (or your custom port)"
echo ""
echo "2. Add your application secrets:"
echo "   - SECRET"
echo "   - DATABASE_URL"
echo "   - SMTP_* variables"
echo "   - Other environment variables"
echo ""
echo "3. Push to main/master branch to trigger deployment" 