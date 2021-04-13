import React from 'react';

export default props => {

    const total = props.todo.length;
    const cumpridas = props.todo.filter((item) => {
        return !!item.done;
    }).length;
    const naoCumpridas = props.todo.filter((item) => {
        return !item.done;
    }).length;

    return (
        <>
            <div className="summary">
            Total de tarefas: <span style={{color: 'blue', marginLeft: '10px', marginRight: '20px'}}>{total}</span> 
            Tarefas cumpridas: <span style={{color: 'green',  marginLeft: '10px', marginRight: '20px'}}>{cumpridas}</span> 
            Tarefas não cumpridas: <span style={{color: 'red',  marginLeft: '10px', marginRight: '20px'}}>{naoCumpridas}</span>
            </div>
        </>
    )
}