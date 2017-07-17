"use strict";

(function () {


    var app = angular.module('vitrine', ['ngAnimate','ngTouch']);
    app.config(function ($sceProvider, $qProvider) {
        // Completely disable SCE.  For demonstration purposes only!
        // Do not use in new projects or libraries.
        $qProvider.errorOnUnhandledRejections(false);
        $sceProvider.enabled(false);
    });
    var productsController = function (http, sce,scope,document) {
        var self = this;
        self.firstItem = 0;
        self.maxLenght = 4;
        scope.document = document[0];
        window.addEventListener('resize', () => {
            if (scope.document.documentElement.clientWidth < 991) {
                self.maxLenght = 0;
            }

        })


        if (scope.document.documentElement.clientWidth < 991) {
            scope.maxLenght = 0;
        }



        window.X = function (result) {
            self.data = result.data;
            self.lastproduct = self.data.recommendation[self.firstItem + self.maxLenght];

        };

        this.data = null;
        var getProducts = function () {

            var url = sce.trustAsResourceUrl('http://roberval.chaordicsystems.com/challenge/challenge.json');
            http.jsonp('http://roberval.chaordicsystems.com/challenge/challenge.json');
        }
        getProducts();


        self.forward = function () {
            var limite = self.maxLenght == 0 ? 1 : 2;
            if ((self.firstItem + self.maxLenght) >= (self.data.recommendation.length -limite)) {
                return;
            }
            var lastIndex = self.maxLenght == 0 ? 0 : 5;
            self.firstItem++;
            self.lastproduct = self.data.recommendation[self.firstItem + lastIndex];


        }
        self.backward = function () {
            if (self.firstItem == 0) {
                return;
            }
            self.firstItem--;
            self.lastproduct = self.data.recommendation[self.firstItem + self.maxLenght];


        }

    };
    productsController.$inject = ['$http', '$sce', '$scope','$document'];

    app.controller('ProductsController', productsController);


}());