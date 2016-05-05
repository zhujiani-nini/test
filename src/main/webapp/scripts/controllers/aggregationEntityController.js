aggregationEntityAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('aggregationEntityAddCtrl',aggregationEntityAddCtrl);
function aggregationEntityAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.aggregationEntityAdd,$scope.data).then(function(result){
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
                             $location.url('/aggregationEntity');
                        });
					}
				});
            }
		});
	};
}

aggregationEntityUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('aggregationEntityUpdateCtrl',aggregationEntityUpdateCtrl );
function aggregationEntityUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.aggregationEntityGet,
            $routeParams.id, "aggregationEntity"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.aggregationEntityUpdate,$scope.data);
	};
}

aggregationEntityListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('aggregationEntityListCtrl',aggregationEntityListCtrl );
function aggregationEntityListCtrl (URL,$scope,CommonService) {

	var listKey  = 'aggregationEntityList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.aggregationEntityDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.aggregationEntityList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
