mdlDisciplineAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('mdlDisciplineAddCtrl',mdlDisciplineAddCtrl);
function mdlDisciplineAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.mdlDisciplineAdd,$scope.data).then(function(result){
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
                             $location.url('/mdlDiscipline');
                        });
					}
				});
            }
		});
	};
}

mdlDisciplineUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('mdlDisciplineUpdateCtrl',mdlDisciplineUpdateCtrl );
function mdlDisciplineUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.mdlDisciplineGet,
            $routeParams.id, "mdlDiscipline"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.mdlDisciplineUpdate,$scope.data);
	};
}

mdlDisciplineListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('mdlDisciplineListCtrl',mdlDisciplineListCtrl );
function mdlDisciplineListCtrl (URL,$scope,CommonService) {

	var listKey  = 'mdlDisciplineList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.mdlDisciplineDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.mdlDisciplineList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
