import React from 'react'

export default function Controller(props) {
    let buttons=[
        "start","stop","wait","reset"
    ]
    return (
        <div className="controller">
            {buttons.map(button=>{
                let classList=["controller__button"]
                if(button==props.selectAction){
                    classList.push("controller__button-active")
                }
                return <button className={classList.join(" ")} onClick={props[button]}>{button}</button>
            })}
        </div>
    )
}
