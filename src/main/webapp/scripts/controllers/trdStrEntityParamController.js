trdStrEntityParamAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrEntityParamAddCtrl',trdStrEntityParamAddCtrl);
function trdStrEntityParamAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrEntityParamAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrEntityParam');
                        });
					}
				});
            }
		});
	};
}

trdStrEntityParamUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrEntityParamUpdateCtrl',trdStrEntityParamUpdateCtrl );
function trdStrEntityParamUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrEntityParamGet,
            $routeParams.id, "trdStrEntityParam"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrEntityParamUpdate,$scope.data);
	};
}

trdStrEntityParamListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrEntityParamListCtrl',trdStrEntityParamListCtrl );
function trdStrEntityParamListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrEntityParamList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrEntityParamDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrEntityParamList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
