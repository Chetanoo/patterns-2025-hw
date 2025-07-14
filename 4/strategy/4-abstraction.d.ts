declare module '4-abstraction' {
  type Behaviour<TArgs> = Record<string, (...args: TArgs) => void>;

  class Strategy {
    constructor(strategyName: string, actions: string[]);

    registerBehaviour(implementationName: string, behaviour: Behaviour): void;

    getBehaviour(implementationName: string, actionName: string): (...args: any[]) => Behaviour;
  }

  export { Strategy, Behaviour };
}
