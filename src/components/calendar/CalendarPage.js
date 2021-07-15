import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFAB } from '../ui/AddNewFAB';
import { DeleteEventFAB } from '../ui/DeleteEventFAB';


moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarPage = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month');


    const onDobleClick = (e) => {
        dispatch(uiOpenModal());
    }
    const onSelect     = (e) => dispatch(eventSetActive(e));
    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = () => {
        dispatch(eventClearActiveEvent());
    }
    const eventStyleGetter = (event, start, end, isSelected) =>{

        const style = {
            backgroundColor: '367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        };
    }

    return (
        <div>
            <NavBar/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages = {messages}
                className="calendar-page"
                eventPropGetter = { eventStyleGetter }
                onDoubleClickEvent = { onDobleClick }
                onSelectEvent = { onSelect }sle
                onView = { onViewChange }
                onSelectSlot = {onSelectSlot}
                selectable={ true }
                view = { lastView }
                components = { {
                    event : CalendarEvent
                }}
                />

                <AddNewFAB/>
                {
                    (activeEvent) && <DeleteEventFAB/>
                }
               
                <CalendarModal/>
        </div>
    )
}
