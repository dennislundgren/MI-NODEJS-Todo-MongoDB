//////////////
// IMPORTS //
////////////
const functions = require("./_Functions");
//////////////
// CLASSES //
////////////
class Todo {
  constructor(description, done) {
    this.created = functions.getNewDate();
    this.description = description;
    this.done = done;
  }
}
//////////////
// EXPORTS //
////////////
module.exports = { Todo };
