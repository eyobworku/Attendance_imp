import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridDeleteForeverIcon } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import Form from "../components/Form";
import Button from "../components/Button";
import Popup from "../components/Popup";
import "../css/User.css";

export const User = () => {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);
  const {
    users,
    user,
    DUError,
    DULoading,
    CUError,
    CULoading,
    CUSuccess,
    UUError,
    UULoading,
    UUSuccess,
  } = usersState;
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [deleteRow, setDeleteRow] = useState("");
  const [uuid, setUuid] = useState("");

  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);

  useEffect(() => {
    if (DULoading || CULoading || UULoading) return;
    if (CUSuccess || UUSuccess) {
      setOpenPopup2(false);
      setOpenPopup(false);
    }
    dispatch(getUsers());
  }, [
    user,
    users,
    DULoading,
    DUError,
    CULoading,
    CUSuccess,
    UUSuccess,
    UULoading,
  ]);
  // useEffect(() => {
  //   console.log(usersState);
  // }, [usersState]);
  const handleDelete = (id) => {
    // if (window.confirm("Are you sure?"))
    setDeleteRow(id);
    dispatch(deleteUser(id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(uuid, {
        user_id: userId,
        name: fullName,
        username: userName,
        role: userRole,
      })
    );
  };
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createUser({
        user_id: userId,
        name: fullName,
        username: userName,
        role: userRole,
      })
    );
    setUserId("");
    setFullName("");
    setUserName("");
  };
  const handleEdit = (fullName, userName, role, user_id, uuid) => {
    setOpenPopup(true);
    setFullName(fullName);
    setUserName(userName);
    setUserRole(role);
    setUserId(user_id);
    setUuid(uuid);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "username",
      headerName: "User Name",
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
    },

    {
      field: "passwordChange",
      headerName: "Password Change",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() =>
                handleEdit(
                  params.row.name,
                  params.row.username,
                  params.row.role,
                  params.row.user_id,
                  params.row.id
                )
              }
              className="detailOrder"
            >
              Edit
            </button>

            <>
              <GridDeleteForeverIcon
                style={{ fontSize: "30px" }}
                onClick={() => handleDelete(params.row.id)}
                className="delete"
              />
              {DULoading && deleteRow === params.row.id && (
                <CircularProgress size={10} color="inherit" />
              )}
            </>
          </>
        );
      },
    },
  ];
  let rows;
  if (users) {
    const userResult = (data) => {
      if (data instanceof Array) {
        return data;
      }
      return [data];
    };

    rows = userResult(users).map((user) => {
      return {
        id: user._id,
        user_id: user.user_id,
        name: user.name,
        username: user.username,
        role: user.role,
        passwordChange: user.passwordChange,
      };
    });
  } else {
    rows = [];
  }
  return (
    <>
      <div className="home-container">
        {/* <Header /> */}
        <Button onClick={() => setOpenPopup2(true)}>Create</Button>
        <DataGrid
          className="users_table"
          rows={rows}
          columns={columns}
          rowHeight={50}
          disableSelectionOnClick
          hideFooter
        />
        <Popup open={openPopup} close={() => setOpenPopup(false)}>
          <h2 className="heading-secondary">Edit Users</h2>
          <div className="admins__form">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label controlId="user-id">User ID</Form.Label>
                <Form.Control
                  controlId="user-id"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label controlId="f-name">Full Name</Form.Label>
                <Form.Control
                  controlId="f-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label controlId="user-name">User Name</Form.Label>
                <Form.Control
                  controlId="user-name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Radio
                checked={userRole === "user"}
                controlId="user"
                value="user"
                name="roleType"
                label="User"
                onChange={(e) => setUserRole(e.target.value)}
                required
              />
              <Form.Radio
                checked={userRole === "admin"}
                controlId="adimin"
                value="admin"
                name="roleType"
                label="Admin"
                onChange={(e) => setUserRole(e.target.value)}
                required
              />
              <Button disabled={UULoading} type="submit">
                {UULoading ? "Updating" : "Update"}
              </Button>
            </Form>
          </div>
        </Popup>
        <Popup open={openPopup2} close={() => setOpenPopup2(false)}>
          <h2 className="heading-secondary">Add User</h2>
          <div className="admins__form">
            <Form onSubmit={handleCreate}>
              <Form.Group>
                <Form.Label controlId="user-id">User ID</Form.Label>
                <Form.Control
                  controlId="user-id"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label controlId="f-name">Full Name</Form.Label>
                <Form.Control
                  controlId="f-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label controlId="user-name">User Name</Form.Label>
                <Form.Control
                  controlId="user-name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Radio
                defaultChecked
                controlId="user"
                value="user"
                name="roleType"
                label="User"
                onChange={(e) => setUserRole(e.target.value)}
                required
              />
              <Form.Radio
                controlId="adimin"
                value="admin"
                name="roleType"
                label="Admin"
                onChange={(e) => setUserRole(e.target.value)}
                required
              />
              <Button disabled={CULoading} type="submit">
                {CULoading ? "Creating" : "Create"}
              </Button>
            </Form>
          </div>
        </Popup>
      </div>
    </>
  );
};
