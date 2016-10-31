import { Cocheras } from '../../api/cocheras/cocheras.js';
import { Disponibilidad } from '../../api/disponibilidad/disponibilidad.js';
import { displayError } from '../lib/errors.js';
import './dateTemplate.html';


function disponibilidadId(date){
	query = {holder: Meteor.userId(),transdate: date};
	Meteor.subscribe('disponibilidad.List',query);
	return Disponibilidad.find(query).fetch()[0]._id;
};

Template.dateTemplate.events({

  'click .js-show-date': function (event) {
	Session.set('DateDisp', this.valueOf());
  	FlowRouter.go('/date');
  },

  'click .toggle-free'(event,template) {
	Meteor.call('disponibilidadSetFree', {Id: disponibilidadId(this.valueOf())},function(error, result) {}, displayError);
  },

  'click .toggle-hold'() {
	Meteor.call('disponibilidadSetSatus', {Id: disponibilidadId(this.valueOf()), dS: 2},function(error, result) {}, displayError);
  },


});



Template.dateTemplate.helpers({

  getDisponibilidad(){
	query1 = {notAvailable: { $ne: true }} ;
	Meteor.subscribe('cocheras.List',query1);
	cocheras = Cocheras.find(query1).count();

	query = {holder: { $ne: null},transdate: this.valueOf()};
	Meteor.subscribe('disponibilidad.List',query);
	disp = Disponibilidad.find(query).count();
	res = cocheras - disp;
	if (res<0) {
		res = 0;
	}
	return res;
  },

  userAdmin(){
	//console.log("dateTemplate");
	return (Meteor.user().emails[0].address=="admin@mail.com" || Meteor.user().emails[0].address=="super@mail.com");
  },

  isHolder(){
	query = {holder: Meteor.userId(),transdate: this.valueOf()};
	Meteor.subscribe('disponibilidad.List',query);
	disp = Disponibilidad.find(query).count();
	if (disp>0) {
		return true;
	}else{
		return false;
	}
  },

  getDisponibilidadHold(){
	query = {holder: Meteor.userId(),transdate: this.valueOf()};
	Meteor.subscribe('disponibilidad.List',query);
	disp = Disponibilidad.findOne(query);
	return disp.cocheraName;
  },

  isReserved(){
	query = {holder: Meteor.userId(),transdate: this.valueOf()};
	Meteor.subscribe('disponibilidad.List',query);
	disp = Disponibilidad.findOne(query);
	if (disp.dStatus==1){
		return true;
	}
	return false;
  },

  isToday(){
	date = new Date();
	date0 = date.toLocaleDateString();
	if (date0==this){
		return true;
	}
	return false;
  },


});
