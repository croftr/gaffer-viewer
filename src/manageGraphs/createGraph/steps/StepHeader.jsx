
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

import NameIcon from '@material-ui/icons/Contacts';
import SecureIcon from '@material-ui/icons/Security';
import UploadIcon from '@material-ui/icons/Publish';
import ConfirmIcon from '@material-ui/icons/DoneAllRounded';

const headerContent = {
    0: {
        title: "What will your graph be called?",
        icon: <NameIcon />
    },
    1: {
        title: "Who can access your graph?",
        icon: <SecureIcon />
    },
    2: {
        title: "Uplaod data",
        icon: <UploadIcon />
    },
    3: {
        title: "Review & Confirm",
        icon: <ConfirmIcon />
    },
    4: {
        title: "",
        icon: undefined
    }
}

//todo useLayoutEffect for post render rendering 
export default function StepperHeader({ activeStep, confirmedSchemaName }) {

    return (
        <>
            <div style={{ height: 35 }}>
                {confirmedSchemaName && <Typography variant="h6" align="center">Creating Graph {confirmedSchemaName}</Typography>}
            </div>
            
            <div id="stepHeader" style={{ display: "flex", alignItems: "center", marginBottom: 16  }}>
                {headerContent[activeStep].icon}
                <Typography variant="h6" style={{ marginLeft: 16 }}>{headerContent[activeStep].title}</Typography>                
            </div>
            
        </>
    )

}
