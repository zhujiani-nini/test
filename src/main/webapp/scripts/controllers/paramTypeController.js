paramTypeAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('paramTypeAddCtrl',paramTypeAddCtrl);
function paramTypeAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.paramTypeAdd,$scope.data).then(function(result){
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
                             $location.url('/paramType');
                        });
					}
				});
            }
		});
	};
}

paramTypeUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('paramTypeUpdateCtrl',paramTypeUpdateCtrl );
function paramTypeUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.paramTypeGet,
            $routeParams.id, "paramType"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.paramTypeUpdate,$scope.data);
	};
}

paramTypeListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('paramTypeListCtrl',paramTypeListCtrl );
function paramTypeListCtrl (URL,$scope,CommonService) {

	var listKey  = 'paramTypeList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.paramTypeDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.paramTypeList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
