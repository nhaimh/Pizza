import './Header.css';
import Nav from './Nav/Nav.js';

const Header = () => {
  let randomBar = ['pizza1.jpeg', 'pizza2.jpeg', 'pizza3.jpeg', 'pizza4.jpeg']
  let pizza = randomBar[Math.floor(Math.random() * randomBar.length)];

  return (
    <>
      <header className="headerBar">
        <img src={`../../img/${pizza}`} />
      </header>
      <Nav />
    </>

  )
}

export default Header;