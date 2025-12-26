document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const navHeight = nav ? nav.offsetHeight : 90;

  document.querySelectorAll("nav a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      e.preventDefault();

      const sectionTop =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight -
        10;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    });
  });

  const timelineItems = document.querySelectorAll(".timeline-item");

  if (timelineItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    timelineItems.forEach((item) => observer.observe(item));
  }

  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Message sent successfully! ");
      form.reset();
    });
  }

  document.querySelectorAll(".skill-ring").forEach((ring) => {
    const value = ring.getAttribute("data-value");
    if (!value) return;

    setTimeout(() => {
      ring.style.setProperty("--percent", value);
    }, 300);
  });

  const mapContainer = document.getElementById("map");

  if (mapContainer && window.L) {
    const map = L.map("map", {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([16.509934, 80.643867], 15);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap contributors",
      }
    ).addTo(map);

    L.circleMarker([16.509934, 80.643867], {
      radius: 7,
      fillColor: "#f60012",
      color: "#f60012",
      weight: 1,
      fillOpacity: 1,
    }).addTo(map);
  }
});
const form = document.getElementById("contactForm");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (result.success) {
      alert("Message sent successfully.");
      form.reset();
    } else {
      console.error(result);
      alert("Failed to send message. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Network error. Please try again later.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});


