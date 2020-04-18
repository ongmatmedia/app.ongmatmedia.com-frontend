import React from 'react'
import {ListAppBlock} from '../../components/common/ListAppBlock'

export const Tools = () => (
  <ListAppBlock
    children={[
      {
        icon: 'filter',
        serviceName: 'Filter friend',
        link: '/filter-friends'
      },
      {
        cover: 'https://i2.wp.com/www.visaflux.com/wp-content/uploads/2019/09/Facebook-Pokes.jpg?resize=500%2C304&ssl=1',
        serviceName: 'Poke friend',
        link: '/poke-friends'
      }
    ]}
  />
)