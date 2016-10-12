import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Cocheras } from '../../api/cocheras/cocheras.js';
import { Disponibilidad } from '../../api/disponibilidad/disponibilidad.js';

import '../../api/cocheras/methods.js';
import './dateTemplate.html';

import {
  setFree,
} from '../../api/disponibilidad/methods.js';


function disponibilidadId(date){
	Meteor.subscribe('disponibilidad.List');
	return Disponibilidad.find({holder: Meteor.userId(),transdate: date}).fetch()[0]._id;
};

Template.dateTemplate.events({

  'click .js-show-date': function (event) {
	Session.set('DateDisp', this.valueOf());
  	FlowRouter.go('/date');
  },

  'click .toggle-free'(event,template) {
    //Meteor.call('disponibilidad.set-free', disponibilidadId(this.valueOf()));
    setFree.call({ Id: disponibilidadId(this.valueOf())});
  },

});



Template.dateTemplate.helpers({

  getDisponibilidad(){
	Meteor.subscribe('cocheras.List');
	Meteor.subscribe('disponibilidad.List');
	cocheras = Cocheras.find( {notAvailable: { $ne: true }} ).count();
	disp = Disponibilidad.find({
		holder: { $ne: null},
		transdate: this.valueOf()}
		).count();

	return cocheras - disp;
  },

  userAdmin(){
	return (Meteor.user().emails[0].address=="admin@mail.com" || Meteor.user().emails[0].address=="super@mail.com");
  },

  isHolder(){
	Meteor.subscribe('disponibilidad.List');
	disp = Disponibilidad.find({holder: Meteor.userId(),transdate: this.valueOf()}).count();
	if (disp>0) {
		return true;
	}else{
		return false;
	}
  },

  getDisponibilidadHold(){
	Meteor.subscribe('disponibilidad.List');
	return Disponibilidad.find({holder: Meteor.userId(),transdate: this.valueOf()}).fetch()[0].cocheraName;
  },


});
