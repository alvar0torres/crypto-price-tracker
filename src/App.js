import { useState, useEffect } from "react";
import axios from "axios";
import BasicTable from "./components/BasicTable";
import classes from "./App.module.scss";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
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
    <div className={classes.app}>
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
      <BasicTable filteredCoins={filteredCoins} />
    </div>
  );
}

export default App;
