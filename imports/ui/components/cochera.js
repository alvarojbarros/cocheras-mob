import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { TAPi18n } from 'meteor/tap:i18n';
import { displayError } from '../lib/errors.js';
import { Cocheras } from '../../api/cocheras/cocheras.js';

import './cochera.html';


Template.cochera.events({
  'mousedown .js-delete-item, click .js-delete-item'() {
	Meteor.call('cocheraRemove',{cocheraId: this._id},function(error, result) {}, displayError);
  },
  'change .set-owner': function(event,template) {
	query = { emails: { $elemMatch: { address: event.target.value } } };
	Meteor.subscribe('users.List',query);
	users = Meteor.users.find(query).fetch();
	if (users.length==1){
		  Meteor.call('cocheraSetOwner',{cocheraId: this._id, userId:users[0]._id, userName:users[0].emails[0].address}
		  ,function(error, result) {}, displayError);
	}else{
		  Meteor.call('cocheraSetOwner',{cocheraId: this._id},function(error, result) {}, displayError);
	}
  },

  'change .set-available': function(event,template) {
	  if (event.target.value) {
		  Meteor.call('cocheraSetNotAvailable',{cocheraId: this._id},function(error, result) {}, displayError);
	  }else{
		  Meteor.call('cocheraSetAvailable',{cocheraId: this._id},function(error, result) {}, displayError);
	  }
  },

  'change .set-propType': function (event, template) {
	var propType = $(event.currentTarget).val();
	Meteor.call('cocheraSetPropType',{cocheraId: this._id,pType: propType},function(error, result) {}, displayError);
  }


});

Template.cochera.helpers({

  userList(){
	Meteor.subscribe('users.List',{});
	users = Meteor.users.find({}).fetch();
	for (i=0;i<users.length;i++)
	{
		users[i].username = users[i].emails[0].address;
		users[i].text = this.text;
		users[i].holderName = this.holderName;
		users[i].ownerName = this.ownerName;
	}
	return users;
  },

  selectedOwner: function(key){
     return this.username == this.ownerName ? 'selected' : '';
  },
  selectedAvailable: function(key){
     return this.notAvailable ? 'selected' : '';
  },
  selectedPropType: function(key){
     return this.propType == key ? 'selected' : '';
  },


});
