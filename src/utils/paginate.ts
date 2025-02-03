interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  where?: object;
  include?: object;
}

export const paginate = async (
  model: any,
  {
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    orderDirection = "desc",
    where = {},
    include,
  }: PaginationParams
) => {
  const take = limit > 100 ? 100 : limit;
  const skip = (page - 1) * take;
  const totalCount = await model.count({ where });
  const totalPages = Math.ceil(totalCount / take);

  const queryOptions: any = {
    where,
    take,
    skip,
    orderBy: { [orderBy]: orderDirection },
  };

  if (include && Object.keys(include).length > 0) {
    queryOptions.include = include;
  }

  const data = await model.findMany(queryOptions);

  return {
    data,
    totalCount,
    totalPages,
    page,
    limit,
  };
};
