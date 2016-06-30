var TIPOS_PERGUNTA = [
    {
        id: 1
        , label: "sobre infraestrutura"
    }

    
    , {
        id: 2
        , label: "valores"
    }

    
    , {
        id: 3
        , label: "atendimento"
    },

    {
        id: 4
        , label: "outro"
    }


];

angular
    .module('avaliacao')
    .controller('perguntasCtrl', ['$scope', '$uibModal', '$http', 'URL_API', perguntasCtrl])
    .filter('tipoPerguntaFilter', [tipoPerguntaFilter]);

function perguntasCtrl($scope, $uibModal, $http, URL_API) {

    $scope.editaPerguntas = _editaPerguntas.bind(this, $scope, $uibModal, $http, URL_API);
    $scope.buscaPerguntas = _buscaPerguntas.bind(this, $scope, $http, URL_API);
    $scope.excluiPerguntas = _excluiPerguntas.bind(this, $scope, $http, URL_API);
    $scope.excluirSelecionados = _excluirSelecionados.bind(this, $scope, $http, URL_API);
    $scope.marcarTodos = _marcarTodos.bind(this, $scope);
    $scope.buscaPerguntas();

}

function tipoPerguntaFilter() {

    return function (value) {


        var tipo = _.find(TIPOS_PERGUNTA, function (t) {

            return t.id == value;
        });
        if (tipo) {
            return tipo.label;


        } else {
            return "tipo desconhecido .";
        }
    }
}

function _marcarTodos($scope) {
    _.each($scope.perguntas, function (perguntas) {
        perguntas.excluir = $scope.todos;
    });
}

function _excluirSelecionados($scope, $http, URL_API, id) {
    if (confirm('Confirma a exlusão do pergunta?')) {
        _.each($scope.perguntas, function (perguntas, id) {
            if (perguntas.excluir) {
                $http
                    .delete(URL_API + 'perguntas/' + id + '.json')
                    .then(function () {
                        $scope.buscaPerguntas();
                    }, function (err) {
                        alert(err.message);
                    });

            }
        });
    }
}

function _excluiPerguntas($scope, $http, URL_API, id) {
    if (confirm('Confirma a exlusão do pergunta?')) {
        $http
            .delete(URL_API + 'perguntas/' + id + '.json')
            .then(function () {
                $scope.buscaPerguntas();
            }, function (err) {
                alert(err.message);
            });

    }
}

function _buscaPerguntas($scope, $http, URL_API) {
    $http
        .get(URL_API + 'perguntas.json')
        .then(function (response) {
            $scope.perguntas = response.data;
        }, function (err) {
            alert('Erro buscando alunos');
        });
}

function _editaPerguntas($scope, $uibModal, $http, URL_API, perguntasOrig, idPerguntas) {

    var modalPerguntas = $uibModal.open({
        templateUrl: "templates/perguntas-form.html"
        , controller: ["$scope", "$uibModalInstance", 'perguntasOrig', _modalPerguntasCtrl]
        , controllerAs: "perguntas"
        , resolve: {
            "perguntasOrig": {
                id: idPerguntas
                , dados: perguntasOrig
            }
        }
    });

    modalPerguntas.result.then(function (perguntas) {
        if (perguntas.id) {
            $http
                .put(URL_API + 'perguntas/' + perguntas.id + '.json', perguntas.dados)
                .then(function () {
                    $scope.buscaPerguntas();
                }, function (err) {
                    alert(err.message);
                });

        } else {
            $http
                .post(URL_API + 'perguntas.json', perguntas.dados)
                .then(function () {
                    $scope.buscaPerguntas();
                }, function (err) {
                    alert(err.message);
                });
        }
    });
}

function _modalPerguntasCtrl($scope, $uibModalInstance, perguntasOrig) {
    var perguntas = this;

    _.extend(perguntas, perguntasOrig.dados);

    $scope.ok = function () {
        var form = $scope.formperguntas;

        if (form.$valid) {
            $uibModalInstance.close({
                id: perguntasOrig.id
                , dados: perguntas
            });
        } else {
            $scope.tentouGravar = true;
        }

    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }

}