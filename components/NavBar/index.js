const NavBar = ({score, time}) => (
  <nav>
    <ul>
      <li>
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
        />
      </li>
      <li>
        <p>Score:</p>
        <p>{score}</p>
      </li>
      <li>
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
          alt="timer"
        />
        <p>{time} sec</p>
      </li>
    </ul>
  </nav>
)
export default NavBar
