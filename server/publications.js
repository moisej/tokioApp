Meteor.publish('searches', function(thisUserId){
	check(thisUserId, String);
	return Searches.find({userId: thisUserId});
});
