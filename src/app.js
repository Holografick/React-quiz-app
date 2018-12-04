class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'browsing',
            quiz: null
        }
    }
    render(){
        if(this.state.status === 'browsing'){
            return (
                <div>Select quiz you wish to take</div>            
            )
        } else if(this.state.status === 'quizzing'){
            return (
                <div>Quizzing</div>
            )
        }
    }
}

ReactDOM.render(<App />, document.getElementById("react_container"))
