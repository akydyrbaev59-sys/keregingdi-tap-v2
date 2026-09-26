// ======================================
// KEREGINGDI TAP — SERVICES.JS
// ======================================

document.addEventListener("DOMContentLoaded", async () => {

  if (!supabaseClient) {
    console.error("Supabase қосылмаған.");
    return;
  }

  const serviceGrid =
    document.getElementById("serviceGrid");

  const emptyServices =
    document.getElementById("emptyServices");

  const serviceCount =
    document.getElementById("serviceCount");

  const servicesSearch =
    document.getElementById("servicesSearch");

  const servicesSearchBtn =
    document.getElementById("servicesSearchBtn");

  const sortServices =
    document.getElementById("sortServices");

  const filterChips =
    document.querySelectorAll(".filter-chip");

  if (!serviceGrid) return;


  let allServices = [];
  let currentCategory = "all";

  let currentUser = null;

  let favoriteServiceIds =
    new Set();


  // ==================================
  // GET USER
  // ==================================

  const {
    data: { session }
  } =
    await supabaseClient.auth
      .getSession();


  if (session) {
    currentUser =
      session.user;
  }


  // ==================================
  // LOAD FAVORITES
  // ==================================

  async function loadFavorites() {

    favoriteServiceIds.clear();


    if (!currentUser) {
      return;
    }


    const {
      data,
      error
    } =
      await supabaseClient
        .from("favorites")
        .select("service_id")
        .eq(
          "user_id",
          currentUser.id
        );


    if (error) {

      console.error(
        "Favorites load error:",
        error
      );

      return;
    }


    (data || []).forEach(
      item => {

        favoriteServiceIds.add(
          Number(item.service_id)
        );

      }
    );

  }


  // ==================================
  // LOAD SERVICES
  // ==================================

  async function loadPublishedServices() {

    const {
      data,
      error
    } =
      await supabaseClient
        .from("services")
        .select("*")
        .eq(
          "status",
          "published"
        )
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (error) {

      console.error(
        "Services load error:",
        error
      );

      if (emptyServices) {
        emptyServices.style.display =
          "block";
      }

      return;
    }


    allServices =
      data || [];


    applyFilters();

  }


  // ==================================
  // FILTERS
  // ==================================

  function applyFilters() {

    let filtered =
      [...allServices];


    if (
      currentCategory !== "all"
    ) {

      filtered =
        filtered.filter(
          service =>
            service.category ===
            currentCategory
        );

    }


    const searchValue =
      servicesSearch
        ? servicesSearch.value
            .trim()
            .toLowerCase()
        : "";


    if (searchValue) {

      filtered =
        filtered.filter(
          service => {

            const text = `
              ${service.title || ""}
              ${service.description || ""}
              ${service.location || ""}
              ${service.category || ""}
            `.toLowerCase();


            return text.includes(
              searchValue
            );

          }
        );

    }


    if (
      sortServices?.value ===
      "price-low"
    ) {

      filtered.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );

    }


    if (
      sortServices?.value ===
      "price-high"
    ) {

      filtered.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );

    }


    renderServices(filtered);

  }


  // ==================================
  // RENDER
  // ==================================

  function renderServices(
    services
  ) {

    serviceGrid.innerHTML = "";


    if (serviceCount) {

      serviceCount.textContent =
        services.length;

    }


    if (!services.length) {

      if (emptyServices) {
        emptyServices.style.display =
          "block";
      }

      return;
    }


    if (emptyServices) {
      emptyServices.style.display =
        "none";
    }


    services.forEach(
      service => {

        const isFavorite =
          favoriteServiceIds.has(
            Number(service.id)
          );


        const card =
          document.createElement(
            "article"
          );


        card.className =
          "service-card";


        card.dataset.category =
          service.category || "";


        card.dataset.price =
          service.price || 0;


        card.innerHTML = `

          <div class="service-card-top">

            <span class="service-category">
              ${getCategoryName(
                service.category
              )}
            </span>


            <button
              type="button"
              class="favorite-toggle"
              data-service-id="${service.id}"
              style="
                border:none;
                background:none;
                cursor:pointer;
                font-size:26px;
                line-height:1;
              "
              title="Таңдаулы"
            >
              ${
                isFavorite
                  ? "♥"
                  : "♡"
              }
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


              ${
                service.working_hours
                  ? `
                    <span>
                      🕒
                      ${escapeHTML(
                        service.working_hours
                      )}
                    </span>
                  `
                  : ""
              }

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


        serviceGrid.appendChild(
          card
        );

      }
    );


    bindFavoriteButtons();

  }


  // ==================================
  // FAVORITE BUTTON
  // ==================================

  function bindFavoriteButtons() {

    document
      .querySelectorAll(
        ".favorite-toggle"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            async () => {

              const lang =
                localStorage.getItem(
                  "siteLanguage"
                ) || "kk";


              if (!currentUser) {

                alert(
                  lang === "ru"
                    ? "Сначала войдите в аккаунт."
                    : "Алдымен аккаунтқа кір."
                );

                window.location.href =
                  "login.html";

                return;
              }


              const serviceId =
                Number(
                  button.dataset
                    .serviceId
                );


              const isFavorite =
                favoriteServiceIds.has(
                  serviceId
                );


              button.disabled = true;


              if (isFavorite) {

                const {
                  error
                } =
                  await supabaseClient
                    .from("favorites")
                    .delete()
                    .eq(
                      "user_id",
                      currentUser.id
                    )
                    .eq(
                      "service_id",
                      serviceId
                    );


                if (error) {

                  alert(
                    "Қате: " +
                    error.message
                  );

                  button.disabled =
                    false;

                  return;
                }


                favoriteServiceIds
                  .delete(serviceId);


                button.textContent =
                  "♡";

              } else {

                const {
                  error
                } =
                  await supabaseClient
                    .from("favorites")
                    .insert({

                      user_id:
                        currentUser.id,

                      service_id:
                        serviceId

                    });


                if (error) {

                  alert(
                    "Қате: " +
                    error.message
                  );

                  button.disabled =
                    false;

                  return;
                }


                favoriteServiceIds
                  .add(serviceId);


                button.textContent =
                  "♥";

              }


              button.disabled =
                false;

            }
          );

        }
      );

  }


  // ==================================
  // CATEGORY
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
      },

      other: {
        kk: "Басқа",
        ru: "Другое"
      }

    };


    return (
      names[category]?.[lang] ||
      category ||
      ""
    );

  }


  // ==================================
  // FILTER BUTTONS
  // ==================================

  filterChips.forEach(
    chip => {

      chip.addEventListener(
        "click",
        () => {

          filterChips.forEach(
            item =>
              item.classList.remove(
                "active"
              )
          );


          chip.classList.add(
            "active"
          );


          currentCategory =
            chip.dataset.category ||
            "all";


          applyFilters();

        }
      );

    }
  );


  // ==================================
  // SEARCH
  // ==================================

  if (servicesSearch) {

    servicesSearch.addEventListener(
      "input",
      applyFilters
    );

  }


  if (servicesSearchBtn) {

    servicesSearchBtn.addEventListener(
      "click",
      applyFilters
    );

  }


  // ==================================
  // SORT
  // ==================================

  if (sortServices) {

    sortServices.addEventListener(
      "change",
      applyFilters
    );

  }


  // ==================================
  // URL PARAMS
  // ==================================

  const params =
    new URLSearchParams(
      window.location.search
    );


  const searchParam =
    params.get("search");

  const categoryParam =
    params.get("category");


  if (
    searchParam &&
    servicesSearch
  ) {

    servicesSearch.value =
      searchParam;

  }


  if (categoryParam) {

    currentCategory =
      categoryParam;


    filterChips.forEach(
      chip => {

        chip.classList.remove(
          "active"
        );


        if (
          chip.dataset.category ===
          categoryParam
        ) {

          chip.classList.add(
            "active"
          );

        }

      }
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

  await loadFavorites();

  await loadPublishedServices();

});