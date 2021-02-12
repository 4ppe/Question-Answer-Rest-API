const asyncHandler = require("express-async-handler");
const {
    searchHelper,
    populateHelper,
    querySortHelper,
    paginationHelper
} = require("./queryMiddlewareHelpers")

const questionQueryMiddleware = function (model, options) {
    return asyncHandler(async function (req, res, next) {
        // Inıtıal Query
        let query = model.find();

        // Search
        query = searchHelper("title", query, req)

        if (options && options.population) {
            query = populateHelper(query, options.population)
        }

        query = querySortHelper(query, req);

        // Pagination
        const total = await model.countDocuments();
        const paginationResult = await paginationHelper(total, query, req);
        query = paginationResult.query;
        const pagination = paginationResult.pagination;

        const queryResults = await query;

        res.queryResults = {
            success: true,
            count: queryResults.length,
            pagination: pagination,
            data: queryResults
        };
        next();
    });
}

module.exports = questionQueryMiddleware