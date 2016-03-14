Meteor.methods({	//lfergon:exportcsv package method
	download: function(c)
	{
		var collection = c;
		var heading = true;
		var delimeter = ";";
		return exportcsv.exportToCSV(collection, heading, delimeter);
	}
});