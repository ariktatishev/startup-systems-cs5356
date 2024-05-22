import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer footer-bg">
      <div className="container">
        <div className="columns">
          <div className="column">
            <h4 className="footer-h">Pibble Pet</h4>
            <p className="footer-p">
              Pibble Pet is a leading provider of innovative pet care solutions.
              We are committed to helping pet owners nurture their cat&rsquo;s
              well-being through advanced technology and personalized nutrition.
            </p>
          </div>
          <div className="column">
            <h4 className="footer-h">Products</h4>
            <ul>
              <li className="footer-li">
                <Link href="/app/products">Pibble One</Link>
              </li>
              <li className="footer-li">
                <Link href="/app/products">Replacement Rolls</Link>
              </li>
              <li className="footer-li">
                <Link href="/app/products">Pibbie Premium Subscription</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h4 className="footer-h">Company</h4>
            <ul>
              <li className="footer-li">
                <Link href="/#whyPibble">About Us</Link>
              </li>
              <li className="footer-li">
                <Link href="/contact">Contact</Link>
              </li>
              <li className="footer-li">
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h4 className="footer-h">Legal</h4>
            <ul>
              <li className="footer-li">
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li className="footer-li">
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="footer-p has-text-centered">
          &copy; {new Date().getFullYear()} Pibble Pet. All rights reserved. |
          CS 5356 Project
        </div>
      </div>
    </footer>
  );
};

export default Footer;
