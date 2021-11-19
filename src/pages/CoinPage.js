import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../components/LineChart";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import CircularProgress from "@mui/material/CircularProgress";


import classes from "./CoinPage.module.scss";
//https://api.coingecko.com/api/v3/coins/id

const CoinPage = () => {
  const { id } = useParams();
  const [coinInfo, setCoinInfo] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => {
        setCoinInfo(res.data);
        setDescription(res.data.description.en.split(". ")[0]);
        setName(res.data.name);
        setImage(res.data.image.large);
        setIsLoading(false);
      })
      .catch((error) => alert("Something went wrong"));
  }, []);

  return (
    <section className={classes["page-section"]}>
      <Header />
      {isLoading && <CircularProgress className={classes.spinner} color="success" />}
      {!isLoading && <section className={classes["content-section"]}>
        <div className={classes["image-container"]}>
          <img src={image} />
        </div>
        <h1>{name}</h1>
        <div className={classes.description}>
          {ReactHtmlParser(description)}
        </div>
        <LineChart id={id} coin={coinInfo} />
      </section>}
      <Footer />
    </section>
  );
};

export default CoinPage;
