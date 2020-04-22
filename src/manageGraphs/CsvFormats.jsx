import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Tab, Tabs, Typography } from '@material-ui/core';
import ColumnTable from "./createGraph/introduction/ColumnTable";
import simpleCsv from "./images/simpleCsv.jpg";
import detailCsv from "./images/detailCsv.jpg";
import { DETAILED_COLUMNS, SIMPLE_COLUMNS } from "./utils/validateCsv"

const csvFormats = ["Detaied Columns", "Detaied Example", "Simple Columns", "Simple Example"]
const csvDescriptions = [
    "The detailed upload format allows control node and edge types as well as edge weights",
    "The detailed upload format allows control node and edge types as well as edge weights",
    "With the simple format you can create a graph just by providing from and to node values",
    "With the simple format you can create a graph just by providing from and to node values",
]

const styles = {
    marginTop16: {
        marginTop: 16
    },
    marginLeft16: {
        marginLeft: 16
    },
    buttonsWrapper: {
        marginTop: 32,
        display: "flex",
        flexDirection: "column"
    },
    imageWrapper: {
        height: 300,
        paddingTop: 16,
        overflowY: "hidden"
    },
    helpHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dialogContent: {
        width: 1000,
        height: 500
    },
    tabContentWrapper: {
        paddingTop: 16
    },
    button: {
        width: 250,
        marginBottom: 16
    },
}

export const CsvFormats = ({ classes, }) => {

    const [tabPage, setTabPage] = useState(0);
    const [csvFormatText, setCsvFormatText] = useState(csvDescriptions[0]);
    
    const changeTabPage = (value) => {
        setTabPage(value);
        setCsvFormatText(csvDescriptions[value]);
    }

    return (
        <div id="csvFormats">

            <Typography paragraph>{csvFormatText}</Typography>

            <Tabs
                className={classes.marginTop16}
                value={tabPage}
                onChange={(event, value) => changeTabPage(value)}
                aria-label="csvFormat">
                {csvFormats.map(view => <Tab label={view} key={view} />)}
            </Tabs>

            <div className={classes.tabContentWrapper}>
                {tabPage === 0 && (
                    <ColumnTable data={DETAILED_COLUMNS} />
                )}

                {tabPage === 1 && (
                    <div className={classes.imageWrapper}>
                        <img src={detailCsv} width="800" />
                    </div>
                )}

                {tabPage === 2 && (
                    <ColumnTable data={SIMPLE_COLUMNS} />
                )}

                {tabPage === 3 && (
                    <div className={classes.imageWrapper}>
                        <img src={simpleCsv} width="300" />
                    </div>
                )}
            </div>
        </div>
    )
}

CsvFormats.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CsvFormats);
