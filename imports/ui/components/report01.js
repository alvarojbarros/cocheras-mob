/* global confirm */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { $ } from 'meteor/jquery';
import { Disponibilidad } from '../../api/disponibilidad/disponibilidad.js';
import { Settings } from '../../api/settings/settings.js';
import './report01.html';

Template.report01.onCreated(function usersShowOnCreated() {
	Session.set('run', false);
});

Template.report01.helpers({

	currentDate(){
		return moment(new Date()).format("YYYY-MM-DD");
	},

	reportList(){
		if (Session.get('run')) {

			let fromDate = $('#fromDate').val();
			let toDate = $('#toDate').val();
			fd = new Date(fromDate).toISOString();
			td = new Date(toDate)
			td.setDate(td.getDate() + 1);
			td = td.toISOString();

			let usermail = $('#setHolder').val();
			query = { emails: { $elemMatch: { address: usermail } } };
			Meteor.subscribe('users.List',query);
			users = Meteor.users.find(query).fetch();

			let dStatus = $('#setStatus').val();

			let query = {};
			query.date = { $gte : new Date(fd), $lt: new Date(td) };
			if (users.length>0) { query.holder = users[0]._id };
			if (dStatus!=-1) { query.dStatus = Number(dStatus) };
			//disp = Disponibilidad.find({ date : { $gte : new Date(fd), $lt: new Date(td) } }).fetch();

			let mode = $('#setFunction').val();
			Meteor.subscribe('disponibilidad.List',query);
			disp = Disponibilidad.find(query,{sort: {date: 1}} ).fetch();
			if (mode==0){
				disp.splice(0,0,{transdate: "Fecha", cocheraName: "Cochera", holderName: "Ocupante"});
				return disp;
			}else{

				Meteor.subscribe('settings.List');
				settings = Settings.findOne({});

				if (mode==1){
					return [{transdate: "Cantidad", cocheraName: disp.length, holderName: disp.length * settings.CocheraValue}]
				}else{
					result = [];
					result[0] = {transdate: "Fecha", cocheraName: "Cochera", holderName: "Valor"};
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

  selectedHolder: function(key){
      return this.username == this.holderName ? 'selected' : '';
  },

  selectedHolder2: function(key){
      return this.username == this.holderName ? 'selected' : '';
  },

});

Template.report01.events({

  'click .run-report'() {
      Session.set('run', false);
	  Session.set('run', true);
  },

  'input #fromDate': function (event, template) {
      //Session.set("run", false);
  },

  'input #toDate': function (event, template) {
      //Session.set("run", false);
  },

  'input #setHolder': function (event, template) {
      //Session.set("run", false);
  },

  'input #setStatus': function (event, template) {
      //Session.set("run", false);
  },

  'input #setFunction': function (event, template) {
      //Session.set("run", false);
  },

});
