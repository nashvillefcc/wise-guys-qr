import React, { useState } from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"
import QrReader from "react-qr-scanner"

const QRScanner = ({ user }) => {
  const [code, setCode] = useState() // The const code will be the the qr code
  const noSupport =
    !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices
  return (
    <QrReader
      style={{
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
        position: "fixed",
        background: "rgba(0,0,0,0.8)",
        objectFit: "cover",
        zIndex: "-1",
        top: 0,
        left: 0,
      }}
      lagecyMode={noSupport}
      openImageDialog={noSupport && !code}
      onError={err => console.error(err)}
      onImageLoad={() => {
        console.log("loaded")
      }}
      onScan={code => {
        if (!code) return
        setCode(code)
      }}
    />
  )
}

const Scanner = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <>
      <nav>
        <Link to="/scanner/">Scanner Home</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <QRScanner path="/scanner/" user={user} />
      </Router>
    </>
  )
}

export default Scanner
