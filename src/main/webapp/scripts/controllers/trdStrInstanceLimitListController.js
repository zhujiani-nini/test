trdStrInstanceLimitListAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrInstanceLimitListAddCtrl',trdStrInstanceLimitListAddCtrl);
function trdStrInstanceLimitListAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrInstanceLimitListAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrInstanceLimitList');
                        });
					}
				});
            }
		});
	};
}

trdStrInstanceLimitListUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrInstanceLimitListUpdateCtrl',trdStrInstanceLimitListUpdateCtrl );
function trdStrInstanceLimitListUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrInstanceLimitListGet,
            $routeParams.id, "trdStrInstanceLimitList"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrInstanceLimitListUpdate,$scope.data);
	};
}

trdStrInstanceLimitListListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrInstanceLimitListListCtrl',trdStrInstanceLimitListListCtrl );
function trdStrInstanceLimitListListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrInstanceLimitListList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrInstanceLimitListDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrInstanceLimitListList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
