class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'browsing',
            quizList: this.props.quizList,
            quiz: null
        };
    }
    
    selectQuiz = (selected) =>{
        this.setState({
            status: 'quizzing',
            quiz: selected
        })
    }
    
    addQuiz = (newQuiz) =>{
        quizList = this.state.quizList;
        quizList.push({
            name: 'New Quiz',
            description: 'This is a new quiz',
            questions: [
                {
                    question: 'Is this a new quiz?',
                    options: [
                        'Yes',
                        'No',
                        'I dont know'
                    ],
                    answer: 0,
                    explanation: 'Ofcourse it is'
                },
                {
                    question: 'Is this an old quiz?',
                    options: [
                        'Yes',
                        'No',
                        'Meh'
                    ],
                    answer: 2,
                    explanation: 'Oldness is relative'
                }
            ]
        });
        this.setState({quizList: quizList});
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
        if(this.state.status === 'browsing'){
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
        } else if(this.state.status === 'quizzing'){
            return (
                <Quiz quiz={this.state.quiz} backToMenu={this.backToMenu}/>
            )
        }
    }
}

ReactDOM.render(<App quizList={quizList}/>, document.getElementById("react_container"))
