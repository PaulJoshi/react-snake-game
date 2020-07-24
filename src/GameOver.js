import React from 'react';

export default (props) => {
    if (props.status) {
        return (
            <div>
            </div>
        )
    }
    return (
        <div>
            <h4>Game Over!</h4>
            <p>Your score was {props.snakeLength}</p>
        </div>
    )
}