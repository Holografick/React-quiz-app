var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Question = function (_React$Component) {
    _inherits(Question, _React$Component);

    function Question(props) {
        _classCallCheck(this, Question);

        var _this = _possibleConstructorReturn(this, (Question.__proto__ || Object.getPrototypeOf(Question)).call(this, props));

        _this.renderOptions = function () {
            return _this.props.question.options.map(function (o, i) {
                return React.createElement(
                    'option',
                    { value: i, key: i },
                    o
                );
            });
        };

        _this.changeAnswer = function (e) {
            _this.setState({
                selectedAnswer: e.target.value
            });
        };

        _this.checkAnswer = function (e) {
            question = _this.props.question;
            if (_this.state.selectedAnswer == question.answer) {
                status = 'correct';
                toAdd = 'right';
            } else {
                status = 'inCorrect';
                toAdd = 'wrong';
            }
            _this.setState({
                status: status
            });
            _this.props.updateScore(toAdd);
        };

        _this.nextQuestion = function () {
            _this.setState({
                status: 'unAnswered'
            });
            _this.props.nextQuestion();
        };

        _this.questionBody = function () {
            status = _this.state.status;
            question = _this.props.question;

            if (status === 'unAnswered') {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'select',
                        { onChange: _this.changeAnswer, value: _this.state.selectedAnswer },
                        _this.renderOptions()
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        { onClick: _this.checkAnswer },
                        'Check'
                    )
                );
            } else {
                message = status === 'correct' ? 'Correct!' : 'WRONG!' + ' Correct answer is ' + question.options[question.answer];
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'span',
                        null,
                        message
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'small',
                        null,
                        _this.props.question.explanation
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        { onClick: _this.nextQuestion },
                        'Next >'
                    )
                );
            }
        };

        _this.state = {
            selectedAnswer: 0,
            status: 'unAnswered'
        };
        return _this;
    }

    _createClass(Question, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h3',
                    null,
                    this.props.question.question
                ),
                this.questionBody()
            );
        }
    }]);

    return Question;
}(React.Component);

var Quiz = function (_React$Component2) {
    _inherits(Quiz, _React$Component2);

    function Quiz(props) {
        var _temp, _this2;

        _classCallCheck(this, Quiz);

        (_temp = (_this2 = _possibleConstructorReturn(this, (Quiz.__proto__ || Object.getPrototypeOf(Quiz)).call(this, props)), _this2), _this2.updateScore = function (toAdd) {
            if (toAdd === 'right') {
                right = _this2.state.right + 1;
                wrong = _this2.state.wrong;
            } else {
                wrong = _this2.state.wrong + 1;
                right = _this2.state.right;
            }

            _this2.setState({
                right: right,
                wrong: wrong
            });
        }, _this2.nextQuestion = function () {
            nextNumber = _this2.state.currentQuestion + 1;
            if (nextNumber < _this2.props.quiz.questions.length) {
                _this2.setState(function (state, props) {
                    return {
                        currentQuestion: state.currentQuestion + 1
                    };
                });
            } else {
                _this2.setState({ phase: 'finished' });
            }
        }, _this2.getQuizBody = function () {
            totalQuestions = _this2.props.quiz.questions.length;
            if (_this2.state.phase === 'starting') {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'span',
                        null,
                        _this2.props.quiz.description
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'span',
                        null,
                        'Total Questions: ',
                        totalQuestions
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        { onClick: function onClick() {
                                return _this2.setState({ phase: 'quizzing' });
                            } },
                        'Start'
                    )
                );
            } else if (_this2.state.phase == 'quizzing') {
                questionNumber = _this2.state.currentQuestion + 1;
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'span',
                        null,
                        'Right: ',
                        _this2.state.right,
                        ' | Wrong: ',
                        _this2.state.wrong
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'b',
                            null,
                            'Question: ',
                            questionNumber,
                            '/',
                            totalQuestions
                        )
                    ),
                    React.createElement(Question, {
                        question: _this2.props.quiz.questions[_this2.state.currentQuestion],
                        nextQuestion: _this2.nextQuestion,
                        status: 'unAnswered',
                        updateScore: _this2.updateScore
                    })
                );
            } else if (_this2.state.phase == 'finished') {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h3',
                        null,
                        'You got ',
                        _this2.state.right,
                        ' out of ',
                        totalQuestions,
                        ' questions right'
                    )
                );
            }
        }, _temp), _this2.state = {
            phase: 'starting',
            currentQuestion: 0,
            right: 0,
            wrong: 0
        };
        return _this2;
    }

    _createClass(Quiz, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.props.backButton,
                React.createElement(
                    'h2',
                    null,
                    this.props.quiz.name
                ),
                this.getQuizBody()
            );
        }
    }]);

    return Quiz;
}(React.Component);