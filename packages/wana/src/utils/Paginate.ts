export const paginateData = (
    data: any[],
    pageSize: number = 10,
    skip: number = 0
) => {
    return { data: data.slice(skip, skip + pageSize), pageSize, skip };
};
