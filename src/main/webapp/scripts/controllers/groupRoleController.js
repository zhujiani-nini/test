groupRoleAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('groupRoleAddCtrl',groupRoleAddCtrl);
function groupRoleAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.groupRoleAdd,$scope.data).then(function(result){
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
                             $location.url('/groupRole');
                        });
					}
				});
            }
		});
	};
}

groupRoleUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('groupRoleUpdateCtrl',groupRoleUpdateCtrl );
function groupRoleUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.groupRoleGet,
            $routeParams.id, "groupRole"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.groupRoleUpdate,$scope.data);
	};
}

groupRoleListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('groupRoleListCtrl',groupRoleListCtrl );
function groupRoleListCtrl (URL,$scope,CommonService) {

	var listKey  = 'groupRoleList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.groupRoleDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.groupRoleList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
