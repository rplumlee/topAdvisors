import '../imports/ui/home.js';
import '../imports/ui/login.js';
import '../imports/ui/dashboard.js';

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
