usrStrIndicatorParamUsrStrIndicatorRelateAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usrStrIndicatorParamUsrStrIndicatorRelateAddCtrl',usrStrIndicatorParamUsrStrIndicatorRelateAddCtrl);
function usrStrIndicatorParamUsrStrIndicatorRelateAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usrStrIndicatorParamUsrStrIndicatorRelateAdd,$scope.data).then(function(result){
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
                             $location.url('/usrStrIndicatorParamUsrStrIndicatorRelate');
                        });
					}
				});
            }
		});
	};
}

usrStrIndicatorParamUsrStrIndicatorRelateUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usrStrIndicatorParamUsrStrIndicatorRelateUpdateCtrl',usrStrIndicatorParamUsrStrIndicatorRelateUpdateCtrl );
function usrStrIndicatorParamUsrStrIndicatorRelateUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usrStrIndicatorParamUsrStrIndicatorRelateGet,
            $routeParams.id, "usrStrIndicatorParamUsrStrIndicatorRelate"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usrStrIndicatorParamUsrStrIndicatorRelateUpdate,$scope.data);
	};
}

usrStrIndicatorParamUsrStrIndicatorRelateListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usrStrIndicatorParamUsrStrIndicatorRelateListCtrl',usrStrIndicatorParamUsrStrIndicatorRelateListCtrl );
function usrStrIndicatorParamUsrStrIndicatorRelateListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usrStrIndicatorParamUsrStrIndicatorRelateList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usrStrIndicatorParamUsrStrIndicatorRelateDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usrStrIndicatorParamUsrStrIndicatorRelateList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
