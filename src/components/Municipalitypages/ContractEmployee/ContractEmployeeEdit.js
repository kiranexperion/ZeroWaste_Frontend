import React from "react";

const ContractEmployeeEdit = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
       <td>{editFormData.a}</td>
       <td>{editFormData.b}</td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter email"
          name="c"
          value={editFormData.c}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter phoneno"
          name="d"
          value={editFormData.d}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Address"
          name="e"
          value={editFormData.e}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
      <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default ContractEmployeeEdit;