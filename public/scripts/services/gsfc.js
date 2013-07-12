
angular.module("gsfcServices",["ngResource"]).factory('Gsfc',function($resource){
	return $resource('/gsfcjobs/:id',{id: "@id"},
			{update:{method:"PUT"}});
});
