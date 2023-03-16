import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

function CoinList({ coinList, onChangeCoin }) {
  const [quotes, setQuotes] = useState("KRW");
  const [detail, setDetail] = useState(false);
  const [more, setMore] = useState(100);

  function onClickMore() {
    let SIZE = 100;
    if (more >= coinList.length - SIZE) {
      setMore(coinList.length);
    } else {
      setMore((prev) => {
        return prev + SIZE;
      });
    }
  }

  return (
    <div id="coinlist-wrap">
      <div className="title-wrap">
        <div>
          <h3>실시간 시세 순위 {more}</h3>

          <button
            onClick={() => {
              setDetail((prev) => !prev);
            }}
          >
            {detail ? "간단히" : "자세히"}
          </button>
        </div>
        <div>
          <FontAwesomeIcon icon={faGlobe} />
          <fieldset>
            <input
              type="radio"
              value="KRW"
              id="KRW"
              name="quotes"
              defaultChecked
              onChange={(e) => {
                setQuotes(e.target.value);
              }}
            />
            <label htmlFor="KRW" className={quotes === "KRW" ? "active" : ""}>
              KRW
            </label>
            <input
              type="radio"
              value="USD"
              id="USD"
              name="quotes"
              onChange={(e) => {
                setQuotes(e.target.value);
              }}
            />
            <label htmlFor="USD" className={quotes === "USD" ? "active" : ""}>
              USD
            </label>
          </fieldset>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>코인</th>
            <th>시세({quotes === "KRW" ? "원" : "달러"})</th>
            <th>1시간</th>
            <th>24시간</th>
            <th>7일</th>
            <th>24시간 거래량({quotes === "KRW" ? "원" : "달러"})</th>
            <th>시가총액({quotes === "KRW" ? "원" : "달러"})</th>
          </tr>
        </thead>
        <tbody>
          {coinList.slice(0, more).map((coin) => (
            <tr key={coin.id} onClick={() => onChangeCoin(coin)}>
              <td className="rank">
                <div>{coin.rank}</div>
              </td>
              <td className="name">
                <div>
                  <p>{coin.name}</p>
                  <span className="symbol-style">{coin.symbol}</span>
                </div>
              </td>
              <td className="price">
                <div>
                  {quotes === "KRW"
                    ? coin.quotes.KRW.price.toLocaleString()
                    : coin.quotes.USD.price.toLocaleString()}
                </div>
              </td>
              <td className="per-1h">
                <div
                  className={
                    coin.quotes.KRW.percent_change_1h > 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {quotes === "KRW"
                    ? coin.quotes.KRW.percent_change_1h
                    : coin.quotes.USD.percent_change_1h}
                  %
                </div>
              </td>
              <td className="per-24h">
                <div
                  className={
                    coin.quotes.KRW.percent_change_24h > 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {quotes === "KRW"
                    ? coin.quotes.KRW.percent_change_24h
                    : coin.quotes.USD.percent_change_24h}
                  %
                </div>
              </td>
              <td className="per-7d">
                <div
                  className={
                    coin.quotes.KRW.percent_change_7d > 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {quotes === "KRW"
                    ? coin.quotes.KRW.percent_change_7d
                    : coin.quotes.USD.percent_change_7d}
                  %
                </div>
              </td>
              <td className="vol-24h">
                <div>
                  {quotes === "KRW"
                    ? detail
                      ? coin.quotes.KRW.volume_24h.toLocaleString()
                      : (
                          coin.quotes.KRW.volume_24h / 1000000000
                        ).toLocaleString("ko-KR", { maximumFractionDigits: 1 })
                    : detail
                    ? coin.quotes.USD.volume_24h.toLocaleString()
                    : (
                        coin.quotes.USD.volume_24h / 1000000000
                      ).toLocaleString()}
                  {quotes === "KRW" ? (detail ? "" : "억") : detail ? "" : "B"}
                </div>
              </td>
              <td className="market-cap">
                <div>
                  {quotes === "KRW"
                    ? detail
                      ? coin.quotes.KRW.market_cap.toLocaleString()
                      : (
                          coin.quotes.KRW.market_cap / 1000000000
                        ).toLocaleString("ko-KR", { maximumFractionDigits: 1 })
                    : detail
                    ? coin.quotes.USD.market_cap.toLocaleString()
                    : (
                        coin.quotes.USD.market_cap / 1000000000
                      ).toLocaleString()}
                  {quotes === "KRW" ? (detail ? "" : "억") : detail ? "" : "B"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {more < coinList.length ? (
        <button onClick={onClickMore}>더보기</button>
      ) : (
        ""
      )}
    </div>
  );
}

export default CoinList;
