class QuestionMaker extends React.Component{
    constructor(props){
        super(props);
	}
	
	render(){
		q = this.props.question;
		return (
			<div>
				<div key={q.question} style={{border: '1px solid black'}}>{q.question}</div>
				<button onClick={() =>this.props.addQuestion(q)}>Add Question</button>
			</div>
		)
	}
}


class QuizMaker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newQuiz: {
                name: 'New Quiz',
                description: 'Add a description',
                questions: [
                    {
                        question: 'Some Question',
                        options: [
                            'bleh',
                            'brlblr',
                            'hoccana'
                        ],
                        answer: 0,
                        explanation: 'wassup'
                    }
                ]
            }
        }
    }
    
    addQuiz = () =>{
        this.props.addQuiz(this.state.newQuiz);
        this.props.backToMenu();
    }
    
    changeQuizInfo = (changeKey, val) =>{
        quiz = JSON.parse(JSON.stringify(this.state.newQuiz));
        quiz[changeKey] = val;
        this.setState({
            newQuiz: quiz
        })
    }
	
    addQuestion = (newQuestion) =>{
        questionList = JSON.parse(JSON.stringify(this.state.newQuiz.questions));
        questionList.push(newQuestion);
        this.changeQuizInfo('questions', questionList);
    }
    
    render(){
        questionMakers = 
            this.state.newQuiz.questions.map( q =>(
                <QuestionMaker question={q} addQuestion={this.addQuestion}/>
            ))
        
        return (
            <div>
                {this.props.backButton}
                <h1>Create a new Quiz</h1>

                <label htmlFor='quiz-name'>Quiz Name: </label>
                <input 
                    id='quiz-name'
                    type='text'
                    value={this.state.newQuiz.name}
                    onChange={(e) =>this.changeQuizInfo('name', e.target.value)}
                />
                <br></br>
                
                <label htmlFor='quiz-description'>Description: </label>
                <input 
                    id='quiz-description'
                    type='text'
                    value={this.state.newQuiz.description}
                    onChange={(e) =>this.changeQuizInfo('description', e.target.value)}
                />
                <br></br>
                <br></br>
                
                {questionMakers}
                
                <br></br>
                <button onClick={this.addQuiz}>+ Add Quiz</button>
            </div>
        )
    }
}