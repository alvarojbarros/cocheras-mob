import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import { TAPi18n } from 'meteor/tap:i18n';

class CocherasCollection extends Mongo.Collection {
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
    const cochera = this.find(selector).fetch();
    const result = super.remove(selector);
    return result;
  }
}

export const Cocheras = new CocherasCollection('Cocheras');

// Deny all client-side updates since we will be using methods to manage this collection
Cocheras.deny({
  insert() {return true; },
  update() { return true; },
  remove() { return true; },
});

Cocheras.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  text: {
    type: String,
    max: 30,
    optional: true,
  },
  owner: {
    type: String,
    max: 50,
    optional: true,
  },
  ownerName: {
    type: String,
    max: 50,
    optional: true,
  },
  notAvailable: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  propType: {
    type: Number,
    optional: true,
  },
});

Cocheras.attachSchema(Cocheras.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Cocheras.publicFields = {
  text: 1,
  owner: 1,
  ownerName: 1,
  notAvailable: 1,
  propType: 1,
};

// TODO This factory has a name - do we have a code style for this?
//   - usually I've used the singular, sometimes you have more than one though, like
//   'todo', 'emptyTodo', 'checkedTodo'
Factory.define('cochera', Cocheras, {
  text: () => faker.lorem.sentence(),
});

Cocheras.helpers({
  list() {
    return Cocheras.find({});
  },
});
