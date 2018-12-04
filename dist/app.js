var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quiz = function (_React$Component) {
    _inherits(Quiz, _React$Component);

    function Quiz(props) {
        _classCallCheck(this, Quiz);

        return _possibleConstructorReturn(this, (Quiz.__proto__ || Object.getPrototypeOf(Quiz)).call(this, props));
    }

    _createClass(Quiz, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'Quiz ',
                this.props.quiz
            );
        }
    }]);

    return Quiz;
}(React.Component);

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App(props) {
        _classCallCheck(this, App);

        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this2.selectQuiz = function (selected) {
            console.log(selected);
            _this2.setState({
                status: 'quizzing',
                quiz: selected
            });
        };

        _this2.state = {
            status: 'browsing',
            quiz: null
        };
        return _this2;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            if (this.state.status === 'browsing') {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h1',
                        null,
                        'Select quiz you wish to take'
                    ),
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            { onClick: function onClick(e) {
                                    return _this3.selectQuiz(1);
                                } },
                            'Quiz 1'
                        ),
                        React.createElement(
                            'li',
                            { onClick: function onClick(e) {
                                    return _this3.selectQuiz(2);
                                } },
                            'Quiz 2'
                        )
                    )
                );
            } else if (this.state.status === 'quizzing') {
                return React.createElement(Quiz, { quiz: this.state.quiz });
            }
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("react_container"));