//For the login.html
const VALID_OTP = generateRandomOTP();
let otpAttemptsLeft = 5;

function generateRandomOTP() {
  const length = 5;
  const chars = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += chars.charAt(Math.floor(Math.random() * chars.length));  
  }
  return OTP;
}

function sendOTP() {
  const emailInput = document.getElementById("email").value;
  const emailError = document.getElementById("email-error");

  if (emailInput.includes("@") && emailInput.includes(".")) {
    alert(`OTP has been sent to your email (mockup). OTP: ${VALID_OTP}.\nExpired in 5 minutes.`);
    document.getElementById("email-section").style.display = "none";
    document.getElementById("otp-section").style.display = "flex";
    emailError.style.display = "none";

    localStorage.setItem("otpTimestamp", Date.now());
  } else {
    emailError.style.display = "block";
    emailError.textContent = "Invalid email. Please try again.";
  }
}

function verifyOTP() {
  const otpInput = document.getElementById("otp").value;
  const otpError = document.getElementById("otp-error");

  const otpTimestamp = parseInt(localStorage.getItem("otpTimestamp"));
  if (Date.now() - otpTimestamp > 5 * 60 * 1000) {  
    otpError.style.display = "block";
    otpError.textContent = "OTP has expired. Please request a new one.";
    otpAttemptsLeft = 0;
    return;
  }

  if (otpInput === VALID_OTP) {
    alert("OTP verified successfully!");
    window.location.href = `dashboard.html`;
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

//for the join-meeting.html
const VALID_MEETING_ID = "12345";
let meetingAttemptsLeft = parseInt(localStorage.getItem("meetingAttemptsLeft")) || 5;

function submitMeetingID() {
  const meetingIdInput = document.getElementById("meeting-id").value;
  const meetingError = document.getElementById("meeting-error");

  if (meetingIdInput === VALID_MEETING_ID) {
    alert("Meeting ID verified successfully!");
    localStorage.removeItem("meetingAttemptsLeft");
    localStorage.setItem("meetingID", meetingIdInput);
    window.location.href = `meeting.html`;
  } else {
    meetingAttemptsLeft--;
    localStorage.setItem("meetingAttemptsLeft", meetingAttemptsLeft);
    meetingError.style.display = "block";
    meetingError.textContent = `Invalid Meeting ID. ${meetingAttemptsLeft} attempt(s) left.`;

    if (meetingAttemptsLeft <= 0) {
      alert("Too many failed attempts. Access denied.");
      document.getElementById("meeting-id").disabled = true;
      document.getElementById("join-button").disabled = true;
      document.getElementById("back-button").disabled = true;

      meetingError.textContent =
        "You have been locked out due to too many failed attempts.";
    }
  }
}

//for the dashboard.html
function generateRandomMeetingId() {
  const length = 5;
  const chars = '0123456789';
  let meetingID = '';
  for (let i = 0; i < length; i++) {
    meetingID += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return meetingID;
}

function createMeeting() {
  const meetingID = generateRandomMeetingId();
  alert(`Meeting Created Successfully! Your Meeting ID is: ${meetingID}`);
  localStorage.setItem("meetingID", meetingID);
  window.location.href = `meeting.html`;
}

//for the ai_face_feacture.html
let isCameraOn = false;
let isAIPreviewEnabled = false;
const videoPreview = document.getElementById("video-preview");
const aiStatusBar = document.getElementById("ai-status-bar");

updateAIStatus();

function showCamera() {
  isCameraOn = !isCameraOn;
  videoPreview.style.backgroundColor = isCameraOn ? "#000" : "black";
  videoPreview.textContent = isCameraOn
      ? "Camera is On (Mockup)"
      : "Camera is Off (Mockup)";
}

function togglePreview() {
  if (!isCameraOn) {
    alert("Please turn on the camera first!");
    return;
  }
  isAIPreviewEnabled = !isAIPreviewEnabled;
  videoPreview.textContent = isAIPreviewEnabled
    ? "AI Face Previewing (Mockup)"
    : "Camera is On (Mockup)";
}

function confirmAndEnable() {
  if (!isCameraOn) {
    alert("Please turn on the camera first!");
    return;
  }
  if (isAIPreviewEnabled) {
    const confirmEnable = confirm(
      "Are you sure you want to enable AI Face for your meeting?"
    );
    if (confirmEnable) {
      alert("AI Face is enabled for your meeting.");
      sessionStorage.setItem("aiFaceEnabled", "true");
      updateAIStatus(); // Update status bar
      goToMeetingPage();
    }
  } else {
    alert("Please enable AI Preview first!");
  }
}

function removeAI() {
  const aiFaceStatus = sessionStorage.getItem("aiFaceEnabled");

  if (aiFaceStatus !== "true") {
    alert("AI Face is currently not on!");
    aiStatusBar.textContent = "AI Face is currently off"; // Update status message
    aiStatusBar.classList.remove("on");
    aiStatusBar.classList.add("off");
  } else {
    const confirmRemove = confirm("Are you sure you want to remove AI Face?");
    if (confirmRemove) {
      sessionStorage.setItem("aiFaceEnabled", "false");
      aiStatusBar.textContent = "AI Face is currently off"; // Update status message
      aiStatusBar.classList.remove("on");
      aiStatusBar.classList.add("off");
      alert("AI Face has been removed.");
      goToMeetingPage();
    }
  }
}

function updateAIStatus() {
  const aiFaceStatus = sessionStorage.getItem("aiFaceEnabled");
  if (aiFaceStatus === "true") {
    aiStatusBar.textContent = "AI Face is currently on"; // Update status message
    aiStatusBar.classList.remove("off");
    aiStatusBar.classList.add("on");
  } else {
    aiStatusBar.textContent = "AI Face is currently off"; // Update status message
    aiStatusBar.classList.remove("on");
    aiStatusBar.classList.add("off");
  }
}

function goToMeetingPage() {
  window.location.href = "meeting.html";
}
