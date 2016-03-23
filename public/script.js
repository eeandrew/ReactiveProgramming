$(document).ready(function(){
	var REQUEST_URL = 'http://localhost:8000/users';

	var refreshClickStream = Rx.Observable.fromEvent($('.refresh-btn'),'click');

	var requestStream = refreshClickStream
	.startWith('start click')
	.map(function(){
		return REQUEST_URL;
	});

	var responseStream = requestStream.flatMap(function(url){
		return Rx.Observable.fromPromise($.getJSON(url))
	});

	responseStream.subscribe(function(resp){
		console.log(resp);
	});

});