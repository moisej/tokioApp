Searches = new Mongo.Collection('searches');	

Meteor.methods({
	searchInsert: function(searchAttributes)		//insert history log into database
	{

		check(this.userId, String);
		check(searchAttributes, String);

		var User = Meteor.user();

		var temp_obj = {
			userId: User._id,
			query: searchAttributes,
			lat: "35.71",
			lng: "139.73",
			radius: "15km",
			submitted: new Date()
		};

		Searches.insert(temp_obj);
	}
});

