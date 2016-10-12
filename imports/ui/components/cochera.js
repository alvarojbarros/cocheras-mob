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

import {
  remove,
  setOwner,
  setNotOwner,
  setNotAvailable,
  setAvailable,
} from '../../api/cocheras/methods.js';


Template.cochera.events({
  'mousedown .js-delete-item, click .js-delete-item'() {

    remove.call({cocheraId: this._id,}, displayError);

    //Meteor.call('cocheras.remove', this._id);
  },
  'change .set-owner': function(event,template) {
	//users = Meteor.users.find({ "email.address": event.target.value}).fetch();
	Meteor.subscribe('users.List');
	users = Meteor.users.find({ emails: { $elemMatch: { address: event.target.value } } }).fetch();
	if (users.length==1){
	    //Meteor.call('cochera.setOwner', this._id,users[0]);
	    setOwner.call({cocheraId: this._id, userId:users[0]._id, userName:users[0].emails[0].address}, displayError);
	}else{
	    //Meteor.call('cochera.setNotOwner', this._id);
	    setNotOwner.call({cocheraId: this._id,}, displayError);
	}
  },

  'change .set-available': function(event,template) {
	  if (event.target.value) {
	  	//Meteor.call('cochera.setNotAvailable', this._id);
	    setNotAvailable.call({cocheraId: this._id,}, displayError);
	  }else{
	  	//Meteor.call('cochera.setAvailable', this._id);
	    setAvailable.call({cocheraId: this._id,}, displayError);
	  }
  },

});

Template.cochera.helpers({

  userList(){
	Meteor.subscribe('users.List');
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

});
