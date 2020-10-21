import {
  Box,
  Divider,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import useFetchData from "./hooks/useFetchData";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const App = () => {
  const data = useFetchData();
  const classes = useStyles();

  return (
    <Table size="small" className={classes.root} component={Paper}>
      {data.map((tableGroup) => (
        <React.Fragment key={tableGroup.key}>
          <TableHead>
            <TableRow>
              {tableGroup.headers.map((header) => (
                <TableCell key={header}>
                  <Typography variant="h6">{header}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableGroup.data.map((row) => (
              <TableRow>
                {row.map((datum) => (
                  <TableCell key={datum.id}>{datum.name}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
            <TableCell colSpan={3}>
              <Box marginTop={4} />
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
    </Table>
  );
};

export default App;
