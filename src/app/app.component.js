(function() {
    angular
        .module('whatapop')
        .component('app', {
            $routeConfig: [
                {
                    name: 'Products',
                    path: '/products/...',
                    component: 'products'
                }
            ],
            controller: appCtrl,
            templateUrl : 'src/app/app.tmpl.html'
        })
        appCtrl.$inject = ['$timeout', '$q', '$log', 'ProductService']
        
        function appCtrl ($timeout, $q, $log, ProductService) {
            var $ctrl = this;
            // 
            $ctrl.products = loadAllProducts();
            
            // Interface
            $ctrl.querySearch   = querySearch;
            $ctrl.selectedItemChange = selectedItemChange;
            $ctrl.searchTextChange   = searchTextChange;
            
            // Implementation
            function querySearch (query) {
                if (query) {
                    var lowercaseQuery = angular.lowercase(query);
                    var res = $ctrl.products.filter( function (product) {
                        var lowercaseQuery = angular.lowercase(query)
                        var lowercaseProductName = angular.lowercase(product.name)
                        var lowercaseProductDesc = angular.lowercase(product.description)
                        var comp = (lowercaseProductName.indexOf(lowercaseQuery) >= 0 ||
                            lowercaseProductDesc.indexOf(lowercaseQuery) >= 0)
                        console.debug("comp", comp)
                        
                        return comp
                    })
                    console.log(res)
                    return $q.when(res)
                }
            }
            function searchTextChange(text) {
              // $log.info('Text changed to ' + text);
            }
            function selectedItemChange(item) {
              // $log.info('Item changed to ' + JSON.stringify(item));
            }
            /**
             * Build `states` list of key/value pairs
             */
            function loadAllProducts() {
              return ProductService
                    .getAll()
                    .then(function (products) {
                        $ctrl.products = products;
                    }) 
            }
        }
})()