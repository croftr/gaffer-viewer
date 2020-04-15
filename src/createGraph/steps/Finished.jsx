
import React, { useLayoutEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';

export default function Finished({ handleReset }) {

    return (
        <div>
            <Typography>
                All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>
                Reset
            </Button>
        </div>
    )

}
