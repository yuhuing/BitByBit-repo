# BitByBit

Bit By Bit Project
// Login Page - CSY
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Secure Bit Space</title>
    <style>
      /* General Page Styles */
      body {
        font-family: "Arial", sans-serif;
        background: linear-gradient(135deg, #4e7d96, #ff844b);
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: #333;
      }

      .container {
        background: #fff;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        text-align: center;
        width: 100%;
        max-width: 400px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .container:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
      }

      h1 {
        font-size: 2rem;
        margin-bottom: 20px;
        color: #374851;
      }

      h2 {
        font-size: 1.4rem;
        margin-bottom: 10px;
        color: #4e7d96;
      }

      button {
        padding: 12px 20px;
        background-color: #c24308;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        margin: 15px 0;
        width: 100%;
        max-width: 300px;
        transition: background-color 0.3s ease, transform 0.2s ease;
      }

      button:hover {
        background-color: #862c02;
        transform: scale(1.05);
      }

      button:active {
        transform: scale(0.98);
      }

      .input-wrapper {
        margin: 25px 0 0;
        display: none; /* Initially hidden */
        flex-direction: column;
        align-items: center;
      }

      label {
        font-size: 1rem;
        color: #555;
        margin-bottom: 10px;
      }

      input {
        width: 100%;
        max-width: 300px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
        box-sizing: border-box;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }

      input:focus {
        outline: none;
        border-color: #4e7d96;
        box-shadow: 0 0 5px rgba(66, 133, 244, 0.5);
      }

      .submit-wrapper {
        margin-top: 15px;
        display: none; /* Initially hidden */
        justify-content: center;
        width: 100%;
      }

      .error-message {
        color: red;
        font-size: 0.9rem;
        margin-top: 10px;
        display: none; /* Initially hidden */
      }

      .info-text {
        font-size: 0.9rem;
        color: #666;
        margin-top: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Secure Bit Space</h1>
      <h2>Welcome Back</h2>

      <div id="email-section" class="input-wrapper" style="display: flex">
        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email" />
        <button onclick="sendOTP()">Send OTP</button>
        <p id="email-error" class="error-message">
          Invalid email. Please try again.
        </p>
      </div>

      <div id="otp-section" class="input-wrapper">
        <label for="otp">OTP:</label>
        <input type="text" id="otp" placeholder="Enter the OTP" />
        <button onclick="verifyOTP()">Verify OTP</button>
        <p id="otp-error" class="error-message">
          Invalid OTP. Please try again.
        </p>
      </div>

      <div id="meeting-id-section" class="input-wrapper">
        <label for="meeting-id">Meeting ID:</label>
        <input
          type="text"
          id="meeting-id"
          placeholder="Enter your Meeting ID"
        />
        <button onclick="submitMeetingID()">Join Meet</button>
        <p id="meeting-error" class="error-message">
          Invalid Meeting ID. Please try again.
        </p>
      </div>

      <p class="info-text">Your information is secure and encrypted.</p>
    </div>

    <script>
      const VALID_OTP = "67890";
      const VALID_MEETING_ID = "12345";
      let otpAttemptsLeft = 5;
      let meetingAttemptsLeft = 5;

      function sendOTP() {
        const emailInput = document.getElementById("email").value;
        const emailError = document.getElementById("email-error");

        if (emailInput.includes("@") && emailInput.includes(".")) {
          alert("OTP has been sent to your email (mockup). OTP: " + VALID_OTP);
          document.getElementById("email-section").style.display = "none";
          document.getElementById("otp-section").style.display = "flex";
          emailError.style.display = "none";
        } else {
          emailError.style.display = "block";
          emailError.textContent = "Invalid email. Please try again.";
        }
      }

      function verifyOTP() {
        const otpInput = document.getElementById("otp").value;
        const otpError = document.getElementById("otp-error");

        if (otpInput === VALID_OTP) {
          alert("OTP verified successfully!");
          document.getElementById("otp-section").style.display = "none";
          document.getElementById("meeting-id-section").style.display = "flex";
          otpError.style.display = "none";
        } else {
          otpAttemptsLeft--;
          otpError.style.display = "block";
          otpError.textContent = `Invalid OTP. ${otpAttemptsLeft} attempt(s) left.`;

          if (otpAttemptsLeft <= 0) {
            alert("Too many failed attempts. Access denied.");
            document.getElementById("otp").disabled = true;
            otpError.textContent =
              "You have been locked out due to too many failed attempts.";
          }
        }
      }

      function submitMeetingID() {
        const meetingIdInput = document.getElementById("meeting-id").value;
        const meetingError = document.getElementById("meeting-error");

        if (meetingIdInput === VALID_MEETING_ID) {
          alert("Meeting ID verified successfully!");
          window.location.href = "meeting.html";
        } else {
          meetingAttemptsLeft--;
          meetingError.style.display = "block";
          meetingError.textContent = `Invalid Meeting ID. ${meetingAttemptsLeft} attempt(s) left.`;

          if (meetingAttemptsLeft <= 0) {
            alert("Too many failed attempts. Access denied.");
            document.getElementById("meeting-id").disabled = true;
            meetingError.textContent =
              "You have been locked out due to too many failed attempts.";
          }
        }
      }
    </script>
  </body>
</html>
