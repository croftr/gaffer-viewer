import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {}

const ColumnTable = ({ classes, data }) => {
    return (
        <TableContainer>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Column</TableCell>
                <TableCell>Data type</TableCell>
                <TableCell>Required</TableCell>
                <TableCell>Description</TableCell>                
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data).map((key) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{data[key].type}</TableCell>
                  <TableCell>{data[key].mandatory}</TableCell>
                  <TableCell>{data[key].description}</TableCell>                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

}

ColumnTable.propTypes = {
    classes: PropTypes.object.isRequired,    
    //the table data
    data: PropTypes.object
};

export default withStyles(styles)(ColumnTable);
