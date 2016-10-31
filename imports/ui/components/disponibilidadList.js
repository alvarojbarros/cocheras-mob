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
	date0 = NewDate(0).toLocaleDateString();
	date1 = NewDate(1).toLocaleDateString();
	date2 = NewDate(2).toLocaleDateString();
	date3 = NewDate(3).toLocaleDateString();
	date4 = NewDate(4).toLocaleDateString();
	var dates = [date0, date1, date2, date3, date4]
	//var dates = [date0];
	return dates;
  },

});


Template.disponibilidadList.events({
});
