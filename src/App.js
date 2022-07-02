import { Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListActivities from './Components/ListActivities';
import DeleteActivity from './Components/DeleteActivity';
import AddActivity from './Components/AddActivity';
import { Link } from 'react-router-dom';

function App() {

  const [activities, setActivities] = useState([])
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [totalTimeWasted, setTotalTimeWasted] = useState()
  const [oneWeekWasted, setOneWeekWasted] = useState()
  const [weekMinutes, setWeekMinutes] = useState(0)
  const [weekHours, setWeekHours] = useState(0)

  useEffect(() => {
    if (minutes > 59) {
      setHours(hours + 1)
      setMinutes(minutes - 60)
    }
    if (weekMinutes > 59) {
      setWeekHours(hours + 1)
      setWeekMinutes(minutes - 60)
    }
    if (minutes < 0) {
      setHours(hours - 1)
      setMinutes(minutes + 60)
    }
    if (weekMinutes < 0) {
      setWeekHours(hours - 1)
      setWeekMinutes(minutes + 60)
    }
    setTotalTimeWasted(`${hours}T & ${minutes}M `)
    setOneWeekWasted(`${weekHours}T & ${weekMinutes}M`)
    console.log(weekHours)

    activities.sort((a, b) => a.deadline - b.deadline)
  });

  return (
    <Container maxWidth="xs">
      <Router>
        <Typography variant="h3" component="div">Liikuntapäiväkirja</Typography>
        <Route path="/add">
          <AddActivity
            activities={activities}
            setActivities={setActivities}
            setTotalTimeWasted={setTotalTimeWasted}
            minutes={minutes} setMinutes={setMinutes}
            hours={hours} setHours={setHours}
            weekMinutes={weekMinutes}
            setWeekMinutes={setWeekMinutes}
            weekHourss={weekHours}
            setWeekHours={setWeekHours}
            setOneWeekWasted={setOneWeekWasted} />
        </Route>
        <Route path="/" exact>
          <Button
            variant='outlined'
            fullWidth
            sx={{
              marginTop: "15px"
            }}
            component={Link}
            to="/add">
            Lisää aktiviteetti!
          </Button>
          <ListActivities
            activities={activities}
            setActivities={setActivities}
            totalTimeWasted={totalTimeWasted}
            oneWeekWasted={oneWeekWasted} />
        </Route>
        <Route path="/delete/:idx">
          <DeleteActivity
            activities={activities}
            setActivities={setActivities}
            setTotalTimeWasted={setTotalTimeWasted}
            minutes={minutes} setMinutes={setMinutes}
            hours={hours} setHours={setHours}
            weekMinutes={weekMinutes}
            setWeekMinutes={setWeekMinutes}
            weekHourss={weekHours}
            setWeekHours={setWeekHours}
            setOneWeekWasted={setOneWeekWasted} />
        </Route>
      </Router>
    </Container>
  );
}

export default App;
