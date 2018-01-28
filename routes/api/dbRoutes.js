const router = require("express").Router();
const listController = require("../../controllers/listController");


router.route("/users")
  .get(listController.findUser);

router.route("/lists")
  .get(listController.browseLists);

router.route("/list")
  .post(listController.create);

router.route("/list/:id")
  .get(listController.findById);

router.route("/notes/")
  .get(listController.findAllNotes);

router.route("/note")
  .post(listController.createNote);


module.exports = router;