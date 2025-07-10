import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const clone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clone);

  }
  return next(req);
};
