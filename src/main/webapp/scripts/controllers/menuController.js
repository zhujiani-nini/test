menuAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('menuAddCtrl',menuAddCtrl);
function menuAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.menuAdd,$scope.data).then(function(result){
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
                             $location.url('/menu');
                        });
					}
				});
            }
		});
	};
}

menuUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('menuUpdateCtrl',menuUpdateCtrl );
function menuUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.menuGet,
            $routeParams.id, "menu"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.menuUpdate,$scope.data);
	};
}

menuListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('menuListCtrl',menuListCtrl );
function menuListCtrl (URL,$scope,CommonService) {

	var listKey  = 'menuList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.menuDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.menuList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
