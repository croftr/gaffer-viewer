
import React, { useLayoutEffect, useState } from 'react';
import { TextField, Typography, Input, Button } from '@material-ui/core';

export default function LoadData({ onSelectFile, filename, file, onUploadFile, schemaName }) {

    return (
        <div>
            <Typography>Load data for {schemaName} graph</Typography>

            <div className='inputArea' style={{ display: "flex", flexDirection: "column", width: 400 }}>

                <Button
                    variant="contained"
                    component="label"
                    style={{ marginBottom: 16 }}
                >
                    Upload File {filename}
                    <Input
                    type='file'
                    className='custom-file-input'
                    id='customFile'
                    onChange={onSelectFile}
                    label={filename}
                    style={{  display: "none" }}
                />                    
                </Button>

                <Button
                    type='submit'
                    color="secondary"
                    variant="contained"
                    onClick={onUploadFile}
                    value='Upload'
                    disabled={!file || !schemaName}
                    className='btn btn-primary btn-block mt-4'>
                    Upload Data
                </Button>
            </div>
        </div>
    )

}
