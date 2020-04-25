
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Paper,
    Button,
    TextField,
    Typography,
    IconButton,
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@material-ui/core';

import PieChart from 'react-minimal-pie-chart';



const styles = {
    graphSummary: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textSummary: {
        // marginRight: 16

    },
    chartSummay: {

    }
}

const colors = [
    "green",
    '#E38627',
    '#C13C37',
    '#6A2135',
]

export const GraphSummary = ({ classes, creationStats, statusStats }) => {

    const edgeData = (edgeStats) => {

        console.log("check ", edgeStats);


        // if (!edgeStats || !edgeStats.edgeGroupCounts || !edgeStats.edgeGroupCounts["uk.gov.gchq.gaffer.types.FreqMap"]) {
        //     return [];
        // }

        const edges = edgeStats.edgeGroupCounts["uk.gov.gchq.gaffer.types.FreqMap"];
        const data = Object.keys(edges).map((key, index) => {
            return {
                title: key,
                value: edges[key],
                color: colors[index]
            }
        })

        console.log("created ", data);

        return data;

        // return (
        //     [
        //         { title: 'One', value: 10, color: '#E38627' },
        //         { title: 'Two', value: 15, color: '#C13C37' },
        //         { title: 'Three', value: 20, color: '#6A2135' },
        //     ]
        // )


    }

    return (
        <div id="graphSummary" className={classes.graphSummary}>

            <div className={classes.textSummary}>

                <div id="graphCreatedStats">
                    <Typography>{creationStats.properties.description}</Typography>
                    <Typography>{creationStats.properties.createdBy}</Typography>
                    <Typography>{creationStats.properties.createdDate["java.util.Date"]}</Typography>
                </div>
               
            </div>

            <div className={classes.chartSummay}>

                {statusStats.properties && (

                    <div style={{display: "flex"}}>

                        <div>

                            {Object.keys(statusStats.properties.edgeGroupCounts["uk.gov.gchq.gaffer.types.FreqMap"]).map( (key, index) => {
                                    return (
                                        <span key={key} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                                            <div style={{ width: 15, height: 15, borderRadius: 5, marginRight: 4, background: colors[index]}}></div>
                                            <Typography variant="caption">{`${key}: ${statusStats.properties.edgeGroupCounts["uk.gov.gchq.gaffer.types.FreqMap"][key]}`}</Typography>
                                        </span>
                                    )
                                        
                                })
                            }


                        </div>

                        <PieChart
                            cx={50}
                            cy={50}
                            label={false}
                            labelPosition={50}
                            lengthAngle={360}
                            lineWidth={25}
                            paddingAngle={0}
                            radius={50}
                            rounded
                            startAngle={0}
                            viewBoxSize={[
                                100,
                                100
                            ]}
                            animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            style={{ height: 200 }}
                            data={edgeData(statusStats.properties)}
                        />

                    </div>


                )}


            </div>



        </div>

    )
}

GraphSummary.propTypes = {
    classes: PropTypes.object.isRequired,
    creationStats: PropTypes.object,
    statusStats: PropTypes.object,
};

export default withStyles(styles)(GraphSummary);
