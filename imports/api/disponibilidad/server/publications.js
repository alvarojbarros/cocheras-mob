/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Disponibilidad } from '../disponibilidad.js';

Meteor.publish('disponibilidad.List', function(query) {
  return Disponibilidad.find(query);
});

Meteor.publish('aggregate', function(group,query) {
	var handle = Disponibilidad.aggregate(group,{$filter: query} );
});

Meteor.methods({
    "getAggregate" : function(query,group,sortBy) {
    	disp = Disponibilidad.aggregate({$match: query},group,sortBy );
    	console.log(disp);
    	return disp;
    }
});