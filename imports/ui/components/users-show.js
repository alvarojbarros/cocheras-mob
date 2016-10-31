/* global confirm */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { TAPi18n } from 'meteor/tap:i18n';

import './users-show.html';

import './user-item.js';

Template.Users_show.onCreated(function usersShowOnCreated() {

});

Template.Users_show.helpers({

  userList(){
	if (Meteor.user().emails[0].address=="super@mail.com"){
		Meteor.subscribe('users.List',{});
		users = Meteor.users.find({}).fetch();
		for (i=0;i<users.length;i++)
		{
			users[i].username = users[i].emails[0].address;
		}
		return users;
	}else{
		return [];
	};
  },

});

Template.Users_show.events({
});
