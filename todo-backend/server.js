const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(require('./todo-eb04d-firebase-adminsdk-dzrph-0ac9e9c7a4.json'))
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Firestore collection
const tasksCollection = db.collection('tasks');

// Routes
app.get('/tasks', async (req, res) => {
    const snapshot = await tasksCollection.get();
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const { title, dueDate, priority, completed } = req.body;
    const docRef = await tasksCollection.add({ title, dueDate, priority, completed });
    res.status(201).json({ id: docRef.id, title, dueDate, priority, completed });
});

app.put('/tasks/:id', async (req, res) => {
    const { title, dueDate, priority, completed } = req.body;
    await tasksCollection.doc(req.params.id).set({ title, dueDate, priority, completed });
    res.json({ id: req.params.id, title, dueDate, priority, completed });
});

app.delete('/tasks/:id', async (req, res) => {
    await tasksCollection.doc(req.params.id).delete();
    res.status(204).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
