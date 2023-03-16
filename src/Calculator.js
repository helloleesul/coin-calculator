import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Calculator({
  amountCOIN,
  amountUSD,
  amountKRW,
  thisCOIN,
  setSearchToggle,
  searchToggle,
  searchCoins,
  onSearchInput,
  onChangeCount,
  onChangeCoin,
  onChangeAmount,
  modal,
  setModal,
}) {
  return (
    <div id="caclulator-wrap" className={modal ? "modal" : ""}>
      {modal ? (
        <button
          onClick={() => {
            if (modal) {
              setModal(false);
              window.scrollTo(0, 0);
            }
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      ) : (
        ""
      )}
      <div
        className="this-coin-header"
        onClick={() => {
          if (searchToggle) {
            setSearchToggle(false);
          }
        }}
      >
        <h2>
          {thisCOIN.name}
          <span className="symbol-style">{thisCOIN.symbol}</span>
        </h2>
        <p>{amountKRW}원</p>
      </div>

      <div className="caclulator">
        <div className="input-wrap">
          <p>{thisCOIN.name} 코인</p>
          <div>
            <input
              value={amountCOIN}
              onChange={onChangeCount}
              type="number"
              min="0"
            />
            <button
              className="coinlist-btn"
              onClick={() => setSearchToggle(!searchToggle)}
            >
              {thisCOIN.symbol}
            </button>
          </div>
          {searchToggle ? (
            <article id="search-coins-wrap">
              <input
                onChange={onSearchInput}
                type="search"
                placeholder="코인 종류를 검색하세요."
              />
              <span className="length">
                {searchCoins.length > 0
                  ? `검색 결과: ${searchCoins.length}건`
                  : "검색 결과 없음"}
              </span>
              <ul>
                {searchCoins.map((coin) => (
                  <li key={coin.id} onClick={() => onChangeCoin(coin)}>
                    {coin.name} ({coin.symbol})
                  </li>
                ))}
              </ul>
            </article>
          ) : null}
        </div>

        <span>=</span>

        <div className="input-wrap">
          <p>USD</p>
          <input
            value={amountUSD}
            onChange={onChangeAmount}
            type="number"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
