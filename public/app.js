const API = "/api/items";

// Utility: Escape HTML to prevent XSS
function escapeHtml(str) {
  if (!str) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return String(str).replace(/[&<>"']/g, (char) => map[char]);
}

// Utility: Format timestamp
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

// Show error message
function showError(message) {
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = message;
  errorMsg.classList.add("show");
  setTimeout(() => {
    errorMsg.classList.remove("show");
  }, 5000);
}

// Load and display all items
async function load() {
  try {
    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const res = await fetch(API);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const items = await res.json();
    const list = document.getElementById("list");

    if (!items || items.length === 0) {
      list.innerHTML = '<div class="empty-state"><p>No items yet. Add one to get started!</p></div>';
      loading.style.display = "none";
      return;
    }

    list.innerHTML = items
      .map(
        (item) => `
      <li>
        <div class="item-content">
          <div class="item-title">${escapeHtml(item.title)}</div>
          <div class="item-detail">${escapeHtml(item.detail || "No details")}</div>
          <div class="timestamp">${formatDate(item.createdAt)}</div>
        </div>
        <div class="item-actions">
          <button class="action-btn edit-btn" data-id="${escapeHtml(item._id)}">Edit</button>
          <button class="action-btn delete-btn" data-id="${escapeHtml(item._id)}">Delete</button>
        </div>
      </li>
    `
      )
      .join("");

    // Event delegation for edit and delete buttons
    list.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit-btn")) {
        const id = e.target.getAttribute("data-id");
        onEdit(id);
      }
      if (e.target.classList.contains("delete-btn")) {
        const id = e.target.getAttribute("data-id");
        onDelete(id);
      }
    });

    loading.style.display = "none";
  } catch (err) {
    console.error("Load error:", err);
    showError(`Failed to load items: ${err.message}`);
    document.getElementById("loading").style.display = "none";
  }
}

// Add new item
async function onAdd() {
  try {
    const title = document.getElementById("title").value.trim();
    const detail = document.getElementById("detail").value.trim();

    if (!title) {
      showError("Title is required");
      return;
    }

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, detail }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP ${res.status}`);
    }

    document.getElementById("title").value = "";
    document.getElementById("detail").value = "";
    
    await load();
  } catch (err) {
    console.error("Add error:", err);
    showError(`Failed to add item: ${err.message}`);
  }
}

// Delete item
async function onDelete(id) {
  try {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    const res = await fetch(`${API}/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP ${res.status}`);
    }

    await load();
  } catch (err) {
    console.error("Delete error:", err);
    showError(`Failed to delete item: ${err.message}`);
  }
}

// Edit item
async function onEdit(id) {
  try {
    const newTitle = prompt("Enter new title:");
    if (newTitle === null) return; // User canceled

    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) {
      showError("Title cannot be empty");
      return;
    }

    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmedTitle }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP ${res.status}`);
    }

    await load();
  } catch (err) {
    console.error("Edit error:", err);
    showError(`Failed to update item: ${err.message}`);
  }
}

// Initialize
document.getElementById("addBtn").addEventListener("click", onAdd);

// Allow Enter key to add item
document.getElementById("title").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    onAdd();
  }
});

document.getElementById("detail").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    onAdd();
  }
});

// Load items on page load
load();
