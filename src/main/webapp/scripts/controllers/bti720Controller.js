bti720AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('bti720AddCtrl',bti720AddCtrl);
function bti720AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.bti720Add,$scope.data).then(function(result){
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
                             $location.url('/bti720');
                        });
					}
				});
            }
		});
	};
}

bti720UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('bti720UpdateCtrl',bti720UpdateCtrl );
function bti720UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.bti720Get,
            $routeParams.id, "bti720"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.bti720Update,$scope.data);
	};
}

bti720ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('bti720ListCtrl',bti720ListCtrl );
function bti720ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'bti720List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.bti720Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.bti720List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
