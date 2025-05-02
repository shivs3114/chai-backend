import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import PDFDocument from 'pdfkit';
import fs from 'fs';

const app = express();
const server = createServer(app);
const io = new Server(server); // Attach Socket.IO to the HTTP server

// Get the current directory (replacement for __dirname in ES modules)

// Install with: npm install pdfkit

function createBrochure(res, brochureData) {
  const doc = new PDFDocument();
  
  // Set response headers for download
  res.setHeader('Content-Disposition', 'attachment; filename=brochure.pdf');
  res.setHeader('Content-Type', 'application/pdf');

  doc.pipe(res); // Stream PDF to client

  doc.fontSize(26).text('Welcome to Our App!', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(brochureData.description || 'This is a sample brochure.');
  
  // Add image (optional)
  // doc.image('path/to/image.png', {width: 150});

  doc.end();
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve the index.html file on root route
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  app.post('/generate-brochure', (req, res) => {
    const brochureData = req.body;
    createBrochure(res, brochureData); // Function from above
    res.send('Brochure generated!'); // Send a response to the client
  });
// Start the server
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
