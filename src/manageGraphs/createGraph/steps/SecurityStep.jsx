
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Select } from '@material-ui/core';

import {
    Radio,
    RadioGroup,
    Button,
    FormControlLabel,
    Input,
    InputLabel,
    MenuItem,
    FormControl,
    Chip
} from '@material-ui/core';

const dummyAuths = [
    "Auth1",
    "Auth2",
    "Auth3",
    "Auth4",
    "Auth5",
    "Auth6",
]

const styles = {
    securityStep: {
        display: "flex",
        flexDirection: "column"
    },
    marginTop: {
        marginTop: 16
    },
    chip: {        
        margin: 4
    },
    input: {
        minWidth: 300
    },
    applyButton: {
        width: 100, 
        alignSelf: "flex-end"
    }
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const SecurityStep = ({ classes, onChangeAuths, auths, setAuthsRadioValue, authsRadioValue, isStepper, onApplyAuths }) => {

    return (
        <div className={classes.securityStep}>

            <FormControl component="fieldset">                
                <RadioGroup
                    aria-label="security"
                    name="security"
                    value={authsRadioValue}
                    onChange={(e) => setAuthsRadioValue(e.target.value)}
                >
                    <FormControlLabel value="justMe" control={<Radio />} label="Just me" />
                    <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
                    <FormControlLabel value="specifyGroups" control={<Radio />} label="Specify groups" />
                </RadioGroup>
            </FormControl>

            {authsRadioValue === "specifyGroups" && (

                <div className="chooseGroups">

                    <FormControl className={classes.marginTop}>
                        <InputLabel id="authGroupsLabel">Authorisation Groups</InputLabel>
                        <Select
                            labelId="authGroupsLabel"
                            id="authGroupsSelect"
                            multiple
                            value={auths}
                            onChange={onChangeAuths}
                            input={<Input id="selectAuthChip" className={classes.input} />}
                            renderValue={(selected) => (
                                <div>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {dummyAuths.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )}

            {!isStepper && (
                 <Button 
                    color="primary" 
                    variant="contained" 
                    className={classes.applyButton}
                    onClick={onApplyAuths}
                >
                     Apply
                 </Button>
            )}

        </div>
    )
}

SecurityStep.propTypes = {
    classes: PropTypes.object.isRequired,
    schemaName: PropTypes.string,
    onChangeAuths: PropTypes.func,
    auths: PropTypes.array,
    setAuthsRadioValue: PropTypes.func,
    authsRadioValue: PropTypes.string,
    isStepper: PropTypes.bool,
    //only passed in from manage graphs page when access roles for existing graph as changed 
    onApplyAuths: PropTypes.func
};

export default withStyles(styles)(SecurityStep);
