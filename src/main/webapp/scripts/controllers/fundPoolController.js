fundPoolAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('fundPoolAddCtrl',fundPoolAddCtrl);
function fundPoolAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.fundPoolAdd,$scope.data).then(function(result){
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
                             $location.url('/fundPool');
                        });
					}
				});
            }
		});
	};
}

fundPoolUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('fundPoolUpdateCtrl',fundPoolUpdateCtrl );
function fundPoolUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.fundPoolGet,
            $routeParams.id, "fundPool"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.fundPoolUpdate,$scope.data);
	};
}

fundPoolListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('fundPoolListCtrl',fundPoolListCtrl );
function fundPoolListCtrl (URL,$scope,CommonService) {

	var listKey  = 'fundPoolList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.fundPoolDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.fundPoolList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
