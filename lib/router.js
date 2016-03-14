Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
  	var user = Meteor.user();
  		if(Meteor.user())
  		{
  	  	return [Meteor.subscribe('searches', Meteor.userId())];
  		}
  		
	}
});

Router.route('/', {name: 'mainPage'});