bti60AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('bti60AddCtrl',bti60AddCtrl);
function bti60AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.bti60Add,$scope.data).then(function(result){
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
                             $location.url('/bti60');
                        });
					}
				});
            }
		});
	};
}

bti60UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('bti60UpdateCtrl',bti60UpdateCtrl );
function bti60UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.bti60Get,
            $routeParams.id, "bti60"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.bti60Update,$scope.data);
	};
}

bti60ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('bti60ListCtrl',bti60ListCtrl );
function bti60ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'bti60List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.bti60Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.bti60List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
