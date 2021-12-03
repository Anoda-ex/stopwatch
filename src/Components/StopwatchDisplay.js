import React from 'react'

export default function stopwatchDisplay(props) {
    let transformOutput=(time)=>{
        let output=time+""
        if(output.length<2){
            output="0"+output
        }
        return output
    }
    let time=props.time
    let hours=Math.floor((time / (6000 * 60)))
    let minutes=Math.floor((time / 6000)%60)
    let seconds=Math.floor((time / 100) % 60)
    let mSeconds=Math.floor(time % 100)
    return (
        <div className="display">
            <div className="display-block">
                {transformOutput(hours)}
            </div>
            <div className="display-devider">:</div>
            <div className="display-block">
                {transformOutput(minutes)}
            </div>
            <div className="display-devider">:</div>
            <div className="display-block">
                {transformOutput(seconds)}
            </div> 
           
        </div>
    )
}
