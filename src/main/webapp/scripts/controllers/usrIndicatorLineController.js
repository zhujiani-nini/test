usrIndicatorLineAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usrIndicatorLineAddCtrl',usrIndicatorLineAddCtrl);
function usrIndicatorLineAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usrIndicatorLineAdd,$scope.data).then(function(result){
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
                             $location.url('/usrIndicatorLine');
                        });
					}
				});
            }
		});
	};
}

usrIndicatorLineUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usrIndicatorLineUpdateCtrl',usrIndicatorLineUpdateCtrl );
function usrIndicatorLineUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usrIndicatorLineGet,
            $routeParams.id, "usrIndicatorLine"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usrIndicatorLineUpdate,$scope.data);
	};
}

usrIndicatorLineListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usrIndicatorLineListCtrl',usrIndicatorLineListCtrl );
function usrIndicatorLineListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usrIndicatorLineList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usrIndicatorLineDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usrIndicatorLineList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
