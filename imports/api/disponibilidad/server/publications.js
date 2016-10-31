/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Disponibilidad } from '../disponibilidad.js';
import { Cocheras } from '../../cocheras/cocheras.js';

import {
  insert,
  hold,
  setStatus,
  setHolder,
  setFree,
} from './methods.js';

function thisUserAdmin(){
	return (Meteor.user().emails[0].address=="admin@mail.com" || Meteor.user().emails[0].address=="super@mail.com");
};


Meteor.publish('disponibilidad.List', function(query) {
  return Disponibilidad.find(query);
});

Meteor.methods({
    "getAggregate" : function(query,group,sortBy) {
    	disp = Disponibilidad.aggregate({$match: query},group,sortBy );
    	console.log(disp);
    	return disp;
    },

    "disponibilidadInsert" : function({cId,cName,uId,uName,uDate}) {
		insert.call({cId,cName,uId,uName,uDate});
    },

    "disponibilidadHold" : function({Id,holderId,dS}) {
	    hold.call({Id, holderId, dS});
    },

    "disponibilidadSetSatus" : function({Id,dS}) {
		setStatus.call({Id, dS});
    },

    "disponibilidadSetHolder" : function({Id,userId,userName}) {
	    setHolder.call({ Id,userId,userName});
    },

    "disponibilidadSetFree" : function({Id}) {
	    setFree.call({ Id });
    },

  	"getCocherasDisponibilidad" : function({mydate}) {
		query = {notAvailable: { $ne: true }} ;
		cocheras = Cocheras.find(query).fetch();
		var array = [];
		for (i=0;i<cocheras.length;i++){
			query1 = {cochera: cocheras[i]._id, transdate: mydate};
			disp = Disponibilidad.find(query1).fetch();
			if (disp.length>0){
				if (disp[0].holder == null) {
					array[array.length] = disp[0];
				}else{
					if (thisUserAdmin()) {
						array[array.length] = disp[0];
					}
				}
			}else{

				Meteor.call('disponibilidadInsert',{cId: cocheras[i]._id, cName: cocheras[i].text, uId: null, uName: null, uDate: mydate });
				disp = Disponibilidad.find({cochera: cocheras[i]._id, transdate: mydate}).fetch();
				array[array.length] = disp[0];
			}
		}
		return array;
	},

});