document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("delete_modal");
    const confirmBtn = document.getElementById("confirmDelete");
    const cancelBtn = document.getElementById("cancelDelete");
    let deleteId = null;

    document.querySelectorAll(".delete-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            deleteId = link.dataset.id;
            modal.style.display = "flex";
        });
    });

    confirmBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if(deleteId){
            try{
                const res = await fetch(`/delete/${deleteId}`, {
                    method: "DELETE"
                });

                if(res.ok){
                    document.querySelector(`.delete-link[data-id="${deleteId}"]`)
                        .closest(".blog_item")
                        .remove();
                }else{
                    console.error("Failed to delete blog");
                }
            }catch(err){
                console.error(err);
            }finally{
                modal.style.display = "none";
                deleteId = null;
            }
        }
    });

    cancelBtn.addEventListener("click", () => {
        modal.style.display = "none";
        deleteId = null;
    });

    modal.addEventListener("click", (e) => {
        if(e.target === modal){
            modal.style.display = "none";
            deleteId = null;
        }
    })
})