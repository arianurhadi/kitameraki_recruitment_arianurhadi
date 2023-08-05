import React, { Component } from 'react'
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';

class TaskCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
        }
    }

    storeTask = (e) => {
        e.preventDefault();
        let task = {title: this.state.title, description: this.state.description};
        console.log('employee => ' + JSON.stringify(task));

        // TaskService.createTask(task).then(res =>{
        //     this.props.history.push('/tasks');
        // });
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    render() {
        return (
            <>
                <form>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <Label>Title <span className="text-primary">*</span></Label>
                                <TextField value={this.state.title} onChange={this.changeTitleHandler} placeholder="please input title here..." />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <Label>Description</Label>
                                <TextField multiline value={this.state.description} onChange={this.changeDescriptionHandler} placeholder="please input description here..." />
                            </div>
                        </div>
                        <div className="col-md-12 d-flex">
                            <PrimaryButton text="Add Task" className='mt-3 ms-auto' onClick={this.storeTask} />
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default TaskCreate
