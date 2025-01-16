const buildCafeLookupPipeline = (
  search,
  utilities,
  cityName,
  foodOptionIndex,
) => {
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
          {
            $limit: 5,
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

  if (utilities) {
    pipeline.unshift({
      $match: {
        utilities: { $all: utilities },
      },
    });
  }

  if (cityName) {
    pipeline.unshift({
      $match: {
        $text: { $search: cityName },
      },
    });
  }

  if (typeof foodOptionIndex !== "undefined" && foodOptionIndex !== null) {
    pipeline.unshift({
      $match: {
        foodOptions: foodOptionIndex,
      },
    });
  }

  return pipeline;
};

export default buildCafeLookupPipeline;
