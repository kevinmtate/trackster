var Trackster = {};
const API_KEY = '4089fbf883b85819697f5a60a91e3918';

$(document).ready(function() {

	$('#search').click(function() {
		Trackster.searchTracksByTitle($('#input').val());
	});

});


/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+title+'&api_key='+API_KEY+'&format=json',
		datatype: 'jsonp',
		success: function(data) {
			console.log(data);
		}
	})
};