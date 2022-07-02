import { Button, Container, Typography } from '@mui/material'
import { isAfter, subWeeks } from 'date-fns'
import React from 'react'
import { useHistory, useParams, useState } from 'react-router-dom'

const DeleteActivity = ({ activities, setActivities, setMinutes, setHours, minutes, hours, setWeekHours, setWeekMinutes, weekHourss, weekMinutes }) => {
    const history = useHistory()
    const { idx } = useParams()
    const HandleClick = () => {
        let helper = activities.filter((activity, index) => {
            return (index !== Number(idx))
        })
        let lastWeek = subWeeks(new Date(), 1)
        setActivities([...helper])
        setHours(hours - activities[idx].kestoT)
        setMinutes(minutes - activities[idx].kestoM)
        if (isAfter(activities[idx].deadline, lastWeek)) {
            setWeekHours(weekHourss - activities[idx].kestoT)
            setWeekMinutes(weekMinutes - activities[idx].kestoM)
        }
    }
    return (
        <>
            <Typography
                variant="h6"
                sx={{
                    marginTop: "10px"
                }}>Haluatko varmasti poistaa aktiviteetin: {activities[idx].activity}?</Typography>
            <Container sx={{
                display: "flex",
                marginTop: "10px"
            }}>
                <Button variant='contained'
                    fullWidth
                    sx={{
                        margin: "5px"
                    }} onClick={() => {
                        HandleClick()
                        history.push("/")
                    }}>
                    Poista
                </Button>
                <Button variant='outlined'
                    fullWidth
                    sx={{
                        margin: "5px"
                    }} onClick={() => {
                        history.push("/")
                    }}>
                    Peruuta
                </Button>
            </Container>
        </>
    )
}

export default DeleteActivity