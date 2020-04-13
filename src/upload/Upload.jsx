import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import { fetchUploadGraph } from "../actions/GafferActions"

const Upload = () => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload =  (e) => {
            console.log("got ", e.target.result);
        };

        reader.readAsText(e.target.files[0]);

    };

    const onSubmit = async e => {

        e.preventDefault();
        const formData = new FormData();
        console.log("file ", file);

        formData.append('file', file);

        try {
            
            const res = await fetchUploadGraph(formData);            
            
            if (res) {
                // const { fileName, filePath } = res.data;
                // setUploadedFile({ fileName, filePath });    
                setMessage(res.message);
            } else {
                console.log("no response data ");                
            }
            
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    };

    return (
        <Fragment>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className='custom-file mb-4'>
                    <input
                        type='file'
                        className='custom-file-input'
                        id='customFile'
                        onChange={onChange}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                        {filename}
                    </label>
                </div>

                <Progress percentage={uploadPercentage} />

                <input
                    type='submit'
                    value='Upload'
                    className='btn btn-primary btn-block mt-4'
                />
            </form>
            {uploadedFile ? (
                <div className='row mt-5'>
                    <div className='col-md-6 m-auto'>
                        <h3 className='text-center'>{uploadedFile.fileName}</h3>
                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
};

export default Upload;