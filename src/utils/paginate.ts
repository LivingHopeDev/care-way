interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
}

export const paginate = async (
  model: any, // The Prisma model you're querying
  {
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    orderDirection = "desc",
  }: PaginationParams
) => {
  console.log(limit, page);
  // Limit max items per page to 100
  const take = limit > 100 ? 100 : limit;
  console.log("take", take);

  const skip = (page - 1) * take;

  const totalCount = await model.count();

  const totalPages = Math.ceil(totalCount / take);

  return {
    take,
    skip,
    orderBy: { [orderBy]: orderDirection },
    totalCount,
    totalPages,
  };
};
