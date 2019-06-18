module.exports = {
  apps: [
    {
      script: 'npm',
      args: ['run', 'start:production'],
      name: `eddtr-${process.env.PM2_APP_NAME}-app`,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env_production: {
        NODE_ENV: 'production',
        PM2_APP_NAME: 'production',
        PORT: 3000,
        LOG_LEVEL: 'debug',
      },
    },
  ],

  deploy: {
    production: {
      user: 'rovnyart',
      host: '5.181.108.120',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      ref: 'origin/master',
      repo: 'git@github.com:rovnyart/editr.git',
      path: '/var/www/eddtr.space/',
      'post-deploy': 'yarn && PM2_APP_NAME=production NODE_ENV=production pm2 reload ecosystem.config.js --env production', // eslint-disable-line max-len
    },
  },
};
