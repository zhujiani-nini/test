resourceRoleAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('resourceRoleAddCtrl',resourceRoleAddCtrl);
function resourceRoleAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.resourceRoleAdd,$scope.data).then(function(result){
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
                             $location.url('/resourceRole');
                        });
					}
				});
            }
		});
	};
}

resourceRoleUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('resourceRoleUpdateCtrl',resourceRoleUpdateCtrl );
function resourceRoleUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.resourceRoleGet,
            $routeParams.id, "resourceRole"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.resourceRoleUpdate,$scope.data);
	};
}

resourceRoleListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('resourceRoleListCtrl',resourceRoleListCtrl );
function resourceRoleListCtrl (URL,$scope,CommonService) {

	var listKey  = 'resourceRoleList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.resourceRoleDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.resourceRoleList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
