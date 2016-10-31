/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Settings } from '../settings.js';

import {
  update,
  insert,
} from './methods.js';


Meteor.publish('settings.List', function() {
  return Settings.find({});
});


Meteor.methods({
    "settingsInsert" : function({valor}) {
		insert.call({valor});
    },

    "settingsUpdate" : function({Id, valor}) {
		update.call({Id,valor});
    },


});
