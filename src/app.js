var appStatus = {
        browsing: 'b',
        creating: 'c',
        quizzing: 'q'
    }

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: appStatus['browsing'],
            quizList: this.props.quizList,
            quiz: null
        };
    }
    
    selectQuiz = (selected) =>{
        this.setState({
            status: appStatus['quizzing'],
            quiz: selected
        })
    }
    
    addQuiz = (newQuiz) =>{
        this.setState({status: appStatus['creating']});
    }
    
    backToMenu = () =>{
        this.setState({
            status: 'browsing'
        })
    }
    
    renderQuizList = () =>{
        return this.state.quizList.map( (q, i) =>{
            return <li key={i} onClick={(e) => this.selectQuiz(q)}>{q.name}</li>    
        })
    }
    
    render(){
        if(this.state.status === appStatus['browsing']){
            return (
                <div>
                    <h1>Select quiz you wish to take</h1>
                    <ul>
                        {this.renderQuizList()}
                    </ul>
                    <br></br>
                    <button onClick={this.addQuiz}> + Add Quiz </button>
                </div> 
            )
        } else if(this.state.status === appStatus['creating']){
            return (
                <div>
                    Create a new Quiz
                </div>
            )
        }else if(this.state.status === appStatus['quizzing']){
            return (
                <Quiz quiz={this.state.quiz} backToMenu={this.backToMenu}/>
            )
        }
    }
}

ReactDOM.render(<App quizList={quizList}/>, document.getElementById("react_container"))
