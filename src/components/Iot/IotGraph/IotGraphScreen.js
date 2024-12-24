import React,{useState, useEffect} from 'react'
import Records from './data.json'
import IotGraph from './IotGraph';
import { database } from "../../Firebase/firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import Chart from 'react-apexcharts'
import { stream } from "react-streams"
import { interval } from "rxjs"
import { map } from "rxjs/operators"
import FromStream from '../FromStream ';
import Kefir from 'kefir';
import TwoDataGraph from './TwoDataGraph'
function IotGraphScreen(props) {
  const date = new Date().toString();
  const nbOfElts = 20;
  const count$ = interval(250).pipe(map(count => ({ count })))
  const dateStream$ = interval(250).pipe(map(dateStream => new Date().toString()))

const DataStream = stream(date);
const Counter = stream(count$)


  const [loading, setLoading] = useState(true);

    let timestamps = [];
    let values = [];
    let values1 = [];
    
    let Sensor1Value = [];
    let Sensor1Time = [];

    const [sensor2Data, setSensor2Data] = useState({});
    let sensor2Value =[]; 
    let sensor2Time =[];
    const [temp, setTemp]= useState({});
    const [time, setTime]= useState({});

    const [temData, setTempData]= useState({});
    // Object.keys(Humidity).forEach(key =>{

    //     values1.push(Humidity[key].Value);
    // })



    useEffect(()=>{
      database.ref().child('users').child(props.authUser.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_1').limitToLast(nbOfElts).on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setTempData({ ...snapshot.val() });
          setLoading(false);
        } else {
          setTempData({});
        }
    })
    database.ref().child('users').child(props.authUser.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_2').limitToLast(nbOfElts).once("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setSensor2Data({ ...snapshot.val() });
        setLoading(false);
      } else {
        setSensor2Data({});
      }
  })
  //     const interval = setInterval(() => {
  //   //     database.ref().child('users').child(props.authUser.uid ).child('Devices').child('Device_1').child('Storage').child('Sensor_1').limitToLast(nbOfElts).on('value', ts_measures => {

     
  //   //       ts_measures.forEach(ts_measure => {
         
  //   //          //console.log(ts_measure.val().timestamp, ts_measure.val().value);
  //   //          timestamps.push(ts_measure.val().Ts);
  //   //          values.push(ts_measure.val().Value);
         
  //   //      });
  //   //    setTemp(values);
  //   //    setTime(timestamps);
  //   //    setLoading(false);
     
  //   //  });
  //   database.ref().child('users').child(props.authUser.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_1').limitToLast(nbOfElts).on("value", (snapshot) => {
  //     if (snapshot.val() !== null) {
  //       setTempData({ ...snapshot.val() });
         
  //     } else {
  //       setTempData({});
  //     }
  // })
  //       console.log('This will run every second!');
  //     }, 1000);
  //     return () => clearInterval(interval);
    

     
      // return ()=>{
      //     setData({});
      //     setUrl({})
      // }
      
  },[]);
  Object.keys(temData).forEach(key =>{

    timestamps.push( 
        
        new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(temData[key].Ts)
    );
    values.push(temData[key].Value);
})
Object.keys(sensor2Data).forEach(key =>{

  sensor2Time.push( 
      
      new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(sensor2Data[key].Ts)
  );
  sensor2Value.push(sensor2Data[key].Value);
})
  const plotdata =()=>{

         
    
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
          <div>DataStream
          <DataStream>{({ dataStream }) => <div>{dataStream}</div>}</DataStream>

          <h2>Subscribe to a Stream</h2>
          <Counter>{({ count }) => <div>{count}</div>}</Counter>
        </div>
              <div className="container">
      <div className="row text-center">
        <div className="col-12 sizingP">
          <h1>data plot</h1>
        <Chart
     type="line"
     width='100%'
     height={600}
    
     options={{
        chart: {
            toolbar: {
              show: true
            },
          },
      
          markers: {
            size: 3,
        },
        
          stroke: {
            curve: "smooth",
            show: true,
        
            lineCap: 'butt',
            colors: '#ff7300',
            width: 2,
            dashArray: 0, 
          } ,
         
          title: {
            text: 'Temperature Data',
            align: 'left'
          },  
          xaxis: {
            categories: timestamps,
            title: {
                text: 'Time the data recorded'
              },
              labels: {
                format: 'dd/MM',
                datetimeUTC: true,
                style: {
                    fontSize: '10px',
                    fontWeight: 600,
                },
                datetimeFormatter: {
                  year: 'yyyy',
                  month: 'MMM \'yy',
                  day: 'dd MMM',
                  hour: 'HH:mm'
                }
                
           },
           axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0
        },
        axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            height: 6,
            offsetX: 0,
            offsetY: 0
        },
          },
          yaxis: {
            title: {
              text: 'Temperature value'
            }
          }
      
      }}
      grid={{
        padding: {
          left: 0,
          right: 0
        }
      }} 
     series={ [{
         name: 'Temperature',
          data:  values
        
        }]}
    
     
     >


     </Chart>
        </div>
      </div>
    </div>
          <div className="box">
          <IotGraph time ={timestamps} value ={values} series2={sensor2Value} uid ={props.authUser.uid}/>
  
          </div>
          <div className="box">
          <TwoDataGraph time ={timestamps} value ={values} series2={sensor2Value} uid ={props.authUser.uid}/>
  
          </div>
        </div>
        }
   
    </div>
  )
}

export default IotGraphScreen