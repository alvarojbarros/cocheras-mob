import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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

Cocheras.publicFields = {
  text: 1,
  owner: 1,
  ownerName: 1,
  notAvailable: 1,
  propType: 1,
};

Cocheras.helpers({
  list() {
    return Cocheras.find({});
  },
});
