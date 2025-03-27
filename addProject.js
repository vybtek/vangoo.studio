document.addEventListener("DOMContentLoaded", () => {
    const projectForm = document.getElementById("project-form");
    if (!projectForm) return;

    projectForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const project = {
            title: document.getElementById("title").value.trim(),
            client: document.getElementById("client").value.trim(),
            image: document.getElementById("image").value.trim(),
            description: document.getElementById("description").value.trim(),
        };

        try {
            const response = await fetch("http://localhost:5000/add-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project),
            });

            if (!response.ok) throw new Error("Failed to add project");

            const result = await response.json();
            alert(result.message);
            projectForm.reset();
        } catch (error) {
            alert("Error adding project: " + error.message);
        }
    });
});
