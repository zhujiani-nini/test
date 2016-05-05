commodityPoolStatementAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('commodityPoolStatementAddCtrl',commodityPoolStatementAddCtrl);
function commodityPoolStatementAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.commodityPoolStatementAdd,$scope.data).then(function(result){
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
                             $location.url('/commodityPoolStatement');
                        });
					}
				});
            }
		});
	};
}

commodityPoolStatementUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('commodityPoolStatementUpdateCtrl',commodityPoolStatementUpdateCtrl );
function commodityPoolStatementUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.commodityPoolStatementGet,
            $routeParams.id, "commodityPoolStatement"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.commodityPoolStatementUpdate,$scope.data);
	};
}

commodityPoolStatementListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('commodityPoolStatementListCtrl',commodityPoolStatementListCtrl );
function commodityPoolStatementListCtrl (URL,$scope,CommonService) {

	var listKey  = 'commodityPoolStatementList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.commodityPoolStatementDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.commodityPoolStatementList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
