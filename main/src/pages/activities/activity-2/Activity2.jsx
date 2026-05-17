import React, { useState, useEffect } from "react";
import "./Activity2.css";

const Activity2 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage]   = useState("");
  const [msgType, setMsgType]   = useState(""); // "success" | "error"
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
      setMessage("Session restored. Welcome back.");
      setMsgType("success");
    }
  }, []);

  const handleLogin = () => {
    if (username === "user" && password === "user123") {
      setIsLoggedIn(true);
      setHasError(false);
      setMessage("Login successful. Welcome in.");
      setMsgType("success");
      localStorage.setItem("isLoggedIn", "true");
    } else {
      setHasError(true);
      setMessage("Invalid credentials. Please try again.");
      setMsgType("error");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setHasError(false);
    setMessage("");
    setMsgType("");
    localStorage.removeItem("isLoggedIn");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <main className="login-page">
      <div className="login-card">
        {isLoggedIn ? (
          /* ── Logged-in state ── */
          <div className="login-welcome">
            <div className="login-welcome__icon">✦</div>
            <span className="login-badge">Authenticated</span>
            <h2 className="login-welcome__heading">You're in.</h2>
            <p className="login-welcome__msg">
              {message}
            </p>
            <button className="login-logout-btn" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        ) : (
          /* ── Login form ── */
          <>
            <p className="login-eyebrow">Secure Access</p>
            <h1 className="login-title">Sign In</h1>
            <p className="login-subtitle">Enter your credentials to continue</p>

            <div className="login-form">
              <div className="login-field">
                <label className="login-label" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  className={`login-input ${hasError ? "login-input--error" : ""}`}
                  type="text"
                  placeholder="e.g. user"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setHasError(false);
                  }}
                  onKeyDown={handleKeyDown}
                  autoComplete="username"
                />
              </div>

              <div className="login-field">
                <label className="login-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className={`login-input ${hasError ? "login-input--error" : ""}`}
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setHasError(false);
                  }}
                  onKeyDown={handleKeyDown}
                  autoComplete="current-password"
                />
              </div>

              <button className="login-btn" onClick={handleLogin}>
                Sign in
              </button>

              {message && (
                <p className={`login-message login-message--${msgType}`}>
                  {message}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Activity2;