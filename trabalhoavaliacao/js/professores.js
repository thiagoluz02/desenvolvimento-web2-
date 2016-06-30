(function (){
angular
    .module('avaliacao')
    .controller('ProfessoresCtrl', ['$scope', '$uibModal', '$http', 'URL_API', professoresCtrl]);

function professoresCtrl($scope, $uibModal, $http, URL_API) {

    $scope.editaProfessor = _editaProfessor.bind(this, $scope, $uibModal, $http, URL_API);
    $scope.buscaProfessores = _buscaProfessores.bind(this, $scope, $http, URL_API);
    $scope.excluiProfessor = _excluiProfessor.bind(this, $scope, $http, URL_API);
    $scope.excluirSelecionados = _excluirSelecionados.bind(this, $scope, $http, URL_API);
    $scope.marcarTodos = _marcarTodos.bind(this, $scope);
    $scope.buscaProfessores();

}

function _marcarTodos($scope) {
    _.each($scope.professores, function (professor) {
        professor.excluir = $scope.todos;
    });
}

function _excluirSelecionados($scope, $http, URL_API, id) {
    if (confirm('Confirma a exlusão do professor?')) {
        _.each($scope.professores, function (professor, id) {
            if (professor.excluir) {
                $http
                    .delete(URL_API + 'professores/' + id + '.json')
                    .then(function () {
                        $scope.buscaProfessores();
                    }, function (err) {
                        alert(err.message);
                    });

            }
        });
    }
}

function _excluiProfessor($scope, $http, URL_API, id) {
    if (confirm('Confirma a exlusão do professor?')) {
        $http
            .delete(URL_API + 'professores/' + id + '.json')
            .then(function () {
                $scope.buscaProfessores();
            }, function (err) {
                alert(err.message);
            });

    }
}

function _buscaProfessores($scope, $http, URL_API) {
    $http
        .get(URL_API + 'professores.json')
        .then(function (response) {
            $scope.professores = response.data;
        }, function (err) {
            alert('Erro buscando professores');
        });
}

function _editaProfessor($scope, $uibModal, $http, URL_API, professorOrig, idProfessor) {

    var modalProfessor = $uibModal.open({
        templateUrl: "templates/professor-form.html",
        controller: ["$scope", "$uibModalInstance", 'professorOrig', _modalProfessorCtrl],
        controllerAs: "professor",
        resolve: {
            "professorOrig": {
                id: idProfessor,
                dados: professorOrig
            }
        }
    });

    modalProfessor.result.then(function ok(professor) {
        if (professor.id) {
            $http
                .put(URL_API + 'professores/' + professor.id + '.json', professor.dados)
                .then(function () {
                    $scope.buscaProfessor();
                }, function (err) {
                    alert(err.message);
                });

        } else {
            $http
                .post(URL_API + 'professores.json', professor.dados)
                .then(function () {
                    $scope.buscaProfessores();
                }, function (err) {
                    alert(err.message);
                });
        }
    });
}

function _modalProfessorCtrl($scope, $uibModalInstance, professorOrig) {
    var professor = this;

    _.extend(professor, professorOrig.dados);

    $scope.ok = function () {
        var form = $scope.formProfessor;

        if (form.$valid) {
            $uibModalInstance.close({
                id: professorOrig.id,
                dados: professor
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