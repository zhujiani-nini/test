trdStrInstanceAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrInstanceAddCtrl',trdStrInstanceAddCtrl);
function trdStrInstanceAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrInstanceAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrInstance');
                        });
					}
				});
            }
		});
	};
}

trdStrInstanceUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrInstanceUpdateCtrl',trdStrInstanceUpdateCtrl );
function trdStrInstanceUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrInstanceGet,
            $routeParams.id, "trdStrInstance"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrInstanceUpdate,$scope.data);
	};
}

trdStrInstanceListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrInstanceListCtrl',trdStrInstanceListCtrl );
function trdStrInstanceListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrInstanceList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrInstanceDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrInstanceList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
