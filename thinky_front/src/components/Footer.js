// Import Packages
import React from "react"

// Import Styles
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

// Import Components
import Copyright from "./Copyright"

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   flexDirection: "column",
  //   minHeight: "100vh",
  // },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}))

export default function StickyFooter() {
  const classes = useStyles()

  return (
    <div>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  )
}
