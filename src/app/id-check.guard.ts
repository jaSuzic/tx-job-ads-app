import { CanActivateFn, Router } from '@angular/router';

export const idCheckGuard: CanActivateFn = (route, state) => {
    if (route.params && route.params['id']) {
        return true;
    } else {
        return false;
    }
};
