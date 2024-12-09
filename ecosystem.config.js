module.exports = {
  apps: [
    {
      name: 'sk-server',
      script: 'node ./sk-server/server.js',
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
      script: 'node ./socket-server/dist/index.js',
    },
  ],
};
