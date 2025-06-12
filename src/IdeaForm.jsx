import { useState } from 'react';

function IdeaForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() && desc.trim()) {
      onSubmit({ title, desc });
      setTitle('');
      setDesc('');
    }
  }

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <strong><h2>What could Lou do here?</h2></strong>
        <div>Share your idea for the future of Louisville.</div>
      </div>
      <form onSubmit={handleSubmit} style={{ minWidth: 220 }}>
        <div>
          <label>
            <strong>Title</strong>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              style={{ width: '100%', marginTop: 4 }}
              autoFocus
            />
          </label>
        </div>
        <div style={{ marginTop: 8 }}>
          <label>
            <strong>Description</strong>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={3}
              required
              style={{ width: '100%', marginTop: 4 }}
            />
          </label>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button type="submit">Add Idea</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default IdeaForm;