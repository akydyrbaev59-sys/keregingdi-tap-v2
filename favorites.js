// ======================================
// KEREGINGDI TAP — FAVORITES.JS
// ======================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    if (!supabaseClient) {
      return;
    }

    const favoriteGrid =
      document.getElementById(
        "favoriteGrid"
      );

    const favoritesEmpty =
      document.getElementById(
        "favoritesEmpty"
      );

    if (!favoriteGrid) {
      return;
    }


    const {
      data: { session }
    } =
      await supabaseClient.auth.getSession();


    if (!session) {

      favoritesEmpty.style.display =
        "block";

      return;
    }


    async function loadFavorites() {

      const {
        data,
        error
      } =
        await supabaseClient
          .from("favorites")
          .select(`
            id,
            service_id,
            services (
              id,
              title,
              category,
              description,
              price,
              location,
              working_hours,
              status
            )
          `)
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
          "Favorites error:",
          error
        );

        return;
      }


      renderFavorites(
        data || []
      );

    }


    function renderFavorites(
      favorites
    ) {

      favoriteGrid.innerHTML = "";


      const validFavorites =
        favorites.filter(
          item =>
            item.services &&
            item.services.status ===
              "published"
        );


      if (!validFavorites.length) {

        favoriteGrid.style.display =
          "none";

        favoritesEmpty.style.display =
          "block";

        return;
      }


      favoriteGrid.style.display = "";
      favoritesEmpty.style.display =
        "none";


      validFavorites.forEach(
        item => {

          const service =
            item.services;


          const card =
            document.createElement(
              "article"
            );


          card.className =
            "service-card favorite-card";


          card.innerHTML = `

            <div class="service-card-top">

              <span class="service-category">
                ${getCategoryName(
                  service.category
                )}
              </span>

              <button
                type="button"
                class="favorite-remove"
                data-favorite-id="${item.id}"
                style="
                  border:none;
                  background:none;
                  cursor:pointer;
                  font-size:24px;
                "
                title="Таңдаулыдан алып тастау"
              >
                ♥
              </button>

            </div>


            <div class="service-card-body">

              <h3>
                ${escapeHTML(
                  service.title || ""
                )}
              </h3>


              <p class="service-description">
                ${escapeHTML(
                  service.description ||
                  ""
                )}
              </p>


              <div class="service-meta">

                <span>
                  📍
                  ${escapeHTML(
                    service.location ||
                    "—"
                  )}
                </span>

              </div>


              <div class="service-card-bottom">

                <div class="service-price">

                  ${
                    service.price
                      ? Number(
                          service.price
                        ).toLocaleString(
                          "ru-RU"
                        ) + " ₸"
                      : "Бағасы келісімді"
                  }

                </div>


                <a
                  href="service-detail.html?id=${service.id}"
                  class="primary-btn"
                >
                  Толығырақ
                </a>

              </div>

            </div>
          `;


          favoriteGrid.appendChild(
            card
          );

        }
      );


      document
        .querySelectorAll(
          "[data-favorite-id]"
        )
        .forEach(
          button => {

            button.addEventListener(
              "click",
              async () => {

                const id =
                  button.dataset
                    .favoriteId;


                const {
                  error
                } =
                  await supabaseClient
                    .from("favorites")
                    .delete()
                    .eq(
                      "id",
                      id
                    )
                    .eq(
                      "user_id",
                      session.user.id
                    );


                if (error) {

                  alert(
                    "Қате: " +
                    error.message
                  );

                  return;
                }


                await loadFavorites();

              }
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


    function escapeHTML(value) {

      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    }


    await loadFavorites();

  }
);