import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [searchString, setSearchString] = useState("");
  const startTime = useRef(new Date());

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log("검색 쿼리:", event.target.value);
  };

  //debounce 테스트
  // useEffect(() => {
  //   const debounceTimer = setTimeout(() => {
  //     setSearchString(query);
  //     console.log("debounce 실행 : " + query);
  //   }, 2000);
  //   return () => clearTimeout(debounceTimer);
  // }, [query]);

  //throttle 테스트
  useEffect(() => {
    const newTime = new Date();
    const throttleTimer = setTimeout(() => {
      setSearchString(query);
      startTime.current = newTime;
    }, 2000 - (newTime - startTime.current));
    return () => clearTimeout(throttleTimer);
  }, [query]);

  return (
    <div className="container">
      <h1>
        debounce와 throttle을
        <br />
        이용한 검색
      </h1>
      <div>
        <h2>Debounce</h2>
        <input
          type="text"
          placeholder="Debounce를 이용한 검색..."
          onChange={handleChange}
        />
      </div>
      <div>
        <h2>Throttle</h2>
        <input
          type="text"
          placeholder="Throttle을 이용한 검색..."
          onChange={handleChange}
        />
      </div>
      <p>{searchString}</p>
    </div>
  );
}

export default App;
