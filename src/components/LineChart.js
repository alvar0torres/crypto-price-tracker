import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

import classes from "./LineChart.module.scss";


const LineChart = ({ id }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const currency = "usd";

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      )
      .then((res) => {
        setHistoricData(res.data.prices);
        console.log(res.data.prices);
      })
      .catch((error) => alert("Something went wrong"));
  }, [days, id]);


  const changeTimeRangeHandler = (time) => {
    setDays(time);
  };

  return (
    <section>
      <div className="header">
        <div className="links"></div>
      </div>
      {historicData && (
        <Line
          data={{
            labels: historicData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),

            datasets: [
              {
                data: historicData.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency.toUpperCase()}`,
                borderColor: "#11d811",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      )}
      <div className={classes.buttons}>
          <button className={classes.button} onClick={() => changeTimeRangeHandler(1)}>24 Hours</button>
          <button className={classes.button} onClick={() => changeTimeRangeHandler(30)}>30 Days</button>
          <button className={classes.button} onClick={() => changeTimeRangeHandler(90)}>3 months</button>
          <button className={classes.button} onClick={() => changeTimeRangeHandler(365)}>1 Year</button>
      </div>
    </section>
  );
};

export default LineChart;
