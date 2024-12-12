$(document).ready(function () {
  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  // Smooth scroll and active class update
  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate(
        {
          scrollTop: offset,
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Initial content revealing with ScrollReveal
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200,
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left",
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right",
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top",
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom",
  });

  // New form submission logic
  const form = document.getElementById("contactForm");

  form.onsubmit = function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);

    // Submit the form using fetch
    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById("msg").innerHTML =
            "Your message was sent successfully!";
          form.style.display = "none"; // Hide the form
        } else {
          document.getElementById("msg").innerHTML =
            "There was an error with your submission. Please try again.";
        }
      })
      .catch((error) => {
        document.getElementById("msg").innerHTML =
          "There was an error submitting your message. Please try again.";
      });
  };

  // Update active section in the header
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }

    // Iterate through each section and update the active class in the header
    $("section").each(function () {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
});
