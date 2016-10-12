/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Disponibilidad } from '../disponibilidad.js';

Meteor.publish('disponibilidad.List', function() {
  return Disponibilidad.find({});
});
