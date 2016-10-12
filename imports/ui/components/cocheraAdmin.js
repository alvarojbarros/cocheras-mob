import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Cocheras } from '../../api/cocheras/cocheras.js';
import { Disponibilidad } from '../../api/disponibilidad/disponibilidad.js';
import '../../api/cocheras/methods.js';

import './cocheraAdmin.html';

import {
  setHolder,
  setFree,
} from '../../api/disponibilidad/methods.js';


Template.cocheraAdmin.events({
  'change .set-holder': function(event,template) {
	Meteor.subscribe('users.List');
	users = Meteor.users.find({ emails: { $elemMatch: { address: event.target.value } } }).fetch();
	if (users.length==1){
	    //Meteor.call('disponibilidad.setHolder', this._id,users[0]);
	    setHolder.call({ Id: this._id, userId: users[0]._id, userName: users[0].emails[0].address });
	}else{
	    //Meteor.call('disponibilidad.setFree', this._id);
	    setFree.call({ Id: this._id });
	}
  },

});

Template.cocheraAdmin.helpers({

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

});
