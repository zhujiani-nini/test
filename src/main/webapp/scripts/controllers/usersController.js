usersAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usersAddCtrl',usersAddCtrl);
function usersAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usersAdd,$scope.data).then(function(result){
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
                             $location.url('/users');
                        });
					}
				});
            }
		});
	};
}

usersUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usersUpdateCtrl',usersUpdateCtrl );
function usersUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usersGet,
            $routeParams.id, "users"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usersUpdate,$scope.data);
	};
}

usersListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usersListCtrl',usersListCtrl );
function usersListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usersList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usersDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usersList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
