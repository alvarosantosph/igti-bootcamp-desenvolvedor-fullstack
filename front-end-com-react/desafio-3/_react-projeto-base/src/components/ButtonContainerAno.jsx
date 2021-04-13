import React from 'react';
import Button from './Button';

export default props => {

    return (
        <>
            <div className="buttonContainer">
                <Button text={'2019'} ano={'2019'} backGround={'blue'} onClick={props.onClick} />
                <Button text={'2020'} ano={'2020'} backGround={'blue'} onClick={props.onClick} />
                <Button text={'2021'} ano={'2021'} backGround={'blue'} onClick={props.onClick} />
            </div>
        </>
    )
}