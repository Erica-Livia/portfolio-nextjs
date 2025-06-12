"use client"
import React, { useState } from 'react';

function Create() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Post created!');
                setTitle('');
                setBody('');
            } else {
                alert('Failed to create post.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating post.');
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                    <label>Body:</label><br />
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
            </form>
        </div>
    );
}

export default Create;
