import React, { useState, useEffect } from "react"
import {
  makeStyles,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  CardActions,
  Avatar,
} from "@material-ui/core"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
}))

const InitiativePage = () => {
  const classes = useStyles()
  const [initiatives, setInitiatives] = useState([])

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/initiatives/initiatives"
        )
        setInitiatives(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching initiatives", error)
      }
    }

    fetchInitiatives()
  }, [])

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        gutterBottom
      >
        Initiatives
      </Typography>
      <Grid
        container
        spacing={3}
      >
        {initiatives.map((initiative) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={initiative._id}
          >
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={initiative.image}
                  title={initiative.title}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {initiative.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {initiative.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                <Box className={classes.author}>
                  <Avatar src={initiative.creator.avatar} />
                  <Box ml={2}>
                    <Typography
                      variant="subtitle2"
                      component="p"
                    >
                      {initiative.creator}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="p"
                    >
                      {initiative.createdAt}
                    </Typography>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default InitiativePage
