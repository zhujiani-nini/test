usrSubIndicatorRelateAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usrSubIndicatorRelateAddCtrl',usrSubIndicatorRelateAddCtrl);
function usrSubIndicatorRelateAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usrSubIndicatorRelateAdd,$scope.data).then(function(result){
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
                             $location.url('/usrSubIndicatorRelate');
                        });
					}
				});
            }
		});
	};
}

usrSubIndicatorRelateUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usrSubIndicatorRelateUpdateCtrl',usrSubIndicatorRelateUpdateCtrl );
function usrSubIndicatorRelateUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usrSubIndicatorRelateGet,
            $routeParams.id, "usrSubIndicatorRelate"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usrSubIndicatorRelateUpdate,$scope.data);
	};
}

usrSubIndicatorRelateListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usrSubIndicatorRelateListCtrl',usrSubIndicatorRelateListCtrl );
function usrSubIndicatorRelateListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usrSubIndicatorRelateList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usrSubIndicatorRelateDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usrSubIndicatorRelateList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
