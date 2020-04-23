import React from 'react';

import NameIcon from '@material-ui/icons/Contacts';
import SecureIcon from '@material-ui/icons/Security';
import UploadIcon from '@material-ui/icons/Publish';
import ConfirmIcon from '@material-ui/icons/DoneAllRounded';

export const STEP_NAMES = {
 NAME :  0,
 ACCESS :  1,
 UPLOAD : 2,
 REVIEW: 3
}

export const steps = {
    0: {
        title: "What will your graph be called?",
        reviewText: "Graph Name",
        icon: <NameIcon />
    },
    1: {
        title: "Who can access your graph?",
        reviewText: "Access Groups",
        icon: <SecureIcon />
    },
    2: {
        title: "Choose a CSV file to upload",
        reviewText: "Data",
        icon: <UploadIcon />
    },
    3: {
        title: "Make sure you are happy with how your graph looks",
        icon: <ConfirmIcon />
    }
}
