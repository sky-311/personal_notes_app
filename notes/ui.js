// ui.js
export function renderNotes(notes, container, onDelete) {
  container.innerHTML = '';

  if (notes.length === 0) {
    container.innerHTML = '<p>No notes found.</p>';
    return;
  }

  notes.forEach(note => {
    const noteEl = document.createElement('div');
    noteEl.className = 'note';

    noteEl.innerHTML = `
      <button class="delete-btn" data-id="${note.id}">Delete</button>
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="tags">${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
    `;

    container.appendChild(noteEl);
  });

  // Attach delete event listeners
  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      onDelete(id);
    });
  });
}
