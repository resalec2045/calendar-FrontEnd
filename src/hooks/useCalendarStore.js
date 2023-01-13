import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import calendarApi from "../api/calendarApi"
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"

export const useCalendarStore = () => {
    
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar )
    const { user } = useSelector( state => state.auth )

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startDeleteNote = async() => {

        try {
            await calendarApi.delete(`/events/${ activeEvent.id }`)
            dispatch( onDeleteEvent() )
            return;
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')   
        }
    }

    const startSavingEvent = async( calendarEvent ) => {
        if( calendarEvent.id ) {
            
            // Actualizando
            try {
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent)
                dispatch( onUpdateEvent({ ...calendarEvent, user }) )
                return;
            } catch (error) {
                console.log(error)
                Swal.fire('Error al guardar', error.response.data?.msg, 'error')   
            }

        } 
            // creando
        const { data } = await calendarApi.post('/events', calendarEvent)
        console.log(data)
        dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) )
        
    }

    const startLoadingEvents = async() => {

        try {

            const { data } = await calendarApi.get('/events')
            const events = convertEventsToDateEvents( data.eventos )
            dispatch( onLoadEvents(events) )
            console.log(events)

        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }

    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeleteNote,
        startLoadingEvents
    }

}

