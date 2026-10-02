// ======================================
// ADMIN REQUESTS
// ======================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    const requestList =
      document.getElementById(
        "adminRequestList"
      );

    const emptyBlock =
      document.getElementById(
        "adminRequestsEmpty"
      );

    if (!requestList) return;

    if (!supabaseClient) {
      console.error(
        "Supabase қосылмаған."
      );
      return;
    }


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
        "Admin requests error:",
        error
      );

      return;
    }


    const requests =
      data || [];


    if (requests.length === 0) {

      requestList.innerHTML = "";

      if (emptyBlock) {
        emptyBlock.style.display =
          "block";
      }

      return;
    }


    if (emptyBlock) {
      emptyBlock.style.display =
        "none";
    }


    requestList.innerHTML =
      requests
        .map(request => {

          const phone =
            escapeHTML(
              request.phone || "—"
            );

          const digits =
            String(
              request.phone || ""
            )
              .replace(/\D/g, "");

          let whatsappNumber =
            digits;

          if (
            whatsappNumber.length === 11 &&
            whatsappNumber.startsWith("8")
          ) {

            whatsappNumber =
              "7" +
              whatsappNumber.slice(1);

          }


          const whatsappLink =
            whatsappNumber
              ? `
                <a
                  class="request-contact-btn"
                  href="https://wa.me/${whatsappNumber}"
                  target="_blank"
                >
                  WhatsApp
                </a>
              `
              : "";


          return `
            <div class="request-card">

              <div class="request-card-top">

                <span class="request-category">
                  ${getAdminCategoryName(
                    request.category
                  )}
                </span>

                <span class="request-time">
                  ${formatAdminDate(
                    request.created_at
                  )}
                </span>

              </div>


              <h3>
                ${escapeHTML(
                  request.title || ""
                )}
              </h3>


              <p>
                ${escapeHTML(
                  request.description || ""
                )}
              </p>


              <div class="request-meta">

                <span>
                  📍 ${escapeHTML(
                    request.location || "—"
                  )}
                </span>

                <span>
                  💰 ${escapeHTML(
                    request.budget || "Көрсетілмеген"
                  )}
                </span>

                <span>
                  📞 ${phone}
                </span>

              </div>


              ${whatsappLink}

            </div>
          `;

        })
        .join("");

  }
);


// ======================================
// CATEGORY NAME
// ======================================

function getAdminCategoryName(
  category
) {

  const lang =
    localStorage.getItem(
      "siteLanguage"
    ) || "kk";


  const categories = {

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
    categories[category]?.[lang] ||
    category ||
    "—"
  );

}


// ======================================
// DATE
// ======================================

function formatAdminDate(
  date
) {

  if (!date) return "";

  return new Date(date)
    .toLocaleString(
      "kk-KZ",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    );

}


// ======================================
// SAFE HTML
// ======================================

function escapeHTML(
  value
) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}