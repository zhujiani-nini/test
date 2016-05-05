bidTickSnapTrdStrOrderRelateAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('bidTickSnapTrdStrOrderRelateAddCtrl',bidTickSnapTrdStrOrderRelateAddCtrl);
function bidTickSnapTrdStrOrderRelateAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.bidTickSnapTrdStrOrderRelateAdd,$scope.data).then(function(result){
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
                             $location.url('/bidTickSnapTrdStrOrderRelate');
                        });
					}
				});
            }
		});
	};
}

bidTickSnapTrdStrOrderRelateUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('bidTickSnapTrdStrOrderRelateUpdateCtrl',bidTickSnapTrdStrOrderRelateUpdateCtrl );
function bidTickSnapTrdStrOrderRelateUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.bidTickSnapTrdStrOrderRelateGet,
            $routeParams.id, "bidTickSnapTrdStrOrderRelate"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.bidTickSnapTrdStrOrderRelateUpdate,$scope.data);
	};
}

bidTickSnapTrdStrOrderRelateListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('bidTickSnapTrdStrOrderRelateListCtrl',bidTickSnapTrdStrOrderRelateListCtrl );
function bidTickSnapTrdStrOrderRelateListCtrl (URL,$scope,CommonService) {

	var listKey  = 'bidTickSnapTrdStrOrderRelateList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.bidTickSnapTrdStrOrderRelateDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.bidTickSnapTrdStrOrderRelateList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
