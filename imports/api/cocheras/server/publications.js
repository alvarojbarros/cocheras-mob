/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Cocheras } from '../cocheras.js';

Meteor.publish('cocheras.List', function() {
  return Cocheras.find({});
});
