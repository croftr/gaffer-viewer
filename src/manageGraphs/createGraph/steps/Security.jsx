
import React, { useState } from 'react';
import { Select, Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const dummyAuths = [
    "Auth1",
    "Auth2",
    "Auth3",
    "Auth4",
    "Auth5",
    "Auth6",
]

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

export default function Security({ schemaName, onChangeAuths, auths, setAuthsRadioValue, authsRadioValue }) {

    // const [radioValue, setRadioValue] = useState('justMe');

    // const handleChange = (event) => {
    //     setRadioValue(event.target.value);
    // };

    return (
        <div style={{ }}>

            <FormControl component="fieldset">
                {/* <FormLabel component="legend">Who can access your graph</FormLabel> */}
                <RadioGroup aria-label="gender" name="gender1" value={authsRadioValue} onChange={(e) => setAuthsRadioValue(e.target.value)}>                    
                    <FormControlLabel value="justMe" control={<Radio />} label="Just me" />
                    <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
                    <FormControlLabel value="specifyGroups" control={<Radio />} label="Specify groups" />
                </RadioGroup>
            </FormControl>

            {authsRadioValue === "specifyGroups" && (

                <div className="chooseGroups">

                    <Typography variant="h6">Choose Authorisation Groups for {schemaName}</Typography>

                    <FormControl style={{ marginTop: 16 }}>
                        <InputLabel id="demo-mutiple-chip-label">Auths</InputLabel>
                        <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={auths}
                            onChange={onChangeAuths}
                            input={<Input id="select-multiple-chip" style={{ minWidth: 300 }} />}
                            renderValue={(selected) => (
                                <div>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} style={{ margin: 4 }} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {dummyAuths.map((name) => (
                                <MenuItem key={name} value={name} style={{}}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>

            )}


        </div>
    )

}
