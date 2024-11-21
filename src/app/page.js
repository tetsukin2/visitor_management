"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

export default function HomePage() {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 200,
      height: 200,
      data: `${window.location.origin}/form`, // Static link to /form
    });

    qrCode.append(qrCodeRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to Visitor Management</h1>
      <p>Scan this QR code to begin the registration process:</p>
      <div ref={qrCodeRef} className="mt-4"></div>
    </div>
  );
}
