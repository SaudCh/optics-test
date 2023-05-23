import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const parsedMessage = message.toLowerCase().trim();

    if (
      parsedMessage === "hi" ||
      parsedMessage === "hello" ||
      parsedMessage === "hey"
    ) {
      return actions.handleHello();
    } else {
      return actions.handleDefault();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
