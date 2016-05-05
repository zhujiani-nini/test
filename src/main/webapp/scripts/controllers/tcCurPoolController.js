tcCurPoolAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('tcCurPoolAddCtrl',tcCurPoolAddCtrl);
function tcCurPoolAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.tcCurPoolAdd,$scope.data).then(function(result){
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
                             $location.url('/tcCurPool');
                        });
					}
				});
            }
		});
	};
}

tcCurPoolUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('tcCurPoolUpdateCtrl',tcCurPoolUpdateCtrl );
function tcCurPoolUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.tcCurPoolGet,
            $routeParams.id, "tcCurPool"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.tcCurPoolUpdate,$scope.data);
	};
}

tcCurPoolListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('tcCurPoolListCtrl',tcCurPoolListCtrl );
function tcCurPoolListCtrl (URL,$scope,CommonService) {

	var listKey  = 'tcCurPoolList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.tcCurPoolDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.tcCurPoolList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
