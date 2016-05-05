commodityPoolAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('commodityPoolAddCtrl',commodityPoolAddCtrl);
function commodityPoolAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.commodityPoolAdd,$scope.data).then(function(result){
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
                             $location.url('/commodityPool');
                        });
					}
				});
            }
		});
	};
}

commodityPoolUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('commodityPoolUpdateCtrl',commodityPoolUpdateCtrl );
function commodityPoolUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.commodityPoolGet,
            $routeParams.id, "commodityPool"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.commodityPoolUpdate,$scope.data);
	};
}

commodityPoolListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('commodityPoolListCtrl',commodityPoolListCtrl );
function commodityPoolListCtrl (URL,$scope,CommonService) {

	var listKey  = 'commodityPoolList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.commodityPoolDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.commodityPoolList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
