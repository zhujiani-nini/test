lsi120AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('lsi120AddCtrl',lsi120AddCtrl);
function lsi120AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.lsi120Add,$scope.data).then(function(result){
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
                             $location.url('/lsi120');
                        });
					}
				});
            }
		});
	};
}

lsi120UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('lsi120UpdateCtrl',lsi120UpdateCtrl );
function lsi120UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.lsi120Get,
            $routeParams.id, "lsi120"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.lsi120Update,$scope.data);
	};
}

lsi120ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('lsi120ListCtrl',lsi120ListCtrl );
function lsi120ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'lsi120List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.lsi120Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.lsi120List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
