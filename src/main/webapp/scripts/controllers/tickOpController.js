tickOpAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('tickOpAddCtrl',tickOpAddCtrl);
function tickOpAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.tickOpAdd,$scope.data).then(function(result){
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
                             $location.url('/tickOp');
                        });
					}
				});
            }
		});
	};
}

tickOpUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('tickOpUpdateCtrl',tickOpUpdateCtrl );
function tickOpUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.tickOpGet,
            $routeParams.id, "tickOp"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.tickOpUpdate,$scope.data);
	};
}

tickOpListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('tickOpListCtrl',tickOpListCtrl );
function tickOpListCtrl (URL,$scope,CommonService) {

	var listKey  = 'tickOpList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.tickOpDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.tickOpList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
