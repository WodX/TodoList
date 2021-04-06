export default todoReducer = (state, { type, payload }) => {
  switch (type) {
    case 'INIT':
      return payload || state;
    case 'ADD':
      return [...state, { id: payload.id, name: payload.name, checked: false }];
    case 'CHECK':
      return state.map((item) => {
        if (item.id === payload.id) {
          return { ...item, checked: !item.checked };
        } else {
          return item;
        }
      });
    case 'DELETE':
      return state.filter((item) => {
        return item.id !== payload.id;
      });
    default:
      return state;
  }
};
