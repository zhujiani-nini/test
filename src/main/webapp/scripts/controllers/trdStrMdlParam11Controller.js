trdStrMdlParam11AddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrMdlParam11AddCtrl',trdStrMdlParam11AddCtrl);
function trdStrMdlParam11AddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrMdlParam11Add,$scope.data).then(function(result){
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
                             $location.url('/trdStrMdlParam11');
                        });
					}
				});
            }
		});
	};
}

trdStrMdlParam11UpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrMdlParam11UpdateCtrl',trdStrMdlParam11UpdateCtrl );
function trdStrMdlParam11UpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrMdlParam11Get,
            $routeParams.id, "trdStrMdlParam11"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrMdlParam11Update,$scope.data);
	};
}

trdStrMdlParam11ListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrMdlParam11ListCtrl',trdStrMdlParam11ListCtrl );
function trdStrMdlParam11ListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrMdlParam11List';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrMdlParam11Delete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrMdlParam11List,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
