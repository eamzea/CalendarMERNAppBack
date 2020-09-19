const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.use(validateJWT);

router.get("/get-events", getEvents);

router.post(
  "/create-event",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put(
  "/update/:id",
  [check("id", "Id is required").not().isEmpty()],
  updateEvent
);

router.delete(
  "/delete/:id",
  [check("id", "Id is required").not().isEmpty()],
  deleteEvent
);

module.exports = router;
