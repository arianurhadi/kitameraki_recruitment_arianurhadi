import React, { useEffect, useState } from "react";
import Field from "../formBuilder/Field";
import { Label } from "@fluentui/react";

const OptionalFieldList = () => {
    const [fields, setFields] = useState([])

    useEffect(() => {
        if (localStorage.getItem('optionalFields')) {
          const optionalFields = JSON.parse(localStorage.getItem('optionalFields'));
          setFields(optionalFields);
      }
    },[])

    return (
        <>
            { fields.map((field) => 
                <div key={field.id} className="col-md-12">
                    <div className="form-group w-100">
                        <Label>{field.label ? field.label : field.type + ' field'}</Label>
                        <Field field={field}/>
                    </div>
                </div>
                )
            }
        </>
    )
}

export default OptionalFieldList;