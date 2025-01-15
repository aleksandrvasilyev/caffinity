import buildCafeLookupPipeline from "./buildCafeLookupPipeline.js";
import mongoose from "mongoose";
import throwError from "./throwError.js";

const paginate = async (attributes) => {
  const collectionName = attributes.model.collection.collectionName;
  let model, limit, page, search, utilities, cafeId, cityName, lookupPipeline;

  if (collectionName === "cafes") {
    ({ model, limit, page, search, utilities, cityName } = attributes);

    lookupPipeline = buildCafeLookupPipeline(search, utilities, cityName);
  } else if (collectionName === "reviews") {
    ({ model, limit, page, cafeId } = attributes);

    if (!cafeId) {
      throwError("Cafe id is required");
    }

    lookupPipeline = [
      { $match: { cafeId: new mongoose.Types.ObjectId(cafeId) } },
    ];
  }

  const skip = limit * (page - 1);

  const result = await model.aggregate(
    [
      ...lookupPipeline,
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

  if (totalItems === 0) {
    throwError("Not found", 404);
  }

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
