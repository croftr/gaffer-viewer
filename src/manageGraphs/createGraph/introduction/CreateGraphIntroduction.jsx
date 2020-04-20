import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Button, Tab, Tabs, Typography, Dialog, IconButton, DialogTitle, DialogContent } from '@material-ui/core';
import CreateGraphStepper from "../CreateGraphStepper";
import ColumnTable from "./ColumnTable";
import simpleCsv from "../../images/simpleCsv.jpg";
import detailCsv from "../../images/detailCsv.jpg";

import CloseIcon from "@material-ui/icons/Close"

const csvFormats = ["Detaied Columns", "Detaied Example", "Simple Columns", "Simple Example"]
const csvDescriptions = [
    "Use the detailed upload format if you want to be able to control node and edge types as well as having the option of specifying edge weights",
    "You can use the simple upload format to just specify from and to node values. Edge types will be set to the generic type of INTERACTION"
]

const styles = {
    marginTop16: {
        marginTop: 16
    },
    marginLeft16: {
        marginLeft: 16
    },
    marginTop32: {
        marginTop: 32
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
    }

}

export const CreateGraphIntroduction = ({ classes, onCloseDialog, loadSchemas }) => {

    const [isStarted, setisStarted] = useState(false);
    const [tabPage, setTabPage] = useState(0);
    const [csvFormatText, setCsvFormatText] = useState(csvDescriptions[0]);
    const [isHelpPageOpen, setIsHelpPageOpen] = useState(false);

    const changeTabPage = (value) => {
        setTabPage(value);
        setCsvFormatText(csvDescriptions[value]);
    }

    return (
        <div>

            {!isStarted && (
                <div id="intoductionContent" className={classes.marginTop16}>

                    <Typography>You can use this to create a graph and load data into it by uploading a CSV file</Typography>
                    <Typography paragraph>Various CSV formats are accepted. </Typography>

                    <Typography paragraph>This stepper will walk you through the create graph stage</Typography>
                    

                    <div className={classes.marginTop32}>
                        <Button variant="contained" color="primary" onClick={() => setisStarted(true)}>OK LETS GET STARTED</Button>
                        <Button variant="contained" onClick={() => setIsHelpPageOpen(true)} className={classes.marginLeft16}>Review CSV formats</Button>
                        <Button variant="contained" color="secondary" className={classes.marginLeft16} onClick={onCloseDialog}>BACK TO MANAGE GRAPHS</Button>
                    </div>

                </div>
            )}


            {isStarted && <CreateGraphStepper onCloseDialog={onCloseDialog} loadSchemas={loadSchemas} />}

            <Dialog open={isHelpPageOpen} maxWidth={false}>

                <div className={classes.helpHeader}>
                    <DialogTitle>
                        CSV formats
                    </DialogTitle>
                    <IconButton onClick={() => setIsHelpPageOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <DialogContent dividers={true} className={classes.dialogContent}>                    

                    <Typography paragraph>{csvFormatText}</Typography>

                    <Tabs className={classes.marginTop16} value={tabPage} onChange={(event, value) => changeTabPage(value)} aria-label="simple tabs example">
                        {csvFormats.map(view => <Tab label={view} key={view} />)}
                    </Tabs>

                    {tabPage === 0 && (
                        <ColumnTable />
                    )}

                    {tabPage === 1 && (
                        <div className={classes.imageWrapper}>
                            <img src={detailCsv} width="800" />
                        </div>
                    )}

                    {tabPage === 2 && (
                        <ColumnTable />
                    )}


                    {tabPage === 3 && (
                        <div className={classes.imageWrapper}>
                            <img src={simpleCsv} width="300" />
                        </div>
                    )}

                </DialogContent>

            </Dialog>

        </div>
    )

}

CreateGraphIntroduction.propTypes = {
    classes: PropTypes.object.isRequired,
    //refresh the list of graphs
    loadSchemas: PropTypes.func,
    onCloseDialog: PropTypes.func
};

export default withStyles(styles)(CreateGraphIntroduction);
