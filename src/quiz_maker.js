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
    
    render(){
        return (
            <div>
                {this.props.backButton}
                <h1>Create a new Quiz</h1>
                <button onClick={this.addQuiz}>+ Add Quiz</button>
            </div>
        )
    }
}