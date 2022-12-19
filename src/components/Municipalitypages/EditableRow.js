import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>{editFormData.a}</td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Charge"
          name="b"
          value={editFormData.b}
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

export default EditableRow;