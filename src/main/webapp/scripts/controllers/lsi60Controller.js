lsi60AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('lsi60AddCtrl',lsi60AddCtrl);
function lsi60AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.lsi60Add,$scope.data).then(function(result){
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
                             $location.url('/lsi60');
                        });
					}
				});
            }
		});
	};
}

lsi60UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('lsi60UpdateCtrl',lsi60UpdateCtrl );
function lsi60UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.lsi60Get,
            $routeParams.id, "lsi60"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.lsi60Update,$scope.data);
	};
}

lsi60ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('lsi60ListCtrl',lsi60ListCtrl );
function lsi60ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'lsi60List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.lsi60Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.lsi60List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
