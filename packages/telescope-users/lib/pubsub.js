////////////////////////////////////
// Publications and Subscriptions //
////////////////////////////////////

/**
 * Users pub/sub configs and methods
 * @namespace Users.pubsub
 */
Users.pubsub = {};

/**
 * Default user object fields in publication
 * @type {Object}
 */
Users.pubsub.publicProperties = { // true means exposed
  _id: true,
  createdAt: true,
  username: true,
  'services.twitter.profile_image_url': true,
  'services.twitter.profile_image_url_https': true,
  'services.facebook.id': true,
  'services.twitter.screenName': true,
  'services.github.screenName': true, // Github is not really used, but there are some mentions to it in the code
  'telescope.commentCount': true,
  'telescope.emailHash': true,
  'telescope.isInvited': true,
  'telescope.karma': true,
  'telescope.postCount': true,
  'telescope.slug': true,
  'telescope.displayName': true,
  'telescope.notifications': true,
  'telescope.bio': true,
  'telescope.github': true,
  'telescope.site': true,
  'telescope.twitter': true,
  'telescope.downvotedComments': true,
  'telescope.downvotedPosts': true,
  'telescope.upvotedComments': true,
  'telescope.upvotedPosts': true
};

/**
 * Options for your own user account (for security reasons, block certain properties)
 * @type {Object}
 */
Users.pubsub.hiddenProperties = {
  'services.password.bcrypt': false
};

/**
 * Minimum required properties to display avatars and display names
 * @type {Object}
 */
Users.pubsub.avatarProperties = {
  _id: true,
  'telescope.emailHash': true,
  'telescope.slug': true,
  'telescope.displayName': true,
  username: true,
  'profile.username': true,
  'profile.github': true,
  'profile.twitter': true,
  'services.twitter.profile_image_url': true,
  'services.twitter.profile_image_url_https': true,
  'services.facebook.id': true,
  'services.twitter.screenName': true,
  'services.github.screenName': true, // Github is not really used, but there are some mentions to it in the code
};


/**
 * Build Users subscription with filter, sort, and limit args.
 * @param {String} filterBy
 * @param {String} sortBy
 * @param {Number} limit
 */
Users.pubsub.getSubParams = function(filterBy, sortBy, limit) {
  var find = {},
      sort = {createdAt: -1};

  switch(filterBy){
    case 'invited':
      // consider admins as invited
      find = { $or: [{ isInvited: true }, { isAdmin: true }]};
      break;
    case 'uninvited':
      find = { $and: [{ isInvited: false }, { isAdmin: false }]};
      break;
    case 'admin':
      find = { isAdmin: true };
      break;
  }

  switch(sortBy){
    case 'username':
      sort = { username: 1 };
      break;
    case 'karma':
      sort = { karma: -1 };
      break;
    case 'postCount':
      sort = { postCount: -1 };
      break;
    case 'commentCount':
      sort = { commentCount: -1 };
      break;
    case 'invitedCount':
      sort = { invitedCount: -1 };
  }
  return {
    find: find,
    options: { sort: sort, limit: limit }
  };
};
