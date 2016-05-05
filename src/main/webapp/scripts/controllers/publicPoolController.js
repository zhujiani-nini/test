publicPoolAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('publicPoolAddCtrl',publicPoolAddCtrl);
function publicPoolAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.publicPoolAdd,$scope.data).then(function(result){
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
                             $location.url('/publicPool');
                        });
					}
				});
            }
		});
	};
}

publicPoolUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('publicPoolUpdateCtrl',publicPoolUpdateCtrl );
function publicPoolUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.publicPoolGet,
            $routeParams.id, "publicPool"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.publicPoolUpdate,$scope.data);
	};
}

publicPoolListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('publicPoolListCtrl',publicPoolListCtrl );
function publicPoolListCtrl (URL,$scope,CommonService) {

	var listKey  = 'publicPoolList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.publicPoolDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.publicPoolList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
