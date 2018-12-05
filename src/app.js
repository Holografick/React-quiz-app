const quizzes = [
    {
        name: 'Some Quiz',
        description: 'This is some quiz',
        questions: [
            {
                question: 'How is life?',
                options: [
                    'Good',
                    'Bad',
                    'Meh'
                ],
                answer: 2,
                explanation: 'Life can not be good or bad, it can only be Meh'
            }
        ]
    },
    {
        name: 'Other Quiz',
        description: 'This is the other quiz',
        questions: [
            {
                question: 'Are you stupid?',
                options: [
                    'Yes',
                    'No',
                    'I R Baboon'
                ],
                answer: 0,
                explanation: 'You are actually stupid'
            }
        ]
    },
    
]

class Question extends React.Component{
    constructor(props){
        super(props)
    }
    
    renderOptions = () =>{
        return this.props.question.options.map( (o, i) =>{
            return <option value={i}>{o}</option>
        })
    }
    
    render(){
        return (
            <div>
                <h3>{this.props.question.question}</h3>
                <select>
                    {this.renderOptions()}
                </select>
            </div>
        )
    }
}

class Quiz extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div>
                <button onClick={this.props.backToMenu}>Back to Menu</button>
                <h3>{this.props.quiz.name}</h3>
                <span>{this.props.quiz.description}</span>
                <Question question={this.props.quiz.questions[0]} />
            </div>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'browsing',
            quiz: null
        };
    }
    
    selectQuiz = (selected) =>{
        this.setState({
            status: 'quizzing',
            quiz: selected
        })
    }
    
    backToMenu = () =>{
        this.setState({
            status: 'browsing'
        })
    }
    
    quizList = () =>{
        return this.props.quizzes.map( (q) =>{
            return <li key={q.name} onClick={(e) => this.selectQuiz(q)}>{q.name}</li>    
        })
    }
    
    render(){
        if(this.state.status === 'browsing'){
            return (
                <div>
                    <h1>Select quiz you wish to take</h1>
                    <ul>
                        {this.quizList()}
                    </ul>
                </div>            
            )
        } else if(this.state.status === 'quizzing'){
            return (
                <Quiz quiz={this.state.quiz} backToMenu={this.backToMenu}/>
            )
        }
    }
}

ReactDOM.render(<App quizzes={quizzes}/>, document.getElementById("react_container"))
