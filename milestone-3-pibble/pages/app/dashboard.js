import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { router } from "next/router";

export default function DashboardPage() {
  const [stats, setStats] = useState({});
  const [portionSize, setPortionSize] = useState(0);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!userId) {
      router.push("/");
    }
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const statsResponse = await fetch("/api/stats");
    const statsData = await statsResponse.json();

    setStats(statsData[0]);
  };

  const handleClean = async () => {
    const currentTime = new Date().toLocaleString();
    const updatedStats = { ...stats, last_cleanup: currentTime };
    await updateStats(updatedStats);
  };

  const handleDispense = async () => {
    if (portionSize == null) {
      setPortionSize(0);
    }

    const currentTime = new Date().toLocaleString();
    const updatedStats = {
      ...stats,
      last_mealtime: currentTime,
      last_portion_size: portionSize,
      total_daily_intake: parseInt(stats.total_daily_intake) + portionSize,
    };
    await updateStats(updatedStats);
  };

  const updateStats = async (updatedStats) => {
    await fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStats),
    });
    fetchStats();
  };

  const handleClearLogs = async () => {
    await fetch("/api/stats", {
      method: "DELETE",
    });
    fetchStats();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      {/* Start Main Page */}
      <div style={{ flex: 1, padding: "20px", marginBottom: "60px" }}>
        <div className="dashboard-h1">Welcome Back!</div>
        <div className="columns">
          {/* Text Section Start */}
          <div className="column" style={{ margin: "2rem" }}>
            <div className="dashboard-h2" id="stats">
              Stats
            </div>
            <div className="dashboard-p" id="stat1">
              Last mealtime: {stats.last_mealtime}
            </div>
            <div className="dashboard-p" id="stat2">
              Last portion size: {stats.last_portion_size} oz
            </div>
            <div className="dashboard-p" id="stat3">
              Last cleanup: {stats.last_cleanup}
            </div>
            <div className="dashboard-p" id="stat4">
              Total daily intake: {stats.total_daily_intake} oz
            </div>
          </div>
          {/* Text Section End */}
          {/* Image and Buttons Start */}
          <div className="column">
            <figure>
              <Image
                src="https://i.imgur.com/cwHbOi8.png"
                alt="Device Image"
                width={640}
                height={360}
              />
            </figure>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                /*marginTop: "2rem",*/
              }}
            >
              <button
                id="buttonClean"
                className="dashboard-button-clean"
                style={{ marginRight: "2rem" }}
                onClick={handleClean}
              >
                Clean
              </button>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="number"
                  value={portionSize}
                  onChange={(e) => {
                    const newValue =
                      e.target.value === "" ? 0 : parseFloat(e.target.value);
                    setPortionSize(newValue);
                  }}
                  step="0.1"
                  min="0"
                  style={{ width: "80px", marginRight: "0.5rem" }}
                />
                <span>oz</span>
                <button
                  id="buttonDispense"
                  className="dashboard-button-dispense"
                  style={{ marginLeft: "2rem" }}
                  onClick={handleDispense}
                >
                  Dispense
                </button>
              </div>
              <button
                id="buttonClear"
                className="dashboard-button-clear-logs"
                style={{ marginLeft: "1rem" }}
                onClick={handleClearLogs}
              >
                Clear Logs
              </button>
            </div>
          </div>
          {/* Image and Buttons End */}
        </div>
      </div>
      {/* End Main Page */}
    </div>
  );
}
