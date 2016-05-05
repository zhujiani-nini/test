snapSubscribeAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('snapSubscribeAddCtrl',snapSubscribeAddCtrl);
function snapSubscribeAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.snapSubscribeAdd,$scope.data).then(function(result){
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
                             $location.url('/snapSubscribe');
                        });
					}
				});
            }
		});
	};
}

snapSubscribeUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('snapSubscribeUpdateCtrl',snapSubscribeUpdateCtrl );
function snapSubscribeUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.snapSubscribeGet,
            $routeParams.id, "snapSubscribe"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.snapSubscribeUpdate,$scope.data);
	};
}

snapSubscribeListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('snapSubscribeListCtrl',snapSubscribeListCtrl );
function snapSubscribeListCtrl (URL,$scope,CommonService) {

	var listKey  = 'snapSubscribeList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.snapSubscribeDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.snapSubscribeList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
