import buildCafeLookupPipeline from "./buildCafeLookupPipeline.js";

const paginate = async (model, limit, page, search) => {
  const skip = limit * (page - 1);

  const data = await model.aggregate(
    [...buildCafeLookupPipeline(search), { $skip: skip }, { $limit: limit }],
    { maxTimeMS: 60000, allowDiskUse: true },
  );

  const searchFilter = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const totalItems = await model.countDocuments(searchFilter);

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
