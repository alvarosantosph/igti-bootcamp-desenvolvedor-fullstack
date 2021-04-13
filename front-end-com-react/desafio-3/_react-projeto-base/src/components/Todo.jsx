import React from 'react';
import Todos from './Todos';

export default props => {

    return (
        <>
            <div className="todo">

                { 
                    props.todo.map((item) => {
                        return <Todos key={item.id} backGround={item.done ? '#b1ec95' : '#fdc290'} date={item.date} description={item.description} />
                    }) 
                }

            </div>
        </>
    )
}