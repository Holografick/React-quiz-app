class QuizMaker extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div>
            {this.props.backButton}
                <h1>Create a new Quiz</h1>
                
            </div>
        )
    }
}