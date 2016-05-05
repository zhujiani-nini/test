strIndicatorParamAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('strIndicatorParamAddCtrl',strIndicatorParamAddCtrl);
function strIndicatorParamAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.strIndicatorParamAdd,$scope.data).then(function(result){
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
                             $location.url('/strIndicatorParam');
                        });
					}
				});
            }
		});
	};
}

strIndicatorParamUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('strIndicatorParamUpdateCtrl',strIndicatorParamUpdateCtrl );
function strIndicatorParamUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.strIndicatorParamGet,
            $routeParams.id, "strIndicatorParam"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.strIndicatorParamUpdate,$scope.data);
	};
}

strIndicatorParamListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('strIndicatorParamListCtrl',strIndicatorParamListCtrl );
function strIndicatorParamListCtrl (URL,$scope,CommonService) {

	var listKey  = 'strIndicatorParamList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.strIndicatorParamDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.strIndicatorParamList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
