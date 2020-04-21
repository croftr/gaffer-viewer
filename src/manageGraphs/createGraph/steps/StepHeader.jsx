
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { steps } from "./steps"

export default function StepperHeader({ activeStep, confirmedSchemaName }) {

    return (
        <>
            <div style={{ height: 35 }}>
                {confirmedSchemaName && <Typography variant="h6" color="textSecondary" align="center">Creating Graph {confirmedSchemaName}</Typography>}
            </div>
            
            <div id="stepHeader" style={{ display: "flex", alignItems: "center", marginBottom: 16  }}>
                {steps[activeStep].icon}
                <Typography variant="h6" style={{ marginLeft: 16 }}>{steps[activeStep].title}</Typography>                
            </div>            
        </>
    )

}
