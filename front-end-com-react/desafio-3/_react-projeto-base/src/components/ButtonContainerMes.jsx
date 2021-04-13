import React from 'react';
import Button from './Button';

export default props => {
    return (
        <>
            <div className="buttonContainer">
                <Button text={'JAN'} mes={1} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'FEV'} mes={2} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'MAR'} mes={3} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'ABR'} mes={4} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'MAI'} mes={5} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'JUN'} mes={6} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'JUL'} mes={7} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'AGO'} mes={8} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'SET'} mes={9} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'OUT'} mes={10} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'NOV'} mes={11} backGround={'#a30000'} onClick={props.onClick} />
                <Button text={'DEZ'} mes={12} backGround={'#a30000'} onClick={props.onClick} />
            </div>
        </>
    )
}