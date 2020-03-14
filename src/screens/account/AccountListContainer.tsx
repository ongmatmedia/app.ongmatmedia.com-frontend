import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { QueryRenderer } from 'react-relay';
import { RelayEnvironment } from '../../graphql/RelayEnvironment';
import { AccountListPresentation } from './AccountListPresentation';
import { ViewAccountModal } from './ViewAccountModal';
import { UpdateAccountModal } from './UpdateAccountModal';

export const AccountListContainer = () => {

  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])

  const [modalViewAccountIsVisible, setModalViewAccountIsVisible] = useState<boolean>(false);

  const [modalUpdateAccountIsVisible, setModalUpdateAccountIsVisible] = useState<boolean>(false)

  const [viewingAccount, setViewingAccount] = useState<string>()

  return (
    <QueryRenderer
      environment={RelayEnvironment}
      query={graphql`
      query AccountListContainerQuery {
        facebook_accounts {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
      variables={{}}
      render={rs => (
        <>
          <ViewAccountModal visible={modalViewAccountIsVisible} onClose={() => setModalViewAccountIsVisible(false)} accountId={viewingAccount} onUpdate={() => setModalUpdateAccountIsVisible(true)} />
          <UpdateAccountModal visible={modalUpdateAccountIsVisible} onClose={() => setModalUpdateAccountIsVisible(false)} accountId={viewingAccount} />
          <AccountListPresentation
            loading={rs.props == null}
            // accounts={rs.props ? (rs.props as any).facebook_accounts.edges.map(el => el.node) : []}
            selectedAccounts={selectedAccounts}
            onSelectAccount={accounts => setSelectedAccounts([...accounts])}
            onOpenViewAccountModal={(id) => {
              setViewingAccount(id)
              setModalViewAccountIsVisible(true)
            }}
            accounts={[
              {
                id: "100005137867313",
                name: "Dang Tien Nguyen"
              },
              {
                id: "100005137867314",
                name: "Dang Tien Nguyen"
              },
              {
                id: "100005137867315",
                name: "Dang Tien Nguyen"
              },
              {
                id: "100005137867316",
                name: "Dang Tien Nguyen"
              },
              {
                id: "100005137867317",
                name: "Dang Tien Nguyen"
              },
              {
                id: "100005137867318",
                name: "Dang Tien Nguyen"
              }
            ]}
          />
        </>
      )}
    />
  )
}
