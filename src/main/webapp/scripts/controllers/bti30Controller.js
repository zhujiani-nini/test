bti30AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('bti30AddCtrl',bti30AddCtrl);
function bti30AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.bti30Add,$scope.data).then(function(result){
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
                             $location.url('/bti30');
                        });
					}
				});
            }
		});
	};
}

bti30UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('bti30UpdateCtrl',bti30UpdateCtrl );
function bti30UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.bti30Get,
            $routeParams.id, "bti30"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.bti30Update,$scope.data);
	};
}

bti30ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('bti30ListCtrl',bti30ListCtrl );
function bti30ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'bti30List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.bti30Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.bti30List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
