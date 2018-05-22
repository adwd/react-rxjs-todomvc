import { createSubscription } from 'create-subscription';

import { BehaviorSubject } from 'rxjs';

export const BehaviorSubscription = createSubscription({
  getCurrentValue: (behaviorSubject: BehaviorSubject<any>) =>
    behaviorSubject.getValue(),
  subscribe: (behaviorSubject: BehaviorSubject<any>, callback: () => void) => {
    const subscription = behaviorSubject.subscribe(callback);
    return () => subscription.unsubscribe();
  },
});
