var deps = {};

var lib = {
  throwError: function (errorMsg, errorCode) {
    var err = new deps.Meteor.Error(errorCode || '403', errorMsg);
    deps.Logger.error(err);
    throw err;
  },

  authorize: function (roles, userId) {
    if (!deps.Roles.userIsInRole(userId || deps.Meteor.userId(), roles)) {
      this.throwError('Unauthorized', 401);
    }
  },

  assertLoggedIn: function () {
    if (!deps.Meteor.userId()) {
      this.throwError('User is not logged in', 401);
    }
  },

  validateUserRights: function (hierarchy, userOrg) {
    if (!_.contains(hierarchy, userOrg || deps.Meteor.user().org)) {
      lib.throwError('Unauthorized', 401);
    }
  },

  getDoc: function (Collection, condition, type) {
    var doc = Collection.findOne(condition);
    if (!doc) {
      lib.throwError('No such ' + (type || 'document') + ' exists');
    }
    return doc;
  }
};

lib.init = function (context) {
  deps = context;
};

export default lib;
