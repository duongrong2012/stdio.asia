import React from 'react';

const withLogger = (WrappedComponent) => {
  const ComponentWithLogger = (props) => {
    // In ra console tất cả các props
    console.log("Props received:", props);

    return <WrappedComponent {...props} />;
  };

  // Đặt tên hiển thị cho component để dễ debug
  ComponentWithLogger.displayName = `WithLogger(${getDisplayName(WrappedComponent)})`;

  return ComponentWithLogger;
};

// Hàm phụ để lấy tên của component hoặc trả về "Component" nếu không có tên
// function getDisplayName(WrappedComponent) {
//     return WrappedComponent.displayName || WrappedComponent.name || "Component";
// }

export default withLogger;
