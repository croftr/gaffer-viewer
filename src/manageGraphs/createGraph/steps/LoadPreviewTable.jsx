import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { lookupDelimiter } from "../../utils/uploadFileUtils";
import { Typography } from '@material-ui/core';

import { DETAILED_COLUMNS, SIMPLE_COLUMNS } from "../../utils/uploadFileUtils"

const styles = {
    button: {
        width: 200,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        wordBreak: "break-all"
    },
    buttonArea: {
        display: "flex",
        alignItems: "center",
        marginBottom: 16,
        marginTop: 8
    },
    buttonTextArea: {
        display: "flex",
        alignItems: "center",
        marginLeft: 16
    },
    cell: {
        border: "1px solid lightGrey",
        padding: 4
    },
    headerCell: {
        border: "1px solid lightGrey",
        color: "black",
        background: "lightGrey",
        fontWeight: "normal",
        padding: 4
    },
    fader: {
        position: "relative",
        top: -10,
        height: 20,
        width: "90%",
        background: "#ffffff9e",

    }
}

const LoadPreviewTable = ({
    classes,
    delimiterType,
    topLines = [],
    columnCount
}) => {

    return (

        <div id="loadPreviewTable">
            <Typography>Preview with {delimiterType} delimter</Typography>
            <table>
                <thead>
                    <tr>
                        {columnCount === 2 && (
                            <React.Fragment>
                                {Object.keys(SIMPLE_COLUMNS).map(key => (
                                    <th key={key} className={classes.headerCell}>{key}</th>
                                ))}
                            </React.Fragment>
                        )}
                        {columnCount === 9 && ( //todo loop
                            <React.Fragment>
                                {Object.keys(DETAILED_COLUMNS).map(key => (
                                    <th key={key} className={classes.headerCell}>{key}</th>
                                ))}
                            </React.Fragment>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {topLines.map((row, index) => {

                        const delimiter = lookupDelimiter(delimiterType);
                        const cells = row.split(delimiter);
                        return (
                            <tr key={`row-${index}`}>
                                {cells.map((cell, cellIndex) => (
                                    <td
                                        className={classes.cell}
                                        key={`cell-${cell}-${index}-${cellIndex}`}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <div className={classes.fader}></div>
        </div>
    )
}

LoadPreviewTable.propTypes = {
    classes: PropTypes.object.isRequired,
    delimiterType: PropTypes.string,
    topLines: PropTypes.array,
    columnCount: PropTypes.number
};

export default withStyles(styles)(LoadPreviewTable);