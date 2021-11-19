import { useNavigate } from "react-router-dom";

import classes from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();


  return (
    <header className={classes.header}>
      <h1 onClick={() => navigate("/")}>Crypto Price Tracker</h1>
    </header>
  );
};

export default Header;
