indicatorLineAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('indicatorLineAddCtrl',indicatorLineAddCtrl);
function indicatorLineAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.indicatorLineAdd,$scope.data).then(function(result){
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
                             $location.url('/indicatorLine');
                        });
					}
				});
            }
		});
	};
}

indicatorLineUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('indicatorLineUpdateCtrl',indicatorLineUpdateCtrl );
function indicatorLineUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.indicatorLineGet,
            $routeParams.id, "indicatorLine"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.indicatorLineUpdate,$scope.data);
	};
}

indicatorLineListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('indicatorLineListCtrl',indicatorLineListCtrl );
function indicatorLineListCtrl (URL,$scope,CommonService) {

	var listKey  = 'indicatorLineList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.indicatorLineDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.indicatorLineList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
