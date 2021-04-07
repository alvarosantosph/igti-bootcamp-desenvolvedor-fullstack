import React, { Component } from 'react';

export default class Input extends Component {

    render() {

        const { id, label, disabled, value, handleChange } = this.props;

        return (
            <>

                {
                    !disabled 
                    
                    ? 

                    <div className="input-field col s12">
                        <input type="text" id={id} onChange={handleChange} autoFocus />
                        <label className="active">{label}</label> 
                    </div>
                    
                    :

                    <div className="input-field col s12">
                        <input type="text" id={id} disabled value={value} />
                        <label className="active">{label}</label>
                    </div> 
                    
                
                }

            </>
        );
    }

}