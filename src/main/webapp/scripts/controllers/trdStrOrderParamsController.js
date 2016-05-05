trdStrOrderParamsAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrOrderParamsAddCtrl',trdStrOrderParamsAddCtrl);
function trdStrOrderParamsAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrOrderParamsAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrOrderParams');
                        });
					}
				});
            }
		});
	};
}

trdStrOrderParamsUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrOrderParamsUpdateCtrl',trdStrOrderParamsUpdateCtrl );
function trdStrOrderParamsUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrOrderParamsGet,
            $routeParams.id, "trdStrOrderParams"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrOrderParamsUpdate,$scope.data);
	};
}

trdStrOrderParamsListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrOrderParamsListCtrl',trdStrOrderParamsListCtrl );
function trdStrOrderParamsListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrOrderParamsList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrOrderParamsDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrOrderParamsList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
