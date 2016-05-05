curListAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('curListAddCtrl',curListAddCtrl);
function curListAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.curListAdd,$scope.data).then(function(result){
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
                             $location.url('/curList');
                        });
					}
				});
            }
		});
	};
}

curListUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('curListUpdateCtrl',curListUpdateCtrl );
function curListUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.curListGet,
            $routeParams.id, "curList"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.curListUpdate,$scope.data);
	};
}

curListListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('curListListCtrl',curListListCtrl );
function curListListCtrl (URL,$scope,CommonService) {

	var listKey  = 'curListList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.curListDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.curListList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
