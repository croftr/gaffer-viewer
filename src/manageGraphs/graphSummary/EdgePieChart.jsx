import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Typography,
} from '@material-ui/core';

import PieChart from 'react-minimal-pie-chart';

import EdgeIcon from '@material-ui/icons/ShowChartOutlined';

import { edgeColour } from "../utils/edgeColours"
import Legend from "./Legend"

const styles = {
    icon: {
        marginRight: 8
    },
    pieHeader: {
        display: "flex",
        justifyContent: "flex-end",
        marginRight: 100
    },
    piechartWrapper: {
        display: "flex", 
        justifyContent: "flex-end" 
    }     
}

const lineWidth = 60;

export const EdgePieChart = ({ classes, statusStats }) => {

    const [selected, setSelected] = useState(undefined);
    const [hovered, setHovered] = useState(undefined);

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

        <div id="edgePieChart">

            <span className={classes.pieHeader}>
                <EdgeIcon className={classes.icon} color="action" />
                <Typography >Edge Groups</Typography>
            </span>

            {statusStats.properties && (

                <div className={classes.piechartWrapper}>

                    <Legend
                        statusStats={statusStats}
                        selected={selected}
                        setSelected={setSelected}
                        setHovered={setHovered}
                    />

                    <PieChart
                        style={{
                            fontFamily:
                                '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                            fontSize: '8px',
                            maxHeight: 300
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
                            dominantBaseline: 'central',
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
            )}
        </div >
    )
}

EdgePieChart.propTypes = {
    classes: PropTypes.object.isRequired,
    statusStats: PropTypes.object,
};

export default withStyles(styles)(EdgePieChart);
