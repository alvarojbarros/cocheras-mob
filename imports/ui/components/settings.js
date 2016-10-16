import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Settings } from '../../api/settings/settings.js';
import { displayError } from '../lib/errors.js';

import './settings.html';

import {
  update,
  insert,
} from '../../api/settings/methods.js';



function getSettings() {
    Meteor.subscribe('settings.List');
	settings = Settings.findOne({});
    return settings;
};

Template.settings.helpers({

  getCocheraValor(){
	settings = getSettings();
	if (settings){
		s = settings.CocheraValue + "";
		return s;
	}
	return "";
  },


});


Template.settings.events({

  'submit .js-settings'(event) {
    event.preventDefault();

    const $input = $(event.target).find('[type=text]');

    if (!$input.val()) {
      return;
    }

	f = parseFloat($input.val());

	settings = getSettings();
	if (settings) {
		update.call({
		  Id: settings._id,
		  valor: f,
		}, displayError);
	}else{
		insert.call({
		  valor: f,
		}, displayError);
	};

    /*update.call({
      text: $input.val(),
    }, displayError); */

  },

});