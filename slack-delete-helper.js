(() => {
  if (window.__slackDeleteHelperRunning) return;
  window.__slackDeleteHelperRunning = true;

  let busy = false;
  let lastMessageKey = null;
  let cooldown = false;
  const HOVER_DELAY = 1200; // milliseconds hover required before delete

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // Status box
  const status = document.createElement("div");
  status.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #111;
    color: #fff;
    padding: 10px;
    z-index: 999999;
    font-size: 12px;
    border-radius: 6px;
  `;
  status.textContent = "Hover over a message for ~1.2s to delete";
  document.body.appendChild(status);

  let hoverTimer = null;

  const observer = new MutationObserver(() => {
    if (busy || cooldown) return;

    const btn = document.querySelector('[data-qa="more_message_actions"]');
    if (!btn) return;

    const message = btn.closest('[role="listitem"]');
    if (!message) return;

    const key = message.getAttribute("data-item-key");
    if (!key || key === lastMessageKey) return;

    // Clear previous timer if moving to a new message
    if (hoverTimer) clearTimeout(hoverTimer);

    // Set timer for hover intent
    hoverTimer = setTimeout(async () => {
      busy = true;
      lastMessageKey = key;

      // Highlight
      message.style.outline = "3px solid red";

      // Open 3-dot menu
      btn.click();
      await sleep(300);

      // Click delete menu item
      const deleteMenu = document.querySelector('[data-qa="delete_message"]');
      if (deleteMenu) {
        deleteMenu.click();
        status.textContent = `Deleting message: "${message.innerText.slice(0,50)}..."`;
        await sleep(300);
      } else {
        status.textContent = `Delete menu not found for message: "${message.innerText.slice(0,50)}"`;
        message.style.outline = "";
        busy = false;
        return;
      }

      // Click confirmation
      const confirmBtn = document.querySelector('[data-qa="dialog_go"]');
      if (confirmBtn) {
        confirmBtn.click();
        status.textContent = `Message deleted: "${message.innerText.slice(0,50)}"`;
      } else {
        status.textContent = `Confirmation button not found!`;
      }

      // Clear highlight after 2s
      setTimeout(() => message.style.outline = "", 2000);

      // Reset lastMessageKey
      setTimeout(() => lastMessageKey = null, 500);

      cooldown = true;
      await sleep(800);
      cooldown = false;
      busy = false;

    }, HOVER_DELAY);
  });

  observer.observe(document.body, { childList: true, subtree: true });

})();
