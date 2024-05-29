const accessToken = "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";

const header = document.createElement("h1");
header.textContent = "GITHUB SEARCH TOOLS";
document.body.appendChild(header);

const nameInput = document.createElement("input");
nameInput.placeholder = "Enter GitHub username";
document.body.appendChild(nameInput);

const btn = document.createElement("button");
btn.textContent = "Search a GitHub User";
btn.style.width = "150px";
document.body.appendChild(btn);

btn.addEventListener("click", async () => {
  const username = nameInput.value.trim();
  console.log(`Searching for user: ${username}`);

  if (!username) {
    alert("Please enter a GitHub username.");
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    displayUserData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Failed to fetch user data. Please try again.");
  }
});
function displayUserData(data) {
  const previousContainer = document.querySelector('main');
  if (previousContainer) {
    previousContainer.remove();
  }
  const myContainer = document.createElement('main');
  document.body.appendChild(myContainer);

  const container = document.createElement('div');
  myContainer.appendChild(container);

  const imageUrl = document.createElement('img');
  imageUrl.src = data.avatar_url;
  imageUrl.alt = `${data.name}'s avatar`;
  imageUrl.style.width = "150px";
  imageUrl.style.borderRadius = "50%";
  container.appendChild(imageUrl);

  const myArticle = document.createElement('article');
  myContainer.appendChild(myArticle);

  const name = document.createElement("p");
  name.style.fontSize = "30px";
  name.textContent = data.name || "No name provided";
  myArticle.appendChild(name);

  const repository = document.createElement('p');
  repository.textContent = `Public Repos: ${data.public_repos}`;
  myArticle.appendChild(repository);

  const userType = document.createElement('p');
  userType.textContent = `User Type: ${data.type}`;
  myArticle.appendChild(userType);

  const location = document.createElement('p');
  location.textContent = `Location: ${data.location || "No location provided"}`;
  myArticle.appendChild(location);

  const description = document.createElement('p');
  description.textContent = `Bio: ${data.bio || "No bio provided"}`;
  myArticle.appendChild(description);
}