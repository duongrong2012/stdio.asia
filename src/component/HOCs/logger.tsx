import React from 'react'
import { TestComponentProps } from '../TestComponent';


const logger = (WrapperComponent: React.ComponentType<TestComponentProps>) => {
  const ComponentWithLogger = (props: TestComponentProps) => {
    // In ra console tất cả các props
    console.log("Props received:", props);

    return <WrapperComponent {...props} />
  };

  return ComponentWithLogger;
}

export default logger