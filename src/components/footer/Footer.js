import './footer.css';

function Footer () {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <p>&copy; {new Date().getFullYear()} G-tic-tac-toe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;