export interface MetaPagination {
  current_page: number;
  limit: number;
  previous_page: number;
  next_page: number;
  total_item: number;
}

export const metaPagination = (data, page, limit: any): MetaPagination => {
  const total = data.length;
  const current_page = Number(page);

  return {
    current_page: current_page,
    previous_page: current_page - 1,
    next_page: current_page + 1,
    limit: Number(limit),
    total_item: total,
  };
};
