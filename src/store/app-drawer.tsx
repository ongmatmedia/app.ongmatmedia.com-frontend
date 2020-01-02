import React from 'react';
import { observable } from 'mobx';
import { observer, IReactComponent } from 'mobx-react';

export class AppDrawerState {
  @observable is_mobile: boolean = window.innerWidth < 992;
  @observable is_open_drawer: boolean = false;

  toggle(open: boolean = !this.is_open_drawer) {
    this.is_open_drawer = open;
  }

  constructor() {
    window.addEventListener('resize', () => {
      this.is_mobile = window.innerWidth < 992;
    });
  }
}

export const app_drawer_state = new AppDrawerState();

export const withAppDrawerState = <T extends {}>(
  target: IReactComponent<T & { store: AppDrawerState }>,
) => {
  const C = observer(target);
  return (props: T) => <C {...props} store={app_drawer_state} />;
};
