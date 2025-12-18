import {Component} from 'react'
import './MatchGame.css'
import {tabsList, imagesList} from './imageData'

const initialTime = 60

class MatchGame extends Component {
  state = {
    score: 0,
    time: initialTime,
    activeTabId: tabsList[0].tabId,
    isGameOver: false,
    currentImageUrl: imagesList[0].imageUrl,
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    const {time} = this.state
    if (time === 0) {
      clearInterval(this.timerId)
      this.setState({isGameOver: true})
    } else {
      this.setState(prevState => ({time: prevState.time - 1}))
    }
  }

  onClickTab = tabId => {
    this.setState({activeTabId: tabId})
  }

  onClickThumbnail = thumbnailId => {
    const {currentImageUrl} = this.state
    const clickedImage = imagesList.find(image => image.id === thumbnailId)
    
    if (clickedImage.imageUrl === currentImageUrl) {
      // Correct match
      this.setState(prevState => ({
        score: prevState.score + 1,
        currentImageUrl: this.getRandomImageUrl(),
      }))
    } else {
      // Incorrect match
      clearInterval(this.timerId)
      this.setState({isGameOver: true})
    }
  }

  getRandomImageUrl = () => {
    const {currentImageUrl} = this.state
    let randomIndex = Math.floor(Math.random() * imagesList.length)
    
    // Ensure we don't select the same image
    while (imagesList[randomIndex].imageUrl === currentImageUrl) {
      randomIndex = Math.floor(Math.random() * imagesList.length)
    }
    
    return imagesList[randomIndex].imageUrl
  }
  onClickPlayAgain = () => {
    // Clear existing timer if any
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    
    this.setState({
      score: 0,
      time: initialTime,
      activeTabId: tabsList[0].tabId,
      isGameOver: false,
      currentImageUrl: imagesList[0].imageUrl,
    })
    this.timerId = setInterval(this.tick, 1000)
  }
  renderTabs = () => {
    const {activeTabId} = this.state
    
    return (
      <ul className="tabs-container">
        {tabsList.map(tab => {
          const isActive = tab.tabId === activeTabId
          const tabBtnClassName = isActive ? 'tab-button active' : 'tab-button'
          
          return (
            <li key={tab.tabId}>
              <button
                type="button"
                className={tabBtnClassName}
                onClick={() => this.onClickTab(tab.tabId)}
              >
                {tab.displayText}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  renderThumbnails = () => {
    const {activeTabId} = this.state
    const filteredImages = imagesList.filter(
      image => image.category === activeTabId,
    )
    
    return (
      <ul className="thumbnails-container">
        {filteredImages.map(image => (
          <li key={image.id}>
            <button
              type="button"
              className="thumbnail-button"
              onClick={() => this.onClickThumbnail(image.id)}
            >
              <img
                src={image.thumbnailUrl}
                alt="thumbnail"
                className="thumbnail-image"
              />
            </button>
          </li>
        ))}
      </ul>
    )
  }

  renderGameView = () => {
    const {score, time, currentImageUrl} = this.state
    
    return (
      <div className="game-view-container">
        <div className="top-section">
          <div className="score-container">
            <p className="score-text">
              Score: <span className="score-value">{score}</span>
            </p>
            <div className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-image"
              />
              <p className="timer-text">{time} Sec</p>
            </div>
          </div>
          <img src={currentImageUrl} alt="match" className="match-image" />
        </div>
        {this.renderTabs()}
        {this.renderThumbnails()}
      </div>
    )
  }

  renderScoreCard = () => {
    const {score} = this.state
    
    return (
      <div className="score-card-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy-image"
        />
        <p className="score-card-title">YOUR SCORE</p>
        <p className="final-score">{score}</p>
        <button
          type="button"
          className="play-again-button"
          onClick={this.onClickPlayAgain}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="reset-image"
          />
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {isGameOver, score} = this.state
    
    return (
      <div className="app-container">
        <nav className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="logo"
          />
          <ul className="nav-content">
            <li>
              <p className="score-heading">Score: </p>
            </li>
            <li>
              <p className="score-value-nav">{score}</p>
            </li>
          </ul>
        </nav>
        <div className="game-container">
          {isGameOver ? this.renderScoreCard() : this.renderGameView()}
        </div>
      </div>
    )
  }}

export default MatchGame