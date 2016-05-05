newbieChinaBtc1440AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('newbieChinaBtc1440AddCtrl',newbieChinaBtc1440AddCtrl);
function newbieChinaBtc1440AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.newbieChinaBtc1440Add,$scope.data).then(function(result){
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
                             $location.url('/newbieChinaBtc1440');
                        });
					}
				});
            }
		});
	};
}

newbieChinaBtc1440UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('newbieChinaBtc1440UpdateCtrl',newbieChinaBtc1440UpdateCtrl );
function newbieChinaBtc1440UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.newbieChinaBtc1440Get,
            $routeParams.id, "newbieChinaBtc1440"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.newbieChinaBtc1440Update,$scope.data);
	};
}

newbieChinaBtc1440ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('newbieChinaBtc1440ListCtrl',newbieChinaBtc1440ListCtrl );
function newbieChinaBtc1440ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'newbieChinaBtc1440List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.newbieChinaBtc1440Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.newbieChinaBtc1440List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
