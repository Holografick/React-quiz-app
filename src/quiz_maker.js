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
    
    render(){
        questionMakers = 
            this.state.newQuiz.questions.map( q =>(
                <li>{q.question}</li>
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
                <ul>{questionMakers}</ul>
                
                <br></br>
                <button onClick={this.addQuiz}>+ Add Quiz</button>
            </div>
        )
    }
}