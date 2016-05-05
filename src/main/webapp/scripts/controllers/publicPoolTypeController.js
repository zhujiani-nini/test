publicPoolTypeAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('publicPoolTypeAddCtrl',publicPoolTypeAddCtrl);
function publicPoolTypeAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.publicPoolTypeAdd,$scope.data).then(function(result){
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
                             $location.url('/publicPoolType');
                        });
					}
				});
            }
		});
	};
}

publicPoolTypeUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('publicPoolTypeUpdateCtrl',publicPoolTypeUpdateCtrl );
function publicPoolTypeUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.publicPoolTypeGet,
            $routeParams.id, "publicPoolType"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.publicPoolTypeUpdate,$scope.data);
	};
}

publicPoolTypeListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('publicPoolTypeListCtrl',publicPoolTypeListCtrl );
function publicPoolTypeListCtrl (URL,$scope,CommonService) {

	var listKey  = 'publicPoolTypeList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.publicPoolTypeDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.publicPoolTypeList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
