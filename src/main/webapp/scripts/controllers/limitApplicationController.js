limitApplicationAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('limitApplicationAddCtrl',limitApplicationAddCtrl);
function limitApplicationAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.limitApplicationAdd,$scope.data).then(function(result){
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
                             $location.url('/limitApplication');
                        });
					}
				});
            }
		});
	};
}

limitApplicationUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('limitApplicationUpdateCtrl',limitApplicationUpdateCtrl );
function limitApplicationUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.limitApplicationGet,
            $routeParams.id, "limitApplication"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.limitApplicationUpdate,$scope.data);
	};
}

limitApplicationListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('limitApplicationListCtrl',limitApplicationListCtrl );
function limitApplicationListCtrl (URL,$scope,CommonService) {

	var listKey  = 'limitApplicationList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.limitApplicationDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.limitApplicationList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
