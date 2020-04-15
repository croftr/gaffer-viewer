import React, { Fragment, useState } from 'react';
import { fetchUploadGraph } from "../actions/GafferActions"
import JSONPretty from 'react-json-pretty';
import { TextField, Input, Button, Typography } from '@material-ui/core';

const Upload = () => {

    const [file, setFile] = useState();
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [createdSchema, setCreatedSchema] = useState('');
    const [schemaName, setSchemaName] = useState(undefined);


    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (e) => {
            console.log("got ", e.target.result);
        };

        reader.readAsText(e.target.files[0]);

    };

    const onSubmit = async e => {

        e.preventDefault();
        const formData = new FormData();
        
        formData.append('file', file);

        try {

            const res = await fetchUploadGraph(formData, schemaName);
            console.log("check me ", res);

            if (res) {
                setCreatedSchema(res)
            } else {
                console.log("no response data ");
            }

        } catch (err) {
            console.error("error loading file ", err);

        }
    };

    const onChangeSchemaName = (e) => {                    
        setSchemaName(e.target.value);
    }

    return (
        <Fragment>

            <div className='inputArea' style={{ display: "flex", flexDirection: "column", width: 400 }}>
                <Input
                    type='file'
                    className='custom-file-input'
                    id='customFile'
                    onChange={onChange}
                    label={filename}                    
                    style={{ marginBottom: 16 }}
                />

                <TextField
                    required
                    id="schema-name"
                    label="Schema name"
                    value={schemaName}
                    onChange={onChangeSchemaName}
                    style={{ marginBottom: 16 }}
                />

                <Button
                    type='submit'
                    color="secondary"
                    variant="contained"
                    onClick={onSubmit}
                    value='Upload'
                    disabled={!file || !schemaName}
                    className='btn btn-primary btn-block mt-4'>
                    Create Schema
                </Button>
            </div>


            {uploadedFile ? (
                <div className='row mt-5'>
                    <div className='col-md-6 m-auto'>
                        <h3 className='text-center'>{uploadedFile.fileName}</h3>
                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                    </div>
                </div>
            ) : null}

            {createdSchema && (
                <div style={{ overflowY: "auto", height: "70%" }}>
                    <Typography variant="h6">Created {schemaName}</Typography>
                    <JSONPretty id="json-payload" data={createdSchema}></JSONPretty>
                </div>
                
            )}
        </Fragment>
    );
};

export default Upload;