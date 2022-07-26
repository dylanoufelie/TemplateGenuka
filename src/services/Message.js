import React from "react";

const Message = (props) => {
    const { message, error, setCompMess } = props;

    setTimeout(() => {
        setCompMess(null);
    }, 5000)

    return (
        <div className={error ? 'infoMessage-error' : 'infoMessage-success'}>
            <p>{message}</p>
        </div>
    )
}

export default Message;