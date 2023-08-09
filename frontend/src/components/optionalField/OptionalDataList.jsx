import React, { useEffect, useState } from "react";

const OptionalDataList = ({task}) => {
    const [fields, setFields] = useState([])

    useEffect(() => {
        if (localStorage.getItem('optionalFields')) {
          const optionalFields = JSON.parse(localStorage.getItem('optionalFields'));
          setFields(optionalFields);
      }
    },[])

    const getValue = (field) => {
        
        return task[field.name];
    }
    return (
        <>
            <div className="card my-2 bg-light">
                <div className="card-body">
                    <div className="row">
                        { fields.map((field) => 
                            <div key={field.id} className="col-4">
                                <p className='mb-0'><span className='fw-bold'>{ getValue(field) ? getValue(field) : '-' }</span></p>
                                <span className='text-muted'>{ field.label }</span>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OptionalDataList;