import './footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <p>&copy; {new Date().getFullYear()} G-tic-tac-toe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;