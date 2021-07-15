import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
        }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const now2 = now.clone().add(1,'hours');

const initEvent = {
    title:'Evento',
    notes:'',
    start: now.toDate(),
    end: now2.toDate()
};

export const CalendarModal = () => {

    const modalState = useSelector(state => state.ui.modalOpen);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    
    //const [dateStart, setDateStart] = useState(now.toDate());
    //const [dateEnd, setDateEnd] = useState(now2.toDate());
    const [titleValid, setTitleValid] = useState(true);
    const [formValues, setFormValues] = useState( initEvent );

    useEffect(() => {
        if(activeEvent){
          setFormValues(activeEvent);
        }
        else{
          setFormValues(initEvent);
        }
      }, [activeEvent, setFormValues]);

    const { notes, title, start, end} = formValues;
    const handleInputChange = ({target}) =>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => { 
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
        dispatch(uiCloseModal());
    }
    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e
        })
    }
    const handleEndtDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const onSubmitForm = (e)=>{
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error', 'La fecha final debe ser mayor a la inicial');
        }
        if(title.trim().length < 2 ){
            return setTitleValid(false);
        }

        if(activeEvent){
            dispatch(eventUpdated(formValues));
        }else{
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '0',
                    name: 'Herbert'
                }
            }))
        }

        setTitleValid(true);
        closeModal();
    }


    return (
        <Modal
        isOpen={modalState}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS = {200}
        className="modal"
        overlayClassName="modal-fondo"
      >
            <h1> {(activeEvent)? 'Editando Evento' : 'Nuevo evento'} </h1>
            <hr />
            <form className="container" onSubmit={onSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <br/>
                    <DateTimePicker className="react-dateTime-Picker" onChange={handleStartDateChange} value ={start} />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <br/>
                    <DateTimePicker className="react-dateTime-Picker" onChange={handleEndtDateChange} value = {end}  minDate={start}/>
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        value = {title}
                        onChange = {handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value = {notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
       </Modal>
    )
}
