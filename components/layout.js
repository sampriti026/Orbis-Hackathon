import Navbar from './navbar';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

export default Layout;
