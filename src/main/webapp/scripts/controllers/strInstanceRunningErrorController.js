strInstanceRunningErrorAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('strInstanceRunningErrorAddCtrl',strInstanceRunningErrorAddCtrl);
function strInstanceRunningErrorAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.strInstanceRunningErrorAdd,$scope.data).then(function(result){
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
                             $location.url('/strInstanceRunningError');
                        });
					}
				});
            }
		});
	};
}

strInstanceRunningErrorUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('strInstanceRunningErrorUpdateCtrl',strInstanceRunningErrorUpdateCtrl );
function strInstanceRunningErrorUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.strInstanceRunningErrorGet,
            $routeParams.id, "strInstanceRunningError"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.strInstanceRunningErrorUpdate,$scope.data);
	};
}

strInstanceRunningErrorListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('strInstanceRunningErrorListCtrl',strInstanceRunningErrorListCtrl );
function strInstanceRunningErrorListCtrl (URL,$scope,CommonService) {

	var listKey  = 'strInstanceRunningErrorList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.strInstanceRunningErrorDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.strInstanceRunningErrorList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
