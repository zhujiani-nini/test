trdStrIndicatorParamAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrIndicatorParamAddCtrl',trdStrIndicatorParamAddCtrl);
function trdStrIndicatorParamAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrIndicatorParamAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrIndicatorParam');
                        });
					}
				});
            }
		});
	};
}

trdStrIndicatorParamUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrIndicatorParamUpdateCtrl',trdStrIndicatorParamUpdateCtrl );
function trdStrIndicatorParamUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrIndicatorParamGet,
            $routeParams.id, "trdStrIndicatorParam"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrIndicatorParamUpdate,$scope.data);
	};
}

trdStrIndicatorParamListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrIndicatorParamListCtrl',trdStrIndicatorParamListCtrl );
function trdStrIndicatorParamListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrIndicatorParamList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrIndicatorParamDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrIndicatorParamList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
