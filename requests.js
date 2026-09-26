// ======================================
// KEREGINGDI TAP — REQUESTS.JS
// ======================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    if (!supabaseClient) {
      console.error("Supabase қосылмаған.");
      return;
    }


    const requestList =
      document.getElementById("requestList");

    const requestsEmpty =
      document.getElementById("requestsEmpty");

    const addRequestForm =
      document.getElementById("addRequestForm");

    const requestFilter =
      document.getElementById("requestFilter");


    // ==================================
    // LOAD REQUESTS
    // ==================================

    async function loadRequests() {

      const {
        data,
        error
      } =
        await supabaseClient
          .from("requests")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false
            }
          );


      if (error) {

        console.error(
          "Requests load error:",
          error
        );

        return;
      }


      renderRequests(
        data || []
      );

    }


    // ==================================
    // RENDER REQUESTS
    // ==================================

    function renderRequests(
      requests
    ) {

      if (!requestList) {
        return;
      }


      requestList.innerHTML = "";


      let filtered =
        [...requests];


      if (
        requestFilter &&
        requestFilter.value !== "all"
      ) {

        filtered =
          filtered.filter(
            request =>
              request.category ===
              requestFilter.value
          );

      }


      if (!filtered.length) {

        if (requestsEmpty) {
          requestsEmpty.style.display =
            "block";
        }

        return;
      }


      if (requestsEmpty) {
        requestsEmpty.style.display =
          "none";
      }


      filtered.forEach(
        request => {

          const card =
            document.createElement("div");


          card.className =
            "request-card";

          card.dataset.category =
            request.category || "";


          const whatsapp =
            String(
              request.phone || ""
            ).replace(/\D/g, "");


          card.innerHTML = `

            <div class="admin-box"
                 style="margin-bottom:16px;">

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


                  <p style="margin-top:12px;">
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
                    min-width:170px;
                  "
                >

                  ${
                    whatsapp
                      ? `
                        <a
                          href="https://wa.me/${whatsapp}"
                          target="_blank"
                          rel="noopener"
                          class="primary-btn"
                          style="
                            display:block;
                            text-align:center;
                          "
                        >
                          WhatsApp
                        </a>
                      `
                      : ""
                  }

                </div>

              </div>

            </div>
          `;


          requestList.appendChild(
            card
          );

        }
      );

    }


    // ==================================
    // ADD REQUEST
    // ==================================

    if (addRequestForm) {

      addRequestForm.addEventListener(
        "submit",
        async event => {

          // script.js ішіндегі ескі
          // сұраныс alert-ын тоқтатады
          event.preventDefault();
          event.stopImmediatePropagation();


          const lang =
            localStorage.getItem(
              "siteLanguage"
            ) || "kk";


          const {
            data: { session }
          } =
            await supabaseClient.auth
              .getSession();


          if (!session) {

            alert(
              lang === "ru"
                ? "Сначала войдите в аккаунт."
                : "Алдымен аккаунтқа кір."
            );

            window.location.href =
              "login.html";

            return;
          }


          const title =
            document
              .getElementById(
                "requestTitle"
              )
              ?.value.trim();

          const category =
            document
              .getElementById(
                "requestCategory"
              )
              ?.value;

          const location =
            document
              .getElementById(
                "requestLocation"
              )
              ?.value.trim();

          const budget =
            document
              .getElementById(
                "requestBudget"
              )
              ?.value.trim();

          const description =
            document
              .getElementById(
                "requestDescription"
              )
              ?.value.trim();

          const phone =
            document
              .getElementById(
                "requestPhone"
              )
              ?.value.trim();


          if (
            !title ||
            !category ||
            !location ||
            !description ||
            !phone
          ) {

            alert(
              lang === "ru"
                ? "Заполните обязательные поля."
                : "Міндетті жолдарды толтыр."
            );

            return;
          }


          const button =
            addRequestForm.querySelector(
              'button[type="submit"]'
            );


          if (button) {

            button.disabled = true;

            button.textContent =
              lang === "ru"
                ? "Отправка..."
                : "Жіберілуде...";

          }


          const {
            error
          } =
            await supabaseClient
              .from("requests")
              .insert({

                user_id:
                  session.user.id,

                title:
                  title,

                category:
                  category,

                description:
                  description,

                location:
                  location,

                budget:
                  budget || null,

                phone:
                  phone

              });


          if (error) {

            console.error(
              "Request insert error:",
              error
            );

            alert(
              "Қате: " +
              error.message
            );


            if (button) {

              button.disabled =
                false;

              button.textContent =
                lang === "ru"
                  ? "Отправить заявку"
                  : "Сұранысты жіберу";

            }

            return;
          }


          alert(
            lang === "ru"
              ? "Заявка опубликована."
              : "Сұраныс жарияланды."
          );


          addRequestForm.reset();


          if (button) {

            button.disabled = false;

            button.textContent =
              lang === "ru"
                ? "Отправить заявку"
                : "Сұранысты жіберу";

          }


          await loadRequests();

        },
        true
      );

    }


    // ==================================
    // FILTER
    // ==================================

    if (requestFilter) {

      requestFilter.addEventListener(
        "change",
        loadRequests
      );

    }


    // ==================================
    // CATEGORY NAME
    // ==================================

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
        }

      };


      return (
        names[category]?.[lang] ||
        category ||
        "—"
      );

    }


    // ==================================
    // SAFE HTML
    // ==================================

    function escapeHTML(value) {

      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    }


    // ==================================
    // START
    // ==================================

    await loadRequests();

  }
);