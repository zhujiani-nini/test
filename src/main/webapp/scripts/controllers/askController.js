askAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('askAddCtrl',askAddCtrl);
function askAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.askAdd,$scope.data).then(function(result){
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
                             $location.url('/ask');
                        });
					}
				});
            }
		});
	};
}

askUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('askUpdateCtrl',askUpdateCtrl );
function askUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.askGet,
            $routeParams.id, "ask"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.askUpdate,$scope.data);
	};
}

askListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('askListCtrl',askListCtrl );
function askListCtrl (URL,$scope,CommonService) {

	var listKey  = 'askList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.askDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.askList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
