tcCurrencyPairAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('tcCurrencyPairAddCtrl',tcCurrencyPairAddCtrl);
function tcCurrencyPairAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.tcCurrencyPairAdd,$scope.data).then(function(result){
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
                             $location.url('/tcCurrencyPair');
                        });
					}
				});
            }
		});
	};
}

tcCurrencyPairUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('tcCurrencyPairUpdateCtrl',tcCurrencyPairUpdateCtrl );
function tcCurrencyPairUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.tcCurrencyPairGet,
            $routeParams.id, "tcCurrencyPair"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.tcCurrencyPairUpdate,$scope.data);
	};
}

tcCurrencyPairListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('tcCurrencyPairListCtrl',tcCurrencyPairListCtrl );
function tcCurrencyPairListCtrl (URL,$scope,CommonService) {

	var listKey  = 'tcCurrencyPairList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.tcCurrencyPairDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.tcCurrencyPairList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
