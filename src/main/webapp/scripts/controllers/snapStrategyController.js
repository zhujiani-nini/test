snapStrategyAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('snapStrategyAddCtrl',snapStrategyAddCtrl);
function snapStrategyAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.snapStrategyAdd,$scope.data).then(function(result){
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
                             $location.url('/snapStrategy');
                        });
					}
				});
            }
		});
	};
}

snapStrategyUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('snapStrategyUpdateCtrl',snapStrategyUpdateCtrl );
function snapStrategyUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.snapStrategyGet,
            $routeParams.id, "snapStrategy"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.snapStrategyUpdate,$scope.data);
	};
}

snapStrategyListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('snapStrategyListCtrl',snapStrategyListCtrl );
function snapStrategyListCtrl (URL,$scope,CommonService) {

	var listKey  = 'snapStrategyList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.snapStrategyDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.snapStrategyList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
