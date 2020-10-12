import React, { useState } from "react";
import BarChart from "./BarChart/BarChart"
import "./App.css";

const initialData = [25, 45, 30, 74, 38, 80, 160, 240, 200, 100];

function App() {
  const [data, setData] = useState(initialData)

  return <React.Fragment>
    <BarChart data={data}/>
    <br/>
    <button onClick={() => setData(data.map( val => val + 25))}>Update Data</button>
    <button onClick={() => setData(data.filter( value => value  < 50))}> Filter Data</button>
    <button onClick={() => setData([...data, Math.round(Math.random()*300)])}>Add Data</button>
    </React.Fragment>;
}

export default App;
