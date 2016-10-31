import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class DisponibilidadCollection extends Mongo.Collection {
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

export const Disponibilidad = new DisponibilidadCollection('Disponibilidad');

// Deny all client-side updates since we will be using methods to manage this collection
Disponibilidad.deny({
  insert() {return true; },
  update() { return true; },
  remove() { return true; },
});

Disponibilidad.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  cochera: {
    type: String,
    max: 30,
  },
  cocheraName: {
    type: String,
    max: 50,
    optional: true,
  },
  holder: {
    type: String,
    max: 30,
    optional: true,
  },
  holderName: {
    type: String,
    max: 50,
    optional: true,
  },
  transdate: {
    type: String,
    max: 12,
  },
  date: {
    type: Date,
    max: 12,
  },
  dStatus: {
    type: Number,
    optional: true,
  },
});

Disponibilidad.attachSchema(Disponibilidad.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Disponibilidad.publicFields = {
  cochera: 1,
  cocheraName: 1,
  holder: 1,
  holderName: 1,
  transdate: 1,
};

Disponibilidad.helpers({
  list() {
    return Disponibilidad.find({});
  },
});

