bti1440AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('bti1440AddCtrl',bti1440AddCtrl);
function bti1440AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.bti1440Add,$scope.data).then(function(result){
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
                             $location.url('/bti1440');
                        });
					}
				});
            }
		});
	};
}

bti1440UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('bti1440UpdateCtrl',bti1440UpdateCtrl );
function bti1440UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.bti1440Get,
            $routeParams.id, "bti1440"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.bti1440Update,$scope.data);
	};
}

bti1440ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('bti1440ListCtrl',bti1440ListCtrl );
function bti1440ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'bti1440List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.bti1440Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.bti1440List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
