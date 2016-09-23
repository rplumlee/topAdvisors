import './imports/ui/home';
import './imports/ui/login';
import './imports/ui/dashboard';
import './imports/ui/admin';
import './imports/ui/admin/leads';
import './imports/ui/admin/pros';
import './imports/ui/admin/companies';
import './imports/ui/admin/consumers';

Router.route('/', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('myHome');
  }
});

Router.route('/login', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('myLogin');
  }
});

Router.route('/dashboard', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('myDashboard');
  }
});

Router.route('/admin', {
  action: function () {
    Router.go('/admin/leads');
  }
});

Router.route('/admin/:path', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('adminSidebar', { data: { path: this.params.path } });
  }
});

Router.route('/admin/pros/:action', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('adminSidebar', { data: { action: this.params.action } });
  }
});
