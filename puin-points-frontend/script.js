const BACKEND_URL = "http://localhost:3000";

// 🔹 Groep aanmaken vanuit app.html
async function createGroup() {
  const groupName = document.getElementById("groupName").value;
  const emoji = document.getElementById("emojiCombo").value;

  const response = await fetch(`${BACKEND_URL}/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: groupName,
      emoji: emoji,
      event: "PUIN 2025"
    })
  });

  const data = await response.json();
  localStorage.setItem("groupId", data._id);
  localStorage.setItem("emoji", data.emoji);
  window.location.href = `group.html`;
}

// 🔹 Signaal versturen vanuit group.html
async function sendSignal() {
  const point = parseInt(document.getElementById("screenSelect").value);
  const duration = parseInt(document.getElementById("durationSelect").value);
  const groupId = localStorage.getItem("groupId");
  const emoji = localStorage.getItem("emoji");

  const response = await fetch(`${BACKEND_URL}/signals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      groupId,
      pointId: point,
      emoji,
      duration
    })
  });

  const data = await response.json();
  document.getElementById("confirmation").innerText =
    `✅ Signaal gestuurd naar PUIN-punt ${point} voor ${duration} minuten!`;
}

// 🔹 Signaal ophalen op display.html
async function loadSignal(pointId) {
  const response = await fetch(`${BACKEND_URL}/signals/display/${pointId}`);
  const data = await response.json();

  const displayEmoji = document.getElementById("displayEmoji");
  if (data.length > 0) {
    displayEmoji.innerText = data[0].emoji;
  } else {
    displayEmoji.innerText = "❓";
  }
}
