indicatorTypeAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('indicatorTypeAddCtrl',indicatorTypeAddCtrl);
function indicatorTypeAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.indicatorTypeAdd,$scope.data).then(function(result){
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
                             $location.url('/indicatorType');
                        });
					}
				});
            }
		});
	};
}

indicatorTypeUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('indicatorTypeUpdateCtrl',indicatorTypeUpdateCtrl );
function indicatorTypeUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.indicatorTypeGet,
            $routeParams.id, "indicatorType"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.indicatorTypeUpdate,$scope.data);
	};
}

indicatorTypeListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('indicatorTypeListCtrl',indicatorTypeListCtrl );
function indicatorTypeListCtrl (URL,$scope,CommonService) {

	var listKey  = 'indicatorTypeList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.indicatorTypeDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.indicatorTypeList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
