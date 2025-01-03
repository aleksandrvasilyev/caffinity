const buildCafeLookupPipeline = (search) => {
  const pipeline = [
    {
      $lookup: {
        from: "reviews",
        let: {
          cafeId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$cafeId", "$$cafeId"],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              let: { userId: "$userId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$userId"],
                    },
                  },
                },
                {
                  $project: {
                    password: 0,
                    __v: 0,
                  },
                },
              ],
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
        ],
        as: "reviews",
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

  if (search) {
    pipeline.unshift({
      $match: {
        title: { $regex: search, $options: "i" },
      },
    });
  }

  return pipeline;
};

export default buildCafeLookupPipeline;
