const buildCafeLookupPipeline = () => {
  return [
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "cafeId",
        as: "reviews",
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userIds: "$reviews.userId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$userIds"],
              },
            },
          },
        ],
        as: "reviewUsers",
      },
    },
    {
      $lookup: {
        from: "utilities",
        localField: "utilities",
        foreignField: "index",
        as: "utilitiesDetails",
      },
    },
    {
      $lookup: {
        from: "foodoptions",
        localField: "foodOptions",
        foreignField: "index",
        as: "foodoptions",
      },
    },
    {
      $project: {
        utilities: 0,
        foodOptions: 0,
        __v: 0,
      },
    },
  ];
};

export default buildCafeLookupPipeline;
