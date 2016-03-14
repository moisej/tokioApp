Template.resultSearchList.helpers({
	venus : function(){ 	//get results of searching to display in table
		if(Meteor.user())	//if signed in -> show table
		return Venus.find();
	},
	venusList: function()	//check existing of result in order to show table
	{	
		if(Meteor.user())
		return Venus.find().fetch().length;
	}
});

Template.resultSearchList.events({
	'click #download_button': function(event) {			//button to export results in csv
  		var nameFile = 'venues.csv';					//name of fime
  		var collection = Session.get("venusLocale");	//get data from locale database, stored in session
  	
  		Meteor.call('download', collection, function(err, fileContent) {	//lfergon:exportcsv package function
    		if(fileContent){
      			var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
   			   	saveAs(blob, nameFile);
    		}
  		});
	}
});