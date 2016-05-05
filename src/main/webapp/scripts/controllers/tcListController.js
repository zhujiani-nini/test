tcListAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('tcListAddCtrl',tcListAddCtrl);
function tcListAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.tcListAdd,$scope.data).then(function(result){
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
                             $location.url('/tcList');
                        });
					}
				});
            }
		});
	};
}

tcListUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('tcListUpdateCtrl',tcListUpdateCtrl );
function tcListUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.tcListGet,
            $routeParams.id, "tcList"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.tcListUpdate,$scope.data);
	};
}

tcListListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('tcListListCtrl',tcListListCtrl );
function tcListListCtrl (URL,$scope,CommonService) {

	var listKey  = 'tcListList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.tcListDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.tcListList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
