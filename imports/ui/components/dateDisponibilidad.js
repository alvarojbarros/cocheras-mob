import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Cocheras } from '../../api/cocheras/cocheras.js';
import { Disponibilidad } from '../../api/disponibilidad/disponibilidad.js';
import { displayError } from '../lib/errors.js';

import './dateDisponibilidad.html';
import './cocheraUser.js';
import './cocheraAdmin.js';

import {
  insert,
} from '../../api/disponibilidad/methods.js';


function thisUserAdmin(){
	return (Meteor.user().emails[0].address=="admin@mail.com" || Meteor.user().emails[0].address=="super@mail.com");
};


Template.dateDisponibilidad.helpers({
  getDateDisp(){
	  return Session.get('DateDisp');
  },

  getCocheras(){
	mydate = Session.get('DateDisp');

	Meteor.subscribe('cocheras.List');
	Meteor.subscribe('disponibilidad.List');
	cocheras = Cocheras.find( {notAvailable: { $ne: true }} ).fetch();
	var array = [];
	for (i=0;i<cocheras.length;i++){
		disp = Disponibilidad.find({cochera: cocheras[i]._id, transdate: mydate}).fetch();
		if (disp.length>0){
			if (disp[0].holder == null) {
				array[array.length] = disp[0];
			}else{
				if (thisUserAdmin()) {
					array[array.length] = disp[0];
				}
			}
		}else{

			insert.call({cId: cocheras[i]._id, cName: cocheras[i].text, uId: null, uName: null, uDate: mydate}, displayError)
			//insert.call({cId: cocheras[i]._id, cName: cocheras[i].text, uId: null, uName: null, uDate: mydate })

			disp = Disponibilidad.find({cochera: cocheras[i]._id, transdate: mydate}).fetch();
			array[array.length] = disp[0];
		}
	}
	return array;
  },

  userAdmin(){
	return (Meteor.user().emails[0].address=="admin@mail.com" || Meteor.user().emails[0].address=="super@mail.com");
  },

});

