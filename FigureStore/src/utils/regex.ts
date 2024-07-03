export const formatPrice = (price: number): string => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };