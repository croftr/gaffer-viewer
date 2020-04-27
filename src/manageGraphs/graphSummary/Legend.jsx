
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Typography,
} from '@material-ui/core';

import { edgeColour } from "../utils/edgeColours"

const styles = {
    table: { 
        overflowY: "auto" 
    },
    tableWrapper: {
        maxHeight: 300,
        overflowY: "auto"
    }
}

export const Legend = ({ classes, statusStats, selected, setSelected, setHovered }) => {

    return (

        <div className={classes.tableWrapper}>
            <table id="legend" className={classes.table}>
                <tbody>
                    {Object.keys(statusStats.properties.edgeGroupCounts["uk.gov.gchq.gaffer.types.FreqMap"]).map((key, index) => {
                        return (
                            <tr key={key}>
                                <td>
                                    <div style={{
                                        width: 15,
                                        height: 15,
                                        borderRadius: 5,
                                        marginRight: 4,
                                        background: edgeColour(key, index), cursor: "pointer"
                                    }}
                                        onClick={() => {
                                            setSelected(index === selected ? undefined : index);
                                            setHovered(index === selected ? undefined : index);
                                        }} />
                                </td>
                                <td>
                                    <Typography variant="caption">{key}</Typography>
                                </td>
                                <td>
                                    <Typography variant="caption">{statusStats.properties.edgeGroupCounts["uk.gov.gchq.gaffer.types.FreqMap"][key]}</Typography>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

Legend.propTypes = {
    classes: PropTypes.object.isRequired,
    statusStats: PropTypes.object,
    selected: PropTypes.number,
    setSelected: PropTypes.func,
    setHovered: PropTypes.func
};

export default withStyles(styles)(Legend);
