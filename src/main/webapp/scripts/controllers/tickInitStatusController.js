tickInitStatusAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('tickInitStatusAddCtrl',tickInitStatusAddCtrl);
function tickInitStatusAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.tickInitStatusAdd,$scope.data).then(function(result){
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
                             $location.url('/tickInitStatus');
                        });
					}
				});
            }
		});
	};
}

tickInitStatusUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('tickInitStatusUpdateCtrl',tickInitStatusUpdateCtrl );
function tickInitStatusUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.tickInitStatusGet,
            $routeParams.id, "tickInitStatus"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.tickInitStatusUpdate,$scope.data);
	};
}

tickInitStatusListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('tickInitStatusListCtrl',tickInitStatusListCtrl );
function tickInitStatusListCtrl (URL,$scope,CommonService) {

	var listKey  = 'tickInitStatusList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.tickInitStatusDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.tickInitStatusList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
