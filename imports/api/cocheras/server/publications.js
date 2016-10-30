/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Cocheras } from '../cocheras.js';

Meteor.publish('cocheras.List', function(query) {
  return Cocheras.find(query);
});
