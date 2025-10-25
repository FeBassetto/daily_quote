interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining(): number;
}

type IdleCallbackHandle = number;

declare function requestIdleCallback(
  callback: (deadline: IdleDeadline) => void,
  options?: { timeout?: number },
): IdleCallbackHandle;

declare function cancelIdleCallback(handle: IdleCallbackHandle): void;
