window.addEventListener('load', async () => {
                const user = await fetch("http://localhost:8080/user/getCurrentUser", {
                    method : "GET",
                    headers : {
                        'Authorization' : `Bearer ${localStorage.getItem("access-token")}`
                    }
                });
                const data = await user.json();
                document.getElementById("username-profile").textContent = data.username;
            });
document.getElementById("logout-button").onclick = () => {
                    localStorage.removeItem("access-token");
                }
