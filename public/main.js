const deleteProduct = async (id) => {
  const confirmation = confirm("Are you sure you want to delete?");

  if (confirmation) {
    try {
      const response = await fetch(`/delete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _method: "DELETE" }),
      });

      if (response.ok) {
        location.reload();
      } else {
        alert("Failed to delete the product. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }
};
