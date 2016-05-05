advancedAggEntityAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('advancedAggEntityAddCtrl',advancedAggEntityAddCtrl);
function advancedAggEntityAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.advancedAggEntityAdd,$scope.data).then(function(result){
			if(result['success']){
				CommonService.confirmPop({
					msg: "是否继续添加？",
					okBtn: "是",
					cancelBtn: "否",
					okCallBack: function () {
						$scope.$apply(function () {
                             $scope.data = {};
                        });
					},
					cancelCallBack: function () {
						$scope.$apply(function () {
                             $location.url('/advancedAggEntity');
                        });
					}
				});
            }
		});
	};
}

advancedAggEntityUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('advancedAggEntityUpdateCtrl',advancedAggEntityUpdateCtrl );
function advancedAggEntityUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.advancedAggEntityGet,
            $routeParams.id, "advancedAggEntity"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.advancedAggEntityUpdate,$scope.data);
	};
}

advancedAggEntityListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('advancedAggEntityListCtrl',advancedAggEntityListCtrl );
function advancedAggEntityListCtrl (URL,$scope,CommonService) {

	var listKey  = 'advancedAggEntityList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.advancedAggEntityDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.advancedAggEntityList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
