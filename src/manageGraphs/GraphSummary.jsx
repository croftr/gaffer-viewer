
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Typography, Tooltip,
} from '@material-ui/core';

import PieChart from 'react-minimal-pie-chart';

import PersonIcon from '@material-ui/icons/PersonOutline';
import DateIcon from '@material-ui/icons/CalendarToday';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import EdgeIcon from '@material-ui/icons/ShowChartOutlined';

import { edgeColour } from "./utils/edgeColours"

const styles = {
    graphSummary: {
        display: "flex",
        justifyContent: "space-between",        
        marginBottom: 16
    },
    textSummary: {
        flex: 1
    },
    chartSummay: {
        flex: 1,
    },
    iconTextWrapper: {
        display: "flex",
        alignItems: "flex-start",
        marginTop: 8
    },
    icon: {
        marginRight: 8
    },
    pieHeader: {
        display: "flex",
        justifyContent: "flex-end",
        marginRight: 100
    }
}

const colors = [
    "green",
    '#E38627',
    '#C13C37',
    '#6A2135',
]

export const GraphSummary = ({ classes, creationStats, statusStats }) => {

    const [selected, setSelected] = useState(undefined);
    const [hovered, setHovered] = useState(undefined);

    const lineWidth = 60;

    const edgeData = (edgeStats) => {

        const edges = edgeStats?.edgeGroupCounts["uk.gov.gchq.gaffer.types.FreqMap"];
        
        const data = Object.keys(edges).map((key, index) => {

            if (hovered === index) {
                return {
                    title: key,
                    value: edges[key],
                    color: "grey"
                }
            } else {
                return {
                    title: key,
                    value: edges[key],
                    color: edgeColour(key, index)
                }
            }

        })
        return data;
    }

    return (
        <div id="graphSummary" className={classes.graphSummary}>

            <div className={classes.textSummary}>

                <div id="graphCreatedStats">

                    <span className={classes.iconTextWrapper}>
                        <Tooltip title="Creaetd by">
                            <PersonIcon className={classes.icon} color="action" />
                        </Tooltip>

                        <Typography>{creationStats.properties.createdBy}</Typography>
                    </span>

                    <span className={classes.iconTextWrapper}>
                        <Tooltip title="Creaetd on">
                            <DateIcon className={classes.icon} color="action" />
                        </Tooltip>

                        <Typography>{new Date(creationStats.properties.createdDate["java.util.Date"]).toDateString()}</Typography>Z
                    </span>

                    <span className={classes.iconTextWrapper}>
                        <Tooltip title="description">
                            <InfoIcon className={classes.icon} color="action" />
                        </Tooltip>
                        <Typography >{creationStats.properties.description}</Typography>
                    </span>


                </div>

            </div>

            <div className={classes.chartSummay}>

                <span className={classes.pieHeader}>
                    <EdgeIcon className={classes.icon} color="action" />
                    <Typography >Edge Groups</Typography>
                </span>

                {statusStats.properties && (

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>

                        <table>
                            <tbody>
                                {Object.keys(statusStats.properties.edgeGroupCounts["uk.gov.gchq.gaffer.types.FreqMap"]).map((key, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div style={{ width: 15, height: 15, borderRadius: 5, marginRight: 4, background: edgeColour(key, index), cursor: "pointer" }}
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

                        <PieChart
                            style={{
                                fontFamily:
                                    '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                                fontSize: '8px',
                            }}
                            data={edgeData(statusStats.properties)}
                            radius={40}
                            lineWidth={60}
                            segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                            segmentsShift={(_, index) => (index === selected ? 10 : 1)}
                            animate
                            label={({ data, dataIndex }) =>
                                Math.round(data[dataIndex].percentage) + '%'
                            }
                            labelPosition={100 - lineWidth / 2}
                            labelStyle={{
                                fill: '#fff',
                                opacity: 0.75,
                                pointerEvents: 'none',
                                dominantBaseline: 'central', //@TODO remove if when #149 gets implemented
                            }}
                            onClick={(_, __, index) => {
                                setSelected(index === selected ? undefined : index);
                            }}
                            onMouseOver={(_, __, index) => {
                                setHovered(index);
                            }}
                            onMouseOut={() => {
                                setHovered(undefined);
                            }}
                        />

                    </div>


                )
                }


            </div >



        </div >

    )
}

GraphSummary.propTypes = {
    classes: PropTypes.object.isRequired,
    creationStats: PropTypes.object,
    statusStats: PropTypes.object,
};

export default withStyles(styles)(GraphSummary);
