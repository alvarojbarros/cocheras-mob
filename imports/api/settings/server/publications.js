/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Settings } from '../settings.js';

Meteor.publish('settings.List', function() {
  return Settings.find({});
});
