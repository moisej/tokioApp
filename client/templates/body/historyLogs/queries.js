Template.queries.helpers({
	resultsExist : function()	//check if there are history logs in order to show table
	{
		return Searches.find().fetch().length;
	},
	results : function()		//get logs	
	{
		return Searches.find();
	}
});

Template.queries.events({
	'click #delete_button': function(){		//pressed icon of trash to delete history log
		Searches.remove({'_id':this._id});
	}
});