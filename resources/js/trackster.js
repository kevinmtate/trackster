var Trackster = {};
const API_KEY = '4089fbf883b85819697f5a60a91e3918';

$(document).ready(function() {

	search();

});

function search() {
	$('#search').click(function() {
		Trackster.searchTracksByTitle($('#input').val());
	});

	$('#input').keyup(function(event) {
		if (event.keyCode === 13) {
			$('#search').click();
		}
	});
}


/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {
	$('.tracklist').empty();

	for (i = 0; i < tracks.length; i++) {
		var track = tracks[i];
		var trackNumber = i+1;
		var mediumAlbumArt = track.image[1]['#text'];

		var htmlTrackRow = 
		"<div class='row track'> \
			<a class='col-sm-1 text-right' href="+track.url+" target='_blank'><i class='fa fa-play-circle-o fa-lg'></i></a> \
			<div class='col-sm-1 text-right'>"+trackNumber+"</div> \
			<div class='col-sm-4'>"+track.name+"</div> \
			<div class='col-sm-2'>"+track.artist+"</div> \
			<div class='col-sm-2'><img src="+mediumAlbumArt+" width='100px' alt='album art'></div> \
			<div class='col-sm-2'>"+track.listeners+"</div> \
		</div>";

		$('.tracklist').append(htmlTrackRow);
	}
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
	$.ajax({
		url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track='+title+'&api_key='+API_KEY+'&format=json',
		datatype: 'jsonp',
		success: function(data) {
			console.log(data);
			Trackster.renderTracks(data.results.trackmatches.track);
		}
	})
};