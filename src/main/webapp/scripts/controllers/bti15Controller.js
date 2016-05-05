bti15AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('bti15AddCtrl',bti15AddCtrl);
function bti15AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.bti15Add,$scope.data).then(function(result){
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
                             $location.url('/bti15');
                        });
					}
				});
            }
		});
	};
}

bti15UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('bti15UpdateCtrl',bti15UpdateCtrl );
function bti15UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.bti15Get,
            $routeParams.id, "bti15"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.bti15Update,$scope.data);
	};
}

bti15ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('bti15ListCtrl',bti15ListCtrl );
function bti15ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'bti15List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.bti15Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.bti15List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
