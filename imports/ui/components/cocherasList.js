import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Cocheras } from '../../api/cocheras/cocheras.js';
import { displayError } from '../lib/errors.js';
import './cochera.js';
import './cocherasList.html';


import {
  insert,
} from '../../api/cocheras/methods.js';


Template.cocherasList.helpers({


  cocheras() {
    Meteor.subscribe('cocheras.List');
    return Cocheras.find({}, { sort: {text: 1} });
  },

  userAdmin(){
	//console.log("cocheraList");
	return (Meteor.user().emails[0].address=="admin@mail.com" || Meteor.user().emails[0].address=="super@mail.com");
  },
  superUser(){
	return Meteor.user().emails[0].address=="super@mail.com";
  },

});


Template.cocherasList.events({

  'click .js-cochera-add'(event, instance) {
    instance.$('.js-cochera-new input').focus();
  },

  'submit .js-cochera-new'(event) {
    event.preventDefault();

    const $input = $(event.target).find('[type=text]');
    if (!$input.val()) {
      return;
    }

    insert.call({
      text: $input.val(),
    }, displayError);

    $input.val('');
  },

});