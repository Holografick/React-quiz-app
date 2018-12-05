class Question extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedAnswer : 0
        }
    }
    
    renderOptions = () =>{
        return this.props.question.options.map( (o, i) =>{
            return <option value={i} key={i}>{o}</option>
        })
    }
    
    changeAnswer = (e) =>{
        this.setState({
            selectedAnswer: e.target.value
        });
    }
    
    render(){
        return (
            <div>
                <h3>{this.props.question.question}</h3>
                <select onChange={this.changeAnswer} value={this.state.selectedAnswer}>
                    {this.renderOptions()}
                </select>
            </div>
        )
    }
}


class Quiz extends React.Component{
    constructor(props){
        super(props),
        this.state = {
            phase: 'starting',
            currentQuestion: 0
        }
    }
    
    getQuizBody(){
        if(this.state.phase === 'starting'){
            return (
                <div>
                    <span>{this.props.quiz.description}</span>
                    <br></br>
                    <button onClick={()=>this.setState({phase:'quizzing'})}>Start</button>
                </div>
            )
        } else if(this.state.phase == 'quizzing'){
            return <Question question={this.props.quiz.questions[this.state.currentQuestion]} />
        }
    }
    
    render(){
        return (
            <div>
                <button onClick={this.props.backToMenu}>Back to Menu</button>
                <h2>{this.props.quiz.name}</h2>
                    {this.getQuizBody()}
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
