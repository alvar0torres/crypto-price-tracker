import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./BasicTable.module.scss";



function createData(image, name, symbol, price, priceChange, marketcap) {
  return { image, name, symbol, price, priceChange, marketcap };
}

export default function BasicTable(props) {

    const rows = [];
  
    props.filteredCoins.map((coin) =>
      rows.push(
        createData(
          coin.image,
          coin.name,
          coin.symbol,
          coin.current_price,
          coin.price_change_percentage_24h,
          coin.market_cap
        )
      )
    );
  

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, bgcolor: "whitesmoke" }}
        aria-label="simple table"
      >
        <TableHead className={classes.tableHead} sx={{ bgcolor: "white" }}>
          <TableRow>
            <TableCell>
              <strong>
                <h3>Name</h3>
              </strong>
            </TableCell>
            <TableCell align="right">
              <strong>
                <h3>Price</h3>
              </strong>
            </TableCell>
            <TableCell align="right">
              <strong>
                <h3>24h %</h3>
              </strong>
            </TableCell>
            <TableCell align="right">
              <strong>
                <h3>Market Cap</h3>
              </strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              hover
              key={Math.random() * 1000 + Math.random() * 1000}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className={classes.row}
            >
              <TableCell component="th" scope="row">
                <div className={classes["first-cell"]}>
                  <img
                    className={classes["first-cell__logo"]}
                    src={row.image}
                    alt="crypto-logo"
                  />
                  <span className={classes["first-cell__name"]}>
                    {row.name}
                  </span>
                  <span className={classes["first-cell__symbol"]}>
                    {row.symbol}
                  </span>
                </div>
              </TableCell>
              <TableCell align="right">
                <strong>${row.price.toLocaleString()}</strong>
              </TableCell>
              {row.priceChange > 0 && (
                <TableCell sx={{ color: "#11d811" }} align="right">
                  <strong>{row.priceChange}%</strong>
                </TableCell>
              )}
              {row.priceChange < 0 && (
                <TableCell sx={{ color: "#f00606" }} align="right">
                  <strong>{row.priceChange}%</strong>
                </TableCell>
              )}
              <TableCell align="right">
                <strong>${row.marketcap.toLocaleString()}</strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
