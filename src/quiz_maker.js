class QuestionMaker extends React.Component{
    constructor(props){
        super(props);
	}
	
	render(){
		q = this.props.question;
		
		if(this.props.removable){
			removeButton =
				(<button onClick={() =>this.props.removeQuestion(this.props.number)}>
					Remove Question
				</button>)
		} else {
			removeButton = null;
		}
		
		return (
			<div style={{border: '1px solid black'}}>
				<input 
					type='text' 
					value={q.question} 
					onChange={(e) =>this.props.changeQuestionInfo(this.props.number, 'question', e.target.value)}
				/>
				<br></br>
				{removeButton}
				
				<br></br>
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
                questions: []
            }
        }
		this.state.newQuiz.questions.push(this.getDefaultQuestion())
    }
	
	getDefaultQuestion = () =>{
		return {
			question : 'Question ' + (this.state.newQuiz.questions.length+1),
			options: [
					'Option 1',
					'Option 2',
					'Option 3'
				],
				answer: 0,
				explanation: '...'	
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
	
	changeQuestionInfo = (qNumber, changeKey, val) =>{
		questionList = JSON.parse(JSON.stringify(this.state.newQuiz.questions));
		questionList[qNumber][changeKey] = val;
		this.changeQuizInfo('questions', questionList);
	}
	
    addQuestion = 
		(newQuestion) =>{
			questionList = JSON.parse(JSON.stringify(this.state.newQuiz.questions));
			if(!newQuestion){
				newQuestion = this.getDefaultQuestion()
			}
			questionList.push(newQuestion);
			this.changeQuizInfo('questions', questionList);
		}
		
	removeQuestion = (qNumber) =>{
		questionList = JSON.parse(JSON.stringify(this.state.newQuiz.questions));
		questionList.splice(qNumber, 1);
		this.changeQuizInfo('questions', questionList);
	}
    
    render(){
		questions = this.state.newQuiz.questions;
		questionsRemovable = questions.length > 1? true : false

        questionMakers = 
            questions.map( (q,i) =>(
                <QuestionMaker
					key={i}
					number={i}
					question={q}
					removeQuestion={this.removeQuestion}
					changeQuestionInfo={this.changeQuestionInfo}
					removable={questionsRemovable}
				/>
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
                Questions:
                {questionMakers}
                
				<br></br>
				<button onClick={() => this.addQuestion()}>Add another question</button>
                
				<br></br>
                <button onClick={this.addQuiz}>+ Add Quiz</button>
            </div>
        )
    }
}