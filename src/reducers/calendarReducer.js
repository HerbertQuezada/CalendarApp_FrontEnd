import moment from "moment";
import { types } from "../types/types";

const initalState = {
    events:[{
        id: new Date().getTime(),
        title: 'Cumpleañoz',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Comprar el pastel',
        user: {
            _id : '0',
            name : 'Herbert'
        }
    }],
    activeEvent: null
};

export const calendarReducer = (state = initalState, action) => {
    switch(action.type){
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };
        case types.eventAddNew:
            return {
                ...state,
                events:[
                    ...state.events,
                    action.payload
                ]
            };
        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent : null
            };
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            };
        case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent : null
            };
        default:
            return state;
    }
}