// ======================================
// KEREGINGDI TAP — PROFILE SERVICES
// ======================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    if (!supabaseClient) {
      return;
    }

    const {
      data: { session }
    } =
      await supabaseClient.auth.getSession();


    if (!session) {
      return;
    }


    const myServicesPanel =
      document.getElementById(
        "my-services"
      );


    if (!myServicesPanel) {
      return;
    }


    const oldEmpty =
      myServicesPanel.querySelector(
        ".profile-empty"
      );


    if (oldEmpty) {

      oldEmpty.outerHTML = `
        <div id="myServicesList"></div>

        <div
          class="profile-empty"
          id="myServicesEmpty"
          style="display:none;"
        >
          <div>🧰</div>

          <h3>
            Әзірге қызмет жарияламадың
          </h3>

          <p>
            Қызмет жариялағаннан кейін ол осы жерде көрінеді.
          </p>
        </div>
      `;

    }


    const list =
      document.getElementById(
        "myServicesList"
      );

    const empty =
      document.getElementById(
        "myServicesEmpty"
      );


    async function loadMyServices() {

      const {
        data,
        error
      } =
        await supabaseClient
          .from("services")
          .select("*")
          .eq(
            "user_id",
            session.user.id
          )
          .order(
            "created_at",
            {
              ascending: false
            }
          );


      if (error) {

        console.error(
          "My services error:",
          error
        );

        return;
      }


      renderServices(
        data || []
      );

    }


    function renderServices(
      services
    ) {

      if (!list) {
        return;
      }


      list.innerHTML = "";


      if (!services.length) {

        if (empty) {
          empty.style.display =
            "block";
        }

        return;
      }


      if (empty) {
        empty.style.display =
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

          let statusIcon =
            "⏳";


          if (
            service.status ===
            "published"
          ) {

            statusText =
              "Жарияланды";

            statusIcon =
              "✅";

          }


          if (
            service.status ===
            "rejected"
          ) {

            statusText =
              "Қабылданбады";

            statusIcon =
              "❌";

          }


          card.innerHTML = `

            <div
              style="
                display:flex;
                justify-content:space-between;
                gap:20px;
                align-items:flex-start;
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
                  ${getCategoryName(
                    service.category
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


                <p
                  style="
                    margin-top:10px;
                  "
                >
                  📍
                  ${escapeHTML(
                    service.location ||
                    "—"
                  )}
                </p>


                <strong>
                  ${
                    service.price
                      ? Number(
                          service.price
                        ).toLocaleString(
                          "ru-RU"
                        ) + " ₸"
                      : "Бағасы келісімді"
                  }
                </strong>

              </div>


              <div
                style="
                  min-width:170px;
                "
              >

                <div
                  style="
                    margin-bottom:12px;
                    font-weight:700;
                  "
                >
                  ${statusIcon}
                  ${statusText}
                </div>


                ${
                  service.status ===
                  "published"
                    ? `
                      <a
                        href="service-detail.html?id=${service.id}"
                        class="profile-edit-btn"
                        style="
                          display:block;
                          text-align:center;
                        "
                      >
                        Қызметті көру
                      </a>
                    `
                    : ""
                }

              </div>

            </div>
          `;


          list.appendChild(
            card
          );

        }
      );

    }


    function getCategoryName(
      category
    ) {

      const lang =
        localStorage.getItem(
          "siteLanguage"
        ) || "kk";


      const names = {

        plumber: {
          kk: "Сантехник",
          ru: "Сантехник"
        },

        electrician: {
          kk: "Электрик",
          ru: "Электрик"
        },

        auto: {
          kk: "Авто қызмет",
          ru: "Автоуслуги"
        },

        beauty: {
          kk: "Beauty",
          ru: "Beauty"
        },

        cleaning: {
          kk: "Тазалық",
          ru: "Уборка"
        },

        delivery: {
          kk: "Жеткізу",
          ru: "Доставка"
        },

        repair: {
          kk: "Жөндеу",
          ru: "Ремонт"
        },

        education: {
          kk: "Оқу",
          ru: "Обучение"
        },

        moving: {
          kk: "Жүк тасу",
          ru: "Грузоперевозки"
        },

        other: {
          kk: "Басқа",
          ru: "Другое"
        }

      };


      return (
        names[category]?.[lang] ||
        category ||
        "—"
      );

    }


    function escapeHTML(
      value
    ) {

      return String(
        value ?? ""
      )
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    }


    await loadMyServices();
// ======================================
// MY REQUESTS
// ======================================

const myRequestsPanel =
  document.getElementById(
    "my-requests"
  );


if (myRequestsPanel) {

  const oldRequestEmpty =
    myRequestsPanel.querySelector(
      ".profile-empty"
    );


  if (oldRequestEmpty) {

    oldRequestEmpty.outerHTML = `
      <div id="myRequestsList"></div>

      <div
        class="profile-empty"
        id="myRequestsEmpty"
        style="display:none;"
      >
        <div>📋</div>

        <h3>
          Әзірге сұраныс жарияламадың
        </h3>

        <p>
          Сұраныс жариялағаннан кейін ол осы жерде көрінеді.
        </p>
      </div>
    `;

  }


  const myRequestsList =
    document.getElementById(
      "myRequestsList"
    );

  const myRequestsEmpty =
    document.getElementById(
      "myRequestsEmpty"
    );


  async function loadMyRequests() {

    const {
      data,
      error
    } =
      await supabaseClient
        .from("requests")
        .select("*")
        .eq(
          "user_id",
          session.user.id
        )
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (error) {

      console.error(
        "My requests error:",
        error
      );

      return;
    }


    renderMyRequests(
      data || []
    );

  }


  function renderMyRequests(
    requests
  ) {

    if (!myRequestsList) {
      return;
    }


    myRequestsList.innerHTML = "";


    if (!requests.length) {

      if (myRequestsEmpty) {
        myRequestsEmpty.style.display =
          "block";
      }

      return;
    }


    if (myRequestsEmpty) {
      myRequestsEmpty.style.display =
        "none";
    }


    requests.forEach(
      request => {

        const card =
          document.createElement(
            "div"
          );


        card.className =
          "admin-box";

        card.style.marginBottom =
          "16px";


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
                ${getCategoryName(
                  request.category
                )}
              </span>


              <h3
                style="
                  margin:8px 0;
                "
              >
                ${escapeHTML(
                  request.title || ""
                )}
              </h3>


              <p>
                ${escapeHTML(
                  request.description ||
                  ""
                )}
              </p>


              <p
                style="
                  margin-top:10px;
                "
              >
                📍
                ${escapeHTML(
                  request.location ||
                  "—"
                )}
              </p>


              ${
                request.budget
                  ? `
                    <p>
                      💰
                      ${escapeHTML(
                        request.budget
                      )}
                    </p>
                  `
                  : ""
              }

            </div>


            <div
              style="
                min-width:150px;
              "
            >

              <button
                type="button"
                class="profile-edit-btn"
                data-delete-request="${request.id}"
                style="
                  width:100%;
                "
              >
                🗑 Өшіру
              </button>

            </div>

          </div>
        `;


        myRequestsList.appendChild(
          card
        );

      }
    );


    document
      .querySelectorAll(
        "[data-delete-request]"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            async () => {

              const id =
                button.dataset
                  .deleteRequest;


              const agree =
                confirm(
                  "Сұранысты өшіргің келе ме?"
                );


              if (!agree) {
                return;
              }


              const {
                error
              } =
                await supabaseClient
                  .from("requests")
                  .delete()
                  .eq(
                    "id",
                    id
                  );


              if (error) {

                alert(
                  "Өшіру қатесі: " +
                  error.message
                );

                return;
              }


              await loadMyRequests();

            }
          );

        }
      );

  }


  await loadMyRequests();

}
  }
);