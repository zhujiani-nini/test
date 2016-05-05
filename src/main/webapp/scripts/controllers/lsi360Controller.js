lsi360AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('lsi360AddCtrl',lsi360AddCtrl);
function lsi360AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.lsi360Add,$scope.data).then(function(result){
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
                             $location.url('/lsi360');
                        });
					}
				});
            }
		});
	};
}

lsi360UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('lsi360UpdateCtrl',lsi360UpdateCtrl );
function lsi360UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.lsi360Get,
            $routeParams.id, "lsi360"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.lsi360Update,$scope.data);
	};
}

lsi360ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('lsi360ListCtrl',lsi360ListCtrl );
function lsi360ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'lsi360List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.lsi360Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.lsi360List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
