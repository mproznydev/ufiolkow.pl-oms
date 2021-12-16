export const properData = (data) => {
  if (data) {
    const dateDay = data.slice(0, 10);
    const hour = data.slice(11, 19);
    const fullData = `${dateDay} ${hour}`;
    return fullData;
  }
};
