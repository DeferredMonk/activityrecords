import { Button, Container, TextField } from '@mui/material'
import React, { useRef, useState, Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Link } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { fi } from 'date-fns/locale'
import { compareAsc, eachHourOfInterval, formatDistanceStrict, formatDuration, intervalToDuration, isAfter, subWeeks } from 'date-fns'


const AddActivity = ({ activities, setActivities, setMinutes, setHours, minutes, hours, setWeekHours, setWeekMinutes, weekHourss, weekMinutes }) => {


    const FormInfo = useRef({})
    const history = useHistory()
    const [starts, setStarts] = useState(null);
    const [ends, setEnds] = useState(null);
    const [errors, setErrors] = useState({})

    const HandleAdd = (e) => {
        e.preventDefault();
        let helper = [...activities]
        let virheet = {}
        let lastWeek = subWeeks(new Date(), 1)

        if (!FormInfo.current.aktivity) {
            virheet = { ...virheet, aktivity: "Aktiviteetti on syötettävä jatkaksesi" }
        } if (!starts) {
            virheet = { ...virheet, start: "Ajankohta on syötettävä jatkaksesi" }
        } if (!ends) {
            virheet = { ...virheet, end: "Ajankohta on syötettävä jatkaksesi" }
        }
        if (compareAsc(starts, new Date) === 1) {
            virheet = { ...virheet, start: "Aktiviteetin ajankohta on oltava menneisyydessä" }
        }
        if (compareAsc(ends, new Date) === 1) {
            virheet = { ...virheet, end: "Aktiviteetin ajankohta on oltava menneisyydessä" }
        }
        else if ((compareAsc(starts, ends)) === 1 || (compareAsc(starts, ends)) === 0) {
            virheet = { ...virheet, end: "Aktiviteetin on kestettävä vähintään minuutin ajan" }
        }
        if (Object.entries(virheet).length > 0) {
            setErrors({ ...virheet })
        } else {
            const interval = intervalToDuration({
                start: starts,
                end: ends
            })
            let lisaa = { activity: FormInfo.current.aktivity, done: false, begins: starts, deadline: ends, kestoT: interval.hours, kestoM: interval.minutes }
            setErrors({})
            setHours(hours + interval.hours)
            setMinutes(minutes + interval.minutes)
            if (isAfter(lisaa.deadline, lastWeek)) {
                setWeekHours(weekHourss + interval.hours)
                setWeekMinutes(weekMinutes + interval.minutes)
            }
            setActivities([...helper, lisaa])
            history.push("/")
        }
    }

    const inputHandler = (e) => {
        FormInfo.current[e.target.name] = e.target.value
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fi}>
            <form onSubmit={HandleAdd}>
                <TextField
                    name="aktivity"
                    label="Syötä aktiviteetti"
                    fullWidth
                    onChange={inputHandler}
                    error={Boolean(errors.aktivity)}
                    helperText={errors.aktivity}
                    style={{
                        marginTop: "20px"
                    }} />
                <Container style={{
                    display: "flex",
                    padding: "0"
                }}>
                    <DateTimePicker
                        error={Boolean(errors.start)}
                        helperText={errors.start}
                        label="Aktiviteetti alkaa"
                        value={starts}
                        onChange={setStarts}
                        inputVariant='outlined'
                        variant="inline"
                        ampm={false}
                        format="dd.MM.yyyy H:mm"
                        style={{
                            marginTop: "20px",
                            marginRight: "10px"
                        }} />
                    <DateTimePicker
                        error={Boolean(errors.end)}
                        helperText={errors.end}
                        label="Aktiviteetti päättyy"
                        value={ends}
                        onChange={setEnds}
                        inputVariant='outlined'
                        variant="inline"
                        ampm={false}
                        format="dd.MM.yyyy H:mm"
                        style={{
                            marginTop: "20px",
                            marginLeft: "10px"
                        }} />
                </Container>
                <Container
                    style={{
                        padding: "0px",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px"
                    }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ marginRight: "10px" }}
                        type="submit">
                        Lisää
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ marginLeft: "10px" }}
                        component={Link}
                        to="/">
                        Palaa
                    </Button>
                </Container >
            </form>
        </MuiPickersUtilsProvider>
    )
}

export default AddActivity