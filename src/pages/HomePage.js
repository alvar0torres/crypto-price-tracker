import { useState, useEffect } from "react";
import axios from "axios";
import BasicTable from "../components/BasicTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CircularProgress from "@mui/material/CircularProgress";

import classes from "./HomePage.module.scss";

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        setIsLoading(false);
      })
      .catch((error) => alert("Something went wrong"));
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  let filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className={classes["page-section"]}>
      <Header />
      <section className={classes["content-section"]}>
        <div className={classes.search}>
          <h1 className={classes.search__title}>Search a currency</h1>
          <form>
            <input
              type="text"
              placeholder="Search"
              className={classes.search__input}
              onChange={handleChange}
            ></input>
          </form>
        </div>
        {isLoading && <CircularProgress className={classes.spinner} color="success" />}
        {!isLoading && (
          <h1 className={classes["click-row"]}>
            Click on a row to see the charts.
          </h1>
        )}

        {!isLoading && <BasicTable filteredCoins={filteredCoins} />}
      </section>
      <Footer />
    </section>
  );
};

export default HomePage;
