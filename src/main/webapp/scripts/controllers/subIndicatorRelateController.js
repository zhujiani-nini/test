subIndicatorRelateAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('subIndicatorRelateAddCtrl',subIndicatorRelateAddCtrl);
function subIndicatorRelateAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.subIndicatorRelateAdd,$scope.data).then(function(result){
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
                             $location.url('/subIndicatorRelate');
                        });
					}
				});
            }
		});
	};
}

subIndicatorRelateUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('subIndicatorRelateUpdateCtrl',subIndicatorRelateUpdateCtrl );
function subIndicatorRelateUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.subIndicatorRelateGet,
            $routeParams.id, "subIndicatorRelate"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.subIndicatorRelateUpdate,$scope.data);
	};
}

subIndicatorRelateListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('subIndicatorRelateListCtrl',subIndicatorRelateListCtrl );
function subIndicatorRelateListCtrl (URL,$scope,CommonService) {

	var listKey  = 'subIndicatorRelateList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.subIndicatorRelateDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.subIndicatorRelateList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
