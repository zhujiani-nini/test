fundPoolLimitManageAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('fundPoolLimitManageAddCtrl',fundPoolLimitManageAddCtrl);
function fundPoolLimitManageAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.fundPoolLimitManageAdd,$scope.data).then(function(result){
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
                             $location.url('/fundPoolLimitManage');
                        });
					}
				});
            }
		});
	};
}

fundPoolLimitManageUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('fundPoolLimitManageUpdateCtrl',fundPoolLimitManageUpdateCtrl );
function fundPoolLimitManageUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.fundPoolLimitManageGet,
            $routeParams.id, "fundPoolLimitManage"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.fundPoolLimitManageUpdate,$scope.data);
	};
}

fundPoolLimitManageListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('fundPoolLimitManageListCtrl',fundPoolLimitManageListCtrl );
function fundPoolLimitManageListCtrl (URL,$scope,CommonService) {

	var listKey  = 'fundPoolLimitManageList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.fundPoolLimitManageDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.fundPoolLimitManageList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
