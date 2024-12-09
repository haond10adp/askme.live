module.exports = {
  apps: [
    {
      name: 'sk-server',
      script: 'PORT=443 node --env-file=.env ./sk-server/build ',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'socket-server',
      script: 'node ./socket-server/dist',
    },
  ],
};
