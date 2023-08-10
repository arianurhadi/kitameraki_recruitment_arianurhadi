import React, { useEffect, useRef, useState } from "react";
import { TextField } from '@fluentui/react/lib/TextField';
import { SpinButton } from '@fluentui/react/lib/SpinButton';
import {
    DatePicker,
    defaultDatePickerStrings,
  } from '@fluentui/react';

const Field = ({field, isDisabled, handleChange, values}) => {

    let input;
    let inputHidden;

    const inputDateRef = useRef()

    const [date, setDate] = useState('');

 
    if (field.type === 'number') {
        input = <SpinButton id={'optional-' + field.id} name={field.name} disabled={isDisabled} value={values[field.name]} onChange={(event) => handleChange(event)}/>
     } else if( field.type ==='date') {
        inputHidden = <input ref={inputDateRef} id={'optional-hidden' + field.id} type="hidden" name={field.name} value={date} onChange={(event) => handleChange(event)} />
        input = <DatePicker id={'optional-' + field.id} name={field.name} disabled={isDisabled} value={values[field.name]} onSelectDate={(date) => setDate(date)} placeholder="Select a date..." ariaLabel="Select a date" strings={defaultDatePickerStrings}/>
     } else {
        input = <TextField id={'optional-' + field.id} name={field.name} disabled={isDisabled} value={values[field.name]} onChange={(event) => handleChange(event)} />
     }

    return(
        <>
            {input}
            {inputHidden}
        </>
    )
}

export default Field