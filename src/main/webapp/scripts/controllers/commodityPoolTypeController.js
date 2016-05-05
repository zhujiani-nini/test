commodityPoolTypeAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('commodityPoolTypeAddCtrl',commodityPoolTypeAddCtrl);
function commodityPoolTypeAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.commodityPoolTypeAdd,$scope.data).then(function(result){
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
                             $location.url('/commodityPoolType');
                        });
					}
				});
            }
		});
	};
}

commodityPoolTypeUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('commodityPoolTypeUpdateCtrl',commodityPoolTypeUpdateCtrl );
function commodityPoolTypeUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.commodityPoolTypeGet,
            $routeParams.id, "commodityPoolType"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.commodityPoolTypeUpdate,$scope.data);
	};
}

commodityPoolTypeListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('commodityPoolTypeListCtrl',commodityPoolTypeListCtrl );
function commodityPoolTypeListCtrl (URL,$scope,CommonService) {

	var listKey  = 'commodityPoolTypeList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.commodityPoolTypeDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.commodityPoolTypeList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
