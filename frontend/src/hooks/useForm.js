import { useState } from 'react'
import {omit} from 'lodash'
import Toast, { toast } from 'react-hot-toast';

const useForm = (callback) => {

    //Form values
    const [values, setValues] = useState({});
    //Errors
    const [errors, setErrors] = useState({});

    const validate = (event, name, value) => {
        switch (name) {
            case 'title':
                if (!value.trim().length > 0) {
                    setErrors({
                        ...errors,
                        title: 'Title is required!'
                    })
                } else {
                    let newObj = omit(errors, "title");
                    setErrors(newObj);
                }
                break;
    
            default:
                break;
        }
    
    }

    //A method to handle form inputs
    const handleChange = (event) => {
        //To stop default events
        event.persist();
        let name = event.target.name;
        let val = event.target.value;

        validate(event,name,val);
        console.log(errors);

        //Let's set these values in state
        setValues({
            ...values,
            [name]:val,
        })
    }

    //A method to handle form inputs
    const clearForm = () => {
        //Let's set these values in state
        setValues({})
    }


    const handleSubmit = (event) => {

        if(event) event.preventDefault();
    
        if(Object.keys(errors).length === 0 && Object.keys(values).length !==0 ){
            callback();
        }else{
            toast.error('Pelase fill the required field')
        }
    
    }

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        clearForm,
    }
}
export default useForm;