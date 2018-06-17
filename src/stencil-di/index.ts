import InjectorInstance from './injector';
export { InjectorInstance as DefaultInjector };
export { Injector } from './injector';
export { DependencyContainer, DependencyContainerOptions } from './container';
export { Injectable } from './injectable';
export { Inject } from './inject';
export { InjectProp } from './inject-prop';

export {
  InjectDecoratorOptions,
  InjectableDecoratorOptions,
  IContainer,
} from './interfaces';

// BTW, note this when publishing:
// https://github.com/ionic-team/stencil/issues/799
