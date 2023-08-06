function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkFieldsTask(req, res, next) {
    const { title } = req.body
    if (title) {
        next()
    } else {
        res.status(400).json({ message: 'title is required' })
    }
}

const pagination = (pageSize) => {
    return (req, res, next) => {
      const pageNumber = parseInt(req.query.page) || 1; // Get the current page number from the query parameters
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
  
      // Attach pagination data to the request object
      req.pagination = {
        page: pageNumber,
        limit: pageSize,
        startIndex,
        endIndex
      };
  
      next(); // Call the next middleware
    };
  };

module.exports = {
    mustBeInteger,
    checkFieldsTask,
    pagination,
}