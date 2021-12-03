import './App.css';
import React,{useState,useEffect} from "react"
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import StopwatchDisplay from './Components/StopwatchDisplay';
import Controller from './Components/Controller';

let firstClickTime=0

function App() {
  const [time, setTime] = useState(0)
  const [watchOn,setWatchOn]=useState(false)
  const [selectAction,setSelectAction]=useState("")

  useEffect(() => {
    const unsubscribe = new Subject();
    interval(10)
        .pipe(takeUntil(unsubscribe))
        .subscribe(() => {
          if (watchOn) {
            setTime(val => val + 1);
          }
        });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [watchOn]);

  const startHandler=()=>{
    setWatchOn(true)
    setSelectAction("start")
  }

  const stopHandler=()=>{
    setWatchOn(false)
    setTime(0)
    setSelectAction("stop")
  }
 
  let waitHandler=(event)=>{
      let timeDelay=event.timeStamp-firstClickTime
      console.log(firstClickTime,event.timeStamp,timeDelay);
      if(timeDelay>1 && timeDelay<300){

          setWatchOn(false)
          setSelectAction("wait")
          firstClickTime=0
      }else{
          firstClickTime=event.timeStamp
      }
  }

  const resetHandler=()=>{
    setTime(0)
    setWatchOn(true)
    setSelectAction("start")
  }
  
  return (
    <div className="app">
        <h1 className="app__title">Stopwatch</h1>
        <StopwatchDisplay time={time}></StopwatchDisplay>
        <Controller 
          selectAction={selectAction} 
          start={startHandler} 
          stop={stopHandler} 
          wait={waitHandler} 
          reset={resetHandler}>
        </Controller>
    </div>
  );
}

export default App;
