interface PaginationProps {
    paginationLength: number;
    clickHandler: (pageNumber: number) => void
}

const Pagination = ({ paginationLength, clickHandler }: PaginationProps) => {
    return (
        <ul className='pagination'>
            {
                Array.from({ length: paginationLength }, (_, i) => <li
                    onClick={() => clickHandler(i + 1)}
                    className='page-item'
                >
                    <a href="#" className='page-link'>{i + 1}</a>
                </li>)
            }
        </ul>
    )
}

export default Pagination;