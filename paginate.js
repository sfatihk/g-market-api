const paginate = ({ totalCount = 0, perPage = 16, currentPage = 1 }) => {
  const pageCount = Math.ceil(totalCount / perPage);

  const pages = [];
  if (pageCount <= 5) {
    for (let i = 1; i <= pageCount; i++) pages.push({ label: i, page: i });
  } else {
    let startIndex = 1;

    const finishDiff = pageCount - currentPage;

    if (currentPage <= 4) {
      startIndex = 1;
      for (let i = 0; i < 5; i++) {
        pages.push({ label: startIndex + i, page: startIndex + i });
      }
      pages.push({ label: "...", page: 0 });
      for (let i = pageCount - 1; i <= pageCount; i++) {
        pages.push({ label: i, page: i });
      }
    } else if (finishDiff <= 3) {
      startIndex = currentPage - (5 - finishDiff - 1);
      for (let i = 1; i < 3; i++) {
        pages.push({ label: i, page: i });
      }
      pages.push({ label: "...", page: 0 });
      for (let i = 0; i < 5; i++) {
        pages.push({ label: startIndex + i, page: startIndex + i });
      }
    } else {
      startIndex = currentPage - 1;
      for (let i = 1; i < 3; i++) {
        pages.push({ label: i, page: i });
      }
      pages.push({ label: "...", page: 0 });
      for (let i = 0; i < 3; i++) {
        pages.push({ label: startIndex + i, page: startIndex + i });
      }
      pages.push({ label: "...", page: 0 });
      for (let i = pageCount - 1; i <= pageCount; i++) {
        pages.push({ label: i, page: i });
      }
    }
  }

  return {
    lastPage: pageCount,
    pages: pages,
    currentPage: parseInt(currentPage),
  };
};

module.exports = paginate;
