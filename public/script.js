$(document).ready(function(){
	var REQUEST_URL = 'http://localhost:8000/users';

	var refreshClickStream = Rx.Observable.fromEvent($('.refresh-btn'),'click');

	var close1ClickStream = Rx.Observable.fromEvent($('.close'),'click')

	var requestStream = refreshClickStream
	.startWith('start click')
	.map(function(){
		return REQUEST_URL;
	});

	var responseStream = requestStream.flatMap(function(url){
		return Rx.Observable.fromPromise($.getJSON(url))
	});

	var suggestion1Stream = close1ClickStream
	.startWith('startup click')
	.combineLatest(responseStream,function(click,listUsers){
		return listUsers[Math.floor(Math.random()*listUsers.length)];
	})
	.merge(refreshClickStream.map(function(){
		return null
	}))
	.startWith(null)

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
		var closeDom = $('<span class="close">X</span>');
		if($('.user-list > .list-item').eq(index).length > 0) {
			$('.user-list > .list-item').eq(index).html(user.login);
			$('.user-list > .list-item').eq(index).append(closeDom);
		}else {
			var listDom = $('<div class="list-item"></div>');
			listDom.html(user.login);
			listDom.append(closeDom);
			$('.user-list').append(listDom);
		}
	}

});