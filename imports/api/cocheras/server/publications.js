/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Cocheras } from '../cocheras.js';
import {
  remove,
  insert,
  setOwner,
  setNotOwner,
  setNotAvailable,
  setAvailable,
  setPropType,
} from './methods.js';




Meteor.publish('cocheras.List', function(query) {
  return Cocheras.find(query);
});


Meteor.methods({
    "cocheraInsert" : function({text}) {
	    insert.call({text});
    },

    "cocheraSetOwner" : function({cocheraId, userId, userName}) {
	    setOwner.call({cocheraId, userId, userName});
    },

    "cocheraSetNoOwner" : function({cocheraId}) {
	    setNotOwner.call({cocheraId});
    },

    "cocheraSetNotAvailable" : function({cocheraId}) {
	    setNotAvailable.call({cocheraId});
    },

    "cocheraSetAvailable" : function({cocheraId}) {
	    setAvailable.call({cocheraId});
    },

    "cocheraSetPropType" : function({cocheraId,pType}) {
		setPropType.call({cocheraId,pType});
    },

    "cocheraRemove" : function({cocheraId}) {
		setPropType.call({cocheraId});
    },

});
