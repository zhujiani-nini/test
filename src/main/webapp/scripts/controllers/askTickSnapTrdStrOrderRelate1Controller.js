askTickSnapTrdStrOrderRelate1AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('askTickSnapTrdStrOrderRelate1AddCtrl',askTickSnapTrdStrOrderRelate1AddCtrl);
function askTickSnapTrdStrOrderRelate1AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.askTickSnapTrdStrOrderRelate1Add,$scope.data).then(function(result){
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
                             $location.url('/askTickSnapTrdStrOrderRelate1');
                        });
					}
				});
            }
		});
	};
}

askTickSnapTrdStrOrderRelate1UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('askTickSnapTrdStrOrderRelate1UpdateCtrl',askTickSnapTrdStrOrderRelate1UpdateCtrl );
function askTickSnapTrdStrOrderRelate1UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.askTickSnapTrdStrOrderRelate1Get,
            $routeParams.id, "askTickSnapTrdStrOrderRelate1"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.askTickSnapTrdStrOrderRelate1Update,$scope.data);
	};
}

askTickSnapTrdStrOrderRelate1ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('askTickSnapTrdStrOrderRelate1ListCtrl',askTickSnapTrdStrOrderRelate1ListCtrl );
function askTickSnapTrdStrOrderRelate1ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'askTickSnapTrdStrOrderRelate1List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.askTickSnapTrdStrOrderRelate1Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.askTickSnapTrdStrOrderRelate1List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
