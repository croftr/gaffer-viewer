import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const styles = {}

/**
 * This table displays information about csv columns that we take for uploading grpahs 
 */
const LoadResultsTable = ({ classes, createdSchema = {}, isShowingMissingEdges=true }) => {

    return (
        <TableContainer>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell>Edges processed</TableCell>
                        <TableCell>{createdSchema ? createdSchema.edgeLoadCount + createdSchema.rejectedEdgeLoadCount : 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Edges loaded</TableCell>
                        <TableCell>{createdSchema.edgeLoadCount || 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Edges Rejected</TableCell>
                        <TableCell>{createdSchema.rejectedEdgeLoadCount || 0}</TableCell>
                    </TableRow>
                    { isShowingMissingEdges && ( <TableRow>
                        <TableCell>Unsupported edge types</TableCell>
                        <TableCell>{createdSchema.newEdgeTypes ? createdSchema.newEdgeTypes.length : 0}</TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

}

LoadResultsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    createdSchema: PropTypes.object
};

export default withStyles(styles)(LoadResultsTable);
