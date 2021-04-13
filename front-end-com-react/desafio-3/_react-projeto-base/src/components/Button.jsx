import React from 'react';

export default props => {

    return (
        <>
            <div className="button" style={{backgroundColor: props.backGround}} onClick={() => props.onClick(props.mes, props.ano)}>{props.text}</div>
        </>
    )
}