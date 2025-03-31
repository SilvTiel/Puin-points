function saveGroup() {
    const group = document.getElementById("groupName").value;
    const emoji = document.getElementById("emojiCombo").value;
    localStorage.setItem("puinGroup", group);
    localStorage.setItem("puinEmoji", emoji);
    alert(`Groep "${group}" opgeslagen met emoji ${emoji}`);
  }
  
  function pingGroup() {
    const emoji = localStorage.getItem("puinEmoji");
    if (emoji) {
      localStorage.setItem("activePing", emoji);
      document.getElementById("pingStatus").innerText = `📢 Signaal verzonden: ${emoji}`;
    } else {
      alert("Geen groep gevonden. Maak eerst een groep aan.");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const emoji = localStorage.getItem("activePing");
    const display = document.getElementById("displayEmoji");
    if (display && emoji) {
      display.innerText = emoji;
    }
  });
  