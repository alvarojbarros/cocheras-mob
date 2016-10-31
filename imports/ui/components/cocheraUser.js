import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { displayError } from '../lib/errors.js';
import { Cocheras } from '../../api/cocheras/cocheras.js';

import './cocheraUser.html';


Template.cocheraUser.events({
  'click .toggle-hold'() {
    Meteor.call('disponibilidadHold', {Id: this._id, holderId: this.holder, dS: 2},function(error, result) {}, displayError);
    FlowRouter.go('Disponibilidad.show');
  },

  'click .toggle-reserve'() {
    Meteor.call('disponibilidadHold', {Id: this._id, holderId: this.holder, dS: 2},function(error, result) {}, displayError);
    FlowRouter.go('Disponibilidad.show');
  },

  'change .set-status': function (event, template) {
	var stat = Number($(event.currentTarget).val());
	var date = new Date();
	datestr = date.toLocaleDateString()
	if (stat==0 || datestr==this.transdate) {

	    Meteor.call('disponibilidadSetSatus', {Id: this._id, dS: stat},function(error, result) {}, displayError);
	}else{
		const $input = $(event.currentTarget);
		$input.val(this.dStatus);
	};
  }

});

Template.cocheraUser.helpers({

  isFree(){
	//console.log(this);
	return (this.dStatus==0);
  },
  isToday(){
	mydate = Session.get('DateDisp');
	date = new Date();
	datestr = date.toLocaleDateString();
	if (mydate==datestr) {
		return true;
	};
	return false;

  },

  selectedStatus: function(key){
     return this.dStatus == key ? 'selected' : '';
  },

});
