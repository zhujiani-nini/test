arbStrOrderAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('arbStrOrderAddCtrl',arbStrOrderAddCtrl);
function arbStrOrderAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.arbStrOrderAdd,$scope.data).then(function(result){
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
                             $location.url('/arbStrOrder');
                        });
					}
				});
            }
		});
	};
}

arbStrOrderUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('arbStrOrderUpdateCtrl',arbStrOrderUpdateCtrl );
function arbStrOrderUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.arbStrOrderGet,
            $routeParams.id, "arbStrOrder"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.arbStrOrderUpdate,$scope.data);
	};
}

arbStrOrderListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('arbStrOrderListCtrl',arbStrOrderListCtrl );
function arbStrOrderListCtrl (URL,$scope,CommonService) {

	var listKey  = 'arbStrOrderList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.arbStrOrderDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.arbStrOrderList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
