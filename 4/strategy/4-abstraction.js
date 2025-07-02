'use strict';

class Strategy {
  #implementations = new Map();
  #stragetyName;
  #allowedActions;

  constructor(strategyName, actions) {
    this.#stragetyName = strategyName;
    this.#allowedActions = actions;
  }

  registerBehaviour(implementationName, behaviour) {
    const actionNotExist = Object.keys(behaviour)
      .some((action) => !this.#allowedActions.includes(action));

    if (actionNotExist) {
      throw new Error(
        `Action does not exist in strategy ${this.#stragetyName}`,
      );
    }

    this.#implementations.set(implementationName, behaviour);
  }

  getBehaviour(implementationName, actionName) {
    const implementation = this.#implementations.get(implementationName);

    if (!implementation) {
      throw new Error(
        `Strategy ${this.#stragetyName} does not have implementation ${implementationName}`,
      );
    }

    const action = implementation[actionName];

    if (!action) {
      throw new Error(
        `Action does not exist in implementation ${implementationName}`,
      );
    }

    return action;
  }
}

// Usage

const smsAgent = new Strategy('sms', ['notify', 'multicast']);
const emailAgent = new Strategy('email', ['notify', 'multicast']);

smsAgent.registerBehaviour('console', {
  notify: (to, message) => {
    console.log(`Sending "sms" notification to <${to}>`);
    console.log(`message length: ${message.length}`);
  },
  multicast: (message) => {
    console.log(`Sending "sms" notification to all`);
    console.log(`message length: ${message.length}`);
  },
});

emailAgent.registerBehaviour('console', {
  notify: (to, message) => {
    console.log(`Sending "email" notification to <${to}>`);
    console.log(`message length: ${message.length}`);
  },
  multicast: (message) => {
    console.log(`Sending "email" notification to all`);
    console.log(`message length: ${message.length}`);
  },
});

const smsNotification = smsAgent.getBehaviour('console', 'notify');
smsNotification('+380501234567', 'Hello world');

module.exports = {
  Strategy,
};
