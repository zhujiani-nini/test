bti240AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('bti240AddCtrl',bti240AddCtrl);
function bti240AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.bti240Add,$scope.data).then(function(result){
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
                             $location.url('/bti240');
                        });
					}
				});
            }
		});
	};
}

bti240UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('bti240UpdateCtrl',bti240UpdateCtrl );
function bti240UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.bti240Get,
            $routeParams.id, "bti240"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.bti240Update,$scope.data);
	};
}

bti240ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('bti240ListCtrl',bti240ListCtrl );
function bti240ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'bti240List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.bti240Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.bti240List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
