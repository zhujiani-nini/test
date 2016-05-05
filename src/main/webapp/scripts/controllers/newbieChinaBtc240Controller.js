newbieChinaBtc240AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('newbieChinaBtc240AddCtrl',newbieChinaBtc240AddCtrl);
function newbieChinaBtc240AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.newbieChinaBtc240Add,$scope.data).then(function(result){
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
                             $location.url('/newbieChinaBtc240');
                        });
					}
				});
            }
		});
	};
}

newbieChinaBtc240UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('newbieChinaBtc240UpdateCtrl',newbieChinaBtc240UpdateCtrl );
function newbieChinaBtc240UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.newbieChinaBtc240Get,
            $routeParams.id, "newbieChinaBtc240"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.newbieChinaBtc240Update,$scope.data);
	};
}

newbieChinaBtc240ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('newbieChinaBtc240ListCtrl',newbieChinaBtc240ListCtrl );
function newbieChinaBtc240ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'newbieChinaBtc240List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.newbieChinaBtc240Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.newbieChinaBtc240List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
