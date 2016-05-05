lsi720AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('lsi720AddCtrl',lsi720AddCtrl);
function lsi720AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.lsi720Add,$scope.data).then(function(result){
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
                             $location.url('/lsi720');
                        });
					}
				});
            }
		});
	};
}

lsi720UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('lsi720UpdateCtrl',lsi720UpdateCtrl );
function lsi720UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.lsi720Get,
            $routeParams.id, "lsi720"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.lsi720Update,$scope.data);
	};
}

lsi720ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('lsi720ListCtrl',lsi720ListCtrl );
function lsi720ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'lsi720List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.lsi720Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.lsi720List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
