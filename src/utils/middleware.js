

const fetchMiddleware = (
  fetchPending,
  fetchSuccess,
  fetchFail,
  url,
  options = { method: 'GET' }
) => (
  async dispatch => {
    dispatch(fetchPending());

    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if(res.error) {
          throw(res.error);
        }

        dispatch(fetchSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchFail(error));
      });
  }
);

export {
  fetchMiddleware
};
