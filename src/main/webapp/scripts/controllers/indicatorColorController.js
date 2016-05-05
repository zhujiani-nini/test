indicatorColorAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('indicatorColorAddCtrl',indicatorColorAddCtrl);
function indicatorColorAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.indicatorColorAdd,$scope.data).then(function(result){
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
                             $location.url('/indicatorColor');
                        });
					}
				});
            }
		});
	};
}

indicatorColorUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('indicatorColorUpdateCtrl',indicatorColorUpdateCtrl );
function indicatorColorUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.indicatorColorGet,
            $routeParams.id, "indicatorColor"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.indicatorColorUpdate,$scope.data);
	};
}

indicatorColorListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('indicatorColorListCtrl',indicatorColorListCtrl );
function indicatorColorListCtrl (URL,$scope,CommonService) {

	var listKey  = 'indicatorColorList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.indicatorColorDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.indicatorColorList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
