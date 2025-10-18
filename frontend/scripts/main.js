// alucard documentation search placeholder
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".search");
  inputs.forEach(inp => {
    inp.addEventListener("input", () => {
      const val = inp.value.trim();
      const out = inp.nextElementSibling;
      if (!out) return;
      if (val.length > 2) {
        out.innerHTML = `<p>Search results for <code>${val}</code> would render here from the Luau dataset.</p>`;
      } else {
        out.innerHTML = "";
      }
    });
  });
});
