/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Users } from '../users.js';

Meteor.publish('users.List', function() {
  return Meteor.users.find({});
});
