import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import { TAPi18n } from 'meteor/tap:i18n';

class SettingsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    const result = super.insert(ourDoc, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const settings = this.find(selector).fetch();
    const result = super.remove(selector);
    return result;
  }
}

export const Settings = new SettingsCollection('Settings');

// Deny all client-side updates since we will be using methods to manage this collection
Settings.deny({
  insert() {return true; },
  update() { return true; },
  remove() { return true; },
});

Settings.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  CocheraValue: {
    type: Number,
    optional: true,
  },
});

Settings.attachSchema(Settings.schema);

Settings.publicFields = {
  CocheraValue: 1,
};

Settings.helpers({
  list() {
    return Settings.find({});
  },
});
