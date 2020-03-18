import { Icon, Popover } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppDrawer } from './AppDrawer'

export const TopBar = props => {

  const [drawer_visible, set_drawer_visible] = useState<boolean>(false)

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', height: 55 }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: 20, height: 20 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 55 }}>

        <Link to="/">
          <img
            src="https://lh3.googleusercontent.com/proxy/uh3qm_FBWVDEM9PNxuERvgOjRjQaAERUQPuhVdM_lMXIlB2pA6_pxP1k7gwoYIcrx0Y0uotq-wpwy4Cte0N7gOaB8qsB9GnPYlg8Sd3unz-qM6LTNbABg5cGkYsczu_s5w"
            style={{
              width: 35,
              borderRadius: 20,
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: 'white'
            }}
          />
        </Link>
      </div>
      <div style={{ display: 'flex' }}>
        <Popover
          placement="bottomRight"
          content={<AppDrawer onClick={() => set_drawer_visible(false)} />}
          visible={drawer_visible}
          trigger="click"
        >
          <Icon
            type="appstore"
            style={{ fontSize: 30, color: '#f8ffd9', marginRight: 10, marginTop: 10 }}
            onClick={() => set_drawer_visible(!drawer_visible)}
          />
        </Popover>
      </div>
    </div>
  )
}