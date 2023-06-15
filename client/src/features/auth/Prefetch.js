import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'noteList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'userList', { force: true }))
        // force query even if data already exist
        // no need for cleanup

        // return () => {
        //     console.log('unsubscribing')
        //     notes.unsubscribe()
        //     users.unsubscribe()
        // }
    }, [])

    return <Outlet />
}
export default Prefetch
