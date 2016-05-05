groupsAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('groupsAddCtrl',groupsAddCtrl);
function groupsAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.groupsAdd,$scope.data).then(function(result){
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
                             $location.url('/groups');
                        });
					}
				});
            }
		});
	};
}

groupsUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('groupsUpdateCtrl',groupsUpdateCtrl );
function groupsUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.groupsGet,
            $routeParams.id, "groups"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.groupsUpdate,$scope.data);
	};
}

groupsListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('groupsListCtrl',groupsListCtrl );
function groupsListCtrl (URL,$scope,CommonService) {

	var listKey  = 'groupsList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.groupsDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.groupsList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
