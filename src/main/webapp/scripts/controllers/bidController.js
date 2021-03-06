bidAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('bidAddCtrl',bidAddCtrl);
function bidAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.bidAdd,$scope.data).then(function(result){
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
                             $location.url('/bid');
                        });
					}
				});
            }
		});
	};
}

bidUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('bidUpdateCtrl',bidUpdateCtrl );
function bidUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.bidGet,
            $routeParams.id, "bid"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.bidUpdate,$scope.data);
	};
}

bidListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('bidListCtrl',bidListCtrl );
function bidListCtrl (URL,$scope,CommonService) {

	var listKey  = 'bidList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.bidDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.bidList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
