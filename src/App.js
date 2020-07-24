import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 96;
  let x = Math.floor((Math.random()*(max-min+1)+min)/4)*4;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/4)*4;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [4,0]
  ],
  status: false
}

class App extends Component {

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        this.startGame();
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        this.startGame();
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        this.startGame();
        break;
    }
  }

  moveSnake = () => {
    if (this.state.status) {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];

      switch (this.state.direction) {
        case 'RIGHT':
          head = [head[0] + 4, head[1]];
          break;
        case 'LEFT':
          head = [head[0] - 4, head[1]];
          break;
        case 'DOWN':
          head = [head[0], head[1] + 4];
          break;
        case 'UP':
          head = [head[0], head[1] - 4];
          break;
      }
      dots.push(head);
      dots.shift();
      this.setState({
        snakeDots: dots
      })
    }
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 30) {
      this.setState({
        speed: this.state.speed - 30
      })
    }
  }

  startGame() {
    this.setState({
      status: true
    })
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }

  render() {
    return (
      <div className="container">
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots}/>
          <Food dot={this.state.food}/>
        </div>
        <div className="info-area">
          <div className="info-box">
            <p>Score</p>
            <h3 className="game-info">{this.state.snakeDots.length - 2}</h3>
          </div>
          <div className="about-box">
            <a href="https://github.com/pauljoshi">
              <img src={process.env.PUBLIC_URL + '/logos/github.png'} className="icon" alt="Github" />
            </a>
            <a href="https://www.instagram.com/thepauljoshi/">
              <img src={process.env.PUBLIC_URL + '/logos/instagram.png'} className="icon" alt="Instagram" />
            </a>
            <a href="https://twitter.com/ThePaulJoshi">
              <img src={process.env.PUBLIC_URL + '/logos/twitter.png'} className="icon" alt="Twitter" />
            </a>
            <a href="https://www.facebook.com/ThePaulJoshi">
              <img src={process.env.PUBLIC_URL + '/logos/facebook.png'} className="icon" alt="Facebook" />
            </a>
            <a href="https://www.behance.net/pauljoshi">
              <img src={process.env.PUBLIC_URL + '/logos/behance.png'} className="icon" alt="Behance" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;