import './users-show.html';

import './user-item.js';

Template.Users_show.onCreated(function usersShowOnCreated() {

});

Template.Users_show.helpers({

  userList(){
	if (Meteor.user().emails[0].address=="super@mail.com"){
		Meteor.subscribe('users.List',{});
		users = Meteor.users.find({}).fetch();
		for (i=0;i<users.length;i++)
		{
			users[i].username = users[i].emails[0].address;
		}
		return users;
	}else{
		return [];
	};
  },

});

Template.Users_show.events({
});
