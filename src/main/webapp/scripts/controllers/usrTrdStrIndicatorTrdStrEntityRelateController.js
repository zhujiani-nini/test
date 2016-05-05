usrTrdStrIndicatorTrdStrEntityRelateAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usrTrdStrIndicatorTrdStrEntityRelateAddCtrl',usrTrdStrIndicatorTrdStrEntityRelateAddCtrl);
function usrTrdStrIndicatorTrdStrEntityRelateAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usrTrdStrIndicatorTrdStrEntityRelateAdd,$scope.data).then(function(result){
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
                             $location.url('/usrTrdStrIndicatorTrdStrEntityRelate');
                        });
					}
				});
            }
		});
	};
}

usrTrdStrIndicatorTrdStrEntityRelateUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usrTrdStrIndicatorTrdStrEntityRelateUpdateCtrl',usrTrdStrIndicatorTrdStrEntityRelateUpdateCtrl );
function usrTrdStrIndicatorTrdStrEntityRelateUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usrTrdStrIndicatorTrdStrEntityRelateGet,
            $routeParams.id, "usrTrdStrIndicatorTrdStrEntityRelate"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usrTrdStrIndicatorTrdStrEntityRelateUpdate,$scope.data);
	};
}

usrTrdStrIndicatorTrdStrEntityRelateListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usrTrdStrIndicatorTrdStrEntityRelateListCtrl',usrTrdStrIndicatorTrdStrEntityRelateListCtrl );
function usrTrdStrIndicatorTrdStrEntityRelateListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usrTrdStrIndicatorTrdStrEntityRelateList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usrTrdStrIndicatorTrdStrEntityRelateDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usrTrdStrIndicatorTrdStrEntityRelateList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
