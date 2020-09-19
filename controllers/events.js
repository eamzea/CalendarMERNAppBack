const { request, response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req = request, res = response) => {
  try {
    const events = await Event.find().populate("user", "name");

    return res.status(200).json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact the manager",
    });
  }
};

const createEvent = async (req = request, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    await event.save();

    return res.status(200).json({
      ok: true,
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact the manager",
    });
  }
};

const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const { uid } = req;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "The event does not exists",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Without permissions",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      msg: "Event updated",
      eventUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact the manager",
    });
  }
};

const deleteEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const { uid } = req;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "The event does not exists",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Without permissions",
      });
    }

    await Event.findByIdAndDelete(eventId);

    return res.status(200).json({
      ok: true,
      msg: "Event deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the manager",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
