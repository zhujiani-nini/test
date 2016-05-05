lsi240AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('lsi240AddCtrl',lsi240AddCtrl);
function lsi240AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.lsi240Add,$scope.data).then(function(result){
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
                             $location.url('/lsi240');
                        });
					}
				});
            }
		});
	};
}

lsi240UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('lsi240UpdateCtrl',lsi240UpdateCtrl );
function lsi240UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.lsi240Get,
            $routeParams.id, "lsi240"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.lsi240Update,$scope.data);
	};
}

lsi240ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('lsi240ListCtrl',lsi240ListCtrl );
function lsi240ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'lsi240List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.lsi240Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.lsi240List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
