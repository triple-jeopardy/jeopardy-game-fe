import React, { Component } from 'react'
import request from 'superagent'

const URL = 'https://jservice.io/api/random?count=1';

export default class GamePage extends Component {
   state= {
        data: [],
        currentQuestion: '',
        title: '',
        answerInput: '',
        questionsRemaining: 5,
        score: 0,
        answeredRight: false,
        answeredWrong: false,
        inputForm: true,
        username: this.props.displayName
   }

   componentDidMount = async() => {
        let data = await request.get(URL)
        const removeSpecialRegex = /<[^>]*>/g

        // nice data wrangling, I always get nervous when I see `body[0].question` kind of things without some sanity checking: `body && bodybody.length && body[0].question`
        while(data.body[0].question === ''){
            data = await request.get(URL)
        }

        // this could use some comments, or at least a well-named function, to give future devs an idea of what's going on here
        if(data.body[0].answer.includes('<')){
          data.body[0].answer = data.body[0].answer.replace(removeSpecialRegex, "")
        }

       this.setState({ 
           currentQuestion: data.body[0].question,
           title: data.body[0].category.title,
           data: data.body[0]
        })
   }

   // would like some comments here explaining your reasoning for future devs
   checkAnswer = (userInput, answer) => {
       let rightAnswer = true;
       const regexSpecial = /[^\w\s/']/g;
       const splitInput = userInput.toLowerCase()
        .replace('the ', '')
        .replace('and ', '')
        .replace('an ', '')
        .replace('a ', '')
        .replace('or ', '')
        .replace('of ', '')
        .split(' ')
       const splitAnswer = answer.toLowerCase()
        .replace('&', 'and')
        .replace('an ', '')
        .replace('a ', '')
        .replace('the ', '')
        .replace('or ', '')
        .replace('of ', '')
        .replace(regexSpecial, '')
        .split(' ')
       splitInput.forEach(word => {
           if(!splitAnswer.includes(word)) {
               rightAnswer = false;
           }
       })
     return rightAnswer;
   }

   handleSubmit = async(e) => {
        e.preventDefault();
        if(this.checkAnswer(this.state.answerInput, this.state.data.answer)) {
            this.setState({
                answeredRight: true,
                answeredWrong: false,
                score: this.state.score + 1,
            })
        } else {
            this.setState({
                answeredRight: false,
                answeredWrong: true,
            })    
        }
        this.setState({
                inputForm: false,
                questionsRemaining: this.state.questionsRemaining - 1
            })
   }

   handleClick = async() => {
    let data = await request.get(URL)
    const removeSpecialRegex = /<[^>]*>/g
    while(data.body[0].question === ''){
        data = await request.get(URL)
    }

    if(data.body[0].answer.includes('<')){
      data.body[0].answer = data.body[0].answer = data.body[0].answer
      .replace(removeSpecialRegex, "")
    }

    this.setState({ 
        currentQuestion: data.body[0].question,
        title: data.body[0].category.title,
        data: data.body[0],
        inputForm: true,
        answeredRight: false,
        answeredWrong: false
     })
   } 

   handleResultsClick = async() => {
       const resultsObject = {
           total_score: this.state.score,           
       }
       await request.put(`https://enigmatic-springs-29291.herokuapp.com/api/results`, resultsObject)
       .set('Authorization', this.props.token)

       localStorage.setItem('SCORE_KEY', JSON.stringify(this.state.score))
       this.props.history.push('./results')
   }

    render() {
       const { currentQuestion, title, username } = this.state
        return (
            <div className='game-form'>
                <div className='current-game-data'>
                    <p>Questions Left: {this.state.questionsRemaining}</p>
                    <p>Score: {this.state.score}</p>
                </div>
            <div className='result-text'>
                {this.state.answeredRight && <p>You got it right!</p>}
                {this.state.answeredWrong && <p>Tough break, you got it wrong!
                    The answer was {this.state.data.answer}</p>}
            </div>
                {this.state.inputForm
                ? 
                <form onSubmit={this.handleSubmit}>
                    <div className='question-box'>
                        <p>Category: {title}</p>
                        <p>Question: {currentQuestion}</p>
                    </div>
                    <label>
                        <p>{username}, what is your answer?</p>
                        <input name='answer' onChange={(e) => this.setState({answerInput: e.target.value})}></input>
                    </label>
                    <button className="game-page-button">Answer</button>
                </form>
                // ooo, nested ternaries. I find them hard to read, but they do the trick!
                :  
                this.state.questionsRemaining > 0 
                ? 
                <button className="game-page-button" onClick={this.handleClick}>Next</button> 
                : 
                <button className="game-page-button" onClick={this.handleResultsClick} >Results</button>}
            </div>
        )
    }
}
