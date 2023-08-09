import React from "react";
import { TextField } from '@fluentui/react/lib/TextField';
import { SpinButton } from '@fluentui/react/lib/SpinButton';
import {
    DatePicker,
    defaultDatePickerStrings,
  } from '@fluentui/react';

const Field = ({field, isDisabled}) => {

    let input;

    if (field.type === 'number') {
        input = <SpinButton id={'optional-' + field.id} name={field.name} disabled={isDisabled}/>
     } else if( field.type ==='date') {
        input = <DatePicker id={'optional-' + field.id} name={field.name} disabled={isDisabled} placeholder="Select a date..." ariaLabel="Select a date" strings={defaultDatePickerStrings}/>
     } else {
        input = <TextField id={'optional-' + field.id} name={field.name} disabled={isDisabled} />
     }

    return(
        <>
            {input}
        </>
    )
}

export default Field