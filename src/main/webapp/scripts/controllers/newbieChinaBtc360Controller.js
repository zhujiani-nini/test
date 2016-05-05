newbieChinaBtc360AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('newbieChinaBtc360AddCtrl',newbieChinaBtc360AddCtrl);
function newbieChinaBtc360AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.newbieChinaBtc360Add,$scope.data).then(function(result){
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
                             $location.url('/newbieChinaBtc360');
                        });
					}
				});
            }
		});
	};
}

newbieChinaBtc360UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('newbieChinaBtc360UpdateCtrl',newbieChinaBtc360UpdateCtrl );
function newbieChinaBtc360UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.newbieChinaBtc360Get,
            $routeParams.id, "newbieChinaBtc360"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.newbieChinaBtc360Update,$scope.data);
	};
}

newbieChinaBtc360ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('newbieChinaBtc360ListCtrl',newbieChinaBtc360ListCtrl );
function newbieChinaBtc360ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'newbieChinaBtc360List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.newbieChinaBtc360Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.newbieChinaBtc360List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
