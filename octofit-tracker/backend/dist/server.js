import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/resources.js';
import { createResourceRouter } from './routes/resourceRoutes.js';
export const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', baseUrl });
});
app.use('/api/users', createResourceRouter(User));
app.use('/api/teams', createResourceRouter(Team));
app.use('/api/activities', createResourceRouter(Activity));
app.use('/api/leaderboard', createResourceRouter(Leaderboard));
app.use('/api/workouts', createResourceRouter(Workout));
app.use((error, _request, response, _next) => {
    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
});
async function startServer() {
    try {
        await connectDatabase();
    }
    catch (error) {
        console.error('Database connection failed; API will remain available:', error);
    }
    app.listen(port, () => {
        console.log(`OctoFit API listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
}
if (process.env.NODE_ENV !== 'test') {
    void startServer();
}
