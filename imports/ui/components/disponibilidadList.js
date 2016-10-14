import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './disponibilidadList.html';
import './dateTemplate.js';

function NewDate(days)
{
    var dat = new Date();
    dat.setDate(dat.getDate() + days);
    return dat;
}


Template.disponibilidadList.helpers({
  dateList(){
	date0 = moment(NewDate(0)).format("DD/MM/YYYY");
	date1 = moment(NewDate(1)).format("DD/MM/YYYY");
	date2 = moment(NewDate(2)).format("DD/MM/YYYY");
	date3 = moment(NewDate(3)).format("DD/MM/YYYY");
	date4 = moment(NewDate(4)).format("DD/MM/YYYY");
	var dates = [date0, date1, date2, date3, date4]
	//var dates = [date0];
	return dates;
  },

});


Template.disponibilidadList.events({
});
