module.exports = {
  apps: [
    {
      name: 'sk-server',
      script: ' node --env-file=.env ./sk-server/build/',
      env: {
        PORT: 443,
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'socket-server',
      script: 'node ./socket-server/dist/',
    },
  ],
};
