'use strict';

const assert = require('node:assert');
const { describe, test } = require('node:test');
const { Strategy } = require('./4-abstraction');

describe('4-abstraction module tests', () => {
  test('should create a strategy with valid actions', () => {
    const strategy = new Strategy('TestStrategy', ['action1', 'action2']);
    assert.strictEqual(typeof strategy, 'object');
  });

  test('should register valid behavior and retrieve it successfully', () => {
    const strategy = new Strategy('TestStrategy', ['action1', 'action2']);
    const implementation = {
      action1: () => 'Action 1 executed',
      action2: (arg) => `Action 2 executed with ${arg}`,
    };

    strategy.registerBehaviour('TestImplementation', implementation);
    const action1 = strategy.getBehaviour('TestImplementation', 'action1');
    const action2 = strategy.getBehaviour('TestImplementation', 'action2');

    assert.strictEqual(action1(), 'Action 1 executed');
    assert.strictEqual(action2('data'), 'Action 2 executed with data');
  });

  test('should throw error when registering behavior with invalid actions',
    () => {
    const strategy = new Strategy('TestStrategy', ['action1', 'action2']);
    const invalidBehavior = {
      action1: () => 'Valid action',
      invalidAction: () => 'Invalid action',
    };

    assert.throws(
      () => strategy.registerBehaviour(
        'InvalidImplementation', invalidBehavior,
      ),
      /Action does not exist in strategy TestStrategy/,
    );
  });

  test('should throw error when retrieving unregistered behavior', () => {
    const strategy = new Strategy('TestStrategy', ['action1', 'action2']);

    assert.throws(
      () => strategy.getBehaviour('NonExistentImplementation', 'action1'),
      /Strategy TestStrategy does not have implementation NonExistentImplementation/
    );
  });

  test(
    'should throw error when retrieving nonexistent action from a registered implementation',
    () => {
    const strategy = new Strategy('TestStrategy', ['action1', 'action2']);
    const implementation = { action1: () => 'Action 1 executed' };

    strategy.registerBehaviour('TestImplementation', implementation);

    assert.throws(
      () => strategy.getBehaviour('TestImplementation', 'nonExistentAction'),
      /Action does not exist in implementation TestImplementation/,
    );
  });
});
