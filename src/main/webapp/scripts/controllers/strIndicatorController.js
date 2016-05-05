strIndicatorAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('strIndicatorAddCtrl',strIndicatorAddCtrl);
function strIndicatorAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.strIndicatorAdd,$scope.data).then(function(result){
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
                             $location.url('/strIndicator');
                        });
					}
				});
            }
		});
	};
}

strIndicatorUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('strIndicatorUpdateCtrl',strIndicatorUpdateCtrl );
function strIndicatorUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.strIndicatorGet,
            $routeParams.id, "strIndicator"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.strIndicatorUpdate,$scope.data);
	};
}

strIndicatorListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('strIndicatorListCtrl',strIndicatorListCtrl );
function strIndicatorListCtrl (URL,$scope,CommonService) {

	var listKey  = 'strIndicatorList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.strIndicatorDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.strIndicatorList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
