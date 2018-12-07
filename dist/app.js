var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appStatus = {
    browsing: 'b',
    creating: 'c',
    quizzing: 'q'
};

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.selectQuiz = function (selected) {
            _this.setState({
                status: appStatus['quizzing'],
                quiz: selected
            });
        };

        _this.createQuiz = function () {
            _this.setState({ status: appStatus['creating'] });
        };

        _this.addQuiz = function (newQuiz) {
            quizList = JSON.parse(JSON.stringify(_this.state.quizList));
            quizList.push(newQuiz);
            _this.setState({
                quizList: quizList
            });
        };

        _this.backToMenu = function () {
            _this.setState({
                status: appStatus['browsing']
            });
        };

        _this.renderQuizList = function () {
            return _this.state.quizList.map(function (q, i) {
                return React.createElement(
                    'li',
                    { key: i, onClick: function onClick(e) {
                            return _this.selectQuiz(q);
                        } },
                    q.name
                );
            });
        };

        _this.state = {
            status: appStatus['browsing'],
            quizList: _this.props.quizList,
            quiz: null
        };
        return _this;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            backButton = React.createElement(
                'button',
                { onClick: this.backToMenu },
                'Back to Menu'
            );

            if (this.state.status === appStatus['browsing']) {
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
                        this.renderQuizList()
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        { onClick: this.createQuiz },
                        ' + Create new Quiz '
                    )
                );
            } else if (this.state.status === appStatus['creating']) {
                return React.createElement(QuizMaker, {
                    addQuiz: this.addQuiz,
                    backButton: backButton,
                    backToMenu: this.backToMenu
                });
            } else if (this.state.status === appStatus['quizzing']) {
                return React.createElement(Quiz, { quiz: this.state.quiz, backButton: backButton });
            }
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { quizList: quizList }), document.getElementById("react_container"));