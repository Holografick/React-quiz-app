const quizzes = [
    {
        name: 'Some Quiz',
        description: 'This is some quiz'
    },
    {
        name: 'Other Quiz',
        description: 'This is the other quiz'
    },
    
]

class Quiz extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div>
                <h3>{this.props.quiz.name}</h3>
                <span>{this.props.quiz.description}</span>
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
    
    quizList = () =>{
        return this.props.quizzes.map( (q) =>{
            return <li key={q.name} onClick={(e) => this.selectQuiz(q)}>{q.name}</li>    
        })
    }
    
    render(){
                        // <li onClick={(e) => this.selectQuiz(1)}>Quiz 1</li>
                        // <li onClick={(e) => this.selectQuiz(2)}>Quiz 2</li>
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
                <Quiz quiz={this.state.quiz} />
            )
        }
    }
}

ReactDOM.render(<App quizzes={quizzes}/>, document.getElementById("react_container"))
