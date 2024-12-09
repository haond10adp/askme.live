module.exports = {
  apps: [
    {
      name: 'sk-server',
      script: './sk-server/build/ --node-args="--env-file=.env"',
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
      script: './socket-server/dist/',
    },
  ],
};
