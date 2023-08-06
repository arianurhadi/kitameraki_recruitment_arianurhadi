import React, { Component, createRef } from 'react'
import TaskService from '../services/TaskService';
import Editable from "./Editable";
import { TextField } from '@fluentui/react/lib/TextField';

class TaskList extends Component {
    constructor(props) {
        super(props)

        this.state = {
                tasks: [],
                page: 1,
                isLoading: false, 
                isMore: true,
        }

        this.inputRef = createRef();

        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || this.state.isLoading) {
          return;
        }
        this.fetchData();
    };

    fetchData() {
        this.state.isLoading = true;
        setTimeout(() => {
            this.setState({ tasks: [{id:'1', title:'Task A', description:'Task AA'}, {id:'2', title:'Task B', description:'Task BB'}]});
        }
        ,5000);
        this.state.isLoading = false;
        this.state.isMore = false;
    }

    deleteTask(id) {
        // TaskService.deleteTask(id).then( res => {
        //     this.setState({tasks: this.state.tasks.filter(task => task.id !== id)});
        // });

        this.setState({tasks: this.state.tasks.filter(task => task.id !== id)});
    }
   
    updateTask(id, item) {
        // this.setState({tasks: this.state.tasks.filter(task => task.id !== id)});
        var index = this.state.tasks.findIndex(task=> task.id === id);
        if (index === -1)
            console.log('NOT FOUND')
        else
            this.setState({
            tasks: [
                ...this.state.tasks.slice(0,index),
                Object.assign({}, this.state.tasks[index], item),
                ...this.state.tasks.slice(index+1)
            ]
        });
    }

    componentDidMount() {
        // TaskService.getTasks().then((res) => {
        //     this.setState({ tasks: res.data});
        // });
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isLoading) {
            window.addEventListener('scroll', this.handleScroll);
            return () => window.removeEventListener('scroll', this.handleScroll);
        }
    }

    render() {
        return (
            <>
                 <h2 className="text-center">Task List</h2>
                 <br></br>
                 <div className="row">
                    <div className="col-md-8 mx-auto">
                        {
                            this.state.tasks.map(
                                task => 
                                <div className="card mb-3" key = {task.id}>
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-3">
                                                <Editable
                                                    text={task.title}
                                                    placeholder="write a task title"
                                                    childRef={this.inputRef}
                                                    type="input"
                                                    className="h6"
                                                    >
                                                    <TextField
                                                        ref={this.inputRef}
                                                        type="text"
                                                        name="title"
                                                        placeholder="write a task title"
                                                        value={task.title}
                                                        onChange={e => this.updateTask(task.id, { title: e.target.value })}
                                                    />
                                                </Editable>
                                                <p className='text-muted mb-0'>Title</p>
                                            </div>
                                            <div className="col-md-6">
                                            <Editable
                                                    text={task.description}
                                                    placeholder="write a task title"
                                                    childRef={this.inputRef}
                                                    type="textarea"
                                                    className="h6"
                                                    >
                                                    <TextField
                                                        multiline
                                                        ref={this.inputRef}
                                                        name="description"
                                                        placeholder="write a task title"
                                                        value={task.description}
                                                        onChange={e => this.updateTask(task.id, { description: e.target.value })}
                                                    />
                                                </Editable>
                                                <p className='text-muted mb-0'>Description</p>
                                            </div>
                                            <div className="col-md-3">
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTask(task.id)} className="btn btn-danger">Delete </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {this.state.isLoading ?  <div className="text-center">loading data ...</div> : "" }
                        {!this.state.isMore ? <div className="text-center">no data anymore ...</div> : "" }
                    </div>
                 </div>

            </>
        )
    }
}

export default TaskList