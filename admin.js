// ======================================
// KEREGINGDI TAP — ADMIN.JS
// ======================================


document.addEventListener(
  "DOMContentLoaded",
  async () => {

    if (!supabaseClient) {

      alert("Supabase қосылмаған.");
      return;

    }


    // ================================
    // CHECK ADMIN
    // ================================

    const {
      data: { session }
    } =
      await supabaseClient.auth.getSession();


    if (!session) {

      window.location.href =
        "login.html";

      return;
    }


    const {
      data: profile,
      error: profileError
    } =
      await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();


    if (
      profileError ||
      !profile ||
      profile.role !== "admin"
    ) {

      alert(
        "Бұл бетке тек администратор кіре алады."
      );

      window.location.href =
        "index.html";

      return;
    }


    // ================================
    // HTML ELEMENTS
    // ================================

    const servicesSection =
      document.getElementById(
        "services"
      );


    const dashboard =
      document.getElementById(
        "dashboard"
      );


    if (!servicesSection) {
      return;
    }


    // Қызметтер бөліміндегі ескі бос блокты табамыз
    const oldEmpty =
      servicesSection.querySelector(
        ".profile-empty"
      );


    if (oldEmpty) {

      oldEmpty.outerHTML = `
        <div id="adminServicesList"></div>

        <div
          class="profile-empty"
          id="adminServicesEmpty"
          style="display:none;"
        >
          <div>🧰</div>

          <h3>
            Әзірге қызмет жоқ
          </h3>

          <p>
            Қызмет жіберілгенде осы жерде көрінеді.
          </p>
        </div>
      `;

    }


    const servicesList =
      document.getElementById(
        "adminServicesList"
      );


    const servicesEmpty =
      document.getElementById(
        "adminServicesEmpty"
      );


    // ================================
    // STATUS FILTER
    // ================================

    const statusSelect =
      servicesSection.querySelector(
        "select"
      );


    if (statusSelect) {

      statusSelect.innerHTML = `
        <option value="all">
          Барлық статус
        </option>

        <option value="pending">
          Тексерілуде
        </option>

        <option value="published">
          Жарияланды
        </option>

        <option value="rejected">
          Қабылданбады
        </option>
      `;

    }


    // ================================
    // LOAD SERVICES
    // ================================

    async function loadServices() {

      let query =
        supabaseClient
          .from("services")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false
            }
          );


      if (
        statusSelect &&
        statusSelect.value !== "all"
      ) {

        query =
          query.eq(
            "status",
            statusSelect.value
          );

      }


      const {
        data,
        error
      } =
        await query;


      if (error) {

        console.error(
          "Admin services error:",
          error
        );

        alert(
          "Қызметтерді жүктеу қатесі: " +
          error.message
        );

        return;
      }


      renderServices(
        data || []
      );


      await updateStats();

    }


    // ================================
    // RENDER
    // ================================

    function renderServices(
      services
    ) {

      if (!servicesList) {
        return;
      }


      servicesList.innerHTML = "";


      if (!services.length) {

        if (servicesEmpty) {
          servicesEmpty.style.display =
            "block";
        }

        return;
      }


      if (servicesEmpty) {
        servicesEmpty.style.display =
          "none";
      }


      services.forEach(
        service => {

          const card =
            document.createElement(
              "div"
            );


          card.className =
            "admin-box";


          card.style.marginBottom =
            "16px";


          let statusText =
            "Тексерілуде";


          if (
            service.status ===
            "published"
          ) {

            statusText =
              "Жарияланды";

          }


          if (
            service.status ===
            "rejected"
          ) {

            statusText =
              "Қабылданбады";

          }


          card.innerHTML = `

            <div
              style="
                display:flex;
                justify-content:space-between;
                gap:20px;
                flex-wrap:wrap;
              "
            >

              <div
                style="
                  flex:1;
                  min-width:220px;
                "
              >

                <span
                  style="
                    font-size:13px;
                    opacity:.65;
                  "
                >
                  ${escapeHTML(
                    service.category || ""
                  )}
                </span>

                <h3
                  style="
                    margin:8px 0;
                  "
                >
                  ${escapeHTML(
                    service.title || ""
                  )}
                </h3>

                <p>
                  ${escapeHTML(
                    service.description ||
                    ""
                  )}
                </p>

                <p>
                  <strong>
                    Бағасы:
                  </strong>

                  ${
                    service.price
                      ? service.price +
                        " ₸"
                      : "—"
                  }
                </p>

                <p>
                  <strong>
                    Телефон:
                  </strong>

                  ${escapeHTML(
                    service.phone || "—"
                  )}
                </p>

                <p>
                  <strong>
                    WhatsApp:
                  </strong>

                  ${escapeHTML(
                    service.whatsapp ||
                    "—"
                  )}
                </p>

                <p>
                  <strong>
                    Орналасуы:
                  </strong>

                  ${escapeHTML(
                    service.location ||
                    "—"
                  )}
                </p>

              </div>


              <div
                style="
                  min-width:190px;
                "
              >

                <div
                  style="
                    margin-bottom:14px;
                    font-weight:700;
                  "
                >
                  ${statusText}
                </div>


                ${
                  service.status ===
                  "pending"

                    ? `

                      <button
                        type="button"
                        class="submit-service-btn"
                        data-publish="${
                          service.id
                        }"
                        style="
                          width:100%;
                          margin-bottom:8px;
                        "
                      >
                        ✓ Жариялау
                      </button>


                      <button
                        type="button"
                        class="profile-edit-btn"
                        data-reject="${
                          service.id
                        }"
                        style="
                          width:100%;
                        "
                      >
                        ✕ Қабылдамау
                      </button>

                    `

                    : `
                      <button
                        type="button"
                        class="profile-edit-btn"
                        data-pending="${
                          service.id
                        }"
                        style="
                          width:100%;
                        "
                      >
                        Қайта тексеруге жіберу
                      </button>
                    `
                }

              </div>

            </div>
          `;


          servicesList.appendChild(
            card
          );

        }
      );


      bindActionButtons();

    }


    // ================================
    // BUTTONS
    // ================================

    function bindActionButtons() {

      document
        .querySelectorAll(
          "[data-publish]"
        )
        .forEach(
          button => {

            button.onclick =
              () =>
                changeStatus(
                  button.dataset
                    .publish,
                  "published"
                );

          }
        );


      document
        .querySelectorAll(
          "[data-reject]"
        )
        .forEach(
          button => {

            button.onclick =
              () =>
                changeStatus(
                  button.dataset
                    .reject,
                  "rejected"
                );

          }
        );


      document
        .querySelectorAll(
          "[data-pending]"
        )
        .forEach(
          button => {

            button.onclick =
              () =>
                changeStatus(
                  button.dataset
                    .pending,
                  "pending"
                );

          }
        );

    }


    // ================================
    // CHANGE STATUS
    // ================================

    async function changeStatus(
      id,
      status
    ) {

      const {
        error
      } =
        await supabaseClient
          .from("services")
          .update({
            status: status
          })
          .eq(
            "id",
            id
          );


      if (error) {

        alert(
          "Статусты өзгерту қатесі: " +
          error.message
        );

        return;
      }


      if (
        status === "published"
      ) {

        alert(
          "Қызмет жарияланды."
        );

      }


      if (
        status === "rejected"
      ) {

        alert(
          "Қызмет қабылданбады."
        );

      }


      await loadServices();

    }


    // ================================
    // DASHBOARD STATS
    // ================================

    async function updateStats() {

      const {
        count: publishedCount
      } =
        await supabaseClient
          .from("services")
          .select(
            "*",
            {
              count: "exact",
              head: true
            }
          )
          .eq(
            "status",
            "published"
          );


      const {
        count: pendingCount
      } =
        await supabaseClient
          .from("services")
          .select(
            "*",
            {
              count: "exact",
              head: true
            }
          )
          .eq(
            "status",
            "pending"
          );


      if (!dashboard) {
        return;
      }


      const numbers =
        dashboard.querySelectorAll(
          ".admin-stat-card strong"
        );


      // 1-ші карта:
      // қолданушылар — әзірге кейін қосамыз

      if (numbers[1]) {

        numbers[1].textContent =
          publishedCount || 0;

      }


      if (numbers[2]) {

        numbers[2].textContent =
          pendingCount || 0;

      }

    }


    // ================================
    // FILTER CHANGE
    // ================================

    if (statusSelect) {

      statusSelect.addEventListener(
        "change",
        loadServices
      );

    }


    // ================================
    // SECURITY ESCAPE
    // ================================

    function escapeHTML(
      value
    ) {

      return String(
        value ?? ""
      )
        .replaceAll(
          "&",
          "&amp;"
        )
        .replaceAll(
          "<",
          "&lt;"
        )
        .replaceAll(
          ">",
          "&gt;"
        )
        .replaceAll(
          '"',
          "&quot;"
        )
        .replaceAll(
          "'",
          "&#039;"
        );

    }

// ================================
// DASHBOARD — PENDING SERVICES
// ================================

async function loadDashboardPending() {

  if (!dashboard) return;

  const adminBoxes =
    dashboard.querySelectorAll(".admin-box");

  const moderationBox =
    adminBoxes[0];

  if (!moderationBox) return;


  const {
    data,
    error
  } =
    await supabaseClient
      .from("services")
      .select("*")
      .eq("status", "pending")
      .order("created_at", {
        ascending: false
      })
      .limit(5);


  if (error) {

    console.error(
      "Dashboard pending error:",
      error
    );

    return;
  }


  const oldEmpty =
    moderationBox.querySelector(
      ".profile-empty"
    );


  if (oldEmpty) {

    oldEmpty.remove();

  }


  let container =
    moderationBox.querySelector(
      "#dashboardPendingList"
    );


  if (!container) {

    container =
      document.createElement("div");

    container.id =
      "dashboardPendingList";

    moderationBox.appendChild(
      container
    );

  }


  container.innerHTML = "";


  if (!data || data.length === 0) {

    container.innerHTML = `
      <div class="profile-empty">

        <div>🧰</div>

        <h3>
          Әзірге тексеретін қызмет жоқ
        </h3>

        <p>
          Қолданушы жаңа қызмет жібергенде осы жерде көрінеді.
        </p>

      </div>
    `;

    return;
  }


  data.forEach(service => {

    const item =
      document.createElement("div");


    item.style.padding =
      "18px 0";

    item.style.borderBottom =
      "1px solid #e5e7eb";


    item.innerHTML = `

      <div
        style="
          display:flex;
          justify-content:space-between;
          gap:20px;
          align-items:center;
          flex-wrap:wrap;
        "
      >

        <div>

          <strong>
            ${escapeHTML(
              service.title || ""
            )}
          </strong>

          <div
            style="
              margin-top:6px;
              font-size:14px;
              opacity:.7;
            "
          >
            ${escapeHTML(
              service.location || ""
            )}

            ·

            ${
              service.price
                ? service.price + " ₸"
                : "Бағасы көрсетілмеген"
            }
          </div>

        </div>


        <button
          type="button"
          class="profile-edit-btn"
          data-open-services
        >
          Тексеру
        </button>

      </div>
    `;


    container.appendChild(
      item
    );

  });


  container
    .querySelectorAll(
      "[data-open-services]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const servicesTab =
            document.querySelector(
              '[data-admin-tab="services"]'
            );

          if (servicesTab) {
            servicesTab.click();
          }

        }
      );

    });

}
    // ================================
    // START
    // ================================

    await loadServices();
await loadDashboardPending();

  }
);