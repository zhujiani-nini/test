indicatorAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('indicatorAddCtrl',indicatorAddCtrl);
function indicatorAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.indicatorAdd,$scope.data).then(function(result){
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
                             $location.url('/indicator');
                        });
					}
				});
            }
		});
	};
}

indicatorUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('indicatorUpdateCtrl',indicatorUpdateCtrl );
function indicatorUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.indicatorGet,
            $routeParams.id, "indicator"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.indicatorUpdate,$scope.data);
	};
}

indicatorListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('indicatorListCtrl',indicatorListCtrl );
function indicatorListCtrl (URL,$scope,CommonService) {

	var listKey  = 'indicatorList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.indicatorDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.indicatorList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
