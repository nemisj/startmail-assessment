'use strict';
require('babel-register')({
  presets: [ 'es2015' ]
});

const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

// define globals for chai, expect and sinon
global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;
