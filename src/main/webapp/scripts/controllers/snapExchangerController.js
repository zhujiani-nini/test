snapExchangerAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('snapExchangerAddCtrl',snapExchangerAddCtrl);
function snapExchangerAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.snapExchangerAdd,$scope.data).then(function(result){
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
                             $location.url('/snapExchanger');
                        });
					}
				});
            }
		});
	};
}

snapExchangerUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('snapExchangerUpdateCtrl',snapExchangerUpdateCtrl );
function snapExchangerUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.snapExchangerGet,
            $routeParams.id, "snapExchanger"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.snapExchangerUpdate,$scope.data);
	};
}

snapExchangerListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('snapExchangerListCtrl',snapExchangerListCtrl );
function snapExchangerListCtrl (URL,$scope,CommonService) {

	var listKey  = 'snapExchangerList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.snapExchangerDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.snapExchangerList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
