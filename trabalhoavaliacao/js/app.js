angular
  .module('avaliacao', ['ui.router', 'ui.bootstrap'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routes])
  .run(['$rootScope', '$state', run])
  //.constant('URL_API', 'https://project-2989461822637054304.firebaseio.com/');
  .constant('URL_API', 'https://project-963167675457203185.firebaseio.com/');


function routes($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    /*
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
 */
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html'
        })
        .state('alunos', {
            url: '/alunos',
            templateUrl: 'templates/alunos.html',
            controller: 'AlunosCtrl'
        })
        .state('professores', {
            url: '/professores',
            templateUrl: 'templates/professores.html',
            controller: 'ProfessoresCtrl'
        })
       
         .state('perguntas', {
            url: '/perguntas',
            templateUrl: 'templates/perguntas.html',
            controller: 'perguntasCtrl'
        })
      .state('questionarios', {
            url: '/questionarios',
            templateUrl: 'templates/questionarios.html',
            controller: 'questionariosCtrl'
        })
        .state('questionario', {
            url: '/questionario/:id',
            templateUrl: 'templates/questionario-form.html',
            controller: 'questionarioCtrl as questionario'
        });

}

function run($rootScope, $state) {
    $rootScope.logout = _logout.bind(this, $rootScope, $state);
}

function _logout($rootScope, $state) {
    $rootScope.usuarioLogado = undefined;
    $state.go('home');
}