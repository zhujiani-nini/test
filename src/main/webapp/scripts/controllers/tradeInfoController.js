tradeInfoAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('tradeInfoAddCtrl',tradeInfoAddCtrl);
function tradeInfoAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.tradeInfoAdd,$scope.data).then(function(result){
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
                             $location.url('/tradeInfo');
                        });
					}
				});
            }
		});
	};
}

tradeInfoUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('tradeInfoUpdateCtrl',tradeInfoUpdateCtrl );
function tradeInfoUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.tradeInfoGet,
            $routeParams.id, "tradeInfo"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.tradeInfoUpdate,$scope.data);
	};
}

tradeInfoListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('tradeInfoListCtrl',tradeInfoListCtrl );
function tradeInfoListCtrl (URL,$scope,CommonService) {

	var listKey  = 'tradeInfoList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.tradeInfoDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.tradeInfoList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
