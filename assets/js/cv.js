let lastScrollTime = Date.now();

$(window).on("scroll", function () {
  const now = Date.now();
  // Throttle scroll events
  if (now - lastScrollTime < 100) return;
  lastScrollTime = now;

  const scrollPercent =
    ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100;
  const diver = $("#diver");

  // Clear existing animations in queue
  diver.velocity("stop", true);

  // Calculate new position based on scroll with reduced movement
  const newTop = ($(window).height() * scrollPercent) / 150;

  // Animate the diver with shorter duration and different easing
  Velocity(
    diver,
    {
      top: newTop,
      rotateZ: -45 + scrollPercent * 0.8,
    },
    {
      duration: 800,
      easing: "easeOutQuad",
      queue: true,
    }
  );
});

$(window).on("scroll", function () {
  const scrolled = $(window).scrollTop();

  // Different speeds for each layer
  $(".sea-layer").css("transform", `translateY(${scrolled * 0.1}px)`);
  $(".fish-layer").css("transform", `translateY(${scrolled * 0.3}px)`);
  $(".coral-layer").css("transform", `translateY(${scrolled * 0.5}px)`);
  $(".turtle-layer").css("transform", `translateY(${scrolled * 0.7}px)`);
});

// Initial diver position
$(document).ready(function () {
  const diver = $("#diver");
  Velocity(
    diver,
    {
      top: 0,
      rotateZ: -45,
    },
    {
      duration: 0,
    }
  );

  // Trigger scroll once to set initial positions
  $(window).trigger("scroll");
});
