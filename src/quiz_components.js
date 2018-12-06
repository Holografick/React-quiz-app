class Question extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedAnswer : 0,
            status: 'unAnswered'
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
    
    checkAnswer = (e) =>{
        question = this.props.question;
        if(this.state.selectedAnswer == question.answer){
            status = 'correct';
            toAdd = 'right';
        } else{
            status = 'inCorrect';
            toAdd = 'wrong';
        }
        this.setState({
            status: status
        });
        this.props.updateScore(toAdd);
    }
    
    nextQuestion = () =>{
        this.setState({
            status: 'unAnswered'
        });
        this.props.nextQuestion();
    }
    
    questionBody = () =>{
        status = this.state.status;
        question = this.props.question;
        
        if(status === 'unAnswered'){
            return (
                <div>
                    <select onChange={this.changeAnswer} value={this.state.selectedAnswer}>
                        {this.renderOptions()}
                    </select>
                    <br></br>
                    <button onClick={this.checkAnswer}>Check</button>                
                </div>
            )
        } else {
            message = 
                status === 'correct'?  'Correct!' : ('WRONG!' + ' Correct answer is '+question.options[question.answer])
            return (
                <div>
                    <span>{message}</span>
                    <br></br>
                    <small>{this.props.question.explanation}</small>
                    <br></br>
                    <button onClick={this.nextQuestion}>Next ></button>
                </div>
            )
        }
    }
    
    render(){
        return (
            <div>
                <h3>{this.props.question.question}</h3>
                    {this.questionBody()}
            </div>
        )
    }
}


class Quiz extends React.Component{
    constructor(props){
        super(props),
        this.state = {
            phase: 'starting',
            currentQuestion: 0,
            right: 0,
            wrong: 0
        }
    }
    
    updateScore = (toAdd) =>{
        if(toAdd === 'right'){
            right = this.state.right+1
            wrong = this.state.wrong
        } else {
            wrong = this.state.wrong+1
            right = this.state.right
        }
        
        this.setState({
            right: right,
            wrong: wrong
        })
    }
    
    nextQuestion = () =>{
        nextNumber = this.state.currentQuestion + 1;
        if(nextNumber < this.props.quiz.questions.length){
            this.setState((state, props) => ({
                currentQuestion: state.currentQuestion + 1
            }))            
        } else {
            this.setState({phase: 'finished'})
        }
    }
    
    getQuizBody = () =>{
        totalQuestions = this.props.quiz.questions.length;
        if(this.state.phase === 'starting'){
            return (
                <div>
                    <span>{this.props.quiz.description}</span>
                    <br></br>
                    <span>Total Questions: {totalQuestions}</span>
                    <br></br>
                    <button onClick={()=>this.setState({phase:'quizzing'})}>Start</button>
                </div>
            )
        } else if(this.state.phase == 'quizzing'){
            questionNumber = this.state.currentQuestion + 1;
            return (
                <div>
                    <span>Right: {this.state.right} | Wrong: {this.state.wrong}</span>
                    <br></br>
                    <br></br>
                    <span><b>Question: {questionNumber}/{totalQuestions}</b></span>
                    <Question 
                        question={this.props.quiz.questions[this.state.currentQuestion]} 
                        nextQuestion={this.nextQuestion}
                        status='unAnswered'
                        updateScore={this.updateScore}
                    />
                </div>
            )
        } else if(this.state.phase == 'finished'){
            return (
                <div>
                    <h3>You got {this.state.right} out of {totalQuestions} questions right</h3>
                </div>
            )
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
