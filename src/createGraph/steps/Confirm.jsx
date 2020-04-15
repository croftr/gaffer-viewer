
import React, { useLayoutEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';

export default function Confirm({ onConfirmCreate, schemaName, handleReset }) {

    return (
        <div>
            <Typography>
                All steps completed. 
            </Typography>
            <Button onClick={onConfirmCreate}>
                Confirm create {schemaName}
            </Button>
            <Button onClick={handleReset}>
                Cancel
            </Button>
        </div>
    )

}
