declare module '4-abstraction' {
  type Behaviour = Record<string, (...args: any[]) => void>;

  class Strategy {
    constructor(strategyName: string, actions: string[]);

    registerBehaviour(implementationName: string, behaviour: Behaviour): void;

    getBehaviour(implementationName: string, actionName: string): (...args: any[]) => void;
  }

  export { Strategy, Behaviour };
}
