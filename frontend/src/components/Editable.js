import React, { useState, useEffect } from "react";

const Editable = ({ childRef, text, type, placeholder, children, onUpdate, ...props }) => {

    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
      if (childRef && childRef.current && isEditing === true) {
        childRef.current.focus();
      }
    }, [isEditing, childRef]);

    const handleKeyDown = (event, type) => {
      const { key } = event;
      const keys = ["Escape", "Tab"];
      const enterKey = "Enter";
      const allKeys = [...keys, enterKey];

      if (
        (type === "textarea" && keys.indexOf(key) > -1) ||
        (type !== "textarea" && allKeys.indexOf(key) > -1)
      ) {
        setEditing(false);
        onUpdate()
      }
    };

    const handleBlur = () => {
      setEditing(false)
      onUpdate()
    }

    return (
      <section {...props}>
        {isEditing ? (
          <div
            onBlur={handleBlur}
            onKeyDown={e => handleKeyDown(e, type)}
          >
            {children}
          </div>
        ) : (
          <div
            onClick={() => setEditing(true)}
          >
            <span>
              {text || placeholder || "Editable content"}
            </span>
          </div>
        )}
      </section>
    );
};

export default Editable;