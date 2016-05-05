contractTypeAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('contractTypeAddCtrl',contractTypeAddCtrl);
function contractTypeAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.contractTypeAdd,$scope.data).then(function(result){
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
                             $location.url('/contractType');
                        });
					}
				});
            }
		});
	};
}

contractTypeUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('contractTypeUpdateCtrl',contractTypeUpdateCtrl );
function contractTypeUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.contractTypeGet,
            $routeParams.id, "contractType"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.contractTypeUpdate,$scope.data);
	};
}

contractTypeListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('contractTypeListCtrl',contractTypeListCtrl );
function contractTypeListCtrl (URL,$scope,CommonService) {

	var listKey  = 'contractTypeList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.contractTypeDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.contractTypeList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
