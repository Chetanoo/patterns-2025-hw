'use strict';

class Strategy {
  #implementations = new Map();
  #strategyName;
  #actions;

  constructor(strategyName, actions) {
    this.#strategyName = strategyName;
    this.#actions = actions;
  }

  registerBehaviour(implementationName, behaviour) {
    const requiredActions = this.#actions
      .filter((action) => !behaviour[action]);

    if (requiredActions.length) {
      throw new Error(
        `Action ${requiredActions.join(', ')} is required in strategy ${this.#strategyName}`,
      );
    }

    this.#implementations.set(implementationName, behaviour);
  }

  getBehaviour(implementationName, actionName) {
    const implementation = this.#implementations.get(implementationName);

    if (!implementation) {
      throw new Error(
        `Strategy ${this.#strategyName} does not have implementation ${implementationName}`,
      );
    }

    return implementation[actionName];
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
