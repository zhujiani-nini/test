newbieChinaBtc60AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('newbieChinaBtc60AddCtrl',newbieChinaBtc60AddCtrl);
function newbieChinaBtc60AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.newbieChinaBtc60Add,$scope.data).then(function(result){
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
                             $location.url('/newbieChinaBtc60');
                        });
					}
				});
            }
		});
	};
}

newbieChinaBtc60UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('newbieChinaBtc60UpdateCtrl',newbieChinaBtc60UpdateCtrl );
function newbieChinaBtc60UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.newbieChinaBtc60Get,
            $routeParams.id, "newbieChinaBtc60"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.newbieChinaBtc60Update,$scope.data);
	};
}

newbieChinaBtc60ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('newbieChinaBtc60ListCtrl',newbieChinaBtc60ListCtrl );
function newbieChinaBtc60ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'newbieChinaBtc60List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.newbieChinaBtc60Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.newbieChinaBtc60List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
