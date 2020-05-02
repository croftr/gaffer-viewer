import { useState } from 'react';

export const useFileUpload = () => {
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState('');

    return file;
}