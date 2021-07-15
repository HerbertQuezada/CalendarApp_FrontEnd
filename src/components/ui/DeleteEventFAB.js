import React from 'react';
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/events';


export const DeleteEventFAB = () => {

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(eventDeleted());
    }

    return (     
        <button className="btn btn-danger fab-danger" onClick={handleClick}>
            <i className="fas fa-trash"></i>
            <span> Borrar evento</span>
        </button>
    )
}
