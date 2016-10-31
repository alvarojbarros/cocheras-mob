import { Cocheras } from '../../api/cocheras/cocheras.js';
import { Disponibilidad } from '../../api/disponibilidad/disponibilidad.js';

import './dateDisponibilidad.html';
import './cocheraUser.js';
import './cocheraAdmin.js';

function thisUserAdmin(){
	return (Meteor.user().emails[0].address=="admin@mail.com" || Meteor.user().emails[0].address=="super@mail.com");
};


Template.dateDisponibilidad.helpers({
  getDateDisp(){
	  return Session.get('DateDisp');
  },

  getCocheras(){
	mydate = Session.get('DateDisp');
	/*date = Session.get('DateDisp');
	Meteor.call('getCocherasDisponibilidad',{mydate: date},function(error, result) {
		Session.set("CocherasDisp",result);
	});
	return Session.get("CocherasDisp"); */

	query = {notAvailable: { $ne: true }} ;
	Meteor.subscribe('cocheras.List',query);
	cocheras = Cocheras.find(query).fetch();
	var array = [];
	for (i=0;i<cocheras.length;i++){
		query1 = {cochera: cocheras[i]._id, transdate: mydate};
		Meteor.subscribe('disponibilidad.List',query1);
		disp = Disponibilidad.find(query1).fetch();
		if (disp.length>0){
			if (disp[0].holder == null) {
				array[array.length] = disp[0];
			}else{
				if (thisUserAdmin()) {
					array[array.length] = disp[0];
				}
			}
		}else{
			Meteor.call('disponibilidadInsert',{cId: cocheras[i]._id, cName: cocheras[i].text, uId: null, uName: null, uDate: mydate });
			disp = Disponibilidad.find({cochera: cocheras[i]._id, transdate: mydate}).fetch();
			array[array.length] = disp[0];
		}
	}
	return array;
  },

  userAdmin(){
	return (Meteor.user().emails[0].address=="admin@mail.com" || Meteor.user().emails[0].address=="super@mail.com");
  },

});

