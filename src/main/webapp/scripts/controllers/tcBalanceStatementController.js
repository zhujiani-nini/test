tcBalanceStatementAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('tcBalanceStatementAddCtrl',tcBalanceStatementAddCtrl);
function tcBalanceStatementAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.tcBalanceStatementAdd,$scope.data).then(function(result){
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
                             $location.url('/tcBalanceStatement');
                        });
					}
				});
            }
		});
	};
}

tcBalanceStatementUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('tcBalanceStatementUpdateCtrl',tcBalanceStatementUpdateCtrl );
function tcBalanceStatementUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.tcBalanceStatementGet,
            $routeParams.id, "tcBalanceStatement"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.tcBalanceStatementUpdate,$scope.data);
	};
}

tcBalanceStatementListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('tcBalanceStatementListCtrl',tcBalanceStatementListCtrl );
function tcBalanceStatementListCtrl (URL,$scope,CommonService) {

	var listKey  = 'tcBalanceStatementList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.tcBalanceStatementDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.tcBalanceStatementList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
