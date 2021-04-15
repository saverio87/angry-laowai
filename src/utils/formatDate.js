function formatDate(date) {
  const newDate = new Date(date.seconds * 1000);
  return newDate.toString().slice(0, 16);
}

export default formatDate;
