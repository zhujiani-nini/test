trdStrInsSnapshotEntityAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrInsSnapshotEntityAddCtrl',trdStrInsSnapshotEntityAddCtrl);
function trdStrInsSnapshotEntityAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrInsSnapshotEntityAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrInsSnapshotEntity');
                        });
					}
				});
            }
		});
	};
}

trdStrInsSnapshotEntityUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrInsSnapshotEntityUpdateCtrl',trdStrInsSnapshotEntityUpdateCtrl );
function trdStrInsSnapshotEntityUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrInsSnapshotEntityGet,
            $routeParams.id, "trdStrInsSnapshotEntity"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrInsSnapshotEntityUpdate,$scope.data);
	};
}

trdStrInsSnapshotEntityListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrInsSnapshotEntityListCtrl',trdStrInsSnapshotEntityListCtrl );
function trdStrInsSnapshotEntityListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrInsSnapshotEntityList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrInsSnapshotEntityDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrInsSnapshotEntityList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
