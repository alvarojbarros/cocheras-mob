import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Cocheras } from '../../api/cocheras/cocheras.js';
import { Disponibilidad } from '../../api/disponibilidad/disponibilidad.js';
import '../../api/cocheras/methods.js';
import { displayError } from '../lib/errors.js';

import './cocheraAdmin.html';

import {
  setHolder,
  setFree,
  setStatus,
} from '../../api/disponibilidad/methods.js';


Template.cocheraAdmin.events({
  'change .set-holder': function(event,template) {
	query = { emails: { $elemMatch: { address: event.target.value } } };
	Meteor.subscribe('users.List', query);
	users = Meteor.users.find(query).fetch();
	if (users.length==1){
	    //Meteor.call('disponibilidad.setHolder', this._id,users[0]);
	    setHolder.call({ Id: this._id, userId: users[0]._id, userName: users[0].emails[0].address });
	}else{
	    //Meteor.call('disponibilidad.setFree', this._id);
	    setFree.call({ Id: this._id });
	}
  },

  'change .set-status': function (event, template) {
	var stat = Number($(event.currentTarget).val());
	var date = new Date();
	datestr = date.toLocaleDateString()
	if (stat==0 || datestr==this.transdate) {
		setStatus.call({Id: this._id, dS: stat}, displayError);
	}else{
		const $input = $(event.currentTarget);
		$input.val(this.dStatus);
	};
  }

});

Template.cocheraAdmin.helpers({

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
	  //console.log(this);
      return this.username == this.holderName ? 'selected' : '';
  },

  selectedHolder2: function(key){
      return this.username == this.holderName ? 'selected' : '';
  },

  selectedStatus: function(key){
     return this.dStatus == key ? 'selected' : '';
  },


});
