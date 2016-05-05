resourcesAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('resourcesAddCtrl',resourcesAddCtrl);
function resourcesAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.resourcesAdd,$scope.data).then(function(result){
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
                             $location.url('/resources');
                        });
					}
				});
            }
		});
	};
}

resourcesUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('resourcesUpdateCtrl',resourcesUpdateCtrl );
function resourcesUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.resourcesGet,
            $routeParams.id, "resources"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.resourcesUpdate,$scope.data);
	};
}

resourcesListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('resourcesListCtrl',resourcesListCtrl );
function resourcesListCtrl (URL,$scope,CommonService) {

	var listKey  = 'resourcesList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.resourcesDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.resourcesList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
