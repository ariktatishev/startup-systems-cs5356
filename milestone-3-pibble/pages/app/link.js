import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { router } from "next/router";
import { useAuth, useUser } from "@clerk/nextjs";

export default function LinkDevicePage() {
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    if (!userId) {
      router.push("/");
    }
  });
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    const response = await fetch("/api/devices");
    const data = await response.json();
    setDevices(data);
  };

  const handleLinkDevice = () => {
    setSelectedDevice(null);
    setName("");
    setLocation("");
    setUniqueId("");
    setShowModal(true);
  };

  const handleEditDevice = (device) => {
    setSelectedDevice(device);
    setName(device.name);
    setLocation(device.location);
    setUniqueId(device.uniqueid);
    setShowModal(true);
  };

  const handleDeleteDevice = async (deviceUniqueId) => {
    await fetch(`/api/devices/${deviceUniqueId}`, {
      method: "DELETE",
    });
    fetchDevices();
  };

  const handleSaveDevice = async () => {
    if (selectedDevice) {
      await fetch(`/api/devices/${selectedDevice.uniqueid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, uniqueId }),
      });
    } else {
      await fetch("/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, uniqueId }),
      });
    }
    setShowModal(false);
    fetchDevices();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <div className="dashboard-h1">Linked Devices</div>
        <button className="button-link-device" onClick={handleLinkDevice}>
          Link New Device
        </button>
        <table className="table">
          <thead>
            <tr>
              <th className="th-heading">Name</th>
              <th className="th-heading">Location</th>
              <th className="th-heading">Unique ID</th>
              <th className="th-heading">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.uniqueid}>
                <td className="td-p">{device.name}</td>
                <td className="td-p">{device.location}</td>
                <td className="td-p">{device.uniqueid}</td>
                <td>
                  <button
                    style={{ marginRight: 5, marginBottom:15 }}
                    className="th-button-edit"
                    onClick={() => handleEditDevice(device)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ marginLeft: 5 }}
                    className="th-button-delete"
                    onClick={() => handleDeleteDevice(device.uniqueid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                {selectedDevice ? "Edit Device" : "Link New Device"}
              </p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setShowModal(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Location</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Unique ID</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleSaveDevice}>
                Save
              </button>
              <button className="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
