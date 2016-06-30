angular
  .module('avaliacao')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$state', loginCtrl]);

var MENSAGEM_INFORME_EMAIL = 'Informe seu email',
  MENSAGEM_EMAIL_INVALIDO = 'O email informado está inválido',
  MENSAGEM_INFORME_SENHA = 'Informe sua senha',
  USUARIO_OU_SENHA_INVALIDA = 'Usuário ou senha inválidos';


function loginCtrl($rootScope, $scope, $http, $state) {

  var espionar = _espionarSeEstaValido.bind(this, $scope),
    fechaMensagem = _closeValidMessage.bind(this, $scope)
  fechaMensagemEmail = _closeValidMessage.bind(this, $scope, MENSAGEM_INFORME_EMAIL),
    fechaMensagemEmailInvalido = _closeValidMessage.bind(this, $scope, MENSAGEM_EMAIL_INVALIDO),
    fechaMensagemSenha = _closeValidMessage.bind(this, $scope, MENSAGEM_INFORME_SENHA);


  //TODO: Definir com a sintaxe controllerAs
  $scope.alerts = [];

  $scope.closeAlert = _closeAlert.bind(this, $scope);

  //Bind cria uma nova função "cópia" da atual, passando o contexto
  // com o primeiro parametro e demais parametros fixos
  $scope.login = _login.bind(this, $rootScope, $scope, $http, $state);

  espionar('email', fechaMensagemEmail);
  espionar('email', fechaMensagemEmailInvalido);
  espionar('senha', fechaMensagemSenha);


}

function _espionarSeEstaValido($scope, nomeCampo, fn) {
  $scope.$watch('formLogin.' + nomeCampo + '.$valid', fn);
}

function _closeValidMessage($scope, mensagem, valido) {
  var temAlertas = ($scope.alerts.length > 0);
  if (valido && temAlertas) {
    var posicao = $scope.alerts.indexOf(mensagem);
    if (posicao >= 0) {
      _closeAlert($scope, posicao);
    }
  }
}

function _closeAlert($scope, index) {
  $scope.alerts.splice(index, 1);
}

function _login($rootScope, $scope, $http, $state) {
  var form = $scope.formLogin,
    emailInput = $scope.formLogin.email,
    senhaInput = $scope.formLogin.senha,
    addError = function (message) {
      $scope.alerts.push(message);
    };

  $scope.alerts = [];

  if (form.$valid) {
    $http({
      method: 'GET',
      url: '/dados/usuarios.json'
    }).then(function successCallback(response){
      var usuario = response.data[0];
      if (usuario.email === $scope.email && usuario.senha === $scope.senha){
        $rootScope.usuarioLogado = usuario;
        $state.go('home');
      } else {
        addError(USUARIO_OU_SENHA_INVALIDA);
      }
    }, function errorCallback(response){
      console.log('ERRO', response);
    });

  } else {
    var emailEmBranco = emailInput.$error.required,
      emailIncorreto = emailInput.$error.email,
      senhaEmBranco = senhaInput.$error.required;

    if (emailEmBranco) {
      addError(MENSAGEM_INFORME_EMAIL);
    }
    if (emailIncorreto) {
      addError(MENSAGEM_EMAIL_INVALIDO);
    }
    if (senhaEmBranco) {
      addError(MENSAGEM_INFORME_SENHA);
    }

  }
}