import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Button, Typography, Dialog, IconButton, DialogTitle, DialogContent } from '@material-ui/core';

import CreateGraphStepper from "../CreateGraphStepper";
import UploadFileFormats from "../../UploadFileFormats";

import CloseIcon from "@material-ui/icons/Close"

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

/**
 * This components is shown before the user starts using the create graph stepper.
 * It gives the user details of what the stepper will do and what they will need 
 * to create a graph using it
 */
const CreateGraphIntroduction = ({ classes, onCloseDialog, loadSchemas }) => {

    const [isStarted, setisStarted] = useState(false);
    const [isHelpPageOpen, setIsHelpPageOpen] = useState(false);

    return (
        <div id="createGraphIntoduction">
            {!isStarted && (
                <div id="intoductionContent" className={classes.marginTop16}>

                    <Typography>
                        You can use this to create a graph and load data into it by uploading a delimted file
                    </Typography>

                    <Typography paragraph>
                        Various formats and delimters are accepted.
                    </Typography>

                    <Typography paragraph>
                        This stepper will walk you through the create graph stage
                    </Typography>

                    <div className={classes.buttonsWrapper}>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={() => setisStarted(true)}>
                            OK LETS GET STARTED
                        </Button>

                        <Button
                            className={classes.button}
                            variant="contained"
                            onClick={() => setIsHelpPageOpen(true)}>
                            FILE FORMATS
                        </Button>

                        <Button
                            className={classes.button}
                            color="secondary"
                            onClick={onCloseDialog}>
                            BACK TO MANAGE GRAPHS
                        </Button>
                    </div>
                </div>
            )}

            {isStarted && <CreateGraphStepper onCloseDialog={onCloseDialog} loadSchemas={loadSchemas} />}

            <Dialog open={isHelpPageOpen} maxWidth={false}>

                <div className={classes.helpHeader}>
                    <DialogTitle>
                        File formats
                    </DialogTitle>
                    <IconButton onClick={() => setIsHelpPageOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <DialogContent dividers={true} className={classes.dialogContent}>
                    <UploadFileFormats />
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
