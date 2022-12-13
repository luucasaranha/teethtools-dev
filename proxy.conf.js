const PRD_PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://odonto-api-app.herokuapp.com/',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': ''}
  }
];

const DEV_PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'localhost:8080',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': ''}
  }
];

module.exports = PRD_PROXY_CONFIG;
