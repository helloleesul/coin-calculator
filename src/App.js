import { useEffect, useState } from "react";
import axios from "axios";
import CoinList from "./CoinList";
import Calculator from "./Calculator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faRotate } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  // 코인 리스트
  const [coins, setCoins] = useState([]);
  const [searchCoins, setSearchCoins] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // 현재 코인
  const [thisCOIN, setThisCOIN] = useState("");
  // 입력값 (코인,USD)
  const [amountCOIN, setAmountCOIN] = useState("");
  const [amountUSD, setAmountUSD] = useState("");
  // 계산값 (KRW)
  const [amountKRW, setAmountKRW] = useState("");
  // 환율
  const [exchangeRate, setExchangeRate] = useState("");

  async function getCoins() {
    await axios
      .get("https://api.coinpaprika.com/v1/tickers?quotes=USD,KRW")
      .then((response) => {
        const data = response.data;
        const firstCoinPrice = data[0].quotes.USD.price;
        const firstCoinPrice_KR = data[0].quotes.KRW.price;

        setCoins(data);
        setAmountCOIN(1);
        setExchangeRate(firstCoinPrice_KR / firstCoinPrice);
        setThisCOIN(data[0]);
        setAmountUSD(firstCoinPrice);
        setAmountKRW(firstCoinPrice * (firstCoinPrice_KR / firstCoinPrice));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (coins?.length === 0) {
      return;
    } else {
      setSearchCoins(
        coins.filter((coin) => {
          const re = new RegExp(searchInput, "gi");
          return coin.name.match(re);
        })
      );
    }
  }, [searchInput, coins]);

  useEffect(() => {
    getCoins();
  }, []);

  useEffect(() => {
    setSearchToggle(false);
  }, [modal]);

  function onSearchInput(e) {
    setSearchInput(e.target.value);
  }

  function onChangeCoin(value) {
    const coin = value;
    const coinPrice = coin.quotes.USD.price;
    setThisCOIN(coin);
    setAmountCOIN(1);
    setAmountUSD(coinPrice);
    setAmountKRW(coinPrice * exchangeRate);
    setSearchToggle(false);
  }

  function onChangeCoinModal(value) {
    onChangeCoin(value);
    setModal(true);
  }

  function onChangeCount(e) {
    const changeCoin = e.target.value;
    const thisCoinPrice = thisCOIN.quotes.USD.price;
    const resultAmount = changeCoin * thisCoinPrice;
    setAmountCOIN(changeCoin);
    setAmountUSD(resultAmount);
    setAmountKRW(resultAmount * exchangeRate);
  }

  function onChangeAmount(e) {
    const changeAmount = e.target.value;
    const thisCoinPrice = thisCOIN.quotes.USD.price;
    const resultCoin = changeAmount / thisCoinPrice;
    setAmountCOIN(resultCoin);
    setAmountUSD(changeAmount);
    setAmountKRW(changeAmount * exchangeRate);
  }

  return (
    <>
      <header>
        <div className="container">
          <div className="title-wrap">
            <h1>💰 암호화폐 가격 계산기</h1>
            <button
              onClick={() => {
                setLoading(true);
                getCoins();
              }}
            >
              <FontAwesomeIcon icon={faRotate} />
            </button>
            <button
              onClick={() => {
                setLoading(true);
                getCoins();
              }}
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </div>
          <p className="exchangeRate">
            ₩ 현재 환율
            <span className="empty-style">
              {exchangeRate ? exchangeRate.toLocaleString() : "-"}
            </span>
            원
          </p>
        </div>
      </header>

      <main className={modal ? "modal container" : "container"}>
        <article className={loading ? "loading-on" : "loading-off"}>
          <div>🤑</div>
        </article>
        <Calculator
          amountCOIN={amountCOIN}
          amountUSD={amountUSD}
          amountKRW={amountKRW.toLocaleString()}
          thisCOIN={thisCOIN}
          searchToggle={searchToggle}
          searchCoins={searchCoins}
          setSearchToggle={setSearchToggle}
          onChangeCount={onChangeCount}
          onSearchInput={onSearchInput}
          onChangeCoin={onChangeCoin}
          onChangeAmount={onChangeAmount}
          modal={modal}
          setModal={setModal}
        />
        <CoinList coinList={coins} onChangeCoin={onChangeCoinModal} />
      </main>

      <footer></footer>
    </>
  );
}

export default App;
