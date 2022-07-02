import { Button, Container, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';
import { format, formatDistanceStrict } from 'date-fns'
import { set } from 'date-fns/esm';

const ListActivities = ({ activities, setActivities, totalTimeWasted, oneWeekWasted }) => {



    const DoneHandler = (activity, idx) => {
        const copy = [...activities]
        const activityCopy = { ...activity, done: !activity.done }
        copy[idx] = activityCopy;
        setActivities(copy);
    }

    return (
        <>
            <Container
                style={{
                    display: "flex",
                    marginTop: "20px"
                }}>
                <Container
                    style={{
                        textAlign: "center"
                    }}>
                    <Typography variant="body2">
                        7vrk sisällä
                    </Typography>
                    <Typography
                        variant="h6">
                        {oneWeekWasted}
                    </Typography>
                </Container>
                <Container style={{
                    textAlign: "center"
                }}>
                    <Typography variant="body2">
                        Yhteensä
                    </Typography>
                    <Typography
                        variant="h6">
                        {totalTimeWasted}
                    </Typography>
                </Container>
            </Container>
            <List>
                {activities.map((activity, idx) => {

                    let alku = format(activity.begins, "dd.MM.yy H:mm")
                    let loppu = format(activity.deadline, "dd.MM.yy H:mm")

                    return (
                        <ListItem key={idx}>
                            {activity.done
                                ? <IconButton onClick={() => {
                                    DoneHandler(activity, idx)
                                }}>
                                    <DoneIcon />
                                </IconButton>
                                : <IconButton onClick={() => {
                                    DoneHandler(activity, idx)
                                }}>
                                    <CancelIcon />
                                </IconButton>
                            }
                            <ListItemText primary={activity.activity} secondary={
                                <React.Fragment>
                                    <div>{`Alkoi ${alku}`}</div>
                                    <div>{`Päättyi ${loppu}`}</div>
                                </React.Fragment>
                            }>
                            </ListItemText>
                            <Button
                                variant='outlined'
                                sx={{ marginRight: "15px" }}
                                to={`/delete/${idx}`}
                                component={Link}>
                                Clear
                            </Button>
                        </ListItem>
                    );
                })}
            </List>
        </>
    )
}

export default ListActivities