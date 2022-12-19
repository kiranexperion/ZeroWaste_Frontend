import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from 'react-router-dom';
import { Line } from "react-chartjs-2";
import './WasteReport.css';
// import classes from './UserProfile.module.css';
import classes from './allocatecollectorlanding.module.css';
import { registerLocale } from "react-datepicker";
import { Bar, 
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from "recharts";

const WasteReport = () => {
  let auth =  sessionStorage.getItem('jwt');
    const[graphData,setGraphData]=useState();
    const [wasteid, setWasteid] = useState('');
    const [wasteData, setWasteData] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
      getWasteData();
      },[]);
        
    const getWasteData = () => {
      fetch("http://127.0.0.1:8000/zerowaste/wastelist/",
      {
        
        method: "GET",
      }).then((response) => {
          return response.json();
        })
        .then(function (data) {
          setWasteData(data);
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    const handleWasteid =(e)=> {
      e.preventDefault();
      setWasteid(e.target.value);
      fetchGraphdata(e.target.value);
    }

    const submitHandler = (event) => 
    {
      navigate('/allocatecollector'); 
    }

    const fetchGraphdata = (value) => {
      console.log(value);
      fetch('http://127.0.0.1:8000/zerowaste/corporation/wastereport/',
      {
        headers:{
          Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': auth,
           },
        method: "POST",
        body: JSON.stringify({
          wasteid: value,       
        })
      }).then((response) => {
        console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          getGraphData(data);
        })
        .catch(err => {
          console.log(err);
        });
    }

    const getGraphData = (data) => {
      let labels=[]
      let values=[]
      console.log(data)
      data.forEach(wardData => {
        for (var key in wardData){
          labels.push({
            wardname: key,
            value: wardData[key]
          })
        }
      }); 
      console.log(labels)
      setGraphData(labels);

    }

    return (
      <div className="graph" >
        <h2><b>Waste Report</b></h2>
        <label className="itemm">Waste Type :
          <div className="dropdown">
            <select onChange={(e) => handleWasteid(e)}
            placeholder="Select Waste Type"
            >
              {wasteData?.map(waste => {
                  return (<option key={waste.id} value={waste.id}>{waste.waste_type}</option>);
              })}
            </select>
          </div>
        </label>
        <BarChart
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          barSize={20}
        >
          <XAxis dataKey="wardname" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
            <button type="submit" onClick={submitHandler} >Allocate Collector </button>
      </div>

    );
};

export default WasteReport;