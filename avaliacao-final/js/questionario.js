(function () {
    angular
        .module('avaliacao')
        .controller('questionariosCtrl', ['$scope', questionariosCtrl])
        .controller('questionarioCtrl', ['$scope', '$state', '$stateParams', '$http', 'URL_API', questionarioCtrl]);



    //controller lista
    function questionariosCtrl($scope) {
        $scope.excluiQuestionario = _excluiQuestionario.bind(this, $scope);
        _loadQuestionarios($scope);
        $scope.buscaquestionarios = _buscaquestionarios.bind(this, $scope);
        $scope.excluirSelecionados = _excluirSelecionados.bind(this, $scope);
        $scope.marcarTodos = _marcarTodos.bind(this, $scope);
        $scope.buscaquestionarios();
    }

    function _marcarTodos($scope) {
        _.each($scope.questionarios, function (questionario) {
            questionario.excluir = $scope.todos;
        });
    }

   function _excluirSelecionados($scope, questionarioId) {
        if (confirm('Confirma a exlusão do questionario?')) {
            _.each($scope.questionarios, function (questionario, id) {
                if (questionario.excluir) {
                    var questionarioRef = firebase.database().ref('/questionarios/' + id);
                    questionarioRef.remove();
                }
            });

        }
    }
    function _buscaquestionarios($scope) {
       
    }

    function _excluiQuestionario($scope, id) {
        if (confirm('Confirma a exclusão do questionario?')) {
            var questionariosRef = firebase.database().ref('/questionarios/' + id);
            questionariosRef.remove();
        }


    }



    function _loadQuestionarios($scope) {
        $scope.questionarios = {};
        var questionariosRef = firebase.database().ref('/questionarios/');

        questionariosRef.on('child_added', _carregarQuestionario.bind(this, $scope));

        questionariosRef.on('child_changed', _carregarQuestionario.bind(this, $scope));

        questionariosRef.on('child_removed', function (data) {
            delete $scope.questionarios[data.key];
            Utils.apply($scope);
        });

    }

    //Controller do form
    function questionarioCtrl($scope, $state, $stateParams) {

        $scope.gravar = _gravar.bind(this, $scope, $state);
        $scope.adicionarPergunta = _adicionarPergunta.bind(this, $scope);
        $scope.filtrarPergunta = _filtrarPergunta.bind(this, $scope);
        $scope.loadPerguntaQuestionario = _loadPerguntaQuestionario.bind(this, $scope);
        $scope.removePergunta = _removerPergunta.bind(this, $scope);



        _loadPergunta($scope);

        _loadQuestionario.apply(this, [$scope, $stateParams]);


    }





    function _loadPerguntaQuestionario($scope) {
        var vm = this;
        $scope.perguntaQuestionario = [];
        _.each(vm.perguntas, function (perguntaId) {
            var perguntaRef = firebase.database().ref('/perguntas/' + perguntaId);
            perguntaRef.on('value', function (data) {
                var key = data.key
                    , pergunta = data.val();
                $scope.perguntaQuestionario.push({
                    id: key
                    , texto: pergunta.texto
                    , tipo: pergunta.tipo,

                });
                $scope.filtrarPergunta();

                function _apply($scope) {
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            });
        });

    }

    function _loadQuestionario($scope, $stateParams) {
        var vm = this
            , id = $stateParams.id;

        if (id && id !== 'new') {
            var questionarioRef = firebase.database().ref('/questionarios/' + id);
            questionarioRef.on('value', function (data) {
                var questionario = data.val();
                _.extend(vm, questionario);
                vm.id = data.key;
                $scope.loadPerguntaQuestionario();
                $scope.filtrarPergunta();


            });

        }
    }

    function _gravar($scope, $state) {
        var vm = this;
        if ($scope.formquestionario.$valid) {
            var questionario = {
                nome: vm.nome,

            };
            var novaquestionario = firebase.database().ref('/questionarios').push(questionario);
            $state.go('questionarios');
        }
    }


    function _carregarQuestionario($scope, data) {
        var id = data.key
            , questionario = data.val();
        $scope.questionarios[id] = questionario;


        Utils.apply($scope);
    }



    function _filtrarPergunta($scope) {
        var vm = this;
        if ($scope.perguntasBanco && vm.perguntas) {
            $scope.perguntas = _.reject($scope.perguntasBanco, function (pergunta) {
                return _.some(vm.perguntas, function (a) {
                    return a === pergunta.id;
                });
            });

        } else {
            $scope.perguntas = $scope.perguntasBanco;
        }
        Utils.apply($scope);
    }

    function _loadPergunta($scope) {
        var perguntasRef = firebase.database().ref('/perguntas');
        $scope.perguntasBanco = [];

        perguntasRef.on('child_added', function (data) {
            var id = data.key
                , pergunta = data.val();

            $scope.perguntasBanco.push({
                "id": id
                , "texto": pergunta.texto
            });
            $scope.filtrarPergunta();

        });

        perguntasRef.on('child_changed', function (data) {
            var id = data.key
                , pergunta = data.val();
            _.each($scope.perguntasBanco, function (p) {
                if (p.id === id) {
                    p.texto = pergunta.texto;
                    return;
                }
            });
            $scope.filtrarPergunta();
        });

        perguntasRef.on('child_removed', function (data) {
            var id = data.key;
            $scope.perguntasBanco = _.reject($scope.perguntasBanco, function (p) {
                return p.id === id;
            });
            $scope.filtrarPergunta();
        });
    }

    function _adicionarPergunta($scope, pergunta) {
        var vm = this;
        vm.perguntas = vm.perguntas || [];
        vm.perguntas.push(pergunta.id);
        firebase
            .database()
            .ref('/questionarios/' + vm.id)
            .update({
                perguntas: vm.perguntas
            })
            .then(function () {
                $scope.filtrarPergunta();
            });
    }

    function _removerPergunta($scope, perguntaId) {
        var vm = this;
        vm.perguntas = _.reject(vm.perguntas, function (a) {
            return a === perguntaId;
        });

        firebase
            .database()
            .ref('/questionarios/' + vm.id)
            .update({
                perguntas: vm.perguntas
            })
            .then(function () {
                $scope.filtrarPergunta();
            });
    }
})();