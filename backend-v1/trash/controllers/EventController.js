const mongoose = require('mongoose');
const Event = require('../models/EventModel.js');

const eventController = {
  async createEvent(req, res) {
    try {
      const event = new Event(req.body);
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getEvents(req, res) {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getEventById(req, res) {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateEvent(req, res) {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteEvent(req, res) {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = eventController;