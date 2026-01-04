import React, { useEffect, useState, useRef } from "react";
import baseUrl from "../../apis/config";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import StatsCards from "@/components/AdminComponents/UserManagement/StatsCards";
import UserFilters from "@/components/AdminComponents/UserManagement/UserFilters";
import UsersTable from "@/components/AdminComponents/UserManagement/UsersTable";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, owners: 0, users: 0 });
  const [displayStats, setDisplayStats] = useState({ total: 0, owners: 0, users: 0 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ role: "", status: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const displayStatsRef = useRef(displayStats);
  const rafIdsRef = useRef({});

  const endpoint = `${API_BASE_URL}/admin${API_ENDPOINTS.USERS}`;
  const limit = 10;

  // 🔹 Animate numbers
  const animateKey = (key, toValue, duration = 800) => {
    const fromValue = displayStatsRef.current[key] ?? 0;
    const start = performance.now();
    let rafId;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(fromValue + (toValue - fromValue) * eased);
      setDisplayStats((s) => ({ ...s, [key]: current }));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
        rafIdsRef.current[key] = rafId;
      } else {
        setDisplayStats((s) => ({ ...s, [key]: toValue }));
        rafIdsRef.current[key] = null;
      }
    };
    rafId = requestAnimationFrame(step);
    rafIdsRef.current[key] = rafId;
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...(filters.role && { role: filters.role }),
        ...(filters.status && { status: filters.status }),
      });
      const res = await baseUrl.get(`${endpoint}?${queryParams.toString()}`);
      const responseData = res.data?.data || {};
      const fetchedUsers = responseData.data || responseData || [];
      setUsers(fetchedUsers);
      setTotalPages(responseData.totalPages || 1);
      await fetchStats();
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await baseUrl.get("/admin/users/stats");
      const payload = res.data?.data ?? res.data ?? {};
      setStats({
        total: payload.totalUsers ?? 0,
        owners: payload.totalOwners ?? 0,
        users: payload.activeUsers ?? 0,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    ["total", "owners", "users"].forEach((key) => animateKey(key, stats[key], 800));
  }, [stats]);

  useEffect(() => {
    fetchUsers();
  }, [page, filters]);

  const handleStatusToggle = async (id, isActive) => {
    try {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === id ? { ...u, status: isActive ? "active" : "disabled" } : u
        )
      );
      await baseUrl.patch(`/admin/users/${id}/status`, {
        status: isActive ? "active" : "disabled",
      });
      await fetchStats();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const resetFilters = () => {
    setFilters({ role: "", status: "" });
    setPage(1);
  };

  return (
    <div className="w-full" dir="rtl">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">إدارة المستخدمين</h2>
      <StatsCards displayStats={displayStats} />
      <UserFilters filters={filters} setFilters={setFilters} setPage={setPage} resetFilters={resetFilters} />
      <UsersTable users={users} loading={loading} page={page} totalPages={totalPages} setPage={setPage} handleStatusToggle={handleStatusToggle} />
    </div>
  );
};

export default UserManagement;
