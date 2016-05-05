tickStatusAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('tickStatusAddCtrl',tickStatusAddCtrl);
function tickStatusAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.tickStatusAdd,$scope.data).then(function(result){
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
                             $location.url('/tickStatus');
                        });
					}
				});
            }
		});
	};
}

tickStatusUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('tickStatusUpdateCtrl',tickStatusUpdateCtrl );
function tickStatusUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.tickStatusGet,
            $routeParams.id, "tickStatus"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.tickStatusUpdate,$scope.data);
	};
}

tickStatusListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('tickStatusListCtrl',tickStatusListCtrl );
function tickStatusListCtrl (URL,$scope,CommonService) {

	var listKey  = 'tickStatusList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.tickStatusDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.tickStatusList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
