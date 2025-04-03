async function fetchNotes() {
    const response = await fetch('http://localhost:3000/notes');
    const notes = await response.json();
    document.getElementById('notesList').innerHTML = notes.map(note => 
        `<li>
            <strong>${note.title}</strong>: ${note.content}
            <button onclick="deleteNote(${note.id})">Delete</button>
        </li>`
    ).join('');
}

async function addNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    await fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
    });
    fetchNotes();
}

async function deleteNote(id) {
    await fetch(`http://localhost:3000/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
}

fetchNotes();

