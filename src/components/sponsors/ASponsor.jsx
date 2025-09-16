import React, { useState } from "react";
import Button from "../core/Button";
import { useModal } from "../../contexts/ModalContext";
import { deleteSponsor, updateSponsor } from "../../utils/funcs/sponsors";

const ASponsor = ({ sponsor, onUpdate }) => {
  const { openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(sponsor.name);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editName.trim()) return;
    
    setLoading(true);
    await updateSponsor(sponsor.id, { name: editName }, () => {
      setIsEditing(false);
      if (onUpdate) onUpdate();
    });
    setLoading(false);
  };

  const handleCancel = () => {
    setEditName(sponsor.name);
    setIsEditing(false);
  };

  const handleDelete = () => {
    openModal(
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Delete Sponsor</h3>
        <p className="mb-4">
          Are you sure you want to delete "{sponsor.name}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={closeModal} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              setDeleteLoading(true);
              await deleteSponsor(sponsor.id, () => {
                closeModal();
                if (onUpdate) onUpdate();
              });
              setDeleteLoading(false);
            }}
            loading={deleteLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-2 py-1 text-lg font-semibold border rounded outline-none"
              autoFocus
            />
          ) : (
            <h3 className="text-lg font-semibold text-gray-800">{sponsor.name}</h3>
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-3">
        <p><strong>Created:</strong> {new Date(sponsor.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              loading={loading}
              disabled={!editName.trim()}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ASponsor;
