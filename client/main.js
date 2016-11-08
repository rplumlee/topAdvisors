import './imports/ui/home';
import './imports/ui/login';
import './imports/ui/pro/leads';
import './imports/ui/pro/profile';
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

Router.route('/pro', {
  action: function () {
    Router.go('/pro/leads');
  }
});

Router.route('/pro/leads', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('proLeadsDashboard');
  }
});

Router.route('/pro/profile/update', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('proProfileUpdate');
  }
});

Router.route('/admin', {
  action: function () {
    Router.go('/admin/leads');
  }
});

Router.route('/admin/leads', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('adminLeads');
  }
});

Router.route('/admin/consumers', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('adminConsumers');
  }
});

// Router.route('/admin/pros/:suburl', {
//   onRun: function () {
//     window.scrollTo(0, 0);
//     this.next();
//   },
//   action: function () {
//     this.render('adminMain', { data: { base: 'pros', suburl: this.params.suburl } });
//   }
// });

Router.route('/admin/companies', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('adminCompanies');
  }
});

Router.route('/admin/pros', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('adminPros');
  }
});

// Router.route('/admin/companies/:suburl', {
//   onRun: function () {
//     window.scrollTo(0, 0);
//     this.next();
//   },
//   action: function () {
//     this.render('adminMain', { data: { base: 'companies', suburl: this.params.suburl } });
//   }
// });
