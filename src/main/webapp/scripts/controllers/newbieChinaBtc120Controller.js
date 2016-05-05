newbieChinaBtc120AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('newbieChinaBtc120AddCtrl',newbieChinaBtc120AddCtrl);
function newbieChinaBtc120AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.newbieChinaBtc120Add,$scope.data).then(function(result){
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
                             $location.url('/newbieChinaBtc120');
                        });
					}
				});
            }
		});
	};
}

newbieChinaBtc120UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('newbieChinaBtc120UpdateCtrl',newbieChinaBtc120UpdateCtrl );
function newbieChinaBtc120UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.newbieChinaBtc120Get,
            $routeParams.id, "newbieChinaBtc120"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.newbieChinaBtc120Update,$scope.data);
	};
}

newbieChinaBtc120ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('newbieChinaBtc120ListCtrl',newbieChinaBtc120ListCtrl );
function newbieChinaBtc120ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'newbieChinaBtc120List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.newbieChinaBtc120Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.newbieChinaBtc120List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
