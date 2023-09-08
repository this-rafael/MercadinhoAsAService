/**
 * @module Catch
 * @description Catch errors and handle them with a callback
 * [key: string]: (e: any) => any; where key is the name of the error and the value is the callback
 */
export type CatcherMatchers = {
  [key: string]: (e: any) => any;
};

/**
 * @class Catch
 * @description Catch errors and handle them with a callback
 */
export class Catch {
  private defaultCallback: (e: any) => any | void = (e: any) => {
    throw e;
  };

  constructor(private readonly matchers: CatcherMatchers) {}

  static on(matchers: CatcherMatchers) {
    return new Catch(matchers);
  }

  asDefault(callback: (e: any) => any) {
    this.defaultCallback = callback;
    return this;
  }

  catch(e: any) {
    const callback = this.matchers[e.constructor.name] || this.defaultCallback;
    return callback(e);
  }
}
