
var increasePostClicks = function(postId, ip){

  var clickEvent = {
    name: 'click',
    properties: {
      postId: postId,
      ip: ip
    }
  };

  // make sure this IP hasn't previously clicked on this post
  var existingClickEvent = Events.findOne({name: 'click', 'properties.postId': postId, 'properties.ip': ip});

  if(!existingClickEvent){
    Events.log(clickEvent);
    Posts.update(postId, { $inc: { clickCount: 1 }});
  }
};


Meteor.startup(function (){

  // Link Out

  Router.route('/out', {
    name: 'out',
    where: 'server',
    action: function(){
      var query = this.request.query;
      if(query.url){ // for some reason, query.url doesn't need to be decoded
        var post = Posts.findOne({url: query.url});
        if (post) {
          var ip = this.request.connection.remoteAddress;
          increasePostClicks(post._id, ip);
          this.response.writeHead(302, {'Location': query.url});
        } else {
          // don't redirect if we can't find a post for that link
          this.response.write('Invalid URL');
        }
        this.response.end();
      }
    }
  });

  // Account approved email

  Router.route('/email/account-approved/:id?', {
    name: 'accountApproved',
    where: 'server',
    action: function() {
      var user = Meteor.users.findOne(this.params.id);
      var emailProperties = {
        profileUrl: Users.getProfileUrl(user),
        username: Users.getUserName(user),
        siteTitle: Settings.get('title'),
        siteUrl: Telescope.utils.getSiteUrl()
      };
      var html = Handlebars.templates.emailAccountApproved(emailProperties);
      this.response.write(Telescope.email.buildTemplate(html));
      this.response.end();
    }
  });

});
