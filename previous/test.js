$(document).ready(function () {
  $(".enabled").first().addClass("selected-value state-selected");

  $(".dropdown-toggle").click(function (e) {
    $(".dropdown").toggleClass("open");
    e.stopPropagation();
  });

  $(".enabled").click(function () {
    $(".selected-value.state-selected").removeClass(
      "selected-value state-selected"
    );
    $(this).addClass("selected-value state-selected");
    $(".dropdown-selected-value").html($(this).text());
    $(".dropdown").toggleClass("open");
  });

  $(".tooltip-value").css("visibility", "hidden");

  $(".enabled").hover(function () {
    const spanPosition = this.getBoundingClientRect();
    $(".tooltip-value").html($(this).text());
    const offset = calculateWidth();
    $(".tooltip-value").offset({
      top: spanPosition.y - 32,
      left: spanPosition.x + offset,
    });
    $(".tooltip-value").css("visibility", "visible");
  }, clearTooltip);

  $(".dropdown-toggle").hover(function () {
    dropdownPosition = this.getBoundingClientRect();
    $(".tooltip-value").html($(".dropdown-selected-value").text());
    const offset = calculateWidth();
    $(".tooltip-value").offset({
      top: dropdownPosition.y - 32,
      left: dropdownPosition.x + offset,
    });
    $(".tooltip-value").css("visibility", "visible");
  }, clearTooltip);

  $(".next-btn").click(function () {
    window.location.href = $(".selected-value.state-selected").attr("data-uri");
  });
});

function clearTooltip() {
  $(".tooltip-value").html("");
  $(".tooltip-value").css("visibility", "hidden");
}

function calculateWidth() {
  const tooltipWidth = $(".tooltip-value").width() + 32; // padding;
  const dropdownWidth = $(".dropdown").width();
  const offsetWithDropdown = (dropdownWidth - tooltipWidth) / 2;
  return offsetWithDropdown;
}
