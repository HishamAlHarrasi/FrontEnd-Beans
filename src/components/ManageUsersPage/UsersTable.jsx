import React, { Component } from "react";
import { Link } from "react-router-dom";

class UsersTable extends Component {
  state = {};

  render() {
    const { usersData } = this.props;
    return (
      <div className="user-table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Username</th>
              <th scope="col">Full Name</th>
              <th scope="col">Admin/Standard User</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/admin/manageUsers/${user.id}`,
                        state: {
                          user: user,
                        },
                      }}
                    >
                      {user.username}
                    </Link>
                  </td>
                  <td>{user.firstname + " " + user.lastname}</td>
                  <td>{user.admin ? "Admin" : "Standard User"}</td>
                  <td
                    className={
                      user.user_disabled
                        ? "user-blocked"
                        : "user-active"
                    }
                  >
                    {user.user_disabled ? "Blocked" : "Active"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UsersTable;
