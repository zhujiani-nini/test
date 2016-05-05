advancedAggStrategyAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('advancedAggStrategyAddCtrl',advancedAggStrategyAddCtrl);
function advancedAggStrategyAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.advancedAggStrategyAdd,$scope.data).then(function(result){
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
                             $location.url('/advancedAggStrategy');
                        });
					}
				});
            }
		});
	};
}

advancedAggStrategyUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('advancedAggStrategyUpdateCtrl',advancedAggStrategyUpdateCtrl );
function advancedAggStrategyUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.advancedAggStrategyGet,
            $routeParams.id, "advancedAggStrategy"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.advancedAggStrategyUpdate,$scope.data);
	};
}

advancedAggStrategyListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('advancedAggStrategyListCtrl',advancedAggStrategyListCtrl );
function advancedAggStrategyListCtrl (URL,$scope,CommonService) {

	var listKey  = 'advancedAggStrategyList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.advancedAggStrategyDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.advancedAggStrategyList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
