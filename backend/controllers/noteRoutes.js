// backend/controllers/noteController.js
const Note = require("../models/Note");
const axios = require("axios");

exports.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};

exports.createNote = async (req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.json(newNote);
};

exports.generateAINote = async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "text-davinci-003",
            prompt: `Write a detailed note on: ${prompt}`,
            max_tokens: 200
        }, {
            headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        res.json({ content: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ message: "AI generation failed" });
    }
};
