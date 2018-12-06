var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuizMaker = function (_React$Component) {
    _inherits(QuizMaker, _React$Component);

    function QuizMaker(props) {
        _classCallCheck(this, QuizMaker);

        var _this = _possibleConstructorReturn(this, (QuizMaker.__proto__ || Object.getPrototypeOf(QuizMaker)).call(this, props));

        _this.addQuiz = function () {
            _this.props.addQuiz(_this.state.newQuiz);
            _this.props.backToMenu();
        };

        _this.changeQuizInfo = function (changeKey, val) {
            quiz = JSON.parse(JSON.stringify(_this.state.newQuiz));
            quiz[changeKey] = val;
            _this.setState({
                newQuiz: quiz
            });
        };

        _this.state = {
            newQuiz: {
                name: 'New Quiz',
                description: 'Add a description',
                questions: [{
                    question: 'Some Question',
                    options: ['bleh', 'brlblr', 'hoccana'],
                    answer: 0,
                    explanation: 'wassup'
                }]
            }
        };
        return _this;
    }

    _createClass(QuizMaker, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            questionMakers = this.state.newQuiz.questions.map(function (q) {
                return React.createElement(
                    'li',
                    null,
                    q.question
                );
            });

            return React.createElement(
                'div',
                null,
                this.props.backButton,
                React.createElement(
                    'h1',
                    null,
                    'Create a new Quiz'
                ),
                React.createElement(
                    'label',
                    { htmlFor: 'quiz-name' },
                    'Quiz Name: '
                ),
                React.createElement('input', {
                    id: 'quiz-name',
                    type: 'text',
                    value: this.state.newQuiz.name,
                    onChange: function onChange(e) {
                        return _this2.changeQuizInfo('name', e.target.value);
                    }
                }),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    { htmlFor: 'quiz-description' },
                    'Description: '
                ),
                React.createElement('input', {
                    id: 'quiz-description',
                    type: 'text',
                    value: this.state.newQuiz.description,
                    onChange: function onChange(e) {
                        return _this2.changeQuizInfo('description', e.target.value);
                    }
                }),
                React.createElement('br', null),
                React.createElement('br', null),
                'Questions:',
                React.createElement(
                    'ul',
                    null,
                    questionMakers
                ),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { onClick: this.addQuiz },
                    '+ Add Quiz'
                )
            );
        }
    }]);

    return QuizMaker;
}(React.Component);