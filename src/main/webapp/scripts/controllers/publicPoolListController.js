publicPoolListAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('publicPoolListAddCtrl',publicPoolListAddCtrl);
function publicPoolListAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.publicPoolListAdd,$scope.data).then(function(result){
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
                             $location.url('/publicPoolList');
                        });
					}
				});
            }
		});
	};
}

publicPoolListUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('publicPoolListUpdateCtrl',publicPoolListUpdateCtrl );
function publicPoolListUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.publicPoolListGet,
            $routeParams.id, "publicPoolList"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.publicPoolListUpdate,$scope.data);
	};
}

publicPoolListListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('publicPoolListListCtrl',publicPoolListListCtrl );
function publicPoolListListCtrl (URL,$scope,CommonService) {

	var listKey  = 'publicPoolListList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.publicPoolListDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.publicPoolListList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
