import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEventBox, CalendarModal } from "../";
import { localizer, getMessages } from '../../helpers';
import { useEffect, useState } from 'react';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useAuthStore } from '../../hooks/useAuthStore';

export const CalendarPage = () => {

    const { user } = useAuthStore()
    const { openDateModal } = useUiStore()
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'week' )
    
    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid )

        const style = {
            backgroudColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return { 
            style
        }

    }   

    const onDobleClick = ( event ) => {
        openDateModal()
    }
    
    const onSelect = ( event ) => {
        setActiveEvent( event )
    }
    
    const onViewChanged = ( event ) => {
        localStorage.setItem('lastView', event );
        setLastView( event )
    }

    useEffect(() => {
        startLoadingEvents()
    }, [])
    

    return (
        <>
            <Navbar />
            
            <Calendar
                culture='es'
                defaultView={ lastView }
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={getMessages()}
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEventBox
                }}
                onDoubleClickEvent={ onDobleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />

            <CalendarModal />

            <FabAddNew />

            <FabDelete />

        </>
    )
}
