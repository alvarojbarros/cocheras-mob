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
import { Settings } from '../../api/settings/settings.js';
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

			let mode = $('#setFunction').val();
			disp = Disponibilidad.find(query,{sort: {date: 1}} ).fetch();
			if (mode==0){
				return disp;
			}else{

				Meteor.subscribe('settings.List');
				settings = Settings.findOne({});

				/*group = {$group: {_id : { month: { $month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } }, num:  { $sum : 1} }};
				sortBy = {$sort: { _id: -1 }}
				//const handle = Meteor.subscribe('aggregate',group,query);
				//disp = handle.ready();
				Meteor.call('getAggregate',query,group,sortBy,function(error, result) {
					Session.set('getResults', result);
				});
				disp = Session.get('getResults'); */
				if (mode==1){
					return [{transdate: "Cantidad", cocheraName: disp.length, holderName: disp.length * settings.CocheraValue}]
				}else{
					result = []
					for (i=0;i<disp.length;i++){
						found = false;
						for (j=0;j<result.length;j++){
							if (result[j].transdate==disp[i].transdate){
								result[j].cocheraName = result[j].cocheraName + 1;
								result[j].holderName = result[j].cocheraName * settings.CocheraValue;
								found = true;
								j = result.length;
							}
						}
						if (!found) {
							k = result.length;
							result[k] = disp[i];
							result[k].transdate = disp[i].transdate;
							result[k].cocheraName = 1;
							result[k].holderName = settings.CocheraValue;
						}
					}
					return result;
				}

			}

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

  'input #setFunction': function (event, template) {
      Session.set("run", false);
  },

});
