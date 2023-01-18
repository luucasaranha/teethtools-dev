import {animate, state, style, transition, trigger} from '@angular/animations';

export const hideAnimation =
  trigger('hideAnimation', [
    state('opened', style({ transform: 'translateX(0%)' })),
    state('closed', style({ transform: 'translateX(-100%)' })),
    transition('* => *', [
      animate(500)
    ])
  ]);

export const menuAnimation =
  trigger('menuAnimation', [
    state('opened', style({ opacity: 1 })),
    state('closed', style({ opacity: 0, width: '0px', display: 'none' })),
    transition('* => *', [
      animate(200)
    ])
  ]);
