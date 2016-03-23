$(document).ready(function(){
	var REQUEST_URL = 'http://localhost:8000/users';

	var startupRequestStream = Rx.Observable.just(REQUEST_URL);

	var refreshClickStream = Rx.Observable.fromEvent($('.refresh-btn'),'click');

	var requestOnRefreshStream = refreshClickStream.map(function(){
		return REQUEST_URL;
	});

	var requestStream = Rx.Observable.merge(startupRequestStream,requestOnRefreshStream);

	var responseStream = requestStream.flatMap(function(url){
		return Rx.Observable.fromPromise($.getJSON(url))
	});

	responseStream.subscribe(function(resp){
		console.log(resp);
	});

	


});