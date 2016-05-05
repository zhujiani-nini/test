fundPoolDepWitAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('fundPoolDepWitAddCtrl',fundPoolDepWitAddCtrl);
function fundPoolDepWitAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.fundPoolDepWitAdd,$scope.data).then(function(result){
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
                             $location.url('/fundPoolDepWit');
                        });
					}
				});
            }
		});
	};
}

fundPoolDepWitUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('fundPoolDepWitUpdateCtrl',fundPoolDepWitUpdateCtrl );
function fundPoolDepWitUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.fundPoolDepWitGet,
            $routeParams.id, "fundPoolDepWit"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.fundPoolDepWitUpdate,$scope.data);
	};
}

fundPoolDepWitListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('fundPoolDepWitListCtrl',fundPoolDepWitListCtrl );
function fundPoolDepWitListCtrl (URL,$scope,CommonService) {

	var listKey  = 'fundPoolDepWitList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.fundPoolDepWitDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.fundPoolDepWitList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
