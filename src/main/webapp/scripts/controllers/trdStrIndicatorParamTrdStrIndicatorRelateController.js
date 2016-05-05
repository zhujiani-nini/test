trdStrIndicatorParamTrdStrIndicatorRelateAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrIndicatorParamTrdStrIndicatorRelateAddCtrl',trdStrIndicatorParamTrdStrIndicatorRelateAddCtrl);
function trdStrIndicatorParamTrdStrIndicatorRelateAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrIndicatorParamTrdStrIndicatorRelateAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrIndicatorParamTrdStrIndicatorRelate');
                        });
					}
				});
            }
		});
	};
}

trdStrIndicatorParamTrdStrIndicatorRelateUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrIndicatorParamTrdStrIndicatorRelateUpdateCtrl',trdStrIndicatorParamTrdStrIndicatorRelateUpdateCtrl );
function trdStrIndicatorParamTrdStrIndicatorRelateUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrIndicatorParamTrdStrIndicatorRelateGet,
            $routeParams.id, "trdStrIndicatorParamTrdStrIndicatorRelate"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrIndicatorParamTrdStrIndicatorRelateUpdate,$scope.data);
	};
}

trdStrIndicatorParamTrdStrIndicatorRelateListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrIndicatorParamTrdStrIndicatorRelateListCtrl',trdStrIndicatorParamTrdStrIndicatorRelateListCtrl );
function trdStrIndicatorParamTrdStrIndicatorRelateListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrIndicatorParamTrdStrIndicatorRelateList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrIndicatorParamTrdStrIndicatorRelateDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrIndicatorParamTrdStrIndicatorRelateList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
