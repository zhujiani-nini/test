menuRoleAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('menuRoleAddCtrl',menuRoleAddCtrl);
function menuRoleAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.menuRoleAdd,$scope.data).then(function(result){
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
                             $location.url('/menuRole');
                        });
					}
				});
            }
		});
	};
}

menuRoleUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('menuRoleUpdateCtrl',menuRoleUpdateCtrl );
function menuRoleUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.menuRoleGet,
            $routeParams.id, "menuRole"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.menuRoleUpdate,$scope.data);
	};
}

menuRoleListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('menuRoleListCtrl',menuRoleListCtrl );
function menuRoleListCtrl (URL,$scope,CommonService) {

	var listKey  = 'menuRoleList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.menuRoleDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.menuRoleList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
