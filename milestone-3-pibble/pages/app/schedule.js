import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { router } from "next/router";
import { useAuth, useUser } from "@clerk/nextjs";

export default function SchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    if (!userId) {
      router.push("/");
    }
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const scheduleResponse = await fetch("/api/schedules");
    const scheduleData = await scheduleResponse.json();
    setSchedules(scheduleData);
  };

  const handleCreateSchedule = () => {
    setSelectedSchedule(null);
    setShowModal(true);
  };

  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  const handleDeleteSchedule = async (id) => {
    await fetch(`/api/schedules?id=${id}`, {
      method: "DELETE",
    });
    fetchSchedules();
  };

  const handleSaveSchedule = async (schedule) => {
    if (schedule.id) {
      await fetch("/api/schedules", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule),
      });
    } else {
      const length = schedules.length;

      if (length === 0) {
        schedule.id = 0;
      } else {
        const finalSchedule = schedules[length - 1];
        schedule.id = parseInt(finalSchedule.id) + 1;
      }

      await fetch("/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule),
      });
    }

    setShowModal(false);
    fetchSchedules();
  };

  const renderDays = (days) => {
    days = days.split(",").map((day) => day === "true");
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      .map((day, index) => (days[index] ? day : null))
      .filter(Boolean)
      .join(", ");
    return daysOfWeek;
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      {/* Start Main Page */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="dashboard-h1">Schedules</div>
          <button className="button-create-schedule" onClick={handleCreateSchedule}>
            Create New Schedule
          </button>
        </div>
        <div>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th className="th-heading">Name</th>
                <th className="th-heading">Days</th>
                <th className="th-heading">Time</th>
                <th className="th-heading">Portion</th>
                <th className="th-heading">Settings</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(schedules) ? (
                schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td className="td-p">{schedule.name}</td>
                    <td className="td-p">{renderDays(schedule.days)}</td>
                    <td className="td-p">{schedule.time}</td>
                    <td className="td-p">{schedule.portion} oz</td>
                    <td>
                      <button
                        className="th-button-edit"
                        style={{ marginRight: 5, marginBottom:15 }}
                        onClick={() => handleEditSchedule(schedule)}
                      >
                        Edit
                      </button>
                      <button
                        className="th-button-delete"
                        style={{ marginLeft: 5 }}
                        onClick={() => handleDeleteSchedule(schedule.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No schedules found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* End Main Page */}
      {showModal && (
        <ScheduleModal
          schedule={selectedSchedule}
          onSave={handleSaveSchedule}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

function ScheduleModal({ schedule, onSave, onClose }) {
  const [name, setName] = useState(schedule?.name || "");
  const [days, setDays] = useState(
    schedule?.days.split(",").map((day) => day === "true") ||
      Array(7).fill(false)
  );
  const [time, setTime] = useState(schedule?.time || "");
  const [portion, setPortion] = useState(schedule?.portion || "");

  const handleSave = () => {
    onSave({ ...schedule, name, days, time, portion });
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {schedule ? "Edit Schedule" : "Create Schedule"}
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
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
            <label className="label">Days of the Week</label>
            <div className="control">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => (
                  <button
                    key={day}
                    className={`button ${days[index] ? "is-primary" : ""}`}
                    onClick={() => {
                      const newDays = [...days];
                      newDays[index] = !newDays[index];
                      setDays(newDays);
                    }}
                  >
                    {day}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Time</label>
            <div className="control">
              <input
                className="input"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Portion Size (oz)</label>
            <div className="control">
              <input
                className="input"
                type="number"
                step="0.1"
                value={portion}
                onChange={(e) => setPortion(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSave}>
            Save
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
