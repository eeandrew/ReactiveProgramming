$(document).ready(function(){
	var REQUEST_URL = 'https://api.github.com/users';

	var refreshClickStream = Rx.Observable.fromEvent($('.refresh-btn'),'click');

	var requestStream = refreshClickStream
	.startWith('start click')
	.map(function(){
		return REQUEST_URL;
	});

	var responseStream = requestStream.flatMap(function(url){
		return Rx.Observable.fromPromise($.getJSON(url))
	});

	var suggestion1Stream = responseStream.map(function(listUsers){
		return listUsers[Math.floor(Math.random()*listUsers.length)];
	}).merge(refreshClickStream.map(function(){
		return null;
	}));

	var suggestion2Stream = responseStream.map(function(listUsers){
		return listUsers[Math.floor(Math.random()*listUsers.length)];
	}).merge(refreshClickStream.map(function(){
		return null;
	}));

	var suggestion3Stream = responseStream.map(function(listUsers){
		return listUsers[Math.floor(Math.random()*listUsers.length)];
	}).merge(refreshClickStream.map(function(){
		return null;
	}));

	suggestion1Stream.subscribe(function(user){
		if(user) {
			updateItem(user,0);
		}else {

		}
	});

	suggestion2Stream.subscribe(function(user){
		if(user) {
			updateItem(user,1);
		}else {

		}
	});


	suggestion3Stream.subscribe(function(user){
		if(user) {
			updateItem(user,2);
		}else {

		}
	});

	function updateItem(user,index) {
		if($('.user-list > .list-item').eq(index).length > 0) {
			$('.user-list > .list-item').eq(index).html(user.login);
		}else {
			var listDom = $('<div class="list-item"></div>');
			listDom.html(user.login);
			$('.user-list').append(listDom);
		}
	}

});