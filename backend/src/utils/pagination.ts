export const getPageInfo = (count: number, limit: number, page: number) => {
  const totalPages = Math.ceil(count / limit);

  return {totalPages, currentPage: page,
    hasPrevious: (page - 1) >= 1,
    hasNext: (page + 1) <= totalPages}
}
