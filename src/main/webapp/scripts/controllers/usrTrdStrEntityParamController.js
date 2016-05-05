usrTrdStrEntityParamAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usrTrdStrEntityParamAddCtrl',usrTrdStrEntityParamAddCtrl);
function usrTrdStrEntityParamAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usrTrdStrEntityParamAdd,$scope.data).then(function(result){
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
                             $location.url('/usrTrdStrEntityParam');
                        });
					}
				});
            }
		});
	};
}

usrTrdStrEntityParamUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usrTrdStrEntityParamUpdateCtrl',usrTrdStrEntityParamUpdateCtrl );
function usrTrdStrEntityParamUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usrTrdStrEntityParamGet,
            $routeParams.id, "usrTrdStrEntityParam"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usrTrdStrEntityParamUpdate,$scope.data);
	};
}

usrTrdStrEntityParamListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usrTrdStrEntityParamListCtrl',usrTrdStrEntityParamListCtrl );
function usrTrdStrEntityParamListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usrTrdStrEntityParamList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usrTrdStrEntityParamDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usrTrdStrEntityParamList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
