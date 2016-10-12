import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';

import './user-item.html';

import { displayError } from '../lib/errors.js';

Template.User_item.helpers({

});

Template.User_item.events({

  'click .js-show-user': function (event) {
  	//alert(this.username);
  	//alert(this._id);
  },

});
