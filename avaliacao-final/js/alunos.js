(function () {
    angular
        .module('avaliacao')
        .controller('AlunosCtrl', ['$scope', '$uibModal', '$http', 'URL_API', alunosCtrl]);

    function alunosCtrl($scope, $uibModal, $http, URL_API) {

        $scope.editaAluno = _editaAluno.bind(this, $scope, $uibModal, $http, URL_API);
        $scope.buscaAlunos = _buscaAlunos.bind(this, $scope, $http, URL_API);
        $scope.excluiAluno = _excluiAluno.bind(this, $scope, $http, URL_API);
        $scope.excluirSelecionados = _excluirSelecionados.bind(this, $scope, $http, URL_API);
        $scope.marcarTodos = _marcarTodos.bind(this, $scope);
        $scope.buscaAlunos();

    }

    function _marcarTodos($scope) {
        _.each($scope.alunos, function (aluno) {
            aluno.excluir = $scope.todos;
        });
    }

    function _excluirSelecionados($scope, $http, URL_API, id) {
        if (confirm('Confirma a exlusão do aluno?')) {
            _.each($scope.alunos, function (aluno, id) {
                if (aluno.excluir) {
                    $http
                        .delete(URL_API + 'alunos/' + id + '.json')
                        .then(function () {
                            $scope.buscaAlunos();
                        }, function (err) {
                            alert(err.message);
                        });

                }
            });
        }
    }

    function _excluiAluno($scope, $http, URL_API, id) {
        if (confirm('Confirma a exlusão do aluno?')) {
            $http
                .delete(URL_API + 'alunos/' + id + '.json')
                .then(function () {
                    $scope.buscaAlunos();
                }, function (err) {
                    alert(err.message);
                });

        }
    }

    function _buscaAlunos($scope, $http, URL_API) {
        $http
            .get(URL_API + 'alunos.json')
            .then(function (response) {
                $scope.alunos = response.data;
            }, function (err) {
                alert('Erro buscando alunos');
            });
    }

    function _editaAluno($scope, $uibModal, $http, URL_API, alunoOrig, idAluno) {

        var modalAluno = $uibModal.open({
            templateUrl: "templates/aluno-form.html"
            , controller: ["$scope", "$uibModalInstance", 'alunoOrig', _modalAlunoCtrl]
            , controllerAs: "aluno"
            , resolve: {
                "alunoOrig": {
                    id: idAluno
                    , dados: alunoOrig
                }
            }
        });

        modalAluno.result.then(function ok(aluno) {
            if (aluno.id) {
                $http
                    .put(URL_API + 'alunos/' + aluno.id + '.json', aluno.dados)
                    .then(function () {
                        $scope.buscaAlunos();
                    }, function (err) {
                        alert(err.message);
                    });

            } else {
                $http
                    .post(URL_API + 'alunos.json', aluno.dados)
                    .then(function () {
                        $scope.buscaAlunos();
                    }, function (err) {
                        alert(err.message);
                    });
            }
        });
    }

    function _modalAlunoCtrl($scope, $uibModalInstance, alunoOrig) {
        var aluno = this;

        _.extend(aluno, alunoOrig.dados);

        $scope.ok = function () {
            var form = $scope.formAluno;

            if (form.$valid) {
                $uibModalInstance.close({
                    id: alunoOrig.id
                    , dados: aluno
                });
            } else {
                $scope.tentouGravar = true;
            }

        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }

    }
})();