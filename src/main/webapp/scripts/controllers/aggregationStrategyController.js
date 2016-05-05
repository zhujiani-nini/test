aggregationStrategyAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('aggregationStrategyAddCtrl',aggregationStrategyAddCtrl);
function aggregationStrategyAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.aggregationStrategyAdd,$scope.data).then(function(result){
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
                             $location.url('/aggregationStrategy');
                        });
					}
				});
            }
		});
	};
}

aggregationStrategyUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('aggregationStrategyUpdateCtrl',aggregationStrategyUpdateCtrl );
function aggregationStrategyUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.aggregationStrategyGet,
            $routeParams.id, "aggregationStrategy"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.aggregationStrategyUpdate,$scope.data);
	};
}

aggregationStrategyListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('aggregationStrategyListCtrl',aggregationStrategyListCtrl );
function aggregationStrategyListCtrl (URL,$scope,CommonService) {

	var listKey  = 'aggregationStrategyList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.aggregationStrategyDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.aggregationStrategyList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
