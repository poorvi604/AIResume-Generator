const { exec } = require('child_process');
const open = require('open').default;

console.log('🔧 Installing dependencies...');
exec('npm install', (err) => {
  if (err) {
    console.error('❌ Error installing dependencies:', err);
    return;
  }

  console.log('✅ Packages installed.');
  console.log('🚀 Starting server...');

  const server = exec('nodemon app.js');

  server.stdout.on('data', (data) => {
    console.log(data);
    if (data.includes('Server is running')) {
      open('http://localhost:3000');
    }
  });

  server.stderr.on('data', (data) => {
    console.error('❌ Server error:', data);
  });
});