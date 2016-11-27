import './imports/ui/login';
import './imports/ui/pro';
import './imports/ui/pro/leads';
import './imports/ui/pro/profile';
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
    Router.go('/home');
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

Router.route('/pro/profile', {
  action: function () {
    Router.go('/pro/profile/update');
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

Router.route('/admin/companies/new', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('adminCompanyInner', { data: { id: null } });
  }
});

Router.route('/admin/companies/:id', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('adminCompanyInner', { data: { id: this.params.id } });
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

Router.route('/admin/pros/new', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('adminProInner', { data: { id: null } });
  }
});

Router.route('/admin/pros/:id', {
  onRun: function () {
    window.scrollTo(0, 0);
    this.next();
  },
  action: function () {
    this.render('adminProInner', { data: { id: this.params.id } });
  }
});

//
// Static Pages
//
// Router.route('/for_pros', {
//   onRun: function () {
//     window.scrollTo(0, 0);
//     this.next();
//   },
//   action: function () {
//     this.render('staticProNew');
//   }
// });
