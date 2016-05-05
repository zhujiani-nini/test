usrTrdStrIndicatorParamAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usrTrdStrIndicatorParamAddCtrl',usrTrdStrIndicatorParamAddCtrl);
function usrTrdStrIndicatorParamAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usrTrdStrIndicatorParamAdd,$scope.data).then(function(result){
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
                             $location.url('/usrTrdStrIndicatorParam');
                        });
					}
				});
            }
		});
	};
}

usrTrdStrIndicatorParamUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usrTrdStrIndicatorParamUpdateCtrl',usrTrdStrIndicatorParamUpdateCtrl );
function usrTrdStrIndicatorParamUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usrTrdStrIndicatorParamGet,
            $routeParams.id, "usrTrdStrIndicatorParam"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usrTrdStrIndicatorParamUpdate,$scope.data);
	};
}

usrTrdStrIndicatorParamListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usrTrdStrIndicatorParamListCtrl',usrTrdStrIndicatorParamListCtrl );
function usrTrdStrIndicatorParamListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usrTrdStrIndicatorParamList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usrTrdStrIndicatorParamDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usrTrdStrIndicatorParamList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
