
import React from 'react';
import { Select, Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';

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

export default function ConfigureGraph({ schemaName, onChangeAuths, auths }) {

    return (
        <div style={{ height: "100%" }}>

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
    )

}
