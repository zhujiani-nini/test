fundPoolListAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('fundPoolListAddCtrl',fundPoolListAddCtrl);
function fundPoolListAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.fundPoolListAdd,$scope.data).then(function(result){
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
                             $location.url('/fundPoolList');
                        });
					}
				});
            }
		});
	};
}

fundPoolListUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('fundPoolListUpdateCtrl',fundPoolListUpdateCtrl );
function fundPoolListUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.fundPoolListGet,
            $routeParams.id, "fundPoolList"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.fundPoolListUpdate,$scope.data);
	};
}

fundPoolListListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('fundPoolListListCtrl',fundPoolListListCtrl );
function fundPoolListListCtrl (URL,$scope,CommonService) {

	var listKey  = 'fundPoolListList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.fundPoolListDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.fundPoolListList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
