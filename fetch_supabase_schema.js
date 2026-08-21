const fetch = require('node-fetch');

const SUPABASE_URL = 'https://tdoyuqiwfvibnqudeems.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkb3l1cWl3ZnZpYm5xdWRlZW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0OTE5ODEsImV4cCI6MjA5NzA2Nzk4MX0.3axNH7ZkxwHpZmG85WJIb6asLsCsJL-3MyZv0BheMp8';

async function fetchSchema() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    const schema = await res.json();
    
    // Check if veiculos exists in definitions
    const veiculosDef = schema.definitions && schema.definitions.veiculos;
    if (veiculosDef) {
      console.log('VEICULOS SCHEMA:');
      console.log(JSON.stringify(veiculosDef, null, 2));
    } else {
      console.log('veiculos table not found in schema definitions.');
      console.log('Available definitions:', Object.keys(schema.definitions || {}));
    }
  } catch (err) {
    console.error('Error fetching schema:', err);
  }
}

fetchSchema();
