// app.js
import { saveNotes, loadNotes } from './storage.js';
import { renderNotes } from './ui.js';

const form = document.getElementById('note-form');
const notesContainer = document.getElementById('notes-container');
const searchInput = document.getElementById('search');

let notes = loadNotes();

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function addNote(title, content, tags) {
  const newNote = {
    id: generateId(),
    title,
    content,
    tags,
  };
  notes.push(newNote);
  saveNotes(notes);
  renderNotes(notes, notesContainer, deleteNote);
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes(notes);
  renderNotes(notes, notesContainer, deleteNote);
}

function filterNotes(query) {
  query = query.toLowerCase();
  return notes.filter(note => {
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const title = form.title.value.trim();
  const content = form.content.value.trim();
  const tags = form.tags.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  if (title && content) {
    addNote(title, content, tags);
    form.reset();
  }
});

searchInput.addEventListener('input', e => {
  const filtered = filterNotes(e.target.value);
  renderNotes(filtered, notesContainer, deleteNote);
});

// Initial render
renderNotes(notes, notesContainer, deleteNote);
