import path from 'path';

import rootname from '../../rootname';

/**
 * root route
 *
 * @return {function} Root route  
 */
function root() {
  return function (req, res) {
    res.sendFile(path.join(rootname, '../client/build', 'index.html'));
  };
}

export default root;
