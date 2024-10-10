import React from 'react';

export interface TestComponentProps {
    name?: string,
    age?: number
}

const TestComponent = ({ name, age }: TestComponentProps) => {
    return (
        <div>
            userInfor
            <div>{name}</div>
            <div>{age}</div>
        </div>
    )
}

export default TestComponent;