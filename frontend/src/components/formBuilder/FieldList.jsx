import React, { useState } from "react";
import Field from "./Field";
import { Draggable } from "react-beautiful-dnd";
import { Label } from "@fluentui/react";

const getItemStyle = (isDragging, draggableStyle, getItemActive, id) => ({

    // change background colour if dragging
    backgroundColor: isDragging ? "lightgray" : "white",

    border: id === getItemActive ? 'solid 2px blue' : '', 

    // styles we need to apply on draggables
    ...draggableStyle
});

const FieldList = ({ fields, onFieldActived, onFieldDeleted }) => {
    const [itemActive, setItemActive] = useState();

    const onClick = (id) => {
        setItemActive(id);
        onFieldActived(id);
    }

    const onDelete = (id) => {
        onFieldDeleted(id);
    }

    return (
        <>
            { fields.map((field, index) => 
                    <Draggable key={'field-' + field.id} draggableId={'field-' + field.id} index={index}>
                        {(provided, snapshot) => (
                            <div className="col-md-12" onClick={() => onClick(field.id)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                itemActive,
                                field.id,
                              )}>
                                <div className="row align-items-center pb-3">
                                    <div className="col-1">
                                        <i className="bi bi-grip-vertical me-2 text-muted"></i>
                                    </div>
                                    <div className="col-10">
                                        <div className="form-group w-100">
                                            <Label>{field.label ? field.label : field.type + ' field'}</Label>
                                            <Field field={field} isDisabled={true}/>
                                        </div>
                                    </div>
                                    <div className="col-1">
                                        <button onClick={() => onDelete(field.id)} className="btn btn-light mb-0 me-2 my-auto">
                                            <i className="bi bi-trash3 text-danger"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            )
                        }
                    </Draggable>
                )
            }
        </>
    )
}

export default FieldList;