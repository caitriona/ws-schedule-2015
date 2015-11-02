var app = angular.module('scheduleApp',[]);

app.controller('scheduleCtrl',function($scope, $http, $filter) {
	$http.get('https://api.cilabs.net/v1/conferences/ws15/timeslots').success(function(data) {
		$scope.event_items = data.filter($filter('prepData'));
	});
});

app.filter('prepData', function () {
    return function (item) {
		
		item.stage = item.location.name;
		
		var event_date = new Date(item.start_time.replace(/-/g, '/'));
		item.event_date = event_date;
		
		var event_day = event_date.getDate();
		item.event_day = event_day;
		
		var now = new Date();
		
		return event_date >= now;
    };
});

app.filter('groupBy', function () {
	return function (collection, key) {
		if (collection === null || angular.isUndefined(collection)){
			return;
		}
		return uniqueItems(collection, key);
	};
});

var uniqueItems = function (data, key) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var value = data[i][key];
        if (result.indexOf(value) == -1) {
			result.push(value);
        }
    }
    return result;
};


