import React, { useRef, useState, useEffect } from 'react'
import TaskService from '../../services/TaskService';
import Editable from "../../components/Editable";
import { TextField } from '@fluentui/react/lib/TextField';
import Layout from '../../layouts/Layout';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../../components/Spinner';

function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isMore, setIsMore] = useState(true);

    const inputTitle = useRef();
    const inputDescription = useRef();

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !isMore) {
          return;
        }
        fetchData();
    };

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const res = await TaskService.getTasks({page: page});
            
            setTimeout(() => {
                if (res.data !== null && res.data.length > 0) {

                    // check for not return duplicate data
                    const newData = res.data.map(task => {
                        if (!tasks.includes(task)) {
                            return task;
                        }
                        return null
                    });
    
                    // set is more false when return no data
                    if (!newData.length > 0) {
                        setIsMore(false)
                    }
    
                    // add number for next page if is more still true
                    if (isMore) {
                        setPage(page+1)
                    }
                    
                    // set the list of task 
                    setTasks([...tasks, ...newData]);
    
                    setIsLoading(false)
    
                } else {
                    toast('No Data Found')
                    setIsLoading(false)
                    setIsMore(false)
                }
            }, 1000)
        } catch (error) {
            console.log(error)
            toast.error(error.message + ' Please refresh the page!')
            setIsLoading(false)
            setIsMore(false)
        }
    }

    const deleteTask = (id) => {
        TaskService.deleteTask(id).then( res => {
            setTasks(tasks.filter(task => task.id !== id));
            toast.success('Task has been deleted!')
        }).catch(error => {
            console.error('There was an error!', error.message);
        });
    }
   
    const editTask = (id, item) => {
        
        var index = tasks.findIndex(task=> task.id === id); //get index task from the list of tasks
                
        if (index === -1) {
            console.log('NOT FOUND')
        }
        else {
            //change value of a task
            setTasks([
                ...tasks.slice(0,index),
                Object.assign({}, tasks[index], item),
                ...tasks.slice(index+1)
            ]);
        }

    }

    const updateTask = (id, item) => {

        // find index in array list of task
        var index = tasks.findIndex(task=> task.id === id);
        const {title, description = ''}  = tasks[index] // get previous title and description
        const task = Object.assign({}, {title, description}, item); // combine a previous data and a new one

        TaskService.updateTask(task, id).then(res => {
            toast.success('Task has been updated!')
        }).catch(error => {
            console.error('There was an error!', error.message);
        });
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    },[isLoading])
    
    return (
        <div>
            <Layout>
            <Toaster
                position="top-center"
                reverseOrder={false}
                />
            <h2 className="text-center">Task List</h2>
            <br></br>
            <div className="row">
            <div className="col-md-8 mx-auto">
                <NavLink className="btn btn-primary mb-4" to='/task/create'>
                    Add Task
                </NavLink>
                {
                    tasks.map(
                        task => 
                        <div className="card mb-3" key = {task.id}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <Editable
                                            text={task.title}
                                            placeholder="write a task title"
                                            childRef={inputTitle}
                                            type="input"
                                            className="h6"
                                            onUpdate={() => updateTask(task.id, { title: inputTitle.current.value })}
                                            >
                                            <TextField
                                                ref={inputTitle}
                                                type="text"
                                                name="title"
                                                placeholder="write a task title"
                                                value={task.title}
                                                onChange={e => editTask(task.id, { title: e.target.value })}
                                            />
                                        </Editable>
                                        <p className='text-muted mb-0'>Title</p>
                                    </div>
                                    <div className="col-md-6">
                                    <Editable
                                            text={task.description}
                                            placeholder="write a task title"
                                            childRef={inputDescription}
                                            type="textarea"
                                            className="h6"
                                            onUpdate={() => updateTask(task.id, { description: inputDescription.current.value })}
                                            >
                                            <TextField
                                                multiline
                                                ref={inputDescription}
                                                name="description"
                                                placeholder="write a task title"
                                                value={task.description}
                                                onChange={e => editTask(task.id, { description: e.target.value })}
                                            />
                                        </Editable>
                                        <p className='text-muted mb-0'>Description</p>
                                    </div>
                                    <div className="col-md-3">
                                        <button style={{marginLeft: "10px"}} onClick={ () => deleteTask(task.id)} className="btn btn-danger">Delete </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* {isLoading ?  <div className="text-center">loading data ...</div> : "" } */}
                <div className='d-flex justify-content-center'>
                    <Spinner isLoading={isLoading} />
                </div>
                {!isMore ? <div className="text-center text-muted">-no more data-</div> : "" }
            </div>
            </div>
        </Layout>
        </div>
    )
}

export default TaskList