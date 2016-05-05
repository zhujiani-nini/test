curPairAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('curPairAddCtrl',curPairAddCtrl);
function curPairAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.curPairAdd,$scope.data).then(function(result){
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
                             $location.url('/curPair');
                        });
					}
				});
            }
		});
	};
}

curPairUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('curPairUpdateCtrl',curPairUpdateCtrl );
function curPairUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.curPairGet,
            $routeParams.id, "curPair"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.curPairUpdate,$scope.data);
	};
}

curPairListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('curPairListCtrl',curPairListCtrl );
function curPairListCtrl (URL,$scope,CommonService) {

	var listKey  = 'curPairList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.curPairDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.curPairList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
