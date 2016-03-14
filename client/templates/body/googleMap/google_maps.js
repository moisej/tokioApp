Template.googleMap.onRendered(function(){
			Mapbox.load();
			Tracker.autorun(function () {
			if (Mapbox.loaded()) {
						//init map 
						L.mapbox.accessToken = "pk.eyJ1IjoiZG1vaXNlaiIsImEiOiJjaWxtMjNkM2MwMDMzN2xtNGx3c2R6eHZkIn0.7ksE0b-VGtbVlxUALn7xpg";
						map = L.mapbox.map("map", "dmoisej.5ff19d2f").setView([35.68, 139.76], 13);
			}
			});
});

Template.googleMap.helpers({
	//check if signed in
	logIn: function()
	{
		if(Meteor.user())
			return true;
		return false;
	}
});

Template.googleMap.events({
	'keypress #venue_queue' : function(event, template){	//pressed enter on search field

		if(event.keyCode === 13)
		{
			params = {										//params of searching
				ll: "35.71, 139.73",						//coordinates
				query:template.$('#venue_queue').val(),		//inserted value
				radius: 15000								//radius
			}

			markers = template.markers;						//store in template

			Venus.remove({});								//clear local database of previous results before new search 

			if(markers)										//if there are old markers, clear them
			{
				map.removeLayer(markers);
			}

			markers = new L.layerGroup();					//New group of markers
			
			Foursquare.find(params, function(error, result)	//searching places
			{
				if(!error)
				{	
					if(result.response.venues.length === 0)
					{
						alert("Sorry, nothing found");
					}
					else
					{ 	
						queryResult = result.response.venues;
						queryResult.forEach(function(venues, index){
							name = venues.name;
							city = venues.location.city;
							state = venues.location.state;
							street = venues.location.address;
							latitude = venues.location.lat;
							longitude = venues.location.lng;

							var latlng = L.latLng(latitude, longitude);

							var marker = new L.marker(latlng, {
								icon: L.mapbox.marker.icon({
									'marker-color': '#BE9A6B',
									'marker-symbol': 'circle',
									'marker-size': 'large'
								})
							}).bindPopup('<strong>'+name+'</strong>');

							markers.addLayer(marker);

							var newPlace = {
								name : name,
								city : city,
								state : state,
								street : street,
								latitude : latitude,
								longitude : longitude
							}
							Venus.insert(newPlace);			//insert result in local database
						});
						Session.set("venusLocale", Venus.find().fetch());	//save results to the session in order to export csv of them
						template.markers = markers;			//save new markers
						map.addLayer(markers);				//add marker to the map
					}

					Meteor.call("searchInsert", params.query); //insert query in MongoDB to show log
					
				}
			});	
		}
	}
});
