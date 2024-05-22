// Sidebar.js
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div
      style={{
        width: "20%",
        background: "rgba(49, 160, 238, 0.3)",
        display: "flex",
        flexDirection: "column",
        minHeight: "750px",
        padding: "20px",
        position: "relative",
      }}
    >
      <div className="sidebar-item" style={{ marginBottom: "20px" }}>
        <Link href="/app/dashboard">Dashboard Home</Link>
      </div>
      <div className="sidebar-item" style={{ marginBottom: "20px" }}>
        <Link href="/app/schedule">Schedule</Link>
      </div>
      <div className="sidebar-item" style={{ marginBottom: "20px" }}>
        <Link href="/app/link">Link Device</Link>
      </div>
      <div className="sidebar-item" style={{ marginBottom: "20px" }}>
        <Link href="/app/help">Help Center</Link>
      </div>
    </div>
  );
};

export default Sidebar;
