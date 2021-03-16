import { ApiRoutes } from '../constants/apiRoutes';

export default (routes: ApiRoutes, apiUrl: string) => {
  type RouteName = keyof ApiRoutes;

  const computedIdRegexp = /:id$/;

  return new Proxy(routes, {
    get: (
      routesConfig: ApiRoutes,
      route: RouteName,
    ): ApiRoutes[RouteName] | (
      (id: string) => string
    ) => {
      let value: string = routesConfig[route] as string;

      if (value) {
        value = `${apiUrl}/${value}`;

        if (value.match(computedIdRegexp)) {
          return (id: string) => {
            if (!id) {
              throw new Error("The computed value shouldn't be empty");
            }

            return value.replace(computedIdRegexp, id);
          };
        }

        return value;
      }

      // TODO: Investigate the cause of this
      // @ts-ignore
      if (route === '$$typeof') {
        return '';
      }

      throw new Error(`Route "${route}" not found!`);
    },
  }) as any;
};
