curAccAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('curAccAddCtrl',curAccAddCtrl);
function curAccAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.curAccAdd,$scope.data).then(function(result){
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
                             $location.url('/curAcc');
                        });
					}
				});
            }
		});
	};
}

curAccUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('curAccUpdateCtrl',curAccUpdateCtrl );
function curAccUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.curAccGet,
            $routeParams.id, "curAcc"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.curAccUpdate,$scope.data);
	};
}

curAccListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('curAccListCtrl',curAccListCtrl );
function curAccListCtrl (URL,$scope,CommonService) {

	var listKey  = 'curAccList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.curAccDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.curAccList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
