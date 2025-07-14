'use strict';

const createStrategy = (strategyName, actions) => {
  const implementations = new Map();

  const registerBehaviour = (implementationName, behaviour) => {
    const requiredActions = actions
      .filter((action) => !behaviour[action]);

    if (requiredActions.length) {
      throw new Error(
        `Action ${requiredActions.join(', ')} is required in strategy ${strategyName}`,
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

    return implementation[actionName];
  };

  return { registerBehaviour, getBehaviour };
};

module.exports = {
  createStrategy,
};
