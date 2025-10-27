import React from 'react'
import UserArenaFilter from '../../components/UserArenaFilter/UserArenaFilter'
import ArenaCard from '../../components/ArenaCard/ArenaCard'
import ArenasList from '../../components/UserArenasList/ArenasList'
import Pagination from '../../components/Pagination/Pagination'

export default function UserArenas() {
    const [currentPage, setCurrentPage] = React.useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Add logic to fetch data for the new page if needed
    };

    return (
        <>
            <UserArenaFilter />
            <ArenasList />
            <Pagination
                currentPage={currentPage}
                totalPages={4}
                onPageChange={handlePageChange}
            />
        </>
    )
}
