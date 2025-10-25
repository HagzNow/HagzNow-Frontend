import React from 'react'
import UserArenaFilter from '../../components/UserArenaFilter/UserArenaFilter'
import ArenaCard from '../../components/ArenaCard/ArenaCard'
import ArenasList from '../../components/UserArenasList/ArenasList'

export default function UserArenas() {
    return (
        <>
            <UserArenaFilter />
            <ArenasList />
        </>
    )
}
