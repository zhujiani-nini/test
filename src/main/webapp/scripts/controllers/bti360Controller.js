bti360AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('bti360AddCtrl',bti360AddCtrl);
function bti360AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.bti360Add,$scope.data).then(function(result){
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
                             $location.url('/bti360');
                        });
					}
				});
            }
		});
	};
}

bti360UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('bti360UpdateCtrl',bti360UpdateCtrl );
function bti360UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.bti360Get,
            $routeParams.id, "bti360"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.bti360Update,$scope.data);
	};
}

bti360ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('bti360ListCtrl',bti360ListCtrl );
function bti360ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'bti360List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.bti360Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.bti360List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
