# Backend Deployment to Digital Ocean

This guide explains how to deploy the backend to a Digital Ocean droplet using GitHub Actions.

## Prerequisites

1. A Digital Ocean droplet with Ubuntu 20.04 or later
2. SSH access to the droplet
3. A GitHub repository with the backend code
4. GitHub Actions enabled

## Setup Instructions

### 1. Prepare the Digital Ocean Droplet

SSH into your droplet and run the setup script:

```bash
# Download and run the setup script
curl -fsSL https://raw.githubusercontent.com/your-username/your-repo/main/server/deploy/setup-droplet.sh | bash
```

Or manually run the commands from `setup-droplet.sh`.

### 2. Configure GitHub Secrets

Add the following secrets to your GitHub repository (Settings > Secrets and variables > Actions):

#### Droplet Connection Secrets:
- `DROPLET_HOST`: Your droplet's IP address or domain
- `DROPLET_USERNAME`: Username for SSH access (usually `deploy` or `root`)
- `DROPLET_SSH_KEY`: Your private SSH key for connecting to the droplet
- `DROPLET_PORT`: SSH port (default: 22)

#### Application Environment Secrets:
- `SECRET`: JWT secret for authentication
- `DATABASE_URL`: MongoDB connection string
- `LYRICIST_TOKEN`: API token for lyricist service
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password
- `FROM_EMAIL`: Email address for sending emails
- `CLIENT_URL`: Frontend application URL
- `REQUEST_ACCESS_URL`: Request access page URL
- `PORT`: Backend port (default: 3000)

#### Test Environment Secrets:
- `TEST_DATABASE_URL`: Test database connection string

### 3. Deploy

The deployment will automatically trigger when you push to the `main` or `master` branch with changes in the `server/` directory.

## Deployment Process

The GitHub Actions workflow:

1. **Tests**: Runs linting and tests on the backend code
2. **Builds**: Compiles the TypeScript/JavaScript code
3. **Packages**: Creates a deployment archive
4. **Deploys**: Uploads and extracts the package on the droplet
5. **Starts**: Uses PM2 to manage the application process

## Monitoring and Logs

### PM2 Commands
```bash
# View running processes
pm2 list

# View logs
pm2 logs HHSB

# Restart application
pm2 restart HHSB

# Stop application
pm2 stop HHSB
```

## Rollback

If you need to rollback to a previous deployment:

```bash
cd ~/deployments
ls -la  # List available deployments
cd backend_YYYYMMDD_HHMMSS  # Navigate to previous deployment
pm2 stop HHSB
pm2 delete HHSB
pm2 start app/ecosystem.config.js
pm2 save
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Check if another process is using port 3000
   ```bash
   sudo netstat -tlnp | grep :3000
   ```

2. **Permission denied**: Ensure the deploy user has proper permissions
   ```bash
   sudo chown -R deploy:deploy /home/deploy
   ```

3. **PM2 not starting**: Check PM2 logs and ecosystem configuration
   ```bash
   pm2 logs
   pm2 show HHSB
   ```

4. **Database connection issues**: Verify DATABASE_URL and network connectivity

### Health Check

Test if your backend is running:

```bash
curl http://localhost:3000/graphql
```

## Security Considerations

1. Keep your SSH keys secure
2. Regularly update system packages
3. Use strong passwords and secrets
4. Configure firewall rules
5. Monitor logs for suspicious activity

## Maintenance

### Regular Tasks

1. **Update system packages**:
   ```bash
   sudo apt update && sudo apt upgrade
   ```

2. **Clean old deployments**:
   ```bash
   cd ~/deployments
   ls -t | tail -n +6 | xargs -r rm -rf
   ```

3. **Rotate logs**:
   ```bash
   pm2 flush
   ```

### Backup Strategy

1. **Database backups**: Set up automated MongoDB backups
2. **Application backups**: Keep deployment archives
3. **Configuration backups**: Backup PM2 configurations

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Review PM2 logs
3. Verify all environment variables are set correctly
4. Ensure the droplet has sufficient resources 