import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker'
import './navbar.html';
import './footer.html';
import './contact_us.html';
import './for_pros.html';
import './how_it_works.html';
import './about.html';

Template.staticContactUs.onRendered(function () {
  $(document).ready(function () {
    materialKitDemo.initContactUs2Map();
  });

});
