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

import './lists-show.html';

import { displayError } from '../lib/errors.js';

Template.Lists_show.onCreated(function listShowOnCreated() {

});

Template.Lists_show.helpers({
});

Template.Lists_show.events({
});
