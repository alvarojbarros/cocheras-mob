import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Disponibilidad } from './disponibilidad.js';

export const insert = new ValidatedMethod({
  name: 'disponibilidad.insert',
  validate: new SimpleSchema({
    cId: Disponibilidad.simpleSchema().schema('cochera'),
    cName: Disponibilidad.simpleSchema().schema('cocheraName'),
    uId: Disponibilidad.simpleSchema().schema('holder'),
    uName: Disponibilidad.simpleSchema().schema('holderName'),
    uDate: Disponibilidad.simpleSchema().schema('transdate'),
  }).validator({ clean: true, filter: false }),
  run({ cId,cName,uId,uName,uDate }) {
    const disponibilidad = {
      cochera: cId,
      cocheraName: cName,
      holder: uId,
      holderName: uName,
      transdate: uDate,
    };

    Disponibilidad.insert(disponibilidad);
  },
});

export const hold = new ValidatedMethod({
  name: 'disponibilidad.hold',
  validate: new SimpleSchema({
    Id: Disponibilidad.simpleSchema().schema('_id'),
    holderId: Disponibilidad.simpleSchema().schema('holder'),
  }).validator({ clean: true, filter: false }),
  run({ Id,holderId}) {

	if (holderId){
	    Disponibilidad.update(Id, {
	      $set: {
			  holder: null,
			  holderName: null },
	    });
	}else{
	    Disponibilidad.update(Id, {
	      $set: {
			  holder: Meteor.userId(),
			  holderName: Meteor.user().emails[0].address },
	    });
	};
  }
});


export const setHolder = new ValidatedMethod({
  name: 'disponibilidad.setHolder',
  validate: new SimpleSchema({
    Id: Disponibilidad.simpleSchema().schema('_id'),
    userId: Disponibilidad.simpleSchema().schema('holder'),
    userName: Disponibilidad.simpleSchema().schema('holderName'),
  }).validator({ clean: true, filter: false }),
  run({ Id,userId,userName}) {

	disponibilidad_nueva = Disponibilidad.find({_id: Id}).fetch()[0]
	disponibilidad_actual = Disponibilidad.find({holder: userId,transdate: disponibilidad_nueva.transdate}).fetch();
	if (disponibilidad_actual.length>0){
		for (i=0;i<disponibilidad_actual.length;i++)
		{
			Disponibilidad.update(disponibilidad_actual[i]._id, {
			  $set: {
				  holder: null,
				  holderName: null},
			});
		};
	}
	Disponibilidad.update(Id, {
	  $set: {
		  holder: userId,
		  holderName: userName },
	});

  }
});


export const setFree = new ValidatedMethod({
  name: 'disponibilidad.setFree',
  validate: new SimpleSchema({
    Id: Disponibilidad.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ Id }) {

	Disponibilidad.update(Id, {
	  $set: {
		  holder: null,
		  holderName: null},
	});

  }
});




export const remove = new ValidatedMethod({
  name: 'disponibilidad.remove',
  validate: new SimpleSchema({
    Id: Disponibilidad.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ Id }) {
    const disponibilidad = Disponibilidad.findOne(Id);
    Disponibilidad.remove(Id);
  },
});

// Get list of all method names on Disponibilidad
const DISPONIBILIDAD_METHODS = _.pluck([
  insert,
  hold,
  setHolder,
  setFree,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 companies operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(DISPONIBILIDAD_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}




