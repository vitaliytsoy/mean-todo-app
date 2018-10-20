'use strict';

var angular = require('angular');

angular.module('todoListApp')
	.controller('mainCtrl', function($scope, $log, $interval, dataService){
			$scope.helloConsole = dataService.helloConsole;
			$scope.seconds = 0;

			$scope.counter = function() {
				$scope.seconds++;
				$log.log($scope.seconds + ' have passed!');
			};

			$interval($scope.counter, 1000, 10);

			dataService.getTodos(function(response) {
				console.log(response.data);
				$scope.todos = response.data.todos;
			});

			$scope.deleteTodo = function(todo, $index) {
				dataService.deleteTodo(todo);
				$scope.todos.splice($index, 1)
			};

			$scope.saveTodos = function () {
				var filteredTodos = $scope.todos.filter(function(todo) {
					if(todo.edited){
						return todo;
					}
				});
				dataService.saveTodos(filteredTodos);
			};

			$scope.addTodo = function() {
				var todo = {name: "This is a new todo.", completed: false};
				$scope.todos.unshift(todo);
			}

			$scope.resetTodoState = function() {
				$scope.todos.forEach(function(todo){
					todo.edited = false;
				});
			};
		});