trdAccOpListAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdAccOpListAddCtrl',trdAccOpListAddCtrl);
function trdAccOpListAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdAccOpListAdd,$scope.data).then(function(result){
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
                             $location.url('/trdAccOpList');
                        });
					}
				});
            }
		});
	};
}

trdAccOpListUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdAccOpListUpdateCtrl',trdAccOpListUpdateCtrl );
function trdAccOpListUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdAccOpListGet,
            $routeParams.id, "trdAccOpList"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdAccOpListUpdate,$scope.data);
	};
}

trdAccOpListListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdAccOpListListCtrl',trdAccOpListListCtrl );
function trdAccOpListListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdAccOpListList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdAccOpListDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdAccOpListList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
