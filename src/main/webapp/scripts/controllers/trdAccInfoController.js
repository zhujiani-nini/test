trdAccInfoAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdAccInfoAddCtrl',trdAccInfoAddCtrl);
function trdAccInfoAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdAccInfoAdd,$scope.data).then(function(result){
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
                             $location.url('/trdAccInfo');
                        });
					}
				});
            }
		});
	};
}

trdAccInfoUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdAccInfoUpdateCtrl',trdAccInfoUpdateCtrl );
function trdAccInfoUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdAccInfoGet,
            $routeParams.id, "trdAccInfo"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdAccInfoUpdate,$scope.data);
	};
}

trdAccInfoListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdAccInfoListCtrl',trdAccInfoListCtrl );
function trdAccInfoListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdAccInfoList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdAccInfoDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdAccInfoList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
