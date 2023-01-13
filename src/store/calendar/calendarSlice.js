
import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns'

// const tempEvent = { 
//     _id: new Date().getTime(),
//     title: 'Joder',
//     notes: 'hay que mimir',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'andres'
//     }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [  ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload
        },
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload )
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                
                if ( event.id === payload.id ) {
                    return payload
                }

                return event
            } )
        },
        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id )
                state.activeEvent = null
            }
        },
        onLoadEvents: ( state, { payload = [] } ) => {

            // isLoadingEvents = false
            // state.events = payload
            payload.forEach(element => {
                const exists = state.events.some( dbEvent => dbEvent.id === element.id  )

                if ( !exists ) {
                    state.events.push( element )
                }

            });

        },
        onLogoutCalendar: ( state ) => {
            state.isLoadingEvents = true;
            state.events = [  ];
            state.activeEvent = null;
        }
    }
});


// Action creators are generated for each case reducer function,
export const { onLogoutCalendar, onLoadEvents, onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
