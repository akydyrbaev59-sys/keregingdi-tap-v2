document.addEventListener("DOMContentLoaded", async () => {

  const usersList =
    document.getElementById("adminUsersList");

  const emptyBlock =
    document.getElementById("adminUsersEmpty");

  const searchInput =
    document.getElementById("adminUserSearch");

  if (!usersList) return;
  if (!supabaseClient) return;


  const { data, error } =
    await supabaseClient
      .from("profiles")
      .select(
        "id, full_name, phone, city, role, created_at"
      )
      .order(
        "created_at",
        { ascending: false }
      );


  if (error) {
    console.error(
      "Admin users error:",
      error
    );
    return;
  }


  const users = data || [];


  function renderUsers(list) {

    usersList.innerHTML = "";

    if (list.length === 0) {

      if (emptyBlock) {
        emptyBlock.style.display = "block";
      }

      return;
    }


    if (emptyBlock) {
      emptyBlock.style.display = "none";
    }


    usersList.innerHTML =
      list.map(user => {

        const name =
          escapeAdminUserHTML(
            user.full_name || "Қолданушы"
          );

        const phone =
          escapeAdminUserHTML(
            user.phone || "—"
          );

        const city =
          escapeAdminUserHTML(
            user.city || "—"
          );

        const role =
          user.role === "admin"
            ? "Админ"
            : "Қолданушы";


        return `
          <div
            class="admin-box"
            style="margin-bottom:12px;"
          >

            <div
              style="
                display:flex;
                align-items:center;
                gap:15px;
              "
            >

              <div class="admin-avatar">
                ${name.charAt(0).toUpperCase()}
              </div>

              <div style="flex:1">

                <h3>${name}</h3>

                <p>📞 ${phone}</p>

                <p>📍 ${city}</p>

                <small>
                  ${role}
                  ·
                  ${formatAdminUserDate(
                    user.created_at
                  )}
                </small>

              </div>

            </div>

          </div>
        `;

      }).join("");

  }


  renderUsers(users);


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      () => {

        const value =
          searchInput.value
            .trim()
            .toLowerCase();


        const filtered =
          users.filter(user => {

            const text = `
              ${user.full_name || ""}
              ${user.phone || ""}
              ${user.city || ""}
              ${user.role || ""}
            `.toLowerCase();

            return text.includes(value);

          });


        renderUsers(filtered);

      }
    );

  }

});


function formatAdminUserDate(date) {

  if (!date) return "";

  return new Date(date)
    .toLocaleDateString("kk-KZ");

}


function escapeAdminUserHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}