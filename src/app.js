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
    
    createQuiz = () =>{
        this.setState({status: appStatus['creating']});
    }
    
    addQuiz = (newQuiz) =>{
        quizList = this.state.quizList;
        quizList.push(newQuiz);
        this.setState({
            quizList: quizList
        });
    }
    
    backToMenu = () =>{
        this.setState({
            status: appStatus['browsing']
        })
    }
    
    renderQuizList = () =>{
        return this.state.quizList.map( (q, i) =>{
            return <li key={i} onClick={(e) => this.selectQuiz(q)}>{q.name}</li>    
        })
    }
    
    render(){
        backButton = <button onClick={this.backToMenu}>Back to Menu</button>
        
        if(this.state.status === appStatus['browsing']){
            return (
                <div>
                    <h1>Select quiz you wish to take</h1>
                    <ul>
                        {this.renderQuizList()}
                    </ul>
                    <br></br>
                    <button onClick={this.createQuiz}> + Create new Quiz </button>
                </div> 
            )
        } else if(this.state.status === appStatus['creating']){
            return (
                <QuizMaker 
                    addQuiz={this.addQuiz}
                    backButton={backButton}
                    backToMenu={this.backToMenu}
                />
            )
        }else if(this.state.status === appStatus['quizzing']){
            return (
                <Quiz quiz={this.state.quiz} backButton={backButton}/>
            )
        }
    }
}

ReactDOM.render(<App quizList={quizList}/>, document.getElementById("react_container"))
