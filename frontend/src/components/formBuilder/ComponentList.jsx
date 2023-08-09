import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Component from "./Component";

const getItemStyle = (isDragging, draggableStyle) => ({

    // change background colour if dragging
    background: isDragging ? "lightgray" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
});

const ComponentList = ({ components, snapshot }) => {

    return (
        <>
            {components.map((item, index) => {
                
                const shouldRenderClone = item.id === snapshot.draggingFromThisWith;
                return (
                        shouldRenderClone ? (<div className="col-6"><Component item={item}/></div>) : (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                                <div className="col-6" key={item.id}>
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                        )}>
                                        <Component item={item}/>
                                    </div>
                                </div>
                                )}
                            </Draggable>
                        )
                )
                }
            )}
        </>
    )
}

export default ComponentList;