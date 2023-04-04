/**
 * simple route
 *
 * @param {array} data
 * @return {function} Function
 */
async function simple() {

  return async function (req, res) {
    res.json({ msg: 'Endpoint reached' });
  };

}

export default simple;
