qtcApiAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('qtcApiAddCtrl',qtcApiAddCtrl);
function qtcApiAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.qtcApiAdd,$scope.data).then(function(result){
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
                             $location.url('/qtcApi');
                        });
					}
				});
            }
		});
	};
}

qtcApiUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('qtcApiUpdateCtrl',qtcApiUpdateCtrl );
function qtcApiUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.qtcApiGet,
            $routeParams.id, "qtcApi"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.qtcApiUpdate,$scope.data);
	};
}

qtcApiListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('qtcApiListCtrl',qtcApiListCtrl );
function qtcApiListCtrl (URL,$scope,CommonService) {

	var listKey  = 'qtcApiList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.qtcApiDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.qtcApiList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
