import React from "react";
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import '../../assets/css/custom.css';

const iconClass = mergeStyles({
    fontSize: 24,
    height: 24,
    width: 24,
    margin: '0 25px',
  });

initializeIcons();


const Component = ({item, ...props}) => {
    return(
        <>
            <div className="card" {...props}>
                <div className="card-body d-flex flex-column align-items-center">
                    <div><Icon iconName={item.icon} className={iconClass}/></div>
                    <p className="mb-0 text-sm">{item.name}</p>
                </div>
            </div>
        </>
    )
}

export default Component