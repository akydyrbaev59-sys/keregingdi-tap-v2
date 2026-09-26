// ======================================
// KEREGINGDI TAP — SERVICE DETAIL
// ======================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    if (!supabaseClient) {
      return;
    }


    const params =
      new URLSearchParams(
        window.location.search
      );


    const serviceId =
      params.get("id");


    const loading =
      document.getElementById(
        "serviceLoading"
      );

    const notFound =
      document.getElementById(
        "serviceNotFound"
      );

    const detail =
      document.getElementById(
        "serviceDetail"
      );


    if (!serviceId) {

      if (loading) {
        loading.style.display =
          "none";
      }

      if (notFound) {
        notFound.style.display =
          "block";
      }

      return;

    }


    const {
      data: service,
      error
    } =
      await supabaseClient
        .from("services")
        .select("*")
        .eq(
          "id",
          serviceId
        )
        .eq(
          "status",
          "published"
        )
        .maybeSingle();


    if (loading) {
      loading.style.display =
        "none";
    }


    if (
      error ||
      !service
    ) {

      if (notFound) {
        notFound.style.display =
          "block";
      }

      return;

    }


    if (detail) {
      detail.style.display =
        "block";
    }


    const title =
      document.getElementById(
        "detailTitle"
      );

    const description =
      document.getElementById(
        "detailDescription"
      );

    const category =
      document.getElementById(
        "detailCategory"
      );

    const location =
      document.getElementById(
        "detailLocation"
      );

    const workTime =
      document.getElementById(
        "detailWorkTime"
      );

    const price =
      document.getElementById(
        "detailPrice"
      );

    const phone =
      document.getElementById(
        "detailPhone"
      );

    const callButton =
      document.getElementById(
        "callButton"
      );

    const whatsappButton =
      document.getElementById(
        "whatsappButton"
      );


    if (title) {
      title.textContent =
        service.title || "—";
    }


    if (description) {
      description.textContent =
        service.description || "—";
    }


    if (category) {
      category.textContent =
        getCategoryName(
          service.category
        );
    }


    if (location) {
      location.textContent =
        "📍 " +
        (
          service.location ||
          "—"
        );
    }


    if (workTime) {

      if (service.working_hours) {

        workTime.textContent =
          "🕒 " +
          service.working_hours;

      } else {

        workTime.style.display =
          "none";

      }

    }


    if (price) {

      price.textContent =
        service.price
          ? Number(
              service.price
            ).toLocaleString(
              "ru-RU"
            ) + " ₸"
          : "Бағасы келісімді";

    }


    if (phone) {
      phone.textContent =
        service.phone || "—";
    }


    if (callButton) {

      const cleanPhone =
        String(
          service.phone || ""
        )
          .replace(
            /[^\d+]/g,
            ""
          );


      callButton.href =
        cleanPhone
          ? "tel:" + cleanPhone
          : "#";

    }


    if (whatsappButton) {

      const cleanWhatsapp =
        String(
          service.whatsapp || ""
        )
          .replace(
            /\D/g,
            ""
          );


      if (cleanWhatsapp) {

        whatsappButton.href =
          "https://wa.me/" +
          cleanWhatsapp;

      } else {

        whatsappButton.style.display =
          "none";

      }

    }


    document.title =
      (service.title || "Қызмет") +
      " — Keregingdi Tap";


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

  }
);