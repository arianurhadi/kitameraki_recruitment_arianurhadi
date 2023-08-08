import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import TaskService from '../../services/TaskService';
import useForm from '../../hooks/useForm';
import toast, { Toaster } from 'react-hot-toast';
import Layout from '../../layouts/Layout';
import Spinner from '../../components/Spinner';

function TaskCreate() {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const submitForm = () => {
        setIsLoading(true)
        
        //define a new task
        const task = values;
        TaskService.createTask(task).then(res =>{
            toast.success("A new Task has been created!")
            
            setTimeout(()=>{
                setIsLoading(false)
                navigate('/task');
            },100)
           
        }).catch(error => {
            toast.error('There was an error!', error);
            setIsLoading(false)
        });
    }
    
    //set for validate form
    const { handleChange, values, errors, handleSubmit } = useForm(submitForm);

    return (
        <Layout>
            <Toaster
                position="top-center"
                reverseOrder={false}
                />
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h4 className='text-center mb-4'>Create Task</h4>
                    <NavLink className='btn btn-warning mb-3' to='/task'>Back</NavLink>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12 mx-auto">
                                <div className="form-group">
                                    <Label>Title <span className="text-primary">*</span></Label>
                                    <TextField name='title' value={values.title} onChange={handleChange} placeholder="please input title here..." errorMessage={errors.title} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <Label>Description</Label>
                                    <TextField multiline name='description' value={values.description} onChange={handleChange} placeholder="please input description here..." />
                                    {
                                        errors.description && <h3>{errors.description}</h3>
                                    }
                                </div>
                            </div>
                            <div className="col-md-12 d-flex">
                                <div className='mt-3 ms-auto'>
                                    { isLoading ? <Spinner isLoading={isLoading} /> : <PrimaryButton text="Add Task" type='submit'/>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default TaskCreate
