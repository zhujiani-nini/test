tcBalanceAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('tcBalanceAddCtrl',tcBalanceAddCtrl);
function tcBalanceAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.tcBalanceAdd,$scope.data).then(function(result){
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
                             $location.url('/tcBalance');
                        });
					}
				});
            }
		});
	};
}

tcBalanceUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('tcBalanceUpdateCtrl',tcBalanceUpdateCtrl );
function tcBalanceUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.tcBalanceGet,
            $routeParams.id, "tcBalance"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.tcBalanceUpdate,$scope.data);
	};
}

tcBalanceListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('tcBalanceListCtrl',tcBalanceListCtrl );
function tcBalanceListCtrl (URL,$scope,CommonService) {

	var listKey  = 'tcBalanceList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.tcBalanceDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.tcBalanceList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
