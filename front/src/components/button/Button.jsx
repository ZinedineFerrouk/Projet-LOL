import React from "react";
import './Button.scss';

/**
 * HOW TO USE ---
 * 
 * <Button color="primary" iconOnly>Hello</Button>
 * 
 * OPTIONS ---
 * 
 * color: (primary, secondary, info, success, error)
 *      type: string
 *      require: yes
 * iconOnly: (true, false)
 *      type: boolean
 *      require: no
 */
const Button = (props) => {
    let classes = "btn"

    switch(props.color) {
        case 'primary':
            classes += ' btn-primary';
            break;
        case 'secondary':
            classes += ' btn-secondary';
            break;
        case 'info':
            classes += ' btn-info';
            break;
        case 'success':
            classes += ' btn-success';
            break;
        case 'error':
            classes += ' btn-error';
            break;
    }

    return <>
        {
            props.iconOnly ?
                <button 
                    id={ props.id && props.id } 
                    className="btn btn-icon-only" 
                    onClick={ props.onClick && props.onClick }
                    title={ props.title && props.title }
                >{ props.children }</button>
            :
                <button 
                    id={ props.id && props.id } 
                    className={ classes } 
                    onClick={ props.onClick && props.onClick }
                    title={ props.title && props.title }
                >{ props.children }</button>
        }
    </>;
};

export default Button;
