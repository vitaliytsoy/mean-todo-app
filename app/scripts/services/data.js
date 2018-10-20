'use strict';

var angular = require('angular');


angular.module('todoListApp')
	.service('dataService', function($http, $q){

			this.helloConsole = function() { console.log("SERVICE BLAH");}


			this.getTodos = function(callback) {
				$http.get('/api/todos')
				.then(callback);
			};

			this.deleteTodo = function(todo) {
				console.log(todo.name);
			};

			this.saveTodos = function(todos) {
				var queue = [];
				todos.forEach(function(todo){
					var request;
					if(!todo._id){
						request = $http.post('/api/todos', todo);
					} else {
						request = $http.put('/api/todos' + todo._id, todo).then(function(result){
							todo = result.data.todo;
							return todo;
						});
					};
					queue.push(request);
				});
				return $q.all(queue).then(function(result){
					console.log("I saved " + todos.length + " todos!");
				});
			};
		});