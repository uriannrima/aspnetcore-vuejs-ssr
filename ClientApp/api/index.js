export const fetchItem = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'Item ' + id });
    }, 3000);

  });
}

export default fetchItem;