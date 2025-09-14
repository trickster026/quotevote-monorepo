import { useState, useEffect, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

/**
 * Custom hook for managing pagination state with URL synchronization
 * @param {Object} options - Configuration options
 * @param {number} options.defaultPage - Default page number (default: 1)
 * @param {number} options.defaultPageSize - Default page size (default: 20)
 * @param {string} options.pageParam - URL parameter name for page (default: 'page')
 * @param {string} options.pageSizeParam - URL parameter name for page size (default: 'page_size')
 * @param {Function} options.onPageChange - Callback when page changes
 * @param {Function} options.onPageSizeChange - Callback when page size changes
 * @param {boolean} options.resetOnFilterChange - Reset to page 1 when filters change (default: true)
 * @returns {Object} Pagination state and handlers
 */
export const usePagination = ({
  defaultPage = 1,
  defaultPageSize = 20,
  pageParam = 'page',
  pageSizeParam = 'page_size',
  onPageChange,
  onPageSizeChange,
  resetOnFilterChange = true,
} = {}) => {
  const history = useHistory()
  const location = useLocation()

  // Parse URL parameters
  const urlParams = new URLSearchParams(location.search)
  const urlPage = parseInt(urlParams.get(pageParam), 10)
  const urlPageSize = parseInt(urlParams.get(pageSizeParam), 10)

  // Initialize state from URL or defaults
  const [currentPage, setCurrentPage] = useState(
    urlPage && urlPage > 0 ? urlPage : defaultPage
  )
  const [pageSize, setPageSize] = useState(
    urlPageSize && urlPageSize > 0 ? urlPageSize : defaultPageSize
  )


  // Update URL when pagination changes
  const updateURL = useCallback(
    (page, size) => {
      const newParams = new URLSearchParams(location.search)
      
      // Always set page parameter to preserve it in URL
      newParams.set(pageParam, page.toString())

      // Update page size parameter (only if different from default)
      if (size !== defaultPageSize) {
        newParams.set(pageSizeParam, size.toString())
      } else {
        newParams.delete(pageSizeParam)
      }

      // Update URL without triggering a page reload
      const newSearch = newParams.toString()
      const newURL = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`
      
      if (newURL !== location.pathname + location.search) {
        history.push(newURL)
      }
    },
    [history, location, pageParam, pageSizeParam, defaultPageSize]
  )

  // Handle page change
  const handlePageChange = useCallback(
    (page) => {
      if (page !== currentPage) {
        setCurrentPage(page)
        updateURL(page, pageSize)
        onPageChange?.(page)
      }
    },
    [currentPage, pageSize, updateURL, onPageChange]
  )

  // Handle page size change
  const handlePageSizeChange = useCallback(
    (size) => {
      if (size !== pageSize) {
        setPageSize(size)
        setCurrentPage(1) // Reset to first page when page size changes
        updateURL(1, size)
        onPageSizeChange?.(size)
      }
    },
    [pageSize, updateURL, onPageSizeChange]
  )

  // Reset to first page (useful when filters change)
  const resetToFirstPage = useCallback(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
      updateURL(1, pageSize)
      onPageChange?.(1)
    }
  }, [currentPage, pageSize, updateURL, onPageChange])

  // Sync with URL changes (browser back/forward)
  useEffect(() => {
    const newUrlPage = parseInt(urlParams.get(pageParam), 10)
    const newUrlPageSize = parseInt(urlParams.get(pageSizeParam), 10)

    // Update page if URL has a valid page number and it's different from current
    if (newUrlPage && newUrlPage > 0 && newUrlPage !== currentPage) {
      setCurrentPage(newUrlPage)
      onPageChange?.(newUrlPage)
    }
    // If URL doesn't have a page parameter but we're not on page 1, reset to page 1
    else if (!newUrlPage && currentPage !== 1) {
      setCurrentPage(1)
      onPageChange?.(1)
    }

    // Update page size if URL has a valid page size and it's different from current
    if (newUrlPageSize && newUrlPageSize > 0 && newUrlPageSize !== pageSize) {
      setPageSize(newUrlPageSize)
      onPageSizeChange?.(newUrlPageSize)
    }
  }, [location.search, pageParam, pageSizeParam, currentPage, pageSize, onPageChange, onPageSizeChange])

  // Calculate pagination values
  const calculatePagination = useCallback(
    (totalCount) => {
      const totalPages = Math.ceil(totalCount / pageSize)
      const normalizedPage = Math.min(Math.max(currentPage, 1), totalPages || 1)
      
      return {
        currentPage: normalizedPage,
        totalPages: Math.max(totalPages, 1),
        totalCount,
        pageSize,
        hasNextPage: normalizedPage < totalPages,
        hasPreviousPage: normalizedPage > 1,
        startIndex: (normalizedPage - 1) * pageSize,
        endIndex: Math.min(normalizedPage * pageSize, totalCount),
      }
    },
    [currentPage, pageSize]
  )

  return {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    resetToFirstPage,
    calculatePagination,
    // Legacy support for existing code
    setCurrentPage: handlePageChange,
    setPageSize: handlePageSizeChange,
  }
}

/**
 * Hook for managing pagination with filter synchronization
 * Automatically resets to page 1 when filters change
 */
export const usePaginationWithFilters = (paginationOptions = {}, dependencies = []) => {
  const pagination = usePagination(paginationOptions)
  const [previousDependencies, setPreviousDependencies] = useState(dependencies)

  // Reset to first page when dependencies (filters) change
  useEffect(() => {
    // Only reset if dependencies actually changed (not on initial mount)
    const dependenciesChanged = dependencies.some((dep, index) => dep !== previousDependencies[index])
    
    if (dependenciesChanged && paginationOptions.resetOnFilterChange !== false) {
      pagination.resetToFirstPage()
    }
    
    setPreviousDependencies(dependencies)
  }, dependencies)

  return pagination
}

export default usePagination
