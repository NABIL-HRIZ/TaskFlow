import React from 'react'
import UserSidebar from './UserSidebar'

const UserLayout = ({ children }) => {
  return (
    <div className="admin-dashboard-container">
      <UserSidebar />
      <div className="dashboard-main-content">{children}</div>
    </div>
  )
}

export default UserLayout
