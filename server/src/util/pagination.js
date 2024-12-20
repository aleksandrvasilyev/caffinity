const paginate = async (model, limit, page) => {
  const skip = limit * (page - 1);
  const data = await model.find().skip(skip).limit(limit);
  const totalItems = await model.countDocuments();

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
