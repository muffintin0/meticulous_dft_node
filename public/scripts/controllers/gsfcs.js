'use strict';

//help function
var MDftHelper = MDftHelper || {}

MDftHelper.band_gap = function(gsfc_job){
		var alpha_gap = gsfc_job.alpha_lumo - gsfc_job.alpha_homo;
		var beta_gap = gsfc_job.beta_lumo - gsfc_job.beta_homo;
		var band_gap
		if (alpha_gap < beta_gap) band_gap = alpha_gap.toFixed(5);
		else band_gap = beta_gap.toFixed(4);
		gsfc_job.band_gap = band_gap;
}

MDftHelper.spin_contamination = function(gsfc_job){
		gsfc_job.spin_contamination = ((1- (gsfc_job.unrestricted_spin_guess/gsfc_job.unrestricted_spin_real))*100).toFixed(1);
}

MDftHelper.format_decimal = function(val,num){
		return parseFloat(val).toFixed(num); 
}

function GsfcCtrl($scope,$filter,Gsfc){
	$scope.gsfc_jobs = Gsfc.query(function(){
		$.each($scope.gsfc_jobs, function(index,gsfc_job){
			MDftHelper.band_gap(gsfc_job);
			MDftHelper.spin_contamination(gsfc_job);
		});	
		$scope.search();
	});
			
	$scope.format_decimal = MDftHelper.format_decimal;
		
	$scope.sortingOrder = 'unique_name';
	$scope.searchAttributes = ['unique_name', 'cluster', 'moleclue', 'site_type', 'spin', 'scfe_energy',
		'total_force', 'band_gap', 'spin_contamination'];
	$scope.reverse = false;
	$scope.filteredItems = [];
	$scope.itemsPerPage = 30;
	$scope.paged_gsfc_jobs = [];
	$scope.currentPage = 0;
	
	
	var searchMatch = function(haystack, needle){
		if (!needle){
			return true;
		}
		return String(haystack).toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	}
	
	$scope.search = function(){
		
		$scope.filteredItems = $filter('filter')($scope.gsfc_jobs,function(item){
			for ( var i=0 ; i<$scope.searchAttributes.length; i++){
				if (searchMatch(item[$scope.searchAttributes[i]],$scope.query_gsfc)) return true; 
			}
			return false;
		});
		if ($scope.sortingOrder !== ""){
			$scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
		}
	
		$scope.currentPage = 0;
		$scope.groupToPages();
	}
	
	$scope.groupToPages = function(){
		$scope.paged_gsfc_jobs = [];
		for (var i=0; i<$scope.filteredItems.length; i++){
			if (i%$scope.itemsPerPage === 0){
				$scope.paged_gsfc_jobs[Math.floor(i/$scope.itemsPerPage)] = [$scope.filteredItems[i]];
			} else {
				$scope.paged_gsfc_jobs[Math.floor(i/$scope.itemsPerPage)].push($scope.filteredItems[i]);
			}
		}
	}
	
	$scope.range = function(start,end){
		var ret = [];
		if (!end){
			end = start;
			start = 0;
		}
		for (var i=start; i<end; i++){
			ret.push(i);
		}
		return ret;
	}
	
	$scope.prevPage = function(){
		if ($scope.currentPage >0){
			$scope.currentPage--;
		}
	}
	
	$scope.nextPage = function(){
		if ($scope.currentPage < $scope.paged_gsfc_jobs -1 ){
			$scope.currentPage++;
		}
	}
	
	$scope.setPage = function(pageNumber){
		$scope.currentPage = pageNumber;
	}
	
	$scope.sort_by = function(order){
		if ($scope.sortingOrder = order){
			$scope.reverse = !$scope.reverse;
		} else {
			$scope.sortingOrder = order;
		}
		$scope.search();
		
		$('th i').each(function(){
			$(this).removeClass().addClass('icon-sort');
		});
		
		if($scope.reverse){
			$('th#'+order+' i').removeClass().addClass('icon-chevron-up');
		} else {
			$('th#'+order+' i').removeClass().addClass('icon-chevron-down');
		}
	}
	
}


function GsfcDetailCtrl($scope, $routeParams, Gsfc){
	$scope.gsfc_job = Gsfc.get({id: $routeParams.id},function(gsfc_job){
		MDftHelper.band_gap(gsfc_job);
		MDftHelper.spin_contamination(gsfc_job);
	});	
	$scope.format_decimal = MDftHelper.format_decimal;
}

