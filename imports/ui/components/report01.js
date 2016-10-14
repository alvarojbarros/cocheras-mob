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
import { Disponibilidad } from '../../api/disponibilidad/disponibilidad.js';
import './report01.html';
import './report01item.js';

Template.report01.onCreated(function usersShowOnCreated() {
	Session.set('run', false);
});

Template.report01.helpers({

	currentDate(){
		return moment(new Date()).format("YYYY-MM-DD");
	},

	reportList(){
		if (Session.get('run')) {
			Meteor.subscribe('disponibilidad.List');

			let fromDate = $('#fromDate').val();
			let toDate = $('#toDate').val();
			fd = new Date(fromDate).toISOString();
			td = new Date(toDate)
			td.setDate(td.getDate() + 1);
			td = td.toISOString();

			let usermail = $('#setHolder').val();
			Meteor.subscribe('users.List');
			users = Meteor.users.find({ emails: { $elemMatch: { address: usermail } } }).fetch();

			let dStatus = $('#setStatus').val();

			let query = {};
			query.date = { $gte : new Date(fd), $lt: new Date(td) };
			if (users.length>0) { query.holder = users[0]._id };
			if (dStatus!=-1) { query.dStatus = Number(dStatus) };
			//disp = Disponibilidad.find({ date : { $gte : new Date(fd), $lt: new Date(td) } }).fetch();

			disp = Disponibilidad.find(query).fetch();
			return disp;
		}
	},

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

  selectedHolder: function(key){
      return this.username == this.holderName ? 'selected' : '';
  },

  selectedHolder2: function(key){
      return this.username == this.holderName ? 'selected' : '';
  },

});

Template.report01.events({

  'click .run-report'() {
	  Session.set('run', true);
  },

  'input #fromDate': function (event, template) {
      Session.set("run", false);
  },

  'input #toDate': function (event, template) {
      Session.set("run", false);
  },

  'input #setHolder': function (event, template) {
      Session.set("run", false);
  },

  'input #setStatus': function (event, template) {
      Session.set("run", false);
  },

});
