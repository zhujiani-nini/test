usrIndicatorAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usrIndicatorAddCtrl',usrIndicatorAddCtrl);
function usrIndicatorAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usrIndicatorAdd,$scope.data).then(function(result){
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
                             $location.url('/usrIndicator');
                        });
					}
				});
            }
		});
	};
}

usrIndicatorUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usrIndicatorUpdateCtrl',usrIndicatorUpdateCtrl );
function usrIndicatorUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usrIndicatorGet,
            $routeParams.id, "usrIndicator"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usrIndicatorUpdate,$scope.data);
	};
}

usrIndicatorListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usrIndicatorListCtrl',usrIndicatorListCtrl );
function usrIndicatorListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usrIndicatorList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usrIndicatorDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usrIndicatorList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
