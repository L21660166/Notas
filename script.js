const backgroundLines = document.getElementById('backgroundLines');
const lineSpacing = 80;

for (let i = 0; i < Math.floor(window.innerWidth / lineSpacing); i++) {
    const line = document.createElement('div');
    line.classList.add('line', 'vertical');
    line.style.left = (i * lineSpacing) + 'px';
    backgroundLines.appendChild(line);
}

for (let i = 0; i < Math.floor(window.innerHeight / lineSpacing); i++) {
    const line = document.createElement('div');
    line.classList.add('line', 'horizontal');
    line.style.top = (i * lineSpacing) + 'px';
    backgroundLines.appendChild(line);
}

document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('noteInput');
    const addNoteButton = document.getElementById('addNoteButton');
    const noteList = document.getElementById('noteList');

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    function renderNotes() {
        noteList.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.textContent = note;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '✖';
            deleteButton.addEventListener('click', () => {
                notes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(notes));
                renderNotes();
            });
            li.appendChild(deleteButton);
            noteList.appendChild(li);
        });
    }

    addNoteButton.addEventListener('click', () => {
        const note = noteInput.value.trim();
        if (note) {
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
            noteInput.value = '';
        }
    });

    renderNotes();
});
