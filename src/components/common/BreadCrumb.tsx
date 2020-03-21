import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import React from 'react';
import { Breadcrumb } from 'antd';

export const BreadCrumb = ((withRouter as any)((props: RouteComponentProps & { routes: Array<{ path: string, breadcrumbName: string }> }) => (
  <Breadcrumb
    itemRender={
      (route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
          <span>{route.breadcrumbName}</span>
        ) : (
            <span onClick={() => props.history.push(`${route.path}`)}>{route.breadcrumbName}</span>
          );
      }
    }
    routes={props.routes}
    separator=">" />
)))
