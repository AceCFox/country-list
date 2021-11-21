import './App.css';
import React from 'react';

function App() {
  const [selectedCountry, setSelectedCountry] = React.useState("USA");
  const [countries, setCountries] = React.useState([
   
    {
      code: "USA",
      adjacency:["CAN", "MEX"],
      name:"United States of America"
    },
    {
      code: "CAN",
      adjacency:["USA"],
      name: "Canada"
    },
    {
      code: "MEX",
      adjacency:["USA", "BLZ", "GTM"],
      name: 'Mexico'
    },
    {
      code: "GTM",
      adjacency:["MEX", "SLV", "HND", "BLZ"],
      name: "Guatemala"
    },
    {
      code: "BLZ",
      adjacency:["MEX", "GTM"],
      name: "Belize"
    },
    {
      code: "SLV",
      adjacency:["GTM", "HND"],
      name: "El Salvador",
    },
    {
      code: "HND",
      adjacency:["SLV", "GTM", "NIC"],
      name: "Honduras"
    },
    {
      code: "NIC",
      adjacency:["HND", "CRI"],
      name:'Nicaragua'
    },
    {
      code: "CRI",
      adjacency:["PAN", "NIC"],
      name:'Costa Rica'
    },
    {
      code: "PAN",
      adjacency:["CRI"],
      name: 'Panama'
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

  const shortestPath = endCountry => {
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

  const returnName = code =>{
      for(const countryObj of countries){
        if(countryObj.code === code){
          return countryObj.name
        }
      }
      return "Unknown";
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Select a country to travel to from the USA
        </p>
        <select name="selectedCountry" onChange={handleOnChange}>
          {countries.map((item, index)=>
            <option value={item.code} key={index}>
              {item.name}  ({item.code})
            </option>
          )}
        </select>
        {/* <p>You are now in this country: {selectedCountry}</p> */}
        <p>You have travelled through the following countries:</p>
        <ul>
         {traveledCountries.map((item,index)=>
        <li key={index}>{returnName(item)} ({item})</li>
         )}
        </ul>
      </header>
    </div>
  );
}

export default App;
