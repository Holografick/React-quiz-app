class Quiz extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div>Quiz {this.props.quiz}</div>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'browsing',
            quiz: null
        }
    }
    
    selectQuiz = (selected) =>{
        console.log(selected);
        this.setState({
            status: 'quizzing',
            quiz: selected
        })
    }
    
    render(){
        if(this.state.status === 'browsing'){
            return (
                <div>
                    <h1>Select quiz you wish to take</h1>
                    <ul>
                        <li onClick={(e) => this.selectQuiz(1)}>Quiz 1</li>
                        <li onClick={(e) => this.selectQuiz(2)}>Quiz 2</li>
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

ReactDOM.render(<App />, document.getElementById("react_container"))
