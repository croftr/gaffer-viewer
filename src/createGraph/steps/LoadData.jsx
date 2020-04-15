
import React, { useLayoutEffect, useState } from 'react';
import { TextField, Typography, Input, Button } from '@material-ui/core';

export default function LoadData({ onSelectFile, filename, file, onUploadFile, schemaName }) {

    return (
        <div>
            <Typography>Load data</Typography>
            
            <div className='inputArea' style={{ display: "flex", flexDirection: "column", width: 400 }}>
                <Input
                    type='file'
                    className='custom-file-input'
                    id='customFile'
                    onChange={onSelectFile}
                    label={filename}                                        
                    style={{ marginBottom: 16 }}
                />
            
                <Button
                    type='submit'
                    color="secondary"
                    variant="contained"
                    onClick={onUploadFile}
                    value='Upload'
                    disabled={!file || !schemaName}
                    className='btn btn-primary btn-block mt-4'>
                    Create Schema
                </Button>
            </div>
        </div>
    )

}
