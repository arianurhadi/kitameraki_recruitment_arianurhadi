import React, { useEffect, useState } from "react";

import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { NavLink } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import FieldList from "./FieldList";
import ComponentList from "./ComponentList";
import Component from "./Component";
import toast, { Toaster } from "react-hot-toast";

// default component list
const components = [
    {
        id: 'numberField',
        icon: 'NumberField',
        name: 'Number',
    },{
        id: 'dateField',
        icon: 'DateTime',
        name: 'Date Time',
    },
    {
        id: 'textField',
        icon: 'TextField',
        name: 'Text Field',
    }
]

// helper to create new id for new optional field
const getNewId = (array) => {
    if (array.length > 0) {
        let max = 0;
        array.forEach(item => {
            if (parseInt(item.id) > max) {
                max = parseInt(item.id);
            }
        })
        return (max + 1).toString();
    } else {
        return "1"
    }
}

// get type of optional field
const getType = (id) => {
    switch (id) {
        case 0:
            return 'number';
        case 1:
            return 'date';
        default:
            return 'text';
    }
}

// styling item component draggable
const getItemStyle = (isDragging, draggableStyle) => ({

    // change background colour if dragging
    background: isDragging ? "lightgray" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
});

// create a list of default components
const getDefaultData = (index, list) => {
    let id = getNewId(list);
    let type = getType(index);
    
    return {id, type};
}

// helper to reorder a list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// for the render draggable component
const getRenderItem = (items) => (provided, snapshot, rubric) => {
    const item = items[rubric.source.index];
    return (
      <React.Fragment>
        <div className="col-6"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          <Component item={item} style={getItemStyle(
                                            snapshot.isDragging,
                                        )}/>
        </div>
      </React.Fragment>
    );
  };

const FormBuilder = () => {

    const [fields, setFields] = useState([]);
    const [fieldActive, setFieldActive] = useState({});

    const onChangeEdit = (event, id) => {
        let name = event.target.name;
        let value = event.target.value;

        //return when there is no active field
        if (!id) {
            return
        }

        let field = fields.find((field) => field.id === id);
        let index = fields.findIndex((field) => field.id === id);

        // create updated field
        let newField = {...field, [name] : value}
        // update the field active
        setFieldActive(newField);

        // update the optional field list
        const array = Array.from(fields);
        array.splice(index, 1, newField);

        setFields(array);
    }

    function onDragEnd(result) {
        const { source, destination } = result;

        //return when there is no destination drop
        if (!destination) {
          return;
        }
        const sInd = source.droppableId;
        const dInd = destination.droppableId;

        // add new field to optionalfield list
        if (sInd === 'components' && dInd === 'optionalFields') {
            const data = getDefaultData(source.index, fields);

            const array = Array.from(fields);
            array.splice(destination.index,0,data);

            setFields(array);
        }

        // reorder the optional field list
        if (sInd === 'optionalFields' && dInd === 'optionalFields') {
            const newFields = reorder(fields, source.index, destination.index);
            setFields(newFields);
        }

         // delete field from the list
        if (sInd === 'optionalFields' && dInd === 'components') {
            const array = Array.from(fields);
            array.splice(source.index,1);

            setFields(array);
        } 

        toast.success('Optional Field Updated!')
       
      }

      // first load to get data from the localstorage
      useEffect(() => {
          if (localStorage.getItem('optionalFields')) {
            const optionalFields = JSON.parse(localStorage.getItem('optionalFields'));
            setFields(optionalFields);
        }
      },[])
    
      // save to local storage when fields changes
      useEffect(() => {
        localStorage.setItem('optionalFields', JSON.stringify(fields));
      },[fields])

      // get id field when it's actived
      const onFieldActived = (id) => {
        let field = fields.find((field) => field.id === id);
        setFieldActive(field);
      }

      // delete optional field from the list
      const onFieldDeleted = (id) => {
        let index = fields.findIndex((field) => field.id === id);
        const array = Array.from(fields);
        array.splice(index,1);

        setFields(array);
        toast.success('Optional Field Successfully deleted!')
      }

    return(
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                />
            <DragDropContext onDragEnd={onDragEnd}>
                    <div className="row min-vh-100">
                        <div className="col-md-2 p-2 bg-light">
                            <NavLink className='btn btn-dark w-100' to='/'>Back to home</NavLink>
                            <hr />
                            <h6>Components</h6>
                            <Droppable key='components' droppableId="components" renderClone={getRenderItem(components)} isDropDisabled={true}>
                            {(provided, snapshot) => (
                            <div className="row g-1"{...provided.droppableProps} ref={provided.innerRef}>
                                <ComponentList components={components} snapshot={snapshot} />
                            </div>
                            )}
                            </Droppable>
                        </div>
                        <div className="col-md-7 p-5">
                            <h3>Form Setting</h3>
                            <h5 className="mt-5">Default Fields</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Label>Title</Label>
                                        <TextField disabled name='title' readOnly/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Label>Description</Label>
                                        <TextField disabled multiline name='description' readOnly />
                                    </div>
                                </div>
                            </div>
                            <h5 className="mt-5">Optional Fields</h5>
                            <Droppable key='optionalFields' droppableId="optionalFields">
                                {(provided, snapshot) => (
                                    <div className="row" {...provided.droppableProps} ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? 'lightslategrey' : '' }}>
                                        <FieldList fields={fields} onFieldActived={onFieldActived} onFieldDeleted={onFieldDeleted}/>
                                        {provided.placeholder}
                                    </div>
                             )}
                             </Droppable>
                        </div>
                        <div className="col-md-3 p-2 bg-light">
                            <div className="p-1">
                                <h6 className="mb-0">Name Component</h6>
                                <p className="mb-0">Type Component</p>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Label>Field Label</Label>
                                        <TextField name='label' value={fieldActive.label} onChange={(e) => onChangeEdit(e, fieldActive.id)}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Label>Field Name</Label>
                                        <TextField name='name' value={fieldActive.name} onChange={(e) => onChangeEdit(e, fieldActive.id)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </DragDropContext>
        </div>
    )
}


export default FormBuilder;