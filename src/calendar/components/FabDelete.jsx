
import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete = () => {

    const { startDeleteNote, hasEventSelected } = useCalendarStore()

    const handleDelete = () => {
        startDeleteNote()
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}

