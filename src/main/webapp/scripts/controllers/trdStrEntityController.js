trdStrEntityAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrEntityAddCtrl',trdStrEntityAddCtrl);
function trdStrEntityAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrEntityAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrEntity');
                        });
					}
				});
            }
		});
	};
}

trdStrEntityUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrEntityUpdateCtrl',trdStrEntityUpdateCtrl );
function trdStrEntityUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrEntityGet,
            $routeParams.id, "trdStrEntity"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrEntityUpdate,$scope.data);
	};
}

trdStrEntityListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrEntityListCtrl',trdStrEntityListCtrl );
function trdStrEntityListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrEntityList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrEntityDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrEntityList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
