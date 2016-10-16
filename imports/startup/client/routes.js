import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/root-redirector.js';
import '../../ui/pages/app-not-found.js';
import '../../ui/components/cocherasList.js';
import '../../ui/components/disponibilidadList.js';
import '../../ui/components/dateDisponibilidad.js';
import '../../ui/components/users-show.js';
import '../../ui/components/report01.js';
import '../../ui/components/settings.js';

// Import to override accounts templates
import '../../ui/accounts/accounts-templates.js';

FlowRouter.route('/settings', {
  name: 'Settings.show',
  action() {
    BlazeLayout.render('App_body', { main: 'settings' });
  },
});

FlowRouter.route('/report01', {
  name: 'Report01.show',
  action() {
    BlazeLayout.render('App_body', { main: 'report01' });
  },
});

FlowRouter.route('/users', {
  name: 'Users.show',
  action() {
    BlazeLayout.render('App_body', { main: 'Users_show' });
  },
});

FlowRouter.route('/cocheras', {
  name: 'Cocheras.show',
  action() {
    BlazeLayout.render('App_body', { main: 'cocherasList' });
  },
});

FlowRouter.route('/disponibilidad', {
  name: 'Disponibilidad.show',
  action() {
    BlazeLayout.render('App_body', { main: 'disponibilidadList' });
  },
});

FlowRouter.route('/date', {
  name: 'Date.show',
  action() {
    BlazeLayout.render('App_body', { main: 'dateDisponibilidad' });
  },
});

FlowRouter.route('/', {
    action: function(params) {
        Tracker.autorun(function() {
            if (!Meteor.userId()) {
              	//BlazeLayout.render('App_body', { main: 'app_rootRedirector' });
              	FlowRouter.go('signin');
            } else {
              	//BlazeLayout.render('App_body', { main: 'Bye_show' });
              	FlowRouter.go('Disponibilidad.show');
            }
        });
    },
});


// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
