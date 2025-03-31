const BACKEND_URL = "http://localhost:3000";

// 🔹 Groep aanmaken via app.html
async function createGroup() {
  const groupName = document.getElementById("groupName").value.trim();
  const emojiInput = document.getElementById("emojiCombo").value.trim();

  // ✅ Check op lege velden
  if (!groupName || !emojiInput) {
    alert("Vul zowel een groepsnaam als een emoji-combinatie in.");
    return;
  }

  // ✅ Check op max 2 emoji’s
  const emojiCount = [...emojiInput].filter(e => /\p{Emoji}/u.test(e)).length;
  if (emojiCount > 2) {
    alert("Je mag maximaal 2 emoji's gebruiken voor je groep.");
    return;
  }

  const response = await fetch("http://localhost:3000/groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: groupName,
      emoji: emojiInput,
      event: "PUIN 2025"
    })
  });

  // ❌ Check of emoji al in gebruik is
  if (response.status === 409) {
    alert("Deze emoji-combinatie is al in gebruik. Kies een andere.");
    return;
  }

  const data = await response.json();
  localStorage.setItem("groupId", data._id);
  localStorage.setItem("emoji", data.emoji);
  window.location.href = "group.html";
}


// 🔹 Signaal sturen vanuit group.html
async function sendSignal() {
  const point = parseInt(document.getElementById("screenSelect").value);
  const duration = parseInt(document.getElementById("durationSelect").value);
  const groupId = localStorage.getItem("groupId");
  const emoji = localStorage.getItem("emoji");

  const response = await fetch("http://localhost:3000/signals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      groupId,
      pointId: point,
      emoji,
      duration
    })
  });

  if (response.status === 409) {
    alert("Deze groep heeft al een actief signaal op dit punt.");
    return;
  }

  const data = await response.json();
  document.getElementById("confirmation").innerText =
    `✅ Signaal gestuurd naar PUIN-punt ${point} voor ${duration} minuten!`;
}


// 🔹 Toon meerdere signalen per groep op display.html
async function loadSignalList(pointId) {
  const response = await fetch(`${BACKEND_URL}/signals/display/${pointId}`);
  const data = await response.json();

  const emojiListContainer = document.getElementById("emojiList");
  emojiListContainer.innerHTML = "";

  if (data.length === 0) {
    emojiListContainer.innerText = "❌ Geen actieve signalen";
    return;
  }

  // ✅ Groepeer signalen per groepId
  const grouped = {};
  data.forEach(signal => {
    const groupKey = signal.groupId._id || signal.groupId;
    if (!grouped[groupKey]) grouped[groupKey] = [];
    grouped[groupKey].push(signal.emoji);
  });

  // 🔄 Voor elke groep een eigen bordered blok
  Object.values(grouped).forEach(emojiArray => {
    const groupBox = document.createElement("div");
    groupBox.className = "emoji-group";

    emojiArray.forEach(e => {
      const emoji = document.createElement("span");
      emoji.textContent = e;
      groupBox.appendChild(emoji);
    });

    emojiListContainer.appendChild(groupBox);
  });
}
