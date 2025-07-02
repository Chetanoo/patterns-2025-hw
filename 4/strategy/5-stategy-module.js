'use strict';

const createStrategy = (strategyName, actions) => {
  const implementations = new Map();

  const registerBehaviour = (implementationName, behaviour) => {
    const actionNotExist = Object.keys(behaviour)
      .some((action) => !actions.includes(action));

    if (actionNotExist) {
      throw new Error(
        `Action does not exist in strategy ${stragetyName}`,
      );
    }

    implementations.set(implementationName, behaviour);
  };

  const getBehaviour = (implementationName, actionName) => {
    const implementation = implementations.get(implementationName);

    if (!implementation) {
      throw new Error(
        `Strategy ${stragetyName} does not have implementation ${implementationName}`,
      );
    }

    const action = implementation[actionName];

    if (!action) {
      throw new Error(
        `Action does not exist in implementation ${implementationName}`,
      );
    }

    return action;
  };

  return { registerBehaviour, getBehaviour };
};

// Usage

// const strategy = createStrategy('sms', ['notify', 'multicast']);
//
// strategy.registerBehaviour('console', {
//   notify: (to, message) => {
//     console.log(`Sending "sms" notification to <${to}>`);
//     console.log(`message length: ${message.length}`);
//   },
//   multicast: (message) => {
//     console.log(`Sending "sms" notification to all`);
//     console.log(`message length: ${message.length}`);
//   },
// });
//
// strategy.getBehaviour('console', 'call')('+380501234567', 'Hello world');
//
// strategy.getBehaviour('console', 'notify')('+380501234567', 'Hello world');
// will throw error

module.exports = {
  createStrategy,
};
