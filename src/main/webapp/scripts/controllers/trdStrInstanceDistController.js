trdStrInstanceDistAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrInstanceDistAddCtrl',trdStrInstanceDistAddCtrl);
function trdStrInstanceDistAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrInstanceDistAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrInstanceDist');
                        });
					}
				});
            }
		});
	};
}

trdStrInstanceDistUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrInstanceDistUpdateCtrl',trdStrInstanceDistUpdateCtrl );
function trdStrInstanceDistUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrInstanceDistGet,
            $routeParams.id, "trdStrInstanceDist"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrInstanceDistUpdate,$scope.data);
	};
}

trdStrInstanceDistListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrInstanceDistListCtrl',trdStrInstanceDistListCtrl );
function trdStrInstanceDistListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrInstanceDistList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrInstanceDistDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrInstanceDistList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
