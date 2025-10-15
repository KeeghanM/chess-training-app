import Link from 'next/link'

type PaginationProps = {
  startCount: number
  endCount: number
  totalCount: number
  totalPages: number
  currentPage: number
  label: string
  path: string
}

export default function Pagination({
  startCount,
  endCount,
  totalCount,
  label,
  totalPages,
  currentPage,
  path,
}: PaginationProps) {
  // Generate the page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []

    if (totalPages <= 7) {
      // If 7 or fewer pages, show all
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always include first page
    pages.push(1)

    if (currentPage <= 3) {
      // Near the start: show 1, 2, 3, ..., last
      pages.push(2, 3)
      if (totalPages > 4) {
        pages.push('ellipsis-start')
      }
    } else if (currentPage >= totalPages - 2) {
      // Near the end: show 1, ..., last-2, last-1, last
      pages.push('ellipsis-end')
      pages.push(totalPages - 2, totalPages - 1)
    } else {
      // In the middle: show 1, ..., current-1, current, current+1, ..., last
      pages.push('ellipsis-start')
      pages.push(currentPage - 1, currentPage, currentPage + 1)
      pages.push('ellipsis-end')
    }

    // Always include last page (if not already included)
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {hasPrevious ? (
          <Link
            href={`${path}/${currentPage - 1}`}
            className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
          >
            Previous
          </Link>
        ) : (
          <span className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed">
            Previous
          </span>
        )}
        {hasNext ? (
          <Link
            href={`${path}/${currentPage + 1}`}
            className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
          >
            Next
          </Link>
        ) : (
          <span className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed">
            Next
          </span>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300 flex gap-1">
            Showing
            <span className="font-medium">{startCount}</span>
            to
            <span className="font-medium">{endCount}</span>
            of
            <span className="font-medium">{totalCount}</span>
            {label}
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md"
          >
            {hasPrevious ? (
              <Link
                href={`${path}/${currentPage - 1}`}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-600 inset-ring inset-ring-gray-700 cursor-not-allowed">
                <span className="sr-only">Previous</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </span>
            )}

            {pageNumbers.map((page, index) => {
              if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                return (
                  <span
                    key={`ellipsis-${page}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 inset-ring inset-ring-gray-700"
                  >
                    ...
                  </span>
                )
              }

              const isCurrentPage = page === currentPage

              return (
                <Link
                  key={page}
                  href={`${path}/${page}`}
                  aria-current={isCurrentPage ? 'page' : undefined}
                  className={
                    isCurrentPage
                      ? 'relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                      : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0'
                  }
                >
                  {page}
                </Link>
              )
            })}

            {hasNext ? (
              <Link
                href={`${path}/${currentPage + 1}`}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-600 inset-ring inset-ring-gray-700 cursor-not-allowed">
                <span className="sr-only">Next</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
