import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Cocheras } from '../cocheras.js';

export const insert = new ValidatedMethod({
  name: 'cochera.insert',
  validate: Cocheras.simpleSchema().pick(['text']).validator({ clean: true, filter: false }),
  run({ text }) {
    const cochera = {
      text,
      owner: null,
      ownerName: null,
      notAvailable: null,
      propType: 0,
    };

    Cocheras.insert(cochera);
  },
});

export const setOwner = new ValidatedMethod({
  name: 'cochera.setOwner',
  validate: new SimpleSchema({
    cocheraId: Cocheras.simpleSchema().schema('_id'),
    userId: Cocheras.simpleSchema().schema('owner'),
    userName: Cocheras.simpleSchema().schema('ownerName'),
  }).validator({ clean: true, filter: false }),
  run({ cocheraId,userId,userName}) {
	cochera_actual = Cocheras.find({owner: userId}).fetch();
	if (cochera_actual.length>0){
		for (i=0;i<cochera_actual.length;i++)
		{
			Cocheras.update(cochera_actual[i]._id, { $set: {owner: null,ownerName: null}, });
		};
	}

	Cocheras.update(cocheraId, { $set: { owner: userId, ownerName: userName }, });
  }
});

export const setNotOwner = new ValidatedMethod({
  name: 'cochera.setNotOwner',
  validate: new SimpleSchema({
    cocheraId: Cocheras.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ cocheraId}) {
	Cocheras.update(cocheraId, { $set: {owner: null, ownerName: null},});
  },
});



export const setAvailable = new ValidatedMethod({
  name: 'cochera.setAvailable',
  validate: new SimpleSchema({
    cocheraId: Cocheras.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ cocheraId}) {
    const cochera = Cocheras.findOne(cocheraId);
    if (cochera.notAvailable === false) {
      return;
    }
    Cocheras.update(cocheraId, { $set: {notAvailable: false,} });
  },
});

export const setNotAvailable = new ValidatedMethod({
  name: 'cochera.setNotAvailable',
  validate: new SimpleSchema({
    cocheraId: Cocheras.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ cocheraId}) {
    const cochera = Cocheras.findOne(cocheraId);
    if (cochera.notAvailable === true) {
      return;
    }
    Cocheras.update(cocheraId, { $set: {notAvailable: true,} });
  },
});

export const setPropType = new ValidatedMethod({
  name: 'cochera.setPropType',
  validate: new SimpleSchema({
    cocheraId: Cocheras.simpleSchema().schema('_id'),
    pType: Cocheras.simpleSchema().schema('propType'),
  }).validator({ clean: true, filter: false }),
  run({ cocheraId,pType}) {
    const cochera = Cocheras.findOne(cocheraId);
    Cocheras.update(cocheraId, { $set: {propType: pType,} });
  },
});


export const updateText = new ValidatedMethod({
  name: 'cochera.updateText',
  validate: new SimpleSchema({
    cocheraId: Cocheras.simpleSchema().schema('_id'),
    newText: Cocheras.simpleSchema().schema('text'),
  }).validator({ clean: true, filter: false }),
  run({ cocheraId, newText }) {
    // This is complex auth stuff - perhaps denormalizing a userId onto companies
    // would be correct here?
    const cochera = Cocheras.findOne(cocheraId);

    Cocheras.update(cocheraId, {
      $set: {
        text: (_.isUndefined(newText) ? null : newText),
      },
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'cochera.remove',
  validate: new SimpleSchema({
    cocheraId: Cocheras.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ cocheraId }) {
    const cochera = Cocheras.findOne(cocheraId);

    Cocheras.remove(cocheraId);
  },
});



// Get list of all method names on Cocheras
const COCHERAS_METHODS = _.pluck([
  insert,
  updateText,
  setOwner,
  setNotOwner,
  setAvailable,
  setNotAvailable,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 companies operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(COCHERAS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}




