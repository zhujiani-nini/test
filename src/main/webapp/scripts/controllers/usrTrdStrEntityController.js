usrTrdStrEntityAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usrTrdStrEntityAddCtrl',usrTrdStrEntityAddCtrl);
function usrTrdStrEntityAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usrTrdStrEntityAdd,$scope.data).then(function(result){
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
                             $location.url('/usrTrdStrEntity');
                        });
					}
				});
            }
		});
	};
}

usrTrdStrEntityUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usrTrdStrEntityUpdateCtrl',usrTrdStrEntityUpdateCtrl );
function usrTrdStrEntityUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usrTrdStrEntityGet,
            $routeParams.id, "usrTrdStrEntity"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usrTrdStrEntityUpdate,$scope.data);
	};
}

usrTrdStrEntityListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usrTrdStrEntityListCtrl',usrTrdStrEntityListCtrl );
function usrTrdStrEntityListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usrTrdStrEntityList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usrTrdStrEntityDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usrTrdStrEntityList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
