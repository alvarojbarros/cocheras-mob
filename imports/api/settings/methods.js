import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Settings } from './settings.js';

export const insert = new ValidatedMethod({
  name: 'settings.insert',
  validate: new SimpleSchema({
    valor: Settings.simpleSchema().schema('CocheraValue'),
  }).validator({ clean: true, filter: false }),
  run({ valor }) {
    const settings = {
      CocheraValue: valor,
    };

    Settings.insert(settings);
  },
});

export const update = new ValidatedMethod({
  name: 'settings.update',
  validate: new SimpleSchema({
    Id: Settings.simpleSchema().schema('_id'),
    valor: Settings.simpleSchema().schema('CocheraValue'),
  }).validator({ clean: true, filter: false }),
  run({ Id,valor }) {

	Settings.update(Id, { $set: { CocheraValue: valor }, });
  }
});



export const remove = new ValidatedMethod({
  name: 'settings.remove',
  validate: new SimpleSchema({
    Id: Settings.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ Id }) {
    const settings = Settings.findOne(Id);

    Settings.remove(Id);
  },
});

// Get list of all method names on Settings
const SETTINGS_METHODS = _.pluck([
  insert,
  update,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 companies operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(SETTINGS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
