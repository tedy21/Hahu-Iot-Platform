import React,{useState, useEffect} from 'react'
import { database } from "../../Firebase/firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import TempData from "./TemperaturData.json"
import { v4 as uuidv4 } from "uuid";

export default function DownloadData(props) {
    const [loading, setLoading] = useState(true);

    const [sensor1Data, setSensor1Data] = useState({});
    let sensor1Value =[]; 
    let sensor1Time =[];

    const [sensor2Data, setSensor2Data] = useState({});
    let sensor2Value =[]; 
    let sensor2Time =[];
    useEffect(() => {
        database.ref().child('users').child(props.authUser.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_1').once("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setSensor2Data({ ...snapshot.val() });
              setLoading(false);
            } else {
              setSensor2Data({});
            }
        })
    }, []);


  const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {

    database.ref().child('users').child(props.authUser.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_1').once("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setSensor2Data({ ...snapshot.val() });
          setLoading(false);
        } else {
          setSensor2Data({});
        }
    })
  
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData =
      typeof JSONData !== "object" ? JSON.parse(JSONData) : JSONData;
    console.log(JSONData)
    var CSV = "";

    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }

      row = row.slice(0, -1);

      //append Label row with line break
      CSV += row + "\r\n";
    }
    CSV = '"' + 'Timestamp' + '", '  + 'Temperature' + ',' + "\r\n";;

    Object.keys(arrData).forEach(key =>{

        // Temperature[key].Value
        var row = "";
        row += '"' + arrData[key].Ts + '", '  + arrData[key].Value + ',';
       console.log(row);
        row.slice(0, row.length - 1);
        CSV += row + "\r\n";

    })
    //1st loop is to extract each row
    // for (var i = 0; i < arrData.length; i++) {
    //   var row = "";

    //   //2nd loop will extract each column and convert it in string comma-seprated
    //   for (var index in arrData[i]) {
    //     row += '"' + arrData[i][index] + '",';
    //   }
    //   console.log("bafore slice................1");

    //   console.log(row);
    //   row.slice(0, row.length - 1);
    //   console.log("After slice................1");

    //   console.log(row);
    //   //add a line break after each row
    //   CSV += row + "\r\n";
    // }

    if (CSV === "") {
      alert("Invalid data");
      return;
    }

    //Generate a file name
    const uuid4 = uuidv4();

    var fileName = "AASTU-Iot-CSV_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");
    fileName += "-" + uuid4;

    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


const exportJson = (JSONData, ReportTitle)=>{
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(JSONData)
    )}`;
    const link =document.createElement("a");
   link.href = jsonString;
   link.style = "visibility:hidden";
   var fileName = "AASTU-Iot-JSON_";
   //this will remove the blank-spaces from the title and replace it with an underscore
   fileName += ReportTitle.replace(/ /g, "_");
   const uuid4 = uuidv4();

   fileName += "-" + uuid4;
      link.download = fileName + "data.json";
   link.click();
}

  return (
 <div>
   
  {
      loading? 
      <div>
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open

  >

      <CircularProgress color="inherit" />

  </Backdrop>
  </div>
      :
      <div className="container">
      <div className="App p-5">
         <p>
           <b>Input JSON - </b>
           <button
             onClick={() => JSONToCSVConvertor(sensor2Data, "TEMPERATURE", false)} className="m-5"
           >
             Download CSV
           </button>
           <button
             onClick={() => exportJson(sensor2Data, "TEMPERATURE")} className="m-5"
           >
             Download Json
           </button>
   
          
         </p>
       
   
       
       </div>
      </div>
  }
 </div>


  );
  
}
