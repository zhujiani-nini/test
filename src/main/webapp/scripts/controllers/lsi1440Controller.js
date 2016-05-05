lsi1440AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('lsi1440AddCtrl',lsi1440AddCtrl);
function lsi1440AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.lsi1440Add,$scope.data).then(function(result){
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
                             $location.url('/lsi1440');
                        });
					}
				});
            }
		});
	};
}

lsi1440UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('lsi1440UpdateCtrl',lsi1440UpdateCtrl );
function lsi1440UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.lsi1440Get,
            $routeParams.id, "lsi1440"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.lsi1440Update,$scope.data);
	};
}

lsi1440ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('lsi1440ListCtrl',lsi1440ListCtrl );
function lsi1440ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'lsi1440List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.lsi1440Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.lsi1440List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
