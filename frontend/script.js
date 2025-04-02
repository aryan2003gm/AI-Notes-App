// frontend/script.js
document.getElementById("noteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    
    const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });
    
    const data = await res.json();
    displayNotes();
});

document.getElementById("generateAI").addEventListener("click", async () => {
    const prompt = prompt("Enter a topic for AI-generated note:");
    if (!prompt) return;
    
    const res = await fetch("http://localhost:5000/api/notes/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
    });
    
    const data = await res.json();
    document.getElementById("content").value = data.content;
});

async function displayNotes() {
    const res = await fetch("http://localhost:5000/api/notes");
    const notes = await res.json();
    const notesDiv = document.getElementById("notes");
    notesDiv.innerHTML = notes.map(note => `<div><h3>${note.title}</h3><p>${note.content}</p></div>`).join(" ");
}

displayNotes();