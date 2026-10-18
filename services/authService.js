const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const AuthService = {
  // 1. Signup/Register User
  async register(data) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.detail || "Registration failed");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(result.user));
      document.cookie = "isLoggedIn=true; path=/; max-age=86400; SameSite=Strict";
    }

    return result;
  },

  // 2. Verify Signup OTP (Skipped for local mode)
  async verifySignup(email, code) {
    return { message: "Email verification skipped for local mode." };
  },

  // 3. Resend OTP for Signup (Skipped for local mode)
  async resendSignupOTP(email) {
    return { message: "OTP resend skipped for local mode." };
  },

  // 4. Login User
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.detail || "Login failed");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(result.user));
      document.cookie = "isLoggedIn=true; path=/; max-age=86400; SameSite=Strict";
    }

    return result;
  },

  // 5. Logout User
 async logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.clear();
      
      // Explicitly match path=/ and secure flags to successfully delete the cookie
      document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict;";
    }
  },
  // 6. Forgot Password (Skipped for local mode)
  async forgotPassword(email) {
    throw new Error("Password reset is not configured for local mode.");
  },

  // 7. Reset Password (Skipped for local mode)
  async resetPassword(email, code, password) {
    throw new Error("Password reset is not configured for local mode.");
  },

  // 8. Get Current Auth User
  async currentUser() {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // 9. Helper to get active user ID
  async token() {
    const user = await this.currentUser();
    return user ? user.id : null;
  },
};