import merge from 'lodash.merge';

// allow local to run staging or production if we want
type Stage = 'local' | 'staging' | 'production';

// set up a default value for NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage: Stage = (process.env.STAGE as Stage) || 'local';
let envConfig;

// dynamically require each config depending on the stage we're in
if (stage === 'production') {
  envConfig = require('./prod').default;
} else if (stage === 'staging') {
  envConfig = require('./staging').default;
} else {
  envConfig = require('./local').default;
}

const defaultConfig = {
  stage,
  env: process.env.NODE_ENV,
  port: 3001,
  secrets: {
    dbUrl: process.env.DATABASE_URLM,
    jwtSecret: process.env.JWT_SECRET,
  },
  logging: false,
};

export default merge(defaultConfig, envConfig);
