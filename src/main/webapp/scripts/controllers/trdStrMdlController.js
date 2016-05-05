trdStrMdlAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrMdlAddCtrl',trdStrMdlAddCtrl);
function trdStrMdlAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrMdlAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrMdl');
                        });
					}
				});
            }
		});
	};
}

trdStrMdlUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrMdlUpdateCtrl',trdStrMdlUpdateCtrl );
function trdStrMdlUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrMdlGet,
            $routeParams.id, "trdStrMdl"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrMdlUpdate,$scope.data);
	};
}

trdStrMdlListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrMdlListCtrl',trdStrMdlListCtrl );
function trdStrMdlListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrMdlList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrMdlDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrMdlList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
