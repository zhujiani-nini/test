bti120AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('bti120AddCtrl',bti120AddCtrl);
function bti120AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.bti120Add,$scope.data).then(function(result){
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
                             $location.url('/bti120');
                        });
					}
				});
            }
		});
	};
}

bti120UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('bti120UpdateCtrl',bti120UpdateCtrl );
function bti120UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.bti120Get,
            $routeParams.id, "bti120"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.bti120Update,$scope.data);
	};
}

bti120ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('bti120ListCtrl',bti120ListCtrl );
function bti120ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'bti120List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.bti120Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.bti120List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
