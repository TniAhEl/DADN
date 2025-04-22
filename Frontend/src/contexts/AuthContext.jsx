// contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Tạo context cho authentication và authorization
export const AuthContext = createContext();

// Danh sách các quyền trong hệ thống
export const PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard",
  VIEW_REPORTS: "view_reports",
  EDIT_PROFILE: "edit_profile",
  MANAGE_DEVICES: "manage_devices",
  CONFIGURE_DEVICES: "configure_devices",
  VIEW_SETTINGS: "view_settings",
  MANAGE_SCHEDULES: "manage_schedules",

  // Quyền chỉ dành cho admin
  ADMIN_ACCESS: "admin_access",
  MANAGE_USERS: "manage_users",
};

// Định nghĩa roles với permissions tương ứng
export const ROLES = {
  ADMIN: [
    // Tất cả các quyền của user
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.MANAGE_DEVICES,
    PERMISSIONS.CONFIGURE_DEVICES,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.MANAGE_SCHEDULES,

    // Quyền đặc biệt của admin
    PERMISSIONS.ADMIN_ACCESS,
    PERMISSIONS.MANAGE_USERS,
  ],

  CUSTOMER: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.MANAGE_DEVICES,
    PERMISSIONS.CONFIGURE_DEVICES,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.MANAGE_SCHEDULES,
  ],
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [userType, setUserType] = useState(null); // admin hoặc customer/user
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const username = getCookie("user_name");
        const storedUserType = getCookie("user_type");

        if (username) {
          // Lưu user type
          if (storedUserType) {
            setUserType(storedUserType);
          }

          // Fetch user info from API
          const response = await fetch(
            `http://localhost:3000/api/v1/auth/user/${username}`
          );
          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);

            if (storedUserType === "admin") {
              setUserPermissions(ROLES.ADMIN);
            } else {
              setUserPermissions(ROLES.CUSTOMER);
            }
          } else {
            clearAuthCookies();
          }
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        clearAuthCookies();
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInUser();
  }, []);

  // Hàm login
  const login = async (username, password, userType = "customer") => {
    try {
      // URL API khác nhau cho admin và user/customer
      const loginUrl =
        userType === "admin"
          ? "http://localhost:3000/api/v1/auth/admin/login"
          : "http://localhost:3000/api/v1/auth/login";

      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Lưu thông tin đăng nhập
        document.cookie = `user_name=${username}; path=/`;
        document.cookie = `user_type=${userType}; path=/`;

        setUserType(userType);

        // Xác định API endpoint lấy thông tin user
        const userApiUrl =
          userType === "admin"
            ? `http://localhost:3000/api/v1/auth/admin/${username}`
            : `http://localhost:3000/api/v1/auth/user/${username}`;

        // Get user data including role
        const userResponse = await fetch(userApiUrl);
        const userData = await userResponse.json();

        setCurrentUser(userData);

        setUserPermissions(userType === "admin" ? ROLES.ADMIN : ROLES.CUSTOMER);

        setAuthError("");

        // Chuyển hướng tùy thuộc vào loại người dùng
        if (userType === "admin") {
          navigate("/admin"); // Đăng nhập admin -> trang admin
        } else {
          navigate("/"); // Đăng nhập user/customer -> trang chủ
        }

        return { success: true, message: "Đăng nhập thành công!" };
      } else {
        setAuthError(result.message || "Đăng nhập thất bại");
        throw new Error(result.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      setAuthError(error.message);
      return { success: false, message: error.message };
    }
  };

  // Hàm đăng ký
  const register = async (userData) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: userData.username,
            password: userData.password,
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            address: userData.address,
            birth: userData.birth,
            userType: userData.userType || "customer", // Mặc định là customer
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setAuthError("");
        return { success: true, message: "Đăng ký thành công!" };
      } else {
        setAuthError(result.message || "Đăng ký thất bại");
        throw new Error(result.message || "Đăng ký thất bại");
      }
    } catch (error) {
      setAuthError(error.message);
      return { success: false, message: error.message };
    }
  };

  // Hàm logout
  const logout = () => {
    clearAuthCookies();
    setCurrentUser(null);
    setUserPermissions([]);
    setUserType(null);
    navigate("/login-as");
  };

  // Helper function để xóa cookies
  const clearAuthCookies = () => {
    document.cookie =
      "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "user_type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  // Hàm kiểm tra quyền
  const hasPermission = (permission) => {
    return userPermissions && userPermissions.includes(permission);
  };

  // Hàm kiểm tra có phải admin không
  const isAdmin = () => {
    return userType === "admin";
  };

  // Helper function để lấy cookie
  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    if (match) return match[2];
    return null;
  };

  const value = {
    currentUser,
    userType,
    isAdmin,
    login,
    register,
    logout,
    hasPermission,
    PERMISSIONS,
    loading,
    authError,
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook để sử dụng Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const PermissionGate = ({ children, permission }) => {
  const { hasPermission, loading } = useAuth();
  if (loading) {
    return null; // hoặc có thể thêm một loader nếu cần
  }
  if (!permission || (hasPermission && hasPermission(permission))) {
    return children;
  }

  return null;
};

// AdminGate component - chỉ hiển thị nội dung khi là admin
export const AdminGate = ({ children }) => {
  const { isAdmin } = useAuth();

  if (isAdmin()) {
    return children;
  }

  return null;
};
