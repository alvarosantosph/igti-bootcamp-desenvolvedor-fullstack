import React from 'react';

const formatDate = (date) => {
    const dia = date.substring(8, 10);
    const mes = date.substring(5, 7);
    const ano = date.substring(0, 4);
    return dia + '/' + mes + '/' + ano;
};

export default props => {

    const date = formatDate(props.date);

    return (
        <>
            <div className="todos" style={{backgroundColor: props.backGround}}>
                <span className="spanData">{date}</span> - <span className="spanText">{props.description}</span>
            </div>
        </>
    )
}