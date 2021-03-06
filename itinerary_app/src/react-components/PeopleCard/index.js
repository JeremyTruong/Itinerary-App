import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Button, IconButton, Typography, Grid} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardQuote: {
    height: '200px',
  },
});

const PeopleCard = props => {
    const classes = useStyles();
    const {user} = props;
    return (<Grid item xs={12} sm={3}>
              <Box mx={3}>
                <Card variant="outlined">
                  <CardHeader
                      avatar={
                      <Avatar src={user.profilePic} />
                      }
                      title={user.firstName + " " + user.lastName}
                      subheader={user.location}
                  />
                  <CardMedia
                    style={{height: "150px"}}
                    className={classes.media}
                    image={user.banner}
                    title=""
                  />
                  <CardContent>
                    <Typography variant="body2" component="p">
                      {user.quote}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container>
                      <Grid xs={4}>
                        {/* This will be a server call to retreive the correct profile */}
                        <Link to={{
                          pathname: "../User2",
                          state: {user: user}
                        }}>
                          <Button size="small" color="primary">View Profile</Button>
                        </Link>
                        </Grid><Grid xs={4}>
                        {/* This will be a server call to update friends list in the database */}
                        <Button size="small" color="primary" onClick={()=>console.log(user)}>Add Friend</Button>
                        </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
    );
};

export default PeopleCard;