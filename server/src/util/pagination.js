import buildCafeLookupPipeline from "./buildCafeLookupPipeline.js";

const paginate = async (model, limit, page, search, utilities) => {
  const skip = limit * (page - 1);

  const result = await model.aggregate(
    [
      ...buildCafeLookupPipeline(search, utilities),
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ],
    { maxTimeMS: 60000 },
  );

  const data = result[0].data;
  const totalItems = result[0].totalCount[0]?.count || 0;

  return {
    limit: limit,
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    items: data.length,
    totalItems: totalItems,
    hasNextPage: page < Math.ceil(totalItems / limit),
    hasPrevPage: page > 1,
    data: data,
  };
};

export default paginate;
