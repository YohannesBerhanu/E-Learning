import { reduxStatus } from "constants/reduxStatus";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Schools from "./Schools";
import {
  Add, AddUniversity, selectAddStatus, selectFetchStatus, selectUniversities,
  EditUniversity, Edit, selectEditStatus, RemoveUniversity, Remove, selectDeleteStatus
} from "../../../../store/States/Universities"

const Loader = ({
  fetchStatus,
  addStatus,
  students,
  universities,
  addUniversity,
  editStatus,
  editUniversity,
  removeUniversity,
  deleteStatus
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setData(students);
  }, [students, setData]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Students");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock, fetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added University");
      setAddLock(true);
    }
  }, [addStatus, setAddLock, addLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited University");
      setEditLock(true);
    }
  }, [editStatus, setEditLock, editLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted University");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock, deleteLock]);

  const _addUniversity = ({ name, description }) => {
    setAddLock(false);
    addUniversity(name, description);
  };

  const _editUniversity = ({ id, name, description }) => {
    setEditLock(false);
    editUniversity(id, name, description);
  };

  const _removeUniversity = (id) => {
    setEditLock(false);
    removeUniversity(id);
  };

  return (
    <Schools
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      addUniversity={_addUniversity}
      editUniversity={_editUniversity}
      removeUniversity={_removeUniversity}
      universities={universities}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  universities: selectUniversities(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  addUniversity: (name, description) => dispatch(Add(AddUniversity(name, description))),
  editUniversity: (id, name, description) => dispatch(Edit(EditUniversity(id, name, description))),
  removeUniversity: (id) => dispatch(Remove(RemoveUniversity(id))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
