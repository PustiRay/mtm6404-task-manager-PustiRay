import React from 'react';

function Home() {
  return (
   <section style={{
  padding: '2rem',
  maxWidth: '600px',
  margin: '3rem auto',
  textAlign: 'center',
  backgroundColor: 'white',
  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  fontWeight: '500',
  color: '#213555',
}}>
  <h1 style={{ fontWeight: '700', marginBottom: '1rem' }}>
    Welcome to the Task Manager App
  </h1>
  <p>
    This app helps you manage your tasks efficiently. Start by viewing your task list.
  </p>
</section>

  );
}

export default Home;
