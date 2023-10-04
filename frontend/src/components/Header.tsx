import logo from '../logo.svg';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <h1>
        Movement Validator
      </h1>
    </header>
  )
}