snapExchangerQueueAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('snapExchangerQueueAddCtrl',snapExchangerQueueAddCtrl);
function snapExchangerQueueAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.snapExchangerQueueAdd,$scope.data).then(function(result){
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
                             $location.url('/snapExchangerQueue');
                        });
					}
				});
            }
		});
	};
}

snapExchangerQueueUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('snapExchangerQueueUpdateCtrl',snapExchangerQueueUpdateCtrl );
function snapExchangerQueueUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.snapExchangerQueueGet,
            $routeParams.id, "snapExchangerQueue"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.snapExchangerQueueUpdate,$scope.data);
	};
}

snapExchangerQueueListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('snapExchangerQueueListCtrl',snapExchangerQueueListCtrl );
function snapExchangerQueueListCtrl (URL,$scope,CommonService) {

	var listKey  = 'snapExchangerQueueList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.snapExchangerQueueDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.snapExchangerQueueList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
