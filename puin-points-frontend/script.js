const BACKEND_URL = "http://localhost:3000";

// 🔹 Groep aanmaken via app.html
async function createGroup() {
  const groupName = document.getElementById("groupName").value.trim();
  const emojiInput = document.getElementById("emojiCombo").value.trim();
  const creatorName = document.getElementById("creatorName").value.trim();

  if (!groupName || !emojiInput || !creatorName) {
    alert("Vul groepsnaam, emoji's en je naam in.");
    return;
  }

  const emojiCount = [...emojiInput].filter(e => /\p{Emoji}/u.test(e)).length;
  if (emojiCount > 2) {
    alert("Je mag maximaal 2 emoji's gebruiken voor je groep.");
    return;
  }

  const response = await fetch(`${BACKEND_URL}/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: groupName,
      emoji: emojiInput,
      event: "PUIN 2025",
      creatorName
    })
  });

  if (response.status === 409) {
    alert("Deze emoji-combinatie is al in gebruik. Kies een andere.");
    return;
  }

  const data = await response.json();
  localStorage.setItem("groupId", data._id);
  localStorage.setItem("emoji", data.emoji);
  localStorage.setItem("userName", creatorName);
  window.location.href = `group.html?group=${data._id}`;
}

// 🔹 Groepsdata laden op group.html
window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sharedGroupId = urlParams.get("group") || localStorage.getItem("groupId");
  if (!sharedGroupId) return;

  localStorage.setItem("groupId", sharedGroupId);

  const res = await fetch(`${BACKEND_URL}/groups/${sharedGroupId}`);
  const data = await res.json();

  const currentUser = localStorage.getItem("userName");

  document.getElementById("groupName").textContent = data.name;
  document.getElementById("groupId").textContent = `ID: ${data._id}`;
  document.getElementById("groupEmoji").textContent = `Emoji: ${data.emoji}`;

  const list = document.getElementById("memberList");
  list.innerHTML = "";
  data.members.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name === currentUser ? `${name} (jij 👑)` : name;
    list.appendChild(li);
  });

  // Laat alleen join input zien als je GEEN naam in localStorage of nog niet in groep zit
  if (!currentUser || !data.members.includes(currentUser)) {
    document.getElementById("joinSection").style.display = "block";
    document.getElementById("shareButton").style.display = "none";
  } else {
    document.getElementById("joinSection").style.display = "none";
    document.getElementById("shareButton").style.display = "block";
  }
};

// 🔹 Lid toevoegen via gedeelde link
async function joinFromShare() {
  const groupId = localStorage.getItem("groupId");
  const name = document.getElementById("newMemberName").value.trim();
  if (!name) return alert("Vul je naam in om deel te nemen.");

  await fetch(`${BACKEND_URL}/groups/${groupId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ memberName: name })
  });

  localStorage.setItem("userName", name);
  window.location.href = `group.html?group=${groupId}`;
}

// 🔹 Genereer en kopieer de groepslink
function copyShareLink() {
  const groupId = localStorage.getItem("groupId");
  const shareURL = `${window.location.origin}/puin-points-frontend/group.html?group=${groupId}`;
  navigator.clipboard.writeText(shareURL);
  document.getElementById("shareLinkMsg").textContent = "🔗 Link gekopieerd! Deel deze met je vrienden.";
}

// 🔹 Signaal sturen
async function sendSignal() {
  const point = parseInt(document.getElementById("screenSelect").value);
  const duration = parseInt(document.getElementById("durationSelect").value);
  const groupId = localStorage.getItem("groupId");
  const emoji = localStorage.getItem("emoji");

  const response = await fetch(`${BACKEND_URL}/signals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groupId, pointId: point, emoji, duration })
  });

  if (response.status === 409) {
    alert("Deze groep heeft al een actief signaal op dit punt.");
    return;
  }

  document.getElementById("confirmation").innerText =
    `✅ Signaal gestuurd naar PUIN-punt ${point} voor ${duration} minuten!`;
}

// 🔹 Signal display
async function loadSignalList(pointId) {
  const response = await fetch(`${BACKEND_URL}/signals/display/${pointId}`);
  const data = await response.json();

  const emojiListContainer = document.getElementById("emojiList");
  emojiListContainer.innerHTML = "";

  if (data.length === 0) {
    emojiListContainer.innerText = "❌ Geen actieve signalen";
    return;
  }

  const grouped = {};
  data.forEach(signal => {
    const groupKey = signal.groupId._id || signal.groupId;
    if (!grouped[groupKey]) grouped[groupKey] = [];
    grouped[groupKey].push(signal.emoji);
  });

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
