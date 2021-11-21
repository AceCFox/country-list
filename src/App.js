import './App.css';
import React from 'react';

function App() {
  const [selectedCountry, setSelectedCountry] = React.useState("USA");
  const [countries, setCountries] = React.useState([
   
    {
      code: "USA",
      adjacency:["CAN", "MEX"],
    },
    {
      code: "CAN",
      adjacency:["USA"],
    },
    {
      code: "MEX",
      adjacency:["USA", "BLZ", "GTM"],
    },
    {
      code: "GTM",
      adjacency:["MEX", "SLV", "HND", "BLZ"],
    },
    {
      code: "BLZ",
      adjacency:["MEX", "GTM"],
    },
    {
      code: "SLV",
      adjacency:["GTM", "HND"],
    },
    {
      code: "HND",
      adjacency:["SLV", "GTM", "NIC"],
    },
    {
      code: "NIC",
      adjacency:["HND", "CRI"],
    },
    {
      code: "CRI",
      adjacency:["PAN", "NIC"],
    },
    {
      code: "PAN",
      adjacency:["CRI"],
    },
  ])
  const [traveledCountries, setTraveledCountries ] = React.useState(['USA'])

  const handleOnChange = event => {
    //const { name, value } = event.target;
    console.log(event.target.value)
    setSelectedCountry(event.target.value);
    if (event.target.value === "USA"){
      setTraveledCountries(['USA'])
      console.log('already here')
      return;
    }
   shortestPath(event.target.value);
  };

  const shortestPath = function(endCountry){
    if(!endCountry){return}
    let traveled = ["USA"];
    let visited = {"USA":true}
    let predecessor = {}
    let tail = 0;// how many countries we have traveled through
    console.log('in shortest path function with selected country', endCountry)
    while(tail<traveled.length){
      let current = traveled[tail];
      let neighbors =countries.find(m=>m.code===current).adjacency;
      for(const neighbor of neighbors){
        if(visited[neighbor]){
          continue;
        }
        visited[neighbor] = true;
        if(neighbor === endCountry){//did we get there yet?
          let path = [  neighbor ];//back track and construct the path to get here
          while(current !== "USA"){
            path.push(current);
            current = predecessor[current];
          }
          path.push(current);
          path.reverse();
          console.log(path);
          setTraveledCountries(path);
          return
        }
        predecessor[neighbor] = current;
        traveled.push(neighbor);
        tail++;
      }
    }
    //setTraveledCountries(traveled);
    alert(`there is no way to get from USA to ${endCountry}, sorry!`)
    return 
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Select a country to travel to from the USA
        </p>
        <select name="selectedCountry" onChange={handleOnChange}>
          {countries.map((item, index)=>
            <option value={item.code} key={index}>
              {item.code}
            </option>
          )}
        </select>
        {/* <p>You are now in this country: {selectedCountry}</p> */}
        <p>You have travelled through the following countries:</p>
        <ul>
         {traveledCountries.map((item,index)=>
        <li key={index}>{item}</li>
         )}
        </ul>
      </header>
    </div>
  );
}

export default App;
