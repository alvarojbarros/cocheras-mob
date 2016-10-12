import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Cocheras } from '../../api/cocheras/cocheras.js';
import '../../api/cocheras/methods.js';

import './cocheraUser.html';

import {
  hold,
} from '../../api/disponibilidad/methods.js';

Template.cocheraUser.events({
  'click .toggle-hold'() {
    //Meteor.call('disponibilidad.hold', this._id, this.holder);
    hold.call({Id: this._id, holderId: this.holder});
    FlowRouter.go('Disponibilidad.show');
  },

});

Template.cocheraUser.helpers({

  isFree(){
	return !this.holder;
  },

});
