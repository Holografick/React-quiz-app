var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestionMaker = function (_React$Component) {
	_inherits(QuestionMaker, _React$Component);

	function QuestionMaker(props) {
		_classCallCheck(this, QuestionMaker);

		var _this = _possibleConstructorReturn(this, (QuestionMaker.__proto__ || Object.getPrototypeOf(QuestionMaker)).call(this, props));

		_this.state = {
			options: _this.props.question.options
		};
		return _this;
	}

	_createClass(QuestionMaker, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			q = this.props.question;

			if (this.props.removable) {
				removeButton = React.createElement(
					'button',
					{ onClick: function onClick() {
							return _this2.props.removeQuestion(_this2.props.number);
						} },
					'Remove Question'
				);
			} else {
				removeButton = null;
			}

			renderOptions = function renderOptions() {
				return q.options.map(function (o, i) {
					return React.createElement(
						'div',
						{ key: i },
						React.createElement('input', {
							type: 'text',
							value: o,
							onChange: function onChange(e) {
								return _this2.props.changeOptions(_this2.props.number, i, e.target.value);
							}
						}),
						React.createElement('br', null)
					);
				});
			};

			return React.createElement(
				'div',
				{ style: { border: '1px solid black' } },
				React.createElement(
					'label',
					null,
					'Question: '
				),
				React.createElement('input', {
					type: 'text',
					value: q.question,
					onChange: function onChange(e) {
						return _this2.props.changeQuestionInfo(_this2.props.number, 'question', e.target.value);
					}
				}),
				React.createElement('br', null),
				React.createElement(
					'label',
					null,
					'Options:'
				),
				renderOptions(),
				React.createElement('br', null),
				removeButton,
				React.createElement('br', null)
			);
		}
	}]);

	return QuestionMaker;
}(React.Component);

var QuizMaker = function (_React$Component2) {
	_inherits(QuizMaker, _React$Component2);

	function QuizMaker(props) {
		_classCallCheck(this, QuizMaker);

		var _this3 = _possibleConstructorReturn(this, (QuizMaker.__proto__ || Object.getPrototypeOf(QuizMaker)).call(this, props));

		_this3.getDefaultQuestion = function () {
			return {
				question: 'Question ' + (_this3.state.newQuiz.questions.length + 1),
				options: ['Option 1', 'Option 2', 'Option 3'],
				answer: 0,
				explanation: '...'
			};
		};

		_this3.addQuiz = function () {
			_this3.props.addQuiz(_this3.state.newQuiz);
			_this3.props.backToMenu();
		};

		_this3.changeQuizInfo = function (changeKey, val) {
			quiz = JSON.parse(JSON.stringify(_this3.state.newQuiz));
			quiz[changeKey] = val;
			_this3.setState({
				newQuiz: quiz
			});
		};

		_this3.changeQuestionInfo = function (qNumber, changeKey, val) {
			questionList = JSON.parse(JSON.stringify(_this3.state.newQuiz.questions));
			questionList[qNumber][changeKey] = val;
			_this3.changeQuizInfo('questions', questionList);
		};

		_this3.changeOptions = function (qNumber, oNumber, val) {
			questionList = JSON.parse(JSON.stringify(_this3.state.newQuiz.questions));
			questionList[qNumber].options[oNumber] = val;
			_this3.changeQuestionInfo(qNumber, 'options', questionList[qNumber].options);
		};

		_this3.addQuestion = function (newQuestion) {
			questionList = JSON.parse(JSON.stringify(_this3.state.newQuiz.questions));
			if (!newQuestion) {
				newQuestion = _this3.getDefaultQuestion();
			}
			questionList.push(newQuestion);
			_this3.changeQuizInfo('questions', questionList);
		};

		_this3.removeQuestion = function (qNumber) {
			questionList = JSON.parse(JSON.stringify(_this3.state.newQuiz.questions));
			questionList.splice(qNumber, 1);
			_this3.changeQuizInfo('questions', questionList);
		};

		_this3.state = {
			newQuiz: {
				name: 'New Quiz',
				description: 'Add a description',
				questions: []
			}
		};
		_this3.state.newQuiz.questions.push(_this3.getDefaultQuestion());
		return _this3;
	}

	_createClass(QuizMaker, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			questions = this.state.newQuiz.questions;
			questionsRemovable = questions.length > 1 ? true : false;

			questionMakers = questions.map(function (q, i) {
				return React.createElement(QuestionMaker, {
					key: i,
					number: i,
					question: q,
					removeQuestion: _this4.removeQuestion,
					changeQuestionInfo: _this4.changeQuestionInfo,
					changeOptions: _this4.changeOptions,
					removable: questionsRemovable
				});
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
						return _this4.changeQuizInfo('name', e.target.value);
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
						return _this4.changeQuizInfo('description', e.target.value);
					}
				}),
				React.createElement('br', null),
				React.createElement('br', null),
				'Questions:',
				questionMakers,
				React.createElement('br', null),
				React.createElement(
					'button',
					{ onClick: function onClick() {
							return _this4.addQuestion();
						} },
					'Add another question'
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