document.getElementById("resumeForm").addEventListener("submit", function (e) {
  const template = document.getElementById("template").value;
  if (!template) {
    e.preventDefault();
    alert("Please select a resume template before proceeding.");
  }
});