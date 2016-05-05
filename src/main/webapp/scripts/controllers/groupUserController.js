groupUserAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('groupUserAddCtrl',groupUserAddCtrl);
function groupUserAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.groupUserAdd,$scope.data).then(function(result){
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
                             $location.url('/groupUser');
                        });
					}
				});
            }
		});
	};
}

groupUserUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('groupUserUpdateCtrl',groupUserUpdateCtrl );
function groupUserUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.groupUserGet,
            $routeParams.id, "groupUser"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.groupUserUpdate,$scope.data);
	};
}

groupUserListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('groupUserListCtrl',groupUserListCtrl );
function groupUserListCtrl (URL,$scope,CommonService) {

	var listKey  = 'groupUserList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.groupUserDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.groupUserList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
