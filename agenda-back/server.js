const express = require('express');
const Agenda = require('agenda');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const agenda = new Agenda().database('mongodb://localhost:27017/agenda-example');

app.use(cors());
app.use(express.json());

// Define the job and scheduling endpoint
agenda.define('schedule-job', (job) => {
    console.log('Job executed at', new Date());
});

app.post('/schedule-job', async (req, res) => {
    // const { selectedDays } = req.body;
    console.log(req.body)
    // console.log(JSON.parse(selectedDays))

    // Convert selectedDays to a CRON expression
    const cronExpression = getCRONExpression(req.body.selectedDays);

    if (!cronExpression) {
        return res.status(400).json({ error: 'Invalid selection of days' });
    }

    // Schedule the job
    await agenda.every(cronExpression, 'schedule-job');

    res.json({ message: 'Job scheduled' });
});

function getCRONExpression(selectedDays) {
    // Create a CRON expression to run at midnight on selected days
    // For example, '0 0 * * 0,2,3' schedules the job on Sunday, Tuesday, and Wednesday
    const validDays = selectedDays.filter((day) => day >= 0 && day <= 6);

    if (validDays.length === 0) {
        return null;
    }

    //fixed time to 12:00pm need to change the time.
    return `0 12 * * ${validDays.join(',')}`;
}

agenda.start();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
