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

  authorizeAdmin: function (param) {
    var user = param || Meteor.user();
    if (user.profile.type === 'pro') {
      this.throwError('Forbidden', 403);
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
  context.lib = lib;
};

export default lib;
