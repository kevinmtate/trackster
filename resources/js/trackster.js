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

Trackster.renderTracks = function(tracks) {
	$('.tracklist').empty();

	let i=1;
	tracks.forEach((track) => {
		var trackNumber = i+1;
		// var trackInfo = Trackster.getTrackInfo(track.artist, track.name);
		// var album = trackInfo.track.album.title;
		// console.log(album);
		var mediumAlbumArt = track.image[1]['#text'];
		var listeners = parseInt(track.listeners).toLocaleString();

		var htmlTrackRow = 
		"<div class='row track'> \
			<div class='col-sm-1 text-center'>"+trackNumber+"</div> \
			<a class='col-sm-1 text-right' href="+track.url+" target='_blank'><i class='fa fa-play-circle-o fa-lg fa-2x'></i></a> \
			<div class='col-sm-3'>"+track.name+"</div> \
			<div class='col-sm-3'>"+track.artist+"</div> \
			<div class='col-sm-2'><img src="+mediumAlbumArt+" width='50px' alt='album art'></div> \
			<div class='col-sm-2'>"+listeners+"</div> \
		</div>";
		// <div class='col-sm-3'>"+album+"</div> \

		$('.tracklist').append(htmlTrackRow);
	});
};

Trackster.searchTracksByTitle = function(title) {
	$.ajax({
		url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track='+title+'&api_key='+API_KEY+'&format=json',
		datatype: 'jsonp',
		success: function(data) {
			console.log(data);
			Trackster.renderTracks(data.results.trackmatches.track);
		}
	});
};

// Trackster.getTrackInfo = function(artist, track) {
// 	return $.ajax({
// 		url: 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key='+API_KEY+'&artist='+artist+'&track='+track+'&format=json',
// 		datatype: 'jsonp',
// 		async: false,
// 		// success: function(data) {
// 		// 	return data;
// 		// }
// 	}).responseJSON;
// };
