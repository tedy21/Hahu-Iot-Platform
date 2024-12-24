import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { database } from "../../Firebase/firebase";

function TwoDataGraph(props) {
    
    const series = [{
        name: 'Temperature',
        data: props.value
    },{
        name: 'Humidity',
        data: props.series2
    }];
    const options = {
        chart: {
            height: 300,
            type: "area"
        },
      
        
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis:{
            type: "datetime",
            categories: props.time
            

        },
        tooltip:{
            x: {
                format: "dd/MM/yy HH:mm:ss",
            },
        },
    };

  return (  
    <div>
      <br />
      <h2>Graph</h2>
      <br />
      <ReactApexChart options={options} series={series} />
    </div>
  )
}

export default TwoDataGraph
