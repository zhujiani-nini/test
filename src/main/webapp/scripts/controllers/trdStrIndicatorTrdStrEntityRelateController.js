trdStrIndicatorTrdStrEntityRelateAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrIndicatorTrdStrEntityRelateAddCtrl',trdStrIndicatorTrdStrEntityRelateAddCtrl);
function trdStrIndicatorTrdStrEntityRelateAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrIndicatorTrdStrEntityRelateAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrIndicatorTrdStrEntityRelate');
                        });
					}
				});
            }
		});
	};
}

trdStrIndicatorTrdStrEntityRelateUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrIndicatorTrdStrEntityRelateUpdateCtrl',trdStrIndicatorTrdStrEntityRelateUpdateCtrl );
function trdStrIndicatorTrdStrEntityRelateUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrIndicatorTrdStrEntityRelateGet,
            $routeParams.id, "trdStrIndicatorTrdStrEntityRelate"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrIndicatorTrdStrEntityRelateUpdate,$scope.data);
	};
}

trdStrIndicatorTrdStrEntityRelateListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrIndicatorTrdStrEntityRelateListCtrl',trdStrIndicatorTrdStrEntityRelateListCtrl );
function trdStrIndicatorTrdStrEntityRelateListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrIndicatorTrdStrEntityRelateList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrIndicatorTrdStrEntityRelateDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrIndicatorTrdStrEntityRelateList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
